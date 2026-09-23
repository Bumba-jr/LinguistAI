import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { reportError } from '../lib/errorReporter';

interface Props { children: ReactNode }
interface State { error: Error | null }

// Last line of defense around the whole app. Without it, any render crash
// or failed lazy chunk unmounts the React tree and the user sees a silent
// white screen; with it they get a recovery card instead.
class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('LinguistAI crashed:', error, info.componentStack);
    reportError(error, { componentStack: info.componentStack ?? undefined, source: 'ErrorBoundary' });
  }

  override render(): ReactNode {
    if (this.state.error) {
      const staleChunk = /Loading chunk|dynamically imported module|Importing a module script failed/i
        .test(this.state.error.message);
      return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center px-6">
          <div className="max-w-sm w-full bg-white border border-stone-100 rounded-3xl p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h1 className="text-lg font-black text-stone-900 mb-2">
              {staleChunk ? 'The app was just updated' : 'Something went wrong'}
            </h1>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              {staleChunk
                ? 'A new version is live. Tap below to reload and pick up the latest build.'
                : 'An unexpected error occurred. Reloading usually fixes it — your progress is saved.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={15} /> Reload LinguistAI
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
