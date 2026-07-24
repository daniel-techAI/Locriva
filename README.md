# Locriva

Static, self-owned website for Locriva, a small-business web design and growth systems studio. It has no paid website-builder dependency and no build step.

## Live Site Links

Send any of these public links directly to testers, family members, or potential clients:

- [Locriva selling site](https://daniel-techAI.github.io/Locriva/)
- [Locriva tester review room](https://daniel-techAI.github.io/Locriva/preview.html)
- [North Table Cafe demo](https://daniel-techAI.github.io/Locriva/demo-cafe.html)
- [Luna Salon demo](https://daniel-techAI.github.io/Locriva/demo-salon.html)
- [Highland Roofing demo](https://daniel-techAI.github.io/Locriva/demo-roofing.html)

## Open Locally

Fastest option: double-click `Open Locriva.bat`, double-click `Start Local Preview.bat`, or open `index.html` in a browser.

The local preview opens the site directly from this folder. It does not need Node, a form-storage provider, or a domain. On local preview and GitHub Pages, contact forms create an email draft with the request details.

## Files

- `index.html` - page content and sections
- `styles.css` - responsive Locriva and support-page visual system
- `demo-sites.css` - three deliberately separate demo design systems
- `script.js` - mobile navigation, reveal states, demo interactions, and email-draft form handling
- `preview.html` - shareable review hub for family, testers, and early prospects
- `privacy.html`, `terms.html`, `legal.html`, `cookies.html` - pre-launch legal and privacy information
- `Start Local Preview.bat` - Windows preview shortcut with clear instructions
- `Start Local Preview.ps1` - PowerShell launcher used by the preview shortcut
- `robots.txt` and `sitemap.xml` - crawler files for the current public URL
- `Open Locriva.bat` - double-click local preview shortcut for Windows
- `start-project.html` - client intake page
- `maintenance.html` - recurring support offer
- `demo-*.html` - sample portfolio demo sites
- `client-kit/` - sales, scope, agreement, maintenance, operations, and client handover templates
- `assets/*.webp` - optimized public photography; the PNG files are retained as source-quality originals

## Current Behavior

- The public site and demos work on GitHub Pages without a server.
- Main enquiry forms prepare a pre-filled email draft. The visitor must choose to send it.
- Demo forms show a local demonstration result and never send data.
- The site does not intentionally load third-party fonts, analytics, advertisements, maps, chat, or non-essential cookies.
- The Legal Notice deliberately contains unresolved identity fields. Complete them before accepting paid work.

## Deploy

This can be hosted as a static site on GitHub Pages, Cloudflare Pages, or another static host. GitHub Pages is already the active public host.

For GitHub Pages, use repository Settings -> Pages -> Deploy from a branch -> `main` -> `/root`, then save. The public URL will be:

`https://daniel-techAI.github.io/Locriva/`

Once GitHub Pages is enabled, send testers:

`https://daniel-techAI.github.io/Locriva/preview.html`

GitHub Pages is the current free public setup. If analytics, payments, booking widgets, chat, or stored form submissions are added later, review the privacy policy, cookie policy, providers, and consent behavior before enabling them.
