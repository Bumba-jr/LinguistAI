// Per-language streaks & daily goals — stored locally so each language
// keeps its own habit chain (practicing French doesn't feed the Spanish
// streak). Sync to Supabase per-language is a follow-up once the
// user_stats.language column migration is run.
import type { Language } from '../store/useAppStore';

export interface LangStreak {
    streak: number;
    streakLastDate: string;   // toDateString of last practice day
    dailyGoal: number;
    dailyDate: string;
    dailyCount: number;
}

const key = (lang: string) => `linguistai-streak-${lang}`;

const DEFAULTS = (goal = 20): LangStreak => ({
    streak: 0, streakLastDate: '', dailyGoal: goal, dailyDate: '', dailyCount: 0,
});

export const getStreak = (lang: string): LangStreak => {
    try {
        const raw = JSON.parse(localStorage.getItem(key(lang)) || 'null');
        if (!raw || typeof raw !== 'object') return DEFAULTS();
        return { ...DEFAULTS(raw.dailyGoal), ...raw };
    } catch { return DEFAULTS(); }
};

export const setDailyGoal = (lang: string, goal: number) => {
    const s = getStreak(lang);
    s.dailyGoal = goal;
    try { localStorage.setItem(key(lang), JSON.stringify(s)); } catch { /* quota */ }
    return s;
};

const calendarDate = (offsetDays = 0) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offsetDays);
    return d.toDateString();
};

/** Record one review. Returns the updated streak state. */
export const bumpStreak = (lang: string, goal = 20): LangStreak => {
    const s = getStreak(lang);
    const today = calendarDate(0);
    const yesterday = calendarDate(-1);
    s.streak = s.streakLastDate === today ? s.streak
        : s.streakLastDate === yesterday ? s.streak + 1 : 1;
    s.dailyCount = s.dailyDate === today ? s.dailyCount + 1 : 1;
    s.dailyDate = today;
    s.dailyGoal = goal;
    try { localStorage.setItem(key(lang), JSON.stringify(s)); } catch { /* quota */ }
    return s;
};

export const getGoal = (lang: string): number => getStreak(lang).dailyGoal;
