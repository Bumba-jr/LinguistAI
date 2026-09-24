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
    SELECT 1 FROM public.room_members m WHERE m.room_id = p_room_id AND m.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.can_access_room(p_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.study_rooms r
    WHERE r.id = p_room_id AND (coalesce(r.is_private, false) = false OR r.created_by = auth.uid()
      OR EXISTS (SELECT 1 FROM public.room_members m WHERE m.room_id = r.id AND m.user_id = auth.uid()))
  );
$$;

CREATE OR REPLACE FUNCTION public.can_participate_in_room(p_room_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp
AS $$
  SELECT auth.uid() IS NOT NULL AND (
    EXISTS (SELECT 1 FROM public.room_members m WHERE m.room_id = p_room_id AND m.user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.study_rooms r WHERE r.id = p_room_id AND r.created_by = auth.uid())
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
DECLARE matched_room_id uuid;
BEGIN
  IF auth.uid() IS NULL OR p_invite_code IS NULL OR char_length(p_invite_code) > 64 THEN
    RAISE EXCEPTION 'Invalid room invite';
  END IF;
  SELECT r.id INTO matched_room_id
  FROM public.study_rooms r
  WHERE r.is_private = true AND (r.invite_code = p_invite_code OR r.id::text = p_invite_code)
  LIMIT 1;
  IF matched_room_id IS NULL THEN RAISE EXCEPTION 'Invalid room invite'; END IF;

  INSERT INTO public.room_members (room_id, user_id, display_name, avatar_url)
  VALUES (matched_room_id, auth.uid(), left(nullif(trim(p_display_name), ''), 80), left(nullif(p_avatar_url, ''), 2048))
  ON CONFLICT (room_id, user_id) DO UPDATE SET
    display_name = EXCLUDED.display_name,
    avatar_url = EXCLUDED.avatar_url,
    last_active_at = now();
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
      AND ((x.from_user_id = user_a::uuid AND x.to_user_id = user_b::uuid)
        OR (x.from_user_id = user_b::uuid AND x.to_user_id = user_a::uuid))
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
  USING (coalesce(is_private, false) = false OR created_by = auth.uid() OR public.is_room_member(id));
CREATE POLICY "room creator insert" ON study_rooms FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());
CREATE POLICY "room creator update" ON study_rooms FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());
CREATE POLICY "room creator delete" ON study_rooms FOR DELETE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "room members visible to room" ON room_members FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "self joins public room or owner manages" ON room_members FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND EXISTS (
      SELECT 1 FROM study_rooms r WHERE r.id = room_id
        AND (coalesce(r.is_private, false) = false OR r.created_by = auth.uid() OR public.is_room_member(r.id))
    )
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));
CREATE POLICY "self or owner updates membership" ON room_members FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()))
  WITH CHECK ((user_id = auth.uid() AND public.can_access_room(room_id))
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));
CREATE POLICY "self or owner leaves membership" ON room_members FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));

CREATE POLICY "room messages visible to members" ON room_messages FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "room member writes own messages" ON room_messages FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND public.can_participate_in_room(room_id));
CREATE POLICY "author or room owner updates messages" ON room_messages FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()))
  WITH CHECK ((user_id = auth.uid() AND public.can_participate_in_room(room_id))
    OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));
CREATE POLICY "author or room owner deletes messages" ON room_messages FOR DELETE TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));

CREATE POLICY "room reactions visible to members" ON message_reactions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM room_messages m WHERE m.id = message_id AND public.can_access_room(m.room_id)));
CREATE POLICY "members create own reactions" ON message_reactions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM room_messages m WHERE m.id = message_id AND public.can_participate_in_room(m.room_id)));
CREATE POLICY "members remove own reactions" ON message_reactions FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "room vocabulary visible to members" ON room_vocabulary FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "members add own vocabulary" ON room_vocabulary FOR INSERT TO authenticated
  WITH CHECK (added_by = auth.uid() AND public.can_participate_in_room(room_id));
CREATE POLICY "author or owner deletes vocabulary" ON room_vocabulary FOR DELETE TO authenticated
  USING (added_by = auth.uid() OR EXISTS (SELECT 1 FROM study_rooms r WHERE r.id = room_id AND r.created_by = auth.uid()));

