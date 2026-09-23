import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText } from '../../services/voiceService';
import {
    GERMAN_WRITING_FACTS, GERMAN_ALPHABET, GERMAN_UMLAUTS, VOWEL_LENGTH,
    GERMAN_VOWEL_COMBINATIONS, GERMAN_CONSONANT_SOUNDS, CAPITALIZATION_RULE,
    CASE_TABLE, DU_SIE, WORD_ORDER_RULES, GERMAN_NUMBER_QUIRKS,
    GERMAN_CHEAT_SHEET,
} from '../../services/germanFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'German')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The German alphabet chart — 30 characters, tap to hear the name ──────────
export const GermanAlphabetChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The German alphabet</p>
            <p className="text-[10px] text-stone-300">tap any letter to hear its German name</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">26 letters + Ä Ö Ü ß — the writing is easy, the sounds are the work</p>
        <p className="text-xs text-stone-500 mb-4">J is "yot" (ja = yah), W is "veh" (Wasser = VAH-ser), Z is "tsett" (Zeit = tsite), sp/st at word start are shp/sht — and H after a vowel only makes it longer.</p>
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 mb-5">
            {GERMAN_ALPHABET.map(l => (
                <button key={l.letter} onClick={() => speakText(l.letter, 'German')} title={l.note || undefined}
                    className={cn('h-12 rounded-xl border font-black text-lg transition-all flex flex-col items-center justify-center leading-none',
                        l.note ? 'bg-amber-50/60 border-amber-100 text-stone-900 hover:border-amber-300' : 'bg-stone-50 border-stone-100 text-stone-800 hover:border-emerald-300')}>
                    <span>{l.letter}</span>
                    <span className="text-[8px] font-bold text-stone-400 mt-0.5">{l.name}</span>
                </button>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">The three umlauts — new sounds, not decoration</p>
        <div className="space-y-1.5 mb-5">
            {GERMAN_UMLAUTS.map(u => (
                <div key={u.pair[0]} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="text-2xl font-black text-stone-900 w-16 text-center shrink-0">{u.pair[0]}→{u.pair[1]}</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-stone-800">{u.sound}</p>
                        <p className="text-xs text-stone-500">{u.meaning}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-700 shrink-0">{u.sample}</span>
                    <Say text={u.sample} />
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Vowel combinations — ei vs ie is THE trap</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {GERMAN_VOWEL_COMBINATIONS.map(c => (
                <div key={c.combo} className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2">
                    <span className="font-black text-stone-900 text-sm w-16 shrink-0">{c.combo}</span>
                    <span className="text-xs font-mono text-violet-500 w-24 shrink-0">{c.sound}</span>
                    <span className="text-xs text-stone-600 flex-1 min-w-0 truncate">{c.sample.w} — {c.sample.en}</span>
                    <Say text={c.sample.w} />
                </div>
            ))}
        </div>
    </div>
);

// ── German Foundations — the full static course ─────────────────────────────
export const GermanFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Does German have characters?</p>
            <p className="text-sm font-black text-stone-900 mb-2">No — but it has three systems English lacks</p>
            <p className="text-sm text-stone-600 leading-relaxed">{GERMAN_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{GERMAN_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{GERMAN_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={GERMAN_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">Ä Ö Ü ß are real letters</p>{GERMAN_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">📋 Goethe note</p>{GERMAN_WRITING_FACTS.examNote}
                </div>
            </div>
        </div>

        {/* long vs short vowels */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Long vs short vowels</p>
            <p className="text-sm font-black text-stone-900 mb-1">The difference changes words</p>
            <p className="text-xs text-stone-500 mb-3">{VOWEL_LENGTH.why}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {VOWEL_LENGTH.pairs.map(p => (
                    <div key={p.short} className="bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-2">
                        <div>
                            <p className="text-sm font-black text-stone-800">{p.short} <span className="text-stone-400 font-bold">vs</span> {p.long}</p>
                            <p className="text-[10px] text-stone-400">{p.shortEn} / {p.longEn}</p>
                        </div>
                        <Say text={`${p.short}, ${p.long}`} />
                    </div>
                ))}
            </div>
        </div>

        {/* consonant system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The consonant system</p>
            <p className="text-sm font-black text-stone-900 mb-1">Letters that don't behave like English</p>
            <p className="text-xs text-stone-500 mb-4">Master these rules once and you can pronounce EVERY German word — including the two ch sounds and the shp/sht rule.</p>
            <div className="space-y-2">
                {GERMAN_CONSONANT_SOUNDS.map(c => (
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

        {/* capitalisation */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Capitalisation</p>
            <p className="text-sm font-black text-stone-900 mb-1">Every noun is capitalised — always</p>
            <p className="text-sm text-stone-800 font-semibold mb-2">{CAPITALIZATION_RULE.rule}</p>
            <p className="text-xs text-stone-500 mb-2">{CAPITALIZATION_RULE.why}</p>
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-xs text-amber-800">{CAPITALIZATION_RULE.traps}</div>
        </div>

        {/* the case system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The four cases — the heart of German</p>
            <p className="text-sm font-black text-stone-900 mb-1">The article carries the grammar</p>
            <p className="text-xs text-stone-500 mb-3">{CASE_TABLE.why}</p>
            <div className="overflow-x-auto rounded-2xl border border-stone-100 mb-3">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="bg-stone-900 text-white">
                            {CASE_TABLE.header.map(h => <th key={h} className="px-3 py-2 text-left font-black">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {CASE_TABLE.rows.map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                                {row.map((cell, j) => (
                                    <td key={j} className={cn('px-3 py-2 font-bold', j === 0 ? 'text-stone-500' : 'text-stone-900 text-center text-sm')}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-xs text-emerald-800">{CASE_TABLE.quick}</div>
        </div>

        {/* du / Sie */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The register system</p>
            <p className="text-sm font-black text-stone-900 mb-1">du, ihr, Sie — the verb changes with them</p>
            <div className="space-y-1.5">
                {DU_SIE.map(f => (
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

        {/* word order */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Word order — the most German thing there is</p>
            <p className="text-sm font-black text-stone-900 mb-1">Verb = position 2 · 1 · or the very END</p>
            <p className="text-xs text-stone-500 mb-3">This one concept explains most German confusion. Memorise the positions, not individual sentences.</p>
            <div className="space-y-2">
                {WORD_ORDER_RULES.map(r => (
                    <div key={r.pattern} className="bg-stone-50 rounded-2xl p-3.5">
                        <p className="text-xs font-black text-stone-800">{r.pattern}</p>
                        <div className="flex items-center justify-between gap-2 mt-1">
                            <p className="text-xs text-stone-500 flex-1">{r.examples}</p>
                            <Say text={r.examples.split('.')[0] + '.'} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* numbers */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Number quirks</p>
            <p className="text-sm font-black text-stone-900 mb-3">The patterns English speakers get wrong</p>
            <div className="space-y-1.5">
                {GERMAN_NUMBER_QUIRKS.map(q => (
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
export const GermanCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-stone-900 rounded-3xl p-6 text-white">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Der Spickzettel</p>
            <h2 className="text-xl font-black mb-1">The German Master Cheat Sheet</h2>
            <p className="text-xs text-white/50">Everything the Goethe-Zertifikat assumes you know — tap any German word for its word card and speaker button.</p>
        </div>
        {GERMAN_CHEAT_SHEET.map(section => (
            <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-3">{section.title}</p>
                <div className="space-y-2">
                    {section.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-2xl px-3.5 py-2.5">
                            <div className="flex-1 min-w-0">
                                {it.say ? (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <InteractiveText text={it.say} language="German" className="text-sm font-bold text-stone-900" />
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
