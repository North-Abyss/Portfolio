# Agent Operating Rules — Yuvanesh KS Portfolio

> **Template Lineage:** Minimal essentials from [North-Abyss/PT](https://github.com/North-Abyss/PT) tailored for static GitHub Pages.
> **Read First:** [agent-memory.md](agent-memory.md) · [CHANGELOG.md](CHANGELOG.md) · [issues.md](issues.md)

You are working on **Yuvanesh KS Portfolio** (`north-abyss.github.io/Portfolio/`) — a zero-framework, static HTML5 / CSS3 / Vanilla JS website hosted on GitHub Pages.

---

## 1. Core Workflow Rules

### Always Do
1. **Investigate First:** Run `git status` and read relevant sections of [agent-memory.md](agent-memory.md) before editing.
2. **Single Source of Truth:** Treat [`_data/data.js`](_data/data.js) as canonical for portfolio projects, experience, certifications, and posts, and keep [`Assets/resume-data.json`](Assets/resume-data.json) synchronized whenever portfolio data changes.
3. **Verify Static Site:** Preview locally (`python3 -m http.server 8080`) and validate with [`scripts/dev/verify_web.sh`](scripts/dev/verify_web.sh) after UI or script edits.
4. **Update Records & Sync:** Document notable updates in [CHANGELOG.md](CHANGELOG.md) and [agent-memory.md](agent-memory.md), then commit and push via [`git-sync.sh`](git-sync.sh) (`./git-sync.sh --sync -m "<type>: <description>"`).

### Ask First
- Destructive shell or git commands (`git reset --hard`, `git clean`, `rm -rf` outside `tmp/`, force-push) or adding build toolchains/frameworks.

### Never Do
1. **No Framework Bloat:** Keep pure Vanilla HTML/CSS/JS — do not add React, Tailwind, Vite, or bundlers unless explicitly approved.
2. **No Hardcoded Colors in UI:** Reuse High Gloss Mono CSS custom properties in [`style.css`](style.css) (preserving dark/light theme parity).
3. **No Root Scratch Pollution:** Place temporary scripts, captures, or test outputs strictly inside [`tmp/`](tmp/) (git-ignored).
4. **Preserve Authorship:** Attribution and canonical links remain **Yuvanesh KS** (`@North-Abyss`).

---

## 2. Circuit Breaker (Two-Strike Rule)
If a check or script fails **two consecutive times** on the same root cause, stop editing and report: (1) Attempts made, (2) Error snippet, (3) Hypothesis, (4) Two options.

---

## 3. Essential Repo Layout & Skills
- Root Pages & Code: `index.html`, `Projects.html`, `Commercial.html`, `Updates.html`, `Contact.html`, `404.html`, `style.css`, `script.js`, `robots.txt`, `sitemap.xml`
- Data & Assets: `_data/data.js`, `Assets/` (`Resume.pdf`, `resume-data.json`, fallback images)
- Tooling & Hooks: `git-sync.sh`, `scripts/dev/` (`verify_web.sh`, `hook_safety_gate.py`), `.agents/hooks.json`, `.agentignore`
- On-Demand Skills (`.agents/skills/`): `browser-testing`, `code-review`
- Scratchpad (git-ignored): `tmp/`
