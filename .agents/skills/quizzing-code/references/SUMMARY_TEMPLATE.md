# Summary Template

Use this exact structure for the quiz summary:

```markdown
# Code Quiz Summary: [branch-name]

**Date:** [YYYY-MM-DD]
**Branch:** [branch-name]
**Base:** [base-branch]
**Files Changed:** [count]

## Insights Discovered

### Critical
[List with file:line references, or "None identified"]

### Important
[List with file:line references, or "None identified"]

### Minor
[List with file:line references, or "None identified"]

### Validated Decisions
[Good design choices confirmed during quiz]

## Recommended Actions
- [ ] [Action item with file reference]
- [ ] [Action item with file reference]

## Session Stats
- Questions asked: [N]
- Issues identified: [N]
```

## Example

```markdown
# Code Quiz Summary: feat/add-asset-id-to-employees

**Date:** 2026-02-02
**Branch:** feat/add-asset-id-to-employees
**Base:** main
**Files Changed:** 1

## Insights Discovered

### Critical
1. **Missing index on foreign key** [migrations/xyz.sql:7]
   - `asset_id` FK lacks index for JOIN performance

### Important
1. **Name sync only on UPDATE** [migrations/xyz.sql:60-75]
   - INSERT trigger creates asset but doesn't handle name changes during insert

### Minor
None identified.

### Validated Decisions
- Using RESTRICT instead of CASCADE prevents accidental employee deletion
- BEFORE INSERT trigger correctly sets asset_id before row is written

## Recommended Actions
- [ ] Add index: `CREATE INDEX idx_employees_asset_id ON employees(asset_id)`
- [ ] Verify INSERT trigger handles edge case of NULL names

## Session Stats
- Questions asked: 5
- Issues identified: 2
```
