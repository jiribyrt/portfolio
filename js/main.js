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

const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioProjects = document.querySelectorAll(".portfolio-project-card");

portfolioFilters.forEach(filterButton => {
    filterButton.addEventListener("click", () => {
        const selectedFilter = filterButton.dataset.filter;

        portfolioFilters.forEach(button => {
            button.classList.remove("active");
        });

        filterButton.classList.add("active");

        portfolioProjects.forEach(project => {
            const projectCategory = project.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                projectCategory === selectedFilter;

            project.classList.toggle("hidden-project", !shouldShow);
        });
    });
});

/*==================================================
                    CONTACT FORM
==================================================*/

const projectForm = document.getElementById("projectForm");
const serviceError = document.getElementById("serviceError");
const formMessage = document.getElementById("formMessage");

if (projectForm) {
    projectForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(projectForm);
        const selectedService = formData.get("service");

        serviceError?.classList.remove("visible");
        formMessage?.classList.remove("error");

        if (!selectedService) {
            serviceError?.classList.add("visible");

            document
                .querySelector(".service-choice-grid")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            return;
        }

        if (!projectForm.checkValidity()) {
            projectForm.reportValidity();
            return;
        }

        const name = formData.get("name") || "Neuvedeno";
        const company = formData.get("company") || "Neuvedeno";
        const email = formData.get("email") || "Neuvedeno";
        const phone = formData.get("phone") || "Neuvedeno";
        const description =
            formData.get("projectDescription") || "Neuvedeno";
        const website =
            formData.get("currentWebsite") || "Neuvedeno";
        const deadline = formData.get("deadline") || "Neuvedeno";
        const budget = formData.get("budget") || "Neuvedeno";
        const contactPreference =
            formData.get("contactPreference") || "Neuvedeno";
        const inspiration =
            formData.get("inspiration") || "Neuvedeno";
        const additionalInfo =
            formData.get("additionalInfo") || "Neuvedeno";

        const subject =
            `Nezávazná poptávka – ${selectedService} – ${name}`;

        const message = `
Dobrý den,

rád/a bych nezávazně poptal/a službu.

VYBRANÁ SLUŽBA
${selectedService}

KONTAKTNÍ ÚDAJE
Jméno: ${name}
Firma / značka: ${company}
E-mail: ${email}
Telefon: ${phone}
Preferovaný kontakt: ${contactPreference}

INFORMACE O PROJEKTU
${description}

Současný web: ${website}
Požadovaný termín: ${deadline}
Orientační rozpočet: ${budget}

INSPIRACE
${inspiration}

DALŠÍ INFORMACE
${additionalInfo}
        `.trim();

        const mailtoLink =
            `mailto:jirkabyrt1@seznam.cz` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(message)}`;

        if (formMessage) {
            formMessage.textContent =
                "Otevírám váš e-mail s připravenou poptávkou…";
        }

        window.location.href = mailtoLink;
    });
}

const servicesFaqItems =
    document.querySelectorAll(".services-faq-item");

servicesFaqItems.forEach(item => {
    const question = item.querySelector(
        ".services-faq-question"
    );

    question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        servicesFaqItems.forEach(otherItem => {
            otherItem.classList.remove("active");

            const otherQuestion = otherItem.querySelector(
                ".services-faq-question"
            );

            otherQuestion.setAttribute(
                "aria-expanded",
                "false"
            );
        });

        if (!isOpen) {
            item.classList.add("active");

            question.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    });
});