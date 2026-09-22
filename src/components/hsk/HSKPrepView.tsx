import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
    GraduationCap, Loader2, CheckCircle2, XCircle, Target, BookOpen,
    Headphones, BookOpenCheck, PenLine, Mic, Flag, Trophy, AlertTriangle, RotateCcw, Square, Volume2, Languages, FileCheck, Save, Play, Lock, Pencil, ClipboardList,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    HskLevel, HSK_SYLLABUS, HSK_WRITING_TASKS, HSK_SPEAKING_TASKS, HSK_LEVEL_INFO,
    generateHskLesson, evaluateHskWriting, evaluateHskSpeaking,
    practiceToScore, HskLesson, HskWritingFeedback, HskSpeakingFeedback,
} from '../../services/hskService';
import {
    getHskScores, addHskScore, getCompletedLessons, markLessonComplete,
    getHskTarget, setHskTarget, HskScoreEntry, getWeakLog, getMocks,
    setLastLesson, getLastLesson, cacheLesson, getCachedLesson,
} from '../../services/hskStorage';
import { recordAndTranscribe } from '../../services/speechService';
import { LevelBar, ToneTrainer, PinyinGuide, PinyinChart, CheatSheet, CharactersGuide, SoundContrastTrainer, ZHEn, HSKListeningTrainer, HSKReadingTrainer, MCQ } from './HSKTrainers';
import { StrokeOrderTeacher, StrokeWriter } from './StrokeOrderTeacher';
import { HSKMockExam } from './HSKMockExam';

const LEVELS: HskLevel[] = ['1', '2', '3', '4', '5', '6'];
type HskTab = 'overview' | 'curriculum' | 'pinyin' | 'characters' | 'cheatsheet' | 'mock' | 'listening' | 'reading' | 'writing' | 'speaking' | 'progress';

const SKILL_META = {
    listening: { label: 'Listening', icon: Headphones, color: 'text-indigo-500', bg: 'bg-indigo-50', exam: 'audio once · 100 pts' },
    reading: { label: 'Reading', icon: BookOpenCheck, color: 'text-teal-500', bg: 'bg-teal-50', exam: 'characters first · 100 pts' },
    writing: { label: 'Writing', icon: PenLine, color: 'text-amber-500', bg: 'bg-amber-50', exam: 'HSK 3+ · 100 pts' },
    speaking: { label: 'Speaking (HSKK)', icon: Mic, color: 'text-rose-500', bg: 'bg-rose-50', exam: 'separate exam · 100 pts · pass 60' },
} as const;

// ── shared UI ────────────────────────────────────────────────────────────────
const LessonSection = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <div className="bg-white rounded-3xl border border-stone-100 p-6">
        <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-stone-100 rounded-lg flex items-center justify-center text-stone-500">{icon}</div>
            <h2 className="text-[11px] font-black text-stone-500 uppercase tracking-[0.15em]">{title}</h2>
        </div>
        {children}
    </div>
);

