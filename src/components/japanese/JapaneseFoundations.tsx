import React from 'react';
import { Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText } from '../../services/voiceService';
import {
    JAPANESE_WRITING_FACTS, KANA_ROWS, DAKUTEN_RULES, SOKUON,
    PARTICLE_MASTER, VERB_GROUPS, VERB_FORMS, TE_FORM_USES,
    ADJECTIVE_SYSTEM, COUNTER_SYSTEM, DEMONSTRATIVE_GRID, KEIGO_SYSTEM,
    JAPANESE_CHEAT_SHEET,
} from '../../services/japaneseFoundation';

const Say = ({ text }: { text: string }) => (
    <button onClick={() => speakText(text, 'Japanese')} className="text-stone-300 hover:text-emerald-500 shrink-0" title="Hear it">
        <Volume2 size={13} />
    </button>
);

// ── The Kana chart — hiragana + katakana side by side ────────────────────────
export const KanaChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The Kana table — ひらがな + カタカナ</p>
            <p className="text-[10px] text-stone-300">tap any kana to hear it</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">Two syllabaries, same sounds — learn them together</p>
        <p className="text-xs text-stone-500 mb-4">Hiragana is the grammar backbone, Katakana is for loanwords and emphasis. Watch the lookalikes: シ vs ツ, は vs ほ, シ vs ン.</p>
        <div className="space-y-1.5 mb-5">
            {KANA_ROWS.map(r => (
                <div key={r.row + r.cells[0].hira} className="flex items-center gap-1.5">
                    <span className="w-6 text-[9px] font-black text-stone-300 uppercase shrink-0">{r.row}</span>
                    <div className="flex flex-wrap gap-1">
                        {r.cells.map(c => (
                            <button key={c.hira} onClick={() => speakText(c.hira, 'Japanese')}
                                title={`${c.hira} = ${c.kata} = ${c.romaji}`}
                                className="w-12 rounded-xl border border-stone-100 bg-stone-50 hover:border-emerald-300 text-stone-800 transition-all flex flex-col items-center justify-center py-1">
                                <span className="text-lg font-black leading-none">{c.hira}</span>
                                <span className="text-[9px] text-stone-400 leading-none mt-0.5">{c.kata} · {c.romaji}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Dakuten & handakuten — the voicing marks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-5">
            {DAKUTEN_RULES.map(d => (
                <div key={d.rule} className="bg-stone-50 rounded-xl px-3 py-2">
                    <p className="text-xs font-black text-stone-800">{d.rule}</p>
                    <p className="text-xs font-mono text-violet-500 mt-0.5">{d.examples}</p>
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Small っ and long vowels — meaning changers</p>
        <p className="text-xs text-stone-500 mb-2">{SOKUON.why}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SOKUON.pairs.map(p => (
                <div key={p.short} className="bg-stone-50 rounded-2xl p-3 text-center">
                    <p className="text-sm font-black text-stone-800">{p.short} <span className="text-stone-300">vs</span> {p.long}</p>
                    <p className="text-[10px] text-stone-400">{p.shortEn} / {p.longEn}</p>
                    <div className="flex justify-center mt-1"><Say text={`${p.short}, ${p.long}`} /></div>
                </div>
            ))}
        </div>
    </div>
);

// ── Japanese Foundations — the full static course ────────────────────────────
export const JapaneseFoundations = () => (
    <div className="space-y-4">
        {/* writing system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Three systems, one language</p>
            <p className="text-sm font-black text-stone-900 mb-2">How Japanese is really written</p>
            <p className="text-sm text-stone-600 leading-relaxed">{JAPANESE_WRITING_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="font-bold text-stone-900">{JAPANESE_WRITING_FACTS.example.fr}</p>
                    <p className="text-xs text-stone-400">{JAPANESE_WRITING_FACTS.example.en}</p>
                </div>
                <Say text={JAPANESE_WRITING_FACTS.example.say} />
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">Rōmaji ≠ Pinyin</p>{JAPANESE_WRITING_FACTS.parallel}
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">📋 JLPT note</p>{JAPANESE_WRITING_FACTS.examNote}
                </div>
            </div>
        </div>

        {/* particles */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Particles — the sentence glue</p>
            <p className="text-sm font-black text-stone-900 mb-1">Japanese marks roles with particles, not word order</p>
            <p className="text-xs text-stone-500 mb-3">The verb comes LAST (SOV): 私はご飯を食べます — literally "I + topic + rice + object-marker + eat". Master these and sentences unlock.</p>
            <div className="space-y-2">
                {PARTICLE_MASTER.map(p => (
                    <div key={p.p} className="bg-stone-50 rounded-2xl p-3.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-stone-900 text-base">{p.p}</span>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{p.role}</span>
                            {p.note && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{p.note}</span>}
                        </div>
                        <div className="flex items-center justify-between gap-2 mt-1">
                            <p className="text-xs text-stone-500 flex-1">{p.example}</p>
                            <Say text={p.example.split('(')[0]} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* verb engine */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The verb engine</p>
            <p className="text-sm font-black text-stone-900 mb-1">Three groups, one transformation system</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                {VERB_GROUPS.map(g => (
                    <div key={g.group} className="bg-stone-50 rounded-2xl p-3">
                        <p className="text-xs font-black text-stone-800 mb-1">{g.group}</p>
                        <p className="text-xs text-stone-500">{g.examples}</p>
                    </div>
                ))}
            </div>
            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">The forms of 食べる (to eat)</p>
            <div className="overflow-hidden rounded-2xl border border-stone-100">
                {VERB_FORMS.map((f, i) => (
                    <div key={f.form} className={cn('flex items-center gap-3 px-4 py-2', i % 2 === 0 ? 'bg-white' : 'bg-stone-50')}>
                        <span className="text-[10px] font-black text-violet-500 w-40 shrink-0">{f.form}</span>
                        <span className="text-sm font-bold text-stone-900">{f.example.split('(')[0]}</span>
                        <span className="text-xs text-stone-400 flex-1 min-w-0 truncate">{f.example.slice(f.example.indexOf('(') + 1, f.example.lastIndexOf(')'))} — {f.say}</span>
                        <Say text={f.say} />
                    </div>
                ))}
            </div>
        </div>

        {/* te-form */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The て-form — master connector</p>
            <p className="text-sm font-black text-stone-900 mb-3">One form, ten uses — requests, progressive, permission, prohibition, linking</p>
            <div className="space-y-1.5">
                {TE_FORM_USES.map(t => (
                    <div key={t.use} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-black text-stone-800 uppercase tracking-wider">{t.use}</p>
                            <Say text={t.say || t.example.split('(')[0]} />
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{t.example}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* adjectives */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Two adjective families</p>
            <p className="text-sm font-black text-stone-900 mb-3">い-adjectives conjugate; な-adjectives need な</p>
            <div className="space-y-2">
                {ADJECTIVE_SYSTEM.map(a => (
                    <div key={a.type} className="bg-stone-50 rounded-2xl p-3.5">
                        <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-black text-stone-800">{a.type}</p>
                            <Say text={a.say} />
                        </div>
                        <p className="text-xs text-stone-600 mt-0.5">{a.examples}</p>
                        <p className="text-xs text-violet-600 font-mono mt-0.5">{a.pattern}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* counters */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Counters — counting by shape</p>
            <p className="text-sm font-black text-stone-900 mb-3">Japanese uses a different counter word per object type — with sound changes</p>
            <div className="space-y-1.5">
                {COUNTER_SYSTEM.map(c => (
                    <div key={c.counter} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{c.counter}</p>
                        <p className="text-xs font-mono text-violet-500 mt-0.5">{c.pattern}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* こそあど */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">こそあど — the demonstrative grid</p>
            <p className="text-sm font-black text-stone-900 mb-3">Near me → near you → far from both → question</p>
            <div className="overflow-x-auto rounded-2xl border border-stone-100">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="bg-stone-900 text-white">
                            {['series', 'near me', 'near you', 'over there', 'question'].map(h => <th key={h} className="px-3 py-2 text-left font-black">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {DEMONSTRATIVE_GRID.map(row => (
                            <tr key={row.series} className="bg-white border-t border-stone-100">
                                <td className="px-3 py-2 font-black text-stone-500">{row.series}</td>
                                <td className="px-3 py-2 font-bold text-stone-800">{row.near}</td>
                                <td className="px-3 py-2 text-stone-700">{row.listener}</td>
                                <td className="px-3 py-2 text-stone-700">{row.far}</td>
                                <td className="px-3 py-2 text-stone-700">{row.question}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* keigo */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Keigo — the politeness systems</p>
            <p className="text-sm font-black text-stone-900 mb-3">Three registers that change entire verbs</p>
            <div className="space-y-1.5">
                {KEIGO_SYSTEM.map(k => (
                    <div key={k.type} className="bg-stone-50 rounded-xl px-3 py-2.5">
                        <p className="text-xs font-black text-stone-800">{k.type}</p>
                        <p className="text-xs text-stone-500">{k.use}</p>
                        <p className="text-xs font-bold text-emerald-700 mt-0.5">{k.example}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── The master cheat sheet — every word tappable ─────────────────────────────
export const JapaneseCheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-stone-900 rounded-3xl p-6 text-white">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">カンペ</p>
            <h2 className="text-xl font-black mb-1">The Japanese Master Cheat Sheet</h2>
            <p className="text-xs text-white/50">Everything the JLPT assumes you know — tap any Japanese word for its word card and speaker button.</p>
        </div>
        {JAPANESE_CHEAT_SHEET.map(section => (
            <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                <p className="text-sm font-black text-stone-900 mb-3">{section.title}</p>
                <div className="space-y-2">
                    {section.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-2xl px-3.5 py-2.5">
                            <div className="flex-1 min-w-0">
                                {it.say ? (
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <InteractiveText text={it.say} language="Japanese" className="text-sm font-bold text-stone-900" />
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
