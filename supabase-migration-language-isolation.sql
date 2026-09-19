-- ============================================================
-- LINGUISTAI — MULTI-LANGUAGE DATA ISOLATION MIGRATION
-- Run once in Supabase Dashboard → SQL Editor.
-- After this, every learning record is stored per-language and the
-- app filters by the user's active language.
-- ============================================================

-- 1. Quiz results: tag each result with its language
ALTER TABLE quiz_results ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'French';
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_lang ON quiz_results (user_id, language);

-- 2. User stats: one streak/daily-goal row per user per language
ALTER TABLE user_stats ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'French';
ALTER TABLE user_stats DROP CONSTRAINT IF EXISTS user_stats_pkey;
ALTER TABLE user_stats ADD PRIMARY KEY (user_id, language);
CREATE INDEX IF NOT EXISTS idx_user_stats_lang ON user_stats (user_id, language);

-- 3. Flashcards: index for fast per-language deck loading
CREATE INDEX IF NOT EXISTS idx_flashcards_user_lang ON flashcards (user_id, language);

-- 4. Saved lectures: index for per-language library
CREATE INDEX IF NOT EXISTS idx_saved_lectures_user_lang ON saved_lectures (user_id, language);

-- 5. Chat sessions: index for per-language history
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_lang ON chat_sessions (user_id, language);

-- Done. The app filters by the active language automatically once
-- these columns exist.
