import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    StickyNote, X, Loader2, Plus, Trash2, Download, Eye, EyeOff,
    Bold, Italic, List, Code, Search, Tag, History, GripHorizontal, Target
} from 'lucide-react';
import { cn } from '../lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    updatedAt: string;
    contextLabel?: string; // linked lesson/topic
}

interface NoteVersion {
    noteId: string;
    content: string;
    savedAt: string;
}

interface FloatingNotesProps {
    userId?: string;
    contextLabel?: string; // e.g. current lecture title
    wordGoal?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'floating_notes_v2';
const HISTORY_KEY = 'floating_notes_history';
const MAX_HISTORY = 10;

const loadNotes = (): Note[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
};

const persistNotes = (notes: Note[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

const loadHistory = (): NoteVersion[] => {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
};

const persistHistory = (history: NoteVersion[]) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

const newNote = (contextLabel?: string): Note => ({
    id: crypto.randomUUID(),
    title: 'New Note',
    content: '',
    tags: [],
    updatedAt: new Date().toISOString(),
    contextLabel,
});

// Simple markdown → HTML (bold, italic, code, bullets)
const renderMarkdown = (text: string) => {
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`(.+?)`/g, '<code class="bg-stone-100 px-1 rounded text-xs font-mono">$1</code>')
        .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br/>');
};

// ── Component ─────────────────────────────────────────────────────────────────
const FloatingNotes = ({ userId, contextLabel, wordGoal = 100 }: FloatingNotesProps) => {
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [preview, setPreview] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [tagInput, setTagInput] = useState('');
    const [showTagInput, setShowTagInput] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<NoteVersion[]>([]);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    // draggable
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const dragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const panelRef = useRef<HTMLDivElement>(null);
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load notes — prefer Supabase if logged in, fallback to localStorage
    useEffect(() => {
        const local = loadNotes();

        if (userId) {
            import('../services/dbService').then(async m => {
                try {
                    const rows = await (m as any).getUserNotes(userId);
                    if (rows.length > 0) {
                        const loaded: Note[] = rows.map((r: any) => ({
                            id: r.id,
                            title: r.title,
                            content: r.content,
                            tags: r.tags ?? [],
                            updatedAt: r.updated_at,
                            contextLabel: r.context_label ?? undefined,
                        }));
                        setNotes(loaded);
                        setActiveId(loaded[0].id);
                        persistNotes(loaded);
                    } else if (local.length > 0) {
                        // migrate local notes up to Supabase
                        setNotes(local);
                        setActiveId(local[0].id);
                        for (const n of local) {
                            await (m as any).upsertUserNote(userId, n).catch(() => { });
                        }
                    } else {
                        const first = newNote(contextLabel);
                        setNotes([first]);
                        setActiveId(first.id);
                        persistNotes([first]);
                    }
                } catch {
                    // fallback to local
                    if (local.length > 0) {
                        setNotes(local);
                        setActiveId(local[0].id);
                    } else {
                        const first = newNote(contextLabel);
                        setNotes([first]);
                        setActiveId(first.id);
                        persistNotes([first]);
                    }
                }
            });
        } else {
            if (local.length === 0) {
                const first = newNote(contextLabel);
                setNotes([first]);
                setActiveId(first.id);
                persistNotes([first]);
            } else {
                setNotes(local);
                setActiveId(local[0].id);
            }
        }
        setHistory(loadHistory());
    }, [userId]);

    const activeNote = notes.find(n => n.id === activeId) ?? null;

    // Sync to DB when userId available
    const syncToDb = useCallback((note: Note) => {
        if (!userId) return;
        setSaving(true);
        import('../services/dbService').then(m =>
            (m as any).upsertUserNote(userId, note)
                .then(() => { setSaved(true); setTimeout(() => setSaved(false), 2000); })
                .catch(() => { })
                .finally(() => setSaving(false))
        );
    }, [userId]);

    const updateActiveContent = (val: string) => {
        if (!activeId) return;
        const updated = notes.map(n =>
            n.id === activeId ? { ...n, content: val, updatedAt: new Date().toISOString() } : n
        );
        setNotes(updated);
        persistNotes(updated);
        setSaved(false);
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            // push to history
            const h = loadHistory();
            const newH: NoteVersion[] = [
                { noteId: activeId, content: val, savedAt: new Date().toISOString() },
                ...h.filter(v => v.noteId === activeId),
            ].slice(0, MAX_HISTORY);
            const otherH = h.filter(v => v.noteId !== activeId);
            persistHistory([...newH, ...otherH]);
            setHistory([...newH, ...otherH]);
            const note = updated.find(n => n.id === activeId);
            if (note) syncToDb(note);
        }, 1200);
    };

