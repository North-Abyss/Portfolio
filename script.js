/* ============================================================
   YUVANESH KS PORTFOLIO — script.js
   Clean Vanilla JS: Nav, Theme, Scroll Animations,
   Typed Effect, Filter Tabs, Contact Form
   ============================================================ */

'use strict';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Shorthand for document.querySelector.
 * @param {string} selector - The CSS selector to match.
 * @param {ParentNode} [parent=document] - The parent node to search within.
 * @returns {Element|null} The first matching element or null.
 */
function $(selector, parent) {
  return (parent || document).querySelector(selector);
}

/**
 * Shorthand for document.querySelectorAll, returning an Array.
 * @param {string} selector - The CSS selector to match.
 * @param {ParentNode} [parent=document] - The parent node to search within.
 * @returns {Element[]} An array of matching elements.
 */
function $$(selector, parent) {
  return Array.from((parent || document).querySelectorAll(selector));
}

// ── Theme ─────────────────────────────────────────────────────────────────────

/**
 * Initializes the dark/light theme toggle functionality.
 * Reads the current theme from HTML attributes (set by the flash-free inline script)
 * and attaches event listeners to the toggle switch. Also synchronizes theme changes
 * across multiple browser tabs using the 'storage' event.
 */
function initTheme() {
  var toggle = $('#themeToggle');
  if (!toggle) return;

  // Sync checkbox state with current theme on load
  var current = document.documentElement.getAttribute('data-theme');
  toggle.checked = (current === 'light');

  toggle.addEventListener('change', function () {
    var next = this.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Cross-tab sync: fires when another tab writes to localStorage
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme' && e.newValue) {
      document.documentElement.setAttribute('data-theme', e.newValue);
      toggle.checked = (e.newValue === 'light');
    }
  });
}

// ── Nav: scroll + hamburger ───────────────────────────────────────────────────

/**
 * Initializes navigation bar behaviors including:
 * 1. Adding a 'scrolled' class when scrolling past 10px (for drop shadows/glassmorphism).
 * 2. Toggling the mobile hamburger menu open/closed.
 * 3. Highlighting the active link based on the current URL path.
 */
function initNav() {
  var nav         = $('#mainNav');
  var hamburger   = $('#hamburgerBtn');
  var mobileNav   = $('#mobileNav');

  // Scroll shadow
  window.addEventListener('scroll', function () {
    if (!nav) return;
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(open));
    });

    // Close on mobile link click
    $$('.nav__mobile-link', mobileNav).forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active link highlight
  var links = $$('.nav__link');
  var path  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href === path || href.startsWith(path.split('#')[0]))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ── Typed Effect ──────────────────────────────────────────────────────────────

/**
 * Initializes the typewriter effect in the hero section.
 * Cycles through an array of phrases, typing them out character by character,
 * pausing, and then deleting them to start the next phrase.
 */
function initTyped() {
  var el = $('#typedText');
  if (!el) return;

  var phrases = [
    'Software Engineer',
    'Cloud & Linux Infrastructure',
    'Cross-Platform App Dev',
    'Java • Python • Docker • CI/CD'
  ];
  var index    = 0;
  var charIdx  = 0;
  var deleting = false;
  var pause    = false;

  function tick() {
    var phrase  = phrases[index];

    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        pause = true;
        setTimeout(function () {
          pause = false;
          deleting = true;
          setTimeout(tick, 80);
        }, 1800);
        return;
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
      }
    }

    setTimeout(tick, deleting ? 45 : 90);
  }

  tick();
}

// ── Scroll Animations ─────────────────────────────────────────────────────────

/**
 * Initializes scroll-triggered animations using IntersectionObserver.
 * Elements with '.fade-up' or '.fade-in' classes will have the '.visible'
 * class added when they scroll into the viewport.
 */
function initScrollAnimations() {
  var targets = $$('.fade-up, .fade-in');
  if (!targets.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) {
    io.observe(el);
  });
}

// ── Filter Tabs (Projects page) ───────────────────────────────────────────────
// Uses event delegation so it works after initGitHubData() injects cards async.

/**
 * Initializes the filter tabs on the Projects page.
 * Implements event delegation to handle clicks on filter buttons, allowing
 * dynamically injected DOM elements (from fetch API) to be filtered without
 * re-binding event listeners.
 */
