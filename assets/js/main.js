// ---- Barre de progression de lecture ----
const progressBar = document.getElementById('progressBar');

function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
}

// ---- Lien actif dans la nav selon la section visible ----
function updateActiveNav() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 80) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === '#' + current);
    });
}

window.addEventListener('scroll', () => {
    updateProgress();
    updateActiveNav();
}, { passive: true });

// ---- Menu burger (mobile) ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

// ---- Flip cards (séquence 1) ----
document.querySelectorAll('.principle-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });
});

// ---- Année courante dans le footer ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Hauteur H5P dynamique (resize automatique via postMessage) ----
window.addEventListener('message', (e) => {
    if (e.data && e.data.context === 'h5p') {
        const iframes = document.querySelectorAll('.h5p-wrapper iframe');
        iframes.forEach(iframe => {
            try {
                if (iframe.contentWindow === e.source && e.data.scrollHeight) {
                    iframe.style.height = (e.data.scrollHeight + 30) + 'px';
                }
            } catch (_) {}
        });
    }
});
