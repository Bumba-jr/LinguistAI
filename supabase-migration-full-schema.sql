-- ============================================================
-- LINGUISTAI — FULL SCHEMA AUDIT MIGRATION
-- Run once in Supabase Dashboard → SQL Editor. Fully idempotent —
-- safe to run regardless of current database state.
--
-- The code references 23 core tables but only a few ever had migration
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
  invite_code text NOT NULL DEFAULT gen_random_uuid()::text,
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
-- Every step is guarded: if ONE table fails (unexpected ownership or shape),
-- it raises a WARNING naming the table and the rest of the migration still
-- applies. Warnings appear in the SQL Editor's Messages panel.

-- Repair pass: some legacy tables may predate the app and miss user_id
DO $$
DECLARE
  tbl text;
  user_owned text[] := ARRAY['notes','user_notes','quiz_results','saved_lectures',
    'flashcards','chat_sessions','lecture_progress','leaderboard','user_preferences',
    'user_stats','exchange_profiles'];
BEGIN
  FOREACH tbl IN ARRAY user_owned LOOP
    BEGIN
      EXECUTE format('ALTER TABLE %I ADD COLUMN IF NOT EXISTS user_id uuid', tbl);
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Could not ensure user_id on %: %', tbl, SQLERRM;
    END;
  END LOOP;
END $$;

-- User-scoped tables: full CRUD on own rows only
DO $$
DECLARE
  tbl text;
  user_owned text[] := ARRAY['notes','user_notes','quiz_results','saved_lectures',
    'flashcards','chat_sessions','lecture_progress','leaderboard','user_preferences',
    'user_stats','exchange_profiles'];
BEGIN
  FOREACH tbl IN ARRAY user_owned LOOP
    BEGIN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "own rows" ON %I', tbl);
      EXECUTE format($f$CREATE POLICY "own rows" ON %I FOR ALL TO authenticated
        USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)$f$, tbl);
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'RLS skipped for %: %', tbl, SQLERRM;
    END;
  END LOOP;
END $$;

-- Clear legacy blanket community policies before the policy-specific rules at
-- the end of this file are installed. If a later statement fails, access stays
-- closed instead of falling back to broad policies.
DO $$
DECLARE
  tbl text;
  community text[] := ARRAY['study_rooms','room_members','room_messages',
    'message_reactions','room_vocabulary','room_challenges','room_challenge_completions'];
BEGIN
  FOREACH tbl IN ARRAY community LOOP
    BEGIN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "members read" ON %I', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "members write" ON %I', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "members update" ON %I', tbl);
      EXECUTE format('DROP POLICY IF EXISTS "members delete" ON %I', tbl);
    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'RLS skipped for %: %', tbl, SQLERRM;
    END;
  END LOOP;
END $$;

-- Clear legacy exchange policies before installing the restricted policies
-- at the end of this file.
DO $$
BEGIN
  ALTER TABLE exchange_requests ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "participants read" ON exchange_requests;
  DROP POLICY IF EXISTS "sender insert" ON exchange_requests;
  DROP POLICY IF EXISTS "recipient update" ON exchange_requests;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'RLS skipped for exchange_requests: %', SQLERRM;
END $$;

-- Direct messages: participants of the conversation read; sender writes;
-- sender deletes.
DO $$
BEGIN
  ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "participants read" ON direct_messages;
  DROP POLICY IF EXISTS "sender insert" ON direct_messages;
  DROP POLICY IF EXISTS "sender delete" ON direct_messages;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'RLS skipped for direct_messages: %', SQLERRM;
END $$;

-- Hidden messages: own rows only.
DO $$
BEGIN
  ALTER TABLE hidden_messages ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "own rows" ON hidden_messages;
  CREATE POLICY "own rows" ON hidden_messages FOR ALL TO authenticated
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'RLS skipped for hidden_messages: %', SQLERRM;
END $$;

-- WebRTC signals: sender inserts, recipient reads.
DO $$
BEGIN
  ALTER TABLE webrtc_signals ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "sender insert" ON webrtc_signals;
  DROP POLICY IF EXISTS "recipient read" ON webrtc_signals;
  DROP POLICY IF EXISTS "sender cleanup" ON webrtc_signals;
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'RLS skipped for webrtc_signals: %', SQLERRM;
END $$;

-- Client errors: anyone can insert, nobody reads via anon key.
DO $$
BEGIN
  ALTER TABLE client_errors ENABLE ROW LEVEL SECURITY;
  DROP POLICY IF EXISTS "anyone insert" ON client_errors;
  CREATE POLICY "anyone insert" ON client_errors FOR INSERT TO anon, authenticated WITH CHECK (true);
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'RLS skipped for client_errors: %', SQLERRM;
END $$;

