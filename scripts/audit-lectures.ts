// Structural audit of the static lecture library — the QC gate that runs in
// CI and locally before any lecture work ships. Catches: missing sections,
// thin content, mini-test answers that can never match an option, checklist
// ↔ remedial misalignment, missing extras (warm-up / verb tables / use cases
// / shadowing), orphaned registry keys.
//
//   npx tsx scripts/audit-lectures.ts            # audit every lecture
//   npx tsx scripts/audit-lectures.ts B2:        # audit keys with a prefix

import { STATIC_FRENCH_LESSONS } from '../src/services/frenchLessons';
import { LESSON_EXTRAS } from '../src/services/frenchLessonExtras';

const prefix = process.argv[2] ?? '';
const problems: Record<string, string[]> = {};
const check = (key: string, cond: boolean | undefined | null, msg: string) => {
    if (!cond) (problems[key] ||= []).push(msg);
};

for (const key of Object.keys(STATIC_FRENCH_LESSONS).filter(k => k.startsWith(prefix))) {
    const L: any = (STATIC_FRENCH_LESSONS as any)[key];
    const ex: any = (LESSON_EXTRAS as any)[key];

    check(key, !!L.title && !!L.objective, 'title/objective missing');
    check(key, L.vocabulary?.length >= 10, `vocabulary ${L.vocabulary?.length} (want >=10)`);
    L.vocabulary?.forEach((v: any, i: number) => {
        check(key, v.fr && v.en, `vocab[${i}] missing fr/en`);
        check(key, !v.fr.includes('→'), `vocab[${i}] arrow in fr: "${v.fr}"`);
        check(key, v.example ? !!(v.example.fr && v.example.en) : true, `vocab[${i}] example incomplete`);
    });
    check(key, L.pronunciation?.length >= 4, `pronunciation ${L.pronunciation?.length}`);
    check(key, L.grammar?.rule && L.grammar?.explanation?.length > 200, 'grammar rule/explanation thin');
    check(key, L.grammar?.examples?.length >= 4, `grammar examples ${L.grammar?.examples?.length}`);
    L.grammar?.examples?.forEach((e: any, i: number) =>
        check(key, e.fr && e.en && e.breakdown?.length > 0, `grammar example[${i}] missing breakdown`));
    check(key, L.grammar?.commonMistakes?.length >= 3, `commonMistakes ${L.grammar?.commonMistakes?.length}`);
    check(key, L.transformations?.length >= 6, `transformations ${L.transformations?.length}`);
    check(key, L.sentenceBuilding?.length >= 4, `sentenceBuilding ${L.sentenceBuilding?.length}`);
    check(key, L.practice?.length >= 5, `practice ${L.practice?.length}`);
    check(key, L.translationPractice?.length >= 5, `translationPractice ${L.translationPractice?.length}`);
    check(key, L.reverseTranslation?.length >= 3, `reverseTranslation ${L.reverseTranslation?.length}`);
    check(key, L.register?.informal && L.register?.neutral && L.register?.formal, 'register incomplete');
    check(key, L.culture?.length > 100, 'culture thin');
    check(key, L.freeProduction?.length > 80, 'freeProduction thin');
    check(key, L.review?.length >= 1, 'review missing');
    check(key, L.traps?.length >= 3, `traps ${L.traps?.length}`);

    // mini test — the answer must match a bare option (optionally with a " — why" suffix)
    check(key, L.miniTest?.length >= 4, `miniTest ${L.miniTest?.length}`);
    L.miniTest?.forEach((q: any, i: number) => {
        const bare = (q.options || []).some((o: string) => o === q.answer || q.answer.startsWith(`${o} `));
        check(key, bare, `miniTest[${i}] answer unmatchable: "${q.answer}"`);
        check(key, q.options?.length === 4, `miniTest[${i}] has ${q.options?.length} options (want 4)`);
    });

    // homework — every item needs prompt + answer + a real explanation
    const hw = L.homework;
    check(key, !!hw, 'no homework');
    if (hw) {
        check(key, hw.translation?.length >= 6, `hw.translation ${hw.translation?.length}`);
        check(key, hw.blanks?.length >= 6, `hw.blanks ${hw.blanks?.length}`);
        check(key, hw.corrections?.length >= 5, `hw.corrections ${hw.corrections?.length}`);
        check(key, hw.writing?.task && hw.writing?.requirements?.length >= 4 && hw.writing?.minWords >= 40, 'writing task incomplete');
        check(key, hw.checklist?.length >= 5, `checklist ${hw.checklist?.length}`);
        [...(hw.translation || []), ...(hw.blanks || []), ...(hw.corrections || [])].forEach((c: any, i: number) =>
            check(key, c.prompt && c.answer && c.explanation?.length > 10, `hw item[${i}] missing answer/explanation`));
        // remedial mini-lessons must align 1:1 with the checklist
        check(key, hw.checklist?.length === L.checklistRemedial?.length,
            `checklist (${hw.checklist?.length}) != checklistRemedial (${L.checklistRemedial?.length})`);
        L.checklistRemedial?.forEach((r: any, i: number) =>
            check(key, r.explanation && r.examples?.length >= 1, `remedial[${i}] incomplete`));
    } else {
        check(key, !L.checklistRemedial, 'checklistRemedial without homework');
    }

    // extras — Part 0 warm-up, verb tables, use cases, shadowing
    if (!ex) { (problems[key] ||= []).push('EXTRAS MISSING (add to frenchLessonExtras.ts)'); continue; }
    check(key, ex.warmup?.length >= 5, `warmup ${ex.warmup?.length}`);
    ex.warmup?.forEach((w: any, i: number) => check(key, w.q && w.a, `warmup[${i}] missing answer`));
    check(key, ex.verbTables?.length >= 2, `verbTables ${ex.verbTables?.length}`);
    ex.verbTables?.forEach((t: any, i: number) =>
        check(key, t.title && t.rows?.length >= 3 && t.rows.every((r: any) => r.form), `verbTable[${i}] incomplete`));
    check(key, ex.useCases?.length >= 2, `useCases ${ex.useCases?.length}`);
    ex.useCases?.forEach((u: any, i: number) =>
        check(key, u.word && u.uses?.length >= 3 && u.uses.every((x: any) => x.examples?.length >= 1), `useCase[${i}] incomplete`));
    check(key, ex.shadowing?.lines?.length >= 5, `shadowing ${ex.shadowing?.lines?.length}`);
    ex.shadowing?.lines?.forEach((s: any, i: number) =>
        check(key, s.fr && s.pron && s.en, `shadowing[${i}] incomplete`));

    check(key, Object.keys(L.glossary || {}).length >= 10, `glossary ${Object.keys(L.glossary || {}).length} entries`);
}

// every lecture must have its extras keyed identically
const reg = Object.keys(STATIC_FRENCH_LESSONS).filter(k => k.startsWith(prefix));
const ext = Object.keys(LESSON_EXTRAS).filter(k => k.startsWith(prefix));
const noExtras = reg.filter(k => !(LESSON_EXTRAS as any)[k]);
const noLesson = ext.filter(k => !(STATIC_FRENCH_LESSONS as any)[k]);
if (noExtras.length) (problems['__registry__'] ||= []).push(`lectures WITHOUT extras: ${noExtras.join(', ')}`);
if (noLesson.length) (problems['__registry__'] ||= []).push(`extras WITHOUT lectures: ${noLesson.join(', ')}`);

let total = 0;
for (const [k, msgs] of Object.entries(problems)) {
    if (!msgs.length) continue;
    total += msgs.length;
    console.log(`❌ ${k}`);
    msgs.forEach(m => console.log(`   - ${m}`));
}
console.log(`\n${reg.length} lecture(s) audited.`);
if (total > 0) {
    console.log(`❌ ${total} issue(s) found — fix before shipping.`);
    process.exit(1);
}
console.log('✅ ALL FULLY COMPLETE');
