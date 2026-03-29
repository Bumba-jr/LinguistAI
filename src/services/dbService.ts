import { supabase } from '../lib/supabase';
import { Question, Flashcard, Lecture } from '../store/useAppStore';
import type { ChatSession } from '../store/useAppStore';

export const saveNote = async (content: string, userId: string) => {
  const { data, error } = await supabase
    .from('notes')
    .upsert({
      content,
      user_id: userId,
      updated_at: new Date().toISOString()
    })
    .select();

  if (error) throw error;
  return data;
};

export const getNote = async (userId: string): Promise<string> => {
  const { data, error } = await supabase
    .from('notes')
    .select('content')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.content ?? '';
};

// ── Multi-note support ────────────────────────────────────────────────────────
export interface NoteRow {
  id: string;
  title: string;
  content: string;
  tags: string[];
  context_label: string | null;
  updated_at: string;
}

export const upsertUserNote = async (userId: string, note: {
  id: string;
  title: string;
  content: string;
  tags: string[];
  contextLabel?: string;
  updatedAt: string;
}) => {
  const { error } = await supabase
    .from('user_notes')
    .upsert({
      id: note.id,
      user_id: userId,
      title: note.title,
      content: note.content,
      tags: note.tags,
      context_label: note.contextLabel ?? null,
      updated_at: note.updatedAt,
    });
  if (error) throw error;
};

export const getUserNotes = async (userId: string): Promise<NoteRow[]> => {
  const { data, error } = await supabase
    .from('user_notes')
    .select('id, title, content, tags, context_label, updated_at')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as NoteRow[];
};

export const deleteUserNote = async (noteId: string, userId: string) => {
  const { error } = await supabase
    .from('user_notes')
    .delete()
    .eq('id', noteId)
    .eq('user_id', userId);
  if (error) throw error;
};

export const saveQuizResult = async (
  userId: string,
  score: number,
  total: number,
  difficulty: string,
  type: string
) => {
  const { data, error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: userId,
      score,
      total,
      difficulty,
      quiz_type: type,
      created_at: new Date().toISOString()
    })
    .select();

  if (error) throw error;
  return data;
};

// ── Global Leaderboard ────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  language: string;
  difficulty: string;
  best_score: number;
  total_quizzes: number;
  avg_score: number;
  updated_at: string;
}

export const upsertLeaderboardEntry = async (
  userId: string,
  displayName: string,
  avatarUrl: string | null,
  language: string,
  difficulty: string,
  totalPoints: number  // the user's global total points
) => {
  const { error } = await supabase
    .from('leaderboard')
    .upsert({
      user_id: userId,
      display_name: displayName || 'Anonymous',
      avatar_url: avatarUrl ?? null,
      language,
      difficulty,
      best_score: totalPoints,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });

  if (error) throw error;
};

export const getLeaderboard = async (
  language?: string,
  difficulty?: string
): Promise<LeaderboardEntry[]> => {
  let query = supabase
    .from('leaderboard')
    .select('*')
    .order('best_score', { ascending: false })
    .limit(50);

  if (language && language !== 'all') query = query.eq('language', language);
  if (difficulty && difficulty !== 'all') query = query.eq('difficulty', difficulty);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as LeaderboardEntry[];
}; export const getStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const totalQuizzes = data.length;
  const totalCorrect = data.reduce((acc, curr) => acc + curr.score, 0);
  const totalQuestions = data.reduce((acc, curr) => acc + curr.total, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return { totalQuizzes, avgAccuracy: `${avgAccuracy}%`, totalQuestions };
};

export const getQuizHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    date: row.created_at,
    score: row.score,
    total: row.total,
    difficulty: row.difficulty,
    language: row.quiz_type,
  }));
};

// ── Lectures ──────────────────────────────────────────────────────────────────
export const saveLecture = async (userId: string, lecture: Lecture) => {
  const { data, error } = await supabase
    .from('saved_lectures')
    .upsert({
      id: lecture.id,
      user_id: userId,
      title: lecture.title,
      level: lecture.level,
      language: lecture.language,
      data: lecture,
      saved_at: new Date().toISOString(),
    })
    .select();
  if (error) throw error;
  return data;
};

export const getSavedLectures = async (userId: string): Promise<Lecture[]> => {
  const { data, error } = await supabase
    .from('saved_lectures')
    .select('data')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row: any) => row.data as Lecture);
};

