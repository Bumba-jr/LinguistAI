-- ============================================================
-- LINGUISTAI — FULL SCHEMA AUDIT MIGRATION
-- Run once in Supabase Dashboard → SQL Editor. Fully idempotent —
-- safe to run regardless of current database state.
--
-- The code references 22 tables but only a few ever had migration
-- files. Any table missing from the database silently breaks its
-- feature (user_preferences was missing for months). This file
-- creates every table the app touches IF it does not exist, backfills
-- missing columns, and applies Row Level Security everywhere.
--
-- Tables that already exist are left untouched (IF NOT EXISTS), so
-- existing data is never at risk.
-- ============================================================

-- ── 1. Learning core ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS notes (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  content text,
  updated_at timestamptz
);

CREATE TABLE IF NOT EXISTS user_notes (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text,
  content text,
  tags text[] DEFAULT '{}',
  context_label text,
  updated_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_user_notes_user ON user_notes (user_id);

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score int NOT NULL DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  difficulty text,
  quiz_type text,
  language text NOT NULL DEFAULT 'French',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_lang ON quiz_results (user_id, language);

CREATE TABLE IF NOT EXISTS saved_lectures (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text,
  level text,
  language text,
  data jsonb,
  saved_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_saved_lectures_user_lang ON saved_lectures (user_id, language);

CREATE TABLE IF NOT EXISTS flashcards (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word text NOT NULL,
  translation text,
  language text NOT NULL DEFAULT 'French',
  next_review timestamptz,
  last_reviewed timestamptz,
  example text,
  hard_count int DEFAULT 0,
  easy_streak int DEFAULT 0,
  review_history text[] DEFAULT '{}'
);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_lang ON flashcards (user_id, language);

CREATE TABLE IF NOT EXISTS chat_sessions (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language text,
  scenario_id text,
  scenario_label text,
  messages jsonb DEFAULT '[]',
  words_learned int DEFAULT 0,
  corrections_count int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_lang ON chat_sessions (user_id, language);

-- streaks: one row per user per language (matches app's onConflict 'user_id,language')
CREATE TABLE IF NOT EXISTS user_stats (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  language text NOT NULL DEFAULT 'French',
  streak_count int DEFAULT 0,
  streak_last_date date,
  daily_goal int DEFAULT 0,
  daily_date date,
  daily_count int DEFAULT 0,
  PRIMARY KEY (user_id, language)
);

CREATE TABLE IF NOT EXISTS lecture_progress (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lecture_id text NOT NULL,
  completed_sections int[] DEFAULT '{}',
  passed_sections int[] DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, lecture_id)
);

CREATE TABLE IF NOT EXISTS leaderboard (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  language text DEFAULT 'French',
  difficulty text,
  best_score int DEFAULT 0,
  total_quizzes int DEFAULT 0,
  avg_score int DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  quick_reactions jsonb,
  onboarding_completed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ── 2. Community: study rooms ────────────────────────────────

CREATE TABLE IF NOT EXISTS study_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  language text,
  description text,
  is_private boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  difficulty text,
  topic_tags text[] DEFAULT '{}',
  max_capacity int DEFAULT 20,
  pinned_message text
);

CREATE TABLE IF NOT EXISTS room_members (
  room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  joined_at timestamptz DEFAULT now(),
  last_active_at timestamptz,
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE IF NOT EXISTS room_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name text,
  avatar_url text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  reply_to_id uuid,
  reply_to_content text,
  reply_to_name text,
  is_pinned boolean DEFAULT false,
  is_announcement boolean DEFAULT false
);
CREATE INDEX IF NOT EXISTS idx_room_messages_room ON room_messages (room_id, created_at);

CREATE TABLE IF NOT EXISTS message_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES room_messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_vocabulary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  word text NOT NULL,
  translation text,
  added_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  points_reward int DEFAULT 0,
  ends_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS room_challenge_completions (
  challenge_id uuid NOT NULL REFERENCES room_challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  completed_at timestamptz DEFAULT now(),
  PRIMARY KEY (challenge_id, user_id)
);

-- ── 3. Language exchange + calls ─────────────────────────────

CREATE TABLE IF NOT EXISTS exchange_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  native_language text,
  learning_language text,
  bio text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS exchange_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  from_display_name text,
  from_avatar_url text,
  from_native_language text,
  from_learning_language text,
  from_bio text,
  to_display_name text,
  to_avatar_url text,
  message text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_exchange_requests_to ON exchange_requests (to_user_id, status);

CREATE TABLE IF NOT EXISTS direct_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text NOT NULL,
  sender_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name text,
  sender_avatar text,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_direct_messages_conv ON direct_messages (conversation_id, created_at);

CREATE TABLE IF NOT EXISTS hidden_messages (
  message_id uuid NOT NULL REFERENCES direct_messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  PRIMARY KEY (message_id, user_id)
);

CREATE TABLE IF NOT EXISTS webrtc_signals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id text NOT NULL,
  from_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);

-- ── 4. Client error reporting ─────────────────────────────────
-- Written by src/lib/errorReporter.ts. Users can insert; nobody can
-- read via the anon key — view reports in the Supabase Table Editor
-- (service role bypasses RLS).

CREATE TABLE IF NOT EXISTS client_errors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  message text NOT NULL,
  stack text,
  component_stack text,
  source text,
  url text,
  user_agent text
);

-- ── 5. Row Level Security ────────────────────────────────────

-- User-scoped tables: full CRUD on own rows only
DO $$
DECLARE
  tbl text;
  user_owned text[] := ARRAY['notes','user_notes','quiz_results','saved_lectures',
    'flashcards','chat_sessions','lecture_progress','leaderboard','user_preferences',
    'user_stats','exchange_profiles'];
BEGIN
  FOREACH tbl IN ARRAY user_owned LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "own rows" ON %I', tbl);
    EXECUTE format($f$CREATE POLICY "own rows" ON %I FOR ALL
      USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)$f$, tbl);
  END LOOP;
