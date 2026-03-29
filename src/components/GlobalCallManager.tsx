import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Video, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendSignal, getConversationId } from '../services/dbService';

// ── Room URL builder ──────────────────────────────────────────────────────────
// Uses meet.jit.si with hash-based config — no External API, no moderator gate
const generateRoomName = () =>
    'LinguistAI' + Math.random().toString(36).slice(2, 8).toUpperCase();

const buildJitsiUrl = (roomName: string, displayName: string, videoOff: boolean) => {
    const config = [
        'config.prejoinPageEnabled=false',
        `config.startWithVideoMuted=${videoOff}`,
        'config.startWithAudioMuted=false',
        'config.disableDeepLinking=true',
        'config.requireDisplayName=false',
        'config.enableLobbyChat=false',
        'config.lobby.autoKnock=false',
        'config.disableModeratorIndicator=true',
        `userInfo.displayName=${encodeURIComponent(displayName)}`,
        'interfaceConfig.SHOW_JITSI_WATERMARK=false',
        'interfaceConfig.SHOW_WATERMARK_FOR_GUESTS=false',
        'interfaceConfig.SHOW_POWERED_BY=false',
        'interfaceConfig.DISPLAY_WELCOME_FOOTER=false',
        'interfaceConfig.MOBILE_APP_PROMO=false',
    ].join('&');
    return `https://meet.jit.si/${roomName}#${config}`;
};

// ── Ring tone ─────────────────────────────────────────────────────────────────
const playRingTone = () => {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        for (let i = 0; i < 4; i++) {
            [520, 460].forEach((freq, j) => {
                const o = ctx.createOscillator(), g = ctx.createGain();
                o.connect(g); g.connect(ctx.destination);
                o.frequency.value = freq; o.type = 'sine';
                const t = ctx.currentTime + i * 1.3 + j * 0.06;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.3, t + 0.06);
                g.gain.linearRampToValueAtTime(0, t + 0.45);
                o.start(t); o.stop(t + 0.5);
            });
        }
    } catch { /* ignore */ }
};

