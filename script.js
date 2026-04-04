const roles = ["Data Analyst", "Insight Storyteller", "Dashboard Architect"];

function setupTypingEffect() {
    const typingEl = document.getElementById("typing-text");
    if (!typingEl) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
        const currentRole = roles[roleIndex];

        if (!deleting) {
            charIndex += 1;
            typingEl.textContent = currentRole.slice(0, charIndex);
            if (charIndex === currentRole.length) {
                deleting = true;
                setTimeout(tick, 1300);
                return;
            }
        } else {
            charIndex -= 1;
            typingEl.textContent = currentRole.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(tick, deleting ? 45 : 75);
    }

    tick();
}

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

function setupStatsCounter() {
    const counters = document.querySelectorAll(".count-up");
    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = Number(entry.target.dataset.target || 0);
                    animateCountUp(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
}

function setupSkillBars() {
    const bars = document.querySelectorAll(".bar-fill");
    const barObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const width = entry.target.dataset.width || "0";
                    entry.target.style.width = `${width}%`;
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    bars.forEach((bar) => barObserver.observe(bar));
}

function setupContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const button = form.querySelector("button[type='submit']");
        if (!button) return;

        const originalText = button.textContent;
        button.textContent = "Message Sent";
        button.disabled = true;
        form.reset();

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1600);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupTypingEffect();
    setupMobileMenu();
    setupActiveSectionHighlight();
    setupFadeUpAnimations();
    setupStatsCounter();
    setupSkillBars();
    setupContactForm();
});