# Contributing to Locriva

Thanks for helping improve Locriva. Keep changes focused, reviewable, and consistent with the site's pre-launch status.

## Local setup

No dependencies or build step are required. Clone the repository and open `index.html`, or run a local static server:

```sh
python -m http.server 8080
```

## Before proposing a change

1. Search existing issues before opening a new one.
2. Use a short-lived branch based on the latest `main`.
3. Keep unrelated formatting or generated-file changes out of the patch.
4. Preserve accessible labels, keyboard navigation, responsive layouts, reduced-motion behavior, and the clear fictional-demo labels.
5. Do not add customer data, secrets, invented testimonials, unverified business claims, or copied third-party designs/assets.
6. Explain any new external service or dependency. Changes involving analytics, stored forms, payments, ads, maps, booking, or chat must also update the relevant privacy, cookie, security, and deployment guidance.

## Validate the change

Run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Test-Site.ps1
```

Then manually test the affected pages at narrow and wide viewport widths. Confirm internal links, forms, focus behavior, and browser-console output.

## Pull requests

Describe the problem, the chosen solution, the pages affected, and the checks performed. Include screenshots for visual changes. Small, single-purpose pull requests are easier to review.

By contributing source code, you agree that it may be distributed under the code license described in [LICENSE](LICENSE). Do not contribute brand material, client documents, or assets unless you own the necessary rights and clearly state their licensing.
