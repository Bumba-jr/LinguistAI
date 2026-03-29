import React, { useState } from 'react';
import { useAppStore, QuestionType, Difficulty, Language } from '../store/useAppStore';
import { Settings2, Sparkles, Loader2, BookOpen, GraduationCap, Globe } from 'lucide-react';
import { generateQuestions, generateLecture } from '../services/aiService';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const QuizSettings = () => {
  const {
    quizSettings,
    updateQuizSettings,
    notes,
    extractedText,
    setIsGenerating,
    isGenerating,
    setQuestions,
    setLectures,
    activeTab,
    generationMode,
    setGenerationMode,
    setActiveTab
  } = useAppStore();

  const [generationError, setGenerationError] = useState<{ message: string; isRateLimit: boolean } | null>(null);

  const handleGenerate = async () => {
    const state = useAppStore.getState();

    // Get clean versions of both content sources
    const editorContent = state.notes.replace(/<[^>]*>/g, '').trim();
    const uploadContent = state.extractedText.trim();

    // Determine which content to use
    let contentToUse = '';

    if (state.activeTab === 'editor') {
      if (editorContent.length >= 10) {
        contentToUse = state.notes;
      } else if (uploadContent.length >= 10) {
        contentToUse = state.extractedText;
      }
    } else {
      if (uploadContent.length >= 10) {
        contentToUse = state.extractedText;
      } else if (editorContent.length >= 10) {
        contentToUse = state.notes;
      }
    }

    if (!contentToUse || contentToUse.replace(/<[^>]*>/g, '').trim().length < 10) {
      setGenerationError({ message: 'Please provide more content (at least 10 characters). Type in the Note Editor or upload a file.', isRateLimit: false });
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);
    try {
      if (generationMode === 'quiz') {
        const questions = await generateQuestions(
          contentToUse,
          quizSettings.count,
          quizSettings.type,
          quizSettings.difficulty,
          quizSettings.targetLanguage
        );
        setQuestions(questions);
      } else {
        const lecture = await generateLecture(
          contentToUse,
          quizSettings.difficulty,
          quizSettings.targetLanguage
        );
        setLectures(lecture);
        setActiveTab('lectures');
      }
    } catch (error: any) {
      console.error('Generation failed:', error);

      const isRateLimit = error?.message?.includes('429') ||
        error?.message?.includes('RESOURCE_EXHAUSTED') ||
        error?.status === 'RESOURCE_EXHAUSTED' ||
        error?.status === 429 ||
        JSON.stringify(error).includes('RESOURCE_EXHAUSTED') ||
        JSON.stringify(error).includes('429');

      setGenerationError({
        isRateLimit,
        message: isRateLimit
          ? 'The AI is currently busy. Please wait a moment and try again.'
          : error?.message
            ? `Generation failed: ${error.message}`
            : 'Failed to generate content. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const languages: Language[] = ['French', 'Spanish', 'German', 'Italian', 'Japanese', 'Portuguese', 'Chinese'];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100" id="quiz-settings">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
            <Settings2 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-stone-800">Learning Options</h2>
        </div>
      </div>

      <div className="space-y-8">
        {/* Language Selector */}
        <div>
          <label className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Globe size={14} />
            Target Language
          </label>
          <div className="grid grid-cols-3 gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => updateQuizSettings({ targetLanguage: lang })}
                className={cn(
                  "px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all",
                  quizSettings.targetLanguage === lang
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-stone-50 bg-stone-50 text-stone-500 hover:border-stone-200"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <div>
          <label className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 block">
            Select Mode
          </label>
          <div className="flex gap-3 p-1 bg-stone-50 rounded-2xl">
            <button
              onClick={() => setGenerationMode('quiz')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                generationMode === 'quiz' ? "bg-white text-stone-900 shadow-sm" : "text-stone-400 hover:text-stone-600"
              )}
            >
              <GraduationCap size={18} />
              Quiz
            </button>
            <button
              onClick={() => setGenerationMode('lecture')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                generationMode === 'lecture' ? "bg-white text-stone-900 shadow-sm" : "text-stone-400 hover:text-stone-600"
              )}
            >
              <BookOpen size={18} />
              Lecture
            </button>
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 block">
            Proficiency Level
          </label>
          <div className="flex gap-3">
            {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map((level) => (
              <button
                key={level}
                onClick={() => updateQuizSettings({ difficulty: level })}
                className={cn(
                  "flex-1 px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all flex flex-col items-center gap-1",
                  quizSettings.difficulty === level
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-stone-50 bg-stone-50 text-stone-500 hover:border-stone-200"
                )}
                id={`difficulty-${level}`}
              >
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((star, i) => (
                    <div
                      key={star}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        i <= (level === 'beginner' ? 0 : level === 'intermediate' ? 1 : 2)
                          ? (quizSettings.difficulty === level ? "bg-emerald-500" : "bg-stone-400")
                          : "bg-stone-200"
                      )}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-400 italic">
            {quizSettings.difficulty === 'beginner' && `Focuses on basic ${quizSettings.targetLanguage} vocabulary and simple present tense.`}
            {quizSettings.difficulty === 'intermediate' && `Includes more complex ${quizSettings.targetLanguage} sentence structures and past/future tenses.`}
            {quizSettings.difficulty === 'advanced' && `Advanced ${quizSettings.targetLanguage} grammar, idioms, and nuanced vocabulary.`}
          </p>
        </div>

        {generationMode === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-8"
          >
            {/* Question Count */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-stone-500 uppercase tracking-wider block">
                  Number of Questions
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={quizSettings.count}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) {
                        updateQuizSettings({ count: Math.min(50, Math.max(1, val)) });
                      }
                    }}
                    className="w-16 px-2 py-1 bg-stone-50 border-2 border-stone-100 rounded-lg text-center font-bold text-stone-800 focus:border-emerald-500 focus:outline-none transition-all"
                    id="input-count"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                {[5, 10, 15, 20, 30].map((num) => (
                  <button
                    key={num}
                    onClick={() => updateQuizSettings({ count: num })}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-xs font-bold transition-all border-2",
                      quizSettings.count === num
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-stone-50 bg-stone-50 text-stone-400 hover:border-stone-200"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-stone-400 text-center">
                Maximum 50 questions per session
              </p>
            </div>

            {/* Question Type */}
            <div>
              <label className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 block">
                Question Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['multiple_choice', 'fill_in_the_blank', 'pronunciation', 'mixed'] as QuestionType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => updateQuizSettings({ type })}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all",
                      quizSettings.type === type
                        ? "border-stone-900 bg-stone-50 text-stone-900"
                        : "border-stone-50 bg-stone-50 text-stone-500 hover:border-stone-200"
                    )}
                    id={`type-${type}`}
                  >
                    {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70 group"
          id="btn-generate"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Crafting your {generationMode}...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Generate {generationMode.charAt(0).toUpperCase() + generationMode.slice(1)}</span>
            </>
          )}
        </button>

        {generationError && (
          <div className={cn(
            'rounded-2xl px-4 py-3 text-sm flex flex-col gap-2',
            generationError.isRateLimit
              ? 'bg-amber-50 border border-amber-100 text-amber-800'
              : 'bg-red-50 border border-red-100 text-red-700'
          )}>
            <p className="font-medium leading-snug">{generationError.message}</p>
            <button
              onClick={() => { setGenerationError(null); handleGenerate(); }}
              className={cn(
                'self-start text-xs font-bold px-3 py-1.5 rounded-xl transition-all',
                generationError.isRateLimit
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              )}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSettings;