export const deleteSavedLecture = async (lectureId: string, userId: string) => {
  const { error } = await supabase
    .from('saved_lectures')
    .delete()
    .eq('id', lectureId)
    .eq('user_id', userId);
  if (error) throw error;
};

// ── Flashcards ────────────────────────────────────────────────────────────────
export const upsertFlashcard = async (userId: string, card: Flashcard) => {
  const { error } = await supabase
    .from('flashcards')
    .upsert({
      id: card.id,
      user_id: userId,
      word: card.word,
      translation: card.translation,
      language: card.language,
      next_review: card.nextReview,
      last_reviewed: card.lastReviewed,
      example: card.example ?? null,
      hard_count: card.hardCount ?? 0,
      easy_streak: card.easyStreak ?? 0,
      review_history: card.reviewHistory ?? [],
    });
  if (error) throw error;
};

export const getFlashcards = async (userId: string): Promise<Flashcard[]> => {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
    .order('next_review', { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    word: row.word,
    translation: row.translation,
    language: row.language,
    nextReview: row.next_review,
    lastReviewed: row.last_reviewed,
    example: row.example ?? undefined,
    hardCount: row.hard_count ?? 0,
    easyStreak: row.easy_streak ?? 0,
    reviewHistory: row.review_history ?? [],
  }));
};

export const deleteFlashcard = async (cardId: string, userId: string) => {
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', cardId)
    .eq('user_id', userId);
  if (error) throw error;
};

export const updateFlashcardReview = async (
  cardId: string,
  userId: string,
  nextReview: string,
  lastReviewed: string,
  hardCount?: number,
  easyStreak?: number,
  reviewHistory?: ('easy' | 'again' | 'hard')[]
) => {
  const { error } = await supabase
    .from('flashcards')
    .update({
      next_review: nextReview,
      last_reviewed: lastReviewed,
      ...(hardCount !== undefined && { hard_count: hardCount }),
      ...(easyStreak !== undefined && { easy_streak: easyStreak }),
      ...(reviewHistory !== undefined && { review_history: reviewHistory }),
    })
    .eq('id', cardId)
    .eq('user_id', userId);
  if (error) throw error;
};

// ── Chat Sessions ─────────────────────────────────────────────────────────────
export const saveChatSessionDB = async (userId: string, session: ChatSession) => {
  const { error } = await supabase
    .from('chat_sessions')
    .upsert({
      id: session.id,
      user_id: userId,
      language: session.language,
      scenario_id: session.scenarioId,
      scenario_label: session.scenarioLabel,
      messages: session.messages,
      words_learned: session.wordsLearned,
      corrections_count: session.correctionsCount,
      created_at: session.date,
    });
  if (error) throw error;
};

export const getChatSessions = async (userId: string): Promise<ChatSession[]> => {
  const { data, error } = await supabase
    .from('chat_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    date: row.created_at,
    language: row.language,
    scenarioId: row.scenario_id,
    scenarioLabel: row.scenario_label,
    messages: row.messages,
    wordsLearned: row.words_learned,
    correctionsCount: row.corrections_count,
  }));
};

export const deleteChatSessionDB = async (sessionId: string, userId: string) => {
  const { error } = await supabase
    .from('chat_sessions')
    .delete()
    .eq('id', sessionId)
    .eq('user_id', userId);
  if (error) throw error;
};

// ── User Stats (streak + daily goal) ─────────────────────────────────────────
export const getUserStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data;
};

export const upsertUserStats = async (
  userId: string,
  stats: {
    streak_count: number;
    streak_last_date: string;
    daily_goal: number;
    daily_date: string;
    daily_count: number;
  }
) => {
  const { error } = await supabase
    .from('user_stats')
    .upsert({ user_id: userId, ...stats });
  if (error) throw error;
};

// ── Lecture Progress ──────────────────────────────────────────────────────────
export const saveLectureProgress = async (
  userId: string,
  lectureId: string,
  completedSections: number[],
  passedSections: number[]
) => {
  const { error } = await supabase
    .from('lecture_progress')
    .upsert({
      user_id: userId,
      lecture_id: lectureId,
      completed_sections: completedSections,
      passed_sections: passedSections,
      updated_at: new Date().toISOString(),
    });
  if (error) throw error;
};

