import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2, RotateCcw, CheckCircle2, XCircle,
  ChevronRight, ChevronLeft, Layers, Trash2, Loader2,
  ArrowLeft, Mic, BookMarked, Zap, AlertTriangle, Globe2,
  MessageSquareQuote, GitBranch, Calendar, PenLine, Shuffle,
  MicOff, Trophy, Star, Flame, Target, Maximize2, Minimize2,
  Search, SortAsc, Download, Plus, Filter, ChevronDown,
  BookOpen, Link2, TrendingUp, Gauge,
} from 'lucide-react';
import { speakText } from '../services/voiceService';
import { getWordDetails, gradePronunciation, getRelatedWords, getWordEtymology, getSimilarConfusableWords, getWordUsageTips } from '../services/aiService';
import { cn } from '../lib/utils';

type WordDetails = {
  summary: string; register: string; notes: string; pronunciation: string;
  partOfSpeech?: string; gender?: string; plural?: string;
  conjugations?: { form: string; value: string }[];
  culturalNote?: string; commonMistakes?: string;
  alternatives: { text: string; register: string; notes: string }[];
  examples: { target: string; english: string }[];
};

const REG: Record<string, { bg: string; text: string; dot: string }> = {
  formal: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400' },
  informal: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' },
  neutral: { bg: 'bg-stone-50', text: 'text-stone-500', dot: 'bg-stone-300' },
};

const RegBadge = ({ label }: { label: string }) => {
  const s = REG[label] ?? REG.neutral;
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', s.bg, s.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />
      {label}
    </span>
  );
};

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">{children}</p>
);

