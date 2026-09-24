# LinguistAI

An AI-powered language-learning app. Bring notes or study materials, generate lessons and quizzes, build a flashcard habit, and prepare through seven language and exam pathways.

**Live:** https://linguist-ai-phi.vercel.app/

## Features

- **Notes to lessons and quizzes:** paste notes or upload PDFs and images. Text extraction and scanned-page OCR run in the browser in the selected study language.
- **Language practice:** AI tutor conversations, pronunciation, dictation, grammar drills, reading, writing, speaking, and progress analytics.
- **Flashcards:** spaced repetition with browser offline access for saved cards and lessons.
- **Exam pathways:** TCF Canada (French), Goethe (German), DELE (Spanish), CILS (Italian), CAPLE (Portuguese), JLPT (Japanese), and HSK (Chinese).
- **Curriculum:** 241 topic prompts across the seven portals generate lessons on demand. The outlines are course maps, not a library of human-reviewed, prewritten lectures. See [curriculum coverage and gaps](docs/curriculum-coverage.md).
- **JLPT labels:** course units show their N5–N1 target and score-dependent CEFR reference ranges. The final C2 unit is extension study beyond the official JLPT N1 level.
- **HSK versions:** the lesson library follows HSK 2.0 levels 1–6. HSK 3.0 has a separate syllabus preview; new-framework lessons and scoring are not implemented yet.
- **Lesson reports:** learners can report factual errors, unclear explanations, translation problems, and missing lesson content.
- **Community:** study rooms, vocabulary boards, challenges, language exchange, direct messages, and WebRTC calls.
- **Offline access:** signed-in saved lectures and flashcards are cached per account. Exam-portal progress is account-scoped locally and syncs to Supabase when connected.

After upgrading from an earlier version, sign in while online once so saved lectures and flashcards can repopulate the account-scoped offline cache. Older device-wide cache records have no account owner marker, so the app intentionally does not show them to an account without a successful sync.

## Tech stack

- React 19, TypeScript, Vite, Tailwind CSS 4, Zustand
- Supabase Auth, Postgres, Row Level Security, and Realtime
- Groq and OpenAI through authenticated Vercel API routes
- IndexedDB and browser storage for offline learning

## Develop

Use pnpm (the repository's lockfile is `pnpm-lock.yaml`):

```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm build        # production build to dist/
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
```

Copy `.env.example` to `.env.local` for local development. Browser settings use `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_APP_URL`. The Vite development proxy reads the server-only `GROQ_API_KEY` and `OPENAI_API_KEY`; configure those keys, along with `SUPABASE_URL` and `SUPABASE_ANON_KEY`, as server-side Vercel variables for deployment. Never put AI provider secrets in a `VITE_` variable.

The AI routes require an active Supabase session. Rate limiting uses the `consume_ai_rate_limit` database function. If it is missing, requests fail closed until the database migration is applied.

## Database setup

For a new Supabase project, run `supabase-migration-full-schema.sql` in the SQL Editor. For an existing project, run `supabase-migration-security-hardening.sql` after the full schema migration. The hardening migration replaces the old broad room policies, preserves private rooms through invite links, and adds server-side AI rate limits, account-scoped portal progress, and private lesson reports.

Migrations are idempotent. After applying them, sign in and confirm the AI features, study rooms, language exchange, and lesson reports work with a normal authenticated account. Do not use the service-role key in the browser.

## Curriculum review

The code stores topic outlines and asks the AI to generate individual lesson content on demand. The C1/C2 outlines have been expanded, but still need teacher review against each exam's official syllabus, authentic source material, and clear assessed outcomes. The HSK 3.0 preview records the current gap so learners do not mistake older HSK 2.0 lessons for new-framework content.
