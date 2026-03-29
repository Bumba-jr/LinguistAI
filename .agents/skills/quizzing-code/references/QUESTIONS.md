# Question Templates

## Constraints & Invariants

- "This column is nullable. What happens if it's NULL during [operation]?"
- "ON DELETE is [CASCADE/SET NULL/RESTRICT]. What's the impact on [related table]?"
- "No unique constraint on [field]. Can duplicates cause issues?"
- "This uses [X] but similar code uses [Y]. Why the difference?"

## Pattern Consistency

- "Existing [pattern] uses [approach]. Why [different approach] here?"
- "Similar code in [file] handles this with [method]. Should this match?"
- "[Table A] uses CASCADE, but this uses RESTRICT. Intentional?"

## Edge Cases

- "What happens with an empty array/null input?"
- "If two users do this simultaneously, what happens?"
- "What if [external dependency] is unavailable?"
- "Existing data has [state]. How does migration handle it?"

## Dependencies & Side Effects

- "[File/function] depends on this. How does your change affect it?"
- "This modifies [shared state]. What else reads/writes it?"
- "The trigger fires on [event]. What cascade effects occur?"

## Naming & Design

- "Why [name] instead of [alternative]?"
- "[Field A] and [Field B] seem similar. Is there duplication?"
- "This handles [X]. Should it also handle [Y]?"
