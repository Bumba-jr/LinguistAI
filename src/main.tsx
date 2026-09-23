import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { reportError } from './lib/errorReporter.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

// Global safety net: anything that escapes React's boundary (async crashes,
// unhandled rejections) still gets reported so production failures are visible.
window.addEventListener('error', (e) => {
  if (e.error) reportError(e.error, { source: 'window.onerror' });
});
window.addEventListener('unhandledrejection', (e) => {
  reportError(e.reason instanceof Error ? e.reason : new Error(String(e.reason)), { source: 'unhandledrejection' });
});

// Register the service worker for offline support + installability.
// Only on production deploys — avoid caching stale dev builds.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // SW registration failures are non-fatal — app works online-only
    });
  });
}
