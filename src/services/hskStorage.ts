// HSK progress — persisted in localStorage (practice estimates only;
// never presented as official scores). Mirrors tcfStorage.
import type { HskLevel } from './hskService';

export interface HskScoreEntry {
    date: string;
    pct: number;            // 0-100 practice result
    skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'tones';
    label: string;          // e.g. "HSK 3 listening: delivery call"
    band: string;           // estimated verdict label
    score: number;          // estimated section score (out of level total)
}

const SCORES_KEY = 'linguistai-hsk-scores';
const LESSONS_KEY = 'linguistai-hsk-lessons';
const TARGET_KEY = 'linguistai-hsk-target';

export const getHskScores = (): HskScoreEntry[] => {
    try {
        const v = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const addHskScore = (entry: Omit<HskScoreEntry, 'date'>) => {
    try {
        const all = getHskScores();
        all.unshift({ ...entry, date: new Date().toISOString() });
        localStorage.setItem(SCORES_KEY, JSON.stringify(all.slice(0, 100)));
    } catch { /* quota */ }
};

export const getCompletedLessons = (): string[] => {
    try {
        const v = JSON.parse(localStorage.getItem(LESSONS_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const markLessonComplete = (key: string) => {
    try {
        const done = new Set(getCompletedLessons());
        done.add(key);
        localStorage.setItem(LESSONS_KEY, JSON.stringify([...done]));
    } catch { /* quota */ }
};

export const getHskTarget = (): HskLevel => {
    try { return (localStorage.getItem(TARGET_KEY) || '3') as HskLevel; } catch { return '3'; }
};

export const setHskTarget = (t: HskLevel) => {
    try { localStorage.setItem(TARGET_KEY, t); } catch { /* quota */ }
};

// ── weakness log — questions missed in trainers ──────────────────────────────
export interface HskWeakEntry {
    date: string;
    skill: 'listening' | 'reading' | 'tones';
    level: string;
    question: string;
    chosen: string;
    answer: string;
}

const WEAK_KEY = 'linguistai-hsk-weak';

export const getWeakLog = (): HskWeakEntry[] => {
    try {
        const v = JSON.parse(localStorage.getItem(WEAK_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const logWeakness = (entry: Omit<HskWeakEntry, 'date'>) => {
    try {
        const all = getWeakLog();
        all.unshift({ ...entry, date: new Date().toISOString() });
        localStorage.setItem(WEAK_KEY, JSON.stringify(all.slice(0, 80)));
    } catch { /* quota */ }
};

// ── last curriculum position (resume) ────────────────────────────────────────
const LAST_LESSON_KEY = 'linguistai-hsk-last-lesson';

export const setLastLesson = (level: string, slug: string, title: string) => {
    try { localStorage.setItem(LAST_LESSON_KEY, JSON.stringify({ level, slug, title, date: new Date().toISOString() })); } catch { /* quota */ }
};

export const getLastLesson = (): { level: string; slug: string; title: string; date: string } | null => {
    try {
        const v = JSON.parse(localStorage.getItem(LAST_LESSON_KEY) || 'null');
        return v && v.level ? v : null;
    } catch { return null; }
};

// ── lesson cache — instant, consistent reopening of generated lessons ────────
const lessonCacheKey = (key: string) => `linguistai-hsk-lesson-${key}`;

export const cacheLesson = (key: string, lesson: unknown) => {
    try { localStorage.setItem(lessonCacheKey(key), JSON.stringify(lesson)); } catch { /* quota */ }
};

export const getCachedLesson = <T>(key: string): T | null => {
    try {
        const v = localStorage.getItem(lessonCacheKey(key));
        return v ? (JSON.parse(v) as T) : null;
    } catch { return null; }
};

// ── mock exam history ────────────────────────────────────────────────────────
export interface HskMockResult {
    date: string;
    listening: { pct: number; score: number };
    reading: { pct: number; score: number };
    writing: { pct: number; score: number } | null;  // null for HSK 1-2 (no writing section)
    speaking: { level: string; score100: number };
    total: { score: number; max: number; verdict: string };
    weakest: string;
}

const MOCKS_KEY = 'linguistai-hsk-mocks';

export const getMocks = (): HskMockResult[] => {
    try {
        const v = JSON.parse(localStorage.getItem(MOCKS_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const saveMock = (r: HskMockResult) => {
    try {
        const all = getMocks();
        all.unshift(r);
        localStorage.setItem(MOCKS_KEY, JSON.stringify(all.slice(0, 20)));
    } catch { /* quota */ }
};
