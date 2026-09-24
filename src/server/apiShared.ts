import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export type AiRateLimitBucket = 'ai' | 'tts';

export const requireAuthenticatedRequest = async (
  req: VercelRequest,
  res: VercelResponse,
  bucket: AiRateLimitBucket = 'ai',
): Promise<boolean> => {
  const authorization = req.headers.authorization ?? '';
  const token = /^Bearer\s+(.+)$/i.exec(authorization)?.[1];
  if (!token) {
    res.status(401).json({ error: 'Sign in to use this feature.' });
    return false;
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    res.status(500).json({ error: 'Server authentication is not configured.' });
    return false;
  }

  const client = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  try {
    const { data: { user }, error: authError } = await client.auth.getUser(token);
    if (authError || !user) {
      res.status(401).json({ error: 'Your session is invalid or has expired. Sign in again.' });
      return false;
    }

    const { data: allowed, error: limitError } = await client.rpc('consume_ai_rate_limit', { p_bucket: bucket });
    if (limitError) {
      console.error('[api] AI rate limiter unavailable:', limitError.message);
      res.status(503).json({ error: 'AI service is temporarily unavailable. Please try again shortly.' });
      return false;
    }
    if (allowed !== true) {
      res.setHeader('Retry-After', '60');
      res.status(429).json({ error: 'You are making requests too quickly. Please wait a minute and try again.' });
      return false;
    }
    return true;
  } catch (error) {
    console.error('[api] Authentication failed:', error instanceof Error ? error.message : 'unknown error');
    res.status(503).json({ error: 'Could not verify your session. Please try again.' });
    return false;
  }
};
