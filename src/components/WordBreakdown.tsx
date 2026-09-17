import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getWordBreakdown, type BreakdownToken } from '../services/aiService';
import type { Language } from '../store/useAppStore';
import { cn } from '../lib/utils';

/**
 * Rich tooltip for a single word: English meaning, grammar tag, the base
 * dictionary form with its own meaning, the inflection table (je/tu/il…,
 * le/la/les…) and a short usage explanation — everything an English speaker
 * needs to understand WHY the word looks the way it does.
 */
const TokenTooltip = ({ token, dark }: { token: BreakdownToken; dark: boolean }) => (
  <span
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
    onClick={(e) => e.stopPropagation()}
  >
    <span className={cn(
      'block w-max max-w-[300px] text-left rounded-2xl shadow-2xl p-3.5 space-y-2 whitespace-normal',
      dark ? 'bg-[#0d1526] border border-white/15 text-white' : 'bg-stone-900 text-white'
    )}>
      {/* meaning */}
      <span className="block">
        <span className="text-sm font-black">{token.word}</span>
        <span className={cn('mx-1.5', dark ? 'text-white/30' : 'text-white/40')}>—</span>
        <span className="text-sm font-semibold text-emerald-300">{token.translation || '—'}</span>
      </span>
      {/* grammar tag */}
      {token.note && (
        <span className={cn('block text-[10px] font-bold uppercase tracking-wider', dark ? 'text-white/45' : 'text-white/50')}>
          {token.note}
        </span>
      )}
      {/* base form */}
      {token.base && (
        <span className={cn('block text-xs', dark ? 'text-white/70' : 'text-white/80')}>
          from <span className="font-bold text-amber-300">{token.base}</span>
          {token.baseTranslation && <> — {token.baseTranslation}</>}
        </span>
      )}
      {/* inflection table */}
      {token.forms && token.forms.length > 0 && (
        <span className="grid grid-cols-2 gap-1">
          {token.forms.map((f, fi) => (
            <span key={fi} className={cn('flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[11px]',
              dark ? 'bg-white/5' : 'bg-white/10')}>
              <span className={cn('font-bold', dark ? 'text-white/50' : 'text-white/60')}>{f.form}</span>
              <span className="font-semibold">{f.value}</span>
            </span>
          ))}
        </span>
      )}
      {/* explanation */}
      {token.explanation && (
        <span className={cn('block text-[11px] leading-relaxed', dark ? 'text-white/60' : 'text-white/70')}>
          {token.explanation}
        </span>
      )}
    </span>
    <span className={cn('block w-2.5 h-2.5 rotate-45 mx-auto -mt-1.5',
      dark ? 'bg-[#0d1526] border-b border-r border-white/15' : 'bg-stone-900')} />
  </span>
);

/** Underlined interactive token — hover (desktop) or tap (mobile) to open. */
const InteractiveToken = ({ token, language, dark, onSpeak }: {
  token: BreakdownToken; language: Language; dark: boolean; onSpeak?: (word: string) => void;
}) => {
  const [active, setActive] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => { hoverTimer.current = setTimeout(() => setActive(true), 220); }}
      onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); setActive(false); }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); setActive(a => !a); onSpeak?.(token.word); }}
        className={cn(
          'underline decoration-dotted underline-offset-[5px] decoration-[1.5px] transition-colors cursor-help',
          dark
            ? `text-white ${active ? 'decoration-emerald-400 text-emerald-300' : 'decoration-white/30 hover:text-emerald-300'}`
            : `text-stone-900 ${active ? 'decoration-emerald-500 text-emerald-600' : 'decoration-stone-300 hover:text-emerald-600'}`
        )}
      >
        {token.word}
      </button>
      {active && <TokenTooltip token={token} dark={dark} />}
    </span>
  );
};