    const updateActiveTitle = (val: string) => {
        if (!activeId) return;
        const updated = notes.map(n => n.id === activeId ? { ...n, title: val, updatedAt: new Date().toISOString() } : n);
        setNotes(updated);
        persistNotes(updated);
        const note = updated.find(n => n.id === activeId);
        if (note) syncToDb(note);
    };

    const addNote = () => {
        const n = newNote(contextLabel);
        const updated = [n, ...notes];
        setNotes(updated);
        setActiveId(n.id);
        persistNotes(updated);
        setPreview(false);
    };

    const deleteNote = (id: string) => {
        const updated = notes.filter(n => n.id !== id);
        if (userId) {
            import('../services/dbService').then(m => (m as any).deleteUserNote(id, userId).catch(() => { }));
        }
        if (updated.length === 0) {
            const fresh = newNote(contextLabel);
            setNotes([fresh]);
            setActiveId(fresh.id);
            persistNotes([fresh]);
        } else {
            setNotes(updated);
            if (activeId === id) setActiveId(updated[0].id);
            persistNotes(updated);
        }
    };

    const addTag = () => {
        const tag = tagInput.trim().replace(/^#/, '');
        if (!tag || !activeId) return;
        const updated = notes.map(n =>
            n.id === activeId && !n.tags.includes(tag)
                ? { ...n, tags: [...n.tags, tag], updatedAt: new Date().toISOString() }
                : n
        );
        setNotes(updated);
        persistNotes(updated);
        setTagInput('');
        setShowTagInput(false);
        const note = updated.find(n => n.id === activeId);
        if (note) syncToDb(note);
    };

    const removeTag = (tag: string) => {
        if (!activeId) return;
        const updated = notes.map(n =>
            n.id === activeId ? { ...n, tags: n.tags.filter(t => t !== tag), updatedAt: new Date().toISOString() } : n
        );
        setNotes(updated);
        persistNotes(updated);
        const note = updated.find(n => n.id === activeId);
        if (note) syncToDb(note);
    };

    const exportNote = () => {
        if (!activeNote) return;
        const blob = new Blob([activeNote.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${activeNote.title.replace(/\s+/g, '_')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const restoreVersion = (version: NoteVersion) => {
        updateActiveContent(version.content);
        setShowHistory(false);
    };

    // Toolbar insert helpers
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const insertFormat = (before: string, after = '') => {
        const ta = textareaRef.current;
        if (!ta || !activeNote) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const selected = activeNote.content.slice(start, end);
        const newVal =
            activeNote.content.slice(0, start) +
            before + (selected || 'text') + after +
            activeNote.content.slice(end);
        updateActiveContent(newVal);
        setTimeout(() => {
            ta.focus();
            ta.setSelectionRange(start + before.length, start + before.length + (selected || 'text').length);
        }, 0);
    };

    // Drag logic
    const onMouseDown = (e: React.MouseEvent) => {
        if (!panelRef.current) return;
        dragging.current = true;
        const rect = panelRef.current.getBoundingClientRect();
        dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        e.preventDefault();
    };
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
        };
        const onUp = () => { dragging.current = false; };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    }, []);

    // Filtered notes
    const filteredNotes = notes.filter(n => {
        const matchSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchTag = !activeFilter || n.tags.includes(activeFilter);
        return matchSearch && matchTag;
    });

    // All unique tags
    const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

    // Word count & goal
    const wordCount = activeNote ? activeNote.content.trim().split(/\s+/).filter(Boolean).length : 0;
    const goalProgress = Math.min(100, Math.round((wordCount / wordGoal) * 100));

    // History for active note
    const activeHistory = history.filter(v => v.noteId === activeId);

    const panelStyle: React.CSSProperties = pos
        ? { position: 'fixed', left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' }
        : { position: 'fixed', top: 72, right: 24 };

    return (
        <>
            {/* FAB */}
            <button
                onClick={() => setOpen(o => !o)}
                className={cn(
                    'fixed top-6 right-6 z-50 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200',
                    open
                        ? 'bg-stone-900 text-white shadow-stone-900/30'
                        : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-400 hover:text-stone-800 shadow-stone-200/60'
                )}
                style={{ width: 52, height: 52 }}
                title="My Notes"
            >
                {open ? <X size={18} /> : <StickyNote size={18} />}
            </button>

            {/* Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={panelRef}
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="z-50 w-96 bg-white rounded-3xl border border-stone-100 shadow-2xl shadow-stone-200/60 overflow-hidden flex flex-col"
                        style={{ ...panelStyle, height: 'calc(100vh - 32px)', maxHeight: 'calc(100vh - 32px)' }}
                    >
                        {/* Drag handle + Header */}
                        <div
                            className="flex items-center justify-between px-4 py-3 border-b border-stone-100 cursor-grab active:cursor-grabbing select-none"
                            onMouseDown={onMouseDown}
                        >
                            <div className="flex items-center gap-2">
                                <GripHorizontal size={13} className="text-stone-300" />
                                <StickyNote size={13} className="text-stone-400" />
                                <span className="text-sm font-bold text-stone-700">My Notes</span>
                                {activeNote?.contextLabel && (
                                    <span className="text-[10px] bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-full">{activeNote.contextLabel}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1.5">
                                {saving && <Loader2 size={11} className="animate-spin text-stone-300" />}
                                {saved && !saving && <span className="text-[10px] font-bold text-emerald-500">Saved</span>}
                                {!userId && <span className="text-[10px] text-stone-300">Sign in to sync</span>}
                                <button onClick={() => setShowSearch(s => !s)} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors" title="Search notes"><Search size={13} /></button>
                                <button onClick={addNote} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors" title="New note"><Plus size={13} /></button>
                            </div>
                        </div>

                        {/* Search bar */}
                        <AnimatePresence>
                            {showSearch && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden border-b border-stone-100"
                                >
                                    <div className="px-4 py-2 flex items-center gap-2">
                                        <Search size={12} className="text-stone-300 shrink-0" />
                                        <input
                                            autoFocus
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            placeholder="Search notes…"
                                            className="flex-1 text-xs text-stone-700 placeholder-stone-300 focus:outline-none"
                                        />
                                        {searchQuery && <button onClick={() => setSearchQuery('')} className="text-stone-300 hover:text-stone-500"><X size={11} /></button>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tag filter bar */}
                        {allTags.length > 0 && (
                            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-50 overflow-x-auto scrollbar-none">
                                <button
                                    onClick={() => setActiveFilter(null)}
                                    className={cn('text-[10px] px-2 py-0.5 rounded-full border transition-colors shrink-0', !activeFilter ? 'bg-stone-800 text-white border-stone-800' : 'border-stone-200 text-stone-400 hover:border-stone-400')}
                                >all</button>
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveFilter(activeFilter === tag ? null : tag)}
                                        className={cn('text-[10px] px-2 py-0.5 rounded-full border transition-colors shrink-0', activeFilter === tag ? 'bg-stone-800 text-white border-stone-800' : 'border-stone-200 text-stone-400 hover:border-stone-400')}
                                    >#{tag}</button>
                                ))}
                            </div>
                        )}

                        {/* Tabs */}
                        {filteredNotes.length > 1 && (
                            <div className="flex items-center gap-1 px-3 pt-2 pb-1 overflow-x-auto scrollbar-none">
                                {filteredNotes.map(n => (
                                    <button
                                        key={n.id}
                                        onClick={() => { setActiveId(n.id); setPreview(false); setShowHistory(false); }}
                                        className={cn(
                                            'text-[11px] px-2.5 py-1 rounded-xl whitespace-nowrap transition-colors shrink-0',
                                            n.id === activeId ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                        )}
                                    >{n.title || 'Untitled'}</button>
                                ))}
                            </div>
                        )}

                        {/* Note title */}
                        {activeNote && (
                            <div className="px-4 pt-3 pb-1">
                                <input
                                    value={activeNote.title}
                                    onChange={e => updateActiveTitle(e.target.value)}
                                    className="w-full text-sm font-semibold text-stone-800 placeholder-stone-300 focus:outline-none bg-transparent"
                                    placeholder="Note title…"
                                />
                            </div>
                        )}

                        {/* Toolbar */}
                        <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-stone-50">
                            <button onClick={() => insertFormat('**', '**')} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors" title="Bold"><Bold size={12} /></button>
                            <button onClick={() => insertFormat('*', '*')} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors" title="Italic"><Italic size={12} /></button>
                            <button onClick={() => insertFormat('`', '`')} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors" title="Code"><Code size={12} /></button>
                            <button onClick={() => insertFormat('\n- ', '')} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors" title="Bullet"><List size={12} /></button>
                            <div className="w-px h-3 bg-stone-200 mx-1" />
                            <button onClick={() => setPreview(p => !p)} className={cn('p-1.5 rounded-lg transition-colors', preview ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-700')} title="Preview"><Eye size={12} /></button>
                            <button onClick={() => setShowTagInput(t => !t)} className={cn('p-1.5 rounded-lg transition-colors', showTagInput ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-700')} title="Tags"><Tag size={12} /></button>
                            <button onClick={() => setShowHistory(h => !h)} className={cn('p-1.5 rounded-lg transition-colors', showHistory ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-400 hover:text-stone-700')} title="History"><History size={12} /></button>
                            <div className="flex-1" />
                            <button onClick={exportNote} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors" title="Export .md"><Download size={12} /></button>
                            {notes.length > 0 && activeNote && (
                                <button onClick={() => deleteNote(activeNote.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-stone-300 hover:text-red-400 transition-colors" title="Delete note"><Trash2 size={12} /></button>
                            )}
                        </div>

                        {/* Tag input */}
                        <AnimatePresence>
                            {showTagInput && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                    <div className="px-4 py-2 flex items-center gap-2 border-b border-stone-50">
                                        <Tag size={11} className="text-stone-300 shrink-0" />
                                        <input
                                            autoFocus
                                            value={tagInput}
                                            onChange={e => setTagInput(e.target.value)}
                                            onKeyDown={e => { if (e.key === 'Enter') addTag(); }}
                                            placeholder="Add tag (Enter to confirm)…"
                                            className="flex-1 text-xs text-stone-700 placeholder-stone-300 focus:outline-none"
                                        />
                                    </div>
                                    {activeNote && activeNote.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 px-4 pb-2">
                                            {activeNote.tags.map(tag => (
                                                <span key={tag} className="flex items-center gap-1 text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                                                    #{tag}
                                                    <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X size={9} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* History panel */}
                        <AnimatePresence>
                            {showHistory && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-b border-stone-100">
                                    <div className="px-4 py-2">
                                        <p className="text-[10px] font-semibold text-stone-400 mb-1.5">Version history</p>
                                        {activeHistory.length === 0 && <p className="text-[10px] text-stone-300">No history yet</p>}
                                        <div className="flex flex-col gap-1 max-h-28 overflow-y-auto">
                                            {activeHistory.map((v, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => restoreVersion(v)}
                                                    className="flex items-center justify-between text-left px-2 py-1 rounded-lg hover:bg-stone-50 transition-colors"
                                                >
                                                    <span className="text-[10px] text-stone-500 truncate">{v.content.slice(0, 40) || '(empty)'}</span>
                                                    <span className="text-[9px] text-stone-300 shrink-0 ml-2">{new Date(v.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Editor / Preview */}
                        {activeNote && !preview && (
                            <textarea
                                ref={textareaRef}
                                value={activeNote.content}
                                onChange={e => updateActiveContent(e.target.value)}
                                placeholder="Jot down anything — vocab, grammar rules, reminders…&#10;&#10;Supports **bold**, *italic*, `code`, and - bullets"
                                className="flex-1 resize-none px-4 py-3 text-sm text-stone-700 placeholder-stone-300 focus:outline-none leading-relaxed"
                                style={{ minHeight: 200 }}
                                autoFocus
                            />
                        )}
                        {activeNote && preview && (
                            <div
                                className="flex-1 px-4 py-3 text-sm text-stone-700 leading-relaxed overflow-y-auto"
                                style={{ minHeight: 200 }}
                                dangerouslySetInnerHTML={{ __html: renderMarkdown(activeNote.content) || '<span class="text-stone-300">Nothing to preview</span>' }}
                            />
                        )}

                        {/* Word goal progress */}
                        <div className="px-4 py-2 border-t border-stone-50">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1 text-[10px] text-stone-400">
                                    <Target size={10} />
                                    <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                                </div>
                                <span className="text-[10px] text-stone-300">{activeNote?.content.length ?? 0} chars</span>
                            </div>
                            {wordCount > 0 && (
                                <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn('h-full rounded-full transition-all duration-300', goalProgress >= 100 ? 'bg-emerald-400' : 'bg-stone-300')}
                                        style={{ width: `${goalProgress}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingNotes;
