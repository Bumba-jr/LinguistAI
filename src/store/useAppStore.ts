import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuestionType = 'multiple_choice' | 'fill_in_the_blank' | 'pronunciation' | 'mixed';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Language = 'French' | 'Spanish' | 'German' | 'Italian' | 'Japanese' | 'Portuguese' | 'Chinese';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  correction?: { original: string; corrected: string; explanation: string } | null;
  newWords?: { word: string; translation: string }[];
}

export interface ChatSession {
  id: string;
  date: string;
  language: Language;
  scenarioId: string;
  scenarioLabel: string;
  messages: ChatMessage[];
  wordsLearned: number;
  correctionsCount: number;
}

export interface QuizResult {
  id: string;
  date: string;
  score: number;
  total: number;
  difficulty: Difficulty;
  language: Language;
}

export interface Flashcard {
  id: string;
  word: string;
  translation: string;
  language: Language;
  nextReview: string;
  lastReviewed: string | null;
  example?: string;
  hardCount?: number;
  easyStreak?: number;
  reviewHistory?: ('easy' | 'again' | 'hard')[];
}

export interface Question {
  id: string;
  question: string;
  translation?: string;
  type: QuestionType;
  options?: string[];
  answer: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface VocabularyItem {
  word: string;
  translations: string[];
  pronunciation?: string;
  phrase?: string[];
  register?: string;
  notes?: string;
  partOfSpeech?: string;
  conjugations?: { form: string; value: string }[];
}

export interface ExampleSentence {
  target: string;
  english: string;
}

export interface PracticeItem {
  instruction: string;
  question: string;
  answer: string;
}

export interface GrammarNote {
  rule: string;
  explanation: string;
  example: string;
}

export interface LectureSection {
  title: string;
  text: string;
  vocabulary: VocabularyItem[];
  examples: ExampleSentence[];
  practice: PracticeItem[];
  grammarNotes: GrammarNote[];
}

export interface Lecture {
  id: string;
  title: string;
  level: string;
  language: Language;
  sections: LectureSection[];
  pronunciation: { text: string }[];
}

interface User {
  id: string;
  email?: string;
  avatarUrl?: string;
  displayName?: string;
}

interface AppState {
  user: User | null;
  notes: string;
  extractedText: string;
  activeTab: 'editor' | 'upload' | 'lectures' | 'analytics' | 'flashcards' | 'chat' | 'rooms' | 'leaderboard' | 'grammar-drill' | 'story-mode' | 'exchange' | 'pronunciation';
  generationMode: 'quiz' | 'lecture';
  isGenerating: boolean;
  questions: Question[];
  lectures: Lecture | null;
  savedLectures: Lecture[];
  currentQuestionIndex: number;
  quizSettings: {
    count: number;
    type: QuestionType;
    difficulty: Difficulty;
    targetLanguage: Language;
  };
  quizHistory: QuizResult[];
  flashcards: Flashcard[];
  lectureProgress: Record<string, Set<number>>;
  lectureNotes: Record<string, string>;
  lectureQuizPassed: Record<string, Set<number>>;
  chatSessions: ChatSession[];
  difficultyScore: number;
  mistakeLog: { category: string; count: number; examples: { original: string; corrected: string; explanation: string }[] }[];
  grammarMode: 'strict' | 'fluency';
  savedPhrases: { id: string; phrase: string; translation: string; language: Language; date: string }[];
  weeklyStats: { sessionsThisWeek: number; wordsThisWeek: number; correctionsThisWeek: number; accuracyThisWeek: number };