function initFilterTabs() {
  var tabs = $('#filterTabs');
  var grid = $('#projectsGrid');
  if (!tabs || !grid) return;

  // Remove any previously-attached listener to avoid duplicates
  var oldTabs = tabs.cloneNode(true);
  tabs.parentNode.replaceChild(oldTabs, tabs);
  tabs = oldTabs;

  tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-tab');
    if (!btn) return;

    $$('.filter-tab', tabs).forEach(function (t) {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    var filter = btn.dataset.filter;

    // Query cards live so dynamic cards are included
    $$('.project-card', grid).forEach(function (card) {
      var category = card.dataset.category || 'all';
      var show = filter === 'all' || category === filter;

      if (show) {
        card.style.display = '';
        card.classList.remove('visible');
        requestAnimationFrame(function () {
          card.classList.add('visible');
        });
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ── Contact Form ──────────────────────────────────────────────────────────────

/**
 * Initializes the Formspree contact form.
 * Handles client-side validation for required fields and email formatting.
 * Uses the Fetch API to submit the form asynchronously without reloading the page,
 * and displays success/error status messages to the user.
 */
function initContactForm() {
  var form   = $('#contactForm');
  var status = $('#formStatus');
  var btn    = $('#submitBtn');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);

    // Quick client-side validation
    var name    = data.get('name')   ? data.get('name').trim()    : '';
    var email   = data.get('email')  ? data.get('email').trim()   : '';
    var message = data.get('message')? data.get('message').trim() : '';

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'var(--pink)');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'var(--pink)');
      return;
    }

    var targetEmail = "yuvaneshkarunakaran@gmail.com";
    var mailSubject = data.get('subject') ? data.get('subject').trim() : 'Contact from Portfolio';
    
    var mailBody = "Name: " + name + "\n";
    mailBody += "Email: " + email + "\n\n";
    mailBody += "Message:\n" + message;

    var mailtoLink = "mailto:" + targetEmail + 
                     "?subject=" + encodeURIComponent(mailSubject) + 
                     "&body=" + encodeURIComponent(mailBody);

    // Open local email client
    window.location.href = mailtoLink;

    showStatus("Opening your email client...", 'var(--cyan)');
    
    setTimeout(function() {
      btn.disabled = false;
      btn.innerHTML = '<span class="material-symbols-rounded">send</span> Send Message';
      form.reset();
    }, 2000);
  });

  function showStatus(msg, color) {
    if (!status) return;
    status.textContent  = msg;
    status.style.color  = color;
    status.style.display = 'block';
    setTimeout(function () {
      status.style.display = 'none';
    }, 6000);
  }
}

// ── Smooth anchor scroll (for #hash links) ────────────────────────────────────

/**
 * Implements smooth scrolling for internal anchor links (e.g. href="#about").
 * Calculates offsets dynamically based on the height of the fixed navigation bar
 * to prevent content from being hidden underneath the header.
 */
function initAnchorScroll() {
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id  = link.getAttribute('href').slice(1);
    var el  = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    var offset = (parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 72) + 16;
    var top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });
}

// ── Dynamic Data Fetching ───────────────────────────────────────────────────
//
// getData() uses window.PORTFOLIO_DATA (set by data.js <script> tag) when
// available — this works on file:// protocol locally.
// Falls back to fetch('_data/links.json') when on a real server (GitHub Pages).

/**
 * Retrieves portfolio data from the global scope (if loaded via data.js)
 * or dynamically fetches it from '_data/links.json' as a fallback.
 * @returns {Promise<Object>} The parsed JSON data containing projects and updates.
 */
function getData() {
  if (window.PORTFOLIO_DATA) {
    return Promise.resolve(window.PORTFOLIO_DATA);
  }
  return fetch('_data/links.json').then(function(res) {
    if (!res.ok) throw new Error('fetch failed: ' + res.status);
    return res.json();
  });
}

/**
 * Fetches and renders the project gallery asynchronously.
 * Dynamically builds HTML cards for each project found in the data source,
 * applies the correct color accents based on tags, and handles image fallbacks.
 * Once injected, it re-initializes filter tabs and scroll animations.
 */
