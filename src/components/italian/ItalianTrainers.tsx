import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, CheckCircle2, RotateCcw, Eye, AlertTriangle, Play, MessageSquareText, MessagesSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateItalianListening, generateItalianReading,
    ItalianListening, ItalianReading, CilsLevel,
    CILS_VOCAB_TOPICS,
} from '../../services/italianService';
import { logWeakness, getCachedLesson, cacheLesson } from '../../services/italianStorage';
import { generateVocabSet, generateSentenceTasks, checkSentenceAttempts, SentenceTask } from '../../services/aiService';
import { useAppStore } from '../../store/useAppStore';

// ── shared exercise bits ─────────────────────────────────────────────────────
export const LevelBar = ({ level, onLevelChange }: { level: CilsLevel; onLevelChange: (l: CilsLevel) => void }) => (
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

type MCQProps = {
    q: { question: string; options: string[]; answer: string };
    i: number;
    picked?: string;
    onPick: (opt: string) => void;
};
export const MCQ = ({ q, i, picked, onPick }: MCQProps) => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5">
        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">Question {i + 1}</p>
        <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, oi) => {
                const revealed = picked !== undefined;
                return (
                    <button key={oi} onClick={() => { if (!revealed) onPick(opt); }}
                        className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                            !revealed ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                : opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                    : opt === picked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400')}>
                        {opt}
                    </button>
                );
            })}
        </div>
    </div>
);

