# Portfolio 🌌

Personal portfolio website for **Yuvanesh KS** (`@North-Abyss`), focused on **Cloud & Linux Infrastructure**, **Cross-Platform App Development (Flutter)**, and **AI / Quantum ML Research**.

**Live Site:** [https://north-abyss.github.io/Portfolio/](https://north-abyss.github.io/Portfolio/)

---

## 📖 About The Project

Built in pure **Vanilla HTML5, CSS3, and JavaScript** with zero build frameworks (no React, Vue, Tailwind, or bundlers), styled with the dual-mode **High Gloss Mono** claymorphic design system and hosted statically on GitHub Pages.

- **Role:** Software Engineer | Cloud & Linux Infrastructure | Cross-Platform App Dev (`B.Tech IT '27`, CGPA `8.26`)
- **Flagship Work:**
  - **Abyss Chat:** Decentralized P2P Flutter + WebRTC + mDNS + AES-GCM messenger published on Google Play (`com.abyss.chat`)
  - **Iris-Image:** Qutrit (`d = 3`) Variational Quantum Classifier for image classification (IRIS 2027 selected abstract; full paper under review for Springer Nature LNEE)
  - **SkyPrognos:** Aviation RUL predictive maintenance platform (PyTorch + ONNX Runtime + Streamlit)
  - **Universal UI Themes:** Open-source CSS design system with 34 themes & 11 swappable palettes (`north-abyss.github.io/ui-themes`)
  - **Virtualization Home Lab & Starvik Infrastructure:** KVM/QEMU (`virbr0`), Docker Compose, Hetzner VPS, Bunny.net CDN, Cloudflare R2

---

## 🏗️ Structure & Tooling

```text
Portfolio/
├── index.html              # Unified landing page (Hero, About, Experience, Projects, Updates, Contact)
├── Projects.html           # Filterable project gallery (All / Game / Flutter / AI / Systems / Web)
├── Commercial.html         # Released Products & client/cloud infrastructure showcase
├── Updates.html            # LinkedIn social & technical feed
├── Contact.html            # Contact form (Formspree), links & JSON/PDF resume downloads
├── 404.html                # Terminal-style GitHub Pages 404 route
├── style.css               # High Gloss Mono CSS custom properties & claymorphic UI
├── script.js               # Theme sync, nav, typing effect, scroll reveals & dynamic renderers
├── _config.yml             # Jekyll SEO & sitemap config for GitHub Pages
├── robots.txt & sitemap.xml# Crawler & SERP sitemap indexing
├── _data/data.js           # Canonical Single Source of Truth for projects, posts & experience
├── Assets/                 # Resume.pdf, resume-data.json & image fallbacks
├── AGENTS.md               # Minimal PT-derived operating manual for AI coding agents
├── .agentignore            # AI context shielding (ignores tmp/, old/, social-data/, .playwright-mcp/)
├── git-sync.sh             # Universal v0.5.0 commit, rebase, push & tag script
├── scripts/dev/            # verify_web.sh (local/Playwright audit) & hook_safety_gate.py
├── .agents/                # PreToolUse safety hook & relevant skills (browser-testing, code-review)
└── CHANGELOG.md            # Versioned project changelog
```

---

## 🎨 Design System (High Gloss Mono)

Flash-free dark/light theme switching runs inline in `<head>` via `localStorage` before styles render, synchronized across tabs via CSS custom properties in `style.css`:
- **Dark Mode (`--bg-void: #000000`, `--bg-surface: #1f1f1f`, `--text-100: #ffffff`)**
- **Light Mode (`--bg-void: #ffffff`, `--bg-surface: #f0f0f0`, `--text-100: #000000`)**
- **Visual Highlights:** Claymorphic hover shadows, `.ambient-spots` parallax blur backdrop, inline LinkedIn video embeds, and automatic GitHub OpenGraph error fallbacks (`Assets/github-placeholder.png`).

---

## 🚀 Local Preview, Verification & Sync

Use a local static HTTP server rather than `file://` so root links and dynamic data load identically to GitHub Pages:

```bash
# 1. Start local static server
python3 -m http.server 8080

# 2. Verify HTTP status, HTML / Playwright console errors (outputs to tmp/audit/)
./scripts/dev/verify_web.sh http://localhost:8080

# 3. Commit and sync changes safely to GitHub Pages
./git-sync.sh --sync -m "feat: update portfolio content"
```

---

*Maintained by [Yuvanesh KS (@North-Abyss)](https://github.com/North-Abyss)*
