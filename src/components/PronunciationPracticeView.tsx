import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
    Mic, MicOff, Volume2, RotateCcw, ChevronRight,
    Loader2, AlertCircle, Plus, X, CheckCircle2, Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { speakText } from '../services/voiceService';
import { scorePronunciation, generatePronunciationPhrases, translateToLanguage } from '../services/aiService';
import { Language } from '../store/useAppStore';

const LANG_CODES: Record<string, string> = {
    French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
    Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN',
};

type Phrase = { id: string; phrase: string; translation: string; level: string };
type PhraseResult = { phrase: Phrase; score: number; spokenText: string; passed: boolean };

const LEVEL_COLORS: Record<string, { text: string; bg: string; border: string }> = {
    beginner: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    intermediate: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    advanced: { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
    custom: { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
};

const ScoreRing = ({ score, size = 96 }: { score: number; size?: number }) => {
    const color = score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : score >= 50 ? '#f97316' : '#ef4444';
    const r = size / 2 - 8; const circ = 2 * Math.PI * r;
    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ - (score / 100) * circ }}
                    transition={{ duration: 1, ease: 'easeOut' }} />
            </svg>
            <div className="absolute text-center">
                <p className="font-black" style={{ color, fontSize: size > 80 ? 22 : 14 }}>{score}</p>
                <p className="text-stone-400 font-bold" style={{ fontSize: 9 }}>/ 100</p>
            </div>
        </div>
    );
};

