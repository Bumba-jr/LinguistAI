import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import {
  TrendingUp, TrendingDown, Award, BookOpen, BarChart2, MessageSquare,
  Layers, Pin, AlertTriangle, Zap, Target,
  Globe, CheckCircle2, XCircle, Clock,
  ArrowUpRight, ArrowDownRight, Minus, Calendar, Star,
  Plus, Volume2, Search, Trophy,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, RadarChart,
  PolarGrid, PolarAngleAxis, Radar, PieChart, Pie,
} from 'recharts';
import { cn } from '../lib/utils';

// ── helpers ────────────────────────────────────────────────────────────────
const DIFF_COLOR = (s: number) => s < 34 ? '#10b981' : s < 67 ? '#f59e0b' : '#ef4444';
const DIFF_LABEL = (s: number) => s < 34 ? 'Beginner' : s < 67 ? 'Intermediate' : 'Advanced';
const ERR_COLORS = ['#ef4444', '#f59e0b', '#6366f1', '#10b981', '#8b5cf6', '#0ea5e9', '#ec4899', '#14b8a6'];
const ERR_DESC: Record<string, string> = {
  'Verb conjugation': 'Mistakes with verb tenses, forms, or conjugation patterns (e.g. using infinitive instead of past tense).',
  'Gender agreement': 'Using the wrong masculine/feminine form for nouns, adjectives, or articles.',
  'Word order': 'Placing words in the wrong position in a sentence (e.g. adjective after noun when it should be before).',
  'Articles': 'Incorrect use of definite (le/la/les) or indefinite (un/une) articles, or missing them entirely.',
  'Prepositions': 'Using the wrong preposition (à, de, en, dans, etc.) or omitting one where required.',
  'Plurals': 'Errors forming plural nouns or adjectives, or forgetting to make agreement in plural.',
  'Spelling/Accents': 'Misspelled words or missing/wrong accent marks (é, è, ê, ç, etc.).',
  'Grammar': 'General grammar mistakes that don\'t fit a specific category — review the examples below for details.',
};
const LANG_COLORS: Record<string, string> = {
  French: '#6366f1', Spanish: '#f59e0b', German: '#0ea5e9',
  Italian: '#ec4899', Japanese: '#ef4444', Portuguese: '#10b981', Chinese: '#8b5cf6',
};

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

