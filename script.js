console.log("Portfolio Initialized.");

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            obs.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px', threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {

    // Stagger project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('scroll-hidden');
        card.style.transitionDelay = `${index * 90}ms`;
        observer.observe(card);
    });

    // Stagger skill cards
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.classList.add('scroll-hidden');
        card.style.transitionDelay = `${index * 90}ms`;
        observer.observe(card);
    });

    // Hero left column — animate children individually
    const heroLeft = document.querySelector('#about > div > div:first-child');
    if (heroLeft) {
        Array.from(heroLeft.children).forEach((el, index) => {
            el.classList.add('scroll-hidden');
            el.style.transitionDelay = `${index * 80}ms`;
            observer.observe(el);
        });
    }

    // Code window (hero right column)
    const heroRight = document.querySelector('#about > div > div:last-child');
    if (heroRight) {
        heroRight.classList.add('scroll-hidden');
        heroRight.style.transitionDelay = '320ms';
        observer.observe(heroRight);
    }

    // Cursor-aware radial glow on cards
    document.querySelectorAll('.project-card, .skill-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // About button: scroll exactly half the initial gap ONCE (no infinite slicing!)
    const aboutLink = document.querySelector('a[href="#about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Only scroll if we are at or near the top of the page (initial opening screen)
            if (window.scrollY < 10) {
                const nav = document.querySelector('nav');
                const aboutEl = document.getElementById('about');
                const navBottom = nav ? nav.getBoundingClientRect().bottom : 80;
                const aboutTop = aboutEl ? aboutEl.getBoundingClientRect().top : 140;
                const currentGap = aboutTop - navBottom;
                if (currentGap > 10) {
                    window.scrollTo({ top: currentGap / 2, behavior: 'smooth' });
                }
            } else {
                // If already scrolled down, do nothing (or scroll back to that exact half-gap position if coming from bottom sections)
                const nav = document.querySelector('nav');
                const aboutEl = document.getElementById('about');
                const navBottom = nav ? nav.getBoundingClientRect().bottom : 80;
                const aboutTop = aboutEl ? (aboutEl.getBoundingClientRect().top + window.scrollY) : 140;
                const targetScroll = Math.max(0, (aboutTop - navBottom) / 2);
                if (Math.abs(window.scrollY - targetScroll) > 15) {
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                }
            }
        });
    }

});

