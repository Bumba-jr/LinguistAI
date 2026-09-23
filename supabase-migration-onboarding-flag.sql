-- ============================================================
-- LINGUISTAI — CROSS-DEVICE ONBOARDING FLAG (+ user_preferences table)
-- Run once in Supabase Dashboard → SQL Editor. Fully idempotent —
-- safe to run whether or not the table already exists.
--
-- Once applied, the app reads and writes the onboarding flag on
-- user_preferences, so a returning user who signs in on a new
-- device skips the onboarding wizard. localStorage stays as the
-- fast path only. This also repairs the quick-reactions feature,
-- which silently no-ops without this table.
-- ============================================================

-- 1. The table itself (it never existed — the app referenced it, but no
--    migration ever created it)
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  quick_reactions jsonb,
  onboarding_completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- 2. If some older partial version of the table exists, fill in whatever's missing
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS quick_reactions jsonb;
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;
ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 3. Row Level Security: a signed-in user can only read/write their own row
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_preferences own row select" ON user_preferences;
CREATE POLICY "user_preferences own row select" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_preferences own row write" ON user_preferences;
CREATE POLICY "user_preferences own row write" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "user_preferences own row update" ON user_preferences;
CREATE POLICY "user_preferences own row update" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Done. The app self-heals: users who already onboarded on their main
-- device get the flag backfilled to Supabase on their next visit, and
-- any later login on another device is recognized as a returning user.