-- Done. After running, check the Messages panel for any WARNINGs naming
-- tables that need attention, and verify with:
--   SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1;
-- All 26 application tables below should appear.
-- Security and account-progress upgrade for existing LinguistAI databases.
-- Run after supabase-migration-full-schema.sql. Safe to run repeatedly.

CREATE TABLE IF NOT EXISTS portal_progress (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portal_id text NOT NULL CHECK (portal_id IN ('tcf','goethe','dele','cils','caple','jlpt','hsk')),
  storage_key text NOT NULL CHECK (char_length(storage_key) BETWEEN 1 AND 240),
  value jsonb NOT NULL CHECK (char_length(value::text) <= 250000),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, portal_id, storage_key)
);

CREATE TABLE IF NOT EXISTS lesson_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portal text NOT NULL CHECK (char_length(portal) <= 80),
  level text NOT NULL CHECK (char_length(level) <= 24),
  lesson_key text NOT NULL CHECK (char_length(lesson_key) <= 240),
  lesson_title text NOT NULL CHECK (char_length(lesson_title) <= 200),
  category text NOT NULL CHECK (category IN ('factual_error','grammar_or_translation','unclear_explanation','missing_content','other')),
  details text NOT NULL DEFAULT '' CHECK (char_length(details) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_lesson_feedback_user_created ON lesson_feedback (user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS ai_rate_limits (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bucket text NOT NULL,
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, bucket)
);

ALTER TABLE portal_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON portal_progress, lesson_feedback, ai_rate_limits FROM anon;
REVOKE ALL ON ai_rate_limits FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON portal_progress TO authenticated;
GRANT SELECT, INSERT ON lesson_feedback TO authenticated;

DROP POLICY IF EXISTS "portal progress own rows" ON portal_progress;
CREATE POLICY "portal progress own rows" ON portal_progress FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "lesson feedback own read" ON lesson_feedback;
CREATE POLICY "lesson feedback own read" ON lesson_feedback FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "lesson feedback own insert" ON lesson_feedback;
CREATE POLICY "lesson feedback own insert" ON lesson_feedback FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.consume_ai_rate_limit(p_bucket text DEFAULT 'ai')
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  bucket_limit integer;
  updated_count integer;
  current_window timestamptz := now();
BEGIN
  IF current_user_id IS NULL THEN RETURN false; END IF;
  bucket_limit := CASE p_bucket WHEN 'ai' THEN 40 WHEN 'tts' THEN 120 ELSE NULL END;
  IF bucket_limit IS NULL THEN RETURN false; END IF;

  INSERT INTO ai_rate_limits (user_id, bucket, window_started_at, request_count)
  VALUES (current_user_id, p_bucket, current_window, 1)
  ON CONFLICT (user_id, bucket) DO UPDATE SET
    window_started_at = CASE
      WHEN ai_rate_limits.window_started_at <= current_window - interval '1 minute' THEN current_window
      ELSE ai_rate_limits.window_started_at
    END,
    request_count = CASE
      WHEN ai_rate_limits.window_started_at <= current_window - interval '1 minute' THEN 1
      ELSE ai_rate_limits.request_count + 1
    END
  RETURNING request_count INTO updated_count;

  RETURN updated_count <= bucket_limit;
END;
$$;
REVOKE ALL ON FUNCTION public.consume_ai_rate_limit(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.consume_ai_rate_limit(text) TO authenticated;

DROP FUNCTION IF EXISTS public.save_portal_progress(text, text, jsonb, timestamptz);
CREATE OR REPLACE FUNCTION public.save_portal_progress(
  p_user_id uuid, p_portal_id text, p_storage_key text, p_value jsonb, p_updated_at timestamptz DEFAULT now()
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> p_user_id
     OR p_portal_id NOT IN ('tcf','goethe','dele','cils','caple','jlpt','hsk')
     OR char_length(p_storage_key) > 240 OR char_length(p_value::text) > 250000 THEN
    RAISE EXCEPTION 'Invalid portal progress payload';
  END IF;
  INSERT INTO portal_progress (user_id, portal_id, storage_key, value, updated_at)
  VALUES (p_user_id, p_portal_id, p_storage_key, p_value, p_updated_at)
  ON CONFLICT (user_id, portal_id, storage_key) DO UPDATE SET
    value = EXCLUDED.value, updated_at = EXCLUDED.updated_at
  WHERE portal_progress.updated_at <= EXCLUDED.updated_at;
END;
$$;
REVOKE ALL ON FUNCTION public.save_portal_progress(uuid, text, text, jsonb, timestamptz) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.save_portal_progress(uuid, text, text, jsonb, timestamptz) TO authenticated;

-- A private room's invite code is a bearer invitation. The database stores a
-- random UUID token; old links containing the room UUID remain valid.
ALTER TABLE study_rooms ADD COLUMN IF NOT EXISTS invite_code text NOT NULL DEFAULT gen_random_uuid()::text;
CREATE UNIQUE INDEX IF NOT EXISTS idx_study_rooms_invite_code ON study_rooms (invite_code);

-- Security-definer helpers avoid policy recursion while always evaluating
-- membership for the signed-in caller.
CREATE OR REPLACE FUNCTION public.is_room_member(p_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.room_members m
    WHERE m.room_id = p_room_id AND m.user_id::text = auth.uid()::text
  );
$$;

CREATE OR REPLACE FUNCTION public.can_access_room(p_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.study_rooms r
    WHERE r.id = p_room_id AND (coalesce(r.is_private, false) = false OR r.created_by::text = auth.uid()::text
      OR EXISTS (SELECT 1 FROM public.room_members m WHERE m.room_id = r.id AND m.user_id::text = auth.uid()::text))
  );
$$;

CREATE OR REPLACE FUNCTION public.can_participate_in_room(p_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM public.room_members m WHERE m.room_id = p_room_id AND m.user_id::text = auth.uid()::text)
    OR EXISTS (SELECT 1 FROM public.study_rooms r WHERE r.id = p_room_id AND r.created_by::text = auth.uid()::text)
  );
$$;

CREATE OR REPLACE FUNCTION public.join_private_room(
  p_invite_code text, p_display_name text DEFAULT NULL, p_avatar_url text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  matched_room_id uuid;
  member_user_id_is_uuid boolean;
BEGIN
  IF auth.uid() IS NULL OR p_invite_code IS NULL OR char_length(p_invite_code) > 64 THEN
    RAISE EXCEPTION 'Invalid room invite';
  END IF;
  SELECT r.id INTO matched_room_id
  FROM public.study_rooms r
  WHERE r.is_private = true AND (r.invite_code = p_invite_code OR r.id::text = p_invite_code)
  LIMIT 1;
  IF matched_room_id IS NULL THEN RAISE EXCEPTION 'Invalid room invite'; END IF;

  SELECT a.atttypid = 'uuid'::regtype INTO member_user_id_is_uuid
  FROM pg_catalog.pg_attribute a
  WHERE a.attrelid = 'public.room_members'::regclass
    AND a.attname = 'user_id' AND a.attnum > 0 AND NOT a.attisdropped;

  -- Existing installations may have created this column as text. Insert a
  -- value matching the actual column type so both schema generations work.
  IF member_user_id_is_uuid THEN
    INSERT INTO public.room_members (room_id, user_id, display_name, avatar_url)
    VALUES (matched_room_id, auth.uid(), left(nullif(trim(p_display_name), ''), 80), left(nullif(p_avatar_url, ''), 2048))
    ON CONFLICT (room_id, user_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      avatar_url = EXCLUDED.avatar_url,
      last_active_at = now();
  ELSE
    INSERT INTO public.room_members (room_id, user_id, display_name, avatar_url)
    VALUES (matched_room_id, auth.uid()::text, left(nullif(trim(p_display_name), ''), 80), left(nullif(p_avatar_url, ''), 2048))
    ON CONFLICT (room_id, user_id) DO UPDATE SET
      display_name = EXCLUDED.display_name,
      avatar_url = EXCLUDED.avatar_url,
      last_active_at = now();
  END IF;
  RETURN matched_room_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.can_access_conversation(p_conversation_id text)
RETURNS boolean
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
DECLARE
  user_a text := split_part(p_conversation_id, '__', 1);
  user_b text := split_part(p_conversation_id, '__', 2);
BEGIN
  IF auth.uid() IS NULL OR user_a !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     OR user_b !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
     OR split_part(p_conversation_id, '__', 3) <> '' THEN RETURN false; END IF;
  IF auth.uid()::text <> lower(user_a) AND auth.uid()::text <> lower(user_b) THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.exchange_requests x
    WHERE x.status = 'accepted'
      AND ((lower(x.from_user_id::text) = lower(user_a) AND lower(x.to_user_id::text) = lower(user_b))
        OR (lower(x.from_user_id::text) = lower(user_b) AND lower(x.to_user_id::text) = lower(user_a)))
  );
END;
$$;

REVOKE ALL ON FUNCTION public.is_room_member(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_access_room(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_participate_in_room(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_access_conversation(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.join_private_room(text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_room_member(uuid), public.can_access_room(uuid), public.can_participate_in_room(uuid), public.can_access_conversation(text), public.join_private_room(text, text, text) TO authenticated;

-- Remove legacy blanket room policies and any other stale policies on these tables.
DO $$
DECLARE p record;
BEGIN
  FOR p IN SELECT schemaname, tablename, policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = ANY(ARRAY[
      'study_rooms','room_members','room_messages','message_reactions','room_vocabulary',
      'room_challenges','room_challenge_completions','leaderboard','exchange_profiles',
      'exchange_requests','direct_messages','hidden_messages','webrtc_signals'
    ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END $$;

ALTER TABLE study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_challenge_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "visible rooms read" ON study_rooms FOR SELECT TO authenticated
  USING (coalesce(is_private, false) = false OR created_by::text = auth.uid()::text OR public.is_room_member(id));
CREATE POLICY "room creator insert" ON study_rooms FOR INSERT TO authenticated
  WITH CHECK (created_by::text = auth.uid()::text);
CREATE POLICY "room creator update" ON study_rooms FOR UPDATE TO authenticated
  USING (created_by::text = auth.uid()::text) WITH CHECK (created_by::text = auth.uid()::text);
CREATE POLICY "room creator delete" ON study_rooms FOR DELETE TO authenticated
  USING (created_by::text = auth.uid()::text);

CREATE POLICY "room members visible to room" ON room_members FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "self joins public room or owner manages" ON room_members FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text AND EXISTS (
      SELECT 1 FROM study_rooms r WHERE r.id = room_id
        AND (coalesce(r.is_private, false) = false OR r.created_by::text = auth.uid()::text OR public.is_room_member(r.id))
    )
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));
CREATE POLICY "self or owner updates membership" ON room_members FOR UPDATE TO authenticated
  USING (user_id::text = auth.uid()::text OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text))
  WITH CHECK ((user_id::text = auth.uid()::text AND public.can_access_room(room_id))
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));
CREATE POLICY "self or owner leaves membership" ON room_members FOR DELETE TO authenticated
  USING (user_id::text = auth.uid()::text OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));

CREATE POLICY "room messages visible to members" ON room_messages FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "room member writes own messages" ON room_messages FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text AND public.can_participate_in_room(room_id));
CREATE POLICY "author or room owner updates messages" ON room_messages FOR UPDATE TO authenticated
  USING (user_id::text = auth.uid()::text OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text))
  WITH CHECK ((user_id::text = auth.uid()::text AND public.can_participate_in_room(room_id))
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));
CREATE POLICY "author or room owner deletes messages" ON room_messages FOR DELETE TO authenticated
  USING (user_id::text = auth.uid()::text OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));

CREATE POLICY "room reactions visible to members" ON message_reactions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM room_messages m WHERE m.id = message_id AND public.can_access_room(m.room_id)));
CREATE POLICY "members create own reactions" ON message_reactions FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text AND EXISTS (SELECT 1 FROM room_messages m WHERE m.id = message_id AND public.can_participate_in_room(m.room_id)));
CREATE POLICY "members remove own reactions" ON message_reactions FOR DELETE TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "room vocabulary visible to members" ON room_vocabulary FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "members add own vocabulary" ON room_vocabulary FOR INSERT TO authenticated
  WITH CHECK (added_by::text = auth.uid()::text AND public.can_participate_in_room(room_id));
