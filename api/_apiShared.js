/** @param {string} url */
// @ts-ignore
import { createClient } from '@supabase/supabase-js';
/** @typedef {import('@vercel/node').VercelRequest} VercelRequest */
/** @typedef {import('@vercel/node').VercelResponse} VercelResponse */



/** @type {(req: VercelRequest, res: VercelResponse, bucket?: string) => Promise<boolean>} */
export const requireAuthenticatedRequest = async (req, res, bucket = 'ai') => {
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
      // Fail OPEN when the limiter infrastructure is missing (migration not
      // applied yet) so the AI keeps working; fail CLOSED on any other limiter
      // error so a broken limiter never lets requests flood the AI providers.
      const missing = limitError?.code === 'PGRST202' || /could not find the function/i.test(limitError.message);
      if (!missing) {
        console.error('[api] AI rate limiter error:', limitError.message);
        res.status(503).json({ error: 'AI service is temporarily unavailable. Please try again shortly.' });
        return false;
      }
      console.error('[api] RATE LIMITER OFF — run supabase-migration-security-hardening.sql in Supabase to enable per-user rate limiting.');
      return true;
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
