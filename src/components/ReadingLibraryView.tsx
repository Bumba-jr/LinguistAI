import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { generateReadingArticle, type ReadingArticle } from '../services/aiService';
import { InteractiveText } from './WordBreakdown';
import { speakText, stopSpeaking } from '../services/voiceService';
import { cn } from '../lib/utils';
import {
  Newspaper, Loader2, Volume2, Trash2, ArrowLeft, Sparkles, CheckCircle2, XCircle, Languages, RotateCcw, Square, Clock,
} from 'lucide-react';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
const LEVEL_COLOR: Record<string, string> = {
  A1: 'bg-emerald-100 text-emerald-700', A2: 'bg-teal-100 text-teal-700',
  B1: 'bg-amber-100 text-amber-700', B2: 'bg-orange-100 text-orange-700',
  C1: 'bg-red-100 text-red-600',
};
const TOPICS = ['Daily life', 'Travel', 'Food & cooking', 'Work & school', 'A mystery', 'Culture & history', 'Technology'];

const LENGTH_PRESETS = [
    { id: 'short', label: 'Short', paragraphs: 2, words: 80 },
    { id: 'medium', label: 'Medium', paragraphs: 4, words: 160 },
    { id: 'long', label: 'Long', paragraphs: 6, words: 260 },
];

// default reading level from the placement-test difficulty
const LEVEL_FOR_DIFFICULTY: Record<string, string> = {
  beginner: 'A2', intermediate: 'B1', advanced: 'B2',
};

