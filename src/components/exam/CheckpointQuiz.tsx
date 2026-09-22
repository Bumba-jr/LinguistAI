import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle, AlertTriangle, Lock, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { generateCheckpoint } from '../../services/aiService';
import type { Language } from '../../store/useAppStore';

// Shared by both exam portals: a level checkpoint gate — pass before the next
// level unlocks ("never auto-promote"). 6 AI questions on the completed level.
interface CheckpointQuizProps {
    language: Language;
    levelLabel: string;       // the level being TESTED, e.g. "HSK 1" / "A2"
    topics: string[];         // topic titles of the level being tested
    accent?: string;          // tailwind bg for the primary button
    onPass: () => void;
    onCancel: () => void;
}

const CheckpointQuiz = ({ language, levelLabel, topics, accent = 'bg-emerald-500 hover:bg-emerald-600', onPass, onCancel }: CheckpointQuizProps) => {
    const [questions, setQuestions] = useState<{ question: string; options: string[]; answer: string }[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [finished, setFinished] = useState(false);

    const load = async () => {
        setLoading(true); setError(null); setQuestions(null); setAnswers({}); setFinished(false);
        try {
            const r = await generateCheckpoint(language, levelLabel, topics);
            if (!r.questions?.length) throw new Error('empty');
            setQuestions(r.questions);
        } catch {
            setError('Could not build the checkpoint — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    React.useEffect(() => { load(); }, []);

    const answered = questions ? Object.keys(answers).length : 0;
    const correct = questions ? questions.filter((q, i) => answers[i] === q.answer).length : 0;
    const passMark = questions ? Math.ceil(questions.length * 0.67) : 0; // 4 of 6
    const passed = finished && correct >= passMark;

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center gap-2 mb-1">
                    <Lock size={15} className="text-amber-500" />
                    <p className="font-black text-stone-900 text-sm">{levelLabel} checkpoint</p>
                </div>
                <p className="text-xs text-stone-400">Levels never auto-promote. Answer 6 questions on {levelLabel} — get at least {passMark} right to unlock the next level.</p>
            </div>

            {loading && (
                <div className="flex items-center justify-center gap-3 py-8 text-stone-400">
                    <Loader2 size={18} className="animate-spin" /> Writing your {levelLabel} checkpoint…
                </div>
            )}
            {error && !loading && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>
                    <button onClick={load} className="w-full py-3 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 flex items-center justify-center gap-2"><RotateCcw size={14} /> Try again</button>
                    <button onClick={onCancel} className="w-full py-2.5 text-xs font-bold text-stone-400 hover:text-stone-700">Back to curriculum</button>
                </div>
            )}

            {questions && !finished && (
                <div className="space-y-3">
                    {questions.map((q, i) => (
                        <div key={i} className="bg-white rounded-3xl border border-stone-100 p-5">
                            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">Question {i + 1}</p>
                            <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
                            <div className="grid grid-cols-1 gap-2">
                                {q.options.map((opt, oi) => (
                                    <button key={oi} onClick={() => { if (answers[i] === undefined) setAnswers(prev => ({ ...prev, [i]: opt })); }}
                                        className={cn('text-left px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                                            answers[i] === undefined ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                                : opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                    : opt === answers[i] ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400')}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    {answered === questions.length && (
                        <button onClick={() => setFinished(true)}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Finish checkpoint — {correct}/{questions.length}
                        </button>
                    )}
                </div>
            )}

            {finished && questions && (
                <div className={cn('rounded-3xl p-6 text-center space-y-3', passed ? 'bg-emerald-50' : 'bg-amber-50')}>
                    {passed ? <CheckCircle2 size={32} className="mx-auto text-emerald-500" /> : <XCircle size={32} className="mx-auto text-amber-500" />}
                    <p className={cn('text-xl font-black', passed ? 'text-emerald-700' : 'text-amber-700')}>
                        {passed ? `${correct}/${questions.length} — ${levelLabel} mastered!` : `${correct}/${questions.length} — not yet`}
                    </p>
                    <p className="text-xs text-stone-500">
                        {passed ? 'The next level is unlocked. Keep reviewing this level in Learn anyway.' : `You need ${passMark} correct. Re-read the weak topics in Learn, then retake — the questions are regenerated every time.`}
                    </p>
                    <div className="flex gap-2">
                        {passed && (
                            <button onClick={onPass} className={cn('flex-1 py-3 text-white text-sm font-bold rounded-2xl transition-colors', accent)}>Unlock next level</button>
                        )}
                        <button onClick={load} className={cn('py-3 px-5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 flex items-center justify-center gap-2', passed && 'flex-none')}>
                            <RotateCcw size={14} /> Retake
                        </button>
                        <button onClick={onCancel} className="py-3 px-5 bg-white border border-stone-200 text-stone-500 text-sm font-bold rounded-2xl hover:border-stone-400">Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckpointQuiz;
