# 📚 LECTURE SYSTEM BLUEPRINT — the canonical structure for every language

This document IS the checklist. A language portal is "complete" when every box in here is
ticked for it — verified by the QC protocol (§9), not by the user. French 🇫🇷 is the
reference implementation; every other language (ES 🇪🇸 → DE 🇩🇪 → IT 🇮🇹 → JA 🇯🇵 → PT 🇵🇹 → ZH 🇨🇳)
replicates it exactly, adapted to its own exam syllabus.

---

## 1 · Architecture — the file map for ONE language

```
src/services/
  {lang}Lessons.ts          # gold-standard template lecture + STATIC_{LANG}_LESSONS registry
  {lang}LessonBase.ts       # BASE_GLOSSARY: function words + level-core strata (see §5)
  {lang}Lessons{L1}.ts      # level part 1 (e.g. A1: 2–3 lectures)
  {lang}Lessons{L1}more.ts  # level part 2
  …one pair of files per level…
  {lang}LessonExtras.ts     # LESSON_EXTRAS keyed `${level}:${slug}` → merged onto the registry at load
src/components/
  wordCards.tsx             # SHARED (all languages): RichWord / StaticWord / RichAiWord / WordCardBody
  {Lang}PrepView.tsx        # portal: static-first lesson lookup + curriculum + trainers + mock
  {lang}/{Lang}Foundations.tsx, {Lang}Trainers.tsx, {Lang}MockExam.tsx …
```

**Registry pattern** (copy from `frenchLessons.ts`):

```ts
export const STATIC_{LANG}_LESSONS: Record<string, StaticFrenchLesson> = {
  '{L1}:{slug}': lectureA, …
};
for (const [key, extra] of Object.entries(LESSON_EXTRAS)) { … merge warmup/verbTables/useCases + shadowing into homework … }
```

The lesson TYPE is shared (`StaticFrenchLesson` in frenchLessons.ts — rename-neutral): every
language uses the same shape, so the renderer, homework overlay, audit script and toolkit
work unchanged.

---

## 2 · Curriculum inventory — the levels and their topics

**Shape: 33 lectures across 6 levels** — 6 · 6 · 6 · 5 · 5 · 5 (A1 · A2 · B1 · B2 · C1 · C2).
French's exact topic list (the pedagogical ladder to replicate, adapted to each exam's
official syllabus — the `${level}:${slug}` keys MUST match the portal's syllabus entries):

| Level | Topics (French reference) |
|---|---|
| **A1** (6) | greetings · numbers/dates/time · family · food · daily routine · questions & negation |
| **A2** (6) | passé composé · imparfait · futur · shopping/money · travel/transport · work/daily life |
| **B1** (6) | PC vs imparfait · conditional & politeness · relative pronouns · immigration/exam-country themes · opinions & arguments · reported speech |
| **B2** (5) | subjunctive · formal vs informal register · structured argumentation (ORECC) · passive & complex clauses · society themes (exam-country) |
| **C1** (5) | idioms & register control · synthesis & critical reading · formal speaking & debate · evidence-based argumentation · fast speech & implied attitude |
| **C2** (5) | stylistic nuance · literary & journalistic register · francophone/regional variation · rhetoric & irony · long-form synthesis |

Each level's topics are chosen from the target exam's real syllabus (DELE ↔ Instituto
Cervantes levels, Goethe-Zertifikat, JLPT N5→N1, CILS, CAPLE, HSK). Same depth ladder:
A1 = survival, A2 = narration, B1 = connection & opinion, B2 = argument & register,
C1 = nuance & implication, C2 = mastery.

---

## 3 · Per-lecture data spec — EVERY field, with minimum counts

The audit script (`scripts/audit-lectures.ts`) enforces all of this mechanically. A lecture
is COMPLETE only when every line below passes.

