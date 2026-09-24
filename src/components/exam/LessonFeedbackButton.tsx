import { useState } from 'react';
import { CheckCircle2, Flag, Loader2, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { submitLessonFeedback } from '../../services/dbService';

type Category = 'factual_error' | 'grammar_or_translation' | 'unclear_explanation' | 'missing_content' | 'other';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'factual_error', label: 'Factual error' },
  { value: 'grammar_or_translation', label: 'Grammar or translation issue' },
  { value: 'unclear_explanation', label: 'Explanation is unclear' },
  { value: 'missing_content', label: 'Important content is missing' },
  { value: 'other', label: 'Other' },
];

export default function LessonFeedbackButton({ portal, level, lessonKey, lessonTitle }: {
  portal: string;
  level: string;
  lessonKey: string;
  lessonTitle: string;
}) {
  const user = (useAppStore(s => s.user) as any) as { id?: string } | null;
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category>('factual_error');
  const [details, setDetails] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user?.id) return;
    setBusy(true);
    setError('');
    try {
      await submitLessonFeedback(user.id, { portal, level, lessonKey, lessonTitle, category, details });
      setSent(true);
    } catch {
      setError('Your report could not be sent. Check your connection and try again.');
    } finally { setBusy(false); }
  };

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); setSent(false); setError(''); }}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-[11px] font-bold text-stone-500 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 transition-colors">
        <Flag size={13} /> Report an issue
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/40 p-4" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
          <form onSubmit={submit} role="dialog" aria-modal="true" aria-label="Report lesson issue"
            className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-stone-900">Report a lesson issue</h2>
                <p className="mt-1 text-xs text-stone-400">{portal} · {level} · {lessonTitle}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg p-1 text-stone-400 hover:bg-stone-100"><X size={18} /></button>
            </div>
            {sent ? (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
                <CheckCircle2 size={17} /> Thanks. Your report is saved for review.
              </div>
            ) : (
              <>
                <label className="block space-y-1.5 text-xs font-bold text-stone-600">
                  What should we review?
                  <select value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm font-medium text-stone-700">
                    {CATEGORIES.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
                  </select>
                </label>
                <label className="block space-y-1.5 text-xs font-bold text-stone-600">
                  Details <span className="font-normal text-stone-400">(optional)</span>
                  <textarea value={details} onChange={e => setDetails(e.target.value)} maxLength={2000} rows={4}
                    placeholder="Point out the sentence, correction, or topic that needs attention."
                    className="w-full resize-y rounded-xl border border-stone-200 px-3 py-2.5 text-sm font-normal text-stone-700 outline-none focus:border-emerald-400" />
                </label>
                {error && <p role="alert" className="text-xs font-semibold text-red-600">{error}</p>}
                <button type="submit" disabled={busy || !user?.id}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white hover:bg-stone-700 disabled:opacity-50">
                  {busy ? <Loader2 size={15} className="animate-spin" /> : null} Send report
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
