import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore, Question, QuizResult, Difficulty, Flashcard } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2, XCircle, ChevronRight, RotateCcw, Mic, Volume2,
  Loader2, Trophy, Star, BookOpen, TrendingUp, TrendingDown,
  Bookmark, BookmarkCheck, Zap, Lightbulb, RefreshCw, Share2, Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { speakText } from '../services/voiceService';
import { generateAnswerExplanation } from '../services/aiService';

// ── constants & helpers ───────────────────────────────────────────────────────
const DIFFICULTY_ORDER: Difficulty[] = ['beginner', 'intermediate', 'advanced'];
const TIMER_SECONDS = 30;

// Point system
const POINTS_PER_CORRECT: Record<string, number> = { beginner: 10, intermediate: 20, advanced: 30 };
const POINTS_TIME_BONUS = (timeLeft: number) => Math.floor(timeLeft / 5); // up to +6 pts for speed
const HINT_COST = 15; // costs 15 pts to use a hint
const STREAK_BONUS = (streak: number) => streak >= 3 ? (streak - 2) * 5 : 0; // +5 per streak above 2

const cleanText = (t: string) =>
  t.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').replace(/\s{2,}/g, ' ');

const LANG_CODES: Record<string, string> = {
  French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
  Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN',
};

// personal best
const PB_KEY = 'quiz_personal_bests';
type PBMap = Record<string, number>;
const loadPBs = (): PBMap => { try { return JSON.parse(localStorage.getItem(PB_KEY) || '{}'); } catch { return {}; } };
const savePB = (lang: string, diff: string, pct: number) => {
  const map = loadPBs(); const key = `${lang}_${diff}`;
  if ((map[key] ?? 0) < pct) { map[key] = pct; localStorage.setItem(PB_KEY, JSON.stringify(map)); }
};
const getPB = (lang: string, diff: string): number => loadPBs()[`${lang}_${diff}`] ?? 0;

// bookmarks
const BM_KEY = 'quiz_bookmarks';
const loadBookmarks = (): string[] => { try { return JSON.parse(localStorage.getItem(BM_KEY) || '[]'); } catch { return []; } };
const saveBookmarks = (ids: string[]) => localStorage.setItem(BM_KEY, JSON.stringify(ids));

// share — encode quiz directly in URL so it works across devices
const SHARE_KEY_PREFIX = 'quiz_share_';
const saveSharedQuiz = (qs: Question[]): string => {
  try {
    const payload = JSON.stringify(qs.map(q => ({
      question: q.question, translation: q.translation,
      type: q.type, options: q.options, answer: q.answer,
    })));
    return btoa(unescape(encodeURIComponent(payload)));
  } catch { return ''; }
};
export const loadSharedQuiz = (code: string): Question[] | null => {
  try {
    const payload = decodeURIComponent(escape(atob(code)));
    const arr = JSON.parse(payload);
    if (!Array.isArray(arr)) return null;
    return arr.map((q: any, i: number) => ({
      id: `shared-${i}-${Date.now()}`,
      question: q.question || '',
      translation: q.translation || '',
      type: q.type || 'multiple_choice',
      options: Array.isArray(q.options) ? q.options : [],
      answer: q.answer || '',
    }));
  } catch { return null; }
};

