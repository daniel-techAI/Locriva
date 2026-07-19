document.documentElement.classList.add("motion-ready");

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const forms = document.querySelectorAll("[data-signup-form]");
const revealItems = document.querySelectorAll("[data-reveal]");
const demoShowcase = document.querySelector("[data-demo-showcase]");
const demoCards = document.querySelectorAll("[data-demo-card]");
const contactEmail = "daniellaky.uni@gmail.com";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let activeDemoCard = null;

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const nextState = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(nextState));
    document.body.classList.toggle("nav-open", nextState);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

forms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const formStatus = form.querySelector("[data-form-status]");
    const email = String(data.get("email") || "").trim();
    const submitButton = form.querySelector("button[type='submit']");

    if (!email) {
      if (formStatus) formStatus.textContent = "Enter your email to start.";
      return;
    }

    if (submitButton) submitButton.disabled = true;
    if (formStatus) formStatus.textContent = "Preparing your request...";

    try {
      if (shouldUseEmailDraft()) {
        openEmailDraft(data, form);
        if (formStatus) formStatus.textContent = "Your email app should open with the request details.";
      } else {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });

        if (!response.ok) {
          openEmailDraft(data, form);
          if (formStatus) formStatus.textContent = "The form provider did not respond, so an email draft was prepared instead.";
          return;
        }

        form.reset();
        if (formStatus) formStatus.textContent = "Thanks. Your GrowthStack request was sent.";
      }
    } catch {
      if (formStatus) {
        formStatus.textContent = `Something went wrong. Email ${contactEmail} directly.`;
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
});

if (revealItems.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

if (demoCards.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    demoCards.forEach((card) => card.classList.add("is-active"));
    updateDemoProgress(demoCards.length - 1);
  } else {
    setActiveDemoCard(demoCards[0]);

    const demoObserver = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible || mostVisible.target === activeDemoCard) return;

        setActiveDemoCard(mostVisible.target);
      },
      { rootMargin: "-24% 0px -24% 0px", threshold: [0.28, 0.45, 0.62, 0.78] }
    );

    demoCards.forEach((card) => demoObserver.observe(card));
  }
}

function setActiveDemoCard(card) {
  if (!card) return;
  if (activeDemoCard) activeDemoCard.classList.remove("is-active");
  card.classList.add("is-active");
  activeDemoCard = card;
  updateDemoProgress(Array.from(demoCards).indexOf(card));
}

function updateDemoProgress(index) {
  if (!demoShowcase) return;
  const safeIndex = Math.max(0, index);
  const progress = demoCards.length > 1 ? (safeIndex / (demoCards.length - 1)) * 100 : 100;
  demoShowcase.dataset.activeDemo = String(safeIndex);
  demoShowcase.style.setProperty("--demo-progress", `${progress}%`);
}

function formatFieldName(name) {
  return String(name)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function shouldUseEmailDraft() {
  const host = window.location.hostname;
  return window.location.protocol === "file:" || host.endsWith("github.io") || host === "127.0.0.1" || host === "localhost";
}

function openEmailDraft(data, form) {
  const formName = String(data.get("form-name") || form.getAttribute("name") || "GrowthStack request");
  const lines = Array.from(data.entries())
    .filter(([key, value]) => key !== "form-name" && key !== "bot-field" && String(value).trim())
    .map(([key, value]) => `${formatFieldName(key)}: ${String(value).trim()}`);

  const subject = encodeURIComponent(`GrowthStack request - ${formName}`);
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}