CREATE POLICY "author or owner deletes vocabulary" ON room_vocabulary FOR DELETE TO authenticated
  USING (added_by::text = auth.uid()::text OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by::text = auth.uid()::text));

CREATE POLICY "room challenges visible to members" ON room_challenges FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "room owner creates challenges" ON room_challenges FOR INSERT TO authenticated
  WITH CHECK (created_by::text = auth.uid()::text AND public.can_participate_in_room(room_id));
CREATE POLICY "challenge creator updates" ON room_challenges FOR UPDATE TO authenticated
  USING (created_by::text = auth.uid()::text) WITH CHECK (created_by::text = auth.uid()::text AND public.can_participate_in_room(room_id));
CREATE POLICY "challenge creator deletes" ON room_challenges FOR DELETE TO authenticated
  USING (created_by::text = auth.uid()::text);

CREATE POLICY "challenge completions visible to members" ON room_challenge_completions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_access_room(c.room_id)));
CREATE POLICY "users complete own challenges" ON room_challenge_completions FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text AND EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_participate_in_room(c.room_id)));
CREATE POLICY "users update own challenge completion" ON room_challenge_completions FOR UPDATE TO authenticated
  USING (user_id::text = auth.uid()::text) WITH CHECK (user_id::text = auth.uid()::text
    AND EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_participate_in_room(c.room_id)));

