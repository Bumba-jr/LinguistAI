import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import {
    GraduationCap, Loader2, CheckCircle2, XCircle, Target, BookOpen,
    Headphones, BookOpenCheck, PenLine, Mic, Flag, Trophy, AlertTriangle, RotateCcw, Square, Volume2, Languages, FileCheck, Save, Play, Lock, ClipboardList, Layers, ArrowRightLeft,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    DeleLevel, DELE_SYLLABUS,
    generateSpanishLesson, evaluateSpanishWriting, evaluateSpanishSpeaking,
    SpanishLesson, SpanishWritingFeedback, SpanishSpeakingFeedback, DELE_PASS_NOTE,
    pctToCefr, cefrIndex, deleWritingTasksFor, deleSpeakingTasksFor, DELE_LEVEL_FORMATS,
} from '../../services/spanishService';
import {
    getDeleScores, addDeleScore, getCompletedLessons, markLessonComplete,
    DeleScoreEntry, getWeakLog, getMocks,
    cacheLesson, getCachedLesson,
    getCheckpoints, passCheckpoint,
    getPlan, savePlan, clearPlan,
    getDeleTarget, setDeleTarget, setLastLesson, getLastLesson,
} from '../../services/spanishStorage';
import { recordAndTranscribe } from '../../services/speechService';
import { LevelBar, SpanishListeningTrainer, SpanishReadingTrainer, SpanishVocabTrainer, SpanishSentenceBuilder } from './SpanishTrainers';
import { SpanishMockExam } from './SpanishMockExam';
import { SpanishAlphabetChart, SpanishFoundations, SpanishCheatSheet } from './SpanishFoundations';
import { DELE_STRATEGY } from '../../services/spanishFoundation';
import ExamPlanCard from '../exam/ExamPlanCard';
import CheckpointQuiz from '../exam/CheckpointQuiz';
import InteractiveExaminer from '../exam/InteractiveExaminer';

const LEVELS: DeleLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
type SpanishTab = 'overview' | 'curriculum' | 'foundations' | 'cheatsheet' | 'vocab' | 'builder' | 'mock' | 'listening' | 'reading' | 'writing' | 'speaking' | 'progress';

const SKILL_META = {
    listening: { label: 'Listening', icon: Headphones, color: 'text-indigo-500', bg: 'bg-indigo-50', exam: '25-30 items · 20-40 min · audio once' },
    reading: { label: 'Reading', icon: BookOpenCheck, color: 'text-teal-500', bg: 'bg-teal-50', exam: '25-40 items · 45-70 min' },
    writing: { label: 'Writing', icon: PenLine, color: 'text-amber-500', bg: 'bg-amber-50', exam: '2 tasks · 45-150 min · /25' },
    speaking: { label: 'Speaking', icon: Mic, color: 'text-rose-500', bg: 'bg-rose-50', exam: '2-4 tasks · 15-20 min + prep' },
} as const;

// ── shared UI ────────────────────────────────────────────────────────────────
const EsEn = ({ es, en, dark = false }: { es: string; en: string; dark?: boolean }) => (
    <div className="space-y-0.5">
        <InteractiveText text={es} language="Spanish" dark={dark}
            className={cn('block font-semibold', dark ? 'text-white' : 'text-stone-900')} />
        <p className={cn('text-sm', dark ? 'text-white/50' : 'text-stone-400')}>{en}</p>
    </div>
);

