import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { speakText } from '../../services/voiceService';
import {
    FRENCH_WRITING_FACTS, FRENCH_ALPHABET, FRENCH_ACCENTS, ACCENT_MEANING_TRAPS,
    FRENCH_SOUND_GROUPS, FRENCH_PRONUNCIATION_RULES, TU_VOUS, NUMBER_QUIRKS,
    FRENCH_CHEAT_SHEET,
} from '../../services/frenchFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'French')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The French Alphabet chart — the tappable A-Z with French letter names ────
export const FrenchAlphabetChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The French alphabet</p>
            <p className="text-[10px] text-stone-300">tap any letter to hear its French name</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">26 letters — same as English, different names & sounds</p>
        <p className="text-xs text-stone-500 mb-4">Spelling French is easy; the work is in how letters BEHAVE. G is "zhay", J is "zhee", R is guttural, U is rounded — and H never sounds at all.</p>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 mb-5">
            {FRENCH_ALPHABET.map(l => (
                <button key={l.letter} onClick={() => speakText(l.letter, 'French')} title={l.note || undefined}
                    className={cn('h-12 rounded-xl border font-black text-lg transition-all flex flex-col items-center justify-center leading-none',
                        l.note ? 'bg-amber-50/60 border-amber-100 text-stone-900 hover:border-amber-300' : 'bg-stone-50 border-stone-100 text-stone-800 hover:border-emerald-300')}>
                    <span>{l.letter}</span>
                    <span className="text-[8px] font-bold text-stone-400 mt-0.5">{l.name}</span>
                </button>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">The accented letters</p>
        <div className="space-y-1.5">
            {FRENCH_ACCENTS.map(a => (
                <div key={a.name} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="text-2xl font-black text-stone-900 w-10 text-center shrink-0">{a.letter}</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-stone-800">{a.name}</p>
                        <p className="text-xs text-stone-500">{a.does}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700 shrink-0">{a.sample}</span>
                    <Say text={a.sample} />
                </div>
            ))}
        </div>
    </div>
);

// ── French Foundations — the full static course ─────────────────────────────
export const FrenchFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Does French have characters?</p>
            <p className="text-sm font-black text-stone-900 mb-2">No — here is what French has instead</p>
            <p className="text-sm text-stone-600 leading-relaxed">{FRENCH_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{FRENCH_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{FRENCH_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={FRENCH_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">The two-form rule</p>{FRENCH_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">🇨🇦 Canada note</p>{FRENCH_WRITING_FACTS.canadaNote}
                </div>
            </div>
        </div>

        {/* accents that change meaning */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Accents change meaning</p>
            <p className="text-sm font-black text-stone-900 mb-1">The exam traps — same letters, different words</p>
            <p className="text-xs text-stone-500 mb-3">In Chinese, the tone changes the word (mā → mà). In French, the ACCENT does:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ACCENT_MEANING_TRAPS.map((t, i) => (
                    <div key={i} className="bg-amber-50/60 border border-amber-100 rounded-2xl p-3 flex items-center gap-2">
                        <span className="font-black text-stone-900 text-sm">{t.a.w}</span>
                        <span className="text-[11px] text-stone-500">{t.a.en}</span>
                        <span className="text-stone-300 font-black">↔</span>
                        <span className="font-black text-emerald-700 text-sm">{t.b.w}</span>
                        <span className="text-[11px] text-stone-500 flex-1">{t.b.en}</span>
                        <Say text={`${t.a.w}, ${t.b.w}`} />
                    </div>
                ))}
            </div>
        </div>

        {/* the sounds */}
        {FRENCH_SOUND_GROUPS.map(g => (
            <div key={g.group} className="bg-white rounded-3xl border border-stone-100 p-6">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">French sounds English doesn't have</p>
                <p className="text-sm font-black text-stone-900 mb-1">{g.group}</p>
                <p className="text-xs text-stone-500 mb-3">{g.note}</p>
                <div className="space-y-2">
                    {g.sounds.map(s => (
                        <div key={s.sound} className="border border-stone-100 rounded-2xl p-3.5 space-y-1.5 bg-stone-50/50">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-black font-mono text-stone-900">{s.sound}</span>
                                <Say text={s.sample.w} />
                            </div>
                            <p className="text-xs text-stone-600"><span className="font-black text-stone-700">Sounds like: </span>{s.english}</p>
                            <p className="text-xs text-stone-600"><span className="font-black text-stone-700">Mouth: </span>{s.mouth}</p>
                            <p className="text-xs font-bold text-stone-700">{s.sample.w} <span className="font-mono text-violet-500">{s.sample.ipa}</span> <span className="text-stone-400 font-normal">— {s.sample.en}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        {/* pronunciation rules */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Spelling ≠ sound — the rules that run French</p>
            <p className="text-sm text-stone-600 mb-3">This is the French equivalent of tone pairs: learn these once, and written French stops being a mystery.</p>
            <div className="space-y-2">
                {FRENCH_PRONUNCIATION_RULES.map((r, i) => (
                    <div key={i} className="border border-stone-100 rounded-2xl p-3.5 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-black text-stone-900">{r.rule}</p>
                            <Say text={r.example.w} />
                        </div>
                        <p className="text-xs text-stone-600">{r.detail}</p>
                        <p className="text-xs font-bold text-stone-700">{r.example.w} <span className="font-mono text-violet-500">{r.example.spoken}</span> <span className="text-stone-400 font-normal">— {r.example.en}</span></p>
                    </div>
                ))}
            </div>
        </div>

        {/* tu vs vous */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Tu vs Vous — the register system</p>
            <p className="text-sm font-black text-stone-900 mb-3">Chinese marks politeness with 您; French with the whole verb form</p>
            <div className="space-y-2">
                {TU_VOUS.map((r, i) => (
                    <div key={i} className={cn('rounded-2xl p-3.5 border', r.form === 'exam rule' ? 'bg-emerald-50 border-emerald-100' : 'bg-stone-50 border-stone-100')}>
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-black text-stone-900 font-mono">{r.form}</p>
                            {r.example && <Say text={r.example} />}
                        </div>
                        {r.when && <p className="text-xs text-stone-600 mt-0.5"><span className="font-black">Use for: </span>{r.when}</p>}
                        {r.verb && <p className="text-xs text-stone-500 mt-0.5 font-mono">{r.verb}</p>}
                        {r.example && <p className="text-xs font-bold text-stone-700 mt-0.5">{r.example}</p>}
                    </div>
                ))}
            </div>
        </div>

        {/* numbers 70-99 */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Numbers 70–99 — the famous French maths</p>
            <p className="text-sm font-black text-stone-900 mb-1">France does arithmetic in its number names</p>
            <p className="text-xs text-stone-500 mb-3">70 is "sixty-ten", 80 is "four-twenties", 99 is "four-twenty-ten-nine". TCF listening tests these constantly.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NUMBER_QUIRKS.map(n => (
                    <button key={n.n} onClick={() => speakText(n.say, 'French')}
                        className="flex items-center gap-3 bg-stone-50 hover:bg-stone-100 rounded-2xl px-3 py-2.5 text-left transition-colors">
                        <span className="text-xs font-black text-white bg-stone-400 rounded-lg px-1.5 py-0.5 w-9 text-center shrink-0">{n.n}</span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-black text-stone-900 truncate">{n.fr}</p>
                            <p className="text-[10px] text-stone-400">{n.logic}</p>
                        </div>
                        <Volume2 size={13} className="text-stone-300 shrink-0" />
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// ── The French Cheat Sheet ──────────────────────────────────────────────────
export const FrenchCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The cheat sheet</p>
            <p className="text-sm font-black text-stone-900">All of essential French on one page</p>
            <p className="text-xs text-stone-500 mt-1">Articles, gender, the verb patterns, past & future, questions, negation, connectors, numbers, survival phrases — skim it daily until it's automatic.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FRENCH_CHEAT_SHEET.map(section => (
                <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">{section.title}</p>
                    <div className="space-y-2">
                        {section.items.map((it, i) => (
                            <div key={i} className="flex items-start gap-2.5 border-b border-stone-50 last:border-0 pb-2 last:pb-0">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-xs font-black text-stone-900 whitespace-nowrap">{it.label}</span>
                                    {it.say && <Say text={it.say} />}
                                </div>
                                <span className="text-[11px] text-stone-500 flex-1">{it.detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
