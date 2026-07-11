# GrowthStack

Static, self-owned website for GrowthStack, a small-business web design and growth systems studio. No paid website-builder dependency and no build step required.

## Open Locally

Fastest option: double-click `Open GrowthStack.bat`, double-click `Start Local Preview.bat`, or open `index.html` in a browser.

The local preview opens the site directly from this folder. It does not need Node, Netlify, or a domain. When opened from a file, contact forms create an email draft with the request details.

## Files

- `index.html` - page content and sections
- `styles.css` - responsive visual system
- `script.js` - mobile navigation and form success state
- `Start Local Preview.bat` - Windows preview shortcut with clear instructions
- `Start Local Preview.ps1` - PowerShell launcher used by the preview shortcut
- `netlify.toml` - Netlify static deploy config
- `.github/workflows/pages.yml` - GitHub Pages deploy workflow
- `robots.txt` - crawler file
- `Open GrowthStack.bat` - double-click local preview shortcut for Windows
- `start-project.html` - client intake page
- `maintenance.html` - recurring support offer
- `demo-*.html` - sample portfolio demo sites
- `client-kit/` - sales, scope, agreement, and maintenance templates
- `assets/growthstack-concept.png` - generated visual reference used during implementation
- `qa/polsia-reference.png` and `qa/polsia-reference-text.txt` - captured reference from the Polsia page

## Deploy

This can be hosted as a static site on GitHub Pages, Netlify, Cloudflare Pages, or Vercel. Upload the folder as-is and set `index.html` as the entry page.

Netlify is the easiest first choice because the contact form is already marked up for Netlify Forms.
