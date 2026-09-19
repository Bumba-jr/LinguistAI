import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    GraduationCap, Loader2, Check, Plane, Briefcase, GraduationCap as School,
    Home, Flag, Sparkles, ChevronLeft, ArrowRight, Clock, BookOpen, Volume2,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAppStore } from '../store/useAppStore';
import type { Language } from '../store/useAppStore';
import { speakText } from '../services/voiceService';

const LANGS: { lang: Language; flag: string; note: string }[] = [
    { lang: 'French', flag: '🇫🇷', note: 'TCF Canada ready' },
    { lang: 'Spanish', flag: '🇪🇸', note: 'Most widely spoken' },
    { lang: 'German', flag: '🇩🇪', note: 'Goethe exam ready' },
    { lang: 'Italian', flag: '🇮🇹', note: 'CILS exam ready' },
    { lang: 'Japanese', flag: '🇯🇵', note: 'JLPT ready' },
    { lang: 'Portuguese', flag: '🇵🇹', note: 'CAPLE ready' },
    { lang: 'Chinese', flag: '🇨🇳', note: 'HSK ready' },
];

const GOALS = [
    { id: 'tcf', icon: Flag, label: 'Pass the TCF Canada exam', sub: 'Immigration-ready NCLC 7+' },
    { id: 'travel', icon: Plane, label: 'Travel with confidence', sub: 'Order, ask, explore' },
    { id: 'work', icon: Briefcase, label: 'Work & career', sub: 'Professional language skills' },
    { id: 'school', icon: School, label: 'School & exams', sub: 'Class support and revision' },
    { id: 'family', icon: Home, label: 'Family & community', sub: 'Speak with the people around you' },
    { id: 'explore', icon: Sparkles, label: 'Just exploring', sub: 'See what AI learning feels like' },
];

const TIMES = [
    { id: '5', icon: Clock, label: '5 min a day', sub: 'Light and steady' },
    { id: '10', icon: Clock, label: '10 min a day', sub: 'Recommended' },
    { id: '20', icon: BookOpen, label: '20 min a day', sub: 'Serious progress' },
];

const LEVELS = [
    { id: 'new', icon: Sparkles, label: 'I am new to it', sub: 'Start me from the very beginning (A1)' },
    { id: 'some', icon: BookOpen, label: 'I know some basics', sub: 'Test me and place me correctly' },
    { id: 'confident', icon: Check, label: 'I am fairly confident', sub: 'Test me — I want the right level fast' },
];

const DOT_STEPS = 4;

