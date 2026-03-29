import React from 'react';
import { useAppStore, Flashcard, PracticeItem, GrammarNote } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen, Volume2, Info, ArrowLeft, X, Plus, Check, Globe, Headphones, Download,
  Pause, Languages, Loader2, AlertCircle, PenLine, ChevronDown, ChevronUp,
  Lightbulb, StickyNote, CheckCircle2, Circle, GripHorizontal, Trophy, RotateCcw,
  Eye, EyeOff, Mic, MicOff, Share2, BookMarked, GitBranch, Repeat2, Square, Save
} from 'lucide-react';
import { cn } from '../lib/utils';
import { speakText } from '../services/voiceService';
import { translateWord, generateSectionQuiz } from '../services/aiService';
import { saveLecture } from '../services/dbService';

type TranslationResult = {
  text: string; lang: string; isSourceEnglish?: boolean; speechLang?: string; register?: string; notes?: string;
  alternatives?: { text: string; register: string; notes: string }[];
};

const REGISTER_STYLES: Record<string, string> = {
  formal: 'bg-blue-100 text-blue-700',
  informal: 'bg-amber-100 text-amber-700',
  neutral: 'bg-stone-100 text-stone-500',
};

const RegisterBadge = ({ register }: { register?: string }) => {
  if (!register || register === 'neutral') return null;
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', REGISTER_STYLES[register] ?? REGISTER_STYLES.neutral)}>
      {register}
    </span>
  );
};

