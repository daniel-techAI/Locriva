# GrowthStack

Static, self-owned website for GrowthStack, a small-business web design and growth systems studio. No paid website-builder dependency and no build step required.

## Open Locally

Fastest option: double-click `Open GrowthStack.bat`, double-click `Start Local Preview.bat`, or open `index.html` in a browser.

The local preview opens the site directly from this folder. It does not need Node, Netlify, or a domain. When opened from a file, contact forms create an email draft with the request details.

## Files

- `index.html` - page content and sections
- `styles.css` - responsive visual system
- `script.js` - mobile navigation and form success state
- `preview.html` - shareable review hub for family, testers, and early prospects
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

Netlify is the easiest first choice because the contact form is already marked up for Netlify Forms.
