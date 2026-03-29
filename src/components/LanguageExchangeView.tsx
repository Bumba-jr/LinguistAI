import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
    Users2, Globe, Loader2, MessageSquare, Send, ArrowLeft,
    Sparkles, RefreshCw, BookOpen, Volume2, CheckCircle2,
    AlertCircle, X, Bookmark, Target, ChevronRight,
    Settings, Bell, UserCheck, UserX, Clock, Check,
    Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Circle, StopCircle, Trash2,
} from 'lucide-react'; import { cn } from '../lib/utils';
import {
    upsertExchangeProfile, getExchangeMatches, getAllExchangeProfiles,
    getExchangeProfile, sendConnectionRequest, getIncomingRequests,
    getOutgoingRequests, getAcceptedConnections, respondToRequest,
    ExchangeProfile, ConnectionRequest,
    sendDirectMessage, getDirectMessages, getConversationId, DirectMessage,
    getLastMessagesForUser, markConversationRead, getReadAt,
    updatePresence, getOnlineUsers, sendSignal,
    hideMessageForUser, deleteMessageForAll, getHiddenMessageIds,
} from '../services/dbService';
import { supabase } from '../lib/supabase';
import { speakText } from '../services/voiceService';
import { generateChatResponse } from '../services/aiService';
import { Language, Flashcard } from '../store/useAppStore';

const LANGUAGES = ['French', 'Spanish', 'German', 'Italian', 'Japanese', 'Portuguese', 'Chinese', 'English'];
const LANG_FLAGS: Record<string, string> = {
    French: '🇫🇷', Spanish: '🇪🇸', German: '🇩🇪', Italian: '🇮🇹',
    Japanese: '🇯🇵', Portuguese: '🇵🇹', Chinese: '🇨🇳', English: '🇬🇧',
};

const AI_PARTNERS: ExchangeProfile[] = [
    { user_id: 'ai-1', display_name: 'Sophie', avatar_url: null, native_language: 'French', learning_language: 'English', bio: "Bonjour! I'm a French teacher from Lyon. I love cooking, cinema, and helping people learn French." },
    { user_id: 'ai-2', display_name: 'Carlos', avatar_url: null, native_language: 'Spanish', learning_language: 'English', bio: "Hola! From Madrid. Passionate about football, music, and Spanish culture." },
    { user_id: 'ai-3', display_name: 'Yuki', avatar_url: null, native_language: 'Japanese', learning_language: 'English', bio: "こんにちは! From Tokyo. I enjoy anime, technology, and traditional Japanese arts." },
    { user_id: 'ai-4', display_name: 'Marco', avatar_url: null, native_language: 'Italian', learning_language: 'English', bio: "Ciao! From Rome. I love Italian food, history, and art." },
    { user_id: 'ai-5', display_name: 'Luisa', avatar_url: null, native_language: 'Portuguese', learning_language: 'English', bio: "Olá! From Lisbon. Language enthusiast who loves fado music and exploring the city." },
    { user_id: 'ai-6', display_name: 'Hans', avatar_url: null, native_language: 'German', learning_language: 'English', bio: "Hallo! From Berlin. I work in tech and love hiking and German culture." },
    { user_id: 'ai-7', display_name: 'Wei', avatar_url: null, native_language: 'Chinese', learning_language: 'English', bio: "你好! From Shanghai. I love tea culture, calligraphy, and sharing Chinese traditions with the world." },
    { user_id: 'ai-8', display_name: 'Emma', avatar_url: null, native_language: 'English', learning_language: 'French', bio: "Hi! From London. I'm learning French and love travel, literature, and meeting people from different cultures." },
];

type ChatMsg = {
    role: 'user' | 'partner';
    content: string;
    translation?: string;
    correction?: { original: string; corrected: string; explanation: string } | null;
    newWords?: { word: string; translation: string }[];
};
type Difficulty = 'casual' | 'standard' | 'immersive';
type Goal = { id: string; label: string; target: number; unit: string };
type Tab = 'discover' | 'requests' | 'connections';

const GOALS: Goal[] = [
    { id: 'words', label: 'Learn 5 new words', target: 5, unit: 'words' },
    { id: 'questions', label: 'Ask 3 questions', target: 3, unit: 'questions' },
    { id: 'corrections', label: 'Get 3 corrections', target: 3, unit: 'corrections' },
    { id: 'messages', label: 'Send 8 messages', target: 8, unit: 'messages' },
];

const DIFF: Record<Difficulty, { label: string; desc: string; color: string; score: number }> = {
    casual: { label: 'Casual', desc: 'Simple sentences, translations shown', color: 'text-emerald-600', score: 20 },
    standard: { label: 'Standard', desc: 'Natural pace, occasional hints', color: 'text-amber-600', score: 50 },
    immersive: { label: 'Immersive', desc: 'No translations — full immersion', color: 'text-rose-600', score: 85 },
};