// ── Avatar ────────────────────────────────────────────────────────────────────
const Av = ({ url, name, size = 48 }: { url?: string | null; name: string; size?: number }) => {
    const hue = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
    return (
        <div className="rounded-2xl overflow-hidden flex items-center justify-center font-black text-white shrink-0"
            style={{ width: size, height: size, background: url ? undefined : `hsl(${hue},60%,50%)` }}>
            {url ? <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                : name.slice(0, 2).toUpperCase()}
        </div>
    );
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface IncomingCall {
    fromUserId: string; fromName: string; fromAvatar: string | null;
    conversationId: string; roomName: string; mode: 'audio' | 'video';
}
interface Props { myId: string; myName: string; myAvatar: string | null; }

// ── Component ─────────────────────────────────────────────────────────────────
export const GlobalCallManager: React.FC<Props> = ({ myId, myName, myAvatar }) => {
    const [incoming, setIncoming] = useState<IncomingCall | null>(null);
    const [activeCall, setActiveCall] = useState<{ url: string; partnerName: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const statusRef = useRef<'idle' | 'active'>('idle');
    const myNameRef = useRef(myName);
    useEffect(() => { myNameRef.current = myName; }, [myName]);

    // Register window.__startCall
    useEffect(() => {
        (window as any).__startCall = async (
            partnerId: string, pName: string, _pAvatar: string | null, mode: 'audio' | 'video'
        ) => {
            if (statusRef.current !== 'idle') return;
            statusRef.current = 'active';
            setError(null);
            const roomName = generateRoomName();
            const convId = getConversationId(myId, partnerId);
            try {
                console.log('[Call] Sending offer to', partnerId, '| room:', roomName);
                await sendSignal(convId, myId, partnerId, 'offer', {
                    roomName, mode, callerName: myNameRef.current, callerAvatar: myAvatar,
                });
                console.log('[Call] Offer sent');
                const url = buildJitsiUrl(roomName, myNameRef.current, mode === 'audio');
                setActiveCall({ url, partnerName: pName });
            } catch (e: any) {
                console.error('[Call] Error:', e);
                setError(e?.message ?? 'Could not start call. Check webrtc_signals table exists.');
                statusRef.current = 'idle';
            }
        };
        return () => { delete (window as any).__startCall; };
    }, [myId, myAvatar]);

    // Global signal listener
    useEffect(() => {
        if (!myId) return;
        const ch = supabase
            .channel(`gcall_${myId}`)
            .on('postgres_changes', {
                event: 'INSERT', schema: 'public', table: 'webrtc_signals',
            }, (payload: any) => {
                const sig = payload.new;
                if (sig.to_user_id !== myId) return;
                console.log('[Call] Signal received:', sig.type);
                if (sig.type === 'offer') {
                    playRingTone();
                    setIncoming({
                        fromUserId: sig.from_user_id,
                        fromName: sig.payload.callerName ?? 'Someone',
                        fromAvatar: sig.payload.callerAvatar ?? null,
                        conversationId: sig.conversation_id,
                        roomName: sig.payload.roomName,
                        mode: sig.payload.mode ?? 'audio',
                    });
                } else if (sig.type === 'call-end' || sig.type === 'call-reject') {
                    setIncoming(null);
                    statusRef.current = 'idle';
                    setActiveCall(null);
                }
            })
            .subscribe((status) => console.log('[Call] Channel:', status));
        return () => { supabase.removeChannel(ch); };
    }, [myId]);

    const acceptCall = () => {
        if (!incoming) return;
        statusRef.current = 'active';
        const url = buildJitsiUrl(incoming.roomName, myNameRef.current, incoming.mode === 'audio');
        setIncoming(null);
        setActiveCall({ url, partnerName: incoming.fromName });
    };

    const declineCall = () => {
        if (!incoming) return;
        sendSignal(incoming.conversationId, myId, incoming.fromUserId, 'call-reject', {}).catch(() => { });
        setIncoming(null);
    };

    const hangUp = () => {
        statusRef.current = 'idle';
        setActiveCall(null);
        setError(null);
    };

    return (
        <>
            {/* Incoming call popup */}
            <AnimatePresence>
                {incoming && (
                    <motion.div key="incoming"
                        initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -120, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] bg-white rounded-3xl shadow-2xl border border-stone-100 p-5 w-[340px]"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <Av url={incoming.fromAvatar} name={incoming.fromName} size={56} />
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                                    transition={{ repeat: Infinity, duration: 1.4 }}
                                    className="absolute inset-0 rounded-2xl border-4 border-indigo-400 pointer-events-none" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-black text-stone-900 text-base truncate">{incoming.fromName}</p>
                                <p className="text-sm text-stone-400 flex items-center gap-1.5 mt-0.5">
                                    {incoming.mode === 'video' ? <Video size={13} /> : <Phone size={13} />}
                                    Incoming {incoming.mode} call…
                                </p>
                            </div>
                            <button onClick={declineCall} className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-300 transition-all">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={declineCall}
                                className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all">
                                <PhoneOff size={16} /> Decline
                            </button>
                            <button onClick={acceptCall}
                                className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                                <Phone size={16} /> Accept
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Error toast */}
            <AnimatePresence>
                {error && (
                    <motion.div key="err"
                        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
                        className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[200] bg-red-600 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-bold flex items-center gap-3"
                    >
                        {error}
                        <button onClick={() => setError(null)}><X size={14} /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Active call — Jitsi in iframe */}
            <AnimatePresence>
                {activeCall && (
                    <motion.div key="call"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-stone-900 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-stone-900 border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <Av url={null} name={activeCall.partnerName} size={36} />
                                <div>
                                    <p className="font-bold text-white text-sm">{activeCall.partnerName}</p>
                                    <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> In call
                                    </p>
                                </div>
                            </div>
                            <button onClick={hangUp}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all">
                                <PhoneOff size={15} /> End Call
                            </button>
                        </div>

                        {/* Jitsi iframe — direct URL, no External API, no moderator gate */}
                        <iframe
                            src={activeCall.url}
                            allow="camera *; microphone *; fullscreen *; display-capture *; autoplay *"
                            className="flex-1 w-full border-0"
                            title="Call"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
