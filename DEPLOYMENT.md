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

## If The GitHub Repo Already Exists

Run this from the `GrowthStack` folder, replacing the URL with your repo URL:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/GrowthStack.git
git push -u origin main
```

If `origin` already exists, use:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/GrowthStack.git
git push -u origin main
```

Before pushing from this machine, GitHub CLI needs to be logged in:

```powershell
gh auth login
```

## Public URL Before Buying A Domain

You do not need a custom domain to make the site public. Netlify gives you a free `*.netlify.app` URL after deploy, and GitHub Pages gives you a `*.github.io` URL after Pages is enabled. Buy the custom domain later, then connect it to the same deployed site.
