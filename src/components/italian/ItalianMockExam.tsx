import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, RotateCcw, AlertTriangle, Play, FileCheck, Mic, Square, Headphones, BookOpenCheck, PenLine } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateItalianListening, generateItalianReading,
    ItalianListening, ItalianReading, CilsLevel,
    cilsWritingTasksFor, cilsSpeakingTasksFor,
    evaluateItalianWriting, evaluateItalianSpeaking, CILS_PASS_NOTE,
} from '../../services/italianService';
import { saveMock } from '../../services/italianStorage';
import { recordAndTranscribe } from '../../services/speechService';

type Phase = 'intro' | 'listening' | 'reading' | 'writing' | 'speaking' | 'report';

const SECTION_LABEL: Record<Phase, string> = {
    intro: '',
    listening: 'Prova · Ascolto — audio plays once',
    reading: 'Prova · Lettura — 5 minutes',
    writing: 'Prova · Scritta — 10 minutes',
    speaking: 'Prova · Orale — 2 minutes',
    report: 'Your simulated CILS report',
};

// Simulated CILS result: each skill gets a practice %; every skill must reach the pass threshold independently.
const to25 = (pct: number) => Math.round((pct / 100) * 25);

export const ItalianMockExam = ({ level, onLevelChange }: { level: CilsLevel; onLevelChange: (l: CilsLevel) => void }) => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [listening, setListening] = useState<ItalianListening | null>(null);
    const [reading, setReading] = useState<ItalianReading | null>(null);
    const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
    const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
    const [writingText, setWritingText] = useState('');
    const [speakingTranscript, setSpeakingTranscript] = useState('');
    const [recState, setRecState] = useState<'idle' | 'recording' | 'processing'>('idle');
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [report, setReport] = useState<null | {
        listening: { pct: number; pts: number };
        reading: { pct: number; pts: number };
        writing: { pct: number; pts: number; est: string };
        speaking: { pct: number; pts: number; est: string };
        total: number; passed: boolean; weakest: string;
    }>(null);
    const recRef = useRef<{ promise: Promise<string>; stop: () => void } | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Level-accurate tasks: an A1 simulation writes 15–40 words, a B2 one needs 150–180
    const writingTask = cilsWritingTasksFor(level)[0];
    const speakingTask = cilsSpeakingTasksFor(level)[0];

    useEffect(() => {
        if (!timerOn) return;
        const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); setTimerOn(false); return 0; } return s - 1; }), 1000);
        return () => clearInterval(t);
    }, [timerOn]);
    useEffect(() => () => { stopSpeaking(); }, []);
    useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' }); }, [phase]);

    const begin = async () => {
        setLoading(true); setError(null);
        setListening(null); setReading(null);
        setListeningAnswers({}); setReadingAnswers({});
        setWritingText(''); setSpeakingTranscript(''); setReport(null);
        try {
            const l = await generateItalianListening(level);
            setListening(l);
            setPhase('listening');
        } catch {
            setError('Could not start the mock — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const playListening = () => {
        if (!listening) return;
        stopSpeaking();
        setPlaying(true);
        let i = 0;
        const next = () => {
            if (i >= listening.lines.length) { setPlaying(false); return; }
            const line = listening.lines[i++];
            speakText(line.it, 'Italian', () => setTimeout(next, 400), 0.88);
        };
        next();
    };

    const finishListening = () => {
        stopSpeaking();
        setLoading(true);
        generateItalianReading(level)
            .then(r => { setReading(r); setPhase('reading'); setTimeLeft(5 * 60); setTimerOn(true); })
            .catch(() => setError('Could not load the reading section — try again.'))
            .finally(() => setLoading(false));
    };

    const finishReading = () => { setTimerOn(false); setPhase('writing'); setTimeLeft(writingTask.minutes * 60); setTimerOn(true); };
    const finishWriting = () => { setTimerOn(false); setPhase('speaking'); };

    const grade = async () => {
        setLoading(true); setError(null);
        const lPct = listening ? Math.round(listening.questions.filter((q, i) => listeningAnswers[i] === q.answer).length / listening.questions.length * 100) : 0;
        const rPct = reading ? Math.round(reading.questions.filter((q, i) => readingAnswers[i] === q.answer).length / reading.questions.length * 100) : 0;
        let wPct = 0; let wEst = '—'; let sPct = 0; let sEst = '—';
        try {
            if (writingText.trim().split(/\s+/).length >= 20) {
                const fb = await evaluateItalianWriting(writingTask.label, writingTask.guide, writingTask.minWords, writingText, level);
                wPct = Math.round((fb.score100 / 25) * 100); wEst = fb.estimatedLevel;
            }
            if (speakingTranscript.trim()) {
                const words = speakingTranscript.split(/\s+/).filter(Boolean).length;
                sPct = Math.min(95, 30 + Math.round(words / 2));
                const fb = await evaluateItalianSpeaking(speakingTask.label, speakingTask.guide, speakingTask.prompt, speakingTranscript, level);
                sEst = fb.estimatedLevel;
            }
        } catch { /* estimates stay 0 for the failed skill */ }
        const total = to25(lPct) + to25(rPct) + to25(wPct) + to25(sPct);
        const passed = total >= 60;
        const weakest = ([['reading', rPct], ['listening', lPct], ['writing', wPct], ['speaking', sPct]] as [string, number][])
            .sort((a, b) => a[1] - b[1])[0][0];
        const rep = {
            listening: { pct: lPct, pts: to25(lPct) },
            reading: { pct: rPct, pts: to25(rPct) },
            writing: { pct: wPct, pts: to25(wPct), est: wEst },
            speaking: { pct: sPct, pts: to25(sPct), est: sEst },
            total, passed, weakest,
        };
        setReport(rep);
        saveMock({ date: new Date().toISOString(), reading: rPct, listening: lPct, writing: wPct, speaking: sPct, passed, weakest });
        setPhase('report');
        setLoading(false);
    };

    const toggleRecord = () => {
        if (recState === 'recording') { recRef.current?.stop(); return; }
        setError(null); setSpeakingTranscript('');
        setRecState('recording');
        const rec = recordAndTranscribe('Italian' as any, { maxMs: 120000 });
        recRef.current = rec;
        rec.promise.then(t => { setSpeakingTranscript(t); setRecState('idle'); })
            .catch(() => { setRecState('idle'); setError('Could not record. Check microphone permissions.'); });
    };

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const ss = String(timeLeft % 60).padStart(2, '0');

    const LevelRow = () => (
        <div className="flex gap-1.5 flex-wrap">
            {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as CilsLevel[]).map(l => (
                <button key={l} onClick={() => onLevelChange(l)}
                    className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                        level === l ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400')}>
                    {l}
                </button>
            ))}
        </div>
    );

    const SkillIcon = ({ p }: { p: Phase }) =>
        p === 'listening' ? <Headphones size={13} /> : p === 'reading' ? <BookOpenCheck size={13} /> : p === 'writing' ? <PenLine size={13} /> : <Mic size={13} />;

    return (
        <div className="space-y-5">
            <LevelRow />
            {phase !== 'intro' && phase !== 'report' && (
                <div className="bg-stone-900 rounded-3xl p-4 text-white flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black flex items-center gap-2"><SkillIcon p={phase} /> {SECTION_LABEL[phase]}</p>
                    {timeLeft > 0 && <span className={cn('text-sm font-black tabular-nums px-3 py-1 rounded-xl', timerOn ? 'bg-red-500' : 'bg-white/10')}>{mm}:{ss}</span>}
                </div>
            )}
            {phase === 'intro' && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <FileCheck size={18} className="text-rose-500" />
                        <p className="font-black text-stone-900">Simulated CILS — {level}</p>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">A compressed full-exam simulation: listening (audio once) → reading (5 min) → writing (10 min) → speaking (2 min). CILS grades each skill independently — every skill must reach its own threshold.</p>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs text-amber-800">{CILS_PASS_NOTE}</div>
                    <button onClick={begin} disabled={loading}
                        className="w-full py-3.5 bg-rose-500 text-white text-sm font-bold rounded-2xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading ? <><Loader2 size={15} className="animate-spin" /> Preparing your exam…</> : <><Play size={15} /> Start the {level} simulation</>}
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}

            {phase === 'listening' && listening && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-sm font-bold text-stone-800 mb-3">{listening.scenario}</p>
                        <button onClick={playListening} disabled={playing}
                            className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors',
                                playing ? 'bg-stone-200 text-stone-500' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                            <Volume2 size={13} /> {playing ? 'Playing…' : 'Play the audio (once!)'}
                        </button>
                    </div>
                    {listening.questions.map((q, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                            <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, oi) => (
                                    <button key={oi} onClick={() => setListeningAnswers(prev => ({ ...prev, [i]: opt }))}
                                        className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                            listeningAnswers[i] === undefined ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                                : listeningAnswers[i] === opt ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-100 text-stone-400')}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {listening.questions.every((_, i) => listeningAnswers[i] !== undefined) && (
                        <button onClick={finishListening} disabled={loading}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            {loading ? <><Loader2 size={15} className="animate-spin" /> Preparing reading…</> : 'Continue to reading'}
                        </button>
                    )}
                </div>
            )}

            {phase === 'reading' && reading && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <h2 className="font-black text-stone-900 mb-3">{reading.title}</h2>
                        <div className="space-y-3">
                            {reading.paragraphs.map((p, i) => (
                                <InteractiveText key={i} text={p.it} language="Italian" className="block text-sm text-stone-800 leading-relaxed" />
                            ))}
                        </div>
                    </div>
                    {reading.questions.map((q, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                            <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {q.options.map((opt, oi) => (
                                    <button key={oi} onClick={() => setReadingAnswers(prev => ({ ...prev, [i]: opt }))}
                                        className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                            readingAnswers[i] === undefined ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                                : readingAnswers[i] === opt ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-100 text-stone-400')}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {reading.questions.every((_, i) => readingAnswers[i] !== undefined) && (
                        <button onClick={finishReading} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Continue to writing
                        </button>
                    )}
                </div>
            )}

            {phase === 'writing' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <p className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1">{writingTask.label}</p>
                        <p className="text-sm font-semibold text-stone-800 mb-1">{writingTask.prompt}</p>
                        <p className="text-xs text-stone-400">{writingTask.guide}</p>
                        <p className="text-[10px] font-bold text-stone-300 mt-2">{writingText.trim() ? writingText.trim().split(/\s+/).length : 0} words</p>
                    </div>
                    <textarea value={writingText} onChange={e => setWritingText(e.target.value)} rows={10}
                        placeholder="Schreiben Sie Ihre Antwort auf Deutsch… (Großschreibung der Nomen nicht vergessen!)"
                        className="w-full px-5 py-4 text-sm rounded-3xl border border-stone-200 focus:outline-none focus:border-amber-400 bg-white resize-y" />
                    <button onClick={finishWriting} disabled={writingText.trim().split(/\s+/).filter(Boolean).length < 20}
                        className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40">
                        Continue to speaking
                    </button>
                </div>
            )}

            {phase === 'speaking' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">{speakingTask.label}</p>
                        <InteractiveText text={speakingTask.prompt} language="Italian" className="block text-sm font-semibold text-stone-800 mb-1" />
                        <p className="text-xs text-stone-400">{speakingTask.guide}</p>
                    </div>
                    <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-4">
                        <button onClick={toggleRecord} disabled={recState === 'processing'}
                            className={cn('w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all shadow-xl',
                                recState === 'recording' ? 'bg-red-500 text-white scale-110 animate-pulse' : recState === 'processing' ? 'bg-stone-200 text-stone-400' : 'bg-rose-500 text-white hover:bg-rose-600')}>
                            {recState === 'recording' ? <Square size={30} fill="currentColor" /> : recState === 'processing' ? <Loader2 size={30} className="animate-spin" /> : <Mic size={34} />}
                        </button>
                        <p className="text-xs font-bold text-stone-400">
                            {recState === 'idle' && 'Tap the mic and answer — 2 minutes'}
                            {recState === 'recording' && 'Recording — tap to stop'}
                            {recState === 'processing' && 'Transcribing…'}
                        </p>
                        {speakingTranscript && <p className="text-xs text-stone-500 italic">"{speakingTranscript.slice(0, 200)}"</p>}
                    </div>
                    <button onClick={grade} disabled={loading || recState === 'recording'}
                        className="w-full py-3.5 bg-rose-500 text-white text-sm font-bold rounded-2xl hover:bg-rose-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                        {loading ? <><Loader2 size={15} className="animate-spin" /> Your examiners are grading…</> : 'Finish — grade my exam'}
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}

            {phase === 'report' && report && (
                <div className="space-y-4">
                    <div className={cn('rounded-3xl p-6 text-center text-white', report.passed ? 'bg-emerald-600' : 'bg-stone-900')}>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Simulated result — {level}</p>
                        <p className="text-4xl font-black my-2">{report.passed ? 'SUPERATO' : 'NON SUPERATO'}</p>
                        <p className="text-xs opacity-70">Each skill is judged independently — CILS lets you retake only the skills you failed</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {([['Reading', report.reading], ['Listening', report.listening], ['Writing', report.writing], ['Speaking', report.speaking]] as [string, { pct: number; pts: number; est?: string }][]).map(([label, r]) => (
                            <div key={label} className="bg-white rounded-3xl border border-stone-100 p-4 text-center">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</p>
                                <p className="text-2xl font-black text-stone-900 my-1">{r.pts}<span className="text-sm text-stone-300">/25</span></p>
                                <p className="text-[10px] text-stone-400">{r.pct}%{r.est ? ` · est. ${r.est}` : ''}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
                        <span className="font-black">Weakest skill: </span>{report.weakest} — drill it before your next simulation.
                    </div>
                    <button onClick={() => { setPhase('intro'); setReport(null); }}
                        className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                        <RotateCcw size={14} /> New simulation
                    </button>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
};
