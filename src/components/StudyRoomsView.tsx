import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Plus, Globe, Lock, Search, X, Send, ArrowLeft,
  Trash2, Crown, Loader2, MessageSquare, Unlock, Pin, Megaphone,
  Reply, Bot, CheckCheck, CornerUpLeft, Mic, MessageCircle,
  BookOpen, Trash, Volume2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import {
  getRooms, createRoom, deleteRoom, joinRoom, leaveRoom,
  getRoomMembers, getRoomMessages, sendRoomMessage, getReactions,
  toggleReaction, pinMessage, sendAnnouncement, saveQuickReactions, getQuickReactions,
  getThreadMessages, getRoomVocab, addVocabWord, deleteVocabWord, VocabEntry,
  StudyRoom, RoomMessage, RoomMember
} from '../services/dbService';
import { generateAnswerExplanation } from '../services/aiService';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const DEFAULT_REACTIONS = ['👍', '❤️', '😂', '🔥', '✅', '🤔', '😮', '😢', '🎉', '👏'];
const SLASH_COMMANDS = ['/translate', '/explain', '/quiz'];


const LANGUAGES = ['French', 'Spanish', 'German', 'Italian', 'Japanese', 'Portuguese', 'Chinese'];
const LANG_FLAGS: Record<string, string> = {
  French: '🇫🇷', Spanish: '🇪🇸', German: '🇩🇪',
  Italian: '🇮🇹', Japanese: '🇯🇵', Portuguese: '🇵🇹', Chinese: '🇨🇳',
};
const LANG_COLORS: Record<string, string> = {
  French: '#6366f1', Spanish: '#f59e0b', German: '#0ea5e9',
  Italian: '#ec4899', Japanese: '#ef4444', Portuguese: '#10b981', Chinese: '#8b5cf6',
};

const Avatar = ({ url, name, size = 36 }: { url?: string | null; name: string; size?: number }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const hue = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  const cls = `rounded-xl overflow-hidden flex items-center justify-center shrink-0 font-black text-white text-xs`;
  if (url) return <div className={cls} style={{ width: size, height: size }}><img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>;
  return <div className={cls} style={{ width: size, height: size, background: `hsl(${hue},60%,50%)` }}>{initials}</div>;
};