### Core lesson (TcfLesson)
- [ ] `title`, `objective` (≥60 chars — what the learner can DO after)
- [ ] `vocabulary` ≥10 items, each: `fr`, `en`, `pron` (CAPS syllables), `gender`/`register`/`type` where applicable, `example {fr, en}`, `related[]` — no `→` inside `fr`
- [ ] `pronunciation` ≥6 rows: fr · approx · what-to-watch-for
- [ ] `grammar.rule` + `grammar.explanation` (≥200 chars, teaches the WHY)
- [ ] `grammar.examples` ≥4, each with `breakdown[]` (word-by-word chips)
- [ ] `grammar.commonMistakes` ≥3 (each: the mistake + why it's wrong)
- [ ] `transformations` ≥6 (same sentence across forms; optional `breakdown[]` chips)
- [ ] `sentenceBuilding` ≥4 (one sentence growing step by step)
- [ ] `practice` ≥5 (reveal-answer drills) · `translationPractice` ≥5 (EN→FR) · `reverseTranslation` ≥3 (FR→EN)
- [ ] `register` — informal / neutral / formal, all three
- [ ] `culture` (>100 chars — exam-country context) · `freeProduction` (guided speaking/writing task) · `review` ≥1 (links to earlier lectures)
- [ ] `miniTest` ≥4 MCQs, exactly 4 options each, `answer` matchable to an option (bare option, optionally + ` — why` suffix — the renderer shows the why)

### Static extras
- [ ] `traps` ≥3 — score-destroying warnings shown BEFORE the lesson
- [ ] `homework.translation` ≥6 · `homework.blanks` ≥6 · `homework.corrections` ≥5 — every item carries `answer` (+`alt` variants) and an `explanation` in the *how-the-mistake-happens / why / how-to-fix* format
- [ ] `homework.writing` — task + ≥4 requirements + `minWords` (A1 ≥40 … C2 ≥130)
- [ ] `homework.checklist` ≥5 items, **1:1 aligned with `checklistRemedial`** — each remedial = re-teaching explanation + worked example + "Got it now" button flow
- [ ] `glossary` — `{ ...BASE_GLOSSARY, …lecture entries }` ≥10 lesson-specific

### Extras (the Part-0 layer — `{lang}LessonExtras.ts`, merged at load)
- [ ] `warmup` ≥5 — retrieval questions from the PREVIOUS lesson, tap-to-reveal
- [ ] `verbTables` ≥2 — full conjugation/paradigm tables with pronunciation column, rendered in the lesson body
- [ ] `useCases` ≥2 — "one word, every job" tables (all uses of high-frequency words)
- [ ] `shadowing` ≥5 lines — homework Section E pronunciation drill: fr · pron · en

---

## 4 · The homework & assessment flow (renderer contract)

`LessonHomework.tsx` overlay: Sections A (translate) / B (blanks) / C (corrections) graded
by ONE "Rate my homework" button (never per-item buttons) → every answer explained, right
or wrong → Section D writing with "Rate my writing" (AI) → Section E shadowing drill with
audio → end-of-lesson checklist (INDEPENDENT of grading, always accessible) → "Explain what
I missed" reveals the aligned remedial mini-lessons → all boxes ticked = "Lesson complete!"
→ `onMarkComplete()`.

---

## 5 · Glossary system — the strata

`{lang}LessonBase.ts` exports `BASE_GLOSSARY`, spread into every lecture's glossary.
French reference (~375 entries) is stratified — replicate the strata per language:

1. **Function words** — pronouns, auxiliaries (full conjugations with `conj` tables), articles, possessives, particles, question words, common verbs/adjectives (with `masc`/`fem` pairs)
2. **A1 core** — survival nouns/verbs of the six A1 topics
3. **B1 core** — past-tense forms (imparfait/PC participles), connectors, discourse words
4. **B2 core** — essay machinery (avantage/inconvénient/bénéfice…), statistics frames, fixed letter formulas
5. **C1 core** — debate verbs, certainty ladders, attitude particles
6. **C2 core** — precision words, press codes, commentary machinery

Entry schema: `en · pron · gender? · plural? · register? · type? · note? · example? · label? · base? · conj[]? · masc/fem? · detail?`
Write keys in the SINGULAR; the toolkit's lookup falls back elision → singular automatically.

---

## 6 · The toolkit (SHARED — do not fork per language)

`src/components/wordCards.tsx`: `RichWord` = glossary hit → instant `StaticWord` card
(zero-AI) · miss → `RichAiWord` (AI fills the SAME GlossaryEntry schema via
`getRichWordCard`, cached `rich-card:v1:<lang>:<word>`, retry-on-thin, AI badge).
`InteractiveText` wraps `RichWord` — every surface (trainers, mocks, flashcards, chat)
gets rich cards in ANY language automatically.

**CJK amendment (Chinese/Japanese):** those scripts have no spaces — ALL lesson text is
authored PRE-SEGMENTED with spaces between words (我 叫 小 明 .) so the same word-tap
pipeline works unchanged. Pinyin (with tone marks) rides in the `pron` field; gender
fields stay empty; tone-sandhi rules live in `note`s. Popovers are viewport-aware (flip below /
right-align / max-h 72vh). NEVER reintroduce the old plain tooltip; never fork the card UI.

---

## 7 · Per-portal support surfaces (all must exist per language)

- [ ] **Foundations** course (alphabet/sounds → core charts) + **Cheat Sheet**
- [ ] **Trainers**: vocab · listening · reading · writing · speaking · sentence builder
- [ ] **Mock exam** with the exam's TRUE scoring model (TCF NCLC/699, DELE A1–C2 pass/fail per group, JLPT 0–180 scoring…)
- [ ] **Checkpoint gates**: level N+1 locked until the previous level's 6-question checkpoint passes (`CHECKPOINTS_ENABLED = true`)
- [ ] **Exam plan & countdown** (ExamPlanCard — self-reactive, fixed Sept 2026)
- [ ] **Syllabus** in the service file, whose slugs the lecture keys match exactly

---

## 8 · Replication checklist — the order of work for a NEW language

1. Read the target exam's official syllabus → write `{lang}Service.ts` syllabus slugs (or reuse the existing portal's)
2. `{lang}LessonBase.ts` — function-word stratum first (auxiliary conjugations, articles, pronouns)
3. Gold-standard template lecture (the A1:greetings equivalent) + registry in `{lang}Lessons.ts`
4. A1 remaining lectures (2 per file) + `{lang}LessonExtras.ts` for them
5. **Extend `scripts/audit-lectures.ts` to audit the new registry** (add its import + pass/fail to the script — the gate must cover every language)
6. `pnpm audit:lectures` → `pnpm coverage:lectures` → card the glossary gaps → tsc + build → push → **grep the LIVE chunk** for every new key → update memory
7. Repeat per level (A2 → C2), 2–3 lectures at a time; the Sentence Engine tab is French-only until the ladder completes (then replicate it per language)

