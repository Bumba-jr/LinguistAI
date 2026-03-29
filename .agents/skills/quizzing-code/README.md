# quizzing-code

I've found that when using the LLMS to do lots of the coding
I end up in sintuations where I don't have the understanding of the code
I would want. 
Instead of doing complete reviews I found that asking the LLM to quiz
me about the code helps a lot. It also sometimes allows us
to find issues together. Its a nice way to gain confidence
and to keep a bit sharp. 

## What it does

1. **Analyzes your branch diff** against main (or specified base)
2. **Asks probing questions** one at a time with relevant code snippets
3. **Tracks discoveries** categorized as Critical/Important/Minor
4. **Generates a summary** saved to `.claude/quiz-summaries/`

## Example 
<img width="1512" height="460" alt="image" src="https://github.com/user-attachments/assets/33f7b116-70d9-4323-8861-200b895f752d" />


## Installation

```bash
npx skills add UniversalAvenue/quizzing-code
```

## Usage

```
/quizzing-code              # Quiz against main branch
/quizzing-code develop      # Quiz against develop branch
```

Or just say "quiz me on my code" in conversation.

## Example Session

````
You: /quizzing-code

Claude: I'll analyze your branch changes and quiz you on the implementation.

**Question 1/5** - Constraints

Looking at `migrations/add_user_role.sql:12-18`:
```sql
ALTER TABLE users
ADD COLUMN role_id UUID REFERENCES roles(id) ON DELETE SET NULL;
```

This uses `ON DELETE SET NULL`. What happens to users if their role is deleted?

You: They'd lose their role assignment... but we probably want to prevent
     deleting roles that are in use.

Claude: Exactly! Consider using ON DELETE RESTRICT instead, or adding a
        check before role deletion. Let me note that as a finding...

[continues with more questions]

Claude: Here's your summary:

# Code Quiz Summary: feat/add-user-roles
...
````

## Question Categories

The skill probes these areas:

- **Constraints & Invariants** - NULL handling, foreign keys, unique constraints
- **Pattern Consistency** - Does it match existing codebase patterns?
- **Edge Cases** - Empty inputs, concurrency, error conditions
- **Dependencies** - What depends on this? What does this depend on?
- **Naming & Design** - Why these names? Any duplication?

## Output

Summaries are saved to `.claude/quiz-summaries/YYYY-MM-DD-branch-name.md` with:

- Issues by severity (Critical/Important/Minor)
- Code references for each finding
- Validated design decisions
- Recommended action items

## License

MIT
