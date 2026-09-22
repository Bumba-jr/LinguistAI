import React, { useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, CheckCircle2, XCircle, RotateCcw, Eye, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InteractiveText } from '../WordBreakdown';
import { speakText, stopSpeaking } from '../../services/voiceService';
import {
    generateHskListening, generateHskReading,
    HskListening, HskReading, HskLevel,
    TONE_SETS, NEUTRAL_TONE_WORDS, TONE_SANDHI,
    MANDARIN_FACTS, PINYIN_INITIAL_GROUPS, PINYIN_FINAL_GROUPS, SPELLING_RULES,
    TONE_PAIR_WORDS, SOUND_CONTRASTS, BASIC_STROKES, STROKE_ORDER_RULES,
    CHARACTER_INTRO, CHEAT_SHEET,
} from '../../services/hskService';
import { logWeakness } from '../../services/hskStorage';

// ── shared exercise bits ─────────────────────────────────────────────────────
export const LevelBar = ({ level, onLevelChange }: { level: HskLevel; onLevelChange: (l: HskLevel) => void }) => (
    <div className="flex gap-1.5 flex-wrap">
        {(['1', '2', '3', '4', '5', '6'] as HskLevel[]).map(l => (
            <button key={l} onClick={() => onLevelChange(l)}
                className={cn('px-3.5 py-1.5 rounded-xl text-xs font-black transition-colors',
                    level === l ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-500 hover:border-stone-400')}>
                HSK {l}
            </button>
        ))}
    </div>
);

type MCQProps = {
    q: { question: string; options: string[]; answer: string };
    i: number;
    picked: string | undefined;
    onPick: (opt: string) => void;
};
export const MCQ = ({ q, i, picked, onPick }: MCQProps) => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5">
        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">Question {i + 1}</p>
        <p className="text-sm font-bold text-stone-800 mb-3">{q.question}</p>
        <div className="grid grid-cols-1 gap-2">
            {q.options.map((opt, oi) => {
                const revealed = picked !== undefined;
                return (
                    <button key={oi} onClick={() => { if (!revealed) onPick(opt); }}
                        className={cn('text-left px-4 py-2.5 rounded-2xl border text-xs font-medium transition-all',
                            revealed
                                ? opt === q.answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                    : opt === picked ? 'bg-red-50 border-red-200 text-red-500'
                                        : 'bg-white border-stone-100 text-stone-400'
                                : 'bg-white border-stone-200 text-stone-700 hover:border-indigo-300 hover:bg-indigo-50/50')}>
                        {opt}
                    </button>
                );
            })}
        </div>
    </div>
);

// 汉字 — pinyin — English: the three-form rule, everywhere
export const ZHEn = ({ hanzi, pinyin, en, dark = false, speak = true }: { hanzi: string; pinyin?: string; en: string; dark?: boolean; speak?: boolean }) => (
    <div className="space-y-0.5">
        <div className="flex items-center justify-between gap-2">
            <InteractiveText text={hanzi} language="Chinese" dark={dark}
                className={cn('block font-semibold', dark ? 'text-white' : 'text-stone-900')} />
            {speak && <button onClick={() => speakText(hanzi, 'Chinese')} className={cn('shrink-0', dark ? 'text-white/40 hover:text-white' : 'text-stone-300 hover:text-emerald-500')}><Volume2 size={13} /></button>}
        </div>
        {pinyin && <p className={cn('text-xs font-mono', dark ? 'text-amber-300/80' : 'text-violet-500')}>{pinyin}</p>}
        <p className={cn('text-sm', dark ? 'text-white/50' : 'text-stone-400')}>{en}</p>
    </div>
);

const TONE_COLORS = ['', 'text-red-500', 'text-amber-500', 'text-violet-500', 'text-blue-500'];

// ── The Pinyin Chart — compact, tappable, always-visible reference ──────────
// (There is no Chinese "alphabet" — this chart IS the closest thing: the
// complete sound inventory every syllable is built from.)
export const PinyinChart = () => (
    <div className="bg-white rounded-3xl border border-stone-100 p-5 sm:p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-1 mb-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">The pinyin chart</p>
            <p className="text-[10px] text-stone-300">tap any sound to hear it</p>
        </div>
        <p className="text-sm font-black text-stone-900 mb-1">The closest thing to a Chinese "alphabet"</p>
        <p className="text-xs text-stone-500 mb-4">Strictly there is no Chinese alphabet — pinyin is the complete <b>sound system</b>: 21 initials + 36 finals + 4 tones build every one of the ~400 Mandarin syllables. This is the whole inventory.</p>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">21 initials — the starts of syllables</p>
        <div className="space-y-1.5 mb-4">
            {PINYIN_INITIAL_GROUPS.map(g => (
                <div key={g.group} className="flex items-center gap-1.5 flex-wrap">
                    {g.initials.map(it => (
                        <button key={it.sound} onClick={() => speakText(it.sample.hanzi, 'Chinese')} title={`${it.sample.hanzi} ${it.sample.pinyin} — ${it.sample.en}`}
                            className="w-11 h-11 rounded-xl bg-stone-50 hover:bg-emerald-50 hover:border-emerald-200 border border-stone-100 font-black font-mono text-sm text-stone-800 transition-all flex items-center justify-center">
                            {it.sound}
                        </button>
                    ))}
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">36 finals — the rhymes</p>
        <div className="space-y-1.5 mb-4">
            {PINYIN_FINAL_GROUPS.map(g => (
                <div key={g.name} className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-black text-stone-300 uppercase tracking-wider w-14 shrink-0">{g.name.split(' ')[0]}</span>
                    {g.finals.map(f => {
                        const sampleHanzi = f.sample?.hanzi;
                        const Cell = (
                            <span className="px-2.5 h-8 rounded-lg bg-stone-50 border border-stone-100 font-mono text-xs font-bold text-stone-700 flex items-center justify-center">
                                {f.sound}
                            </span>
                        );
                        return sampleHanzi
                            ? <button key={f.sound} onClick={() => speakText(sampleHanzi, 'Chinese')} title={`${f.sample.pinyin} — ${f.sample.en}`} className="hover:bg-emerald-50 hover:border-emerald-200 transition-all">{Cell}</button>
                            : <span key={f.sound} className="opacity-80">{Cell}</span>;
                    })}
                </div>
            ))}
        </div>

        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">The tones</p>
        <div className="flex gap-1.5">
            {[{ m: 'ā', t: 1 }, { m: 'á', t: 2 }, { m: 'ǎ', t: 3 }, { m: 'à', t: 4 }, { m: 'a', t: 0 }].map(x => (
                <div key={x.t} className={cn('flex-1 h-10 rounded-xl border border-stone-100 flex items-center justify-center font-black text-lg bg-stone-50',
                    x.t === 0 ? 'text-stone-400' : TONE_COLORS[x.t])}>
                    {x.m}
                </div>
            ))}
        </div>
        <p className="text-[10px] text-stone-300 mt-3 text-center">Initial + Final + Tone = every syllable in Mandarin</p>
    </div>
);

// ── The Cheat Sheet — the whole language on one card ────────────────────────
export const CheatSheet = () => (
    <div className="space-y-4">
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The cheat sheet</p>
            <p className="text-sm font-black text-stone-900">All of essential Chinese on one page</p>
            <p className="text-xs text-stone-500 mt-1">Tones, sandhi, word order, particles, measure words, question words, connectors, numbers, time, survival phrases — skim it daily until it's automatic.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHEAT_SHEET.map(section => (
                <div key={section.title} className="bg-white rounded-3xl border border-stone-100 p-5">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-[0.15em] mb-3">{section.title}</p>
                    <div className="space-y-2">
                        {section.items.map((it, i) => (
                            <div key={i} className="flex items-start gap-2.5 border-b border-stone-50 last:border-0 pb-2 last:pb-0">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="text-xs font-black text-stone-900 whitespace-nowrap">{it.label}</span>
                                    {it.say && <button onClick={() => speakText(it.say, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={11} /></button>}
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

// ── Pinyin Foundation Course — the complete system, in study order ──────────
export const PinyinGuide = () => (
    <div className="space-y-4">
        {/* Phase 0 — Understanding Mandarin */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Phase 0 · Understanding Mandarin</p>
            <p className="text-sm font-black text-stone-900 mb-2">Pinyin is not the alphabet</p>
            <p className="text-sm text-stone-600 leading-relaxed">{MANDARIN_FACTS.intro}</p>
            <div className="mt-3 bg-stone-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                <div>
                    <p className="text-lg font-black text-stone-900">{MANDARIN_FACTS.example.hanzi}</p>
                    <p className="text-xs font-mono text-violet-500">{MANDARIN_FACTS.example.pinyin}</p>
                </div>
                <p className="text-xs text-stone-500 flex-1">{MANDARIN_FACTS.example.en}</p>
                <button onClick={() => speakText(MANDARIN_FACTS.example.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={15} /></button>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 text-blue-800">
                    <p className="font-black mb-1">Simplified 简体字</p>{MANDARIN_FACTS.simplifiedNote}
                </div>
                <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-violet-800">
                    <p className="font-black mb-1">The syllable math</p>{MANDARIN_FACTS.syllableMath}
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-3 text-amber-800 sm:col-span-2">
                    <p className="font-black mb-1">Mandarin vs Cantonese</p>{MANDARIN_FACTS.cantoneseNote}
                </div>
            </div>
            <p className="mt-3 text-[11px] font-black text-stone-400 uppercase tracking-widest text-center">The order: {MANDARIN_FACTS.order}</p>
        </div>

        {/* Syllable structure */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">How a syllable works</p>
            <p className="text-sm font-black text-stone-900 mb-2">Every syllable = Initial + Final + Tone</p>
            <div className="space-y-2">
                {[
                    { hanzi: '你', parts: 'n + i + 3rd tone', pinyin: 'nǐ', en: 'you' },
                    { hanzi: '好', parts: 'h + ao + 3rd tone', pinyin: 'hǎo', en: 'good' },
                    { hanzi: '吗', parts: '(no initial) + a + neutral', pinyin: 'ma', en: 'question particle' },
                ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2">
                        <span className="text-xl font-black text-stone-900 w-8 text-center">{s.hanzi}</span>
                        <span className="text-xs font-mono text-violet-500 w-32 shrink-0">{s.pinyin}</span>
                        <span className="text-xs font-bold text-stone-600 flex-1">{s.parts}</span>
                        <span className="text-xs text-stone-400 shrink-0">{s.en}</span>
                        <button onClick={() => speakText(s.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={13} /></button>
                    </div>
                ))}
            </div>
        </div>

        {/* The 21 initials */}
        {PINYIN_INITIAL_GROUPS.map(g => (
            <div key={g.group} className="bg-white rounded-3xl border border-stone-100 p-6">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The 21 initials</p>
                <p className="text-lg font-black text-stone-900 font-mono mb-1">{g.group}</p>
                <p className="text-xs text-stone-500 mb-3">{g.note}</p>
                <div className="space-y-2">
                    {g.initials.map(it => (
                        <div key={it.sound} className="border border-stone-100 rounded-2xl p-3.5 space-y-1.5 bg-stone-50/50">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black font-mono text-stone-900">{it.sound}</span>
                                    <span className="text-xs text-stone-500">{it.english}</span>
                                </div>
                                <button onClick={() => speakText(it.sample.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={14} /></button>
                            </div>
                            <p className="text-xs text-stone-600"><span className="font-black text-stone-700">Mouth: </span>{it.mouth}</p>
                            <p className="text-xs text-amber-700"><span className="font-black">Watch out: </span>{it.mistake}</p>
                            <p className="text-xs font-bold text-stone-700">{it.sample.hanzi} <span className="font-mono text-violet-500">{it.sample.pinyin}</span> <span className="text-stone-400 font-normal">— {it.sample.en}</span></p>
                        </div>
                    ))}
                </div>
            </div>
        ))}

        {/* The finals */}
        {PINYIN_FINAL_GROUPS.map(g => (
            <div key={g.name} className="bg-white rounded-3xl border border-stone-100 p-6">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The 36 finals</p>
                <p className="text-sm font-black text-stone-900 mb-1">{g.name}</p>
                <p className="text-xs text-stone-500 mb-3">{g.note}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {g.finals.map(f => (
                        <div key={f.sound} className="bg-stone-50 rounded-2xl p-3 space-y-0.5">
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-black font-mono text-stone-900">{f.sound}</p>
                                {f.sample && <button onClick={() => speakText(f.sample.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={13} /></button>}
                            </div>
                            <p className="text-xs text-stone-500">{f.english}</p>
                            {f.sample && <p className="text-xs font-bold text-stone-600">{f.sample.hanzi} <span className="font-mono text-violet-500">{f.sample.pinyin}</span> <span className="text-stone-400 font-normal">— {f.sample.en}</span></p>}
                        </div>
                    ))}
                </div>
            </div>
        ))}

        {/* The four tones */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The 4 tones + neutral</p>
            <p className="text-sm font-black text-stone-900 mb-1">The tone mark tells you the pitch — read it and know the tone instantly</p>
            <div className="space-y-1.5 mt-3">
                {[
                    { mark: 'ā', tone: 1, contour: '─────', desc: 'High and flat — hold a high, level note', word: { hanzi: '妈', pinyin: 'mā', en: 'mother' } },
                    { mark: 'á', tone: 2, contour: '╱', desc: 'Rising — like asking "Really?"', word: { hanzi: '麻', pinyin: 'má', en: 'hemp' } },
                    { mark: 'ǎ', tone: 3, contour: '╲╱', desc: 'Falling-rising — but don\'t exaggerate; in real speech it is usually a low dip', word: { hanzi: '马', pinyin: 'mǎ', en: 'horse' } },
                    { mark: 'à', tone: 4, contour: '╲', desc: 'Sharp fall — starts high, drops firmly', word: { hanzi: '骂', pinyin: 'mà', en: 'to scold' } },
                    { mark: 'a', tone: 0, contour: '·', desc: 'Neutral — short, light, unstressed (no tone mark)', word: { hanzi: '吗', pinyin: 'ma', en: 'question particle' } },
                ].map(t => (
                    <div key={t.tone} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2.5">
                        <span className={cn('text-xl font-black w-10 text-center', t.tone === 0 ? 'text-stone-400' : TONE_COLORS[t.tone])}>{t.mark}</span>
                        <span className={cn('font-mono text-stone-400 w-14 text-center text-sm shrink-0', t.tone === 0 && 'text-stone-300')}>{t.contour}</span>
                        <span className="text-xs text-stone-600 flex-1">{t.desc}</span>
                        <span className="text-xs font-bold text-stone-700 shrink-0">{t.word.hanzi} <span className="font-mono text-violet-500">{t.word.pinyin}</span></span>
                        <button onClick={() => speakText(t.word.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={13} /></button>
                    </div>
                ))}
            </div>
        </div>

        {/* 16 tone combinations */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The 16 tone combinations</p>
            <p className="text-sm font-black text-stone-900 mb-1">Train tone PAIRS, not just single syllables</p>
            <p className="text-xs text-stone-500 mb-3">Two-syllable words are where tones get hard. Tap each to hear a real word with that tone pattern — train your ear through all 16.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TONE_PAIR_WORDS.map(t => (
                    <button key={t.pair} onClick={() => speakText(t.hanzi, 'Chinese')}
                        className="flex items-center gap-3 bg-stone-50 hover:bg-stone-100 rounded-2xl px-3 py-2.5 text-left transition-colors">
                        <span className="text-[10px] font-black text-white bg-stone-400 rounded-lg px-1.5 py-0.5 w-9 text-center shrink-0">{t.pair}</span>
                        <span className="text-base font-black text-stone-900">{t.hanzi}</span>
                        <span className="text-xs font-mono text-violet-500 flex-1 truncate">{t.pinyin}</span>
                        <span className="text-[11px] text-stone-400 truncate max-w-[110px]">{t.en}</span>
                        <Volume2 size={13} className="text-stone-300 shrink-0" />
                    </button>
                ))}
            </div>
        </div>

        {/* Tone sandhi */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Tone sandhi — tones change in real speech</p>
            <p className="text-sm text-stone-600 mb-3">You write one tone but say another. Learners who skip this sound robotic.</p>
            <div className="space-y-2">
                {TONE_SANDHI.map((s, i) => (
                    <div key={i} className="bg-amber-50 border border-amber-100 rounded-2xl p-3.5">
                        <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">{s.rule}</p>
                        <div className="flex items-center justify-between gap-2">
                            <div>
                                <p className="font-bold text-stone-900">{s.example.hanzi} <span className="text-xs font-mono text-stone-400 line-through">{s.example.written}</span> → <span className="text-xs font-mono text-emerald-600">{s.example.spoken}</span></p>
                                <p className="text-xs text-stone-500">{s.example.en}</p>
                            </div>
                            <button onClick={() => speakText(s.example.hanzi, 'Chinese')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={14} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {NEUTRAL_TONE_WORDS.map((w, i) => (
                    <div key={i} className="bg-stone-50 rounded-2xl p-3">
                        <ZHEn hanzi={w.hanzi} pinyin={w.pinyin} en={w.en} />
                    </div>
                ))}
            </div>
        </div>

        {/* Spelling rules */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Pinyin spelling rules</p>
            <div className="space-y-2">
                {SPELLING_RULES.map((r, i) => (
                    <div key={i} className="border border-stone-100 rounded-2xl p-3.5">
                        <p className="text-sm font-black text-stone-900">{r.rule}</p>
                        <p className="text-xs text-stone-600 mt-0.5">{r.detail}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── Characters Guide — what characters ARE, their components, the strokes ────
export const CharactersGuide = () => (
    <div className="space-y-4">
        {/* Unit 17 — what are characters */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">What are characters?</p>
            <p className="text-sm font-black text-stone-900 mb-2">Not letters, not always words — meaning units built from parts</p>
            <p className="text-sm text-stone-600 leading-relaxed">{CHARACTER_INTRO.intro}</p>
        </div>

        {/* radicals */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Radicals</p>
            <p className="text-sm font-black text-stone-900 mb-1">The meaning-carrying components</p>
            <p className="text-xs text-stone-500 mb-3">Spot the radical and you know the family the character belongs to — water, mouth, person…</p>
            <div className="space-y-2">
                {CHARACTER_INTRO.radicals.map(r => (
                    <div key={r.radical} className="flex items-center gap-3 bg-stone-50 rounded-xl px-3 py-2.5">
                        <span className="text-2xl font-black text-stone-900 w-8 text-center shrink-0">{r.radical}</span>
                        <span className="text-xs font-black text-emerald-700 w-36 shrink-0">{r.name}</span>
                        <span className="text-xs text-stone-500 flex-1">{r.appearsIn}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* phono-semantic */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">How most characters are made</p>
            <p className="text-sm font-black text-stone-900 mb-3">Meaning part + sound part</p>
            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5 text-center">
                <p className="text-5xl font-black text-stone-900 mb-2">{CHARACTER_INTRO.phonetic.hanzi}</p>
                <p className="text-sm font-bold text-stone-700">{CHARACTER_INTRO.phonetic.parts}</p>
                <p className="text-sm text-stone-600 mt-1">{CHARACTER_INTRO.phonetic.result}</p>
            </div>
            <p className="text-xs text-stone-500 mt-3 leading-relaxed">{CHARACTER_INTRO.phonetic.note}</p>
        </div>

        {/* the stroke system */}
        <div className="bg-white rounded-3xl border border-stone-100 p-6">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">The stroke system</p>
            <p className="text-sm font-black text-stone-900 mb-1">8 basic strokes build every character</p>
            <p className="text-xs text-stone-500 mb-3">Handwriting is not required for the modern exam, but knowing strokes is how you describe, remember and look up characters.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {BASIC_STROKES.map(s => (
                    <div key={s.pinyin} className="bg-stone-50 rounded-2xl p-3 text-center">
                        <p className="text-2xl font-black text-stone-900">{s.hanzi}</p>
                        <p className="text-xs font-mono text-violet-500">{s.pinyin}</p>
                        <p className="text-[10px] text-stone-400 mt-1 leading-snug">{s.en}</p>
                    </div>
                ))}
            </div>
            <p className="text-sm font-black text-stone-900 mb-2">Stroke order principles</p>
            <div className="space-y-1.5">
                {STROKE_ORDER_RULES.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                        <span className="font-black text-stone-800">{r.rule}</span>
                        <span className="text-stone-400">— {r.example}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── Sound contrast trainer — hear a word, pick which of the confusable pair ──
export const SoundContrastTrainer = () => {
    const [current, setCurrent] = useState<{ c: (typeof SOUND_CONTRASTS)[0]; target: 'a' | 'b'; round: number } | null>(null);
    const [picked, setPicked] = useState<'a' | 'b' | null>(null);
    const [score, setScore] = useState({ right: 0, total: 0 });
    const [playing, setPlaying] = useState(false);

    const nextRound = () => {
        const c = SOUND_CONTRASTS[Math.floor(Math.random() * SOUND_CONTRASTS.length)];
        const target: 'a' | 'b' = Math.random() < 0.5 ? 'a' : 'b';
        setCurrent({ c, target, round: (current?.round || 0) + 1 });
        setPicked(null);
    };

    const play = () => {
        if (!current) return;
        setPlaying(true);
        speakText(current.c[current.target].hanzi, 'Chinese', () => setPlaying(false));
    };

    const pick = (side: 'a' | 'b') => {
        if (!current || picked !== null) return;
        setPicked(side);
        const right = side === current.target;
        setScore(s => ({ right: s.right + (right ? 1 : 0), total: s.total + 1 }));
        if (!right) logWeakness({ skill: 'tones', level: current.c.contrast, question: `Which did you hear: ${current.c.a.pinyin} or ${current.c.b.pinyin}?`, chosen: side === 'a' ? current.c.a.pinyin : current.c.b.pinyin, answer: current.c[current.target].pinyin });
    };

    const pct = score.total ? Math.round((score.right / score.total) * 100) : 0;

    return (
        <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <p className="font-black text-stone-900">Difficult sound contrasts</p>
                    <p className="text-xs text-stone-400 mt-0.5">The pairs English ears merge: sh/s, zh/z, q/ch, an/ang… Hear a word → which of the pair was it?</p>
                </div>
                {score.total > 0 && (
                    <span className={cn('text-xs font-black px-3 py-1.5 rounded-xl', pct >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                        {score.right}/{score.total} · {pct}%
                    </span>
                )}
            </div>

            {!current ? (
                <button onClick={nextRound}
                    className="w-full py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <Play size={15} /> Start ear training
                </button>
            ) : (
                <>
                    <button onClick={play} disabled={playing}
                        className={cn('w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all',
                            playing ? 'bg-stone-300 animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700')}>
                        <Volume2 size={30} />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                        {(['a', 'b'] as const).map(side => {
                            const w = current.c[side];
                            const revealed = picked !== null;
                            const isAnswer = side === current.target;
                            return (
                                <button key={side} onClick={() => pick(side)}
                                    className={cn('rounded-2xl border-2 p-4 text-center transition-all',
                                        !revealed ? 'bg-white border-stone-200 hover:border-indigo-400'
                                            : isAnswer ? 'bg-emerald-50 border-emerald-400'
                                                : side === picked ? 'bg-red-50 border-red-300' : 'bg-white border-stone-100 opacity-60')}>
                                    <p className="text-2xl font-black text-stone-900">{w.hanzi}</p>
                                    <p className="text-sm font-mono text-violet-500">{w.pinyin}</p>
                                    <p className="text-xs text-stone-400 mt-0.5">{w.en}</p>
                                </button>
                            );
                        })}
                    </div>
                    {picked !== null && (
                        <div className="space-y-2">
                            <p className={cn('text-sm font-bold text-center', picked === current.target ? 'text-emerald-600' : 'text-red-500')}>
                                {picked === current.target ? '✓ Correct' : `✗ It was ${current.c[current.target].hanzi} (${current.c[current.target].pinyin})`}
                            </p>
                            <p className="text-xs text-stone-500 text-center">💡 {current.c.tip}</p>
                            <button onClick={nextRound}
                                className="w-full py-3 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                                <RotateCcw size={14} /> Next contrast
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// ── Tone trainer — hear a word, pick the tone you heard ──────────────────────
export const ToneTrainer = ({ onDone }: { onDone?: (pct: number, label: string) => void }) => {
    const [setIdx, setSetIdx] = useState(0);
    const [current, setCurrent] = useState<{ item: { hanzi: string; pinyin: string; tone: number; en: string }; round: number } | null>(null);
    const [picked, setPicked] = useState<number | null>(null);
    const [score, setScore] = useState({ right: 0, total: 0 });
    const [playing, setPlaying] = useState(false);
    const stopRef = useRef(false);

    useEffect(() => () => { stopRef.current = true; stopSpeaking(); }, []);

    const nextRound = (idx = setIdx) => {
        const set = TONE_SETS[idx];
        const item = set.items[Math.floor(Math.random() * 4)];
        setCurrent({ item, round: (current?.round || 0) + 1 });
        setPicked(null);
    };

    const play = (hanzi?: string) => {
        if (!current) return;
        setPlaying(true);
        speakText(hanzi || current.item.hanzi, 'Chinese', () => setPlaying(false));
    };

    const pick = (tone: number) => {
        if (!current || picked !== null) return;
        setPicked(tone);
        const right = tone === current.item.tone;
        setScore(s => ({ right: s.right + (right ? 1 : 0), total: s.total + 1 }));
        if (!right) logWeakness({ skill: 'tones', level: `set ${TONE_SETS[setIdx].syllable}`, question: `Which tone is ${current.item.hanzi}?`, chosen: `Tone ${tone}`, answer: `Tone ${current.item.tone}` });
    };

    const switchSet = (i: number) => {
        setSetIdx(i);
        setCurrent(null);
        setPicked(null);
    };

    const pct = score.total ? Math.round((score.right / score.total) * 100) : 0;

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-stone-100 p-6">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div>
                        <p className="font-black text-stone-900">Tone pair trainer</p>
                        <p className="text-xs text-stone-400 mt-0.5">Minimal pairs: same syllable, 4 tones, 4 meanings. Listen → pick the tone → check.</p>
                    </div>
                    {score.total > 0 && (
                        <span className={cn('text-xs font-black px-3 py-1.5 rounded-xl', pct >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                            {score.right}/{score.total} · {pct}%
                        </span>
                    )}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {TONE_SETS.map((s, i) => (
                        <button key={s.syllable} onClick={() => switchSet(i)}
                            className={cn('px-3 py-1.5 rounded-xl text-xs font-black font-mono transition-colors',
                                setIdx === i ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>
                            {s.syllable}
                        </button>
                    ))}
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TONE_SETS[setIdx].items.map((it, i) => (
                        <div key={i} className="bg-stone-50 rounded-2xl p-3 text-center">
                            <p className="text-xl font-black text-stone-900">{it.hanzi}</p>
                            <p className="text-xs font-mono text-violet-500">{it.pinyin}</p>
                            <p className={cn('text-[10px] font-black mt-0.5', TONE_COLORS[it.tone])}>tone {it.tone}</p>
                            <p className="text-[10px] text-stone-400">{it.en}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-4">
                {!current ? (
                    <>
                        <p className="text-sm text-stone-500">I will play one word from the <b className="font-mono">{TONE_SETS[setIdx].syllable}</b> set. Which tone do you hear?</p>
                        <button onClick={() => nextRound()}
                            className="px-6 py-3 bg-violet-600 text-white text-sm font-bold rounded-2xl hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                            <Play size={15} /> Start listening
                        </button>
                    </>
                ) : (
                    <>
                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Round {score.total + 1} — which tone do you hear?</p>
                        <button onClick={() => play()} disabled={playing}
                            className={cn('w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all',
                                playing ? 'bg-stone-300 animate-pulse' : 'bg-violet-600 hover:bg-violet-700')}>
                            <Volume2 size={30} />
                        </button>
                        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                            {[1, 2, 3, 4].map(t => (
                                <button key={t} onClick={() => pick(t)}
                                    className={cn('py-3 rounded-2xl border-2 font-black text-sm transition-all',
                                        picked === null ? 'bg-white border-stone-200 text-stone-700 hover:border-violet-400'
                                            : t === current.item.tone ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                                                : t === picked ? 'bg-red-50 border-red-300 text-red-500' : 'bg-white border-stone-100 text-stone-300')}>
                                    {t}
                                </button>
                            ))}
                        </div>
                        {picked !== null && (
                            <div className="space-y-2">
                                <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold',
                                    picked === current.item.tone ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600')}>
                                    {picked === current.item.tone ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                                    {picked === current.item.tone ? 'Correct' : `It was tone ${current.item.tone}`}
                                </div>
                                <p className="text-sm text-stone-700">{current.item.hanzi} <span className="font-mono text-violet-500">{current.item.pinyin}</span> — {current.item.en}</p>
                                <button onClick={() => nextRound()}
                                    className="w-full max-w-md mx-auto py-3 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                                    <RotateCcw size={14} /> Next word
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {score.total >= 8 && onDone && (
                <button onClick={() => onDone(pct, `Tone trainer: ${TONE_SETS[setIdx].syllable} set`)}
                    className="w-full py-3.5 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-colors">
                    <CheckCircle2 size={14} className="inline mr-1.5" /> Save this result ({pct}%)
                </button>
            )}
        </div>
    );
};

// ── Listening trainer — HSK rule: audio heard ONCE in exam mode ─────────────
export const HSKListeningTrainer = ({ level, onLevelChange, onDone }: {
    level: HskLevel; onLevelChange: (l: HskLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<HskListening | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showTranscript, setShowTranscript] = useState(false);
    const [finished, setFinished] = useState(false);
    const stopRef = useRef(false);

    useEffect(() => () => { stopRef.current = true; stopSpeaking(); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setPlays(0); setAnswers({}); setShowTranscript(false); setFinished(false);
        try {
            const e = await generateHskListening(level);
            if (!e.lines?.length || !e.questions?.length) throw new Error('empty');
            setEx(e);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const playAll = () => {
        if (!ex) return;
        stopSpeaking();
        setPlaying(true);
        setPlays(p => p + 1);
        let i = 0;
        const next = () => {
            if (stopRef.current || i >= ex.lines.length) { setPlaying(false); return; }
            const line = ex.lines[i++];
            speakText(line.hanzi, 'Chinese', () => setTimeout(next, 400));
        };
        next();
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;

    const finish = () => {
        setFinished(true);
        setShowTranscript(true);
        if (ex) onDone(Math.round((correct / ex.questions.length) * 100), `${level} listening: ${ex.scenario}`);
    };

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {!ex && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">How HSK listening works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real HSK {level}: {level === '1' ? '20' : level === '2' ? '35' : level === '6' ? '50' : '40–45'} questions, audio plays <b>once</b>.</li>
                        <li>• Here: the recording is read aloud in Chinese — answer after one play.</li>
                        <li>• The transcript + pinyin only unlock after you finish (train your ear, not your eyes).</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate an HSK {level} listening exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing an HSK {level} recording…
                </div>
            )}
            {ex && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-5">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">The recording</p>
                        <p className="text-sm font-bold text-stone-800 mb-3">{ex.scenario}</p>
                        <div className="flex items-center gap-3">
                            <button onClick={playAll} disabled={playing}
                                className={cn('flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-colors',
                                    playing ? 'bg-stone-200 text-stone-500' : 'bg-indigo-600 text-white hover:bg-indigo-700')}>
                                <Volume2 size={13} /> {playing ? 'Playing…' : plays === 0 ? 'Play the recording' : `Play again (${plays})`}
                            </button>
                            {plays > 0 && !finished && <span className="text-[10px] text-stone-400">Exam rule: you only hear it once — no replay before answering</span>}
                        </div>
                    </div>

                    {!finished && answered < ex.questions.length && (
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3 text-xs text-amber-700">
                            Answer from memory. The transcript + pinyin unlock when you finish.
                        </div>
                    )}

                    {ex.questions.map((q, i) => (
                        <div key={i}>
                            <MCQ q={q} i={i} picked={answers[i]} onPick={opt => { setAnswers(prev => ({ ...prev, [i]: opt })); if (opt !== q.answer) logWeakness({ skill: 'listening', level, question: q.question, chosen: opt, answer: q.answer }); }} />
                        </div>
                    ))}

                    {!finished && answered === ex.questions.length && (
                        <button onClick={finish}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Finish — {correct}/{ex.questions.length} correct · see transcript
                        </button>
                    )}

                    {finished && (
                        <div className={cn('rounded-3xl p-5 text-center', correct / ex.questions.length >= 0.75 ? 'bg-emerald-50' : 'bg-amber-50')}>
                            <p className="text-2xl font-black text-stone-900">{correct}/{ex.questions.length}</p>
                            <p className="text-xs text-stone-500 mt-1">{correct / ex.questions.length >= 0.75 ? 'Strong at this level — try the next HSK up.' : 'Read the transcript, shadow each line, then retry.'}</p>
                        </div>
                    )}

                    {(showTranscript || finished) && (
                        <div className="bg-white rounded-3xl border border-stone-100 p-5 space-y-2">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Transcript — read, then shadow each line</p>
                            {ex.lines.map((l, i) => (
                                <div key={i} className="bg-stone-50 rounded-2xl p-3 space-y-0.5">
                                    <p className="text-[10px] font-black text-indigo-400 uppercase">{l.speaker}</p>
                                    <ZHEn hanzi={l.hanzi} pinyin={l.pinyin} en={l.en} />
                                </div>
                            ))}
                        </div>
                    )}

                    {!ex.questions.some((_, i) => answers[i] === undefined) && (
                        <button onClick={start} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> New exercise
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

// ── Reading trainer — timed HSK-style document + MCQs ────────────────────────
export const HSKReadingTrainer = ({ level, onLevelChange, onDone }: {
    level: HskLevel; onLevelChange: (l: HskLevel) => void;
    onDone: (pct: number, label: string) => void;
}) => {
    const [ex, setEx] = useState<HskReading | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showEn, setShowEn] = useState(false);
    const [showPinyin, setShowPinyin] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [finished, setFinished] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    const start = async () => {
        setLoading(true); setError(null);
        setEx(null); setAnswers({}); setShowEn(false); setShowPinyin(false); setFinished(false);
        setSeconds(0); setTimerOn(true);
        timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
        try {
            const e = await generateHskReading(level);
            if (!e.paragraphs?.length || !e.questions?.length) throw new Error('empty');
            setEx(e);
        } catch {
            setError('Generation failed — the AI may be busy. Try again.');
        } finally { setLoading(false); }
    };

    const answered = Object.keys(answers).length;
    const correct = ex ? ex.questions.filter((q, i) => answers[i] === q.answer).length : 0;
    const finish = () => {
        setFinished(true); setShowEn(true); setShowPinyin(true);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimerOn(false);
        if (ex) onDone(Math.round((correct / ex.questions.length) * 100), `${level} reading: ${ex.title}`);
    };
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="space-y-5">
            <LevelBar level={level} onLevelChange={onLevelChange} />
            {!ex && !loading && (
                <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-3">
                    <p className="font-black text-stone-900">How HSK reading works</p>
                    <ul className="text-xs text-stone-500 space-y-1.5">
                        <li>• Real HSK {level}: {level === '1' ? '20' : level === '2' ? '25' : level === '3' ? '30' : level === '4' ? '40' : level === '5' ? '45' : '50'} questions — skim, locate, don't translate everything.</li>
                        <li>• Here: read the Chinese document, answer 4 questions, then check the English.</li>
                        <li>• Pinyin is hidden by default — read the characters first like the real exam.</li>
                    </ul>
                    <button onClick={start} disabled={loading}
                        className="w-full py-3.5 bg-teal-600 text-white text-sm font-bold rounded-2xl hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                        <Play size={15} /> Generate an HSK {level} reading exercise
                    </button>
                    {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}
                </div>
            )}
            {loading && (
                <div className="flex items-center justify-center gap-3 py-10 text-stone-400">
                    <Loader2 size={20} className="animate-spin" /> Writing an HSK {level} document…
                </div>
            )}
            {ex && (
                <div className="space-y-4">
                    <div className="bg-white rounded-3xl border border-stone-100 p-6">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest">The document</p>
                            <span className={cn('text-xs font-black tabular-nums px-2.5 py-1 rounded-xl', timerOn ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500')}>{mm}:{ss}</span>
                        </div>
                        <h2 className="font-black text-stone-900 mb-3">{ex.title}</h2>
                        <div className="space-y-3">
                            {ex.paragraphs.map((p, i) => (
                                <div key={i}>
                                    <InteractiveText text={p.hanzi} language="Chinese" className="block text-sm text-stone-800 leading-loose" />
                                    {showPinyin && p.pinyin && <p className="text-xs font-mono text-violet-500 mt-0.5">{p.pinyin}</p>}
                                    {showEn && <p className="text-xs text-stone-400 italic border-l-2 border-stone-200 pl-3 mt-1">{p.en}</p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button onClick={() => setShowPinyin(v => !v)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 hover:text-violet-600 transition-colors">
                            <HelpCircle size={12} /> {showPinyin ? 'Hide' : 'Show'} pinyin {finished ? '' : '(after finishing)'}
                        </button>
                        <button onClick={() => setShowEn(v => !v)}
                            className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 hover:text-stone-700 transition-colors">
                            <Eye size={12} /> {showEn ? 'Hide' : 'Show'} English {finished ? '' : '(after finishing)'}
                        </button>
                    </div>

                    {ex.questions.map((q, i) => (
                        <div key={i}>
                            <MCQ q={q} i={i} picked={answers[i]} onPick={opt => { setAnswers(prev => ({ ...prev, [i]: opt })); if (opt !== q.answer) logWeakness({ skill: 'reading', level, question: q.question, chosen: opt, answer: q.answer }); }} />
                        </div>
                    ))}

                    {!finished && answered === ex.questions.length && (
                        <button onClick={finish}
                            className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors">
                            Finish — {correct}/{ex.questions.length} correct in {mm}:{ss}
                        </button>
                    )}

                    {finished && (
                        <div className={cn('rounded-3xl p-5 text-center', correct / ex.questions.length >= 0.75 ? 'bg-emerald-50' : 'bg-amber-50')}>
                            <p className="text-2xl font-black text-stone-900">{correct}/{ex.questions.length}</p>
                            <p className="text-xs text-stone-500 mt-1">
                                {correct / ex.questions.length >= 0.75 ? 'Solid comprehension — move up a level.' : 'Read the English, find the evidence in the characters, then retry.'}
                            </p>
                        </div>
                    )}

                    {finished && (
                        <button onClick={start} className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                            <RotateCcw size={14} /> New exercise
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