export default function ReadingLibraryView() {
  const { quizSettings, savedArticles, addSavedArticle, removeSavedArticle, addPoints } = useAppStore() as any;
  const language = quizSettings?.targetLanguage || 'French';

  // all hooks before any conditional returns
  const [level, setLevel] = useState(LEVEL_FOR_DIFFICULTY[quizSettings?.difficulty] || 'A2');
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [lengthId, setLengthId] = useState('medium');
  const [customWords, setCustomWords] = useState(300);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<ReadingArticle | null>(null);
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [paraTranslation, setParaTranslation] = useState<Record<number, boolean>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [playingIdx, setPlayingIdx] = useState<number | 'all' | null>(null);
  const playingAllRef = useRef(false);

  const effectiveTopic = customTopic.trim() || topic;

  const lengthParam = (() => {
    if (lengthId === 'custom') {
      const w = Math.min(900, Math.max(60, customWords || 300));
      return { words: w, paragraphs: Math.min(12, Math.max(1, Math.round(w / 50))) };
    }
    const p = LENGTH_PRESETS.find(l => l.id === lengthId) || LENGTH_PRESETS[1];
    return { words: p.words, paragraphs: p.paragraphs };
  })();
  const lengthLabel = lengthId === 'custom' ? `~${lengthParam.words} words` : (LENGTH_PRESETS.find(l => l.id === lengthId)?.label || 'Medium');

  // stop playback when leaving the section
  useEffect(() => () => { playingAllRef.current = false; stopSpeaking(); }, []);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const article = await generateReadingArticle(language, level, effectiveTopic || undefined, lengthParam);
      addSavedArticle(article);
      setOpenArticle(article);
      setAnswers({});
      setShowAllTranslations(false);
      setParaTranslation({});
      setPlayingIdx(null);
      playingAllRef.current = false;
    } catch {
      setError('Could not generate the article — the AI may be busy. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // read the whole article: paragraphs sequentially, then the chain stops
  const playWholeArticle = (a: ReadingArticle) => {
    if (playingIdx === 'all') { playingAllRef.current = false; stopSpeaking(); setPlayingIdx(null); return; }
    playingAllRef.current = true;
    setPlayingIdx('all');
    const playFrom = (i: number) => {
      if (!playingAllRef.current || i >= a.paragraphs.length) { setPlayingIdx(null); return; }
      setPlayingIdx(i);
      speakText(a.paragraphs[i].text, a.language, () => {
        setTimeout(() => playFrom(i + 1), 500);
      });
    };
    playFrom(0);
  };

  // ── article reader ──
  if (openArticle) {
    const a = openArticle;
    const answeredCount = Object.keys(answers).length;
    const correctCount = a.questions.filter((q, i) => answers[i] === q.answer).length;
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <button onClick={() => setOpenArticle(null)}
          className="flex items-center gap-2 text-stone-400 hover:text-stone-800 text-sm font-bold mb-5 transition-colors">
          <ArrowLeft size={15} /> Library
        </button>

        <div className="flex items-start justify-between gap-3 mb-1">
          <h1 className="text-2xl font-black text-stone-900 leading-tight">{a.title}</h1>
          <span className={cn('px-2.5 py-1 rounded-lg text-[11px] font-black shrink-0', LEVEL_COLOR[a.level] || 'bg-stone-100 text-stone-500')}>{a.level}</span>
        </div>
        {(() => {
          const words = a.paragraphs.reduce((s, p) => s + p.text.split(/\s+/).filter(Boolean).length, 0);
          const mins = Math.max(1, Math.round(words / 150));
          return (
            <p className="text-xs text-stone-400 mb-3">{a.language} · {a.paragraphs.length} paragraphs · ~{words} words · {mins} min read</p>
          );
        })()}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <button onClick={() => playWholeArticle(a)}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
              playingIdx === 'all' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100')}>
            {playingIdx === 'all' ? <><Square size={11} /> Stop</> : <><Volume2 size={12} /> Play article</>}
          </button>
          <button onClick={() => setShowAllTranslations(v => !v)}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
            <Languages size={12} /> {showAllTranslations ? 'Hide' : 'Show'} all translations
          </button>
        </div>

        {/* paragraphs — every word interactive */}
        <div className="space-y-4 mb-8">
          {a.paragraphs.map((p, i) => {
            const showPara = showAllTranslations || paraTranslation[i];
            const isPlaying = playingIdx === i || playingIdx === 'all';
            return (
              <div key={i} className={cn('bg-white rounded-3xl border p-5 transition-colors', isPlaying ? 'border-emerald-300 bg-emerald-50/30' : 'border-stone-100')}>
                <div className="flex items-start justify-between gap-3">
                  <InteractiveText text={p.text} language={a.language} className="text-stone-800 leading-relaxed flex-1" />
                  <div className="flex flex-col gap-1 shrink-0">
                    <button onClick={() => { stopSpeaking(); setPlayingIdx(playingIdx === i ? null : i); speakText(p.text, a.language, () => setPlayingIdx(pi => pi === i ? null : pi)); }}
                      className={cn('p-2 rounded-xl transition-colors', isPlaying ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-stone-100 text-stone-400 hover:text-emerald-500')} title="Listen">
                      {isPlaying ? <Loader2 size={15} className="animate-spin" /> : <Volume2 size={15} />}
                    </button>
                    <button onClick={() => setParaTranslation(prev => ({ ...prev, [i]: !prev[i] }))}
                      className={cn('p-2 rounded-xl transition-colors', (showPara) ? 'bg-stone-100 text-stone-700' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-600')} title="Translate this paragraph">
                      <Languages size={15} />
                    </button>
                  </div>
                </div>
                {showPara && (
                  <p className="text-xs text-stone-400 italic border-l-2 border-stone-200 pl-3 mt-3">{p.translation}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* comprehension quiz */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-stone-900">Comprehension check</h2>
            {answeredCount > 0 && (
              <span className="text-xs font-black text-emerald-600">{correctCount}/{a.questions.length} correct</span>
            )}
          </div>
          <div className="space-y-5">
            {a.questions.map((q, i) => {
              const picked = answers[i];
              return (
                <div key={i}>
                  <p className="font-bold text-stone-800 text-sm mb-2">{i + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const isAnswer = opt === q.answer;
                      const isPicked = opt === picked;
                      const revealed = picked !== undefined;
                      return (
                        <button key={oi} onClick={() => {
                          if (picked !== undefined) return;
                          setAnswers(prev => ({ ...prev, [i]: opt }));
                          if (isAnswer) addPoints(3);
                        }}
                          className={cn('text-left px-3.5 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                            revealed
                              ? isAnswer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : isPicked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300 hover:bg-emerald-50/50')}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== undefined && picked !== q.answer && (
                    <p className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold mt-1.5">
                      <XCircle size={12} /> Correct: {q.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {answeredCount === a.questions.length && answeredCount > 0 && (
            <div className={cn('mt-5 p-4 rounded-2xl flex items-center gap-3',
              correctCount === a.questions.length ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800')}>
              {correctCount === a.questions.length ? <CheckCircle2 size={20} /> : <RotateCcw size={20} />}
              <span className="text-sm font-bold flex-1">
                Quiz complete — {correctCount}/{a.questions.length} correct · +{correctCount * 3} pts earned
              </span>
              <button onClick={() => setAnswers({})}
                className="text-xs font-bold text-stone-500 hover:text-stone-700 transition-colors">
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── library list ──
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Newspaper size={26} className="text-teal-600" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 mb-1">Reading library</h1>
        <p className="text-sm text-stone-400 max-w-sm mx-auto">
          Graded articles in {language} — every word underlined with English tooltips, plus comprehension questions.
        </p>
      </div>

      {/* generator */}
      <div className="bg-white rounded-3xl border border-stone-100 p-5 mb-8">
        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Generate a new article</p>
        <p className="text-[11px] text-stone-400 mb-3">Level preselected from your placement — change it any time.</p>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {LEVELS.map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-bold transition-colors',
                level === l ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
              {l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {TOPICS.map(t => (
            <button key={t} onClick={() => { setTopic(t === topic ? '' : t); setCustomTopic(''); }}
              className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-colors',
                topic === t ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300')}>
              {t}
            </button>
          ))}
        </div>
        <input
          value={customTopic}
          onChange={e => { setCustomTopic(e.target.value); setTopic(''); }}
          placeholder="Or write your own topic…"
          className="w-full px-4 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 mb-3"
        />
        <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-2">Length</p>
        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          {LENGTH_PRESETS.map(l => (
            <button key={l.id} onClick={() => setLengthId(l.id)}
              className={cn('px-3 py-1.5 rounded-xl text-xs font-bold transition-colors',
                lengthId === l.id ? 'bg-teal-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
              {l.label} <span className="opacity-60 font-medium">· ~{l.words}w</span>
            </button>
          ))}
          <button onClick={() => setLengthId('custom')}
            className={cn('px-3 py-1.5 rounded-xl text-xs font-bold transition-colors',
              lengthId === 'custom' ? 'bg-teal-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
            Custom
          </button>
        </div>
        {lengthId === 'custom' && (
          <div className="flex items-center gap-3 mb-3">
            <input
              type="number"
              min={60}
              max={900}
              value={customWords}
              onChange={e => setCustomWords(Number(e.target.value))}
              placeholder="300"
              className="w-32 px-4 py-2.5 bg-stone-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-200 text-stone-800"
            />
            <span className="text-[11px] text-stone-400">approx. words (60–900) · ~{Math.min(12, Math.max(1, Math.round((customWords || 300) / 50)))} paragraphs</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-xs mb-3">
            <XCircle size={13} /> {error}
          </div>
        )}
        <button onClick={generate} disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-50">
          {loading ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {loading ? `Writing a ${level} article (~${lengthParam.words} words)…` : `Generate ${level} article · ${lengthLabel}${effectiveTopic ? ` · ${effectiveTopic}` : ''}`}
        </button>
      </div>

      {/* saved articles */}
      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-3">Saved articles ({savedArticles.length})</p>
      {savedArticles.length === 0 ? (
        <p className="text-sm text-stone-300 text-center py-8">Nothing saved yet — generate your first article above.</p>
      ) : (
        <div className="space-y-2">
          {savedArticles.map((a: ReadingArticle) => (
            <div key={a.id} onClick={() => { setOpenArticle(a); setAnswers({}); setShowAllTranslations(false); }}
              className="group flex items-center justify-between gap-3 bg-white rounded-2xl border border-stone-100 p-4 cursor-pointer hover:border-teal-300 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-800 text-sm truncate">{a.title}</p>
                <p className="text-[11px] text-stone-400">{a.level} · {a.language} · {new Date(a.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); removeSavedArticle(a.id); }}
                className="p-2 rounded-xl text-stone-200 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
