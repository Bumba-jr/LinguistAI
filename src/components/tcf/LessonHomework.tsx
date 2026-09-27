import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ClipboardList, PenLine, ListChecks, PartyPopper } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { HomeworkCheck, RemedialLesson, StaticFrenchLesson } from '../../services/frenchLessons';
import { evaluateTcfWriting } from '../../services/tcfService';

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

const CheckItem = ({ index, tag, item, answer, onAnswer, graded, onRetry }: {
    index: number; tag: string; item: HomeworkCheck; answer?: string; onAnswer: (v: string) => void; graded: boolean; onRetry: () => void;
}) => {
    const right = graded && answer !== undefined && isRight(answer, item);
    const showResult = graded;

    return (
        <div className={cn('rounded-3xl border p-5 space-y-3 transition-colors',
            graded ? (right ? 'bg-emerald-50/60 border-emerald-100' : 'bg-red-50/60 border-red-100') : 'bg-white border-stone-100')}>
            <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{tag} {index + 1}</p>
                {graded && (right
                    ? <CheckCircle2 size={16} className="text-emerald-600" />
                    : <XCircle size={16} className="text-red-500" />)}
            </div>
            <p className="text-sm font-semibold text-stone-800">{item.prompt}</p>
            <input value={answer ?? ''} onChange={e => onAnswer(graded ? answer ?? '' : e.target.value)}
                readOnly={graded}
                placeholder="Votre réponse en français…"
                className={cn('w-full px-4 py-3 text-sm rounded-2xl border focus:outline-none bg-stone-50',
                    graded ? (right ? 'border-emerald-200' : 'border-red-200') : 'border-stone-200 focus:border-emerald-400')} />
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
                    {!right && graded && (
                        <button onClick={() => { onAnswer(''); onRetry(); }}
                            className="text-[11px] font-black text-emerald-600 hover:text-emerald-700 flex items-center gap-1 pt-1">
                            <RotateCcw size={11} /> Try again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const LessonHomework = ({ lesson, level = 'A1', onClose, onMarkComplete }: { lesson: StaticFrenchLesson; level?: string; onClose: () => void; onMarkComplete: () => void }) => {
    const hw = lesson.homework!;
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [writing, setWriting] = useState('');
    const [writingFb, setWritingFb] = useState<import('../../services/tcfService').TcfWritingFeedback | null>(null);
    const [writingBusy, setWritingBusy] = useState(false);
    const [writingErr, setWritingErr] = useState<string | null>(null);
    const [showRemedial, setShowRemedial] = useState(false);
    const [ticks, setTicks] = useState<Set<number>>(new Set());
    const [graded, setGraded] = useState(false);

    const set = (key: string) => (v: string) => setAnswers(prev => ({ ...prev, [key]: v }));
    const words = writing.trim() ? writing.trim().split(/\s+/).length : 0;

    const rateWriting = async () => {
        setWritingBusy(true); setWritingErr(null); setWritingFb(null);
        try {
            const fb = await evaluateTcfWriting(
                'Homework writing task', hw.writing.task, hw.writing.minWords, writing, (level as any) || 'A1');
            setWritingFb(fb);
        } catch (e: any) {
            const msg = e?.message || String(e);
            if (msg.includes('401') || msg.includes('Sign in')) {
                setWritingErr('You need to sign in for AI evaluation. The rest of the homework works offline.');
            } else if (msg.includes('429') || msg.includes('too quickly')) {
                setWritingErr('Rate limited — wait a minute and try again.');
            } else {
                setWritingErr('Evaluation failed: ' + msg.slice(0, 120) + '. Check your connection and try again.');
            }
        } finally { setWritingBusy(false); }
    };

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
                        <CheckItem key={`a${i}`} index={i} tag="Translation" item={item} graded={graded} onRetry={() => setGraded(false)}
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
                        <CheckItem key={`b${i}`} index={i} tag="Blank" item={item} graded={graded} onRetry={() => setGraded(false)}
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
                        <CheckItem key={`c${i}`} index={i} tag="Fix it" item={item} graded={graded} onRetry={() => setGraded(false)}
                            answer={answers[`c${i}`]} onAnswer={set(`c${i}`)} />
                    ))}
                </div>

                {/* one-button rating — finish everything first, then rate it all at once */}
                {!graded && (
                    <div className="bg-stone-900 rounded-3xl p-5 text-center space-y-2">
                        <p className="text-xs text-white/60">Finish every section above, then rate the whole homework in one go.</p>
                        <button onClick={() => setGraded(true)} disabled={totalChecked.done < totalChecked.total}
                            className="px-8 py-3.5 bg-emerald-500 text-white text-sm font-black rounded-2xl hover:bg-emerald-600 transition-colors disabled:opacity-40">
                            {totalChecked.done < totalChecked.total
                                ? `Answer everything first (${totalChecked.done}/${totalChecked.total})`
                                : 'Rate my homework'}
                        </button>
                    </div>
                )}
                {graded && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className={cn('rounded-3xl p-6 text-center text-white', totalChecked.right === totalChecked.total ? 'bg-emerald-600' : 'bg-stone-900')}>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Your homework result</p>
                        <p className="text-4xl font-black my-2">{totalChecked.right}/{totalChecked.total}</p>
                        <p className="text-xs opacity-70">
                            {totalChecked.right === totalChecked.total
                                ? 'Perfect — every answer explained above, right or wrong. Tick the checklist and close the lesson.'
                                : 'Read every explanation above, fix the red ones with Try again, then re-rate.'}
                        </p>
                        {graded && totalChecked.right < totalChecked.total && (
                            <button onClick={() => setGraded(false)}
                                className="mt-3 px-5 py-2.5 bg-white/10 rounded-xl text-xs font-black hover:bg-white/20 inline-flex items-center gap-2">
                                <RotateCcw size={12} /> Fix answers & re-rate
                            </button>
                        )}
                    </motion.div>
                )}

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
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-bold text-stone-300">{words} words (target: at least {hw.writing.minWords})</p>
                        <button onClick={rateWriting} disabled={writingBusy || words < 10}
                            className="px-4 py-2.5 bg-amber-500 text-white text-[11px] font-black rounded-2xl hover:bg-amber-600 transition-colors disabled:opacity-40">
                            {writingBusy ? 'Your examiner is grading…' : 'Rate my writing'}
                        </button>
                    </div>
                    {writingErr && <p className="text-xs text-red-500">{writingErr}</p>}
                    {writingFb && (
                        <div className="space-y-2 pt-1">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-2xl font-black text-amber-500">{writingFb.score20}<span className="text-sm text-stone-300">/20</span></span>
                                <span className="text-xs font-black text-emerald-600">est. {writingFb.estimatedLevel}</span>
                            </div>
                            {writingFb.corrections?.map((c, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-3 space-y-0.5">
                                    <p className="text-xs text-red-400 line-through">{c.original}</p>
                                    <p className="text-xs font-bold text-emerald-600">{c.corrected}</p>
                                    <p className="text-[11px] text-stone-400">{c.why}</p>
                                </div>
                            ))}
                            {writingFb.improvements?.length > 0 && (
                                <ul className="space-y-1 pt-1">
                                    {writingFb.improvements.map((im, i) => (
                                        <li key={i} className="text-[11px] text-stone-500 flex gap-1.5"><span className="text-amber-400">•</span>{im}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
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
                {graded && (
                    <div className="mt-3 bg-white rounded-3xl border border-stone-100 p-5 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <p className="text-xs font-bold text-stone-600">
                                {ticks.size === hw.checklist.length
                                    ? 'Every box ticked — you understand it all.'
                                    : `${hw.checklist.length - ticks.size} box${hw.checklist.length - ticks.size !== 1 ? 'es' : ''} unticked — that usually means the point is not solid yet.`}
                            </p>
                            {ticks.size < hw.checklist.length && (
                                <button onClick={() => setShowRemedial(v => !v)}
                                    className="px-4 py-2.5 bg-violet-500 text-white text-[11px] font-black rounded-2xl hover:bg-violet-600 transition-colors">
                                    {showRemedial ? 'Hide the mini-lessons' : 'Explain what I missed'}
                                </button>
                            )}
                        </div>
                        {showRemedial && lesson.checklistRemedial && (
                            <div className="space-y-3">
                                {lesson.checklistRemedial.map((rl: RemedialLesson, i: number) => {
                                    if (ticks.has(i)) return null;
                                    return (
                                        <div key={i} className="bg-violet-50 border border-violet-100 rounded-2xl p-4 space-y-2">
                                            <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">{hw.checklist[i]}</p>
                                            <p className="text-xs text-stone-700 leading-relaxed">{rl.explanation}</p>
                                            <div className="space-y-1">
                                                {rl.examples.map((ex, ei) => (
                                                    <div key={ei} className="bg-white rounded-xl px-3 py-2">
                                                        <p className="text-xs font-bold text-stone-800">{ex.fr}</p>
                                                        <p className="text-[11px] text-stone-400">{ex.en}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={() => toggleTick(i)}
                                                className="text-[11px] font-black text-emerald-600 hover:text-emerald-700">
                                                Got it now — tick this box
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                {graded && ticks.size === hw.checklist.length ? (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-4 bg-emerald-600 rounded-3xl p-6 text-center text-white space-y-3">
                        <PartyPopper size={24} className="mx-auto" />
                        <p className="font-black text-lg">Lesson complete!</p>
                        <p className="text-xs opacity-80">Homework rated and every checklist box ticked. The lesson is now marked complete in your progress.</p>
                        <button onClick={() => { onMarkComplete(); onClose(); }}
                            className="px-8 py-3.5 bg-white text-stone-900 text-sm font-black rounded-2xl hover:bg-stone-100 transition-colors">
                            Save & back to the lesson
                        </button>
                    </motion.div>
                ) : (
                    <p className="text-[10px] text-stone-300 text-center mt-6">
                        {graded
                            ? `Tick all ${hw.checklist.length} checklist boxes to complete the lesson.`
                            : 'Rate your homework first — then the checklist unlocks lesson completion.'}
                    </p>
                )}
            </div>
        </motion.div>
    );
};