const ExamBadge = () => (
    <span className="text-[9px] font-black bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-full uppercase tracking-widest">practice estimate</span>
);

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
const Overview = ({ onGo }: { onGo: (t: SpanishTab) => void }) => {
    const scores = useMemo(() => getDeleScores(), []);
    const target = getDeleTarget();
    const latest = (skill: string) => scores.find(s => s.skill === skill);

    return (
        <div className="space-y-5">
            {/* exam format */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <h2 className="font-black text-stone-900 mb-1">The exam at a glance</h2>
                <p className="text-xs text-stone-400 mb-4">Diplomas de Español como Lengua Extranjera — Instituto Cervantes. 4 tests, official DELE levels A1 → C2, you choose your level when registering.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(Object.keys(SKILL_META) as (keyof typeof SKILL_META)[]).map(sk => {
                        const m = SKILL_META[sk];
                        const last = latest(sk);
                        return (
                            <button key={sk} onClick={() => onGo(sk as SpanishTab)}
                                className="text-left bg-stone-50 hover:bg-stone-100 rounded-2xl p-4 transition-colors">
                                <div className="flex items-center gap-2 mb-1">
                                    <m.icon size={15} className={m.color} />
                                    <span className="font-black text-stone-800 text-sm">{m.label}</span>
                                </div>
                                <p className="text-[11px] text-stone-400 mb-2">{m.exam}</p>
                                {last ? (
                                    <p className="text-[11px] font-bold text-stone-600">Last practice: {last.pct}% → est. {last.score}/100 <ExamBadge /></p>
                                ) : (
                                    <p className="text-[11px] text-stone-300 italic">No practice yet — start a trainer</p>
                                )}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs text-amber-800">{DELE_PASS_NOTE}</div>
            </div>

            {/* DELE target level — you register for ONE level, so track against it */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div>
                        <h2 className="font-black text-stone-900 flex items-center gap-2"><Target size={16} className="text-emerald-500" /> Your DELE target level</h2>
                        <p className="text-xs text-stone-400 mt-0.5">Unlike TCF, DELE grants ONE diploma per level — you register for a specific one.</p>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                        {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(t => (
                            <button key={t} onClick={() => setDeleTarget(t)}
                                className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                                    target === t ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold text-stone-400">
                    {(Object.keys(SKILL_META) as (keyof typeof SKILL_META)[]).map(sk => {
                        const last = latest(sk);
                        const est = last ? pctToCefr(last.pct) : null;
                        const meets = est ? cefrIndex(est) >= cefrIndex(target) : false;
                        return (
                            <div key={sk} className={cn('rounded-2xl p-3', meets ? 'bg-emerald-50' : 'bg-stone-50')}>
                                <p className="uppercase tracking-wider mb-1">{SKILL_META[sk].label}</p>
                                <p className={cn('text-lg font-black', meets ? 'text-emerald-600' : 'text-stone-300')}>
                                    {est ? est : '—'}
                                </p>
                                <p className="mt-0.5">{last ? `est. ${last.pct}%` : 'no data'}</p>
                            </div>
                        );
                    })}
                </div>
                <p className="text-[10px] text-stone-300 mt-3 flex items-center gap-1">
                    <AlertTriangle size={10} /> All numbers on this page are practice estimates — not official DELE results.
                </p>
                {/* what the chosen target level actually looks like, test by test */}
                <div className="mt-4 bg-stone-900 rounded-2xl p-4 text-white">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">DELE {target} — what your exam looks like</p>
                    <div className="space-y-1.5 text-xs">
                        {([['Reading', DELE_LEVEL_FORMATS[target].reading], ['Listening', DELE_LEVEL_FORMATS[target].listening],
                           ['Writing', DELE_LEVEL_FORMATS[target].writing], ['Speaking', DELE_LEVEL_FORMATS[target].speaking]] as [string, string][]).map(([label, fmt]) => (
                            <div key={label} className="flex gap-2">
                                <span className="font-black text-white/90 w-20 shrink-0">{label}</span>
                                <span className="text-white/60 flex-1">{fmt}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-white/40 mt-2">The trainers and mock exam below automatically use {target}-accurate tasks and lengths.</p>
                </div>
            </div>

            {/* exam plan & countdown */}
            <ExamPlanCard
                examName="DELE"
                levelLabel={`DELE ${getDeleTarget()} target`}
                language="Spanish"
                plan={getPlan()}
                onSavePlan={savePlan}
                onClearPlan={clearPlan}
            />

            {/* exam strategy — how the test tries to trick you */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <h2 className="font-black text-stone-900 mb-1">Exam strategy — how DELE tries to trick you</h2>
                <p className="text-xs text-stone-400 mb-3">Knowing the traps is worth as many points as knowing the Spanish.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DELE_STRATEGY.map(s => (
                        <div key={s.skill} className="bg-stone-50 rounded-2xl p-4">
                            <p className={cn('text-xs font-black mb-1.5',
                                s.color === 'indigo' ? 'text-indigo-500' : s.color === 'violet' ? 'text-violet-500' : s.color === 'emerald' ? 'text-emerald-500' : 'text-amber-500')}>{s.skill}</p>
                            <ul className="space-y-1">
                                {s.points.map((p, i) => (
                                    <li key={i} className="text-[11px] text-stone-600 flex gap-1.5"><span className="text-stone-300">•</span>{p}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onGo('curriculum')} className="bg-white rounded-3xl border border-stone-100 p-5 text-left hover:border-emerald-300 transition-colors">
                    <BookOpen size={18} className="text-emerald-500 mb-2" />
                    <p className="font-black text-stone-900 text-sm">Curriculum A1 → C2</p>
                    <p className="text-xs text-stone-400 mt-0.5">Structured lessons: vocabulary, grammar, sentence building, mini-tests</p>
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

// ── Curriculum tab — the A1→C2 lesson engine ─────────────────────────────────
const Curriculum = ({ language }: { language: string }) => {
    const { addFlashcard, user } = useAppStore() as any;
    const [level, setLevel] = useState<DeleLevel>('A1');
    const [openTopic, setOpenTopic] = useState<string | null>(null);
    const [lesson, setLesson] = useState<SpanishLesson | null>(null);
    const [lessonKey, setLessonKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [done, setDone] = useState<string[]>(getCompletedLessons());
    const [savedVocab, setSavedVocab] = useState<Set<string>>(new Set());
    const [checkpoints, setCheckpoints] = useState<Record<string, boolean>>(getCheckpoints());
    const [checkpointFor, setCheckpointFor] = useState<DeleLevel | null>(null);
    const last = getLastLesson();

    // Never auto-promote: level N+1 stays locked until the level N checkpoint is passed
    const prevLevel = LEVELS[Math.max(0, LEVELS.indexOf(level) - 1)];
    const locked = level !== 'A1' && !checkpoints[prevLevel];

    const openLesson = async (topic: { title: string; slug: string; focus: string }) => {
        const key = `${level}:${topic.slug}`;
        setOpenTopic(key);
        setLesson(null); setAnswers({}); setError(null);
        setSavedVocab(new Set());
        setLastLesson(level, topic.slug, topic.title);
        const cached = getCachedLesson<SpanishLesson>(key);
        if (cached) { setLesson(cached); setLessonKey(key); return; }
        setLoading(true);
        try {
            const l = await generateSpanishLesson(level, topic.title, topic.focus, language as any);
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
            if (savedVocab.has(v.es)) return;
            const card = {
                id: crypto.randomUUID(),
                word: v.es,
                translation: v.en,
                language: 'Spanish' as const,
                nextReview: new Date().toISOString(),
                lastReviewed: null,
            };
            addFlashcard(card);
            if (user) import('../../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
            setSavedVocab(prev => new Set(prev).add(v.es));
        });
    };

    const topics = DELE_SYLLABUS[level];
    const levelPct = (l: DeleLevel) => Math.round(DELE_SYLLABUS[l].filter(t => done.includes(`${l}:${t.slug}`)).length / DELE_SYLLABUS[l].length * 100);

    return (
        <div className="space-y-5">
            {/* roadmap A1 → C2 */}
            <div className="bg-white rounded-3xl border border-stone-100 p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Your path · A1 → C2</p>
                    {last && (
                        <button onClick={() => {
                            setLevel(last.level as DeleLevel);
                            const topic = DELE_SYLLABUS[last.level as DeleLevel]?.find(t => t.slug === last.slug);
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

            {/* checkpoint gate — pass the previous level's test to unlock */}
            {locked && !lesson && (checkpointFor === prevLevel ? (
                <CheckpointQuiz
                    language="Spanish"
                    levelLabel={prevLevel}
                    topics={DELE_SYLLABUS[prevLevel].map(t => `${t.title} (${t.focus})`)}
                    onPass={() => {
                        passCheckpoint(prevLevel);
                        setCheckpoints(getCheckpoints());
                        setCheckpointFor(null);
                    }}
                    onCancel={() => setCheckpointFor(null)}
                />
            ) : (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto">
                        <Lock size={22} className="text-amber-500" />
                    </div>
                    <p className="font-black text-stone-900 text-sm">{level} is locked</p>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto">Levels never auto-promote: pass the {prevLevel} checkpoint first — 6 questions on what that level taught. You can retake as many times as you need.</p>
                    <button onClick={() => setCheckpointFor(prevLevel)}
                        className="px-6 py-3 bg-amber-500 text-white text-xs font-black rounded-2xl hover:bg-amber-600 transition-colors">
                        Take the {prevLevel} checkpoint
                    </button>
                    <p className="text-[10px] text-stone-300">A1 is always open — start there if this is your first time.</p>
                </div>
            ))}

            {/* topic list */}
            {!lesson && !locked && (
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
                                    {isOpen && loading ? 'Generating lesson…' : `${level} · Lesson`}
                                </p>
                            </button>
                        );
                    })}
                </div>
            )}

            {loading && !lesson && (
                <div className="flex items-center justify-center gap-3 py-8 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing your {level} lesson…
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
                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{level} · DELE curriculum</p>
                        <h1 className="text-2xl font-black text-stone-900 mb-2">{lesson.title}</h1>
                        <div className="flex items-start gap-2 bg-emerald-50 rounded-2xl p-3">
                            <Target size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                            <p className="text-sm text-emerald-800"><span className="font-black">Objective: </span>{lesson.objective}</p>
                        </div>
                    </div>

                    {/* vocabulary */}
                    <LessonSection title={`Vocabulary (${lesson.vocabulary.length} items)`} icon={<BookOpen size={13} />}>
                        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <p className="text-[11px] text-stone-400">Every item: Spanish, gender, example, related words — tap any word for more.</p>
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
                                    <div className="flex items-baseline justify-between gap-2">
                                        <div className="flex items-baseline gap-1.5 flex-wrap">
                                            <InteractiveText text={v.es} language="Spanish" className="font-bold text-stone-900" />
                                            {v.gender && (
                                                <span className={cn('text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider',
                                                    v.gender.toLowerCase().startsWith('f') ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600')}>
                                                    {v.gender}
                                                </span>
                                            )}
                                        </div>
                                        <button onClick={() => speakText(v.es, 'Spanish')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={13} /></button>
                                    </div>
                                    <p className="text-sm text-stone-500">{v.en}</p>
                                    {v.example && <EsEn es={v.example.es} en={v.example.en} />}
                                    {v.related && v.related.length > 0 && (
                                        <div className="flex flex-wrap gap-1 pt-0.5">
                                            {v.related.map((r, ri) => (
                                                <span key={ri} className="text-[10px] font-bold bg-white text-stone-500 border border-stone-100 px-2 py-0.5 rounded-lg">
                                                    {r.es} = {r.en}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </LessonSection>

                    {/* pronunciation */}
                    {lesson.pronunciation?.length > 0 && (
                        <LessonSection title="Pronunciation" icon={<Headphones size={13} />}>
                            <div className="space-y-2">
                                {lesson.pronunciation.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                                        <span className="font-bold text-stone-800 text-sm">{p.es}</span>
                                        <span className="text-xs font-mono text-violet-500">/{p.approx}/</span>
                                        <span className="text-xs text-stone-400 flex-1">{p.en}</span>
                                        <button onClick={() => speakText(p.es, 'Spanish')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={13} /></button>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* grammar */}
                    <LessonSection title="Grammar" icon={<BookOpenCheck size={13} />}>
                        <p className="text-sm font-bold text-stone-800 mb-1">{lesson.grammar.rule}</p>
                        <p className="text-sm text-stone-600 leading-relaxed mb-4">{lesson.grammar.explanation}</p>
                        <div className="space-y-3">
                            {lesson.grammar.examples.map((ex, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-4 space-y-1.5">
                                    <EsEn es={ex.es} en={ex.en} />
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

                    {/* transformations */}
                    {lesson.transformations?.length > 0 && (
                        <LessonSection title="Sentence transformations — one idea, every form" icon={<RotateCcw size={13} />}>
                            <p className="text-xs text-stone-400 mb-3">The same core sentence in every tense and form. Notice what changes and why.</p>
                            <div className="overflow-hidden rounded-2xl border border-stone-100">
                                {lesson.transformations.map((t, i) => (
                                    <div key={i} className={cn('flex items-start gap-3 px-4 py-2.5', i % 2 === 0 ? 'bg-white' : 'bg-stone-50')}>
                                        <span className="text-[9px] font-black text-violet-500 uppercase tracking-wider w-24 shrink-0 pt-0.5">{t.type}</span>
                                        <div className="flex-1 min-w-0"><EsEn es={t.es} en={t.en} /></div>
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* sentence building */}
                    <LessonSection title="Sentence building — from short to full" icon={<PenLine size={13} />}>
                        <div className="space-y-2">
                            {lesson.sentenceBuilding.map((s, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                                    <EsEn es={s.es} en={s.en} />
                                </div>
                            ))}
                        </div>
                    </LessonSection>

                    {/* practice + translation */}
                    <LessonSection title="Practice & translation" icon={<CheckCircle2 size={13} />}>
                        <div className="space-y-3 mb-5">
                            {lesson.practice.map((ex, i) => {
                                const picked = answers[`p${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <p className="text-xs font-bold text-stone-500 mb-1">{ex.instruction}</p>
                                        <InteractiveText text={ex.question} language="Spanish" className="block text-sm font-semibold text-stone-800" />
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => setAnswers(prev => ({ ...prev, [`p${i}`]: 'revealed' }))}
                                                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">
                                                {picked ? `Answer: ${ex.answer}` : 'Reveal answer'}
                                            </button>
                                            <button onClick={() => speakText(ex.answer, 'Spanish')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={12} /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Translate EN → ES (active recall — try first!)</p>
                        <div className="space-y-3 mb-5">
                            {lesson.translationPractice.map((t, i) => {
                                const picked = answers[`t${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <p className="text-sm font-semibold text-stone-800 mb-1.5">{t.en}</p>
                                        <button onClick={() => setAnswers(prev => ({ ...prev, [`t${i}`]: 'revealed' }))}
                                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">
                                            {picked ? 'Hide' : 'Show the Spanish'}
                                        </button>
                                        {picked && <div className="mt-1.5"><EsEn es={t.es} en="" /></div>}
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Translate ES → EN</p>
                        <div className="space-y-3">
                            {lesson.reverseTranslation?.map((t, i) => {
                                const picked = answers[`r${i}`];
                                return (
                                    <div key={i} className="bg-stone-50 rounded-2xl p-4">
                                        <InteractiveText text={t.es} language="Spanish" className="block text-sm font-semibold text-stone-800 mb-1.5" />
                                        <button onClick={() => setAnswers(prev => ({ ...prev, [`r${i}`]: 'revealed' }))}
                                            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700">
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
                                {[['Informal (tú)', lesson.register.informal, 'bg-blue-50 text-blue-800 border-blue-100'],
                                  ['Neutral', lesson.register.neutral, 'bg-stone-50 text-stone-700 border-stone-100'],
                                  ['Formal (usted)', lesson.register.formal, 'bg-violet-50 text-violet-800 border-violet-100']].map(([label, text, cls], i) => (
                                    <div key={i} className={cn('rounded-2xl p-4 text-sm leading-relaxed border', cls as string)}>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label as string}</p>
                                        {text as string}
                                    </div>
                                ))}
                            </div>
                        </LessonSection>
                    )}

                    {/* culture */}
                    {lesson.culture && (
                        <LessonSection title="Culture — Spain & Latin America" icon={<Flag size={13} />}>
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">{lesson.culture}</div>
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
                                return (
                                    <div key={i}>
                                        <InteractiveText text={q.question} language="Spanish" className="block text-sm font-bold text-stone-800 mb-2" />
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
const WritingTrainer = ({ level, onLevelChange }: { level: DeleLevel; onLevelChange: (l: DeleLevel) => void }) => {
    // Task set is LEVEL-ACCURATE: A1 writes 15–40-word forms, B2 writes 150–180-word essays with sources…
    const tasks = useMemo(() => deleWritingTasksFor(level), [level]);
    const [taskId, setTaskId] = useState(tasks[0].id);
    const task = tasks.find(t => t.id === taskId) ?? tasks[0];
    const [text, setText] = useState('');
    const [timeLeft, setTimeLeft] = useState(task.minutes * 60);
    const [timerOn, setTimerOn] = useState(false);
    const [evaluating, setEvaluating] = useState(false);
    const [feedback, setFeedback] = useState<SpanishWritingFeedback | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { setTaskId(tasks[0].id); }, [level]);

    useEffect(() => { setTimeLeft(task.minutes * 60); setTimerOn(false); setFeedback(null); }, [taskId]);

    useEffect(() => {
        if (!timerOn) return;
        const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); setTimerOn(false); return 0; } return s - 1; }), 1000);
        return () => clearInterval(t);
    }, [timerOn]);

    const words = text.trim() ? text.trim().split(/\s+/).length : 0;

    const submit = async () => {
        if (words < 10) { setError('Write more before submitting.'); return; }
        setEvaluating(true); setError(null);
        try {
            const fb = await evaluateSpanishWriting(task.label, task.guide, task.minWords, text, level);
            setFeedback(fb);
            const pct = Math.round((fb.score25 / 25) * 100);
            addDeleScore({ pct, skill: 'writing', label: `${level} ${task.label}`, score: pct });
        } catch {
            setError('Evaluation failed — the AI may be busy. Try again.');
        } finally { setEvaluating(false); }
    };

    const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const ss = String(timeLeft % 60).padStart(2, '0');

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                        {tasks.map(t => (
                            <button key={t.id} onClick={() => setTaskId(t.id)}
                                className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
                                    taskId === t.id ? 'bg-amber-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                                Task {t.id.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setTimerOn(t => !t)}
                            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-black tabular-nums transition-colors',
                                timerOn ? 'bg-red-500 text-white animate-pulse' : timeLeft < task.minutes * 60 ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500')}>
                            {mm}:{ss}
                        </button>
                        <span className="text-[10px] font-bold text-stone-300">{words} words (target {task.minWords}–{task.maxWords})</span>
                    </div>
                </div>
                <p className="text-[11px] font-black text-amber-500 uppercase tracking-widest mb-1">{task.label}</p>
                <p className="text-sm text-stone-800 font-semibold mb-1">{task.prompt}</p>
                <p className="text-xs text-stone-400">{task.guide}</p>
            </div>

            <textarea value={text} onChange={e => setText(e.target.value)} rows={12}
                placeholder="Escribe tu respuesta en español… (¡cuida las tildes y el registro tú/usted!)"
                className="w-full px-5 py-4 text-sm rounded-3xl border border-stone-200 focus:outline-none focus:border-amber-400 bg-white resize-y" />

            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}

            {!feedback && (
                <button onClick={submit} disabled={evaluating || words < 10}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
                    {evaluating ? <><Loader2 size={15} className="animate-spin" /> Your examiner is grading…</> : <><PenLine size={15} /> Submit for evaluation</>}
                </button>
            )}

            {feedback && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Practice estimate</p>
                        <p className="text-4xl font-black text-amber-500 my-1">{feedback.score25}<span className="text-lg text-stone-300">/25</span></p>
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

// ── Speaking trainer ─────────────────────────────────────────────────────────
const SpeakingTrainer = ({ level, language, onLevelChange }: { level: DeleLevel; language: string; onLevelChange: (l: DeleLevel) => void }) => {
    // Task set is LEVEL-ACCURATE: A1 has 4 short tasks, B2 adds the graphic monologue, C2 is negotiation…
    const tasks = useMemo(() => deleSpeakingTasksFor(level), [level]);
    const [taskId, setTaskId] = useState(tasks[0].id);
    const task = tasks.find(t => t.id === taskId) ?? tasks[0];
    const [mode, setMode] = useState<'self' | 'examiner'>('self');
    const [prep, setPrep] = useState(0);
    const [recState, setRecState] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle');
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState<SpanishSpeakingFeedback | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [evaluatingLive, setEvaluatingLive] = useState(false);
    const recRef = useRef<{ promise: Promise<string>; stop: () => void } | null>(null);
    const prepTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => { setPrep(0); setRecState('idle'); setTranscript(''); setFeedback(null); setError(null); }, [taskId]);
    useEffect(() => { setTaskId(tasks[0].id); }, [level]);
    useEffect(() => () => { if (prepTimer.current) clearInterval(prepTimer.current); stopSpeaking(); }, []);

    const scoreSpeaking = async (label: string, combined: string) => {
        const words = combined.split(/\s+/).filter(Boolean).length;
        const pct = Math.min(95, 30 + Math.round(words / 2));
        addDeleScore({ pct, skill: 'speaking', label, score: pct });
    };

    const finishLiveExam = async (combined: string) => {
        setEvaluatingLive(true); setError(null); setFeedback(null);
        try {
            const fb = await evaluateSpanishSpeaking(task.label, task.guide, 'Interactive examiner session — multiple questions answered live', combined, level);
            setFeedback(fb);
            await scoreSpeaking(`DELE live ${task.label}`, combined);
        } catch {
            setError('Evaluation failed — the AI may be busy. Try finishing again.');
        } finally { setEvaluatingLive(false); }
    };

    const startPrep = () => {
        setPrep(60);
        prepTimer.current = setInterval(() => setPrep(p => {
            if (p <= 1) { clearInterval(prepTimer.current!); return 0; }
            return p - 1;
        }), 1000);
    };

    const toggleRecord = () => {
        if (recState === 'recording') { recRef.current?.stop(); return; }
        setError(null); setTranscript(''); setFeedback(null);
        setRecState('recording');
        const rec = recordAndTranscribe(language as any, {
            maxMs: Math.min(task.seconds, 180) * 1000,
            onStateChange: (s) => { if (s === 'processing') setRecState('processing'); },
        });
        recRef.current = rec;
        rec.promise.then(async (t) => {
            setTranscript(t);
            setRecState('done');
            setFeedback(null);
            try {
                const fb = await evaluateSpanishSpeaking(task.label, task.guide, task.prompt, t, level);
                setFeedback(fb);
                await scoreSpeaking(`${level} ${task.label}`, t);
            } catch {
                setError('Evaluation failed — the AI may be busy. Your transcript is saved below.');
            }
        }).catch(() => {
            setRecState('idle');
            setError('Could not record or transcribe. Check microphone permissions and try again.');
        });
    };

    const mm = String(Math.floor(prep / 60)).padStart(2, '0');
    const ss = String(prep % 60).padStart(2, '0');

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex gap-1.5 flex-wrap mb-3">
                    {tasks.map(t => (
                        <button key={t.id} onClick={() => setTaskId(t.id)}
                            className={cn('px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors',
                                taskId === t.id ? 'bg-rose-500 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                            Task {t.id.slice(1)}
                        </button>
                    ))}
                </div>
                <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">{task.label}</p>
                {mode === 'self' && <InteractiveText text={task.prompt} language="Spanish" className="block text-sm font-semibold text-stone-800 mb-1" />}
                <p className="text-xs text-stone-400">{task.guide}</p>
                <div className="flex gap-1 bg-stone-100 rounded-xl p-0.5 mt-3 w-fit">
                    <button onClick={() => setMode('self')}
                        className={cn('px-3.5 py-1.5 rounded-lg text-[10px] font-black transition-colors', mode === 'self' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400')}>
                        Self-record
                    </button>
                    <button onClick={() => setMode('examiner')}
                        className={cn('px-3.5 py-1.5 rounded-lg text-[10px] font-black transition-colors', mode === 'examiner' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400')}>
                        Live examiner
                    </button>
                </div>
            </div>

            {mode === 'examiner' && (
                <InteractiveExaminer
                    language="Spanish"
                    levelLabel={level}
                    taskLabel={task.label}
                    taskGuide={task.guide}
                    onDone={finishLiveExam}
                />
            )}

            {mode === 'self' && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-4">
                    {prep === 0 && recState === 'idle' && (
                        <button onClick={startPrep} className="px-5 py-2.5 bg-stone-100 text-stone-600 text-xs font-bold rounded-2xl hover:bg-stone-200 transition-colors">
                            Give me 1 minute of preparation time
                        </button>
                    )}
                    {prep > 0 && (
                        <div className="text-center">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Preparation</p>
                            <p className="text-3xl font-black tabular-nums text-violet-500">{mm}:{ss}</p>
                        </div>
                    )}
                    <button onClick={toggleRecord} disabled={recState === 'processing'}
                        className={cn('w-24 h-24 rounded-full mx-auto flex items-center justify-center transition-all shadow-xl',
                            recState === 'recording' ? 'bg-red-500 text-white scale-110 animate-pulse' : recState === 'processing' ? 'bg-stone-200 text-stone-400' : 'bg-rose-500 text-white hover:bg-rose-600')}>
                        {recState === 'recording' ? <Square size={30} fill="currentColor" /> : <Mic size={34} />}
                    </button>
                    <p className="text-xs font-bold text-stone-400">
                        {recState === 'idle' && 'Tap the mic and speak until you are done'}
                        {recState === 'recording' && 'Recording — tap to stop'}
                        {recState === 'processing' && 'Transcribing…'}
                        {recState === 'done' && 'Answer recorded'}
                    </p>
                </div>
            )}

            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}

            {evaluatingLive && (
                <div className="flex items-center justify-center gap-3 py-6 text-stone-400">
                    <Loader2 size={18} className="animate-spin" /> Your examiner is grading the full session…
                </div>
            )}

            {transcript && mode === 'self' && (
                <div className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Your transcript (from speech-to-text)</p>
                    <p className="text-sm text-stone-700 leading-relaxed">{transcript || <span className="italic text-stone-300">(nothing was transcribed)</span>}</p>
                </div>
            )}

            {feedback && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Practice estimate</p>
                        <p className="text-2xl font-black text-rose-500 my-1">Level {feedback.estimatedLevel}</p>
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
const Progress = ({ scores }: { scores: DeleScoreEntry[] }) => {
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
            <p className="text-[10px] text-stone-300 mt-3">Re-drill the same level in Listening/Reading — these exact concepts will come up again.</p>
        </div>
    );

    const mocksPanel = mocks.length > 0 && (
        <div className="bg-white rounded-3xl border border-stone-100 p-5">
            <div className="flex items-center gap-2 mb-3">
                <FileCheck size={15} className="text-rose-400" />
                <p className="font-black text-stone-800 text-sm">Mock exam history</p>
            </div>
            <div className="space-y-2">
                {mocks.slice(0, 5).map((m, i) => (
                    <div key={i} className={cn('flex items-center gap-3 rounded-2xl px-4 py-2.5', i === 0 ? 'bg-stone-900' : 'bg-stone-50')}>
                        <span className={cn('text-[11px] font-black', i === 0 ? 'text-white' : 'text-stone-700')}>
                            {new Date(m.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className={cn('text-[10px] flex-1', i === 0 ? 'text-white/50' : 'text-stone-400')}>
                            R {m.reading}% · L {m.listening}% · W {m.writing}% · S {m.speaking}%
                        </span>
                        <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full', i === 0 ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-500')}>
                            {m.passed ? 'APTO' : `weak: ${m.weakest}`}
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
                                        <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-full', isLatest ? 'bg-white/10 text-white' : 'bg-stone-200 text-stone-500')}>
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
                <AlertTriangle size={10} /> Practice estimates only — not official DELE results.
            </p>
        </div>
    );
};

// ── Portal shell ─────────────────────────────────────────────────────────────
const SpanishPrepView = () => {
    const { quizSettings, setActiveTab } = useAppStore() as any;
    const language = quizSettings?.targetLanguage || 'Spanish';
    const [tab, setTab] = useState<SpanishTab>('overview');
    const [level, setLevel] = useState<DeleLevel>('A2');
    const [scores, setScores] = useState<DeleScoreEntry[]>(getDeleScores());

    useEffect(() => { setScores(getDeleScores()); }, [tab]);

    // Spanish-only exam — functional gate, same as TCF for French.
    if (quizSettings?.targetLanguage !== 'Spanish') {
        return (
            <div className="max-w-md mx-auto w-full py-16 px-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-stone-100 flex items-center justify-center mx-auto mb-5">
                    <Lock size={28} className="text-stone-400" />
                </div>
                <h1 className="text-2xl font-black text-stone-900">DELE is Spanish-only</h1>
                <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                    This portal prepares you for the Diplomas de Español (Instituto Cervantes), so it stays locked
                    unless <span className="font-bold text-stone-600">Spanish</span> is your active language.
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

    const TABS: { id: SpanishTab; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: Flag },
        { id: 'curriculum', label: 'Learn', icon: BookOpen },
        { id: 'foundations', label: 'Foundations', icon: Languages },
        { id: 'cheatsheet', label: 'Cheat Sheet', icon: ClipboardList },
        { id: 'vocab', label: 'Vocabulary', icon: Layers },
        { id: 'builder', label: 'Sentence Builder', icon: ArrowRightLeft },
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
                        <GraduationCap size={24} className="text-emerald-600" /> DELE Español
                    </h1>
                    <p className="text-stone-400 text-sm mt-0.5">Exam prep portal — train all four skills, Instituto Cervantes style</p>
                </div>
                <Flag size={28} className="text-amber-500" />
            </div>

            {/* tabs — horizontally scrollable; active one auto-centers */}
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
            {tab === 'curriculum' && <Curriculum language={language} />}
            {tab === 'vocab' && <SpanishVocabTrainer level={level} onLevelChange={setLevel} />}
            {tab === 'builder' && <SpanishSentenceBuilder level={level} onLevelChange={setLevel} />}
            {tab === 'foundations' && (
                <div className="space-y-5">
                    <SpanishAlphabetChart />
                    <SpanishFoundations />
                </div>
            )}
            {tab === 'cheatsheet' && <SpanishCheatSheet />}
            {tab === 'mock' && <SpanishMockExam level={level} onLevelChange={setLevel} />}
            {tab === 'listening' && (
                <SpanishListeningTrainer level={level} onLevelChange={setLevel} onDone={(pct, label) => {
                    addDeleScore({ pct, skill: 'listening', label, score: pct });
                }} />
            )}
            {tab === 'reading' && (
                <SpanishReadingTrainer level={level} onLevelChange={setLevel} onDone={(pct, label) => {
                    addDeleScore({ pct, skill: 'reading', label, score: pct });
                }} />
            )}
            {tab === 'writing' && <WritingTrainer level={level} onLevelChange={setLevel} />}
            {tab === 'speaking' && <SpeakingTrainer level={level} language={language} onLevelChange={setLevel} />}
            {tab === 'progress' && <Progress scores={scores} />}
        </div>
    );
};

export default SpanishPrepView;