async function initGitHubData() {
  const grid = $('#projectsGrid');
  if (!grid) return;

  grid.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--violet);"></i></div>';

  try {
    const data = await getData();
    const repos = data.projects || [];

    let html = '';
    repos.forEach(repo => {
      const filter   = repo.filter || 'all';
      const category = repo.category || repo.filter || 'Project';
      const tagsHtml = (repo.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('');

      // Pick accent color per filter
      const accentMap = { game: 'var(--pink)', flutter: 'var(--cyan)', ai: 'var(--green)', systems: 'var(--violet)', web: 'var(--cyan)' };
      const accent = accentMap[filter] || 'var(--violet)';

      // Default fallback image if the OG image fails
      const fallbackImg = "Assets/Github-placholder.png";

      html += `
        <article class="project-card fade-up glass-panel" data-category="${filter}">
          <img src="Assets/Github-placholder.png" data-src="${repo.preview}" alt="${repo.name} preview" class="project-card__img lazy-img" loading="lazy" width="600" height="180"
               onerror="this.onerror=null; this.src='${fallbackImg}';">
          <div class="project-card__body">
            <div class="project-card__tags">
              <span class="project-tag" style="background: var(--bg-glass); color: ${accent}; border: 1px solid ${accent}; box-shadow: 0 0 8px ${accent}; opacity: 0.9;">${category}</span>
              ${tagsHtml}
            </div>
            <h2 class="project-card__title">${repo.name}</h2>
            <p class="project-card__desc">${repo.desc || 'No description provided.'}</p>
            <div class="project-card__footer" style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm uiverse-btn-glass">
                <i class="fab fa-github"></i> Repository
              </a>
              ${repo.web_url ? `
              <a href="${repo.web_url}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm uiverse-btn-glass">
                <i class="fas fa-play"></i> Live Play
              </a>` : ''}
            </div>
          </div>
        </article>
      `;
    });

    // Add a GitHub profile CTA card at the end
    html += `
      <article class="project-card fade-up glass-panel" data-category="all"
               style="cursor:pointer; align-items:center; justify-content:center; min-height:280px; text-align:center;"
               onclick="window.open('https://github.com/North-Abyss','_blank')">
        <div class="project-card__body"
             style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; padding: 3rem 2rem;">
          <i class="fab fa-github" style="font-size:3.5rem; color:var(--violet);"></i>
          <h2 class="project-card__title">See All on GitHub</h2>
          <p class="project-card__desc" style="text-align:center;">
            More repositories, contributions, and experiments on my GitHub profile.
          </p>
          <a href="https://github.com/North-Abyss" target="_blank" rel="noopener noreferrer"
             class="btn btn--primary btn--sm">
            <i class="fab fa-github"></i> Visit Profile
          </a>
        </div>
      </article>
    `;

    grid.innerHTML = html;

    // Re-init filter tabs AFTER cards are in the DOM
    initFilterTabs();
    // Trigger scroll animations for new elements
    requestAnimationFrame(() => {
      initScrollAnimations();
      initLazyLoading();
    });
  } catch (error) {
    console.error('Failed to fetch project data:', error);
    grid.innerHTML = '<div style="color:var(--pink); text-align:center; padding: 2rem;">Failed to load projects. <a href="https://github.com/North-Abyss" target="_blank" style="color:var(--violet);">View on GitHub →</a></div>';
  }
}

/**
 * Fetches and renders LinkedIn update cards asynchronously.
 * Uses microlink.io to generate rich preview images of LinkedIn posts.
 * Once injected into the DOM, it re-triggers scroll animations.
 */