// ── Sentence Builder ──────────────────────────────────────────────────────────
const SentenceBuilder = ({ sentence, language, onComplete }: { sentence: string; language: string; onComplete: () => void }) => {
  const words = React.useMemo(() => sentence.split(' ').map((w, i) => ({ id: i, word: w })), [sentence]);
  const shuffled = React.useMemo(() => [...words].sort(() => Math.random() - 0.5), [words]);
  const [available, setAvailable] = React.useState(shuffled);
  const [placed, setPlaced] = React.useState<{ id: number; word: string }[]>([]);
  const [result, setResult] = React.useState<'correct' | 'wrong' | null>(null);

  const place = (item: { id: number; word: string }) => {
    setAvailable(a => a.filter(w => w.id !== item.id));
    setPlaced(p => [...p, item]);
    setResult(null);
  };
  const remove = (item: { id: number; word: string }) => {
    setPlaced(p => p.filter(w => w.id !== item.id));
    setAvailable(a => [...a, item]);
    setResult(null);
  };
  const check = () => {
    const correct = placed.map(w => w.word).join(' ') === sentence;
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setTimeout(onComplete, 1200);
  };
  const reset = () => { setAvailable(shuffled); setPlaced([]); setResult(null); };

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div className="min-h-[52px] bg-white rounded-2xl border-2 border-dashed border-indigo-200 p-3 flex flex-wrap gap-2 items-center"
        style={{ borderColor: result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : undefined }}>
        {placed.length === 0 && <span className="text-stone-300 text-sm italic">Tap words to build the sentence...</span>}
        {placed.map(item => (
          <button key={item.id} onClick={() => remove(item)}
            className="px-3 py-1.5 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors flex items-center gap-1.5">
            {item.word} <X size={11} />
          </button>
        ))}
      </div>
      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        {available.map(item => (
          <button key={item.id} onClick={() => place(item)}
            className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-xl text-sm font-semibold hover:bg-indigo-100 hover:text-indigo-700 transition-colors flex items-center gap-1">
            <GripHorizontal size={11} className="text-stone-300" />{item.word}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={check} disabled={placed.length === 0}
          className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors disabled:opacity-40">
          Check
        </button>
        <button onClick={reset} className="p-2 text-stone-400 hover:text-stone-600 transition-colors"><RotateCcw size={14} /></button>
        {result === 'correct' && <span className="text-emerald-600 text-xs font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Correct!</span>}
        {result === 'wrong' && <span className="text-red-500 text-xs font-bold flex items-center gap-1"><X size={14} /> Try again</span>}
      </div>
    </div>
  );
};

// ── Section Quiz ──────────────────────────────────────────────────────────────
const normalize = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[.,!?;:'"()\-]/g, '')
    .replace(/\s+/g, ' ');

const levenshtein = (a: string, b: string): number => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
};

const gradeAnswer = (input: string, answer: string): 'correct' | 'close' | 'wrong' => {
  const a = normalize(input);
  const b = normalize(answer);
  if (a === b) return 'correct';
  const dist = levenshtein(a, b);
  const threshold = Math.max(2, Math.floor(b.length * 0.15)); // 15% of answer length, min 2
  return dist <= threshold ? 'close' : 'wrong';
};

const SectionQuiz = ({ section, language, onPass, onScore, speak }: {
  section: any; language: string; onPass: () => void; onScore?: (pct: number) => void; speak: (t: string) => void;
}) => {
  const [questions, setQuestions] = React.useState<{ instruction: string; question: string; answer: string; hint?: string }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [input, setInput] = React.useState('');
  const [result, setResult] = React.useState<'correct' | 'close' | 'wrong' | null>(null);
  const [attempts, setAttempts] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const PASS_THRESHOLD = 0.7;
  const MAX_CLOSE_RETRIES = 2;

  React.useEffect(() => {
    setLoading(true);
    setLoadError(false);
    generateSectionQuiz(section, language as any)
      .then(qs => {
        if (qs.length === 0) throw new Error('empty');
        setQuestions(qs);
      })
      .catch(() => {
        // fallback to practice items if AI fails
        setQuestions(section.practice?.slice(0, 5) || []);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, [section.title]);

  const q = questions[idx];

  const submit = () => {
    if (!input.trim()) return;
    const grade = gradeAnswer(input, q.answer);
    if (grade === 'correct') {
      setResult('correct');
      setScore(s => s + 1);
    } else if (grade === 'close' && attempts < MAX_CLOSE_RETRIES) {
      setResult('close');
      setAttempts(a => a + 1);
    } else {
      setResult('wrong');
    }
  };

  const retryClose = () => {
    setInput('');
    setResult(null);
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setInput('');
      setResult(null);
      setAttempts(0);
    }
  };

  const retry = () => { setIdx(0); setInput(''); setResult(null); setDone(false); setScore(0); setAttempts(0); };

  const finalScore = done ? score : 0;
  const passed = done && finalScore / questions.length >= PASS_THRESHOLD;
  React.useEffect(() => {
    if (passed) {
      onPass();
      onScore?.(finalScore / questions.length);
    }
  }, [passed]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-10 text-stone-300">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm font-medium">Generating quiz questions…</span>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p className="text-sm text-stone-400 text-center py-6">No questions available for this section.</p>;
  }

  if (done) {
    const pct = score / questions.length;
    return (
      <div className="text-center py-6 space-y-3">
        {pct >= PASS_THRESHOLD
          ? <Trophy size={36} className="text-amber-400 mx-auto" />
          : <X size={36} className="text-red-400 mx-auto" />}
        <p className="font-bold text-stone-800 text-lg">
          {pct >= PASS_THRESHOLD ? 'Section unlocked!' : 'Not quite there yet'}
        </p>
        <p className="text-stone-500 text-sm">
          You scored <span className="font-bold text-stone-700">{score}/{questions.length}</span> ({Math.round(pct * 100)}%)
          {pct < PASS_THRESHOLD && <> — need 70% to advance</>}
        </p>
        {pct < PASS_THRESHOLD && (
          <button onClick={retry}
            className="mt-2 flex items-center gap-2 mx-auto px-5 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors">
            <RotateCcw size={14} /> Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">{q.instruction}</span>
        <span className="text-[10px] text-stone-300">{idx + 1} / {questions.length}</span>
      </div>
      <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
        <div className="h-full bg-rose-400 rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }} />
      </div>
      <p className="text-stone-800 font-semibold text-base">{q.question}</p>
      {q.hint && (
        <p className="text-xs text-stone-400 italic">
          Hint: fill in the {language} word for <span className="font-bold text-stone-600">"{q.hint}"</span>
        </p>
      )}
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !result && submit()}
          placeholder={q.hint ? `Type the ${language} word for "${q.hint}"…` : 'Your answer…'}
          disabled={result === 'correct' || result === 'wrong'}
          className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-rose-400 transition-colors disabled:opacity-60"
          style={{ borderColor: result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : result === 'close' ? '#f59e0b' : undefined }}
        />
        {!result
          ? <button onClick={submit} className="px-4 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-colors">Check</button>
          : result === 'close'
            ? <button onClick={retryClose} className="px-4 py-2.5 bg-amber-500 text-white rounded-xl text-sm font-bold hover:bg-amber-600 transition-colors">Try again</button>
            : <button onClick={next} className="px-4 py-2.5 bg-stone-800 text-white rounded-xl text-sm font-bold hover:bg-stone-700 transition-colors">
              {idx + 1 >= questions.length ? 'See results' : 'Next →'}
            </button>
        }
      </div>
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={cn('px-4 py-3 rounded-xl flex items-center justify-between gap-3 text-sm font-semibold',
              result === 'correct' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : result === 'close' ? 'bg-amber-50 text-amber-700 border border-amber-100'
                  : 'bg-red-50 text-red-700 border border-red-100')}>
            <div className="flex-1 min-w-0">
              {result === 'correct' && <span>✓ Correct!</span>}
              {result === 'close' && (
                <span>Almost! Check punctuation/spelling. {MAX_CLOSE_RETRIES - attempts + 1 > 0 ? `${MAX_CLOSE_RETRIES - attempts + 1} attempt${MAX_CLOSE_RETRIES - attempts + 1 !== 1 ? 's' : ''} left` : ''}</span>
              )}
              {result === 'wrong' && <span>Answer: {q.answer}</span>}
            </div>
            {result === 'correct' && <button onClick={() => speak(q.answer)} className="text-emerald-500 shrink-0"><Volume2 size={14} /></button>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Vocab Card (needs own component for useState hook) ────────────────────────
const VocabCard = ({ v, currentlySpeaking, speak, handleAddFlashcard, flashcards, language }: {
  v: any; currentlySpeaking: string | null; speak: (t: string) => void;
  handleAddFlashcard: (word: string, trans: string) => void; flashcards: any[]; language: string;
  key?: number;
}) => {
  const [conjOpen, setConjOpen] = React.useState(false);
  const isAdded = flashcards.some(f => f.word === v.word && f.language === language);
  return (
    <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-2">
        <div className="space-y-1">
          <p className="font-bold text-stone-900 text-base">{v.word}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <RegisterBadge register={v.register} />
            {v.partOfSpeech && <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">{v.partOfSpeech}</span>}
            {v.pronunciation && <span className="text-[10px] text-stone-400 font-mono">{v.pronunciation}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => handleAddFlashcard(v.word, v.translations[0])}
            className={cn('p-1.5 rounded-xl transition-colors', isAdded ? 'text-emerald-500' : 'text-stone-300 hover:text-emerald-500 hover:bg-emerald-50')}>
            {isAdded ? <Check size={14} /> : <Plus size={14} />}
          </button>
          <button onClick={() => speak(v.word)} disabled={!!currentlySpeaking}
            className={cn('p-2 rounded-xl transition-colors',
              currentlySpeaking === v.word ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'text-emerald-600 hover:bg-emerald-50')}>
            <Volume2 size={16} />
          </button>
        </div>
      </div>
      {v.notes && <p className="text-[11px] text-stone-400 italic mb-2">{v.notes}</p>}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {v.translations.map((t: string, i: number) => (
          <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">{t}</span>
        ))}
      </div>
      {v.conjugations && v.conjugations.length > 0 && (
        <div>
          <button onClick={() => setConjOpen(o => !o)}
            className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-600 uppercase tracking-wider transition-colors mt-1">
            <GitBranch size={10} />
            {conjOpen ? 'Hide conjugations' : 'Show conjugations'}
            {conjOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
          <AnimatePresence>
            {conjOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-2 rounded-xl overflow-hidden border border-indigo-100">
                  {v.conjugations.map((c: { form: string; value: string }, ci: number) => (
                    <div key={ci} className={cn('flex items-center justify-between px-3 py-1.5 text-xs', ci % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white')}>
                      <span className="text-stone-400 font-medium w-12">{c.form}</span>
                      <span className="font-bold text-stone-800 flex-1 text-center">{c.value}</span>
                      <button onClick={() => speak(c.value)} className="text-indigo-400 hover:text-indigo-600 transition-colors p-0.5">
                        <Volume2 size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
const LectureView = () => {
  const { lectures, setLectures, addFlashcard, flashcards, lectureProgress, markSectionComplete, lectureQuizPassed, markQuizPassed, addSavedLecture, savedLectures, user } = useAppStore() as any;
  const [hoveredVocabId, setHoveredVocabId] = React.useState<string | null>(null);
  const [lockedVocabId, setLockedVocabId] = React.useState<string | null>(null);
  const [currentlySpeaking, setCurrentlySpeaking] = React.useState<string | null>(null);
  const [isLectureSpeaking, setIsLectureSpeaking] = React.useState(false);
  const [selection, setSelection] = React.useState<{ text: string; x: number; y: number; showBelow?: boolean } | null>(null);
  const [translation, setTranslation] = React.useState<TranslationResult | null>(null);
  const [isTranslating, setIsTranslating] = React.useState(false);
  const [translationError, setTranslationError] = React.useState<string | null>(null);
  const [revealedAnswers, setRevealedAnswers] = React.useState<Set<string>>(new Set());
  const [quizSectionIdx, setQuizSectionIdx] = React.useState<number | null>(null);
  const [builderSectionIdx, setBuilderSectionIdx] = React.useState<number | null>(null);
  const [readingMode, setReadingMode] = React.useState(false);
  const [audioModeOpen, setAudioModeOpen] = React.useState(false);
  const [audioIdx, setAudioIdx] = React.useState(0);
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [savedToast, setSavedToast] = React.useState(false);
  const [quizScores, setQuizScores] = React.useState<Record<number, number>>({}); // sIdx → pct
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const sectionRefs = React.useRef<(HTMLElement | null)[]>([]);

  const completedSections = lectures ? (lectureProgress[lectures.id] ?? new Set<number>()) : new Set<number>();
  const quizPassedSections = lectures ? (lectureQuizPassed[lectures.id] ?? new Set<number>()) : new Set<number>();

  // Save progress to Supabase after store update
  const saveProgress = (lectureId: string, newCompleted: Set<number>, newPassed: Set<number>) => {
    if (!user) return;
    import('../services/dbService').then(m =>
      m.saveLectureProgress(user.id, lectureId, [...newCompleted], [...newPassed]).catch(() => { })
    );
  };

  const handleQuizPass = (lectureId: string, sIdx: number) => {
    markSectionComplete(lectureId, sIdx);
    markQuizPassed(lectureId, sIdx);
    const newCompleted = new Set<number>(completedSections); newCompleted.add(sIdx);
    const newPassed = new Set<number>(quizPassedSections); newPassed.add(sIdx);
    saveProgress(lectureId, newCompleted, newPassed);
  };
  const isAlreadySaved = lectures ? savedLectures.some(l => l.id === lectures.id) : false;

  const handleSaveLecture = async () => {
    if (!lectures || isSaving) return;
    setIsSaving(true);
    addSavedLecture(lectures);
    if (user) {
      try { await saveLecture(user.id, lectures); } catch { /* silent */ }
    }
    setIsSaving(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  // A section is unlocked if it's section 0, or the previous section's quiz was passed
  const isSectionUnlocked = (idx: number) => idx === 0 || quizPassedSections.has(idx - 1);

  // Scroll observer — mark section as read when scrolled past
  React.useEffect(() => {
    if (!lectures) return;
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio >= 0.8) markSectionComplete(lectures.id, idx);
      }, { threshold: 0.8 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [lectures]);

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const toolkit = document.getElementById('selection-toolkit');
      if (toolkit?.contains(e.target as Node)) return;
      setLockedVocabId(null);
      setSelection(null);
      setTranslationError(null);
    };
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  if (!lectures) return null;

  const totalSections = lectures.sections.length;
  const completedCount = completedSections.size;
  const progressPct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  const speak = (text: string) => {
    if (currentlySpeaking) return;
    setCurrentlySpeaking(text);
    speakText(text, lectures.language, () => setCurrentlySpeaking(null));
  };

  const handleMouseUp = async () => {
    await new Promise(r => setTimeout(r, 10));
    const sel = window.getSelection();
    const text = sel?.toString().trim() ?? '';
    if (!text) return;
    const range = sel!.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const x = Math.min(Math.max(rect.left + rect.width / 2, 120), window.innerWidth - 120);
    const showBelow = rect.top <= 180;
    const y = showBelow ? rect.bottom + 8 : rect.top - 8;
    setSelection({ text, x, y, showBelow });
    setIsTranslating(true);
    setTranslation(null);
    setTranslationError(null);
    try {
      const result = await translateWord(text, lectures.language);
      setTranslation({ text: result.translation, lang: result.speechLang, isSourceEnglish: result.isSourceEnglish, register: result.register, notes: result.notes, alternatives: result.alternatives });
    } catch (err: any) {
      const status = err?.status ?? err?.error?.status ?? err?.statusCode;
      setTranslationError(status === 429 ? 'AI is busy — please wait a moment.' : 'Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAddFlashcard = (word: string, trans: string) => {
    if (flashcards.some(f => f.word === word && f.language === lectures.language)) return;
    const card: Flashcard = { id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, word, translation: trans, language: lectures.language, nextReview: new Date().toISOString(), lastReviewed: null };
    addFlashcard(card);
    if (user) {
      import('../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
    }
  };

  const addFlashcardFromSelection = (selectedText: string, result: TranslationResult) => {
    const frenchWord = result.isSourceEnglish ? result.text : selectedText;
    const englishMeaning = result.isSourceEnglish ? selectedText : result.text;
    handleAddFlashcard(frenchWord, englishMeaning);
  };

  const handleListenToLecture = () => {
    if (isLectureSpeaking) { window.speechSynthesis.cancel(); setIsLectureSpeaking(false); return; }
    const fullText = lectures.pronunciation?.length
      ? lectures.pronunciation.map(p => p.text).join('. ')
      : lectures.sections.map(s => s.examples.map(e => e.target).join('. ')).join('. ');
    setIsLectureSpeaking(true);
    speakText(fullText, lectures.language, () => setIsLectureSpeaking(false));
  };

  const toggleAnswer = (key: string) => {
    setRevealedAnswers(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  // HoverableText — shows translate tooltip on hover for target-language text
  const HoverableText = ({ text, className }: { text: string; className?: string }) => {
    const [hovered, setHovered] = React.useState(false);
    const [pos, setPos] = React.useState<{ x: number; y: number; showBelow: boolean } | null>(null);
    const [localTranslation, setLocalTranslation] = React.useState<TranslationResult | null>(null);
    const [localLoading, setLocalLoading] = React.useState(false);
    const [localError, setLocalError] = React.useState<string | null>(null);
    const ref = React.useRef<HTMLSpanElement>(null);
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleEnter = () => {
      timerRef.current = setTimeout(async () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = Math.min(Math.max(rect.left + rect.width / 2, 140), window.innerWidth - 140);
        const showBelow = rect.top <= 200;
        const y = showBelow ? rect.bottom + 8 : rect.top - 8;
        setPos({ x, y, showBelow });
        setHovered(true);
        if (!localTranslation) {
          setLocalLoading(true);
          setLocalError(null);
          try {
            const result = await translateWord(text, lectures!.language);
            setLocalTranslation({ text: result.translation, lang: result.speechLang, register: result.register, notes: result.notes, alternatives: result.alternatives });
          } catch {
            setLocalError('Translation failed.');
          } finally {
            setLocalLoading(false);
          }
        }
      }, 500);
    };

    const handleLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setHovered(false);
    };

    if (!lectures) return <span className={className}>{text}</span>;

    return (
      <span ref={ref} className={cn('relative cursor-help border-b border-dashed border-stone-300 hover:border-emerald-400 transition-colors', className)}
        onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        {text}
        {hovered && pos && (
          <div className="fixed z-[300] -translate-x-1/2 pointer-events-none"
            style={{ left: pos.x, ...(pos.showBelow ? { top: pos.y } : { top: pos.y - 160 }) }}>
            <div className="bg-[#1a202c] text-white rounded-2xl shadow-2xl overflow-hidden min-w-[220px] max-w-[300px] border border-white/10">
              <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex items-center gap-2">
                <Languages size={12} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Translation</span>
              </div>
              <div className="p-3 space-y-2">
                {localLoading ? (
                  <div className="flex items-center gap-2 text-emerald-400"><Loader2 size={12} className="animate-spin" /><span className="text-xs italic">Translating...</span></div>
                ) : localError ? (
                  <span className="text-red-400 text-xs">{localError}</span>
                ) : localTranslation ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold text-sm">{localTranslation.text}</span>
                      <RegisterBadge register={localTranslation.register} />
                    </div>
                    {localTranslation.notes && <p className="text-[11px] text-stone-400 italic">{localTranslation.notes}</p>}
                  </div>
                ) : null}
              </div>
              {pos.showBelow
                ? <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-b-[#1a202c]" />
                : <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#1a202c]" />}
            </div>
          </div>
        )}
      </span>
    );
  };

  const TextWithTooltips = ({ text, vocabulary, sectionIdx }: { text: string; vocabulary: any[]; sectionIdx: number }) => (
    <>
      {text.split(/(\s+)/).map((part, pIdx) => {
        if (part.trim() === '') return <span key={pIdx}>{part}</span>;
        const clean = part.replace(/[.,!?;:()"«»]/g, '').toLowerCase();
        const vocab = vocabulary.find(v =>
          v.phrase ? v.phrase.some((pw: string) => pw.toLowerCase() === clean) : v.word.toLowerCase() === clean
        );
        if (!vocab) return <span key={pIdx}>{part}</span>;
        const vocabId = `${sectionIdx}-${vocab.word}`;
        const isVisible = hoveredVocabId === vocabId || lockedVocabId === vocabId;
        const isAdded = flashcards.some(f => f.word === vocab.word && f.language === lectures!.language);
        return (
          <span key={pIdx} className="relative group inline-block"
            onMouseEnter={() => setHoveredVocabId(vocabId)}
            onMouseLeave={() => setHoveredVocabId(null)}
            onClick={e => { e.stopPropagation(); setLockedVocabId(lockedVocabId === vocabId ? null : vocabId); }}>
            <span className={cn('font-semibold border-b-2 cursor-help transition-all px-0.5 rounded',
              isVisible ? 'text-emerald-700 border-emerald-500 bg-emerald-100/50' : 'text-stone-800 border-stone-300 hover:border-emerald-400'
            )}>{part}</span>
            <div onClick={e => e.stopPropagation()} className={cn(
              'absolute bottom-full left-1/2 -translate-x-1/2 mb-3 min-w-[240px] bg-[#1a202c] text-white rounded-2xl overflow-hidden text-sm transition-all duration-200 z-[100] shadow-2xl origin-bottom',
              isVisible ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
            )}>
              <div className="px-4 py-2 border-b border-white/10 bg-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white">{vocab.word}</span>
                  <RegisterBadge register={vocab.register} />
                  <button onClick={e => { e.stopPropagation(); speak(vocab.word); }} className="p-1 hover:bg-white/10 rounded-lg text-emerald-400"><Volume2 size={13} /></button>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={e => { e.stopPropagation(); handleAddFlashcard(vocab.word, vocab.translations[0]); }}
                    className={cn('p-1 rounded-lg transition-colors', isAdded ? 'text-emerald-400' : 'text-white/40 hover:text-white hover:bg-white/10')}>
                    {isAdded ? <Check size={13} /> : <Plus size={13} />}
                  </button>
                  {lockedVocabId === vocabId && <button onClick={() => setLockedVocabId(null)} className="text-white/40 hover:text-white"><X size={13} /></button>}
                </div>
              </div>
              {vocab.notes && <p className="px-4 pt-2 text-[11px] text-stone-400 italic">{vocab.notes}</p>}
              <div className="flex flex-col">
                {vocab.translations.map((t: string, i: number) => (
                  <button key={i} onClick={e => { e.stopPropagation(); speak(vocab.word); }}
                    className="px-4 py-2.5 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-none flex items-center justify-between gap-4">
                    <span className="font-medium text-white">{t}</span>
                    <Volume2 size={13} className={cn('transition-colors', currentlySpeaking === vocab.word ? 'text-emerald-400 animate-pulse' : 'text-white/30')} />
                  </button>
                ))}
              </div>
              {vocab.pronunciation && (
                <div className="px-4 py-2 bg-black/20 text-[10px] text-stone-400 font-mono tracking-wider uppercase">{vocab.pronunciation}</div>
              )}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-[8px] border-transparent border-t-[#1a202c]" />
            </div>
          </span>
        );
      })}
    </>
  );

  return (
    <div className="relative" onMouseUp={handleMouseUp}>
      {/* ── Sticky progress bar — floats as you scroll ── */}
      <div className="sticky top-4 z-[150] mb-8 bg-white rounded-2xl border border-stone-100 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-stone-500">Lecture Progress</span>
          <span className="text-xs font-bold text-emerald-600">{progressPct}% — {completedCount}/{totalSections} sections</span>
        </div>
        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${progressPct}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="flex gap-1.5 mt-3">
          {lectures.sections.map((_, i) => (
            <div key={i} className={cn('flex-1 h-1 rounded-full transition-all',
              quizPassedSections.has(i) ? 'bg-emerald-500' : completedSections.has(i) ? 'bg-emerald-200' : 'bg-stone-100')} />
          ))}
        </div>
      </div>

      {/* Page content — padded below sticky bar */}
      <div className="max-w-4xl mx-auto w-full px-4 pb-8 py-8">

        {/* Back + Notes — restored original layout */}
        <div className="flex items-center justify-between mb-8 pt-4">
          <button onClick={() => setLectures(null)} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleSaveLecture} disabled={isAlreadySaved || isSaving}
              className={cn('flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all border',
                isAlreadySaved
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200 cursor-default'
                  : 'bg-white text-stone-500 border-stone-100 hover:border-emerald-300 hover:text-emerald-600')}>
              {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              {isAlreadySaved ? 'Saved' : 'Save Lecture'}
            </button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          {/* Header */}
          <header className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-stone-900 tracking-tight">{lectures.title}</h1>
            <div className="flex items-center justify-center gap-2 text-stone-400 font-medium uppercase tracking-widest text-xs">
              <Globe size={14} />{lectures.language}
              {lectures.level && (
                <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: lectures.level === 'Beginner' ? 'rgba(16,185,129,0.1)' : lectures.level === 'Intermediate' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                    color: lectures.level === 'Beginner' ? '#059669' : lectures.level === 'Intermediate' ? '#d97706' : '#dc2626',
                  }}>
                  {lectures.level}
                </span>
              )}
            </div>
            <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full" />
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <button onClick={handleListenToLecture}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all shadow-sm text-sm',
                  isLectureSpeaking ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100')}>
                {isLectureSpeaking ? <Pause size={16} /> : <Headphones size={16} />}
                {isLectureSpeaking ? 'Stop' : `Listen in ${lectures.language}`}
              </button>
              <button onClick={() => setReadingMode(r => !r)}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all shadow-sm text-sm border',
                  readingMode ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200')}>
                {readingMode ? <EyeOff size={16} /> : <Eye size={16} />}
                {readingMode ? 'Exit Reading Mode' : 'Reading Mode'}
              </button>
              <button onClick={() => setAudioModeOpen(o => !o)}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all shadow-sm text-sm border',
                  audioModeOpen ? 'bg-violet-50 text-violet-600 border-violet-200' : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200')}>
                <Mic size={16} />Audio Mode
              </button>
              <button onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-50 transition-all shadow-sm text-sm">
                <Download size={16} />Export PDF
              </button>
            </div>

            {/* ── Audio Pronunciation Mode Panel ── */}
            <AnimatePresence>
              {audioModeOpen && (() => {
                const allExamples = lectures.sections.flatMap(s => s.examples);
                const currentEx = allExamples[audioIdx] ?? null;
                const startRecording = async () => {
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const mr = new MediaRecorder(stream);
                    mediaRecorderRef.current = mr;
                    mr.start();
                    setIsRecording(true);
                    mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); setIsRecording(false); };
                  } catch { setIsRecording(false); }
                };
                const stopRecording = () => { mediaRecorderRef.current?.stop(); setIsRecording(false); };
                const playCurrentEx = () => {
                  if (!currentEx || audioPlaying) return;
                  setAudioPlaying(true);
                  speakText(currentEx.target, lectures.language, () => setAudioPlaying(false));
                };
                return (
                  <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    className="mt-6 mx-auto max-w-lg bg-white rounded-3xl border border-violet-100 shadow-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-violet-50 flex items-center justify-between"
                      style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%)' }}>
                      <div className="flex items-center gap-2">
                        <Headphones size={16} className="text-violet-500" />
                        <span className="font-bold text-violet-700 text-sm">Audio Pronunciation Mode</span>
                      </div>
                      <span className="text-xs text-violet-400">{audioIdx + 1} / {allExamples.length}</span>
                    </div>
                    {currentEx ? (
                      <div className="p-6 space-y-4">
                        <div className="text-center space-y-2">
                          <p className="text-xl font-bold text-stone-900">{currentEx.target}</p>
                          <p className="text-sm text-stone-400">{currentEx.english}</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => setAudioIdx(i => Math.max(0, i - 1))} disabled={audioIdx === 0}
                            className="p-2.5 rounded-xl bg-stone-100 text-stone-500 hover:bg-stone-200 disabled:opacity-30 transition-colors">
                            <ArrowLeft size={16} />
                          </button>
                          <button onClick={playCurrentEx} disabled={audioPlaying}
                            className={cn('p-4 rounded-2xl font-bold transition-all', audioPlaying ? 'bg-violet-100 text-violet-600 animate-pulse' : 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg')}>
                            {audioPlaying ? <Pause size={22} /> : <Volume2 size={22} />}
                          </button>
                          <button onClick={() => setAudioIdx(i => Math.min(allExamples.length - 1, i + 1))} disabled={audioIdx >= allExamples.length - 1}
                            className="p-2.5 rounded-xl bg-stone-100 text-stone-500 hover:bg-stone-200 disabled:opacity-30 transition-colors">
                            <ArrowLeft size={16} className="rotate-180" />
                          </button>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-2 border-t border-stone-50">
                          <button onClick={isRecording ? stopRecording : startRecording}
                            className={cn('flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all',
                              isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-stone-100 text-stone-600 hover:bg-stone-200')}>
                            {isRecording ? <><Square size={14} /> Stop Recording</> : <><Mic size={14} /> Record Yourself</>}
                          </button>
                        </div>
                        {isRecording && (
                          <div className="flex items-center justify-center gap-2 text-red-500 text-xs font-bold">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />Recording...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-stone-400 text-sm">No examples available</div>
                    )}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </header>

          {/* Sections */}
          <div className="space-y-16">
            {lectures.sections.map((section, sIdx) => {
              const unlocked = isSectionUnlocked(sIdx);
              const quizPassed = quizPassedSections.has(sIdx);
              return (
                <section key={sIdx} ref={el => { sectionRefs.current[sIdx] = el; }} className="space-y-8 relative">
                  {/* Section heading with completion badge */}
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-stone-800 border-l-4 border-emerald-500 pl-4 flex-1">{section.title}</h2>
                    {quizPassed
                      ? <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                      : completedSections.has(sIdx)
                        ? <Circle size={20} className="text-amber-300 flex-shrink-0" />
                        : <Circle size={20} className="text-stone-200 flex-shrink-0" />}
                  </div>

                  {/* ── LOCKED OVERLAY ── */}
                  {!unlocked && (
                    <div className="absolute inset-0 z-10 rounded-3xl flex flex-col items-center justify-center gap-4"
                      style={{ background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(8px)' }}>
                      <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div className="text-center px-6">
                        <p className="font-bold text-stone-700 text-base">Section {sIdx + 1} is locked</p>
                        <p className="text-stone-400 text-sm mt-1">Score 70%+ on the Section {sIdx} quiz to unlock</p>
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  <div className="prose prose-stone max-w-none leading-relaxed text-stone-600 text-lg">
                    <TextWithTooltips text={section.text} vocabulary={section.vocabulary} sectionIdx={sIdx} />
                  </div>

                  {/* ── Grammar Notes ── */}
                  {!readingMode && section.grammarNotes?.length > 0 && (
                    <div className="space-y-3">
                      {section.grammarNotes.map((g: GrammarNote, gIdx: number) => (
                        <div key={gIdx} className="flex gap-3 p-4 rounded-2xl border border-amber-100"
                          style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)' }}>
                          <div className="w-8 h-8 bg-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Lightbulb size={14} className="text-amber-700" />
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Grammar Rule</p>
                            <p className="font-bold text-amber-900 text-sm">{g.rule}</p>
                            <p className="text-amber-800 text-sm leading-relaxed">{g.explanation}</p>
                            {g.example && (
                              <div className="mt-2 flex items-center gap-2">
                                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold italic">{g.example}</span>
                                <button onClick={() => speak(g.example)} className="text-amber-500 hover:text-amber-700"><Volume2 size={13} /></button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Examples */}
                  {section.examples?.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest flex items-center gap-2">
                        <Volume2 size={14} />Example Sentences
                      </h3>
                      <div className="space-y-3">
                        {section.examples.map((ex, exIdx) => (
                          <div key={exIdx} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between gap-4 group hover:border-emerald-200 transition-colors">
                            <div className="space-y-1 flex-1">
                              <div className="text-lg font-semibold text-stone-900">
                                <HoverableText text={ex.target} />
                              </div>
                              <div className="text-sm text-stone-400">{ex.english}</div>
                            </div>
                            <button onClick={() => speak(ex.target)} disabled={!!currentlySpeaking}
                              className={cn('p-3 rounded-xl transition-all flex-shrink-0 group-hover:scale-110',
                                currentlySpeaking === ex.target ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'bg-stone-50 text-stone-400 hover:bg-emerald-50 hover:text-emerald-600')}>
                              <Volume2 size={20} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vocabulary */}
                  {!readingMode && section.vocabulary.length > 0 && (
                    <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
                      <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Info size={14} />Vocabulary
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.vocabulary.map((v, vIdx) => (
                          <VocabCard key={vIdx} v={v} currentlySpeaking={currentlySpeaking} speak={speak}
                            handleAddFlashcard={handleAddFlashcard} flashcards={flashcards} language={lectures.language} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Practice */}
                  {!readingMode && section.practice?.length > 0 && (
                    <div className="rounded-3xl overflow-hidden border border-indigo-100"
                      style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)' }}>
                      <div className="px-8 py-5 border-b border-indigo-100 flex items-center gap-2">
                        <PenLine size={14} className="text-indigo-500" />
                        <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Practice</h3>
                      </div>
                      <div className="p-8 space-y-4">
                        {section.practice.map((p: PracticeItem, pIdx: number) => {
                          const key = `${sIdx}-${pIdx}`;
                          const revealed = revealedAnswers.has(key);
                          return (
                            <div key={pIdx} className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-1">{p.instruction}</p>
                              <p className="text-stone-800 font-semibold text-base mb-3">
                                <HoverableText text={p.question} />
                              </p>
                              <button onClick={() => toggleAnswer(key)}
                                className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
                                {revealed ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                {revealed ? 'Hide answer' : 'Show answer'}
                              </button>
                              <AnimatePresence>
                                {revealed && (
                                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                                    className="mt-3 px-4 py-2.5 rounded-xl flex items-center justify-between gap-3"
                                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                                    <span className="text-emerald-700 font-semibold text-sm">
                                      <HoverableText text={p.answer} />
                                    </span>
                                    <button onClick={() => speak(p.answer)} className="text-emerald-500 hover:text-emerald-700 flex-shrink-0">
                                      <Volume2 size={14} />
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Sentence Builder ── */}
                  {!readingMode && section.examples?.length > 0 && (
                    <div className="rounded-3xl overflow-hidden border border-violet-100"
                      style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 100%)' }}>
                      <div className="px-8 py-5 border-b border-violet-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripHorizontal size={14} className="text-violet-500" />
                          <h3 className="text-sm font-bold text-violet-500 uppercase tracking-widest">Sentence Builder</h3>
                        </div>
                        <button onClick={() => setBuilderSectionIdx(builderSectionIdx === sIdx ? null : sIdx)}
                          className="text-xs font-bold text-violet-400 hover:text-violet-600 transition-colors">
                          {builderSectionIdx === sIdx ? 'Hide' : 'Try it'}
                        </button>
                      </div>
                      <AnimatePresence>
                        {builderSectionIdx === sIdx && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-8">
                              <p className="text-xs text-stone-400 mb-4">Arrange the words to form the correct sentence:</p>
                              <SentenceBuilder
                                sentence={section.examples[0].target}
                                language={lectures.language}
                                onComplete={() => markSectionComplete(lectures.id, sIdx)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* ── Section Quiz ── */}
                  {!readingMode && section.practice?.length >= 2 && (
                    <div className="rounded-3xl overflow-hidden border border-rose-100"
                      style={{ background: 'linear-gradient(135deg, #fff1f2 0%, #fef2f2 100%)' }}>
                      <div className="px-8 py-5 border-b border-rose-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy size={14} className="text-rose-500" />
                          <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest">Section Quiz</h3>
                        </div>
                        <button onClick={() => setQuizSectionIdx(quizSectionIdx === sIdx ? null : sIdx)}
                          className="text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors">
                          {quizSectionIdx === sIdx ? 'Hide' : 'Start quiz'}
                        </button>
                      </div>
                      <AnimatePresence>
                        {quizSectionIdx === sIdx && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="p-8">
                              <SectionQuiz
                                section={section}
                                language={lectures.language}
                                onPass={() => handleQuizPass(lectures.id, sIdx)}
                                onScore={(pct) => setQuizScores(prev => ({ ...prev, [sIdx]: pct }))}
                                speak={speak}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* ── Spaced Repetition Reminder ── */}
          {(() => {
            const allVocab = lectures.sections.flatMap(s => s.vocabulary);
            const dueVocab = allVocab.filter(v => !flashcards.some(f => f.word === v.word && f.language === lectures.language));
            if (dueVocab.length === 0) return null;
            return (
              <div className="rounded-3xl overflow-hidden border border-amber-100"
                style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef9c3 100%)' }}>
                <div className="px-8 py-5 border-b border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Repeat2 size={16} className="text-amber-500" />
                    <h3 className="text-sm font-bold text-amber-600 uppercase tracking-widest">Spaced Repetition</h3>
                  </div>
                  <span className="text-xs font-bold text-amber-400">{dueVocab.length} words not yet saved</span>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-amber-700">These vocabulary words from this lecture aren't in your flashcards yet. Add them to review later.</p>
                  <div className="flex flex-wrap gap-2">
                    {dueVocab.map((v, i) => (
                      <button key={i} onClick={() => handleAddFlashcard(v.word, v.translations[0])}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-xl text-xs font-bold hover:bg-amber-50 transition-colors">
                        <Plus size={11} />{v.word}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => dueVocab.forEach(v => handleAddFlashcard(v.word, v.translations[0]))}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-2xl text-sm font-bold hover:bg-amber-600 transition-colors shadow-sm">
                    <BookMarked size={15} />Add all {dueVocab.length} words to Flashcards
                  </button>
                </div>
              </div>
            );
          })()}

          <div className="pt-12 border-t border-stone-100 text-center space-y-6">
            {/* ── Lecture Summary Card ── */}
            {(() => {
              const allVocab = lectures.sections.flatMap(s => s.vocabulary);
              const allGrammar = lectures.sections.flatMap(s => s.grammarNotes ?? []);
              const scoreValues = Object.values(quizScores) as number[];
              const avgScore = scoreValues.length > 0 ? Math.round((scoreValues.reduce((a: number, b: number) => a + b, 0) / scoreValues.length) * 100) : null;
              const summaryText = `📚 ${lectures.title}\n🌍 ${lectures.language} — ${lectures.level}\n📖 ${lectures.sections.length} sections | ${allVocab.length} vocab words | ${allGrammar.length} grammar rules${avgScore !== null ? `\n🏆 Quiz average: ${avgScore}%` : ''}\n\nGenerated with LinguaLearn`;
              return (
                <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-100 shadow-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-stone-50 flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)' }}>
                    <Trophy size={16} className="text-emerald-500" />
                    <span className="font-bold text-emerald-700 text-sm">Lecture Summary</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-stone-50 rounded-2xl">
                        <p className="text-2xl font-black text-stone-800">{allVocab.length}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">Vocab Words</p>
                      </div>
                      <div className="text-center p-3 bg-stone-50 rounded-2xl">
                        <p className="text-2xl font-black text-stone-800">{allGrammar.length}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">Grammar Rules</p>
                      </div>
                      <div className="text-center p-3 bg-stone-50 rounded-2xl">
                        <p className="text-2xl font-black text-stone-800">{avgScore !== null ? `${avgScore}%` : '—'}</p>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">Quiz Avg</p>
                      </div>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(summaryText); }}
                      className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-800 text-white rounded-2xl text-sm font-bold hover:bg-stone-700 transition-colors">
                      <Share2 size={14} />Copy Summary to Clipboard
                    </button>
                  </div>
                </div>
              );
            })()}

            <button onClick={() => setLectures(null)}
              className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-xl">
              Finish Lecture
            </button>
          </div>
        </motion.div>

        {/* ── Notes Sidebar ── */}
        {/* ── Saved Toast ── */}
        <AnimatePresence>
          {savedToast && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-2xl shadow-xl text-sm font-bold">
              <Check size={16} /> Lecture saved to your library
            </motion.div>
          )}
        </AnimatePresence>
        {/* ── Selection Toolkit ── */}
        {selection && (
          <div id="selection-toolkit" className="fixed z-[200] -translate-x-1/2 pointer-events-auto"
            style={{
              left: selection.x,
              ...(selection.showBelow
                ? { top: Math.min(selection.y, window.innerHeight - 420) }
                : { top: Math.max(selection.y - 400, 8) }),
            }}
            onClick={e => e.stopPropagation()}>
            <div className="bg-[#1a202c] text-white rounded-2xl shadow-2xl overflow-hidden min-w-[260px] max-w-[320px] border border-white/10"
              style={{ maxHeight: 'min(420px, 80vh)' }}>
              <div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Languages size={13} className="text-emerald-400" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Translate</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelection(null)} className="text-white/40 hover:text-white transition-colors"><X size={13} /></button>
                </div>
              </div>
              <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 'calc(min(420px, 80vh) - 40px)' }}>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Selected</p>
                  <p className="text-white font-medium text-sm">{selection.text}</p>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">
                    {translation ? (translation.isSourceEnglish ? `In ${lectures.language}` : 'English meaning') : 'Translation'}
                  </p>
                  {isTranslating ? (
                    <div className="flex items-center gap-2 text-emerald-400"><Loader2 size={13} className="animate-spin" /><span className="text-sm italic">Translating...</span></div>
                  ) : translationError ? (
                    <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={13} className="shrink-0" /><span>{translationError}</span></div>
                  ) : translation ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-emerald-400 font-bold text-base">{translation.text}</span>
                          <RegisterBadge register={translation.register} />
                        </div>
                        <button onClick={() => speakText(translation.isSourceEnglish ? translation.text : selection.text, lectures.language)}
                          className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-400">
                          <Volume2 size={14} />
                        </button>
                      </div>
                      {translation.notes && <p className="text-[11px] text-stone-400 italic">{translation.notes}</p>}
                      {translation.alternatives && translation.alternatives.length > 0 && (
                        <div className="mt-2 space-y-1.5 border-t border-white/5 pt-2">
                          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Also</p>
                          {translation.alternatives.map((alt, i) => (
                            <div key={i} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-white font-medium text-sm">{alt.text}</span>
                                <RegisterBadge register={alt.register} />
                              </div>
                              <div className="flex items-center gap-1">
                                {alt.notes && <span className="text-[10px] text-stone-500 italic">{alt.notes}</span>}
                                <button onClick={() => speakText(alt.text, lectures.language)} className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-emerald-400"><Volume2 size={12} /></button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                {translation && (() => {
                  const frenchWord = translation.isSourceEnglish ? translation.text : selection.text;
                  const alreadyAdded = flashcards.some(f => f.word === frenchWord && f.language === lectures.language);
                  return (
                    <button onClick={() => addFlashcardFromSelection(selection.text, translation)} disabled={alreadyAdded}
                      className={cn('w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2',
                        alreadyAdded ? 'bg-emerald-900/40 text-emerald-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 text-white')}>
                      <Check size={13} />
                      {alreadyAdded ? 'Added to Flashcards' : 'Add to Flashcards'}
                    </button>
                  );
                })()}
              </div>
              {selection.showBelow
                ? <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-b-[#1a202c]" />
                : <div className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-[#1a202c]" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureView;
