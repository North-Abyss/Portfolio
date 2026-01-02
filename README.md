# Antigravity Portfolio 🌌

A futuristic, highly interactive personal portfolio website featuring a "Deep Space" aesthetic with dynamic visual effects.

## ✨ Key Features

-   **Matrix Rain Background**: A mesmerizing, animated background pattern using CSS animations (`style.css` & `index.html`) inspired by the Matrix code rain.
-   **Theme Toggle**: Switch between **Deep Space (Dark)** and **Clean (Light)** modes. The preference is saved locally.
-   **Glassmorphism UI**: Modern, translucent card designs with neon accents using `backdrop-filter`.
-   **Interactive Elements**:
    -   Hovers: Neon glows and scale effects.
    -   Typing Effect: Dynamic role text animation in `script.js`.
    -   Profile Cards: Dedicated previews for GitHub and LinkedIn integration.
-   **Responsive Design**: Fully optimized for desktop and mobile viewing.

## 🛠️ Tech Stack

-   **HTML5**: Semantic structure.
-   **CSS3**: Custom variables, Grid/Flexbox, Keyframe animations (`@keyframes smooth-pulse`).
-   **JavaScript (Vanilla)**: Theme logic, local storage handling, and typing effects.
-   **Uiverse.io**: Source for the "Matrix" background and "BB-8" theme toggle.

## 🚀 Usage

Simply open `index.html` in any modern web browser.

```bash
# Clone the repo
git clone https://github.com/yourusername/antigravity-portfolio.git

# Open directly
open index.html
```

## 🎨 Customization

### Changing Colors
Edit the `:root` variables in `style.css`:
```css
:root {
    --accent-cyan: #ff0055;  /* Primary Accent */
    --accent-purple: #0575E6; /* Secondary Accent */
    --bg-deep: #05050a;       /* Background Base */
}
```

### Adjusting Matrix Effect
The matrix animation speed and colors can be tweaked in the `.jp-matrix` classes in `style.css`.
