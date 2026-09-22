import React, { useState } from 'react';
import { CalendarDays, Loader2, Target, RotateCcw, AlertTriangle, Trash2 } from 'lucide-react';
import { generateStudyPlan } from '../../services/aiService';
import type { Language } from '../../store/useAppStore';

// Shared by both exam portals: set an exam date → countdown + AI week-by-week plan.
// Plan is stored by the caller via getPlan/savePlan props so each portal keeps its own.
interface ExamPlanCardProps {
    examName: string;                      // e.g. "HSK Chinese" / "TCF Canada"
    levelLabel: string;                    // e.g. "HSK 3" / "B2"
    language: Language;
    plan: { examDate: string; level: string; summary: string; dailyTargets: string[]; weeks: { week: number; focus: string; tasks: string[] }[] } | null;
    onSavePlan: (p: any) => void;
    onClearPlan: () => void;
}

const ExamPlanCard = ({ examName, levelLabel, language, plan, onSavePlan, onClearPlan }: ExamPlanCardProps) => {
    const [date, setDate] = useState(plan?.examDate?.slice(0, 10) || '');
    const [minutes, setMinutes] = useState(30);
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const daysLeft = plan ? Math.max(0, Math.ceil((new Date(plan.examDate).getTime() - Date.now()) / 86400000)) : null;

    const build = async () => {
        if (!date) { setError('Pick your exam date first.'); return; }
        const weeks = Math.max(1, Math.min(12, Math.ceil((new Date(date).getTime() - Date.now()) / (7 * 86400000))));
        setGenerating(true); setError(null);
        try {
            const p = await generateStudyPlan(examName, levelLabel, weeks, minutes, language);
            if (!p.weeks?.length) throw new Error('empty');
            onSavePlan({ examDate: new Date(date + 'T12:00:00').toISOString(), level: levelLabel, summary: p.summary, dailyTargets: p.dailyTargets, weeks: p.weeks });
        } catch {
            setError('Could not build the plan — the AI may be busy. Try again.');
        } finally { setGenerating(false); }
    };

    return (
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <h2 className="font-black text-stone-900 flex items-center gap-2"><CalendarDays size={16} className="text-emerald-500" /> Exam plan & countdown</h2>
                {daysLeft !== null && (
                    <span className="text-xs font-black bg-red-50 text-red-500 px-3 py-1.5 rounded-xl">
                        {daysLeft === 0 ? 'Exam is TODAY — good luck!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} to go`}
                    </span>
                )}
            </div>

            {!plan ? (
                <>
                    <p className="text-xs text-stone-400 mb-3">Set your exam date and daily study time — the coach builds a week-by-week plan: foundations first, full mock + weak-skill drilling in the final week.</p>
                    <div className="flex flex-wrap gap-2 items-center">
                        <input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={e => setDate(e.target.value)}
                            className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-400" />
                        <select value={minutes} onChange={e => setMinutes(Number(e.target.value))}
                            className="px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-800 focus:outline-none focus:border-emerald-400">
                            {[15, 20, 30, 45, 60].map(m => <option key={m} value={m}>{m} min / day</option>)}
                        </select>
                        <button onClick={build} disabled={generating}
                            className="px-5 py-2.5 bg-stone-900 text-white text-xs font-black rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                            {generating ? <><Loader2 size={13} className="animate-spin" /> Building…</> : <><Target size={13} /> Build my plan</>}
                        </button>
                    </div>
                    {error && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertTriangle size={11} /> {error}</p>}
                </>
            ) : (
                <div className="space-y-3 mt-3">
                    <p className="text-sm text-stone-600 leading-relaxed">{plan.summary}</p>
                    {plan.dailyTargets?.length > 0 && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5">
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1.5">Daily targets</p>
                            <ul className="space-y-1">
                                {plan.dailyTargets.map((t, i) => (
                                    <li key={i} className="text-xs text-emerald-800 flex gap-1.5"><Target size={11} className="shrink-0 mt-0.5" />{t}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="space-y-2">
                        {plan.weeks.map(w => (
                            <div key={w.week} className="border border-stone-100 rounded-2xl p-3.5">
                                <p className="text-xs font-black text-stone-900">Week {w.week} — {w.focus}</p>
                                <ul className="mt-1 space-y-0.5">
                                    {w.tasks?.map((t, i) => (
                                        <li key={i} className="text-[11px] text-stone-500 flex gap-1.5"><span className="text-stone-300">•</span>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={build} disabled={generating}
                            className="flex-1 py-2.5 bg-stone-100 text-stone-600 text-xs font-black rounded-xl hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5">
                            <RotateCcw size={12} /> Rebuild plan
                        </button>
                        <button onClick={() => { onClearPlan(); setDate(''); }}
                            className="px-4 py-2.5 bg-stone-50 text-stone-400 text-xs font-black rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors flex items-center gap-1.5">
                            <Trash2 size={12} /> Clear
                        </button>
                    </div>
                    <p className="text-[10px] text-stone-300">Target: {plan.level} · exam {new Date(plan.examDate).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
            )}
        </div>
    );
};

export default ExamPlanCard;
