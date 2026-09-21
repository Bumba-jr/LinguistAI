import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Play, Volume2, Mic, Timer, Trophy, AlertTriangle, CheckCircle2, FileCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import { recordAndTranscribe } from '../../services/speechService';
import {
    HskLevel, generateHskListening, generateHskReading,
    evaluateHskWriting, evaluateHskSpeaking, HSK_WRITING_TASKS, HSK_SPEAKING_TASKS, practiceToScore,
    HskListening, HskReading,
} from '../../services/hskService';
import { addHskScore, saveMock } from '../../services/hskStorage';
import { LevelBar } from './HSKTrainers';

type Phase = 'intro' | 'listening' | 'reading' | 'writing' | 'speaking' | 'report';

const hasWriting = (level: HskLevel) => Number(level) >= 3;

export const HSKMockExam = ({ level, onLevelChange }: { level: HskLevel; onLevelChange: (l: HskLevel) => void }) => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [listening, setListening] = useState<HskListening | null>(null);
    const [reading, setReading] = useState<HskReading | null>(null);
    const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
    const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
    const [writingText, setWritingText] = useState('');
    const [speakingTranscript, setSpeakingTranscript] = useState('');
    const [recState, setRecState] = useState<'idle' | 'recording' | 'processing'>('idle');
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [played, setPlayed] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [report, setReport] = useState<null | {
        listening: { pct: number; score: number };
        reading: { pct: number; score: number };
        writing: { pct: number; score: number } | null;
        speaking: { pct: number; score100: number };
        total: { score: number; max: number; verdict: string };
        weakest: string;
    }>(null);
    const recRef = useRef<{ promise: Promise<string>; stop: () => void } | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const writingTask = HSK_WRITING_TASKS.find(t => t.levels.includes(level))!;
    const speakingTask = HSK_SPEAKING_TASKS[1]; // listen & answer — core HSKK production task

    useEffect(() => {
        if (!timerOn) return;
        const t = setInterval(() => setTimeLeft(s => {
            if (s <= 1) { clearInterval(t); setTimerOn(false); return 0; }
            return s - 1;
        }), 1000);
        return () => clearInterval(t);
    }, [timerOn]);

    useEffect(() => () => stopSpeaking(), []);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [phase, loading]);

    const startMock = async () => {
        setLoading(true); setError(null);
        setListeningAnswers({}); setReadingAnswers({}); setWritingText(''); setSpeakingTranscript('');
        setReport(null); setPlayed(false);
        try {
            const l = await generateHskListening(level);
            if (!l.lines?.length) throw new Error('listening failed');
            setListening(l);
            setPhase('listening');
        } catch {
            setError('Could not start the simulation — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    // listening: auto-play ONCE on entry
    useEffect(() => {
        if (phase === 'listening' && listening && !played && !playing) {
            setPlaying(true); setPlayed(true);
            let i = 0;
            const next = () => {
                if (i >= listening.lines.length) { setPlaying(false); return; }
                speakText(listening.lines[i++].hanzi, 'Chinese', () => setTimeout(next, 350));
            };
            next();
        }
    }, [phase, listening]);

    const goReading = async () => {
        setLoading(true);
        try {
            const r = await generateHskReading(level);
            if (!r.paragraphs?.length) throw new Error('reading failed');
            setReading(r);
            setTimeLeft(300); setTimerOn(true);
            setPhase('reading');
        } catch {
            setError('Reading section failed to load — retry.');
        } finally { setLoading(false); }
    };

    const goWriting = () => {
        setTimeLeft(writingTask.minutes * 60); setTimerOn(true);
        setPhase('writing');
    };

    const goSpeaking = () => setPhase('speaking');

    const finishSpeaking = async (transcript: string) => {
        setLoading(true);
        try {
            const fb = await evaluateHskSpeaking(speakingTask.label, speakingTask.guide, speakingTask.prompt, transcript, level);
            const lPct = listening ? Math.round(listening.questions.filter((q, i) => listeningAnswers[i] === q.answer).length / listening.questions.length * 100) : 0;
            const rPct = reading ? Math.round(reading.questions.filter((q, i) => readingAnswers[i] === q.answer).length / reading.questions.length * 100) : 0;
            const wPct = hasWriting(level)
                ? Math.min(100, Math.round((writingText.trim().replace(/\s/g, '').length / Math.max(writingTask.minChars, 1)) * 70 + (fb.estimatedLevel.includes(level) ? 30 : 15)))
                : 0;
            const sPct = fb.score100;

            const lEst = practiceToScore(lPct, level), rEst = practiceToScore(rPct, level);
            const wEst = hasWriting(level) ? practiceToScore(wPct, level) : null;
            const max = hasWriting(level) ? 300 : 200;
            const totalScore = lEst.score + rEst.score + (wEst ? wEst.score : 0);
            const pass = max === 200 ? 120 : 180;
            const verdict = totalScore >= pass + 60 ? 'Strong pass' : totalScore >= pass ? 'Pass (est.)' : totalScore >= pass - 30 ? 'Borderline' : 'Below pass';

            addHskScore({ pct: lPct, skill: 'listening', label: `MOCK HSK ${level} listening`, band: lEst.verdict, score: lEst.score });
            addHskScore({ pct: rPct, skill: 'reading', label: `MOCK HSK ${level} reading`, band: rEst.verdict, score: rEst.score });
            if (wEst) addHskScore({ pct: wPct, skill: 'writing', label: `MOCK HSK ${level} writing`, band: wEst.verdict, score: wEst.score });
            addHskScore({ pct: sPct, skill: 'speaking', label: `MOCK HSKK (HSK ${level})`, band: fb.estimatedLevel, score: fb.score100 });

            const sections = [
                { name: 'Listening', pct: lPct },
                { name: 'Reading', pct: rPct },
                ...(wEst ? [{ name: 'Writing', pct: wPct }] : []),
                { name: 'Speaking', pct: sPct },
            ];
            const weakest = sections.reduce((a, b) => (b.pct < a.pct ? b : a)).name;

            const mockResult = {
                date: new Date().toISOString(),
                listening: { pct: lPct, score: lEst.score },
                reading: { pct: rPct, score: rEst.score },
                writing: wEst ? { pct: wPct, score: wEst.score } : null,
                speaking: { level: fb.estimatedLevel, score100: fb.score100 },
                total: { score: totalScore, max, verdict },
                weakest,
            };
            saveMock(mockResult);
            setSpeakingTranscript(transcript);
            setReport({
                listening: { pct: lPct, score: lEst.score },
                reading: { pct: rPct, score: rEst.score },
                writing: wEst ? { pct: wPct, score: wEst.score } : null,
                speaking: { pct: sPct, score100: fb.score100 },
                total: { score: totalScore, max, verdict },
                weakest,
            });
            setPhase('report');
        } catch {
            setError('Report generation failed — but your sections were saved. Try again from Progress.');
        } finally { setLoading(false); }
    };

    // ── intro ──
    if (phase === 'intro') {
        return (
            <div className="space-y-5">
                <LevelBar level={level} onLevelChange={onLevelChange} />
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-4">
                    <p className="font-black text-stone-900">Full simulation — HSK {level}</p>
                    <div className="space-y-2 text-xs text-stone-500">
                        <p className="flex gap-2"><Timer size={13} className="text-indigo-400 shrink-0 mt-0.5" /> Listening: the recording plays <b>once</b>, then questions from memory</p>
                        <p className="flex gap-2"><Timer size={13} className="text-indigo-400 shrink-0 mt-0.5" /> Reading: one document, 5 minutes on the clock, characters first (pinyin hidden)</p>
                        {hasWriting(level)
                            ? <p className="flex gap-2"><Timer size={13} className="text-indigo-400 shrink-0 mt-0.5" /> Writing: {writingTask.label.replace(/^HSK \d+ — /, '')}, {writingTask.minutes} minutes, {writingTask.minChars}+ characters</p>
                            : <p className="flex gap-2 text-stone-400"><CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" /> HSK {level} has no writing section — total out of 200</p>}
                        <p className="flex gap-2"><Timer size={13} className="text-indigo-400 shrink-0 mt-0.5" /> Speaking: HSKK listen & answer, recorded and evaluated</p>
                        <p className="flex gap-2 text-stone-400"><CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" /> No pausing, no retakes mid-section — like the real exam day</p>
                    </div>
                    <p className="text-[10px] text-stone-300 flex items-center gap-1"><AlertTriangle size={10} /> Scaled simulation. Results are practice estimates only — pass mark {hasWriting(level) ? '180/300' : '120/200'} is total-based, like the real exam.</p>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                    <button onClick={startMock} disabled={loading}
                        className="w-full py-4 bg-red-500 text-white text-sm font-black rounded-2xl hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? <><Loader2 size={16} className="animate-spin" /> Preparing the exam…</> : <><Play size={16} /> Start the simulation</>}
                    </button>
                </div>
            </div>
        );
    }

    const phaseLabel: Record<Phase, string> = {
        intro: '', listening: 'Section 1 — Listening (audio plays once)',
        reading: 'Section 2 — Reading (5 minutes)',
        writing: `Section 3 — Writing (${writingTask.minutes} minutes)`,
        speaking: hasWriting(level) ? 'Section 4 — Speaking (HSKK)' : 'Section 3 — Speaking (HSKK)',
        report: 'Your simulation report',
    };
    const phaseHeader = (
        <div className="flex items-center justify-between bg-stone-900 text-white rounded-2xl px-4 py-3">
            <span className="text-xs font-bold">{phaseLabel[phase]}</span>
            {timerOn && (
                <span className="flex items-center gap-1.5 text-xs font-black tabular-nums">
                    <Timer size={12} /> {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                </span>
            )}
        </div>
    );

    // ── listening section ──
    if (phase === 'listening' && listening) {
        const answered = Object.keys(listeningAnswers).length;
        return (
            <div className="space-y-4">
                {phaseHeader}
                <div className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-sm font-bold text-stone-800 mb-3">{listening.scenario}</p>
                    <button onClick={() => { if (!played) { setPlayed(true); setPlaying(true); let i = 0; const next = () => { if (i >= listening.lines.length) { setPlaying(false); return; } speakText(listening.lines[i++].hanzi, 'Chinese', () => setTimeout(next, 350)); }; next(); } }}
                        disabled={playing || played}
                        className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors',
                            played ? 'bg-stone-100 text-stone-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                        <Volume2 size={13} /> {playing ? 'Playing…' : played ? 'Already played — exam rule' : 'Play the recording (once)'}
                    </button>
                </div>
                {listening.questions.map((q, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-sm font-bold text-stone-800 mb-3">{i + 1}. {q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((opt, oi) => (
                                <button key={oi} onClick={() => setListeningAnswers(prev => ({ ...prev, [i]: opt }))}
                                    className={cn('w-full text-left px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                        listeningAnswers[i] === opt ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-stone-200 text-stone-700 hover:border-stone-400')}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={goReading} disabled={answered < listening.questions.length || loading}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <FileCheck size={14} />} {answered < listening.questions.length ? `Answer all ${listening.questions.length} questions` : 'Continue to Reading'}
                </button>
            </div>
        );
    }

    // ── reading section ──
    if (phase === 'reading' && reading) {
        const answered = Object.keys(readingAnswers).length;
        return (
            <div className="space-y-4">
                {phaseHeader}
                <div className="bg-white rounded-3xl border border-stone-100 p-6">
                    <h2 className="font-black text-stone-900 mb-3">{reading.title}</h2>
                    <div className="space-y-3">
                        {reading.paragraphs.map((p, i) => (
                            <div key={i}>
                                <InteractiveText text={p.hanzi} language="Chinese" className="block text-sm text-stone-800 leading-loose" />
                            </div>
                        ))}
                    </div>
                </div>
                {reading.questions.map((q, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-sm font-bold text-stone-800 mb-3">{i + 1}. {q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((opt, oi) => (
                                <button key={oi} onClick={() => setReadingAnswers(prev => ({ ...prev, [i]: opt }))}
                                    className={cn('w-full text-left px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                        readingAnswers[i] === opt ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-stone-200 text-stone-700 hover:border-stone-400')}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={() => { setTimerOn(false); hasWriting(level) ? goWriting() : goSpeaking(); }} disabled={answered < reading.questions.length || loading}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <FileCheck size={14} />} {answered < reading.questions.length ? `Answer all ${reading.questions.length} questions` : hasWriting(level) ? 'Continue to Writing' : 'Continue to Speaking'}
                </button>
            </div>
        );
    }

    // ── writing section (HSK 3+ only) ──
    if (phase === 'writing') {
        const chars = writingText.trim().replace(/\s/g, '').length;
        return (
            <div className="space-y-4">
                {phaseHeader}
                <div className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1">{writingTask.label}</p>
                    <p className="text-sm text-stone-800 font-semibold">{writingTask.prompt}</p>
                    <p className="text-xs text-stone-400 mt-1">At least {writingTask.minChars} characters · type characters or pinyin</p>
                </div>
                <textarea value={writingText} onChange={e => setWritingText(e.target.value)} rows={10}
                    placeholder="用中文写你的答案… (write your answer in Chinese)"
                    className="w-full px-5 py-4 text-sm rounded-3xl border border-stone-200 focus:outline-none focus:border-amber-400 bg-white resize-y" />
                <p className="text-[11px] font-bold text-stone-400 text-right">{chars} / {writingTask.minChars}+ characters</p>
                <button onClick={goSpeaking} disabled={chars < writingTask.minChars}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    <FileCheck size={14} /> {chars < writingTask.minChars ? `Write at least ${writingTask.minChars} characters` : 'Continue to Speaking'}
                </button>
            </div>
        );
    }

    // ── speaking section ──
    if (phase === 'speaking') {
        return (
            <div className="space-y-4">
                {phaseHeader}
                <div className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">{speakingTask.label}</p>
                <p className="block text-sm text-stone-800 font-semibold">{speakingTask.prompt}</p>
                    <p className="text-xs text-stone-400 mt-1">{speakingTask.guide}</p>
                </div>
                <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center">
                    <button onClick={() => {
                        if (recState === 'recording') { recRef.current?.stop(); return; }
                        setRecState('recording');
                        const rec = recordAndTranscribe('Chinese' as any, { maxMs: 130000, onStateChange: s => { if (s === 'processing') setRecState('processing'); } });
                        recRef.current = rec;
                        rec.promise.then(t => { setSpeakingTranscript(t); setRecState('idle'); }).catch(() => {
                            setRecState('idle'); setError('Recording failed — check mic permissions.');
                        });
                    }}
                        disabled={recState === 'processing'}
                        className={cn('w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all shadow-xl',
                            recState === 'recording' ? 'bg-red-500 text-white scale-110 animate-pulse' : recState === 'processing' ? 'bg-stone-200 text-stone-400' : 'bg-rose-500 text-white hover:bg-rose-600')}>
                        {recState === 'recording' || recState === 'processing' ? (recState === 'processing' ? <Loader2 size={30} className="animate-spin" /> : <Mic size={32} />) : <Mic size={32} />}
                    </button>
                    <p className="text-xs font-bold text-stone-400 mt-3">
                        {recState === 'idle' && 'Tap and answer the examiner (up to 2 minutes)'}
                        {recState === 'recording' && 'Recording — speak continuously, tap to stop'}
                        {recState === 'processing' && 'Transcribing…'}
                    </p>
                </div>
                {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                {speakingTranscript && (
                    <div className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Transcript</p>
                        <p className="text-sm text-stone-700">{speakingTranscript}</p>
                    </div>
                )}
                <button onClick={() => finishSpeaking(speakingTranscript)} disabled={!speakingTranscript || loading}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {loading ? <Loader2 size={14} className="animate-spin" /> : <Trophy size={14} />} Finish the exam — see my report
                </button>
            </div>
        );
    }

    // ── report ──
    if (phase === 'report' && report) {
        const rows = [
            { name: 'Listening', pct: report.listening.pct, score: `${report.listening.score}/100` },
            { name: 'Reading', pct: report.reading.pct, score: `${report.reading.score}/100` },
            ...(report.writing ? [{ name: 'Writing', pct: report.writing.pct, score: `${report.writing.score}/100` }] : []),
            { name: 'Speaking (HSKK)', pct: report.speaking.pct, score: `${report.speaking.score100}/100` },
        ];
        return (
            <div className="space-y-4">
                <div className="bg-stone-900 rounded-3xl p-6 text-center text-white">
                    <Trophy size={32} className="mx-auto text-amber-400 mb-2" />
                    <p className="text-lg font-black">{report.total.verdict}</p>
                    <p className="text-3xl font-black text-amber-300 my-1">{report.total.score}<span className="text-base text-white/40">/{report.total.max}</span></p>
                    <p className="text-xs text-white/50">Weakest skill: <span className="font-black text-amber-300">{report.weakest}</span> — drill it this week</p>
                </div>
                <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden">
                    {rows.map((r, i) => (
                        <div key={i} className={cn('flex items-center gap-3 px-5 py-3.5', i > 0 && 'border-t border-stone-50')}>
                            <span className="font-bold text-stone-800 text-sm w-28">{r.name}</span>
                            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                <div className={cn('h-full rounded-full', r.pct >= 75 ? 'bg-emerald-400' : r.pct >= 50 ? 'bg-amber-400' : 'bg-red-400')} style={{ width: `${r.pct}%` }} />
                            </div>
                            <span className="text-xs font-black text-stone-700 w-10 text-right">{r.pct}%</span>
                            <span className="text-[10px] font-black bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{r.score}</span>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-stone-300 text-center flex items-center justify-center gap-1">
                    <AlertTriangle size={10} /> Practice estimates from a scaled simulation — not official HSK results.
                </p>
                <button onClick={() => { setPhase('intro'); }} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                    Run another simulation
                </button>
            </div>
        );
    }

    return null;
};
