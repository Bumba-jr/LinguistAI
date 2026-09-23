import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, RotateCcw, AlertTriangle, Play, FileCheck, Headphones, BookOpenCheck, Languages } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateJapaneseListening, generateJapaneseReading, generateJlptKnowledge,
    JapaneseListening, JapaneseReading, JlptKnowledge, JlptLevel,
    JLPT_OF_LEVEL, JLPT_PASS_NOTE,
} from '../../services/japaneseService';
import { saveMock } from '../../services/japaneseStorage';

type Phase = 'intro' | 'knowledge' | 'reading' | 'listening' | 'report';

const SECTION_LABEL: Record<Phase, string> = {
    intro: '',
    knowledge: 'Section 1 · Language Knowledge — 文字・語彙・文法',
    reading: 'Section 2 · Reading — 読解 · 5 minutes',
    listening: 'Section 3 · Listening — 聴解 · audio plays once',
    report: 'Your simulated JLPT report',
};

// JLPT scoring: each section is scaled to /60 with a 19/60 minimum — practice model.
const to60 = (pct: number) => Math.round((pct / 100) * 60);

export const JapaneseMockExam = ({ level, onLevelChange }: { level: JlptLevel; onLevelChange: (l: JlptLevel) => void }) => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [knowledge, setKnowledge] = useState<JlptKnowledge | null>(null);
    const [reading, setReading] = useState<JapaneseReading | null>(null);
    const [listening, setListening] = useState<JapaneseListening | null>(null);
    const [knowledgeAnswers, setKnowledgeAnswers] = useState<Record<number, string>>({});
    const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
    const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [report, setReport] = useState<null | {
        knowledge: { pct: number; pts: number; ok: boolean };
        reading: { pct: number; pts: number; ok: boolean };
        listening: { pct: number; pts: number; ok: boolean };
        passed: boolean; weakest: string;
    }>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!timerOn) return;
        const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); setTimerOn(false); return 0; } return s - 1; }), 1000);
        return () => clearInterval(t);
    }, [timerOn]);
    useEffect(() => () => { stopSpeaking(); }, []);
    useEffect(() => { if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' }); }, [phase]);

    const begin = async () => {
        setLoading(true); setError(null);
        setKnowledge(null); setReading(null); setListening(null);
        setKnowledgeAnswers({}); setReadingAnswers({}); setListeningAnswers({}); setReport(null);
        try {
            const k = await generateJlptKnowledge(level);
            if (!k.questions?.length) throw new Error('empty');
            setKnowledge(k);
            setPhase('knowledge');
        } catch {
            setError('Could not start the mock — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const finishKnowledge = () => {
        setLoading(true);
        generateJapaneseReading(level)
            .then(r => { setReading(r); setPhase('reading'); setTimeLeft(5 * 60); setTimerOn(true); })
            .catch(() => setError('Could not load the reading section — try again.'))
            .finally(() => setLoading(false));
    };

    const finishReading = () => {
        setTimerOn(false); setLoading(true);
        generateJapaneseListening(level)
            .then(l => { setListening(l); setPhase('listening'); })
            .catch(() => setError('Could not load the listening section — try again.'))
            .finally(() => setLoading(false));
    };

    const playListening = () => {
        if (!listening) return;
        stopSpeaking();
        setPlaying(true);
        let i = 0;
        const next = () => {
            if (i >= listening.lines.length) { setPlaying(false); return; }
            const line = listening.lines[i++];
            speakText(line.jp, 'Japanese', () => setTimeout(next, 400), 0.88);
        };
        next();
    };

    const grade = () => {
        const kPct = knowledge ? Math.round(knowledge.questions.filter((q, i) => knowledgeAnswers[i] === q.answer).length / knowledge.questions.length * 100) : 0;
        const rPct = reading ? Math.round(reading.questions.filter((q, i) => readingAnswers[i] === q.answer).length / reading.questions.length * 100) : 0;
        const lPct = listening ? Math.round(listening.questions.filter((q, i) => listeningAnswers[i] === q.answer).length / listening.questions.length * 100) : 0;
        // JLPT: each section scaled to /60 with a 19/60 minimum — no section rescues another
        const passed = [kPct, rPct, lPct].every(pct => to60(pct) >= 19);
        const weakest = ([['knowledge', kPct], ['reading', rPct], ['listening', lPct]] as [string, number][])
            .sort((a, b) => a[1] - b[1])[0][0];
        setReport({
            knowledge: { pct: kPct, pts: to60(kPct), ok: to60(kPct) >= 19 },
            reading: { pct: rPct, pts: to60(rPct), ok: to60(rPct) >= 19 },
            listening: { pct: lPct, pts: to60(lPct), ok: to60(lPct) >= 19 },
            passed, weakest,
        });
        saveMock({ date: new Date().toISOString(), reading: rPct, listening: lPct, writing: kPct, speaking: kPct, passed, weakest });
        setPhase('report');
    };

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const ss = String(timeLeft % 60).padStart(2, '0');

    const LevelRow = () => (
        <div className="flex gap-1.5 flex-wrap">
            {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as JlptLevel[]).map(l => (
                <button key={l} onClick={() => onLevelChange(l)}
                    className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                        level === l ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400')}>
                    {l} · {JLPT_OF_LEVEL[l].replace('JLPT ', '')}
                </button>
            ))}
        </div>
    );

    const SectionIcon = ({ p }: { p: Phase }) =>
        p === 'knowledge' ? <Languages size={13} /> : p === 'reading' ? <BookOpenCheck size={13} /> : p === 'listening' ? <Headphones size={13} /> : <FileCheck size={13} />;

    const mcqCard = (q: { question: string; options: string[]; answer: string; note?: string }, i: number, answers: Record<number, string>, set: (fn: (p: Record<number, string>) => Record<number, string>) => void, showNote: boolean) => (
        <div className="bg-white rounded-3xl border border-stone-100 p-5">
            <div className="flex items-start justify-between gap-2 mb-3">
                <p className="text-sm font-bold text-stone-800 flex-1"><InteractiveText text={q.question} language="Japanese" /></p>
                <button onClick={() => speakText(q.question, 'Japanese')} className="text-stone-300 hover:text-indigo-500 shrink-0"><Volume2 size={13} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => { if (answers[i] === undefined) set(prev => ({ ...prev, [i]: opt })); }}
                        className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                            answers[i] === undefined ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                : answers[i] === opt ? (opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-red-50 border-red-200 text-red-500')
                                    : opt === q.answer ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-stone-100 text-stone-400')}>
                        {opt}
                    </button>
                ))}
            </div>
            {showNote && q.note && answers[i] !== undefined && (
                <p className="text-[11px] text-stone-500 mt-2 bg-stone-50 rounded-xl px-3 py-2">{q.note}</p>
            )}
        </div>
    );

    return (
        <div className="space-y-5">
            <LevelRow />
            {phase !== 'intro' && phase !== 'report' && (
                <div className="bg-stone-900 rounded-3xl p-4 text-white flex items-center justify-between gap-3">
                    <p className="text-[11px] font-black flex items-center gap-2"><SectionIcon p={phase} /> {SECTION_LABEL[phase]}</p>
                    {timeLeft > 0 && <span className={cn('text-sm font-black tabular-nums px-3 py-1 rounded-xl', timerOn ? 'bg-red-500' : 'bg-white/10')}>{mm}:{ss}</span>}
                </div>
            )}
            {phase === 'intro' && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <FileCheck size={18} className="text-rose-500" />
                        <p className="font-black text-stone-900">Simulated JLPT — {JLPT_OF_LEVEL[level]}</p>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">A compressed simulation of the real exam sections: Language Knowledge (kanji, vocab, particles) → Reading → Listening (audio once). Each section is scaled to /60 with a 19/60 minimum — exactly like the real test.</p>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs text-amber-800">{JLPT_PASS_NOTE}</div>
                    <button onClick={begin} disabled={loading}
                        className="w-full py-3.5 bg-rose-500 text-white text-sm font-bold rounded-2xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading ? <><Loader2 size={15} className="animate-spin" /> Preparing your exam…</> : <><Play size={15} /> Start the {level} simulation</>}
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}

            {phase === 'knowledge' && knowledge && (
                <div className="space-y-4">
                    {knowledge.questions.map((q, i) => mcqCard(q, i, knowledgeAnswers, setKnowledgeAnswers, true))}
                    {knowledge.questions.every((_, i) => knowledgeAnswers[i] !== undefined) && (
                        <button onClick={finishKnowledge} disabled={loading}
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
                                <InteractiveText key={i} text={p.jp} language="Japanese" className="block text-sm text-stone-800 leading-relaxed" />
                            ))}
                        </div>
                    </div>
                    {reading.questions.map((q, i) => mcqCard(q, i, readingAnswers, setReadingAnswers, false))}
                    {reading.questions.every((_, i) => readingAnswers[i] !== undefined) && (
                        <button onClick={finishReading} disabled={loading}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            {loading ? <><Loader2 size={15} className="animate-spin" /> Preparing listening…</> : 'Continue to listening'}
                        </button>
                    )}
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
                    {listening.questions.map((q, i) => mcqCard(q, i, listeningAnswers, setListeningAnswers, false))}
                    {listening.questions.every((_, i) => listeningAnswers[i] !== undefined) && (
                        <button onClick={grade}
                            className="w-full py-3.5 bg-rose-500 text-white text-sm font-bold rounded-2xl hover:bg-rose-600 transition-colors">
                            Finish — grade my exam
                        </button>
                    )}
                </div>
            )}

            {phase === 'report' && report && (
                <div className="space-y-4">
                    <div className={cn('rounded-3xl p-6 text-center text-white', report.passed ? 'bg-emerald-600' : 'bg-stone-900')}>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Simulated result — {JLPT_OF_LEVEL[level]}</p>
                        <p className="text-4xl font-black my-2">{report.passed ? '合格' : '不合格'}</p>
                        <p className="text-xs opacity-70">Every section needs its own 19/60 minimum — resits retake the whole exam</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {([['Knowledge', report.knowledge], ['Reading', report.reading], ['Listening', report.listening]] as [string, { pct: number; pts: number; ok: boolean }][]).map(([label, r]) => (
                            <div key={label} className={cn('rounded-3xl border p-4 text-center', r.ok ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')}>
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</p>
                                <p className={cn('text-2xl font-black my-1', r.ok ? 'text-emerald-600' : 'text-red-500')}>{r.pts}<span className="text-sm text-stone-300">/60</span></p>
                                <p className="text-[10px] font-black uppercase tracking-wider">{r.ok ? '✓ above minimum' : '✗ below 19'}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
                        <span className="font-black">Weakest section: </span>{report.weakest} — drill it before your next simulation.
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
