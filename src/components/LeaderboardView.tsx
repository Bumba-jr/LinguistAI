import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Loader2, RefreshCw, User, Crown, Zap, Medal, TrendingUp, Star, Flame } from 'lucide-react';
import { cn } from '../lib/utils';
import { getLeaderboard, LeaderboardEntry } from '../services/dbService';

// ── helpers ───────────────────────────────────────────────────────────────────
const PODIUM_CFG = [
    { order: 1, height: 140, bg: 'linear-gradient(180deg,#f59e0b,#d97706)', glow: '#f59e0b', label: '1st', medalColor: '#FFD700' },
    { order: 0, height: 100, bg: 'linear-gradient(180deg,#94a3b8,#64748b)', glow: '#94a3b8', label: '2nd', medalColor: '#C0C0C0' },
    { order: 2, height: 80, bg: 'linear-gradient(180deg,#b45309,#92400e)', glow: '#b45309', label: '3rd', medalColor: '#CD7F32' },
];

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

const tierLabel = (pts: number) => {
    if (pts >= 2000) return { label: 'Legend', color: '#f59e0b', icon: '👑' };
    if (pts >= 1000) return { label: 'Master', color: '#8b5cf6', icon: '💎' };
    if (pts >= 500) return { label: 'Expert', color: '#3b82f6', icon: '🔥' };
    if (pts >= 200) return { label: 'Advanced', color: '#10b981', icon: '⚡' };
    if (pts >= 50) return { label: 'Learner', color: '#6b7280', icon: '📚' };
    return { label: 'Beginner', color: '#9ca3af', icon: '🌱' };
};