const OnboardingFlow = ({ onFinish }: { onFinish: (result: { skipPlacement: boolean; levelId: string }) => void }) => {
    const { updateQuizSettings, addFlashcard, user } = useAppStore() as any;
    const [step, setStep] = useState(0);
    const [goals, setGoals] = useState<string[]>([]);
    const [lang, setLang] = useState<Language | null>(null);
    const [time, setTime] = useState('10');
    const [levelId, setLevelId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const toggleGoal = (id: string) => setGoals(prev =>
        prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

    const canContinue = [goals.length > 0, !!lang, true, !!levelId][step];

    const finish = async () => {
        setSaving(true);
        if (lang) updateQuizSettings({ targetLanguage: lang });
        try { localStorage.setItem('linguistai-onboarded', '1'); } catch { /* quota */ }
        // Give brand-new learners three starter words in their language so the deck is never empty
        if (levelId === 'new' && lang) {
            const starters: Record<string, [string, string][]> = {
                French: [['bonjour', 'hello'], ['merci', 'thank you'], ['je suis', 'I am']],
                Spanish: [['hola', 'hello'], ['gracias', 'thank you'], ['soy', 'I am']],
                German: [['hallo', 'hello'], ['danke', 'thank you'], ['ich bin', 'I am']],
                Italian: [['ciao', 'hello'], ['grazie', 'thank you'], ['sono', 'I am']],
                Portuguese: [['olá', 'hello'], ['obrigado', 'thank you'], ['eu sou', 'I am']],
                Japanese: [['こんにちは', 'hello'], ['ありがとう', 'thank you'], ['私は', 'I am']],
                Chinese: [['你好', 'hello'], ['谢谢', 'thank you'], ['我是', 'I am']],
            };
            (starters[lang] || []).forEach(([w, t], i) => {
                const card = { id: `starter-${i}-${Date.now()}`, word: w, translation: t, language: lang, nextReview: new Date().toISOString(), lastReviewed: null };
                addFlashcard(card);
                if (user) import('../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
            });
        }
        setSaving(false);
        onFinish({ skipPlacement: levelId === 'new', levelId: levelId! });
    };

    const titles = [
        <>What do you want<br /><span className="text-stone-400">to achieve?</span></>,
        <>Which language<br /><span className="text-stone-400">do you want to learn?</span></>,
        <>How much time<br /><span className="text-stone-400">can you give daily?</span></>,
        <>How familiar are you<br /><span className="text-stone-400">with {lang || 'it'}?</span></>,
    ];
    const helpers = [
        'We tailor lessons and exam prep to your goals',
        'Every lesson, quiz and game uses this language',
        'Small daily habits beat long weekend sessions',
        'We never assume — we test before placing you',
    ];

    const cardCls = (on: boolean) => cn(
        'relative text-left p-5 rounded-2xl border-2 transition-all',
        on ? 'border-emerald-500 bg-emerald-50/60 shadow-sm shadow-emerald-100' : 'border-stone-200 bg-white hover:border-stone-300');
    const radio = (on: boolean) => cn(
        'w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all shrink-0',
        on ? 'border-emerald-500 bg-emerald-500' : 'border-stone-300');
    const iconCls = (on: boolean) => on ? 'text-emerald-600' : 'text-stone-400';

    return (
        <div className="fixed inset-0 z-[70] flex bg-white text-stone-900 overflow-hidden">
            {/* Left visual panel — desktop only */}
            <div className="hidden lg:block w-[38%] shrink-0 relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg,#ecfdf5 0%,#d1fae5 60%,#a7f3d0 130%)' }}>
                <div className="absolute inset-0 opacity-60"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.7), transparent 45%), radial-gradient(circle at 70% 80%, rgba(16,185,129,0.12), transparent 50%)' }} />
                {/* floating word cards — the product itself, as the visual */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-10">
                    {[['bonjour', 'hello'], ['gracias', 'thank you'], ['こんにちは', 'hello']].map(([fr, en], i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 120, damping: 14 }}
                            className="w-64 bg-white border border-emerald-100 rounded-3xl p-5 shadow-lg shadow-emerald-100/60"
                            style={{ transform: `rotate(${i === 0 ? -3 : i === 1 ? 2 : -2}deg)` }}>
                            <div className="flex items-center justify-between">
                                <p className="text-2xl font-black text-stone-900">{fr}</p>
                                <button onClick={() => speakText(fr, 'French')} className="text-emerald-400 hover:text-emerald-600"><Volume2 size={16} /></button>
                            </div>
                            <p className="text-stone-400 text-sm mt-1">{en}</p>
                        </motion.div>
                    ))}
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
                        className="text-emerald-700/60 text-xs font-black uppercase tracking-[0.2em] mt-4 text-center">
                        Your language. Your pace.
                    </motion.p>
                </div>
            </div>

            {/* Right side — the question */}
            <div className="flex-1 flex flex-col relative">
                {/* progress dots */}
                <div className="flex items-center justify-center gap-2 pt-8">
                    {Array.from({ length: DOT_STEPS }).map((_, i) => (
                        <span key={i} className={cn('h-1.5 rounded-full transition-all duration-300',
                            i === step ? 'w-8 bg-emerald-500' : i < step ? 'w-4 bg-emerald-400/60' : 'w-4 bg-stone-200')} />
                    ))}
                </div>

                {/* skip */}
                <button onClick={finish} disabled={saving}
                    className="absolute top-7 right-6 text-stone-400 hover:text-stone-800 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-40">
                    Skip
                </button>

                {/* back */}
                {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                        className="absolute top-7 left-6 flex items-center gap-1 text-stone-400 hover:text-stone-800 text-xs font-bold transition-colors">
                        <ChevronLeft size={13} /> Back
                    </button>
                )}

                <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 pb-6">
                    <AnimatePresence mode="wait">
                        <motion.div key={step}
                            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-2xl">
                            <h1 className="text-3xl sm:text-5xl font-black text-center leading-tight tracking-tight text-stone-900">
                                {titles[step]}
                            </h1>

                            {/* step 0: goals (multi-select) */}
                            {step === 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10">
                                    {GOALS.map(g => {
                                        const on = goals.includes(g.id);
                                        return (
                                            <button key={g.id} onClick={() => toggleGoal(g.id)} className={cardCls(on)}>
                                                <div className="flex items-start justify-between">
                                                    <g.icon size={18} className={iconCls(on)} />
                                                    <span className={radio(on)}>{on && <Check size={11} className="text-white" />}</span>
                                                </div>
                                                <p className="font-bold mt-3 text-stone-900">{g.label}</p>
                                                <p className="text-stone-400 text-sm mt-0.5">{g.sub}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* step 1: language */}
                            {step === 1 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10">
                                    {LANGS.map(l => {
                                        const on = lang === l.lang;
                                        return (
                                            <button key={l.lang} onClick={() => setLang(l.lang)} className={cardCls(on)}>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-3xl">{l.flag}</span>
                                                    <span className={radio(on)}>{on && <Check size={11} className="text-white" />}</span>
                                                </div>
                                                <p className="font-bold mt-3 text-stone-900">{l.lang}</p>
                                                <p className="text-stone-400 text-sm mt-0.5">{l.note}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* step 2: daily time */}
                            {step === 2 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
                                    {TIMES.map(t => {
                                        const on = time === t.id;
                                        return (
                                            <button key={t.id} onClick={() => setTime(t.id)} className={cardCls(on)}>
                                                <div className="flex items-start justify-between">
                                                    <t.icon size={18} className={iconCls(on)} />
                                                    <span className={radio(on)}>{on && <Check size={11} className="text-white" />}</span>
                                                </div>
                                                <p className="font-bold mt-3 text-stone-900">{t.label}</p>
                                                <p className="text-stone-400 text-sm mt-0.5">{t.sub}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* step 3: level */}
                            {step === 3 && (
                                <div className="grid grid-cols-1 gap-3 mt-10">
                                    {LEVELS.map(l => {
                                        const on = levelId === l.id;
                                        return (
                                            <button key={l.id} onClick={() => setLevelId(l.id)} className={cardCls(on)}>
                                                <div className="flex items-start justify-between gap-3">
                                                    <l.icon size={18} className={cn('mt-0.5', iconCls(on))} />
                                                    <span className={radio(on)}>{on && <Check size={11} className="text-white" />}</span>
                                                </div>
                                                <p className="font-bold mt-2 text-stone-900">{l.label}</p>
                                                <p className="text-stone-400 text-sm mt-0.5">{l.sub}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* continue */}
                <div className="pb-8 px-6 sm:px-12">
                    <button onClick={() => (step < DOT_STEPS - 1 ? setStep(s => s + 1) : finish())}
                        disabled={!canContinue || saving}
                        className="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 py-4 bg-stone-900 text-white text-sm font-black rounded-2xl hover:bg-emerald-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                        {saving ? <><Loader2 size={16} className="animate-spin" /> Setting things up…</>
                            : step < DOT_STEPS - 1 ? <>Continue <ArrowRight size={16} /></>
                                : <><GraduationCap size={16} /> Start learning</>}
                    </button>
                    <p className="text-center text-stone-400 text-xs mt-4">{helpers[step]}</p>
                </div>
            </div>
        </div>
    );
};

export default OnboardingFlow;
