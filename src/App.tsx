import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from './store/useAppStore';
import Editor from './components/Editor';
import FileUpload from './components/FileUpload';
import QuizSettings from './components/QuizSettings';
import QuizView from './components/QuizView';
import LectureView from './components/LectureView';
import AnalyticsView from './components/AnalyticsView';
import FlashcardsView from './components/FlashcardsView';
import ChatView from './components/ChatView';
import StudyRoomsView from './components/StudyRoomsView';
import FloatingNotes from './components/FloatingNotes';
import LeaderboardView from './components/LeaderboardView';
import StoryModeView from './components/StoryModeView';
import GrammarDrillView from './components/GrammarDrillView';
import LanguageExchangeView from './components/LanguageExchangeView';
import {
  BookOpen, Upload, GraduationCap, User as UserIcon,
  BarChart2, Layers, MessageSquare, Users, Home,
  FileText, Zap, ArrowRight, Clock, Trash2, Play, Trophy,
  BookMarked, Sparkles, Users2, Mic
} from 'lucide-react';
import AuthPage from './components/AuthPage';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';
import { getStats, getSavedLectures, getFlashcards, getQuizHistory, getLectureProgress } from './services/dbService';
import { offlineCache } from './lib/offlineCache';
import { scheduleFlashcardReminder, scheduleDailyReminder } from './lib/notifications';
import PronunciationPracticeView from './components/PronunciationPracticeView';
import NotificationSettings from './components/NotificationSettings';
import { GlobalCallManager } from './components/GlobalCallManager';

