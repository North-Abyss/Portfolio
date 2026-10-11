# Changelog

All notable changes to the Yuvanesh KS Portfolio project are documented in this file.

## [Unreleased] - 2026-10-11

### Consolidated Data Layer (Single Source of Truth)
- Merged `_data/links.json` into `_data/data.js` and established `data.js` as the sole canonical data source.
- Removed redundant `_data/links.json`.
- Updated `script.js` `getData()` to read directly from `window.PORTFOLIO_DATA`.
- Added dynamic and static JSON resume export feature for instant downloading and sharing.

### Factual Corrections & Positioning
- **CGPA**: Set to 8.26 consistently across all pages, hero stats, and education entries.
- **Trackify**: Corrected state management to Provider and local storage to SharedPreferences (removed Riverpod and Hive references); labeled builds as Web, Android, Windows, and Linux. Removed proprietary/enterprise claims.
- **Abyss Chat**: Corrected signaling details to PeerJS + STUN and mDNS LAN discovery; removed "Socket Signaling" and "zero-server" wording; added Play Store link.
- **Wave of Fate**: Specified Godot Engine with custom physics (removed "custom physics engine"); aligned genre to 2D Metroidvania-style action platformer.
- **Q-Ternary-VQC**: Aligned role and status with open-source research publication; removed unsupported "First" claims while highlighting 72 parameters, logarithmic qudit compression, and SHAP explainability.
- **AI-Sugarcane**: Corrected frontend/backend stack references to Flask and TabNet (removed Streamlit mentions in hero/cards).
- **Harmony-Music**: Clearly marked as a fork/learning exploration of `anandnet/Harmony-Music`.
- **antigravity-brain-web**: Explicitly documented as an experimental prototype and visualizer.
- **Experience**:
  - Relabeled Home Lab to "Project: Virtualization Home Lab" reflecting an experimental learning setup; removed "zero-downtime" and "Software Engineer" claims.
  - Removed duplicate Game Off entry from experience (already highlighted in projects).
  - Cleaned education entry (removed Adobe India and MPL).
  - Added Starvik website and developer portal infrastructure contributions.

### Commercial Page -> Released Products
- Renamed page heading, meta tags, and navigation links across all pages from "Commercial" to "Released Products".
- Retained `Commercial.html` filename for URL stability.
- Added Starvik Website and Developer Portal cards detailing server setup, Git CI/CD, Bunny.net CDN, and backend environment configuration.
- Added HTML comment placeholder for future verified client work and customer case studies.

### Positioning & UI Polish
- Unified hero, typed text, and README positioning: "Linux, networking and systems software; Flutter apps".
- Reordered featured projects on `index.html`: Abyss Chat, Virtualization Home Lab, SMART-TRAP, Q-Ternary-VQC, Trackify, Wave of Fate.
- Renamed `Assets/Github-placholder.png` to `Assets/github-placeholder.png` and fixed all image references.
- Updated `sitemap.xml` timestamps to 2026-10-11.