// ── Room Chat ─────────────────────────────────────────────────────────────────
const RoomChat = ({ room, onLeave }: { room: StudyRoom; onLeave: () => void }) => {
  const { user } = useAppStore();
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [reactions, setReactions] = useState<{ message_id: string; emoji: string; user_id: string }[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [replyTo, setReplyTo] = useState<RoomMessage | null>(null);
  const [hoveredMsg, setHoveredMsg] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<{ userId: string; name: string; answer: string }[]>([]);
  const [emojiPickerMsg, setEmojiPickerMsg] = useState<string | null>(null);
  const [quickReactions, setQuickReactions] = useState<string[]>(DEFAULT_REACTIONS);
  // Feature 1: Voice messages
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  // Feature 2: Message threads
  const [threadMsg, setThreadMsg] = useState<RoomMessage | null>(null);
  const [threadMessages, setThreadMessages] = useState<RoomMessage[]>([]);
  const [threadInput, setThreadInput] = useState('');
  const [threadCounts, setThreadCounts] = useState<Record<string, number>>({});
  // Feature 3: Online presence
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const presenceTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  // Feature 4: Vocabulary board
  const [showVocabBoard, setShowVocabBoard] = useState(false);
  const [vocabWords, setVocabWords] = useState<VocabEntry[]>([]);
  const [vocabInput, setVocabInput] = useState({ word: '', translation: '' });
  // Feature 5: Daily challenge
  const [showChallenge, setShowChallenge] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const myId = (user as any)?.id;
  const displayName = (user as any)?.displayName || (user as any)?.email?.split('@')[0] || 'Anonymous';
  const avatarUrl = (user as any)?.avatarUrl || null;
  const isOwner = myId === room.created_by;

  useEffect(() => {
    getRoomMessages(room.id).then(setMessages).catch(() => { });
    getRoomMembers(room.id).then(setMembers).catch(() => { });
    getReactions(room.id).then(setReactions).catch(() => { });

    // Load quick reactions — localStorage first (instant), then Supabase (authoritative)
    const lsKey = `quick_reactions_${myId}`;
    const cached = localStorage.getItem(lsKey);
    if (cached) {
      try { setQuickReactions(JSON.parse(cached)); } catch { /* ignore */ }
    }
    if (myId) {
      getQuickReactions(myId).then(saved => {
        if (saved && saved.length > 0) {
          setQuickReactions(saved);
          localStorage.setItem(lsKey, JSON.stringify(saved));
        }
      }).catch(() => {});
    }

    // Feature 4: Load vocab board
    getRoomVocab(room.id).then(setVocabWords).catch(() => {});

    // Load thread counts — fetch only reply messages to count per parent
    (async () => {
      try {
        const { data } = await supabase.from('room_messages')
          .select('reply_to_id')
          .eq('room_id', room.id)
          .not('reply_to_id', 'is', null);
        const counts: Record<string, number> = {};
        (data ?? []).forEach((m: any) => {
          if (m.reply_to_id) counts[m.reply_to_id] = (counts[m.reply_to_id] || 0) + 1;
        });
        setThreadCounts(counts);
      } catch { /* ignore */ }
    })();

    // Feature 5: Daily challenge
    const CHALLENGES: Record<string, string[]> = {
      French: ['Use "néanmoins" (nevertheless) in a sentence','Describe your morning routine in French','Write 3 sentences using the passé composé','Use a French idiom you learned recently','Introduce yourself formally in French'],
      Spanish: ['Use "sin embargo" in a sentence','Describe your favorite food in Spanish','Write 3 sentences using the preterite','Use a Spanish idiom you know','Greet someone formally in Spanish'],
      German: ['Use "obwohl" in a sentence','Describe your city in German','Write 3 sentences using Perfekt','Use a German compound word','Introduce yourself in German'],
      Italian: ['Use "tuttavia" in a sentence','Describe your weekend in Italian','Write 3 sentences using passato prossimo','Use an Italian expression','Greet someone in Italian'],
      Japanese: ['Use a て-form verb in a sentence','Describe your hobby in Japanese','Write 3 sentences using past tense','Use a Japanese counter word','Introduce yourself in Japanese'],
      Portuguese: ['Use "porém" in a sentence','Describe your family in Portuguese','Write 3 sentences using pretérito perfeito','Use a Portuguese expression','Greet someone formally in Portuguese'],
      Chinese: ['Use 虽然...但是 in a sentence','Describe your daily routine in Chinese','Write 3 sentences using 了','Use a Chinese chengyu','Introduce yourself in Chinese'],
    };
    const today = new Date().toDateString();
    const dismissKey = `challenge_dismissed_${room.id}_${today}`;
    if (!localStorage.getItem(dismissKey)) {
      const list = CHALLENGES[room.language] ?? CHALLENGES['French'];
      const idx = (today + room.language).split('').reduce((a, c) => a + c.charCodeAt(0), 0) % list.length;
      setDailyChallenge(list[idx]);
      setShowChallenge(true);
    }

    const channel = supabase
      .channel(`room-${room.id}`, { config: { broadcast: { self: false, ack: false } } })
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_messages', filter: `room_id=eq.${room.id}` },
        payload => {
          const msg = payload.new as RoomMessage;
          if (msg.reply_to_id) {
            // Thread reply — update count and add to open thread panel if it matches
            setThreadCounts(prev => ({ ...prev, [msg.reply_to_id!]: (prev[msg.reply_to_id!] || 0) + 1 }));
            setThreadMsg(currentThread => {
              if (currentThread && currentThread.id === msg.reply_to_id) {
                // This reply belongs to the currently open thread — add it
                setThreadMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, msg]);
              }
              return currentThread;
            });
            return; // Never add thread replies to main chat
          }
          // Regular message — add to main chat, replacing optimistic if present
          setMessages(prev => {
            // Replace optimistic: match by user + approximate time (within 5s) + content prefix
            const optIdx = prev.findIndex(m =>
              m.id.startsWith('opt-') &&
              m.user_id === msg.user_id &&
              m.content === msg.content
            );
            if (optIdx !== -1) {
              const next = [...prev];
              next[optIdx] = msg;
              return next;
            }
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        })
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'room_messages', filter: `room_id=eq.${room.id}` },
        payload => setMessages(prev => prev.map(m => m.id === payload.new.id ? { ...m, ...payload.new } : m)))
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'room_members', filter: `room_id=eq.${room.id}` },
        payload => { const m = payload.new as RoomMember; setMembers(prev => prev.some(x => x.user_id === m.user_id) ? prev : [...prev, m]); })
      .on('postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'room_members', filter: `room_id=eq.${room.id}` },
        payload => setMembers(prev => prev.filter(m => m.user_id !== (payload.old as any).user_id)))
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'message_reactions' },
        () => getReactions(room.id).then(setReactions).catch(() => { }))
      .on('broadcast', { event: 'typing' }, ({ payload }: any) => {
        if (payload.userId === myId) return;
        setTypingUsers(prev => prev.includes(payload.name) ? prev : [...prev, payload.name]);
        setTimeout(() => setTypingUsers(prev => prev.filter(n => n !== payload.name)), 3000);
      })
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'room_vocabulary', filter: `room_id=eq.${room.id}` },
        () => getRoomVocab(room.id).then(setVocabWords).catch(() => {}))
      .on('broadcast', { event: 'presence' }, ({ payload }: any) => {
        if (payload.userId === myId) return;
        setOnlineUsers(prev => prev.includes(payload.name) ? prev : [...prev, payload.name]);
        setTimeout(() => setOnlineUsers(prev => prev.filter(n => n !== payload.name)), 35000);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('[Room] Realtime connected:', room.id);
          // Feature 3: broadcast presence on connect
          if (myId && channelRef.current) {
            channelRef.current.send({ type: 'broadcast', event: 'presence', payload: { userId: myId, name: displayName } });
          }
        }
      });

    channelRef.current = channel;
    // Feature 3: broadcast presence every 30s
    if (myId) {
      presenceTimer.current = setInterval(() => {
        channelRef.current?.send({ type: 'broadcast', event: 'presence', payload: { userId: myId, name: displayName } });
      }, 30000);
    }
    return () => {
      supabase.removeChannel(channel);
      channelRef.current = null;
      if (presenceTimer.current) clearInterval(presenceTimer.current);
    };
  }, [room.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const broadcastTyping = useCallback(() => {
    if (!myId || !channelRef.current) return;
    channelRef.current.send({ type: 'broadcast', event: 'typing', payload: { userId: myId, name: displayName } });
  }, [myId, displayName]);

  const handleInputChange = (val: string) => {
    setInput(val);
    setShowSlashMenu(val.startsWith('/'));
    if (val.trim()) {
      broadcastTyping();
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        // typing stopped — receiver auto-clears after 3s
      }, 3000);
    }
  };

  // Feature 7: paste image handler
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const items = Array.from(e.clipboardData.items) as DataTransferItem[];
    const imageItem = items.find((item: DataTransferItem) => item.type.startsWith('image/'));
    if (imageItem) {
      e.preventDefault();
      const file = imageItem.getAsFile();
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => setPastedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSend = async () => {
    // Feature 7: send pasted image as message
    if (pastedImage && myId) {
      const imgContent = `[image]${pastedImage}`;
      const optimistic: RoomMessage = {
        id: `opt-${Date.now()}`, room_id: room.id, user_id: myId,
        display_name: displayName, avatar_url: avatarUrl, content: imgContent,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, optimistic]);
      setPastedImage(null);
      try {
        await sendRoomMessage(room.id, myId, displayName, avatarUrl, imgContent, null);
      } catch {
        setMessages(prev => prev.filter(m => m.id !== optimistic.id));
      }
      return;
    }

    if (!input.trim() || !myId) return;
    const content = input.trim();
    setInput('');
    setReplyTo(null);
    setShowSlashMenu(false);

    // Handle slash commands
    if (content.startsWith('/translate ') || content.startsWith('/explain ')) {
      const phrase = content.replace(/^\/(translate|explain)\s+/, '');
      const cmd = content.startsWith('/translate') ? 'translate' : 'explain';
      const botMsg: RoomMessage = {
        id: `bot-${Date.now()}`, room_id: room.id, user_id: 'bot',
        display_name: '🤖 AI Assistant', avatar_url: null,
        content: `${cmd === 'translate' ? '🔄 Translating' : '💡 Explaining'} "${phrase}"…`,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMsg]);
      setAiLoading(true);
      try {
        const explanation = await generateAnswerExplanation(phrase, phrase, '', room.language as any, 'beginner');
        setMessages(prev => prev.map(m => m.id === botMsg.id ? { ...m, content: `${cmd === 'translate' ? '🔄' : '💡'} **${phrase}**: ${explanation}` } : m));
      } catch { setMessages(prev => prev.filter(m => m.id !== botMsg.id)); }
      finally { setAiLoading(false); }
      return;
    }

    if (content.startsWith('/quiz ')) {
      const q = content.replace('/quiz ', '');
      setQuizQuestion(q);
      setQuizAnswers([]);
      setQuizActive(true);
      await sendRoomMessage(room.id, myId, displayName, avatarUrl, `🎯 **Quiz Challenge!** ${q}`, null);
      return;
    }

    const optimistic: RoomMessage = {
      id: `opt-${Date.now()}`, room_id: room.id, user_id: myId,
      display_name: displayName, avatar_url: avatarUrl, content,
      created_at: new Date().toISOString(),
      reply_to_id: replyTo?.id, reply_to_content: replyTo?.content, reply_to_name: replyTo?.display_name,
    };
    setMessages(prev => [...prev, optimistic]);
    setSending(true);
    try {
      await sendRoomMessage(room.id, myId, displayName, avatarUrl, content, replyTo);
    } catch {
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
      setInput(content);
    } finally { setSending(false); }
  };

  const handleReaction = async (msgId: string, emoji: string) => {
    if (!myId) return;
    await toggleReaction(msgId, myId, emoji).catch(() => { });
  };

  const handlePin = async (msgId: string, pinned: boolean) => {
    await pinMessage(msgId, !pinned).catch(() => { });
  };

  const handleAnnouncement = async () => {
    if (!announcementText.trim() || !myId) return;
    await sendAnnouncement(room.id, myId, displayName, avatarUrl, announcementText.trim()).catch(() => { });
    setAnnouncementText('');
    setShowAnnouncement(false);
  };

  // Feature 1: Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mr.ondataavailable = (e: BlobEvent) => audioChunksRef.current.push(e.data);
      mr.onstop = async () => {
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = async ev => {
          const b64 = ev.target?.result as string;
          if (myId) await sendRoomMessage(room.id, myId, displayName, avatarUrl, `[audio]${b64}`, null).catch(() => {});
        };
        reader.readAsDataURL(blob);
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch { setIsRecording(false); }
  };
  const stopRecording = () => { mediaRecorderRef.current?.stop(); setIsRecording(false); };
  // Feature 2: Thread
  const openThread = async (msg: RoomMessage) => {
    setThreadMsg(msg);
    const msgs = await getThreadMessages(msg.id).catch(() => []);
    setThreadMessages(msgs);
  };
  const sendThreadReply = async () => {
    if (!threadInput.trim() || !myId || !threadMsg) return;
    const c = threadInput.trim();
    setThreadInput('');
    // Optimistic: add to thread panel immediately
    const optimistic: RoomMessage = {
      id: `opt-thread-${Date.now()}`,
      room_id: room.id,
      user_id: myId,
      display_name: displayName,
      avatar_url: avatarUrl,
      content: c,
      created_at: new Date().toISOString(),
      reply_to_id: threadMsg.id,
    };
    setThreadMessages(prev => [...prev, optimistic]);
    setThreadCounts(prev => ({ ...prev, [threadMsg.id]: (prev[threadMsg.id] || 0) + 1 }));
    try {
      await sendRoomMessage(room.id, myId, displayName, avatarUrl, c, {
        id: threadMsg.id,
        content: threadMsg.content,
        display_name: threadMsg.display_name,
      });
      // Replace optimistic with real message
      const msgs = await getThreadMessages(threadMsg.id).catch(() => []);
      setThreadMessages(msgs);
    } catch {
      // Rollback optimistic
      setThreadMessages(prev => prev.filter(m => m.id !== optimistic.id));
      setThreadCounts(prev => ({ ...prev, [threadMsg.id]: Math.max(0, (prev[threadMsg.id] || 1) - 1) }));
      setThreadInput(c);
    }
  };
  // Feature 4: Vocab board
  const handleAddVocab = async () => {
    if (!vocabInput.word.trim() || !vocabInput.translation.trim()) return;
    await addVocabWord(room.id, vocabInput.word.trim(), vocabInput.translation.trim(), displayName).catch(() => {});
    setVocabInput({ word: '', translation: '' });
  };
  const handleLeave = async () => {
    if (myId) await leaveRoom(room.id, myId).catch(() => { });
    onLeave();
  };

  const getMessageReactions = (msgId: string) => {
    const map: Record<string, { count: number; mine: boolean }> = {};
    reactions.filter(r => r.message_id === msgId).forEach(r => {
      if (!map[r.emoji]) map[r.emoji] = { count: 0, mine: false };
      map[r.emoji].count++;
      if (r.user_id === myId) map[r.emoji].mine = true;
    });
    return map;
  };

  // Exclude thread replies from main chat — they only appear in the thread panel
  const mainMessages = messages.filter(m => !m.reply_to_id);
  const filteredMessages = searchQuery
    ? mainMessages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : mainMessages;
  const pinnedMessages = mainMessages.filter(m => m.is_pinned);
  const announcements = messages.filter(m => m.is_announcement);

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={handleLeave} className="p-2 rounded-xl hover:bg-stone-100 text-stone-500 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl" style={{ background: `${LANG_COLORS[room.language]}20` }}>
            {LANG_FLAGS[room.language] || '🌍'}
          </div>
          <div>
            <h2 className="font-bold text-stone-900">{room.name}</h2>
            <p className="text-xs text-stone-400">{members.length} member{members.length !== 1 ? 's' : ''} · {room.language}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSearch(s => !s)} className={cn('p-2 rounded-xl transition-colors', showSearch ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-400')}>
            <Search size={16} />
          </button>
          {isOwner && (
            <button onClick={() => setShowAnnouncement(s => !s)} className={cn('p-2 rounded-xl transition-colors', showAnnouncement ? 'bg-amber-500 text-white' : 'hover:bg-stone-100 text-stone-400')} title="Post announcement">
              <Megaphone size={16} />
            </button>
          )}
          {room.is_private && <Lock size={14} className="text-stone-400 ml-1" />}
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
            <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl px-3 py-2">
              <Search size={14} className="text-stone-400" />
              <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search messages…" className="flex-1 text-sm focus:outline-none text-stone-700 placeholder-stone-300" />
              {searchQuery && <button onClick={() => setSearchQuery('')}><X size={13} className="text-stone-400" /></button>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Announcement composer */}
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-3">
            <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-2xl p-3">
              <Megaphone size={16} className="text-amber-500 shrink-0 mt-1" />
              <input value={announcementText} onChange={e => setAnnouncementText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAnnouncement()}
                placeholder="Write an announcement…" className="flex-1 text-sm bg-transparent focus:outline-none text-stone-700 placeholder-amber-300" />
              <button onClick={handleAnnouncement} disabled={!announcementText.trim()}
                className="px-3 py-1 bg-amber-500 text-white rounded-xl text-xs font-bold disabled:opacity-40">Post</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feature 5: Daily challenge banner */}
      {showChallenge && dailyChallenge && (
        <div className="mb-3 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-2xl px-4 py-3 flex items-start gap-3">
          <span className="text-lg shrink-0">🎯</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-violet-500 uppercase tracking-widest mb-0.5">Daily Challenge</p>
            <p className="text-sm text-violet-800 font-medium">{dailyChallenge}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => { localStorage.setItem(`challenge_dismissed_${room.id}_${new Date().toDateString()}`, '1'); setShowChallenge(false); }}
              className="text-xs font-bold text-violet-500 hover:text-violet-700 px-2 py-1 rounded-lg hover:bg-violet-100 transition-colors">✓ Done</button>
            <button onClick={() => setShowChallenge(false)} className="text-violet-300 hover:text-violet-500"><X size={13} /></button>
          </div>
        </div>
      )}

      {/* Feature 4: Vocabulary board */}
      {showVocabBoard && (
        <div className="mb-3 bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-stone-50">
            <div className="flex items-center gap-2"><BookOpen size={13} className="text-emerald-500" /><p className="text-xs font-black text-stone-700">Shared Vocabulary</p></div>
            <button onClick={() => setShowVocabBoard(false)}><X size={13} className="text-stone-400" /></button>
          </div>
          <div className="max-h-40 overflow-y-auto divide-y divide-stone-50">
            {vocabWords.length === 0 && <p className="text-xs text-stone-300 text-center py-4">No words yet — add the first one!</p>}
            {vocabWords.map(v => (
              <div key={v.id} className="flex items-center gap-3 px-4 py-2">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-stone-800">{v.word}</span>
                  <span className="text-stone-300 mx-1.5">→</span>
                  <span className="text-sm text-stone-500">{v.translation}</span>
                </div>
                <span className="text-[9px] text-stone-300 shrink-0">{v.added_by.split(' ')[0]}</span>
                {v.added_by === displayName && (
                  <button onClick={() => deleteVocabWord(v.id).catch(() => {})} className="text-stone-300 hover:text-red-400 transition-colors"><Trash size={11} /></button>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2 px-4 py-2.5 border-t border-stone-50">
            <input value={vocabInput.word} onChange={e => setVocabInput(v => ({ ...v, word: e.target.value }))} placeholder="Word…" className="flex-1 px-3 py-1.5 bg-stone-50 rounded-xl text-xs focus:outline-none text-stone-700" />
            <input value={vocabInput.translation} onChange={e => setVocabInput(v => ({ ...v, translation: e.target.value }))} placeholder="Translation…" onKeyDown={e => e.key === 'Enter' && handleAddVocab()} className="flex-1 px-3 py-1.5 bg-stone-50 rounded-xl text-xs focus:outline-none text-stone-700" />
            <button onClick={handleAddVocab} disabled={!vocabInput.word.trim() || !vocabInput.translation.trim()} className="px-3 py-1.5 bg-emerald-500 text-white rounded-xl text-xs font-bold disabled:opacity-40">Add</button>
          </div>
        </div>
      )}

      {/* Pinned messages */}
      {pinnedMessages.length > 0 && (
        <div className="mb-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-3 py-2 flex items-start gap-2">
          <Pin size={13} className="text-indigo-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Pinned</p>
            <p className="text-xs text-indigo-700 truncate">{pinnedMessages[pinnedMessages.length - 1].content}</p>
          </div>
        </div>
      )}

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Chat */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {filteredMessages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-stone-300 gap-2">
                <MessageSquare size={32} className="opacity-30" />
                <p className="text-sm">{searchQuery ? 'No messages found' : 'No messages yet — say hello!'}</p>
              </div>
            )}
            {filteredMessages.map((msg, i) => {
              const isMe = msg.user_id === myId;
              const isBot = msg.user_id === 'bot';
              const showAvatar = i === 0 || filteredMessages[i - 1].user_id !== msg.user_id;
              const msgReactions = getMessageReactions(msg.id);
              const hasReactions = Object.keys(msgReactions).length > 0;
              const isImage = msg.content.startsWith('[image]');

              if (msg.is_announcement) {
                return (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 my-2">
                    <Megaphone size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-0.5">Announcement</p>
                      <p className="text-sm text-amber-800">{msg.content}</p>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className={cn('group flex gap-2.5 relative', isMe ? 'flex-row-reverse' : 'flex-row')}
                  onMouseEnter={() => setHoveredMsg(msg.id)}
                  onMouseLeave={() => setHoveredMsg(null)}>

                  {/* Avatar */}
                  {showAvatar
                    ? <Avatar url={isBot ? null : msg.avatar_url} name={msg.display_name} size={30} />
                    : <div style={{ width: 30 }} />}

                  <div className={cn('max-w-[70%] flex flex-col', isMe ? 'items-end' : 'items-start')}>
                    {showAvatar && (
                      <p className={cn('text-[10px] font-bold text-stone-400 px-1 mb-0.5', isMe && 'text-right')}>
                        {isMe ? 'You' : msg.display_name}
                        {isBot && <span className="ml-1 text-indigo-400">· AI</span>}
                      </p>
                    )}

                    {/* Reply preview */}
                    {msg.reply_to_content && (
                      <div className={cn('flex items-start gap-1.5 px-2.5 py-1.5 rounded-xl mb-1 max-w-full border-l-2',
                        isMe ? 'bg-stone-800 border-stone-600' : 'bg-stone-100 border-stone-300')}>
                        <CornerUpLeft size={10} className={isMe ? 'text-stone-400 shrink-0 mt-0.5' : 'text-stone-400 shrink-0 mt-0.5'} />
                        <div className="min-w-0">
                          <p className={cn('text-[9px] font-bold truncate', isMe ? 'text-stone-400' : 'text-stone-500')}>{msg.reply_to_name}</p>
                          <p className={cn('text-[10px] truncate', isMe ? 'text-stone-300' : 'text-stone-500')}>{msg.reply_to_content}</p>
                        </div>
                      </div>
                    )}

                    {/* Message bubble */}
                    <div className={cn('px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed relative',
                      isBot ? 'bg-indigo-50 text-indigo-800 border border-indigo-100' :
                        isMe ? 'bg-stone-900 text-white rounded-tr-sm' : 'bg-stone-100 text-stone-800 rounded-tl-sm',
                      msg.is_pinned && 'ring-2 ring-indigo-300')}>
                      {/* Feature 7: image rendering */}
                      {isImage
                        ? <img src={msg.content.replace('[image]', '')} alt="shared" className="max-w-[200px] max-h-[200px] rounded-xl object-cover" />
                        : msg.content.startsWith('[audio]')
                          ? <audio controls src={msg.content.replace('[audio]', '')} className="max-w-[200px] h-8" style={{ height: 32 }} />
                          : msg.content}
                    </div>

                    {/* Reactions */}
                    {hasReactions && (
                      <div className="flex flex-wrap gap-1 mt-1 px-1">
                        {Object.entries(msgReactions).map(([emoji, { count, mine }]) => (
                          <button key={emoji} onClick={() => handleReaction(msg.id, emoji)}
                            title={mine ? 'Remove your reaction' : 'React'}
                            className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all',
                              mine ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm scale-105' : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200')}>
                            {emoji} <span className="font-bold">{count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp + read receipt */}
                    <div className={cn('flex items-center gap-1 mt-0.5 px-1', isMe && 'flex-row-reverse')}>
                      <p className="text-[9px] text-stone-300">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {isMe && <CheckCheck size={11} className="text-stone-300" />}
                    </div>
                    {/* Thread reply count link */}
                    {(threadCounts[msg.id] || 0) > 0 && (
                      <button onClick={() => openThread(msg)}
                        className={cn('flex items-center gap-1.5 mt-1.5 px-2 py-1 rounded-xl text-xs font-bold transition-all border',
                          threadMsg?.id === msg.id
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                            : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600')}>
                        <MessageCircle size={12} />
                        View {threadCounts[msg.id]} {threadCounts[msg.id] === 1 ? 'reply' : 'more replies'} in thread
                      </button>
                    )}
                  </div>

                  {/* Hover action bar — appears above the bubble */}
                  <AnimatePresence>
                    {hoveredMsg === msg.id && !msg.id.startsWith('opt-') && (
                      <motion.div initial={{ opacity: 0, y: 4, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        className={cn('absolute -top-9 flex items-center gap-0.5 bg-white border border-stone-200 rounded-2xl shadow-lg px-1.5 py-1 z-20',
                          isMe ? 'right-0' : 'left-0')}>
                        <div className="flex items-center gap-0.5 overflow-x-auto" style={{ maxWidth: 260, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {quickReactions.map(emoji => {
                          const myReaction = reactions.find(r => r.message_id === msg.id && r.user_id === myId);
                          const isMyEmoji = myReaction?.emoji === emoji;
                          return (
                            <button key={emoji} onClick={() => handleReaction(msg.id, emoji)}
                              title={isMyEmoji ? 'Remove reaction' : 'React'}
                              className={cn('w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-all',
                                isMyEmoji ? 'bg-indigo-100 ring-2 ring-indigo-400 scale-110' : 'hover:bg-stone-100')}>
                              {emoji}
                            </button>
                          );
                        })}
                        </div>
                        <div className="w-px h-4 bg-stone-200 mx-0.5 shrink-0" />
                        {/* + more emojis */}
                        <button onClick={() => setEmojiPickerMsg(emojiPickerMsg === msg.id ? null : msg.id)}
                          className={cn('w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-colors', emojiPickerMsg === msg.id ? 'bg-stone-900 text-white' : 'hover:bg-stone-100 text-stone-400')}
                          title="More reactions">
                          ➕
                        </button>
                        <div className="w-px h-4 bg-stone-200 mx-0.5" />
                        <button onClick={() => { setReplyTo(msg); inputRef.current?.focus(); }}
                          className="w-7 h-7 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-400 transition-colors" title="Reply">
                          <Reply size={13} />
                        </button>
                        <button onClick={() => openThread(msg)}
                          className="w-7 h-7 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-400 transition-colors" title="Open thread">
                          <MessageCircle size={13} />
                        </button>
                        {isOwner && (
                          <button onClick={() => handlePin(msg.id, !!msg.is_pinned)}
                            className={cn('w-7 h-7 rounded-xl flex items-center justify-center transition-colors', msg.is_pinned ? 'bg-indigo-100 text-indigo-500' : 'hover:bg-stone-100 text-stone-400')} title="Pin">
                            <Pin size={13} />
                          </button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Full emoji picker — outside AnimatePresence, inside message row */}
                  {emojiPickerMsg === msg.id && (
                    <div className={cn('absolute z-50', isMe ? 'right-0' : 'left-0')} style={{ top: '-360px' }}
                      onMouseLeave={() => setEmojiPickerMsg(null)}>
                      <Picker
                        data={data}
                        onEmojiSelect={(e: any) => {
                          const emoji = e.native;
                          handleReaction(msg.id, emoji);
                          setEmojiPickerMsg(null);
                          setQuickReactions(prev => {
                            if (prev.includes(emoji)) return prev;
                            const next = [emoji, ...prev].slice(0, 10);
                            if (myId) {
                              const lsKey = `quick_reactions_${myId}`;
                              localStorage.setItem(lsKey, JSON.stringify(next));
                              saveQuickReactions(myId, next).catch(() => {});
                            }
                            return next;
                          });
                        }}
                        theme="light"
                        previewPosition="none"
                        skinTonePosition="none"
                        maxFrequentRows={1}
                        perLine={8}
                        set="native"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Typing indicator */}
            {typingUsers.length > 0 && (
              <div className="flex items-center gap-2 px-1">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-1.5 h-1.5 bg-stone-400 rounded-full"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
                <p className="text-[10px] text-stone-400">{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing…</p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Reply preview */}
          <AnimatePresence>
            {replyTo && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border-t border-stone-100">
                  <CornerUpLeft size={13} className="text-stone-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-stone-500">{replyTo.display_name}</p>
                    <p className="text-xs text-stone-400 truncate">{replyTo.content}</p>
                  </div>
                  <button onClick={() => setReplyTo(null)} className="text-stone-400 hover:text-stone-600"><X size={14} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feature 7: Pasted image preview */}
          <AnimatePresence>
            {pastedImage && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border-t border-stone-100">
                  <img src={pastedImage} alt="preview" className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                  <p className="text-xs text-stone-500 flex-1">Image ready to send</p>
                  <button onClick={() => setPastedImage(null)} className="text-stone-400 hover:text-stone-600"><X size={14} /></button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slash command menu */}
          <AnimatePresence>
            {showSlashMenu && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                className="mx-3 mb-1 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden">
                {SLASH_COMMANDS.filter(c => c.startsWith(input)).map(cmd => (
                  <button key={cmd} onClick={() => { setInput(cmd + ' '); setShowSlashMenu(false); inputRef.current?.focus(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50 text-left transition-colors">
                    <Bot size={14} className="text-indigo-400" />
                    <div>
                      <p className="text-sm font-bold text-stone-700">{cmd}</p>
                      <p className="text-[10px] text-stone-400">
                        {cmd === '/translate' ? 'Translate a phrase' : cmd === '/explain' ? 'Explain grammar' : 'Start a quiz challenge'}
                      </p>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-3 border-t border-stone-100">
            {!myId ? (
              <p className="text-center text-xs text-stone-400 py-2">Sign in to send messages</p>
            ) : (
              <div className="flex gap-2 items-center">
                <input ref={inputRef} value={input} onChange={e => handleInputChange(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  onPaste={handlePaste}
                  placeholder="Type a message or /translate, /explain, /quiz…"
                  className="flex-1 px-4 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 placeholder-stone-300" />
                <button
                  onMouseDown={startRecording} onMouseUp={stopRecording} onMouseLeave={stopRecording}
                  onTouchStart={startRecording} onTouchEnd={stopRecording}
                  className={cn('w-10 h-10 rounded-2xl flex items-center justify-center transition-colors shrink-0',
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}
                  title="Hold to record voice message">
                  <Mic size={16} />
                </button>
                <button onClick={handleSend} disabled={(!input.trim() && !pastedImage) || sending}
                  className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition-colors disabled:opacity-40">
                  {sending || aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Members sidebar */}
        <div className="w-52 bg-white rounded-3xl border border-stone-100 shadow-sm p-4 flex flex-col gap-3">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Members ({members.length})</p>
          <div className="space-y-2 overflow-y-auto flex-1">
            {members.map(m => {
              const isActive = (m as any).last_active_at && Date.now() - new Date((m as any).last_active_at).getTime() < 10 * 60 * 1000;
              return (
                <div key={m.user_id} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar url={m.avatar_url} name={m.display_name} size={28} />
                    <div className={cn('absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white', isActive ? 'bg-emerald-400' : 'bg-stone-300')} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-700 truncate">
                      {m.user_id === myId ? 'You' : m.display_name}
                      {m.user_id === room.created_by && <Crown size={9} className="inline ml-1 text-amber-400" />}
                    </p>
                    <p className="text-[9px] text-stone-400">{isActive ? 'Active' : 'Idle'}</p>
                  </div>
                </div>
              );
            })}
            {members.length === 0 && <p className="text-xs text-stone-300">No members yet</p>}
          </div>

          {/* Quick AI commands hint */}
          <div className="border-t border-stone-50 pt-3">
            <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest mb-2">AI Commands</p>
            {['/translate', '/explain', '/quiz'].map(cmd => (
              <button key={cmd} onClick={() => { setInput(cmd + ' '); inputRef.current?.focus(); }}
                className="w-full text-left text-[10px] text-stone-400 hover:text-indigo-500 py-0.5 transition-colors font-mono">
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 2: Thread panel — fixed overlay sliding in from right */}
      <AnimatePresence>
        {threadMsg && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 h-full w-80 bg-white border-l border-stone-100 shadow-2xl flex flex-col z-30 rounded-r-3xl"
          >
            {/* Thread header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-indigo-400" />
                <p className="text-sm font-black text-stone-800">Thread</p>
                {threadCounts[threadMsg.id] > 0 && (
                  <span className="text-[10px] font-bold text-stone-400">{threadCounts[threadMsg.id]} {threadCounts[threadMsg.id] === 1 ? 'reply' : 'replies'}</span>
                )}
              </div>
              <button onClick={() => setThreadMsg(null)} className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Parent message */}
            <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
              <div className="flex items-center gap-2 mb-1.5">
                <Avatar url={threadMsg.avatar_url} name={threadMsg.display_name} size={20} />
                <p className="text-[10px] font-bold text-stone-500">{threadMsg.display_name}</p>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">{threadMsg.content}</p>
            </div>

            {/* Replies */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {threadMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-stone-300 gap-2">
                  <MessageCircle size={28} className="opacity-20" />
                  <p className="text-xs">No replies yet — start the thread!</p>
                </div>
              )}
              {threadMessages.map((m, ti) => {
                const isMe = m.user_id === myId;
                return (
                  <div key={m.id} className={cn('flex gap-2.5', isMe ? 'flex-row-reverse' : 'flex-row')}>
                    <Avatar url={m.avatar_url} name={m.display_name} size={26} />
                    <div className={cn('max-w-[80%] flex flex-col', isMe ? 'items-end' : 'items-start')}>
                      <p className={cn('text-[9px] font-bold text-stone-400 px-1 mb-0.5', isMe && 'text-right')}>
                        {isMe ? 'You' : m.display_name}
                      </p>
                      <div className={cn('px-3 py-2 rounded-2xl text-xs leading-relaxed',
                        isMe ? 'bg-stone-900 text-white rounded-tr-sm' : 'bg-stone-100 text-stone-800 rounded-tl-sm')}>
                        {m.content}
                      </div>
                      <p className="text-[9px] text-stone-300 px-1 mt-0.5">
                        {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Thread input */}
            {myId ? (
              <div className="p-3 border-t border-stone-100">
                <div className="flex gap-2">
                  <input value={threadInput} onChange={e => setThreadInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendThreadReply()}
                    placeholder="Reply in thread…"
                    className="flex-1 px-3.5 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 placeholder-stone-300" />
                  <button onClick={sendThreadReply} disabled={!threadInput.trim()}
                    className="w-10 h-10 rounded-2xl bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition-colors disabled:opacity-40">
                    <Send size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-xs text-stone-400 p-3">Sign in to reply</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main View ─────────────────────────────────────────────────────────────────
const StudyRoomsView = () => {
  const { user } = useAppStore();
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [langFilter, setLangFilter] = useState('all');
  const [activeRoom, setActiveRoom] = useState<StudyRoom | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', language: 'French', description: '', isPrivate: false, maxCapacity: 20 });

  const myId = (user as any)?.id;
  const displayName = (user as any)?.displayName || (user as any)?.email?.split('@')[0] || 'Anonymous';
  const avatarUrl = (user as any)?.avatarUrl || null;

  const loadRooms = async () => {
    setLoading(true);
    try { setRooms(await getRooms()); } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { loadRooms(); }, []);

  // Realtime room list updates
  useEffect(() => {
    const sub = supabase.channel('study_rooms_list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'study_rooms' }, loadRooms)
      .subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  const handleJoin = async (room: StudyRoom) => {
    if (myId) await joinRoom(room.id, myId, displayName, avatarUrl).catch(() => { });
    setActiveRoom(room);
  };

  const handleCreate = async () => {
    if (!myId || !form.name.trim()) return;
    setCreating(true);
    try {
      const room = await createRoom(myId, form.name.trim(), form.language, form.description.trim(), form.isPrivate, form.maxCapacity);
      setShowCreate(false);
      setForm({ name: '', language: 'French', description: '', isPrivate: false, maxCapacity: 20 });
      await joinRoom(room.id, myId, displayName, avatarUrl).catch(() => { });
      setActiveRoom(room);
    } catch { /* silent */ }
    finally { setCreating(false); }
  };

  const handleDeleteRoom = async (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteRoom(roomId).catch(() => { });
    loadRooms();
  };

  if (activeRoom) {
    return (
      <div className="max-w-6xl mx-auto w-full py-8 px-4">
        <RoomChat room={activeRoom} onLeave={() => { setActiveRoom(null); loadRooms(); }} />
      </div>
    );
  }

  const filtered = rooms.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.language.toLowerCase().includes(search.toLowerCase());
    const matchLang = langFilter === 'all' || r.language === langFilter;
    return matchSearch && matchLang;
  });

  return (
    <div className="max-w-6xl mx-auto w-full py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-stone-900 mb-1">Study Rooms</h1>
          <p className="text-stone-400">Learn together with students from around the world</p>
        </div>
        {myId && (
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-700 transition-all shadow-lg">
            <Plus size={18} /> Create Room
          </button>
        )}
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search rooms…"
            className="w-full bg-white border border-stone-100 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 shadow-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setLangFilter('all')}
            className={cn('text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors',
              langFilter === 'all' ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-200 text-stone-400 hover:border-stone-400')}>
            All
          </button>
          {LANGUAGES.map(lang => (
            <button key={lang} onClick={() => setLangFilter(lang)}
              className={cn('text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors',
                langFilter === lang ? 'text-white border-transparent' : 'border-stone-200 text-stone-400 hover:border-stone-400')}
              style={langFilter === lang ? { background: LANG_COLORS[lang] } : {}}>
              {LANG_FLAGS[lang]} {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-stone-400">
          <Loader2 size={22} className="animate-spin" /> Loading rooms…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 space-y-3">
          <Users size={48} className="mx-auto text-stone-200" />
          <p className="text-stone-400 font-medium">No rooms found</p>
          {myId && <button onClick={() => setShowCreate(true)} className="text-sm text-emerald-600 font-bold hover:underline">Create the first one</button>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((room, i) => {
              const isJoined = (room.members ?? []).some(m => m.user_id === myId);
              const isOwner = myId === room.created_by;
              const count = room.member_count ?? 0;
              const activeMembers = (room.active_members ?? []);
              const visibleActive = activeMembers.slice(0, 4);
              const overflowActive = activeMembers.length > 4 ? activeMembers.length - 4 : 0;
              const createdAt = new Date(room.created_at);
              const ageMs = Date.now() - createdAt.getTime();
              const isNew = ageMs < 24 * 60 * 60 * 1000;
              const lastMsgMs = room.last_message ? Date.now() - new Date(room.last_message.created_at).getTime() : Infinity;
              const isActive = lastMsgMs < 5 * 60 * 1000;
              const langColor = LANG_COLORS[room.language] || '#94a3b8';
              const diff = (room as any).difficulty as string | undefined;
              const diffColor = diff === 'Advanced' ? '#ef4444' : diff === 'Intermediate' ? '#f59e0b' : '#10b981';
              const tags: string[] = (room as any).topic_tags ?? [];
              const maxCap: number = (room as any).max_capacity ?? 20;
              const pinned: string | undefined = (room as any).pinned_message;
              const isFull = count >= maxCap;

              return (
                <motion.div key={room.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => handleJoin(room)}
                  className="group bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-lg hover:border-stone-200 transition-all cursor-pointer overflow-hidden flex flex-col">

                  {/* Top color bar with difficulty ring on flag */}
                  <div className="h-1.5 w-full" style={{ background: langColor }} />

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {/* Row 1: flag + name + badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        {/* Flag with difficulty ring */}
                        <div className="relative shrink-0">
                          <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                            style={{ background: `${langColor}15`, outline: diff ? `2.5px solid ${diffColor}` : 'none', outlineOffset: 2 }}>
                            {LANG_FLAGS[room.language] || '🌍'}
                          </div>
                          {/* Active pulse */}
                          {isActive && <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-stone-900 text-sm leading-tight group-hover:text-emerald-600 transition-colors truncate">
                              {room.name}
                            </h3>
                            {isNew && <span className="text-[9px] font-black bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded-full shrink-0">NEW</span>}
                            {isJoined && <span className="text-[9px] font-black bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full shrink-0">JOINED</span>}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-bold text-stone-400">{room.language}</span>
                            <span className="text-stone-200">·</span>
                            {room.is_private
                              ? <><Lock size={9} className="text-stone-400" /><span className="text-[10px] text-stone-400">Private</span></>
                              : <><Globe size={9} className="text-stone-400" /><span className="text-[10px] text-stone-400">Public</span></>}
                            {diff && <>
                              <span className="text-stone-200">·</span>
                              <span className="text-[10px] font-bold" style={{ color: diffColor }}>{diff}</span>
                            </>}
                          </div>
                        </div>
                      </div>
                      {isOwner && (
                        <button onClick={e => handleDeleteRoom(room.id, e)}
                          className="p-1.5 rounded-xl hover:bg-red-50 text-stone-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>

                    {/* Description */}
                    {room.description && (
                      <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{room.description}</p>
                    )}

                    {/* Pinned message */}
                    {pinned && (
                      <div className="flex items-start gap-1.5 px-2.5 py-2 bg-amber-50 rounded-xl border border-amber-100">
                        <span className="text-amber-500 text-[10px] shrink-0 mt-0.5">📌</span>
                        <p className="text-[10px] text-amber-700 leading-relaxed line-clamp-1">{pinned}</p>
                      </div>
                    )}

                    {/* Topic tags */}
                    {tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">#{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Last message preview */}
                    {room.last_message && (
                      <div className="flex items-center gap-1.5 text-[10px] text-stone-400 truncate">
                        <MessageSquare size={10} className="shrink-0" />
                        <span className="font-bold text-stone-500 shrink-0">{room.last_message.display_name.split(' ')[0]}:</span>
                        <span className="truncate">{room.last_message.content}</span>
                      </div>
                    )}

                    {/* Footer: active avatars + capacity + activity + join */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-50 mt-auto">
                      <div className="flex items-center gap-2">
                        {/* Active member stacked avatars */}
                        <div className="flex items-center">
                          {visibleActive.map((m, mi) => (
                            <div key={m.user_id} style={{ marginLeft: mi === 0 ? 0 : -10, zIndex: 4 - mi, position: 'relative' }}>
                              <div className="rounded-full border-2 border-white overflow-hidden relative" style={{ width: 30, height: 30 }}>
                                <Avatar url={m.avatar_url} name={m.display_name} size={30} />
                                {/* green active dot */}
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white" />
                              </div>
                            </div>
                          ))}
                          {overflowActive > 0 && (
                            <div className="rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[9px] font-black text-stone-500"
                              style={{ width: 30, height: 30, marginLeft: -10, zIndex: 0 }}>
                              +{overflowActive}
                            </div>
                          )}
                          {activeMembers.length === 0 && (
                            <span className="text-[10px] text-stone-300">No one active</span>
                          )}
                        </div>

                        {/* Capacity pill */}
                        <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full',
                          isFull ? 'bg-red-100 text-red-500' : 'bg-stone-100 text-stone-400')}>
                          {count}/{maxCap} {isFull ? '· Full' : ''}
                        </span>

                        {/* Activity status */}
                        {isActive
                          ? <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />Live</span>
                          : room.last_message
                            ? <span className="text-[9px] text-stone-300">{Math.round(lastMsgMs / 60000)}m ago</span>
                            : null}
                      </div>
                      <span className={cn('text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity',
                        isFull && !isJoined ? 'text-red-400' : 'text-emerald-600')}>
                        {isFull && !isJoined ? 'Full' : isJoined ? 'Open →' : 'Join →'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create room modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-stone-900">Create a Room</h2>
                <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-xl hover:bg-stone-100 text-stone-400"><X size={18} /></button>
              </div>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Room name…"
                className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800" />
              <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
                className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800">
                {LANGUAGES.map(l => <option key={l} value={l}>{LANG_FLAGS[l]} {l}</option>)}
              </select>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Description (optional)…" rows={3}
                className="w-full px-4 py-3 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800 resize-none" />
              <label className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => setForm(f => ({ ...f, isPrivate: !f.isPrivate }))}
                  className={cn('w-10 h-6 rounded-full transition-colors relative', form.isPrivate ? 'bg-stone-900' : 'bg-stone-200')}>
                  <div className={cn('absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all', form.isPrivate ? 'left-5' : 'left-1')} />
                </div>
                <span className="text-sm font-medium text-stone-700 flex items-center gap-1.5">
                  {form.isPrivate ? <Lock size={13} /> : <Unlock size={13} />}
                  {form.isPrivate ? 'Private room' : 'Public room'}
                </span>
              </label>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-stone-700 shrink-0">Max members</label>
                <input type="number" min={2} max={100} value={form.maxCapacity}
                  onChange={e => setForm(f => ({ ...f, maxCapacity: Math.max(2, Math.min(100, Number(e.target.value))) }))}
                  className="flex-1 px-4 py-2.5 bg-stone-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-200 text-stone-800" />
              </div>
              <button onClick={handleCreate} disabled={!form.name.trim() || creating}
                className="w-full py-3.5 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {creating ? <><Loader2 size={16} className="animate-spin" /> Creating…</> : 'Create Room'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudyRoomsView;
