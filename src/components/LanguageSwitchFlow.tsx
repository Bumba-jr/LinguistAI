import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Flag } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Language } from '../store/useAppStore';

// Duolingo-style full-page switch flow for a NEW language:
// loading screen → self-assessed level → goals. Dark theme throughout.

const FLAGS: Record<string, string> = {
    French: '🇫🇷', Spanish: '🇪🇸', German: '🇩🇪', Italian: '🇮🇹',
    Japanese: '🇯🇵', Portuguese: '🇵🇹', Chinese: '🇨🇳',
};

const EXAMS: Partial<Record<string, string>> = {
    French: 'TCF Canada', German: 'Goethe-Zertifikat', Spanish: 'DELE',
    Italian: 'CILS', Japanese: 'JLPT', Portuguese: 'CAPLE', Chinese: 'HSK',
};

const MISSIONS = [
    'Our mission is to make language learning joyful and effective.',
    'Small sessions every day beat one long session a week.',
    'You will speak from the very first lesson.',
];

const LEVELS = [
    { id: 'new', label: (l: string) => `I'm new to ${l}`, score: 15, difficulty: 'beginner' },
    { id: 'some', label: (l: string) => `I know some common ${l} words`, score: 35, difficulty: 'intermediate' },
    { id: 'basic', label: () => 'I can have basic conversations', score: 55, difficulty: 'intermediate' },
    { id: 'topics', label: () => 'I can talk about various topics', score: 70, difficulty: 'advanced' },
    { id: 'detail', label: () => 'I can discuss most topics in detail', score: 85, difficulty: 'advanced' },
];

const GOALS = [
    { id: 'travel', label: 'Travel' },
    { id: 'work', label: 'Work & career' },
    { id: 'school', label: 'School & exams' },
    { id: 'family', label: 'Family & friends' },
    { id: 'culture', label: 'Movies, music & culture' },
    { id: 'brain', label: 'Just for my brain' },
];

const STARTERS: Record<string, [string, string][]> = {
    French: [['bonjour', 'hello'], ['merci', 'thank you'], ['je suis', 'I am']],
    Spanish: [['hola', 'hello'], ['gracias', 'thank you'], ['soy', 'I am']],
    German: [['hallo', 'hello'], ['danke', 'thank you'], ['ich bin', 'I am']],
    Italian: [['ciao', 'hello'], ['grazie', 'thank you'], ['sono', 'I am']],
    Portuguese: [['olá', 'hello'], ['obrigado', 'thank you'], ['eu sou', 'I am']],
    Japanese: [['こんにちは', 'hello'], ['ありがとう', 'thank you'], ['私は', 'I am']],
    Chinese: [['你好', 'hello'], ['谢谢', 'thank you'], ['我是', 'I am']],
};

type Phase = 'loading' | 'level' | 'goals';

