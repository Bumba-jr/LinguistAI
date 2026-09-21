import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, CheckCircle2, XCircle, RotateCcw, Eye, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateHskListening, generateHskReading,
    HskListening, HskReading, HskLevel,
    TONE_SETS, NEUTRAL_TONE_WORDS, TONE_SANDHI,
} from '../../services/hskService';
import { logWeakness } from '../../services/hskStorage';

// ── shared exercise bits ─────────────────────────────────────────────────────
export const LevelBar = ({ level, onLevelChange }: { level: HskLevel; onLevelChange: (l: HskLevel) => void }) => (
    <div className="flex gap-1.5 flex-wrap">
        {(['1', '2', '3', '4', '5', '6'] as HskLevel[]).map(l => (
            <button key={l} onClick={() => onLevelChange(l)}
                className={cn('px-3.5 py-1.5 rounded-xl text-xs font-black transition-colors',
                    level === l ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400')}>
                HSK {l}
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
export const MCQ = ({ q, i, picked, onPick }: MCQProps) => (
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

// 汉字 — pinyin — English: the three-form rule, everywhere
export const ZHEn = ({ hanzi, pinyin, en, dark = false, speak = true }: { hanzi: string; pinyin?: string; en: string; dark?: boolean; speak?: boolean }) => (
    <div className="space-y-0.5">
        <div className="flex items-center justify-between gap-2">
            <InteractiveText text={hanzi} language="Chinese" dark={dark}
                className={cn('block font-semibold', dark ? 'text-white' : 'text-stone-900')} />
            {speak && <button onClick={() => speakText(hanzi, 'Chinese')} className={cn('shrink-0', dark ? 'text-white/40 hover:text-white' : 'text-stone-300 hover:text-emerald-500')}><Volume2 size={13} /></button>}
        </div>
        {pinyin && <p className={cn('text-xs font-mono', dark ? 'text-amber-300/80' : 'text-violet-500')}>{pinyin}</p>}
        <p className={cn('text-sm', dark ? 'text-white/50' : 'text-stone-400')}>{en}</p>
    </div>
);

const TONE_COLORS = ['', 'text-red-500', 'text-amber-500', 'text-violet-500', 'text-blue-500'];
const TONE_NAMES = ['', '1st — flat & high (mā)', '2nd — rising (má)', '3rd — dip down (mǎ)', '4th — sharp fall (mà)'];

// ── Pinyin primer — static reference, always available ──────────────────────
export const PinyinGuide = () => (
    <div className="space-y-4">
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="font-black text-stone-900 mb-1">What pinyin is</p>
            <p className="text-sm text-stone-600 leading-relaxed">
                Pinyin (拼音) is the official romanisation: it spells Chinese sounds with the Latin alphabet.
                汉字 are the actual writing; pinyin tells you how to say them. Every new word in this portal
                always shows all three forms: <span className="font-bold">汉字 — pinyin — English</span>.
            </p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between">
                <div>
                    <p className="font-bold text-stone-900">你好</p>
                    <p className="text-xs font-mono text-violet-500">nǐ hǎo</p>
                </div>
                <p className="text-sm text-stone-500">hello</p>
                <button onClick={() => speakText('你好', 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={14} /></button>
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="font-black text-stone-900 mb-1">The 4 tones + neutral tone</p>
            <p className="text-sm text-stone-600 mb-3">Same sound, different tone, different word. This is the single most important habit from day one.</p>
            <div className="space-y-1.5">
                {TONE_NAMES.slice(1).map((n, i) => (
                    <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                        <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white', TONE_COLORS[i + 1])}>{i + 1}</span>
                        <span className="text-xs font-bold text-stone-700 flex-1">{n}</span>
                    </div>
                ))}
                <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black bg-stone-400 text-white">·</span>
                    <span className="text-xs font-bold text-stone-700 flex-1">Neutral — light & quick, unstressed (māma mum)</span>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NEUTRAL_TONE_WORDS.map((w, i) => (
                    <div key={i} className="bg-stone-50 rounded-2xl p-3">
                        <ZHEn hanzi={w.hanzi} pinyin={w.pinyin} en={w.en} />
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="font-black text-stone-900 mb-1">Tone sandhi — tones change in real speech</p>
            <p className="text-sm text-stone-600 mb-3">You write one tone but say another. Learners who skip this sound robotic.</p>
            <div className="space-y-2">
                {TONE_SANDHI.map((s, i) => (
                    <div key={i} className="bg-amber-50 border border-amber-100 rounded-2xl p-3.5">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{s.rule}</p>
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="font-bold text-stone-900">{s.example.hanzi} <span className="text-xs font-mono text-stone-400 line-through">{s.example.written}</span> → <span className="text-xs font-mono text-emerald-600">{s.example.spoken}</span></p>
                                <p className="text-xs text-stone-500">{s.example.en}</p>
                            </div>
                            <button onClick={() => speakText(s.example.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="font-black text-stone-900 mb-1">Pinyin spelling traps for English speakers</p>
            <ul className="text-sm text-stone-600 space-y-1.5">
                <li>• <b>c</b> is always "ts" (从来 cónglái = tsong-lie), never a "k" sound.</li>
                <li>• <b>q</b> sounds like "ch" in cheese; <b>x</b> is a soft "sh"; <b>zh</b> is a "j"-like sound.</li>
                <li>• <b>zh/ch/sh</b> are retroflex (tongue curled back) vs <b>z/c/s</b> flat — 他 tā vs 茶 chá.</li>
                <li>• <b>ü</b> says "ü" like French <i>u</i>; after j/q/x it is written u (去 qù = "chü").</li>
                <li>• <b>-e</b> in 他她它 (tā class) vs 饿 è differs from English e — listen, don't map to English letters.</li>
            </ul>
        </div>
    </div>
);

// ── Tone trainer — hear a word, pick the tone you heard ──────────────────────
export const ToneTrainer = ({ onDone }: { onDone?: (pct: number, label: string) => void }) => {
    const [setIdx, setSetIdx] = useState(0);
    const [current, setCurrent] = useState<{ item: { hanzi: string; pinyin: string; tone: number; en: string }; round: number } | null>(null);
    const [picked, setPicked] = useState<number | null>(null);
    const [score, setScore] = useState({ right: 0, total: 0 });
    const [playing, setPlaying] = useState(false);
    const stopRef = useRef(false);

    useEffect(() => () => { stopRef.current = true; stopSpeaking(); }, []);

    const nextRound = (idx = setIdx) => {
        const set = TONE_SETS[idx];
        const item = set.items[Math.floor(Math.random() * 4)];
        setCurrent({ item, round: (current?.round || 0) + 1 });
        setPicked(null);
    };

    const play = (hanzi?: string) => {
        if (!current) return;
        setPlaying(true);
        speakText(hanzi || current.item.hanzi, 'Chinese', () => setPlaying(false));
    };

    const pick = (tone: number) => {
        if (!current || picked !== null) return;
        setPicked(tone);
        const right = tone === current.item.tone;
        setScore(s => ({ right: s.right + (right ? 1 : 0), total: s.total + 1 }));
        if (!right) logWeakness({ skill: 'tones', level: `set ${TONE_SETS[setIdx].syllable}`, question: `Which tone is ${current.item.hanzi}?`, chosen: `Tone ${tone}`, answer: `Tone ${current.item.tone}` });
    };

    const switchSet = (i: number) => {
        setSetIdx(i);
        setCurrent(null);
        setPicked(null);
    };

    const pct = score.total ? Math.round((score.right / score.total) * 100) : 0;

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                        <p className="font-black text-stone-900">Tone pair trainer</p>
                        <p className="text-xs text-stone-400 mt-0.5">Minimal pairs: same syllable, 4 tones, 4 meanings. Listen → pick the tone → check.</p>
                    </div>
                    {score.total > 0 && (
                        <span className={cn('text-xs font-black px-3 py-1.5 rounded-xl', pct >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                            {score.right}/{score.total} · {pct}%
                        </span>
                    )}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {TONE_SETS.map((s, i) => (
                        <button key={s.syllable} onClick={() => switchSet(i)}
                            className={cn('px-3 py-1.5 rounded-xl text-xs font-black font-mono transition-colors',
                                setIdx === i ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                            {s.syllable}
                        </button>
                    ))}
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TONE_SETS[setIdx].items.map((it, i) => (
                        <div key={i} className="bg-stone-50 rounded-2xl p-3 text-center">
                            <p className="text-xl font-black text-stone-900">{it.hanzi}</p>
                            <p className="text-xs font-mono text-violet-500">{it.pinyin}</p>
                            <p className={cn('text-[10px] font-black mt-0.5', TONE_COLORS[it.tone])}>tone {it.tone}</p>
                            <p className="text-[10px] text-stone-400">{it.en}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-4">
                {!current ? (
                    <>
                        <p className="text-sm text-stone-500">I will play one word from the <b className="font-mono">{TONE_SETS[setIdx].syllable}</b> set. Which tone do you hear?</p>
                        <button onClick={() => nextRound()}
                            className="px-6 py-3 bg-violet-600 text-white text-sm font-bold rounded-2xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                            <Play size={15} /> Start listening
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Round {score.total + 1} — which tone do you hear?</p>
                        <button onClick={() => play()} disabled={playing}
                            className={cn('w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all',
                                playing ? 'bg-stone-300 animate-pulse' : 'bg-violet-600 hover:bg-violet-700')}>
                            <Volume2 size={30} />
                        </button>
                        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                            {[1, 2, 3, 4].map(t => (
                                <button key={t} onClick={() => pick(t)}
                                    className={cn('py-3 rounded-2xl border-2 font-black text-sm transition-all',
                                        picked === null ? 'bg-white border-stone-200 text-stone-700 hover:border-violet-400'
                                            : t === current.item.tone ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                                                : t === picked ? 'bg-red-50 border-red-300 text-red-500' : 'bg-white border-stone-100 text-stone-300')}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        {picked !== null && (
                            <div className="space-y-2">
                                <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold',
                                    picked === current.item.tone ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600')}>
                                    {picked === current.item.tone ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                                    {picked === current.item.tone ? 'Correct' : `It was tone ${current.item.tone}`}
                                </div>
                                <p className="text-sm text-stone-700">{current.item.hanzi} <span className="font-mono text-violet-500">{current.item.pinyin}</span> — {current.item.en}</p>
                                <button onClick={() => nextRound()}
                                    className="w-full max-w-md mx-auto py-3 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                                    <RotateCcw size={14} /> Next word
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {score.total >= 8 && onDone && (
                <button onClick={() => onDone(pct, `Tone trainer: ${TONE_SETS[setIdx].syllable} set`)}
                    className="w-full py-3.5 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors">
                    <CheckCircle2 size={14} className="inline mr-1.5" /> Save this result ({pct}%)
                </button>
            )}
        </div>
    );
};

// ── Listening trainer — HSK rule: audio heard ONCE in exam mode ─────────────
export const HSKListeningTrainer = ({ level, onLevelChange, onDone }: {
    level: HskLevel; onLevelChange: (l: HskLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<HskListening | null>(null);
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
            const e = await generateHskListening(level);
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
            speakText(line.hanzi, 'Chinese', () => setTimeout(next, 400));
        };
        next();
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;

    const finish = () => {
        setFinished(true);
        setShowTranscript(true);
        if (ex) onDone(Math.round((correct / ex.questions.length) * 100), `${level} listening: ${ex.scenario}`);
    };

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {!ex && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">How HSK listening works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real HSK {level}: {level === '1' ? '20' : level === '2' ? '35' : level === '6' ? '50' : '40–45'} questions, audio plays <b>once</b>.</li>
                        <li>• Here: the recording is read aloud in Chinese — answer after one play.</li>
                        <li>• The transcript + pinyin only unlock after you finish (train your ear, not your eyes).</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate an HSK {level} listening exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing an HSK {level} recording…
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
                            {plays > 0 && !finished && <span className="text-[10px] text-stone-400">Exam rule: you only hear it once — no replay before answering</span>}
                        </div>
                    </div>

                    {!finished && answered < ex.questions.length && (
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700">
                            Answer from memory. The transcript + pinyin unlock when you finish.
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
                            <p className="text-xs text-stone-500 mt-1">{correct / ex.questions.length >= 0.75 ? 'Strong at this level — try the next HSK up.' : 'Read the transcript, shadow each line, then retry.'}</p>
                        </div>
                    )}

                    {(showTranscript || finished) && (
                        <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-2">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Transcript — read, then shadow each line</p>
                            {ex.lines.map((l, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-3 space-y-0.5">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase">{l.speaker}</p>
                                    <ZHEn hanzi={l.hanzi} pinyin={l.pinyin} en={l.en} />
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

// ── Reading trainer — timed HSK-style document + MCQs ────────────────────────
export const HSKReadingTrainer = ({ level, onLevelChange, onDone }: {
    level: HskLevel; onLevelChange: (l: HskLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<HskReading | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showEn, setShowEn] = useState(false);
    const [showPinyin, setShowPinyin] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [finished, setFinished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setAnswers({}); setShowEn(false); setShowPinyin(false); setFinished(false);
        setSeconds(0); setTimerOn(true);
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        try {
            const e = await generateHskReading(level);
            if (!e.paragraphs?.length || !e.questions?.length) throw new Error('empty');
            setEx(e);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;
    const finish = () => {
        setFinished(true); setShowEn(true); setShowPinyin(true);
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
                    <p className="font-black text-stone-900">How HSK reading works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real HSK {level}: {level === '1' ? '20' : level === '2' ? '25' : level === '3' ? '30' : level === '4' ? '40' : level === '5' ? '45' : '50'} questions — skim, locate, don't translate everything.</li>
                        <li>• Here: read the Chinese document, answer 4 questions, then check the English.</li>
                        <li>• Pinyin is hidden by default — read the characters first like the real exam.</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-teal-600 text-white text-sm font-bold rounded-2xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate an HSK {level} reading exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing an HSK {level} document…
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
                                    <InteractiveText text={p.hanzi} language="Chinese" className="block text-sm text-stone-800 leading-loose" />
                                    {showPinyin && p.pinyin && <p className="text-xs font-mono text-violet-500 mt-0.5">{p.pinyin}</p>}
                                    {showEn && <p className="text-xs text-stone-400 italic border-l-2 border-stone-200 pl-3 mt-1">{p.en}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setShowPinyin(v => !v)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 hover:text-violet-600 transition-colors">
                            <HelpCircle size={12} /> {showPinyin ? 'Hide' : 'Show'} pinyin {finished ? '' : '(after finishing)'}
                        </button>
                        <button onClick={() => setShowEn(v => !v)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 hover:text-stone-700 transition-colors">
                            <Eye size={12} /> {showEn ? 'Hide' : 'Show'} English {finished ? '' : '(after finishing)'}
                        </button>
                    </div>

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
                                {correct / ex.questions.length >= 0.75 ? 'Solid comprehension — move up a level.' : 'Read the English, find the evidence in the characters, then retry.'}
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
