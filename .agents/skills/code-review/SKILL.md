---
name: code-review
description: Performs fresh-context code reviews on git diffs for static web changes, data parity, and design token hygiene.
---

# Fresh-Context Code Review Skill (Portfolio)

Use this skill before committing or syncing changes via `./git-sync.sh`.

## Review Checklist
1. **Diff Inspection:** Run `git status` and `git diff` to inspect every modified line.
2. **Data Parity:** Verify `_data/data.js` and `Assets/resume-data.json` remain synchronized when portfolio entries change.
3. **Design Token Hygiene:** Confirm UI colors and spacing reuse CSS custom properties in `style.css` (dark/light theme parity).
4. **Scratch & Secret Check:** Ensure no temporary artifacts exist outside `tmp/` and no credentials/tokens were staged.
5. **Verdict:** Ready for `./git-sync.sh --sync -m "<type>: <description>"` or list specific `file:line` fixes.
