import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion } from 'motion/react';
import { BookOpen, Loader2, RotateCcw, Volume2, Square, Star, AlertCircle, Plus, Check, Undo2, Library, Trash2, ArrowLeft } from 'lucide-react';
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

const LENGTHS = [
    { label: 'Short', turns: 4, blurb: '4 scenes' },
    { label: 'Standard', turns: 6, blurb: '6 scenes' },
    { label: 'Long', turns: 8, blurb: '8 scenes' },
];

const StoryModeView = () => {
    const { quizSettings, addPoints, addFlashcard, flashcards, user, savedStories, addSavedStory, removeSavedStory, activeStory, setActiveStory } = useAppStore() as any;
    // all hooks before any conditional returns
    const [theme, setTheme] = useState('');
    const [customTheme, setCustomTheme] = useState('');
    const [maxTurns, setMaxTurns] = useState(6);
    const [storyTheme, setStoryTheme] = useState('');
    const [nodes, setNodes] = useState<StoryNode[]>([]);
    const [chosenPath, setChosenPath] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [undoing, setUndoing] = useState(false);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalVocab, setTotalVocab] = useState<{ word: string; translation: string }[]>([]);
    const [showTranslation, setShowTranslation] = useState<Record<string, boolean>>({});
    const [speakingKey, setSpeakingKey] = useState<string | null>(null);
    const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
    const [readingSaved, setReadingSaved] = useState<any>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const restoredRef = useRef(false);

    // Stop any playing audio when leaving the section
    useEffect(() => () => stopSpeaking(), []);

    // Resume an in-progress story after a refresh or navigation away
    useEffect(() => {
        if (restoredRef.current) return;
        restoredRef.current = true;
        if (activeStory && activeStory.nodes?.length > 0) {
            setNodes(activeStory.nodes);
            setChosenPath(activeStory.chosenPath || []);
            setStoryTheme(activeStory.theme || '');
            setMaxTurns(activeStory.maxTurns || 6);
            const vocab: { word: string; translation: string }[] = [];
            activeStory.nodes.forEach((n: StoryNode) => (n.vocabulary ?? []).forEach(v => {
                if (!vocab.some(p => p.word === v.word)) vocab.push(v);
            }));
            setTotalVocab(vocab);
            setActiveStory(null);
        }
    }, []);

    // keep the in-progress story persisted so nothing is lost mid-story
    useEffect(() => {
        if (nodes.length === 0) return;
        if (finished) { setActiveStory(null); return; }
        setActiveStory({
            id: 'active', theme: storyTheme, language: quizSettings.targetLanguage,
            level: quizSettings.difficulty, nodes, chosenPath, maxTurns, date: new Date().toISOString(),
        });
    }, [nodes, chosenPath, finished]);

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
            setStoryTheme(t);
            setTotalVocab(node.vocabulary ?? []);
            setFinished(false);
        } catch (err: any) {
            setError(err?.message || 'Failed to start story. Try again.');
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
                turn,
                maxTurns
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
                addSavedStory({
                    id: `story-${Date.now()}`,
                    theme: storyTheme,
                    language: quizSettings.targetLanguage,
                    level: quizSettings.difficulty,
                    nodes: [...nodes, next],
                    chosenPath: [...chosenPath, choiceText],
                    maxTurns,
                    date: new Date().toISOString(),
                });
                import('../services/activityLog').then(m => m.logActivity(1)).catch(() => { });
            }
        } catch (err: any) {
            setError(err?.message || 'Failed to continue story. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const undoChoice = () => {
        if (nodes.length < 2 || loading) return;
        stopSpeaking();
        setSpeakingKey(null);
        setNodes(prev => prev.slice(0, -1));
        setChosenPath(prev => prev.slice(0, -1));
        setFinished(false);
        // rebuild vocab from the remaining nodes only
        const vocab: { word: string; translation: string }[] = [];
        nodes.slice(0, -1).forEach(n => (n.vocabulary ?? []).forEach(v => {
            if (!vocab.some(p => p.word === v.word)) vocab.push(v);
        }));
        setTotalVocab(vocab);
    };

    const saveAllVocab = () => {
        totalVocab.forEach(v => saveWord(v));
    };

    const reset = () => {
        stopSpeaking();
        setActiveStory(null);
        setNodes([]);
        setChosenPath([]);
        setFinished(false);
        setTheme('');
        setCustomTheme('');
        setStoryTheme('');
        setTotalVocab([]);
        setSavedKeys(new Set());
        setSpeakingKey(null);
        setError(null);
    };

    const currentNode = nodes[nodes.length - 1];

    // ── Saved-story reader ───────────────────────────────────────────────────
    if (readingSaved) {
        const s = readingSaved;
        return (
            <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
                <button onClick={() => setReadingSaved(null)} className="flex items-center gap-2 text-stone-400 hover:text-stone-800 text-sm font-bold transition-colors">
                    <ArrowLeft size={15} /> Library
                </button>
                <div>
                    <h1 className="text-2xl font-black text-stone-900 leading-tight">{s.theme}</h1>
                    <p className="text-xs text-stone-400 mt-1">{s.language} · {s.level} · {s.nodes.length} scenes · {new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="space-y-4">
                    {s.nodes.map((node: StoryNode, i: number) => (
                        <div key={i} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-3">
                            <div className="flex items-start justify-between gap-3">
                                <InteractiveText text={node.text} language={s.language} className="text-stone-800 leading-relaxed flex-1" />
                                <button onClick={() => toggleListen('r' + i, node.text)}
                                    className={cn('p-2 rounded-xl hover:bg-stone-100 shrink-0 transition-colors', speakingKey === 'r' + i ? 'bg-emerald-100 text-emerald-700' : 'text-stone-400')}>
                                    {speakingKey === 'r' + i ? <Square size={14} fill="currentColor" /> : <Volume2 size={16} />}
                                </button>
                            </div>
                            {node.translation && (
                                <p className="text-sm text-stone-400 italic border-l-2 border-stone-200 pl-3">{node.translation}</p>
                            )}
                            {(node.vocabulary ?? []).length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {node.vocabulary.map((v, vi) => (
                                        <span key={vi} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">
                                            {v.word} = {v.translation}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3">Story length</p>
                    <div className="flex gap-2 mb-6">
                        {LENGTHS.map(l => (
                            <button key={l.turns} onClick={() => setMaxTurns(l.turns)}
                                className={cn('flex-1 py-3 rounded-2xl border-2 transition-all',
                                    maxTurns === l.turns ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-stone-200 text-stone-500 hover:border-stone-300')}>
                                <p className="text-sm font-black">{l.label}</p>
                                <p className="text-[10px] font-bold opacity-60">{l.blurb}</p>
                            </button>
                        ))}
                    </div>

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

                {savedStories.length > 0 && (
                    <div>
                        <p className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            <Library size={12} /> Your stories ({savedStories.length})
                        </p>
                        <div className="space-y-2">
                            {savedStories.map((s: any) => (
                                <div key={s.id} onClick={() => setReadingSaved(s)}
                                    className="group flex items-center justify-between gap-3 bg-white rounded-2xl border border-stone-100 p-4 cursor-pointer hover:border-emerald-300 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-stone-800 text-sm truncate">{s.theme}</p>
                                        <p className="text-[11px] text-stone-400">{s.language} · {s.level} · {s.nodes.length} scenes · {new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); removeSavedStory(s.id); }}
                                        className="p-2 rounded-xl text-stone-200 hover:text-red-400 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
                <div className="flex items-center gap-3">
                    <span className={cn('text-[10px] font-black px-2 py-1 rounded-full',
                        finished ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-100 text-stone-500')}>
                        Scene {nodes.length}{finished ? '' : ` · up to ${maxTurns}`}
                    </span>
                    <button onClick={reset} className="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1">
                        <RotateCcw size={12} /> New story
                    </button>
                </div>
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
                    <p className="text-stone-400 text-sm italic">"{storyTheme}"</p>
                    <p className="text-stone-500">
                        You earned <span className="font-black text-amber-500">+50 pts</span> and learned {totalVocab.length} new words.
                        Saved to <span className="font-bold text-stone-600">Your stories</span>.
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
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-black text-stone-400 uppercase tracking-widest">What do you do?</p>
                        {nodes.length > 1 && (
                            <button onClick={undoChoice} disabled={undoing}
                                className="flex items-center gap-1 text-[11px] font-bold text-stone-400 hover:text-stone-700 transition-colors disabled:opacity-40">
                                <Undo2 size={12} /> Undo choice
                            </button>
                        )}
                    </div>
                    {currentNode.choices.map((choice, ci) => (
                        <button
                            key={choice.id ?? ci}
                            onClick={() => makeChoice(choice.text)}
                            className="w-full text-left p-4 rounded-2xl border-2 border-stone-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                        >
                            {/* plain text on purpose — interactive tokens here would swallow
                                taps (tooltip stopPropagation) and the choice would never fire */}
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