const RecordingWave = () => (
    <div className="flex items-center gap-1 h-8">
        {[0.4, 0.7, 1, 0.7, 0.4, 0.9, 0.6].map((h, i) => (
            <motion.div key={i} className="w-1.5 bg-red-400 rounded-full"
                animate={{ scaleY: [h, 1, h * 0.5, 1, h] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                style={{ height: 32, originY: 0.5 }} />
        ))}
    </div>
);

// ── Setup screen ──────────────────────────────────────────────────────────────
const SetupScreen = ({ lang, onStart }: { lang: Language; onStart: (phrases: Phrase[]) => void }) => {
    const [count, setCount] = useState(10);
    const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setError(null);
        setLoading(true);
        try {
            // Always generate fresh phrases — no caching
            const raw = await generatePronunciationPhrases(lang, difficulty, count, topic.trim() || undefined);
            if (!raw.length) throw new Error('No phrases generated. Try again.');
            const phrases: Phrase[] = raw.map((p, i) => ({ ...p, id: `p-${Date.now()}-${i}` }));
            onStart(phrases);
        } catch (err: any) {
            setError(err?.message || 'Failed to generate phrases. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto">
                    <Mic size={38} className="text-rose-600" />
                </div>
                <h1 className="text-3xl font-black text-stone-900">Pronunciation Practice</h1>
                <p className="text-stone-400 text-sm">
                    Fresh AI phrases in <span className="font-bold text-stone-600">{lang}</span> every session — speak them and get scored
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-6">
                <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">How many sentences?</p>
                    <div className="flex gap-2 flex-wrap">
                        {[5, 10, 15, 20, 30].map(n => (
                            <button key={n} onClick={() => setCount(n)}
                                className={cn('px-4 py-2 rounded-2xl text-sm font-bold transition-all border',
                                    count === n ? 'bg-rose-600 text-white border-rose-600' : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300')}>
                                {n}
                            </button>
                        ))}
                        <input type="number" min={1} max={50} value={count}
                            onChange={e => setCount(Math.max(1, Math.min(50, Number(e.target.value))))}
                            className="w-20 px-3 py-2 rounded-2xl text-sm font-bold border border-stone-200 bg-stone-50 text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-200" />
                    </div>
                </div>

                <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Difficulty</p>
                    <div className="flex gap-2">
                        {(['beginner', 'intermediate', 'advanced'] as const).map(lvl => (
                            <button key={lvl} onClick={() => setDifficulty(lvl)}
                                className={cn('flex-1 py-2 rounded-2xl text-xs font-bold capitalize transition-all border',
                                    difficulty === lvl
                                        ? lvl === 'beginner' ? 'bg-emerald-500 text-white border-emerald-500'
                                            : lvl === 'intermediate' ? 'bg-amber-500 text-white border-amber-500'
                                                : 'bg-rose-600 text-white border-rose-600'
                                        : 'bg-stone-50 text-stone-500 border-stone-200 hover:border-stone-300')}>
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">
                        Topic <span className="text-stone-300 font-normal normal-case">(optional)</span>
                    </p>
                    <input value={topic} onChange={e => setTopic(e.target.value)}
                        placeholder="e.g. food, travel, greetings, business…"
                        className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-200 text-stone-800 border border-stone-100" />
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm">
                        <AlertCircle size={15} className="shrink-0" />{error}
                    </div>
                )}

                <button onClick={handleGenerate} disabled={loading}
                    className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Generating {count} phrases…</> : <><Sparkles size={18} /> Start Practice Session</>}
                </button>
            </div>
        </div>
    );
};

// ── Results breakdown screen ──────────────────────────────────────────────────
const ResultsScreen = ({ results, onReset }: { results: PhraseResult[]; onReset: () => void }) => {
    const passed = results.filter(r => r.passed);
    const failed = results.filter(r => !r.passed);
    const avg = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;
    const best = results.length ? Math.max(...results.map(r => r.score)) : 0;

    const grade = avg >= 90 ? { label: 'Outstanding', color: '#10b981', emoji: '🏆' }
        : avg >= 75 ? { label: 'Great', color: '#f59e0b', emoji: '🎉' }
            : avg >= 60 ? { label: 'Good', color: '#f97316', emoji: '👍' }
                : { label: 'Keep Practicing', color: '#ef4444', emoji: '💪' };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
            {/* Hero */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 text-center space-y-4">
                <div className="text-5xl">{grade.emoji}</div>
                <h1 className="text-3xl font-black text-stone-900">Session Complete!</h1>
                <p className="font-bold text-lg" style={{ color: grade.color }}>{grade.label}</p>

                <div className="flex items-center justify-center gap-8 pt-2">
                    <ScoreRing score={avg} size={96} />
                    <div className="text-left space-y-2">
                        <div className="text-sm text-stone-500">Average score</div>
                        <div className="flex items-center gap-3">
                            <div className="text-center">
                                <p className="text-2xl font-black text-emerald-600">{passed.length}</p>
                                <p className="text-[10px] text-stone-400 font-bold uppercase">Passed</p>
                            </div>
                            <div className="w-px h-8 bg-stone-100" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-red-500">{failed.length}</p>
                                <p className="text-[10px] text-stone-400 font-bold uppercase">Needs work</p>
                            </div>
                            <div className="w-px h-8 bg-stone-100" />
                            <div className="text-center">
                                <p className="text-2xl font-black text-amber-500">{best}</p>
                                <p className="text-[10px] text-stone-400 font-bold uppercase">Best</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Per-phrase breakdown */}
            <div className="space-y-3">
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Phrase Breakdown</p>
                {results.map((r, i) => {
                    const lc = LEVEL_COLORS[r.phrase.level] ?? LEVEL_COLORS.beginner;
                    const scoreColor = r.score >= 85 ? '#10b981' : r.score >= 70 ? '#f59e0b' : r.score >= 50 ? '#f97316' : '#ef4444';
                    return (
                        <motion.div key={r.phrase.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-start gap-4">
                            <ScoreRing score={r.score} size={56} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={cn('text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full border', lc.text, lc.bg, lc.border)}>
                                        {r.phrase.level}
                                    </span>
                                    {r.passed
                                        ? <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle2 size={10} /> Passed</span>
                                        : <span className="text-[10px] text-red-500 font-bold">Needs work</span>}
                                </div>
                                <p className="text-sm font-bold text-stone-800 truncate">{r.phrase.phrase}</p>
                                <p className="text-xs text-stone-400 italic truncate">{r.phrase.translation}</p>
                                {r.spokenText && (
                                    <p className="text-xs text-stone-400 mt-0.5">You said: <span className="italic">"{r.spokenText}"</span></p>
                                )}
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-lg font-black" style={{ color: scoreColor }}>{r.score}</p>
                                <p className="text-[9px] text-stone-300">/ 100</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Needs work section */}
            {failed.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 space-y-2">
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">Focus on these next time</p>
                    {failed.map(r => (
                        <div key={r.phrase.id} className="flex items-center gap-2">
                            <span className="text-red-400">•</span>
                            <p className="text-sm text-stone-700 font-medium">{r.phrase.phrase}</p>
                            <button onClick={() => speakText(r.phrase.phrase, 'French')}
                                className="ml-auto p-1 rounded-lg hover:bg-red-100 text-red-400 transition-all">
                                <Volume2 size={13} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={onReset}
                className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2">
                <Sparkles size={18} /> Start New Session
            </button>
        </div>
    );
};

// ── Practice screen ───────────────────────────────────────────────────────────
const PracticeScreen = ({
    initialPhrases, lang, onReset, onFinish,
}: {
    initialPhrases: Phrase[];
    lang: Language;
    onReset: () => void;
    onFinish: (results: PhraseResult[]) => void;
}) => {
    const [queue, setQueue] = useState<Phrase[]>(initialPhrases);
    const [current, setCurrent] = useState<Phrase>(initialPhrases[0]);
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const [result, setResult] = useState<{ score: number; feedback: string; corrections: { word: string; tip: string }[] } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<PhraseResult[]>([]);
    // Add custom phrase panel
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [customInput, setCustomInput] = useState('');
    const [addingPhrase, setAddingPhrase] = useState(false);
    const recognitionRef = useRef<any>(null);

    const totalOriginal = initialPhrases.length;
    const remaining = queue.length;
    const done = totalOriginal - remaining;

    // Remove a phrase from the queue and advance
    const removeAndAdvance = (phraseId: string, phraseResult?: PhraseResult) => {
        setQueue(prev => {
            const next = prev.filter(p => p.id !== phraseId);
            if (next.length === 0) {
                // All done — finish after state settles
                setTimeout(() => onFinish(phraseResult ? [...results, phraseResult] : results), 300);
                return next;
            }
            // Pick next phrase (stay at same index or wrap)
            const idx = prev.findIndex(p => p.id === phraseId);
            const nextIdx = Math.min(idx, next.length - 1);
            setCurrent(next[nextIdx]);
            return next;
        });
        setResult(null);
        setSpokenText('');
        setError(null);
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        recognitionRef.current = null;
        setIsListening(false);
    };

    const listen = useCallback(() => {
        if (isListening) { stopListening(); return; }
        const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SR) { setError('Speech recognition not supported. Use Chrome or Edge.'); return; }
        setError(null);
        setSpokenText('');
        const rec = new SR();
        rec.lang = LANG_CODES[lang] || 'fr-FR';
        rec.continuous = false;
        rec.interimResults = false;
        rec.onstart = () => setIsListening(true);
        rec.onresult = async (e: any) => {
            const text = e.results[0][0].transcript;
            setSpokenText(text);
            setIsListening(false);
            setLoading(true);
            try {
                const r = await scorePronunciation(current.phrase, text, lang);
                setResult(r);
                const pr: PhraseResult = { phrase: current, score: r.score, spokenText: text, passed: r.score >= 70 };
                setResults(prev => [...prev, pr]);
                // Auto-remove if passed (score >= 70)
                if (r.score >= 70) {
                    setTimeout(() => removeAndAdvance(current.id, pr), 1200);
                }
            } catch {
                setError('Could not score. Check your connection and try again.');
            } finally {
                setLoading(false);
            }
        };
        rec.onerror = (e: any) => {
            if (e.error !== 'aborted') setError(`Mic error: ${e.error}. Check browser permissions.`);
            setIsListening(false);
        };
        rec.onend = () => setIsListening(false);
        recognitionRef.current = rec;
        rec.start();
    }, [current, lang, isListening, results]);

    // Next = skip/remove card regardless of score
    const handleNext = () => {
        if (!result) {
            // No attempt yet — just skip (record as skipped, don't add to results)
            removeAndAdvance(current.id);
        } else {
            removeAndAdvance(current.id);
        }
    };

    const handleAddCustom = async () => {
        const trimmed = customInput.trim();
        if (!trimmed) return;
        setAddingPhrase(true);
        try {
            const translated = await translateToLanguage(trimmed, lang);
            const newPhrase: Phrase = {
                id: `custom-${Date.now()}`,
                phrase: translated.phrase,
                translation: translated.translation,
                level: 'custom',
            };
            setQueue(prev => [...prev, newPhrase]);
            setCustomInput('');
            setShowAddPanel(false);
        } catch {
            setError('Could not translate phrase. Try again.');
        } finally {
            setAddingPhrase(false);
        }
    };

    const levelColors = LEVEL_COLORS[current?.level] ?? LEVEL_COLORS.beginner;
    const sessionAvg = results.length ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : null;

    if (!current) return null;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-black text-stone-900">Pronunciation Practice</h1>
                    <p className="text-xs text-stone-400 mt-0.5">{lang} · {remaining} remaining</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowAddPanel(v => !v)}
                        className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all',
                            showAddPanel ? 'bg-violet-100 text-violet-700' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                        <Plus size={13} /> Add phrase
                    </button>
                    <button onClick={onReset}
                        className="text-xs text-stone-400 hover:text-stone-600 font-bold px-3 py-2 rounded-xl hover:bg-stone-100 transition-all">
                        New session
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-stone-400 font-bold">
                    <span>{done} cleared · {remaining} left</span>
                    {sessionAvg !== null && <span>Avg: {sessionAvg}/100</span>}
                </div>
                <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-rose-500 rounded-full"
                        animate={{ width: `${(done / totalOriginal) * 100}%` }}
                        transition={{ duration: 0.4 }} />
                </div>
            </div>

            {/* Add phrase panel */}
            <AnimatePresence>
                {showAddPanel && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden">
                        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 space-y-3">
                            <p className="text-xs font-black text-violet-500 uppercase tracking-widest">Add a custom phrase</p>
                            <p className="text-[11px] text-stone-400">Type anything — it'll be translated to <span className="font-bold">{lang}</span> and added to your queue</p>
                            <div className="flex gap-2">
                                <input value={customInput} onChange={e => setCustomInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleAddCustom()}
                                    placeholder="Type a word, phrase, or sentence…"
                                    className="flex-1 px-3 py-2 bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 text-stone-800 border border-violet-100" />
                                <button onClick={handleAddCustom} disabled={addingPhrase || !customInput.trim()}
                                    className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-all disabled:opacity-50 flex items-center gap-1.5">
                                    {addingPhrase ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add
                                </button>
                                <button onClick={() => setShowAddPanel(false)} className="p-2 bg-white rounded-xl text-stone-400 hover:bg-stone-100 border border-violet-100">
                                    <X size={15} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phrase card */}
            <AnimatePresence mode="wait">
                <motion.div key={current.id}
                    initial={{ opacity: 0, x: 30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.97 }}
                    className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 space-y-4 text-center">
                    <div className="flex items-center justify-between">
                        <span className={cn('text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border',
                            levelColors.text, levelColors.bg, levelColors.border)}>
                            {current.level}
                        </span>
                        <span className="text-[10px] text-stone-400 font-bold">{remaining} card{remaining !== 1 ? 's' : ''} left</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 leading-relaxed">{current.phrase}</p>
                    <p className="text-stone-400 italic text-sm">{current.translation}</p>
                    <button onClick={() => speakText(current.phrase, lang)}
                        className="flex items-center gap-2 mx-auto text-sm text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                        <Volume2 size={16} /> Listen to native pronunciation
                    </button>
                </motion.div>
            </AnimatePresence>

            {/* Error */}
            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 font-bold text-xs">✕</button>
                </div>
            )}

            {/* Record */}
            {!result && !loading && (
                <div className="flex flex-col items-center gap-4">
                    <button onClick={listen}
                        className={cn('w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-lg',
                            isListening ? 'bg-red-500 shadow-red-200 scale-110' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200 hover:scale-105')}>
                        {isListening ? <MicOff size={36} className="text-white" /> : <Mic size={36} className="text-white" />}
                    </button>
                    {isListening
                        ? <div className="flex flex-col items-center gap-2"><RecordingWave /><p className="text-sm text-red-500 font-medium">Listening… tap to stop</p></div>
                        : <p className="text-sm text-stone-400">Tap to record your pronunciation</p>}
                    {spokenText && !isListening && (
                        <p className="text-sm text-stone-500 italic bg-stone-50 px-4 py-2 rounded-2xl">You said: "{spokenText}"</p>
                    )}
                    {/* Skip button */}
                    <button onClick={handleNext} className="text-xs text-stone-400 hover:text-stone-600 font-bold flex items-center gap-1">
                        Skip <ChevronRight size={13} />
                    </button>
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center gap-3 py-8 text-stone-400">
                    <Loader2 size={22} className="animate-spin" /> Scoring your pronunciation…
                </div>
            )}

            {/* Result */}
            <AnimatePresence>
                {result && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-5">
                        <div className="flex items-center gap-6">
                            <ScoreRing score={result.score} size={96} />
                            <div className="flex-1 space-y-1">
                                <p className="font-bold text-stone-800 text-lg">
                                    {result.score >= 85 ? '🎉 Excellent!' : result.score >= 70 ? '👍 Good job! Moving on…' : result.score >= 50 ? '💪 Keep practicing!' : '🔄 Try again'}
                                </p>
                                <p className="text-sm text-stone-500 leading-relaxed">{result.feedback}</p>
                                {spokenText && <p className="text-xs text-stone-400 italic">You said: "{spokenText}"</p>}
                                {result.score >= 70
                                    ? <p className="text-xs text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 size={11} /> Card cleared</p>
                                    : <p className="text-xs text-amber-600 font-bold">Score 70+ to clear this card</p>}
                            </div>
                        </div>

                        {result.corrections.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Pronunciation tips</p>
                                {result.corrections.map((c, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                                        <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                                        <div><span className="text-xs font-bold text-stone-700">{c.word}: </span><span className="text-xs text-stone-500">{c.tip}</span></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Only show retry/next if score < 70 (passed cards auto-advance) */}
                        {result.score < 70 && (
                            <div className="flex gap-3">
                                <button onClick={() => { setResult(null); setSpokenText(''); setError(null); }}
                                    className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2">
                                    <RotateCcw size={15} /> Try Again
                                </button>
                                <button onClick={handleNext}
                                    className="flex-1 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all flex items-center justify-center gap-2">
                                    Next <ChevronRight size={15} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Root ──────────────────────────────────────────────────────────────────────
type Screen = 'setup' | 'practice' | 'results';

const PronunciationPracticeView = () => {
    const { quizSettings } = useAppStore();
    const lang = quizSettings.targetLanguage;
    const [screen, setScreen] = useState<Screen>('setup');
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [finalResults, setFinalResults] = useState<PhraseResult[]>([]);

    // Reset when language changes
    useEffect(() => { setScreen('setup'); setPhrases([]); setFinalResults([]); }, [lang]);

    const handleStart = (p: Phrase[]) => { setPhrases(p); setScreen('practice'); };
    const handleFinish = (r: PhraseResult[]) => { setFinalResults(r); setScreen('results'); };
    const handleReset = () => { setPhrases([]); setFinalResults([]); setScreen('setup'); };

    if (screen === 'setup') return <SetupScreen lang={lang} onStart={handleStart} />;
    if (screen === 'results') return <ResultsScreen results={finalResults} onReset={handleReset} />;
    return <PracticeScreen initialPhrases={phrases} lang={lang} onReset={handleReset} onFinish={handleFinish} />;
};

export default PronunciationPracticeView;
