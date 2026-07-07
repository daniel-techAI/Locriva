const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const signupForm = document.querySelector("[data-signup-form]");
const formStatus = document.querySelector("[data-form-status]");

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

if (signupForm && formStatus) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(signupForm);
    const email = String(data.get("email") || "").trim();

    if (!email) {
      formStatus.textContent = "Enter your email to start.";
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

      signupForm.reset();
      formStatus.textContent = "Thanks. Your GrowthStack call request is ready.";
    } catch {
      formStatus.textContent = "Something went wrong. Email hello@growthstack.local directly.";
    }
  });
}