const LanguageSwitchFlow = ({ language, onDone, onCancel }: {
    language: string; onDone: (result: { difficultyScore: number; difficulty: string; goals: string[]; starters: { word: string; translation: string }[] }) => void;
    onCancel: () => void;
}) => {
    const [phase, setPhase] = useState<Phase>('loading');
    const [levelId, setLevelId] = useState<string | null>(null);
    const [goals, setGoals] = useState<string[]>([]);
    const [mission, setMission] = useState(MISSIONS[0]);
    const [starterCards, setStarterCards] = useState<{ word: string; translation: string }[]>([]);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // loading screen: rotate mission text, seed starter cards for the profile
    useEffect(() => {
        const missions = [...MISSIONS];
        let mi = 0;
        timerRef.current = setInterval(() => {
            mi = (mi + 1) % missions.length;
            setMission(missions[mi]);
        }, 700);
        // "load" the new profile's data — starter cards for the deck
        const starters = (STARTERS[language] || []).map(([word, translation], i) => ({
            id: `starter-${language}-${i}-${Date.now()}`, word: word as string, translation: translation as string,
            language: language as any, nextReview: new Date().toISOString(), lastReviewed: null,
        }));
        setStarterCards(starters);
        const t = setTimeout(() => { clearInterval(timerRef.current!); setPhase('level'); }, 2200);
        return () => { clearInterval(timerRef.current); clearTimeout(t); };
    }, [language]);

    const level = LEVELS.find(l => l.id === levelId);
    const exam = EXAMS[language];

    const finish = () => {
        if (!level) return;
        onDone({
            difficultyScore: level.score,
            difficulty: level.difficulty,
            goals,
            starters: levelId === 'new' ? (STARTERS[language] || []).map(([word, translation]) => ({ word, translation })) : [],
        });
    };

    return (
        <div className="fixed inset-0 z-[80] bg-[#131f24] text-white overflow-y-auto">
            {phase === 'loading' && (
                <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
                    <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
                        className="text-8xl mb-8">{FLAGS[language] || '🌍'}</motion.div>
                    <p className="text-2xl font-black tracking-widest text-white/80 uppercase mb-6">
                        Loading {language}…
                    </p>
                    <motion.p key={mission} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-white/50 text-lg max-w-md leading-relaxed">{mission}</motion.p>
                </div>
            )}

            {phase === 'level' && (
                <div className="min-h-screen flex flex-col px-5 py-6 max-w-lg mx-auto w-full">
                    <button onClick={onCancel} className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors w-fit">
                        <ArrowLeft size={22} />
                    </button>
                    <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                        className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl mx-auto mt-4 mb-6">
                        {FLAGS[language] || '🌍'}
                    </motion.div>
                    <h1 className="text-3xl font-black text-center leading-snug mb-8">
                        How much {language} do you know?
                    </h1>
                    <div className="space-y-3">
                        {LEVELS.map((l, i) => {
                            const on = levelId === l.id;
                            return (
                                <button key={l.id} onClick={() => setLevelId(l.id)}
                                    className={cn('w-full text-left px-5 py-4 rounded-2xl border-2 transition-all flex items-center gap-4',
                                        on ? 'border-sky-400 bg-sky-400/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25')}>
                                    {/* signal bars */}
                                    <span className="flex items-end gap-0.5 h-5 shrink-0">
                                        {[0, 1, 2, 3].map(b => (
                                            <span key={b} className={cn('w-1 rounded-sm',
                                                b <= i ? 'bg-sky-400' : 'bg-white/15')} style={{ height: 6 + b * 4 }} />
                                        ))}
                                    </span>
                                    <span className="font-bold text-base">{l.label(language)}</span>
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={() => setPhase('goals')} disabled={!levelId}
                        className="mt-8 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest bg-sky-400 text-[#131f24] disabled:opacity-30 disabled:cursor-not-allowed">
                        Continue
                    </button>
                </div>
            )}

            {phase === 'goals' && (
                <div className="min-h-screen flex flex-col px-5 py-6 max-w-lg mx-auto w-full">
                    <button onClick={() => setPhase('level')} className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors w-fit">
                        <ArrowLeft size={22} />
                    </button>
                    <h1 className="text-3xl font-black text-center leading-snug mt-4 mb-8">
                        What do you want<br />to achieve with {language}?
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exam && (
                            <button onClick={() => setGoals(g => g.includes('exam') ? g.filter(x => x !== 'exam') : [...g, 'exam'])}
                                className={cn('relative text-left p-5 rounded-2xl border-2 transition-all',
                                    goals.includes('exam') ? 'border-sky-400 bg-sky-400/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25')}>
                                <div className="flex items-start justify-between">
                                    <Flag size={18} className={goals.includes('exam') ? 'text-sky-400' : 'text-white/40'} />
                                    <span className={cn('w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center',
                                        goals.includes('exam') ? 'border-sky-400 bg-sky-400' : 'border-white/25')}>
                                        {goals.includes('exam') && <Check size={11} className="text-[#131f24]" />}
                                    </span>
                                </div>
                                <p className="font-bold mt-3">Pass the {exam} exam</p>
                                <p className="text-white/40 text-sm mt-0.5">Exam-ready preparation</p>
                            </button>
                        )}
                        {GOALS.filter(g => !(g.id === 'exam') || !exam).map(g => {
                            const on = goals.includes(g.id);
                            return (
                                <button key={g.id} onClick={() => setGoals(gs => gs.includes(g.id) ? gs.filter(x => x !== g.id) : [...gs, g.id])}
                                    className={cn('relative text-left p-5 rounded-2xl border-2 transition-all',
                                        on ? 'border-sky-400 bg-sky-400/10' : 'border-white/10 bg-white/[0.03] hover:border-white/25')}>
                                    <div className="flex items-start justify-between">
                                        <span className="font-bold">{g.label}</span>
                                        <span className={cn('w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center',
                                            on ? 'border-sky-400 bg-sky-400' : 'border-white/25')}>
                                            {on && <Check size={11} className="text-[#131f24]" />}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <button onClick={finish}
                        className="mt-8 w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest bg-sky-400 text-[#131f24] disabled:opacity-30"
                        disabled={goals.length === 0}>
                        Continue
                    </button>
                    <p className="text-center text-white/30 text-xs mt-4">
                        {starterCards.length} starter words will be waiting in your {language} deck
                    </p>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitchFlow;
