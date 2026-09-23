# LinguistAI

Turn your notes into fluency — an AI-powered language learning app. Upload notes or PDFs, get lessons, flashcards, and quizzes, then train with an AI tutor, exam portals, study rooms, and more.

**Live:** https://linguist-ai-phi.vercel.app/ (auto-deploys from `main` on every push)

## Features

- **Notes → learning material**: paste notes or drop a PDF/image (OCR via tesseract.js + pdf.js, AI fallback) and generate lectures and quizzes
- **AI Tutor chat** with scenario starters, corrections, and session summaries
- **Flashcards** with spaced repetition (due dates, easy/hard scheduling)
- **Exam prep portals**: TCF Canada (French) and HSK (Chinese) — foundations courses, cheat sheets, vocabulary/sentence trainers, mock exams, live examiners
- **Study rooms**: community chat, vocabulary boards, challenges, WebRTC calls
- **Language exchange**: partner matching, connection requests, direct messages
- Per-language progress: streaks, quiz history, analytics, leaderboard

## Tech stack

- React 19 + TypeScript + Vite, Tailwind CSS 4, Zustand, Framer Motion
- Supabase (auth, Postgres, realtime) — Google OAuth + email/password
- AI via serverless proxies in `/api` (keys never ship to the client)
- PWA: service worker offline shell, deployable on Vercel

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build to dist/
pnpm lint       # eslint src api
```

Create a `.env.local` (see `.env.example`) with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. AI keys (`GEMINI_API_KEY`, `GROQ_API_KEY`, OpenAI) are server-side environment variables on Vercel — never in `.env.local`.

## Database

Schema lives in idempotent migration files at the repo root — run them once in Supabase Dashboard → SQL Editor:

| File | Purpose |
|---|---|
| `supabase-migration-full-schema.sql` | **All tables + RLS** (run this on a fresh project) |
| `supabase-migration-onboarding-flag.sql` | user_preferences table + onboarding flag |
| `supabase-migration-language-isolation.sql` | per-language data isolation |
| `supabase-migration-language-streaks.sql` | per-language streaks |

If a feature silently does nothing, check whether its table exists — `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
