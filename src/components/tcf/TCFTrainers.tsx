import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, CheckCircle2, XCircle, RotateCcw, Eye, AlertTriangle, Play } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateTcfListening, generateTcfReading,
    TcfListening, TcfReading, TcfLevel,
} from '../../services/tcfService';
import { logWeakness } from '../../services/tcfStorage';

// ── shared exercise bits ─────────────────────────────────────────────────────
export const LevelBar = ({ level, onLevelChange }: { level: TcfLevel; onLevelChange: (l: TcfLevel) => void }) => (
    <div className="flex gap-1.5 flex-wrap">
        {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as TcfLevel[]).map(l => (
            <button key={l} onClick={() => onLevelChange(l)}
                className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                    level === l ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400')}>
                {l}
            </button>
        ))}
    </div>
);

type MCQProps = {
    q: { question: string; options: string[]; answer: string };
    i: number;
    picked: string | undefined;
    onPick: (opt: string) => void;
};
const MCQ = ({ q, i, picked, onPick }: MCQProps) => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5">
        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">Question {i + 1}</p>
        <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
        <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt, oi) => {
                const revealed = picked !== undefined;
                return (
                    <button key={oi} onClick={() => { if (!revealed) onPick(opt); }}
                        className={cn('text-left px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                            revealed
                                ? opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                    : opt === picked ? 'bg-red-50 border-red-200 text-red-500'
                                        : 'bg-white border-stone-100 text-stone-400'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-indigo-300 hover:bg-indigo-50/50')}>
                        {opt}
                    </button>
                );
            })}
        </div>
    </div>
);

