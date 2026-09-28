// Glossary-coverage probe — how well the zero-AI tap toolkit covers the
// French surface forms used in each lecture's body. Simulates the app's
// lookup (exact key → word after elision → singular) and reports the
// content words that would fall through to the AI tooltip instead of a
// rich instant card. Multi-word phrases are matched by the app itself
// (longest-phrase-first, up to 4 words) — tokens belonging to an existing
// phrase key can appear here as false positives; judge the output, don't
// blindly card every token.
//
//   npx tsx scripts/coverage-lectures.ts B2:
//   npx tsx scripts/coverage-lectures.ts          # every lecture

import { STATIC_FRENCH_LESSONS } from '../src/services/frenchLessons';

const prefix = process.argv[2] ?? '';
const norm = (s: string) => s.toLowerCase().replace(/[\u2019\u2018]/g, "'").replace(/œ/g, 'oe');
const resolve = (gloss: Set<string>, w: string): boolean =>
    gloss.has(w)
    || (w.includes("'") && gloss.has(w.split("'").pop()!))
    || (/s$/.test(w) && gloss.has(w.replace(/s$/, '')));

const collect = (L: any): string[] => {
    const out: string[] = [];
    const add = (s?: string) => { if (typeof s === 'string' && /[a-zà-ÿ]/i.test(s)) out.push(s); };
    L.vocabulary?.forEach((v: any) => { add(v.fr); v.related?.forEach((r: any) => add(r.fr)); if (v.example) add(v.example.fr); });
    L.pronunciation?.forEach((p: any) => add(p.fr));
    L.grammar?.examples?.forEach((e: any) => add(e.fr));
    L.transformations?.forEach((t: any) => add(t.fr));
    L.sentenceBuilding?.forEach((s: any) => add(s.fr));
    L.practice?.forEach((p: any) => { add(p.question); add(p.answer); });
    L.translationPractice?.forEach((t: any) => add(t.fr));
    L.reverseTranslation?.forEach((t: any) => add(t.fr));
    L.register && Object.values(L.register).forEach(add);
    L.miniTest?.forEach((q: any) => { add(q.question); q.options?.forEach(add); });
    const hw = L.homework || {};
    [...(hw.translation || []), ...(hw.blanks || []), ...(hw.corrections || [])].forEach((c: any) => { add(c.answer); c.alt?.forEach(add); });
    L.checklistRemedial?.forEach((r: any) => r.examples?.forEach((e: any) => add(e.fr)));
    return out;
};

// English glue words that appear inside mixed FR/EN fields — not cardable
const STOP = new Set(['the','and','for','with','that','this','not','you','how','why','what','when','where','french','formal','spoken','written','casual','neutral','indicative','subjunctive','passive','answer','sentence','question','phrase','essay','form','forms','does','here','there','same','more','most','one','two','three','never','always','only','very','also','even','still','just','like','into','about','after','before','without','while','since','until','because','although','though','however','moreover','indeed','notably','such','each','every','some','any','many','much','both','all','none','other','another','own','well','way','means','thing','things','point','idea','part','word','words','level','levels','tense','tenses','verb','verbs','noun','nouns','clause','clauses','register','registers','example','examples','use','uses','used','using','irregular','stem','proof','options','speech','trigger','participle','infinitif','subject','object']);

for (const key of Object.keys(STATIC_FRENCH_LESSONS).filter(k => k.startsWith(prefix))) {
    const L: any = (STATIC_FRENCH_LESSONS as any)[key];
    const gloss = new Set<string>();
    for (const k of Object.keys(L.glossary || {})) {
        gloss.add(norm(k));
        if (k.includes("'")) gloss.add(norm(k.split("'").pop()!));
    }
    const missing = new Map<string, number>();
    for (const t of collect(L)) {
        const raw = norm(t).match(/[a-zà-ÿœ]+(?:'[a-zà-ÿœ]+)*/g) || [];
        for (const w of raw) if (!resolve(gloss, w)) missing.set(w, (missing.get(w) || 0) + 1);
    }
    const content = [...missing.entries()]
        .filter(([w]) => w.length > 2 && !STOP.has(w))
        .sort((a, b) => b[1] - a[1]);
    console.log(`\n=== ${key}`);
    console.log('  ' + (content.slice(0, 40).map(([w, c]) => `${w}×${c}`).join(', ') || '✅ full coverage'));
}
console.log('\n(Phrase keys match in-app even when their parts appear above — check before adding entries.)');
