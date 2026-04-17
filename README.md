
# Portfolio 🌌

A futuristic, highly interactive personal portfolio website designed for **Yuvanesh KS**, bridging the gap between **Linux System Administration** and **Data Engineering**.

Live Demo: [https://north-abyss.github.io/Portfolio/](https://north-abyss.github.io/Portfolio/)

## 📖 About The Project

This portfolio features a "Deep Space" aesthetic with dynamic visual effects to showcase a transition from Game Development to Enterprise Infrastructure. It is built to be fast, responsive, and visually engaging without relying on heavy frontend frameworks.

**Current Persona:**
* **Role:** System Architect & Data Engineer 🐧🚀
* **Focus:** Enterprise Linux (Rocky/Arch), Virtualization (KVM), and Big Data Pipelines (Databricks).
* **Key Projects:** Enterprise Home Lab, Caelestia Shell, SDN Analysis.

### 🗂️ Core Architecture
The portfolio utilizes a multi-page structure cleanly integrated using Jekyll and native HTML for optimal SEO parsing:
- **`index.html`**: The unified landing page.
- **`Projects.html`**: The main repository gallery showcasing open-source game development and data engineering web apps.
- **`Updates.html`**: A dedicated LinkedIn/social activity feed.
- **`404.html`**: A native GitHub Pages catch-all error handling route.
- **`issues.md`**: The official changelog and SEO audit tracker.

## ✨ Key Features

* **Matrix Rain Background:** A mesmerizing, animated background pattern using CSS animations, inspired by the Matrix code rain.
* **Theme Toggle (`localStorage`):** Switch between **Deep Space (Dark)** and **Clean (Light)** modes. Your active theme is instantly synchronized across all pages!
* **Glassmorphism UI:** Modern, translucent card designs with neon accents using `backdrop-filter`.
* **Interactive Elements:**
    * **Hovers:** Neon glows and scale effects managed securely in `style.css`.
    * **Typing Effect:** Dynamic role text animation managed via `script.js`.
    * **Open Graph Previews:** Dynamic visual previews automatically fetched via GitHub's Open Graph API (`opengraph.githubassets.com`).
* **Responsive Layouts:** Grid-responsive structures using pure CSS for optimum layout integrity block rendering on mobile devices.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure with integrated Open Graph metadata logic across multiple routes.
* **CSS3:** Built strictly on CSS Custom Properties (`var`), `@keyframes` intersection animations, and structural pseudo-classes.
* **JavaScript (Vanilla):** Light footprint managing DOM observer intersection logic and Theme syncing natively. No jQuery/React dependencies.
* **Hosting Ecosystem:** GitHub Pages running Jekyll backend plugins (`jekyll-seo-tag`, `jekyll-sitemap`).

## 🚀 Usage

Simply open `index.html` in any modern web browser to view the site locally.

```bash
# Clone the repo
git clone https://github.com/North-Abyss/Portfolio.git

# Navigate to directory
cd Portfolio

# Open locally (Linux)
xdg-open index.html
```

## 🎨 Customization

### Changing Colors

Edit the `:root` variables in `style.css` to match your preferred color scheme:

```css
:root {
    --accent-cyan: #00f3ff;  /* Primary Neon */
    --accent-purple: #bc13fe; /* Secondary Neon */
    --bg-deep: #05050a;       /* Background Base */
}
```

### Adjusting Matrix Effect

The matrix animation speed and colors can be tweaked in the `.jp-matrix` classes in `style.css`.

## 💎 Credits & Acknowledgments

* **Background Animation:** "Matrix Rain" by **solowzrd** via [Uiverse.io](https://uiverse.io/).
* **Theme Toggle:** Custom animated toggle switch inspired by designs on **Uiverse.io**.
* **Icons:** [Font Awesome](https://fontawesome.com/) for social links and UI elements.
* **Fonts:** 'Orbitron' and 'Inter' via [Google Fonts](https://fonts.google.com/).

---

*Created by [Yuvanesh KS](https://github.com/North-Abyss)*
