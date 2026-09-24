import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText } from '../../services/voiceService';
import {
    PORTUGUESE_WRITING_FACTS, PORTUGUESE_ACCENTS, ACCENT_MEANING_TRAPS,
    NASAL_SYSTEM, PRONUNCIATION_RULES, ARTICLE_SYSTEM, CONTRACTIONS,
    CLITIC_SYSTEM, PT_VS_BR, PORTUGUESE_NUMBER_QUIRKS,
    PORTUGUESE_CHEAT_SHEET,
} from '../../services/portugueseFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'Portuguese')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The accents & orthography chart — tap to hear ────────────────────────────
export const PortugueseAccentsChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The accent system</p>
            <p className="text-[10px] text-stone-300">tap any example to hear it</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">Five marks — á à â ã ç — each with its own job</p>
        <p className="text-xs text-stone-500 mb-4">The tilde (ã, õ) is the sound English speakers forget first, and the accents change family members: avó is your grandmother, avô your grandfather.</p>
        <div className="space-y-1.5 mb-5">
            {PORTUGUESE_ACCENTS.map(a => (
                <div key={a.mark} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="text-xl font-black text-stone-900 w-36 shrink-0">{a.mark}</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-stone-500">{a.does}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700 shrink-0">{a.sample}</span>
                    <Say text={a.sample.split(',')[0]} />
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Accents that change people</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {ACCENT_MEANING_TRAPS.map(t => (
                <div key={t.pair[0]} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="font-black text-stone-900 text-sm">{t.pair[0]} → <span className="text-emerald-600">{t.pair[1]}</span></span>
                    <span className="text-xs text-stone-500 flex-1">{t.note}</span>
                </div>
            ))}
        </div>
    </div>
);

// ── Portuguese Foundations — the full static course ──────────────────────────
export const PortugueseFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">One spelling, two accents</p>
            <p className="text-sm font-black text-stone-900 mb-2">European Portuguese is the target — Brazil is the comparison</p>
            <p className="text-sm text-stone-600 leading-relaxed">{PORTUGUESE_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{PORTUGUESE_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{PORTUGUESE_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={PORTUGUESE_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">Autocarro vs ônibus</p>{PORTUGUESE_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">📋 CAPLE note</p>{PORTUGUESE_WRITING_FACTS.examNote}
                </div>
            </div>
        </div>

        {/* pronunciation — the European reality */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The pronunciation system</p>
            <p className="text-sm font-black text-stone-900 mb-1">European Portuguese sounds nothing like its spelling</p>
            <p className="text-xs text-stone-500 mb-3">Master these rules and the r/rr, the final-s as sh, the four x sounds, and the famous vowel reduction stop being mysteries.</p>
            <div className="space-y-2">
                {PRONUNCIATION_RULES.map(c => (
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

        {/* nasals */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Nasal vowels</p>
            ã õ -am -em -im — sounds English does not have
            <div className="space-y-1.5 mt-2">
                {NASAL_SYSTEM.map(n => (
                    <div key={n.sound} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="font-black text-stone-900 text-sm w-24 shrink-0">{n.sound}</span>
                        <span className="text-xs text-stone-600 flex-1 min-w-0 truncate">{n.examples}</span>
                        <Say text={n.sample} />
                    </div>
                ))}
            </div>
        </div>

        {/* articles + contractions */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Articles & contractions</p>
            <p className="text-sm font-black text-stone-900 mb-1">Four articles, eight contractions — learn them as one grid</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                {ARTICLE_SYSTEM.map(a => (
                    <div key={a.article} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="font-black text-stone-900 text-sm w-16 shrink-0">{a.article}</span>
                        <span className="text-xs text-stone-500 flex-1 min-w-0 truncate">{a.before}</span>
                        <span className="text-xs font-bold text-emerald-700 shrink-0">{a.sample}</span>
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Preposition + article contractions</p>
            <div className="space-y-1.5">
                {CONTRACTIONS.map(c => (
                    <div key={c.rule} className="bg-stone-50 rounded-xl px-3 py-2">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-black text-stone-800">{c.rule} → <span className="text-emerald-600">{c.result}</span></p>
                            {c.say && <Say text={c.say} />}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">{c.example}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* clitics */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Clitic pronouns — the European system</p>
            <p className="text-sm font-black text-stone-900 mb-1">Before the verb or after? Portugal has rules</p>
            <div className="space-y-1.5 mb-3">
                {CLITIC_SYSTEM.map(c => (
                    <div key={c.type} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{c.type}</p>
                        <p className="text-xs text-stone-500">{c.use}</p>
                        <p className="text-xs font-bold text-emerald-700 mt-0.5">{c.example}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* PT vs BR */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Portugal vs Brazil</p>
            <p className="text-sm font-black text-stone-900 mb-1">Two standards, one language — never mix them</p>
            <div className="overflow-x-auto rounded-2xl border border-stone-100">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="bg-stone-900 text-white">
                            <th className="px-3 py-2 text-left font-black">area</th>
                            <th className="px-3 py-2 text-left font-black">🇵🇹 Portugal</th>
                            <th className="px-3 py-2 text-left font-black">🇧🇷 Brazil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PT_VS_BR.map(row => (
                            <tr key={row.area} className="bg-white border-t border-stone-100">
                                <td className="px-3 py-2 font-black text-stone-500">{row.area}</td>
                                <td className="px-3 py-2 font-bold text-stone-800">{row.pt}</td>
                                <td className="px-3 py-2 text-stone-600">{row.br}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* numbers */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Number quirks</p>
            <p className="text-sm font-black text-stone-900 mb-3">The patterns English speakers get wrong</p>
            <div className="space-y-1.5">
                {PORTUGUESE_NUMBER_QUIRKS.map(q => (
                    <div key={q.pattern} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{q.pattern}</p>
                        <p className="text-xs text-stone-500">{q.why}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── The master cheat sheet — every word tappable ─────────────────────────────
export const PortugueseCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-stone-900 rounded-3xl p-6 text-white">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">O Cheat Sheet</p>
            <h2 className="text-xl font-black mb-1">The Portuguese Master Cheat Sheet</h2>
            <p className="text-xs text-white/50">Everything CAPLE assumes you know — tap any Portuguese word for its word card and speaker button.</p>
        </div>
        {PORTUGUESE_CHEAT_SHEET.map(section => (
            <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-3">{section.title}</p>
                <div className="space-y-2">
                    {section.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-2xl px-3.5 py-2.5">
                            <div className="flex-1 min-w-0">
                                {it.say ? (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <InteractiveText text={it.say} language="Portuguese" className="text-sm font-bold text-stone-900" />
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
