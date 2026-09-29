// Sentence Engine — the deep sentence-building curriculum as a TCF tab.
// Every person (je → elles), every core form (10 transformations), every core
// structure (être, avoir, avoir besoin de, venir de…) — hand-written data,
// generated tables, so nothing can disagree with itself across persons.

import React, { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, AlertTriangle, ArrowRight, Volume2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { speakText } from '../../services/voiceService';
import { LessonGlossaryContext, RichWord, resolveGlossary } from '../wordCards';

// ── The cast: every subject, with the ending it drives ──────────────────────
interface Person { id: string; fr: string; en: string; when: string; ending: string; idx: number; fem?: boolean; je?: boolean }
const PERSONS: Person[] = [
    { id: 'je', fr: 'je', en: 'I', when: 'The speaker. Elides to j\u2019 before a vowel: j\u2019ai, j\u2019habite.', ending: '-e (parle)', idx: 0, je: true },
    { id: 'tu', fr: 'tu', en: 'you — informal, ONE person you know', when: 'A friend, a child, family. Never for strangers or officials.', ending: '-es (parles)', idx: 1 },
    { id: 'il', fr: 'il', en: 'he / it (masc)', when: 'A man or a masculine thing (le livre → il).', ending: '-e (parle)', idx: 2 },
    { id: 'elle', fr: 'elle', en: 'she / it (fem)', when: 'A woman or a feminine thing (la voiture → elle).', ending: '-e (parle)', idx: 2, fem: true },
    { id: 'nous', fr: 'nous', en: 'we', when: 'The speaker + others. In SPOKEN French, on has mostly replaced it: on parle = we speak.', ending: '-ons (parlons)', idx: 3 },
    { id: 'vous', fr: 'vous', en: 'you — formal ONE person, OR any group', when: 'A stranger, an elder, an official — or two or more people, always.', ending: '-ez (parlez)', idx: 4 },
    { id: 'ils', fr: 'ils', en: 'they — masculine or mixed group', when: 'Any group containing at least one male or unknown gender.', ending: '-ent (parlent) — silent', idx: 5 },
    { id: 'elles', fr: 'elles', en: 'they — ALL-female group', when: 'Only when every member is female. One man in the room → ils.', ending: '-ent (parlent) — silent', idx: 5, fem: true },
];

// ── Verified conjugation data (14 engine verbs) ─────────────────────────────
// present/future/conditional arrays: [je, tu, il, nous, vous, ils]
interface EngineVerb {
    fr: string; en: string;
    present: string[]; aux: 'avoir' | 'être';
    pp: string; ppFem?: string; ppPl?: string; ppFemPl?: string;
    future: string[]; conditional: string[];
    complement?: string; complEn?: string;      // object / place after the verb
    adjComplement?: boolean;                     // être: complement agrees with subject
    infComplement?: string; infEn?: string;      // modals: an infinitive follows
    enBase: string;                              // I will ___ / I don't ___
    presentEn: string[]; pastEn: string[];       // [je, tu, il, nous, vous, ils]
    negEn?: string;                              // pouvoir: can't speak French
    pastNegEn?: string;                          // pouvoir: couldn't speak French
    condEn?: string;                             // vouloir: would like to learn French
    qEn?: string[]; qNegEn?: string[];           // être only (English be-inversion)
    note?: string;
}
const VOW = /^[aeiouéèêhœ]/i;
const elideJe = (verb: string) => `j\u2019${verb}`;
const neForm = (verbWord: string) => (VOW.test(verbWord) ? `n\u2019${verbWord}` : `ne ${verbWord}`);

const VERBS: EngineVerb[] = [
    {
        fr: 'parler', en: 'to speak',
        present: ['parle', 'parles', 'parle', 'parlons', 'parlez', 'parlent'],
        aux: 'avoir', pp: 'parlé',
        future: ['parlerai', 'parleras', 'parlera', 'parlerons', 'parlerez', 'parleront'],
        conditional: ['parlerais', 'parlerais', 'parlerait', 'parlerions', 'parleriez', 'parleraient'],
        complement: 'français', complEn: 'French',
        enBase: 'speak', presentEn: ['speak', 'speak', 'speaks', 'speak', 'speak', 'speak'],
        pastEn: ['spoke', 'spoke', 'spoke', 'spoke', 'spoke', 'spoke'],
        note: 'The regular -er model: four identical singular sounds + -ons / -ez / -ent. Master parler and 90% of French verbs follow.',
    },
    {
        fr: 'manger', en: 'to eat',
        present: ['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'],
        aux: 'avoir', pp: 'mangé',
        future: ['mangerai', 'mangeras', 'mangera', 'mangerons', 'mangerez', 'mangeront'],
        conditional: ['mangerais', 'mangerais', 'mangerait', 'mangerions', 'mangeriez', 'mangeraient'],
        complement: 'une pomme', complEn: 'an apple',
        enBase: 'eat', presentEn: ['eat', 'eat', 'eats', 'eat', 'eat', 'eat'],
        pastEn: ['ate', 'ate', 'ate', 'ate', 'ate', 'ate'],
        note: 'The nous form keeps the soft g: mangeons (man-ZHOHN) — never "mangons".',
    },
    {
        fr: 'finir', en: 'to finish',
        present: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'],
        aux: 'avoir', pp: 'fini',
        future: ['finirai', 'finiras', 'finira', 'finirons', 'finirez', 'finiront'],
        conditional: ['finirais', 'finirais', 'finirait', 'finirions', 'finiriez', 'finiraient'],
        complement: 'le rapport', complEn: 'the report',
        enBase: 'finish', presentEn: ['finish', 'finish', 'finishes', 'finish', 'finish', 'finish'],
        pastEn: ['finished', 'finished', 'finished', 'finished', 'finished', 'finished'],
        note: 'The -ir model: the -iss- glue appears in nous/vous/ils (finissons).',
    },
    {
        fr: 'prendre', en: 'to take',
        present: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
        aux: 'avoir', pp: 'pris',
        future: ['prendrai', 'prendras', 'prendra', 'prendrons', 'prendrez', 'prendront'],
        conditional: ['prendrais', 'prendrais', 'prendrait', 'prendrions', 'prendriez', 'prendraient'],
        complement: 'le bus', complEn: 'the bus',
        enBase: 'take', presentEn: ['take', 'take', 'takes', 'take', 'take', 'take'],
        pastEn: ['took', 'took', 'took', 'took', 'took', 'took'],
        note: 'The d drops in nous/vous (prenons) — and the participle is IRREGULAR: pris.',
    },
    {
        fr: 'comprendre', en: 'to understand',
        present: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'],
        aux: 'avoir', pp: 'compris',
        future: ['comprendrai', 'comprendras', 'comprendra', 'comprendrons', 'comprendrez', 'comprendront'],
        conditional: ['comprendrais', 'comprendrais', 'comprendrait', 'comprendrions', 'comprendriez', 'comprendraient'],
        complement: 'la question', complEn: 'the question',
        enBase: 'understand', presentEn: ['understand', 'understand', 'understands', 'understand', 'understand', 'understand'],
        pastEn: ['understood', 'understood', 'understood', 'understood', 'understood', 'understood'],
        note: 'Same family as prendre: the d drops before -ons, and the participle is compris.',
    },
    {
        fr: 'être', en: 'to be',
        present: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        aux: 'avoir', pp: 'été',
        future: ['serai', 'seras', 'sera', 'serons', 'serez', 'seront'],
        conditional: ['serais', 'serais', 'serait', 'serions', 'seriez', 'seraient'],
        adjComplement: true, complEn: 'tired',
        enBase: 'be', presentEn: ['am', 'are', 'is', 'are', 'are', 'are'],
        pastEn: ['was', 'were', 'was', 'were', 'were', 'were'],
        qEn: ['Am I', 'Are you', 'Is he', 'Is she', 'Are we', 'Are you', 'Are they', 'Are they'],
        qNegEn: ['Aren\u2019t I', 'Aren\u2019t you', 'Isn\u2019t he', 'Isn\u2019t she', 'Aren\u2019t we', 'Aren\u2019t you', 'Aren\u2019t they', 'Aren\u2019t they'],
        note: 'THE irregular verb. English "I was tired" is usually j\u2019étais fatigué (state); j\u2019ai été malade = "I was / have been sick" (event).',
    },
    {
        fr: 'avoir', en: 'to have',
        present: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
        aux: 'avoir', pp: 'eu',
        future: ['aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront'],
        conditional: ['aurais', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient'],
        complement: 'une voiture', complEn: 'a car',
        enBase: 'have', presentEn: ['have', 'have', 'has', 'have', 'have', 'have'],
        pastEn: ['had', 'had', 'had', 'had', 'had', 'had'],
        note: 'Age, hunger, cold, fear — French HAS them: j\u2019ai trente ans, j\u2019ai froid. Participle: eu ("ü").',
    },
    {
        fr: 'aller', en: 'to go',
        present: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
        aux: 'être', pp: 'allé', ppFem: 'allée', ppPl: 'allés', ppFemPl: 'allées',
        future: ['irai', 'iras', 'ira', 'irons', 'irez', 'iront'],
        conditional: ['irais', 'irais', 'irait', 'irions', 'iriez', 'iraient'],
        complement: 'au cinéma', complEn: 'to the movies',
        enBase: 'go', presentEn: ['go', 'go', 'goes', 'go', 'go', 'go'],
        pastEn: ['went', 'went', 'went', 'went', 'went', 'went'],
        note: 'ÊTRE verb — never j\u2019ai allé. With être the participle AGREES: elle est allée, ils sont allés. Two stems: va- / all-.',
    },
    {
        fr: 'faire', en: 'to do / make',
        present: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
        aux: 'avoir', pp: 'fait',
        future: ['ferai', 'feras', 'fera', 'ferons', 'ferez', 'feront'],
        conditional: ['ferais', 'ferais', 'ferait', 'ferions', 'feriez', 'feraient'],
        complement: 'mes devoirs', complEn: 'my homework',
        enBase: 'do', presentEn: ['do', 'do', 'does', 'do', 'do', 'do'],
        pastEn: ['did', 'did', 'did', 'did', 'did', 'did'],
        note: 'The most-used verb after être/avoir. Odd forms: vous faites (not "faisez"), ils font.',
    },
    {
        fr: 'venir', en: 'to come',
        present: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
        aux: 'être', pp: 'venu', ppFem: 'venue', ppPl: 'venus', ppFemPl: 'venues',
        future: ['viendrai', 'viendras', 'viendra', 'viendrons', 'viendrez', 'viendront'],
        conditional: ['viendrais', 'viendrais', 'viendrait', 'viendrions', 'viendriez', 'viendraient'],
        complement: 'à la réunion', complEn: 'to the meeting',
        enBase: 'come', presentEn: ['come', 'come', 'comes', 'come', 'come', 'come'],
        pastEn: ['came', 'came', 'came', 'came', 'came', 'came'],
        note: 'ÊTRE verb with agreement. Bonus: venir DE + infinitive = to have just done it (je viens d\u2019arriver).',
    },
    {
        fr: 'pouvoir', en: 'can / to be able',
        present: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
        aux: 'avoir', pp: 'pu',
        future: ['pourrai', 'pourras', 'pourra', 'pourrons', 'pourrez', 'pourront'],
        conditional: ['pourrais', 'pourrais', 'pourrait', 'pourrions', 'pourriez', 'pourraient'],
        infComplement: 'parler français', infEn: 'to speak French',
        enBase: 'be able to speak French',
        presentEn: ['can speak French', 'can speak French', 'can speak French', 'can speak French', 'can speak French', 'can speak French'],
        pastEn: ['could speak French', 'could speak French', 'could speak French', 'could speak French', 'could speak French', 'could speak French'],
        negEn: 'can\u2019t speak French', pastNegEn: 'couldn\u2019t speak French',
        note: 'MODAL — the second verb stays an infinitive. Participle: pu (je n\u2019ai pas pu venir = I couldn\u2019t come).',
    },
    {
        fr: 'vouloir', en: 'to want',
        present: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
        aux: 'avoir', pp: 'voulu',
        future: ['voudrai', 'voudras', 'voudra', 'voudrons', 'voudrez', 'voudront'],
        conditional: ['voudrais', 'voudrais', 'voudrait', 'voudrions', 'voudriez', 'voudraient'],
        infComplement: 'apprendre le français', infEn: 'to learn French',
        enBase: 'want to learn French',
        presentEn: ['want to learn French', 'want to learn French', 'wants to learn French', 'want to learn French', 'want to learn French', 'want to learn French'],
        pastEn: ['wanted to learn French', 'wanted to learn French', 'wanted to learn French', 'wanted to learn French', 'wanted to learn French', 'wanted to learn French'],
        condEn: 'would like to learn French',
        note: 'Je voudrais (conditional) = the polite "I would like" — the single most useful form in the language.',
    },
    {
        fr: 'devoir', en: 'must / to have to',
        present: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'],
        aux: 'avoir', pp: 'dû',
        future: ['devrai', 'devras', 'devra', 'devrons', 'devrez', 'devront'],
        conditional: ['devrais', 'devrais', 'devrait', 'devrions', 'devriez', 'devraient'],
        infComplement: 'partir tôt', infEn: 'to leave early',
        enBase: 'have to leave early',
        presentEn: ['have to leave early', 'have to leave early', 'has to leave early', 'have to leave early', 'have to leave early', 'have to leave early'],
        pastEn: ['had to leave early', 'had to leave early', 'had to leave early', 'had to leave early', 'had to leave early', 'had to leave early'],
        note: 'The duty ladder: je dois (must) → je devrais (should) → j\u2019aurais dû (should have). Participle dû keeps its circumflex.',
    },
    {
        fr: 'savoir', en: 'to know (a fact / a skill)',
        present: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'],
        aux: 'avoir', pp: 'su',
        future: ['saurai', 'sauras', 'saura', 'saurons', 'saurez', 'sauront'],
        conditional: ['saurais', 'saurais', 'saurait', 'saurions', 'sauriez', 'sauraient'],
        infComplement: 'nager', infEn: 'to swim',
        enBase: 'know how to swim',
        presentEn: ['know how to swim', 'know how to swim', 'knows how to swim', 'know how to swim', 'know how to swim', 'know how to swim'],
        pastEn: ['knew how to swim', 'knew how to swim', 'knew how to swim', 'knew how to swim', 'knew how to swim', 'knew how to swim'],
        note: 'savoir = a fact or a skill (je sais nager); connaître = a person or place. Participle: su.',
    },
];

const AGREE = (v: EngineVerb, p: Person): string => {
    if (v.aux === 'avoir' || !v.ppFem) return v.pp;
    if (p.id === 'elle') return v.ppFem!;
    if (p.id === 'elles') return v.ppFemPl || v.ppFem!;
    if (p.id === 'ils') return v.ppPl || v.pp;
    return v.pp + ' (e)';
};

const êtreCompl = (p: Person) =>
    p.id === 'elle' ? 'fatiguée' : p.id === 'elles' ? 'fatiguées' : p.id === 'ils' ? 'fatigués' : p.idx >= 3 ? 'fatigués' : 'fatigué (e)';

interface Row { label: string; fr: string; en: string; note: string }
const buildRows = (p: Person, v: EngineVerb): Row[] => {
    const ei = p.idx;
    const sp = ['I', 'you', 'he', 'she', 'we', 'you', 'they', 'they'][PERSONS.indexOf(p)];
    const verb0 = v.present[ei];
    const compl = v.infComplement ?? (v.adjComplement ? êtreCompl(p) : (v.complement ?? ''));
    const complFr = compl ? ' ' + compl : '';
    const enCompl = (v.complement || v.adjComplement) && v.complEn ? ' ' + v.complEn : '';
    const subjPos = p.je && VOW.test(verb0) ? elideJe(verb0) : `${p.fr} ${verb0}`;
    const posFr = `${subjPos}${complFr}`;
    const negFr = `${p.fr} ${neForm(verb0)} pas${complFr}`;
    const auxP = (v.aux === 'avoir' ? ['ai', 'as', 'a', 'avons', 'avez', 'ont'] : ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'])[ei];
    const pp = AGREE(v, p);
    const pastFr = `${p.je && VOW.test(auxP) ? elideJe(auxP) : `${p.fr} ${auxP}`} ${pp}${complFr}`;
    const pastNegFr = `${p.fr} ${neForm(auxP)} pas ${pp}${complFr}`;
    const futFr = `${p.je && VOW.test(v.future[ei]) ? elideJe(v.future[ei]) : `${p.fr} ${v.future[ei]}`}${complFr}`;
    const futNegFr = `${p.fr} ${neForm(v.future[ei])} pas${complFr}`;
    const condFr = `${p.je && VOW.test(v.conditional[ei]) ? elideJe(v.conditional[ei]) : `${p.fr} ${v.conditional[ei]}`}${complFr}`;
    const condNegFr = `${p.fr} ${neForm(v.conditional[ei])} pas${complFr}`;
    const q = (fr: string) => {
        const body = fr.trim();
        const elided = /^(il|elle|ils|elles) /.test(body) ? `Est-ce qu\u2019${body}` : `Est-ce que ${body}`;
        return elided.charAt(0).toUpperCase() + elided.slice(1) + ' ?';
    };
    const doForm = ei === 2 ? 'doesn\u2019t' : 'don\u2019t';
    const doQ = ei === 2 ? 'Does' : 'Do';
    const doNQ = ei === 2 ? 'Doesn\u2019t' : 'Don\u2019t';
    const qSubj = sp.toLowerCase();
    const en = {
        pos: `${sp} ${v.presentEn[ei]}${v.infComplement ? '' : enCompl}.`,
        neg: v.fr === 'être' ? `${sp} ${v.presentEn[ei]} not${enCompl}.` : `${sp} ${v.negEn ?? `${doForm} ${v.enBase}`}${v.negEn ? '' : enCompl}.`,
        past: `${sp} ${v.pastEn[ei]}${v.infComplement ? '' : enCompl}.`,
        pastNeg: v.fr === 'être' ? `${sp} ${v.pastEn[ei]} not${enCompl}.` : `${sp} ${v.pastNegEn ?? `didn\u2019t ${v.enBase}`}${v.pastNegEn ? '' : enCompl}.`,
        fut: `${sp} will ${v.enBase}${enCompl}.`,
        futNeg: `${sp} won\u2019t ${v.enBase}${enCompl}.`,
        cond: `${sp} ${v.condEn ?? `would ${v.enBase}`}${enCompl}.`,
        condNeg: `${sp} wouldn\u2019t ${v.enBase}${enCompl}.`,
        q: v.qEn ? `${v.qEn[PERSONS.indexOf(p)]}${enCompl}?` : `${doQ} ${qSubj} ${v.enBase}${enCompl}?`,
        qNeg: v.qNegEn ? `${v.qNegEn[PERSONS.indexOf(p)]}${enCompl}?` : `${doNQ} ${qSubj} ${v.enBase}${enCompl}?`,
    };
    return [
        { label: 'Positive', fr: posFr, en: en.pos, note: 'Subject + verb (+ object). The base sentence everything else hangs on.' },
        { label: 'Negative', fr: negFr, en: en.neg, note: 'ne + VERB + pas — the sandwich wraps the conjugated verb. ne → n\u2019 before a vowel.' },
        { label: 'Past', fr: pastFr, en: en.past, note: v.aux === 'avoir' ? 'avoir (present) + past participle — no agreement with avoir.' : 'ÊTRE auxiliary + participle, and the participle AGREES: -e feminine, -s plural, -es feminine plural.' },
        { label: 'Past negative', fr: pastNegFr, en: en.pastNeg, note: 'The sandwich wraps the AUXILIARY: je n\u2019ai pas mangé / je ne suis pas allé(e).' },
        { label: 'Future', fr: futFr, en: en.fut, note: 'One word: stem + -ai, -as, -a, -ons, -ez, -ont. Irregular stems carried whole (ir-, ser-, aur-, fer-, viendr-).' },
        { label: 'Future negative', fr: futNegFr, en: en.futNeg, note: 'ne + FUTURE + pas — one verb, one sandwich.' },
        { label: 'Conditional', fr: condFr, en: en.cond, note: 'would + verb → conditional: future stem + imparfait endings (-ais, -ait…).' },
        { label: 'Conditional negative', fr: condNegFr, en: en.condNeg, note: 'The polite refusal: je ne voudrais pas = I wouldn\u2019t like to.' },
        { label: 'Question', fr: q(posFr), en: en.q, note: 'est-ce que + the positive statement — the learner\u2019s universal question key.' },
        { label: 'Negative question', fr: q(negFr), en: en.qNeg, note: 'est-ce que + the negative — asking for confirmation of the negative.' },
    ];
};

// glossary-aware French rendering inside this tab
const EngineFr = ({ text, className }: { text: string; className?: string }) => {
    const glossary = React.useContext(LessonGlossaryContext);
    const parts = text.split(/(\s+|[.,!?;:«»"()—¿¡])/);
    return (
        <span className={className}>
            {parts.map((p, i) => {
                if (!p) return null;
                if (!p.trim() || /(\s+|[.,!?;:«»"()—¿¡])/.test(p)) return <React.Fragment key={i}>{p}</React.Fragment>;
                return <RichWord key={i} word={p} language="French" />;
            })}
        </span>
    );
};

const Section = ({ n, title, sub, children }: { n: string; title: string; sub?: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-3xl border border-stone-100 p-6">
        <div className="flex items-start gap-2.5 mb-1">
            <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">{n}</span>
            <div>
                <h2 className="font-black text-stone-900 text-lg leading-tight">{title}</h2>
                {sub && <p className="text-xs text-stone-400 mt-0.5">{sub}</p>}
            </div>
        </div>
        <div className="mt-4">{children}</div>
    </div>
);

const FORM_LABELS: Record<string, string> = {
    'Positive': 'affirmation', 'Negative': 'négation', 'Past': 'passé composé',
    'Past negative': 'négation au passé', 'Future': 'futur', 'Future negative': 'négation au futur',
    'Conditional': 'conditionnel', 'Conditional negative': 'négation au conditionnel',
    'Question': 'question', 'Negative question': 'question négative',
};

const MINI_TEST = [
    { q: 'Which person never changes the -er ending\u2019s SOUND (je, tu, il, ils all say "parl")?', options: ['only je', 'je, tu, il AND ils/elles', 'only nous', 'only vous'], answer: 'je, tu, il AND ils/elles — four spellings, one sound: parl.' },
    { q: 'You address your boss politely. Which subject?', options: ['tu', 'vous', 'il', 'on'], answer: 'vous — formal singular AND any plural.' },
    { q: 'Past of aller for a woman:', options: ['j\u2019ai allé', 'je suis allée', 'je suis allé', 'j\u2019irai'], answer: 'je suis allée — être auxiliary + feminine agreement.' },
    { q: '"I need help" is:', options: ['je besoin aide', 'j\u2019ai besoin d\u2019aide', 'je dois aide', 'je suis besoin'], answer: 'j\u2019ai besoin d\u2019aide — literally I-have-need-of-help.' },
    { q: 'The polite "I would like a coffee":', options: ['je veux un café', 'je voudrais un café', 'j\u2019ai voulu un café', 'je voudrai un café'], answer: 'je voudrais un café — the conditional of vouloir.' },
    { q: 'Where do object pronouns (le, la, lui) go?', options: ['after the verb', 'before the conjugated verb', 'at the end', 'after pas'], answer: 'before the conjugated verb: je le vois, je lui parle.' },
];

const SentenceEngine = () => {
    const [personId, setPersonId] = useState('je');
    const [verbFr, setVerbFr] = useState('parler');
    const person = PERSONS.find(p => p.id === personId)!;
    const verb = VERBS.find(v => v.fr === verbFr)!;
    const rows = useMemo(() => buildRows(person, verb), [person, verb]);

    return (
        <div className="space-y-5">
            {/* hero */}
            <div className="bg-stone-900 rounded-3xl p-6 text-white">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">The Sentence Engine</p>
                <h1 className="text-2xl font-black mb-2">Build any French sentence — for every person</h1>
                <p className="text-sm text-white/60 leading-relaxed max-w-2xl">French is not English words translated one by one — it is a structure. Learn the structure once, change the pieces, and the same engine builds thousands of sentences: for I, you (informal and formal), he, she, we, they.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {['WHO', 'ACTION', 'WHAT / WHO', 'WHERE', 'WHEN', 'WHY / HOW'].map((s, i) => (
                        <span key={s} className="flex items-center gap-2">
                            {i > 0 && <ArrowRight size={12} className="text-white/30" />}
                            <span className={cn('px-3 py-1.5 rounded-xl text-[11px] font-black', i === 0 ? 'bg-emerald-500 text-white' : i === 1 ? 'bg-violet-500/30 text-violet-200' : 'bg-white/10 text-white/70')}>{s}</span>
                        </span>
                    ))}
                </div>
                <div className="mt-4 bg-white/5 rounded-2xl p-4">
                    <EngineFr text="Je parle français avec mon professeur à l’université tous les jours pour améliorer mon niveau." className="block text-sm font-bold" />
                    <p className="text-[11px] text-white/40 mt-1">I speak French with my teacher at the university every day to improve my level.</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {['Je — WHO', 'parle — ACTION', 'français — WHAT', 'avec mon professeur — WHO with me', 'à l\u2019université — WHERE', 'tous les jours — WHEN', 'pour améliorer… — WHY'].map(t => (
                            <span key={t} className="text-[9px] font-bold bg-white/10 text-white/60 px-2 py-0.5 rounded-lg">{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 1 — the cast */}
            <Section n="1" title="The cast — every person who can act" sub="Eight subjects drive everything. Each one carries its own verb ending.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PERSONS.map(p => (
                        <button key={p.id} onClick={() => { setPersonId(p.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className={cn('text-left border rounded-2xl p-4 transition-colors',
                                personId === p.id ? 'border-emerald-300 bg-emerald-50/60' : 'border-stone-100 bg-stone-50/50 hover:border-stone-200')}>
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <EngineFr text={p.fr} className="text-base font-black text-stone-900" />
                                <span className="text-xs font-bold text-emerald-600">{p.en}</span>
                            </div>
                            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">{p.when}</p>
                            <p className="text-[10px] font-black text-violet-500 uppercase tracking-wider mt-1.5">drives the ending: {p.ending}</p>
                        </button>
                    ))}
                </div>
                <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4 space-y-2">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5"><Lightbulb size={12} /> The three traps of the cast</p>
                    <p className="text-xs text-stone-600 leading-relaxed"><b>vous is two words in one:</b> formal "you" to ONE stranger, and "you all" to any group. English never splits them; French always does.</p>
                    <p className="text-xs text-stone-600 leading-relaxed"><b>on = the spoken "we":</b> real French speakers say on parle, on va — with a THIRD-person singular verb. nous lives in writing and formal speech.</p>
                    <p className="text-xs text-stone-600 leading-relaxed"><b>ils vs elles:</b> a mixed group (even 99 women + 1 man) is ils. elles exists only for all-female groups.</p>
                </div>
                <div className="mt-4">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Bonus cast — stress pronouns (after prepositions and for emphasis)</p>
                    <div className="flex flex-wrap gap-1.5">
                        {[['moi', 'me'], ['toi', 'you (informal)'], ['lui', 'him'], ['elle', 'her'], ['nous', 'us'], ['vous', 'you (formal/plural)'], ['eux', 'them (masc)'], ['elles', 'them (fem)']].map(([fr, en]) => (
                            <span key={fr} className="text-[11px] font-bold bg-white text-stone-600 border border-stone-100 px-2.5 py-1 rounded-lg">{fr} = {en}</span>
                        ))}
                    </div>
                    <p className="text-[11px] text-stone-400 mt-2">C’est moi. · Avec toi. · Pour eux. — after avec, pour, chez, sans… and in c’est… sentences.</p>
                </div>
            </Section>

            {/* 2 — the transformation engine */}
            <Section n="2" title="The transformation engine — one person × one verb × 10 forms" sub="Pick a person and a verb. The ten forms below are how EVERY French sentence of that shape is built.">
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {PERSONS.map(p => (
                        <button key={p.id} onClick={() => setPersonId(p.id)}
                            className={cn('px-3 py-1.5 rounded-xl text-xs font-black transition-colors',
                                personId === p.id ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200')}>{p.fr}</button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {VERBS.map(v => (
                        <button key={v.fr} onClick={() => setVerbFr(v.fr)}
                            className={cn('px-3 py-1.5 rounded-xl text-xs font-bold transition-colors',
                                verbFr === v.fr ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100')}>{v.fr}</button>
                    ))}
                </div>
                <div className="rounded-2xl overflow-hidden border border-stone-100">
                    {rows.map((r, i) => (
                        <div key={r.label} className={cn('px-4 py-3', i % 2 === 0 ? 'bg-white' : 'bg-stone-50/70')}>
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                                <p className="text-[10px] font-black text-violet-500 uppercase tracking-wider">{r.label} <span className="text-stone-300">· {FORM_LABELS[r.label]}</span></p>
                                <button onClick={() => speakText(r.fr.replace(' ( e)', ''), 'French')} className="text-stone-300 hover:text-emerald-500"><Volume2 size={12} /></button>
                            </div>
                            <EngineFr text={r.fr} className="block text-sm font-black text-stone-900 mt-0.5" />
                            <p className="text-xs text-stone-500">{r.en}</p>
                            <p className="text-[10px] text-stone-400 mt-1 leading-relaxed">{r.note}</p>
                        </div>
                    ))}
                </div>
                {verb.note && (
                    <div className="mt-3 bg-violet-50 border border-violet-100 rounded-2xl p-4 flex gap-2">
                        <Lightbulb size={14} className="text-violet-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-violet-900 leading-relaxed"><b>{verb.fr}:</b> {verb.note}</p>
                    </div>
                )}
            </Section>

            {/* 3 — the structure bank */}
            <Section n="3" title="The structure bank — the sentences you build everything from" sub="These are not words to translate; they are structures to own. Each table covers every person.">
                <div className="space-y-4">
                    {[
                        {
                            title: 'être — to be (I am, you are, he is…)', formula: 'SUBJECT + suis/es/est/sommes/êtes/sont',
                            rows: [['je suis', 'I am'], ['tu es', 'you are'], ['il / elle est', 'he / she is'], ['nous sommes', 'we are'], ['vous êtes', 'you are'], ['ils / elles sont', 'they are']],
                            trap: 'je suis → n\u2019est pas "I is". And the past has TWO forms: j\u2019étais fatigué (state — I was tired) vs j\u2019ai été malade (event — I was/have been sick).',
                        },
                        {
                            title: 'avoir — to have (age, possessions, feelings)', formula: 'SUBJECT + ai/as/a/avons/avez/ont',
                            rows: [['j\u2019ai', 'I have'], ['tu as', 'you have'], ['il / elle a', 'he / she has'], ['nous avons', 'we have'], ['vous avez', 'you have'], ['ils / elles ont', 'they have']],
                            trap: 'Age uses it: j\u2019ai trente ans (I HAVE thirty years). Feelings too: j\u2019ai froid, j\u2019ai peur, j\u2019ai faim. Negative drops the article: je n\u2019ai pas DE voiture.',
                        },
                        {
                            title: 'vouloir + infinitive — want / would like', formula: 'SUBJECT + veux/veux/veut/voulons/voulez/veulent + INFINITIVE',
                            rows: [['je veux apprendre', 'I want to learn'], ['tu veux apprendre', 'you want to learn'], ['il / elle veut apprendre', 'he / she wants to learn'], ['nous voulons apprendre', 'we want to learn'], ['vous voulez apprendre', 'you want to learn'], ['ils / elles veulent apprendre', 'they want to learn']],
                            trap: 'je voudrais (conditional) = the polite version: je voudrais un café. Never je veux un café to a stranger.',
                        },
                        {
                            title: 'pouvoir / devoir — can / must (and should)', formula: 'SUBJECT + peux/peut… · dois/doit… + INFINITIVE',
                            rows: [['je peux / je dois', 'I can / I must'], ['tu peux / tu dois', 'you can / you must'], ['il peut / il doit', 'he can / he must'], ['nous pouvons / devons', 'we can / we must'], ['vous pouvez / devez', 'you can / you must'], ['ils peuvent / doivent', 'they can / they must']],
                            trap: 'je devrais = I SHOULD (softer than je dois = I MUST). And the past: j\u2019ai dû partir = I had to leave; j\u2019aurais dû = I should have.',
                        },
                        {
                            title: 'aller + infinitive — the near future (going to)', formula: 'vais/vas/va/allons/allez/vont + INFINITIVE',
                            rows: [['je vais travailler', 'I am going to work'], ['tu vas travailler', 'you are going to work'], ['il / elle va travailler', 'he / she is going to work'], ['nous allons travailler', 'we are going to work'], ['vous allez travailler', 'you are going to work'], ['ils / elles vont travailler', 'they are going to work']],
                            trap: 'The negation wraps aller: je ne vais PAS travailler — not "je vais ne pas travailler".',
                        },
                        {
                            title: 'venir de + infinitive — to have just done it', formula: 'viens/viens/vient/venons/venez/viennent DE + INFINITIVE',
                            rows: [['je viens d\u2019arriver', 'I have just arrived'], ['tu viens d\u2019arriver', 'you have just arrived'], ['il / elle vient d\u2019arriver', 'he / she has just arrived'], ['nous venons d\u2019arriver', 'we have just arrived'], ['vous venez d\u2019arriver', 'you have just arrived'], ['ils / elles viennent d\u2019arriver', 'they have just arrived']],
                            trap: 'de → d\u2019 before a vowel. This is the PASSÉ RÉCENT — French\u2019s "just".',
                        },
                        {
                            title: 'avoir besoin de — the ONLY way to say "need"', formula: 'ai/as/a… besoin DE + noun/infinitive',
                            rows: [['j\u2019ai besoin d\u2019aide', 'I need help'], ['tu as besoin d\u2019aide', 'you need help'], ['il / elle a besoin d\u2019aide', 'he / she needs help'], ['nous avons besoin d\u2019aide', 'we need help'], ['vous avez besoin d\u2019aide', 'you need help'], ['ils / elles ont besoin d\u2019aide', 'they need help']],
                            trap: 'NEVER je besoin — need = avoir besoin DE (I have need OF). With a pronoun: j\u2019EN ai besoin (I need it).',
                        },
                        {
                            title: 'être en train de — right now, in progress', formula: 'suis/es/est… en train de + INFINITIVE',
                            rows: [['je suis en train de travailler', 'I am (in the middle of) working'], ['tu es en train de travailler', 'you are working right now'], ['il / elle est en train de travailler', 'he / she is working right now'], ['nous sommes en train de travailler', 'we are working right now'], ['vous êtes en train de travailler', 'you are working right now'], ['ils / elles sont en train de travailler', 'they are working right now']],
                            trap: 'French present already covers "I work" AND "I am working". Use en train de only when you must stress that it is happening THIS second.',
                        },
                    ].map(s => (
                        <div key={s.title} className="border border-stone-100 rounded-2xl overflow-hidden">
                            <div className="bg-stone-900 px-4 py-2.5">
                                <p className="text-sm font-black text-white">{s.title}</p>
                                <p className="text-[10px] font-mono text-emerald-300 mt-0.5">{s.formula}</p>
                            </div>
                            <div>
                                {s.rows.map(([fr, en], ri) => (
                                    <div key={fr} className={cn('flex items-center justify-between gap-3 px-4 py-2', ri % 2 === 0 ? 'bg-white' : 'bg-stone-50/70')}>
                                        <EngineFr text={fr} className="text-sm font-bold text-stone-800" />
                                        <span className="text-[11px] text-stone-400 text-right">{en}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-red-50 border-t border-red-100 px-4 py-2.5 flex gap-2">
                                <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-red-800 leading-relaxed">{s.trap}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* 4 — object pronouns */}
            <Section n="4" title="Object pronouns — him, her, them, me, us, you" sub="Stop repeating the noun: French replaces it with a short pronoun that sits BEFORE the verb.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                        { title: 'Direct objects (him, her, it, them)', rows: [['je le vois', 'I see him / it'], ['je la vois', 'I see her / it'], ['je les vois', 'I see them'], ['il me voit', 'he sees me'], ['je t\u2019aime', 'I love you']] },
                        { title: 'Indirect objects (to him, to her, to them)', rows: [['je lui parle', 'I speak to him / her'], ['je leur parle', 'I speak to them'], ['il me téléphone', 'he calls me'], ['je te comprends', 'I understand you'], ['je vous comprends', 'I understand you']] },
                    ].map(g => (
                        <div key={g.title} className="border border-stone-100 rounded-2xl overflow-hidden">
                            <p className="bg-stone-900 px-4 py-2 text-xs font-black text-white">{g.title}</p>
                            {g.rows.map(([fr, en], ri) => (
                                <div key={fr} className={cn('flex items-center justify-between gap-3 px-4 py-2', ri % 2 === 0 ? 'bg-white' : 'bg-stone-50/70')}>
                                    <EngineFr text={fr} className="text-sm font-bold text-stone-800" />
                                    <span className="text-[11px] text-stone-400 text-right">{en}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-900 leading-relaxed"><b>The placement rule:</b> the pronoun sits BEFORE the conjugated verb — je <b>lui</b> parle, je <b>le</b> vois. With a negative: je ne <b>lui</b> parle pas. With a modal: je veux <b>lui</b> parler (before the INFINITIVE).</p>
                </div>
            </Section>

            {/* 5 — possession & agreement */}
            <Section n="5" title="Possession & agreement — the endings that follow the thing" sub="French possessives and adjectives agree with the THING, not the owner.">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="border border-stone-100 rounded-2xl overflow-hidden">
                        <p className="bg-stone-900 px-4 py-2 text-xs font-black text-white">my / your / his-her / our / their</p>
                        {[['mon frère · ma sœur · mes amis', 'my brother · my sister · my friends'], ['ton / ta / tes', 'your (informal)'], ['votre / vos', 'your (formal or plural)'], ['son / sa / ses', 'his OR her (agrees with the thing!)'], ['notre / nos', 'our'], ['leur / leurs', 'their']].map(([fr, en], ri) => (
                            <div key={fr} className={cn('flex items-center justify-between gap-3 px-4 py-2', ri % 2 === 0 ? 'bg-white' : 'bg-stone-50/70')}>
                                <EngineFr text={fr} className="text-sm font-bold text-stone-800" />
                                <span className="text-[11px] text-stone-400 text-right">{en}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border border-stone-100 rounded-2xl overflow-hidden">
                        <p className="bg-stone-900 px-4 py-2 text-xs font-black text-white">Adjectives follow too — fatigué</p>
                        {[['je suis fatigué (e)', 'I am tired — masc (fem) speaker'], ['elle est fatiguée', 'she is tired — +e'], ['nous sommes fatigués', 'we are tired — +s'], ['elles sont fatiguées', 'they are tired — +es'], ['le livre est gros / la voiture est grosse', 'the adjective agrees with its noun too']].map(([fr, en], ri) => (
                            <div key={fr} className={cn('flex items-center justify-between gap-3 px-4 py-2', ri % 2 === 0 ? 'bg-white' : 'bg-stone-50/70')}>
                                <EngineFr text={fr} className="text-sm font-bold text-stone-800" />
                                <span className="text-[11px] text-stone-400 text-right">{en}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-[11px] text-stone-400 mt-3">A father says ma fille — the possessive follows FILLE (feminine), not the father. This single idea explains most "mistakes" beginners make with mon/ma/mes.</p>
            </Section>

            {/* 6 — questions */}
            <Section n="6" title="Questions — three keys, one lock" sub="Any statement becomes a question without moving a thing.">
                <div className="space-y-2">
                    {[['1 · Intonation (spoken)', 'Tu parles français ?', 'Do you speak French? — rise at the end, nothing moves'], ['2 · Est-ce que (the learner\u2019s key)', 'Est-ce que tu parles français ?', 'Do you speak French? — glue it onto any statement'], ['3 · Inversion (formal)', 'Parlez-vous français ?', 'Do you speak French? — verb-subject flip, written/formal register']].map(([m, fr, en], i) => (
                        <div key={m} className="border border-stone-100 rounded-2xl p-4">
                            <p className="text-[10px] font-black text-violet-500 uppercase tracking-wider">{m}</p>
                            <EngineFr text={fr} className="block text-sm font-black text-stone-900 mt-0.5" />
                            <p className="text-xs text-stone-500">{en}</p>
                            {i === 1 && <p className="text-[10px] text-stone-400 mt-1">est-ce qu’ before a vowel: Est-ce qu’il parle ? Est-ce qu’elle arrive ?</p>}
                        </div>
                    ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {[['qu\u2019est-ce que', 'what (object)'], ['qui', 'who'], ['où', 'where'], ['quand', 'when'], ['pourquoi', 'why'], ['comment', 'how'], ['combien', 'how much/many'], ['de quoi as-tu besoin ?', 'what do you need?']].map(([fr, en]) => (
                        <span key={fr} className="text-[11px] font-bold bg-white text-stone-600 border border-stone-100 px-2.5 py-1 rounded-lg">{fr} = {en}</span>
                    ))}
                </div>
            </Section>

            {/* 7 — the growth engine */}
            <Section n="7" title="The growth engine — one sentence, seven upgrades" sub="Start tiny. Add one piece at a time. This is exactly how you build the long sentence in the exam.">
                <div className="space-y-1.5">
                    {[
                        ['Je parle français.', 'I speak French. — the base'],
                        ['Je parle français aujourd\u2019hui.', '+ WHEN'],
                        ['Je parle français à la maison aujourd\u2019hui.', '+ WHERE'],
                        ['Je parle français avec mon professeur à la maison.', '+ WHO with me'],
                        ['Je parle français avec mon professeur à la maison tous les jours.', '+ WHEN (repeated)'],
                        ['Je parle français avec mon professeur à la maison tous les jours pour améliorer mon niveau.', '+ WHY'],
                        ['Je ne parle pas français avec mon professeur à la maison tous les jours.', '× NEGATIVE — the sandwich wraps parler'],
                    ].map(([fr, en], i) => (
                        <div key={fr} className={cn('flex items-center gap-3 rounded-2xl px-4 py-2.5', i === 6 ? 'bg-red-50/70 border border-red-100' : 'bg-stone-50/70')}>
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                            <div className="min-w-0">
                                <EngineFr text={fr} className="block text-sm font-bold text-stone-900" />
                                <p className="text-[11px] text-stone-400">{en}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 bg-stone-900 rounded-2xl p-4 text-white">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">The master order</p>
                    <p className="text-xs text-white/70 leading-relaxed">WHO → TIME marker (often first!) → VERB → OBJECT → PERSON → PLACE → TIME → REASON. And every structure from Section 3 slots into the ACTION slot: je veux / je vais / je viens de / j’ai besoin de + the rest.</p>
                </div>
            </Section>

            {/* 8 — mini test */}
            <Section n="8" title="Check yourself" sub="Six answers, all from this page.">
                <div className="space-y-3">
                    {MINI_TEST.map((t, i) => (
                        <MiniQ key={i} q={t.q} options={t.options} answer={t.answer} />
                    ))}
                </div>
            </Section>
        </div>
    );
};

const MiniQ = ({ q, options, answer }: { q: string; options: string[]; answer: string }) => {
    const [picked, setPicked] = useState<string | null>(null);
    return (
        <div className="border border-stone-100 rounded-2xl p-4">
            <p className="text-sm font-bold text-stone-800 mb-2">{q}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {options.map(o => (
                    <button key={o} onClick={() => { if (!picked) setPicked(o); }}
                        className={cn('text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all',
                            !picked ? 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                                : o === answer ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                    : o === picked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-stone-100 text-stone-400')}>
                        {o}
                    </button>
                ))}
            </div>
            {picked && <p className="text-[11px] font-semibold text-emerald-700 mt-2">{answer}</p>}
        </div>
    );
};

export default SentenceEngine;
