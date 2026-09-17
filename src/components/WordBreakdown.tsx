import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { getWordBreakdown, type BreakdownToken } from '../services/aiService';
import type { Language } from '../store/useAppStore';
import { cn } from '../lib/utils';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/** Tooltip content: meaning, grammar tag, base form, inflection table, explanation. */
const TooltipBody = ({ token, dark }: { token: BreakdownToken; dark: boolean }) => (
  <div className={cn(
    'w-max max-w-[300px] text-left rounded-2xl shadow-2xl p-3.5 space-y-2',
    dark ? 'bg-[#0d1526] border border-white/15 text-white' : 'bg-stone-900 text-white'
  )}>
    <div>
      <span className="text-sm font-black">{token.word}</span>
      <span className={cn('mx-1.5', dark ? 'text-white/30' : 'text-white/40')}>—</span>
      <span className="text-sm font-semibold text-emerald-300">{token.translation || '—'}</span>
    </div>
    {token.note && (
      <p className={cn('text-[10px] font-bold uppercase tracking-wider', dark ? 'text-white/45' : 'text-white/50')}>
        {token.note}
      </p>
    )}
    {token.base && (
      <p className={cn('text-xs', dark ? 'text-white/70' : 'text-white/80')}>
        from <span className="font-bold text-amber-300">{token.base}</span>
        {token.baseTranslation && <> — {token.baseTranslation}</>}
      </p>
    )}
    {token.forms && token.forms.length > 0 && (
      <div className="grid grid-cols-2 gap-1">
        {token.forms.map((f, fi) => (
          <div key={fi} className={cn('flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[11px]',
            dark ? 'bg-white/5' : 'bg-white/10')}>
            <span className={cn('font-bold', dark ? 'text-white/50' : 'text-white/60')}>{f.form}</span>
            <span className="font-semibold">{f.value}</span>
          </div>
        ))}
      </div>
    )}
    {token.explanation && (
      <p className={cn('text-[11px] leading-relaxed', dark ? 'text-white/60' : 'text-white/70')}>
        {token.explanation}
      </p>
    )}
  </div>
);

/**
 * One underlined word with a portal-rendered tooltip. The tooltip is fixed
 * to the viewport and clamped on both sides, so it can never be clipped by
 * card containers or scroll areas. Hover (desktop) or tap (mobile) to open.
 * All clicks stop propagation — safe inside tappable cards.
 */
const BreakdownWord = ({ token, dark }: { token: BreakdownToken; dark: boolean }) => {
  const [active, setActive] = useState(false);
  const [renderPos, setRenderPos] = useState<{ top: number; left: number; below: boolean; cx: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<{ cx: number; top: number; bottom: number } | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    anchorRef.current = { cx: r.left + r.width / 2, top: r.top, bottom: r.bottom };
    setRenderPos(null);
    setActive(true);
  };
  const close = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setActive(false);
    setRenderPos(null);
  };

  // measure the tooltip once rendered, then clamp it into the viewport
  useLayoutEffect(() => {
    if (!active) return;
    const el = tipRef.current;
    const a = anchorRef.current;
    if (!el || !a) return;
    const tw = el.offsetWidth;
    const th = el.offsetHeight;
    const left = clamp(a.cx - tw / 2, 8, window.innerWidth - tw - 8);
    const below = a.top - th - 12 < 8; // not enough room above → open downward
    setRenderPos({
      top: below ? a.bottom + 10 : a.top - th - 10,
      left,
      below,
      cx: a.cx,
    });
  }, [active]);

  // close on scroll (position would go stale) and on outside tap
  useEffect(() => {
    if (!active) return;
    const onScroll = () => close();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t) || tipRef.current?.contains(t)) return;
      close();
    };
    window.addEventListener('scroll', onScroll, true);
    document.addEventListener('pointerdown', onDown, true);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      document.removeEventListener('pointerdown', onDown, true);
    };
  }, [active]);

  useEffect(() => () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); }, []);

  return (
    <>
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); active ? close() : open(); }}
        onMouseEnter={() => { hoverTimer.current = setTimeout(open, 220); }}
        onMouseLeave={close}
        className={cn(
          'underline decoration-dotted underline-offset-[5px] decoration-[1.5px] transition-colors cursor-help',
          dark
            ? `text-white ${active ? 'decoration-emerald-400 text-emerald-300' : 'decoration-white/30 hover:text-emerald-300'}`
            : `text-stone-900 ${active ? 'decoration-emerald-500 text-emerald-600' : 'decoration-stone-300 hover:text-emerald-600'}`
        )}
      >
        {token.word}
      </button>
      {active && createPortal(
        <div
          ref={tipRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-[9999]"
          style={renderPos
            ? { top: renderPos.top, left: renderPos.left }
            : { top: -9999, left: -9999 } // hidden off-screen until measured
          }
        >
          {renderPos && (
            <span
              className={cn('absolute w-2.5 h-2.5 rotate-45',
                renderPos.below
                  ? `-top-1 ${dark ? 'bg-[#0d1526] border-l border-t border-white/15' : 'bg-stone-900'}`
                  : `-bottom-1 ${dark ? 'bg-[#0d1526] border-r border-b border-white/15' : 'bg-stone-900'}`)}
              style={{ left: clamp(renderPos.cx - renderPos.left - 5, 10, (tipRef.current?.offsetWidth ?? 300) - 15) }}
            />
          )}
          <TooltipBody token={token} dark={dark} />
        </div>,
        document.body
      )}
    </>
  );
};

/**
 * Renders target-language text where every word is underlined and shows a
 * rich English tooltip on hover/tap. Fetches (and caches) the word-by-word
 * breakdown; falls back to plain text while loading or on failure.
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
    <span className={className} onClick={(e) => e.stopPropagation()}>
      {tokens.map((t, i) => (
        <React.Fragment key={i}>
          {i > 0 && ' '}
          <BreakdownWord token={t} dark={dark} />
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

  useEffect(() => {
    let alive = true;
    setTokens(null);
    setError(false);
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

      <div className="flex flex-wrap gap-x-1 gap-y-2 mb-3 leading-relaxed">
        {tokens.map((t, i) => (
          <React.Fragment key={i}>
            {i > 0 && ' '}
            <BreakdownWord token={t} dark={dark} />
          </React.Fragment>
        ))}
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