// ─── Word Detail Page ────────────────────────────────────────────────────────
const WordDetailView = ({
  card, onBack, onRemove, onNext, onPrev, hasNext, hasPrev,
}: {
  card: any; onBack: () => void; onRemove: (id: string) => void;
  onNext?: () => void; onPrev?: () => void; hasNext?: boolean; hasPrev?: boolean;
}) => {
  const { addSavedPhrase, flashcards } = useAppStore() as any;
  const [data, setData] = useState<WordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [slowSpeaking, setSlowSpeaking] = useState(false);

  // Feature states
  const [related, setRelated] = useState<{ word: string; translation: string; relation: string }[] | null>(null);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [etymology, setEtymology] = useState<{ origin: string; root: string; evolution: string } | null>(null);
  const [etymologyLoading, setEtymologyLoading] = useState(false);
  const [confusable, setConfusable] = useState<{ word: string; translation: string; difference: string }[] | null>(null);
  const [confusableLoading, setConfusableLoading] = useState(false);
  const [usageTips, setUsageTips] = useState<{ tip: string; example: string }[] | null>(null);
  const [usageTipsLoading, setUsageTipsLoading] = useState(false);
  const [savedPhraseIds, setSavedPhraseIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true); setError(null);
    setRelated(null); setEtymology(null); setConfusable(null);
    getWordDetails(card.word, card.language)
      .then((d: WordDetails) => setData(d))
      .catch((err: any) => {
        const msg = err?.message || '';
        setError(msg.includes('429') || msg.toLowerCase().includes('rate limit')
          ? 'The AI is busy right now. Wait a moment and try again.'
          : 'Could not load word details. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [card.id]);

  // Load related words lazily
  const loadRelated = () => {
    if (related !== null || relatedLoading) return;
    setRelatedLoading(true);
    getRelatedWords(card.word, card.language)
      .then(setRelated).catch(() => setRelated([]))
      .finally(() => setRelatedLoading(false));
  };

  // Load etymology lazily
  const loadEtymology = () => {
    if (etymology !== null || etymologyLoading) return;
    setEtymologyLoading(true);
    getWordEtymology(card.word, card.language)
      .then(setEtymology).catch(() => setEtymology({ origin: '', root: '', evolution: 'Could not load etymology.' }))
      .finally(() => setEtymologyLoading(false));
  };

  // Load confusable words lazily
  const loadConfusable = () => {
    if (confusable !== null || confusableLoading) return;
    setConfusableLoading(true);
    const deckWords = flashcards.filter((f: any) => f.id !== card.id).map((f: any) => f.word);
    getSimilarConfusableWords(card.word, deckWords, card.language)
      .then(setConfusable).catch(() => setConfusable([]))
      .finally(() => setConfusableLoading(false));
  };

  // Auto-load confusable on mount
  useEffect(() => {
    if (!loading && data) {
      loadRelated(); loadEtymology(); loadConfusable();
      // load usage tips
      setUsageTipsLoading(true);
      getWordUsageTips(card.word, card.language)
        .then(setUsageTips).catch(() => setUsageTips([]))
        .finally(() => setUsageTipsLoading(false));
    }
  }, [loading]);

  const status = (() => {
    const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
    const nextDay = new Date(card.nextReview); nextDay.setHours(0, 0, 0, 0);
    if (nextDay <= todayMidnight) return { label: 'Due', color: 'text-red-400', bg: 'bg-red-50' };
    if ((card.easyStreak || 0) >= 5) return { label: 'Mastered', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    return { label: 'Reviewed', color: 'text-stone-400', bg: 'bg-stone-100' };
  })();

  const handleSavePhrase = (phrase: string, translation: string) => {
    const id = `${card.id}-${phrase.slice(0, 10)}`;
    addSavedPhrase({ id, phrase, translation, language: card.language, date: new Date().toISOString() });
    setSavedPhraseIds(prev => new Set(prev).add(id));
  };

  const [headerDesign, setHeaderDesign] = useState<1 | 2>(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridTarget = useRef({ x: 0, y: 0 });
  const gridCurrent = useRef({ x: 0, y: 0 });
  const gridRaf = useRef<number>(0);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      const c = gridCurrent.current;
      const g = gridTarget.current;
      c.x = lerp(c.x, g.x, 0.07);
      c.y = lerp(c.y, g.y, 0.07);
      if (gridRef.current) {
        gridRef.current.style.backgroundPosition =
          `${-1 + c.x}px ${-1 + c.y}px, ${-1 + c.x}px ${-1 + c.y}px, ${9 + c.x * 0.5}px ${9 + c.y * 0.5}px`;
      }
      gridRaf.current = requestAnimationFrame(tick);
    };
    gridRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(gridRaf.current);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gridTarget.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    gridTarget.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
  };

  const handleHeroMouseLeave = () => {
    gridTarget.current.x = 0;
    gridTarget.current.y = 0;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="min-h-full bg-[#f8f9fa]">

      {/* ── Top nav bar ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-stone-100 px-6 flex items-center justify-between h-14">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-bold">Deck</span>
        </button>

        {/* prev / next navigation */}
        <div className="flex items-center gap-1">
          <button onClick={onPrev} disabled={!hasPrev}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-300 hover:text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] font-black text-stone-300 uppercase tracking-[0.18em] px-2">{card.language}</span>
          <button onClick={onNext} disabled={!hasNext}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-300 hover:text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronRight size={16} />
          </button>
        </div>

        <button onClick={() => { onRemove(card.id); onBack(); }}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-red-500 transition-colors px-3 py-1.5 rounded-xl hover:bg-red-50">
          <Trash2 size={13} /> Remove
        </button>
      </div>

      {/* ── Hero header ── */}
      {/* Design toggle */}
      <div className="flex items-center gap-2 px-8 pt-4 bg-white">
        <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Header style</span>
        {([1, 2] as const).map(n => (
          <button key={n} onClick={() => setHeaderDesign(n)}
            className={cn('px-3 py-1 rounded-lg text-[11px] font-bold transition-colors',
              headerDesign === n ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-400 hover:bg-stone-200')}>
            Design {n}
          </button>
        ))}
      </div>

      {headerDesign === 1 ? (
        /* ── DESIGN 1: Dotted grid background ── */
        <div
          ref={gridRef}
          className="relative border-b border-stone-100 overflow-hidden"
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          style={{
            background: '#fff',
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px),
              radial-gradient(circle, rgba(0,0,0,0.14) 1.2px, transparent 1.2px)
            `,
            backgroundSize: '40px 40px, 40px 40px, 20px 20px',
            backgroundPosition: '-1px -1px, -1px -1px, 9px 9px',
          }}>
          {/* subtle white fade at edges */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto px-8 pt-8 pb-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {data?.partOfSpeech && <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-[11px] font-black text-stone-500 uppercase tracking-wider">{data.partOfSpeech}</span>}
                  {data?.gender && <span className="px-2.5 py-1 bg-violet-50 rounded-lg text-[11px] font-black text-violet-500 uppercase tracking-wider">{data.gender}</span>}
                  {data?.register && <span className="px-2.5 py-1 bg-blue-50 rounded-lg text-[11px] font-black text-blue-500 uppercase tracking-wider">{data.register}</span>}
                  <span className={cn('px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider', status.bg, status.color)}>{status.label}</span>
                </div>
                <h1 className="text-5xl font-black text-stone-900 leading-none break-words mb-2">{card.word}</h1>
                <div className="flex items-center gap-3 flex-wrap mt-2 mb-4">
                  {data?.pronunciation && <span className="text-base font-mono text-stone-400 tracking-wider">{data.pronunciation}</span>}
                  {data?.plural && <span className="text-sm text-stone-400">plural: <span className="font-semibold text-stone-600">{data.plural}</span></span>}
                </div>
                <div className="inline-flex items-center gap-2 bg-stone-900 rounded-2xl px-5 py-2.5">
                  <span className="text-stone-400 text-sm">→</span>
                  <span className="text-lg font-bold text-white">{card.translation}</span>
                </div>
              </div>

              {/* speak buttons */}
              <div className="flex flex-col gap-2 mt-1">
                <button onClick={() => { setSpeaking(true); speakText(card.word, card.language, () => setSpeaking(false)); }}
                  className={cn('w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2',
                    speaking ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-500')}>
                  <Volume2 size={18} />
                </button>
                {/* slow mode */}
                <button
                  title="Slow pronunciation"
                  onClick={() => {
                    setSlowSpeaking(true);
                    speakText(card.word, card.language, () => setSlowSpeaking(false), 0.45);
                  }}
                  className={cn('w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all border-2 gap-0.5',
                    slowSpeaking ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-stone-200 text-stone-400 hover:border-indigo-400 hover:text-indigo-500')}>
                  <Volume2 size={14} />
                  <span className="text-[8px] font-black uppercase tracking-wider">slow</span>
                </button>
              </div>
            </div>

            {/* SRS stats row */}
            <div className="flex items-center gap-5 mt-6 pt-5 border-t border-stone-100 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Calendar size={12} />
                <span>Next review: <span className="font-bold text-stone-600">{new Date(card.nextReview).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span></span>
              </div>
              {card.lastReviewed && (
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <RotateCcw size={12} />
                  <span>Last: <span className="font-bold text-stone-600">{new Date(card.lastReviewed).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span></span>
                </div>
              )}
              {(card.easyStreak || 0) > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <Star size={12} /><span className="font-bold">{card.easyStreak} easy streak</span>
                </div>
              )}
              {card.reviewHistory?.length > 0 && (
                <div className="flex items-center gap-1 ml-auto">
                  {(card.reviewHistory as string[]).slice(-10).map((r: string, i: number) => (
                    <div key={i} className={cn('w-2 h-2 rounded-full', r === 'easy' ? 'bg-emerald-400' : r === 'again' ? 'bg-amber-400' : 'bg-red-400')} title={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── DESIGN 2: 3D perspective repeating word background ── */
        <div className="relative border-b border-stone-100 bg-white" style={{ minHeight: 240 }}>
          {/* 3D perspective text layer — rendered outside overflow:hidden so transform isn't clipped */}
          <div className="absolute inset-0 pointer-events-none select-none"
            style={{ overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: 0, left: '-10%', right: '-10%', bottom: '-20%',
              perspective: '600px',
              perspectiveOrigin: '50% 0%',
            }}>
              <div style={{
                transform: 'rotate(50deg) rotate(180deg)',
                transformOrigin: '50% 0%',
                width: '100%',
                display: 'flex', flexDirection: 'column',
              }}>
                {Array.from({ length: 8 }).map((_, row) => (
                  <div key={row} style={{ display: 'flex', whiteSpace: 'nowrap', lineHeight: 1.1, overflow: 'hidden' }}>
                    {Array.from({ length: 12 }).map((_, col) => (
                      <span key={col} style={{
                        fontSize: '96px', fontWeight: 900,
                        color: `rgba(0,0,0,${0.07 + row * 0.01})`,
                        letterSpacing: '-0.01em', userSelect: 'none', flexShrink: 0,
                        paddingRight: '32px',
                      }}>
                        {card.word}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* fade: transparent top, white bottom so content is readable */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.95) 100%)' }} />
          <div className="relative max-w-3xl mx-auto px-8 pt-8 pb-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {data?.partOfSpeech && <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-[11px] font-black text-stone-500 uppercase tracking-wider">{data.partOfSpeech}</span>}
                  {data?.gender && <span className="px-2.5 py-1 bg-violet-50 rounded-lg text-[11px] font-black text-violet-500 uppercase tracking-wider">{data.gender}</span>}
                  {data?.register && <span className="px-2.5 py-1 bg-blue-50 rounded-lg text-[11px] font-black text-blue-500 uppercase tracking-wider">{data.register}</span>}
                  <span className={cn('px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider', status.bg, status.color)}>{status.label}</span>
                </div>
                <h1 className="text-5xl font-black text-stone-900 leading-none break-words mb-2">{card.word}</h1>
                <div className="flex items-center gap-3 flex-wrap mt-2 mb-4">
                  {data?.pronunciation && <span className="text-base font-mono text-stone-400 tracking-wider">{data.pronunciation}</span>}
                  {data?.plural && <span className="text-sm text-stone-400">plural: <span className="font-semibold text-stone-600">{data.plural}</span></span>}
                </div>
                <div className="inline-flex items-center gap-2 bg-stone-900 rounded-2xl px-5 py-2.5">
                  <span className="text-stone-400 text-sm">→</span>
                  <span className="text-lg font-bold text-white">{card.translation}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                <button onClick={() => { setSpeaking(true); speakText(card.word, card.language, () => setSpeaking(false)); }}
                  className={cn('w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2',
                    speaking ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border-stone-200 text-stone-400 hover:border-emerald-400 hover:text-emerald-500')}>
                  <Volume2 size={18} />
                </button>
                <button title="Slow" onClick={() => { setSlowSpeaking(true); speakText(card.word, card.language, () => setSlowSpeaking(false), 0.45); }}
                  className={cn('w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all border-2 gap-0.5',
                    slowSpeaking ? 'bg-indigo-500 border-indigo-500 text-white' : 'bg-white border-stone-200 text-stone-400 hover:border-indigo-400 hover:text-indigo-500')}>
                  <Volume2 size={14} />
                  <span className="text-[8px] font-black uppercase tracking-wider">slow</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-6 pt-5 border-t border-stone-100/60 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Calendar size={12} />
                <span>Next review: <span className="font-bold text-stone-600">{new Date(card.nextReview).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span></span>
              </div>
              {card.lastReviewed && (
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <RotateCcw size={12} />
                  <span>Last: <span className="font-bold text-stone-600">{new Date(card.lastReviewed).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span></span>
                </div>
              )}
              {(card.easyStreak || 0) > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <Star size={12} /><span className="font-bold">{card.easyStreak} easy streak</span>
                </div>
              )}
              {card.reviewHistory?.length > 0 && (
                <div className="flex items-center gap-1 ml-auto">
                  {(card.reviewHistory as string[]).slice(-10).map((r: string, i: number) => (
                    <div key={i} className={cn('w-2 h-2 rounded-full', r === 'easy' ? 'bg-emerald-400' : r === 'again' ? 'bg-amber-400' : 'bg-red-400')} title={r} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-8 py-8 space-y-4">
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-stone-300">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-sm font-medium">Loading word details…</span>
          </div>
        )}
        {error && !loading && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-red-600 text-sm">
            <AlertTriangle size={16} className="shrink-0" /> {error}
          </div>
        )}
        {data && !loading && (
          <>
            {/* About */}
            {data.summary && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center"><BookMarked size={12} className="text-emerald-600" /></div>
                  <SectionLabel>About this word</SectionLabel>
                </div>
                <p className="text-stone-700 leading-relaxed">{data.summary}</p>
                {data.notes && <p className="mt-3 text-sm text-stone-400 italic border-t border-stone-50 pt-3">{data.notes}</p>}
              </div>
            )}

            {/* Etymology */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center"><BookOpen size={12} className="text-amber-600" /></div>
                <SectionLabel>Word origin</SectionLabel>
              </div>
              {etymologyLoading && <div className="flex items-center gap-2 text-stone-300 text-sm"><Loader2 size={14} className="animate-spin" /> Loading etymology…</div>}
              {etymology && !etymologyLoading && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    {etymology.origin && <span className="px-2.5 py-1 bg-amber-50 rounded-lg text-xs font-bold text-amber-600">{etymology.origin}</span>}
                    {etymology.root && <span className="text-sm text-stone-500">root: <span className="font-bold text-stone-700 font-mono">{etymology.root}</span></span>}
                  </div>
                  {etymology.evolution && <p className="text-sm text-stone-600 leading-relaxed">{etymology.evolution}</p>}
                </div>
              )}
            </div>

            {/* Confusable words warning */}
            {confusable && confusable.length > 0 && (
              <div className="bg-orange-50 rounded-2xl border border-orange-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-orange-200 rounded-lg flex items-center justify-center"><AlertTriangle size={12} className="text-orange-700" /></div>
                  <SectionLabel>Easy to confuse with</SectionLabel>
                </div>
                <div className="space-y-3">
                  {confusable.map((c, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-stone-900">{c.word}</span>
                        <span className="text-stone-400 text-sm">→ {c.translation}</span>
                      </div>
                      <p className="text-xs text-orange-700 leading-relaxed">{c.difference}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cultural + Mistakes */}
            {(data.culturalNote || data.commonMistakes) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.culturalNote && (
                  <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-amber-200 rounded-lg flex items-center justify-center"><Globe2 size={12} className="text-amber-700" /></div>
                      <SectionLabel>Cultural note</SectionLabel>
                    </div>
                    <p className="text-amber-900 text-sm leading-relaxed">{data.culturalNote}</p>
                  </div>
                )}
                {data.commonMistakes && (
                  <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-red-200 rounded-lg flex items-center justify-center"><AlertTriangle size={12} className="text-red-700" /></div>
                      <SectionLabel>Common mistake</SectionLabel>
                    </div>
                    <p className="text-red-900 text-sm leading-relaxed">{data.commonMistakes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Conjugations */}
            {data.conjugations && data.conjugations.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center"><GitBranch size={12} className="text-violet-600" /></div>
                  <SectionLabel>Conjugations</SectionLabel>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {data.conjugations.map((c: any, i: number) => (
                    <div key={i} className="group flex items-center justify-between bg-stone-50 hover:bg-violet-50 rounded-xl px-4 py-3 transition-colors">
                      <span className="text-[10px] text-stone-400 font-black uppercase tracking-wider">{c.form}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 text-sm">{c.value}</span>
                        <button onClick={() => speakText(c.value, card.language)} className="opacity-0 group-hover:opacity-100 text-violet-400 hover:text-violet-600 transition-all"><Volume2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alternatives */}
            {data.alternatives && data.alternatives.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center"><Zap size={12} className="text-blue-600" /></div>
                  <SectionLabel>Alternatives & variants</SectionLabel>
                </div>
                <div className="space-y-2">
                  {data.alternatives.map((alt: any, i: number) => (
                    <div key={i} className="flex items-start justify-between gap-3 rounded-xl bg-stone-50 hover:bg-blue-50 transition-colors p-4">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-stone-900">{alt.text}</span>
                          {alt.register && <RegBadge label={alt.register} />}
                        </div>
                        {alt.notes && <p className="text-xs text-stone-400 italic">{alt.notes}</p>}
                      </div>
                      <button onClick={() => speakText(alt.text, card.language)} className="p-2 text-stone-300 hover:text-blue-500 hover:bg-blue-100 rounded-xl transition-all shrink-0"><Volume2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples + save to phrases */}
            {data.examples && data.examples.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-teal-100 rounded-lg flex items-center justify-center"><MessageSquareQuote size={12} className="text-teal-600" /></div>
                  <SectionLabel>Example sentences</SectionLabel>
                </div>
                <div className="space-y-3">
                  {data.examples.map((ex: any, i: number) => {
                    const phraseId = `${card.id}-${ex.target.slice(0, 10)}`;
                    const saved = savedPhraseIds.has(phraseId);
                    return (
                      <div key={i} className="group flex items-start justify-between gap-3 pl-4 border-l-2 border-stone-100 hover:border-teal-400 transition-colors py-1">
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <p className="font-semibold text-stone-800 break-words">{ex.target}</p>
                          <p className="text-sm text-stone-400 break-words">{ex.english}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => speakText(ex.target, card.language)} className="p-1.5 text-stone-200 hover:text-teal-500 hover:bg-teal-50 rounded-xl transition-all"><Volume2 size={13} /></button>
                          <button onClick={() => handleSavePhrase(ex.target, ex.english)}
                            className={cn('p-1.5 rounded-xl transition-all', saved ? 'text-emerald-500 bg-emerald-50' : 'text-stone-200 hover:text-emerald-500 hover:bg-emerald-50')}>
                            <CheckCircle2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related words */}
            {related && related.length > 0 && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center"><Link2 size={12} className="text-indigo-600" /></div>
                  <SectionLabel>Related words</SectionLabel>
                </div>
                <div className="flex flex-wrap gap-2">
                  {related.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-stone-50 hover:bg-indigo-50 rounded-xl transition-colors border border-stone-100">
                      <div>
                        <span className="font-bold text-stone-800 text-sm">{r.word}</span>
                        <span className="text-stone-400 text-xs ml-1.5">→ {r.translation}</span>
                      </div>
                      <span className={cn('text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md',
                        r.relation === 'synonym' ? 'bg-emerald-100 text-emerald-600' :
                          r.relation === 'antonym' ? 'bg-red-100 text-red-500' : 'bg-stone-100 text-stone-400')}>
                        {r.relation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {relatedLoading && (
              <div className="flex items-center gap-2 text-stone-300 text-sm px-2"><Loader2 size={14} className="animate-spin" /> Loading related words…</div>
            )}

            {/* Review history chart — always shown */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-violet-100 rounded-lg flex items-center justify-center"><TrendingUp size={12} className="text-violet-600" /></div>
                <SectionLabel>Review history</SectionLabel>
              </div>
              {(!card.reviewHistory || card.reviewHistory.length === 0) ? (
                <p className="text-sm text-stone-300 italic">No reviews recorded yet. Rate this card to start tracking.</p>
              ) : (
                <div className="flex items-end gap-1" style={{ height: 64 }}>
                  {(card.reviewHistory as string[]).slice(-30).map((r: string, i: number) => {
                    const h = r === 'easy' ? 64 : r === 'again' ? 36 : 18;
                    return (
                      <div key={i}
                        className={cn('flex-1 rounded-sm min-w-0', r === 'easy' ? 'bg-emerald-400' : r === 'again' ? 'bg-amber-400' : 'bg-red-400')}
                        style={{ height: h }}
                        title={r}
                      />
                    );
                  })}
                </div>
              )}
              <div className="flex items-center gap-4 mt-3">
                {[{ label: 'Easy', color: 'bg-emerald-400' }, { label: 'Again', color: 'bg-amber-400' }, { label: 'Hard', color: 'bg-red-400' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={cn('w-2 h-2 rounded-full', l.color)} />
                    <span className="text-[10px] text-stone-400 font-bold">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Usage tips */}
            {(usageTips && usageTips.length > 0) && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center"><Zap size={12} className="text-emerald-600" /></div>
                  <SectionLabel>Usage tips</SectionLabel>
                </div>
                <div className="space-y-4">
                  {usageTips.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-700 font-medium leading-relaxed">{t.tip}</p>
                        {t.example && (
                          <div className="mt-1.5 flex items-center gap-2">
                            <p className="text-sm text-stone-400 italic flex-1">{t.example}</p>
                            <button onClick={() => speakText(t.example, card.language)} className="p-1 text-stone-200 hover:text-emerald-500 transition-colors shrink-0"><Volume2 size={12} /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {usageTipsLoading && (
              <div className="flex items-center gap-2 text-stone-300 text-sm px-2"><Loader2 size={14} className="animate-spin" /> Loading usage tips…</div>
            )}

            {/* SRS footer */}
            <div className="bg-white rounded-2xl border border-stone-100 p-5 mb-8">
              <SectionLabel>Review schedule</SectionLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Next review', value: new Date(card.nextReview).toLocaleDateString('en', { month: 'short', day: 'numeric' }), color: 'text-stone-700' },
                  { label: 'Easy streak', value: card.easyStreak ?? 0, color: 'text-emerald-600' },
                  { label: 'Hard count', value: card.hardCount ?? 0, color: 'text-red-500' },
                  { label: 'Reviews', value: card.reviewHistory?.length ?? 0, color: 'text-violet-500' },
                ].map(s => (
                  <div key={s.label} className="bg-stone-50 rounded-xl px-4 py-3 text-center">
                    <p className={cn('text-lg font-black', s.color)}>{s.value}</p>
                    <p className="text-[10px] font-bold text-stone-300 uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div >
  );
};

// ─── Sine wave component — speech-reactive via simulated envelope ─────────────
const SineWave = () => {
  const pathRef1 = React.useRef<SVGPathElement>(null);
  const pathRef2 = React.useRef<SVGPathElement>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const W = 300, H = 80, mid = H / 2;
    let phase = 0;
    let t = 0;

    // Simulated speech envelope: fast-changing amplitude that mimics phoneme bursts
    // Uses layered noise — slow envelope × fast syllable bursts
    const envelope = () => {
      const slow = 0.5 + 0.5 * Math.sin(t * 1.1);           // breath-level swell
      const syllable = 0.6 + 0.4 * Math.abs(Math.sin(t * 7.3 + 1.2)); // syllable rate
      const micro = 0.8 + 0.2 * Math.sin(t * 23 + 0.5);     // micro flutter
      return slow * syllable * micro;
    };

    const buildPath = (amp: number, phaseOffset: number, freqMod: number) => {
      const pts: string[] = [];
      for (let x = 0; x <= W; x += 2) {
        const nx = x / W;
        const y = mid
          + Math.sin(nx * Math.PI * (4 + freqMod) + phaseOffset) * amp
          + Math.sin(nx * Math.PI * (6.5 + freqMod * 0.7) + phaseOffset * 1.3) * (amp * 0.4)
          + Math.sin(nx * Math.PI * 2.2 + phaseOffset * 0.5) * (amp * 0.2);
        pts.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return pts.join(' ');
    };

    const tick = () => {
      t += 0.025;
      phase += 0.055;
      const amp = envelope() * 20; // max ~20px amplitude
      if (pathRef1.current) pathRef1.current.setAttribute('d', buildPath(amp, phase, 0));
      if (pathRef2.current) pathRef2.current.setAttribute('d', buildPath(amp * 0.75, phase + 1.1, 0.4));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none" className="w-full">
      <path ref={pathRef2} fill="none" stroke="#a3e635" strokeWidth="1.8" strokeLinecap="round" opacity={0.4} />
      <path ref={pathRef1} fill="none" stroke="#65a30d" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};

// ─── Main FlashcardsView ─────────────────────────────────────────────────────
const FlashcardsView = () => {
  const { flashcards, updateFlashcard, removeFlashcard, setFlashcards, user } = useAppStore() as any;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load flashcards from DB on mount
  const [cardsLoading, setCardsLoading] = useState(true);
  useEffect(() => {
    if (!user) { setCardsLoading(false); return; }
    import('../services/dbService').then(m =>
      m.getFlashcards(user.id).then((cards: any[]) => {
        setFlashcards(cards);
      }).catch(() => { })
        .finally(() => setCardsLoading(false))
    );
  }, [user?.id]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'study' | 'list'>('study');
  // track hard cards from this session for the retry round
  const [hardRoundIds, setHardRoundIds] = useState<Set<string> | null>(null);
  const [hardRoundDone, setHardRoundDone] = useState(false);
  // session summary
  const [sessionStats, setSessionStats] = useState<{ easy: number; again: number; hard: number } | null>(null);
  // write mode
  const [writeMode, setWriteMode] = useState(false);
  const [writeInput, setWriteInput] = useState('');
  const [writeResult, setWriteResult] = useState<'correct' | 'close' | 'wrong' | null>(null);
  const [writeAttempts, setWriteAttempts] = useState(0);
  const [writeRevealed, setWriteRevealed] = useState<'answer' | 'pronunciation' | null>(null);
  const [writeSkipConfirm, setWriteSkipConfirm] = useState(false);
  // shuffled queue built once when write mode activates — prevents peeking
  const writeQueueRef = useRef<any[]>([]);
  const [writeQueueIndex, setWriteQueueIndex] = useState(0);
  // pronunciation
  const [isRecording, setIsRecording] = useState(false);
  const [pronResult, setPronResult] = useState<{ verdict: 'correct' | 'close' | 'wrong'; feedback: string; tip?: string } | null>(null);
  const [pronLoading, setPronLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  // smart shuffle
  const [shuffled, setShuffled] = useState(false);
  // cache: id → WordDetails
  const [detailsCache, setDetailsCache] = useState<Record<string, WordDetails>>({});
  // per-card fetch state
  const [fetchingId, setFetchingId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [detailCardId, setDetailCardId] = useState<string | null>(null);
  // track which card ids we've already fetched (or are fetching)
  const fetchedRef = useRef<Set<string>>(new Set());
  // track hard-rated card ids during the first pass
  const hardSessionRef = useRef<Set<string>>(new Set());

  // ── Deck section state ─────────────────────────────────────────────────
  const [deckSearch, setDeckSearch] = useState('');
  const [deckLangFilter, setDeckLangFilter] = useState<string>('all');
  const [deckSort, setDeckSort] = useState<'newest' | 'az' | 'za' | 'due' | 'hardest' | 'confident'>('newest');
  const [deckGroupByLang, setDeckGroupByLang] = useState(false);
  const [collapsedLangs, setCollapsedLangs] = useState<Set<string>>(new Set());
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [bulkMode, setBulkMode] = useState(false);
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [addCardForm, setAddCardForm] = useState({ word: '', translation: '', language: 'French' });
  const [addCardLoading, setAddCardLoading] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // ── Streak + Daily goal (Supabase) ────────────────────────────────────
  const DAILY_GOALS = [10, 20, 50];
  const [streak, setStreak] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(20);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  // local refs so bumpStats always has fresh values without stale closure
  const statsRef = useRef<{ streak: number; streakLastDate: string; dailyGoal: number; dailyDate: string; dailyCount: number }>({
    streak: 0, streakLastDate: '', dailyGoal: 20, dailyDate: '', dailyCount: 0,
  });

  // Calendar-day helpers — midnight-based, not 24h rolling
  const calendarDate = (offsetDays = 0) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offsetDays);
    return d.toDateString();
  };

  // Load stats on mount
  useEffect(() => {
    if (!user) return;
    import('../services/dbService').then(m =>
      m.getUserStats(user.id).then((row: any) => {
        if (!row) return;
        const today = calendarDate(0);
        const yesterday = calendarDate(-1);
        const streakCount = (row.streak_last_date === today || row.streak_last_date === yesterday)
          ? row.streak_count : 0;
        const dailyCount = row.daily_date === today ? row.daily_count : 0;
        setStreak(streakCount);
        setDailyGoal(row.daily_goal ?? 20);
        setDailyProgress(dailyCount);
        statsRef.current = {
          streak: streakCount,
          streakLastDate: row.streak_last_date ?? '',
          dailyGoal: row.daily_goal ?? 20,
          dailyDate: row.daily_date ?? '',
          dailyCount,
        };
      }).catch(() => { })
    );
  }, [user?.id]);

  const bumpStats = () => {
    if (!user) return;
    const today = calendarDate(0);
    const yesterday = calendarDate(-1);
    const s = statsRef.current;
    // streak: same calendar day = no change, yesterday = +1, anything else = reset to 1
    const newStreak = s.streakLastDate === today ? s.streak
      : s.streakLastDate === yesterday ? s.streak + 1 : 1;
    const newDailyCount = s.dailyDate === today ? s.dailyCount + 1 : 1;
    const next = { streak: newStreak, streakLastDate: today, dailyGoal: s.dailyGoal, dailyDate: today, dailyCount: newDailyCount };
    statsRef.current = next;
    setStreak(newStreak);
    setDailyProgress(newDailyCount);
    import('../services/dbService').then(m =>
      m.upsertUserStats(user.id, {
        streak_count: newStreak,
        streak_last_date: today,
        daily_goal: next.dailyGoal,
        daily_date: today,
        daily_count: newDailyCount,
      }).catch(() => { })
    );
  };

  const saveGoal = (g: number) => {
    setDailyGoal(g);
    statsRef.current.dailyGoal = g;
    if (!user) return;
    import('../services/dbService').then(m =>
      m.upsertUserStats(user.id, {
        streak_count: statsRef.current.streak,
        streak_last_date: statsRef.current.streakLastDate,
        daily_goal: g,
        daily_date: statsRef.current.dailyDate,
        daily_count: statsRef.current.dailyCount,
      }).catch(() => { })
    );
  };

  // ── Focus mode ─────────────────────────────────────────────────────────
  const [focusMode, setFocusMode] = useState(false);

  // Smart shuffle: sort by hardest (most corrections) first, then oldest review
  const smartSort = (cards: any[]) => [...cards].sort((a, b) => {
    const aScore = (a.hardCount || 0) * 3 + (new Date().getTime() - new Date(a.nextReview).getTime()) / 86400000;
    const bScore = (b.hardCount || 0) * 3 + (new Date().getTime() - new Date(b.nextReview).getTime()) / 86400000;
    return bScore - aScore;
  });

  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const isDue = (f: any) => { const d = new Date(f.nextReview); d.setHours(0, 0, 0, 0); return d <= todayStart; };
  const baseDue = shuffled ? smartSort(flashcards.filter(isDue)) : flashcards.filter(isDue);
  const dueCards = hardRoundIds !== null
    ? baseDue.filter((f: any) => hardRoundIds.has(f.id))
    : baseDue;
  const currentCard = viewMode === 'study'
    ? (writeMode ? writeQueueRef.current[writeQueueIndex] : dueCards[currentIndex])
    : flashcards[currentIndex];

  // Activate write mode: shuffle due cards into a one-time queue
  const activateWriteMode = () => {
    const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
    writeQueueRef.current = shuffled;
    setWriteQueueIndex(0);
    setWriteMode(true);
    setWriteInput('');
    setWriteResult(null);
    setWriteAttempts(0);
    setWriteRevealed(null);
    setWriteSkipConfirm(false);
  };

  const deactivateWriteMode = () => {
    writeQueueRef.current = [];
    setWriteQueueIndex(0);
    setWriteMode(false);
    setWriteInput('');
    setWriteResult(null);
    setWriteAttempts(0);
    setWriteRevealed(null);
    setWriteSkipConfirm(false);
  };

  // Only fetch when the user flips the card for the first time
  const handleFlip = () => {
    if (isFlipped) { setIsFlipped(false); setIsSpeaking(false); setPronResult(null); setWriteResult(null); setWriteInput(''); setWriteAttempts(0); setWriteRevealed(null); return; }
    setIsFlipped(true);
    if (!currentCard) return;
    const id = currentCard.id;
    if (detailsCache[id] || fetchedRef.current.has(id)) return;
    fetchedRef.current.add(id);
    setFetchingId(id);
    setFetchError(null);
    getWordDetails(currentCard.word, currentCard.language)
      .then((d: WordDetails) => setDetailsCache(prev => ({ ...prev, [id]: d })))
      .catch((err: any) => {
        fetchedRef.current.delete(id); // allow retry
        const msg = err?.message || '';
        if (msg.includes('429') || msg.toLowerCase().includes('rate limit')) {
          setFetchError('The AI is busy right now. Wait a moment and try again.');
        } else {
          setFetchError('Could not load details. Please try again.');
        }
      })
      .finally(() => setFetchingId(null));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setIsSpeaking(false);
    setPronResult(null);
    setWriteResult(null);
    setWriteInput('');
    setWriteAttempts(0);
    setWriteRevealed(null);
    setFetchError(null);
    const list = viewMode === 'study' ? dueCards : flashcards;
    setTimeout(() => setCurrentIndex((p: number) => (p + 1) % list.length), 50);
  };
  const handlePrev = () => {
    setIsFlipped(false);
    setFetchError(null);
    const list = viewMode === 'study' ? dueCards : flashcards;
    setTimeout(() => setCurrentIndex((p: number) => (p - 1 + list.length) % list.length), 50);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (viewMode !== 'study') return;
      if (e.key === ' ') { e.preventDefault(); handleFlip(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewMode, flashcards.length, isFlipped, currentCard]);

  const handleDifficulty = (d: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;
    const now = new Date();
    // Always set next review to midnight of the target day so cards appear at start of day
    const next = new Date();
    const daysToAdd = d === 'easy' ? 4 : d === 'medium' ? 2 : 1;
    next.setDate(now.getDate() + daysToAdd);
    next.setHours(0, 0, 0, 0);
    // track hard count on card for smart shuffle + easyStreak for confidence meter
    const hardCount = d === 'hard' ? (currentCard.hardCount || 0) + 1 : (currentCard.hardCount || 0);
    const easyStreak = d === 'easy' ? (currentCard.easyStreak || 0) + 1 : 0;
    const reviewHistory = [...((currentCard.reviewHistory || []) as ('easy' | 'again' | 'hard')[]), d === 'medium' ? 'again' : d].slice(-10);
    updateFlashcard(currentCard.id, { nextReview: next.toISOString(), lastReviewed: now.toISOString(), hardCount, easyStreak, reviewHistory });
    if (user) {
      import('../services/dbService').then(m =>
        m.updateFlashcardReview(currentCard.id, user.id, next.toISOString(), now.toISOString(), hardCount, easyStreak, reviewHistory as ('easy' | 'again' | 'hard')[])
      ).catch(() => { });
    }

    // accumulate session stats
    setSessionStats(prev => {
      const s = prev || { easy: 0, again: 0, hard: 0 };
      return { ...s, easy: s.easy + (d === 'easy' ? 1 : 0), again: s.again + (d === 'medium' ? 1 : 0), hard: s.hard + (d === 'hard' ? 1 : 0) };
    });

    // streak + daily goal
    bumpStats();

    setIsFlipped(false);
    setFetchError(null);
    setPronResult(null);
    setWriteResult(null);
    setWriteInput('');
    setWriteAttempts(0);
    setWriteRevealed(null);

    setTimeout(() => {
      const ratedId = currentCard.id;

      if (hardRoundIds !== null) {
        // ── hard round ──
        const remaining = dueCards.filter((f: any) => f.id !== ratedId);
        if (remaining.length === 0) {
          // hard round complete → all done
          setHardRoundDone(true);
          setHardRoundIds(null);
        } else {
          setCurrentIndex(p => Math.min(p, remaining.length - 1));
        }
      } else {
        // ── first pass ──
        // collect hard ids seen so far + this one if hard
        const newHardIds = new Set<string>();
        // we don't have a persistent set yet, so we track via a ref below
        // For simplicity: after rating, check remaining due cards
        const remaining = baseDue.filter((f: any) => f.id !== ratedId);
        if (remaining.length === 0) {
          // first pass done — check if any hard cards exist (nextReview = tomorrow = 1 day)
          // We can't know which were rated hard from this pass without tracking,
          // so we use the hardSessionRef
          const hardIds = hardSessionRef.current;
          if (d === 'hard') hardIds.add(ratedId);
          if (hardIds.size > 0) {
            setHardRoundIds(new Set(hardIds));
            hardSessionRef.current = new Set();
            setCurrentIndex(0);
          } else {
            setHardRoundDone(true);
          }
        } else {
          if (d === 'hard') hardSessionRef.current.add(ratedId);
          setCurrentIndex(p => Math.min(p, remaining.length - 1));
        }
      }
    }, 50);
  };

  // ── Pronunciation recording via Web Speech API ──────────────────────────
  const handleRecord = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { setPronResult({ verdict: 'wrong', feedback: 'Speech recognition not supported in this browser.' }); return; }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const rec = new SpeechRecognition();
    const lm: Record<string, string> = { French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE', Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN' };
    rec.lang = lm[currentCard.language] || 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recognitionRef.current = rec;
    setIsRecording(true);
    setPronResult(null);
    rec.onresult = async (event: any) => {
      const spoken = event.results[0][0].transcript;
      setIsRecording(false);
      setPronLoading(true);
      try {
        const result = await gradePronunciation(spoken, currentCard.word, currentCard.language);
        setPronResult(result);
      } catch { setPronResult({ verdict: 'wrong', feedback: 'Could not grade pronunciation.' }); }
      finally { setPronLoading(false); }
    };
    rec.onerror = () => { setIsRecording(false); setPronResult({ verdict: 'wrong', feedback: 'Could not capture audio. Try again.' }); };
    rec.onend = () => setIsRecording(false);
    rec.start();
  };

  // ── Write mode checker ──────────────────────────────────────────────────
  const checkWriteAnswer = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard || !writeInput.trim()) return;
    const input = writeInput.trim().toLowerCase();
    const target = currentCard.word.toLowerCase();
    if (input === target) {
      setWriteResult('correct');
      // auto-advance after 1.2s — card stays in deck, no SRS update
      setTimeout(() => {
        setWriteResult(null);
        setWriteInput('');
        setWriteAttempts(0);
        setWriteRevealed(null);
        setWriteQueueIndex(p => {
          const next = p + 1;
          return next < writeQueueRef.current.length ? next : p;
        });
      }, 1200);
      return;
    }
    // fuzzy: within 2 char edits = close
    const dist = (a: string, b: string) => {
      const dp = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => i === 0 ? j : j === 0 ? i : 0));
      for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      return dp[a.length][b.length];
    };
    const result = dist(input, target) <= 2 ? 'close' : 'wrong';
    setWriteResult(result);
    setWriteAttempts(p => p + 1);
  };

  if (detailCardId) {
    const card = flashcards.find((f: any) => f.id === detailCardId);
    const cardIdx = flashcards.findIndex((f: any) => f.id === detailCardId);
    if (card) return <WordDetailView
      card={card}
      onBack={() => setDetailCardId(null)}
      onRemove={(id) => {
        removeFlashcard(id);
        if (user) import('../services/dbService').then(m => m.deleteFlashcard(id, user.id)).catch(() => { });
        setDetailCardId(null);
      }}
      hasNext={cardIdx < flashcards.length - 1}
      hasPrev={cardIdx > 0}
      onNext={() => setDetailCardId(flashcards[cardIdx + 1]?.id)}
      onPrev={() => setDetailCardId(flashcards[cardIdx - 1]?.id)}
    />;
  }

  if (cardsLoading) {
    return (
      <div className="max-w-2xl mx-auto w-full py-24 flex items-center justify-center gap-3 text-stone-300">
        <Loader2 size={24} className="animate-spin" />
        <span className="text-sm font-medium">Loading your deck…</span>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto w-full py-24 text-center px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Layers className="w-12 h-12 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Your deck is empty</h2>
        <p className="text-stone-400">Highlight words in lectures and add them to start practicing.</p>
      </div>
    );
  }

  const extra = currentCard ? detailsCache[currentCard.id] : null;
  const isFetching = currentCard ? fetchingId === currentCard.id : false;

  // ── Deck helpers ───────────────────────────────────────────────────────
  const cardStatus = (card: any): 'due' | 'soon' | 'ok' | 'mastered' | 'new' => {
    const todayMidnight = new Date(); todayMidnight.setHours(0, 0, 0, 0);
    const nextDay = new Date(card.nextReview); nextDay.setHours(0, 0, 0, 0);
    if (nextDay <= todayMidnight) return 'due';          // due today or overdue (includes new cards)
    if ((card.easyStreak || 0) >= 5) return 'mastered';
    const diffDays = (nextDay.getTime() - todayMidnight.getTime()) / 86400000;
    if (diffDays <= 2) return 'soon';
    if (!card.lastReviewed) return 'new';
    return 'ok';
  };

  const STATUS_META: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    due: { label: 'Due', bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400' },
    soon: { label: 'Due soon', bg: 'bg-amber-50', text: 'text-amber-500', dot: 'bg-amber-400' },
    ok: { label: 'Reviewed', bg: 'bg-stone-50', text: 'text-stone-400', dot: 'bg-stone-300' },
    mastered: { label: 'Mastered', bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-400' },
    new: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-500', dot: 'bg-blue-400' },
  };

  const exportCSV = () => {
    const rows = [['Word', 'Translation', 'Language', 'Next Review', 'Easy Streak', 'Hard Count']];
    flashcards.forEach((c: any) => rows.push([c.word, c.translation, c.language, c.nextReview, c.easyStreak ?? 0, c.hardCount ?? 0]));
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'flashcards.csv'; a.click();
  };

  const handleAddCard = async () => {
    if (!addCardForm.word.trim() || !addCardForm.translation.trim()) return;
    setAddCardLoading(true);
    const newCard = {
      id: crypto.randomUUID(),
      word: addCardForm.word.trim(),
      translation: addCardForm.translation.trim(),
      language: addCardForm.language as any,
      nextReview: new Date().toISOString(),
      lastReviewed: null,
    };
    useAppStore.getState().addFlashcard(newCard);
    if (user) {
      import('../services/dbService').then(m => m.upsertFlashcard(user.id, newCard)).catch(() => { });
    }
    setAddCardForm({ word: '', translation: '', language: addCardForm.language });
    setAddCardLoading(false);
    setAddCardOpen(false);
  };

  const sortedFilteredCards = (() => {
    let cards = [...flashcards] as any[];
    if (deckSearch.trim()) {
      const q = deckSearch.toLowerCase();
      cards = cards.filter(c => c.word.toLowerCase().includes(q) || c.translation.toLowerCase().includes(q));
    }
    if (deckLangFilter !== 'all') cards = cards.filter(c => c.language === deckLangFilter);
    switch (deckSort) {
      case 'az': cards.sort((a, b) => a.word.localeCompare(b.word)); break;
      case 'za': cards.sort((a, b) => b.word.localeCompare(a.word)); break;
      case 'due': cards.sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()); break;
      case 'hardest': cards.sort((a, b) => (b.hardCount || 0) - (a.hardCount || 0)); break;
      case 'confident': cards.sort((a, b) => (b.easyStreak || 0) - (a.easyStreak || 0)); break;
      default: cards.sort((a, b) => new Date(b.lastReviewed || 0).getTime() - new Date(a.lastReviewed || 0).getTime());
    }
    return cards;
  })();

  const deckLanguages = Array.from(new Set(flashcards.map((c: any) => c.language))) as string[];

  // deck stats
  const deckStats = {
    total: flashcards.length,
    due: flashcards.filter((c: any) => isDue(c)).length,
    mastered: flashcards.filter((c: any) => (c.easyStreak || 0) >= 5).length,
    avgConfidence: flashcards.length > 0
      ? Math.round(flashcards.reduce((s: number, c: any) => s + Math.min((c.easyStreak || 0) / 5, 1) * 100, 0) / flashcards.length)
      : 0,
  };

  // ── Deck card render function (must be before return) ─────────────────
  const renderDeckCard = (card: any) => {
    const status = cardStatus(card);
    const sm = STATUS_META[status];
    const isSelected = selectedCards.has(card.id);
    const history: ('easy' | 'again' | 'hard')[] = card.reviewHistory?.slice(-5) || [];
    const histColors = { easy: 'bg-emerald-400', again: 'bg-amber-400', hard: 'bg-red-400' };
    return (
      <motion.div key={card.id} layout
        whileHover={{ y: -4, boxShadow: '0 12px 32px -4px rgba(0,0,0,0.10)' }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={cn('group relative bg-white rounded-3xl border shadow-sm cursor-pointer overflow-hidden',
          isSelected ? 'border-indigo-400 ring-2 ring-indigo-200' : 'border-stone-100 hover:border-emerald-400 transition-colors duration-300')}
        onClick={() => bulkMode
          ? setSelectedCards(prev => { const s = new Set(prev); s.has(card.id) ? s.delete(card.id) : s.add(card.id); return s; })
          : setDetailCardId(card.id)}>

        {/* hover: dotted grid background — sits behind content */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }} />

        {/* spinning gradient border on hover — 3px wide */}
        <div className="absolute -inset-[3px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0 overflow-hidden">
          <div style={{
            position: 'absolute', inset: 0,
            background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #6366f1, #10b981)',
            animation: 'spin 2.5s linear infinite',
          }} />
          <div className="absolute inset-[3px] rounded-[22px]" style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            backgroundColor: '#fff',
          }} />
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

        {/* hover: arrow icon bottom-right corner */}
        <div className="absolute bottom-4 right-4 w-9 h-9 bg-stone-900 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 pointer-events-none z-10">
          <ChevronRight size={16} className="text-white" />
        </div>

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-stone-300 uppercase tracking-[0.15em]">{card.language}</span>
              <span className={cn('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider', sm.bg, sm.text)}>
                <span className={cn('w-1 h-1 rounded-full', sm.dot)} />{sm.label}
              </span>
            </div>
            {!bulkMode ? (
              <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(card.word, card.language); }}
                  className="w-8 h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                  <Volume2 size={14} />
                </button>
                <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); removeFlashcard(card.id); if (user) import('../services/dbService').then(m => m.deleteFlashcard(card.id, user.id)).catch(() => { }); }}
                  className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center transition-all shadow-sm">
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-stone-300')}>
                {isSelected && <CheckCircle2 size={11} className="text-white" />}
              </div>
            )}
          </div>
          <p className="text-xl font-black text-stone-900 leading-tight mb-0.5 truncate">{card.word}</p>
          <p className="text-sm text-stone-400 truncate mb-3">→ {card.translation}</p>
          <div className="flex items-center gap-1 mb-3 bg-white rounded-2xl px-2 py-1.5 w-fit border border-stone-100">
            {(() => {
              const slots = 5;
              const h = history.slice(-slots);
              const padCount = slots - h.length;
              return (
                <>
                  {Array.from({ length: padCount }).map((_, i) => (
                    <div key={`p${i}`} className="w-2 h-2 rounded-full bg-stone-100" />
                  ))}
                  {h.map((r, i) => (
                    <div key={i} className={cn('w-2 h-2 rounded-full', histColors[r])} title={r} />
                  ))}
                </>
              );
            })()}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-300">
              <Calendar size={10} />
              <span>{new Date(card.nextReview).toLocaleDateString()}</span>
            </div>
            {!bulkMode && null}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn('max-w-4xl mx-auto w-full py-8 px-4', focusMode && 'fixed inset-0 z-50 bg-white overflow-y-auto py-6')}>
      {/* Header */}
      {!focusMode && (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-black text-stone-900 mb-1">Flashcards</h1>
            <p className="text-stone-400 text-sm">{flashcards.length} word{flashcards.length !== 1 ? 's' : ''} in your deck</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-orange-50 border border-orange-100 rounded-xl">
              <Flame size={13} className="text-orange-400" />
              <span className="text-xs font-black text-orange-500">{streak}</span>
              <span className="text-[10px] text-orange-300 font-medium">day streak</span>
            </div>

            {/* Daily goal ring */}
            <div className="relative" onClick={() => setShowGoalPicker(p => !p)}>
              <div className="flex items-center gap-1.5 px-3 py-2 bg-violet-50 border border-violet-100 rounded-xl cursor-pointer hover:bg-violet-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#e9d5ff" strokeWidth="2.5" />
                  <circle cx="9" cy="9" r="7" fill="none" stroke="#8b5cf6" strokeWidth="2.5"
                    strokeDasharray={`${Math.min(dailyProgress / dailyGoal, 1) * 44} 44`}
                    strokeLinecap="round" transform="rotate(-90 9 9)" />
                </svg>
                <span className="text-xs font-black text-violet-500">{dailyProgress}/{dailyGoal}</span>
              </div>
              {showGoalPicker && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-stone-100 rounded-2xl shadow-lg p-3 z-20 flex gap-2">
                  {DAILY_GOALS.map(g => (
                    <button key={g} onClick={(e) => { e.stopPropagation(); saveGoal(g); setShowGoalPicker(false); }}
                      className={cn('px-3 py-1.5 rounded-xl text-xs font-bold transition-colors',
                        dailyGoal === g ? 'bg-violet-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-violet-50 hover:text-violet-600')}>
                      {g}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Write mode toggle */}
            {viewMode === 'study' && (
              !writeMode ? (
                <button onClick={activateWriteMode}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-white text-stone-400 border-stone-200 hover:border-indigo-300 hover:text-indigo-500">
                  <PenLine size={12} /> Write Mode
                </button>
              ) : writeSkipConfirm ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-stone-400 font-medium">Skip card &amp; exit?</span>
                  <button onClick={deactivateWriteMode}
                    className="px-2.5 py-1.5 bg-red-500 text-white text-[11px] font-bold rounded-lg hover:bg-red-600 transition-colors">
                    Exit
                  </button>
                  <button onClick={() => setWriteSkipConfirm(false)}
                    className="px-2.5 py-1.5 bg-stone-100 text-stone-500 text-[11px] font-bold rounded-lg hover:bg-stone-200 transition-colors">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setWriteSkipConfirm(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border bg-indigo-500 text-white border-indigo-500">
                  <PenLine size={12} /> Write Mode
                </button>
              )
            )}
            {/* Smart shuffle toggle */}
            {viewMode === 'study' && (
              <button onClick={() => setShuffled(s => !s)}
                className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border',
                  shuffled ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-stone-400 border-stone-200 hover:border-amber-300 hover:text-amber-500')}>
                <Shuffle size={12} /> Smart Shuffle
              </button>
            )}
            <div className="flex bg-stone-100 p-1 rounded-2xl">
              {(['study', 'list'] as const).map(m => (
                <button key={m} onClick={() => setViewMode(m)}
                  className={cn('px-5 py-2 rounded-xl text-sm font-bold transition-all',
                    viewMode === m ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                  {m === 'study' ? 'Study' : 'Deck'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STUDY MODE ── */}
      {viewMode === 'study' ? (
        <div className="max-w-lg mx-auto">
          {dueCards.length === 0 || hardRoundDone ? (
            /* ── session complete / nothing due ── */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-5">
                {hardRoundDone ? <Trophy className="w-10 h-10 text-amber-400" /> : <CheckCircle2 className="w-10 h-10 text-emerald-400" />}
              </div>
              <h2 className="text-xl font-black text-stone-800 mb-2">
                {hardRoundDone ? 'Session complete' : 'All caught up'}
              </h2>
              <p className="text-stone-400 text-sm max-w-xs mb-6">
                {hardRoundDone
                  ? 'You worked through all your due cards including the hard ones.'
                  : 'No cards are due right now. Come back later.'}
              </p>

              {/* session summary */}
              {sessionStats && (sessionStats.easy + sessionStats.again + sessionStats.hard) > 0 && (
                <div className="w-full bg-white rounded-3xl border border-stone-100 p-5 mb-5">
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-4">Session Summary</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Easy', value: sessionStats.easy, color: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: CheckCircle2 },
                      { label: 'Again', value: sessionStats.again, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: RotateCcw },
                      { label: 'Hard', value: sessionStats.hard, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', icon: XCircle },
                    ].map(s => (
                      <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: s.bg }}>
                        <s.icon size={16} className="mx-auto mb-1" style={{ color: s.color }} />
                        <p className="text-xl font-black" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px] font-bold text-stone-400 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-2 bg-stone-100 rounded-full overflow-hidden">
                    {(() => {
                      const total = sessionStats.easy + sessionStats.again + sessionStats.hard;
                      return (
                        <div className="h-full flex">
                          <div className="h-full bg-emerald-400 transition-all" style={{ width: `${(sessionStats.easy / total) * 100}%` }} />
                          <div className="h-full bg-amber-400 transition-all" style={{ width: `${(sessionStats.again / total) * 100}%` }} />
                          <div className="h-full bg-red-400 transition-all" style={{ width: `${(sessionStats.hard / total) * 100}%` }} />
                        </div>
                      );
                    })()}
                  </div>
                  <p className="text-[10px] text-stone-300 mt-2 text-center">
                    {Math.round((sessionStats.easy / Math.max(sessionStats.easy + sessionStats.again + sessionStats.hard, 1)) * 100)}% easy rate
                  </p>
                </div>
              )}

              {hardRoundDone && (
                <button onClick={() => { setHardRoundDone(false); setCurrentIndex(0); setSessionStats(null); hardSessionRef.current = new Set(); }}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                  Done
                </button>
              )}
              <div className="mt-4 bg-stone-50 rounded-2xl px-5 py-3 text-center">
                <p className="text-xs text-stone-400">
                  {flashcards.length} card{flashcards.length !== 1 ? 's' : ''} in deck · next due{' '}
                  <span className="font-bold text-stone-600">
                    {flashcards.length > 0
                      ? new Date(Math.min(...flashcards.map((f: any) => new Date(f.nextReview).getTime()))).toLocaleDateString('en', { month: 'short', day: 'numeric' })
                      : '—'}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* hard round banner */}
              {hardRoundIds !== null && (
                <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-red-50 border border-red-100 rounded-2xl">
                  <XCircle size={13} className="text-red-400 shrink-0" />
                  <p className="text-xs font-bold text-red-500">Hard round — reviewing {dueCards.length} card{dueCards.length !== 1 ? 's' : ''} you found difficult</p>
                </div>
              )}

              {/* progress */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / dueCards.length) * 100}%` }} />
                </div>
                <span className="text-xs font-bold text-stone-400 shrink-0">{currentIndex + 1} / {dueCards.length}{hardRoundIds === null ? ' due' : ' hard'}</span>
                {/* focus mode toggle */}
                <button onClick={() => setFocusMode(f => !f)}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-xl bg-stone-100 text-stone-400 hover:bg-stone-200 transition-colors">
                  {focusMode ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
              </div>

              {/* daily goal reached banner */}
              {dailyProgress === dailyGoal && (
                <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-violet-50 border border-violet-100 rounded-2xl">
                  <Target size={13} className="text-violet-400 shrink-0" />
                  <p className="text-xs font-bold text-violet-500">Daily goal reached — {dailyGoal} cards reviewed today!</p>
                </div>
              )}

              {/* instruction hint */}
              {!isFlipped && (
                <div className="flex items-center justify-center gap-3 mb-3 text-[11px] text-stone-300">
                  <span className="hidden sm:inline">Tap the card or press</span>
                  <kbd className="hidden sm:inline px-2 py-0.5 bg-stone-100 rounded-lg font-mono font-bold text-stone-400 text-[10px]">Space</kbd>
                  <span className="hidden sm:inline">to reveal</span>
                  <span className="sm:hidden">Tap the card to reveal</span>
                </div>
              )}
              {isFlipped && (
                <div className="flex items-center justify-center gap-3 mb-3 text-[11px] text-stone-300">
                  <span>Rate how well you knew it, then continue</span>
                </div>
              )}

              {/* card */}
              <div
                className="w-full cursor-pointer"
                onClick={writeMode ? undefined : handleFlip}
                onTouchStart={(e) => {
                  const t = e.touches[0];
                  (e.currentTarget as any)._tx = t.clientX;
                  (e.currentTarget as any)._ty = t.clientY;
                }}
                onTouchEnd={(e) => {
                  if (!isFlipped) return;
                  const dx = e.changedTouches[0].clientX - (e.currentTarget as any)._tx;
                  const dy = e.changedTouches[0].clientY - (e.currentTarget as any)._ty;
                  if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 60) handleDifficulty('easy');
                    else if (dx < -60) handleDifficulty('hard');
                  } else if (dy < -60) {
                    handleDifficulty('medium');
                  }
                }}
              >
                {!isFlipped ? (
                  /* ── FRONT ── */
                  <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="rounded-[28px] shadow-lg border border-stone-100 overflow-hidden flex flex-col bg-white"
                    style={{ minHeight: 360 }}>

                    {/* dotted grid upper area — hidden in write mode */}
                    {!writeMode && (
                      <div className="relative flex-1 flex items-center justify-center overflow-hidden"
                        style={{
                          background: '#f8f9fa',
                          backgroundImage: 'radial-gradient(circle, #c8cdd4 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                          minHeight: 200,
                        }}>
                        <span className="absolute top-4 left-5 text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em]">
                          {currentCard.language}
                        </span>
                        <div className="absolute top-4 right-5 flex items-center gap-1.5">
                          {extra?.partOfSpeech && <span className="px-2 py-0.5 bg-white/80 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-wider">{extra.partOfSpeech}</span>}
                          {extra?.gender && <span className="px-2 py-0.5 bg-violet-50 rounded-full text-[10px] font-bold text-violet-500 uppercase tracking-wider">{extra.gender}</span>}
                        </div>
                        {isSpeaking ? <SineWave /> : (
                          <div className="w-16 h-16 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
                            <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                              <path d="M1 10 Q4 4 7 10 Q10 16 13 10 Q16 4 19 10 Q22 16 25 10 Q26.5 7 28 10"
                                stroke="#c8cdd4" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}

                    {/* bottom info panel */}
                    <div className={cn('bg-white px-6 shrink-0', writeMode ? 'pt-10 pb-8 flex-1 flex flex-col justify-center' : 'pt-5 pb-5')}>

                      {writeMode ? (
                        /* ── WRITE MODE: show English, hide target word ── */
                        <div onClick={(e) => e.stopPropagation()}>
                          <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.15em] mb-2">
                            Translate to {currentCard.language}
                          </p>
                          <p className={cn('font-black text-stone-900 leading-tight mb-6',
                            currentCard.translation.length > 30 ? 'text-2xl' : 'text-3xl')}>
                            {currentCard.translation}
                          </p>

                          {/* correct state */}
                          {writeResult === 'correct' ? (
                            <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-2xl text-emerald-600 text-sm font-bold">
                              <CheckCircle2 size={16} />
                              Correct — moving on…
                            </div>
                          ) : (
                            <>
                              {/* input row */}
                              <div className="flex gap-2 mb-3">
                                <input
                                  autoFocus
                                  type="text"
                                  value={writeInput}
                                  onChange={(e) => { setWriteInput(e.target.value); setWriteResult(null); }}
                                  onKeyDown={(e) => { if (e.key === 'Enter') checkWriteAnswer(e as any); }}
                                  placeholder={`Type in ${currentCard.language}…`}
                                  className="flex-1 px-3 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-indigo-400 bg-stone-50"
                                />
                                <button onClick={checkWriteAnswer}
                                  className="px-4 py-2.5 bg-indigo-500 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors">
                                  Check
                                </button>
                              </div>

                              {/* feedback after attempt */}
                              {writeResult && (
                                <div className={cn('flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold mb-3',
                                  writeResult === 'close' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600')}>
                                  {writeResult === 'close' ? <AlertTriangle size={13} /> : <XCircle size={13} />}
                                  {writeResult === 'close' ? 'Almost! Try again.' : 'Not quite. Try again.'}
                                </div>
                              )}

                              {/* after 2 failures: reveal buttons */}
                              {writeAttempts >= 2 && writeResult && (
                                <div className="flex gap-2 flex-wrap">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setWriteRevealed('answer'); }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl transition-colors">
                                    <CheckCircle2 size={12} />
                                    {writeRevealed === 'answer' ? currentCard.word : 'Reveal Answer'}
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setWriteRevealed('pronunciation'); }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl transition-colors">
                                    <Volume2 size={12} />
                                    {writeRevealed === 'pronunciation' && extra?.pronunciation ? extra.pronunciation : 'Reveal Pronunciation'}
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setWriteInput(''); setWriteResult(null); }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold rounded-xl transition-colors">
                                    <RotateCcw size={12} />
                                    Try Again
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ) : (
                        /* ── NORMAL MODE ── */
                        <>
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <p className={cn('font-black text-stone-900 leading-tight',
                              currentCard.word.length > 40 ? 'text-xl' : currentCard.word.length > 20 ? 'text-2xl' : 'text-3xl')}>
                              {currentCard.word}
                            </p>
                            <button
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                setIsSpeaking(true);
                                speakText(currentCard.word, currentCard.language, () => setIsSpeaking(false));
                              }}
                              className={cn('shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center transition-all mt-0.5',
                                isSpeaking ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400 hover:bg-emerald-50 hover:text-emerald-500')}>
                              <Volume2 size={15} />
                            </button>
                          </div>

                          <p className="text-sm text-stone-400 font-medium mb-1">{currentCard.translation}</p>

                          {/* confidence dots */}
                          <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className={cn('w-2 h-2 rounded-full transition-colors',
                                i <= Math.min(currentCard.easyStreak || 0, 5) ? 'bg-emerald-400' : 'bg-stone-100')} />
                            ))}
                            {(currentCard.easyStreak || 0) >= 5 && (
                              <span className="text-[10px] font-black text-emerald-500 ml-1">Mastered</span>
                            )}
                          </div>

                          {/* pronunciation button */}
                          <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button onClick={handleRecord}
                              className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border',
                                isRecording
                                  ? 'bg-red-500 text-white border-red-500 animate-pulse'
                                  : 'bg-stone-100 text-stone-400 border-stone-200 hover:border-emerald-300 hover:text-emerald-600')}>
                              {isRecording ? <MicOff size={12} /> : <Mic size={12} />}
                              {isRecording ? 'Recording…' : 'Pronounce'}
                            </button>
                            {pronLoading && <Loader2 size={13} className="animate-spin text-stone-300" />}
                            {pronResult && !pronLoading && (
                              <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold',
                                pronResult.verdict === 'correct' ? 'bg-emerald-50 text-emerald-600' :
                                  pronResult.verdict === 'close' ? 'bg-amber-50 text-amber-600' :
                                    'bg-red-50 text-red-600')}>
                                {pronResult.verdict === 'correct' ? <CheckCircle2 size={11} /> : pronResult.verdict === 'close' ? <AlertTriangle size={11} /> : <XCircle size={11} />}
                                {pronResult.verdict === 'correct' ? 'Correct' : pronResult.verdict === 'close' ? 'Close' : 'Wrong'}
                              </div>
                            )}
                            {pronResult?.feedback && !pronLoading && (
                              <span className="text-[11px] text-stone-400 truncate">{pronResult.feedback}</span>
                            )}
                          </div>

                          {(extra?.pronunciation || extra?.plural) && (
                            <div className="flex items-center gap-2 flex-wrap mt-1">
                              {extra?.pronunciation && <span className="text-xs font-mono text-stone-300 tracking-wider">{extra.pronunciation}</span>}
                              {extra?.plural && <span className="text-xs text-stone-300">· plural: <span className="font-semibold">{extra.plural}</span></span>}
                            </div>
                          )}

                          {extra?.summary && (
                            <p className="text-xs text-stone-400 italic leading-relaxed mt-2 line-clamp-2">{extra.summary}</p>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  /* ── BACK ── */
                  <motion.div key="back" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-[28px] shadow-lg overflow-hidden"
                    style={{ background: 'linear-gradient(160deg, #0f172a 0%, #1a2744 100%)' }}>

                    {/* translation header */}
                    <div className="px-6 pt-6 pb-4 border-b border-white/5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-1">English translation</p>
                          <p className={cn('font-black text-white leading-tight',
                            currentCard.translation.length > 30 ? 'text-xl' : currentCard.translation.length > 15 ? 'text-2xl' : 'text-3xl')}>
                            {currentCard.translation}
                          </p>
                        </div>
                        <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(currentCard.word, currentCard.language); }}
                          className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-emerald-500/30 transition-all text-emerald-400 shrink-0 mt-1">
                          <Volume2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* loading state */}
                    {isFetching && (
                      <div className="flex items-center justify-center gap-3 py-12 text-white/30">
                        <Loader2 size={20} className="animate-spin" />
                        <span className="text-sm">Loading details...</span>
                      </div>
                    )}

                    {/* error state */}
                    {fetchError && !isFetching && (
                      <div className="mx-6 my-5 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 text-red-300 text-sm">
                        <AlertTriangle size={15} className="shrink-0" />
                        {fetchError}
                      </div>
                    )}

                    {/* body */}
                    {extra && !isFetching && (
                      <div className="px-6 py-5 space-y-5">
                        {extra.notes && (
                          <p className="text-xs text-white/35 italic leading-relaxed border-l-2 border-white/10 pl-3">{extra.notes}</p>
                        )}

                        {/* formal */}
                        {extra.alternatives?.filter((a: any) => a.register === 'formal').length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <p className="text-[10px] font-black text-blue-400/80 uppercase tracking-[0.15em]">Formal usage</p>
                            </div>
                            <div className="space-y-2">
                              {extra.alternatives.filter((a: any) => a.register === 'formal').map((alt: any, i: number) => (
                                <div key={i} className="bg-blue-500/10 border border-blue-500/10 rounded-2xl p-4">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-white font-bold text-base">{alt.text}</p>
                                    <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(alt.text, currentCard.language); }} className="text-blue-400/50 hover:text-blue-300 transition-colors shrink-0"><Volume2 size={14} /></button>
                                  </div>
                                  {alt.notes && <p className="text-blue-200/60 text-xs leading-relaxed">{alt.notes}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* informal */}
                        {extra.alternatives?.filter((a: any) => a.register === 'informal').length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <p className="text-[10px] font-black text-amber-400/80 uppercase tracking-[0.15em]">Informal usage</p>
                            </div>
                            <div className="space-y-2">
                              {extra.alternatives.filter((a: any) => a.register === 'informal').map((alt: any, i: number) => (
                                <div key={i} className="bg-amber-500/10 border border-amber-500/10 rounded-2xl p-4">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-white font-bold text-base">{alt.text}</p>
                                    <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(alt.text, currentCard.language); }} className="text-amber-400/50 hover:text-amber-300 transition-colors shrink-0"><Volume2 size={14} /></button>
                                  </div>
                                  {alt.notes && <p className="text-amber-200/60 text-xs leading-relaxed">{alt.notes}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* neutral/other */}
                        {extra.alternatives?.filter((a: any) => a.register !== 'formal' && a.register !== 'informal').length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em]">Other variants</p>
                            </div>
                            <div className="space-y-2">
                              {extra.alternatives.filter((a: any) => a.register !== 'formal' && a.register !== 'informal').map((alt: any, i: number) => (
                                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-white/80 font-bold text-base">{alt.text}</p>
                                    <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(alt.text, currentCard.language); }} className="text-white/20 hover:text-white/60 transition-colors shrink-0"><Volume2 size={14} /></button>
                                  </div>
                                  {alt.notes && <p className="text-white/40 text-xs leading-relaxed">{alt.notes}</p>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* examples */}
                        {extra.examples?.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <p className="text-[10px] font-black text-emerald-400/80 uppercase tracking-[0.15em]">Example sentences</p>
                            </div>
                            <div className="space-y-2">
                              {extra.examples.map((ex: any, i: number) => (
                                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0 space-y-1">
                                      <p className="text-white font-semibold text-sm leading-relaxed">{ex.target}</p>
                                      <p className="text-white/40 text-xs leading-relaxed">{ex.english}</p>
                                    </div>
                                    <button onClick={(e: React.MouseEvent) => { e.stopPropagation(); speakText(ex.target, currentCard.language); }} className="text-emerald-400/40 hover:text-emerald-400 transition-colors shrink-0 mt-0.5"><Volume2 size={14} /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* cultural note */}
                        {extra.culturalNote && (
                          <div className="bg-amber-500/8 border border-amber-500/10 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-amber-400/60 uppercase tracking-[0.15em] mb-1.5">Cultural note</p>
                            <p className="text-amber-200/60 text-xs leading-relaxed">{extra.culturalNote}</p>
                          </div>
                        )}

                        {/* common mistake */}
                        {extra.commonMistakes && (
                          <div className="bg-red-500/8 border border-red-500/10 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-red-400/60 uppercase tracking-[0.15em] mb-1.5">Common mistake</p>
                            <p className="text-red-200/60 text-xs leading-relaxed">{extra.commonMistakes}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="px-6 pb-5 text-center">
                      <p className="text-white/15 text-xs">tap to flip back</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* difficulty buttons — only shown after flipping */}
              {isFlipped && (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { d: 'hard' as const, label: 'Hard', icon: XCircle, hoverCls: 'hover:bg-red-50 hover:border-red-200', iconCls: 'group-hover:text-red-400', textCls: 'group-hover:text-red-600' },
                    { d: 'medium' as const, label: 'Again', icon: RotateCcw, hoverCls: 'hover:bg-orange-50 hover:border-orange-200', iconCls: 'group-hover:text-orange-400', textCls: 'group-hover:text-orange-600' },
                    { d: 'easy' as const, label: 'Easy', icon: CheckCircle2, hoverCls: 'hover:bg-emerald-50 hover:border-emerald-200', iconCls: 'group-hover:text-emerald-400', textCls: 'group-hover:text-emerald-600' },
                  ].map(({ d, label, icon: Icon, hoverCls, iconCls, textCls }) => (
                    <button key={d} onClick={() => handleDifficulty(d)}
                      className={cn('group flex flex-col items-center gap-1.5 py-4 rounded-2xl bg-white border border-stone-100 transition-all', hoverCls)}>
                      <Icon className={cn('w-5 h-5 text-stone-200 transition-colors', iconCls)} />
                      <span className={cn('text-xs font-bold text-stone-300 uppercase tracking-wider transition-colors', textCls)}>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      ) : (
        /* ── DECK LIST ── */
        <div className="space-y-4">

          {/* Deck stats bar */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total', value: deckStats.total, color: 'text-stone-700' },
              { label: 'Due today', value: deckStats.due, color: 'text-red-500' },
              { label: 'Mastered', value: deckStats.mastered, color: 'text-emerald-600' },
              { label: 'Avg confidence', value: `${deckStats.avgConfidence}%`, color: 'text-violet-500' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-stone-100 px-4 py-3 text-center">
                <p className={cn('text-xl font-black', s.color)}>{s.value}</p>
                <p className="text-[10px] font-bold text-stone-300 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px]">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300" />
              <input value={deckSearch} onChange={e => setDeckSearch(e.target.value)}
                placeholder="Search words…"
                className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-400 bg-white" />
            </div>

            {/* Language filter */}
            <div className="flex items-center gap-1 flex-wrap">
              {['all', ...deckLanguages].map(l => (
                <button key={l} onClick={() => setDeckLangFilter(l)}
                  className={cn('px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
                    deckLangFilter === l ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400 hover:bg-stone-200')}>
                  {l === 'all' ? 'All' : l}
                </button>
              ))}
            </div>

            {/* Sort — custom dropdown */}
            <div className="relative">
              <button onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl border border-stone-200 bg-white text-stone-500 hover:border-stone-300 transition-colors min-w-[130px] justify-between">
                <span>{{
                  newest: 'Newest', az: 'A → Z', za: 'Z → A',
                  due: 'Due soonest', hardest: 'Hardest', confident: 'Most confident'
                }[deckSort]}</span>
                <ChevronDown size={12} className={cn('transition-transform', sortOpen && 'rotate-180')} />
              </button>
              {sortOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white border border-stone-100 rounded-2xl shadow-lg z-30 overflow-hidden min-w-[160px]">
                  {([
                    { value: 'newest', label: 'Newest added' },
                    { value: 'az', label: 'A → Z' },
                    { value: 'za', label: 'Z → A' },
                    { value: 'due', label: 'Due soonest' },
                    { value: 'hardest', label: 'Hardest first' },
                    { value: 'confident', label: 'Most confident' },
                  ] as const).map(opt => (
                    <button key={opt.value}
                      onClick={() => { setDeckSort(opt.value); setSortOpen(false); }}
                      className={cn('w-full text-left px-4 py-2.5 text-xs font-bold transition-colors',
                        deckSort === opt.value
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-stone-500 hover:bg-stone-50')}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Group by language */}
            <button onClick={() => setDeckGroupByLang(g => !g)}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors',
                deckGroupByLang ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-stone-400 border-stone-200 hover:border-indigo-300')}>
              <Globe2 size={12} /> Group
            </button>

            {/* Bulk select */}
            <button onClick={() => { setBulkMode(b => !b); setSelectedCards(new Set()); }}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors',
                bulkMode ? 'bg-stone-800 text-white border-stone-800' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400')}>
              <CheckCircle2 size={12} /> {bulkMode ? 'Cancel' : 'Select'}
            </button>

            {/* Export */}
            <button onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border bg-white text-stone-400 border-stone-200 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
              <Download size={12} /> Export
            </button>
          </div>

          {/* Bulk action bar */}
          {bulkMode && selectedCards.size > 0 && (
            <div className="flex items-center gap-3 px-4 py-2.5 bg-stone-900 rounded-2xl">
              <span className="text-xs font-bold text-white">{selectedCards.size} selected</span>
              <button onClick={() => {
                selectedCards.forEach(id => {
                  removeFlashcard(id);
                  if (user) import('../services/dbService').then(m => m.deleteFlashcard(id, user.id)).catch(() => { });
                });
                setSelectedCards(new Set());
                setBulkMode(false);
              }} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-colors">
                <Trash2 size={12} /> Delete selected
              </button>
              <button onClick={() => setSelectedCards(new Set(sortedFilteredCards.map((c: any) => c.id)))}
                className="text-xs font-bold text-stone-300 hover:text-white transition-colors">Select all</button>
            </div>
          )}

          {/* Cards — grouped or flat */}
          {deckGroupByLang ? (
            deckLanguages.filter(l => deckLangFilter === 'all' || l === deckLangFilter).map(lang => {
              const langCards = sortedFilteredCards.filter((c: any) => c.language === lang);
              if (!langCards.length) return null;
              const collapsed = collapsedLangs.has(lang);
              return (
                <div key={lang}>
                  <button onClick={() => setCollapsedLangs(prev => { const s = new Set(prev); s.has(lang) ? s.delete(lang) : s.add(lang); return s; })}
                    className="flex items-center gap-2 mb-3 w-full text-left">
                    <span className="text-xs font-black text-stone-500 uppercase tracking-widest">{lang}</span>
                    <span className="px-2 py-0.5 bg-stone-100 rounded-full text-[10px] font-bold text-stone-400">{langCards.length}</span>
                    <ChevronDown size={13} className={cn('text-stone-300 transition-transform ml-auto', collapsed && '-rotate-90')} />
                  </button>
                  {!collapsed && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {langCards.map((card: any) => renderDeckCard(card))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedFilteredCards.map((card: any) => renderDeckCard(card))}
            </div>
          )}

          {sortedFilteredCards.length === 0 && (
            <div className="text-center py-16 text-stone-300">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No cards match your search</p>
            </div>
          )}

          {/* Add card FAB */}
          <div className="fixed bottom-8 right-8 z-40">
            {addCardOpen ? (
              <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-5 w-72">
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-4">Add Card</p>
                <div className="space-y-2">
                  <input value={addCardForm.word} onChange={e => setAddCardForm(f => ({ ...f, word: e.target.value }))}
                    placeholder="Target word (e.g. bonjour)"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-400" />
                  <input value={addCardForm.translation} onChange={e => setAddCardForm(f => ({ ...f, translation: e.target.value }))}
                    placeholder="English translation"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-400" />
                  <select value={addCardForm.language} onChange={e => setAddCardForm(f => ({ ...f, language: e.target.value }))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-400 bg-white">
                    {['French', 'Spanish', 'German', 'Italian', 'Japanese', 'Portuguese', 'Chinese'].map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={handleAddCard} disabled={addCardLoading}
                    className="flex-1 py-2 bg-emerald-500 text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors disabled:opacity-50">
                    {addCardLoading ? 'Adding…' : 'Add'}
                  </button>
                  <button onClick={() => setAddCardOpen(false)}
                    className="px-4 py-2 bg-stone-100 text-stone-500 text-xs font-bold rounded-xl hover:bg-stone-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddCardOpen(true)}
                className="w-14 h-14 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center hover:bg-emerald-600 transition-all hover:scale-105">
                <Plus size={22} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

};

export default FlashcardsView;