// ── Listening trainer — TCF rule: audio heard ONCE in exam mode ─────────────
export const TCFListeningTrainer = ({ level, onLevelChange, onDone }: {
    level: TcfLevel; onLevelChange: (l: TcfLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<TcfListening | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showTranscript, setShowTranscript] = useState(false);
    const [finished, setFinished] = useState(false);
    const stopRef = useRef(false);

    useEffect(() => () => { stopRef.current = true; stopSpeaking(); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setPlays(0); setAnswers({}); setShowTranscript(false); setFinished(false);
        try {
            const e = await generateTcfListening(level);
            if (!e.lines?.length || !e.questions?.length) throw new Error('empty');
            setEx(e);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const playAll = () => {
        if (!ex) return;
        stopSpeaking();
        setPlaying(true);
        setPlays(p => p + 1);
        let i = 0;
        const next = () => {
            if (stopRef.current || i >= ex.lines.length) { setPlaying(false); return; }
            const line = ex.lines[i++];
            speakText(line.fr, 'French', () => setTimeout(next, 400));
        };
        next();
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;

    const finish = () => {
        setFinished(true);
        setShowTranscript(true);
        if (ex) {
            const pct = Math.round((correct / ex.questions.length) * 100);
            onDone(pct, `${level} listening: ${ex.scenario}`);
        }
    };

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {!ex && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">How TCF listening works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real exam: 39 questions, 35 minutes, each recording plays <b>once</b>.</li>
                        <li>• Here: the recording is read aloud in French — try to answer after one play.</li>
                        <li>• The transcript only unlocks after you answer (train your ear, not your eyes).</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate a {level} listening exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing a {level} recording…
                </div>
            )}
            {ex && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">The recording</p>
                        <p className="text-sm font-bold text-stone-800 mb-3">{ex.scenario}</p>
                        <div className="flex items-center gap-3">
                            <button onClick={playAll} disabled={playing}
                                className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors',
                                    playing ? 'bg-stone-200 text-stone-500' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                                <Volume2 size={13} /> {playing ? 'Playing…' : plays === 0 ? 'Play the recording' : `Play again (${plays})`}
                            </button>
                            {plays > 0 && <span className="text-[10px] text-stone-400">Exam rule: you only hear it once — no replay before answering</span>}
                        </div>
                    </div>

                    {!finished && answered < ex.questions.length && (
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700">
                            Answer the questions from memory. The transcript unlocks when you finish.
                        </div>
                    )}

                    {ex.questions.map((q, i) => (
                        <div key={i}>
                            <MCQ q={q} i={i} picked={answers[i]} onPick={opt => { setAnswers(prev => ({ ...prev, [i]: opt })); if (opt !== q.answer) logWeakness({ skill: 'listening', level, question: q.question, chosen: opt, answer: q.answer }); }} />
                        </div>
                    ))}

                    {!finished && answered === ex.questions.length && (
                        <button onClick={finish}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Finish — {correct}/{ex.questions.length} correct · see transcript
                        </button>
                    )}

                    {finished && (
                        <div className={cn('rounded-3xl p-5 text-center', correct / ex.questions.length >= 0.75 ? 'bg-emerald-50' : 'bg-amber-50')}>
                            <p className="text-2xl font-black text-stone-900">{correct}/{ex.questions.length}</p>
                            <p className="text-xs text-stone-500 mt-1">{correct / ex.questions.length >= 0.75 ? 'Strong at this level — try the next one up.' : 'Replay with the transcript, then shadow the lines.'}</p>
                        </div>
                    )}

                    {(showTranscript || finished) && (
                        <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-2">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Transcript — read, then shadow each line</p>
                            {ex.lines.map((l, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-3 space-y-0.5">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase">{l.speaker}</p>
                                    <div className="flex items-center justify-between gap-2">
                                        <InteractiveText text={l.fr} language="French" className="block text-sm font-semibold text-stone-900 flex-1" />
                                        <button onClick={() => speakText(l.fr, 'French')} className="text-stone-300 hover:text-indigo-500 shrink-0"><Volume2 size={13} /></button>
                                    </div>
                                    <p className="text-xs text-stone-400">{l.en}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {!ex.questions.some((_, i) => answers[i] === undefined) && (
                        <button onClick={start} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> New exercise
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// ── Reading trainer — timed TCF-style document + MCQs ────────────────────────
export const TCFReadingTrainer = ({ level, onLevelChange, onDone }: {
    level: TcfLevel; onLevelChange: (l: TcfLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<TcfReading | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showEn, setShowEn] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [finished, setFinished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setAnswers({}); setShowEn(false); setFinished(false);
        setSeconds(0); setTimerOn(true);
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        try {
            const e = await generateTcfReading(level);
            if (!e.paragraphs?.length || !e.questions?.length) throw new Error('empty');
            setEx(e);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;
    const finish = () => {
        setFinished(true); setShowEn(true);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerOn(false);
        if (ex) onDone(Math.round((correct / ex.questions.length) * 100), `${level} reading: ${ex.title}`);
    };
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {!ex && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">How TCF reading works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real exam: 39 questions in 60 minutes — skim, locate, don't translate everything.</li>
                        <li>• Here: read the document, answer 4 questions, then check the English.</li>
                        <li>• The timer trains you to read under pressure.</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-teal-600 text-white text-sm font-bold rounded-2xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate a {level} reading exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing a {level} document…
                </div>
            )}
            {ex && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">The document</p>
                            <span className={cn('text-xs font-black tabular-nums px-2.5 py-1 rounded-xl', timerOn ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500')}>{mm}:{ss}</span>
                        </div>
                        <h2 className="font-black text-stone-900 mb-3">{ex.title}</h2>
                        <div className="space-y-3">
                            {ex.paragraphs.map((p, i) => (
                                <div key={i}>
                                    <InteractiveText text={p.fr} language="French" className="block text-sm text-stone-800 leading-relaxed" />
                                    {showEn && <p className="text-xs text-stone-400 italic border-l-2 border-stone-200 pl-3 mt-1">{p.en}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => setShowEn(v => !v)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 hover:text-stone-700 transition-colors">
                        <Eye size={12} /> {showEn ? 'Hide' : 'Show'} English translation {finished ? '' : '(after finishing)'}
                    </button>

                    {ex.questions.map((q, i) => (
                        <div key={i}>
                            <MCQ q={q} i={i} picked={answers[i]} onPick={opt => { setAnswers(prev => ({ ...prev, [i]: opt })); if (opt !== q.answer) logWeakness({ skill: 'reading', level, question: q.question, chosen: opt, answer: q.answer }); }} />
                        </div>
                    ))}

                    {!finished && answered === ex.questions.length && (
                        <button onClick={finish}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Finish — {correct}/{ex.questions.length} correct in {mm}:{ss}
                        </button>
                    )}

                    {finished && (
                        <div className={cn('rounded-3xl p-5 text-center', correct / ex.questions.length >= 0.75 ? 'bg-emerald-50' : 'bg-amber-50')}>
                            <p className="text-2xl font-black text-stone-900">{correct}/{ex.questions.length}</p>
                            <p className="text-xs text-stone-500 mt-1">
                                {correct / ex.questions.length >= 0.75 ? 'Solid comprehension — move up a level.' : 'Read the English, find the evidence, then retry.'}
                            </p>
                        </div>
                    )}

                    {finished && (
                        <button onClick={start} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> New exercise
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
