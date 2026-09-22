import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, PenLine, RotateCcw, Loader2, AlertTriangle, Pencil } from 'lucide-react';
import { cn } from '../../lib/utils';
import { speakText } from '../../services/voiceService';

// The 30 most useful beginner characters (HSK 1 core) — every one is tappable
const STARTER_CHARS = ['我', '你', '他', '她', '好', '是', '不', '人', '中', '文', '学', '国', '吃', '喝', '去', '来', '看', '听', '说', '读', '写', '天', '大', '小', '上', '下', '水', '火', '月', '日'];

// ── Mini inline writer — used inside lesson character cards ──────────────────
export const StrokeWriter = ({ hanzi, size = 120 }: { hanzi: string; size?: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const writerRef = useRef<any>(null);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        setError(false); setReady(false);
        ref.current.innerHTML = '';
        const writer = HanziWriter.create(ref.current, hanzi, {
            width: size, height: size, padding: 4,
            strokeColor: '#1c1917', outlineColor: '#e7e5e4',
            showOutline: true, showCharacter: false,
            strokeAnimationSpeed: 1.2, delayBetweenStrokes: 260,
        });
        writerRef.current = writer;
        const t = setTimeout(() => {
            writer.animateCharacter().catch(() => setError(true));
            setReady(true);
        }, 150);
        return () => { clearTimeout(t); writerRef.current = null; };
    }, [hanzi, size]);

    if (error) return <p className="text-[10px] text-stone-300 italic text-center py-4">Stroke data unavailable (offline?)</p>;
    return (
        <button onClick={() => writerRef.current?.animateCharacter().catch(() => { })}
            className="mx-auto block rounded-2xl hover:bg-stone-50 transition-colors p-1" title="Replay the stroke order">
            <div ref={ref} className="mx-auto" />
        </button>
    );
};