// ── Overview tab ─────────────────────────────────────────────────────────────
const Overview = ({ onGo }: { onGo: (t: HskTab) => void }) => {
    const scores = useMemo(() => getHskScores(), []);
    const target = getHskTarget();
    const latest = (skill: string) => scores.find(s => s.skill === skill);

    return (
        <div className="space-y-5">
            {/* exam format */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <h2 className="font-black text-stone-900 mb-1">The exam at a glance</h2>
                <p className="text-xs text-stone-400 mb-4">HSK levels 1–6 (the classic format most test centres administer). A new HSK 3.0 with 9 levels is rolling out from 2026 — the skills below carry over.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(SKILL_META) as (keyof typeof SKILL_META)[]).map(sk => {
                        const m = SKILL_META[sk];
                        const last = latest(sk);
                        return (
                            <button key={sk} onClick={() => onGo(sk === 'writing' && Number(target) <= 2 ? 'curriculum' : sk as HskTab)}
                                className="text-left bg-stone-50 hover:bg-stone-100 rounded-2xl p-4 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                    <m.icon size={15} className={m.color} />
                                    <span className="font-black text-stone-800 text-sm">{m.label}</span>
                                </div>
                                <p className="text-[11px] text-stone-400 mb-2">{m.exam}</p>
                                {last ? (
                                    <p className="text-[11px] font-bold text-stone-600">
                                        Last practice: {last.pct}% → est. {last.score}/100 · {last.band}
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-stone-300 italic">No practice yet — start a trainer</p>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* HSK target */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                        <h2 className="font-black text-stone-900 flex items-center gap-2"><Target size={16} className="text-emerald-500" /> Your HSK target</h2>
                        <p className="text-xs text-stone-400 mt-0.5">Pass marks: 120/200 for HSK 1–2 · 180/300 for HSK 3–6 (total-based — a weak section can be carried).</p>
                    </div>
                    <div className="flex gap-1.5">
                        {(['3', '4', '5', '6'] as HskLevel[]).map(t => (
                            <button key={t} onClick={() => setHskTarget(t)}
                                className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                                    target === t ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                                HSK {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-stone-50 rounded-2xl p-4 text-xs text-stone-600 space-y-1">
                    <p><span className="font-black">{HSK_LEVEL_INFO[target].label}</span> · {HSK_LEVEL_INFO[target].words} · {HSK_LEVEL_INFO[target].cefr}</p>
                    <p className="text-stone-400">{HSK_LEVEL_INFO[target].format}</p>
                </div>
                <p className="text-[10px] text-stone-300 mt-3 flex items-center gap-1">
                    <AlertTriangle size={10} /> All numbers on this page are practice estimates — not official HSK scores.
                </p>
            </div>

            {/* the Chinese method */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <h2 className="font-black text-stone-900 mb-1">How to learn Chinese (the method behind this portal)</h2>
                <ul className="text-xs text-stone-500 space-y-1.5 mt-2">
                    <li>• <b>Pinyin & tones first</b> — drill tone pairs before vocabulary. Meaning changes with the tone: 妈 mā mum → 骂 mà scold.</li>
                    <li>• <b>Three forms always</b> — every word as 汉字 — pinyin — English. Never learn characters alone or pinyin alone.</li>
                    <li>• <b>Characters via building blocks</b> — radicals + story mnemonics, reviewed with spaced repetition (your flashcard deck). Typing counts; handwriting is not required.</li>
                    <li>• <b>Patterns, not conjugations</b> — the verb never changes; word order, 了/过/着 and 把/被 carry the meaning.</li>
                    <li>• <b>Comprehensible input</b> — listen and read at ~70–80% understanding, a little above your comfort zone, every day.</li>
                </ul>
                <button onClick={() => onGo('pinyin')} className="mt-3 flex items-center gap-1 text-[11px] font-black text-emerald-600 hover:text-emerald-700">
                    <Play size={11} /> Start with the Pinyin & Tones foundation
                </button>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onGo('curriculum')} className="bg-white rounded-3xl border border-stone-100 p-5 text-left hover:border-emerald-300 transition-colors">
                    <BookOpen size={18} className="text-emerald-500 mb-2" />
                    <p className="font-black text-stone-900 text-sm">Curriculum HSK 1 → 6</p>
                    <p className="text-xs text-stone-400 mt-0.5">Structured lessons: three-form vocabulary, characters, patterns, mini-tests</p>
                </button>
                <button onClick={() => onGo('characters')} className="bg-white rounded-3xl border border-stone-100 p-5 text-left hover:border-emerald-300 transition-colors">
                    <Pencil size={18} className="text-amber-500 mb-2" />
                    <p className="font-black text-stone-900 text-sm">Write characters</p>
                    <p className="text-xs text-stone-400 mt-0.5">Watch stroke order animated, then trace it yourself stroke by stroke</p>
                </button>
                <button onClick={() => onGo('cheatsheet')} className="bg-white rounded-3xl border border-stone-100 p-5 text-left hover:border-emerald-300 transition-colors">
                    <ClipboardList size={18} className="text-violet-500 mb-2" />
                    <p className="font-black text-stone-900 text-sm">Cheat sheet</p>
                    <p className="text-xs text-stone-400 mt-0.5">Tones, word order, particles, measure words — everything on one page</p>
                </button>
                <button onClick={() => onGo('progress')} className="bg-white rounded-3xl border border-stone-100 p-5 text-left hover:border-emerald-300 transition-colors">
                    <Trophy size={18} className="text-amber-500 mb-2" />
                    <p className="font-black text-stone-900 text-sm">Progress</p>
                    <p className="text-xs text-stone-400 mt-0.5">{scores.length} practice result{scores.length !== 1 ? 's' : ''} tracked</p>
                </button>
            </div>
        </div>
    );
};

// ── Curriculum tab ───────────────────────────────────────────────────────────
const Curriculum = () => {
    const { addFlashcard, user } = useAppStore() as any;
    const [level, setLevel] = useState<HskLevel>('1');
    const [openTopic, setOpenTopic] = useState<string | null>(null);
    const [lesson, setLesson] = useState<HskLesson | null>(null);
    const [lessonKey, setLessonKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [done, setDone] = useState<string[]>(getCompletedLessons());
    const [savedVocab, setSavedVocab] = useState<Set<string>>(new Set());
    const last = getLastLesson();

    const openLesson = async (topic: { title: string; slug: string; focus: string }) => {
        const key = `${level}:${topic.slug}`;
        setOpenTopic(key);
        setLesson(null); setAnswers({}); setError(null);
        setSavedVocab(new Set());
        setLastLesson(level, topic.slug, topic.title);
        const cached = getCachedLesson<HskLesson>(key);
        if (cached) { setLesson(cached); setLessonKey(key); return; }
        setLoading(true);
        try {
            const l = await generateHskLesson(level, topic.title, topic.focus);
            setLesson(l);
            setLessonKey(key);
            cacheLesson(key, l);
        } catch {
            setError('The AI is busy — try again in a moment.');
        } finally {
            setLoading(false);
        }
    };

    const saveAllVocab = () => {
        if (!lesson) return;
        lesson.vocabulary.forEach(v => {
            if (savedVocab.has(v.hanzi)) return;
            const card = {
                id: crypto.randomUUID(),
                word: v.hanzi,
                translation: `${v.pinyin} — ${v.en}`,
                language: 'Chinese' as const,
                nextReview: new Date().toISOString(),
                lastReviewed: null,
            };
            addFlashcard(card);
            if (user) import('../../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
            setSavedVocab(prev => new Set(prev).add(v.hanzi));
        });
    };

    const topics = HSK_SYLLABUS[level];
    const levelPct = (l: HskLevel) => Math.round(HSK_SYLLABUS[l].filter(t => done.includes(`${l}:${t.slug}`)).length / HSK_SYLLABUS[l].length * 100);

    return (
        <div className="space-y-5">
            {/* roadmap HSK 1 → 6 */}
            <div className="bg-white rounded-3xl border border-stone-100 p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Your path · HSK 1 → 6</p>
                    {last && !lesson && (
                        <button onClick={() => {
                            setLevel(last.level as HskLevel);
                            const topic = HSK_SYLLABUS[last.level as HskLevel]?.find(t => t.slug === last.slug);
                            if (topic) openLesson(topic);
                        }} className="flex items-center gap-1 text-[11px] font-black text-emerald-600 hover:text-emerald-700">
                            <Play size={11} /> Continue: {last.title}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                    {LEVELS.map(l => {
                        const pct = levelPct(l);
                        return (
                            <button key={l} onClick={() => { setLevel(l); setOpenTopic(null); setLesson(null); }}
                                className={cn('rounded-2xl p-2.5 text-center transition-all border-2',
                                    level === l ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-100 bg-white hover:border-stone-300')}>
                                <p className="text-xs font-black">{l}</p>
                                <div className="h-1 bg-black/10 rounded-full overflow-hidden mt-1.5">
                                    <div className={cn('h-full rounded-full', pct === 100 ? 'bg-emerald-400' : 'bg-emerald-300')} style={{ width: `${pct}%` }} />
                                </div>
                                <p className={cn('text-[8px] font-bold mt-1', level === l ? 'text-white/60' : 'text-stone-300')}>{pct}%</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm">
                    <AlertTriangle size={14} /> {error}
                </div>
            )}

            {/* topic list */}
            {!lesson && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {topics.map(t => {
                        const key = `${level}:${t.slug}`;
                        const isDone = done.includes(key);
                        const isOpen = openTopic === key;
                        return (
                            <button key={t.slug} onClick={() => openLesson(t)} disabled={loading}
                                className="text-left bg-white rounded-3xl border border-stone-100 p-5 hover:border-emerald-300 transition-colors disabled:opacity-50 relative">
                                {isDone && <CheckCircle2 size={16} className="absolute top-4 right-4 text-emerald-500" />}
                                <p className="font-black text-stone-900 text-sm pr-6">{t.title}</p>
                                <p className="text-xs text-stone-400 mt-1">{t.focus}</p>
                                <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mt-3">
                                    {isOpen && loading ? 'Generating lesson…' : `HSK ${level} · Lesson`}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}

            {loading && !lesson && (
                <div className="flex items-center justify-center gap-3 py-8 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing your HSK {level} lesson…
                </div>
            )}

            {/* lesson renderer */}
            {lesson && (
                <div className="space-y-5">
                    <button onClick={() => { setLesson(null); setOpenTopic(null); }}
                        className="flex items-center gap-2 text-sm font-bold text-stone-400 hover:text-stone-800 transition-colors">
                        <RotateCcw size={14} /> Back to topics
                    </button>

                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">HSK {level} · Chinese curriculum</p>
                        <h1 className="text-2xl font-black text-stone-900 mb-2">{lesson.title}</h1>
                        <div className="flex items-start gap-2 bg-emerald-50 rounded-2xl p-3">
                            <Target size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-emerald-800"><span className="font-black">Objective: </span>{lesson.objective}</p>
                        </div>
                    </div>

                    {/* vocabulary — three forms */}
                    <LessonSection title={`Vocabulary (${lesson.vocabulary.length} items)`} icon={<BookOpen size={13} />}>
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <p className="text-[11px] text-stone-400">Every item: 汉字 — pinyin — English, with example & related words.</p>
                            <button onClick={saveAllVocab} disabled={savedVocab.size === lesson.vocabulary.length}
                                className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black transition-colors',
                                    savedVocab.size === lesson.vocabulary.length
                                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                        : 'bg-emerald-500 text-white hover:bg-emerald-600')}>
                                {savedVocab.size === lesson.vocabulary.length ? <CheckCircle2 size={12} /> : <Save size={12} />}
                                {savedVocab.size === lesson.vocabulary.length ? 'All saved to deck' : `Save all ${lesson.vocabulary.length} to my deck`}
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {lesson.vocabulary.map((v, i) => (
                                <div key={i} className="border border-stone-100 rounded-2xl p-3.5 space-y-1.5 bg-stone-50/50">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <div className="flex items-baseline gap-2 flex-wrap">
                                                <InteractiveText text={v.hanzi} language="Chinese" className="font-bold text-lg text-stone-900" />
                                                <span className="text-xs font-mono text-violet-500">{v.pinyin}</span>
                                            </div>
                                            <p className="text-sm text-stone-500">{v.en}</p>
                                        </div>
                                        <button onClick={() => speakText(v.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0 mt-1"><Volume2 size={13} /></button>
                                    </div>
                                    {v.measureWord && (
                                        <span className="inline-block text-[9px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                            measure word: {v.measureWord}
                                        </span>
                                    )}
                                    {v.example && <ZHEn hanzi={v.example.hanzi} pinyin={v.example.pinyin} en={v.example.en} />}
                                    {v.related && v.related.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-0.5">
                                            {v.related.map((r, ri) => (
                                                <span key={ri} className="text-[10px] font-bold bg-white text-stone-500 border border-stone-100 px-2 py-0.5 rounded-lg">
                                                    {r.hanzi} {r.pinyin} = {r.en}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </LessonSection>

                    {/* characters — via components & mnemonics */}
                    {lesson.characters?.length > 0 && (
                        <LessonSection title="Characters — built from parts, not rote" icon={<Languages size={13} />}>
                            <p className="text-xs text-stone-400 mb-3">Recognition + typing is the modern standard (no handwriting needed until the very top levels). Learn each character as a story.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {lesson.characters.map((c, i) => (
                                    <div key={i} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-3xl font-black text-stone-900">{c.hanzi}</p>
                                            <button onClick={() => speakText(c.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={14} /></button>
                                        </div>
                                        <p className="text-xs font-mono text-violet-500">{c.pinyin} · {c.en}</p>
                                        <p className="text-xs text-stone-600"><span className="font-black">Parts: </span>{c.components}</p>
                                        <p className="text-xs text-amber-700 bg-white rounded-xl p-2 border border-amber-100">💡 {c.mnemonic}</p>
                                        <StrokeWriter hanzi={c.hanzi} size={110} />
                                        <p className="text-[10px] text-stone-400 text-center">tap the drawing to replay</p>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* pronunciation & tones */}
                    {lesson.pronunciation?.length > 0 && (
                        <LessonSection title="Pronunciation & tones" icon={<Headphones size={13} />}>
                            <div className="space-y-2">
                                {lesson.pronunciation.map((p, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-xl px-3 py-2.5">
                                        <span className="font-bold text-stone-800 text-sm shrink-0">{p.hanzi}</span>
                                        <span className="text-xs font-mono text-violet-500 shrink-0">{p.pinyin}</span>
                                        <span className="text-xs text-stone-400 flex-1">{p.toneNote}</span>
                                        <span className="text-xs text-stone-500 shrink-0">{p.en}</span>
                                        <button onClick={() => speakText(p.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={13} /></button>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* grammar — patterns & word order */}
                    <LessonSection title="Grammar — word order is the grammar" icon={<BookOpenCheck size={13} />}>
                        <p className="text-sm font-bold text-stone-800 mb-1">{lesson.grammar.rule}</p>
                        <p className="text-sm text-stone-600 leading-relaxed mb-4">{lesson.grammar.explanation}</p>
                        <div className="space-y-3">
                            {lesson.grammar.examples.map((ex, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-4 space-y-1.5">
                                    <ZHEn hanzi={ex.hanzi} pinyin={ex.pinyin} en={ex.en} />
                                    {ex.breakdown?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {ex.breakdown.map((b, bi) => (
                                                <span key={bi} className="text-[10px] font-bold bg-white text-stone-500 border border-stone-100 px-2 py-0.5 rounded-lg">{b}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {lesson.grammar.commonMistakes?.length > 0 && (
                            <div className="mt-4 bg-red-50 border border-red-100 rounded-2xl p-4">
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Common mistakes</p>
                                <ul className="space-y-1.5">
                                    {lesson.grammar.commonMistakes.map((m, i) => (
                                        <li key={i} className="text-xs text-red-700 flex gap-1.5"><XCircle size={12} className="shrink-0 mt-0.5" />{m}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </LessonSection>

                    {/* patterns — one meaning, every form; the verb NEVER changes */}
                    {lesson.patterns?.length > 0 && (
                        <LessonSection title="Sentence patterns — one idea, every form (verb unchanged!)" icon={<RotateCcw size={13} />}>
                            <p className="text-xs text-stone-400 mb-3">French changes the verb; Chinese changes the scaffolding. Watch what moves around the same verb.</p>
                            <div className="overflow-hidden rounded-2xl border border-stone-100">
                                {lesson.patterns.map((t, i) => (
                                    <div key={i} className={cn('flex items-start gap-3 px-4 py-2.5', i % 2 === 0 ? 'bg-white' : 'bg-stone-50')}>
                                        <span className="text-[9px] font-black text-violet-500 uppercase tracking-wider w-28 shrink-0 pt-1">{t.type}</span>
                                        <div className="flex-1 min-w-0"><ZHEn hanzi={t.hanzi} pinyin={t.pinyin} en={t.en} /></div>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* sentence building */}
                    <LessonSection title="Sentence building — from short to full" icon={<PenLine size={13} />}>
                        <div className="space-y-2">
                            {lesson.sentenceBuilding.map((s, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black flex items-center justify-center shrink-0 mt-1">{i + 1}</span>
                                    <ZHEn hanzi={s.hanzi} pinyin={s.pinyin} en={s.en} />
                                </div>
                            ))}
                        </div>
                    </LessonSection>

                    {/* practice & translation */}
                    <LessonSection title="Practice & translation" icon={<CheckCircle2 size={13} />}>
                        <div className="space-y-3 mb-5">
                            {lesson.practice.map((ex, i) => {
                                const picked = answers[`p${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <p className="text-xs font-bold text-stone-500 mb-1">{ex.instruction}</p>
                                        <InteractiveText text={ex.question} language="Chinese" className="block text-sm font-semibold text-stone-800" />
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => setAnswers(prev => ({ ...prev, [`p${i}`]: 'revealed' }))}
                                                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">
                                                {picked ? `Answer: ${ex.answer}` : 'Reveal answer'}
                                            </button>
                                            <button onClick={() => speakText(ex.answer, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={12} /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Translate EN → ZH (active recall — try first!)</p>
                        <div className="space-y-3 mb-5">
                            {lesson.translationPractice.map((t, i) => {
                                const picked = answers[`t${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <p className="text-sm font-semibold text-stone-800 mb-1.5">{t.en}</p>
                                        <button onClick={() => setAnswers(prev => ({ ...prev, [`t${i}`]: 'revealed' }))}
                                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">
                                            {picked ? 'Hide' : 'Show the Chinese'}
                                        </button>
                                        {picked && <div className="mt-1.5"><ZHEn hanzi={t.hanzi} pinyin={t.pinyin} en="" /></div>}
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Translate ZH → EN</p>
                        <div className="space-y-3">
                            {lesson.reverseTranslation?.map((t, i) => {
                                const picked = answers[`r${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <ZHEn hanzi={t.hanzi} pinyin={t.pinyin} en="" />
                                        <button onClick={() => setAnswers(prev => ({ ...prev, [`r${i}`]: 'revealed' }))}
                                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 mt-1">
                                            {picked ? 'Hide' : 'Show the English'}
                                        </button>
                                        {picked && <p className="text-sm text-stone-500 mt-1">{t.en}</p>}
                                    </div>
                                );
                            })}
                        </div>
                    </LessonSection>

                    {/* register */}
                    {lesson.register && (
                        <LessonSection title="Register — same idea, three levels of formality" icon={<Languages size={13} />}>
                            <div className="space-y-2.5">
                                {[['Casual', lesson.register.casual, 'bg-blue-50 text-blue-800 border-blue-100'],
                                  ['Polite', lesson.register.polite, 'bg-stone-50 text-stone-700 border-stone-100'],
                                  ['Formal', lesson.register.formal, 'bg-violet-50 text-violet-800 border-violet-100']].map(([label, text, cls], i) => (
                                    <div key={i} className={cn('rounded-2xl p-4 text-sm leading-relaxed border', cls as string)}>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label as string}</p>
                                        {text as string}
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* culture / China context */}
                    {lesson.culture && (
                        <LessonSection title="Culture & China context" icon={<Flag size={13} />}>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-900 leading-relaxed">{lesson.culture}</div>
                        </LessonSection>
                    )}

                    {/* free production */}
                    <LessonSection title="Free production" icon={<Mic size={13} />}>
                        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-sm text-violet-800">{lesson.freeProduction}</div>
                    </LessonSection>

                    {/* review */}
                    {lesson.review?.length > 0 && (
                        <LessonSection title="Review — keep these warm" icon={<RotateCcw size={13} />}>
                            <ul className="space-y-1.5">
                                {lesson.review.map((r, i) => (
                                    <li key={i} className="text-xs text-stone-600 flex gap-1.5"><RotateCcw size={11} className="text-stone-300 shrink-0 mt-0.5" />{r}</li>
                                ))}
                            </ul>
                        </LessonSection>
                    )}

                    {/* mini test */}
                    <LessonSection title="Mini test" icon={<Trophy size={13} />}>
                        <div className="space-y-4">
                            {lesson.miniTest.map((q, i) => {
                                const picked = answers[`m${i}`];
                                const right = picked === q.answer;
                                return (
                                    <div key={i}>
                                        <p className="block text-sm font-bold text-stone-800 mb-2">{q.question}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {q.options.map((opt, oi) => (
                                                <button key={oi} onClick={() => { if (picked === undefined) setAnswers(prev => ({ ...prev, [`m${i}`]: opt })); }}
                                                    className={cn('text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all',
                                                        picked === undefined ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                                            : opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                                                : opt === picked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400')}>
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                        {picked !== undefined && !right && (
                                            <p className="text-[10px] text-red-400 mt-1">Missed — logged to your weaknesses.</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {Object.keys(answers).filter(k => k.startsWith('m')).length === lesson.miniTest.length && (
                            <button onClick={() => { markLessonComplete(lessonKey); setDone(getCompletedLessons()); }}
                                className="w-full mt-5 py-3.5 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                                <CheckCircle2 size={15} /> Mark lesson complete
                            </button>
                        )}
                    </LessonSection>
                </div>
            )}
        </div>
    );
};

// ── Writing trainer ──────────────────────────────────────────────────────────
const WritingTrainer = ({ level, onLevelChange }: { level: HskLevel; onLevelChange: (l: HskLevel) => void }) => {
    const levelTasks = HSK_WRITING_TASKS.filter(t => t.levels.includes(level));
    const [taskId, setTaskId] = useState(levelTasks[0].id);
    const task = levelTasks.find(t => t.id === taskId) || levelTasks[0];
    const [text, setText] = useState('');
    const [timeLeft, setTimeLeft] = useState(task.minutes * 60);
    const [timerOn, setTimerOn] = useState(false);
    const [evaluating, setEvaluating] = useState(false);
    const [feedback, setFeedback] = useState<HskWritingFeedback | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { setTimeLeft(task.minutes * 60); setTimerOn(false); setFeedback(null); }, [taskId]);

    useEffect(() => {
        if (!timerOn) return;
        const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); setTimerOn(false); return 0; } return s - 1; }), 1000);
        return () => clearInterval(t);
    }, [timerOn]);

    const chars = text.trim().replace(/\s/g, '').length;

    const submit = async () => {
        if (chars < 10) { setError('Write more before submitting.'); return; }
        setEvaluating(true); setError(null);
        try {
            const fb = await evaluateHskWriting(task.label, task.guide, task.minChars, text, level);
            setFeedback(fb);
            const est = practiceToScore(fb.score100, level);
            addHskScore({ pct: fb.score100, skill: 'writing', label: `HSK ${level} ${task.label}`, band: est.verdict, score: est.score });
        } catch {
            setError('Evaluation failed — the AI may be busy. Try again.');
        } finally { setEvaluating(false); }
    };

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const ss = String(timeLeft % 60).padStart(2, '0');

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {Number(level) <= 2 && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 text-xs text-blue-700">
                    HSK 1–2 have <b>no writing section</b> (200-point listening + reading exam only). This drill builds the habit early so HSK 3 isn't a shock.
                </div>
            )}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                        {levelTasks.map(t => (
                            <button key={t.id} onClick={() => setTaskId(t.id)}
                                className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
                                    task.id === t.id ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                                {t.label.replace(/^HSK \d+ — /, '')}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setTimerOn(t => !t)}
                            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-black tabular-nums transition-colors',
                                timerOn ? 'bg-red-500 text-white animate-pulse' : timeLeft < task.minutes * 60 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500')}>
                            {mm}:{ss}
                        </button>
                        <span className="text-[10px] font-bold text-stone-300">{chars} chars (min {task.minChars})</span>
                    </div>
                </div>
                <p className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1">{task.label}</p>
                <p className="text-sm text-stone-800 font-semibold mb-1">{task.prompt}</p>
                <p className="text-xs text-stone-400">{task.guide}</p>
            </div>

            <textarea value={text} onChange={e => setText(e.target.value)} rows={12}
                placeholder="用中文写… (type characters, or pinyin if you can't type them yet)"
                className="w-full px-5 py-4 text-sm rounded-3xl border border-stone-200 focus:outline-none focus:border-amber-400 bg-white resize-y" />

            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}

            {!feedback && (
                <button onClick={submit} disabled={evaluating || chars < 10}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {evaluating ? <><Loader2 size={15} className="animate-spin" /> Your examiner is grading…</> : <><PenLine size={15} /> Submit for evaluation</>}
                </button>
            )}

            {feedback && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Practice estimate</p>
                        <p className="text-4xl font-black text-amber-500 my-1">{feedback.score100}<span className="text-lg text-stone-300">/100</span></p>
                        <p className="text-sm font-bold text-stone-700">Estimated level: <span className="text-emerald-600">{feedback.estimatedLevel}</span></p>
                        <p className="text-xs text-stone-400 mt-1">{feedback.taskCompletion}</p>
                    </div>
                    {feedback.corrections?.length > 0 && (
                        <LessonSection title={`Corrections (${feedback.corrections.length})`} icon={<AlertTriangle size={13} />}>
                            <div className="space-y-3">
                                {feedback.corrections.map((c, i) => (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4 space-y-1">
                                        <p className="text-sm text-red-400 line-through">{c.original}</p>
                                        <p className="text-sm font-bold text-emerald-600">{c.corrected}</p>
                                        <p className="text-xs text-stone-400">{c.why}</p>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <LessonSection title="Strengths" icon={<CheckCircle2 size={13} />}>
                            <ul className="space-y-1.5">{feedback.strengths?.map((s, i) => (
                                <li key={i} className="text-xs text-stone-600 flex gap-1.5"><CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />{s}</li>))}</ul>
                        </LessonSection>
                        <LessonSection title="Next attempt" icon={<Target size={13} />}>
                            <ul className="space-y-1.5">{feedback.improvements?.map((s, i) => (
                                <li key={i} className="text-xs text-stone-600 flex gap-1.5"><Target size={12} className="text-amber-500 shrink-0 mt-0.5" />{s}</li>))}</ul>
                        </LessonSection>
                    </div>
                    <button onClick={() => { setFeedback(null); setText(''); }}
                        className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                        <RotateCcw size={14} /> New attempt
                    </button>
                </div>
            )}
        </div>
    );
};

// ── Speaking trainer (HSKK) ──────────────────────────────────────────────────
const SpeakingTrainer = ({ level, onLevelChange }: { level: HskLevel; onLevelChange: (l: HskLevel) => void }) => {
    const [taskId, setTaskId] = useState(HSK_SPEAKING_TASKS[0].id);
    const task = HSK_SPEAKING_TASKS.find(t => t.id === taskId)!;
    const [recState, setRecState] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState<HskSpeakingFeedback | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [promptPlaying, setPromptPlaying] = useState(false);
    const recRef = useRef<{ promise: Promise<string>; stop: () => void } | null>(null);

    useEffect(() => () => { stopSpeaking(); }, []);
    useEffect(() => { setRecState('idle'); setTranscript(''); setFeedback(null); setError(null); }, [taskId]);

    // for listen & repeat / listen & answer: the "examiner" speaks first
    const playPrompt = () => {
        setPromptPlaying(true);
        // speak the Chinese anchor of the prompt (the English prompt asks the AI-examiner behaviour;
        // for a deterministic drill we speak a level-appropriate question set)
        const anchors: Record<string, string[]> = {
            repeat: ['你好，很高兴认识你。', '今天天气真好。', '我每天早上七点起床。'],
            answer: ['你叫什么名字？', '你今天中午吃了什么？', '你周末喜欢做什么？'],
            talk: ['请介绍一下你的好朋友。'],
        };
        const lines = anchors[task.id] || anchors.talk;
        let i = 0;
        const next = () => {
            if (i >= lines.length) { setPromptPlaying(false); return; }
            speakText(lines[i++], 'Chinese', () => setTimeout(next, 900));
        };
        next();
    };

    const toggleRecord = () => {
        if (recState === 'recording') { recRef.current?.stop(); return; }
        setError(null); setTranscript(''); setFeedback(null);
        setRecState('recording');
        const rec = recordAndTranscribe('Chinese' as any, {
            maxMs: Math.min(task.seconds, 180) * 1000,
            onStateChange: (s) => { if (s === 'processing') setRecState('processing'); },
        });
        recRef.current = rec;
        rec.promise.then(async (t) => {
            setTranscript(t);
            setRecState('done');
            setFeedback(null);
            try {
                const fb = await evaluateHskSpeaking(task.label, task.guide, task.prompt, t, level);
                setFeedback(fb);
                addHskScore({ pct: fb.score100, skill: 'speaking', label: `HSKK (HSK ${level}) ${task.label}`, band: fb.estimatedLevel, score: fb.score100 });
            } catch {
                setError('Evaluation failed — the AI may be busy. Your transcript is saved below.');
            }
        }).catch(() => {
            setRecState('idle');
            setError('Could not record or transcribe. Check microphone permissions and try again.');
        });
    };

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex gap-1.5 flex-wrap mb-3">
                    {HSK_SPEAKING_TASKS.map(t => (
                        <button key={t.id} onClick={() => setTaskId(t.id)}
                            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
                                taskId === t.id ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                            {t.label.replace(/^HSKK — /, '')}
                        </button>
                    ))}
                </div>
                <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">{task.label}</p>
                <p className="text-sm text-stone-800 font-semibold mb-1">{task.prompt}</p>
                <p className="text-xs text-stone-400">{task.guide}</p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-4">
                {(task.id === 'repeat' || task.id === 'answer') && recState === 'idle' && (
                    <button onClick={playPrompt} disabled={promptPlaying}
                        className={cn('flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold mx-auto transition-colors',
                            promptPlaying ? 'bg-stone-200 text-stone-500' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                        <Volume2 size={13} /> {promptPlaying ? 'The examiner is speaking…' : 'Play the examiner'}
                    </button>
                )}
                <button onClick={toggleRecord} disabled={recState === 'processing'}
                    className={cn('w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all shadow-xl',
                        recState === 'recording' ? 'bg-red-500 text-white scale-110 animate-pulse' : recState === 'processing' ? 'bg-stone-200 text-stone-400' : 'bg-rose-500 text-white hover:bg-rose-600')}>
                    {recState === 'recording' ? <Square size={30} fill="currentColor" /> : recState === 'processing' ? <Loader2 size={30} className="animate-spin" /> : <Mic size={34} />}
                </button>
                <p className="text-xs font-bold text-stone-400">
                    {recState === 'idle' && 'Tap the mic and speak until you are done'}
                    {recState === 'recording' && 'Recording — tap to stop'}
                    {recState === 'processing' && 'Transcribing with Whisper…'}
                    {recState === 'done' && 'Answer recorded'}
                </p>
            </div>

            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}

            {transcript && (
                <div className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Your transcript (from speech-to-text)</p>
                    <p className="text-sm text-stone-700 leading-relaxed">{transcript || <span className="italic text-stone-300">(nothing was transcribed)</span>}</p>
                </div>
            )}

            {feedback && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Practice estimate</p>
                        <p className="text-4xl font-black text-rose-500 my-1">{feedback.score100}<span className="text-lg text-stone-300">/100</span></p>
                        <p className="text-sm font-bold text-stone-700">Estimated level: <span className="text-emerald-600">{feedback.estimatedLevel}</span></p>
                        <p className="text-xs text-stone-400 mt-1">HSKK pass mark is 60/100.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <LessonSection title="Strengths" icon={<CheckCircle2 size={13} />}>
                            <ul className="space-y-1.5">{feedback.strengths?.map((s, i) => (
                                <li key={i} className="text-xs text-stone-600 flex gap-1.5"><CheckCircle2 size={12} className="text-emerald-500 shrink-0 mt-0.5" />{s}</li>))}</ul>
                        </LessonSection>
                        <LessonSection title="Fluency tips" icon={<Target size={13} />}>
                            <ul className="space-y-1.5">{feedback.fluencyTips?.map((s, i) => (
                                <li key={i} className="text-xs text-stone-600 flex gap-1.5"><Target size={12} className="text-rose-400 shrink-0 mt-0.5" />{s}</li>))}</ul>
                        </LessonSection>
                    </div>
                    {feedback.transcriptCorrections?.length > 0 && (
                        <LessonSection title="Corrections from your transcript" icon={<AlertTriangle size={13} />}>
                            <div className="space-y-3">
                                {feedback.transcriptCorrections.map((c, i) => (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4 space-y-1">
                                        <p className="text-sm text-red-400 line-through">{c.original}</p>
                                        <p className="text-sm font-bold text-emerald-600">{c.corrected}</p>
                                        <p className="text-xs text-stone-400">{c.why}</p>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}
                    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-sm text-violet-800">
                        <span className="font-black">Next attempt: </span>{feedback.nextAttempt}
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Progress tab ─────────────────────────────────────────────────────────────
const Progress = ({ scores }: { scores: HskScoreEntry[] }) => {
    const weak = useMemo(() => getWeakLog(), [scores]);
    const mocks = useMemo(() => getMocks(), [scores]);
    const weakTop = useMemo(() => {
        const counts = new Map<string, { question: string; answer: string; skill: string; count: number }>();
        weak.forEach(w => {
            const key = `${w.skill}:${w.question}`;
            const e = counts.get(key) || { question: w.question, answer: w.answer, skill: w.skill, count: 0 };
            e.count++;
            counts.set(key, e);
        });
        return [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
    }, [weak]);

    const weakPanel = weak.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-100 p-5">
            <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={15} className="text-red-400" />
                <p className="font-black text-stone-800 text-sm">Your recurring weaknesses</p>
                <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{weak.length} miss{weak.length !== 1 ? 'es' : ''}</span>
            </div>
            <div className="space-y-2">
                {weakTop.map((w, i) => (
                    <div key={i} className="bg-red-50/60 border border-red-100 rounded-2xl px-4 py-2.5">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 w-16 shrink-0">{w.skill}</span>
                            <span className="text-xs font-bold text-stone-700 flex-1 min-w-0 truncate">{w.question}</span>
                            <span className="text-[10px] font-black text-red-400 shrink-0">×{w.count}</span>
                        </div>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 pl-[72px]">✓ {w.answer}</p>
                    </div>
                ))}
            </div>
            <p className="text-[10px] text-stone-300 mt-3">Tone misses? Drill the tone pairs. Pattern misses? Re-read the lesson's grammar section.</p>
        </div>
    );

    const mocksPanel = mocks.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-100 p-5">
            <div className="flex items-center gap-2 mb-3">
                <FileCheck size={15} className="text-red-400" />
                <p className="font-black text-stone-800 text-sm">Mock exam history</p>
            </div>
            <div className="space-y-2">
                {mocks.slice(0, 5).map((m, i) => (
                    <div key={i} className={cn('flex items-center gap-3 rounded-2xl px-4 py-2.5', i === 0 ? 'bg-stone-900' : 'bg-stone-50')}>
                        <span className={cn('text-[11px] font-black', i === 0 ? 'text-white' : 'text-stone-700')}>
                            {new Date(m.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className={cn('text-[10px] flex-1', i === 0 ? 'text-white/50' : 'text-stone-400')}>
                            L {m.listening.pct}% · R {m.reading.pct}%{m.writing ? ` · W ${m.writing.pct}%` : ''} · S {m.speaking.score100}/100
                        </span>
                        <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap', i === 0 ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-500')}>
                            {m.total.score}/{m.total.max}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    if (scores.length === 0 && weak.length === 0 && mocks.length === 0) {
        return (
            <div className="bg-white rounded-3xl border border-stone-100 p-10 text-center">
                <Trophy size={32} className="mx-auto text-stone-200 mb-3" />
                <p className="font-bold text-stone-500">No practice results yet</p>
                <p className="text-xs text-stone-400 mt-1">Complete a trainer exercise and your estimated level appears here.</p>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {weakPanel}
            {mocksPanel}
            {(Object.keys(SKILL_META) as (keyof typeof SKILL_META)[]).map(sk => {
                const items = scores.filter(s => s.skill === sk).slice(0, 6);
                if (items.length === 0) return null;
                const m = SKILL_META[sk];
                return (
                    <div key={sk} className="bg-white rounded-3xl border border-stone-100 p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <m.icon size={15} className={m.color} />
                            <p className="font-black text-stone-800 text-sm">{m.label}</p>
                            <span className="text-[10px] text-stone-300 ml-auto">{items.length} result{items.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="space-y-2">
                            {items.map((s, i) => {
                                const isLatest = i === 0;
                                return (
                                    <div key={i} className={cn('flex items-center gap-3 rounded-2xl px-4 py-2.5', isLatest ? 'bg-stone-900' : 'bg-stone-50')}>
                                        <span className={cn('text-xs font-black w-12', isLatest ? 'text-white' : 'text-stone-800')}>{s.pct}%</span>
                                        <span className={cn('text-[11px] flex-1 truncate', isLatest ? 'text-white/60' : 'text-stone-400')}>{s.label} · {new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>
                                        <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap', isLatest ? 'bg-white/10 text-white' : 'bg-stone-200 text-stone-500')}>
                                            est. {s.score}/100
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <p className="text-[10px] text-stone-300 text-center flex items-center justify-center gap-1">
                <AlertTriangle size={10} /> Practice estimates only — not official HSK/HSKK results.
            </p>
        </div>
    );
};

// ── Portal shell ─────────────────────────────────────────────────────────────
const HSKPrepView = () => {
    const { quizSettings, setActiveTab } = useAppStore() as any;
    const [tab, setTab] = useState<HskTab>('overview');
    const [level, setLevel] = useState<HskLevel>('1');
    const [scores, setScores] = useState<HskScoreEntry[]>(getHskScores());

    useEffect(() => { setScores(getHskScores()); }, [tab]);

    // Chinese-only exam — functional gate, not a CSS hide: nothing in this portal
    // renders for any other language, regardless of how the tab was opened.
    if (quizSettings?.targetLanguage !== 'Chinese') {
        return (
            <div className="max-w-md mx-auto w-full py-16 px-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-5">
                    <Lock size={28} className="text-stone-400" />
                </div>
                <h1 className="text-2xl font-black text-stone-900">HSK is Chinese-only</h1>
                <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                    This portal prepares you for the HSK Mandarin exam (汉语水平考试), so it stays locked
                    unless <span className="font-bold text-stone-600">Chinese</span> is your active language.
                    You are currently learning{' '}
                    <span className="font-bold text-stone-600">{quizSettings?.targetLanguage || 'another language'}</span>.
                </p>
                <button onClick={() => setActiveTab('editor')}
                    className="mt-6 w-full py-3.5 bg-stone-900 text-white text-sm font-black rounded-2xl hover:bg-emerald-600 transition-colors">
                    Back to Dashboard
                </button>
                <p className="text-stone-300 text-xs mt-4">You can switch languages anytime in Learning Options.</p>
            </div>
        );
    }

    const TABS: { id: HskTab; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: Flag },
        { id: 'curriculum', label: 'Learn', icon: BookOpen },
        { id: 'pinyin', label: 'Pinyin & Tones', icon: Languages },
        { id: 'characters', label: 'Characters', icon: Pencil },
        { id: 'cheatsheet', label: 'Cheat Sheet', icon: ClipboardList },
        { id: 'mock', label: 'Mock Exam', icon: FileCheck },
        { id: 'listening', label: 'Listening', icon: Headphones },
        { id: 'reading', label: 'Reading', icon: BookOpenCheck },
        { id: 'writing', label: 'Writing', icon: PenLine },
        { id: 'speaking', label: 'Speaking', icon: Mic },
        { id: 'progress', label: 'Progress', icon: Trophy },
    ];

    return (
        <div className="max-w-3xl mx-auto w-full py-8 px-4">
            {/* header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-2xl font-black text-stone-900 flex items-center gap-2">
                        <GraduationCap size={24} className="text-emerald-600" /> HSK Chinese
                    </h1>
                    <p className="text-stone-400 text-sm mt-0.5">Mandarin prep portal — pinyin, tones, characters & the exam toward HSK {getHskTarget()}</p>
                </div>
                <span className="text-2xl">🇨🇳</span>
            </div>

            {/* tabs — horizontally scrollable; tabs keep natural width, active one auto-centers */}
            <div className="flex gap-1 bg-stone-100 p-1 rounded-2xl mb-6 overflow-x-auto overscroll-x-contain">
                {TABS.map(t => (
                    <button key={t.id} onClick={(e) => { setTab(t.id); e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); }}
                        className={cn('shrink-0 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap',
                            tab === t.id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                        <t.icon size={12} /> {t.label}
                    </button>
                ))}
            </div>

            {tab === 'overview' && <Overview onGo={setTab} />}
            {tab === 'curriculum' && <Curriculum />}
            {tab === 'pinyin' && (
                <div className="space-y-5">
                    <PinyinChart />
                    <PinyinGuide />
                    <SoundContrastTrainer />
                    <ToneTrainer onDone={(pct, label) => {
                        const est = practiceToScore(pct, level);
                        addHskScore({ pct, skill: 'tones', label, band: est.verdict, score: Math.round((pct / 100) * 100) });
                    }} />
                </div>
            )}
            {tab === 'characters' && (
                <div className="space-y-5">
                    <CharactersGuide />
                    <StrokeOrderTeacher />
                </div>
            )}
            {tab === 'cheatsheet' && <CheatSheet />}
            {tab === 'mock' && (
                <HSKMockExam level={level} onLevelChange={setLevel} />
            )}
            {tab === 'listening' && (
                <HSKListeningTrainer level={level} onLevelChange={setLevel} onDone={(pct, label) => {
                    const est = practiceToScore(pct, level);
                    addHskScore({ pct, skill: 'listening', label, band: est.verdict, score: Math.round((pct / 100) * 100) });
                }} />
            )}
            {tab === 'reading' && (
                <HSKReadingTrainer level={level} onLevelChange={setLevel} onDone={(pct, label) => {
                    const est = practiceToScore(pct, level);
                    addHskScore({ pct, skill: 'reading', label, band: est.verdict, score: Math.round((pct / 100) * 100) });
                }} />
            )}
            {tab === 'writing' && <WritingTrainer level={level} onLevelChange={setLevel} />}
            {tab === 'speaking' && <SpeakingTrainer level={level} onLevelChange={setLevel} />}
            {tab === 'progress' && <Progress scores={scores} />}
        </div>
    );
};

export default HSKPrepView;
