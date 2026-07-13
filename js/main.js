const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        const menuIsOpen = navMenu.classList.toggle("active");

        hamburger.setAttribute(
            "aria-expanded",
            String(menuIsOpen)
        );
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });
}

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const button = item.querySelector("button");

    if (!button) return;

    button.addEventListener("click", () => {
        const itemIsActive = item.classList.contains("active");

        faqItems.forEach(faqItem => {
            faqItem.classList.remove("active");
        });

        if (!itemIsActive) {
            item.classList.add("active");
        }
    });
});