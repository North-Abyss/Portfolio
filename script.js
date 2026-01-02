document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-effect');
    const roles = ["Linux Enthusiast", "Game Developer", "RAG Integrator", "Open Source Contributor"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // Theme Toggle Logic
    const themeCheckbox = document.getElementById('theme-checkbox');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeCheckbox.checked = savedTheme === 'light'; // Light is checked (Sun/Day mode for this toggle logic?)
        // Wait, looking at CSS:
        // .slider:checked + .switch { background-color: #112350; } -> Dark Blue.
        // And it shows moons/stars.
        // So CHECKED = DARK MODE (Night).
        // UNCHECKED = LIGHT MODE (Day).

        // My site defaults to Dark Mode in :root.
        // So if savedTheme is 'dark', it should be CHECKED.
        // If savedTheme is 'light', it should be UNCHECKED.

        themeCheckbox.checked = savedTheme === 'dark';
        updateThemeIcon(savedTheme);
    } else {
        // Default is Dark Mode (:root), so check it by default
        themeCheckbox.checked = true;
    }

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

    function type() {
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
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();

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

    // Add this style dynamically or in css, ensuring opacity starts at 0
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .fade-in-section.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
