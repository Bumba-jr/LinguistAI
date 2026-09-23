import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText } from '../../services/voiceService';
import {
    SPANISH_WRITING_FACTS, SPANISH_ALPHABET, SPANISH_VOWELS, VOWEL_STRENGTH,
    SPANISH_VOWEL_COMBINATIONS, SPANISH_CONSONANT_SOUNDS, STRESS_RULES,
    ACCENT_MEANING_TRAPS, TU_USTED_VOS, NUMBER_QUIRKS,
    SPANISH_CHEAT_SHEET,
} from '../../services/spanishFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'Spanish')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The Spanish alphabet chart — 27 letters, tap to hear the name ────────────
export const SpanishAlphabetChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The Spanish alphabet</p>
            <p className="text-[10px] text-stone-300">tap any letter to hear its Spanish name</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">27 letters — English's 26 plus Ñ</p>
        <p className="text-xs text-stone-500 mb-4">Spanish spelling is phonetic: once you know the sound rules you can write what you hear. The traps are the silent H, the B/V twins, the rolled RR, and where the tildes go.</p>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 mb-5">
            {SPANISH_ALPHABET.map(l => (
                <button key={l.letter} onClick={() => speakText(l.letter, 'Spanish')} title={l.note || undefined}
                    className={cn('h-12 rounded-xl border font-black text-lg transition-all flex flex-col items-center justify-center leading-none',
                        l.note ? 'bg-amber-50/60 border-amber-100 text-stone-900 hover:border-amber-300' : 'bg-stone-50 border-stone-100 text-stone-800 hover:border-emerald-300')}>
                    <span>{l.letter}</span>
                    <span className="text-[8px] font-bold text-stone-400 mt-0.5">{l.name}</span>
                </button>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">The five vowels — pure, short, never reduced</p>
        <div className="space-y-1.5 mb-5">
            {SPANISH_VOWELS.map(v => (
                <div key={v.letter} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="text-2xl font-black text-stone-900 w-10 text-center shrink-0">{v.letter}</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-stone-800">"{v.sound}"</p>
                        <p className="text-xs text-stone-500">{v.note}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700 shrink-0">{v.sample}</span>
                    <Say text={v.sample} />
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Vowel combinations (diphthongs)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {SPANISH_VOWEL_COMBINATIONS.map(c => (
                <div key={c.combo} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="font-black text-stone-900 text-sm w-16 shrink-0">{c.combo}</span>
                    <span className="text-xs font-mono text-violet-500 w-20 shrink-0">{c.sound}</span>
                    <span className="text-xs text-stone-600 flex-1 min-w-0 truncate">{c.sample.w} — {c.sample.en}</span>
                    <Say text={c.sample.w} />
                </div>
            ))}
        </div>
    </div>
);

// ── Spanish Foundations — the full static course ─────────────────────────────
export const SpanishFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Does Spanish have characters?</p>
            <p className="text-sm font-black text-stone-900 mb-2">No — and that is good news</p>
            <p className="text-sm text-stone-600 leading-relaxed">{SPANISH_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{SPANISH_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{SPANISH_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={SPANISH_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">Ñ is its own letter</p>{SPANISH_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">📋 DELE note</p>{SPANISH_WRITING_FACTS.examNote}
                </div>
            </div>
        </div>

        {/* consonant system — the real traps */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The consonant system</p>
            <p className="text-sm font-black text-stone-900 mb-1">Letters that don't behave like English</p>
            <p className="text-xs text-stone-500 mb-4">Master these rules once and you can pronounce EVERY Spanish word — spelling is phonetic. Tap each example to hear it.</p>
            <div className="space-y-2">
                {SPANISH_CONSONANT_SOUNDS.map(c => (
                    <div key={c.sound} className="bg-stone-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-sm">{c.sound}</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">≈ {c.english}</span>
                            <div className="flex-1" />
                            <span className="text-sm font-bold text-stone-800">{c.sample.w}</span>
                            <Say text={c.sample.w} />
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{c.mouth}</p>
                        <p className="text-[10px] font-mono text-violet-500 mt-0.5">"{c.sample.spoken}" — {c.sample.en}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* stress + tildes — the system that decides every accent mark */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Stress & accent marks (tildes)</p>
            <p className="text-sm font-black text-stone-900 mb-1">The four stress types decide every tilde</p>
            <p className="text-xs text-stone-500 mb-4">{VOWEL_STRENGTH.why}</p>
            <div className="space-y-2">
                {STRESS_RULES.map(r => (
                    <div key={r.type} className="bg-stone-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-sm">{r.type}</span>
                            <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">{r.rule}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{r.default}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {r.examples.map((e, i) => (
                                <span key={i} className="text-[10px] font-bold bg-white text-stone-600 border border-stone-100 px-2 py-1 rounded-lg">
                                    {e.w}: {e.why}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-5 mb-2">Tilde pairs that change meaning</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ACCENT_MEANING_TRAPS.map(t => (
                    <div key={t.pair[0]} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="font-black text-stone-900 text-sm">{t.pair[0]} → <span className="text-emerald-600">{t.pair[1]}</span></span>
                        <span className="text-xs text-stone-500 flex-1">{t.note}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* register: tú / usted / vos / vosotros */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The register system</p>
            <p className="text-sm font-black text-stone-900 mb-1">Four ways to say "you" — DELE grades your choice</p>
            <div className="space-y-1.5">
                {TU_USTED_VOS.map(f => (
                    <div key={f.form} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-sm">{f.form}</span>
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{f.region}</span>
                            <span className="text-xs font-bold text-emerald-700 ml-auto">{f.example}</span>
                            <Say text={f.example} />
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{f.use}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* numbers */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Number quirks</p>
            <p className="text-sm font-black text-stone-900 mb-3">The patterns English speakers get wrong</p>
            <div className="space-y-1.5">
                {NUMBER_QUIRKS.map(q => (
                    <div key={q.pattern} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{q.pattern}</p>
                        <p className="text-xs text-stone-500">{q.why}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── The master cheat sheet — 16 sections, every word tappable ────────────────
export const SpanishCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-stone-900 rounded-3xl p-6 text-white">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">La chuleta</p>
            <h2 className="text-xl font-black mb-1">The Spanish Master Cheat Sheet</h2>
            <p className="text-xs text-white/50">Everything the DELE assumes you know — tap any Spanish word for its word card and speaker button.</p>
        </div>
        {SPANISH_CHEAT_SHEET.map(section => (
            <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-3">{section.title}</p>
                <div className="space-y-2">
                    {section.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-2xl px-3.5 py-2.5">
                            <div className="flex-1 min-w-0">
                                {it.say ? (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <InteractiveText text={it.say} language="Spanish" className="text-sm font-bold text-stone-900" />
                                        <Say text={it.say} />
                                    </div>
                                ) : (
                                    <p className="text-sm font-bold text-stone-900">{it.label}</p>
                                )}
                                <p className="text-xs text-stone-500 mt-0.5">{it.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);
