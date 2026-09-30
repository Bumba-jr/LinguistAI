---
name: audit-lectures
description: Mandatory quality-control protocol for the LinguistAI static lecture library — run after ANY lecture/curriculum/glossary change, and proactively after each new level is written, WITHOUT waiting for the user to ask if something is missing.
---

# Lecture QC Protocol — run it WITHOUT being asked

**THE CANONICAL STRUCTURE DOC: `docs/LECTURE-SYSTEM-BLUEPRINT.md`** — the complete
file map, curriculum shape (33 lectures: 6·6·6·5·5·5), per-lecture field spec with
minimum counts, extras spec, glossary strata, per-portal surfaces, replication
checklist for new languages, and the status board. A language is COMPLETE only when
every box there is ticked and the audit passes. Check the blueprint FIRST in every
session that touches lectures.

The user should never have to say "check if something is missing" again. The moment any
lecture content, glossary, extras, or the toolkit renderer changes — or a new level of
lectures is written — run this entire protocol end-to-end in the same session, then report
results proactively.

## 1. Structural audit (hard gate — also runs in CI)

```bash
pnpm audit:lectures            # all lectures; exit 1 on any failure
pnpm audit:lectures B2:        # one level prefix
```

Checks: every section present at minimum counts (vocabulary ≥10, grammar examples ≥4 with
breakdowns, transformations ≥8, mini-test ≥4 …), mini-test answers matchable to an option
(the "option — explanation" suffix convention), homework items all carrying answer +
explanation, checklist ↔ checklistRemedial exactly 1:1, extras present (warm-up ≥5,
verbTables ≥2, useCases ≥2, shadowing ≥5), glossary ≥10, registry ↔ extras keys aligned.
Fix every failure before continuing.

## 2. Glossary coverage probe (the "toolkit is thin" guard)

```bash
pnpm coverage:lectures B2:
```

Simulates the app lookup (exact → after-elision → singular fallback). For each uncovered
CONTENT word in a lecture body, decide: add a rich glossary entry (BASE_GLOSSARY for
cross-lecture words — past-tense forms, connectors, essay/statistics vocabulary, letter
formulas; the lecture's own glossary for level-specific words) or accept the AI fallback
(one-off proper nouns, verb conjugations the verb tables already teach). Phrase keys match
in-app even when their parts appear in the report — judge, don't blindly card.

## 3. French accuracy pass (manual, every new lecture)

Re-read every fact-bearing line before shipping: conjugation forms, agreements (est
arrivée/partis), prepositions with verbs (attendre QUELQUE CHOSE, jouer À/DE), tense
claims (espérer que + indicative), plural forms (baux, taux, mois), and never accept a
variant answer that is an anglicism. One wrong rule taught 12 times is 12 bugs.

## 4. Build, ship, verify — every time

1. `npx tsc --noEmit && pnpm build`
2. Commit AND push to main (push-to-deploy: linguist-ai-phi.vercel.app auto-deploys)
3. Wait ~90–100s, then grep the LIVE chunk for the new content markers:
   - entry: `assets/index-*.js` → find `TCFPrepView-*.js` inside it
   - `curl -s .../assets/TCFPrepView-*.js | grep -q "<marker>"` for each new key/section
   Report ✓/✗ per marker. A push without live verification is an unfinished task.

## 5. Update memory

After shipping, update the project memory (static-lessons-system / lecture-quality-standard)
so the next session knows the current state: which levels are complete, file layout,
script locations, any gotcha discovered. The memory is the long-term memory; this skill is
the process.

## Gotchas already learned (do not re-learn them)

- Mini-test `answer` may be `"option — why"`; renderer matches the bare option and shows
  the why. New lectures may follow this convention freely.
- `StaticFrText` falls back: exact key → after-apostrophe → singular. Write glossary keys
  in the SINGULAR; plurals resolve automatically.
- The toolkit is app-wide, two-source, one look: `src/components/wordCards.tsx` exports
  `RichWord` (universal tap-target: glossary card if the lesson provides one via
  `LessonGlossaryContext`, else `RichAiWord` — AI fills the SAME GlossaryEntry schema via
  `getRichWordCard`, localStorage-cached as `rich-card:v1:<lang>:<word>`). `InteractiveText`
  is a thin wrapper around `RichWord` — trainers, mock exams, flashcards, quiz, chat and
  the other portals all get the rich card through it. Thin glossary entries (meaning-only,
  like `grande` in family) SELF-ENRICH on first tap — the AI card merges into the instant
  one (hand-written fields win), cached. Popovers are viewport-aware (`usePlacement`: flip
  below when tight, right-align near edges, max-h 72vh scroll) — never clipped. The AI
  generator retries once if the model returns a bare translation. NEVER reintroduce the plain
  BreakdownWord tooltip; never let the AI cards drift from the GlossaryEntry schema.
- Duplicate glossary keys in one object literal = TS error — grep before adding.
- Vercel API files are native ESM: shared code in `api/*.js` with explicit `.js` extensions.
- Supabase migrations are run BY HAND by the user from repo-root SQL files — never assume
  a table exists; make migrations fault-tolerant.
