import { supabase } from '../lib/supabase';

type PortalId = 'tcf' | 'goethe' | 'dele' | 'cils' | 'caple' | 'jlpt' | 'hsk';
type PortalProgressRow = { portal_id: PortalId; storage_key: string; value: unknown; updated_at: string };

let activeUserId: string | null = null;
const keyPrefix = (userId: string | null) => `linguistai-progress:${userId ?? 'guest'}:`;
const localKey = (userId: string | null, key: string) => `${keyPrefix(userId)}${key}`;
const updatedKey = (scopedKey: string) => `${scopedKey}:updated_at`;

const portalForKey = (key: string): PortalId | null => {
  const prefix = /^linguistai-(tcf|goethe|dele|cils|caple|jlpt|hsk)(?:-|$)/.exec(key)?.[1];
  return (prefix as PortalId | undefined) ?? null;
};

const saveRemote = (userId: string, portal: PortalId, key: string, rawValue: string, updatedAt: string) => {
  // Auth can change while a cloud fetch is in flight. Keep every write tied to
  // the account that supplied the data; the RPC verifies this again server-side.
  if (activeUserId !== userId) return;
  // Keep very large generated lessons on this device; smaller progress and
  // cached lessons sync between signed-in devices.
  if (rawValue.length > 250_000) return;
  void supabase.rpc('save_portal_progress', {
    p_user_id: userId,
    p_portal_id: portal,
    p_storage_key: key,
    // Store the exact localStorage text as a JSON string so JSON-encoded
    // strings and plain target-level values both round-trip without ambiguity.
    p_value: rawValue,
    p_updated_at: updatedAt,
  }).then(({ error }) => {
    if (error) console.warn('[portalProgress] Cloud sync unavailable:', error.message);
  });
};

export const setPortalProgressUserId = (userId: string | null) => {
  activeUserId = userId;
  if (userId) {
    try {
      // Existing unscoped progress can be claimed by the first account that
      // uses this version. Preserve that owner marker across later sign-ins.
      if (!localStorage.getItem('linguistai-last-user')) {
        localStorage.setItem('linguistai-last-user', userId);
      }
    } catch { /* local storage can be unavailable */ }
  }
};

export const portalStorage = {
  getItem(key: string): string | null {
    try {
      const scoped = localKey(activeUserId, key);
      const saved = localStorage.getItem(scoped);
      if (saved !== null) return saved;

      // Migrate old unscoped data only for the same account that was active
      // when the app last recorded a signed-in user.
      if (activeUserId && localStorage.getItem('linguistai-last-user') === activeUserId) {
        const legacy = localStorage.getItem(key);
        if (legacy !== null) {
          const timestamp = new Date().toISOString();
          localStorage.setItem(scoped, legacy);
          localStorage.setItem(updatedKey(scoped), String(Date.now()));
          const portal = portalForKey(key);
          if (portal) saveRemote(activeUserId, portal, key, legacy, timestamp);
          return legacy;
        }
      }
      return null;
    } catch { return null; }
  },

  setItem(key: string, value: string) {
    try {
      const scoped = localKey(activeUserId, key);
      localStorage.setItem(scoped, value);
      const now = new Date();
      localStorage.setItem(updatedKey(scoped), String(now.getTime()));
      const portal = portalForKey(key);
      if (activeUserId && portal) saveRemote(activeUserId, portal, key, value, now.toISOString());
    } catch { /* Browser storage can be unavailable or full. */ }
  },

  removeItem(key: string) {
    try {
      const scoped = localKey(activeUserId, key);
      localStorage.removeItem(scoped);
      localStorage.removeItem(updatedKey(scoped));
      const portal = portalForKey(key);
      if (activeUserId && portal) {
        void supabase.from('portal_progress').delete()
          .eq('user_id', activeUserId).eq('portal_id', portal).eq('storage_key', key)
          .then(({ error }) => { if (error) console.warn('[portalProgress] Cloud delete unavailable:', error.message); });
      }
    } catch { /* Browser storage can be unavailable. */ }
  },
};

export const hydratePortalProgress = async (userId: string): Promise<void> => {
  setPortalProgressUserId(userId);
  try {
    const { data, error } = await supabase.from('portal_progress')
      .select('portal_id, storage_key, value, updated_at')
      .eq('user_id', userId);
    if (error) throw error;

    for (const row of (data ?? []) as PortalProgressRow[]) {
      if (activeUserId !== userId) return;
      const scoped = localKey(userId, row.storage_key);
      const localValue = localStorage.getItem(scoped);
      const localUpdated = Number(localStorage.getItem(updatedKey(scoped)) ?? 0);
      const remoteUpdated = new Date(row.updated_at).getTime();
      if (localValue === null || remoteUpdated > localUpdated) {
        localStorage.setItem(scoped, typeof row.value === 'string' ? row.value : JSON.stringify(row.value));
        localStorage.setItem(updatedKey(scoped), String(remoteUpdated));
      } else if (portalForKey(row.storage_key)) {
        saveRemote(userId, row.portal_id, row.storage_key, localValue, new Date(localUpdated).toISOString());
      }
    }
  } catch (error) {
    // Offline use remains available from this device even if cloud sync or the
    // upgrade migration has not been applied yet.
    console.warn('[portalProgress] Could not hydrate cloud progress:', error instanceof Error ? error.message : error);
  }
};
