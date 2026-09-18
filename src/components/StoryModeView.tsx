import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { BookOpen, Loader2, RotateCcw, Volume2, Square, Star, AlertCircle, Plus, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { generateStoryStart, continueStory, StoryNode } from '../services/aiService';
import { speakText, stopSpeaking } from '../services/voiceService';
import { InteractiveText } from './WordBreakdown';

const THEMES = [
    'A day at the market',
    'Lost in the city',
    'A job interview',
    'Meeting new friends',
    'A cooking class',
    'A train journey',
    'A mystery to solve',
    'A restaurant adventure',
];

const StoryModeView = () => {
    const { quizSettings, addPoints, addFlashcard, flashcards, user } = useAppStore() as any;
    const [theme, setTheme] = useState('');
    const [customTheme, setCustomTheme] = useState('');
    const [nodes, setNodes] = useState<StoryNode[]>([]);
    const [chosenPath, setChosenPath] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalVocab, setTotalVocab] = useState<{ word: string; translation: string }[]>([]);
    const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
    const [speakingKey, setSpeakingKey] = useState<string | null>(null);
    const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
    const bottomRef = useRef<HTMLDivElement>(null);

    // Stop any playing audio when leaving the section
    useEffect(() => () => stopSpeaking(), []);

    // Scroll to bottom whenever nodes update
    useEffect(() => {
        if (nodes.length > 0) {
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
        }
    }, [nodes, loading]);

    const normKey = (word: string) => word.toLowerCase().replace(/[.,!?;:«»"'-]/g, '').trim();

    const saveWord = (v: { word: string; translation: string }) => {
        const key = normKey(v.word);
        if (savedKeys.has(key)) return;
        const newCard = {
            id: crypto.randomUUID(),
            word: v.word,
            translation: v.translation,
            language: quizSettings.targetLanguage,
            nextReview: new Date().toISOString(),
            lastReviewed: null,
        };
        addFlashcard(newCard);
        if (user) {
            import('../services/dbService').then(m => m.upsertFlashcard(user.id, newCard)).catch(() => { });
        }
        setSavedKeys(prev => new Set(prev).add(key));
    };

    const isSaved = (word: string) =>
        savedKeys.has(normKey(word)) ||
        flashcards.some((f: any) => normKey(f.word) === normKey(word) && f.language === quizSettings.targetLanguage);

    const toggleListen = (key: string, text: string) => {
        if (speakingKey === key) {
            stopSpeaking();
            setSpeakingKey(null);
            return;
        }
        stopSpeaking();
        setSpeakingKey(key);
        speakText(text, quizSettings.targetLanguage, () => setSpeakingKey(prev => (prev === key ? null : prev)));
    };

    const startStory = async () => {
        const t = customTheme.trim() || theme;
        if (!t) return;
        setError(null);
        setLoading(true);
        try {
            const node = await generateStoryStart(quizSettings.targetLanguage, quizSettings.difficulty, t);
            if (!node.text) throw new Error('Empty story response');
            setNodes([node]);
            setChosenPath([]);
            setTotalVocab(node.vocabulary ?? []);
        } catch (err: any) {
            setError(err?.message || 'Failed to start story. Check your API key and try again.');
        } finally {
            setLoading(false);
        }
    };

    const makeChoice = async (choiceText: string) => {
        const turn = nodes.length;
        setError(null);
        setLoading(true);
        try {
            // Include the player's past choices so the AI keeps the story coherent
            const history = nodes
                .map((n, i) => `[Scene ${i + 1}]\n${n.text}${chosenPath[i] ? `\nPlayer chose: ${chosenPath[i]}` : ''}`)
                .join('\n\n');
            const next = await continueStory(
                quizSettings.targetLanguage,
                quizSettings.difficulty,
                history,
                choiceText,
                turn
            );
            if (!next.text) throw new Error('Empty continuation response');
            setNodes(prev => [...prev, next]);
            setChosenPath(prev => [...prev, choiceText]);
            setTotalVocab(prev => [
                ...prev,
                ...(next.vocabulary ?? []).filter(v => !prev.some(p => p.word === v.word)),
            ]);
            // Mark finished if isEnding flag or no choices returned
            if (next.isEnding || (next.choices ?? []).length === 0) {
                setFinished(true);
                addPoints(50);
                import('../services/activityLog').then(m => m.logActivity(1)).catch(() => { });
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to continue story. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const saveAllVocab = () => {
        totalVocab.forEach(v => saveWord(v));
    };

    const reset = () => {
        stopSpeaking();
        setNodes([]);
        setChosenPath([]);
        setFinished(false);
        setTheme('');
        setCustomTheme('');
        setTotalVocab([]);
        setSavedKeys(new Set());
        setSpeakingKey(null);
        setError(null);
    };

    const currentNode = nodes[nodes.length - 1];

    // ── Theme selection screen ────────────────────────────────────────────────
    if (nodes.length === 0) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
                <div className="text-center space-y-3">
                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto">
                        <BookOpen size={38} className="text-emerald-600" />
                    </div>
                    <h1 className="text-3xl font-black text-stone-900">Story Mode</h1>
                    <p className="text-stone-400">
                        An interactive story in {quizSettings.targetLanguage}. Make choices, tap any word for its meaning,
                        and tap the green chips to save new vocabulary to your deck. Finishing earns 50 pts.
                    </p>
                </div>

                <div>
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Choose a theme</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        {THEMES.map(t => (
                            <button
                                key={t}
                                onClick={() => { setTheme(t); setCustomTheme(''); }}
                                className={cn(
                                    'p-3 rounded-2xl border text-sm font-medium text-left transition-all',
                                    theme === t
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                                )}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <input
                        value={customTheme}
                        onChange={e => { setCustomTheme(e.target.value); setTheme(''); }}
                        placeholder="Or write your own theme…"
                        className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 mb-4"
                    />

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4 text-sm">
                            <AlertCircle size={16} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={startStory}
                        disabled={(!theme && !customTheme.trim()) || loading}
                        className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading
                            ? <><Loader2 size={18} className="animate-spin" /> Starting…</>
                            : <><BookOpen size={18} /> Begin Story</>}
                    </button>
                </div>
            </div>
        );
    }

    // ── Story screen ──────────────────────────────────────────────────────────
    return (
        <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-emerald-600" />
                    <span className="font-bold text-stone-800">Story Mode</span>
                    <span className="text-xs text-stone-400 ml-1">· {quizSettings.targetLanguage}</span>
                </div>
                <button onClick={reset} className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1">
                    <RotateCcw size={12} /> New story
                </button>
            </div>

            {/* Story nodes */}
            <div className="space-y-4">
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.id + i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <InteractiveText
                                text={node.text}
                                language={quizSettings.targetLanguage}
                                className="text-stone-800 leading-relaxed flex-1"
                            />
                            <button
                                onClick={() => toggleListen(node.id + i, node.text)}
                                className={cn(
                                    'p-2 rounded-xl hover:bg-stone-100 shrink-0 transition-colors',
                                    speakingKey === node.id + i ? 'bg-emerald-100 text-emerald-700' : 'text-stone-400'
                                )}
                                title={speakingKey === node.id + i ? 'Stop' : 'Listen'}
                            >
                                {speakingKey === node.id + i ? <Square size={14} fill="currentColor" /> : <Volume2 size={16} />}
                            </button>
                        </div>

                        <button
                            onClick={() => setShowTranslation(prev => ({ ...prev, [node.id + i]: !prev[node.id + i] }))}
                            className="text-xs text-stone-400 hover:text-stone-600 font-medium"
                        >
                            {showTranslation[node.id + i] ? 'Hide' : 'Show'} translation
                        </button>

                        {showTranslation[node.id + i] && (
                            <p className="text-sm text-stone-400 italic border-l-2 border-stone-200 pl-3">
                                {node.translation}
                            </p>
                        )}

                        {(node.vocabulary ?? []).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {node.vocabulary.map((v, vi) => {
                                    const saved = isSaved(v.word);
                                    return (
                                        <button
                                            key={vi}
                                            onClick={() => saveWord(v)}
                                            disabled={saved}
                                            title={saved ? 'Already in your deck' : 'Save to flashcards'}
                                            className={cn(
                                                'text-[10px] px-2 py-0.5 rounded-full font-bold border transition-all',
                                                saved
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                                            )}
                                        >
                                            {saved ? <Check size={10} className="inline mr-0.5 -mt-0.5" /> : <Plus size={10} className="inline mr-0.5 -mt-0.5" />}
                                            {v.word} = {v.translation}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Error banner */}
            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    <span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 font-bold text-xs">Dismiss</button>
                </div>
            )}

            {/* Choices / loading / ending */}
            {finished ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4"
                >
                    <Star size={36} className="mx-auto text-amber-400" fill="currentColor" />
                    <h2 className="text-2xl font-black text-stone-900">Story Complete!</h2>
                    <p className="text-stone-500">
                        You earned <span className="font-black text-amber-500">+50 pts</span> and learned {totalVocab.length} new words.
                    </p>
                    {totalVocab.length > 0 && (
                        <div className="text-left bg-white rounded-2xl p-4 space-y-1.5">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Vocabulary learned</p>
                                <button
                                    onClick={saveAllVocab}
                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                >
                                    <Plus size={12} /> Save all to deck
                                </button>
                            </div>
                            {totalVocab.map((v, i) => {
                                const saved = isSaved(v.word);
                                return (
                                    <div key={i} className="flex items-center gap-2 text-sm">
                                        <span className="font-bold text-stone-800">{v.word}</span>
                                        <span className="text-stone-300">→</span>
                                        <span className="text-stone-500 flex-1">{v.translation}</span>
                                        <button
                                            onClick={() => saveWord(v)}
                                            disabled={saved}
                                            title={saved ? 'Already in your deck' : 'Save to flashcards'}
                                            className={cn(
                                                'p-1 rounded-lg transition-colors',
                                                saved ? 'text-emerald-600' : 'text-stone-300 hover:text-emerald-600 hover:bg-emerald-50'
                                            )}
                                        >
                                            {saved ? <Check size={14} /> : <Plus size={14} />}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    <button
                        onClick={reset}
                        className="px-8 py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-700 transition-all"
                    >
                        Play Again
                    </button>
                </motion.div>
            ) : loading ? (
                <div className="flex items-center justify-center py-8 gap-3 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing the next scene…
                </div>
            ) : currentNode && (currentNode.choices ?? []).length > 0 ? (
                <div className="space-y-3">
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest">What do you do?</p>
                    {currentNode.choices.map((choice, ci) => (
                        <button
                            key={choice.id ?? ci}
                            onClick={() => makeChoice(choice.text)}
                            className="w-full text-left p-4 rounded-2xl border-2 border-stone-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                        >
                            <p className="font-medium text-stone-800 group-hover:text-emerald-800">{choice.text}</p>
                            {choice.translation && (
                                <p className="text-xs text-stone-400 mt-0.5 italic">{choice.translation}</p>
                            )}
                        </button>
                    ))}
                </div>
            ) : null}

            <div ref={bottomRef} />
        </div>
    );
};

export default StoryModeView;