CREATE POLICY "room challenges visible to members" ON room_challenges FOR SELECT TO authenticated
  USING (public.can_access_room(room_id));
CREATE POLICY "room owner creates challenges" ON room_challenges FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() AND public.can_participate_in_room(room_id));
CREATE POLICY "challenge creator updates" ON room_challenges FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid() AND public.can_participate_in_room(room_id));
CREATE POLICY "challenge creator deletes" ON room_challenges FOR DELETE TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "challenge completions visible to members" ON room_challenge_completions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_access_room(c.room_id)));
CREATE POLICY "users complete own challenges" ON room_challenge_completions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_participate_in_room(c.room_id)));
CREATE POLICY "users update own challenge completion" ON room_challenge_completions FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid()
    AND EXISTS (SELECT 1 FROM room_challenges c WHERE c.id = challenge_id AND public.can_participate_in_room(c.room_id)));

-- A public leaderboard is intentional; writes still remain account-owned.
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leaderboard visible to members" ON leaderboard FOR SELECT TO authenticated USING (true);
CREATE POLICY "users create own leaderboard entry" ON leaderboard FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users update own leaderboard entry" ON leaderboard FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "users delete own leaderboard entry" ON leaderboard FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Exchange profiles are searchable by signed-in learners; edits remain private to their owner.
ALTER TABLE exchange_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "exchange profiles visible to members" ON exchange_profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "users create own exchange profile" ON exchange_profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users update own exchange profile" ON exchange_profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "users delete own exchange profile" ON exchange_profiles FOR DELETE TO authenticated USING (user_id = auth.uid());

ALTER TABLE exchange_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE exchange_requests FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON TABLE exchange_requests TO authenticated;
GRANT UPDATE (status) ON TABLE exchange_requests TO authenticated;
CREATE POLICY "participants read exchange requests" ON exchange_requests FOR SELECT TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);
CREATE POLICY "sender creates exchange request" ON exchange_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = from_user_id AND from_user_id <> to_user_id AND status = 'pending');
CREATE POLICY "recipient responds to exchange request" ON exchange_requests FOR UPDATE TO authenticated
  USING (auth.uid() = to_user_id AND status = 'pending')
  WITH CHECK (auth.uid() = to_user_id AND status IN ('accepted','declined'));

ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversation participants read messages" ON direct_messages FOR SELECT TO authenticated
  USING (public.can_access_conversation(conversation_id));
CREATE POLICY "conversation participants send own messages" ON direct_messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND public.can_access_conversation(conversation_id));
CREATE POLICY "sender deletes own messages" ON direct_messages FOR DELETE TO authenticated
  USING (sender_id = auth.uid() AND public.can_access_conversation(conversation_id));

ALTER TABLE hidden_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own hidden messages" ON hidden_messages FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "users hide own conversation messages" ON hidden_messages FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND EXISTS (
    SELECT 1 FROM direct_messages m WHERE m.id = message_id AND public.can_access_conversation(m.conversation_id)
  ));
CREATE POLICY "users unhide own messages" ON hidden_messages FOR DELETE TO authenticated USING (user_id = auth.uid());

ALTER TABLE webrtc_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "conversation participants receive signals" ON webrtc_signals FOR SELECT TO authenticated
  USING ((from_user_id = auth.uid() OR to_user_id = auth.uid()) AND public.can_access_conversation(conversation_id));
CREATE POLICY "conversation participants send signals" ON webrtc_signals FOR INSERT TO authenticated
  WITH CHECK (from_user_id = auth.uid() AND public.can_access_conversation(conversation_id)
    AND ((split_part(conversation_id, '__', 1) = from_user_id::text AND split_part(conversation_id, '__', 2) = to_user_id::text)
      OR (split_part(conversation_id, '__', 2) = from_user_id::text AND split_part(conversation_id, '__', 1) = to_user_id::text)));
CREATE POLICY "participants clean up signals" ON webrtc_signals FOR DELETE TO authenticated
  USING ((from_user_id = auth.uid() OR to_user_id = auth.uid()) AND public.can_access_conversation(conversation_id));
