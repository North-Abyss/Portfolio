# Changelog

All notable changes to the Yuvanesh KS Portfolio project are documented in this file.

## [1.4.0] - 2026-11-25

### Portfolio Flagships, SEO & Performance
- **New Research & UI Releases (`637174c`):** Added **Iris-Image** (Qutrit Variational Quantum Classifier for direct pixel ternary image classification; selected abstract with full paper under review at IRIS 2027, Shaastra IIT Madras / Springer Nature LNEE) and updated **Universal UI Themes** (**34 themes & 11 palettes**).
- **Updates, SEO & Performance:** Synced latest LinkedIn engineering posts into `_data/data.js`, refreshed structured metadata & `sitemap.xml`, and optimized resource `preconnect` hints across HTML pages.

### ATS Resume Suite & Canonical Sync
- **Canonical Resume (`Assets/Resume.pdf`):** Rebuilt via WeasyPrint with Arial TrueType typography, single-line Flexbox layout (`pdftotext` / `-bbox` verified strict 1-page reading order), verified phone (`+91-9080190600`), BGV-aligned Starvik dates (`Flutter Internship Team Lead | Jun 2026 - Jul 2026`), and synced `Yuvanesh-KS-Resume-Software-IT-Intern.pdf` directly to `Assets/Resume.pdf`.

### Minimal PT Workflow & Tooling Integration
- **Essentials-Only Integration from `North-Abyss/PT`:** Added `AGENTS.md`, `.agentignore`, `.agents/hooks.json`, `scripts/dev/hook_safety_gate.py`, `scripts/dev/verify_web.sh`, and 2 relevant skills (`browser-testing`, `code-review`).
- **Repo Tooling Upgrades:** Upgraded `.gitignore` (preserving local Portfolio ignores while blocking secrets, caches, builds, and `.zed/` configs) and upgraded `git-sync.sh` to **v0.5.0** (replacing the legacy Trackify sync label and adding `--sync`, `--skip-ci`, `--watch`).
- **Documentation Sync:** Updated `README.md`, `CHANGELOG.md`, `issues.md`, and `agent-memory.md`.

## [1.3.0] - 2026-11-02

### Search Footprint & Knowledge Graph Alignment
- **Schema & Metadata Refinement (`52b4a29`, `18487e0`, `0f5a177`):** Replaced `alumniOf` with `affiliation` in `index.html` JSON-LD `Person` schema and prioritized **Quantum ML** and **Linux KVM** engineering tokens across meta keywords, skills, and `Assets/resume-data.json`.

## [1.2.0] - 2026-10-31 to 2026-11-01

### Public Repos Integration & Card Preview Resilience
- **New Flagship Projects (`94a866f`):** Integrated `SkyPrognos`, `ui-themes`, and `JAVA-30` across `_data/data.js`, `Assets/resume-data.json`, `Commercial.html`, `Projects.html`, and `index.html`, with `Live Demo` CTA labels for non-game web builds.
- **Image Fallback Hardening (`8f26cbe`):** Removed `SMART-TRAP` from homepage highlights (still retained in `Projects.html` / `_data/data.js`), added inline `onerror` and lazy-load fallbacks (`Assets/github-placeholder.png`, `Assets/Linkedin-Placeholder.png`) to counter GitHub OpenGraph HTTP 429 rate limits, and added `color: transparent` on `.project-card__img` to prevent alt-text bleed.
- **SEO Polish:** Updated `sitemap.xml` timestamps and added `noindex, follow` to `404.html`.

## [1.1.1] - 2026-10-12

### SEO, Google SERP Structured Data & 404 Routing
- **Sitemap & Robots (`48dacf1`):** Created `robots.txt` specifying `https://north-abyss.github.io/Portfolio/sitemap.xml` to improve Google Search Console indexing.
- **Nested Sitelinks & Breadcrumbs:** Injected Schema.org `@graph` (`WebSite`, `SiteNavigationElement`, enriched `Person` graph) into `index.html`, plus `BreadcrumbList` JSON-LD across subpages.
- **404 Path Resolution & Initial 1-Page Resume (`a25c26e`, `becb5e4`, `540d27f`):** Fixed GitHub Pages subpath asset resolution in `404.html` and added the initial generated `Assets/Resume.pdf`.

## [1.1.0] - 2026-10-11

### Consolidated Data Layer (Single Source of Truth)
- Merged `_data/links.json` into `_data/data.js` and established `_data/data.js` as the sole canonical data source (`8145db7`).
- Removed redundant `_data/links.json`.
- Updated `script.js` `getData()` to read directly from `window.PORTFOLIO_DATA`.
- Added dynamic and static JSON resume export (`Assets/resume-data.json`).

### Factual Corrections & Positioning
- **CGPA:** Set to `8.26` consistently across all pages, hero stats, and education entries.
- **Trackify:** Corrected state management to `Provider` and local storage to `SharedPreferences`; builds labeled Web, Android, Windows, and Linux.
- **Abyss Chat:** Corrected signaling details to `PeerJS` + `STUN` and `mDNS` LAN discovery; added Google Play Store link.
- **Wave of Fate:** Aligned genre to 2D Metroidvania-style action platformer in Godot Engine 4.
- **Q-Ternary-VQC / AI-Sugarcane / Harmony-Music:** Verified accurate descriptions, roles, and frameworks (`Flask` + `TabNet` for AI-Sugarcane).
- **Released Products (`Commercial.html`):** Renamed heading/navigation labels from "Commercial" to "Released Products" while retaining `Commercial.html` for URL stability, and added Starvik website & developer portal cards.