export const getLectureProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('lecture_progress')
    .select('*')
    .eq('user_id', userId);
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    lectureId: row.lecture_id,
    completedSections: row.completed_sections ?? [],
    passedSections: row.passed_sections ?? [],
  }));
};

// ── Study Rooms ───────────────────────────────────────────────────────────────
export interface StudyRoom {
  id: string;
  name: string;
  language: string;
  description: string;
  is_private: boolean;
  created_by: string;
  created_at: string;
  difficulty?: string;
  topic_tags?: string[];
  max_capacity?: number;
  pinned_message?: string;
  member_count?: number;
  members?: { user_id: string; display_name: string; avatar_url: string | null; last_active_at?: string }[];
  active_members?: { user_id: string; display_name: string; avatar_url: string | null }[];
  last_message?: { content: string; display_name: string; created_at: string } | null;
}

export interface RoomMessage {
  id: string;
  room_id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  content: string;
  created_at: string;
  reply_to_id?: string | null;
  reply_to_content?: string | null;
  reply_to_name?: string | null;
  is_pinned?: boolean;
  is_announcement?: boolean;
}

export interface RoomMember {
  room_id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  joined_at: string;
}

export const getRooms = async (): Promise<StudyRoom[]> => {
  const { data: roomData, error } = await supabase
    .from('study_rooms')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;

  const { data: memberData } = await supabase
    .from('room_members')
    .select('room_id, user_id, display_name, avatar_url, last_active_at');

  // Get last message per room
  const { data: msgData } = await supabase
    .from('room_messages')
    .select('room_id, content, display_name, created_at')
    .order('created_at', { ascending: false });

  const lastMsgByRoom: Record<string, any> = {};
  (msgData ?? []).forEach((m: any) => {
    if (!lastMsgByRoom[m.room_id]) lastMsgByRoom[m.room_id] = m;
  });

  return (roomData ?? []).map((r: any) => {
    const members = (memberData ?? []).filter((m: any) => m.room_id === r.id);
    const tenMinAgo = Date.now() - 10 * 60 * 1000;
    const activeMembers = members.filter((m: any) =>
      m.last_active_at && new Date(m.last_active_at).getTime() > tenMinAgo
    );
    return {
      ...r,
      member_count: members.length,
      members,
      active_members: activeMembers,
      last_message: lastMsgByRoom[r.id] ?? null,
    };
  });
};

