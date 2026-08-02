# Deploying Locriva

Locriva is a static site. Deployment consists of publishing the repository root; there is no dependency installation, compilation, server process, database, or secret configuration.

## Pre-deployment checks

1. Run the local validator:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Test-Site.ps1
   ```

2. Preview `index.html` and test the homepage, navigation, all three demos, project form, feedback form, legal pages, and the 404 page at mobile and desktop widths.
3. Confirm that each real enquiry form opens an accurate email draft and that demo forms do not send data.
4. Complete the blocking identity and business items in `LAUNCH_CHECKLIST.md` before accepting paid work.

## GitHub Pages

After repository and Pages access are available:

1. Open the repository's **Settings -> Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main`, choose `/ (root)`, and save.
4. Wait for the Pages deployment to complete.
5. Open `https://daniel-techai.github.io/Locriva/` in a private browser window and repeat the pre-deployment checks.

The `.nojekyll` file tells GitHub Pages to publish the static files as-is. No custom GitHub Actions workflow is required for this branch-based setup.

## Other static hosts

Cloudflare Pages, Netlify, and similar hosts can publish the same files. Use the repository root as the publish directory and leave the build command empty. Verify the provider's current settings before launch.

## Changing the public URL

Before announcing a custom domain or a different host, update every public absolute URL in:

- `index.html` (`canonical`, Open Graph URL, and Open Graph image)
- `robots.txt`
- `sitemap.xml`
- `README.md`
- this deployment guide

Then rerun the validator and verify HTTPS, the 404 page, social previews, forms, and every sitemap URL on the deployed site.

## Release checklist

- Publish only reviewed changes from `main`.
- Check the deployed site in a fresh private window rather than relying on a cached local copy.
- Confirm that no `.env`, credentials, customer data, private drafts, or QA screenshots were added.
- Revisit the privacy and cookie notices before adding analytics, payments, stored submissions, booking, maps, chat, or advertising tools.
- Recheck the Locriva business name and domain immediately before registration; earlier availability checks are not guarantees.
