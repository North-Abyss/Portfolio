# 🧠 Agent Memory — Yuvanesh KS Portfolio

> **Purpose**: This file is the persistent memory store for AI agents working on this project.
> It tracks project context, architectural decisions, known issues, naming conventions, and working state.
> **Always read this before making changes. Always update this after making changes.**

---

## 📋 Project Identity

| Field               | Value                                             |
|---------------------|---------------------------------------------------|
| **App Name**        | Yuvanesh KS Portfolio                             |
| **Type**            | Static Website (no build step)                    |
| **Hosting**         | GitHub Pages (`north-abyss.github.io/Portfolio/`) |
| **Active Theme**    | Neon Palette — Dark/Light dual mode         |
| **Core Tech**       | Vanilla HTML5, CSS3, JavaScript (zero frameworks) |
| **Last Rebuilt**    | 2026-06-18 (full from-scratch rewrite)            |
| **Repo Path**       | `/mnt/sda5/Projects/4days-work/Portfolio`         |
| **Git Branches**    | `main` = current Zedetta rebuild · `old` = legacy matrix version |

---

## 🏗️ Architecture Overview

```
Portfolio/
├── index.html           ← Main landing: Hero, About, Experience, Projects, Certs, Updates, Contact
├── Projects.html        ← Filterable project gallery (All/Game/Flutter/AI/Systems)
├── Updates.html         ← LinkedIn social feed cards
├── Contact.html         ← Dedicated contact page with form + social links
├── 404.html             ← Terminal-style 404 with auto-redirect
├── style.css            ← Complete design system (CSS custom props, Zedetta palette)
├── script.js            ← Theme, nav, typed effect, scroll animations, filter tabs, form
├── _config.yml          ← Jekyll config (jekyll-seo-tag, jekyll-sitemap)
├── _data/
│   ├── links.json       ← Structured JSON: all profile URLs, LinkedIn posts, GitHub projects
|   ├── data.js          ← Data for the portfolio
│   └── linkedin_links.txt ← Human-readable links reference file
|   
├── agent-memory.md      ← THIS FILE
└── preview.png          ← OG image for social sharing
```

### Key Architecture Rules
- **Zero frameworks**: No React, Vue, Angular, Tailwind. Pure Vanilla web APIs only.
- **Flash-free theming**: Each HTML file has an inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before any CSS or DOM renders.
- **git-sync.sh**: All git operations go through this shell script — DO NOT run raw `git commit` or `git push` manually.

---

## 🎨 Design System (Zedetta Palette)