export const createRoom = async (
  userId: string,
  name: string,
  language: string,
  description: string,
  isPrivate: boolean,
  maxCapacity = 20
): Promise<StudyRoom> => {
  const { data, error } = await supabase
    .from('study_rooms')
    .insert({ name, language, description, is_private: isPrivate, created_by: userId, max_capacity: maxCapacity })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteRoom = async (roomId: string) => {
  const { error } = await supabase.from('study_rooms').delete().eq('id', roomId);
  if (error) throw error;
};

export const joinRoom = async (roomId: string, userId: string, displayName: string, avatarUrl: string | null) => {
  const { error } = await supabase.from('room_members').upsert({ room_id: roomId, user_id: userId, display_name: displayName, avatar_url: avatarUrl });
  if (error) throw error;
};

export const leaveRoom = async (roomId: string, userId: string) => {
  const { error } = await supabase.from('room_members').delete().eq('room_id', roomId).eq('user_id', userId);
  if (error) throw error;
};

export const getRoomMembers = async (roomId: string): Promise<RoomMember[]> => {
  const { data, error } = await supabase.from('room_members').select('*').eq('room_id', roomId).order('joined_at');
  if (error) throw error;
  return data ?? [];
};

export const getRoomMessages = async (roomId: string): Promise<RoomMessage[]> => {
  const { data, error } = await supabase
    .from('room_messages')
    .select('*')
    .eq('room_id', roomId)
    .is('reply_to_id', null) // only main chat messages, not thread replies
    .order('created_at')
    .limit(100);
  if (error) throw error;
  return data ?? [];
};

export const sendRoomMessage = async (
  roomId: string, userId: string, displayName: string, avatarUrl: string | null, content: string,
  replyTo?: { id: string; content: string; display_name: string } | null
) => {
  // Build insert payload — only include reply fields if provided to avoid column errors
  const payload: Record<string, any> = {
    room_id: roomId, user_id: userId, display_name: displayName, avatar_url: avatarUrl, content,
  };
  if (replyTo) {
    payload.reply_to_id = replyTo.id ?? null;
    payload.reply_to_content = replyTo.content ?? null;
    payload.reply_to_name = replyTo.display_name ?? null;
  }
  const { error } = await supabase.from('room_messages').insert(payload);
  if (error) throw error;
  await supabase.from('room_members')
    .update({ last_active_at: new Date().toISOString() })
    .eq('room_id', roomId).eq('user_id', userId);
};

// ── Room reactions ────────────────────────────────────────────────────────────
export const toggleReaction = async (messageId: string, userId: string, emoji: string) => {
  // Check if user already reacted to this message
  const { data: existing } = await supabase
    .from('message_reactions')
    .select('id, emoji')
    .eq('message_id', messageId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    // Always remove the old reaction first
    await supabase.from('message_reactions').delete().eq('id', existing.id);
    // If they clicked a different emoji, add the new one
    if (existing.emoji !== emoji) {
      await supabase.from('message_reactions').insert({ message_id: messageId, user_id: userId, emoji });
    }
    // If same emoji, just remove (toggle off)
  } else {
    await supabase.from('message_reactions').insert({ message_id: messageId, user_id: userId, emoji });
  }
};

export const getReactions = async (roomId: string): Promise<{ message_id: string; emoji: string; user_id: string }[]> => {
  const { data } = await supabase
    .from('message_reactions')
    .select('message_id, emoji, user_id')
    .in('message_id',
      (await supabase.from('room_messages').select('id').eq('room_id', roomId)).data?.map((r: any) => r.id) ?? []
    );
  return data ?? [];
};

export const pinMessage = async (messageId: string, pin: boolean) => {
  await supabase.from('room_messages').update({ is_pinned: pin }).eq('id', messageId);
};

export const sendAnnouncement = async (roomId: string, userId: string, displayName: string, avatarUrl: string | null, content: string) => {
  await supabase.from('room_messages').insert({ room_id: roomId, user_id: userId, display_name: displayName, avatar_url: avatarUrl, content, is_announcement: true });
};

// ── Quick reactions preference ────────────────────────────────────────────────
export const saveQuickReactions = async (userId: string, emojis: string[]) => {
  await supabase.from('user_preferences')
    .upsert({ user_id: userId, quick_reactions: emojis, updated_at: new Date().toISOString() });
};

export const getQuickReactions = async (userId: string): Promise<string[] | null> => {
  const { data } = await supabase.from('user_preferences')
    .select('quick_reactions')
    .eq('user_id', userId)
    .maybeSingle();
  return data?.quick_reactions ?? null;
};

// ── Room Vocabulary Board ─────────────────────────────────────────────────────
export interface VocabEntry {
  id: string;
  room_id: string;
  word: string;
  translation: string;
  added_by: string;
  created_at: string;
}

export const getRoomVocab = async (roomId: string): Promise<VocabEntry[]> => {
  const { data, error } = await supabase.from('room_vocabulary').select('*').eq('room_id', roomId).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const addVocabWord = async (roomId: string, word: string, translation: string, addedBy: string) => {
  const { error } = await supabase.from('room_vocabulary').insert({ room_id: roomId, word, translation, added_by: addedBy });
  if (error) throw error;
};

export const deleteVocabWord = async (id: string) => {
  const { error } = await supabase.from('room_vocabulary').delete().eq('id', id);
  if (error) throw error;
};

// ── Thread messages ───────────────────────────────────────────────────────────
export const getThreadMessages = async (parentId: string): Promise<RoomMessage[]> => {
  const { data, error } = await supabase.from('room_messages').select('*').eq('reply_to_id', parentId).order('created_at');
  if (error) throw error;
  return data ?? [];
};

// ── Language Exchange ─────────────────────────────────────────────────────────
export interface ExchangeProfile {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  native_language: string;
  learning_language: string;
  bio: string;
}

export const upsertExchangeProfile = async (profile: ExchangeProfile) => {
  const { error } = await supabase.from('exchange_profiles').upsert({ ...profile, updated_at: new Date().toISOString() });
  if (error) throw error;
};

export const getExchangeMatches = async (userId: string, nativeLang: string, learningLang: string): Promise<ExchangeProfile[]> => {
  // Fetch in two passes:
  // 1. Perfect matches: they speak what I'm learning AND learn what I speak
  // 2. Partial matches: they speak what I'm learning (regardless of what they're learning)
  const { data: perfect, error: e1 } = await supabase.from('exchange_profiles')
    .select('*')
    .eq('native_language', learningLang)
    .eq('learning_language', nativeLang)
    .neq('user_id', userId)
    .limit(20);
  if (e1) throw e1;

  const { data: partial, error: e2 } = await supabase.from('exchange_profiles')
    .select('*')
    .eq('native_language', learningLang)
    .neq('user_id', userId)
    .limit(20);
  if (e2) throw e2;

  // Merge: perfect matches first, then partial (deduplicated)
  const seen = new Set((perfect ?? []).map((p: any) => p.user_id));
  const extras = (partial ?? []).filter((p: any) => !seen.has(p.user_id));
  return [...(perfect ?? []), ...extras];
};

// Fetch ALL profiles except the current user — used to show the full community
export const getAllExchangeProfiles = async (userId: string): Promise<ExchangeProfile[]> => {
  const { data, error } = await supabase.from('exchange_profiles')
    .select('*')
    .neq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
};

// ── Room Challenges ───────────────────────────────────────────────────────────
export interface RoomChallenge {
  id: string;
  room_id: string;
  title: string;
  description: string;
  points_reward: number;
  ends_at: string;
  created_by: string;
  created_at: string;
}

export interface ChallengeCompletion {
  id: string;
  challenge_id: string;
  user_id: string;
  display_name: string;
  completed_at: string;
}

export const getRoomChallenges = async (roomId: string): Promise<RoomChallenge[]> => {
  const { data, error } = await supabase.from('room_challenges').select('*').eq('room_id', roomId).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const createRoomChallenge = async (challenge: Omit<RoomChallenge, 'id' | 'created_at'>) => {
  const { error } = await supabase.from('room_challenges').insert(challenge);
  if (error) throw error;
};

export const getChallengeCompletions = async (challengeId: string): Promise<ChallengeCompletion[]> => {
  const { data, error } = await supabase.from('room_challenge_completions').select('*').eq('challenge_id', challengeId);
  if (error) throw error;
  return data ?? [];
};

export const completeChallenge = async (challengeId: string, userId: string, displayName: string) => {
  const { error } = await supabase.from('room_challenge_completions').upsert({ challenge_id: challengeId, user_id: userId, display_name: displayName });
  if (error) throw error;
};

// ── Exchange connection requests ──────────────────────────────────────────────
export interface ConnectionRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  from_display_name: string;
  from_avatar_url: string | null;
  from_native_language: string;
  from_learning_language: string;
  from_bio: string;
  to_display_name: string;
  to_avatar_url: string | null;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export const sendConnectionRequest = async (
  fromUserId: string,
  toUserId: string,
  fromProfile: ExchangeProfile,
  toProfile: ExchangeProfile,
  message: string
) => {
  const { error } = await supabase.from('exchange_requests').insert({
    from_user_id: fromUserId,
    to_user_id: toUserId,
    from_display_name: fromProfile.display_name,
    from_avatar_url: fromProfile.avatar_url,
    from_native_language: fromProfile.native_language,
    from_learning_language: fromProfile.learning_language,
    from_bio: fromProfile.bio,
    to_display_name: toProfile.display_name,
    to_avatar_url: toProfile.avatar_url,
    message,
    status: 'pending',
  });
  if (error) throw error;
};

export const getIncomingRequests = async (userId: string): Promise<ConnectionRequest[]> => {
  const { data, error } = await supabase.from('exchange_requests')
    .select('*')
    .eq('to_user_id', userId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const getOutgoingRequests = async (userId: string): Promise<ConnectionRequest[]> => {
  const { data, error } = await supabase.from('exchange_requests')
    .select('*')
    .eq('from_user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const respondToRequest = async (requestId: string, status: 'accepted' | 'declined') => {
  const { error } = await supabase.from('exchange_requests')
    .update({ status })
    .eq('id', requestId);
  if (error) throw error;
};

export const getAcceptedConnections = async (userId: string): Promise<ConnectionRequest[]> => {
  const { data, error } = await supabase.from('exchange_requests')
    .select('*')
    .eq('status', 'accepted')
    .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const getExchangeProfile = async (userId: string): Promise<ExchangeProfile | null> => {
  const { data, error } = await supabase.from('exchange_profiles')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
};

// ── Direct messages (exchange chat between two real users) ────────────────────
export interface DirectMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string | null;
  content: string;
  created_at: string;
}

// Deterministic conversation ID — same for both users regardless of order
export const getConversationId = (userA: string, userB: string): string =>
  [userA, userB].sort().join('__');

export const sendDirectMessage = async (
  conversationId: string,
  senderId: string,
  senderName: string,
  senderAvatar: string | null,
  content: string
) => {
  const { error } = await supabase.from('direct_messages').insert({
    conversation_id: conversationId,
    sender_id: senderId,
    sender_name: senderName,
    sender_avatar: senderAvatar,
    content,
  });
  if (error) throw error;
};

export const getDirectMessages = async (conversationId: string): Promise<DirectMessage[]> => {
  const { data, error } = await supabase.from('direct_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(200);
  if (error) throw error;
  return data ?? [];
};

// ── Unread message counts per conversation ────────────────────────────────────
// Read timestamps stored in localStorage: { [convId]: ISO string }
export const markConversationRead = (conversationId: string) => {
  try {
    const stored = JSON.parse(localStorage.getItem('dm_read_at') || '{}');
    stored[conversationId] = new Date().toISOString();
    localStorage.setItem('dm_read_at', JSON.stringify(stored));
  } catch { /* ignore */ }
};

export const getReadAt = (conversationId: string): string | null => {
  try {
    const stored = JSON.parse(localStorage.getItem('dm_read_at') || '{}');
    return stored[conversationId] ?? null;
  } catch { return null; }
};

export const getLastMessagesForUser = async (userId: string, conversationIds: string[]): Promise<Record<string, { content: string; created_at: string; unread: number; sender_id: string }>> => {
  if (!conversationIds.length) return {};
  const result: Record<string, { content: string; created_at: string; unread: number; sender_id: string }> = {};
  await Promise.all(conversationIds.map(async (convId) => {
    const { data } = await supabase.from('direct_messages')
      .select('content, created_at, sender_id')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: false })
      .limit(50);
    if (!data?.length) return;
    const last = data[0];
    const readAt = getReadAt(convId);
    // Count messages from others that arrived after the last read time
    const unread = data.filter(m =>
      m.sender_id !== userId &&
      (!readAt || new Date(m.created_at) > new Date(readAt))
    ).length;
    result[convId] = { content: last.content, created_at: last.created_at, unread, sender_id: last.sender_id };
  }));
  return result;
};

// ── Online presence (use Supabase Presence channels in the component) ─────────
// These are kept for legacy compatibility but presence is handled via realtime channels
export const updatePresence = async (_userId: string) => { /* handled via realtime presence */ };
export const getOnlineUsers = async (_userIds: string[]): Promise<Set<string>> => new Set();

// ── WebRTC signaling ──────────────────────────────────────────────────────────
export const sendSignal = async (
  conversationId: string,
  fromUserId: string,
  toUserId: string,
  type: 'offer' | 'answer' | 'ice-candidate' | 'call-end' | 'call-reject',
  payload: object
) => {
  const { error } = await supabase.from('webrtc_signals').insert({
    conversation_id: conversationId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    type,
    payload,
  });
  if (error) throw error;
};

// ── Direct message deletion ───────────────────────────────────────────────────
// "Delete for me" — marks the message as deleted for this user only (soft delete via hidden_by array)
export const hideMessageForUser = async (messageId: string, userId: string) => {
  // We use a separate table to track per-user hidden messages
  const { error } = await supabase.from('hidden_messages').upsert({
    message_id: messageId,
    user_id: userId,
  });
  if (error) throw error;
};

// "Delete for all" — hard deletes the message (only sender can do this)
export const deleteMessageForAll = async (messageId: string, senderId: string) => {
  const { error } = await supabase.from('direct_messages')
    .delete()
    .eq('id', messageId)
    .eq('sender_id', senderId); // RLS: only sender can delete
  if (error) throw error;
};

// Get hidden message IDs for a user in a conversation
export const getHiddenMessageIds = async (userId: string, conversationId: string): Promise<Set<string>> => {
  const { data } = await supabase.from('hidden_messages')
    .select('message_id')
    .eq('user_id', userId)
    .in('message_id',
      (await supabase.from('direct_messages').select('id').eq('conversation_id', conversationId)).data?.map((r: any) => r.id) ?? []
    );
  return new Set((data ?? []).map((r: any) => r.message_id));
};
