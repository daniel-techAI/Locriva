const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const forms = document.querySelectorAll("[data-signup-form]");
const contactEmail = "daniellaky.uni@gmail.com";

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
      if (window.location.protocol === "file:") {
        const formName = String(data.get("form-name") || form.getAttribute("name") || "GrowthStack request");
        const lines = Array.from(data.entries())
          .filter(([key, value]) => key !== "form-name" && key !== "bot-field" && String(value).trim())
          .map(([key, value]) => `${formatFieldName(key)}: ${String(value).trim()}`);

        const subject = encodeURIComponent(`GrowthStack request - ${formName}`);
        const body = encodeURIComponent(lines.join("\n"));
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
        if (formStatus) {
          formStatus.textContent = "Local preview: your email app should open with the request details.";
        }
      } else {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });

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

function formatFieldName(name) {
  return String(name)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
