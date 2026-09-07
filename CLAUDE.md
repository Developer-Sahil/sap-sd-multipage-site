# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, multi-page study site for SAP ERP Sales & Distribution (SAP SD). Plain HTML/CSS/JS only — no React, no bundler, no build step, no server-side code. Every page is opened directly via `file://` or served as-is from GitHub Pages.

## Commands

There is no build/lint/test tooling. To preview, just open `index.html` in a browser (double-click, or `start index.html` on Windows). There is no package.json, no dependency install step, and nothing to compile.

## Architecture

**Flat file layout is intentional** — every HTML page and the `assets/` folder live at the repo root with no subfolders for pages. This keeps relative paths (`assets/js/...`) identical and correct whether a page is opened directly from disk (`file://`) or served from GitHub Pages. Do not move pages into subfolders without updating every relative path.

**`assets/js/topics.js` is the single source of truth** for site structure. It's a plain array of topic objects: `{ id, title, file, icon, color, group, desc }`. Every other piece of navigation — the sidebar, the home page's topic grid, and each page's prev/next footer — is generated *from this array at runtime* by `assets/js/nav.js`. There is no static sidebar markup duplicated across pages; each page just has an empty `<aside id="sidebar">` mount point that `nav.js` fills in on `DOMContentLoaded`.

**Adding a new topic page** (this is the core workflow the site is designed around):

1. Copy `template.html`, rename it, fill in the placeholder `<section>` with content.
2. Add one matching entry to the `TOPICS` array in `assets/js/topics.js`.
3. Nothing else needs to change — sidebar, home grid, and prev/next links pick it up automatically.

**`assets/js/nav.js` responsibilities**: builds the mobile header (`#mobileHeaderMount`), the sidebar (`#sidebar`) grouped by each topic's `group` field, the per-page prev/next + "mark as studied" footer (`#topicFooter`, present on every topic page but not `index.html`), and the home page's topic card grid (`#topicGrid`, present only on `index.html`). It also owns the localStorage-backed progress tracker (key `sapSdProgress`; functions `isStudied(id)` / `toggleStudied(id)`) that drives the progress bar shown on every page and the home page's "continue studying" link. Current page is detected via `location.pathname` matching a topic's `file` field — no page needs to declare its own ID.

**`assets/js/common.js`** holds reusable interactive widgets called from individual pages' inline `<script>` blocks, not auto-invoked:

- `toggleAnswer(id)` — flashcard answer reveal (used in `quiz.html`)
- `initTableSearch(inputId, bodyId)` — live filter for a searchable table (used in `tables.html`)
- `initSimulator(ids)` — the SD item-category/schedule-line-category determination logic (used in `simulator.html`)

When adding a topic that needs one of these, call the relevant `init*`/`toggleAnswer` function from that page's own trailing `<script>` tag rather than duplicating the logic — see `tables.html` or `simulator.html` for the call pattern.

**Styling**: Tailwind is loaded via the Play CDN (`cdn.tailwindcss.com`), which JIT-compiles utility classes found anywhere in the DOM — including classes injected dynamically by `nav.js` (e.g. `bg-${color}-100` built from a topic's `color` field). `assets/js/tailwind-config.js` sets the shared theme extension (custom `sap.*` colors, font families) and must be loaded after the CDN script but before any page content needs it. `assets/css/style.css` holds the handful of rules Tailwind can't express (custom scrollbar, `.glass-panel`, `.gradient-bg`, `.nav-link.active`, `.topic-card`).

**Script load order matters** on every page: `topics.js` → `nav.js` → `common.js` → any page-specific inline init script. `nav.js` reads the global `TOPICS` array defined by `topics.js`, and page-specific scripts (e.g. `initSimulator(...)` in `simulator.html`) call functions defined in `common.js`.

## Deployment

Hosted via GitHub Pages, deployed from the `main` branch root (no build step in CI — see README.md for the exact Settings → Pages steps). Pushing changes to tracked files updates the live site directly.

## Content provenance

`sap_sd_guide.html` is the original single-file version of this guide, kept in the repo root as a reference/backup. All of its content has been redistributed across the individual topic pages — do not treat it as a page to link to or maintain going forward; treat the per-topic `.html` files + `topics.js` as canonical.
