# GrowthStack Deployment Steps

## What Is Already Prepared

- Static site files
- Netlify Forms-ready lead form
- Netlify config
- GitHub Pages workflow
- Robots and sitemap starter files
- Privacy and terms starter pages

## Recommended Launch Path

1. Create a new GitHub repository named `GrowthStack`.
2. Push this folder to that repository.
3. Connect the repository to Netlify.
4. Use these Netlify settings:
   - Build command: leave empty
   - Publish directory: `.`
5. Deploy the site.
6. In Netlify, open Forms and confirm `growthstack-leads` appears after the first deploy.
7. Buy a domain.
8. Add the domain to Netlify.
9. Update `robots.txt` and `sitemap.xml` by replacing `https://example.com` with the real domain.
10. Test the contact form, mobile layout, and footer links after the domain is connected.

## GitHub Pages Alternative

The included workflow at `.github/workflows/pages.yml` publishes the static site from the repository root. GitHub Pages is fine for hosting, but it will not collect form submissions by itself. Use Netlify or a form provider if you want form submissions.