// ── Listening trainer — audio once, transcript unlocks after finishing ───────
export const ItalianListeningTrainer = ({ level, onLevelChange, onDone }: {
    level: CilsLevel; onLevelChange: (l: CilsLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<ItalianListening | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showTranscript, setShowTranscript] = useState(false);
    const [finished, setFinished] = useState(false);
    // Listening progression: slow learner Italian → exam speed → challenge speed
    const [rate, setRate] = useState(0.88);
    const rateRef = useRef(rate);
    rateRef.current = rate;
    const stopRef = useRef(false);

    useEffect(() => () => { stopRef.current = true; stopSpeaking(); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setPlays(0); setAnswers({}); setShowTranscript(false); setFinished(false);
        try {
            const e = await generateItalianListening(level);
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
            speakText(line.it, 'Italian', () => setTimeout(next, 400), rateRef.current);
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
                    <p className="font-black text-stone-900">How CILS listening works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real exam: several short recordings (announcements, calls, conversations), each played <b>once</b>.</li>
                        <li>• Here: the recording is read aloud in Italian — try to answer after one play.</li>
                        <li>• The transcript only unlocks after you answer (train your ear, not your eyes).</li>
                        <li>• Train your ear for real speed early — and note how the verb waits at the END of spoken subordinate clauses.</li>
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
                        <div className="flex items-center gap-3 flex-wrap">
                            <button onClick={playAll} disabled={playing}
                                className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors',
                                    playing ? 'bg-stone-200 text-stone-500' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                                <Volume2 size={13} /> {playing ? 'Playing…' : plays === 0 ? 'Play the recording' : `Play again (${plays})`}
                            </button>
                            {!finished && (
                                <div className="flex gap-1 bg-stone-100 rounded-xl p-0.5">
                                    {([['Learn', 0.7], ['Exam', 0.88], ['Challenge', 1.05]] as [string, number][]).map(([label, r]) => (
                                        <button key={label} onClick={() => setRate(r)}
                                            className={cn('px-2.5 py-1.5 rounded-lg text-[10px] font-black transition-colors',
                                                rate === r ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
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
                                        <InteractiveText text={l.it} language="Italian" className="block text-sm font-semibold text-stone-900 flex-1" />
                                        <button onClick={() => speakText(l.it, 'Italian')} className="text-stone-300 hover:text-indigo-500 shrink-0"><Volume2 size={13} /></button>
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

// ── Reading trainer — timed CILS-style document + MCQs ───────────────────────
export const ItalianReadingTrainer = ({ level, onLevelChange, onDone }: {
    level: CilsLevel; onLevelChange: (l: CilsLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<ItalianReading | null>(null);
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
            const e = await generateItalianReading(level);
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
                    <p className="font-black text-stone-900">How CILS reading works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real exam: 3-5 task groups in 25-65 minutes — signs, ads, emails, articles. Skim, locate, don't translate everything.</li>
                        <li>• Here: read the document, answer 4 questions, then check the English.</li>
                        <li>• The timer trains you to read under pressure.</li>
                        <li>• Wrong options love copying exact words with reversed meaning — trust paraphrases.</li>
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
                                    <InteractiveText text={p.it} language="Italian" className="block text-sm text-stone-800 leading-relaxed" />
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
                            Finish — {correct}/{ex.questions.length} correct
                        </button>
                    )}

                    {finished && (
                        <div className={cn('rounded-3xl p-5 text-center', correct / ex.questions.length >= 0.75 ? 'bg-emerald-50' : 'bg-amber-50')}>
                            <p className="text-2xl font-black text-stone-900">{correct}/{ex.questions.length}</p>
                            <p className="text-xs text-stone-500 mt-1">{correct / ex.questions.length >= 0.75 ? 'Strong at this level — try the next one up.' : 'Re-read with the translation, note the vocabulary you missed.'}</p>
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

// ── Vocabulary trainer — CILS themed domains ─────────────────────────────────
interface VocabWord { term: string; reading: string; en: string; }

export const ItalianVocabTrainer = ({ level, onLevelChange }: {
    level: CilsLevel; onLevelChange: (l: CilsLevel) => void;
}) => {
    const { addFlashcard, user } = useAppStore() as any;
    const [topicId, setTopicId] = useState(CILS_VOCAB_TOPICS[0].id);
    const [words, setWords] = useState<VocabWord[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState<Set<string>>(new Set());
    const [tooltips, setTooltips] = useState(true);
    const [quiz, setQuiz] = useState<{ q: VocabWord; dir: 'en2es' | 'es2en'; options: VocabWord[] }[] | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const topic = CILS_VOCAB_TOPICS.find(t => t.id === topicId)!;

    const generate = async (tid = topicId) => {
        const t = CILS_VOCAB_TOPICS.find(x => x.id === tid)!;
        const key = `vocab:${level}:${tid}`;
        setLoading(true); setError(null); setWords(null); setQuiz(null); setAnswers({}); setSaved(new Set());
        const cached = getCachedLesson<{ words: VocabWord[] }>(key);
        if (cached?.words?.length) { setWords(cached.words); setLoading(false); return; }
        try {
            const r = await generateVocabSet('Italian', level, t.label, t.hint);
            if (!r.words?.length) throw new Error('empty');
            setWords(r.words);
            cacheLesson(key, r);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const addToDeck = (w: VocabWord) => {
        if (saved.has(w.term)) return;
        const card = {
            id: crypto.randomUUID(),
            word: w.term,
            translation: w.en,
            language: 'Italian' as const,
            nextReview: new Date().toISOString(),
            lastReviewed: null,
        };
        addFlashcard(card);
        if (user) import('../../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
        setSaved(prev => new Set(prev).add(w.term));
    };

    const saveAll = () => { words?.forEach(w => addToDeck(w)); };

    const startQuiz = () => {
        if (!words || words.length < 4) return;
        const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 8);
        const qs = shuffled.map((w) => {
            const dir: 'en2es' | 'es2en' = Math.random() > 0.5 ? 'en2es' : 'es2en';
            const distractors = words.filter(x => x.term !== w.term).sort(() => Math.random() - 0.5).slice(0, 3);
            const options = [w, ...distractors].sort(() => Math.random() - 0.5);
            return { q: w, dir, options };
        });
        setQuiz(qs); setAnswers({});
    };

    const answered = quiz ? Object.keys(answers).length : 0;
    const correct = quiz ? quiz.filter(({ q, dir }, i) => answers[i] === (dir === 'en2es' ? q.term : q.en)).length : 0;

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />

            <div className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-1">Themed vocabulary — {level}</p>
                <p className="text-xs text-stone-400 mb-3">Pick a CILS domain, get the exam-relevant words, save them to your deck, then quiz yourself.</p>
                <div className="flex gap-1.5 flex-wrap">
                    {CILS_VOCAB_TOPICS.map(t => (
                        <button key={t.id} onClick={() => { setTopicId(t.id); setWords(null); setQuiz(null); }}
                            className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                                topicId === t.id ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                    <button onClick={() => generate()} disabled={loading}
                        className="flex-1 min-w-[220px] py-3 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                        {loading ? <><Loader2 size={15} className="animate-spin" /> Collecting words…</> : <><MessageSquareText size={14} /> Generate the {topic.label} set</>}
                    </button>
                    <button onClick={() => setTooltips(v => !v)}
                        className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black transition-colors border-2',
                            tooltips ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-stone-200 bg-white text-stone-400')}>
                        <MessagesSquare size={13} />
                        Word tooltips {tooltips ? 'ON' : 'OFF'}
                    </button>
                </div>
                {error && <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
            </div>

            {words && !quiz && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-[11px] text-stone-400">{words.length} words · {tooltips ? 'tap any Italian word for its word card' : 'tooltips off'} · tap 🔊 to hear it</p>
                        <div className="flex gap-2">
                            <button onClick={saveAll} disabled={saved.size === words.length}
                                className={cn('px-3 py-2 rounded-xl text-[11px] font-black transition-colors',
                                    saved.size === words.length ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-emerald-500 text-white hover:bg-emerald-600')}>
                                {saved.size === words.length ? '✓ All in deck' : `Save all ${words.length}`}
                            </button>
                            <button onClick={startQuiz} className="px-3 py-2 rounded-xl text-[11px] font-black bg-stone-900 text-white hover:bg-stone-700">
                                Quiz me
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {words.map((w, i) => (
                            <div key={i} className="border border-stone-100 rounded-2xl p-3.5 bg-stone-50/50 flex items-center gap-3">
                                <div className="min-w-0 flex-1">
                                    {tooltips
                                        ? <InteractiveText text={w.term} language="Italian" className="font-bold text-lg text-stone-900" />
                                        : <p className="font-bold text-lg text-stone-900">{w.term}</p>}
                                    {w.reading && <span className="text-xs font-mono text-violet-500 block">{w.reading}</span>}
                                    <p className="text-sm text-stone-500">{w.en}</p>
                                </div>
                                <button onClick={() => speakText(w.term, 'Italian')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={14} /></button>
                                <button onClick={() => addToDeck(w)}
                                    className={cn('shrink-0 px-2.5 py-1.5 rounded-xl text-[10px] font-black transition-colors',
                                        saved.has(w.term) ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-500 hover:bg-emerald-100 hover:text-emerald-700')}>
                                    {saved.has(w.term) ? '✓' : '+ deck'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {quiz && (
                <div className="space-y-3">
                    {quiz.map(({ q, dir, options }, i) => {
                        const target = dir === 'en2es' ? q.term : q.en;
                        const picked = answers[i];
                        return (
                            <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">{i + 1} · {dir === 'en2es' ? 'Which one is it?' : 'What does this mean?'}</p>
                                {dir === 'en2es' ? (
                                    <p className="text-sm font-bold text-stone-800 mb-3">{q.en}</p>
                                ) : (
                                    <div className="flex items-center gap-2 mb-3">
                                        {tooltips
                                            ? <InteractiveText text={q.term} language="Italian" className="text-xl font-black text-stone-900" />
                                            : <p className="text-xl font-black text-stone-900">{q.term}</p>}
                                        <button onClick={() => speakText(q.term, 'Italian')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={13} /></button>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {options.map((opt, oi) => {
                                        const optValue = dir === 'en2es' ? opt.term : opt.en;
                                        const revealed = picked !== undefined;
                                        return (
                                            <button key={oi} onClick={() => { if (!revealed) { setAnswers(prev => ({ ...prev, [i]: optValue })); if (optValue !== target) logWeakness({ skill: 'reading', level, question: `Vocab: ${dir === 'en2es' ? q.en : q.term}`, chosen: optValue, answer: target }); } }}
                                                className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                                    !revealed ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                                        : optValue === target ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                            : optValue === picked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400')}>
                                                {dir === 'en2es' ? <span className="font-bold">{opt.term}</span> : opt.en}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    {answered === quiz.length && (
                        <div className="rounded-3xl p-5 text-center bg-stone-900 text-white space-y-2">
                            <p className="text-2xl font-black">{correct}/{quiz.length}</p>
                            <p className="text-xs text-white/60">{correct >= 6 ? 'Strong — save any you missed and move on.' : 'Save the whole set to your deck and drill it in Flashcards.'}</p>
                            <div className="flex gap-2 justify-center pt-1">
                                <button onClick={startQuiz} className="px-4 py-2.5 bg-white/10 rounded-xl text-xs font-black hover:bg-white/20">Retake</button>
                                <button onClick={() => setQuiz(null)} className="px-4 py-2.5 bg-white rounded-xl text-xs font-black text-stone-900 hover:bg-stone-100">Back to words</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ── Sentence Builder — the transformation & expansion engine ─────────────────
export const ItalianSentenceBuilder = ({ level, onLevelChange }: {
    level: CilsLevel; onLevelChange: (l: CilsLevel) => void;
}) => {
    const [tasks, setTasks] = useState<SentenceTask[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [attempts, setAttempts] = useState<Record<number, string>>({});
    const [checking, setChecking] = useState(false);
    const [results, setResults] = useState<{ verdict: string; corrected: string; why: string }[] | null>(null);

    const generate = async () => {
        setLoading(true); setError(null); setTasks(null); setResults(null); setAttempts({});
        try {
            const r = await generateSentenceTasks('Italian', level, 5);
            if (!r.tasks?.length) throw new Error('empty');
            setTasks(r.tasks);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const check = async () => {
        if (!tasks) return;
        setChecking(true); setError(null);
        try {
            const r = await checkSentenceAttempts('Italian', level, tasks.map((t, i) => ({
                instruction: t.instruction, base: t.base, modelAnswer: t.answer, userAnswer: attempts[i] || '',
            })));
            setResults(r.results);
        } catch {
            setError('Checking failed — the AI may be busy. Try again.');
        } finally { setChecking(false); }
    };

    const answeredAll = tasks ? tasks.every((_, i) => (attempts[i] || '').trim().length > 0) : false;
    const score = results ? results.filter(r => r.verdict === 'correct').length : 0;

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />

            {!tasks && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">The sentence-building engine</p>
                    <p className="text-xs text-stone-500 space-y-1.5">
                        One base sentence, five transformations — the most powerful way to learn Italian: instead of memorising phrases, you learn how the scaffolding changes (pronoun placement, essere vs stare, auxiliary choice, ci/ne).
                    </p>
                    <ul className="text-xs text-stone-500 space-y-1">
                        <li>• 3 transformations: negative, question, past, future, conditional…</li>
                        <li>• 2 expansions: add a reason, a time, a place, a contrast</li>
                        <li>• Write your answer under each task — the examiner checks all five and corrects you</li>
                    </ul>
                    <button onClick={generate} disabled={loading}
                        className="w-full py-3.5 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Build a {level} sentence round
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}

            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Building your {level} sentence round…
                </div>
            )}

            {tasks && (
                <div className="space-y-4">
                    {tasks.map((t, i) => {
                        const res = results?.[i];
                        return (
                            <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Task {i + 1} — {t.instruction}</p>
                                        <InteractiveText text={t.base} language="Italian" className="block text-base font-bold text-stone-900" />
                                        <p className="text-xs text-stone-400">{t.baseEnglish}</p>
                                    </div>
                                    <button onClick={() => speakText(t.base, 'Italian')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={14} /></button>
                                </div>
                                <textarea value={attempts[i] || ''} onChange={e => setAttempts(prev => ({ ...prev, [i]: e.target.value }))} rows={2} disabled={!!results}
                                    placeholder="Schreiben Sie Ihren umgeformten Satz…"
                                    className="w-full px-4 py-3 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-emerald-400 bg-stone-50 resize-y" />
                                {res && (
                                    <div className={cn('rounded-2xl p-3.5 space-y-1 border',
                                        res.verdict === 'correct' ? 'bg-emerald-50 border-emerald-100' : res.verdict === 'fixed' ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100')}>
                                        <p className={cn('text-xs font-black flex items-center gap-1.5',
                                            res.verdict === 'correct' ? 'text-emerald-700' : res.verdict === 'fixed' ? 'text-amber-700' : 'text-red-600')}>
                                            {res.verdict === 'correct' ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
                                            {res.verdict === 'correct' ? 'Correct!' : res.verdict === 'fixed' ? 'Almost — corrected:' : 'Not this transformation:'}
                                        </p>
                                        {res.corrected && res.corrected !== '—' && <InteractiveText text={res.corrected} language="Italian" className="block text-sm font-bold text-stone-900" />}
                                        <p className="text-xs text-stone-500">{res.why}</p>
                                        <details className="text-xs text-stone-400">
                                            <summary className="cursor-pointer">Model answer</summary>
                                            <p className="mt-1 font-bold text-stone-700">{t.answer}</p>
                                            <p>{t.answerEnglish}</p>
                                        </details>
                                    </div>
                                )}
                                {!results && (
                                    <details className="text-xs text-stone-300">
                                        <summary className="cursor-pointer">Stuck? Show the model answer</summary>
                                        <p className="mt-1 font-bold text-stone-600">{t.answer}</p>
                                        <p>{t.answerEnglish}</p>
                                    </details>
                                )}
                            </div>
                        );
                    })}

                    {!results && (
                        <button onClick={check} disabled={!answeredAll || checking}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                            {checking ? <><Loader2 size={15} className="animate-spin" /> Your examiner is checking…</> : 'Check all five answers'}
                        </button>
                    )}

                    {results && (
                        <div className="rounded-3xl p-5 text-center bg-stone-900 text-white space-y-2">
                            <p className="text-2xl font-black">{score}/{tasks.length} perfect</p>
                            <p className="text-xs text-white/60">{score >= 4 ? 'Excellent control of the scaffolding — level up.' : 'Read the corrections carefully, then run a new round.'}</p>
                            <button onClick={generate} className="mt-1 px-5 py-2.5 bg-white rounded-xl text-xs font-black text-stone-900 hover:bg-stone-100 inline-flex items-center gap-2">
                                <RotateCcw size={12} /> New round
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
