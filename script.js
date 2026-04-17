document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-effect');
    const roles = ["Linux Enthusiast", "Game Developer", "Godot Engine Enthusiast", "Open Source Contributor", "IDC Joint Secretary"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    // Theme Toggle Logic
    const themeCheckbox = document.getElementById('theme-checkbox');

    // Apply saved user theme after system default (system already applied in head script)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Ensure checkbox reflects the active theme (checked = dark)
    const currentTheme = document.documentElement.getAttribute('data-theme') || ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
    themeCheckbox.checked = currentTheme === 'dark';
    updateThemeIcon(currentTheme);

    themeCheckbox.addEventListener('change', () => {
        const newTheme = themeCheckbox.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            // Update header icons color for light mode
            document.querySelectorAll('.header-contacts .social-icon').forEach(icon => {
                icon.style.color = '#333';
            });
        } else {
            // Update header icons color for dark mode
            document.querySelectorAll('.header-contacts .social-icon').forEach(icon => {
                icon.style.color = '#fff';
            });
        }
    }

    let lastTime = 0;
    function type(timestamp) {
        if (!typingElement) return;
        if (!lastTime) lastTime = timestamp;

        const elapsed = timestamp - lastTime;

        if (elapsed > typeSpeed) {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            lastTime = timestamp;
        }

        requestAnimationFrame(type);
    }

    requestAnimationFrame(type);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want it to only animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-title, .neon-button').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });

    // Matrix generation (deterministic: one pattern duplicated, constant cell size)
    (function () {
        const container = () => document.getElementById('jp-matrix') || document.querySelector('.jp-matrix');
        const PATTERN = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヲ", "ン", "ガ", "ギ", "グ", "ゲ", "ゴ", "ザ", "ジ", "ズ", "ゼ", "ゾ", "ダ", "ヂ", "ヅ", "デ", "ド", "バ", "ビ", "ブ", "ベ", "ボ", "パ", "ピ", "プ", "ペ", "ポ"];

        function generateMatrix() {
            const ct = container();
            if (!ct) return;
            const cs = getComputedStyle(ct).getPropertyValue('--cell-size') || '';
            const cellSize = parseInt(cs, 10) || 44; // fixed cell fallback (44px per request)
            const rect = ct.getBoundingClientRect();
            const width = Math.max(0, Math.floor(rect.width));
            const height = Math.max(0, Math.floor(rect.height));
            const style = getComputedStyle(ct);
            const paddingY = parseFloat(style.paddingTop || 0) + parseFloat(style.paddingBottom || 0);
            const paddingX = parseFloat(style.paddingLeft || 0) + parseFloat(style.paddingRight || 0);
            const usableWidth = Math.max(0, width - paddingX);
            const usableHeight = Math.max(0, height - paddingY);
            const cols = Math.max(1, Math.floor(usableWidth / cellSize));
            const rows = Math.max(1, Math.floor(usableHeight / cellSize));

            // Fill matrix continuously across rows (do not restart pattern each row)
            const total = rows * cols;
            let html = '';
            for (let i = 0; i < total; i++) {
                const ch = PATTERN[i % PATTERN.length];
                html += `<span>${ch}</span>`;
            }

            ct.innerHTML = html;
        }

        let resizeTimer;
        function debouncedGenerate() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(generateMatrix, 120);
        }

        function scheduleMatrixGeneration() {
            const run = () => {
                if (document.fonts && document.fonts.ready) {
                    document.fonts.ready.then(generateMatrix).catch(generateMatrix);
                } else {
                    generateMatrix();
                }

                // Attach listeners after first generation to avoid overhead during initial load
                window.addEventListener('resize', debouncedGenerate);
                window.addEventListener('orientationchange', debouncedGenerate);
            };

            if ('requestIdleCallback' in window) {
                requestIdleCallback(run, { timeout: 1500 });
            } else {
                window.addEventListener('load', run);
            }
        }

        // Defer generation to idle time to reduce initial load/TTI impact
        scheduleMatrixGeneration();

        // Performance: Pause animation when off-screen
        const matrixObserver = new IntersectionObserver((entries) => {
            const ct = container();
            if (!ct) return;
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    ct.classList.add('paused');
                } else {
                    ct.classList.remove('paused');
                }
            });
        });

        // Start observing once the container is available
        const ct = container();
        if (ct) matrixObserver.observe(ct);
        else window.addEventListener('DOMContentLoaded', () => {
            const c = container();
            if (c) matrixObserver.observe(c);
        });

    })();

    // Hide loader when window finishes loading resources
    const tetrisOverlay = document.getElementById('tetrisOverlay');
    const loaderBack = document.getElementById('loaderBackLayer');
    window.addEventListener('load', () => {
        if (tetrisOverlay) {
            tetrisOverlay.classList.add('tetris-hidden');
        }

        // hide and remove the back layer as well
        if (loaderBack) {
            loaderBack.classList.add('hidden');
        }

        // remove from DOM after transition so these elements don't capture events
        setTimeout(() => {
            if (tetrisOverlay && tetrisOverlay.parentNode) tetrisOverlay.parentNode.removeChild(tetrisOverlay);
            if (loaderBack && loaderBack.parentNode) loaderBack.parentNode.removeChild(loaderBack);
        }, 400);
    });
});
