/**
 * Get the redirect URL for authentication flows.
 *
 * Always returns the origin the app is actually running on (localhost in dev,
 * the Vercel domain in production). That origin must be allow-listed in
 * Supabase → Authentication → URL Configuration → Redirect URLs; if it isn't,
 * Supabase silently falls back to the Site URL after login.
 */
export const getAuthRedirectUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return import.meta.env.VITE_APP_URL || 'http://localhost:5173';
};

/**
 * Get site URL for password reset emails
 */
export const getSiteUrl = (): string => {
  return getAuthRedirectUrl();
};
