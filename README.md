# Portfolio 🌌

A futuristic, highly interactive personal portfolio website designed for **Yuvanesh KS**, bridging the gap between **Linux System Administration** and **Data Engineering**. 

**Live Demo**: [https://north-abyss.github.io/Portfolio/](https://north-abyss.github.io/Portfolio/)

---

## 📖 About The Project

This portfolio features a "Deep Space" aesthetic with dynamic visual effects to showcase a transition from Game Development to Enterprise Infrastructure. It is designed to be **fast, responsive, and visually engaging** without relying on heavy frontend frameworks (no React, no jQuery).

**Current Persona:**
* **Role:** System Architect & Data Engineer 🐧🚀
* **Focus:** Enterprise Linux (Rocky/Arch), Virtualization (KVM), and Big Data Pipelines (Databricks).
* **Key Projects:** Enterprise Home Lab, Caelestia Shell, SDN Analysis.

---

## 🏗️ Structure & Architecture

This is a **Static Website hosted on GitHub Pages**. It utilizes GitHub's native Jekyll backend to automatically handle SEO generation, routing, and metadata, ensuring a completely serverless frontend architecture.

### File Structure
The portfolio utilizes a multi-page routing structure for optimal SEO and performance:
- **`index.html`**: The unified landing page and main interactive hub.
- **`Projects.html`**: The main repository gallery showcasing open-source game development and data engineering web apps.
- **`Updates.html`**: A dedicated LinkedIn and social activity feed.
- **`404.html`**: A native GitHub Pages catch-all error handling route.
- **`Contact.html`**: Dedicated contact page with a static Formspree mailer integration.
- **`style.css`**: The core styling engine containing all design logic and CSS variables.
- **`script.js`**: Lightweight DOM logic for intersection observers, theme toggling, and data hydration.
- **`_config.yml`**: GitHub Pages / Jekyll configuration for automated SEO meta tag generation.
- **`_data/`**: Centralized data repository (`data.js`, `links.json`) that dynamically powers the UI across all HTML pages.

---

## 🎨 Base Color Themes & Design

The site uses a responsive **Glassmorphism** UI pattern with a dynamically toggled dark/light theme engine utilizing `localStorage`.

### Theme Engine Details
CSS custom variables in the `:root` pseudo-class control the entire aesthetic. We use the **Neon Light Palette by Zedetta**.

**Deep Space Theme (Dark Mode) - Default**
- **Base Background (`--bg-void`)**: `#0d0010` (Pure deep space black)
- **Gradient Base (`--bg-surface`)**: `#1a0020` / `#37013a` (Plum)
- **Primary Accent (`--violet`)**: `#af3dff` (Neon Violet)
- **Secondary Accent (`--cyan`)**: `#55ffe1` (Electric Cyan)
- **Highlights (`--pink` & `--green`)**: `#ff3b94`, `#a6fd29`
- **Text (`--text-100`)**: `#ffffff` (Pure White)

**Clean Theme (Light Mode)**
- **Base Background (`--bg-void`)**: `#f8f4ff` (Soft white)
- **Gradient Base (`--bg-surface`)**: `#e8e0f8`
- **Primary Accent (`--violet`)**: `#8a22d4` (Royal Purple)
- **Secondary Accent (`--cyan`)**: `#00bba3` (Dark Teal)
- **Primary Text (`--text-100`)**: `#1a0030` (Dark purple/charcoal)

### Key Visual Features
* **Morphic Neon Hero:** Advanced `backdrop-filter: blur(20px)` panels and animated gradients.
* **Glassmorphism UI:** Translucent card designs with neon accents.
* **Dynamic Open Graph Previews:** Automated visual previews for GitHub repos and robust `microlink.io` unfurling for LinkedIn posts.

---

## ⚙️ What This Project Does & Needs

### What It Does
- Serves as a central, highly indexable personal hub.
- Synchronizes theme preferences instantly across multiple sub-pages without flashing.
- Displays rich media (LinkedIn posts, GitHub repositories) in a standardized, performant grid format.

### Future Needs & Maintenance
1. **Zero-Framework Strictness:** Maintain the vanilla HTML/CSS/JS architecture. Do not add React, Vue, or Tailwind.
2. **SEO Optimization Maintenance:** Ensure any new HTML pages include the `_config.yml` integrations and semantic `<meta>` tags.
3. **Core Web Vitals:** Keep DOM manipulation minimal in `script.js` to ensure fast Time-To-Interactive (TTI) scores on mobile devices.
4. **CSS Variable Integrity:** All new colors or thematic elements MUST be bound to the `:root` variables in `style.css` to prevent theme-breaking behavior.

---

## 🚀 Usage & Deployment

Since all data needed is contained within the repository and served statically, deployment is entirely automated via GitHub Pages.

### Local Development
Simply open `index.html` in any modern web browser to view the site locally.

```bash
# Clone the repo
git clone https://github.com/North-Abyss/Portfolio.git

# Navigate to directory
cd Portfolio

# Open locally (Linux example)
xdg-open index.html
```

### GitHub Pages Deployment
1. Commit any changes to the `main` branch.
2. GitHub Actions will automatically trigger the Jekyll build process.
3. The site will be live at `https://north-abyss.github.io/Portfolio/` within ~1-2 minutes.

---
*Created by [Yuvanesh KS](https://github.com/North-Abyss)*
