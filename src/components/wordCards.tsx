// Shared rich word-card system — ONE look, two sources:
//  • glossary words (lesson context) → instant StaticWord card, zero-AI
//  • everything else → RichAiWord: the AI fills the SAME GlossaryEntry schema
//    (getRichWordCard in aiService, localStorage-cached) and renders identically.
// Used by the static-lesson renderer AND by InteractiveText, which is embedded
// across trainers, mock exams, flashcards, quiz, chat and the other portals —
// so every tapped word in the app gets the full card (pron, chips,
// conjugation table, masc/fem pair, detail paragraph, example).

import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Plus, Volume2, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { speakText } from '../services/voiceService';
import { getRichWordCard } from '../services/aiService';
import { useAppStore } from '../store/useAppStore';
import type { Glossary, GlossaryEntry } from '../services/frenchLessons';

export type Lang = string;

// Lessons that carry a glossary provide it through this context; surfaces
// outside lessons (flashcards, chat, trainers…) simply get null → AI cards.
export const LessonGlossaryContext = React.createContext<Glossary | null>(null);

export const normFr = (s: string) =>
    s.toLowerCase().replace(/[\u2019\u2018`´]/g, "'").replace(/[.,!?;:«»"()—]/g, '').trim();

// Lookup with the three-step fallback: exact → word after elision (j'espère →
// espère) → singular (avantages → avantage). Glossary values may be plain
// strings; they normalize to { en }.
export const resolveGlossary = (g: Glossary | null, word: string): GlossaryEntry | undefined => {
    if (!g) return undefined;
    const n = normFr(word);
    let v: Glossary[string] | undefined = g[n] ?? (g as Record<string, Glossary[string]>)[word.toLowerCase()];
    if (v === undefined && n.includes("'")) v = (g as Record<string, Glossary[string]>)[n.split("'").pop()!];
    if (v === undefined && /s$/.test(n)) v = (g as Record<string, Glossary[string]>)[n.replace(/s$/, '')];
    if (v === undefined) return undefined;
    return typeof v === 'string' ? { en: v } : v;
};

const typeLabel: Record<string, string> = {
    verb: 'verbe', noun: 'nom', adjective: 'adjectif', adverb: 'adverbe',
    phrase: 'expression', particle: 'particule', pronoun: 'pronom',
    number: 'nombre', expression: 'expression',
};

// The card body — one schema, both sources.
export const WordCardBody = ({ word, en, g }: { word: string; en: string; g?: GlossaryEntry }) => (
    <>
        <span className="block px-4 pt-3.5 pb-2">
            <span className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-base font-black">{word}</span>
                <span className="text-white/30">—</span>
                <span className="text-sm font-semibold text-emerald-300">{en}</span>
            </span>
            {g?.pron && <span className="block text-[11px] font-mono text-violet-300 mt-0.5">/{g.pron}/</span>}
        </span>
        {g?.label && (
            <span className="block px-4 pb-1.5">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">{g.label}</span>
            </span>
        )}
        {g?.base && (
            <span className="block px-4 pb-2">
                <span className="text-[11px] text-white/50">from </span>
                <span className="text-[11px] font-black text-amber-300">{g.base.form}</span>
                <span className="text-[11px] text-white/40"> — {g.base.en}</span>
            </span>
        )}
        {(g?.type || g?.gender || g?.register || g?.plural) && (
            <span className="flex flex-wrap gap-1 px-4 pb-2">
                {g.type && <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-white/10 text-white/70 uppercase tracking-wider">{typeLabel[g.type] || g.type}</span>}
                {g.gender && <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider',
                    g.gender === 'feminine' ? 'bg-pink-500/20 text-pink-300' : g.gender === 'masculine' ? 'bg-blue-500/20 text-blue-300' : 'bg-violet-500/20 text-violet-300')}>
                    {g.gender === 'feminine' ? '♀ la' : g.gender === 'masculine' ? '♂ le' : 'm/f'}
                </span>}
                {g.plural && <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/50">pl. {g.plural}</span>}
                {g.register && <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider',
                    g.register === 'formal' ? 'bg-amber-500/20 text-amber-300' : g.register === 'informal' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/10 text-white/50')}>
                    {g.register === 'formal' ? 'vous' : g.register === 'informal' ? 'tu' : 'neutre'}
                </span>}
            </span>
        )}
        {g?.conj && g.conj.length > 0 && (
            <span className="block px-4 pb-2">
                <span className="grid grid-cols-2 gap-1">
                    {g.conj.map((row, ci) => (
                        <span key={ci} className="bg-white/5 rounded-lg px-2.5 py-1.5">
                            <span className="block text-[8px] font-black text-white/40 uppercase tracking-wider">{row.label}</span>
                            <span className="block text-xs font-bold text-emerald-300">{row.form}</span>
                        </span>
                    ))}
                </span>
            </span>
        )}
        {(g?.masc || g?.fem) && (
            <span className="block px-4 pb-2">
                <span className="grid grid-cols-2 gap-1">
                    {g.masc && <span className="bg-blue-500/10 rounded-lg px-2.5 py-1.5 border border-blue-500/20">
                        <span className="block text-[8px] font-black text-blue-300 uppercase">♂</span>
                        <span className="block text-xs font-bold text-stone-100">{g.masc.word}</span>
                        <span className="block text-[9px] text-white/40">{g.masc.en}</span>
                    </span>}
                    {g.fem && <span className="bg-pink-500/10 rounded-lg px-2.5 py-1.5 border border-pink-500/20">
                        <span className="block text-[8px] font-black text-pink-300 uppercase">♀</span>
                        <span className="block text-xs font-bold text-stone-100">{g.fem.word}</span>
                        <span className="block text-[9px] text-white/40">{g.fem.en}</span>
                    </span>}
                </span>
            </span>
        )}
        {g?.detail && (
            <span className="block px-4 pb-2">
                <span className="block text-[11px] text-white/60 leading-relaxed">{g.detail}</span>
            </span>
        )}
        {g?.example && (
            <span className="block px-4 pb-2">
                <span className="block bg-white/5 rounded-xl px-3 py-2 space-y-0.5">
                    <span className="block text-xs font-semibold text-stone-100">{g.example.fr}</span>
                    <span className="block text-[11px] text-white/40">{g.example.en}</span>
                </span>
            </span>
        )}
        {g?.note && !g?.detail && (
            <span className="block px-4 pb-2">
                <span className="block text-[11px] text-white/60 leading-relaxed">{g.note}</span>
            </span>
        )}
    </>
);

export const WordCardActions = ({ word, en, language = 'French', userId }: {
    word: string; en: string; language?: Lang; userId?: string;
}) => {
    const { addFlashcard } = useAppStore() as any;
    const [added, setAdded] = useState(false);
    const addToDeck = () => {
        if (added) return;
        const card = {
            id: crypto.randomUUID(),
            word,
            translation: en,
            language: language as any,
            nextReview: new Date().toISOString(),
            lastReviewed: null,
        };
        addFlashcard(card);
        setAdded(true);
        if (userId) import('../services/dbService').then(m => m.upsertFlashcard(userId, card)).catch(() => { });
    };
    return (
        <span className="flex items-center gap-2 px-4 pb-3 pt-1 border-t border-white/10">
            <button onClick={(e) => { e.stopPropagation(); speakText(word, language); }}
                className="flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[10px] font-black">
                <Volume2 size={11} /> Hear
            </button>
            <button onClick={(e) => { e.stopPropagation(); addToDeck(); }}
                className={cn('flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-xl text-[10px] font-black transition-colors',
                    added ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500 text-white hover:bg-emerald-600')}>
                {added ? <><CheckCircle2 size={11} /> In deck</> : <><Plus size={11} /> Add to deck</>}
            </button>
        </span>
    );
};

// Viewport-aware placement: the card flips below the word when there is no
// room above, shifts to right-align near the right edge, and scrolls inside
// itself if taller than the viewport — never clipped.
const POPOVER_BASE = 'absolute z-[9999] w-[320px] rounded-2xl bg-stone-900 text-white shadow-2xl overflow-y-auto text-left block max-h-[72vh]';
const btnCls = (dark?: boolean) => cn(
    'font-bold underline decoration-dotted decoration-[1.5px] underline-offset-[5px] transition-colors cursor-help',
    dark ? 'text-white/90 decoration-white/30 hover:decoration-emerald-400 hover:text-emerald-300'
        : 'text-stone-900 decoration-stone-300 hover:decoration-emerald-500 hover:text-emerald-700');

const usePlacement = (open: boolean) => {
    const triggerRef = useRef<HTMLSpanElement | null>(null);
    const popRef = useRef<HTMLSpanElement | null>(null);
    const [placement, setPlacement] = useState<'above' | 'below'>('above');
    const [align, setAlign] = useState<'left' | 'right'>('left');
    useEffect(() => {
        if (!open) return;
        const id = requestAnimationFrame(() => {
            const trig = triggerRef.current?.getBoundingClientRect();
            if (!trig) return;
            const h = popRef.current?.offsetHeight ?? 320;
            const spaceAbove = trig.top;
            const spaceBelow = window.innerHeight - trig.bottom;
            setPlacement(spaceAbove >= Math.min(h + 12, spaceBelow) ? 'above' : 'below');
            setAlign(trig.left + 332 > window.innerWidth - 8 ? 'right' : 'left');
        });
        return () => cancelAnimationFrame(id);
    }, [open]);
    return { triggerRef, popRef, placement, align };
};

const stripPunct = (w: string) => w.replace(/^[«"'(]+/, '').replace(/[.,!?;:»"')]+$/, '');

// A hand-written entry is "thin" when it carries a meaning but no rich
// fields — those cards enrich themselves with the AI card on first tap
// (cached), so no glossary word ever shows a bare translation again.
const isThin = (e?: GlossaryEntry) =>
    !!e && !e.detail && !e.example && !e.conj && !(e.note && e.note.length > 80);

const useEnrichedEntry = (entry: GlossaryEntry | undefined, word: string, language: Lang, active: boolean) => {
    const [merged, setMerged] = useState<GlossaryEntry | undefined>(entry);
    useEffect(() => { setMerged(entry); }, [entry]);
    useEffect(() => {
        if (!active || !isThin(entry)) return;
        let alive = true;
        getRichWordCard(stripPunct(word), language as Parameters<typeof getRichWordCard>[1])
            .then(ai => {
                if (!alive) return;
                setMerged(prev => {
                    const out: Record<string, unknown> = { ...ai };
                    for (const [k, v] of Object.entries(prev ?? {})) {
                        if (v !== undefined && v !== null) out[k] = v; // hand-written fields win
                    }
                    return out as unknown as GlossaryEntry;
                });
            })
            .catch(() => { /* the instant card stays as-is */ });
        return () => { alive = false; };
    }, [active, entry, word, language]);
    return merged;
};

// Instant card — the entry comes from the lesson data; thin entries enrich
// with the AI card (merged fields, cached) so every tap is fully rich.
export const StaticWord = ({ word, en, entry, language = 'French', dark }: {
    word: string; en: string; entry?: GlossaryEntry; language?: Lang; dark?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const { user } = useAppStore() as any;
    const enriched = useEnrichedEntry(entry, word, language, open);
    const { triggerRef, popRef, placement, align } = usePlacement(open);
    return (
        <span className="relative inline-block" ref={triggerRef}>
            <button onClick={() => setOpen(o => !o)} className={btnCls(dark)}>{word}</button>
            {open && (
                <span ref={popRef}
                    className={cn(POPOVER_BASE,
                        placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
                        align === 'right' ? 'right-0' : 'left-0')}>
                    <WordCardBody word={word} en={en} g={enriched} />
                    <WordCardActions word={word} en={en} language={language} userId={user?.id} />
                </span>
            )}
        </span>
    );
};

// AI card — same look, generated on first tap, localStorage-cached.
export const RichAiWord = ({ word, language = 'French', dark }: {
    word: string; language?: Lang; dark?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
    const [entry, setEntry] = useState<GlossaryEntry | undefined>();
    const { user } = useAppStore() as any;
    const bare = stripPunct(word);
    const load = () => {
        setState('loading');
        getRichWordCard(bare, language as Parameters<typeof getRichWordCard>[1])
            .then(e => { setEntry(e); setState('ready'); })
            .catch(() => setState('error'));
    };
    const toggle = () => {
        const next = !open;
        setOpen(next);
        if (next && !entry) load();
    };
    const { triggerRef, popRef, placement, align } = usePlacement(open);
    return (
        <span className="relative inline-block" ref={triggerRef}>
            <button onClick={toggle} className={btnCls(dark)}>{word}</button>
            {open && (
                <span ref={popRef}
                    className={cn(POPOVER_BASE,
                        placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
                        align === 'right' ? 'right-0' : 'left-0')}>
                    {state === 'loading' && (
                        <span className="block px-4 py-7 text-center space-y-2">
                            <Loader2 size={18} className="animate-spin text-emerald-400 mx-auto" />
                            <span className="block text-[11px] text-white/50">Your tutor is writing this card…</span>
                        </span>
                    )}
                    {state === 'error' && (
                        <span className="block px-4 py-6 text-center space-y-2">
                            <span className="block text-xs font-bold text-rose-300">Couldn’t write the card.</span>
                            <span className="block text-[11px] text-white/40">Check your connection and try again.</span>
                            <button onClick={(e) => { e.stopPropagation(); load(); }}
                                className="px-4 py-2 mt-1 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-black transition-colors">Retry</button>
                        </span>
                    )}
                    {state === 'ready' && entry && (
                        <>
                            <WordCardBody word={word} en={entry.en} g={entry} />
                            <WordCardActions word={bare} en={entry.en} language={language} userId={user?.id} />
                            <span className="absolute top-2.5 right-3 flex items-center gap-1 text-[8px] font-black text-white/25 uppercase tracking-widest">
                                <Sparkles size={9} /> AI
                            </span>
                        </>
                    )}
                </span>
            )}
        </span>
    );
};

// The universal tap-target: glossary entry if the lesson provides one,
// otherwise the AI card. Every surface should render words through this.
export const RichWord = ({ word, language = 'French', dark }: {
    word: string; language?: Lang; dark?: boolean;
}) => {
    const glossary = React.useContext(LessonGlossaryContext);
    const entry = resolveGlossary(glossary, word);
    if (entry) return <StaticWord word={word} en={entry.en} entry={entry} language={language} dark={dark} />;
    return <RichAiWord word={word} language={language} dark={dark} />;
};
