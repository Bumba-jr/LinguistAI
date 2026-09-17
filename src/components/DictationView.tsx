import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generatePronunciationPhrases } from '../services/aiService';
import { speakText } from '../services/voiceService';
import { InteractiveText } from './WordBreakdown';
import { cn } from '../lib/utils';
import {
  Ear, Loader2, Volume2, CheckCircle2, XCircle, RotateCcw, ArrowRight, Trophy, Play,
} from 'lucide-react';

interface Phrase { phrase: string; translation: string; level: string }
interface DictationResult { phrase: Phrase; userInput: string; score: number; wordResults: { word: string; ok: boolean }[] }

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();

// Word-level match of the typed answer against the spoken sentence
const gradeDictation = (input: string, target: string) => {
  const said = norm(input).split(' ').filter(Boolean);
  const expected = norm(target).split(' ').filter(Boolean);
  const pool = [...said];
  const wordResults = expected.map(w => {
    const i = pool.indexOf(w);
    if (i !== -1) { pool.splice(i, 1); return { word: w, ok: true }; }
    return { word: w, ok: false };
  });
  const matched = wordResults.filter(w => w.ok).length;
  const score = expected.length > 0 ? Math.round((matched / expected.length) * 100) : 0;
  return { score, wordResults };
};

export default function DictationView() {
  const { quizSettings, addPoints } = useAppStore() as any;
  const language = quizSettings?.targetLanguage || 'French';
  const difficulty = quizSettings?.difficulty || 'beginner';

  // all hooks before any conditional returns
  const [phase, setPhase] = useState<'setup' | 'drill' | 'done'>('setup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [idx, setIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<DictationResult | null>(null);
  const [playing, setPlaying] = useState(false);
  const [results, setResults] = useState<DictationResult[]>([]);
  const [showTranslation, setShowTranslation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = phrases[idx];

  const start = async (count = 8) => {
    setLoading(true);
    setError(null);
    try {
      const p = await generatePronunciationPhrases(language, difficulty, count);
      if (p.length === 0) throw new Error('empty');
      setPhrases(p);
      setResults([]);
      setIdx(0);
      setUserInput('');
      setResult(null);
      setShowTranslation(false);
      setPhase('drill');
    } catch {
      setError('Could not generate sentences — the AI may be busy. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const play = (slow = false) => {
    if (!current) return;
    setPlaying(true);
    speakText(current.phrase, language, () => setPlaying(false), slow ? 0.55 : 0.88);
  };

  // auto-play once when a new phrase appears
  useEffect(() => {
    if (phase === 'drill' && phrases[idx]) {
      const t = setTimeout(() => {
        setPlaying(true);
        speakText(phrases[idx].phrase, language, () => setPlaying(false));
      }, 400);
      return () => clearTimeout(t);
    }
  }, [idx, phase, phrases]);

  const check = () => {
    if (!current || !userInput.trim()) return;
    const graded = gradeDictation(userInput, current.phrase);
    const r: DictationResult = { phrase: current, userInput, ...graded };
    setResult(r);
    setResults(prev => [...prev, r]);
    if (graded.score >= 80) addPoints(5);
  };

  const next = () => {
    if (idx + 1 >= phrases.length) { setPhase('done'); return; }
    setIdx(i => i + 1);
    setUserInput('');
    setResult(null);
    setShowTranslation(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const restart = () => { setPhase('setup'); setPhrases([]); setResults([]); };

  // ── setup ──
  if (phase === 'setup') {
    return (
      <div className="max-w-lg mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ear size={26} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-1">Dictation</h1>
          <p className="text-sm text-stone-400 max-w-xs mx-auto">
            Listen to a sentence in {language}, type what you hear, and get scored word by word.
          </p>
        </div>
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-xs mb-4">
            <XCircle size={14} /> {error}
          </div>
        )}
        <button onClick={() => start()} disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white text-sm font-bold rounded-3xl hover:bg-stone-700 transition-colors disabled:opacity-50">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
          {loading ? 'Preparing sentences…' : `Start ${difficulty} dictation`}
        </button>
      </div>
    );
  }

  // ── done ──
  if (phase === 'done') {
    const avg = results.length > 0 ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;
    return (
      <div className="max-w-lg mx-auto py-10 px-4 text-center">
        <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Trophy size={30} className="text-amber-400" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 mb-1">{avg}% average</h1>
        <p className="text-sm text-stone-400 mb-6">{results.length} sentences · {language}</p>
        <div className="space-y-2 text-left mb-6">
          {results.map((r, i) => (
            <div key={i} className={cn('rounded-2xl border p-4', r.score >= 80 ? 'bg-emerald-50 border-emerald-100' : r.score >= 50 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100')}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-bold text-stone-800 text-sm truncate">{r.phrase.phrase}</p>
                <span className={cn('text-xs font-black shrink-0', r.score >= 80 ? 'text-emerald-600' : r.score >= 50 ? 'text-amber-600' : 'text-red-500')}>{r.score}%</span>
              </div>
              <p className="text-xs text-stone-400 truncate">you typed: {r.userInput}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => start()} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-50">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />} New round
          </button>
          <button onClick={restart}
            className="px-5 py-3.5 bg-stone-100 text-stone-500 text-sm font-bold rounded-2xl hover:bg-stone-200 transition-colors">
            Menu
          </button>
        </div>
      </div>
    );
  }

  // ── drill ──
  const heardCorrect = result ? result.wordResults.filter(w => w.ok).length : 0;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-400 rounded-full transition-all duration-300" style={{ width: `${((idx + (result ? 1 : 0)) / phrases.length) * 100}%` }} />
        </div>
        <span className="text-xs font-bold text-stone-400 shrink-0">{idx + 1} / {phrases.length}</span>
      </div>

      <p className="text-center text-[11px] font-black text-stone-300 uppercase tracking-[0.15em] mb-4">
        Listen and type what you hear
      </p>

      {/* audio card */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 text-center mb-4">
        <button onClick={() => play()} disabled={playing}
          className={cn('w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all shadow-lg',
            playing ? 'bg-indigo-500 text-white scale-105' : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100')}>
          <Volume2 size={30} />
        </button>
        <div className="flex items-center justify-center gap-3 mt-4">
          <button onClick={() => play(true)} disabled={playing}
            className="text-[11px] font-bold text-stone-400 hover:text-indigo-500 transition-colors underline decoration-dotted">
            Play slowly
          </button>
          <span className="text-stone-200">·</span>
          <button onClick={() => setShowTranslation(v => !v)}
            className="text-[11px] font-bold text-stone-400 hover:text-indigo-500 transition-colors underline decoration-dotted">
            {showTranslation ? 'Hide' : 'Reveal'} English
          </button>
        </div>
        {showTranslation && result && (
          <p className="text-xs text-stone-400 italic mt-3">{result.phrase.translation}</p>
        )}
      </div>

      {/* answer */}
      {!result ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            autoFocus
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
            placeholder={`Type the sentence in ${language}…`}
            className="w-full px-4 py-3.5 text-sm rounded-2xl border border-stone-200 focus:outline-none focus:border-indigo-400 bg-white"
          />
          <button onClick={check} disabled={!userInput.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Check <ArrowRight size={14} />
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className={cn('rounded-3xl border p-5', result.score >= 80 ? 'bg-emerald-50 border-emerald-100' : result.score >= 50 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100')}>
            <div className="flex items-center justify-between mb-3">
              <span className={cn('flex items-center gap-1.5 text-sm font-black', result.score >= 80 ? 'text-emerald-600' : result.score >= 50 ? 'text-amber-600' : 'text-red-500')}>
                {result.score >= 80 ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                {result.score}% correct
              </span>
              <span className="text-[10px] font-bold text-stone-400">{heardCorrect}/{result.wordResults.length} words</span>
            </div>
            {/* word-by-word result */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {result.wordResults.map((w, i) => (
                <span key={i} className={cn('px-2 py-1 rounded-lg text-xs font-bold',
                  w.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600 line-through')}>
                  {w.word}
                </span>
              ))}
            </div>
            {/* correct sentence with interactive breakdown */}
            <div className="bg-white rounded-2xl p-4">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-1.5">Correct sentence — tap words for meanings</p>
              <InteractiveText text={result.phrase.phrase} language={language} className="block font-semibold text-stone-900" />
              <p className="text-xs text-stone-400 mt-1">{result.phrase.translation}</p>
            </div>
          </div>
          <button onClick={next}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
            {idx + 1 >= phrases.length ? 'Finish' : 'Next sentence'} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
