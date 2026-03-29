import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Mic, MicOff, Volume2, User, Bot, Loader2, Sparkles,
  ChevronDown, ChevronUp, Plus, Check, X, AlertCircle,
  Utensils, Briefcase, Plane, ShoppingBag, GraduationCap, Coffee, Globe,
  History, TrendingUp, FileText, Trash2, Copy, CheckCheck,
  Star, Zap, Target, BarChart2, Eye, EyeOff, Shuffle, Timer,
  PenLine, FlaskConical, GripVertical,
  Trophy, ThumbsUp, Dumbbell, BookOpen, Languages, ArrowLeftRight,
  Pin, Link2, Hash, Pencil, BookMarked, AlertTriangle, PartyPopper,
  TrendingDown, Award, BadgeCheck, XCircle, BookOpenCheck, Lightbulb,
  Stethoscope, Hotel, Phone, Heart, Siren,
} from 'lucide-react';
import {
  generateChatResponse, generateSessionSummary, getWordOfTheDay,
  generateChallenge, analyzeTone, generateCustomScenario, generateVocabQuiz, translateWord,
} from '../services/aiService';
import { speakText } from '../services/voiceService';
import { cn } from '../lib/utils';
import type { ChatSession, Language } from '../store/useAppStore';
import { saveChatSessionDB, getChatSessions, deleteChatSessionDB } from '../services/dbService';

interface Correction { original: string; corrected: string; explanation: string; }
interface NewWord { word: string; translation: string; }
interface Message {
  role: 'user' | 'assistant';
  content: string;
  correction?: Correction | null;
  newWords?: NewWord[];
  toneTip?: { tip: string; alternative: string } | null;
  translation?: string | null; // feature 7: revealed translation
}
interface Scenario {
  id: string; label: string; description: string; icon: React.ElementType;
  color: string; bg: string; prompt: string;
}