-- A public leaderboard is intentional; writes still remain account-owned.
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leaderboard visible to members" ON leaderboard FOR SELECT TO authenticated USING (true);
CREATE POLICY "users create own leaderboard entry" ON leaderboard FOR INSERT TO authenticated WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "users update own leaderboard entry" ON leaderboard FOR UPDATE TO authenticated
  USING (user_id::text = auth.uid()::text) WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "users delete own leaderboard entry" ON leaderboard FOR DELETE TO authenticated USING (user_id::text = auth.uid()::text);

-- Exchange profiles are searchable by signed-in learners; edits remain private to their owner.
ALTER TABLE exchange_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exchange profiles visible to members" ON exchange_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "users create own exchange profile" ON exchange_profiles FOR INSERT TO authenticated WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "users update own exchange profile" ON exchange_profiles FOR UPDATE TO authenticated
  USING (user_id::text = auth.uid()::text) WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "users delete own exchange profile" ON exchange_profiles FOR DELETE TO authenticated USING (user_id::text = auth.uid()::text);

ALTER TABLE exchange_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE exchange_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE exchange_requests TO authenticated;
GRANT UPDATE (status) ON TABLE exchange_requests TO authenticated;
CREATE POLICY "participants read exchange requests" ON exchange_requests FOR SELECT TO authenticated
  USING (from_user_id::text = auth.uid()::text OR to_user_id::text = auth.uid()::text);
