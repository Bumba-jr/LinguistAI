import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getWordBreakdown } from '../services/aiService';
import type { Language } from '../store/useAppStore';
import { cn } from '../lib/utils';

type Token = { word: string; translation: string; note?: string };

/**
 * Word-by-word breakdown of target-language text.
 * - Hover a word (desktop) or tap it (mobile) → tooltip with the English meaning
 * - Below the tokens, the full word-for-word mapping is always visible
 *   so mobile users never need to tap to get the translation.
 */
export const WordBreakdown = ({ text, language, dark = false }: {
  text: string; language: Language; dark?: boolean;
}) => {
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [error, setError] = useState(false);
  const [activeToken, setActiveToken] = useState<number | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTokens(null);
    setError(false);
    setActiveToken(null);
    let alive = true;
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
    <div className={cn('rounded-2xl p-4', dark ? 'bg-white/5 border border-white/10' : 'bg-stone-50 border border-stone-100')}>
      <p className={cn('text-[10px] font-black uppercase tracking-[0.15em] mb-3', dark ? 'text-white/30' : 'text-stone-400')}>
        Word by word <span className="font-bold normal-case tracking-normal">— tap or hover a word</span>
      </p>

      {/* interactive tokens */}
      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-3 leading-relaxed">
        {tokens.map((t, i) => {
          const active = activeToken === i;
          return (
            <span
              key={i}
              className="relative inline-block"
              onMouseEnter={() => {
                hoverTimer.current = setTimeout(() => setActiveToken(i), 250);
              }}
              onMouseLeave={() => {
                if (hoverTimer.current) clearTimeout(hoverTimer.current);
              }}
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
              {active && (
                <span className={cn('absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 pointer-events-none max-w-[220px]',
                  'animate-in')}>
                  <span className={cn('block text-[11px] font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap',
                    dark ? 'bg-stone-900 text-white border border-white/10' : 'bg-stone-900 text-white')}>
                    {t.translation || '—'}
                    {t.note && <span className={cn('block text-[9px] font-normal', dark ? 'text-white/40' : 'text-white/50')}>{t.note}</span>}
                  </span>
                  <span className="block w-2 h-2 bg-stone-900 rotate-45 mx-auto -mt-1" />
                </span>
              )}
            </span>
          );
        })}
        <span className={dark ? 'text-white/25' : 'text-stone-300'}> </span>
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