// ── sub-components ─────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, delta, icon: Icon, color, bg, delay = 0, onClick }: {
  label: string; value: string | number; sub?: string; delta?: number | null;
  icon: React.ElementType; color: string; bg: string; delay?: number; onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn("rounded-3xl relative overflow-hidden", onClick && "cursor-pointer")}
      whileHover={{ scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18, delay }}
      style={{ padding: '1.5px', background: hovered ? `conic-gradient(from 0deg, #f1f5f9, #f1f5f9)` : '#f1f5f9' }}
    >
      {/* spinning border — only visible on hover */}
      {hovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            inset: '-100%',
            background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${color}cc 60%, ${color} 70%, transparent 85%)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <div className="bg-white rounded-[22px] p-5 flex flex-col gap-3 relative overflow-hidden z-10 h-full">
        {/* primary orb — slow drift top-right */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 80, height: 80, right: -20, top: -20, background: `radial-gradient(circle at 40% 40%, ${color}22, transparent 70%)`, filter: 'blur(8px)' }}
          animate={{ x: [0, 6, -4, 0], y: [0, -5, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* secondary orb — bottom-left, smaller */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 44, height: 44, left: -10, bottom: -10, background: `radial-gradient(circle at 40% 40%, ${color}18, transparent 70%)`, filter: 'blur(6px)' }}
          animate={{ x: [0, -4, 5, 0], y: [0, 4, -3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
            <Icon size={17} style={{ color }} />
          </div>
          {delta !== null && delta !== undefined && (
            <span className={cn('flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-xl',
              delta > 0 ? 'bg-emerald-50 text-emerald-600' : delta < 0 ? 'bg-red-50 text-red-500' : 'bg-stone-100 text-stone-400')}>
              {delta > 0 ? <ArrowUpRight size={10} /> : delta < 0 ? <ArrowDownRight size={10} /> : <Minus size={10} />}
              {Math.abs(delta)}%
            </span>
          )}
        </div>
        <div>
          <p className="text-2xl font-black text-stone-900 leading-none">{value}</p>
          <p className="text-xs text-stone-400 mt-1 font-medium">{label}</p>
          {sub && <p className="text-[10px] text-stone-300 mt-0.5">{sub}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">{children}</p>
);

const AnalyticsView = () => {
  const { quizHistory, chatSessions, flashcards, difficultyScore, savedPhrases, mistakeLog, addFlashcard } = useAppStore();
  const [tab, setTab] = useState<'overview' | 'progress' | 'errors' | 'vocab' | 'quiz'>('overview');
  const [sessSort, setSessSort] = useState<'date' | 'words' | 'msgs'>('date');
  const [sessFilter, setSessFilter] = useState<string>('all');
  const [showWordsModal, setShowWordsModal] = useState(false);
  const [expandedError, setExpandedError] = useState<string | null>(null);
  const [corrSearch, setCorrSearch] = useState('');
  const [corrSort, setCorrSort] = useState<'date' | 'category' | 'scenario'>('date');
  const [vocabSearch, setVocabSearch] = useState('');
  const [vocabLang, setVocabLang] = useState('all');
  const [vocabSort, setVocabSort] = useState<'az' | 'za' | 'newest' | 'lang'>('newest');
  const [phraseSearch, setPhraseSearch] = useState('');
  const [phraseSort, setPhraseSort] = useState<'newest' | 'az' | 'lang'>('newest');
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const now = new Date();

  // ── core stats ────────────────────────────────────────────────────────
  const totalWords = chatSessions.reduce((a, s) => a + s.wordsLearned, 0);
  const totalCorr = chatSessions.reduce((a, s) => a + s.correctionsCount, 0);
  const totalMsgs = chatSessions.reduce((a, s) => a + s.messages.length, 0);

  // ── all learned words (deduplicated) ─────────────────────────────────
  const allLearnedWords: { word: string; translation: string; language: string; date: string }[] = [];
  const seenWords = new Set<string>();
  chatSessions.forEach(s => {
    s.messages.forEach(m => {
      (m.newWords || []).forEach(w => {
        const key = w.word.toLowerCase();
        if (!seenWords.has(key)) {
          seenWords.add(key);
          allLearnedWords.push({ word: w.word, translation: w.translation, language: s.language, date: s.date });
        }
      });
    });
  });
  // ── all corrections from sessions (ground truth) ─────────────────────
  const allCorrections: { original: string; corrected: string; explanation: string; scenario: string; language: string; date: string }[] = [];
  chatSessions.forEach(s => {
    s.messages.forEach(m => {
      if (m.correction) {
        allCorrections.push({ ...m.correction, scenario: s.scenarioLabel, language: s.language, date: s.date });
      }
    });
  });
  allCorrections.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // ── live category counts from sessions ───────────────────────────────
  const liveCatMap: Record<string, number> = {};
  allCorrections.forEach(c => {
    const e = c.explanation.toLowerCase();
    let cat = 'Grammar';
    if (e.includes('conjugat') || e.includes('tense') || e.includes('verb')) cat = 'Verb conjugation';
    else if (e.includes('gender') || e.includes('masculine') || e.includes('feminine')) cat = 'Gender agreement';
    else if (e.includes('word order') || e.includes('order')) cat = 'Word order';
    else if (e.includes('article')) cat = 'Articles';
    else if (e.includes('preposition')) cat = 'Prepositions';
    else if (e.includes('plural')) cat = 'Plurals';
    else if (e.includes('accent') || e.includes('spelling')) cat = 'Spelling/Accents';
    liveCatMap[cat] = (liveCatMap[cat] || 0) + 1;
  });
  const liveTopErrors = Object.entries(liveCatMap).sort((a, b) => b[1] - a[1]).map(([category, count]) => ({ category, count }));
  const liveMaxErr = liveTopErrors[0]?.count || 1;

  const getCorrCat = (explanation: string) => {
    const e = explanation.toLowerCase();
    if (e.includes('conjugat') || e.includes('tense') || e.includes('verb')) return 'Verb conjugation';
    if (e.includes('gender') || e.includes('masculine') || e.includes('feminine')) return 'Gender agreement';
    if (e.includes('word order') || e.includes('order')) return 'Word order';
    if (e.includes('article')) return 'Articles';
    if (e.includes('preposition')) return 'Prepositions';
    if (e.includes('plural')) return 'Plurals';
    if (e.includes('accent') || e.includes('spelling')) return 'Spelling/Accents';
    return 'Grammar';
  };

  // ── corrections per day (30-day) ─────────────────────────────────────
  const corrTrend = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 86400000);
    const ds = d.toDateString();
    const count = allCorrections.filter(c => new Date(c.date).toDateString() === ds).length;
    return { label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), corrections: count };
  });

  // ── most repeated mistakes (same original corrected 2+ times) ────────
  const repeatMap: Record<string, { original: string; corrected: string; count: number; explanations: string[] }> = {};
  allCorrections.forEach(c => {
    const key = c.original.toLowerCase().trim();
    if (!repeatMap[key]) repeatMap[key] = { original: c.original, corrected: c.corrected, count: 0, explanations: [] };
    repeatMap[key].count++;
    if (c.explanation && !repeatMap[key].explanations.includes(c.explanation)) repeatMap[key].explanations.push(c.explanation);
  });
  const repeatedMistakes = Object.values(repeatMap).filter(r => r.count > 1).sort((a, b) => b.count - a.count).slice(0, 8);

  // ── improvement breakdown ─────────────────────────────────────────────
  const sortedSessions = [...chatSessions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const half = Math.max(1, Math.floor(sortedSessions.length / 2));
  const firstHalf = sortedSessions.slice(0, half);
  const secondHalf = sortedSessions.slice(half);

  // corrections per session (more intuitive than per-message rate)
  const corrPerSession = (sessions: typeof chatSessions) =>
    sessions.length > 0 ? sessions.reduce((a, s) => a + s.correctionsCount, 0) / sessions.length : 0;
  // words per session
  const wordsPerSession = (sessions: typeof chatSessions) =>
    sessions.length > 0 ? sessions.reduce((a, s) => a + s.wordsLearned, 0) / sessions.length : 0;
  // messages per session
  const msgsPerSession = (sessions: typeof chatSessions) =>
    sessions.length > 0 ? sessions.reduce((a, s) => a + s.messages.length, 0) / sessions.length : 0;

  const firstCPS = corrPerSession(firstHalf);
  const secondCPS = corrPerSession(secondHalf);
  const firstWPS = wordsPerSession(firstHalf);
  const secondWPS = wordsPerSession(secondHalf);
  const firstMPS = msgsPerSession(firstHalf);
  const secondMPS = msgsPerSession(secondHalf);

  // improvement = fewer corrections per session is better
  const corrImprovement = firstCPS > 0 ? Math.round(((firstCPS - secondCPS) / firstCPS) * 100) : 0;
  const isImproving = secondCPS < firstCPS;
  const improvementPct = Math.abs(corrImprovement);

  const avgQuiz = quizHistory.length > 0 ? Math.round((quizHistory.reduce((a, q) => a + (q.score / q.total), 0) / quizHistory.length) * 100) : 0;
  const bestQuiz = quizHistory.length > 0 ? Math.max(...quizHistory.map(q => Math.round((q.score / q.total) * 100))) : 0;
  const accuracy = totalMsgs > 0 ? Math.max(0, Math.round(100 - (totalCorr / Math.max(totalMsgs / 2, 1)) * 100)) : 0;

  // ── streak — calendar-day based (midnight to midnight) ───────────────
  const calDay = (d: Date) => { const c = new Date(d); c.setHours(0, 0, 0, 0); return c.getTime(); };
  const today0 = calDay(new Date());
  const uniqueDayTs = [...new Set(chatSessions.map(s => calDay(new Date(s.date))))]
    .sort((a, b) => a - b);
  let streak = 0;
  for (let i = uniqueDayTs.length - 1; i >= 0; i--) {
    const expected = today0 - (uniqueDayTs.length - 1 - i) * 86400000;
    if (uniqueDayTs[i] === expected) streak++; else break;
  }
  // streak only counts if the most recent session was today or yesterday
  if (uniqueDayTs.length > 0) {
    const last = uniqueDayTs[uniqueDayTs.length - 1];
    if (last < today0 - 86400000) streak = 0;
  }

  // ── 30-day activity heatmap ───────────────────────────────────────────
  const heatmap = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 86400000);
    const ds = d.toDateString();
    const count = chatSessions.filter(s => new Date(s.date).toDateString() === ds).length;
    return { d, count, label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }) };
  });

  // ── 30-day chart ──────────────────────────────────────────────────────
  const activityChart = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 86400000);
    const ds = d.toDateString();
    const day = chatSessions.filter(s => new Date(s.date).toDateString() === ds);
    return {
      label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
      words: day.reduce((a, s) => a + s.wordsLearned, 0),
      sessions: day.length,
    };
  });

  // ── week-over-week delta ──────────────────────────────────────────────
  const thisWeek = chatSessions.filter(s => new Date(s.date) >= new Date(now.getTime() - 7 * 86400000));
  const lastWeek = chatSessions.filter(s => {
    const d = new Date(s.date); return d >= new Date(now.getTime() - 14 * 86400000) && d < new Date(now.getTime() - 7 * 86400000);
  });
  const wowDelta = (curr: number, prev: number) => prev === 0 ? null : Math.round(((curr - prev) / prev) * 100);
  const wowSessions = wowDelta(thisWeek.length, lastWeek.length);
  const wowWords = wowDelta(thisWeek.reduce((a, s) => a + s.wordsLearned, 0), lastWeek.reduce((a, s) => a + s.wordsLearned, 0));

  // ── language breakdown ────────────────────────────────────────────────
  const langMap: Record<string, number> = {};
  chatSessions.forEach(s => { langMap[s.language] = (langMap[s.language] || 0) + 1; });
  const langs = Object.entries(langMap).sort((a, b) => b[1] - a[1]);
  const langPie = langs.map(([name, value]) => ({ name, value, color: LANG_COLORS[name] || '#94a3b8' }));

  // ── scenario breakdown ────────────────────────────────────────────────
  const scenMap: Record<string, number> = {};
  chatSessions.forEach(s => { scenMap[s.scenarioLabel] = (scenMap[s.scenarioLabel] || 0) + 1; });
  const scens = Object.entries(scenMap).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // ── skill radar ───────────────────────────────────────────────────────
  const totalErr = mistakeLog.reduce((a, m) => a + m.count, 0);
  const errMap: Record<string, number> = {};
  mistakeLog.forEach(m => { errMap[m.category] = m.count; });
  const radarData = [
    { skill: 'Vocabulary', score: Math.min(100, totalWords * 2) },
    { skill: 'Grammar', score: Math.max(0, 100 - ((errMap['Verb conjugation'] || 0) + (errMap['Gender agreement'] || 0)) * 5) },
    { skill: 'Accuracy', score: accuracy },
    { skill: 'Fluency', score: Math.min(100, chatSessions.length * 8) },
    { skill: 'Consistency', score: Math.min(100, streak * 15) },
    { skill: 'Quizzes', score: avgQuiz },
  ];

  // ── quiz chart ────────────────────────────────────────────────────────
  const quizChart = quizHistory.slice(-15).map((q, i) => ({
    name: `#${i + 1}`, score: Math.round((q.score / q.total) * 100),
    date: new Date(q.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
  }));

  // ── flashcard stats ───────────────────────────────────────────────────
  const dueCards = flashcards.filter(f => new Date(f.nextReview) <= now).length;
  const reviewedToday = flashcards.filter(f => f.lastReviewed && new Date(f.lastReviewed).toDateString() === now.toDateString()).length;
  const langFlashMap: Record<string, number> = {};
  flashcards.forEach(f => { langFlashMap[f.language] = (langFlashMap[f.language] || 0) + 1; });
  const langFlash = Object.entries(langFlashMap).sort((a, b) => b[1] - a[1]);

  // ── vocab growth chart (words per day, last 30 days) ─────────────────
  const vocabGrowth = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now.getTime() - (29 - i) * 86400000);
    const ds = d.toDateString();
    const words = chatSessions
      .filter(s => new Date(s.date).toDateString() === ds)
      .reduce((a, s) => a + s.messages.reduce((b, m) => b + (m.newWords?.length || 0), 0), 0);
    return { label: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), words };
  });
  // cumulative total per day
  let cumulative = Math.max(0, allLearnedWords.length - vocabGrowth.reduce((a, d) => a + d.words, 0));
  const vocabCumulative = vocabGrowth.map(d => { cumulative += d.words; return { ...d, total: cumulative }; });

  // ── words by language breakdown ───────────────────────────────────────
  const wordsByLang: Record<string, number> = {};
  allLearnedWords.forEach(w => { wordsByLang[w.language] = (wordsByLang[w.language] || 0) + 1; });
  const wordLangBreakdown = Object.entries(wordsByLang).sort((a, b) => b[1] - a[1]);

  // ── top errors ────────────────────────────────────────────────────────
  const topErrors = [...mistakeLog].sort((a, b) => b.count - a.count).slice(0, 8);
  const maxErr = topErrors[0]?.count || 1;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'errors', label: 'Errors', icon: AlertTriangle },
    { id: 'vocab', label: 'Vocabulary', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: Award },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto w-full pb-12">

      {/* ── Words Modal ── */}
      {showWordsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowWordsModal(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={e => e.stopPropagation()}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden z-10"
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stone-100">
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-0.5">Vocabulary</p>
                <h2 className="text-xl font-black text-stone-900">{allLearnedWords.length} Words Learned</h2>
              </div>
              <button onClick={() => setShowWordsModal(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors">
                <XCircle size={15} className="text-stone-500" />
              </button>
            </div>
            {/* word list */}
            <div className="overflow-y-auto flex-1 px-6 py-4 [&::-webkit-scrollbar]:hidden">
              {allLearnedWords.length === 0 ? (
                <p className="text-sm text-stone-300 text-center py-12">No words recorded yet</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {allLearnedWords.map((w, i) => {
                    const inFlashcards = flashcards.some(f => f.word.toLowerCase() === w.word.toLowerCase());
                    const handleAdd = () => {
                      if (inFlashcards) return;
                      addFlashcard({
                        id: `${Date.now()}-${i}`,
                        word: w.word,
                        translation: w.translation,
                        language: w.language as any,
                        nextReview: new Date().toISOString(),
                        lastReviewed: null,
                      });
                    };
                    const handlePlay = () => {
                      const utter = new SpeechSynthesisUtterance(w.word);
                      const langMap: Record<string, string> = {
                        French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
                        Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN',
                      };
                      utter.lang = langMap[w.language] || 'en-US';
                      window.speechSynthesis.speak(utter);
                    };
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                        className="flex items-start gap-2.5 px-3 py-2.5 rounded-2xl bg-stone-50 group">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: LANG_COLORS[w.language] || '#94a3b8' }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-stone-800 truncate">{w.word}</p>
                          <p className="text-[10px] text-stone-400 truncate">{w.translation}</p>
                          <p className="text-[9px] text-stone-300 mt-0.5">{w.language}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={handlePlay} title="Pronounce"
                            className="w-6 h-6 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center transition-colors">
                            <Volume2 size={10} className="text-indigo-500" />
                          </button>
                          {inFlashcards ? (
                            <div title="Already in flashcards"
                              className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
                              <CheckCircle2 size={10} className="text-emerald-500" />
                            </div>
                          ) : (
                            <button onClick={handleAdd} title="Add to flashcards"
                              className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-emerald-50 flex items-center justify-center transition-colors">
                              <Plus size={10} className="text-stone-400 hover:text-emerald-500" />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
      {/* ── Hero header ── */}
      <div className="px-12 pt-13 pb-16 mb-2 border-b border-stone-100">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="text-4xl font-black text-stone-900">Learning Analytics</h1>
            <p className="text-stone-400 text-sm mt-1">Track every aspect of your language journey</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-stone-50 border border-stone-100 rounded-2xl px-4 py-2.5 text-center">
              <p className="text-2xl font-black text-stone-900">{streak}</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Day Streak</p>
            </div>
            <div className="bg-stone-50 border border-stone-100 rounded-2xl px-4 py-2.5 text-center">
              <p className="text-2xl font-black text-stone-900">{fmt(totalWords)}</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Words</p>
            </div>
            <div className="bg-stone-50 border border-stone-100 rounded-2xl px-4 py-2.5 text-center">
              <p className="text-2xl font-black text-stone-900">{accuracy}%</p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Accuracy</p>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-2xl px-4 py-2.5"
              style={{ borderLeft: `3px solid ${DIFF_COLOR(difficultyScore)}` }}>
              <Zap size={14} style={{ color: DIFF_COLOR(difficultyScore) }} />
              <div>
                <p className="text-sm font-black text-stone-800">{DIFF_LABEL(difficultyScore)}</p>
                <p className="text-[10px] text-stone-400">{difficultyScore} pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* 30-day heatmap */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">30-Day Activity</p>
            <div className="flex items-center gap-2 text-[10px] text-stone-400">
              <span>Less</span>
              {[0, 0.25, 0.5, 0.75, 1].map((o, i) => (
                <div key={i} className="w-3 h-3 rounded-sm"
                  style={{ background: o === 0 ? '#f1f5f9' : `rgba(99,102,241,${o})` }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            {heatmap.map((h, i) => {
              const intensity = h.count === 0 ? 0 : Math.min(0.2 + h.count * 0.3, 1);
              const isToday = h.d.toDateString() === now.toDateString();
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    title={`${h.label}: ${h.count} session${h.count !== 1 ? 's' : ''}`}
                    className="w-full rounded-md cursor-default transition-all hover:ring-2 hover:ring-indigo-300 hover:ring-offset-1"
                    style={{
                      height: 28,
                      background: h.count > 0 ? `rgba(99,102,241,${intensity})` : '#f1f5f9',
                      outline: isToday ? '2px solid #6366f1' : 'none',
                      outlineOffset: 1,
                    }}
                  />
                  {(i === 0 || i === 6 || i === 13 || i === 20 || i === 27 || i === 29) && (
                    <span className="text-[8px] text-stone-300 font-medium whitespace-nowrap">
                      {h.d.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-stone-300">
              {heatmap.filter(h => h.count > 0).length} active day{heatmap.filter(h => h.count > 0).length !== 1 ? 's' : ''} in the last 30 days
            </p>
            <p className="text-[10px] text-stone-300">
              {heatmap.reduce((a, h) => a + h.count, 0)} total sessions
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-7 space-y-5">
        {/* ── KPI row ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard label="Sessions" value={chatSessions.length} delta={wowSessions} icon={MessageSquare} color="#6366f1" bg="rgba(99,102,241,0.1)" delay={0}
            onClick={() => { setTab('progress'); setTimeout(() => document.getElementById('section-sessions')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} />
          <KpiCard label="Words Learned" value={fmt(totalWords)} delta={wowWords} icon={BookOpen} color="#10b981" bg="rgba(16,185,129,0.1)" delay={0.04} onClick={() => setShowWordsModal(true)} />
          <KpiCard label="Avg Quiz" value={`${avgQuiz}%`} sub={`Best: ${bestQuiz}%`} icon={Award} color="#f59e0b" bg="rgba(245,158,11,0.1)" delay={0.08}
            onClick={() => { setTab('progress'); setTimeout(() => document.getElementById('section-quizzes')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} />
          <KpiCard label="Accuracy" value={`${accuracy}%`} sub={`${totalCorr} corrections`} icon={Target} color="#ef4444" bg="rgba(239,68,68,0.1)" delay={0.12}
            onClick={() => { setTab('errors'); setTimeout(() => document.getElementById('section-errors')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} />
          <KpiCard label="Flashcards" value={flashcards.length} sub={`${dueCards} due`} icon={Layers} color="#8b5cf6" bg="rgba(139,92,246,0.1)" delay={0.16}
            onClick={() => { setTab('vocab'); setTimeout(() => document.getElementById('section-flashcards')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} />
          <KpiCard label="Saved Phrases" value={savedPhrases.length} icon={Pin} color="#ec4899" bg="rgba(236,72,153,0.1)" delay={0.2}
            onClick={() => { setTab('vocab'); setTimeout(() => document.getElementById('section-phrases')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80); }} />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-stone-100 p-1 rounded-2xl w-fit">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all',
                tab === t.id ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
              <t.icon size={12} />{t.label}
            </button>
          ))}
        </div>

        {/* ══ OVERVIEW ══ */}
        {tab === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Activity chart */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <SectionLabel>Words Learned · Last 30 Days</SectionLabel>
                    <p className="text-2xl font-black text-stone-900 -mt-2">{fmt(totalWords)} <span className="text-sm font-medium text-stone-400">total</span></p>
                  </div>
                  {wowWords !== null && (
                    <span className={cn('flex items-center gap-1 text-xs font-black px-3 py-1.5 rounded-xl',
                      wowWords >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500')}>
                      {wowWords >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{Math.abs(wowWords)}% vs last week
                    </span>
                  )}
                </div>
                <div className="h-52">
                  {activityChart.some(d => d.words > 0) ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={activityChart}>
                        <defs>
                          <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.18} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} interval={4} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                        <Tooltip contentStyle={{ background: '#fff', borderRadius: 16, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: 12 }} />
                        <Area type="monotone" dataKey="words" stroke="#10b981" strokeWidth={2.5} fill="url(#wg)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-stone-300">
                      <BarChart2 size={36} className="mb-2 opacity-30" />
                      <p className="text-sm text-stone-400">Start chatting to see activity</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Skill radar */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Skill Breakdown</SectionLabel>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Radar dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Language + scenario row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Language pie */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Languages Practiced</SectionLabel>
                {langs.length === 0 ? <p className="text-sm text-stone-300 py-6 text-center">No sessions yet</p> : (
                  <div className="flex items-center gap-6">
                    <div className="w-36 h-36 shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={langPie} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={60} paddingAngle={3}>
                            {langPie.map((l, i) => <Cell key={i} fill={l.color} />)}
                          </Pie>
                          <Tooltip contentStyle={{ background: '#fff', borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: 11 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 space-y-2.5">
                      {langs.map(([lang, count]) => {
                        const pct = Math.round((count / chatSessions.length) * 100);
                        const color = LANG_COLORS[lang] || '#94a3b8';
                        return (
                          <div key={lang}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                                <span className="text-xs font-bold text-stone-700">{lang}</span>
                              </div>
                              <span className="text-[10px] font-black text-stone-400">{count} · {pct}%</span>
                            </div>
                            <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Top scenarios — 3 variants, pick one */}
              <div className="space-y-4">
                {/* Variant A — Cards Grid */}
                <div className="bg-white rounded-3xl border border-stone-100 p-6">
                  <SectionLabel>Top Scenarios · Variant A — Cards Grid</SectionLabel>
                  {scens.length === 0 ? <p className="text-sm text-stone-300 py-6 text-center">No sessions yet</p> : (
                    <div className="grid grid-cols-2 gap-2.5">
                      {scens.map(([scen, count], i) => {
                        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'];
                        const bgs = ['rgba(99,102,241,0.07)', 'rgba(16,185,129,0.07)', 'rgba(245,158,11,0.07)', 'rgba(239,68,68,0.07)', 'rgba(139,92,246,0.07)', 'rgba(14,165,233,0.07)'];
                        const pct = Math.round((count / chatSessions.length) * 100);
                        const c = colors[i % colors.length];
                        return (
                          <div key={scen} className="rounded-2xl p-3.5" style={{ background: bgs[i % bgs.length] }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: c }}>#{i + 1}</span>
                              <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full" style={{ background: c }}>{count}×</span>
                            </div>
                            <p className="text-xs font-bold text-stone-700 leading-snug mb-2">{scen}</p>
                            <div className="h-1 bg-white/60 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Variant B — Ranked List */}
                <div className="bg-white rounded-3xl border border-stone-100 p-6">
                  <SectionLabel>Top Scenarios · Variant B — Ranked List</SectionLabel>
                  {scens.length === 0 ? <p className="text-sm text-stone-300 py-6 text-center">No sessions yet</p> : (
                    <div className="space-y-1.5">
                      {scens.map(([scen, count], i) => {
                        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'];
                        const c = colors[i % colors.length];
                        return (
                          <div key={scen} className="flex items-center gap-0 rounded-xl overflow-hidden border border-stone-100">
                            <div className="w-1 self-stretch shrink-0" style={{ background: c }} />
                            <div className="flex items-center gap-3 flex-1 px-4 py-3">
                              <span className="text-sm font-black w-5 shrink-0" style={{ color: c }}>{i + 1}</span>
                              <span className="text-xs font-bold text-stone-700 flex-1 truncate">{scen}</span>
                              <span className="text-xs font-black text-stone-400 shrink-0">{count} sessions</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Insights row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'This Week', value: thisWeek.length, sub: 'sessions', icon: Calendar, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                { label: 'Avg per Day', value: (chatSessions.length / Math.max(uniqueDayTs.length, 1)).toFixed(1), sub: 'sessions/active day', icon: Clock, color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
                { label: 'Total Messages', value: fmt(totalMsgs), sub: 'across all sessions', icon: MessageSquare, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                { label: 'Error Rate', value: `${Math.round((totalCorr / Math.max(totalMsgs / 2, 1)) * 100)}%`, sub: 'corrections per message', icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-stone-100 p-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: s.bg }}>
                    <s.icon size={14} style={{ color: s.color }} />
                  </div>
                  <p className="text-xl font-black text-stone-900">{s.value}</p>
                  <p className="text-xs font-bold text-stone-500 mt-0.5">{s.label}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ══ PROGRESS ══ */}
        {tab === 'progress' && (
          <div className="space-y-4">
            {/* Quiz stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Quizzes Taken', value: quizHistory.length, color: '#6366f1' },
                { label: 'Average Score', value: `${avgQuiz}%`, color: '#10b981' },
                { label: 'Best Score', value: `${bestQuiz}%`, color: '#f59e0b' },
                { label: 'Pass Rate', value: `${quizHistory.length > 0 ? Math.round((quizHistory.filter(q => (q.score / q.total) >= 0.7).length / quizHistory.length) * 100) : 0}%`, color: '#ef4444' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                  <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-stone-400 font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Score trend */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
              <SectionLabel>Quiz Score Trend</SectionLabel>
              <div className="h-56">
                {quizChart.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={quizChart}>
                      <defs>
                        <linearGradient id="qg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#fff', borderRadius: 16, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: 12 }}
                        formatter={(v: any) => [`${v}%`, 'Score']} />
                      <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#qg)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300">
                    <Award size={36} className="mb-2 opacity-30" />
                    <p className="text-sm text-stone-400">Complete a quiz to see your trend</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sessions bar + recent list */}
            <div id="section-sessions" className="space-y-4">
              {/* Daily Sessions — advanced */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                {(() => {
                  const totalSess = activityChart.reduce((a, d) => a + d.sessions, 0);
                  const peakDay = activityChart.reduce((best, d) => d.sessions > best.sessions ? d : best, activityChart[0]);
                  const avgSess = totalSess > 0 ? (totalSess / activityChart.filter(d => d.sessions > 0).length).toFixed(1) : '0';
                  const activeDays = activityChart.filter(d => d.sessions > 0).length;
                  return (
                    <>
                      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
                        <div>
                          <SectionLabel>Daily Sessions · Last 30 Days</SectionLabel>
                          <p className="text-2xl font-black text-stone-900 -mt-2">{totalSess} <span className="text-sm font-medium text-stone-400">total sessions</span></p>
                        </div>
                        <div className="flex gap-3">
                          {[
                            { label: 'Active Days', value: activeDays, color: '#6366f1' },
                            { label: 'Avg / Day', value: avgSess, color: '#10b981' },
                            { label: 'Peak', value: peakDay?.sessions > 0 ? `${peakDay.sessions} on ${peakDay.label}` : '—', color: '#f59e0b' },
                          ].map(s => (
                            <div key={s.label} className="rounded-2xl px-3 py-2 bg-stone-50 text-center min-w-[72px]">
                              <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
                              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wide mt-0.5">{s.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="h-56">
                        {activityChart.some(d => d.sessions > 0) ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityChart} barSize={10} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                  <stop offset="100%" stopColor="#818cf8" stopOpacity={0.4} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} interval={4} dy={8} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
                              <Tooltip
                                cursor={{ fill: 'rgba(99,102,241,0.06)', radius: 8 }}
                                contentStyle={{ background: '#fff', borderRadius: 14, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', fontSize: 12, padding: '10px 14px' }}
                                formatter={(v: any) => [`${v} session${v !== 1 ? 's' : ''}`, '']}
                                labelStyle={{ color: '#64748b', fontWeight: 700, marginBottom: 2 }}
                              />
                              <Bar dataKey="sessions" radius={[6, 6, 2, 2]} fill="url(#sessGrad)">
                                {activityChart.map((d, i) => (
                                  <Cell
                                    key={i}
                                    fill={d.sessions === peakDay?.sessions && d.sessions > 0 ? '#6366f1' : 'url(#sessGrad)'}
                                    fillOpacity={d.sessions === peakDay?.sessions && d.sessions > 0 ? 1 : 0.75}
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-stone-300">
                            <MessageSquare size={32} className="mb-2 opacity-30" />
                            <p className="text-sm text-stone-400">No sessions yet</p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Recent sessions */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                {(() => {
                  const allLangs = [...new Set(chatSessions.map(s => s.language))];
                  const filtered = sessFilter === 'all' ? chatSessions : chatSessions.filter(s => s.language === sessFilter);
                  const sorted = [...filtered].sort((a, b) => {
                    if (sessSort === 'words') return b.wordsLearned - a.wordsLearned;
                    if (sessSort === 'msgs') return b.messages.length - a.messages.length;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                  });
                  const LANG_DOT: Record<string, string> = { French: '#6366f1', Spanish: '#f59e0b', German: '#0ea5e9', Italian: '#ec4899', Japanese: '#ef4444', Portuguese: '#10b981', Chinese: '#8b5cf6' };
                  return (
                    <>
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <SectionLabel>Recent Sessions</SectionLabel>
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* language filter */}
                          <div className="flex gap-1">
                            {['all', ...allLangs].map(l => (
                              <button key={l} onClick={() => setSessFilter(l)}
                                className={cn('px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all',
                                  sessFilter === l ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-400 hover:text-stone-600')}>
                                {l === 'all' ? 'All' : l}
                              </button>
                            ))}
                          </div>
                          {/* sort */}
                          <div className="flex gap-1 bg-stone-100 p-0.5 rounded-xl">
                            {([['date', 'Recent'], ['words', 'Words'], ['msgs', 'Messages']] as const).map(([k, label]) => (
                              <button key={k} onClick={() => setSessSort(k)}
                                className={cn('px-2.5 py-1 rounded-[10px] text-[10px] font-bold transition-all',
                                  sessSort === k ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* summary row */}
                      <div className="flex gap-3 mb-4">
                        {[
                          { label: 'Total', value: filtered.length, color: '#6366f1' },
                          { label: 'Words', value: filtered.reduce((a, s) => a + s.wordsLearned, 0), color: '#10b981' },
                          { label: 'Messages', value: filtered.reduce((a, s) => a + s.messages.length, 0), color: '#f59e0b' },
                        ].map(s => (
                          <div key={s.label} className="flex-1 rounded-2xl bg-stone-50 px-3 py-2 text-center">
                            <p className="text-sm font-black" style={{ color: s.color }}>{s.value}</p>
                            <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">{s.label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                        {sorted.length === 0
                          ? <p className="text-sm text-stone-300 text-center py-6">No sessions yet</p>
                          : sorted.slice(0, 12).map((s, i) => {
                            const dot = LANG_DOT[s.language] || '#94a3b8';
                            const wordShare = chatSessions.length > 0 ? Math.round((s.wordsLearned / Math.max(...chatSessions.map(x => x.wordsLearned), 1)) * 100) : 0;
                            return (
                              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                                className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: dot + '18' }}>
                                  <MessageSquare size={12} style={{ color: dot }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                                    <p className="text-xs font-bold text-stone-700 truncate">{s.scenarioLabel}</p>
                                    <span className="text-[10px] text-stone-400 shrink-0">{s.language}</span>
                                  </div>
                                  <div className="h-1 bg-stone-200 rounded-full overflow-hidden w-full">
                                    <div className="h-full rounded-full transition-all" style={{ width: `${wordShare}%`, background: dot }} />
                                  </div>
                                </div>
                                <div className="text-right shrink-0 ml-2">
                                  <p className="text-[11px] font-black text-emerald-600">{s.wordsLearned}w</p>
                                  <p className="text-[9px] text-stone-400">{s.messages.length} msgs</p>
                                  <p className="text-[9px] text-stone-300">{new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
                                </div>
                              </motion.div>
                            );
                          })
                        }
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Recent quizzes */}
            <div id="section-quizzes" className="bg-white rounded-3xl border border-stone-100 p-6">
              <SectionLabel>Recent Quizzes</SectionLabel>
              {quizHistory.length === 0 ? <p className="text-sm text-stone-300 text-center py-6">No quizzes yet</p> : (
                <div className="space-y-2">
                  {quizHistory.slice(0, 10).map((q, i) => {
                    const pct = Math.round((q.score / q.total) * 100);
                    const pass = pct >= 70;
                    return (
                      <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-stone-50">
                        {pass ? <CheckCircle2 size={15} className="text-emerald-500 shrink-0" /> : <XCircle size={15} className="text-red-400 shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-stone-700">{q.language} · {q.difficulty}</p>
                          <p className="text-[10px] text-stone-400">{new Date(q.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-stone-400">{q.score}/{q.total}</span>
                          <div className="w-24 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pass ? '#10b981' : '#ef4444' }} />
                          </div>
                          <span className="text-xs font-black w-10 text-right" style={{ color: pass ? '#10b981' : '#ef4444' }}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══ ERRORS ══ */}
        {tab === 'errors' && (
          <div id="section-errors" className="space-y-4">
            {/* stat row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                <p className="text-3xl font-black text-red-500">{allCorrections.length}</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Total Corrections</p>
              </div>
              <div className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                <p className="text-3xl font-black text-indigo-500">{liveTopErrors.length}</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Error Categories</p>
              </div>
              <div className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                <p className="text-3xl font-black" style={{ color: accuracy >= 80 ? '#10b981' : accuracy >= 60 ? '#f59e0b' : '#ef4444' }}>{accuracy}%</p>
                <p className="text-xs text-stone-400 font-medium mt-1">Overall Accuracy</p>
              </div>
            </div>

            {allCorrections.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-100 p-16 flex flex-col items-center text-stone-300">
                <Star size={40} className="mb-3 opacity-30" />
                <p className="text-sm text-stone-400 font-medium">No corrections yet</p>
                <p className="text-xs text-stone-300 mt-1">Keep chatting — corrections will appear here</p>
              </div>
            ) : (
              <>
                {/* frequency then corrections feed — full width stacked */}
                <div className="space-y-4">
                  {/* Category frequency */}
                  <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    <SectionLabel>Error Frequency</SectionLabel>
                    <div className="space-y-3">
                      {liveTopErrors.map((e, i) => {
                        const pct = Math.round((e.count / liveMaxErr) * 100);
                        const color = ERR_COLORS[i % ERR_COLORS.length];
                        const isOpen = expandedError === e.category;
                        const desc = ERR_DESC[e.category] || ERR_DESC['Grammar'];
                        return (
                          <div key={e.category} className="rounded-2xl border border-stone-100 overflow-hidden">
                            <button onClick={() => setExpandedError(isOpen ? null : e.category)}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors text-left">
                              <span className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-black text-white shrink-0"
                                style={{ background: color }}>{i + 1}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-bold text-stone-700">{e.category}</span>
                                  <span className="text-[10px] font-black shrink-0 ml-2" style={{ color }}>{e.count}×</span>
                                </div>
                                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
                                    className="h-full rounded-full" style={{ background: color }} />
                                </div>
                              </div>
                              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                <ArrowDownRight size={12} className="text-stone-300 shrink-0" />
                              </motion.div>
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-3 pt-1 bg-stone-50 border-t border-stone-100">
                                <p className="text-[10px] text-stone-400 leading-relaxed">{desc}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live corrections feed */}
                  <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    {/* header + controls */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <SectionLabel>All Corrections</SectionLabel>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* sort */}
                        <div className="flex gap-1 bg-stone-100 p-0.5 rounded-xl">
                          {([['date', 'Recent'], ['category', 'Category'], ['scenario', 'Scenario']] as const).map(([k, label]) => (
                            <button key={k} onClick={() => setCorrSort(k)}
                              className={cn('px-2.5 py-1 rounded-[10px] text-[10px] font-bold transition-all',
                                corrSort === k ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* search */}
                    <div className="relative mb-3">
                      <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                      <input
                        value={corrSearch} onChange={e => setCorrSearch(e.target.value)}
                        placeholder="Search corrections, explanations, scenarios…"
                        className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all placeholder:text-stone-300"
                      />
                      {corrSearch && (
                        <button onClick={() => setCorrSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
                          <XCircle size={12} />
                        </button>
                      )}
                    </div>
                    {/* list */}
                    {(() => {
                      const q = corrSearch.toLowerCase();
                      const filtered = allCorrections.filter(c =>
                        !q || c.original.toLowerCase().includes(q) || c.corrected.toLowerCase().includes(q) ||
                        c.explanation.toLowerCase().includes(q) || c.scenario.toLowerCase().includes(q) ||
                        c.language.toLowerCase().includes(q)
                      );
                      const sorted = [...filtered].sort((a, b) => {
                        if (corrSort === 'category') return getCorrCat(a.explanation).localeCompare(getCorrCat(b.explanation));
                        if (corrSort === 'scenario') return a.scenario.localeCompare(b.scenario);
                        return new Date(b.date).getTime() - new Date(a.date).getTime();
                      });
                      return (
                        <>
                          <p className="text-[10px] text-stone-300 mb-2">{sorted.length} result{sorted.length !== 1 ? 's' : ''}</p>
                          <div className="space-y-2.5 max-h-[480px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                            {sorted.length === 0 ? (
                              <p className="text-sm text-stone-300 text-center py-8">No corrections match your search</p>
                            ) : sorted.map((c, i) => {
                              const cat = getCorrCat(c.explanation);
                              const catIdx = liveTopErrors.findIndex(t => t.category === cat);
                              const color = ERR_COLORS[catIdx >= 0 ? catIdx % ERR_COLORS.length : 0];
                              return (
                                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.015 }}
                                  className="rounded-2xl p-3.5" style={{ background: color + '08', borderLeft: `3px solid ${color}55` }}>
                                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                    <span className="text-xs text-red-400 line-through font-medium">{c.original}</span>
                                    <span className="text-stone-300 text-xs">→</span>
                                    <span className="text-xs text-emerald-600 font-bold">{c.corrected}</span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto shrink-0" style={{ background: color + '18', color }}>{cat}</span>
                                  </div>
                                  {c.explanation && (
                                    <p className="text-[10px] text-stone-500 leading-relaxed mb-1.5">{c.explanation}</p>
                                  )}
                                  <div className="flex items-center gap-2 text-[9px] text-stone-300">
                                    <span>{c.scenario}</span>
                                    <span>·</span>
                                    <span>{c.language}</span>
                                    <span>·</span>
                                    <span>{new Date(c.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* ── Correction trend chart ── */}
                <div className="bg-white rounded-3xl border border-stone-100 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <SectionLabel>Corrections Over Time · Last 30 Days</SectionLabel>
                      <p className="text-2xl font-black text-stone-900 -mt-2">{allCorrections.length} <span className="text-sm font-medium text-stone-400">total corrections</span></p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black ${isImproving ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                      {isImproving ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                      {improvementPct}% {isImproving ? 'improvement' : 'regression'} vs early sessions
                    </div>
                  </div>
                  <div className="h-48">
                    {corrTrend.some(d => d.corrections > 0) ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={corrTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="corrGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} interval={4} dy={8} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
                          <Tooltip contentStyle={{ background: '#fff', borderRadius: 14, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: 12 }}
                            formatter={(v: any) => [`${v} correction${v !== 1 ? 's' : ''}`, '']} />
                          <Area type="monotone" dataKey="corrections" stroke="#ef4444" strokeWidth={2} fill="url(#corrGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-stone-300 text-sm">No corrections in the last 30 days</div>
                    )}
                  </div>
                </div>

                {/* ── Repeated mistakes + improvement ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Repeated mistakes */}
                  <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    <SectionLabel>Most Repeated Mistakes</SectionLabel>
                    {repeatedMistakes.length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-stone-300">
                        <CheckCircle2 size={32} className="mb-2 opacity-30" />
                        <p className="text-sm text-stone-400">No repeated mistakes — great consistency</p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {repeatedMistakes.map((r, i) => (
                          <div key={i} className="rounded-2xl bg-stone-50 px-4 py-3">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-red-400 line-through">{r.original}</span>
                                <span className="text-stone-300 text-xs">→</span>
                                <span className="text-xs text-emerald-600 font-bold">{r.corrected}</span>
                              </div>
                              <span className="text-[10px] font-black text-red-400 shrink-0 ml-2 bg-red-50 px-2 py-0.5 rounded-full">{r.count}×</span>
                            </div>
                            {r.explanations[0] && (
                              <p className="text-[10px] text-stone-400 leading-relaxed">{r.explanations[0]}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Improvement breakdown */}
                  <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    <SectionLabel>Improvement Breakdown</SectionLabel>
                    {sortedSessions.length < 4 ? (
                      <div className="flex flex-col items-center py-8 text-stone-300">
                        <MessageSquare size={32} className="mb-2 opacity-30" />
                        <p className="text-sm text-stone-400 text-center">Need at least 4 sessions to show improvement</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* corrections per session comparison */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: 'Early Sessions', corr: firstCPS, words: firstWPS, msgs: firstMPS, count: firstHalf.length, color: '#f59e0b', bg: 'rgba(245,158,11,0.07)' },
                            { label: 'Recent Sessions', corr: secondCPS, words: secondWPS, msgs: secondMPS, count: secondHalf.length, color: isImproving ? '#10b981' : '#ef4444', bg: isImproving ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)' },
                          ].map(s => (
                            <div key={s.label} className="rounded-2xl p-4" style={{ background: s.bg }}>
                              <p className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: s.color }}>{s.label} · {s.count} sessions</p>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-stone-400">Corrections/session</span>
                                  <span className="text-xs font-black" style={{ color: s.color }}>{s.corr.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-stone-400">Words/session</span>
                                  <span className="text-xs font-black text-stone-700">{s.words.toFixed(1)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-stone-400">Messages/session</span>
                                  <span className="text-xs font-black text-stone-700">{s.msgs.toFixed(1)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* verdict */}
                        <div className="rounded-2xl p-4" style={{ background: isImproving ? 'rgba(16,185,129,0.06)' : secondCPS === firstCPS ? 'rgba(99,102,241,0.06)' : 'rgba(239,68,68,0.06)' }}>
                          <div className="flex items-center gap-2 mb-1">
                            {isImproving
                              ? <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                              : secondCPS === firstCPS
                                ? <Minus size={14} className="text-indigo-400 shrink-0" />
                                : <XCircle size={14} className="text-red-400 shrink-0" />}
                            <p className="text-xs font-bold" style={{ color: isImproving ? '#10b981' : secondCPS === firstCPS ? '#6366f1' : '#ef4444' }}>
                              {isImproving
                                ? `${improvementPct}% fewer corrections per session recently`
                                : secondCPS === firstCPS
                                  ? 'Correction rate is consistent across sessions'
                                  : `${improvementPct}% more corrections per session recently`}
                            </p>
                          </div>
                          <p className="text-[10px] text-stone-400 leading-relaxed">
                            {isImproving
                              ? `You averaged ${firstCPS.toFixed(1)} corrections/session early on, now down to ${secondCPS.toFixed(1)}. Keep it up.`
                              : secondCPS === firstCPS
                                ? 'Your error rate has stayed the same. Try focusing on your top error category.'
                                : `You averaged ${firstCPS.toFixed(1)} corrections/session early on, now ${secondCPS.toFixed(1)}. Review your repeated mistakes above.`}
                          </p>
                        </div>

                        {/* words trend */}
                        <div className="rounded-2xl bg-stone-50 p-4">
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Vocabulary Growth</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-stone-400">Early avg</span>
                                <span className="text-xs font-black text-stone-600">{firstWPS.toFixed(1)} words/session</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-stone-400">Recent avg</span>
                                <span className="text-xs font-black" style={{ color: secondWPS >= firstWPS ? '#10b981' : '#f59e0b' }}>{secondWPS.toFixed(1)} words/session</span>
                              </div>
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black px-2.5 py-1.5 rounded-xl shrink-0 ${secondWPS >= firstWPS ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
                              {secondWPS >= firstWPS ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                              {firstWPS > 0 ? `${Math.abs(Math.round(((secondWPS - firstWPS) / firstWPS) * 100))}%` : '—'}
                            </div>
                          </div>
                        </div>

                        {/* focus area */}
                        {liveTopErrors[0] && (
                          <div className="rounded-2xl bg-indigo-50 p-4">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Top Focus Area</p>
                            <p className="text-sm font-bold text-indigo-700">{liveTopErrors[0].category} <span className="text-indigo-400 font-medium text-xs">· {liveTopErrors[0].count}×</span></p>
                            <p className="text-[10px] text-indigo-400 mt-0.5 leading-relaxed">{ERR_DESC[liveTopErrors[0].category] || ERR_DESC['Grammar']}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ══ VOCABULARY ══ */}
        {tab === 'vocab' && (
          <div className="space-y-4">

            {/* ── stat row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Words Learned', value: allLearnedWords.length, color: '#10b981', sub: 'unique words' },
                { label: 'Flashcards', value: flashcards.length, color: '#6366f1', sub: `${dueCards} due` },
                { label: 'Reviewed Today', value: reviewedToday, color: '#f59e0b', sub: 'flashcards' },
                { label: 'Saved Phrases', value: savedPhrases.length, color: '#8b5cf6', sub: 'pinned' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                  <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-stone-500 font-medium mt-1">{s.label}</p>
                  <p className="text-[10px] text-stone-300 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* ── mastery overview ── */}
            {allLearnedWords.length > 0 && (() => {
              const inFC = allLearnedWords.filter(w => flashcards.some(f => f.word.toLowerCase() === w.word.toLowerCase())).length;
              const notInFC = allLearnedWords.length - inFC;
              const masteryPct = Math.round((inFC / allLearnedWords.length) * 100);
              const recentWords = [...allLearnedWords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* mastery bar */}
                  <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-100 p-6">
                    <SectionLabel>Vocabulary Mastery</SectionLabel>
                    <div className="flex items-end gap-4 mb-4">
                      <p className="text-3xl font-black text-stone-900">{masteryPct}%</p>
                      <p className="text-sm text-stone-400 mb-1">of words added to flashcards</p>
                    </div>
                    <div className="h-3 bg-stone-100 rounded-full overflow-hidden mb-3">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${masteryPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] text-stone-400">{inFC} in flashcards</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-stone-200" />
                        <span className="text-[10px] text-stone-400">{notInFC} not yet added</span>
                      </div>
                    </div>
                    {notInFC > 0 && (
                      <p className="text-[10px] text-amber-500 mt-3 bg-amber-50 rounded-xl px-3 py-2">
                        {notInFC} word{notInFC !== 1 ? 's' : ''} learned but not in flashcards yet — hover any word card to add them.
                      </p>
                    )}
                  </div>
                  {/* recently learned */}
                  <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    <SectionLabel>Recently Learned</SectionLabel>
                    <div className="space-y-2">
                      {recentWords.map((w, i) => {
                        const dot = LANG_COLORS[w.language] || '#94a3b8';
                        const inFC2 = flashcards.some(f => f.word.toLowerCase() === w.word.toLowerCase());
                        return (
                          <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-50">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-stone-800 truncate">{w.word}</p>
                              <p className="text-[10px] text-stone-400 truncate">{w.translation}</p>
                            </div>
                            {inFC2
                              ? <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                              : <button onClick={() => addFlashcard({ id: `fc-${Date.now()}-${i}`, word: w.word, translation: w.translation, language: w.language as any, nextReview: new Date().toISOString(), lastReviewed: null })}
                                className="w-5 h-5 rounded-lg bg-stone-100 hover:bg-emerald-50 flex items-center justify-center transition-colors shrink-0" title="Add to flashcards">
                                <Plus size={9} className="text-stone-400" />
                              </button>
                            }
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── vocab growth chart ── */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <SectionLabel>Vocabulary Growth · Last 30 Days</SectionLabel>
                  <p className="text-2xl font-black text-stone-900 -mt-2">{allLearnedWords.length} <span className="text-sm font-medium text-stone-400">unique words total</span></p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-emerald-600">+{vocabGrowth.reduce((a, d) => a + d.words, 0)}</p>
                  <p className="text-[10px] text-stone-400">last 30 days</p>
                </div>
              </div>
              <div className="h-52">
                {vocabCumulative.some(d => d.words > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={vocabCumulative} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="vocabGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 9 }} interval={4} dy={8} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip contentStyle={{ background: '#fff', borderRadius: 14, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: 12 }}
                        formatter={(v: any, name: string) => [v, name === 'total' ? 'Cumulative words' : 'New words']} />
                      <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2.5} fill="url(#vocabGrad)" name="total" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-300">
                    <BookOpen size={32} className="mb-2 opacity-30" />
                    <p className="text-sm text-stone-400">Start chatting to grow your vocabulary</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── words by language + flashcard status ── */}
            <div id="section-flashcards" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* words by language */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Words by Language</SectionLabel>
                {wordLangBreakdown.length === 0 ? <p className="text-sm text-stone-300 text-center py-8">No words yet</p> : (
                  <div className="space-y-3">
                    {wordLangBreakdown.map(([lang, count]) => {
                      const pct = Math.round((count / allLearnedWords.length) * 100);
                      const color = LANG_COLORS[lang] || '#94a3b8';
                      const inFlashcards = flashcards.filter(f => f.language === lang).length;
                      return (
                        <div key={lang}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                              <span className="text-xs font-bold text-stone-700">{lang}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-stone-400">
                              <span className="font-black">{count} words</span>
                              <span className="text-stone-200">·</span>
                              <span>{inFlashcards} in flashcards</span>
                              <span className="font-black" style={{ color }}>{pct}%</span>
                            </div>
                          </div>
                          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="h-full rounded-full" style={{ background: color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* flashcard review status */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Flashcard Review Status</SectionLabel>
                {flashcards.length === 0 ? <p className="text-sm text-stone-300 text-center py-8">No flashcards yet</p> : (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      {[
                        { label: 'Due', value: dueCards, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
                        { label: 'Up to date', value: flashcards.length - dueCards, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                        { label: 'Today', value: reviewedToday, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                      ].map(s => (
                        <div key={s.label} className="flex-1 rounded-2xl p-3 text-center" style={{ background: s.bg }}>
                          <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                          <p className="text-[10px] font-bold text-stone-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round(((flashcards.length - dueCards) / Math.max(flashcards.length, 1)) * 100)}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="h-full rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] text-stone-400 text-center">
                      {Math.round(((flashcards.length - dueCards) / Math.max(flashcards.length, 1)) * 100)}% of cards up to date
                    </p>
                    {/* flashcards by language */}
                    <div className="space-y-2 pt-1">
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">By Language</p>
                      {langFlash.map(([lang, count]) => {
                        const pct = Math.round((count / flashcards.length) * 100);
                        const color = LANG_COLORS[lang] || '#94a3b8';
                        const due = flashcards.filter(f => f.language === lang && new Date(f.nextReview) <= now).length;
                        return (
                          <div key={lang} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                            <span className="text-xs font-bold text-stone-600 w-20 shrink-0">{lang}</span>
                            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
                            </div>
                            <span className="text-[10px] text-stone-400 shrink-0">{count} cards</span>
                            {due > 0 && <span className="text-[9px] font-black text-red-400 shrink-0">{due} due</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── all learned words searchable ── */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <SectionLabel>All Learned Words</SectionLabel>
                <div className="flex items-center gap-2 flex-wrap">
                  {/* language filter */}
                  <div className="flex gap-1 flex-wrap">
                    {['all', ...Object.keys(wordsByLang)].map(l => (
                      <button key={l} onClick={() => setVocabLang(l)}
                        className={cn('px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all',
                          vocabLang === l ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-400 hover:text-stone-600')}>
                        {l === 'all' ? 'All' : l}
                      </button>
                    ))}
                  </div>
                  {/* sort */}
                  <div className="flex gap-1 bg-stone-100 p-0.5 rounded-xl">
                    {([['newest', 'Newest'], ['az', 'A–Z'], ['za', 'Z–A'], ['lang', 'Language']] as const).map(([k, label]) => (
                      <button key={k} onClick={() => setVocabSort(k)}
                        className={cn('px-2.5 py-1 rounded-[10px] text-[10px] font-bold transition-all',
                          vocabSort === k ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative mb-3">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                <input value={vocabSearch} onChange={e => setVocabSearch(e.target.value)}
                  placeholder="Search words or translations…"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-100 transition-all placeholder:text-stone-300" />
                {vocabSearch && (
                  <button onClick={() => setVocabSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
                    <XCircle size={12} />
                  </button>
                )}
              </div>
              {(() => {
                const q = vocabSearch.toLowerCase();
                let filtered = allLearnedWords.filter(w =>
                  (vocabLang === 'all' || w.language === vocabLang) &&
                  (!q || w.word.toLowerCase().includes(q) || w.translation.toLowerCase().includes(q))
                );
                filtered = [...filtered].sort((a, b) => {
                  if (vocabSort === 'az') return a.word.localeCompare(b.word);
                  if (vocabSort === 'za') return b.word.localeCompare(a.word);
                  if (vocabSort === 'lang') return a.language.localeCompare(b.language) || a.word.localeCompare(b.word);
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                return (
                  <>
                    <p className="text-[10px] text-stone-300 mb-3">{filtered.length} word{filtered.length !== 1 ? 's' : ''}</p>
                    {filtered.length === 0 ? (
                      <p className="text-sm text-stone-300 text-center py-8">No words match</p>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                        {filtered.map((w, i) => {
                          const inFC = flashcards.some(f => f.word.toLowerCase() === w.word.toLowerCase());
                          const dot = LANG_COLORS[w.language] || '#94a3b8';
                          const isExpanded = expandedWord === `${w.word}-${i}`;
                          return (
                            <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.01 }}
                              className={cn('rounded-2xl bg-stone-50 group cursor-pointer transition-colors', isExpanded ? 'bg-stone-100' : 'hover:bg-stone-100')}
                              onClick={() => setExpandedWord(isExpanded ? null : `${w.word}-${i}`)}>
                              <div className="flex items-start gap-2 px-3 py-2.5">
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: dot }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-bold text-stone-800 truncate">{w.word}</p>
                                  <p className="text-[10px] text-stone-400 truncate">{w.translation}</p>
                                </div>
                                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                  <button onClick={() => { const u = new SpeechSynthesisUtterance(w.word); const lm: Record<string, string> = { French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE', Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN' }; u.lang = lm[w.language] || 'en-US'; window.speechSynthesis.speak(u); }}
                                    className="w-5 h-5 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center transition-colors">
                                    <Volume2 size={9} className="text-indigo-500" />
                                  </button>
                                  {inFC ? (
                                    <div className="w-5 h-5 rounded-lg bg-emerald-50 flex items-center justify-center" title="In flashcards">
                                      <CheckCircle2 size={9} className="text-emerald-500" />
                                    </div>
                                  ) : (
                                    <button onClick={() => addFlashcard({ id: `${Date.now()}-${i}`, word: w.word, translation: w.translation, language: w.language as any, nextReview: new Date().toISOString(), lastReviewed: null })}
                                      className="w-5 h-5 rounded-lg bg-stone-100 hover:bg-emerald-50 flex items-center justify-center transition-colors" title="Add to flashcards">
                                      <Plus size={9} className="text-stone-400 hover:text-emerald-500" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              {isExpanded && (
                                <div className="px-3 pb-2.5 pt-0 border-t border-stone-200 mt-0.5">
                                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: dot + '18', color: dot }}>{w.language}</span>
                                    <span className="text-[9px] text-stone-300">{new Date(w.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    {inFC && <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">In flashcards</span>}
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* ── saved phrases ── */}
            <div id="section-phrases" className="bg-white rounded-3xl border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <SectionLabel>Saved Phrases</SectionLabel>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-stone-400">{savedPhrases.length} total</span>
                  <div className="flex gap-1 bg-stone-100 p-0.5 rounded-xl">
                    {([['newest', 'Newest'], ['az', 'A–Z'], ['lang', 'Language']] as const).map(([k, label]) => (
                      <button key={k} onClick={() => setPhraseSort(k)}
                        className={cn('px-2.5 py-1 rounded-[10px] text-[10px] font-bold transition-all',
                          phraseSort === k ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative mb-3">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
                <input value={phraseSearch} onChange={e => setPhraseSearch(e.target.value)}
                  placeholder="Search phrases…"
                  className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-100 rounded-xl outline-none focus:border-violet-300 focus:ring-1 focus:ring-violet-100 transition-all placeholder:text-stone-300" />
                {phraseSearch && (
                  <button onClick={() => setPhraseSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
                    <XCircle size={12} />
                  </button>
                )}
              </div>
              {savedPhrases.length === 0 ? <p className="text-sm text-stone-300 text-center py-6">No saved phrases yet</p> : (() => {
                let filtered = savedPhrases.filter(p =>
                  !phraseSearch || p.phrase.toLowerCase().includes(phraseSearch.toLowerCase()) || (p.translation || '').toLowerCase().includes(phraseSearch.toLowerCase())
                );
                filtered = [...filtered].sort((a, b) => {
                  if (phraseSort === 'az') return a.phrase.localeCompare(b.phrase);
                  if (phraseSort === 'lang') return a.language.localeCompare(b.language);
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                return (
                  <>
                    <p className="text-[10px] text-stone-300 mb-3">{filtered.length} phrase{filtered.length !== 1 ? 's' : ''}</p>
                    <div className="space-y-2 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {filtered.map((p, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                          className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-stone-50 group">
                          <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Pin size={11} className="text-violet-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-stone-800 leading-snug">{p.phrase}</p>
                            {p.translation && <p className="text-[10px] text-stone-400 mt-0.5">{p.translation}</p>}
                          </div>
                          <div className="text-right shrink-0 flex flex-col items-end gap-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: (LANG_COLORS[p.language] || '#94a3b8') + '18', color: LANG_COLORS[p.language] || '#94a3b8' }}>{p.language}</span>
                            <p className="text-[9px] text-stone-300">{new Date(p.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
                            <button onClick={() => { const u = new SpeechSynthesisUtterance(p.phrase); const lm: Record<string, string> = { French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE', Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN' }; u.lang = lm[p.language] || 'en-US'; window.speechSynthesis.speak(u); }}
                              className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-lg bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center transition-all">
                              <Volume2 size={9} className="text-indigo-500" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>

          </div>
        )}

        {/* ══ QUIZ ══ */}
        {tab === 'quiz' && (() => {
          const PB_KEY = 'quiz_personal_bests';
          const pbs: Record<string, number> = (() => { try { return JSON.parse(localStorage.getItem(PB_KEY) || '{}'); } catch { return {}; } })();

          // per-language stats
          const langStats: Record<string, { total: number; scores: number[]; best: number }> = {};
          quizHistory.forEach(q => {
            const pct = Math.round((q.score / q.total) * 100);
            if (!langStats[q.language]) langStats[q.language] = { total: 0, scores: [], best: 0 };
            langStats[q.language].total++;
            langStats[q.language].scores.push(pct);
            if (pct > langStats[q.language].best) langStats[q.language].best = pct;
          });

          // per-difficulty stats
          const diffStats: Record<string, { total: number; avg: number; pass: number }> = {};
          quizHistory.forEach(q => {
            const pct = Math.round((q.score / q.total) * 100);
            if (!diffStats[q.difficulty]) diffStats[q.difficulty] = { total: 0, avg: 0, pass: 0 };
            diffStats[q.difficulty].total++;
            diffStats[q.difficulty].avg += pct;
            if (pct >= 70) diffStats[q.difficulty].pass++;
          });
          Object.keys(diffStats).forEach(d => { diffStats[d].avg = Math.round(diffStats[d].avg / diffStats[d].total); });

          // leaderboard: top scores per language+difficulty combo
          const leaderboard: { key: string; lang: string; diff: string; best: number; avg: number; total: number }[] = [];
          Object.entries(pbs).forEach(([key, best]) => {
            const [lang, diff] = key.split('_');
            const qs = quizHistory.filter(q => q.language === lang && q.difficulty === diff);
            const avg = qs.length > 0 ? Math.round(qs.reduce((a, q) => a + Math.round((q.score / q.total) * 100), 0) / qs.length) : 0;
            leaderboard.push({ key, lang, diff, best, avg, total: qs.length });
          });
          leaderboard.sort((a, b) => b.best - a.best);

          // recent 20 quizzes
          const recent = [...quizHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 20);

          const DIFF_BADGE: Record<string, string> = { beginner: 'bg-emerald-100 text-emerald-700', intermediate: 'bg-amber-100 text-amber-700', advanced: 'bg-red-100 text-red-700' };

          return (
            <div className="space-y-4">
              {/* KPI row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Quizzes Taken', value: quizHistory.length, color: '#6366f1' },
                  { label: 'Average Score', value: `${avgQuiz}%`, color: '#10b981' },
                  { label: 'Best Score', value: `${bestQuiz}%`, color: '#f59e0b' },
                  { label: 'Pass Rate (≥70%)', value: `${quizHistory.length > 0 ? Math.round((quizHistory.filter(q => (q.score / q.total) >= 0.7).length / quizHistory.length) * 100) : 0}%`, color: '#ef4444' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-3xl border border-stone-100 p-5 text-center">
                    <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-stone-400 font-medium mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Score trend chart */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Score Trend (last 15 quizzes)</SectionLabel>
                <div className="h-52">
                  {quizChart.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={quizChart}>
                        <defs>
                          <linearGradient id="qg2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                        <Tooltip contentStyle={{ background: '#fff', borderRadius: 16, border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: 12 }}
                          formatter={(v: any) => [`${v}%`, 'Score']} />
                        <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} fill="url(#qg2)" dot={{ fill: '#6366f1', r: 3 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-stone-300">
                      <Award size={36} className="mb-2 opacity-30" />
                      <p className="text-sm text-stone-400">Complete a quiz to see your trend</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Leaderboard — personal bests */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Personal Leaderboard</SectionLabel>
                {leaderboard.length === 0 ? (
                  <p className="text-sm text-stone-300 text-center py-8">Complete quizzes to build your leaderboard</p>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, i) => (
                      <motion.div key={entry.key} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors">
                        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0',
                          i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-stone-300 text-white' : i === 2 ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-400')}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-stone-800 text-sm">{entry.lang}</span>
                            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full capitalize', DIFF_BADGE[entry.diff] || 'bg-stone-100 text-stone-500')}>{entry.diff}</span>
                          </div>
                          <p className="text-xs text-stone-400 mt-0.5">{entry.total} quiz{entry.total !== 1 ? 'zes' : ''} · avg {entry.avg}%</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xl font-black text-stone-800">{entry.best}%</p>
                          <p className="text-[10px] text-stone-400">best</p>
                        </div>
                        {i === 0 && <Trophy size={18} className="text-amber-400 shrink-0" />}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* By difficulty */}
              {Object.keys(diffStats).length > 0 && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6">
                  <SectionLabel>By Difficulty</SectionLabel>
                  <div className="grid grid-cols-3 gap-3">
                    {(['beginner', 'intermediate', 'advanced'] as const).filter(d => diffStats[d]).map(d => (
                      <div key={d} className={cn('p-4 rounded-2xl text-center', DIFF_BADGE[d]?.replace('text-', 'border-').replace('bg-', 'bg-') || 'bg-stone-50')}>
                        <p className="text-2xl font-black">{diffStats[d].avg}%</p>
                        <p className="text-xs font-bold capitalize mt-1">{d}</p>
                        <p className="text-[10px] opacity-70 mt-0.5">{diffStats[d].total} quizzes · {diffStats[d].pass} passed</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent quiz history */}
              <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <SectionLabel>Recent Quizzes</SectionLabel>
                {recent.length === 0 ? (
                  <p className="text-sm text-stone-300 text-center py-8">No quizzes yet</p>
                ) : (
                  <div className="space-y-2">
                    {recent.map((q, i) => {
                      const pct = Math.round((q.score / q.total) * 100);
                      return (
                        <div key={q.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-stone-50 transition-colors">
                          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0',
                            pct >= 80 ? 'bg-emerald-100 text-emerald-700' : pct >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600')}>
                            {pct}%
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-stone-700">{q.language}</span>
                              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full capitalize', DIFF_BADGE[q.difficulty] || 'bg-stone-100 text-stone-500')}>{q.difficulty}</span>
                            </div>
                            <p className="text-xs text-stone-400">{q.score}/{q.total} correct · {new Date(q.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden shrink-0">
                            <div className={cn('h-full rounded-full', pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400')} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default AnalyticsView;
