import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ClipboardList, PenLine, ListChecks } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { HomeworkCheck, StaticFrenchLesson } from '../../services/frenchLessons';

// Full-page homework & assessment — the "Day-1 mega-homework" experience.
// The learner answers every item, checks it, and reads the explanation for
// EVERY line — the ones they got right too, so nothing stays "right by luck".

const normalize = (v: string) =>
    v.toLowerCase()
        .replace(/[\u2019\u2018`´]/g, "'")
        .replace(/\s+/g, ' ')
        .replace(/[.!?]+\s*$/, '')
        .trim();

const isRight = (given: string, item: HomeworkCheck) => {
    const candidates = [item.answer, ...(item.alt ?? [])].map(normalize);
    return candidates.includes(normalize(given));
};

type SectionKey = 'a' | 'b' | 'c';

const CheckItem = ({ index, tag, item, answer, onAnswer }: {
    index: number; tag: string; item: HomeworkCheck; answer?: string; onAnswer: (v: string) => void;
}) => {
    const [checked, setChecked] = useState(false);
    const right = checked && answer !== undefined && isRight(answer, item);
    const showResult = checked && answer !== undefined && answer.trim().length > 0;

    return (
        <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-3">
            <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{tag} {index + 1}</p>
            <p className="text-sm font-semibold text-stone-800">{item.prompt}</p>
            <div className="flex gap-2">
                <input value={answer ?? ''} onChange={e => onAnswer(e.target.value)}
                    placeholder="Votre réponse en français…"
                    className="flex-1 px-4 py-3 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-emerald-400 bg-stone-50" />
                <button onClick={() => setChecked(true)}
                    className="px-4 py-3 bg-stone-900 text-white text-[11px] font-black rounded-2xl hover:bg-stone-700 transition-colors">
                    Check
                </button>
            </div>
            {showResult && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                    className={cn('rounded-2xl p-4 space-y-1.5 border',
                        right ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')}>
                    <p className={cn('text-xs font-black flex items-center gap-1.5',
                        right ? 'text-emerald-700' : 'text-red-600')}>
                        {right ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {right ? 'Correct!' : 'Not quite — here is the fix:'}
                    </p>
                    <p className="text-sm font-bold text-stone-900">{item.answer}</p>
                    <p className="text-xs text-stone-500 leading-relaxed">{item.explanation}</p>
                    {!right && (
                        <button onClick={() => { onAnswer(''); setChecked(false); }}
                            className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 pt-1">
                            <RotateCcw size={11} /> Try again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const LessonHomework = ({ lesson, onClose }: { lesson: StaticFrenchLesson; onClose: () => void }) => {
    const hw = lesson.homework!;
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [writing, setWriting] = useState('');
    const [ticks, setTicks] = useState<Set<number>>(new Set());

    const set = (key: string) => (v: string) => setAnswers(prev => ({ ...prev, [key]: v }));
    const words = writing.trim() ? writing.trim().split(/\s+/).length : 0;

    const totalChecked = useMemo(() => {
        const all: [string, HomeworkCheck][] = [
            ...hw.translation.map((h, i) => [`a${i}`, h] as [string, HomeworkCheck]),
            ...hw.blanks.map((h, i) => [`b${i}`, h] as [string, HomeworkCheck]),
            ...hw.corrections.map((h, i) => [`c${i}`, h] as [string, HomeworkCheck]),
        ];
        let right = 0, done = 0;
        all.forEach(([key, item]) => {
            const a = answers[key];
            if (a !== undefined && a.trim().length > 0) {
                done++;
                if (isRight(a, item)) right++;
            }
        });
        return { right, done, total: all.length };
    }, [answers, hw]);

    const toggleTick = (i: number) => setTicks(prev => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i); else next.add(i);
        return next;
    });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-[#FDFCFB] text-stone-900 overflow-y-auto">
            <div className="max-w-2xl mx-auto w-full py-8 px-4 pb-24">
                {/* header */}
                <div className="flex items-center justify-between mb-2">
                    <button onClick={onClose} className="flex items-center gap-2 text-sm font-bold text-stone-400 hover:text-stone-800 transition-colors">
                        <ArrowLeft size={15} /> Back to the lesson
                    </button>
                    <span className="text-[10px] font-black bg-stone-100 text-stone-400 px-2 py-1 rounded-full uppercase tracking-widest">
                        {totalChecked.right}/{totalChecked.total} correct
                    </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <ClipboardList size={20} className="text-emerald-600" />
                    <h1 className="text-2xl font-black">Homework & Assessment</h1>
                </div>
                <p className="text-xs text-stone-400 mb-1">{lesson.title} — answer everything, check it, and read every explanation. The ones you got right too: that is how nothing stays right by luck.</p>
                {hw.intro && <p className="text-xs text-stone-500 bg-stone-100 rounded-2xl px-4 py-3 mt-2">{hw.intro}</p>}

                {/* Section A — translation */}
                <div className="flex items-center gap-2 mt-8 mb-3">
                    <PenLine size={15} className="text-emerald-600" />
                    <h2 className="text-sm font-black text-stone-800 uppercase tracking-wider">Section A — Translate into French</h2>
                </div>
                <div className="space-y-3">
                    {hw.translation.map((item, i) => (
                        <CheckItem key={`a${i}`} index={i} tag="Translation" item={item}
                            answer={answers[`a${i}`]} onAnswer={set(`a${i}`)} />
                    ))}
                </div>

                {/* Section B — fill in the blanks */}
                <div className="flex items-center gap-2 mt-8 mb-3">
                    <ClipboardList size={15} className="text-violet-600" />
                    <h2 className="text-sm font-black text-stone-800 uppercase tracking-wider">Section B — Fill in the blank</h2>
                </div>
                <div className="space-y-3">
                    {hw.blanks.map((item, i) => (
                        <CheckItem key={`b${i}`} index={i} tag="Blank" item={item}
                            answer={answers[`b${i}`]} onAnswer={set(`b${i}`)} />
                    ))}
                </div>

                {/* Section C — error correction */}
                <div className="flex items-center gap-2 mt-8 mb-3">
                    <XCircle size={15} className="text-red-500" />
                    <h2 className="text-sm font-black text-stone-800 uppercase tracking-wider">Section C — Find and fix the error</h2>
                </div>
                <div className="space-y-3">
                    {hw.corrections.map((item, i) => (
                        <CheckItem key={`c${i}`} index={i} tag="Fix it" item={item}
                            answer={answers[`c${i}`]} onAnswer={set(`c${i}`)} />
                    ))}
                </div>

                {/* Section D — writing task */}
                <div className="flex items-center gap-2 mt-8 mb-3">
                    <PenLine size={15} className="text-amber-600" />
                    <h2 className="text-sm font-black text-stone-800 uppercase tracking-wider">Section D — Writing task</h2>
                </div>
                <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-3">
                    <p className="text-sm font-semibold text-stone-800">{hw.writing.task}</p>
                    <ul className="space-y-1">
                        {hw.writing.requirements.map((r, i) => (
                            <li key={i} className="text-xs text-stone-500 flex gap-1.5"><span className="text-stone-300">•</span>{r}</li>
                        ))}
                    </ul>
                    <textarea value={writing} onChange={e => setWriting(e.target.value)} rows={8}
                        placeholder="Écrivez votre réponse…"
                        className="w-full px-4 py-3 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-amber-400 bg-stone-50 resize-y" />
                    <p className="text-[10px] font-bold text-stone-300">{words} words (target: at least {hw.writing.minWords})</p>
                </div>

                {/* Final checklist */}
                <div className="flex items-center gap-2 mt-8 mb-3">
                    <ListChecks size={15} className="text-emerald-600" />
                    <h2 className="text-sm font-black text-stone-800 uppercase tracking-wider">End-of-lesson checklist</h2>
                </div>
                <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-2">
                    {hw.checklist.map((c, i) => (
                        <button key={i} onClick={() => toggleTick(i)}
                            className={cn('w-full flex items-start gap-3 rounded-2xl px-3.5 py-2.5 text-left transition-colors',
                                ticks.has(i) ? 'bg-emerald-50 border border-emerald-100' : 'bg-stone-50 border border-transparent hover:border-stone-200')}>
                            <span className={cn('w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5',
                                ticks.has(i) ? 'bg-emerald-500 border-emerald-500' : 'border-stone-300')}>
                                {ticks.has(i) && <CheckCircle2 size={13} className="text-white" />}
                            </span>
                            <span className={cn('text-xs font-semibold', ticks.has(i) ? 'text-emerald-800' : 'text-stone-600')}>{c}</span>
                        </button>
                    ))}
                </div>
                <p className="text-[10px] text-stone-300 text-center mt-6">
                    If any checklist box stays unticked, revisit that part of the lesson before moving to the next topic.
                </p>
            </div>
        </motion.div>
    );
};