async function initUpdatesData() {
  const grid = $('#updatesDataGrid');
  if (!grid) return;

  // Clear any hardcoded fallback cards before populating
  grid.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--cyan);"></i></div>';

  try {
    const data = await getData();

    if (!data.linkedin_posts || !data.linkedin_posts.length) return;

    let html = '';
    data.linkedin_posts.forEach((post, index) => {
      const delay = index * 80;
      const previewImgUrl = `https://api.microlink.io/?url=${encodeURIComponent(post.url)}&embed=image.url`;
      const iconHtml = post.icon ? `<span class="material-symbols-rounded" style="vertical-align: middle; font-size: 1.2rem; color: var(--violet); margin-right: 6px;">${post.icon}</span>` : '';

      html += `
        <article class="update-card fade-up glass-panel" data-delay="${delay}">
          <div class="update-card__header">
            <img src="https://avatars.githubusercontent.com/u/183628925?v=4" alt="Yuvanesh KS" class="update-card__avatar" width="44" height="44">
            <div>
              <div class="update-card__name">Yuvanesh KS</div>
              <div class="update-card__meta">${post.meta || 'LinkedIn Update'}</div>
            </div>
            <span class="update-card__badge" style="background: var(--bg-glass); color: var(--cyan); border: 1px solid var(--cyan); box-shadow: 0 0 8px var(--cyan);">${post.tag || 'Update'}</span>
          </div>
          <div class="update-card__body">
            <h3 class="update-card__title" style="margin-bottom: 8px; font-size: 1.1rem; color: var(--text-100);">${iconHtml}${post.title}</h3>
            <p class="update-card__desc" style="font-size: 0.95rem; color: var(--text-300); line-height: 1.6;">${post.desc || ''}</p>
            ${post.video_frame ? `
            <div style="margin-top: 1rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle);">
              ${post.video_frame}
            </div>
            ` : `
            <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="social-link-preview" style="display: block; margin-top: 1rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle); text-decoration: none; transition: transform 0.3s; background: var(--bg-surface);">
                <img src="Assets/Linkedin-Placeholder.png" data-src="${previewImgUrl}" alt="Preview" class="social-preview-image lazy-img" loading="lazy" width="600" height="315" 
                     onerror="this.onerror=null; this.src='Assets/Linkedin-Placeholder.png';" 
                     style="width: 100%; height: auto; aspect-ratio: 1200/630; object-fit: cover; display: block; border-bottom: 1px solid var(--border-subtle);">
                <div class="social-preview-content" style="padding: 12px;">
                    <small class="social-preview-domain" style="font-size: 0.75rem; color: var(--text-300); text-transform: lowercase; display: block; margin-bottom: 4px;">linkedin.com</small>
                    <h4 class="social-preview-title" style="font-size: 0.95rem; font-weight: 600; color: var(--text-100); margin: 0;">View on LinkedIn</h4>
                </div>
            </a>
            `}
          </div>
          <div class="update-card__footer">
            <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">
              View Post <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </article>
      `;
    });

    html += `
      <div class="update-card fade-up glass-panel" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 3rem 2rem; min-height: 100%;">
        <span class="material-symbols-rounded" style="font-size: 3rem; color: var(--cyan); margin-bottom: 1rem;">open_in_new</span>
        <h3 style="margin-bottom: 0.5rem; font-size: 1.25rem; color: var(--text-100);">See more on LinkedIn</h3>
        <p style="color: var(--text-300); font-size: 0.95rem; margin-bottom: 1.5rem;">Connect with me to stay updated on my latest professional journey and projects.</p>
        <a href="https://linkedin.com/in/yuvaneshks/" target="_blank" rel="noopener noreferrer" class="btn btn--primary uiverse-btn-glass">
          <i class="fab fa-linkedin-in"></i> View Profile
        </a>
      </div>
    `;

    grid.innerHTML = html;
    requestAnimationFrame(() => {
      initScrollAnimations();
      initLazyLoading();
    });
  } catch (error) {
    console.error('Failed to load updates:', error);
    grid.innerHTML = '<div style="color:var(--pink); text-align:center; padding: 2rem;">Could not load updates. <a href="https://linkedin.com/in/yuvaneshks/" target="_blank" style="color:var(--violet);">View on LinkedIn →</a></div>';
  }
}

// ── Experience & Certifications ──────────────────────────────────────────────

