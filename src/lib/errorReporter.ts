import { supabase } from './supabase';

// Fire-and-forget client error reporting into the Supabase client_errors
// table (see supabase-migration-full-schema.sql). Without this, production
// crashes are invisible until a user happens to report them.
//
// The reporter must NEVER throw, recurse, or flood the database: all of its
// own failures are swallowed, and identical messages are deduplicated per
// session with a hard cap.

const REPORTED_KEY = 'linguistai-reported-errors';
const MAX_REPORTS_PER_SESSION = 10;

let sessionReports = 0;

const shouldReport = (message: string): string | null => {
  if (sessionReports >= MAX_REPORTS_PER_SESSION) return null;
  const short = message.slice(0, 200);
  try {
    const seen: string[] = JSON.parse(sessionStorage.getItem(REPORTED_KEY) || '[]');
    if (seen.includes(short)) return null;
    sessionStorage.setItem(REPORTED_KEY, JSON.stringify([...seen.slice(-19), short]));
  } catch { /* storage unavailable — session cap still applies */ }
  sessionReports++;
  return short;
};

export const reportError = (error: unknown, context?: { componentStack?: string; source?: string }) => {
  try {
    const message = error instanceof Error ? error.message : String(error);
    const deduped = shouldReport(message);
    if (!deduped) return;
    const stack = error instanceof Error ? error.stack : null;
    void (async () => {
      try {
        await supabase.from('client_errors').insert({
          message: deduped,
          stack: stack?.slice(0, 4000) ?? null,
          component_stack: context?.componentStack?.slice(0, 4000) ?? null,
          source: context?.source ?? null,
          url: window.location.href.slice(0, 500),
          user_agent: navigator.userAgent.slice(0, 300),
        });
      } catch (insertError: any) {
        console.warn('Error report skipped:', insertError?.message ?? insertError);
      }
    })();
  } catch { /* never throw from the reporter */ }
};
