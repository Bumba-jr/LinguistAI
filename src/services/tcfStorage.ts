// TCF Canada progress — persisted in localStorage (practice estimates only;
// never presented as official scores).
export interface TcfScoreEntry {
    date: string;
    pct: number;            // 0-100 practice result
    skill: 'listening' | 'reading' | 'writing' | 'speaking';
    label: string;          // e.g. "A2 voicemail exercise"
    nclc: string;           // estimated band label
    score: number;          // estimated 100-699
}

const SCORES_KEY = 'linguistai-tcf-scores';
const LESSONS_KEY = 'linguistai-tcf-lessons';
const TARGET_KEY = 'linguistai-tcf-target';

export const getTcfScores = (): TcfScoreEntry[] => {
    try {
        const v = JSON.parse(localStorage.getItem(SCORES_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch { return []; }
};

export const addTcfScore = (entry: Omit<TcfScoreEntry, 'date'>) => {
    try {
        const all = getTcfScores();
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

export const getNclcTarget = (): string => {
    try { return localStorage.getItem(TARGET_KEY) || '7'; } catch { return '7'; }
};

export const setNclcTarget = (t: string) => {
    try { localStorage.setItem(TARGET_KEY, t); } catch { /* quota */ }
};
