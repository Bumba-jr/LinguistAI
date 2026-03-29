// Browser push notifications for flashcard review reminders

export const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
};

export const scheduleFlashcardReminder = (dueCount: number, delayMs = 0) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    if (dueCount === 0) return;

    setTimeout(() => {
        const n = new Notification('LinguistAI — Cards due for review', {
            body: `You have ${dueCount} flashcard${dueCount !== 1 ? 's' : ''} due for review. Keep your streak going!`,
            icon: '/manifest.json',
            badge: '/manifest.json',
            tag: 'flashcard-reminder',
        });
        n.onclick = () => { window.focus(); n.close(); };
    }, delayMs);
};

export const scheduleDailyReminder = (hour = 9) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const now = new Date();
    const next = new Date();
    next.setHours(hour, 0, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    const delay = next.getTime() - now.getTime();
    setTimeout(() => {
        new Notification('LinguistAI — Daily practice reminder', {
            body: 'Time for your daily language practice! Keep your streak alive.',
            tag: 'daily-reminder',
        });
        scheduleDailyReminder(hour); // reschedule for next day
    }, delay);
};
