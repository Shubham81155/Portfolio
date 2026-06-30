function setupMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(navLinks.classList.contains("open")));
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupActiveSectionHighlight() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sectionMap = new Map();

    navLinks.forEach((link) => {
        const id = link.getAttribute("href")?.replace("#", "");
        if (id) sectionMap.set(id, link);
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach((link) => link.classList.remove("active"));
                    sectionMap.get(id)?.classList.add("active");
                }
            });
        },
        { threshold: 0.45 }
    );

    document.querySelectorAll("section[id]").forEach((section) => sectionObserver.observe(section));
}

function setupFadeUpAnimations() {
    const fadeItems = document.querySelectorAll(".fade-up");
    const fadeObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    fadeItems.forEach((item) => fadeObserver.observe(item));
}

function animateCountUp(el, target) {
    const duration = 1200;
    let startTime = null;

    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = String(value);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
    setupMobileMenu();
    setupActiveSectionHighlight();
    setupFadeUpAnimations();
});