const QuizView = () => {
  const {
    questions, setQuestions, currentQuestionIndex, setCurrentQuestionIndex,
    resetQuiz, user, quizSettings, updateQuizSettings, addQuizResult,
    addFlashcard, flashcards, addPoints, spendPoints, totalPoints,
  } = useAppStore();

  // answer
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [fillValue, setFillValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // speech
  const [isListening, setIsListening] = useState(false);
  const [speechResult, setSpeechResult] = useState('');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  // progress
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  // explanation
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  // audio mode
  const [audioMode, setAudioMode] = useState(false);
  // personal best
  const [prevBest, setPrevBest] = useState(0);
  const [newRecord, setNewRecord] = useState(false);
  // review
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewAll, setReviewAll] = useState(false);
  // difficulty suggestion
  const [suggestedDifficulty, setSuggestedDifficulty] = useState<Difficulty | null>(null);

  // ── feature 1: timer ──────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastEarnedRef = useRef<{ correct: boolean; earned: number }>({ correct: false, earned: 0 });

  // ── points system ─────────────────────────────────────────────────────────
  const [points, setPoints] = useState(0);
  const [pointsDelta, setPointsDelta] = useState<number | null>(null); // flash animation
  const [streak, setStreak] = useState(0);
  const [showStreakBurst, setShowStreakBurst] = useState(false);

  // ── hints (cost points) ───────────────────────────────────────────────────
  const [hintsLeft, setHintsLeft] = useState(3);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [revealedLetters, setRevealedLetters] = useState(0);

  // ── feature 5: bookmarks ─────────────────────────────────────────────────
  const [bookmarked, setBookmarked] = useState<string[]>([]);

  // ── feature 4: retry wrong ────────────────────────────────────────────────
  const [retryMode, setRetryMode] = useState(false);

  // ── feature 9: share ─────────────────────────────────────────────────────
  const [shareCopied, setShareCopied] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setPrevBest(getPB(quizSettings.targetLanguage, quizSettings.difficulty));
    setBookmarked(loadBookmarks());
  }, []);

  // timer tick
  useEffect(() => {
    if (!timerActive || isCorrect !== null || isFinished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // auto-submit as wrong
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [currentQuestionIndex, timerActive, isCorrect, isFinished]);

  // reset timer on question change
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
    setTimerActive(true);
    clearInterval(timerRef.current!);
  }, [currentQuestionIndex]);

  // audio mode: auto-speak question
  useEffect(() => {
    if (audioMode && currentQuestion) speakText(currentQuestion.question, quizSettings.targetLanguage);
  }, [currentQuestionIndex, audioMode]);

  if (!currentQuestion && !isFinished) {
    return (
      <div className="max-w-2xl mx-auto w-full py-12 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">No questions generated.</h2>
        <button onClick={resetQuiz} className="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">Go Back</button>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isBookmarked = currentQuestion ? bookmarked.includes(currentQuestion.id) : false;
  const timerPct = (timeLeft / TIMER_SECONDS) * 100;

  const handleTimeUp = () => {
    setTimerActive(false);
    setIsCorrect(false);
    const updated = [...questions];
    updated[currentQuestionIndex] = { ...questions[currentQuestionIndex], userAnswer: '(Time up)', isCorrect: false };
    setQuestions(updated);
    setStreak(0);
    lastEarnedRef.current = { correct: false, earned: 0 };
    fetchExplanation(questions[currentQuestionIndex], '');
  };

  const fetchExplanation = async (q: Question, userAns: string) => {
    setLoadingExplanation(true); setExplanation(null);
    try {
      const exp = await generateAnswerExplanation(q.question, q.answer, userAns, quizSettings.targetLanguage, quizSettings.difficulty);
      setExplanation(exp);
    } catch { setExplanation(null); }
    finally { setLoadingExplanation(false); }
  };

  const handleCheck = () => {
    clearInterval(timerRef.current!);
    setTimerActive(false);
    const answer = currentQuestion.type === 'multiple_choice' ? selectedOption
      : currentQuestion.type === 'fill_in_the_blank' ? fillValue : speechResult;

    const correct = cleanText(answer || '') === cleanText(currentQuestion.answer);
    setIsCorrect(correct);

    let earnedThisQuestion = 0;
    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const base = POINTS_PER_CORRECT[quizSettings.difficulty] ?? 10;
      const timeBonus = POINTS_TIME_BONUS(timeLeft);
      const streakBonus = STREAK_BONUS(newStreak);
      earnedThisQuestion = base + timeBonus + streakBonus;
      setPoints(p => p + earnedThisQuestion);
      addPoints(earnedThisQuestion); // persist to store in real time
      setPointsDelta(earnedThisQuestion);
      setTimeout(() => setPointsDelta(null), 1200);
      setScore(s => s + 1);
      if (newStreak >= 3) { setShowStreakBurst(true); setTimeout(() => setShowStreakBurst(false), 1200); }
    } else {
      setStreak(0);
      setPointsDelta(0);
      setTimeout(() => setPointsDelta(null), 800);
    }

    const updated = [...questions];
    updated[currentQuestionIndex] = { ...currentQuestion, userAnswer: answer || '', isCorrect: correct };
    setQuestions(updated);
    fetchExplanation(currentQuestion, answer || '');
    // store for handleNext to use (avoids stale closure)
    lastEarnedRef.current = { correct, earned: earnedThisQuestion };
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const { correct: lastCorrect, earned: lastEarned } = lastEarnedRef.current;
      const finalScore = score + (lastCorrect ? 1 : 0);
      const finalPoints = points + lastEarned;
      const pct = Math.round((finalScore / questions.length) * 100);
      const pb = getPB(quizSettings.targetLanguage, quizSettings.difficulty);
      if (pct > pb) setNewRecord(true);
      setPrevBest(pb);
      savePB(quizSettings.targetLanguage, quizSettings.difficulty, pct);
      const curIdx = DIFFICULTY_ORDER.indexOf(quizSettings.difficulty);
      if (pct >= 80 && curIdx < DIFFICULTY_ORDER.length - 1) setSuggestedDifficulty(DIFFICULTY_ORDER[curIdx + 1]);
      else if (pct < 50 && curIdx > 0) setSuggestedDifficulty(DIFFICULTY_ORDER[curIdx - 1]);
      setIsFinished(true);
      const result: QuizResult = { id: `res-${Date.now()}`, date: new Date().toISOString(), score: finalScore, total: questions.length, difficulty: quizSettings.difficulty, language: quizSettings.targetLanguage };
      addQuizResult(result);
      if (user) import('../services/dbService').then(m => {
        m.saveQuizResult(user.id, finalScore, questions.length, quizSettings.difficulty, quizSettings.type).catch(() => { });
        m.upsertLeaderboardEntry(
          user.id,
          user.displayName || user.email?.split('@')[0] || 'Anonymous',
          user.avatarUrl || null,
          quizSettings.targetLanguage,
          quizSettings.difficulty,
          totalPoints + lastEarned  // use global total so leaderboard matches dashboard
        ).catch(() => { });
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); setFillValue(''); setIsCorrect(null);
      setSpeechResult(''); setSpeechError(null); setShowManualEntry(false);
      setExplanation(null); setEliminatedOptions([]); setRevealedLetters(0);
    }
  };

  // hints — cost points to use
  const useHint = () => {
    if (points < HINT_COST) return; // can't afford
    setPoints(p => p - HINT_COST);
    spendPoints(HINT_COST); // deduct from store in real time
    setPointsDelta(-HINT_COST);
    setTimeout(() => setPointsDelta(null), 800);
    if (currentQuestion.type === 'multiple_choice' && currentQuestion.options) {
      const wrong = currentQuestion.options.filter(o => o !== currentQuestion.answer && !eliminatedOptions.includes(o));
      if (wrong.length > 0) setEliminatedOptions(e => [...e, wrong[Math.floor(Math.random() * wrong.length)]]);
    } else if (currentQuestion.type === 'fill_in_the_blank') {
      setRevealedLetters(r => Math.min(r + 1, currentQuestion.answer.length));
    }
  };

  // feature 5: bookmark
  const toggleBookmark = () => {
    if (!currentQuestion) return;
    const next = bookmarked.includes(currentQuestion.id)
      ? bookmarked.filter(id => id !== currentQuestion.id)
      : [...bookmarked, currentQuestion.id];
    setBookmarked(next);
    saveBookmarks(next);
  };

  // feature 10: add wrong answers to flashcards
  const addWrongToFlashcards = () => {
    const wrong = questions.filter(q => !q.isCorrect && q.answer);
    wrong.forEach(q => {
      const word = q.answer;
      if (flashcards.some(f => f.word === word && f.language === quizSettings.targetLanguage)) return;
      const card: Flashcard = {
        id: `card-quiz-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        word, translation: q.translation || q.question,
        language: quizSettings.targetLanguage,
        nextReview: new Date().toISOString(), lastReviewed: null,
      };
      addFlashcard(card);
      if (user) import('../services/dbService').then(m => m.upsertFlashcard(user.id, card).catch(() => { }));
    });
  };

  // feature 9: share
  const handleShare = () => {
    const code = saveSharedQuiz(questions);
    const url = `${window.location.origin}${window.location.pathname}?quiz=${code}`;
    navigator.clipboard.writeText(url).then(() => { setShareCopied(true); setTimeout(() => setShareCopied(false), 2000); });
  };

  const startSpeech = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { alert('Speech recognition not supported. Please try Chrome or Edge.'); return; }
    const recognition = new SR();
    recognition.lang = LANG_CODES[quizSettings.targetLanguage] || 'fr-FR';
    recognition.continuous = false; recognition.interimResults = false;
    recognition.onstart = () => { setIsListening(true); setSpeechResult(''); setSpeechError(null); };
    recognition.onresult = (e: any) => { setSpeechResult(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = (e: any) => {
      const msgs: Record<string, string> = { 'not-allowed': 'Microphone access denied.', 'no-speech': 'No speech detected.', 'network': 'Network error.' };
      setSpeechError(msgs[e.error] || `Error: ${e.error}`); setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    try { recognition.start(); } catch { setIsListening(false); }
  };

  const speak = (text: string) => speakText(text, quizSettings.targetLanguage);
  const handleSkip = () => {
    clearInterval(timerRef.current!);
    setTimerActive(false);
    setIsCorrect(false);
    setStreak(0);
    lastEarnedRef.current = { correct: false, earned: 0 };
    handleNext();
  };

  // ── FINISHED SCREEN ───────────────────────────────────────────────────────
  if (isFinished) {
    const finalScore = score;
    const pct = Math.round((finalScore / questions.length) * 100);
    const finalPoints = points;
    const wrongQuestions = questions.filter(q => !q.isCorrect);
    const reviewList = reviewAll ? questions : wrongQuestions;
    const alreadyInDeck = wrongQuestions.filter(q => flashcards.some(f => f.word === q.answer && f.language === quizSettings.targetLanguage));
    const canAddToFlashcards = wrongQuestions.length > alreadyInDeck.length;

    return (
      <div className="max-w-2xl mx-auto w-full py-12" id="quiz-finished">
        <AnimatePresence mode="wait">
          {!reviewMode ? (
            <motion.div key="summary" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-10 shadow-sm border border-stone-100 text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-emerald-600" />
                </div>
                {newRecord && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute -top-2 -right-2 bg-amber-400 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={9} fill="white" /> NEW BEST
                  </motion.div>
                )}
              </div>
              <h2 className="text-3xl font-bold text-stone-800 mb-1">Quiz Completed!</h2>
              <p className="text-stone-400 mb-4">Great job practicing your {quizSettings.targetLanguage}.</p>

              {/* Points display */}
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center gap-2 bg-amber-400 text-white px-6 py-3 rounded-2xl text-2xl font-black mb-6 shadow-lg shadow-amber-200">
                <Zap size={22} fill="white" /> {finalPoints} pts
              </motion.div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-stone-50 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Correct</p>
                  <p className="text-3xl font-bold text-stone-800">{finalScore}/{questions.length}</p>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Accuracy</p>
                  <p className="text-3xl font-bold text-stone-800">{pct}%</p>
                </div>
                <div className="bg-stone-50 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Best</p>
                  <p className="text-3xl font-bold text-stone-800">{Math.max(pct, prevBest)}%</p>
                </div>
              </div>

              {suggestedDifficulty && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={cn('flex items-center gap-3 p-4 rounded-2xl mb-6 text-left border',
                    pct >= 80 ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100')}>
                  {pct >= 80 ? <TrendingUp size={18} className="text-emerald-600 shrink-0" /> : <TrendingDown size={18} className="text-amber-600 shrink-0" />}
                  <div className="flex-1">
                    <p className={cn('text-sm font-bold', pct >= 80 ? 'text-emerald-800' : 'text-amber-800')}>
                      {pct >= 80 ? 'Ready to level up!' : 'Keep practicing!'}
                    </p>
                    <p className={cn('text-xs', pct >= 80 ? 'text-emerald-600' : 'text-amber-600')}>
                      {pct >= 80 ? `You scored ${pct}% — try ${suggestedDifficulty} next.` : `You scored ${pct}% — ${suggestedDifficulty} might suit you better.`}
                    </p>
                  </div>
                  <button onClick={() => { updateQuizSettings({ difficulty: suggestedDifficulty }); resetQuiz(); }}
                    className={cn('text-xs font-bold px-3 py-1.5 rounded-xl transition-colors', pct >= 80 ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-amber-400 text-white hover:bg-amber-500')}>
                    Switch
                  </button>
                </motion.div>
              )}

              <div className="space-y-3">
                {/* feature 4: retry wrong */}
                {wrongQuestions.length > 0 && (
                  <button onClick={() => {
                    setQuestions(wrongQuestions.map(q => ({ ...q, userAnswer: undefined, isCorrect: undefined })));
                    setCurrentQuestionIndex(0);
                    setScore(0); setPoints(0); setStreak(0);
                    setSelectedOption(null); setFillValue(''); setSpeechResult('');
                    setIsCorrect(null); setExplanation(null);
                    setEliminatedOptions([]); setRevealedLetters(0);
                    lastEarnedRef.current = { correct: false, earned: 0 };
                    setIsFinished(false); setRetryMode(true);
                  }}
                    className="w-full py-3.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-2xl font-bold hover:bg-amber-100 transition-all flex items-center justify-center gap-2">
                    <RefreshCw size={16} /> Retry Wrong Answers ({wrongQuestions.length})
                  </button>
                )}
                <button onClick={() => { setReviewMode(true); setReviewAll(true); }}
                  className="w-full py-3.5 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2">
                  <BookOpen size={16} /> Review All Questions
                </button>
                {wrongQuestions.length > 0 && (
                  <button onClick={() => { setReviewMode(true); setReviewAll(false); }}
                    className="w-full py-3.5 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2">
                    <XCircle size={16} /> Review Wrong Answers ({wrongQuestions.length})
                  </button>
                )}
                {/* feature 10: add to flashcards */}
                {canAddToFlashcards && (
                  <button onClick={addWrongToFlashcards}
                    className="w-full py-3.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl font-bold hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
                    <Layers size={16} /> Add Wrong Answers to Flashcards
                  </button>
                )}
                {/* feature 9: share */}
                <button onClick={handleShare}
                  className="w-full py-3.5 bg-stone-50 text-stone-500 border border-stone-100 rounded-2xl font-bold hover:bg-stone-100 transition-all flex items-center justify-center gap-2">
                  <Share2 size={16} /> {shareCopied ? 'Link Copied!' : 'Share This Quiz'}
                </button>
                <button onClick={resetQuiz}
                  className="w-full py-3.5 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100">
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
                <h3 className="font-bold text-stone-800">{reviewAll ? 'All Questions' : 'Wrong Answers'}</h3>
                <button onClick={() => setReviewMode(false)} className="text-sm text-stone-400 hover:text-stone-600 font-medium">← Back</button>
              </div>
              <div className="divide-y divide-stone-50">
                {reviewList.map((q, idx) => (
                  <div key={idx} className={cn('p-5 space-y-3', q.isCorrect ? 'bg-white' : 'bg-red-50/40')}>
                    <div className="flex items-start gap-2">
                      {q.isCorrect ? <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" /> : <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />}
                      <p className="font-semibold text-stone-800 text-sm flex-1">{q.question}</p>
                      {bookmarked.includes(q.id) && <BookmarkCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />}
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs ml-6">
                      <div>
                        <p className="text-stone-400 uppercase font-bold tracking-wider mb-0.5">Your answer</p>
                        <p className={cn('font-medium', q.isCorrect ? 'text-emerald-600' : 'text-red-500')}>{q.userAnswer || '(Skipped)'}</p>
                      </div>
                      <div>
                        <p className="text-stone-400 uppercase font-bold tracking-wider mb-0.5">Correct answer</p>
                        <p className="text-emerald-600 font-medium">{q.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-stone-100">
                <button onClick={resetQuiz} className="w-full py-3.5 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all">
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (!currentQuestion) return null;

  // ── QUESTION SCREEN ───────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto w-full py-8" id="quiz-container">
      {/* Header row */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">
            {retryMode ? 'Retry' : 'Question'} {currentQuestionIndex + 1}/{questions.length}
          </span>
          {streak >= 2 && (
            <motion.div key={streak} initial={{ scale: 0.7 }} animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-amber-400 text-white text-xs font-black px-2.5 py-1 rounded-full">
              <Zap size={11} fill="white" /> {streak}x streak
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Live total points — same source as dashboard & leaderboard */}
          <div className="relative">
            <motion.div key={totalPoints} initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="flex items-center gap-1.5 bg-amber-400 text-white font-black text-sm px-3 py-1.5 rounded-xl shadow-sm shadow-amber-200">
              <Zap size={13} fill="white" />
              <span>{totalPoints.toLocaleString()} pts</span>
            </motion.div>
            <AnimatePresence>
              {pointsDelta !== null && pointsDelta !== 0 && (
                <motion.div
                  key={`delta-${totalPoints}`}
                  initial={{ opacity: 1, y: 0 }} animate={{ opacity: 0, y: -28 }}
                  exit={{ opacity: 0 }} transition={{ duration: 1 }}
                  className={cn('absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-black whitespace-nowrap',
                    pointsDelta > 0 ? 'text-emerald-500' : 'text-red-500')}>
                  {pointsDelta > 0 ? `+${pointsDelta}` : pointsDelta}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => { setAudioMode(a => !a); }}
            className={cn('flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors',
              audioMode ? 'bg-emerald-500 text-white border-emerald-500' : 'border-stone-200 text-stone-400 hover:border-stone-400')}>
            <Volume2 size={13} /> Audio
          </button>
          {/* feature 5: bookmark */}
          <button onClick={toggleBookmark}
            className={cn('p-1.5 rounded-xl border transition-colors', isBookmarked ? 'bg-amber-50 border-amber-200 text-amber-500' : 'border-stone-200 text-stone-400 hover:border-stone-400')}
            title="Bookmark question">
            {isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>
          <button onClick={resetQuiz} className="text-stone-400 hover:text-stone-600 transition-colors" id="btn-reset-quiz">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* feature 1: timer bar */}
      <div className="w-full h-1.5 bg-stone-100 rounded-full mb-1 overflow-hidden">
        <motion.div className={cn('h-full rounded-full transition-colors', timeLeft <= 10 ? 'bg-red-400' : timeLeft <= 20 ? 'bg-amber-400' : 'bg-emerald-500')}
          animate={{ width: `${timerPct}%` }} transition={{ duration: 0.5 }} />
      </div>
      <div className="flex justify-between items-center mb-5">
        <div className={cn('text-xs font-bold tabular-nums', timeLeft <= 10 ? 'text-red-500' : 'text-stone-400')}>
          {timeLeft}s
        </div>
        {/* hint button — costs points */}
        {isCorrect === null && (
          <button onClick={useHint} disabled={points < HINT_COST}
            className={cn('flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl border transition-colors',
              points >= HINT_COST ? 'border-amber-200 text-amber-600 hover:bg-amber-50' : 'border-stone-100 text-stone-300 cursor-not-allowed')}>
            <Lightbulb size={12} /> Hint <span className="opacity-60">(-{HINT_COST}pts)</span>
          </button>
        )}
      </div>

      {/* streak burst overlay */}
      <AnimatePresence>
        {showStreakBurst && (
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.2, y: -20 }}
            className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none">
            <div className="bg-amber-400 text-white text-2xl font-black px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-3">
              <Zap size={28} fill="white" /> {streak}x Streak!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">

          {/* Question text */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-xs font-semibold text-stone-500 mb-4 uppercase tracking-wide">
              {currentQuestion.type.replace(/_/g, ' ')}
            </div>
            <div className="flex items-start gap-3">
              <h2 className="text-2xl font-semibold text-stone-800 leading-tight flex-1">{currentQuestion.question}</h2>
              <button onClick={() => speak(currentQuestion.question)}
                className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 hover:text-emerald-600 transition-colors shrink-0 mt-0.5">
                <Volume2 size={18} />
              </button>
            </div>
            {currentQuestion.translation && quizSettings.difficulty !== 'advanced' && (
              <p className="mt-2 text-stone-500 italic text-sm">{currentQuestion.translation}</p>
            )}            {/* feature 3: hint reveal for fill-in-the-blank */}
            {currentQuestion.type === 'fill_in_the_blank' && revealedLetters > 0 && (
              <p className="mt-2 text-xs text-amber-600 font-bold">
                Hint: starts with "{currentQuestion.answer.slice(0, revealedLetters)}…"
              </p>
            )}
          </div>

          {/* Answer inputs */}
          <div className="space-y-4 mb-8">
            {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map((option, idx) => {
              const eliminated = eliminatedOptions.includes(option);
              return (
                <button key={idx}
                  onClick={() => !eliminated && isCorrect === null && setSelectedOption(option)}
                  disabled={isCorrect !== null || eliminated}
                  className={cn(
                    'w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between',
                    eliminated ? 'opacity-30 border-stone-100 text-stone-300 line-through cursor-not-allowed'
                      : isCorrect !== null && option === currentQuestion.answer ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : isCorrect !== null && option === selectedOption && !isCorrect ? 'border-red-400 bg-red-50 text-red-800'
                          : selectedOption === option ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-stone-100 hover:border-stone-200 text-stone-600'
                  )} id={`option-${idx}`}>
                  <span className="font-medium">{option}</span>
                  <div className={cn('w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                    selectedOption === option ? 'border-emerald-500 bg-emerald-500' : 'border-stone-200')}>
                    {selectedOption === option && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              );
            })}

            {currentQuestion.type === 'fill_in_the_blank' && (
              <input type="text" value={fillValue} onChange={e => setFillValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && isCorrect === null && fillValue && handleCheck()}
                placeholder="Type your answer…"
                className="w-full p-4 rounded-2xl border-2 border-stone-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium"
                id="input-fill-blank" />
            )}

            {currentQuestion.type === 'pronunciation' && (
              <div className="flex flex-col items-center gap-6 py-4">
                <button onClick={() => speak(currentQuestion.answer)} className="flex items-center gap-2 text-emerald-600 font-medium hover:underline">
                  <Volume2 size={20} /> Listen to pronunciation
                </button>
                {!showManualEntry ? (
                  <>
                    <button onClick={startSpeech} disabled={isListening || isCorrect !== null}
                      className={cn('w-24 h-24 rounded-full flex items-center justify-center transition-all relative',
                        isListening ? 'bg-emerald-100' : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200',
                        isCorrect !== null && 'opacity-50 cursor-not-allowed')}>
                      {isListening ? <><Loader2 className="w-10 h-10 text-emerald-500 animate-spin" /><div className="absolute inset-0 rounded-full border-4 border-emerald-500 animate-ping opacity-20" /></> : <Mic className="w-10 h-10 text-white" />}
                    </button>
                    {speechError && (
                      <div className="text-center p-3 bg-red-50 text-red-600 rounded-xl text-sm max-w-xs">
                        <p className="font-semibold mb-1">Microphone Issue</p><p>{speechError}</p>
                        <button onClick={() => setShowManualEntry(true)} className="mt-2 text-xs font-bold uppercase tracking-wider hover:underline">Try typing instead</button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full space-y-3">
                    <p className="text-sm text-stone-400 text-center">Type what you would have said:</p>
                    <input type="text" value={speechResult} onChange={e => setSpeechResult(e.target.value)}
                      placeholder={`Type the ${quizSettings.targetLanguage} phrase…`}
                      className="w-full p-4 rounded-2xl border-2 border-stone-100 focus:border-emerald-500 focus:outline-none transition-all text-lg font-medium" />
                    <button onClick={() => setShowManualEntry(false)} className="w-full text-xs text-stone-400 hover:text-stone-600 transition-colors">Switch back to microphone</button>
                  </div>
                )}
                {speechResult && !showManualEntry && (
                  <div className="text-center"><p className="text-sm text-stone-400 mb-1">You said:</p><p className="text-xl font-semibold text-stone-800 italic">"{speechResult}"</p></div>
                )}
                {isCorrect === null && <button onClick={handleSkip} className="text-sm text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-4">Skip this question</button>}
              </div>
            )}
          </div>

          {/* Check / feedback */}
          <div className="flex flex-col gap-4">
            {isCorrect === null ? (
              <button onClick={handleCheck}
                disabled={(currentQuestion.type === 'multiple_choice' && !selectedOption) || (currentQuestion.type === 'fill_in_the_blank' && !fillValue) || (currentQuestion.type === 'pronunciation' && !speechResult)}
                className="w-full py-4 bg-stone-800 text-white rounded-2xl font-semibold hover:bg-stone-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                id="btn-check">
                Check Answer
              </button>
            ) : (
              <div className="space-y-3 animate-in zoom-in duration-300">
                <div className={cn('p-4 rounded-2xl flex items-center gap-3', isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800')}>
                  {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                  <span className="font-semibold">
                    {isCorrect ? `Correct!${streak >= 3 ? ` 🔥 ${streak} in a row!` : ''}` : `Incorrect. The answer is: ${currentQuestion.answer}`}
                  </span>
                </div>
                {loadingExplanation && <div className="flex items-center gap-2 text-xs text-stone-400"><Loader2 size={12} className="animate-spin" /> Loading explanation…</div>}
                {explanation && !loadingExplanation && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-sm text-stone-600 leading-relaxed">
                    💡 {explanation}
                  </motion.div>
                )}
                <button onClick={handleNext}
                  className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-semibold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                  id="btn-next">
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'} <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizView;
