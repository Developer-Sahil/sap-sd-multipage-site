# SAP SD Master Guide

A living, multi-page study site for SAP ERP Sales & Distribution. Plain HTML/CSS/JS — no React, no build step, no server required. Every page shares one sidebar and one progress tracker driven by a single config file, so you can keep adding topics as you study without editing the whole site.

## Structure

```
index.html                 Home page: hero + progress overview + grid of every topic
big-picture.html           Chapter content pages (one file per topic)
enterprise-structure.html
master-data.html
sales-documents.html
atp.html
simulator.html
scenario.html
tables.html
quiz.html
template.html              Starter file — copy this to create a new topic page
assets/
  css/style.css            Shared custom styles
  js/topics.js             SINGLE SOURCE OF TRUTH — list of every topic page
  js/nav.js                Builds the sidebar, progress bar, prev/next nav, home grid
  js/common.js             Shared widgets: quiz reveal, table search, determination simulator
  js/tailwind-config.js    Tailwind CDN theme config
```

## Preview locally

No install, no server — just open `index.html` in a browser.

## Host it on GitHub

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source: Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Save. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/` within a minute or two — bookmark that for revision.
5. Every time you `git push` new/changed files, the live site updates automatically (usually within ~1 minute).

## Adding a new topic as you study

You never need to touch the sidebar, the home page, or any existing page. Just:

1. Copy `template.html` and rename it (e.g. `pricing.html`).
2. Replace the placeholder `<section>` with your notes — reuse the card/table/callout patterns already in the other pages, or write plain HTML.
3. Open `assets/js/topics.js` and add one entry to the `TOPICS` array:
   ```js
   {
     id: 'pricing',
     title: 'Pricing & Condition Technique',
     file: 'pricing.html',
     icon: 'fa-solid fa-tags',
     color: 'rose',
     group: 'Core Guide',
     desc: 'One-line summary shown on the home page card.'
   }
   ```
4. Open `index.html` locally to confirm the new card and sidebar link show up.
5. Commit and push:
   ```
   git add pricing.html assets/js/topics.js
   git commit -m "Add pricing topic"
   git push
   ```

## Study progress

Each topic page has a "Mark as studied" button at the bottom. This is stored in your browser's `localStorage` (per device/browser, not synced through GitHub) and drives the progress bar on the home page and in the sidebar.

## Reusable interactive widgets (`assets/js/common.js`)

- `toggleAnswer(id)` — flashcard-style answer reveal (see `quiz.html`)
- `initTableSearch(inputId, bodyId)` — live filter for a searchable `<table>` (see `tables.html`)
- `initSimulator(ids)` — the item category / schedule line category determination logic (see `simulator.html`)

Call any of these from a new topic page's own `<script>` block if it needs the same kind of widget — no need to duplicate the logic.
