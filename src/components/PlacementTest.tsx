import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generateQuestions } from '../services/aiService';
import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Question, Difficulty } from '../store/useAppStore';

const ROUNDS: { difficulty: Difficulty; label: string; blurb: string }[] = [
  { difficulty: 'beginner', label: 'Warm-up', blurb: 'Everyday words and basics' },
  { difficulty: 'intermediate', label: 'Core', blurb: 'Grammar and common phrases' },
  { difficulty: 'advanced', label: 'Challenge', blurb: 'Nuance, register, tricky grammar' },
];
const QUESTIONS_PER_ROUND = 3;

// 3-round placement test → sets the app difficulty to beginner/intermediate/advanced.
export default function PlacementTest({ onFinish, onSkip }: {
  onFinish: (difficultyScore: number, difficulty: Difficulty) => void;
  onSkip: () => void;
}) {
  const { quizSettings } = useAppStore();
  const language = quizSettings.targetLanguage;

  const [round, setRound] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [roundCorrect, setRoundCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  // language-appropriate topic focus — Chinese/Japanese work nothing like European languages
  const topicsFor = (lang: string) => {
    if (lang === 'Chinese' || lang === 'Japanese') {
      return `Core ${lang} placement test topics: everyday vocabulary (greetings, food, family, travel, numbers, time), essential grammar (word order SVO, particles and measure words${lang === 'Chinese' ? ', 了/过/着 aspect, 吗 questions, measure words 个/本/张' : ', particles は/が/を/に, verb forms, counters'}), pronunciation in ${lang === 'Chinese' ? 'pinyin and tones' : 'romaji/kana'}, and practical phrases for real conversations.`;
    }
    return `Core ${lang} placement test topics: everyday vocabulary (greetings, food, family, travel, numbers, time), essential grammar (articles and gender, present and past tense verb conjugation, plurals, prepositions, pronouns), and practical phrases for real conversations.`;
  };

  const loadRound = async (r: number) => {
    setLoading(true);
    setLoadError(false);
    setQuestions([]);
    setQIdx(0);
    setSelected(null);
    setRoundCorrect(0);
    try {
      const qs = await generateQuestions(
        topicsFor(language),
        QUESTIONS_PER_ROUND, 'multiple_choice', ROUNDS[r].difficulty, language
      );
      setQuestions(qs.slice(0, QUESTIONS_PER_ROUND));
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRound(0); }, []);

  const answer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    const correct = opt === questions[qIdx]?.answer;
    if (correct) { setTotalCorrect(c => c + 1); setRoundCorrect(c => c + 1); }
  };

  const next = () => {
    if (qIdx + 1 < questions.length) {
      setQIdx(i => i + 1);
      setSelected(null);
      return;
    }
    // round complete
    if (round + 1 < ROUNDS.length) {
      setRound(r => r + 1);
      loadRound(round + 1);
    } else {
      // map score to difficulty: 0-2/9 beginner, 3-5/9 intermediate, 6+/9 advanced
      const score = totalCorrect;
      const difficulty: Difficulty = score <= 2 ? 'beginner' : score <= 5 ? 'intermediate' : 'advanced';
      const difficultyScore = score <= 2 ? 25 : score <= 5 ? 50 : 80;
      setFinished(true);
      setTimeout(() => onFinish(difficultyScore, difficulty), 1800);
    }
  };

  const q = questions[qIdx];
  const meta = ROUNDS[Math.min(round, ROUNDS.length - 1)];

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto">
      <div className="max-w-lg mx-auto px-5 py-10">
        {/* header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={26} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-1">Quick placement test</h1>
          <p className="text-sm text-stone-400">
            {finished
              ? 'Setting up your personalized level…'
              : `3 short rounds in ${language} — answer honestly, no pressure.`}
          </p>
        </div>

        {finished ? (
          <div className="bg-white rounded-3xl border border-stone-100 p-8 text-center">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <p className="text-lg font-black text-stone-900 mb-1">You got {totalCorrect} of {ROUNDS.length * QUESTIONS_PER_ROUND} right</p>
            <p className="text-sm text-stone-400">Your lessons, quizzes and tutor are being tuned to match.</p>
            <Loader2 size={18} className="animate-spin text-stone-300 mx-auto mt-4" />
          </div>
        ) : loading ? (
          <div className="bg-white rounded-3xl border border-stone-100 p-10 text-center">
            <Loader2 size={24} className="animate-spin text-emerald-400 mx-auto mb-3" />
            <p className="text-sm text-stone-400">Preparing {meta.label.toLowerCase()} questions…</p>
          </div>
        ) : loadError ? (
          <div className="bg-white rounded-3xl border border-stone-100 p-8 text-center space-y-4">
            <p className="text-sm text-stone-500">The AI is busy right now.</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => loadRound(round)}
                className="px-4 py-2.5 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors">
                Try again
              </button>
              <button onClick={onSkip}
                className="px-4 py-2.5 bg-stone-100 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-200 transition-colors">
                Skip test
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* progress */}
            <div className="flex items-center gap-2 mb-4">
              {ROUNDS.map((r, i) => (
                <div key={r.difficulty} className={cn('h-1.5 flex-1 rounded-full transition-colors',
                  i < round ? 'bg-emerald-400' : i === round ? 'bg-emerald-300' : 'bg-stone-200')} />
              ))}
            </div>
            <div className="flex items-center justify-between mb-2 px-1">
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em]">{meta.label} — {meta.blurb}</p>
              <p className="text-[10px] font-bold text-stone-300">Round {round + 1}/{ROUNDS.length}</p>
            </div>

            {/* question */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6 shadow-sm">
              <p className="text-lg font-bold text-stone-900 leading-snug mb-1">{q?.question}</p>
              {q?.translation && <p className="text-xs text-stone-400 mb-5">{q.translation}</p>}
              <div className="space-y-2 mt-4">
                {(q?.options || []).map((opt, i) => {
                  const isAnswer = opt === q?.answer;
                  const isPicked = opt === selected;
                  return (
                    <button key={i} onClick={() => answer(opt)}
                      className={cn('w-full text-left px-4 py-3 rounded-2xl border text-sm font-medium transition-all',
                        selected
                          ? isAnswer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                            : isPicked ? 'bg-red-50 border-red-200 text-red-500'
                              : 'bg-white border-stone-100 text-stone-400'
                          : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50')}>
                      <span className="flex items-center justify-between gap-2">
                        {opt}
                        {selected && isAnswer && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                        {selected && isPicked && !isAnswer && <XCircle size={16} className="text-red-400 shrink-0" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selected && (
              <button onClick={next}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                {qIdx + 1 < questions.length ? 'Next question' : round + 1 < ROUNDS.length ? 'Continue' : 'See my level'}
                <ArrowRight size={15} />
              </button>
            )}
          </>
        )}

        {/* skip */}
        {!finished && (
          <button onClick={onSkip}
            className="w-full mt-6 text-center text-xs font-bold text-stone-300 hover:text-stone-500 transition-colors">
            Skip — I'll set my level later
          </button>
        )}
      </div>
    </div>
  );
}
