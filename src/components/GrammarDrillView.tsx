import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { Zap, RotateCcw, CheckCircle2, XCircle, ChevronRight, Loader2, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateGrammarDrill } from '../services/aiService';
import { Question } from '../store/useAppStore';

const GRAMMAR_RULES: Record<string, string[]> = {
    French: ['Passé composé vs Imparfait', 'Subjunctive mood', 'Adjective agreement', 'Direct & indirect object pronouns', 'Conditional tense', 'Relative pronouns (qui/que/dont)', 'Negation (ne...pas, ne...jamais)', 'Articles (le/la/les/un/une/des)'],
    Spanish: ['Ser vs Estar', 'Preterite vs Imperfect', 'Subjunctive mood', 'Reflexive verbs', 'Direct & indirect object pronouns', 'Conditional tense', 'Por vs Para', 'Ser/Estar with adjectives'],
    German: ['Nominative vs Accusative vs Dative', 'Modal verbs', 'Separable verbs', 'Adjective endings', 'Perfekt vs Präteritum', 'Konjunktiv II', 'Word order (V2 rule)', 'Der/Die/Das articles'],
    Italian: ['Passato prossimo vs Imperfetto', 'Subjunctive mood', 'Reflexive verbs', 'Direct & indirect object pronouns', 'Conditional tense', 'Relative pronouns', 'Articles', 'Adjective agreement'],
    Japanese: ['て-form verbs', 'Potential form', 'Passive form', 'Causative form', 'Conditional (たら/ば/と)', 'て-form + いる', 'Honorific speech', 'Particles (は/が/を/に/で)'],
    Portuguese: ['Ser vs Estar', 'Preterite vs Imperfect', 'Subjunctive mood', 'Reflexive verbs', 'Object pronouns', 'Conditional tense', 'Por vs Para', 'Articles'],
    Chinese: ['了 (le) particle', '的/地/得 usage', 'Measure words', 'Aspect particles', 'Resultative complements', 'Directional complements', 'Ba construction', 'Comparison structures'],
};

const GrammarDrillView = () => {
    const { quizSettings, addPoints } = useAppStore();
    const [selectedRule, setSelectedRule] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [loading, setLoading] = useState(false);

    const rules = GRAMMAR_RULES[quizSettings.targetLanguage] ?? GRAMMAR_RULES['French'];

    const startDrill = async () => {
        if (!selectedRule) return;
        setLoading(true);
        try {
            const qs = await generateGrammarDrill(quizSettings.targetLanguage, selectedRule, quizSettings.difficulty, 10);
            setQuestions(qs);
            setCurrent(0); setScore(0); setFinished(false); setSelected(null); setIsCorrect(null);
        } catch { /* silent */ }
        finally { setLoading(false); }
    };

    const handleCheck = () => {
        if (!selected) return;
        const q = questions[current];
        const correct = selected.toLowerCase().trim() === q.answer.toLowerCase().trim();
        setIsCorrect(correct);
        if (correct) { setScore(s => s + 1); addPoints(20); }
    };

    const handleNext = () => {
        if (current >= questions.length - 1) { setFinished(true); return; }
        setCurrent(c => c + 1); setSelected(null); setIsCorrect(null);
    };

    if (questions.length === 0) return (
        <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto"><Zap size={38} className="text-rose-600" /></div>
                <h1 className="text-3xl font-black text-stone-900">Grammar Drill</h1>
                <p className="text-stone-400">20 rapid-fire questions on one grammar rule. +20 pts per correct answer.</p>
            </div>
            <div>
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Choose a grammar rule</p>
                <div className="grid grid-cols-1 gap-2 mb-6">
                    {rules.map(rule => (
                        <button key={rule} onClick={() => setSelectedRule(rule)}
                            className={cn('p-3.5 rounded-2xl border text-sm font-medium text-left transition-all',
                                selectedRule === rule ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-stone-200 text-stone-600 hover:border-stone-300')}>
                            {rule}
                        </button>
                    ))}
                </div>
                <button onClick={startDrill} disabled={!selectedRule || loading}
                    className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={18} className="animate-spin" /> Generating…</> : <><Zap size={18} /> Start Drill</>}
                </button>
            </div>
        </div>
    );

    if (finished) return (
        <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-6">
            <Trophy size={52} className="mx-auto text-amber-400" />
            <h2 className="text-3xl font-black text-stone-900">Drill Complete!</h2>
            <p className="text-stone-400">{selectedRule}</p>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 p-5 rounded-2xl"><p className="text-3xl font-black text-stone-800">{score}/{questions.length}</p><p className="text-xs text-stone-400 mt-1">Correct</p></div>
                <div className="bg-amber-50 p-5 rounded-2xl"><p className="text-3xl font-black text-amber-600">+{score * 20}</p><p className="text-xs text-stone-400 mt-1">Points earned</p></div>
            </div>
            <div className="flex gap-3 justify-center">
                <button onClick={() => { setQuestions([]); setSelectedRule(''); }} className="px-6 py-3 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all">
                    <RotateCcw size={16} className="inline mr-2" />New Rule
                </button>
                <button onClick={startDrill} className="px-6 py-3 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 transition-all">
                    Retry Same Rule
                </button>
            </div>
        </div>
    );

    const q = questions[current];
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-sm font-medium text-stone-400 uppercase tracking-wider">Question {current + 1}/{questions.length}</span>
                    <p className="text-xs text-rose-500 font-bold mt-0.5">{selectedRule}</p>
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-xl text-sm font-black">
                    <Zap size={13} fill="currentColor" /> {score * 20} pts
                </div>
            </div>
            <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-rose-500 rounded-full" animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
            </div>
            <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                <h2 className="text-2xl font-semibold text-stone-800 mb-2">{q.question}</h2>
                {q.translation && quizSettings.difficulty !== 'advanced' && <p className="text-stone-400 italic text-sm mb-6">{q.translation}</p>}
                <div className="space-y-3 mb-6">
                    {q.options?.map((opt, i) => (
                        <button key={i} onClick={() => isCorrect === null && setSelected(opt)} disabled={isCorrect !== null}
                            className={cn('w-full text-left p-4 rounded-2xl border-2 transition-all',
                                isCorrect !== null && opt === q.answer ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                    : isCorrect !== null && opt === selected && !isCorrect ? 'border-red-400 bg-red-50 text-red-800'
                                        : selected === opt ? 'border-rose-500 bg-rose-50 text-rose-900'
                                            : 'border-stone-100 hover:border-stone-200 text-stone-600')}>
                            {opt}
                        </button>
                    ))}
                </div>
                {isCorrect === null ? (
                    <button onClick={handleCheck} disabled={!selected}
                        className="w-full py-4 bg-stone-800 text-white rounded-2xl font-semibold hover:bg-stone-900 transition-all disabled:opacity-50">
                        Check Answer
                    </button>
                ) : (
                    <div className="space-y-3">
                        <div className={cn('p-4 rounded-2xl flex items-center gap-3', isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800')}>
                            {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                            <span className="font-semibold">{isCorrect ? 'Correct! +20 pts' : `Incorrect. Answer: ${q.answer}`}</span>
                        </div>
                        <button onClick={handleNext} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-semibold hover:bg-rose-700 transition-all flex items-center justify-center gap-2">
                            {current >= questions.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default GrammarDrillView;
