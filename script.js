const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});

let currentStep = 1;
const totalSteps = 5;

function highlightStep(step) {
    document.querySelectorAll(".circle").forEach(circle => {
        circle.classList.remove("active");
    });

    const circle = document.querySelector(`.step[data-step="${step}"] .circle`);

    if (circle) {
        circle.classList.add("active");
    }
}

function cycleSteps() {
    highlightStep(currentStep);

    currentStep++;

    if (currentStep > totalSteps) {
        currentStep = 1;
    }
}

highlightStep(1);
setInterval(cycleSteps, 1500);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;

    const statsSection = document.querySelector(".stats-section");
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight - 100;

    if (sectionPosition < screenPosition) {
        countersStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.getAttribute("data-count"));
            let value = 0;
            const speed = target / 50;

            const updateCounter = () => {
                value += speed;

                if (value < target) {
                    counter.textContent = Math.ceil(value);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener("scroll", startCounters);
startCounters();

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const button = item.querySelector("button");

    button.addEventListener("click", () => {
        item.classList.toggle("active");
    });
});

/*==================================================
              GITHUB HOSTING NOTICE
==================================================*/

const hostingNotice = document.getElementById("hostingNotice");
const hostingNoticeButton = document.getElementById("hostingNoticeButton");
const hostingNoticeClose = document.getElementById("hostingNoticeClose");

const hostingNoticeStorageKey = "githubHostingNoticeAccepted";

function hideHostingNotice() {
    if (!hostingNotice) return;

    hostingNotice.classList.remove("visible");
    hostingNotice.classList.add("hiding");

    localStorage.setItem(hostingNoticeStorageKey, "true");

    window.setTimeout(() => {
        hostingNotice.remove();
    }, 450);
}

if (
    hostingNotice &&
    localStorage.getItem(hostingNoticeStorageKey) !== "true"
) {
    window.setTimeout(() => {
        hostingNotice.classList.add("visible");
    }, 1000);
} else if (hostingNotice) {
    hostingNotice.remove();
}

hostingNoticeButton?.addEventListener("click", hideHostingNotice);
hostingNoticeClose?.addEventListener("click", hideHostingNotice);