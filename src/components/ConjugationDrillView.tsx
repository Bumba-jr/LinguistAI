import React, { useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generateConjugationDrill, type ConjugationQuestion } from '../services/aiService';
import { cn } from '../lib/utils';
import {
  BookOpenCheck, Loader2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, Shuffle,
} from 'lucide-react';

// Common verbs to suggest — covers the most-studied languages lightly
const SUGGESTED: Record<string, string[]> = {
  French: ['être', 'avoir', 'aller', 'faire', 'prendre', 'venir', 'pouvoir', 'vouloir', 'devoir', 'dire', 'savoir', 'manger', 'finir', 'parler'],
  Spanish: ['ser', 'estar', 'tener', 'hacer', 'ir', 'poder', 'querer', 'decir', 'comer', 'hablar'],
  German: ['sein', 'haben', 'werden', 'gehen', 'machen', 'sagen', 'können', 'wollen'],
  Italian: ['essere', 'avere', 'andare', 'fare', 'potere', 'volere', 'dire', 'mangiare'],
  Portuguese: ['ser', 'estar', 'ter', 'fazer', 'ir', 'poder', 'querer', 'dizer'],
  Japanese: ['する', 'ある', 'いる', '行く', '食べる', '飲む'],
  Chinese: ['是', '有', '去', '吃', '喝', '说'],
};

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();

export default function ConjugationDrillView() {
  const { quizSettings, addPoints } = useAppStore() as any;
  const language = quizSettings?.targetLanguage || 'French';

  // all hooks before any conditional returns
  const [verb, setVerb] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ConjugationQuestion[]>([]);
  const [round, setRound] = useState(1);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState<null | boolean>(null);
  const [misses, setMisses] = useState<ConjugationQuestion[]>([]);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = async (v: string) => {
    if (!v.trim()) return;
    setLoading(true);
    setError(null);
    setVerb(v.trim().toLowerCase());
    try {
      const qs = await generateConjugationDrill(v.trim(), language, 8);
      if (qs.length === 0) throw new Error('empty');
      setQuestions(qs);
      setRound(1);
      setIdx(0);
      setInput('');
      setChecked(null);
      setMisses([]);
      setScore({ right: 0, total: 0 });
      setFinished(false);
    } catch {
      setError(`Could not build a drill for "${v}" — check the spelling or try another verb.`);
    } finally {
      setLoading(false);
    }
  };

  const check = () => {
    if (!input.trim() || checked !== null) return;
    const q = questions[idx];
    if (!q) return;
    const correct = norm(input) === norm(q.answer);
    setChecked(correct);
    setScore(s => ({ right: s.right + (correct ? 1 : 0), total: s.total + 1 }));
    if (!correct && !misses.some(m => m.pronoun === q.pronoun && m.answer === q.answer)) {
      setMisses(m => [...m, q]);
    }
    if (correct) addPoints(2);
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(i => i + 1);
      setInput('');
      setChecked(null);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    // round complete — re-drill misses once
    if (misses.length > 0 && round === 1) {
      setQuestions(misses);
      setRound(2);
      setIdx(0);
      setInput('');
      setChecked(null);
    } else {
      setFinished(true);
    }
  };

  // ── setup ──
  if (finished) {
    const pct = score.total > 0 ? Math.round((score.right / score.total) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto py-10 px-4 text-center">
        <div className="w-16 h-16 bg-violet-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Trophy size={30} className="text-violet-400" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 mb-1">{pct}% on "{verb}"</h1>
        <p className="text-sm text-stone-400 mb-6">{score.right} of {score.total} correct · {language}</p>
        <div className="bg-white rounded-3xl border border-stone-100 p-5 mb-6 text-left">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Full forms drilled</p>
          <div className="grid grid-cols-2 gap-2">
            {questions.map((q, i) => (
              <div key={i} className="flex items-center justify-between bg-stone-50 rounded-xl px-3 py-2">
                <span className="text-[10px] font-black text-stone-400 uppercase">{q.pronoun}</span>
                <span className="font-bold text-stone-800 text-sm">{q.answer}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => start(verb)} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-50">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />} Drill again
          </button>
          <button onClick={() => setFinished(false)}
            className="px-5 py-3.5 bg-stone-100 text-stone-500 text-sm font-bold rounded-2xl hover:bg-stone-200 transition-colors">
            New verb
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    const suggestions = SUGGESTED[language] || SUGGESTED.French;
    return (
      <div className="max-w-lg mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpenCheck size={26} className="text-violet-600" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-1">Conjugation trainer</h1>
          <p className="text-sm text-stone-400 max-w-xs mx-auto">
            Master one verb at a time — {language} forms drilled fast, mistakes re-queued until they stick.
          </p>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            value={verb}
            onChange={(e) => { setVerb(e.target.value); setError(null); }}
            onKeyDown={(e) => { if (e.key === 'Enter') start(verb); }}
            placeholder={`A ${language} verb (e.g. "${suggestions[0]}")`}
            className="flex-1 px-4 py-3 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-violet-400 bg-white"
          />
          <button onClick={() => start(verb)} disabled={loading || !verb.trim()}
            className="px-5 bg-stone-900 text-white text-xs font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40">
            {loading ? <Loader2 size={14} className="animate-spin" /> : 'Drill'}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-xs mb-4">
            <XCircle size={14} /> {error}
          </div>
        )}

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Popular verbs</p>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map(v => (
            <button key={v} onClick={() => start(v)} disabled={loading}
              className="px-3 py-1.5 bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-xl hover:border-violet-300 hover:text-violet-600 transition-colors disabled:opacity-50">
              {v}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── drill ──
  const q = questions[idx];

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-violet-400 rounded-full transition-all duration-300" style={{ width: `${((idx + (checked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-stone-400 shrink-0">{idx + 1} / {questions.length}</span>
        {round === 2 && <span className="text-[9px] font-black bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">RETRY ROUND</span>}
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 text-center">
        <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.15em] mb-4">
          Conjugate "{q.verb}" · {q.tense}
        </p>
        <p className="text-3xl font-black text-stone-900 mb-1">
          {q.pronoun} <span className="text-stone-300">___</span>
        </p>
        {q.translation && <p className="text-xs text-stone-400 mb-6">({q.translation})</p>}

        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => { setInput(e.target.value); setChecked(null); }}
          onKeyDown={(e) => { if (e.key === 'Enter') { if (checked !== null) next(); else check(); } }}
          disabled={checked !== null}
          placeholder="Type the form…"
          className={cn('w-full px-4 py-3 text-center text-lg font-bold rounded-2xl border-2 focus:outline-none bg-stone-50 transition-colors',
            checked === null ? 'border-stone-200 focus:border-violet-400'
              : checked ? 'border-emerald-400 text-emerald-600' : 'border-red-300 text-red-500')}
        />

        {checked === false && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-red-500">
            <XCircle size={15} />
            {q.answer}
          </div>
        )}
        {checked === true && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-emerald-600">
            <CheckCircle2 size={15} /> Correct!
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {checked === null ? (
            <button onClick={check} disabled={!input.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Check <ArrowRight size={14} />
            </button>
          ) : (
            <button onClick={next}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
              {idx + 1 < questions.length ? 'Next' : (round === 1 && misses.length > 0) ? 'Retry mistakes' : 'Finish'} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-stone-300">
        <Shuffle size={10} /> {score.right}/{score.total} correct this round
      </div>
    </div>
  );
}