// ── Floating message notification button ─────────────────────────────────────
const FloatingMessageButton = ({ count, onClick }: { count: number; onClick: () => void }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<any>(null);

  const shake = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (shakeRef.current) shakeRef.current.kill();
    gsap.set(el, { x: 0, rotation: 0 });
    shakeRef.current = gsap.to(el, {
      duration: 0.06,
      x: -8,
      rotation: -5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: 49,   // 50 half-cycles × 0.06s = 3s total
      onComplete: () => gsap.set(el, { x: 0, rotation: 0 }),
    });
  };

  useEffect(() => {
    const t = setTimeout(shake, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(shake, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed bottom-24 right-6 z-40"
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2.5 bg-indigo-600 text-white pl-4 pr-3 py-3 rounded-2xl shadow-lg shadow-indigo-300 hover:bg-indigo-700 active:scale-95 transition-all"
      >
        <MessageSquare size={18} />
        <span className="font-bold text-sm">
          {count} new message{count !== 1 ? 's' : ''}
        </span>
        <motion.span
          key={count}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shrink-0"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      </button>
    </motion.div>
  );
};

export default function App() {
  const { activeTab, setActiveTab, questions, lectures, user, setUser, savedLectures, setSavedLectures, setLectures, removeSavedLecture, setFlashcards, setQuizHistory, setLectureProgress, setQuestions, quizHistory } = useAppStore() as any;
  const [authLoading, setAuthLoading] = useState(true);
  const [stats, setStats] = useState<{ totalQuizzes: number; avgAccuracy: string; totalQuestions: number } | null>(null);
  const [userMeta, setUserMeta] = useState<{ firstName: string } | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const isSupabaseConfigured =
    (import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL) &&
    (import.meta.env.NEXT_PUBLIC_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL).startsWith('http');

  useEffect(() => {
    // Pre-load voices for SpeechSynthesis
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    if (!isSupabaseConfigured) { setAuthLoading(false); return; }

    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        setUser({ id: u.id, email: u.email, avatarUrl: u.user_metadata?.avatar_url, displayName: u.user_metadata?.full_name || u.user_metadata?.name });
        const meta = u.user_metadata;
        setUserMeta({ firstName: meta?.first_name || meta?.full_name?.split(' ')[0] || '' });
        getStats(u.id).then(setStats).catch(() => { });
        getSavedLectures(u.id).then(lectures => { setSavedLectures(lectures); lectures.forEach(l => offlineCache.saveLecture(l).catch(() => { })); }).catch(() => { });
        getFlashcards(u.id).then(cards => {
          setFlashcards(cards);
          cards.forEach(c => offlineCache.saveFlashcard(c).catch(() => { }));
          // Schedule notification if enabled
          if (localStorage.getItem('notifications_enabled') === 'true') {
            const dueCount = cards.filter(c => new Date(c.nextReview) <= new Date()).length;
            scheduleFlashcardReminder(dueCount, 5000);
            scheduleDailyReminder(9);
          }
        }).catch(() => { });
        getQuizHistory(u.id).then(setQuizHistory).catch(() => { });
        getLectureProgress(u.id).then((rows: any[]) => {
          rows.forEach(r => setLectureProgress(r.lectureId, r.completedSections, r.passedSections));
        }).catch(() => { });
        // sync local totalPoints to leaderboard on login
        const pts = useAppStore.getState().totalPoints;
        if (pts > 0) {
          import('./services/dbService').then(m =>
            m.upsertLeaderboardEntry(
              u.id,
              u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'Anonymous',
              u.user_metadata?.avatar_url || null,
              '', '',
              pts
            ).catch(() => { })
          );
        }
      }
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email, avatarUrl: session.user.user_metadata?.avatar_url, displayName: session.user.user_metadata?.full_name || session.user.user_metadata?.name });
        const meta = session.user.user_metadata;
        setUserMeta({ firstName: meta?.first_name || meta?.full_name?.split(' ')[0] || '' });
        getStats(session.user.id).then(setStats).catch(() => { });
        getSavedLectures(session.user.id).then(setSavedLectures).catch(() => { });
        getFlashcards(session.user.id).then(setFlashcards).catch(() => { });
        getQuizHistory(session.user.id).then(setQuizHistory).catch(() => { });
        getLectureProgress(session.user.id).then((rows: any[]) => {
          rows.forEach(r => setLectureProgress(r.lectureId, r.completedSections, r.passedSections));
        }).catch(() => { });
      } else {
        setUser(null);
        setUserMeta(null);
        setStats(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  // Global DM unread listener — fires whenever a new direct message arrives for this user
  useEffect(() => {
    if (!user) return;
    const userId = (user as any).id;
    const channel = supabase
      .channel(`global_dm_${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'direct_messages',
      }, (payload: any) => {
        // Only count messages NOT sent by me
        if (payload.new?.sender_id !== userId) {
          // Only count if not currently on exchange tab
          if (useAppStore.getState().activeTab !== 'exchange') {
            setUnreadMessages(prev => prev + 1);
          }
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Handle shared quiz URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quizCode = params.get('quiz');
    if (quizCode) {
      import('./components/QuizView').then(m => {
        const loaded = (m as any).loadSharedQuiz?.(quizCode);
        if (loaded && loaded.length > 0) {
          setQuestions(loaded);
          setActiveTab('editor');
          window.history.replaceState({}, '', window.location.pathname);
        }
      });
    }
  }, []);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) console.error('Error signing in:', error.message);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const hasQuestions = questions.length > 0;
  const hasLectures = lectures !== null;

  const TotalPointsBadge = () => {
    const { totalPoints } = useAppStore();
    return (
      <motion.div key={totalPoints} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="flex items-center gap-2 bg-amber-400 text-white px-4 py-1.5 rounded-2xl shadow-sm shadow-amber-200">
        <Zap size={14} fill="white" />
        <span className="font-black text-sm tabular-nums">{totalPoints.toLocaleString()} pts</span>
        <span className="text-white/70 text-xs font-bold">total</span>
      </motion.div>
    );
  };

  // Show spinner while Supabase checks session
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 animate-pulse">
            <GraduationCap className="text-white w-7 h-7" />
          </div>
          <p className="text-stone-400 text-sm font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated (and Supabase is configured)
  if (isSupabaseConfigured && !user) {
    return <AuthPage />;
  }

  const navItems = [
    { id: 'editor', label: 'Dashboard', icon: Home },
    { id: 'lectures', label: 'Lectures', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'chat', label: 'AI Tutor', icon: MessageSquare },
    { id: 'grammar-drill', label: 'Grammar Drill', icon: Zap },
    { id: 'story-mode', label: 'Story Mode', icon: BookMarked },
    { id: 'pronunciation', label: 'Pronunciation', icon: Mic },
    { id: 'exchange', label: 'Exchange', icon: Users2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'rooms', label: 'Study Rooms', icon: Users },
  ];

  const renderContent = () => {
    if (activeTab === 'analytics') return <AnalyticsView />;
    if (activeTab === 'flashcards') return <FlashcardsView />;
    if (activeTab === 'chat') return <ChatView />;
    if (activeTab === 'rooms') return <StudyRoomsView />;
    if (activeTab === 'leaderboard') return <LeaderboardView />;
    if (activeTab === 'grammar-drill') return <GrammarDrillView />;
    if (activeTab === 'story-mode') return <StoryModeView />;
    if (activeTab === 'exchange') return <LanguageExchangeView />;
    if (activeTab === 'pronunciation') return <PronunciationPracticeView />;

    if (activeTab === 'lectures') {
      // Active lecture open → show it
      if (lectures) return <LectureView />;
      // Lectures library
      return (
        <div className="max-w-4xl mx-auto w-full py-8 px-4 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-stone-900 mb-1">My Lectures</h1>
              <p className="text-stone-400 text-sm">{savedLectures.length} saved lecture{savedLectures.length !== 1 ? 's' : ''}</p>
            </div>
            <button onClick={() => setActiveTab('editor')}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-all shadow-sm">
              <BookOpen size={16} /> Generate New
            </button>
          </div>

          {savedLectures.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto">
                <BookOpen size={36} className="text-emerald-400" />
              </div>
              <p className="text-stone-700 font-bold text-lg">No saved lectures yet</p>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">Generate a lecture from your notes and save it to access it anytime.</p>
              <button onClick={() => setActiveTab('editor')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all mt-2">
                <Zap size={16} /> Create your first lecture
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedLectures.map((lec) => (
                <motion.div key={lec.id} whileHover={{ y: -2 }} transition={{ duration: 0.15 }}
                  className="group bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden cursor-pointer"
                  onClick={() => setLectures(lec)}>
                  <div className="h-1.5 w-full"
                    style={{ background: lec.level === 'Beginner' ? '#10b981' : lec.level === 'Intermediate' ? '#f59e0b' : '#ef4444' }} />
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <BookOpen size={18} className="text-emerald-500" />
                      </div>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        removeSavedLecture(lec.id);
                        if (user) {
                          import('./services/dbService').then(m => m.deleteSavedLecture(lec.id, user.id)).catch(() => { });
                        }
                      }} className="p-1.5 text-stone-200 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-stone-900 leading-tight line-clamp-2">{lec.title}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{lec.language}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-200" />
                        <span className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: lec.level === 'Beginner' ? '#10b981' : lec.level === 'Intermediate' ? '#f59e0b' : '#ef4444' }}>
                          {lec.level}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-200" />
                        <span className="text-[10px] text-stone-400">{lec.sections.length} sections</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-stone-300">
                        {lec.sections.reduce((a, s) => a + s.vocabulary.length, 0)} vocab words
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={10} /> Open
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (hasQuestions) return <QuizView />;

    return (
      <div className="space-y-10">

        {/* 5. Greeting header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-2xl font-black text-stone-900">
              {(() => {
                const h = new Date().getHours();
                const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
                return userMeta?.firstName ? `${greeting}, ${userMeta.firstName} 👋` : `${greeting} 👋`;
              })()}
            </h1>
            <p className="text-sm text-stone-400 mt-0.5">Ready to learn something new today?</p>
          </div>

          {/* 3. Quick stats bar */}
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 p-1.5 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              {[
                { label: 'Quizzes', value: stats?.totalQuizzes ?? '—', color: '#f59e0b' },
                { label: 'Accuracy', value: stats?.avgAccuracy ?? '—', color: '#10b981' },
                { label: 'Questions', value: stats?.totalQuestions ?? '—', color: '#6366f1' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center px-5 py-2.5 rounded-xl" style={{ minWidth: 80 }}>
                  <span className="text-lg font-black" style={{ color: s.color }}>{s.value}</span>
                  <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
            <NotificationSettings />
          </div>
        </div>

        {/* 1. Recent activity */}
        {(hasLectures || questions.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className="p-4 rounded-2xl flex items-center justify-between gap-4"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(99,102,241,0.04) 100%)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)' }}>
                <Clock size={16} style={{ color: '#10b981' }} />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">Continue where you left off</p>
                <p className="text-sm font-semibold text-stone-800">
                  {hasLectures ? 'AI Lecture in progress' : `Quiz — ${questions.length} questions`}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab(hasLectures ? 'lectures' : 'editor')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
              style={{ background: '#10b981' }}
            >
              Resume <ArrowRight size={13} />
            </button>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">

            {/* Hero text */}
            <div className="space-y-5">
              <div>
                <h2 className="font-black text-stone-900 tracking-tight leading-[1.04]" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                  Turn your notes into
                </h2>
                <h2 className="font-black tracking-tight leading-[1.04]" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                  <span style={{ position: 'relative', display: 'inline-block', color: '#111827' }}>
                    fluency
                    <svg viewBox="0 0 220 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', height: 10, overflow: 'visible' }}>
                      <path d="M2 8 Q55 2 110 7 Q165 12 218 5" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                  <span className="text-stone-900">.</span>
                </h2>
              </div>
              <p className="text-base leading-relaxed max-w-sm" style={{ color: '#94a3b8' }}>
                Upload any PDF or paste your notes — get full AI lessons, flashcards, and quizzes in seconds.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'AI Lessons', dot: '#10b981' },
                  { label: 'Flashcards', dot: '#6366f1' },
                  { label: 'Smart Quizzes', dot: '#f59e0b' },
                  { label: 'AI Tutor Chat', dot: '#ec4899' },
                ].map(f => (
                  <span key={f.label} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-stone-500"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: f.dot, display: 'inline-block', flexShrink: 0 }} />
                    {f.label}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. How it works */}
            <div className="flex items-start gap-0">
              {[
                { icon: Upload, label: 'Upload', desc: 'PDF or paste notes', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
                { icon: Sparkles, label: 'AI Generates', desc: 'Lessons, cards & quizzes', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
                { icon: Zap, label: 'You Learn', desc: 'Study smarter, faster', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-0 flex-1">
                  <div className="flex flex-col items-center text-center flex-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2" style={{ background: step.bg }}>
                      <step.icon size={18} style={{ color: step.color }} />
                    </div>
                    <p className="text-xs font-bold text-stone-700">{step.label}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{step.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="flex-shrink-0 mb-6" style={{ width: 24 }}>
                      <ArrowRight size={14} style={{ color: '#cbd5e1' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tab Switcher */}
            <div className="inline-flex p-1.5 bg-stone-100 rounded-2xl">
              <button
                onClick={() => setActiveTab('editor')}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeTab === 'editor' ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                )}
              >
                <BookOpen size={18} />
                Note Editor
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all",
                  activeTab === 'upload' ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
                )}
              >
                <Upload size={18} />
                File Upload
              </button>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'editor' ? <Editor /> : <FileUpload />}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <QuizSettings />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-white border-r border-stone-100 flex flex-col sticky top-0 h-screen z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 flex-shrink-0">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-stone-800 hidden lg:block">
            Linguist<span className="text-emerald-500">AI</span>
          </h1>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"
              )}
            >
              <item.icon size={22} className={cn(
                "transition-transform group-hover:scale-110",
                activeTab === item.id ? "text-emerald-600" : "text-stone-400"
              )} />
              <span className="font-bold text-sm hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-stone-50 space-y-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                {user.avatarUrl
                  ? <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  : <div className="w-full h-full flex items-center justify-center"><UserIcon size={20} className="text-stone-500" /></div>
                }
              </div>
              <div className="hidden lg:block overflow-hidden">
                <p className="text-xs font-bold text-stone-800 truncate">{user.email}</p>
                <button onClick={handleSignOut} className="text-[10px] font-bold text-stone-400 hover:text-red-500 uppercase tracking-widest">Sign Out</button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="w-full py-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-all shadow-md hidden lg:block"
            >
              Sign In
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 text-center">
            <p className="text-xs font-medium text-amber-700">
              ⚠️ Supabase is not configured. Database features (Auth, Auto-save) are disabled.
            </p>
          </div>
        )}

        {/* Top bar — total points — dashboard only */}
        {activeTab === 'editor' && !hasQuestions && (
          <div className="flex items-center justify-end px-6 lg:px-12 py-3 border-b border-stone-100 bg-white/60 backdrop-blur-sm">
            <TotalPointsBadge />
          </div>
        )}

        <main className="flex-1 px-6 py-12 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (hasLectures ? 'lecture' : hasQuestions ? 'quiz' : 'setup')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-stone-100 py-8 px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-stone-400">
              © 2026 LinguistAI. Built for students, by AI.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-stone-400 hover:text-stone-600">Privacy</a>
              <a href="#" className="text-xs text-stone-400 hover:text-stone-600">Terms</a>
              <a href="#" className="text-xs text-stone-400 hover:text-stone-600">Contact</a>
            </div>
          </div>
        </footer>
      </div>
      {user && <FloatingNotes userId={(user as any).id} contextLabel={lectures?.title} />}
      {/* Global call manager — handles incoming calls from any tab */}
      {user && <GlobalCallManager myId={(user as any).id} myName={(user as any).displayName || (user as any).email?.split('@')[0] || 'Me'} myAvatar={(user as any).avatarUrl || null} />}
      {/* Floating exchange message button */}
      {user && unreadMessages > 0 && activeTab !== 'exchange' && (
        <FloatingMessageButton
          count={unreadMessages}
          onClick={() => { setActiveTab('exchange'); setUnreadMessages(0); }}
        />
      )}
    </div>
  );
}
