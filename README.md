# Locriva

Locriva is a dependency-free static website for a pre-launch small-business web design studio. The repository contains the main sales site, three clearly labelled fictional portfolio demos, email-draft enquiry flows, legal starter pages, and a practical client-operations kit.

> **Pre-launch status:** the site can be reviewed and deployed, but the operator details in `legal.html` are intentionally incomplete. Finish the items in [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) before accepting paid work.

## What is included

- Responsive HTML, CSS, and vanilla JavaScript with no build step.
- Cafe, salon, and roofing demo sites with distinct visual systems.
- Project-intake and feedback forms that prepare an email draft in the visitor's email app.
- Privacy, terms, cookie, and legal-notice starter pages.
- Reusable scope, quote, agreement, handover, maintenance, and sales templates in `client-kit/`.
- A lead-tracker template whose populated local copy is excluded from Git.
- No analytics, advertising pixels, remote fonts, chat widgets, or form-storage service.

## Preview locally

On Windows, double-click `Open Locriva.bat` or `Start Local Preview.bat`.

On any platform, open `index.html` directly. If you prefer an HTTP preview and have Python installed, run:

```sh
python -m http.server 8080
```

Then open `http://localhost:8080/`. There are no packages to install and no build command.

## Validate changes

From the repository root on Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Test-Site.ps1
```

The check verifies required page metadata, unique IDs, local links and assets, CSS asset references, and sitemap structure. Complete the manual browser checks in [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) as well.

## Key paths

| Path | Purpose |
| --- | --- |
| `index.html` | Main Locriva sales page |
| `demo-*.html` | Fictional portfolio demos |
| `start-project.html` | Project-intake form |
| `preview.html` | Private review hub, marked `noindex` |
| `share.html` | Link hub for reviewers, marked `noindex` |
| `styles.css` | Main and support-page styles |
| `demo-sites.css` | Demo-specific design systems |
| `script.js` | Navigation, reveal effects, and local form handling |
| `client-kit/` | Internal sales and delivery templates |
| `DEPLOYMENT.md` | Hosting and release instructions |

## Form and privacy behavior

Public enquiry forms do not transmit or store submissions. They open a pre-filled `mailto:` draft,
which the visitor must review and send. Demo forms only display an on-page demonstration message. If
a backend, analytics, payments, booking, chat, or other third-party service is added, review the
privacy, cookie, security, and deployment documentation before enabling it.

## Quality checks

Pull requests and changes to `main` run automated HTML, local-link, desktop, mobile, and WCAG A/AA checks.

```bash
npm install
npx playwright install chromium
npm run check
```

The browser checks cover every public HTML page, confirm local assets remain reachable, verify the skip link and mobile menu keyboard behaviour, and use axe-core to catch automated accessibility regressions. Manual keyboard and screen-reader testing is still required before major releases.

## Deployment

The intended GitHub Pages URL is `https://daniel-techai.github.io/Locriva/`. It will only be available while Pages is enabled and the hosting account is in good standing. See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages and other static-host instructions.

## Project policies

- Contributions: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security reports: [SECURITY.md](SECURITY.md)
- Community conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- Licensing: [LICENSE](LICENSE)

The legal and contract documents in this repository are starting templates, not legal or tax advice.
Never commit populated lead trackers, client files, proposals, contracts, credentials, or customer data.
