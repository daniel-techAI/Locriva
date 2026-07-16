# GrowthStack Deployment Steps

## What Is Already Prepared

- Static site files
- GitHub Pages-ready public site
- Email-draft form fallback for GitHub Pages
- Optional Netlify config if you later want hosted form storage
- Robots file
- Privacy, terms, legal notice, and cookie pages

## Recommended Launch Path

1. Push this folder to the `GrowthStack` GitHub repository.
2. In GitHub, open Settings -> Pages.
3. Set Source to `Deploy from a branch`, Branch to `main`, and Folder to `/root`.
4. Save and wait for GitHub Pages to publish.
5. Open `https://daniel-techAI.github.io/GrowthStack/`.
6. Test the homepage, preview hub, project form email draft, mobile layout, and footer links.
7. Add a sitemap after you know the final public URL.
8. Buy and connect a domain later if you decide the offer is ready.

## Optional Netlify Path

Netlify can host the same static files and collect form submissions if the form attributes remain in the HTML. Before switching, update the privacy policy to name Netlify/form storage and test that submissions are actually received.

## If The GitHub Repo Already Exists

Run this from the `GrowthStack` folder, replacing the URL with your repo URL:

```powershell
git remote add origin https://github.com/daniel-techAI/GrowthStack.git
git push -u origin main
```

If `origin` already exists, use:

```powershell
git remote set-url origin https://github.com/daniel-techAI/GrowthStack.git
git push -u origin main
```

Before pushing from this machine, GitHub CLI needs to be logged in:

```powershell
gh auth login
```

## Public URL Before Buying A Domain

You do not need a custom domain to make the site public. GitHub Pages gives you a `*.github.io` URL after Pages is enabled. Buy the custom domain later, then connect it to the same deployed site.