  totalPoints: number;
  addPoints: (pts: number) => void;
  spendPoints: (pts: number) => void;
  setTotalPoints: (pts: number) => void;
  setUser: (user: User | null) => void;
  setNotes: (notes: string) => void;
  setExtractedText: (text: string) => void;
  setActiveTab: (tab: AppState['activeTab']) => void;
  setGenerationMode: (mode: 'quiz' | 'lecture') => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setQuestions: (questions: Question[]) => void;
  setLectures: (lectures: Lecture | null) => void;
  setSavedLectures: (lectures: Lecture[]) => void;
  addSavedLecture: (lecture: Lecture) => void;
  removeSavedLecture: (id: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  updateQuizSettings: (settings: Partial<AppState['quizSettings']>) => void;
  addQuizResult: (result: QuizResult) => void;
  setQuizHistory: (history: QuizResult[]) => void;
  addFlashcard: (card: Flashcard) => void;
  setFlashcards: (cards: Flashcard[]) => void;
  updateFlashcard: (id: string, updates: Partial<Flashcard>) => void;
  removeFlashcard: (id: string) => void;
  resetQuiz: () => void;
  markSectionComplete: (lectureId: string, sectionIdx: number) => void;
  setLectureNote: (lectureId: string, note: string) => void;
  markQuizPassed: (lectureId: string, sectionIdx: number) => void;
  setLectureProgress: (lectureId: string, completed: number[], passed: number[]) => void;
  saveChatSession: (session: ChatSession) => void;
  setChatSessions: (sessions: ChatSession[]) => void;
  removeChatSession: (id: string) => void;
  updateDifficultyScore: (delta: number) => void;
  logMistake: (category: string, example?: { original: string; corrected: string; explanation: string }) => void;
  setGrammarMode: (mode: 'strict' | 'fluency') => void;
  addSavedPhrase: (phrase: { id: string; phrase: string; translation: string; language: Language; date: string }) => void;
  removeSavedPhrase: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      notes: '',
      extractedText: '',
      activeTab: 'editor',
      generationMode: 'quiz',
      isGenerating: false,
      questions: [],
      lectures: null,
      savedLectures: [],
      currentQuestionIndex: 0,
      quizSettings: {
        count: 5,
        type: 'mixed',
        difficulty: 'beginner',
        targetLanguage: 'French',
      },
      quizHistory: [],
      flashcards: [],
      lectureProgress: {},
      lectureNotes: {},
      lectureQuizPassed: {},
      chatSessions: [],
      difficultyScore: 30,
      mistakeLog: [],
      grammarMode: 'strict',
      savedPhrases: [],
      weeklyStats: { sessionsThisWeek: 0, wordsThisWeek: 0, correctionsThisWeek: 0, accuracyThisWeek: 0 },
      totalPoints: 0,

      setUser: (user) => set({ user }),
      addPoints: (pts) => set((state) => ({ totalPoints: state.totalPoints + pts })),
      spendPoints: (pts) => set((state) => ({ totalPoints: Math.max(0, state.totalPoints - pts) })),
      setTotalPoints: (pts) => set({ totalPoints: pts }),
      setNotes: (notes) => set({ notes }),
      setExtractedText: (extractedText) => set({ extractedText }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setGenerationMode: (generationMode) => set({ generationMode }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setQuestions: (questions) => set({ questions }),
      setLectures: (lectures) => set({ lectures }),
      setSavedLectures: (savedLectures) => set({ savedLectures }),
      addSavedLecture: (lecture) => set((state) => ({
        savedLectures: state.savedLectures.some(l => l.id === lecture.id)
          ? state.savedLectures
          : [lecture, ...state.savedLectures],
      })),
      removeSavedLecture: (id) => set((state) => ({
        savedLectures: state.savedLectures.filter(l => l.id !== id),
      })),
      setCurrentQuestionIndex: (currentQuestionIndex) => set({ currentQuestionIndex }),
      updateQuizSettings: (settings) =>
        set((state) => ({ quizSettings: { ...state.quizSettings, ...settings } })),
      addQuizResult: (result) => set((state) => ({ quizHistory: [result, ...state.quizHistory] })),
      setQuizHistory: (quizHistory) => set({ quizHistory }),
      addFlashcard: (card) => set((state) => ({ flashcards: [...state.flashcards, card] })),
      setFlashcards: (flashcards) => set({ flashcards }),
      updateFlashcard: (id, updates) => set((state) => ({
        flashcards: state.flashcards.map(f => f.id === id ? { ...f, ...updates } : f),
      })),
      removeFlashcard: (id) => set((state) => ({
        flashcards: state.flashcards.filter(f => f.id !== id),
      })),
      resetQuiz: () => set({ questions: [], currentQuestionIndex: 0, isGenerating: false, lectures: null }),
      markSectionComplete: (lectureId, sectionIdx) => set((state) => {
        const prev = state.lectureProgress[lectureId] ? new Set(state.lectureProgress[lectureId]) : new Set<number>();
        prev.add(sectionIdx);
        return { lectureProgress: { ...state.lectureProgress, [lectureId]: prev } };
      }),
      setLectureNote: (lectureId, note) => set((state) => ({
        lectureNotes: { ...state.lectureNotes, [lectureId]: note },
      })),
      markQuizPassed: (lectureId, sectionIdx) => set((state) => {
        const prev = state.lectureQuizPassed[lectureId] ? new Set(state.lectureQuizPassed[lectureId]) : new Set<number>();
        prev.add(sectionIdx);
        return { lectureQuizPassed: { ...state.lectureQuizPassed, [lectureId]: prev } };
      }),
      setLectureProgress: (lectureId: string, completed: number[], passed: number[]) => set((state) => ({
        lectureProgress: { ...state.lectureProgress, [lectureId]: new Set(completed) },
        lectureQuizPassed: { ...state.lectureQuizPassed, [lectureId]: new Set(passed) },
      })),
      // upsert by id — never duplicates
      saveChatSession: (session) => set((state) => {
        const exists = state.chatSessions.findIndex(s => s.id === session.id);
        if (exists !== -1) {
          const updated = [...state.chatSessions];
          updated[exists] = session;
          return { chatSessions: updated };
        }
        return { chatSessions: [session, ...state.chatSessions].slice(0, 50) };
      }),
      setChatSessions: (sessions) => set({ chatSessions: sessions }),
      removeChatSession: (id) => set((state) => ({
        chatSessions: state.chatSessions.filter(s => s.id !== id),
      })),
      updateDifficultyScore: (delta) => set((state) => ({
        difficultyScore: Math.max(0, Math.min(100, state.difficultyScore + delta)),
      })),
      logMistake: (category, example) => set((state) => {
        const existing = state.mistakeLog.find(m => m.category === category);
        const newExample = example ? [example] : [];
        if (existing) {
          return {
            mistakeLog: state.mistakeLog.map(m => m.category === category
              ? { ...m, count: m.count + 1, examples: [...(m.examples || []), ...newExample].slice(-5) }
              : m)
          };
        }
        return { mistakeLog: [...state.mistakeLog, { category, count: 1, examples: newExample }] };
      }),
      setGrammarMode: (mode) => set({ grammarMode: mode }),
      addSavedPhrase: (phrase) => set((state) => ({
        savedPhrases: state.savedPhrases.some(p => p.id === phrase.id) ? state.savedPhrases : [phrase, ...state.savedPhrases].slice(0, 100),
      })),
      removeSavedPhrase: (id) => set((state) => ({ savedPhrases: state.savedPhrases.filter(p => p.id !== id) })),
    }),
    {
      name: 'linguistai-store',
      partialize: (state) => ({
        activeTab: state.activeTab,
        chatSessions: state.chatSessions,
        difficultyScore: state.difficultyScore,
        mistakeLog: state.mistakeLog,
        quizSettings: state.quizSettings,
        grammarMode: state.grammarMode,
        savedPhrases: state.savedPhrases,
        totalPoints: state.totalPoints,
      }),
      // migrate stale data — ensure mistakeLog entries always have examples array
      onRehydrateStorage: () => (state) => {
        if (state && state.mistakeLog) {
          state.mistakeLog = state.mistakeLog.map(m => ({
            ...m,
            examples: Array.isArray(m.examples) ? m.examples : [],
          }));
        }
      },
    }
  )
);
