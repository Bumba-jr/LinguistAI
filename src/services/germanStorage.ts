import { portalStorage } from './portalProgress';
// GOETHE practice progress — persisted in localStorage (practice estimates only;
// never presented as official scores). Mirror of spanishStorage.ts.
export interface GoetheScoreEntry {
    date: string;
    pct: number;            // 0-100 practice result
    skill: 'listening' | 'reading' | 'writing' | 'speaking';
    label: string;          // e.g. "B1 reading: Der Aushang"
    score: number;          // estimated 0-100
}

const SCORES_KEY = 'linguistai-goethe-scores';
const LESSONS_KEY = 'linguistai-goethe-lessons';
const CHECKPOINTS_KEY = 'linguistai-goethe-checkpoints';
const TARGET_KEY = 'linguistai-goethe-target';
const LAST_LESSON_KEY = 'linguistai-goethe-last-lesson';

export const getGoetheTarget = (): string => {
    try { return portalStorage.getItem(TARGET_KEY) || 'B1'; } catch { return 'B1'; }
};

export const setGoetheTarget = (t: string) => {
    try { portalStorage.setItem(TARGET_KEY, t); } catch { /* quota */ }
};

export const setLastLesson = (level: string, slug: string, title: string) => {
    try { portalStorage.setItem(LAST_LESSON_KEY, JSON.stringify({ level, slug, title, date: new Date().toISOString() })); } catch { /* quota */ }
};

export const getLastLesson = (): { level: string; slug: string; title: string; date: string } | null => {
    try {
        const v = JSON.parse(portalStorage.getItem(LAST_LESSON_KEY) || 'null');
        return v && v.level ? v : null;
    } catch { return null; }
};

export const getGoetheScores = (): GoetheScoreEntry[] => {
    try {
        const v = JSON.parse(portalStorage.getItem(SCORES_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const addGoetheScore = (entry: Omit<GoetheScoreEntry, 'date'>) => {
    try {
        const all = getGoetheScores();
        all.unshift({ ...entry, date: new Date().toISOString() });
        portalStorage.setItem(SCORES_KEY, JSON.stringify(all.slice(0, 100)));
    } catch { /* quota */ }
};

// ── weakness log — questions missed in trainers (drill again later) ──────────
export interface GoetheWeakEntry {
    date: string;
    skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocab';
    level: string;
    question: string;
    chosen: string;
    answer: string;
}

const WEAK_KEY = 'linguistai-goethe-weak';

export const getWeakLog = (): GoetheWeakEntry[] => {
    try {
        const v = JSON.parse(portalStorage.getItem(WEAK_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const logWeakness = (entry: Omit<GoetheWeakEntry, 'date'>) => {
    try {
        const all = getWeakLog();
        all.unshift({ ...entry, date: new Date().toISOString() });
        portalStorage.setItem(WEAK_KEY, JSON.stringify(all.slice(0, 100)));
    } catch { /* quota */ }
};

export const getCompletedLessons = (): string[] => {
    try {
        const v = JSON.parse(portalStorage.getItem(LESSONS_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const markLessonComplete = (key: string) => {
    try {
        const done = new Set(getCompletedLessons());
        done.add(key);
        portalStorage.setItem(LESSONS_KEY, JSON.stringify([...done]));
    } catch { /* quota */ }
};

// ── lesson cache — instant, consistent reopening of generated lessons ────────
const lessonCacheKey = (key: string) => `linguistai-goethe-lesson-${key}`;

export const cacheLesson = (key: string, lesson: unknown) => {
    try { portalStorage.setItem(lessonCacheKey(key), JSON.stringify(lesson)); } catch { /* quota */ }
};

export const getCachedLesson = <T>(key: string): T | null => {
    try {
        const v = portalStorage.getItem(lessonCacheKey(key));
        return v ? (JSON.parse(v) as T) : null;
    } catch { return null; }
};

// ── mock exam history ────────────────────────────────────────────────────────
export interface GoetheMockResult {
    date: string;
    reading: number;      // % (group A)
    listening: number;    // % (group A)
    writing: number;      // % (group B)
    speaking: number;     // % (group B)
    passed: boolean;      // simulated: ≥60% in BOTH groups
    weakest: string;
}

const MOCKS_KEY = 'linguistai-goethe-mocks';

export const getMocks = (): GoetheMockResult[] => {
    try {
        const v = JSON.parse(portalStorage.getItem(MOCKS_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const saveMock = (r: GoetheMockResult) => {
    try {
        const all = getMocks();
        all.unshift(r);
        portalStorage.setItem(MOCKS_KEY, JSON.stringify(all.slice(0, 20)));
    } catch { /* quota */ }
};

// ── level checkpoints — never auto-promote: pass the test to unlock the next level
export const getCheckpoints = (): Record<string, boolean> => {
    try {
        const v = JSON.parse(portalStorage.getItem(CHECKPOINTS_KEY) || '{}');
        return v && typeof v === 'object' ? v : {};
    } catch { return {}; }
};

export const passCheckpoint = (level: string) => {
    try {
        const all = getCheckpoints();
        all[level] = true;
        portalStorage.setItem(CHECKPOINTS_KEY, JSON.stringify(all));
    } catch { /* quota */ }
};

// ── study plan (set an exam date → AI plan + countdown) ──────────────────────
export interface GoetheStudyPlan {
    examDate: string;
    level: string;
    summary: string;
    dailyTargets: string[];
    weeks: { week: number; focus: string; tasks: string[] }[];
}

const PLAN_KEY = 'linguistai-goethe-plan';

export const getPlan = (): GoetheStudyPlan | null => {
    try {
        const v = JSON.parse(portalStorage.getItem(PLAN_KEY) || 'null');
        return v && v.examDate ? v : null;
    } catch { return null; }
};

export const savePlan = (p: GoetheStudyPlan) => {
    try { portalStorage.setItem(PLAN_KEY, JSON.stringify(p)); } catch { /* quota */ }
};

export const clearPlan = () => {
    try { portalStorage.removeItem(PLAN_KEY); } catch { /* quota */ }
};
