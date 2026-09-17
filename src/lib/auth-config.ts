/**
 * Get the appropriate redirect URL for authentication based on environment
 */
export const getAuthRedirectUrl = (): string => {
  // In production, use the configured app URL
  const prodUrl = import.meta.env.VITE_APP_URL;
  
  // Check if we're in production (Vercel sets VERCEL=1)
  const isProduction = import.meta.env.PROD || import.meta.env.VERCEL === '1';
  
  // If production URL is configured and we're in production, use it
  if (isProduction && prodUrl && prodUrl !== 'https://your-app-name.vercel.app') {
    return prodUrl;
  }
  
  // Otherwise, use current origin (for local development)
  return window.location.origin;
};

/**
 * Get site URL for password reset emails
 */
export const getSiteUrl = (): string => {
  return getAuthRedirectUrl();
};