# GrowthStack

Static, self-owned website for GrowthStack, a small-business web design and growth systems studio. No paid website-builder dependency and no build step required.

## Live Site Links

Send any of these public links directly to testers, family members, or potential clients:

- [GrowthStack selling site](https://daniel-techAI.github.io/GrowthStack/)
- [GrowthStack tester review room](https://daniel-techAI.github.io/GrowthStack/preview.html)
- [North Table Cafe demo](https://daniel-techAI.github.io/GrowthStack/demo-cafe.html)
- [Luna Salon demo](https://daniel-techAI.github.io/GrowthStack/demo-salon.html)
- [Highland Roofing demo](https://daniel-techAI.github.io/GrowthStack/demo-roofing.html)

## Open Locally

Fastest option: double-click `Open GrowthStack.bat`, double-click `Start Local Preview.bat`, or open `index.html` in a browser.

The local preview opens the site directly from this folder. It does not need Node, Netlify, or a domain. On local preview and GitHub Pages, contact forms create an email draft with the request details.

## Files

- `index.html` - page content and sections
- `styles.css` - responsive visual system
- `script.js` - mobile navigation and form success state
- `preview.html` - shareable review hub for family, testers, and early prospects
- `privacy.html`, `terms.html`, `legal.html`, `cookies.html` - starter legal pages for public launch
- `Start Local Preview.bat` - Windows preview shortcut with clear instructions
- `Start Local Preview.ps1` - PowerShell launcher used by the preview shortcut
- `netlify.toml` - Netlify static deploy config
- `robots.txt` - crawler file
- `Open GrowthStack.bat` - double-click local preview shortcut for Windows
- `start-project.html` - client intake page
- `maintenance.html` - recurring support offer
- `demo-*.html` - sample portfolio demo sites
- `client-kit/` - sales, scope, agreement, and maintenance templates
- `assets/growthstack-redo-concept.png` - generated visual reference for the rebuilt agency direction
- `assets/growthstack-local-owner-hero.png` - generated homepage hero image
- `assets/growthstack-concept.png` - earlier generated visual reference used during implementation
- `qa/polsia-reference.png` and `qa/polsia-reference-text.txt` - captured reference from the Polsia page

## Deploy

This can be hosted as a static site on GitHub Pages, Netlify, Cloudflare Pages, or Vercel. Upload the folder as-is and set `index.html` as the entry page.

For GitHub Pages, use repository Settings -> Pages -> Deploy from a branch -> `main` -> `/root`, then save. The public URL will be:

`https://daniel-techAI.github.io/GrowthStack/`

Once GitHub Pages is enabled, send testers:

`https://daniel-techAI.github.io/GrowthStack/preview.html`

GitHub Pages is the current free public setup. The site does not use tracking cookies or external web fonts. If you later add analytics, payments, booking widgets, chat, or stored form submissions, update the privacy and cookie pages first.
