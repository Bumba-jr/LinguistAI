import React, { useMemo, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generateQuestions } from '../services/aiService';
import { cn } from '../lib/utils';
import { Target, Flame, Loader2, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';

// ── #1 Weak-words engine ─────────────────────────────────────────────────────
// Scores every card by how much the student struggles with it (hard ratings,
// 'again' ratings, low confidence streak) and turns the top offenders into
// one-tap actions: re-review today, or a targeted quiz.
export const WeakWordsSection = () => {
  const { flashcards, updateFlashcard, addFlashcard, setQuestions, setActiveTab, quizSettings, user } = useAppStore() as any;
  const [busy, setBusy] = useState<'quiz' | 'review' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const weakWords = useMemo(() => {
    return flashcards
      .map((f: any) => {
        const hist = (f.reviewHistory || []) as ('easy' | 'again' | 'hard')[];
        const recent = hist.slice(-10);
        const hardRatings = recent.filter(r => r === 'hard').length;
        const againRatings = recent.filter(r => r === 'again').length;
        const score = (f.hardCount || 0) * 2 + hardRatings * 2 + againRatings - (f.easyStreak || 0);
        return { card: f, score, hardRatings, againRatings };
      })
      .filter((w: any) => w.score > 0)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 12);
  }, [flashcards]);

  if (weakWords.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-stone-100 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Target size={15} className="text-emerald-500" />
          <h2 className="font-black text-stone-900">Your weak words</h2>
        </div>
        <p className="text-sm text-stone-400">
          Nothing yet — keep reviewing. Cards you rate "hard" or "again" will collect here for targeted practice.
        </p>
      </div>
    );
  }

  const makeDueToday = () => {
    setBusy('review');
    const now = new Date().toISOString();
    weakWords.forEach((w: any) => {
      updateFlashcard(w.card.id, { nextReview: now });
      if (user) {
        import('../services/dbService').then(m =>
          m.updateFlashcardReview(w.card.id, user.id, now, new Date().toISOString(), w.card.hardCount || 0, w.card.easyStreak || 0, (w.card.reviewHistory || []) as any)
        ).catch(() => { });
      }
    });
    setTimeout(() => setBusy(null), 600);
  };

  const startWeakQuiz = async () => {
    setBusy('quiz');
    setError(null);
    try {
      const lang = quizSettings?.targetLanguage || 'French';
      const content = weakWords.map((w: any) => `${w.card.word} (${w.card.translation})`).join(', ');
      const questions = await generateQuestions(
        `Create questions that test these specific ${lang} words the student struggles with: ${content}`,
        Math.min(5, weakWords.length), 'mixed', 'intermediate', lang
      );
      if (questions.length === 0) throw new Error('no questions');
      setQuestions(questions);
      setActiveTab('editor');
    } catch {
      setError('The AI is busy — try again in a moment.');
    } finally {
      setBusy(null);
    }
  };

  // push mistake-log corrections in as cards too? mistakeLog is sentence-level;
  // instead offer the weak words not yet in the deck — they all are, so skip.

  const maxScore = Math.max(...weakWords.map((w: any) => w.score), 1);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Target size={15} className="text-emerald-500" />
          <h2 className="font-black text-stone-900">Your weak words</h2>
          <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{weakWords.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={makeDueToday} disabled={busy !== null}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold border border-stone-200 bg-white text-stone-500 hover:border-emerald-300 hover:text-emerald-600 transition-colors disabled:opacity-50">
            {busy === 'review' ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
            Add to today's review
          </button>
          <button onClick={startWeakQuiz} disabled={busy !== null}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold bg-stone-900 text-white hover:bg-stone-700 transition-colors disabled:opacity-50">
            {busy === 'quiz' ? <Loader2 size={12} className="animate-spin" /> : <Flame size={12} />}
            Quiz me
          </button>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2 text-red-600 text-xs mb-3">
          <AlertTriangle size={12} /> {error}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {weakWords.map((w: any) => (
          <div key={w.card.id} className="flex items-center gap-3 bg-stone-50 rounded-2xl px-4 py-2.5">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-800 text-sm truncate">
                {w.card.word} <span className="text-stone-400 font-normal">· {w.card.translation}</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex-1 h-1 bg-stone-200 rounded-full overflow-hidden max-w-[120px]">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: `${(w.score / maxScore) * 100}%` }} />
                </div>
                <span className="text-[9px] font-black text-stone-400 uppercase tracking-wider">
                  {w.hardRatings > 0 && `${w.hardRatings} hard`}{w.hardRatings > 0 && w.againRatings > 0 ? ' · ' : ''}{w.againRatings > 0 ? `${w.againRatings} again` : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── #8 Study heatmap + retention trend ───────────────────────────────────────
const DAY = 86400000;
const heatColor = (n: number) => {
  if (n <= 0) return 'bg-stone-100';
  if (n < 5) return 'bg-emerald-200';
  if (n < 10) return 'bg-emerald-300';
  if (n < 20) return 'bg-emerald-400';
  return 'bg-emerald-500';
};

export const StudyHeatmap = () => {
  const { flashcards } = useAppStore() as any;

  // last 17 full weeks aligned to weekdays, oldest first
  const cells = useMemo(() => {
    const log = JSON.parse(localStorage.getItem('linguistai-activity-log') || '{}');
    const today = new Date();
    const out: { date: Date; count: number }[] = [];
    for (let i = 118; i >= 0; i--) {
      const d = new Date(today.getTime() - i * DAY);
      out.push({ date: d, count: log[d.toDateString()] || 0 });
    }
    return out;
  }, []);

  // retention trend: % easy across the last 10 review slots of every card
  const trend = useMemo(() => {
    const slots: { easy: number; total: number }[] = Array.from({ length: 10 }, () => ({ easy: 0, total: 0 }));
    flashcards.forEach((f: any) => {
      const hist = (f.reviewHistory || []) as string[];
      const last10 = hist.slice(-10);
      last10.forEach((r, i) => {
        const slot = 10 - last10.length + i;
        slots[slot].total++;
        if (r === 'easy') slots[slot].easy++;
      });
    });
    return slots.map((s, i) => ({
      label: `-${10 - i}`,
      pct: s.total > 0 ? Math.round((s.easy / s.total) * 100) : null,
      total: s.total,
    })).filter(p => p.pct !== null);
  }, [flashcards]);

  const months = useMemo(() => {
    const out: { label: string; index: number }[] = [];
    cells.forEach((c, i) => {
      const label = c.date.toLocaleDateString('en', { month: 'short' });
      if (i === 0 || (c.date.getDate() <= 7 && out[out.length - 1]?.label !== label)) out.push({ label, index: i });
    });
    return out;
  }, [cells]);

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame size={15} className="text-orange-400" />
          <h2 className="font-black text-stone-900">Study activity</h2>
          <span className="text-[10px] text-stone-300 font-medium">last 17 weeks · cards reviewed per day</span>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[640px]">
            <div className="flex gap-[3px] mb-1 pl-0">
              {months.map((m, i) => (
                <span key={i} className="text-[9px] font-bold text-stone-300" style={{ position: 'absolute' }}>{m.label}</span>
              ))}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-fit">
              {cells.map((c, i) => (
                <div key={i}
                  title={`${c.date.toLocaleDateString('en', { month: 'short', day: 'numeric' })}: ${c.count} reviews`}
                  className={cn('w-3 h-3 rounded-[3px]', heatColor(c.count))} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-[9px] font-bold text-stone-300 mr-1">less</span>
          {['bg-stone-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-400', 'bg-emerald-500'].map(c => (
            <div key={c} className={cn('w-3 h-3 rounded-[3px]', c)} />
          ))}
          <span className="text-[9px] font-bold text-stone-300 ml-1">more</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={15} className="text-emerald-500" />
          <h2 className="font-black text-stone-900">Retention trend</h2>
          <span className="text-[10px] text-stone-300 font-medium">% of reviews rated "easy" — last 10 reviews per card</span>
        </div>
        {trend.length < 2 ? (
          <p className="text-sm text-stone-400">Rate more cards to unlock the retention trend.</p>
        ) : (
          <div className="flex items-end gap-2 h-24">
            {trend.map((p, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <span className="text-[9px] font-black text-stone-400">{p.pct}%</span>
                <div className="w-full max-w-[36px] bg-stone-100 rounded-lg overflow-hidden flex-1 w-full flex items-end">
                  <div className={cn('w-full rounded-lg', p.pct! >= 70 ? 'bg-emerald-400' : p.pct! >= 40 ? 'bg-amber-400' : 'bg-red-400')}
                    style={{ height: `${p.pct}%` }} />
                </div>
                <span className="text-[9px] font-bold text-stone-300">{p.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