// ── The full stroke-order teacher — animate + trace-it-yourself quiz ─────────
export const StrokeOrderTeacher = () => {
    const [hanzi, setHanzi] = useState('我');
    const [mode, setMode] = useState<'idle' | 'animating' | 'quiz'>('idle');
    const [quizProgress, setQuizProgress] = useState('');
    const [quizDone, setQuizDone] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [custom, setCustom] = useState('');
    const holderRef = useRef<HTMLDivElement>(null);
    const writerRef = useRef<any>(null);

    const mount = (char: string) => {
        if (!holderRef.current) return;
        setError(false); setLoading(true); setMode('idle'); setQuizDone(false); setQuizProgress('');
        holderRef.current.innerHTML = '';
        const writer = HanziWriter.create(holderRef.current, char, {
            width: 220, height: 220, padding: 6,
            strokeColor: '#1c1917', outlineColor: '#e7e5e4', highlightColor: '#10b981',
            showOutline: true, showCharacter: false,
            strokeAnimationSpeed: 1, delayBetweenStrokes: 350,
            onLoadCharDataError: (reason: unknown) => { setError(true); setLoading(false); },
        });
        writerRef.current = writer;
        // data loads lazily on first animate/quiz — the timeout below clears the spinner
        setTimeout(() => setLoading(false), 1200);
    };

    useEffect(() => { mount(hanzi); }, [hanzi]);

    const animate = () => {
        if (!writerRef.current) return;
        setMode('animating'); setQuizDone(false);
        writerRef.current.animateCharacter({
            onComplete: () => setMode('idle'),
        }).catch(() => setError(true));
    };

    const startQuiz = () => {
        if (!writerRef.current) return;
        setMode('quiz'); setQuizDone(false);
        setQuizProgress('Trace each stroke in order — start where stroke 1 begins');
        writerRef.current.quiz({
            showHintAfterMisses: 3,
            onCorrectStroke: (d: any) => setQuizProgress(`Stroke ${d.strokeNum + 1} of ${d.totalStrokes} correct — keep going`),
            onMistake: (d: any) => setQuizProgress(`Not quite — stroke ${d.strokeNum + 1}. Watch the hint and try again`),
            onComplete: (d: any) => {
                setQuizProgress('');
                setQuizDone(true);
                setMode('idle');
                speakText(hanzi, 'Chinese');
            },
        });
    };

    const reset = () => mount(hanzi);

    return (
        <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6 space-y-4">
            <div>
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Write it yourself</p>
                <p className="text-sm font-black text-stone-900">Stroke-order teacher</p>
                <p className="text-xs text-stone-500 mt-0.5">Watch exactly how the character is drawn, stroke by stroke — then trace it yourself: draw each stroke on the character with your finger or mouse.</p>
            </div>

            {/* the writer canvas */}
            <div className="relative bg-stone-50 rounded-3xl border border-stone-100 flex items-center justify-center py-6">
                {loading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-50/80 z-10 rounded-3xl">
                        <Loader2 size={20} className="animate-spin text-stone-300" />
                    </div>
                )}
                {error ? (
                    <div className="flex flex-col items-center gap-2 py-10 px-6 text-center">
                        <AlertTriangle size={20} className="text-amber-400" />
                        <p className="text-xs text-stone-500">Stroke data for this character couldn't load (it streams from the dictionary — check your connection).</p>
                    </div>
                ) : (
                    <div ref={holderRef} />
                )}
            </div>

            {error && (
                <div className="flex gap-2">
                    <input value={custom} onChange={e => setCustom(e.target.value)} maxLength={1} placeholder="Try another character…"
                        className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-400" />
                    <button onClick={() => { if (custom.trim()) { setHanzi(custom.trim()); setCustom(''); } }}
                        className="px-4 py-2.5 bg-stone-900 text-white text-xs font-black rounded-xl hover:bg-stone-700">Load</button>
                </div>
            )}

            {/* controls */}
            {!error && (
                <>
                    <div className="flex items-center gap-2">
                        <button onClick={animate} disabled={mode === 'animating'}
                            className={cn('flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black transition-colors',
                                mode === 'animating' ? 'bg-stone-200 text-stone-400' : 'bg-stone-900 text-white hover:bg-stone-700')}>
                            <Play size={13} /> {mode === 'animating' ? 'Drawing…' : 'Show me how it\'s written'}
                        </button>
                        <button onClick={startQuiz} disabled={mode === 'quiz'}
                            className={cn('flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-black transition-colors',
                                mode === 'quiz' ? 'bg-emerald-200 text-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600')}>
                            <PenLine size={13} /> {mode === 'quiz' ? 'Tracing…' : 'Trace it myself'}
                        </button>
                        <button onClick={reset} className="px-4 py-3 rounded-2xl bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors" title="Reset">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <button onClick={() => speakText(hanzi, 'Chinese')} className="text-[11px] font-bold text-stone-400 hover:text-emerald-600">
                            Hear {hanzi} pronounced
                        </button>
                        <span className="text-[10px] font-black text-stone-300 uppercase tracking-wider">
                            {quizDone ? 'Written!' : mode === 'quiz' ? quizProgress : `writing ${hanzi}`}
                        </span>
                    </div>
                    {quizDone && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-3 text-xs font-bold text-emerald-700 text-center">
                            ✓ You wrote {hanzi} stroke by stroke — try the next character
                        </div>
                    )}
                </>
            )}

            {/* starter characters */}
            <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Start with these 30 — the core of HSK 1</p>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-1.5">
                    {STARTER_CHARS.map(c => (
                        <button key={c} onClick={() => setHanzi(c)}
                            className={cn('h-10 rounded-xl border font-black text-lg transition-all flex items-center justify-center',
                                hanzi === c ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 bg-stone-50 text-stone-700 hover:border-emerald-300')}>
                            {c}
                        </button>
                    ))}
                </div>
                {!error && (
                    <div className="flex gap-2 mt-3">
                        <div className="relative flex-1">
                            <Pencil size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-300" />
                            <input value={custom} onChange={e => setCustom(e.target.value)} maxLength={1} placeholder="…or any character (type & press Enter)"
                                onKeyDown={e => { if (e.key === 'Enter' && custom.trim()) { setHanzi(custom.trim()); setCustom(''); } }}
                                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-400" />
                        </div>
                        <button onClick={() => { if (custom.trim()) { setHanzi(custom.trim()); setCustom(''); } }}
                            className="px-4 py-2.5 bg-stone-900 text-white text-xs font-black rounded-xl hover:bg-stone-700">Write it</button>
                    </div>
                )}
            </div>
        </div>
    );
};