const Avatar = ({ url, name, size = 44 }: { url?: string | null; name: string; size?: number }) => {
    const initials = name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
    const hue = name.split('').reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % 360;
    const style = { width: size, height: size, borderRadius: 14, overflow: 'hidden' as const, flexShrink: 0 };
    if (url) return <div style={style}><img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" /></div>;
    return (
        <div style={{ ...style, background: `hsl(${hue},60%,50%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 900, fontSize: size * 0.35 }}>{initials || '?'}</span>
        </div>
    );
};

// Animated counter
const Counter = ({ value }: { value: number }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef(value);
    useEffect(() => {
        const start = display;
        const end = value;
        if (start === end) return;
        const duration = 800;
        const startTime = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(start + (end - start) * ease));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [value]);
    return <>{display.toLocaleString()}</>;
};

const LeaderboardView = () => {
    const { user, totalPoints } = useAppStore();
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tab, setTab] = useState<'global' | 'me'>('global');

    const fetchLeaderboard = async () => {
        setLoading(true); setError(null);
        try { setEntries(await getLeaderboard()); }
        catch { setError('Failed to load. Please try again.'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchLeaderboard(); }, []);

    const myUserId = (user as any)?.id;

    useEffect(() => {
        if (!myUserId || totalPoints === 0) return;
        import('../services/dbService').then(m =>
            m.upsertLeaderboardEntry(myUserId,
                (user as any)?.displayName || (user as any)?.email?.split('@')[0] || 'Anonymous',
                (user as any)?.avatarUrl || null, '', '', totalPoints
            ).catch(() => { })
        );
    }, [totalPoints, myUserId]);

    const liveEntries = entries
        .map(e => e.user_id === myUserId ? { ...e, best_score: totalPoints } : e)
        .sort((a, b) => b.best_score - a.best_score);

    const myRank = liveEntries.findIndex(e => e.user_id === myUserId) + 1;
    const myEntry = liveEntries.find(e => e.user_id === myUserId);
    const myTier = tierLabel(totalPoints);

    // podium: show 2nd, 1st, 3rd
    const top3 = liveEntries.slice(0, 3);
    const podiumDisplay = [top3[1], top3[0], top3[2]];
    const podiumCfg = [PODIUM_CFG[1], PODIUM_CFG[0], PODIUM_CFG[2]];
    const rest = liveEntries.slice(3);

    return (
        <div className="min-h-screen w-full" style={{ background: 'linear-gradient(160deg,#0a0a1a,#1a0a2e,#0a1a2e)' }}>
            {/* Animated stars bg */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div key={i}
                        className="absolute rounded-full bg-white"
                        style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 + 0.1 }}
                        animate={{ opacity: [0.1, 0.6, 0.1] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }} />
                ))}
            </div>

            <div className="relative max-w-3xl mx-auto px-4 py-10 space-y-6">

                {/* Header */}
                <div className="text-center space-y-3">
                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                        className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)', boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>
                        <Trophy size={38} className="text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Global Leaderboard</h1>
                    <p className="text-white/40 text-sm">Compete with learners worldwide</p>

                    {/* My stats pill */}
                    {myUserId && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-white/10 mt-1"
                            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
                            <span className="text-lg">{myTier.icon}</span>
                            <div className="text-left">
                                <p className="text-white font-black text-sm leading-none"><Counter value={totalPoints} /> pts</p>
                                <p className="text-[10px] font-bold mt-0.5" style={{ color: myTier.color }}>{myTier.label}{myRank > 0 ? ` · Rank #${myRank}` : ''}</p>
                            </div>
                            <div className="w-px h-6 bg-white/10" />
                            <button onClick={fetchLeaderboard} disabled={loading}
                                className="text-white/40 hover:text-white transition-colors disabled:opacity-30">
                                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-2xl w-fit mx-auto" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    {(['global', 'me'] as const).map(t => (
                        <button key={t} onClick={() => setTab(t)}
                            className={cn('px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
                                tab === t ? 'bg-white text-stone-900' : 'text-white/40 hover:text-white')}>
                            {t === 'global' ? '🌍 Global' : '👤 My Stats'}
                        </button>
                    ))}
                </div>

                {/* ── GLOBAL TAB ── */}
                {tab === 'global' && (
                    <>
                        {loading ? (
                            <div className="flex items-center justify-center py-32 gap-3 text-white/40">
                                <Loader2 size={24} className="animate-spin" />
                                <span className="font-medium">Loading rankings…</span>
                            </div>
                        ) : error ? (
                            <div className="text-center py-24 space-y-3">
                                <p className="text-white/50">{error}</p>
                                <button onClick={fetchLeaderboard} className="text-amber-400 font-bold text-sm hover:underline">Try again</button>
                            </div>
                        ) : liveEntries.length === 0 ? (
                            <div className="text-center py-32 space-y-3">
                                <Trophy size={52} className="mx-auto text-white/10" />
                                <p className="text-white/40 font-medium">No scores yet — be the first!</p>
                            </div>
                        ) : (
                            <>
                                {/* Podium */}
                                {top3.length > 0 && (
                                    <div className="flex items-end justify-center gap-3 pt-6 pb-2">
                                        {podiumDisplay.map((entry, pi) => {
                                            if (!entry) return <div key={pi} style={{ width: 100 }} />;
                                            const cfg = podiumCfg[pi];
                                            const isMe = entry.user_id === myUserId;
                                            const rank = liveEntries.indexOf(entry) + 1;
                                            const tier = tierLabel(entry.best_score);
                                            return (
                                                <motion.div key={entry.id}
                                                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: pi * 0.15, type: 'spring', stiffness: 140, damping: 16 }}
                                                    className="flex flex-col items-center gap-2" style={{ width: 100 }}>
                                                    {rank === 1 && (
                                                        <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
                                                            <Crown size={24} style={{ color: '#FFD700', filter: 'drop-shadow(0 0 8px #FFD700)' }} />
                                                        </motion.div>
                                                    )}
                                                    <div style={{ position: 'relative' }}>
                                                        <Avatar url={entry.avatar_url} name={entry.display_name} size={rank === 1 ? 52 : 44} />
                                                        {isMe && (
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-stone-900" />
                                                        )}
                                                    </div>
                                                    <p className={cn('font-black text-center text-xs truncate w-full', isMe ? 'text-emerald-300' : 'text-white')}
                                                        style={{ maxWidth: 90 }}>
                                                        {entry.display_name.split(' ')[0]}{isMe ? ' ✦' : ''}
                                                    </p>
                                                    <span className="text-[9px] font-bold" style={{ color: tier.color }}>{tier.icon} {tier.label}</span>
                                                    {/* Podium block */}
                                                    <div className="w-full rounded-t-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                                                        style={{ height: cfg.height, background: cfg.bg, boxShadow: `0 0 20px ${cfg.glow}40` }}>
                                                        <div className="absolute inset-0 opacity-20"
                                                            style={{ background: 'repeating-linear-gradient(45deg,transparent,transparent 4px,rgba(255,255,255,0.1) 4px,rgba(255,255,255,0.1) 5px)' }} />
                                                        <div className="flex items-center gap-1 relative z-10">
                                                            <Zap size={11} fill="white" className="text-white" />
                                                            <span className="text-white font-black text-base">{entry.best_score.toLocaleString()}</span>
                                                        </div>
                                                        <span className="text-white/70 text-[10px] font-black relative z-10">{cfg.label}</span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Ranks 4+ */}
                                {rest.length > 0 && (
                                    <div className="rounded-3xl overflow-hidden"
                                        style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <div className="grid grid-cols-12 px-5 py-3 text-[9px] font-black uppercase tracking-widest text-white/20 border-b border-white/5">
                                            <div className="col-span-1">Rank</div>
                                            <div className="col-span-7">Player</div>
                                            <div className="col-span-4 text-right">Points</div>
                                        </div>
                                        {rest.map((entry: LeaderboardEntry, i: number) => {
                                            const isMe = entry.user_id === myUserId;
                                            const rank = i + 4;
                                            const tier = tierLabel(entry.best_score);
                                            return (
                                                <motion.div key={entry.id}
                                                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.025 }}
                                                    className={cn('grid grid-cols-12 items-center px-5 py-3 border-b border-white/5 last:border-none transition-colors',
                                                        isMe ? 'bg-emerald-500/10' : 'hover:bg-white/5')}>
                                                    <div className="col-span-1">
                                                        <span className="text-xs font-black text-white/30">{rank}</span>
                                                    </div>
                                                    <div className="col-span-7 flex items-center gap-3 min-w-0">
                                                        <Avatar url={entry.avatar_url} name={entry.display_name} size={36} />
                                                        <div className="min-w-0">
                                                            <p className={cn('font-bold text-sm truncate leading-none', isMe ? 'text-emerald-300' : 'text-white')}>
                                                                {entry.display_name}{isMe ? ' ✦' : ''}
                                                            </p>
                                                            <span className="text-[10px] font-bold" style={{ color: tier.color }}>{tier.icon} {tier.label}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-4 flex items-center justify-end gap-1">
                                                        <Zap size={10} fill="currentColor" className="text-amber-400" />
                                                        <span className="text-sm font-black text-white">{entry.best_score.toLocaleString()}</span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}

                {/* ── MY STATS TAB ── */}
                {tab === 'me' && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        {!myUserId ? (
                            <div className="text-center py-20 text-white/40">Sign in to see your stats</div>
                        ) : (
                            <>
                                {/* Rank card */}
                                <div className="rounded-3xl p-6 text-center relative overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(239,68,68,0.1))', border: '1px solid rgba(245,158,11,0.2)' }}>
                                    <div className="absolute inset-0 opacity-5"
                                        style={{ background: 'radial-gradient(circle at 50% 0%,#f59e0b,transparent 70%)' }} />
                                    <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Your Rank</p>
                                    <p className="text-6xl font-black text-white mb-1">#{myRank > 0 ? myRank : '—'}</p>
                                    <p className="text-white/50 text-sm">out of {liveEntries.length} players</p>
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <span className="text-2xl">{myTier.icon}</span>
                                        <span className="font-black text-lg" style={{ color: myTier.color }}>{myTier.label}</span>
                                    </div>
                                </div>

                                {/* Points breakdown */}
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Total Points', value: totalPoints.toLocaleString(), icon: '⚡', color: '#f59e0b' },
                                        { label: 'Global Rank', value: myRank > 0 ? `#${myRank}` : '—', icon: '🏆', color: '#6366f1' },
                                    ].map(s => (
                                        <div key={s.label} className="rounded-2xl p-5 text-center"
                                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                            <p className="text-2xl mb-1">{s.icon}</p>
                                            <p className="text-2xl font-black text-white">{s.value}</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Tier progress */}
                                <div className="rounded-2xl p-5"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">Tier Progress</p>
                                    {[
                                        { label: '🌱 Beginner', min: 0, max: 50 },
                                        { label: '📚 Learner', min: 50, max: 200 },
                                        { label: '⚡ Advanced', min: 200, max: 500 },
                                        { label: '🔥 Expert', min: 500, max: 1000 },
                                        { label: '💎 Master', min: 1000, max: 2000 },
                                        { label: '👑 Legend', min: 2000, max: 3000 },
                                    ].map(tier => {
                                        const pct = Math.min(100, Math.max(0, ((totalPoints - tier.min) / (tier.max - tier.min)) * 100));
                                        const active = totalPoints >= tier.min && totalPoints < tier.max;
                                        const done = totalPoints >= tier.max;
                                        return (
                                            <div key={tier.label} className="flex items-center gap-3 mb-2">
                                                <span className="text-xs w-24 shrink-0" style={{ color: done ? '#10b981' : active ? 'white' : 'rgba(255,255,255,0.3)' }}>
                                                    {tier.label}
                                                </span>
                                                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                    <motion.div className="h-full rounded-full"
                                                        initial={{ width: 0 }} animate={{ width: `${done ? 100 : pct}%` }}
                                                        transition={{ duration: 0.8, delay: 0.1 }}
                                                        style={{ background: done ? '#10b981' : active ? '#f59e0b' : 'rgba(255,255,255,0.2)' }} />
                                                </div>
                                                <span className="text-[10px] text-white/30 w-10 text-right shrink-0">
                                                    {done ? '✓' : active ? `${Math.round(pct)}%` : ''}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {!myUserId && tab === 'global' && (
                    <p className="text-center text-white/20 text-xs pb-4">Sign in to appear on the leaderboard</p>
                )}
            </div>
        </div>
    );
};

export default LeaderboardView;
