/**
 * PROTOCOL: OBSERVER ENGINE
 * Logic for Starfield, Navigation HUD, and Hyperspace Jumps
 */

document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initScrollReveal();
    initStarZoom();
    initHyperspaceNav();

    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }
});

// 1. STARFIELD GENERATION
function initStars() {
    const container = document.getElementById('star-container');
    if (!container) return;

    const count = 200;
    for (let i = 0; i < count; i++) {
        const starElement = document.createElement('div'); // Renamed to avoid confusion
        starElement.className = 'star';

        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 4;
        const delay = Math.random() * 5;

        // Assign depth for parallax
        const depth = Math.random();
        if (depth > 0.8) starElement.classList.add('distant');
        else if (depth < 0.2) starElement.classList.add('near');

        starElement.style.width = `${size}px`;
        starElement.style.height = `${size}px`;
        starElement.style.left = `${x}vw`;
        starElement.style.top = `${y}vh`;
        starElement.style.setProperty('--duration', `${duration}s`);
        starElement.style.animationDelay = `${delay}s`;

        container.appendChild(starElement);
    }
}

// 2. PARALLAX ZOOM ON SCROLL
function initStarZoom() {
    const container = document.getElementById('star-container');
    if (!container) return;

    window.addEventListener('scroll', () => {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // As you scroll down, the universe expands
        const scale = 1 + (scrollPercent * 1.2);
        const rotation = scrollPercent * 15; // Subtle rotation

        // Only apply if not currently in a manual "warp" jump
        if (!container.classList.contains('warping')) {
            container.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        }
    });
}

// 3. HYPERSPACE NAVIGATION
function initHyperspaceNav() {
    const navLinks = document.querySelectorAll('.nav-item');
    const container = document.getElementById('star-container');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            container.classList.add('warping');

            // Visual "Jump" feedback
            container.style.transform = 'scale(3) rotate(20deg)';

            // Cool-down after the smooth scroll finishes
            setTimeout(() => {
                container.classList.remove('warping');
            }, 1000);
        });
    });
}

// 4. SCROLL REVEAL & NAV HIGHLIGHTING
function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Update Nav Active State
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
}