const SCENARIOS: Scenario[] = [
  { id: 'free', label: 'Free Chat', description: 'Open conversation', icon: Globe, color: '#10b981', bg: 'rgba(16,185,129,0.08)', prompt: '' },
  { id: 'restaurant', label: 'Restaurant', description: 'Order food & drinks', icon: Utensils, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', prompt: 'We are at a restaurant. You are the waiter and I am the customer. Help me order food and drinks in the target language.' },
  { id: 'interview', label: 'Job Interview', description: 'Practice professional talk', icon: Briefcase, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', prompt: 'We are doing a job interview. You are the interviewer and I am the candidate. Ask me professional questions in the target language.' },
  { id: 'airport', label: 'Airport', description: 'Travel & directions', icon: Plane, color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)', prompt: 'We are at an airport. Help me navigate, check in, and find my gate. You play airport staff speaking the target language.' },
  { id: 'shopping', label: 'Shopping', description: 'Buy things, ask prices', icon: ShoppingBag, color: '#ec4899', bg: 'rgba(236,72,153,0.08)', prompt: 'We are in a shop. You are the shopkeeper and I am the customer. Help me find items and negotiate prices in the target language.' },
  { id: 'cafe', label: 'Café', description: 'Casual small talk', icon: Coffee, color: '#92400e', bg: 'rgba(146,64,14,0.08)', prompt: 'We are at a café having a casual conversation. Be friendly and talk about everyday topics in the target language.' },
  { id: 'school', label: 'Classroom', description: 'Academic discussion', icon: GraduationCap, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', prompt: 'We are in a classroom. You are the teacher and I am the student. Teach me vocabulary and grammar through conversation in the target language.' },
  { id: 'doctor', label: "Doctor's Office", description: 'Describe symptoms & health', icon: Stethoscope, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', prompt: "We are at a doctor's office. You are the doctor and I am the patient. Ask me about my symptoms and give advice. Use medical vocabulary naturally in the target language." },
  { id: 'hotel', label: 'Hotel', description: 'Check-in, requests & complaints', icon: Hotel, color: '#0891b2', bg: 'rgba(8,145,178,0.08)', prompt: 'We are at a hotel. You are the receptionist and I am a guest. Help me check in, make requests, and handle any issues in the target language.' },
  { id: 'phone', label: 'Phone Call', description: 'Practice without visual cues', icon: Phone, color: '#64748b', bg: 'rgba(100,116,139,0.08)', prompt: 'We are having a phone call. You called me for a reason (booking, inquiry, or catching up). Speak naturally as if on the phone in the target language. No visual cues, just conversation.' },
  { id: 'social', label: 'Social / Dating', description: 'Flirting & social situations', icon: Heart, color: '#f43f5e', bg: 'rgba(244,63,94,0.08)', prompt: 'We are at a social event and just met. Be friendly, flirty, and engaging. Practice natural social conversation and small talk in the target language.' },
  { id: 'emergency', label: 'Emergency', description: 'Ask for help urgently', icon: Siren, color: '#dc2626', bg: 'rgba(220,38,38,0.08)', prompt: 'This is an emergency situation. I need to ask for help urgently. You play a bystander, police officer, or emergency responder. Help me practice urgent, clear communication in the target language.' },
];

const LANG_CODES: Record<string, string> = {
  French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
  Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT', Chinese: 'zh-CN',
};

const DIFFICULTY_LABEL = (score: number) =>
  score < 34 ? { label: 'Beginner', color: '#10b981' }
    : score < 67 ? { label: 'Intermediate', color: '#f59e0b' }
      : { label: 'Advanced', color: '#ef4444' };

const extractMistakeCategory = (explanation: string): string => {
  const e = explanation.toLowerCase();
  if (e.includes('conjugat') || e.includes('tense') || e.includes('verb')) return 'Verb conjugation';
  if (e.includes('gender') || e.includes('masculine') || e.includes('feminine')) return 'Gender agreement';
  if (e.includes('word order') || e.includes('order')) return 'Word order';
  if (e.includes('article') || e.includes('le ') || e.includes('la ') || e.includes('les ')) return 'Articles';
  if (e.includes('preposition')) return 'Prepositions';
  if (e.includes('plural')) return 'Plurals';
  if (e.includes('accent') || e.includes('spelling')) return 'Spelling/Accents';
  return 'Grammar';
};

// ─── Full Scenario Collection ──────────────────────────────────────────────
interface CollectionScenario { id: string; label: string; description: string; category: string; prompt: string; }
const SCENARIO_COLLECTION: CollectionScenario[] = [
  { id: 'c_grocery', label: 'Grocery Store', description: 'Buy food, ask for items', category: 'Daily Life', prompt: 'We are at a grocery store. You are the store assistant and I am a customer. Help me find items and discuss prices in the target language.' },
  { id: 'c_pharmacy', label: 'Pharmacy', description: 'Ask for medicine and advice', category: 'Daily Life', prompt: 'We are at a pharmacy. You are the pharmacist and I am a customer. I need to describe symptoms and ask for medicine in the target language.' },
  { id: 'c_bank', label: 'Bank', description: 'Open account, transfer money', category: 'Daily Life', prompt: 'We are at a bank. You are the teller and I am a customer. Help me with banking tasks in the target language.' },
  { id: 'c_post', label: 'Post Office', description: 'Send packages and letters', category: 'Daily Life', prompt: 'We are at a post office. You are the clerk and I am a customer wanting to send a package. Guide me through the process in the target language.' },
  { id: 'c_haircut', label: 'Hair Salon', description: 'Describe your haircut', category: 'Daily Life', prompt: 'We are at a hair salon. You are the hairdresser and I am the client. I need to describe the haircut I want in the target language.' },
  { id: 'c_gym', label: 'Gym', description: 'Fitness and workout talk', category: 'Daily Life', prompt: 'We are at a gym. You are a personal trainer and I am a new member. Discuss workout plans and fitness goals in the target language.' },
  { id: 'c_market', label: 'Farmers Market', description: 'Bargain and buy fresh produce', category: 'Daily Life', prompt: 'We are at a farmers market. You are a vendor and I am a customer. Help me buy fresh produce and practice bargaining in the target language.' },
  { id: 'c_laundry', label: 'Laundromat', description: 'Clothes and washing talk', category: 'Daily Life', prompt: 'We are at a laundromat. Have a casual conversation about laundry, clothes, and daily routines in the target language.' },
  { id: 'c_taxi', label: 'Taxi Ride', description: 'Give directions to driver', category: 'Travel', prompt: 'I just got into a taxi. You are the driver. I need to give you directions to my destination and make small talk in the target language.' },
  { id: 'c_train', label: 'Train Station', description: 'Buy tickets, find platform', category: 'Travel', prompt: 'We are at a train station. You are the ticket agent and I am a traveler. Help me buy a ticket and find my platform in the target language.' },
  { id: 'c_customs', label: 'Customs Border', description: 'Answer immigration questions', category: 'Travel', prompt: 'I am going through customs at the border. You are the customs officer. Ask me standard immigration questions in the target language.' },
  { id: 'c_lost', label: 'Getting Lost', description: 'Ask for directions', category: 'Travel', prompt: 'I am lost in a city. You are a local resident. I need to ask for directions to a specific place in the target language.' },
  { id: 'c_rental', label: 'Car Rental', description: 'Rent a car, discuss options', category: 'Travel', prompt: 'We are at a car rental agency. You are the agent and I am the customer. Help me choose and rent a car in the target language.' },
  { id: 'c_tour', label: 'Tour Guide', description: 'Sightseeing and local tips', category: 'Travel', prompt: 'You are a local tour guide and I am a tourist. Show me around the city and tell me about the sights in the target language.' },
  { id: 'c_hostel', label: 'Hostel', description: 'Meet fellow travelers', category: 'Travel', prompt: 'We are in a hostel common room. You are another traveler from a different country. Chat about our travels in the target language.' },
  { id: 'c_meeting', label: 'Business Meeting', description: 'Present ideas and negotiate', category: 'Professional', prompt: 'We are in a business meeting. You are a colleague or client. Discuss a project proposal and negotiate terms in the target language.' },
  { id: 'c_networking', label: 'Networking Event', description: 'Professional small talk', category: 'Professional', prompt: 'We are at a professional networking event. You are another professional in my field. Make small talk and exchange ideas in the target language.' },
  { id: 'c_presentation', label: 'Presentation', description: 'Present and answer questions', category: 'Professional', prompt: 'I am giving a presentation at work. You are an audience member who asks questions. Help me practice presenting in the target language.' },
  { id: 'c_complaint', label: 'Customer Complaint', description: 'Handle a difficult customer', category: 'Professional', prompt: 'You are a customer service representative and I am an unhappy customer. I need to complain about a product in the target language.' },
  { id: 'c_salary', label: 'Salary Negotiation', description: 'Negotiate your pay', category: 'Professional', prompt: 'We are in a salary negotiation. You are the HR manager and I am the employee. Help me practice negotiating my salary in the target language.' },
  { id: 'c_email', label: 'Work Email', description: 'Discuss email content', category: 'Professional', prompt: 'We are colleagues discussing a work email. Help me understand professional email language and how to respond in the target language.' },
  { id: 'c_party', label: 'House Party', description: 'Mingle and make friends', category: 'Social', prompt: 'We are at a house party. You are another guest I just met. Mingle and get to know each other in the target language.' },
  { id: 'c_firstdate', label: 'First Date', description: 'Romantic conversation', category: 'Social', prompt: 'We are on a first date at a restaurant. Be charming and curious. Get to know each other through natural conversation in the target language.' },
  { id: 'c_neighbor', label: 'New Neighbor', description: 'Introduce yourself', category: 'Social', prompt: 'I just moved into the neighborhood and you are my neighbor. Introduce ourselves and chat about the area in the target language.' },
  { id: 'c_argument', label: 'Friendly Debate', description: 'Argue a point politely', category: 'Social', prompt: 'We are having a friendly debate about a topic. Disagree with me politely and practice expressing opinions in the target language.' },
  { id: 'c_reunion', label: 'Old Friend Reunion', description: 'Catch up after years apart', category: 'Social', prompt: 'We are old friends who have not seen each other in years. Catch up and reminisce in the target language.' },
  { id: 'c_compliment', label: 'Giving Compliments', description: 'Practice complimenting others', category: 'Social', prompt: 'Practice giving and receiving compliments naturally. You are a friendly person I just met. Have a warm conversation in the target language.' },
  { id: 'c_tutor', label: 'Private Tutor', description: 'One-on-one lesson', category: 'Education', prompt: 'You are my private tutor for the target language. Give me a focused lesson on a grammar point or vocabulary theme of your choice.' },
  { id: 'c_debate', label: 'Academic Debate', description: 'Formal argumentation', category: 'Education', prompt: 'We are in an academic debate. You take the opposing side on a topic. Practice formal argumentation in the target language.' },
  { id: 'c_library', label: 'Library', description: 'Ask for book recommendations', category: 'Education', prompt: 'We are at a library. You are the librarian and I am looking for book recommendations. Discuss literature in the target language.' },
  { id: 'c_studygroup', label: 'Study Group', description: 'Discuss a topic together', category: 'Education', prompt: 'We are in a study group. Discuss a topic from history, science, or culture in the target language.' },
  { id: 'c_dentist', label: 'Dentist', description: 'Describe tooth pain', category: 'Health', prompt: 'We are at a dentist office. You are the dentist and I am the patient. I need to describe my dental problem in the target language.' },
  { id: 'c_therapy', label: 'Therapy Session', description: 'Talk about feelings', category: 'Health', prompt: 'We are in a therapy session. You are a supportive therapist. Help me practice expressing emotions and mental states in the target language.' },
  { id: 'c_yoga', label: 'Yoga Class', description: 'Wellness and mindfulness talk', category: 'Health', prompt: 'We are at a yoga class. You are the instructor. Guide me through a session and discuss wellness topics in the target language.' },
  { id: 'c_nutrition', label: 'Nutritionist', description: 'Discuss diet and food habits', category: 'Health', prompt: 'We are with a nutritionist. You are the nutritionist and I am the client. Discuss my diet and give me advice in the target language.' },
  { id: 'c_cinema', label: 'Cinema', description: 'Discuss movies and buy tickets', category: 'Entertainment', prompt: 'We are at a cinema. You are the ticket seller and then a fellow moviegoer. Help me buy tickets and discuss the film in the target language.' },
  { id: 'c_concert', label: 'Concert', description: 'Talk about music and artists', category: 'Entertainment', prompt: 'We are at a concert. You are another fan standing next to me. Talk about the music and the artist in the target language.' },
  { id: 'c_museum', label: 'Museum', description: 'Discuss art and history', category: 'Entertainment', prompt: 'We are at a museum. You are a knowledgeable guide or fellow visitor. Discuss the exhibits and their history in the target language.' },
  { id: 'c_sports', label: 'Sports Bar', description: 'Watch a game and debate', category: 'Entertainment', prompt: 'We are watching a sports game at a bar. You are a passionate fan of the opposing team. Banter and discuss the game in the target language.' },
  { id: 'c_bookclub', label: 'Book Club', description: 'Discuss a book together', category: 'Entertainment', prompt: 'We are in a book club meeting. You have read the same book as me. Discuss the plot, characters, and themes in the target language.' },
  { id: 'c_techsupport', label: 'Tech Support', description: 'Explain a tech problem', category: 'Technology', prompt: 'I am calling tech support. You are the support agent. I need to describe a technical problem with my device in the target language.' },
  { id: 'c_startup', label: 'Startup Pitch', description: 'Pitch your business idea', category: 'Technology', prompt: 'I am pitching my startup idea to you. You are an investor. Ask me tough questions about my business plan in the target language.' },
  { id: 'c_cooking', label: 'Cooking Class', description: 'Follow a recipe together', category: 'Food', prompt: 'We are in a cooking class. You are the chef instructor and I am the student. Teach me how to make a traditional dish in the target language.' },
  { id: 'c_foodmarket', label: 'Food Market', description: 'Discover local cuisine', category: 'Food', prompt: 'We are at a local food market. You are a vendor selling traditional food. Tell me about the dishes and help me choose what to try in the target language.' },
  { id: 'c_winery', label: 'Wine Tasting', description: 'Discuss wine and flavors', category: 'Food', prompt: 'We are at a wine tasting. You are the sommelier. Guide me through the tasting and teach me wine vocabulary in the target language.' },
  { id: 'c_weather', label: 'Weather Chat', description: 'Classic small talk starter', category: 'Misc', prompt: 'Start a conversation about the weather and let it naturally evolve into other small talk topics in the target language.' },
  { id: 'c_apartment', label: 'Apartment Hunting', description: 'Talk to a landlord', category: 'Misc', prompt: 'I am looking for an apartment. You are the landlord showing me a unit. Ask me questions and answer mine about the apartment in the target language.' },
  { id: 'c_police', label: 'Police Report', description: 'Report an incident', category: 'Misc', prompt: 'I need to file a police report. You are the police officer. Ask me questions about the incident I am reporting in the target language.' },
  { id: 'c_wedding', label: 'Wedding', description: 'Celebrate and make toasts', category: 'Misc', prompt: 'We are at a wedding reception. You are another guest. Celebrate, make small talk, and practice toasting in the target language.' },
  { id: 'c_condolences', label: 'Condolences', description: 'Express sympathy', category: 'Misc', prompt: 'We are at a memorial gathering. Practice expressing condolences and sympathy appropriately in the target language.' },
];

// ─── Word of Day Banner ────────────────────────────────────────────────────
const WordOfDayBanner = ({ lang }: { lang: Language }) => {
  const [word, setWord] = useState<{ word: string; translation: string; example: string } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => { getWordOfTheDay(lang).then(setWord).catch(() => { }); }, [lang]);
  if (!word || dismissed) return null;
  return (
    <div className="mx-4 mt-2 mb-1 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl px-4 py-2.5 flex items-center gap-3 shrink-0">
      <Star size={14} className="text-amber-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-black text-amber-700">{word.word}</span>
        <span className="text-xs text-amber-500 mx-1.5">·</span>
        <span className="text-xs text-amber-600">{word.translation}</span>
        {word.example && <p className="text-[10px] text-amber-500 mt-0.5 truncate italic">{word.example}</p>}
      </div>
      <button onClick={() => setDismissed(true)} className="text-amber-300 hover:text-amber-500 shrink-0"><X size={12} /></button>
    </div>
  );
};

// ─── Challenge Banner ──────────────────────────────────────────────────────
const ChallengeBanner = ({ challenge, usedPhrases, onDismiss }: {
  challenge: { title: string; description: string; targetPhrases: string[]; successCriteria: string };
  usedPhrases: Set<string>;
  onDismiss: () => void;
}) => {
  const done = challenge.targetPhrases.filter(p => usedPhrases.has(p.toLowerCase())).length;
  const total = challenge.targetPhrases.length;
  return (
    <div className="mx-4 mt-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-4 py-3 shrink-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-amber-700">{challenge.title}</p>
            <p className="text-[10px] text-amber-600">{challenge.description}</p>
          </div>
        </div>
        <button onClick={onDismiss} className="text-amber-300 hover:text-amber-500 shrink-0"><X size={12} /></button>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {challenge.targetPhrases.map(p => {
          const used = usedPhrases.has(p.toLowerCase());
          return (
            <span key={p} className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg border', used ? 'bg-emerald-100 text-emerald-700 border-emerald-200 line-through' : 'bg-white text-amber-600 border-amber-200')}>
              {used && <Check size={8} className="inline mr-1" />}{p}
            </span>
          );
        })}
      </div>
      <div className="mt-2 h-1 bg-amber-100 rounded-full overflow-hidden">
        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${(done / Math.max(total, 1)) * 100}%` }} />
      </div>
    </div>
  );
};

// ─── Heatmap Modal ────────────────────────────────────────────────────────
const HeatmapModal = ({ mistakes, onClose }: {
  mistakes: { category: string; count: number; examples: { original: string; corrected: string; explanation: string }[] }[];
  onClose: () => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
        <h2 className="text-base font-black text-stone-800">Error Heatmap</h2>
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
      </div>
      <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
        {mistakes.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-8">No mistakes logged yet.</p>
        ) : mistakes.sort((a, b) => b.count - a.count).map((m, i) => {
          const max = mistakes[0].count;
          const pct = Math.round((m.count / max) * 100);
          return (
            <div key={m.category} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">{m.category}</span>
                <span className="text-xs font-black text-stone-400">{m.count}x</span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#6366f1' }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  </motion.div>
);

// ─── Custom Scenario Modal ─────────────────────────────────────────────────
const CustomScenarioModal = ({ lang, onApply, onClose }: {
  lang: Language;
  onApply: (s: { title: string; description: string; prompt: string; starterPhrases: string[] }) => void;
  onClose: () => void;
}) => {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleGenerate = async () => {
    if (!desc.trim()) return;
    setLoading(true); setError(null);
    try {
      const result = await generateCustomScenario(desc, lang);
      onApply(result);
    } catch { setError('Could not generate scenario. Try again.'); }
    finally { setLoading(false); }
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
          <h2 className="text-base font-black text-stone-800">Custom Scenario</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
            placeholder="Describe your scenario... e.g. 'I'm at a French bakery ordering croissants'"
            className="w-full text-sm border border-stone-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 resize-none" />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button onClick={handleGenerate} disabled={!desc.trim() || loading}
            className="w-full py-3 bg-indigo-500 text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={14} className="animate-spin" />Generating...</> : 'Start Scenario'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Quiz Setup Modal ──────────────────────────────────────────────────────
const QuizSetupModal = ({ onStart, onClose, isLoading }: {
  onStart: (count: number) => void;
  onClose: () => void;
  isLoading: boolean;
}) => {
  const [count, setCount] = useState(5);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
          <h2 className="text-base font-black text-stone-800">Vocab Quiz</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs font-bold text-stone-500 mb-2">Number of questions</p>
            <div className="flex gap-2">
              {[3, 5, 10].map(n => (
                <button key={n} onClick={() => setCount(n)}
                  className={cn('flex-1 py-2 rounded-xl text-sm font-bold border transition-all', count === n ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-stone-50 text-stone-600 border-stone-100 hover:border-emerald-300')}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => onStart(count)} disabled={isLoading}
            className="w-full py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-2">
            {isLoading ? <><Loader2 size={14} className="animate-spin" />Loading...</> : 'Start Quiz'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Vocab Quiz Modal ──────────────────────────────────────────────────────
const VocabQuizModal = ({ questions, onClose }: {
  questions: { type: 'mcq' | 'fill' | 'arrange'; question: string; options?: string[]; answer: string; blankedSentence?: string; words?: string[] }[];
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [fillInput, setFillInput] = useState('');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[idx];
  const isCorrect = selected !== null && selected.toLowerCase().trim() === q?.answer.toLowerCase().trim();
  const handleNext = () => {
    if (isCorrect) setScore(s => s + 1);
    if (idx + 1 >= questions.length) { setDone(true); return; }
    setIdx(i => i + 1); setSelected(null); setFillInput('');
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
          <h2 className="text-base font-black text-stone-800">{done ? 'Quiz Complete' : `Question ${idx + 1}/${questions.length}`}</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
        </div>
        <div className="p-5">
          {done ? (
            <div className="text-center py-6 space-y-3">
              <Trophy size={36} className="mx-auto text-amber-400" />
              <p className="text-2xl font-black text-stone-800">{score}/{questions.length}</p>
              <p className="text-sm text-stone-400">{score === questions.length ? 'Perfect score!' : score >= questions.length / 2 ? 'Good job!' : 'Keep practicing!'}</p>
              <button onClick={onClose} className="mt-4 px-6 py-2.5 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-colors">Done</button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-stone-700">{q.question}</p>
              {q.type === 'mcq' && q.options && (
                <div className="space-y-2">
                  {q.options.map(opt => (
                    <button key={opt} onClick={() => setSelected(opt)}
                      className={cn('w-full text-left px-4 py-2.5 rounded-xl text-sm border transition-all', selected === opt ? (opt.toLowerCase() === q.answer.toLowerCase() ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-red-50 border-red-300 text-red-600') : 'bg-stone-50 border-stone-100 hover:border-emerald-300')}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
              {(q.type === 'fill' || q.type === 'arrange') && (
                <input value={fillInput} onChange={e => { setFillInput(e.target.value); setSelected(e.target.value); }}
                  placeholder="Type your answer..." className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400" />
              )}
              {selected !== null && (
                <p className={cn('text-xs font-bold', isCorrect ? 'text-emerald-600' : 'text-red-500')}>
                  {isCorrect ? 'Correct!' : `Correct answer: ${q.answer}`}
                </p>
              )}
              <button onClick={handleNext} disabled={selected === null}
                className="w-full py-2.5 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-40">
                {idx + 1 >= questions.length ? 'Finish' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Summary Modal ─────────────────────────────────────────────────────────
const SummaryModal = ({ session, onClose }: {
  session: { recap: string; strengths: string; improvements: string; wordsLearned: number; correctionsCount: number; words: { word: string; translation: string }[]; corrections: { original: string; corrected: string; explanation: string }[] };
  onClose: () => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between shrink-0">
        <h2 className="text-base font-black text-stone-800">Session Summary</h2>
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-emerald-600">{session.wordsLearned}</p>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Words</p>
          </div>
          <div className="flex-1 bg-amber-50 border border-amber-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-amber-600">{session.correctionsCount}</p>
            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">Corrections</p>
          </div>
        </div>
        <div className="bg-stone-50 rounded-2xl p-4 space-y-1">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider">Recap</p>
          <p className="text-sm text-stone-700 leading-relaxed">{session.recap}</p>
        </div>
        {session.strengths && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-wider mb-1">Strengths</p>
            <p className="text-sm text-stone-700">{session.strengths}</p>
          </div>
        )}
        {session.improvements && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-wider mb-1">To Improve</p>
            <p className="text-sm text-stone-700">{session.improvements}</p>
          </div>
        )}
        {session.words.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-2">New Words</p>
            <div className="flex flex-wrap gap-1.5">
              {session.words.map((w, i) => (
                <span key={i} className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-xl">{w.word} · <span className="font-normal text-indigo-500">{w.translation}</span></span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// ─── History Panel ─────────────────────────────────────────────────────────
const HistoryPanel = ({ sessions, onLoad, onDelete, onNewChat, onClose }: {
  sessions: ChatSession[];
  onLoad: (s: ChatSession) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  onClose: () => void;
}) => (
  <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
    className="absolute right-0 top-0 bottom-0 w-72 bg-white border-l border-stone-100 shadow-2xl z-40 flex flex-col rounded-r-[40px] overflow-hidden">
    <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between shrink-0">
      <h3 className="text-sm font-black text-stone-800">Chat History</h3>
      <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={14} /></button>
    </div>
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {sessions.length === 0 ? (
        <p className="text-xs text-stone-400 text-center py-8">No saved sessions yet.</p>
      ) : [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(s => (
        <div key={s.id} className="bg-stone-50 hover:bg-stone-100 border border-stone-100 rounded-2xl p-3 group transition-colors">
          <div className="flex items-start justify-between gap-2">
            <button className="flex-1 text-left" onClick={() => onLoad(s)}>
              <p className="text-xs font-bold text-stone-700 truncate">{s.scenarioLabel} · {s.language}</p>
              <p className="text-[10px] text-stone-400 mt-0.5">{new Date(s.date).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-[10px] text-stone-400">{s.messages.length} messages · {s.wordsLearned} words</p>
            </button>
            <button onClick={() => onDelete(s.id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-stone-300 hover:text-red-400 rounded-lg transition-all"><Trash2 size={12} /></button>
          </div>
        </div>
      ))}
    </div>
    <div className="p-3 border-t border-stone-50 shrink-0">
      <button onClick={onNewChat} className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 text-white rounded-2xl text-xs font-bold hover:bg-emerald-600 transition-colors">
        <Plus size={13} />New Chat
      </button>
    </div>
  </motion.div>
);

// ─── Saved Phrases Modal ──────────────────────────────────────────────────
const SavedPhrasesModal = ({ phrases, onRemove, onClose, onSpeak }: {
  phrases: { id: string; phrase: string; translation: string; language: Language; date: string }[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onSpeak: (text: string, lang: string) => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[80vh] flex flex-col overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between shrink-0">
        <h2 className="text-base font-black text-stone-800">Saved Phrases</h2>
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {phrases.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-8">No saved phrases yet. Pin AI messages to save them.</p>
        ) : phrases.map(p => (
          <div key={p.id} className="bg-stone-50 border border-stone-100 rounded-2xl p-3 flex items-start gap-3 group">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-800 leading-snug">{p.phrase}</p>
              {p.translation && <p className="text-xs text-stone-400 mt-0.5">{p.translation}</p>}
              <p className="text-[10px] text-stone-300 mt-1">{p.language} · {new Date(p.date).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <button onClick={() => onSpeak(p.phrase, p.language)} className="p-1.5 text-stone-300 hover:text-emerald-500 rounded-lg transition-colors"><Volume2 size={13} /></button>
              <button onClick={() => onRemove(p.id)} className="p-1.5 text-stone-300 hover:text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

// ─── Vocab Review Modal ────────────────────────────────────────────────────
const VocabReviewModal = ({ flashcards, chatText, onClose }: {
  flashcards: { id: string; word: string; translation: string; language: Language }[];
  chatText: string;
  onClose: () => void;
}) => {
  const reviewWords = flashcards.filter(f => chatText.toLowerCase().includes(f.word.toLowerCase())).slice(0, 8);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-stone-800">Vocab Review</h2>
            <p className="text-[10px] text-stone-400">Words from your flashcards used in this session</p>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-2 max-h-[60vh] overflow-y-auto">
          {reviewWords.length === 0 ? (
            <p className="text-sm text-stone-400 text-center py-6">No flashcard words appeared in this session.</p>
          ) : reviewWords.map(w => (
            <div key={w.id} className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-2.5">
              <span className="text-sm font-bold text-indigo-700">{w.word}</span>
              <span className="text-xs text-indigo-400">{w.translation}</span>
            </div>
          ))}
        </div>
        <div className="px-5 pb-5">
          <button onClick={onClose} className="w-full py-2.5 bg-indigo-500 text-white rounded-2xl text-sm font-bold hover:bg-indigo-600 transition-colors">Got it</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Typing Challenge Modal ────────────────────────────────────────────────
const TypingChallengeModal = ({ challenge, onChange, onCheck, onClose }: {
  challenge: { sentence: string; translation: string; answer: string; userInput: string; result: 'idle' | 'correct' | 'wrong' };
  onChange: (v: string) => void;
  onCheck: () => void;
  onClose: () => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
        <h2 className="text-base font-black text-stone-800">Typing Challenge</h2>
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
      </div>
      <div className="p-5 space-y-4">
        <div className="bg-stone-50 rounded-2xl p-4">
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-1">Translate this</p>
          <p className="text-sm font-semibold text-stone-800">{challenge.sentence}</p>
        </div>
        <input value={challenge.userInput} onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && challenge.result === 'idle' && onCheck()}
          placeholder="Type the translation..." disabled={challenge.result !== 'idle'}
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 disabled:opacity-60" />
        {challenge.result !== 'idle' && (
          <div className={cn('rounded-2xl p-3 text-sm font-bold', challenge.result === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600')}>
            {challenge.result === 'correct' ? 'Correct!' : `Answer: ${challenge.answer}`}
          </div>
        )}
        {challenge.result === 'idle' ? (
          <button onClick={onCheck} disabled={!challenge.userInput.trim()}
            className="w-full py-2.5 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-40">Check</button>
        ) : (
          <button onClick={onClose} className="w-full py-2.5 bg-stone-100 text-stone-700 rounded-2xl text-sm font-bold hover:bg-stone-200 transition-colors">Close</button>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// ─── Replay Modal ──────────────────────────────────────────────────────────
const ReplayModal = ({ messages, replayIdx, isReplaying, onStop, onClose }: {
  messages: Message[];
  replayIdx: number;
  isReplaying: boolean;
  onStop: () => void;
  onClose: () => void;
}) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm">
    <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }}
      className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 border-b border-stone-50 flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-stone-800">Replaying Session</h2>
          <p className="text-[10px] text-stone-400">{replayIdx}/{messages.length} messages</p>
        </div>
        <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-600 rounded-xl hover:bg-stone-50"><X size={16} /></button>
      </div>
      <div className="p-5 space-y-3">
        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${(replayIdx / Math.max(messages.length, 1)) * 100}%` }} />
        </div>
        {messages[replayIdx] && (
          <div className={cn('rounded-2xl px-4 py-3 text-sm', messages[replayIdx].role === 'user' ? 'bg-stone-800 text-white ml-8' : 'bg-stone-50 border border-stone-100 text-stone-800 mr-8')}>
            {messages[replayIdx].content}
          </div>
        )}
        <button onClick={isReplaying ? onStop : onClose}
          className="w-full py-2.5 bg-stone-100 text-stone-700 rounded-2xl text-sm font-bold hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
          {isReplaying ? <><X size={13} />Stop</> : 'Close'}
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ─── Scenario Collection Modal ─────────────────────────────────────────────
const CAT_META: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  'All': { color: '#10b981', bg: 'rgba(16,185,129,0.1)', icon: Globe },
  'Daily Life': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: Coffee },
  'Travel': { color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', icon: Plane },
  'Professional': { color: '#6366f1', bg: 'rgba(99,102,241,0.1)', icon: Briefcase },
  'Social': { color: '#ec4899', bg: 'rgba(236,72,153,0.1)', icon: Heart },
  'Education': { color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', icon: GraduationCap },
  'Health': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: Stethoscope },
  'Entertainment': { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', icon: Star },
  'Technology': { color: '#0891b2', bg: 'rgba(8,145,178,0.1)', icon: Zap },
  'Food': { color: '#d97706', bg: 'rgba(217,119,6,0.1)', icon: Utensils },
  'Misc': { color: '#64748b', bg: 'rgba(100,116,139,0.1)', icon: Hash },
};

const ScenarioCard = ({ s, meta, onSelect }: {
  s: CollectionScenario;
  meta: { color: string; bg: string; icon: React.ElementType };
  onSelect: (s: CollectionScenario) => void;
  key?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => onSelect(s)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden text-left rounded-2xl p-3.5 border transition-all duration-200 active:scale-[0.97]"
      style={{
        background: hovered ? meta.bg : '#fafaf9',
        borderColor: hovered ? 'transparent' : '#e7e5e4',
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
      }}>
      {/* Animated decorative icon — top-right, half-cropped */}
      <motion.div
        initial={false}
        animate={hovered ? { x: 0, y: 0, opacity: 0.58, rotate: 190 } : { x: 50, y: -50, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="pointer-events-none absolute -top-4 -right-4"
        style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(190deg)' }}>
        <meta.icon size={64} style={{ color: meta.color }} />
      </motion.div>
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5"
        style={{ background: meta.bg }}>
        <meta.icon size={15} style={{ color: meta.color }} />
      </div>
      <p className="text-xs font-black text-stone-800 leading-snug">{s.label}</p>
      <p className="text-[10px] text-stone-400 mt-0.5 leading-snug line-clamp-2">{s.description}</p>
      <span className="inline-block mt-2 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-lg"
        style={{ color: meta.color, background: meta.bg }}>
        {s.category}
      </span>
    </button>
  );
};

const ScenarioCollectionModal = ({ onSelect, onClose }: {
  onSelect: (s: CollectionScenario) => void;
  onClose: () => void;
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...Array.from(new Set(SCENARIO_COLLECTION.map(s => s.category)))];
  const filtered = SCENARIO_COLLECTION.filter(s => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = search === '' || s.label.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const activeMeta = CAT_META[activeCategory] ?? CAT_META['Misc'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="bg-white w-full sm:max-w-2xl flex flex-col overflow-hidden rounded-t-[32px] sm:rounded-3xl shadow-2xl"
        style={{ maxHeight: '90vh' }}>

        {/* Header */}
        <div className="shrink-0 px-5 pt-5 pb-4">
          <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-4 sm:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-stone-900">Scenarios</h2>
              <p className="text-[11px] text-stone-400 mt-0.5">{filtered.length} of {SCENARIO_COLLECTION.length} available</p>
            </div>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-2xl bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors">
              <X size={15} />
            </button>
          </div>

          {/* Search */}
          <div className="relative mt-3">
            <BookOpen size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search scenarios..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
              autoFocus />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500">
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Category pills */}
        <div className="shrink-0 flex gap-2 px-5 pb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map(cat => {
            const meta = CAT_META[cat] ?? CAT_META['Misc'];
            const CatIcon = meta.icon;
            const isActive = activeCategory === cat;
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border"
                style={isActive
                  ? { background: meta.color, color: '#fff', borderColor: meta.color }
                  : { background: 'transparent', color: '#78716c', borderColor: '#e7e5e4' }}>
                <CatIcon size={12} />
                {cat}
              </button>
            );
          })}
        </div>

        {/* Active category hero strip */}
        {activeCategory !== 'All' && (
          <div className="shrink-0 mx-5 mb-3 rounded-2xl px-5 py-5 flex items-center gap-4"
            style={{ background: activeMeta.bg }}>
            <div className="rounded-2xl flex items-center justify-center shrink-0" style={{ background: activeMeta.color, width: 60, height: 60 }}>
              <activeMeta.icon size={20} color="#fff" />
            </div>
            <div>
              <p className="text-base font-black" style={{ color: activeMeta.color }}>{activeCategory}</p>
              <p className="text-xs text-stone-400 mt-0.5">{filtered.length} scenario{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-stone-300">
              <BookOpen size={32} className="mb-3 opacity-40" />
              <p className="text-sm font-medium text-stone-400">No scenarios found</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="mt-3 text-xs font-bold text-emerald-500 hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {filtered.map(s => {
                const meta = CAT_META[s.category] ?? CAT_META['Misc'];
                return (
                  <ScenarioCard key={s.id} s={s} meta={meta} onSelect={onSelect} />
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const WeeklyReportModal = ({ sessions, mistakeLog, onClose }: {
  sessions: { date: string; wordsLearned: number; correctionsCount: number; language: string; scenarioLabel: string }[];
  mistakeLog: { category: string; count: number; examples: { original: string; corrected: string; explanation: string }[] }[];
  onClose: () => void;
}) => {
  const [tab, setTab] = useState<'overview' | 'activity' | 'errors' | 'languages'>('overview');
  const [rangePreset, setRangePreset] = useState<'7' | '14' | '30'>('7');
  const [expandedError, setExpandedError] = useState<string | null>(null);

  const now = new Date();
  const rangeDays = parseInt(rangePreset);
  const rangeStart = new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000);
  const prevStart = new Date(now.getTime() - rangeDays * 2 * 24 * 60 * 60 * 1000);

  const thisWeek = sessions.filter(s => new Date(s.date) >= rangeStart);
  const lastWeek = sessions.filter(s => new Date(s.date) >= prevStart && new Date(s.date) < rangeStart);

  const totalWords = thisWeek.reduce((a, s) => a + s.wordsLearned, 0);
  const lastWords = lastWeek.reduce((a, s) => a + s.wordsLearned, 0);
  const totalCorrections = thisWeek.reduce((a, s) => a + s.correctionsCount, 0);
  const totalSessions = thisWeek.length;
  const lastSessions = lastWeek.length;
  const accuracy = totalSessions > 0 ? Math.max(0, Math.round(100 - (totalCorrections / Math.max(totalSessions * 4, 1)) * 100)) : 0;
  const lastAccuracy = lastWeek.length > 0 ? Math.max(0, Math.round(100 - (lastWeek.reduce((a, s) => a + s.correctionsCount, 0) / Math.max(lastWeek.length * 4, 1)) * 100)) : 0;

  const trend = (curr: number, prev: number) => {
    if (prev === 0) return null;
    const pct = Math.round(((curr - prev) / prev) * 100);
    return pct;
  };

  // ── Streak: sort by actual timestamp, not alphabetically ──
  const allDates = [...new Set(sessions.map(s => new Date(s.date).toDateString()))]
    .map(d => new Date(d))
    .sort((a, b) => a.getTime() - b.getTime())
    .map(d => d.toDateString());

  let streak = 0, maxStreak = 0, cur = 0;
  for (let i = 0; i < allDates.length; i++) {
    if (i === 0) { cur = 1; }
    else {
      const diff = (new Date(allDates[i]).getTime() - new Date(allDates[i - 1]).getTime()) / 86400000;
      cur = diff <= 1 ? cur + 1 : 1;
    }
    maxStreak = Math.max(maxStreak, cur);
  }
  // current streak: count back from today
  const todayStr = now.toDateString();
  const yesterdayStr = new Date(now.getTime() - 86400000).toDateString();
  if (allDates.includes(todayStr) || allDates.includes(yesterdayStr)) {
    // walk back from the last date in allDates
    streak = 0;
    for (let i = allDates.length - 1; i >= 0; i--) {
      if (i === allDates.length - 1) {
        streak = 1;
      } else {
        const diff = (new Date(allDates[i + 1]).getTime() - new Date(allDates[i]).getTime()) / 86400000;
        if (diff <= 1) streak++;
        else break;
      }
    }
  }

  // ── Daily activity: i=0 is oldest day, i=rangeDays-1 is today ──
  const days = Array.from({ length: rangeDays }, (_, i) => {
    const offset = rangeDays - 1 - i; // 0 offset = today, max offset = oldest
    const d = new Date(now.getTime() - offset * 24 * 60 * 60 * 1000);
    const dateStr = d.toDateString();
    const daySessions = sessions.filter(s => new Date(s.date).toDateString() === dateStr);
    const dateLabel = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
    const dayLabel = d.toLocaleDateString('en', { weekday: 'short' });
    return { label: dateLabel, dayLabel, sessions: daySessions.length, words: daySessions.reduce((a, s) => a + s.wordsLearned, 0), date: d };
  });
  const maxWords = Math.max(...days.map(d => d.words), 1);
  const maxSess = Math.max(...days.map(d => d.sessions), 1);

  // Language breakdown
  const langMap: Record<string, number> = {};
  thisWeek.forEach(s => { langMap[s.language] = (langMap[s.language] || 0) + 1; });
  const langs = Object.entries(langMap).sort((a, b) => b[1] - a[1]);

  // Scenario breakdown
  const scenMap: Record<string, number> = {};
  thisWeek.forEach(s => { scenMap[s.scenarioLabel] = (scenMap[s.scenarioLabel] || 0) + 1; });
  const scens = Object.entries(scenMap).sort((a, b) => b[1] - a[1]);

  // Top errors — normalize to ensure examples array always exists
  const topErrors = [...mistakeLog]
    .map(e => ({ ...e, examples: e.examples ?? [] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const TrendBadge = ({ pct }: { pct: number | null }) => {
    if (pct === null) return null;
    return (
      <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-lg', pct >= 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500')}>
        {pct >= 0 ? '+' : ''}{pct}%
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
    { id: 'errors', label: 'Errors', icon: AlertTriangle },
    { id: 'languages', label: 'Languages', icon: Globe },
  ] as const;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 px-6 pt-5 pb-4 text-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5"><TrendingUp size={16} /><h2 className="text-lg font-black">Weekly Report</h2></div>
              <p className="text-xs text-white/60">{rangeStart.toLocaleDateString('en', { month: 'short', day: 'numeric' })} – {now.toLocaleDateString('en', { month: 'short', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Range picker */}
              <div className="flex bg-white/10 rounded-xl p-0.5 gap-0.5">
                {(['7', '14', '30'] as const).map(r => (
                  <button key={r} onClick={() => setRangePreset(r)}
                    className={cn('px-2 py-1 rounded-lg text-[10px] font-bold transition-all', rangePreset === r ? 'bg-white text-indigo-600' : 'text-white/60 hover:text-white')}>
                    {r}d
                  </button>
                ))}
              </div>
              <button onClick={onClose} className="p-2 text-white/60 hover:text-white rounded-xl hover:bg-white/10 transition-colors"><X size={16} /></button>
            </div>
          </div>
          {/* Hero stats */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Sessions', value: String(totalSessions), trend: trend(totalSessions, lastSessions) },
              { label: 'Words', value: String(totalWords), trend: trend(totalWords, lastWords) },
              { label: 'Accuracy', value: `${accuracy}%`, trend: trend(accuracy, lastAccuracy) },
              { label: 'Streak', value: `${streak}d`, trend: null },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl px-2 py-2.5 text-center flex flex-col items-center gap-0.5">
                <p className="text-xl font-black text-white leading-none">{s.value}</p>
                <p className="text-[9px] text-white/50 uppercase tracking-wider leading-none">{s.label}</p>
                {s.trend !== null && (
                  <span className={cn('text-[9px] font-bold leading-none', s.trend >= 0 ? 'text-emerald-300' : 'text-red-300')}>
                    {s.trend >= 0 ? '↑' : '↓'}{Math.abs(s.trend)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100 shrink-0 px-2 pt-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn('flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-bold border-b-2 transition-all',
                tab === t.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-stone-400 hover:text-stone-600')}>
              <t.icon size={11} />{t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {thisWeek.length === 0 && (
            <div className="text-center py-16 text-stone-400">
              <TrendingUp size={36} className="mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium">No sessions in this period yet.</p>
              <p className="text-xs mt-1">Start a conversation to see your progress here.</p>
            </div>
          )}

          {tab === 'overview' && (
            <div className="space-y-4">
              {/* Streak card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                  <Zap size={22} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-600">{streak} day{streak !== 1 ? 's' : ''}</p>
                  <p className="text-xs text-amber-700/70">Current streak · Best: {maxStreak} day{maxStreak !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Comparison vs last period */}
              <div className="space-y-2">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider">vs Previous {rangePreset} Days</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Sessions', curr: totalSessions, prev: lastSessions, colorClass: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
                    { label: 'Words', curr: totalWords, prev: lastWords, colorClass: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                    { label: 'Accuracy', curr: accuracy, prev: lastAccuracy, colorClass: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', suffix: '%' },
                  ].map(r => {
                    const delta = r.prev > 0 ? Math.round(((r.curr - r.prev) / r.prev) * 100) : null;
                    const isUp = delta !== null && delta >= 0;
                    return (
                      <div key={r.label} className={`${r.bg} border ${r.border} rounded-2xl p-3 flex flex-col gap-1.5`}>
                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{r.label}</p>
                        <p className={`text-2xl font-black leading-none ${r.colorClass}`}>{r.curr}{r.suffix || ''}</p>
                        <div className="flex items-center justify-between mt-auto pt-1 border-t border-white/60">
                          <span className="text-[10px] text-stone-400">Prev: {r.prev}{r.suffix || ''}</span>
                          {delta !== null ? (
                            <span className={`text-[10px] font-black ${isUp ? 'text-emerald-500' : 'text-red-400'}`}>
                              {isUp ? '+' : ''}{delta}%
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-300">—</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best day */}
              {(() => {
                const best = days.reduce((a, b) => b.words > a.words ? b : a, days[0]);
                return best && best.words > 0 ? (
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                    <Award size={18} className="text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-stone-800">
                        Best day: {best.date.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                      <p className="text-xs text-stone-400">{best.words} words · {best.sessions} session{best.sessions !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {tab === 'activity' && (
            <div className="space-y-5">
              {/* Words per day bar chart */}
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-3">Words Learned Per Day</p>
                <div className="flex items-end gap-1 h-32">
                  {days.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <span className="text-[8px] font-bold text-stone-400">{d.words > 0 ? d.words : ''}</span>
                      <div className="w-full rounded-t-lg transition-all relative group"
                        style={{ height: `${Math.max((d.words / maxWords) * 80, d.words > 0 ? 6 : 0)}px`, background: d.words > 0 ? 'linear-gradient(to top, #6366f1, #818cf8)' : '#f1f5f9' }}>
                        {d.words > 0 && (
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[9px] px-1.5 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {d.sessions} session{d.sessions !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <span className="text-[8px] font-bold text-stone-500 text-center leading-tight">{d.dayLabel}</span>
                      <span className="text-[7px] text-stone-300 text-center leading-tight">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sessions per day */}
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-3">Sessions Per Day</p>
                <div className="flex items-end gap-1 h-20">
                  {days.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <span className="text-[8px] font-bold text-stone-400">{d.sessions > 0 ? d.sessions : ''}</span>
                      <div className="w-full rounded-t-lg transition-all"
                        style={{ height: `${Math.max((d.sessions / maxSess) * 40, d.sessions > 0 ? 4 : 0)}px`, background: d.sessions > 0 ? '#10b981' : '#f1f5f9' }} />
                      <span className="text-[8px] font-bold text-stone-500 text-center leading-tight">{d.dayLabel}</span>
                      <span className="text-[7px] text-stone-300 text-center leading-tight">{d.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Active Hours — full day, 4 slots */}
              <div>
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider mb-3">Most Active Hours</p>
                {(() => {
                  const slots = [
                    { label: 'Night', sub: '12–6am', hours: [0, 1, 2, 3, 4, 5] },
                    { label: 'Morning', sub: '6–9am', hours: [6, 7, 8] },
                    { label: 'Late AM', sub: '9am–12', hours: [9, 10, 11] },
                    { label: 'Afternoon', sub: '12–3pm', hours: [12, 13, 14] },
                    { label: 'Late PM', sub: '3–6pm', hours: [15, 16, 17] },
                    { label: 'Evening', sub: '6–9pm', hours: [18, 19, 20] },
                    { label: 'Night', sub: '9pm–12', hours: [21, 22, 23] },
                  ];
                  const counts = slots.map(slot =>
                    thisWeek.filter(s => slot.hours.includes(new Date(s.date).getHours())).length
                  );
                  const maxCount = Math.max(...counts, 1);
                  const peakIdx = counts.indexOf(Math.max(...counts));
                  return (
                    <div className="space-y-2">
                      <div className="flex gap-1.5">
                        {slots.map((slot, i) => {
                          const c = counts[i];
                          const intensity = c > 0 ? Math.min(0.12 + (c / maxCount) * 0.78, 0.9) : 0;
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <div className="w-full h-10 rounded-xl flex items-center justify-center transition-all"
                                style={{ background: c > 0 ? `rgba(99,102,241,${intensity})` : '#f1f5f9' }}>
                                {c > 0 && <span className="text-[9px] font-black text-indigo-700">{c}</span>}
                              </div>
                              <span className="text-[8px] font-bold text-stone-500 text-center leading-tight">{slot.label}</span>
                              <span className="text-[7px] text-stone-300 text-center leading-tight">{slot.sub}</span>
                            </div>
                          );
                        })}
                      </div>
                      {Math.max(...counts) > 0 && (
                        <p className="text-[10px] text-stone-400 text-center pt-1">
                          Most active during <span className="font-bold text-indigo-500">{slots[peakIdx].label}</span> ({slots[peakIdx].sub})
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}


          {tab === 'errors' && (
            <div className="space-y-3">
              {topErrors.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <BadgeCheck size={32} className="mx-auto mb-3 text-emerald-400" />
                  <p className="text-sm font-medium">No errors logged yet.</p>
                  <p className="text-xs mt-1 opacity-60">Keep chatting — corrections will appear here.</p>
                </div>
              ) : (
                <>
                  <div className={cn('border rounded-2xl p-4 flex items-center gap-3', accuracy >= 80 ? 'bg-emerald-50 border-emerald-100' : accuracy >= 60 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100')}>
                    <BadgeCheck size={18} className={cn('shrink-0', accuracy >= 80 ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-500' : 'text-red-400')} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-stone-800">
                        {accuracy >= 80 ? 'Great accuracy!' : accuracy >= 60 ? 'Decent — keep going' : 'Focus on reducing errors'}
                      </p>
                      <p className="text-xs text-stone-400">{totalCorrections} correction{totalCorrections !== 1 ? 's' : ''} · {totalSessions} session{totalSessions !== 1 ? 's' : ''} · {accuracy}% accuracy</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider pt-1">Error Breakdown — tap to expand</p>
                  {topErrors.map((e, i) => {
                    const pct = Math.round((e.count / Math.max(topErrors[0].count, 1)) * 100);
                    const colors = ['#ef4444', '#f59e0b', '#6366f1', '#10b981', '#8b5cf6'];
                    const lightBg = ['bg-red-50 border-red-100', 'bg-amber-50 border-amber-100', 'bg-indigo-50 border-indigo-100', 'bg-emerald-50 border-emerald-100', 'bg-violet-50 border-violet-100'];
                    const categoryTips: Record<string, string> = {
                      'Verb conjugation': 'Practice conjugating verbs in different tenses daily.',
                      'Gender agreement': 'Memorize noun genders with their articles as a pair.',
                      'Word order': 'Study sentence structure patterns for your target language.',
                      'Articles': 'Learn definite vs indefinite articles with each new noun.',
                      'Prepositions': 'Prepositions are idiomatic — learn them in context.',
                      'Plurals': 'Note irregular plural forms when learning new words.',
                      'Spelling/Accents': 'Use accent marks — they change meaning in many languages.',
                      'Grammar': 'Review the grammar rule and practice with similar sentences.',
                    };
                    const isOpen = expandedError === e.category;
                    return (
                      <div key={e.category} className={cn('border rounded-2xl overflow-hidden', lightBg[i])}>
                        <button className="w-full px-4 py-3 flex items-center gap-3 text-left" onClick={() => setExpandedError(isOpen ? null : e.category)}>
                          <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black text-white shrink-0" style={{ background: colors[i] }}>{i + 1}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-stone-700">{e.category}</span>
                              <span className="text-xs font-black text-stone-500 ml-2">{e.count}x</span>
                            </div>
                            <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: colors[i] }} />
                            </div>
                          </div>
                          <ChevronDown size={14} className={cn('text-stone-400 shrink-0 transition-transform', isOpen && 'rotate-180')} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 space-y-3 border-t border-white/50">
                            <div className="flex items-start gap-2 pt-3">
                              <Lightbulb size={13} className="text-amber-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-stone-500 italic">{categoryTips[e.category] || categoryTips['Grammar']}</p>
                            </div>
                            {e.examples && e.examples.length > 0 ? (
                              <div className="space-y-2">
                                <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider">Recent corrections</p>
                                {e.examples.slice(-3).slice().reverse().map((ex, j) => (
                                  <div key={j} className="bg-white/80 rounded-xl p-3 space-y-1.5">
                                    <div className="flex items-start gap-2">
                                      <span className="w-4 h-4 rounded-md bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <X size={9} className="text-red-500" />
                                      </span>
                                      <span className="text-xs text-stone-400 line-through leading-relaxed">{ex.original}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="w-4 h-4 rounded-md bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={9} className="text-emerald-600" />
                                      </span>
                                      <span className="text-xs text-stone-800 font-semibold leading-relaxed">{ex.corrected}</span>
                                    </div>
                                    {ex.explanation && (
                                      <p className="text-[10px] text-stone-400 leading-relaxed pl-6">{ex.explanation}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-stone-400 italic">No examples recorded yet.</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {tab === 'languages' && (
            <div className="space-y-4">
              {langs.length === 0 ? (
                <div className="text-center py-12 text-stone-400">
                  <Globe size={32} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm">No sessions in this period yet.</p>
                </div>
              ) : (
                <>
                  <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider">Languages Practiced</p>
                  {langs.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-3 bg-stone-50 rounded-2xl p-4">
                      <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                        <Globe size={16} className="text-indigo-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-stone-800 text-sm">{lang}</span>
                          <span className="text-xs font-bold text-stone-400">{count} session{count !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(count / langs[0][1]) * 100}%`, background: '#6366f1' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {scens.length > 0 && (
                    <>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-wider pt-2">Scenarios Practiced</p>
                      <div className="grid grid-cols-2 gap-2">
                        {scens.slice(0, 6).map(([scen, count]) => (
                          <div key={scen} className="bg-violet-50 border border-violet-100 rounded-2xl px-3 py-2.5 flex items-center justify-between">
                            <span className="text-xs font-bold text-violet-700 truncate">{scen}</span>
                            <span className="text-xs font-black text-violet-500 shrink-0 ml-2">{count}x</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};


// ─── Word Hover Tooltip ────────────────────────────────────────────────────
const HoverWord = ({ word, language }: { word: string; language: Language }) => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(async () => {
      setShow(true);
      if (tooltip) return;
      const clean = word.replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF'-]/g, '').trim();
      if (!clean || clean.length < 2) return;
      setLoading(true);
      try {
        const res = await translateWord(clean, language);
        setTooltip(res.translation);
      } catch { setTooltip(null); }
      finally { setLoading(false); }
    }, 300);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  };

  return (
    <span className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={cn('cursor-help transition-colors', show ? 'text-emerald-600 underline decoration-dotted underline-offset-2' : 'hover:text-emerald-500')}>
        {word}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none">
          <span className="flex items-center gap-1.5 bg-stone-900 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-xl shadow-lg whitespace-nowrap">
            {loading ? <Loader2 size={10} className="animate-spin" /> : (tooltip ?? '…')}
          </span>
          <span className="block w-2 h-2 bg-stone-900 rotate-45 mx-auto -mt-1" />
        </span>
      )}
    </span>
  );
};

const TokenizedText = ({ text, language, enabled }: { text: string; language: Language; enabled: boolean }) => {
  if (!enabled) return <span>{text}</span>;
  // Split on spaces but keep punctuation attached to words
  const tokens = text.split(/( +)/);
  return (
    <>
      {tokens.map((token, i) =>
        token.trim() === ''
          ? <React.Fragment key={i}>{token}</React.Fragment>
          : <React.Fragment key={i}><HoverWord word={token} language={language} /></React.Fragment>
      )}
    </>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────
const ChatView = () => {
  const { quizSettings, addFlashcard, flashcards, chatSessions, saveChatSession, setChatSessions, removeChatSession, difficultyScore, updateDifficultyScore, user, grammarMode, setGrammarMode, savedPhrases, addSavedPhrase, removeSavedPhrase, mistakeLog, logMistake } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<number | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [scenarioPicker, setScenarioPicker] = useState(false);
  const [expandedCorrection, setExpandedCorrection] = useState<number | null>(null);
  const [addedWords, setAddedWords] = useState<Set<string>>(new Set());
  const [chatError, setChatError] = useState<string | null>(null);
  const [lastPronScore, setLastPronScore] = useState<number | null>(null);
  // stable session ID — set once per "chat", only changes on New Chat or scenario switch
  const [activeSessionId, setActiveSessionId] = useState<string>(() => `session-${Date.now()}`);
  // creation date — locked at session start, never overwritten on updates
  const [sessionCreatedAt, setSessionCreatedAt] = useState<string>(() => new Date().toISOString());
  // modals
  const [showHistory, setShowHistory] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    recap: string; strengths: string; improvements: string;
    wordsLearned: number; correctionsCount: number;
    words: { word: string; translation: string }[];
    corrections: { original: string; corrected: string; explanation: string }[];
  } | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  // per-session mistake tracking (resets on new chat / load session)
  const [sessionMistakes, setSessionMistakes] = useState<{ category: string; count: number; examples: { original: string; corrected: string; explanation: string }[] }[]>([]);
  const [showCustomScenario, setShowCustomScenario] = useState(false);
  const [vocabQuizQuestions, setVocabQuizQuestions] = useState<{ type: 'mcq' | 'fill' | 'arrange'; question: string; options?: string[]; answer: string; blankedSentence?: string; words?: string[] }[] | null>(null);
  const [showQuizSetup, setShowQuizSetup] = useState(false);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  // feature 3: challenge
  const [challenge, setChallenge] = useState<{ title: string; description: string; targetPhrases: string[]; successCriteria: string } | null>(null);
  const [usedPhrases, setUsedPhrases] = useState<Set<string>>(new Set());
  const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);
  // feature 5: role reversal
  const [roleReversed, setRoleReversed] = useState(false);
  // feature 10: speed mode
  const [speedMode, setSpeedMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // feature 7: revealed translations per message index
  const [revealedTranslations, setRevealedTranslations] = useState<Set<number>>(new Set());
  // word hover tooltip toggle
  const [wordTooltipEnabled, setWordTooltipEnabled] = useState(false);
  // text selection translation popup
  const [selectionPopup, setSelectionPopup] = useState<{ text: string; x: number; y: number; translation: string | null; loading: boolean } | null>(null);
  const selectionPopupRef = useRef<HTMLDivElement>(null);
  // new feature modals
  const [showSavedPhrases, setShowSavedPhrases] = useState(false);
  const [showWeeklyReport, setShowWeeklyReport] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showScenarioCollection, setShowScenarioCollection] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showVocabReview, setShowVocabReview] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [replayIdx, setReplayIdx] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  // typing challenge state
  const [typingChallenge, setTypingChallenge] = useState<{ sentence: string; translation: string; answer: string; userInput: string; result: 'idle' | 'correct' | 'wrong' } | null>(null);
  const [isLoadingTypingChallenge, setIsLoadingTypingChallenge] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const messagesRef = useRef<Message[]>(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const wordsLearned = messages.filter(m => m.role === 'assistant' && m.newWords?.length).reduce((a, m) => a + (m.newWords?.length ?? 0), 0);
  const correctionsCount = messages.filter(m => m.role === 'assistant' && m.correction).length;
  const diffInfo = DIFFICULTY_LABEL(difficultyScore);
  const allSessionWords = messages.flatMap(m => m.newWords || []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  // Load chat sessions from DB on mount
  useEffect(() => {
    if (!user) return;
    getChatSessions(user.id)
      .then(sessions => setChatSessions(sessions))
      .catch(() => { });
  }, [user]);

  // Auto-save: upsert the SAME session ID on every message change (debounced 3s)
  useEffect(() => {
    if (!user || messages.length === 0) return;
    const wl = messages.filter(m => m.role === 'assistant' && m.newWords?.length).reduce((a, m) => a + (m.newWords?.length ?? 0), 0);
    const cc = messages.filter(m => m.role === 'assistant' && m.correction).length;
    const session: ChatSession = {
      id: activeSessionId,
      date: sessionCreatedAt,
      language: quizSettings.targetLanguage,
      scenarioId: selectedScenario.id,
      scenarioLabel: selectedScenario.label,
      messages,
      wordsLearned: wl,
      correctionsCount: cc,
    };
    const timer = setTimeout(() => {
      saveChatSession(session);
      saveChatSessionDB(user.id, session).catch(() => { });
    }, 3000);
    return () => clearTimeout(timer);
  }, [messages]);

  // Save on tab close
  useEffect(() => {
    const handleUnload = () => {
      if (!user || messagesRef.current.length === 0) return;
      const wl = messagesRef.current.filter(m => m.role === 'assistant' && m.newWords?.length).reduce((a, m) => a + (m.newWords?.length ?? 0), 0);
      const cc = messagesRef.current.filter(m => m.role === 'assistant' && m.correction).length;
      saveChatSessionDB(user.id, {
        id: activeSessionId,
        date: sessionCreatedAt,
        language: quizSettings.targetLanguage,
        scenarioId: selectedScenario.id,
        scenarioLabel: selectedScenario.label,
        messages: messagesRef.current,
        wordsLearned: wl,
        correctionsCount: cc,
      }).catch(() => { });
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [user, activeSessionId, selectedScenario.id, quizSettings.targetLanguage]);

  // Feature 10: speed mode timer
  useEffect(() => {
    if (!speedMode) { if (timerRef.current) clearInterval(timerRef.current); return; }
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== 'assistant') return;
    setTimeLeft(15);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [messages, speedMode]);

  // Feature 4: check tone after user sends
  const checkTone = useCallback(async (userMsg: string) => {
    if (selectedScenario.id === 'free' || !selectedScenario.prompt) return;
    try {
      const result = await analyzeTone(userMsg, selectedScenario.label, quizSettings.targetLanguage);
      if (!result.isAppropriate && result.toneTip) {
        setMessages(prev => {
          const updated = [...prev];
          const lastUser = [...updated].reverse().findIndex(m => m.role === 'user');
          if (lastUser !== -1) {
            const realIdx = updated.length - 1 - lastUser;
            updated[realIdx] = { ...updated[realIdx], toneTip: { tip: result.toneTip!, alternative: result.betterAlternative || '' } };
          }
          return updated;
        });
      }
    } catch { /* silent */ }
  }, [selectedScenario, quizSettings.targetLanguage]);

  const getSuggestions = (): string[] => {
    if (messages.length === 0) return [];
    const last = messages[messages.length - 1];
    if (last.role !== 'assistant') return [];
    const text = last.content.toLowerCase();
    const lang = quizSettings.targetLanguage;

    // Context-aware suggestions based on what the AI just said
    const isQuestion = last.content.includes('?');
    const asksRepeat = text.includes('répét') || text.includes('repeat') || text.includes('encore');
    const asksName = text.includes('nom') || text.includes('appel') || text.includes('name');
    const asksHow = text.includes('comment') || text.includes('how are') || text.includes('ça va');
    const asksWhere = text.includes('où') || text.includes('where') || text.includes('destination');
    const asksOrder = text.includes('commander') || text.includes('order') || text.includes('choisir');
    const asksPrice = text.includes('prix') || text.includes('coût') || text.includes('combien');
    const asksJob = text.includes('expérience') || text.includes('travail') || text.includes('poste');
    const asksHelp = text.includes('aide') || text.includes('help') || text.includes('besoin');
    const greeting = text.includes('bonjour') || text.includes('bonsoir') || text.includes('salut');

    if (lang === 'French') {
      if (greeting) return ["Bonjour!", "Bonsoir!", "Enchanté(e)!"];
      if (asksName) return ["Je m'appelle...", "Mon nom est...", "Et vous?"];
      if (asksHow) return ["Je vais bien, merci", "Pas mal, et vous?", "Très bien!"];
      if (asksWhere) return ["Je vais à Paris", "Ma destination est...", "Je ne sais pas encore"];
      if (asksOrder) return ["Je voudrais commander", "Qu'est-ce que vous recommandez?", "C'est quoi le plat du jour?"];
      if (asksPrice) return ["C'est combien?", "Avez-vous quelque chose de moins cher?", "Je vais le prendre"];
      if (asksJob) return ["J'ai 3 ans d'expérience", "Je travaille dans...", "Quelles sont les responsabilités?"];
      if (asksHelp) return ["Oui, j'ai besoin d'aide", "Non merci, ça va", "Pouvez-vous m'expliquer?"];
      if (asksRepeat) return ["Pouvez-vous répéter?", "Plus lentement, s'il vous plaît", "Je n'ai pas compris"];
      if (isQuestion) return ["Pouvez-vous répéter?", "Je comprends", "Je ne suis pas sûr(e)"];
      return ["C'est intéressant!", "Je comprends", "Pouvez-vous expliquer?"];
    }
    if (lang === 'Spanish') {
      if (greeting) return ["¡Hola!", "¡Buenos días!", "¡Mucho gusto!"];
      if (asksName) return ["Me llamo...", "Mi nombre es...", "¿Y usted?"];
      if (asksHow) return ["Estoy bien, gracias", "Más o menos", "¡Muy bien!"];
      if (isQuestion) return ["¿Puede repetir?", "Entiendo", "No estoy seguro/a"];
      return ["¡Interesante!", "Entiendo", "¿Puede explicar?"];
    }
    if (lang === 'German') {
      if (greeting) return ["Hallo!", "Guten Morgen!", "Freut mich!"];
      if (asksName) return ["Ich heiße...", "Mein Name ist...", "Und Sie?"];
      if (isQuestion) return ["Können Sie wiederholen?", "Ich verstehe", "Ich bin nicht sicher"];
      return ["Interessant!", "Ich verstehe", "Können Sie erklären?"];
    }
    // Generic fallback for other languages
    if (isQuestion) return ["Can you repeat?", "I understand", "I'm not sure"];
    return ["That's interesting!", "I understand", "Can you explain?"];
  };

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const userMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setChatError(null);

    // Feature 3: track challenge phrase usage
    if (challenge) {
      challenge.targetPhrases.forEach(p => {
        if (content.toLowerCase().includes(p.toLowerCase())) {
          setUsedPhrases(prev => new Set(prev).add(p.toLowerCase()));
        }
      });
    }

    // Feature 4: tone check (async, non-blocking)
    checkTone(content);

    try {
      const allMsgs = [...messages, userMsg];
      // Feature 5: role reversal flips the scenario prompt
      const scenarioPrompt = roleReversed && selectedScenario.id !== 'free'
        ? selectedScenario.prompt + ' IMPORTANT: The student is now playing YOUR role. You play the customer/candidate/visitor. Let them lead.'
        : selectedScenario.prompt || undefined;

      const result = await generateChatResponse(allMsgs, quizSettings.targetLanguage, scenarioPrompt, difficultyScore, grammarMode);
      const assistantMsg: Message = { role: 'assistant', content: result.reply, correction: result.correction, newWords: result.newWords, translation: result.translation || null };
      setMessages(prev => [...prev, assistantMsg]);

      if (result.correction) {
        updateDifficultyScore(-3);
        const category = extractMistakeCategory(result.correction.explanation);
        const example = { original: result.correction.original, corrected: result.correction.corrected, explanation: result.correction.explanation };
        // persist to store (survives across sessions)
        logMistake(category, example);
        setSessionMistakes(prev => {
          const idx = prev.findIndex(m => m.category === category);
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], count: updated[idx].count + 1, examples: [...updated[idx].examples, example].slice(-5) };
            return updated;
          }
          return [...prev, { category, count: 1, examples: [example] }];
        });
      } else {
        updateDifficultyScore(2);
      }

      if (autoSpeak) {
        const idx = allMsgs.length;
        setIsSpeakingId(idx);
        speakText(result.reply, quizSettings.targetLanguage, () => setIsSpeakingId(null));
      }
    } catch (err: any) {
      console.error('[ChatView] AI error:', err);
      const is429 = err?.status === 429 || err?.message?.includes('429');
      const isAuth = err?.status === 401 || err?.message?.toLowerCase().includes('api key');
      if (isAuth) setChatError('Invalid API key. Check your VITE_GROQ_API_KEY in .env.local.');
      else if (is429) setChatError('AI is busy right now. Wait a moment and try again.');
      else setChatError(`Error: ${err?.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Typing speed challenge: pick a random AI sentence from the session
  const startTypingChallenge = async () => {
    const aiMsgs = messages.filter(m => m.role === 'assistant' && m.translation && m.content.length > 10);
    if (aiMsgs.length === 0) { setChatError('Have a conversation first to unlock typing challenges.'); return; }
    setIsLoadingTypingChallenge(true);
    const pick = aiMsgs[Math.floor(Math.random() * aiMsgs.length)];
    setTypingChallenge({ sentence: pick.translation || '', translation: pick.content, answer: pick.content, userInput: '', result: 'idle' });
    setIsLoadingTypingChallenge(false);
  };

  const checkTypingAnswer = () => {
    if (!typingChallenge) return;
    const correct = typingChallenge.userInput.trim().toLowerCase() === typingChallenge.answer.trim().toLowerCase();
    setTypingChallenge(prev => prev ? { ...prev, result: correct ? 'correct' : 'wrong' } : null);
  };

  // Conversation replay
  const startReplay = () => {
    if (messages.length === 0) return;
    setReplayIdx(0);
    setIsReplaying(true);
    setShowReplay(true);
  };

  useEffect(() => {
    if (!isReplaying || !showReplay) return;
    const msg = messages[replayIdx];
    if (!msg) { setIsReplaying(false); return; }
    if (msg.role === 'assistant') {
      speakText(msg.content, quizSettings.targetLanguage, () => {
        setTimeout(() => setReplayIdx(i => i + 1), 600);
      });
    } else {
      speakText(msg.content, 'English', () => {
        setTimeout(() => setReplayIdx(i => i + 1), 600);
      });
    }
  }, [replayIdx, isReplaying, showReplay]);

  const toggleListen = async () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) { setChatError('Speech recognition is not supported in this browser. Try Chrome.'); return; }

    // Request mic permission explicitly so we can show a clear error
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setChatError('Microphone access denied. Please allow microphone access and try again.');
      return;
    }

    const r = new SR();
    r.lang = LANG_CODES[quizSettings.targetLanguage] || 'fr-FR';
    r.continuous = false;
    r.interimResults = false;
    r.onstart = () => setIsListening(true);
    r.onresult = (e: any) => {
      const res = e.results[0][0];
      setLastPronScore(Math.round(res.confidence * 100));
      const transcript = res.transcript;
      setInput(transcript);
      setIsListening(false);
      setTimeout(() => handleSend(transcript), 100);
    };
    r.onerror = (e: any) => {
      setIsListening(false);
      if (e.error === 'no-speech') return; // user just didn't speak, no need to show error
      if (e.error === 'not-allowed') setChatError('Microphone access denied. Check your browser settings.');
      else setChatError(`Microphone error: ${e.error}`);
    };
    r.onend = () => setIsListening(false);
    r.start();
    recognitionRef.current = r;
  };

  const speakMessage = (content: string, idx: number) => {
    if (isSpeakingId === idx) { window.speechSynthesis.cancel(); setIsSpeakingId(null); return; }
    setIsSpeakingId(idx);
    speakText(content, quizSettings.targetLanguage, () => setIsSpeakingId(null));
  };


  const addWordToFlashcards = (word: NewWord) => {
    if (addedWords.has(word.word)) return;
    const already = flashcards.some((f: any) => f.word === word.word && f.language === quizSettings.targetLanguage);
    if (already) { setAddedWords(prev => new Set(prev).add(word.word)); return; }
    const card = { id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, word: word.word, translation: word.translation, language: quizSettings.targetLanguage, nextReview: new Date().toISOString(), lastReviewed: null };
    addFlashcard(card);
    if (user) import('../services/dbService').then(m => m.upsertFlashcard(user.id, card)).catch(() => { });
    setAddedWords(prev => new Set(prev).add(word.word));
  };

  const handleTextSelection = async () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { setSelectionPopup(null); return; }
    const text = sel.toString().trim();
    if (!text || text.length < 2 || text.length > 200) { setSelectionPopup(null); return; }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = scrollRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const x = rect.left + rect.width / 2 - containerRect.left;
    const y = rect.top - containerRect.top + (scrollRef.current?.scrollTop ?? 0);
    setSelectionPopup({ text, x, y, translation: null, loading: true });
    try {
      const res = await translateWord(text, quizSettings.targetLanguage);
      setSelectionPopup(prev => prev ? { ...prev, translation: res.translation, loading: false } : null);
    } catch {
      setSelectionPopup(prev => prev ? { ...prev, translation: 'Could not translate', loading: false } : null);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (selectionPopupRef.current && !selectionPopupRef.current.contains(e.target as Node)) {
        if (!window.getSelection() || window.getSelection()!.isCollapsed) setSelectionPopup(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const loadSession = (s: ChatSession) => {
    setActiveSessionId(s.id);
    setSessionCreatedAt(s.date); // preserve original creation date
    setMessages(s.messages as Message[]);
    const sc = SCENARIOS.find(sc => sc.id === s.scenarioId) || SCENARIOS[0];
    setSelectedScenario(sc);
    setAddedWords(new Set());
    setRevealedTranslations(new Set());
    setChallenge(null);
    setUsedPhrases(new Set());
    // rebuild mistakes from the loaded session's corrections
    const rebuilt: { category: string; count: number; examples: { original: string; corrected: string; explanation: string }[] }[] = [];
    (s.messages as Message[]).forEach(m => {
      if (m.correction) {
        const cat = extractMistakeCategory(m.correction.explanation);
        const ex = { original: m.correction.original, corrected: m.correction.corrected, explanation: m.correction.explanation };
        const existing = rebuilt.find(r => r.category === cat);
        if (existing) { existing.count++; existing.examples = [...existing.examples, ex].slice(-5); }
        else rebuilt.push({ category: cat, count: 1, examples: [ex] });
      }
    });
    setSessionMistakes(rebuilt);
  };

  // "New Chat" — generate a fresh session ID, clear messages
  const startNewChat = (scenario?: Scenario) => {
    // Trigger vocab review if flashcard words appeared in this session
    if (messages.length > 2 && flashcards.length > 0) {
      const chatText = messages.map(m => m.content.toLowerCase()).join(' ');
      const reviewWords = flashcards.filter(f => chatText.includes(f.word.toLowerCase()));
      if (reviewWords.length > 0) setShowVocabReview(true);
    }
    setActiveSessionId(`session-${Date.now()}`);
    setSessionCreatedAt(new Date().toISOString()); // fresh date for new session
    setMessages([]);
    setChatError(null);
    setLastPronScore(null);
    setChallenge(null);
    setUsedPhrases(new Set());
    setRevealedTranslations(new Set());
    setSessionMistakes([]);
    if (scenario) setSelectedScenario(scenario);
  };

  // Alias used by scenario picker and clear button
  const clearChat = () => startNewChat();

  const handleSummary = async () => {
    if (messages.length === 0) return;
    setIsSummarizing(true);
    try {
      const result = await generateSessionSummary(messages, quizSettings.targetLanguage, wordsLearned, correctionsCount);
      const words = messages.flatMap(m => m.newWords || []);
      const corrections = messages.filter(m => m.correction).map(m => m.correction!);
      setSummaryData({ ...result, wordsLearned, correctionsCount, words, corrections });
    } catch { /* silent */ } finally { setIsSummarizing(false); }
  };

  const handleChallenge = async () => {
    setIsLoadingChallenge(true);
    try {
      const c = await generateChallenge(quizSettings.targetLanguage, diffInfo.label);
      setChallenge(c); setUsedPhrases(new Set());
    } catch { /* silent */ } finally { setIsLoadingChallenge(false); }
  };

  const handleVocabQuiz = async (count: number) => {
    setShowQuizSetup(false);
    setIsLoadingQuiz(true);
    try {
      const chatContext = messages.map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`).join('\n');
      const qs = await generateVocabQuiz(allSessionWords, quizSettings.targetLanguage, chatContext, count);
      setVocabQuizQuestions(qs);
    } catch { /* silent */ } finally { setIsLoadingQuiz(false); }
  };

  const applyCustomScenario = (s: { title: string; description: string; prompt: string; starterPhrases: string[] }) => {
    const custom: Scenario = { id: 'custom', label: s.title, description: s.description, icon: PenLine, color: '#6366f1', bg: 'rgba(99,102,241,0.08)', prompt: s.prompt };
    setShowCustomScenario(false);
    startNewChat(custom);
  };

  const activeScenarioStyle = { color: selectedScenario.color, background: selectedScenario.bg };
  const suggestions = getSuggestions();

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col bg-white rounded-[40px] shadow-sm border border-stone-100 overflow-hidden relative" style={{ height: 'calc(100vh - 10rem)' }}>

      {/* Header */}
      <div className="px-6 py-4 border-b border-stone-50 flex items-center justify-between bg-stone-50/50 shrink-0 gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-stone-800 text-sm">AI Tutor</h2>
            <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">Practicing {quizSettings.targetLanguage}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Difficulty badge */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold" style={{ color: diffInfo.color, background: `${diffInfo.color}12`, borderColor: `${diffInfo.color}30` }}>
            <TrendingUp size={11} />{diffInfo.label}
          </div>

          {/* Scenario picker */}
          <div className="relative">
            <button onClick={() => setScenarioPicker(v => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all"
              style={scenarioPicker ? activeScenarioStyle : { background: 'white', color: '#78716c', borderColor: '#f5f5f4' }}>
              <selectedScenario.icon size={11} />{selectedScenario.label}{scenarioPicker ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
            <AnimatePresence>
              {scenarioPicker && (
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50">
                  {SCENARIOS.slice(0, 6).map(s => (
                    <button key={s.id} onClick={() => { setScenarioPicker(false); startNewChat(s); setRoleReversed(false); }}
                      className={cn('w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50', selectedScenario.id === s.id ? 'bg-stone-50' : '')}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}><s.icon size={14} style={{ color: s.color }} /></div>
                      <div><p className="text-xs font-bold text-stone-800">{s.label}</p><p className="text-[10px] text-stone-400">{s.description}</p></div>
                      {selectedScenario.id === s.id && <Check size={13} className="ml-auto text-emerald-500 shrink-0" />}
                    </button>
                  ))}
                  <div className="border-t border-stone-50" />
                  <button onClick={() => { setScenarioPicker(false); setShowScenarioCollection(true); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-emerald-50">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-emerald-50"><BookOpen size={14} className="text-emerald-500" /></div>
                    <div><p className="text-xs font-bold text-stone-800">Browse Collection</p><p className="text-[10px] text-stone-400">50+ scenarios to explore</p></div>
                  </button>
                  <button onClick={() => { setScenarioPicker(false); setShowCustomScenario(true); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-indigo-50">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-indigo-50"><PenLine size={14} className="text-indigo-500" /></div>
                    <div><p className="text-xs font-bold text-stone-800">Custom Scenario</p><p className="text-[10px] text-stone-400">Describe your own situation</p></div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History */}
          <button onClick={() => setShowHistory(v => !v)}
            className={cn('flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all',
              showHistory ? 'bg-stone-100 text-stone-700 border-stone-200' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200')}>
            <History size={11} />{chatSessions.length > 0 ? chatSessions.length : ''}
          </button>

          {/* Settings dropdown — all secondary actions */}
          <div className="relative">
            <button onClick={() => setShowSettingsMenu(v => !v)}
              className={cn('flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all',
                showSettingsMenu ? 'bg-stone-100 text-stone-700 border-stone-200' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200')}>
              <GripVertical size={11} />{showSettingsMenu ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
            <AnimatePresence>
              {showSettingsMenu && (
                <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden z-50 py-1">

                  {/* Grammar mode */}
                  <button onClick={() => { setGrammarMode(grammarMode === 'strict' ? 'fluency' : 'strict'); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <BookOpenCheck size={13} className={grammarMode === 'strict' ? 'text-red-500' : 'text-blue-500'} />
                      <span className="text-xs font-semibold text-stone-700">Grammar Mode</span>
                    </div>
                    <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-lg', grammarMode === 'strict' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500')}>
                      {grammarMode === 'strict' ? 'Strict' : 'Fluency'}
                    </span>
                  </button>

                  {/* Word tooltips */}
                  <button onClick={() => setWordTooltipEnabled(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Languages size={13} className={wordTooltipEnabled ? 'text-emerald-500' : 'text-stone-400'} />
                      <span className="text-xs font-semibold text-stone-700">Word Tooltips</span>
                    </div>
                    <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-lg', wordTooltipEnabled ? 'bg-emerald-50 text-emerald-600' : 'bg-stone-100 text-stone-400')}>
                      {wordTooltipEnabled ? 'On' : 'Off'}
                    </span>
                  </button>

                  {/* Speed mode */}
                  <button onClick={() => setSpeedMode(v => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Timer size={13} className={speedMode ? 'text-red-500' : 'text-stone-400'} />
                      <span className="text-xs font-semibold text-stone-700">Speed Mode</span>
                    </div>
                    <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-lg', speedMode ? 'bg-red-50 text-red-500' : 'bg-stone-100 text-stone-400')}>
                      {speedMode ? `${timeLeft}s` : 'Off'}
                    </span>
                  </button>

                  {/* Role reversal */}
                  {selectedScenario.id !== 'free' && (
                    <button onClick={() => setRoleReversed(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-stone-50 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Shuffle size={13} className={roleReversed ? 'text-indigo-500' : 'text-stone-400'} />
                        <span className="text-xs font-semibold text-stone-700">Role Reversal</span>
                      </div>
                      <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-lg', roleReversed ? 'bg-indigo-50 text-indigo-600' : 'bg-stone-100 text-stone-400')}>
                        {roleReversed ? 'On' : 'Off'}
                      </span>
                    </button>
                  )}

                  <div className="border-t border-stone-50 my-1" />

                  {/* Challenge */}
                  <button onClick={() => { setShowSettingsMenu(false); handleChallenge(); }} disabled={isLoadingChallenge}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-amber-50 transition-colors disabled:opacity-50">
                    {isLoadingChallenge ? <Loader2 size={13} className="animate-spin text-stone-400" /> : <Target size={13} className="text-amber-500" />}
                    <span className="text-xs font-semibold text-stone-700">Daily Challenge</span>
                  </button>

                  {/* Saved phrases */}
                  <button onClick={() => { setShowSettingsMenu(false); setShowSavedPhrases(true); }}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-violet-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Pin size={13} className="text-violet-500" />
                      <span className="text-xs font-semibold text-stone-700">Saved Phrases</span>
                    </div>
                    {savedPhrases.length > 0 && <span className="text-[10px] font-black bg-violet-50 text-violet-600 px-2 py-0.5 rounded-lg">{savedPhrases.length}</span>}
                  </button>

                  {/* Errors heatmap */}
                  <button onClick={() => { setShowSettingsMenu(false); setShowHeatmap(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-red-50 transition-colors">
                    <BarChart2 size={13} className="text-red-400" />
                    <span className="text-xs font-semibold text-stone-700">Error Heatmap</span>
                  </button>

                  {/* Weekly report */}
                  <button onClick={() => { setShowSettingsMenu(false); setShowWeeklyReport(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-indigo-50 transition-colors">
                    <TrendingUp size={13} className="text-indigo-500" />
                    <span className="text-xs font-semibold text-stone-700">Weekly Report</span>
                  </button>

                  {messages.length > 2 && (<>
                    <div className="border-t border-stone-50 my-1" />

                    {/* Summary */}
                    <button onClick={() => { setShowSettingsMenu(false); handleSummary(); }} disabled={isSummarizing}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 transition-colors disabled:opacity-50">
                      {isSummarizing ? <Loader2 size={13} className="animate-spin text-stone-400" /> : <FileText size={13} className="text-emerald-500" />}
                      <span className="text-xs font-semibold text-stone-700">Session Summary</span>
                    </button>

                    {/* Vocab quiz */}
                    <button onClick={() => { setShowSettingsMenu(false); setShowQuizSetup(true); }} disabled={isLoadingQuiz}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 transition-colors disabled:opacity-50">
                      {isLoadingQuiz ? <Loader2 size={13} className="animate-spin text-stone-400" /> : <FlaskConical size={13} className="text-emerald-500" />}
                      <span className="text-xs font-semibold text-stone-700">Vocab Quiz</span>
                    </button>

                    {/* Typing challenge */}
                    <button onClick={() => { setShowSettingsMenu(false); startTypingChallenge(); }} disabled={isLoadingTypingChallenge}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-amber-50 transition-colors disabled:opacity-50">
                      {isLoadingTypingChallenge ? <Loader2 size={13} className="animate-spin text-stone-400" /> : <Pencil size={13} className="text-amber-500" />}
                      <span className="text-xs font-semibold text-stone-700">Typing Challenge</span>
                    </button>

                    {/* Replay */}
                    <button onClick={() => { setShowSettingsMenu(false); startReplay(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-emerald-50 transition-colors">
                      <Volume2 size={13} className="text-emerald-500" />
                      <span className="text-xs font-semibold text-stone-700">Replay Session</span>
                    </button>
                  </>)}

                  <div className="border-t border-stone-50 my-1" />
                  <button onClick={() => { setShowSettingsMenu(false); clearChat(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-stone-50 transition-colors">
                    <Plus size={13} className="text-stone-400" />
                    <span className="text-xs font-semibold text-stone-500">New Chat</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Feature 2: Word of the day */}
      <WordOfDayBanner lang={quizSettings.targetLanguage} />

      {/* Scenario banner */}
      {selectedScenario.id !== 'free' && (
        <div className="px-6 py-2 flex items-center gap-2 shrink-0 border-b border-stone-50 mt-2" style={{ background: selectedScenario.bg }}>
          <selectedScenario.icon size={13} style={{ color: selectedScenario.color }} />
          <p className="text-[11px] font-bold" style={{ color: selectedScenario.color }}>
            {selectedScenario.label}{roleReversed ? ' (Role Reversed)' : ''} — {selectedScenario.description}
          </p>
        </div>
      )}

      {/* Feature 3: challenge banner */}
      {challenge && <ChallengeBanner challenge={challenge} usedPhrases={usedPhrases} onDismiss={() => setChallenge(null)} />}

      {/* Session stats bar */}
      {messages.length > 0 && (
        <div className="px-6 py-2 border-b border-stone-50 flex items-center gap-4 bg-stone-50/30 shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Session</span>
          <span className="text-[10px] font-bold text-emerald-600">{wordsLearned} words</span>
          <span className="text-[10px] font-bold text-amber-500">{correctionsCount} corrections</span>
          <div className="flex items-center gap-1.5 ml-auto">
            <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${difficultyScore}%`, background: diffInfo.color }} />
            </div>
            <span className="text-[10px] font-bold" style={{ color: diffInfo.color }}>{diffInfo.label}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 relative" onMouseUp={handleTextSelection}
        style={{ backgroundColor: '#fafaf9', backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.18) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        {/* Selection translation popup */}
        {selectionPopup && (
          <div ref={selectionPopupRef}
            className="absolute z-50 pointer-events-auto"
            style={{ left: selectionPopup.x, top: selectionPopup.y - 8, transform: 'translate(-50%, -100%)' }}>
            <div className="bg-stone-900 text-white rounded-2xl shadow-xl px-4 py-2.5 flex items-center gap-2.5 min-w-[120px] max-w-[280px]">
              {selectionPopup.loading
                ? <><Loader2 size={13} className="animate-spin text-emerald-400 shrink-0" /><span className="text-xs text-stone-300">Translating...</span></>
                : <>
                  <Languages size={13} className="text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-stone-400 truncate">{selectionPopup.text}</p>
                    <p className="text-sm font-bold text-white leading-tight">{selectionPopup.translation}</p>
                  </div>
                  <button onClick={() => setSelectionPopup(null)} className="text-stone-500 hover:text-stone-300 shrink-0"><X size={12} /></button>
                </>
              }
            </div>
            <div className="w-2.5 h-2.5 bg-stone-900 rotate-45 mx-auto -mt-1.5" />
          </div>
        )}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-10 gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: selectedScenario.bg }}>
              <selectedScenario.icon size={28} style={{ color: selectedScenario.color }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-1">{selectedScenario.id === 'free' ? 'Start a conversation' : `${selectedScenario.label} scenario`}</h3>
              <p className="text-stone-400 text-sm max-w-xs">{selectedScenario.id === 'free' ? `Say hello in ${quizSettings.targetLanguage} to get started.` : selectedScenario.description + '. Type or speak to begin.'}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {(selectedScenario.id === 'free' ? ['Bonjour!', 'Comment ça va?', 'Parle-moi de toi']
                : selectedScenario.id === 'restaurant' ? ["Je voudrais une table", "Qu'est-ce que vous recommandez?", "L'addition, s'il vous plaît"]
                  : selectedScenario.id === 'shopping' ? ["Combien ça coûte?", "Avez-vous ça en rouge?", "Je cherche un cadeau"]
                    : ["Bonjour!", "Pouvez-vous m'aider?", "Je ne comprends pas"]
              ).map(s => (
                <button key={s} onClick={() => handleSend(s)} className="px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-100 rounded-xl text-xs font-medium text-stone-600 transition-colors">{s}</button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className={cn('flex gap-3', msg.role === 'user' ? 'flex-row-reverse' : '')}>
              <div className={cn('w-9 h-9 rounded-xl shrink-0 mt-0.5 overflow-hidden flex items-center justify-center', msg.role === 'user' ? 'bg-stone-100' : 'bg-emerald-100')}>
                {msg.role === 'user'
                  ? (user?.avatarUrl
                    ? <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    : <User size={16} className="text-stone-500" />)
                  : <Bot size={16} className="text-emerald-600" />}
              </div>

              <div className={cn('space-y-2 max-w-[78%]', msg.role === 'user' ? 'items-end flex flex-col' : '')}>
                <div className={cn('px-4 py-3 rounded-2xl text-sm leading-relaxed', msg.role === 'user' ? 'bg-stone-800 text-white rounded-tr-none' : 'bg-stone-50 text-stone-800 rounded-tl-none border border-stone-100')}>
                  {msg.role === 'assistant'
                    ? <TokenizedText text={msg.content} language={quizSettings.targetLanguage} enabled={wordTooltipEnabled} />
                    : msg.content}
                </div>

                {/* Feature 7: translation toggle on assistant messages */}
                {msg.role === 'assistant' && (
                  <button onClick={() => setRevealedTranslations(prev => { const s = new Set(prev); s.has(idx) ? s.delete(idx) : s.add(idx); return s; })}
                    className="flex items-center gap-1 text-[10px] font-bold text-stone-300 hover:text-indigo-500 transition-colors">
                    {revealedTranslations.has(idx) ? <EyeOff size={10} /> : <Eye size={10} />}
                    {revealedTranslations.has(idx) ? 'Hide translation' : 'Show translation'}
                  </button>
                )}
                {msg.role === 'assistant' && revealedTranslations.has(idx) && msg.translation && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
                    <p className="text-[11px] text-indigo-700">{msg.translation}</p>
                  </div>
                )}

                {/* Pronunciation score */}
                {msg.role === 'user' && idx === messages.length - 1 && lastPronScore !== null && (
                  <div className={cn('flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-xl',
                    lastPronScore >= 75 ? 'bg-emerald-50 text-emerald-600' : lastPronScore >= 50 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500')}>
                    <Mic size={10} />Pronunciation: {lastPronScore}%{lastPronScore >= 75 ? ' · Great!' : lastPronScore >= 50 ? ' · Keep practicing' : ' · Try again'}
                  </div>
                )}

                {/* Feature 4: tone tip on user messages */}
                {msg.role === 'user' && msg.toneTip && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 space-y-1">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Tone tip</p>
                    <p className="text-[11px] text-indigo-700">{msg.toneTip.tip}</p>
                    {msg.toneTip.alternative && <p className="text-[11px] font-bold text-indigo-800">Try: "{msg.toneTip.alternative}"</p>}
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div className="space-y-2 w-full">
                    <div className="flex items-center gap-3">
                      <button onClick={() => speakMessage(msg.content, idx)}
                        className={cn('flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors', isSpeakingId === idx ? 'text-emerald-500' : 'text-stone-300 hover:text-emerald-500')}>
                        <Volume2 size={11} className={isSpeakingId === idx ? 'animate-pulse' : ''} />{isSpeakingId === idx ? 'Speaking...' : 'Listen'}
                      </button>
                      <button onClick={() => {
                        const id = `phrase-${Date.now()}`;
                        const alreadySaved = savedPhrases.some(p => p.phrase === msg.content);
                        if (!alreadySaved) addSavedPhrase({ id, phrase: msg.content, translation: msg.translation || '', language: quizSettings.targetLanguage, date: new Date().toISOString() });
                      }}
                        title="Save phrase"
                        className={cn('flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest transition-colors',
                          savedPhrases.some(p => p.phrase === msg.content) ? 'text-violet-500' : 'text-stone-300 hover:text-violet-500')}>
                        <Pin size={10} />{savedPhrases.some(p => p.phrase === msg.content) ? 'Saved' : 'Save'}
                      </button>
                    </div>

                    {msg.correction && (
                      <div className="bg-amber-50 border border-amber-100 rounded-2xl overflow-hidden">
                        <button onClick={() => setExpandedCorrection(expandedCorrection === idx ? null : idx)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-amber-200 rounded-lg flex items-center justify-center"><AlertCircle size={11} className="text-amber-700" /></div>
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Grammar tip</span>
                          </div>
                          {expandedCorrection === idx ? <ChevronUp size={13} className="text-amber-400" /> : <ChevronDown size={13} className="text-amber-400" />}
                        </button>
                        <AnimatePresence>
                          {expandedCorrection === idx && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                              <div className="px-4 pb-3 space-y-2">
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="line-through text-red-400 font-medium">{msg.correction.original}</span>
                                  <span className="text-stone-300">→</span>
                                  <span className="text-emerald-600 font-bold">{msg.correction.corrected}</span>
                                </div>
                                <p className="text-[11px] text-amber-800 leading-relaxed">{msg.correction.explanation}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {msg.newWords && msg.newWords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.newWords.map((w, wi) => {
                          const added = addedWords.has(w.word) || flashcards.some((f: any) => f.word === w.word && f.language === quizSettings.targetLanguage);
                          return (
                            <button key={wi} onClick={() => addWordToFlashcards(w)}
                              className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all',
                                added ? 'bg-emerald-50 text-emerald-600 border-emerald-200 cursor-default' : 'bg-white text-stone-500 border-stone-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50')}>
                              {added ? <Check size={10} /> : <Plus size={10} />}
                              <span>{w.word}</span><span className="text-stone-300 font-normal">·</span>
                              <span className={added ? 'text-emerald-500' : 'text-stone-400'}>{w.translation}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0"><Bot size={16} className="text-emerald-600" /></div>
            <div className="bg-stone-50 px-4 py-3 rounded-2xl rounded-tl-none border border-stone-100 flex items-center gap-2">
              <Loader2 size={14} className="text-emerald-500 animate-spin" /><span className="text-xs text-stone-400">Thinking...</span>
            </div>
          </div>
        )}

        {chatError && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-red-600">
            <AlertCircle size={15} className="shrink-0" /><span className="flex-1">{chatError}</span>
            <button onClick={() => setChatError(null)} className="text-red-300 hover:text-red-500"><X size={14} /></button>
          </motion.div>
        )}
      </div>

      {/* Feature 4: suggested replies */}
      {suggestions.length > 0 && !isLoading && (
        <div className="px-5 py-2 border-t border-stone-50 flex gap-2 overflow-x-auto shrink-0 bg-stone-50/30">
          {suggestions.map(s => (
            <button key={s} onClick={() => handleSend(s)}
              className="shrink-0 px-3 py-1.5 bg-white border border-stone-100 rounded-xl text-[11px] font-medium text-stone-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors whitespace-nowrap">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Feature 10: speed mode timer bar */}
      {speedMode && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
        <div className="px-5 py-1.5 shrink-0 border-t border-stone-50">
          <div className="flex items-center gap-2">
            <Timer size={11} className={cn('shrink-0', timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-stone-400')} />
            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / 15) * 100}%`, background: timeLeft <= 5 ? '#ef4444' : timeLeft <= 10 ? '#f59e0b' : '#10b981' }} />
            </div>
            <span className={cn('text-[10px] font-bold tabular-nums', timeLeft <= 5 ? 'text-red-500' : 'text-stone-400')}>{timeLeft}s</span>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-5 py-4 bg-stone-50/50 border-t border-stone-100 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={toggleListen}
            className={cn('w-11 h-11 rounded-2xl flex items-center justify-center transition-all shrink-0',
              isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200' : 'bg-white text-stone-400 hover:text-emerald-500 border border-stone-100 shadow-sm')}>
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={isListening ? 'Listening...' : speedMode ? `Quick! Type in ${quizSettings.targetLanguage}...` : `Type in ${quizSettings.targetLanguage}...`}
            disabled={isListening}
            className="flex-1 bg-white border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all shadow-sm disabled:opacity-50" />
          <button onClick={() => handleSend()} disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 disabled:opacity-40 shrink-0">
            <Send size={18} />
          </button>
        </div>
        {isListening && <p className="text-center text-[10px] text-red-400 font-bold uppercase tracking-widest mt-2 animate-pulse">Listening — speak in {quizSettings.targetLanguage}</p>}
      </div>

      {/* Panels & Modals */}
      <AnimatePresence>
        {showHistory && <HistoryPanel sessions={chatSessions} onLoad={loadSession} onDelete={(id) => {
          removeChatSession(id);
          if (user) deleteChatSessionDB(id, user.id).catch(() => { });
        }} onNewChat={() => { startNewChat(); setShowHistory(false); }} onClose={() => setShowHistory(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {summaryData && <SummaryModal session={summaryData} onClose={() => setSummaryData(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showHeatmap && <HeatmapModal mistakes={sessionMistakes} onClose={() => setShowHeatmap(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCustomScenario && <CustomScenarioModal lang={quizSettings.targetLanguage} onApply={applyCustomScenario} onClose={() => setShowCustomScenario(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showQuizSetup && <QuizSetupModal onStart={handleVocabQuiz} onClose={() => setShowQuizSetup(false)} isLoading={isLoadingQuiz} />}
      </AnimatePresence>
      <AnimatePresence>
        {vocabQuizQuestions && <VocabQuizModal questions={vocabQuizQuestions} onClose={() => setVocabQuizQuestions(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showSavedPhrases && <SavedPhrasesModal phrases={savedPhrases} onRemove={removeSavedPhrase} onClose={() => setShowSavedPhrases(false)} onSpeak={(text, lang) => speakText(text, lang as any)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showVocabReview && <VocabReviewModal flashcards={flashcards} chatText={messages.map(m => m.content).join(' ')} onClose={() => setShowVocabReview(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {typingChallenge && <TypingChallengeModal challenge={typingChallenge} onChange={v => setTypingChallenge(prev => prev ? { ...prev, userInput: v } : null)} onCheck={checkTypingAnswer} onClose={() => setTypingChallenge(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showReplay && <ReplayModal messages={messages} replayIdx={replayIdx} isReplaying={isReplaying} onStop={() => { setIsReplaying(false); window.speechSynthesis.cancel(); }} onClose={() => { setShowReplay(false); setIsReplaying(false); window.speechSynthesis.cancel(); }} />}
      </AnimatePresence>
      <AnimatePresence>
        {showWeeklyReport && <WeeklyReportModal sessions={chatSessions} mistakeLog={mistakeLog} onClose={() => setShowWeeklyReport(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showScenarioCollection && (
          <ScenarioCollectionModal
            onSelect={s => {
              const scenario: Scenario = { id: s.id, label: s.label, description: s.description, icon: BookOpen, color: '#10b981', bg: 'rgba(16,185,129,0.08)', prompt: s.prompt };
              setShowScenarioCollection(false);
              startNewChat(scenario);
              setRoleReversed(false);
            }}
            onClose={() => setShowScenarioCollection(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatView;
