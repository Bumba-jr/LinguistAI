import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText } from '../../services/voiceService';
import {
    ITALIAN_WRITING_FACTS, ITALIAN_ALPHABET, DOUBLE_CONSONANTS, C_G_RULES,
    SOUND_UNITS, ITALIAN_ACCENTS, ARTICLE_SYSTEM, PLURAL_PATTERNS,
    PRONOUN_SYSTEM, ITALIAN_NUMBER_QUIRKS,
    ITALIAN_CHEAT_SHEET,
} from '../../services/italianFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'Italian')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The Italian alphabet chart — 21 native letters + 5 foreign ───────────────
export const ItalianAlphabetChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The Italian alphabet</p>
            <p className="text-[10px] text-stone-300">tap any letter to hear its Italian name</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">21 native letters — J K W X Y live only in loanwords</p>
        <p className="text-xs text-stone-500 mb-4">Italian spelling is the most systematic in Europe — but the details matter: double consonants change meaning (nono vs nonno), ch/gh shield hard c/g, and H is always silent (ho, hanno).</p>
        <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 mb-5">
            {ITALIAN_ALPHABET.map(l => (
                <button key={l.letter} onClick={() => speakText(l.letter, 'Italian')} title={l.note || undefined}
                    className={cn('h-12 rounded-xl border font-black text-lg transition-all flex flex-col items-center justify-center leading-none',
                        l.note ? 'bg-amber-50/60 border-amber-100 text-stone-900 hover:border-amber-300' : 'bg-stone-50 border-stone-100 text-stone-800 hover:border-emerald-300')}>
                    <span>{l.letter}</span>
                    <span className="text-[8px] font-bold text-stone-400 mt-0.5">{l.name}</span>
                </button>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Double consonants — hold them twice as long</p>
        <p className="text-xs text-stone-500 mb-2">{DOUBLE_CONSONANTS.why}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {DOUBLE_CONSONANTS.pairs.map(p => (
                <div key={p.single} className="bg-stone-50 rounded-2xl p-3 text-center">
                    <p className="text-sm font-black text-stone-800">{p.single} <span className="text-stone-300">vs</span> {p.double}</p>
                    <p className="text-[10px] text-stone-400">{p.singleEn} / {p.doubleEn}</p>
                    <div className="flex justify-center mt-1"><Say text={`${p.single}, ${p.double}`} /></div>
                </div>
            ))}
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-xs text-violet-800">{DOUBLE_CONSONANTS.drill}</div>
    </div>
);

// ── Italian Foundations — the full static course ─────────────────────────────
export const ItalianFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Does Italian have characters?</p>
            <p className="text-sm font-black text-stone-900 mb-2">No — but it has Europe's richest article system</p>
            <p className="text-sm text-stone-600 leading-relaxed">{ITALIAN_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{ITALIAN_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{ITALIAN_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={ITALIAN_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">No neuter gender</p>{ITALIAN_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">📋 CILS note</p>{ITALIAN_WRITING_FACTS.examNote}
                </div>
            </div>
        </div>

        {/* c & g + sound units */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The spelling-to-sound rules</p>
            <p className="text-sm font-black text-stone-900 mb-1">c, g, sc and the characteristic sound units</p>
            <div className="space-y-1.5 mb-4">
                {C_G_RULES.map(r => (
                    <div key={r.rule} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="text-xs font-black text-stone-800 w-44 shrink-0">{r.rule}</span>
                        <span className="text-xs font-mono text-violet-500 flex-1 min-w-0 truncate">{r.examples}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                {SOUND_UNITS.map(u => (
                    <div key={u.sound} className="bg-stone-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-sm">{u.sound}</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">≈ {u.english}</span>
                            <span className="text-xs text-stone-600 flex-1 min-w-0 truncate">{u.examples}</span>
                            <span className="text-sm font-bold text-stone-800">{u.sample}</span>
                            <Say text={u.sample} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* accents */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Accents — à è é ì ò ù</p>
            <p className="text-sm font-black text-stone-900 mb-1">Written mainly on final stressed vowels</p>
            <div className="space-y-1.5">
                {ITALIAN_ACCENTS.map(a => (
                    <div key={a.pair[0]} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{Array.isArray(a.pair) ? a.pair.join(' / ') : a.pair}</p>
                        <p className="text-xs text-stone-500">{a.note}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* the article system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The article system</p>
            <p className="text-sm font-black text-stone-900 mb-1">Seven definite articles — the sound that follows decides</p>
            <p className="text-xs text-stone-500 mb-3">{ARTICLE_SYSTEM.why}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                {ARTICLE_SYSTEM.definite.map(a => (
                    <div key={a.article} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="font-black text-stone-900 text-sm w-12 shrink-0">{a.article}</span>
                        <span className="text-xs text-stone-500 flex-1 min-w-0 truncate">{a.before}</span>
                        <span className="text-xs font-bold text-emerald-700 shrink-0">{a.sample}</span>
                        <Say text={a.sample} />
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Indefinite articles</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {ARTICLE_SYSTEM.indefinite.map(a => (
                    <div key={a.article} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="font-black text-stone-900 text-sm w-12 shrink-0">{a.article}</span>
                        <span className="text-xs text-stone-500 flex-1 min-w-0 truncate">{a.before}</span>
                        <span className="text-xs font-bold text-emerald-700 shrink-0">{a.sample}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* plurals */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Plurals — five patterns</p>
            <p className="text-sm font-black text-stone-900 mb-1">Italian changes the ENDING, never adds s</p>
            <div className="space-y-1.5">
                {PLURAL_PATTERNS.map(p => (
                    <div key={p.pattern} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{p.pattern}</p>
                        <p className="text-xs font-mono text-violet-500 mt-0.5">{p.examples}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* pronouns & pro-drop */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Pronouns & pro-drop</p>
            <p className="text-sm font-black text-stone-900 mb-1">Italians drop the subject — the ending already says who</p>
            <div className="space-y-1.5">
                {PRONOUN_SYSTEM.map(f => (
                    <div key={f.form} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-sm">{f.form}</span>
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
                {ITALIAN_NUMBER_QUIRKS.map(q => (
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
export const ItalianCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-stone-900 rounded-3xl p-6 text-white">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Il Cheat Sheet</p>
            <h2 className="text-xl font-black mb-1">The Italian Master Cheat Sheet</h2>
            <p className="text-xs text-white/50">Everything CILS assumes you know — tap any Italian word for its word card and speaker button.</p>
        </div>
        {ITALIAN_CHEAT_SHEET.map(section => (
            <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-3">{section.title}</p>
                <div className="space-y-2">
                    {section.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-2xl px-3.5 py-2.5">
                            <div className="flex-1 min-w-0">
                                {it.say ? (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <InteractiveText text={it.say} language="Italian" className="text-sm font-bold text-stone-900" />
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
