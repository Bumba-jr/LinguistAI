// Offline deck support — caches the deck in localStorage so it stays
// reviewable without network, and queues rating updates made offline to
// sync when the connection returns.

export interface QueuedReview {
  cardId: string;
  nextReview: string;
  lastReviewed: string;
  hardCount: number;
  easyStreak: number;
  reviewHistory: ('easy' | 'again' | 'hard')[];
}

const deckKey = (userId: string) => `linguistai-deck-cache-${userId}`;
const queueKey = (userId: string) => `linguistai-review-queue-${userId}`;

export const saveDeckCache = (userId: string, cards: unknown) => {
  try { localStorage.setItem(deckKey(userId), JSON.stringify(cards)); } catch { /* quota — ignore */ }
};

export const loadDeckCache = (userId: string): any[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(deckKey(userId)) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
};

/** Queue a rating for later sync (deduped per card — latest wins). */
export const queueReview = (userId: string, review: QueuedReview) => {
  try {
    const q: QueuedReview[] = JSON.parse(localStorage.getItem(queueKey(userId)) || '[]');
    const i = q.findIndex(r => r.cardId === review.cardId);
    if (i !== -1) q[i] = review;
    else q.push(review);
    localStorage.setItem(queueKey(userId), JSON.stringify(q));
  } catch { /* quota — ignore */ }
};

export const pendingReviewCount = (userId: string): number => {
  try {
    const q = JSON.parse(localStorage.getItem(queueKey(userId)) || '[]');
    return Array.isArray(q) ? q.length : 0;
  } catch { return 0; }
};

/** Push all queued ratings to Supabase. Returns how many synced. */
export const flushReviewQueue = async (userId: string): Promise<number> => {
  let q: QueuedReview[] = [];
  try { q = JSON.parse(localStorage.getItem(queueKey(userId)) || '[]'); } catch { return 0; }
  if (!Array.isArray(q) || q.length === 0) return 0;

  const db = await import('./dbService');
  const remaining: QueuedReview[] = [];
  let synced = 0;
  for (const r of q) {
    try {
      await db.updateFlashcardReview(r.cardId, userId, r.nextReview, r.lastReviewed, r.hardCount, r.easyStreak, r.reviewHistory);
      synced++;
    } catch {
      remaining.push(r); // keep for the next flush
    }
  }
  try {
    if (remaining.length > 0) localStorage.setItem(queueKey(userId), JSON.stringify(remaining));
    else localStorage.removeItem(queueKey(userId));
  } catch { /* quota — ignore */ }
  return synced;
};