/**
 * Renders target-language text where every word is underlined and shows a
 * rich English tooltip on hover/tap. Fetches (and caches) the word-by-word
 * breakdown; falls back to plain text while loading or on failure.
 * Clicks never bubble — safe to use inside tappable cards.
 */
export const InteractiveText = ({ text, language, dark = false, className }: {
  text: string; language: Language; dark?: boolean; className?: string;
}) => {
  const [tokens, setTokens] = useState<BreakdownToken[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setTokens(null);
    setFailed(false);
    getWordBreakdown(text, language)
      .then((t) => { if (alive) setTokens(t); })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [text, language]);

  // Plain fallback while loading / on error — content is always readable
  if (failed || !tokens || tokens.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn(className)} onClick={(e) => e.stopPropagation()}>
      {tokens.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <InteractiveToken token={t} language={language} dark={dark} />
        </React.Fragment>
      ))}
    </span>
  );
};

/**
 * Word-by-word mapping block (always visible — mobile friendly) used under
 * the flashcard word. Uses the same rich breakdown data.
 */
export const WordBreakdown = ({ text, language, dark = false }: {
  text: string; language: Language; dark?: boolean;
}) => {
  const [tokens, setTokens] = useState<BreakdownToken[] | null>(null);
  const [error, setError] = useState(false);
  const [activeToken, setActiveToken] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;
    setTokens(null);
    setError(false);
    setActiveToken(null);
    getWordBreakdown(text, language)
      .then((t) => { if (alive) setTokens(t); })
      .catch(() => { if (alive) setError(true); });
    return () => { alive = false; };
  }, [text, language]);

  if (error) return null;
  if (!tokens) {
    return (
      <div className={cn('flex items-center gap-2 text-xs', dark ? 'text-white/30' : 'text-stone-300')}>
        <Loader2 size={12} className="animate-spin" /> Breaking down word by word…
      </div>
    );
  }
  if (tokens.length === 0) return null;

  return (
    <div className={cn('rounded-2xl p-4', dark ? 'bg-white/5 border border-white/10' : 'bg-stone-50 border border-stone-100')}
      onClick={(e) => e.stopPropagation()}>
      <p className={cn('text-[10px] font-black uppercase tracking-[0.15em] mb-3', dark ? 'text-white/30' : 'text-stone-400')}>
        Word by word <span className="font-bold normal-case tracking-normal">— tap or hover a word for details</span>
      </p>

      {/* interactive tokens */}
      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-3 leading-relaxed">
        {tokens.map((t, i) => {
          const active = activeToken === i;
          return (
            <span
              key={i}
              className="relative inline-block"
              onMouseEnter={() => { hoverTimer.current = setTimeout(() => setActiveToken(i), 220); }}
              onMouseLeave={() => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setActiveToken(active ? null : i); }}
                className={cn('font-semibold underline decoration-dotted underline-offset-4 transition-colors',
                  dark
                    ? `text-white ${active ? 'decoration-emerald-400 text-emerald-300' : 'decoration-white/25 hover:text-emerald-300'}`
                    : `text-stone-800 ${active ? 'decoration-emerald-500 text-emerald-600' : 'decoration-stone-300 hover:text-emerald-600'}`)}
              >
                {t.word}
              </button>
              {active && <TokenTooltip token={t} dark={dark} />}
            </span>
          );
        })}
      </div>

      {/* always-visible mapping — mobile friendly */}
      <div className="flex flex-wrap gap-1.5">
        {tokens.map((t, i) => (
          <span key={i} className={cn('inline-flex items-baseline gap-1.5 px-2 py-1 rounded-lg text-[11px]',
            dark ? 'bg-white/5 text-white/60' : 'bg-white text-stone-500 border border-stone-100')}>
            <span className={cn('font-bold', dark ? 'text-white/90' : 'text-stone-800')}>{t.word}</span>
            <span className={dark ? 'text-white/25' : 'text-stone-300'}>→</span>
            <span>{t.translation}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