const STARTERS: Record<string, string[]> = {
    French: ["Parle-moi de ta journée.", "Qu'est-ce que tu aimes faire le week-end ?", "Quel est ton plat préféré ?", "Tu as voyagé récemment ?"],
    Spanish: ["Cuéntame sobre tu día.", "¿Qué te gusta hacer los fines de semana?", "¿Cuál es tu comida favorita?", "¿Has viajado recientemente?"],
    German: ["Erzähl mir von deinem Tag.", "Was machst du gerne am Wochenende?", "Was ist dein Lieblingsessen?", "Bist du kürzlich gereist?"],
    Italian: ["Parlami della tua giornata.", "Cosa ti piace fare nel weekend?", "Qual è il tuo piatto preferito?", "Hai viaggiato di recente?"],
    Japanese: ["今日はどんな一日でしたか？", "週末は何をするのが好きですか？", "好きな食べ物は何ですか？", "最近旅行しましたか？"],
    Portuguese: ["Fala-me sobre o teu dia.", "O que gostas de fazer ao fim de semana?", "Qual é o teu prato favorito?", "Viajaste recentemente?"],
    Chinese: ["跟我说说你今天怎么样。", "你周末喜欢做什么？", "你最喜欢的食物是什么？", "你最近旅行了吗？"],
    English: ["Tell me about your day.", "What do you like doing on weekends?", "What's your favourite food?", "Have you travelled recently?"],
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Avatar = ({ url, name, size = 40, isAI }: { url?: string | null; name: string; size?: number; isAI?: boolean }) => {
    const hue = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
    return (
        <div className="relative shrink-0">
            <div className="rounded-2xl overflow-hidden flex items-center justify-center font-black text-white"
                style={{ width: size, height: size, background: url ? undefined : `hsl(${hue},60%,50%)` }}>
                {url ? <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : name.slice(0, 2).toUpperCase()}
            </div>
            {isAI && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center"><Sparkles size={8} className="text-white" /></div>}
        </div>
    );
};

// ── Settings modal ────────────────────────────────────────────────────────────
const SettingsModal = ({ profile, onSave, onClose }: {
    profile: ExchangeProfile; onSave: (p: ExchangeProfile) => Promise<void>; onClose: () => void;
}) => {
    const [form, setForm] = useState({ ...profile });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const save = async () => {
        if (!form.bio.trim()) { setError('Bio is required.'); return; }
        setSaving(true); setError(null);
        try { await onSave(form); onClose(); }
        catch (e: any) { setError(e?.message || 'Failed to save.'); }
        finally { setSaving(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-stone-900">Profile Settings</h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400"><X size={18} /></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">I speak natively</label>
                        <select value={form.native_language} onChange={e => setForm(f => ({ ...f, native_language: e.target.value }))}
                            className="w-full px-3 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 border border-stone-100">
                            {LANGUAGES.map(l => <option key={l} value={l}>{LANG_FLAGS[l]} {l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">I'm learning</label>
                        <select value={form.learning_language} onChange={e => setForm(f => ({ ...f, learning_language: e.target.value }))}
                            className="w-full px-3 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 border border-stone-100">
                            {LANGUAGES.filter(l => l !== form.native_language).map(l => <option key={l} value={l}>{LANG_FLAGS[l]} {l}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-stone-500 mb-1.5 block">Bio <span className="text-red-400">*</span></label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                        placeholder="Tell partners about yourself and your learning goals…" rows={3}
                        className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 resize-none border border-stone-100" />
                </div>
                {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all">Cancel</button>
                    <button onClick={save} disabled={saving}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <><Check size={15} /> Save</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// ── Send request modal ────────────────────────────────────────────────────────
const SendRequestModal = ({ partner, myProfile, onSend, onClose }: {
    partner: ExchangeProfile; myProfile: ExchangeProfile; onSend: (msg: string) => Promise<void>; onClose: () => void;
}) => {
    const [message, setMessage] = useState(`Hi ${partner.display_name}! I'd love to practice ${partner.native_language} with you. I'm a native ${myProfile.native_language} speaker and can help you practice ${myProfile.native_language} in return. In exchange, I'd love your help learning ${myProfile.learning_language}!`);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const send = async () => {
        setSending(true); setError(null);
        try { await onSend(message); onClose(); }
        catch (e: any) { setError(e?.message || 'Failed to send request.'); }
        finally { setSending(false); }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 space-y-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-stone-900">Send Connection Request</h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400"><X size={18} /></button>
                </div>
                <div className="flex items-center gap-3 bg-stone-50 rounded-2xl p-3">
                    <Avatar url={partner.avatar_url} name={partner.display_name} size={40} />
                    <div>
                        <p className="font-bold text-stone-800 text-sm">{partner.display_name}</p>
                        <p className="text-xs text-stone-400">{LANG_FLAGS[partner.native_language]} Native {partner.native_language}</p>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-stone-500 mb-1.5 block">Message</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
                        className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 resize-none border border-stone-100" />
                </div>
                {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all">Cancel</button>
                    <button onClick={send} disabled={sending || !message.trim()}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                        {sending ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : <><Send size={15} /> Send Request</>}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

// ── AI-only chat (for AI partners) ───────────────────────────────────────────
const AIChat = ({ partner, myLanguage, partnerLanguage, myName, onBack }: {
    partner: ExchangeProfile; myLanguage: string; partnerLanguage: string; myName: string; onBack: () => void;
}) => {
    const { addFlashcard } = useAppStore();
    const [messages, setMessages] = useState<ChatMsg[]>([{
        role: 'partner',
        content: `${LANG_FLAGS[myLanguage]} Let's practice ${myLanguage}! Reply in ${myLanguage} — I'll correct any mistakes.`,
    }]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [difficulty, setDifficulty] = useState<Difficulty>('standard');
    const [goal, setGoal] = useState<Goal | null>(null);
    const [goalProgress, setGoalProgress] = useState(0);
    const [goalDone, setGoalDone] = useState(false);
    const [vocabList, setVocabList] = useState<{ word: string; translation: string }[]>([]);
    const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
    const [showStarters, setShowStarters] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showSetup, setShowSetup] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const starters = STARTERS[myLanguage] ?? STARTERS.English;
    const diffCfg = DIFF[difficulty];

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, sending]);

    const saveToFlashcard = (word: string, translation: string, key: string) => {
        addFlashcard({ id: `exchange-${Date.now()}-${key}`, word, translation, language: myLanguage as Language, nextReview: new Date().toISOString(), lastReviewed: null });
        setSavedIds(prev => new Set([...prev, key]));
    };

    const send = async (text?: string) => {
        const msg = (text ?? input).trim();
        if (!msg || sending) return;
        setInput(''); setShowStarters(false); setError(null);
        setMessages(prev => [...prev, { role: 'user', content: msg }]);
        setSending(true);
        try {
            const history = messages.map(m => ({ role: m.role === 'user' ? 'user' as const : 'assistant' as const, content: m.content }));
            history.push({ role: 'user', content: msg });
            const diffCtx = difficulty === 'casual' ? ' Use simple sentences and always provide English translations in brackets.'
                : difficulty === 'immersive' ? ' Use natural speech with slang. Do NOT provide translations.' : '';
            const scenario = `Language exchange: you are ${partner.display_name}, a native ${myLanguage} speaker helping ${myName} practice ${myLanguage}. Gently correct mistakes.${diffCtx}`;
            const res = await generateChatResponse(history, myLanguage as Language, scenario, diffCfg.score, 'fluency');
            setMessages(prev => [...prev, {
                role: 'partner', content: res.reply,
                translation: difficulty !== 'immersive' ? (res.translation ?? undefined) : undefined,
                correction: res.correction, newWords: res.newWords,
            }]);
            if (goal && !goalDone) {
                let delta = goal.id === 'words' ? (res.newWords?.length ?? 0)
                    : goal.id === 'corrections' ? (res.correction ? 1 : 0)
                        : goal.id === 'questions' ? (msg.includes('?') ? 1 : 0)
                            : 1;
                setGoalProgress(prev => { const n = prev + delta; if (n >= goal.target) setGoalDone(true); return Math.min(n, goal.target); });
            }
            if (res.newWords?.length) setVocabList(prev => { const ex = new Set(prev.map(v => v.word)); return [...prev, ...(res.newWords ?? []).filter(w => !ex.has(w.word))]; });
        } catch { setError('Could not get a response. Check your connection.'); }
        finally { setSending(false); }
    };

    if (showSetup) return (
        <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={onBack} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400"><ArrowLeft size={18} /></button>
                <Avatar url={partner.avatar_url} name={partner.display_name} size={40} isAI />
                <div><p className="font-bold text-stone-800">Session with {partner.display_name}</p><p className="text-xs text-stone-400">{LANG_FLAGS[myLanguage]} AI Practice</p></div>
            </div>
            <div className="space-y-2">
                <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Difficulty</p>
                {(Object.entries(DIFF) as [Difficulty, typeof DIFF[Difficulty]][]).map(([key, cfg]) => (
                    <button key={key} onClick={() => setDifficulty(key)}
                        className={cn('w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all',
                            difficulty === key ? 'border-indigo-400 bg-indigo-50' : 'border-stone-100 bg-white hover:border-stone-200')}>
                        <div className="flex-1"><p className={cn('text-sm font-bold', difficulty === key ? 'text-indigo-700' : 'text-stone-700')}>{cfg.label}</p><p className="text-xs text-stone-400">{cfg.desc}</p></div>
                        {difficulty === key && <CheckCircle2 size={16} className="text-indigo-500" />}
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between"><p className="text-xs font-black text-stone-400 uppercase tracking-widest">Session Goal</p><span className="text-xs text-stone-300">(optional)</span></div>
                <div className="grid grid-cols-2 gap-2">
                    {GOALS.map(g => (
                        <button key={g.id} onClick={() => setGoal(goal?.id === g.id ? null : g)}
                            className={cn('p-3 rounded-2xl border-2 text-left transition-all', goal?.id === g.id ? 'border-indigo-400 bg-indigo-50' : 'border-stone-100 bg-white hover:border-stone-200')}>
                            <p className={cn('text-xs font-bold', goal?.id === g.id ? 'text-indigo-700' : 'text-stone-700')}>{g.label}</p>
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={() => setShowSetup(false)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                <MessageSquare size={16} /> Start Session
            </button>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-180px)] min-h-[500px]">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <button onClick={onBack} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400"><ArrowLeft size={18} /></button>
                <Avatar url={partner.avatar_url} name={partner.display_name} size={36} isAI />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 text-sm">{partner.display_name}</p>
                    <span className={cn('text-[10px] font-bold', diffCfg.color)}>{diffCfg.label} · AI Partner</span>
                </div>
            </div>
            {goal && (
                <div className="py-2 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                        <span className={cn('flex items-center gap-1', goalDone ? 'text-emerald-600' : 'text-stone-400')}><Target size={10} /> {goal.label}{goalDone ? ' ✓' : ''}</span>
                        <span className={goalDone ? 'text-emerald-600' : 'text-stone-400'}>{goalProgress}/{goal.target}</span>
                    </div>
                    <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                        <motion.div className={cn('h-full rounded-full', goalDone ? 'bg-emerald-500' : 'bg-indigo-500')} animate={{ width: `${Math.min((goalProgress / goal.target) * 100, 100)}%` }} transition={{ duration: 0.4 }} />
                    </div>
                </div>
            )}
            <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
                {showStarters && messages.length <= 1 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center">Conversation starters</p>
                        {starters.map((s, i) => (
                            <button key={i} onClick={() => send(s)} className="w-full text-left px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-2xl text-sm text-indigo-700 font-medium transition-all flex items-center justify-between group">
                                <span>{s}</span><ChevronRight size={13} className="text-indigo-400 opacity-0 group-hover:opacity-100 shrink-0" />
                            </button>
                        ))}
                        <button onClick={() => setShowStarters(false)} className="text-xs text-stone-400 hover:text-stone-600 w-full text-center">Dismiss</button>
                    </motion.div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={cn('flex gap-2', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                        {msg.role === 'partner' && <Avatar url={partner.avatar_url} name={partner.display_name} size={30} isAI />}
                        <div className={cn('max-w-[80%] space-y-1.5', msg.role === 'user' ? 'items-end flex flex-col' : 'items-start')}>
                            <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed', msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-stone-100 shadow-sm text-stone-800 rounded-tl-sm')}>{msg.content}</div>
                            {msg.translation && msg.role === 'partner' && <p className="text-xs text-stone-400 italic px-1">{msg.translation}</p>}
                            {msg.correction && (
                                <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs space-y-0.5">
                                    <p className="font-bold text-amber-700">Correction</p>
                                    <p className="text-stone-500"><span className="line-through text-red-400">{msg.correction.original}</span>{' → '}<span className="font-bold text-emerald-600">{msg.correction.corrected}</span></p>
                                    <p className="text-stone-400">{msg.correction.explanation}</p>
                                </div>
                            )}
                            {msg.newWords && msg.newWords.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {msg.newWords.map((w, wi) => {
                                        const key = `${i}-${wi}`; const saved = savedIds.has(key); return (
                                            <button key={wi} onClick={() => !saved && saveToFlashcard(w.word, w.translation, key)}
                                                className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 transition-all', saved ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100')}>
                                                {w.word} = {w.translation}<Bookmark size={8} className={saved ? 'fill-emerald-600' : ''} />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                            {msg.role === 'partner' && <button onClick={() => speakText(msg.content, myLanguage)} className="text-stone-300 hover:text-stone-500 p-1"><Volume2 size={12} /></button>}
                        </div>
                    </div>
                ))}
                {sending && (
                    <div className="flex gap-2">
                        <Avatar url={partner.avatar_url} name={partner.display_name} size={30} isAI />
                        <div className="bg-white border border-stone-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
                            <div className="flex gap-1 items-center h-4">{[0, 1, 2].map(i => <motion.div key={i} className="w-1.5 h-1.5 bg-stone-300 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}</div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            {error && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-3 py-2 text-xs mb-2"><AlertCircle size={13} className="shrink-0" /><span className="flex-1">{error}</span><button onClick={() => setError(null)}><X size={12} /></button></div>}
            <div className="flex gap-2 pt-2 border-t border-stone-100">
                <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-2xl px-4 border border-stone-100 focus-within:ring-2 focus-within:ring-indigo-200">
                    <span className="text-base">{LANG_FLAGS[myLanguage] || '🌐'}</span>
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder={`Reply in ${myLanguage}…`} className="flex-1 py-3 bg-transparent text-sm focus:outline-none text-stone-800" />
                </div>
                <button onClick={() => send()} disabled={!input.trim() || sending} className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-40 shrink-0"><Send size={18} /></button>
            </div>
            {vocabList.length > 0 && (
                <div className="mt-2 pt-2 border-t border-stone-100">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1.5">Words this session — tap to save</p>
                    <div className="flex flex-wrap gap-1.5">{vocabList.map((v, i) => {
                        const key = `vocab-${i}`; const saved = savedIds.has(key); return (
                            <button key={i} onClick={() => !saved && saveToFlashcard(v.word, v.translation, key)} className={cn('text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 transition-all', saved ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100')}>
                                {v.word} = {v.translation}<Bookmark size={8} className={saved ? 'fill-emerald-600' : ''} />
                            </button>
                        );
                    })}</div>
                </div>
            )}
        </div>
    );
};

// ── WebRTC hook ───────────────────────────────────────────────────────────────
function useWebRTC(conversationId: string, myId: string, partnerId: string) {
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const [callState, setCallState] = useState<'idle' | 'calling' | 'incoming' | 'connected'>('idle');
    const [callMode, setCallMode] = useState<'audio' | 'video'>('audio');
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCamOff, setIsCamOff] = useState(false);
    const [incomingOffer, setIncomingOffer] = useState<RTCSessionDescriptionInit | null>(null);
    const [incomingMode, setIncomingMode] = useState<'audio' | 'video'>('audio');
    const [recording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const recorderRef = useRef<MediaRecorder | null>(null);

    const ICE_SERVERS = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };

    const createPC = () => {
        const pc = new RTCPeerConnection(ICE_SERVERS);
        pc.onicecandidate = (e) => {
            if (e.candidate) sendSignal(conversationId, myId, partnerId, 'ice-candidate', { candidate: e.candidate }).catch(() => { });
        };
        pc.ontrack = (e) => {
            setRemoteStream(e.streams[0]);
        };
        pc.onconnectionstatechange = () => {
            if (pc.connectionState === 'connected') setCallState('connected');
            if (['disconnected', 'failed', 'closed'].includes(pc.connectionState)) hangUp();
        };
        pcRef.current = pc;
        return pc;
    };

    const getMedia = async (video: boolean) => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
        localStreamRef.current = stream;
        setLocalStream(stream);
        return stream;
    };

    const startCall = async (mode: 'audio' | 'video') => {
        setCallMode(mode);
        setCallState('calling');
        const stream = await getMedia(mode === 'video');
        const pc = createPC();
        stream.getTracks().forEach(t => pc.addTrack(t, stream));
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        await sendSignal(conversationId, myId, partnerId, 'offer', { sdp: offer, mode });
    };

    const answerCall = async () => {
        if (!incomingOffer) return;
        setCallMode(incomingMode);
        setCallState('connected');
        const stream = await getMedia(incomingMode === 'video');
        const pc = createPC();
        stream.getTracks().forEach(t => pc.addTrack(t, stream));
        await pc.setRemoteDescription(new RTCSessionDescription(incomingOffer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await sendSignal(conversationId, myId, partnerId, 'answer', { sdp: answer });
    };

    const hangUp = () => {
        sendSignal(conversationId, myId, partnerId, 'call-end', {}).catch(() => { });
        pcRef.current?.close();
        pcRef.current = null;
        localStreamRef.current?.getTracks().forEach(t => t.stop());
        localStreamRef.current = null;
        setLocalStream(null);
        setRemoteStream(null);
        setCallState('idle');
        setIncomingOffer(null);
        stopRecording();
    };

    const rejectCall = () => {
        sendSignal(conversationId, myId, partnerId, 'call-reject', {}).catch(() => { });
        setCallState('idle');
        setIncomingOffer(null);
    };

    const toggleMute = () => {
        localStreamRef.current?.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
        setIsMuted(m => !m);
    };

    const toggleCam = () => {
        localStreamRef.current?.getVideoTracks().forEach(t => { t.enabled = !t.enabled; });
        setIsCamOff(c => !c);
    };

    const startRecording = () => {
        const stream = localStreamRef.current;
        if (!stream) return;
        const chunks: Blob[] = [];
        const mr = new MediaRecorder(stream);
        mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
        mr.onstop = () => setRecordedChunks(chunks);
        mr.start();
        recorderRef.current = mr;
        setRecording(true);
    };

    const stopRecording = () => {
        recorderRef.current?.stop();
        recorderRef.current = null;
        setRecording(false);
    };

    const downloadRecording = () => {
        if (!recordedChunks.length) return;
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `call-${Date.now()}.webm`; a.click();
        URL.revokeObjectURL(url);
        setRecordedChunks([]);
    };

    // Listen for signals
    useEffect(() => {
        const channel = supabase
            .channel(`webrtc_${conversationId}_${myId}`)
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'webrtc_signals',
                filter: `to_user_id=eq.${myId}`,
            }, async (payload: any) => {
                const sig = payload.new;
                if (sig.conversation_id !== conversationId) return;
                if (sig.type === 'offer') {
                    setIncomingOffer(sig.payload.sdp);
                    setIncomingMode(sig.payload.mode ?? 'audio');
                    setCallState('incoming');
                } else if (sig.type === 'answer' && pcRef.current) {
                    await pcRef.current.setRemoteDescription(new RTCSessionDescription(sig.payload.sdp));
                    setCallState('connected');
                } else if (sig.type === 'ice-candidate' && pcRef.current) {
                    try { await pcRef.current.addIceCandidate(new RTCIceCandidate(sig.payload.candidate)); } catch { /* ignore */ }
                } else if (sig.type === 'call-end' || sig.type === 'call-reject') {
                    pcRef.current?.close(); pcRef.current = null;
                    localStreamRef.current?.getTracks().forEach(t => t.stop());
                    localStreamRef.current = null;
                    setLocalStream(null); setRemoteStream(null);
                    setCallState('idle'); setIncomingOffer(null);
                }
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [conversationId, myId]);

    return { callState, callMode, localStream, remoteStream, isMuted, isCamOff, recording, recordedChunks, incomingMode, startCall, answerCall, hangUp, rejectCall, toggleMute, toggleCam, startRecording, stopRecording, downloadRecording };
}

// ── Call overlay ──────────────────────────────────────────────────────────────
const CallOverlay = ({ call, partner }: { call: ReturnType<typeof useWebRTC>; partner: ExchangeProfile }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localVideoRef.current && call.localStream) localVideoRef.current.srcObject = call.localStream;
    }, [call.localStream]);

    useEffect(() => {
        if (remoteVideoRef.current && call.remoteStream) remoteVideoRef.current.srcObject = call.remoteStream;
    }, [call.remoteStream]);

    // Incoming call screen
    if (call.callState === 'incoming') return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-8 text-center space-y-5 w-80 shadow-2xl">
                <div className="relative mx-auto w-20 h-20">
                    <Avatar url={partner.avatar_url} name={partner.display_name} size={80} />
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.2 }}
                        className="absolute inset-0 rounded-2xl border-4 border-indigo-400 opacity-60" />
                </div>
                <div>
                    <p className="font-black text-stone-900 text-lg">{partner.display_name}</p>
                    <p className="text-stone-400 text-sm">Incoming {call.incomingMode} call…</p>
                </div>
                <div className="flex gap-4 justify-center">
                    <button onClick={call.rejectCall} className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg">
                        <PhoneOff size={22} />
                    </button>
                    <button onClick={call.answerCall} className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg">
                        <Phone size={22} />
                    </button>
                </div>
            </motion.div>
        </div>
    );

    // Calling / connected screen
    if (call.callState === 'calling' || call.callState === 'connected') return (
        <div className="fixed inset-0 bg-stone-900 z-50 flex flex-col">
            {/* Video area */}
            {call.callMode === 'video' ? (
                <div className="flex-1 relative bg-black">
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <video ref={localVideoRef} autoPlay playsInline muted className="absolute bottom-4 right-4 w-32 h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg" />
                    {call.callState === 'calling' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
                            <Avatar url={partner.avatar_url} name={partner.display_name} size={80} />
                            <p className="font-bold text-lg">{partner.display_name}</p>
                            <p className="text-white/60 text-sm">Calling…</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 to-stone-900 text-white space-y-4">
                    <Avatar url={partner.avatar_url} name={partner.display_name} size={96} />
                    <p className="font-black text-xl">{partner.display_name}</p>
                    <p className="text-white/60">{call.callState === 'calling' ? 'Calling…' : 'Connected'}</p>
                    {call.callState === 'connected' && (
                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                            className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" /> Live
                        </motion.div>
                    )}
                </div>
            )}

            {/* Controls */}
            <div className="bg-stone-900/95 backdrop-blur-sm px-6 py-5 flex items-center justify-center gap-4">
                <button onClick={call.toggleMute}
                    className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all', call.isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20')}>
                    {call.isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                {call.callMode === 'video' && (
                    <button onClick={call.toggleCam}
                        className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all', call.isCamOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20')}>
                        {call.isCamOff ? <VideoOff size={20} /> : <Video size={20} />}
                    </button>
                )}
                <button onClick={call.recording ? call.stopRecording : call.startRecording}
                    className={cn('w-12 h-12 rounded-full flex items-center justify-center transition-all', call.recording ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white hover:bg-white/20')}>
                    {call.recording ? <StopCircle size={20} /> : <Circle size={20} />}
                </button>
                {call.recordedChunks.length > 0 && (
                    <button onClick={call.downloadRecording} className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-all text-xs font-bold">
                        Save
                    </button>
                )}
                <button onClick={call.hangUp} className="w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-lg">
                    <PhoneOff size={22} />
                </button>
            </div>
        </div>
    );

    return null;
};

// ── Voice message player ──────────────────────────────────────────────────────
const VoiceMessage = ({ src, isMe }: { src: string; isMe: boolean }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (playing) { a.pause(); } else { a.play(); }
    };

    const fmt = (s: number) =>
        `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

    const barColor = isMe ? 'bg-white/40' : 'bg-indigo-200';
    const fillColor = isMe ? 'bg-white' : 'bg-indigo-500';
    const textColor = isMe ? 'text-white/70' : 'text-stone-400';
    const btnBg = isMe ? 'bg-white/20 hover:bg-white/30' : 'bg-indigo-50 hover:bg-indigo-100';
    const btnIcon = isMe ? 'text-white' : 'text-indigo-600';

    return (
        <div className={cn('flex items-center gap-3 px-3 py-2.5 rounded-2xl min-w-[200px] max-w-[260px]',
            isMe ? 'bg-indigo-600 rounded-tr-sm' : 'bg-white border border-stone-100 shadow-sm rounded-tl-sm')}>
            <audio ref={audioRef} src={src}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => { setPlaying(false); setProgress(0); }}
                onTimeUpdate={() => { const a = audioRef.current; if (a) setProgress(a.currentTime / (a.duration || 1)); }}
                onLoadedMetadata={() => { const a = audioRef.current; if (a) setDuration(a.duration); }}
            />
            {/* Play/pause button */}
            <button onClick={toggle}
                className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all', btnBg)}>
                {playing
                    ? <span className={cn('flex gap-0.5', btnIcon)}><span className="w-1 h-3 rounded-full bg-current" /><span className="w-1 h-3 rounded-full bg-current" /></span>
                    : <svg viewBox="0 0 24 24" className={cn('w-4 h-4', btnIcon)} fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                }
            </button>
            {/* Waveform progress bar */}
            <div className="flex-1 space-y-1">
                <div className={cn('h-1.5 rounded-full overflow-hidden', barColor)}>
                    <div className={cn('h-full rounded-full transition-all', fillColor)}
                        style={{ width: `${progress * 100}%` }} />
                </div>
                <p className={cn('text-[10px] font-bold', textColor)}>
                    {duration > 0 ? fmt(progress * duration) + ' / ' + fmt(duration) : '🎤 Voice'}
                </p>
            </div>
        </div>
    );
};

// ── Direct chat (real user ↔ real user) ──────────────────────────────────────
const DirectChat = ({ partner, myId, myName, myAvatar, onBack, onlineUsers }: {
    partner: ExchangeProfile; myId: string; myName: string; myAvatar: string | null; onBack: () => void;
    onlineUsers: Set<string>;
}) => {
    const conversationId = getConversationId(myId, partner.user_id);
    const [messages, setMessages] = useState<DirectMessage[]>([]);
    const [input, setInput] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingSeconds, setRecordingSeconds] = useState(0);
    const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
    const [contextMenu, setContextMenu] = useState<{ msgId: string; x: number; y: number; isMine: boolean } | null>(null);
    // Load history on mount + mark as read
    useEffect(() => {
        getDirectMessages(conversationId).then(setMessages).catch(() => { });
        markConversationRead(conversationId);
        getHiddenMessageIds(myId, conversationId).then(setHiddenIds).catch(() => { });
    }, [conversationId]);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel(`dm_${conversationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'direct_messages',
                filter: `conversation_id=eq.${conversationId}`,
            }, (payload) => {
                const incoming = payload.new as DirectMessage;
                setMessages(prev => {
                    // If sender sees their own message come back, replace the optimistic temp entry
                    const tempIdx = prev.findIndex(m => m.id.startsWith('temp-') && m.sender_id === incoming.sender_id && m.content === incoming.content);
                    if (tempIdx !== -1) {
                        const updated = [...prev];
                        updated[tempIdx] = incoming;
                        return updated;
                    }
                    if (prev.some(m => m.id === incoming.id)) return prev;
                    return [...prev, incoming];
                });
                // Sound + system notification for messages from the other person
                if (incoming.sender_id !== myId) {
                    markConversationRead(conversationId);
                    // Play a soft notification sound
                    try {
                        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain); gain.connect(ctx.destination);
                        osc.frequency.setValueAtTime(880, ctx.currentTime);
                        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
                        gain.gain.setValueAtTime(0.3, ctx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                        osc.start(ctx.currentTime);
                        osc.stop(ctx.currentTime + 0.3);
                    } catch { /* audio not available */ }
                    // System notification
                    if (Notification.permission === 'granted') {
                        new Notification(`${incoming.sender_name}`, {
                            body: incoming.content,
                            icon: incoming.sender_avatar ?? undefined,
                            tag: `dm-${conversationId}`,
                        });
                    } else if (Notification.permission === 'default') {
                        Notification.requestPermission();
                    }
                }
            })
            .on('postgres_changes', {
                event: 'DELETE',
                schema: 'public',
                table: 'direct_messages',
                filter: `conversation_id=eq.${conversationId}`,
            }, (payload) => {
                setMessages(prev => prev.filter(m => m.id !== (payload.old as any).id));
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [conversationId, myId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const chunks: Blob[] = [];
            const mr = new MediaRecorder(stream);
            mr.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
            mr.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                setVoiceBlob(new Blob(chunks, { type: 'audio/webm' }));
                setIsRecording(false);
                if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
            };
            mr.start();
            mediaRecorderRef.current = mr;
            setIsRecording(true);
            setRecordingSeconds(0);
            setVoiceBlob(null);
            recordingTimerRef.current = setInterval(() => setRecordingSeconds(s => s + 1), 1000);
        } catch {
            setError('Microphone access denied.');
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current = null;
        if (recordingTimerRef.current) { clearInterval(recordingTimerRef.current); recordingTimerRef.current = null; }
    };

    const cancelRecording = () => {
        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current = null;
        if (recordingTimerRef.current) { clearInterval(recordingTimerRef.current); recordingTimerRef.current = null; }
        setIsRecording(false);
        setVoiceBlob(null);
        setRecordingSeconds(0);
    };

    const sendVoiceMessage = async () => {
        if (!voiceBlob) return;
        // Convert blob to base64 data URL and send as a special message
        const reader = new FileReader();
        reader.onloadend = async () => {
            const dataUrl = reader.result as string;
            const content = `🎤 [voice:${dataUrl}]`;
            const optimistic: DirectMessage = {
                id: `temp-${Date.now()}`,
                conversation_id: conversationId,
                sender_id: myId,
                sender_name: myName,
                sender_avatar: myAvatar,
                content,
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, optimistic]);
            setVoiceBlob(null);
            setSending(true);
            try {
                await sendDirectMessage(conversationId, myId, myName, myAvatar, content);
            } catch {
                setError('Failed to send voice message.');
                setMessages(prev => prev.filter(m => m.id !== optimistic.id));
            } finally { setSending(false); }
        };
        reader.readAsDataURL(voiceBlob);
    };

    const send = async () => {
        const text = input.trim();
        if (!text || sending) return;
        setInput('');
        setError(null);
        // Optimistic update
        const optimistic: DirectMessage = {
            id: `temp-${Date.now()}`,
            conversation_id: conversationId,
            sender_id: myId,
            sender_name: myName,
            sender_avatar: myAvatar,
            content: text,
            created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, optimistic]);
        setSending(true);
        try {
            await sendDirectMessage(conversationId, myId, myName, myAvatar, text);
        } catch (e: any) {
            setError('Failed to send. Try again.');
            // Remove optimistic message on failure
            setMessages(prev => prev.filter(m => m.id !== optimistic.id));
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-180px)] min-h-[500px]">
            {/* Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <button onClick={onBack} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400 transition-all">
                    <ArrowLeft size={18} />
                </button>
                <Avatar url={partner.avatar_url} name={partner.display_name} size={36} />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-800 text-sm">{partner.display_name}</p>
                    <p className="text-[10px] font-bold flex items-center gap-1">
                        <span className={cn('w-1.5 h-1.5 rounded-full inline-block', onlineUsers.has(partner.user_id) ? 'bg-emerald-500' : 'bg-stone-300')} />
                        <span className={onlineUsers.has(partner.user_id) ? 'text-emerald-600' : 'text-stone-400'}>
                            {onlineUsers.has(partner.user_id) ? 'Online' : 'Offline'}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="text-stone-400">{LANG_FLAGS[partner.native_language]} Native {partner.native_language}</span>
                    </p>
                </div>
                {/* Call buttons */}
                <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => (window as any).__startCall?.(partner.user_id, partner.display_name, partner.avatar_url, 'audio')}
                        title="Audio call"
                        className="p-2 rounded-xl hover:bg-emerald-50 text-stone-400 hover:text-emerald-600 transition-all">
                        <Phone size={17} />
                    </button>
                    <button onClick={() => (window as any).__startCall?.(partner.user_id, partner.display_name, partner.avatar_url, 'video')}
                        title="Video call"
                        className="p-2 rounded-xl hover:bg-indigo-50 text-stone-400 hover:text-indigo-600 transition-all">
                        <Video size={17} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                {messages.length === 0 && (
                    <div className="text-center py-12 text-stone-400 space-y-2">
                        <MessageSquare size={32} className="mx-auto text-stone-200" />
                        <p className="text-sm font-medium">Start the conversation!</p>
                        <p className="text-xs">Messages are delivered in real time.</p>
                    </div>
                )}
                {messages.map((msg) => {
                    const isMe = msg.sender_id === myId;
                    const isVoice = msg.content.startsWith('🎤 [voice:') && msg.content.endsWith(']');
                    const voiceSrc = isVoice ? msg.content.slice('🎤 [voice:'.length, -1) : null;
                    if (hiddenIds.has(msg.id)) return null; // hidden for me
                    return (
                        <div key={msg.id} className={cn('flex gap-2 group', isMe ? 'flex-row-reverse' : 'flex-row')}>
                            {!isMe && <Avatar url={msg.sender_avatar} name={msg.sender_name} size={30} />}
                            <div className={cn('max-w-[80%] space-y-0.5', isMe ? 'items-end flex flex-col' : 'items-start')}>
                                {!isMe && <p className="text-[10px] text-stone-400 font-bold px-1">{msg.sender_name}</p>}
                                <div className="relative"
                                    onContextMenu={e => { e.preventDefault(); setContextMenu({ msgId: msg.id, x: e.clientX, y: e.clientY, isMine: isMe }); }}>
                                    {isVoice && voiceSrc ? (
                                        <VoiceMessage src={voiceSrc} isMe={isMe} />
                                    ) : (
                                        <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed',
                                            isMe ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-stone-100 shadow-sm text-stone-800 rounded-tl-sm')}>
                                            {msg.content}
                                        </div>
                                    )}
                                    {/* Delete button on hover */}
                                    <button
                                        onClick={() => setContextMenu({ msgId: msg.id, x: 0, y: 0, isMine: isMe })}
                                        className={cn('absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-400',
                                            isMe ? '-left-7' : '-right-7')}>
                                        <Trash2 size={11} />
                                    </button>
                                </div>
                                <p className="text-[9px] text-stone-300 px-1">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* Context menu for message deletion */}
            <AnimatePresence>
                {contextMenu && (
                    <>
                        {/* Backdrop to close */}
                        <div className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="fixed z-50 bg-white rounded-2xl shadow-xl border border-stone-100 py-1.5 min-w-[180px]"
                            style={contextMenu.x > 0
                                ? { top: Math.min(contextMenu.y, window.innerHeight - 120), left: Math.min(contextMenu.x, window.innerWidth - 200) }
                                : { bottom: 120, right: 16 }}
                        >
                            <button
                                onClick={async () => {
                                    const id = contextMenu.msgId;
                                    setContextMenu(null);
                                    setHiddenIds(prev => new Set([...prev, id]));
                                    await hideMessageForUser(id, myId).catch(() => { });
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-all"
                            >
                                <Trash2 size={14} className="text-stone-400" />
                                Delete for me
                            </button>
                            {contextMenu.isMine && (
                                <button
                                    onClick={async () => {
                                        const id = contextMenu.msgId;
                                        setContextMenu(null);
                                        setMessages(prev => prev.filter(m => m.id !== id));
                                        await deleteMessageForAll(id, myId).catch(() => { });
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all"
                                >
                                    <Trash2 size={14} className="text-red-500" />
                                    Delete for everyone
                                </button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-3 py-2 text-xs mb-2">
                    <AlertCircle size={13} className="shrink-0" /><span className="flex-1">{error}</span>
                    <button onClick={() => setError(null)}><X size={12} /></button>
                </div>
            )}

            {/* Input */}
            <div className="pt-3 border-t border-stone-100 space-y-2">
                {/* Voice recording preview */}
                {voiceBlob && !isRecording && (
                    <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-2xl px-3 py-2">
                        <audio controls src={URL.createObjectURL(voiceBlob)} className="flex-1 h-8" style={{ minWidth: 0 }} />
                        <button onClick={sendVoiceMessage} disabled={sending}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all disabled:opacity-40 shrink-0">
                            Send
                        </button>
                        <button onClick={cancelRecording}
                            className="p-1.5 text-stone-400 hover:text-red-500 transition-all shrink-0">
                            <X size={14} />
                        </button>
                    </div>
                )}
                {/* Recording indicator */}
                {isRecording && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-2.5">
                        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2.5 h-2.5 bg-red-500 rounded-full shrink-0" />
                        <span className="text-sm text-red-600 font-bold flex-1">
                            Recording… {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:{String(recordingSeconds % 60).padStart(2, '0')}
                        </span>
                        <button onClick={stopRecording}
                            className="px-3 py-1.5 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all">
                            Stop
                        </button>
                        <button onClick={cancelRecording} className="p-1.5 text-red-400 hover:text-red-600 transition-all">
                            <X size={14} />
                        </button>
                    </div>
                )}
                {/* Text input row */}
                {!isRecording && !voiceBlob && (
                    <div className="flex gap-2">
                        <input value={input} onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                            placeholder={`Message ${partner.display_name}…`}
                            className="flex-1 px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 border border-stone-100" />
                        <button onClick={startRecording}
                            className="w-12 h-12 bg-stone-100 text-stone-500 rounded-2xl flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-all shrink-0"
                            title="Record voice message">
                            <Mic size={18} />
                        </button>
                        <button onClick={send} disabled={!input.trim() || sending}
                            className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all disabled:opacity-40 shrink-0">
                            {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Main view ─────────────────────────────────────────────────────────────────
const LanguageExchangeView = () => {
    const { user, quizSettings } = useAppStore();
    const myId = (user as any)?.id;
    const displayName = (user as any)?.displayName || (user as any)?.email?.split('@')[0] || 'Anonymous';
    const avatarUrl = (user as any)?.avatarUrl || null;

    const [myProfile, setMyProfile] = useState<ExchangeProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [tab, setTab] = useState<Tab>('discover');
    const [discover, setDiscover] = useState<ExchangeProfile[]>([]);
    const [incoming, setIncoming] = useState<ConnectionRequest[]>([]);
    const [outgoing, setOutgoing] = useState<ConnectionRequest[]>([]);
    const [connections, setConnections] = useState<ConnectionRequest[]>([]);
    const [convPreviews, setConvPreviews] = useState<Record<string, { content: string; created_at: string; unread: number; sender_id: string }>>({});
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const [languageFilter, setLanguageFilter] = useState<string>('All');
    const [bioExpanded, setBioExpanded] = useState<Set<string>>(new Set());
    const [showSettings, setShowSettings] = useState(false);
    const [requestTarget, setRequestTarget] = useState<ExchangeProfile | null>(null);
    const [chatPartner, setChatPartner] = useState<ExchangeProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Load profile on mount
    useEffect(() => {
        if (!myId) { setProfileLoading(false); return; }
        getExchangeProfile(myId).then(p => { setMyProfile(p); setProfileLoading(false); }).catch(() => setProfileLoading(false));
    }, [myId]);

    // Load data when profile exists
    useEffect(() => { if (myProfile) loadAll(); }, [myProfile]);

    // ── Supabase Presence — real-time online/offline tracking ──────────────────
    useEffect(() => {
        if (!myId) return;
        const presenceChannel = supabase.channel('exchange_presence', {
            config: { presence: { key: myId } },
        });

        presenceChannel
            .on('presence', { event: 'sync' }, () => {
                const state = presenceChannel.presenceState();
                // state is { [key: userId]: [{ user_id, ... }] }
                setOnlineUsers(new Set(Object.keys(state)));
            })
            .on('presence', { event: 'join' }, ({ key }) => {
                setOnlineUsers(prev => new Set([...prev, key]));
            })
            .on('presence', { event: 'leave' }, ({ key }) => {
                setOnlineUsers(prev => { const next = new Set(prev); next.delete(key); return next; });
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    // Announce this user as online
                    await presenceChannel.track({ user_id: myId, online_at: new Date().toISOString() });
                }
            });

        return () => {
            presenceChannel.untrack();
            supabase.removeChannel(presenceChannel);
        };
    }, [myId]);

    // Realtime subscription — update requests instantly when anything changes
    useEffect(() => {
        if (!myId) return;
        const channel = supabase
            .channel(`exchange_requests_${myId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'exchange_requests',
                filter: `to_user_id=eq.${myId}`,
            }, () => {
                // Incoming request changed — refresh requests + connections
                getIncomingRequests(myId).then(setIncoming).catch(() => { });
                getAcceptedConnections(myId).then(setConnections).catch(() => { });
            })
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'exchange_requests',
                filter: `from_user_id=eq.${myId}`,
            }, () => {
                // Outgoing request status changed (e.g. accepted/declined by other user)
                getOutgoingRequests(myId).then(setOutgoing).catch(() => { });
                getAcceptedConnections(myId).then(setConnections).catch(() => { });
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [myId]);

    // Realtime DM preview updates — refresh unread counts when new messages arrive
    useEffect(() => {
        if (!myId) return;
        const channel = supabase
            .channel(`dm_previews_${myId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'direct_messages',
            }, (payload: any) => {
                const msg = payload.new;
                if (!msg?.conversation_id) return;
                // Only update if this conversation involves me
                const parts = msg.conversation_id.split('__');
                if (!parts.includes(myId)) return;
                // Update preview in state
                setConvPreviews(prev => {
                    const existing = prev[msg.conversation_id];
                    const readAt = getReadAt(msg.conversation_id);
                    const isUnread = msg.sender_id !== myId && (!readAt || new Date(msg.created_at) > new Date(readAt));
                    return {
                        ...prev,
                        [msg.conversation_id]: {
                            content: msg.content,
                            created_at: msg.created_at,
                            sender_id: msg.sender_id,
                            unread: isUnread ? (existing?.unread ?? 0) + 1 : (existing?.unread ?? 0),
                        },
                    };
                });
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [myId]);

    const loadAll = async () => {
        if (!myId || !myProfile) return;
        setLoading(true); setError(null);
        try {
            const [matches, all, inc, out, conn] = await Promise.all([
                getExchangeMatches(myId, myProfile.native_language, myProfile.learning_language).catch(() => []),
                getAllExchangeProfiles(myId).catch(() => []),
                getIncomingRequests(myId).catch(() => []),
                getOutgoingRequests(myId).catch(() => []),
                getAcceptedConnections(myId).catch(() => []),
            ]);
            // Merge real users: matched first, then all others
            const seen = new Set(matches.map((p: ExchangeProfile) => p.user_id));
            const merged = [...matches, ...all.filter((p: ExchangeProfile) => !seen.has(p.user_id))];
            // Add all AI partners (not just the learning language match)
            const realIds = new Set(merged.map(p => p.user_id));
            setDiscover([...merged, ...AI_PARTNERS.filter(p => !realIds.has(p.user_id))]);
            setIncoming(inc);
            setOutgoing(out);
            setConnections(conn);
            // Load last message + unread for each connection
            if (conn.length > 0) {
                const convIds = conn.map((c: ConnectionRequest) => getConversationId(myId, c.from_user_id === myId ? c.to_user_id : c.from_user_id));
                getLastMessagesForUser(myId, convIds).then(setConvPreviews).catch(() => { });
            }
        } catch (e: any) {
            setError(e?.message || 'Failed to load data.');
        } finally { setLoading(false); }
    };

    const saveProfile = async (p: ExchangeProfile) => {
        await upsertExchangeProfile(p);
        setMyProfile(p);
        loadAll();
    };

    const handleSendRequest = async (partner: ExchangeProfile, message: string) => {
        if (!myId || !myProfile) return;
        await sendConnectionRequest(myId, partner.user_id, myProfile, partner, message);
        setRequestTarget(null);
        loadAll();
    };

    const handleRespond = async (requestId: string, status: 'accepted' | 'declined') => {
        await respondToRequest(requestId, status);
        loadAll();
    };

    // Get connection status for a user
    const getStatus = (userId: string) => {
        if (outgoing.some(r => r.to_user_id === userId && r.status === 'pending')) return 'pending';
        if (outgoing.some(r => r.to_user_id === userId && r.status === 'accepted')) return 'connected';
        if (connections.some(r => r.from_user_id === userId || r.to_user_id === userId)) return 'connected';
        return 'none';
    };

    // If chatting with AI partner
    if (chatPartner && chatPartner.user_id.startsWith('ai-')) {
        return (
            <div className="max-w-2xl mx-auto py-6 px-4">
                <AIChat partner={chatPartner} myLanguage={myProfile?.learning_language ?? quizSettings.targetLanguage}
                    partnerLanguage={myProfile?.native_language ?? 'English'} myName={displayName} onBack={() => setChatPartner(null)} />
            </div>
        );
    }

    // If chatting with a real connected user — real-time direct messages
    if (chatPartner && !chatPartner.user_id.startsWith('ai-') && myId) {
        return (
            <div className="max-w-2xl mx-auto py-6 px-4">
                <DirectChat
                    partner={chatPartner}
                    myId={myId}
                    myName={displayName}
                    myAvatar={avatarUrl}
                    onlineUsers={onlineUsers}
                    onBack={() => setChatPartner(null)}
                />
            </div>
        );
    }

    // Profile setup screen (first time)
    if (!profileLoading && !myProfile && myId) {
        return <ProfileSetup displayName={displayName} avatarUrl={avatarUrl} defaultLearning={quizSettings.targetLanguage}
            onSave={async (p) => { await upsertExchangeProfile(p); setMyProfile(p); loadAll(); }} />;
    }

    const pendingCount = incoming.length;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-stone-900 flex items-center gap-2"><Users2 size={24} className="text-indigo-500" /> Language Exchange</h1>
                    <p className="text-stone-400 text-sm mt-0.5">Connect with real users and AI partners to practice together</p>
                </div>
                {myProfile && (
                    <div className="flex items-center gap-2">
                        {pendingCount > 0 && (
                            <button onClick={() => setTab('requests')} className="relative p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all">
                                <Bell size={18} />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{pendingCount}</span>
                            </button>
                        )}
                        <button onClick={() => setShowSettings(true)} className="p-2 rounded-xl hover:bg-stone-100 text-stone-500 transition-all"><Settings size={18} /></button>
                    </div>
                )}
            </div>

            {/* My profile bar */}
            {myProfile && (
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-4 py-3 flex items-center gap-3">
                    <Avatar url={avatarUrl} name={displayName} size={40} />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-800 text-sm">{displayName}</p>
                        <p className="text-xs text-stone-400">{LANG_FLAGS[myProfile.native_language]} Native {myProfile.native_language} · Learning {LANG_FLAGS[myProfile.learning_language]} {myProfile.learning_language}</p>
                    </div>
                    <button onClick={() => setShowSettings(true)} className="text-xs text-indigo-500 font-bold hover:underline flex items-center gap-1"><Settings size={12} /> Edit</button>
                </div>
            )}

            {/* Tabs */}
            {myProfile && (
                <div className="flex bg-stone-100 rounded-2xl p-1 gap-1">
                    {([
                        { id: 'discover', label: 'Discover', count: null },
                        { id: 'requests', label: 'Requests', count: pendingCount || null },
                        { id: 'connections', label: 'Connections', count: connections.length || null },
                    ] as { id: Tab; label: string; count: number | null }[]).map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={cn('flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5',
                                tab === t.id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600')}>
                            {t.label}
                            {t.count !== null && t.count > 0 && <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{t.count}</span>}
                        </button>
                    ))}
                </div>
            )}

            {error && <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm"><AlertCircle size={14} className="shrink-0" /><span className="flex-1">{error}</span><button onClick={() => setError(null)}><X size={12} /></button></div>}

            {/* Discover tab */}
            {(!myProfile || tab === 'discover') && (
                <div className="space-y-4">
                    {/* Filter bar */}
                    {(() => {
                        const FILTER_LANGS = ['French', 'Spanish', 'Japanese', 'Italian', 'Portuguese', 'German', 'Chinese', 'English'];
                        const filteredDiscover = languageFilter === 'All'
                            ? discover
                            : discover.filter(p => p.native_language === languageFilter || p.learning_language === languageFilter);
                        const partnerCount = filteredDiscover.length;
                        return (
                            <>
                                <div className="flex items-center justify-between gap-3 flex-wrap">
                                    <div>
                                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Practice Partners</p>
                                        <p className="text-xs text-stone-500">{partnerCount} partner{partnerCount !== 1 ? 's' : ''} available</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <button
                                            onClick={() => setLanguageFilter('All')}
                                            className={cn('px-3 py-1.5 rounded-full text-xs font-bold border transition-all',
                                                languageFilter === 'All'
                                                    ? 'bg-stone-900 text-white border-stone-900'
                                                    : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                                            )}>
                                            All
                                        </button>
                                        {FILTER_LANGS.map(lang => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguageFilter(lang === languageFilter ? 'All' : lang)}
                                                title={lang}
                                                className={cn('w-8 h-8 rounded-full text-base flex items-center justify-center border transition-all',
                                                    languageFilter === lang
                                                        ? 'border-indigo-400 bg-indigo-50 shadow-sm scale-110'
                                                        : 'border-stone-200 bg-white hover:border-stone-400'
                                                )}>
                                                {LANG_FLAGS[lang] ?? '🌐'}
                                            </button>
                                        ))}
                                        <button onClick={loadAll} disabled={loading} className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold hover:text-indigo-700 disabled:opacity-40 px-3 py-1.5 rounded-xl hover:bg-indigo-50 transition-all ml-1">
                                            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh
                                        </button>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className="flex items-center justify-center py-12 gap-3 text-stone-400"><Loader2 size={20} className="animate-spin" /> Loading partners…</div>
                                ) : filteredDiscover.length === 0 ? (
                                    <div className="text-center py-12 bg-stone-50 rounded-3xl space-y-2">
                                        <Globe size={32} className="mx-auto text-stone-300" />
                                        <p className="text-stone-500 font-bold">No partners for {languageFilter}</p>
                                        <button onClick={() => setLanguageFilter('All')} className="text-sm text-indigo-500 font-bold hover:underline">Show all</button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {filteredDiscover.map(p => {
                                            const isAI = p.user_id.startsWith('ai-');
                                            const status = isAI ? 'ai' : getStatus(p.user_id);
                                            const expanded = bioExpanded.has(p.user_id);
                                            const toggleBio = () => setBioExpanded(prev => {
                                                const next = new Set(prev);
                                                next.has(p.user_id) ? next.delete(p.user_id) : next.add(p.user_id);
                                                return next;
                                            });
                                            return (
                                                <motion.div key={p.user_id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 space-y-3">
                                                    {/* Header */}
                                                    <div className="flex items-center gap-3">
                                                        <Avatar url={p.avatar_url} name={p.display_name} size={52} isAI={isAI} />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <p className="font-bold text-stone-900 text-base">{p.display_name}</p>
                                                                {isAI
                                                                    ? <span className="text-[9px] bg-indigo-50 text-indigo-500 border border-indigo-100 px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest">AI</span>
                                                                    : <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest">Real</span>}
                                                            </div>
                                                            <p className="text-xs text-stone-400 mt-0.5">
                                                                {LANG_FLAGS[p.native_language]} Native {p.native_language} · Learning {LANG_FLAGS[p.learning_language]} {p.learning_language}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* Bio with expand */}
                                                    {p.bio && (
                                                        <div>
                                                            <p className={cn('text-sm text-stone-500 leading-relaxed', !expanded && 'line-clamp-2')}>{p.bio}</p>
                                                            {p.bio.length > 80 && (
                                                                <button onClick={toggleBio} className="text-xs text-stone-400 hover:text-stone-600 mt-0.5 flex items-center gap-0.5">
                                                                    {expanded ? '∧ Less' : '∨ More'}
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                    {/* Language exchange pills */}
                                                    <div className="flex gap-2 flex-wrap">
                                                        <span className="flex items-center gap-1 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-full px-2.5 py-1">
                                                            {LANG_FLAGS[p.native_language]} They teach you {p.native_language}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-full px-2.5 py-1">
                                                            {LANG_FLAGS[p.learning_language]} You teach them {p.learning_language}
                                                        </span>
                                                    </div>
                                                    {/* Action button */}
                                                    {isAI ? (
                                                        <button onClick={() => setChatPartner(p)}
                                                            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                                            <MessageSquare size={15} /> Start Practice Session
                                                        </button>
                                                    ) : status === 'connected' ? (
                                                        <button onClick={() => setChatPartner(p)}
                                                            className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                                            <MessageSquare size={15} /> Message
                                                        </button>
                                                    ) : status === 'pending' ? (
                                                        <div className="w-full py-3 bg-stone-100 text-stone-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                                                            <Clock size={15} /> Request Sent
                                                        </div>
                                                    ) : myProfile ? (
                                                        <button onClick={() => setRequestTarget(p)}
                                                            className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                                            <UserCheck size={15} /> Connect
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => setShowSettings(true)}
                                                            className="w-full py-3 bg-stone-100 text-stone-600 rounded-2xl font-bold text-sm hover:bg-stone-200 transition-all flex items-center justify-center gap-2">
                                                            Set up profile to connect
                                                        </button>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </div>
            )}

            {/* Requests tab */}
            {myProfile && tab === 'requests' && (
                <div className="space-y-4">
                    {incoming.length === 0 && outgoing.length === 0 ? (
                        <div className="text-center py-12 bg-stone-50 rounded-3xl space-y-2">
                            <Bell size={32} className="mx-auto text-stone-300" />
                            <p className="text-stone-500 font-bold">No requests yet</p>
                            <p className="text-xs text-stone-400">When someone sends you a connection request, it'll appear here.</p>
                        </div>
                    ) : (
                        <>
                            {incoming.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Incoming ({incoming.length})</p>
                                    {incoming.map(req => (
                                        <div key={req.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Avatar url={req.from_avatar_url} name={req.from_display_name} size={44} />
                                                <div className="flex-1">
                                                    <p className="font-bold text-stone-800">{req.from_display_name}</p>
                                                    <p className="text-xs text-stone-400">{LANG_FLAGS[req.from_native_language]} Native {req.from_native_language} · Learning {LANG_FLAGS[req.from_learning_language]} {req.from_learning_language}</p>
                                                </div>
                                            </div>
                                            {req.message && <p className="text-sm text-stone-500 bg-stone-50 rounded-xl px-3 py-2 italic">"{req.message}"</p>}
                                            <div className="flex gap-2">
                                                <button onClick={() => handleRespond(req.id, 'declined')}
                                                    className="flex-1 py-2.5 bg-stone-100 text-stone-600 rounded-2xl font-bold text-sm hover:bg-stone-200 transition-all flex items-center justify-center gap-1.5">
                                                    <UserX size={14} /> Decline
                                                </button>
                                                <button onClick={() => handleRespond(req.id, 'accepted')}
                                                    className="flex-1 py-2.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5">
                                                    <UserCheck size={14} /> Accept
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {outgoing.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-xs font-black text-stone-400 uppercase tracking-widest">Sent ({outgoing.length})</p>
                                    {outgoing.map(req => (
                                        <div key={req.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center gap-3">
                                            <Avatar url={req.from_avatar_url} name={req.from_display_name} size={40} />
                                            <div className="flex-1">
                                                <p className="font-bold text-stone-800 text-sm">To: {req.to_user_id}</p>
                                                <p className="text-xs text-stone-400">{req.status === 'pending' ? '⏳ Pending' : req.status === 'accepted' ? '✅ Accepted' : '❌ Declined'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Connections tab */}
            {myProfile && tab === 'connections' && (
                <div className="space-y-4">
                    {connections.length === 0 ? (
                        <div className="text-center py-12 bg-stone-50 rounded-3xl space-y-2">
                            <Users2 size={32} className="mx-auto text-stone-300" />
                            <p className="text-stone-500 font-bold">No connections yet</p>
                            <p className="text-xs text-stone-400">Accept or send connection requests to start practicing with real users.</p>
                            <button onClick={() => setTab('discover')} className="text-sm text-indigo-500 font-bold hover:underline">Browse partners</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {connections.map(conn => {
                                const isFrom = conn.from_user_id === myId;
                                // Use stored display names — fall back to discover list if to_display_name wasn't stored yet
                                const partnerUserId = isFrom ? conn.to_user_id : conn.from_user_id;
                                const discoverProfile = discover.find(p => p.user_id === partnerUserId);
                                const partnerName = isFrom
                                    ? (conn.to_display_name || discoverProfile?.display_name || 'Partner')
                                    : conn.from_display_name;
                                const partnerAvatar = isFrom ? (conn.to_avatar_url ?? discoverProfile?.avatar_url ?? null) : conn.from_avatar_url;
                                const partnerNative = isFrom ? conn.from_learning_language : conn.from_native_language;
                                const partnerLearning = isFrom ? conn.from_native_language : conn.from_learning_language;
                                const partnerProfile: ExchangeProfile = {
                                    user_id: partnerUserId,
                                    display_name: partnerName,
                                    avatar_url: partnerAvatar,
                                    native_language: partnerNative,
                                    learning_language: partnerLearning,
                                    bio: isFrom ? '' : (conn.from_bio || ''),
                                };
                                const convId = getConversationId(myId, partnerUserId);
                                const preview = convPreviews[convId];
                                return (
                                    <div key={conn.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm p-5 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar url={partnerAvatar} name={partnerName} size={48} />
                                                {/* Online dot */}
                                                <span className={cn(
                                                    'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white',
                                                    onlineUsers.has(partnerUserId) ? 'bg-emerald-500' : 'bg-stone-300'
                                                )} title={onlineUsers.has(partnerUserId) ? 'Online' : 'Offline'} />
                                                {preview?.unread > 0 && (
                                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                                        {preview.unread > 9 ? '9+' : preview.unread}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-bold text-stone-800">{partnerName}</p>
                                                    <span className={cn('text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-widest border',
                                                        onlineUsers.has(partnerUserId)
                                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                            : 'bg-stone-50 text-stone-400 border-stone-200')}>
                                                        {onlineUsers.has(partnerUserId) ? 'Online' : 'Offline'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-stone-400">{LANG_FLAGS[partnerNative] ?? ''} Native {partnerNative}</p>
                                                {preview?.content && (
                                                    <p className={cn('text-xs mt-0.5 truncate', preview.unread > 0 ? 'text-stone-700 font-bold' : 'text-stone-400')}>
                                                        {preview.sender_id !== myId ? '' : 'You: '}{preview.content}
                                                    </p>
                                                )}
                                            </div>
                                            {preview?.created_at && (
                                                <p className="text-[9px] text-stone-300 shrink-0">
                                                    {new Date(preview.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            )}
                                        </div>
                                        <button onClick={() => {
                                            setChatPartner(partnerProfile);
                                            // Clear unread immediately when opening chat
                                            markConversationRead(convId);
                                            setConvPreviews(prev => ({
                                                ...prev,
                                                [convId]: prev[convId] ? { ...prev[convId], unread: 0 } : prev[convId],
                                            }));
                                        }}
                                            className="w-full py-2.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                            <MessageSquare size={14} /> Message
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )
            }

            {/* Modals */}
            {
                showSettings && myProfile && (
                    <SettingsModal profile={myProfile} onSave={saveProfile} onClose={() => setShowSettings(false)} />
                )
            }
            {
                requestTarget && myProfile && (
                    <SendRequestModal partner={requestTarget} myProfile={myProfile} onSend={(msg) => handleSendRequest(requestTarget, msg)} onClose={() => setRequestTarget(null)} />
                )
            }
        </div >
    );
};

// ── First-time profile setup ───────────────────────────────────────────────────
const ProfileSetup = ({ displayName, avatarUrl, defaultLearning, onSave }: {
    displayName: string; avatarUrl: string | null; defaultLearning: string;
    onSave: (p: ExchangeProfile) => Promise<void>;
}) => {
    const { user } = useAppStore();
    const myId = (user as any)?.id;
    const [form, setForm] = useState<ExchangeProfile>({ user_id: myId, display_name: displayName, avatar_url: avatarUrl, native_language: 'English', learning_language: defaultLearning, bio: '' });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const save = async () => {
        if (!form.bio.trim()) { setError('Bio is required — tell partners about yourself.'); return; }
        setSaving(true); setError(null);
        try { await onSave(form); }
        catch (e: any) { setError(e?.message || 'Failed to save profile.'); }
        finally { setSaving(false); }
    };

    return (
        <div className="max-w-lg mx-auto py-12 px-4 space-y-8">
            <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto"><Users2 size={38} className="text-indigo-600" /></div>
                <h1 className="text-3xl font-black text-stone-900">Set Up Your Profile</h1>
                <p className="text-stone-400 text-sm">Tell other learners about yourself so they can find and connect with you</p>
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">I speak natively</label>
                        <select value={form.native_language} onChange={e => setForm(f => ({ ...f, native_language: e.target.value }))}
                            className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 border border-stone-100">
                            {LANGUAGES.map(l => <option key={l} value={l}>{LANG_FLAGS[l]} {l}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-stone-500 mb-1.5 block">I'm learning</label>
                        <select value={form.learning_language} onChange={e => setForm(f => ({ ...f, learning_language: e.target.value }))}
                            className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 border border-stone-100">
                            {LANGUAGES.filter(l => l !== form.native_language).map(l => <option key={l} value={l}>{LANG_FLAGS[l]} {l}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-stone-500 mb-1.5 block">Bio <span className="text-red-400">*</span></label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                        placeholder="Tell partners about yourself, your level, and your learning goals…" rows={3}
                        className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-stone-800 resize-none border border-stone-100" />
                </div>
                {error && <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-xl">{error}</p>}
                <button onClick={save} disabled={saving}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <><Loader2 size={18} className="animate-spin" /> Saving…</> : <><Globe size={18} /> Join Language Exchange</>}
                </button>
            </div>
        </div>
    );
};

export default LanguageExchangeView;
