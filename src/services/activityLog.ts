// Daily study-activity log (localStorage) — powers the study heatmap.
// History starts accumulating from the day this ships forward.
const KEY = 'linguistai-activity-log';

export const logActivity = (count = 1) => {
  try {
    const log = JSON.parse(localStorage.getItem(KEY) || '{}');
    const today = new Date().toDateString();
    log[today] = (log[today] || 0) + count;
    localStorage.setItem(KEY, JSON.stringify(log));
  } catch { /* quota — ignore */ }
};

export const getActivityLog = (): Record<string, number> => {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
};
