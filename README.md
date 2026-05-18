# DineTogether Mobile

A mobile-first React prototype for planning group dining around dietary needs, menu risks, and shared decisions.

## Run Locally

```bash
npm install
npm run dev
```

The dev server is exposed on your local network. On the same Wi-Fi, open the displayed Network URL from Safari on your iPhone.

If PowerShell blocks `npm`, run the same command as `npm.cmd run dev`.

The AI import API runs as a Vercel serverless function. To test image/PDF/URL import locally, use Vercel's local dev server and set `GEMINI_API_KEY`:

```bash
vercel dev
```

To test the production build locally:

```bash
npm run build
npm run preview
```

## Push To GitHub

```bash
git init
git add .
git commit -m "Initial DineTogether mobile app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Install On iPhone

Deploy the app with GitHub Pages, Vercel, or Netlify, then open the deployed URL in Safari on iPhone and choose **Share > Add to Home Screen**.

For a native iOS wrapper later, this project can be moved into Capacitor.

This repo includes a GitHub Pages workflow. After pushing, open the repository settings, set **Pages > Source** to **GitHub Actions**, then push to `main`.

## Vercel AI Menu Import

Set these environment variables in Vercel:

```bash
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

`GEMINI_MODEL` is optional. The import screen can analyze typed text, public menu URLs, menu photos, text/CSV files, and PDFs through `api/analyze-menu.js`.