async function initExperienceData() {
  const grid = $('#experienceDataGrid');
  if (!grid) return;

  grid.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--violet);"></i></div>';

  try {
    const data = await getData();
    if (!data.experience || !data.experience.length) return;

    let html = '';
    data.experience.forEach((item, index) => {
      const delay = index * 100;
      html += `
        <div class="timeline__item fade-up" data-delay="${delay}">
          <div class="timeline__date">${item.date}</div>
          <div class="timeline__role">${item.role}</div>
          <div class="timeline__org">${item.org}</div>
          <p class="timeline__desc">${item.desc}</p>
        </div>
      `;
    });

    // We can also append Education if wanted
    if (data.education && data.education.length) {
      data.education.forEach((item, index) => {
        const delay = (data.experience.length + index) * 100;
        html += `
          <div class="timeline__item fade-up" data-delay="${delay}">
            <div class="timeline__date">${item.date}</div>
            <div class="timeline__role">${item.degree}</div>
            <div class="timeline__org">${item.school}</div>
            <p class="timeline__desc">${item.desc}</p>
          </div>
        `;
      });
    }

    grid.innerHTML = html;
    requestAnimationFrame(initScrollAnimations);
  } catch (error) {
    console.error('Failed to load experience:', error);
    grid.innerHTML = '<div style="color:var(--pink); text-align:center;">Could not load experience data.</div>';
  }
}

