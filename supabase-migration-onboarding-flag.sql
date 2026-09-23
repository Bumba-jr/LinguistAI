-- ============================================================
-- LINGUISTAI — CROSS-DEVICE ONBOARDING FLAG
-- Run once in Supabase Dashboard → SQL Editor.
-- Once applied, the app reads and writes the onboarding flag on
-- user_preferences, so a returning user who signs in on a new
-- device skips the onboarding wizard. localStorage stays as the
-- fast path only.
-- ============================================================

ALTER TABLE user_preferences ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- Done. The app self-heals: users who already onboarded on their main
-- device get the flag backfilled to Supabase on their next visit, and
-- any later login on another device is recognized as a returning user.