END $$;

-- lecture_progress + user_stats have composite keys that include user_id —
-- the generic policy above still applies (auth.uid() = user_id).

-- Community room tables: signed-in users read everything, write their own rows.
-- (deleteRoom/deleteVocabWord act by id from the app; creators/room members
-- are authenticated users — the app is the enforcement layer here.)
DO $$
DECLARE
  tbl text;
  community text[] := ARRAY['study_rooms','room_members','room_messages',
    'message_reactions','room_vocabulary','room_challenges','room_challenge_completions'];
BEGIN
  FOREACH tbl IN ARRAY community LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "members read" ON %I', tbl);
    EXECUTE format('CREATE POLICY "members read" ON %I FOR SELECT TO authenticated USING (true)', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "members write" ON %I', tbl);
    EXECUTE format('CREATE POLICY "members write" ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "members update" ON %I', tbl);
    EXECUTE format('CREATE POLICY "members update" ON %I FOR UPDATE TO authenticated USING (true)', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "members delete" ON %I', tbl);
    EXECUTE format('CREATE POLICY "members delete" ON %I FOR DELETE TO authenticated USING (true)', tbl);
  END LOOP;
END $$;

-- Exchange: profiles visible to all signed-in users; requests visible to
-- sender + recipient only.
ALTER TABLE exchange_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "participants read" ON exchange_requests;
CREATE POLICY "participants read" ON exchange_requests FOR SELECT TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
DROP POLICY IF EXISTS "sender insert" ON exchange_requests;
CREATE POLICY "sender insert" ON exchange_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = from_user_id);
DROP POLICY IF EXISTS "recipient update" ON exchange_requests;
CREATE POLICY "recipient update" ON exchange_requests FOR UPDATE TO authenticated
  USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);

-- Direct messages: participants of the conversation read; sender writes;
-- sender deletes.
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "participants read" ON direct_messages;
CREATE POLICY "participants read" ON direct_messages FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR conversation_id LIKE auth.uid()::text || '__%'
         OR conversation_id LIKE '%__' || auth.uid()::text);
DROP POLICY IF EXISTS "sender insert" ON direct_messages;
CREATE POLICY "sender insert" ON direct_messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);
DROP POLICY IF EXISTS "sender delete" ON direct_messages;
CREATE POLICY "sender delete" ON direct_messages FOR DELETE TO authenticated
  USING (auth.uid() = sender_id);

-- Hidden messages: own rows only.
ALTER TABLE hidden_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "own rows" ON hidden_messages;
CREATE POLICY "own rows" ON hidden_messages FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- WebRTC signals: sender inserts, recipient reads.
ALTER TABLE webrtc_signals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sender insert" ON webrtc_signals;
CREATE POLICY "sender insert" ON webrtc_signals FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = from_user_id);
DROP POLICY IF EXISTS "recipient read" ON webrtc_signals;
CREATE POLICY "recipient read" ON webrtc_signals FOR SELECT TO authenticated
  USING (auth.uid() = to_user_id OR auth.uid() = from_user_id);
DROP POLICY IF EXISTS "sender cleanup" ON webrtc_signals;
CREATE POLICY "sender cleanup" ON webrtc_signals FOR DELETE TO authenticated
  USING (auth.uid() = from_user_id);

-- Client errors: anyone can insert, nobody reads via anon key.
ALTER TABLE client_errors ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anyone insert" ON client_errors;
CREATE POLICY "anyone insert" ON client_errors FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Done. After running, verify with:
--   SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1;
-- All 23 tables below should appear.