async function initCertificationsData() {
  const grid = $('#certificationsDataGrid');
  if (!grid) return;

  grid.innerHTML = '<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--cyan);"></i></div>';

  try {
    const data = await getData();
    if (!data.certifications || !data.certifications.length) return;

    let html = '';
    data.certifications.forEach((item, index) => {
      const delay = index * 100;
      const icon = item.icon || 'workspace_premium';
      html += `
        <div class="cert-card fade-up" data-delay="${delay}">
          <div class="cert-card__icon"><span class="material-symbols-rounded">${icon}</span></div>
          <div>
            <div class="cert-card__title">${item.title}</div>
            <div class="cert-card__issuer">${item.issuer}</div>
            <div class="cert-card__date">${item.date}</div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    requestAnimationFrame(initScrollAnimations);
  } catch (error) {
    console.error('Failed to load certifications:', error);
    grid.innerHTML = '<div style="color:var(--pink); text-align:center;">Could not load certifications data.</div>';
  }
}

// ── Lazy Loading ──────────────────────────────────────────────────────────────

function initLazyLoading() {
  const lazyImages = $$('img.lazy-img');
  if (!lazyImages.length) return;

  const imageObserver = new IntersectionObserver(function(entries, observer) {
    let delayCounter = 0;
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        const loadImg = () => {
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-img');
          }
        };

        if (navigator.onLine) {
          setTimeout(loadImg, delayCounter * 150);
          delayCounter++;
        } else {
          window.addEventListener('online', loadImg, { once: true });
        }
        
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 50px 0px' });

  lazyImages.forEach(function(img) {
    imageObserver.observe(img);
  });
}

// ── Commercial Data Renderer ──────────────────────────────────────────────

async function initCommercialData() {
  const grid = $('#commercialProjectsGrid');
  if (!grid) return;

  grid.innerHTML = '<div style="text-align:center; padding: 2rem; grid-column: 1 / -1;"><i class="fas fa-spinner fa-spin fa-2x" style="color:var(--text-100);"></i></div>';

  try {
    const data = await getData();
    if (!data.commercial_projects || !data.commercial_projects.length) {
      grid.innerHTML = '<div style="text-align:center; padding: 2rem; color: var(--text-300); grid-column: 1 / -1;">No commercial projects found.</div>';
      return;
    }

    let html = '';
    data.commercial_projects.forEach((item, index) => {
      const delay = index * 100;
      const icon = item.icon || 'dns';
      const techTags = item.tech ? item.tech.map(t => `<span class="project-tag">${t}</span>`).join('') : '';

      let focusHtml = '';
      if (item.focus_areas && item.focus_areas.length) {
        focusHtml = `
          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-subtle);">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-300); margin-bottom: 0.65rem;">
              Focus Areas & Infrastructure
            </div>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem;">
              ${item.focus_areas.map(fa => `
                <li style="font-size: 0.84rem; color: var(--text-200); display: flex; align-items: flex-start; gap: 8px; line-height: 1.45;">
                  <span class="material-symbols-rounded" style="font-size: 1rem; color: var(--text-100); margin-top: 1px;">check_circle</span>
                  <span>${fa}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      }

        const isGithub = item.verification_url && item.verification_url.includes('github.com');
        const btnIcon = isGithub ? 'code' : 'badge';
        const btnText = isGithub ? 'View on GitHub →' : 'Developer Proof →';

        html += `
          <article class="project-card fade-up" data-delay="${delay}" style="display: flex; flex-direction: column;">
            <div style="padding: 1.75rem 1.75rem 0.75rem; display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem;">
              <div style="background: var(--bg-surface); border: 1px solid var(--border-card); padding: 12px; border-radius: 14px; color: var(--text-100); display: flex; align-items: center; justify-content: center;">
                <span class="material-symbols-rounded" style="font-size: 1.8rem;">${icon}</span>
              </div>
              <span style="font-size: 0.75rem; font-weight: 600; padding: 0.3rem 0.85rem; border-radius: 20px; background: var(--bg-surface); color: var(--text-100); border: 1px solid var(--border-card);">
                ${item.status}
              </span>
            </div>

            <div class="project-card__body" style="padding: 0 1.75rem 1.75rem; display: flex; flex-direction: column; flex: 1;">
              <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-300); margin-bottom: 0.35rem;">
                ${item.client}
              </div>
              <h3 class="project-card__title" style="margin-bottom: 0.5rem;">${item.name}</h3>
              <div style="font-size: 0.85rem; color: var(--text-100); font-weight: 600; margin-bottom: 0.85rem; display: flex; align-items: center; gap: 6px;">
                <span class="material-symbols-rounded" style="font-size: 1rem;">cloud</span> ${item.role}
              </div>
              <p class="project-card__desc" style="margin-bottom: 1.25rem;">${item.desc}</p>

              ${focusHtml}

              <div class="project-card__tags" style="margin-top: 1rem;">
                ${techTags}
              </div>
              
              <div style="margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
                <a href="${item.verification_url}" target="_blank" rel="noopener noreferrer" class="btn btn--outline uiverse-btn-glass" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
                  <span class="material-symbols-rounded" style="font-size: 1rem; margin-right: 4px;">${btnIcon}</span> ${btnText}
                </a>
                ${item.web_url ? `
                <a href="${item.web_url}" target="_blank" rel="noopener noreferrer" class="btn btn--outline uiverse-btn-glass" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
                  <span class="material-symbols-rounded" style="font-size: 1rem; margin-right: 4px;">language</span> Web App →
                </a>
                ` : ''}
                ${item.playstore_url ? `
                <a href="${item.playstore_url}" target="_blank" rel="noopener noreferrer" class="btn btn--outline uiverse-btn-glass" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
                  <i class="fab fa-google-play" style="margin-right: 4px; font-size: 0.9rem;"></i> Play Store →
                </a>
                ` : ''}
                ${item.client_url && item.client_url !== item.verification_url ? `
                  <a href="${item.client_url}" target="_blank" rel="noopener noreferrer" style="font-size: 0.8rem; color: var(--text-200); text-decoration: underline; margin-left: auto;">
                    Official Site
                  </a>
                ` : ''}
              </div>
            </div>
          </article>
        `;
    });

    grid.innerHTML = html;
    requestAnimationFrame(() => {
      initScrollAnimations();
    });
  } catch (error) {
    console.error('Failed to load commercial projects:', error);
    grid.innerHTML = '<div style="color:var(--pink); text-align:center; grid-column: 1 / -1;">Could not load commercial projects.</div>';
  }
}

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initNav();
  initTyped();
  initScrollAnimations();
  initFilterTabs();
  initContactForm();
  initAnchorScroll();
  initGitHubData();
  initUpdatesData();
  initExperienceData();
  initCertificationsData();
  initCommercialData();
  initLazyLoading();
});

// Loading Screen Randomizer & Fade Out
(function() {
  // Randomize the start color immediately
  const spinnerFaces = document.querySelectorAll('.spinner > div');
  if (spinnerFaces.length > 0) {
    // 6.4s total duration. 4 colors = 1.6s each.
    const offsets = [0, -1.6, -3.2, -4.8];
    const randomOffset = offsets[Math.floor(Math.random() * offsets.length)];
    spinnerFaces.forEach(face => {
      face.style.animationDelay = randomOffset + 's';
    });
  }
})();

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    // Add a tiny delay so the beautiful loader is visible briefly even on fast loads
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.style.display = 'none', 600);
    }, 400);
  }
});
