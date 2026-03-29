---
name: quizzing-code
description: Quizzes developers about their code changes before PR review. Analyzes git diff, asks probing questions with code snippets, tracks discoveries, and generates a summary report. Use when user says "quiz me", "code quiz", wants self-review, or before requesting PR review.
license: MIT
---

# Code Comprehension Quiz

Interactive self-review that helps catch issues before reviewers do.

## Workflow

Copy this checklist and track progress:

```
Quiz Progress:
- [ ] Step 1: Analyze branch diff
- [ ] Step 2: Identify quiz topics (3-8 questions)
- [ ] Step 3: Ask questions one at a time
- [ ] Step 4: Track discoveries
- [ ] Step 5: Generate summary report
```

## Step 1: Analyze Changes

```bash
BASE="${ARGUMENTS:-main}"
git diff $BASE...HEAD --stat
git diff $BASE...HEAD
```

Read changed files for full context when needed.

## Step 2: Identify Topics

Find significant changes to quiz about:
- Database: tables, columns, constraints, triggers
- API: endpoints, request/response shapes
- Logic: new functions, state changes, algorithms
- Types: interfaces, type definitions

## Step 3: Ask Questions

One question at a time. Format:

```
**Question N/M** - [Category]

Looking at `path/file.ts:45-52`:
\`\`\`
[5-15 lines of relevant code]
\`\`\`

[Probing question]
```

Question types - see [QUESTIONS.md](references/QUESTIONS.md)

## Step 4: Track Discoveries

Categorize findings as:
- **Critical**: Bugs, data loss risks, security issues
- **Important**: Design gaps, missing edge cases
- **Minor**: Style, naming, small improvements

## Step 5: Generate Summary

Save to `.claude/quiz-summaries/YYYY-MM-DD-branch-name.md`

Template - see [SUMMARY_TEMPLATE.md](references/SUMMARY_TEMPLATE.md)
