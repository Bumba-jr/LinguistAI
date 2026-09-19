import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Upload, Layers, MessageSquare, GraduationCap, Trophy, Mic,
    ChevronRight, X, Sparkles,
} from 'lucide-react';
import { cn } from '../lib/utils';

const SLIDES = [
    {
        icon: Upload, color: 'text-indigo-500', bg: 'bg-indigo-50',
        title: 'Start with your notes',
        body: 'Paste or upload any notes — AI turns them into full lessons, flashcards and quizzes in seconds. This is the fastest way to build material.',
    },
    {
        icon: Layers, color: 'text-emerald-500', bg: 'bg-emerald-50',
        title: 'Flashcards remember for you',
        body: 'Every word you meet can be saved to your deck. Cards reschedule themselves — rate Hard, Again or Easy and the app decides when to show them next. Works offline too.',
    },
    {
        icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50',
        title: 'Talk with your AI Tutor',
        body: 'Practice real conversations with corrections, translations and word tooltips. Turn on Voice Conversation for hands-free speaking — or meet AI partners and real learners in Exchange.',
    },
    {
        icon: GraduationCap, color: 'text-teal-500', bg: 'bg-teal-50',
        title: 'Reading, Dictation & Conjugation',
        body: 'Graded articles with tap-to-translate words, listening dictation scored word by word, and a verb trainer that re-drills your mistakes until they stick.',
    },
    {
        icon: Trophy, color: 'text-rose-500', bg: 'bg-rose-50',
        title: 'TCF Canada & Progress',
        body: 'Preparing for the TCF? The TCF tab has lessons from A1 to C2, skill trainers and mock exams. Analytics tracks everything — including the words you keep missing.',
    },
];

const TutorialTour = ({ onFinish }: { onFinish: () => void }) => {
    const [i, setI] = useState(0);
    const s = SLIDES[i];
    const last = i === SLIDES.length - 1;

    return (
        <div className="fixed inset-0 z-[70] bg-stone-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
                {/* header with dots */}
                <div className="relative px-6 pt-5">
                    <div className="flex items-center justify-center gap-1.5">
                        {SLIDES.map((_, di) => (
                            <span key={di} className={cn('h-1.5 rounded-full transition-all duration-300',
                                di === i ? 'w-7 bg-emerald-500' : 'w-3 bg-stone-200')} />
                        ))}
                    </div>
                    <button onClick={onFinish} title="Skip tour"
                        className="absolute right-4 top-4 p-1.5 rounded-xl text-stone-300 hover:text-stone-600 hover:bg-stone-100 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={i}
                        initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.22 }}
                        className="px-8 pt-6 pb-2 text-center">
                        <div className={cn('w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4', s.bg)}>
                            <s.icon size={30} className={s.color} />
                        </div>
                        <h2 className="text-xl font-black text-stone-900 mb-2">{s.title}</h2>
                        <p className="text-sm text-stone-500 leading-relaxed">{s.body}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="px-6 py-5 flex items-center gap-3">
                    <button onClick={onFinish}
                        className="px-4 py-3 text-xs font-black text-stone-400 hover:text-stone-700 uppercase tracking-widest transition-colors">
                        {last ? 'Done' : 'Skip tour'}
                    </button>
                    <button onClick={() => (last ? onFinish() : setI(v => v + 1))}
                        className="flex-1 py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                        {last ? <><Sparkles size={15} /> Start learning</> : <>Next <ChevronRight size={15} /></>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default TutorialTour;