---

## 9 · The QC protocol (runs WITHOUT the user asking)

After ANY lecture/glossary/extras/renderer change, or per new level:

1. `pnpm audit:lectures` — structural gate (exit 1 on failure; runs in CI too)
2. `pnpm coverage:lectures <prefix>` — glossary coverage probe; card the gaps
3. French-accuracy-style pass on every fact-bearing line (conjugations, agreements, prepositions, tense claims; never accept anglicism variants)
4. tsc + build → commit AND push → wait ~90s → grep the LIVE chunk for every new marker
5. Update project memory + this file if the structure evolved

Full protocol + learned gotchas: `.agents/skills/audit-lectures/SKILL.md`.

---

## 10 · Status board (update this table as levels land)

| Language | A1 | A2 | B1 | B2 | C1 | C2 | Extras | Glossary | Audit |
|---|---|---|---|---|---|---|---|---|---|
| 🇫🇷 French (TCF Canada) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ ~375 | ✅ 33/33 CI |
| 🇪🇸 Spanish (DELE) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 🇩🇪 German (Goethe) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 🇮🇹 Italian (CILS) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 🇯🇵 Japanese (JLPT) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 🇵🇹 Portuguese (CAPLE) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| 🇨🇳 Chinese (HSK) | ✅ 6/6 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ✅ | ✅ base | ✅ 39 CI |
