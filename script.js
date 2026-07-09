const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const forms = document.querySelectorAll("[data-signup-form]");

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

    if (!email) {
      if (formStatus) formStatus.textContent = "Enter your email to start.";
      return;
    }

    try {
      if (window.location.protocol !== "file:") {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });
      }

      form.reset();
      if (formStatus) formStatus.textContent = "Thanks. Your GrowthStack request is ready.";
    } catch {
      if (formStatus) {
        formStatus.textContent = "Something went wrong. Please try again from the Start Project page.";
      }
    }
  });
});
