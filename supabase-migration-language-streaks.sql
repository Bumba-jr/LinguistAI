-- TCF/multi-language: one streak row per user per language.
-- Run this in Supabase Dashboard → SQL Editor, then the app can sync
-- per-language streaks to Supabase (upgrade streakService to call
-- upsertUserStats(userId, lang, stats) once this is applied).

ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'French';

-- one row per user+language
ALTER TABLE user_stats DROP CONSTRAINT IF EXISTS user_stats_pkey;
ALTER TABLE user_stats ADD PRIMARY KEY (user_id, language);

-- keep existing per-user rows working for RLS policies (none change)
