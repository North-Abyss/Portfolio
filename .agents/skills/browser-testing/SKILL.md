---
name: browser-testing
description: Autonomous browser verification skill using headless Chromium/Playwright or curl to test local static pages, capture screenshots, and detect console errors.
---

# Autonomous Browser Testing Skill (Portfolio)

Use this skill when verifying static HTML/CSS/JS edits, responsive layouts, theme switching, or data rendering.

## How It Works
1. Start a temporary local HTTP server in the background:
   ```bash
   python3 -m http.server 8080 &
   SERVER_PID=$!
   ```
2. Run the web verification script:
   ```bash
   ./scripts/dev/verify_web.sh http://localhost:8080
   ```
3. Stop the temporary server (`kill $SERVER_PID`).
4. **Storage Policy:** Save screenshots and HTML dumps strictly inside `tmp/audit/` (git-ignored).

## Verification Checklist
- [ ] HTTP 200 on initial page load (`index.html`, `Projects.html`, `Commercial.html`, `Updates.html`, `Contact.html`).
- [ ] Zero unhandled JavaScript exceptions in browser console.
- [ ] Both dark and light modes render without flash or broken tokens.
- [ ] All artifacts kept strictly inside `tmp/audit/`.