CREATE POLICY "sender creates exchange request" ON exchange_requests FOR INSERT TO authenticated
  WITH CHECK (from_user_id::text = auth.uid()::text AND from_user_id <> to_user_id AND status = 'pending');
CREATE POLICY "recipient responds to exchange request" ON exchange_requests FOR UPDATE TO authenticated
  USING (to_user_id::text = auth.uid()::text AND status = 'pending')
  WITH CHECK (to_user_id::text = auth.uid()::text AND status IN ('accepted','declined'));

ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversation participants read messages" ON direct_messages FOR SELECT TO authenticated
  USING (public.can_access_conversation(conversation_id));
CREATE POLICY "conversation participants send own messages" ON direct_messages FOR INSERT TO authenticated
  WITH CHECK (sender_id::text = auth.uid()::text AND public.can_access_conversation(conversation_id));
CREATE POLICY "sender deletes own messages" ON direct_messages FOR DELETE TO authenticated
  USING (sender_id::text = auth.uid()::text AND public.can_access_conversation(conversation_id));

ALTER TABLE hidden_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own hidden messages" ON hidden_messages FOR SELECT TO authenticated USING (user_id::text = auth.uid()::text);
CREATE POLICY "users hide own conversation messages" ON hidden_messages FOR INSERT TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text AND EXISTS (
    SELECT 1 FROM direct_messages m WHERE m.id = message_id AND public.can_access_conversation(m.conversation_id)
  ));
CREATE POLICY "users unhide own messages" ON hidden_messages FOR DELETE TO authenticated USING (user_id::text = auth.uid()::text);

ALTER TABLE webrtc_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversation participants receive signals" ON webrtc_signals FOR SELECT TO authenticated
  USING ((from_user_id::text = auth.uid()::text OR to_user_id::text = auth.uid()::text) AND public.can_access_conversation(conversation_id));
CREATE POLICY "conversation participants send signals" ON webrtc_signals FOR INSERT TO authenticated
  WITH CHECK (from_user_id::text = auth.uid()::text AND public.can_access_conversation(conversation_id)
    AND ((split_part(conversation_id, '__', 1) = from_user_id::text AND split_part(conversation_id, '__', 2) = to_user_id::text)
      OR (split_part(conversation_id, '__', 2) = from_user_id::text AND split_part(conversation_id, '__', 1) = to_user_id::text)));
CREATE POLICY "participants clean up signals" ON webrtc_signals FOR DELETE TO authenticated
  USING ((from_user_id::text = auth.uid()::text OR to_user_id::text = auth.uid()::text) AND public.can_access_conversation(conversation_id));