> **Source**: [neon light Color Palette by zedetta](https://www.color-hex.com/color-palette/22324)

| Token              | Dark Mode Value                      | Light Mode Value              |
|--------------------|--------------------------------------|-------------------------------|
| `--violet`         | `#af3dff` (Neon Violet)              | `#8a22d4` (Royal Purple)      |
| `--cyan`           | `#55ffe1` (Electric Cyan)            | `#00bba3` (Dark Teal)         |
| `--pink`           | `#ff3b94` (Neon Pink)                | `#cc005f`                     |
| `--green`          | `#a6fd29` (Neon Green)               | `#67b800`                     |
| `--bg-void`        | `#0d0010`                            | `#f8f4ff`                     |
| `--bg-base`        | `#120015`                            | `#f0eaff`                     |
| `--bg-surface`     | `#1a0020` / `#37013a` (Plum)         | `#e8e0f8`                     |
| `--text-100`       | `#ffffff`                            | `#1a0030`                     |
| `--font-display`   | `'Orbitron'`                         | same                          |
| `--font-heading`   | `'Space Grotesk'`                    | same                          |
| `--font-body`      | `'Inter'`                            | same                          |
| Card Radius        | `--radius-xl: 32px`                  | same                          |

### Gradient Tokens
- `--grad-hero`: full-page hero background gradient
- `--grad-violet`, `--grad-cyan`, `--grad-pink`: single-color directional gradients for CTAs
- `--grad-accent`: 3-stop violet→pink→cyan for text/borders
- `--grad-text`: `violet → cyan` for gradient text (`text-gradient` utility class)

---

## 🔑 Critical Patterns

### 1. Flash-Free Theme (copy into every new `.html` file)
```html
<script>
  (function(){
    var t=localStorage.getItem('theme')||
      (window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
    document.documentElement.setAttribute('data-theme',t);
  })();
</script>
```

### 2. Theme Toggle (standard nav widget)
```html
<label class="theme-toggle" aria-label="Toggle light/dark mode">
  <input type="checkbox" class="theme-toggle__input" id="themeToggle"
    aria-label="Switch between dark and light theme">
  <span class="theme-toggle__track"></span>
</label>
```
- **Unchecked** = Dark mode → moon 🌙 on left side of track
- **Checked** = Light mode → sun ☀️ slides to right side of track
- The `initTheme()` function in `script.js` syncs the checkbox to the current `data-theme`

### 3. Standard Nav Block (copy for every page)
Use the nav from `index.html` — update only the `active` class on the correct `nav__link`.

## 🧠 Architectural Shifts (2026-06-19)
1. **No Backend**: GitHub Pages hosts the static HTML.
2. **Data Model**: `_data/data.js` acts as the source of truth, loaded globally via `<script src="_data/data.js">` to bypass `file://` CORS issues during local development. Emojis and FontAwesome have been replaced by Material Symbols for uniform rendering (using proper ligature fallbacks in CSS).
3. **Dynamic Rendering**: `script.js` awaits the data and builds UI cards using template literals.
4. **Theme System**: Minimal CSS variable swapping on the `:root` pseudo-class. LocalStorage ensures state persists across reloads and syncs across active tabs using the `storage` event. The light theme has deep neon gradients and shadow glassmorphism, reverting to the Zedetta palette (Pink/Violet/Cyan).
5. **Robust Image Loading**: The portfolio uses `onerror` handlers extensively. If GitHub OG images fail to load, a fallback placeholder is instantly substituted. LinkedIn previews utilize `microlink.io` for robust unfurling.

### 4. Contact Form (Formspree)
The form `action` in both `index.html` and `Contact.html` uses:
`https://formspree.io/f/YOUR_FORMSPREE_ID`
**→ Replace `YOUR_FORMSPREE_ID` with a real ID from formspree.io to activate email delivery.**

---

## 📦 Dependencies (CDN only, no npm)

| Component           | Source                            | Purpose                        |
|---------------------|-----------------------------------|--------------------------------|
| Font Awesome 6.5    | cdnjs.cloudflare.com              | Icons throughout               |
| Google Fonts        | fonts.googleapis.com              | Inter, Space Grotesk, Orbitron |
| Formspree           | formspree.io/f/ID                 | Static contact form mailer     |
| `jekyll-seo-tag`    | GitHub Pages plugin               | Auto `<meta>` & OG tags        |
| `jekyll-sitemap`    | GitHub Pages plugin               | sitemap.xml generation         |

---

## 🖥️ Page Inventory

| # | File              | URL                    | Description                                     |
|---|-------------------|------------------------|-------------------------------------------------|
| 1 | `index.html`      | `/`                    | Full one-page portfolio (hero → contact)        |
| 2 | `Projects.html`   | `/Projects.html`       | Filterable project gallery                      |
| 3 | `Updates.html`    | `/Updates.html`        | LinkedIn post cards                             |
| 4 | `Contact.html`    | `/Contact.html`        | Dedicated contact page                          |
| 5 | `404.html`        | Not Found              | Terminal-style 404 + auto-redirect              |

---

## ✅ Working Features

- [x] Zero-framework Vanilla HTML/CSS/JS
- [x] Flash-free dark/light theme with `localStorage`
- [x] Theme toggle: 🌙 dark (unchecked) ↔ ☀️ light (checked)
- [x] Typed role cycling in hero
- [x] IntersectionObserver scroll fade-up animations
- [x] Responsive nav with hamburger mobile menu
- [x] Filterable project grid (Projects.html)
- [x] Formspree static contact form (AJAX, no redirect)
- [x] SEO: JSON-LD, Open Graph, canonical, sitemap
- [x] `_data/links.json` as single source of truth for all URLs

---

## 📌 Conventions

1. **No raw git commands** — always use `git-sync.sh`
2. **CSS variables only** — never hardcode hex colors in HTML; bind to `:root` tokens
3. **Absolute URLs** for OG images and canonical links (GitHub Pages subdomain)
4. **Copy flash-free theme script** into every new `.html` file's `<head>` before any CSS

---

## 🔄 Session Log

### 2026-06-18 — Session 1
- Initial project bootstrapping and documentation setup.

### 2026-06-18 — Session 2 (Major Rebuild)
- **Full from-scratch rewrite**: All HTML, CSS, JS replaced.
- Applied Zedetta palette (`#37013a`, `#af3dff`, `#55ffe1`, `#ff3b94`, `#a6fd29`).
- Matrix rain background permanently removed.
- New `style.css`: 700+ line design system with CSS custom properties and Zedetta tokens.
- New `script.js`: theme, nav, typed effect, scroll animations, filter tabs, AJAX
## 🐛 Recent Debugging & Fixes
- **Theme Toggle Bug:** The light/dark theme wasn't working. It was visually changing to the sun emoji, but the CSS background didn't change. This was root-caused to an unescaped single quote in `script.js` (`I'll get back to you`) causing a syntax error. Once fixed, `script.js` ran perfectly and toggled the `data-theme` on the `html` element.
- * **Data Handling:** Converted `Projects.html` to dynamically fetch repositories from the GitHub API (`api.github.com/users/North-Abyss/repos`) and `Updates.html` to dynamically fetch and render LinkedIn posts directly from `_data/links.json`. No more hardcoded DOM elements.
  * **Morphic Neon Hero**: The home page hero section utilizes advanced `backdrop-filter: blur(20px)` panels (`.hero__morphic-panel`) layered over intense, animating CSS gradient blobs (`.blob`). This achieves a premium glassmorphism/neumorphism aesthetic heavily focused on **Zedetta Palette** colors (Neon Violet and Electric Cyan base).
  * **Hero Stats Component**: The hero section now includes a `.hero__stats` vertical column of glass panels displaying the user's key metrics (Flutter Days, Hackathons, CGPA) alongside the main circular avatar.
  * **Theme System & Uiverse Components**: The site features a deeply customized Uiverse-inspired neon slider toggle, complete with FontAwesome Sun/Moon icons and glowing inset shadows. Cross-page synchronization is handled flawlessly by `window.addEventListener('storage')`, and light mode features crisp, opaque white headers for maximum contrast.
  * **Legacy Integration**: The `old` branch is successfully tracked and checked out in the `/old` folder. All legacy static links are preserved, acting as a historical reference alongside the newly upgraded dynamic Git/LinkedIn fetching engines.
- Created `_data/links.json` as the canonical URL data file.
- Archived old version in `old` git branch.

---

## 🗒️ Open TODOs

### TODO
*   **Resume integration:** User mentioned possibly adding a `resume.pdf` later and linking it from the 'About' section.
*   **Formspree Contact:** Replace the `YOUR_FORMSPREE_ID` placeholder in `Contact.html` with a registered Formspree hash for production.

---

### 2026-06-19 — Session 3 (Theme Sync + Dynamic Data Overhaul)

**Problems fixed:**
1. **Theme toggle per-page isolation** — The `window.addEventListener('storage', ...)` already handled cross-tab sync correctly. The real issue was that `Projects.html` had both hardcoded cards AND `initGitHubData()` running, causing duplicates. Also `initFilterTabs()` cached DOM nodes before async cards were inserted, so filtering broke after load.
2. **Projects page** — Removed all hardcoded card HTML. Grid is now fully powered by `_data/links.json` via `initGitHubData()`.
3. **Updates page** — Removed all hardcoded update card HTML. Grid is now fully powered by `_data/links.json` via `initUpdatesData()`.
4. **Filter tabs** — Rewrote `initFilterTabs()` to use event delegation (queries `.project-card` live on each click), so it works correctly after async injection. `initFilterTabs()` is also re-called inside `initGitHubData()` after DOM update. Added new **Web** filter tab.
5. **`_data/links.json`** — Added `filter` (short key: `game`, `flutter`, `ai`, `systems`, `web`) and `tags` arrays to every project. `data-category` on injected cards now uses `filter`, matching filter tab `data-filter` values exactly.
6. **Error states** — Both `initGitHubData()` and `initUpdatesData()` now show graceful error messages with fallback links on failure.

**Key rule to remember:**
- When `initGitHubData()` runs on `Projects.html`, it calls `initFilterTabs()` again after inserting cards into the DOM.
- `initFilterTabs()` uses `cloneNode` to remove stale event listeners before attaching a fresh one.
- Filter categories: `game` | `flutter` | `ai` | `systems` | `web` | `all`
