# Locriva Deployment Steps

## What Is Already Prepared

- Static site files
- GitHub Pages-ready public site
- Email-draft enquiry forms that work without a form-storage provider
- Robots file
- Sitemap for the current GitHub Pages URL
- Privacy, terms, legal notice, and cookie pages

## Recommended Launch Path

1. Push approved changes to the `main` branch.
2. Confirm GitHub Pages still uses `main` and `/root` in repository Settings -> Pages.
3. Wait for the Pages deployment to finish.
4. Open `https://daniel-techAI.github.io/Locriva/` in a fresh private window.
5. Test the homepage, demos, project form email draft, mobile navigation, legal pages, and footer links.
6. Check `sitemap.xml` and `robots.txt` after any public URL change.
7. Complete the Legal Notice identity fields before accepting a paid contract.
8. Buy and connect a domain only after the Locriva name is rechecked immediately before purchase.

## Branch Layout

- `main` - public selling site and all shared source files.
- `tester-site` - separated tester landing page.
- `demo-cafe`, `demo-salon`, `demo-roofing` - saved standalone demo branches.

The public GitHub Pages site uses `main`; demo URLs are normal HTML pages under that deployment.

## Public URL Before Buying A Domain

You do not need a custom domain to make the site public. GitHub Pages gives you a `*.github.io` URL after Pages is enabled. Buy the custom domain later, then connect it to the same deployed site with free HTTPS.

When a custom domain is connected, update canonical/public URLs, `sitemap.xml`, `robots.txt`, documentation, and any absolute links before announcing it.
