# Bastion Fiber Arts Website (No-Build Starter)

This folder contains a standalone static website starter for Bastion Fiber Arts.

The site uses plain HTML, CSS, and JavaScript with no Node build step.

## What is included

- Static website pages in `docs/`.
- Runtime content loaded from local data files in `docs/data/`.
- Runtime images loaded from `docs/assets/img/`.
- Optional Markdown/source drafts in `content/` and templates in `templates/content-templates/` for future workflow flexibility.
- GitHub Pages-compatible `docs/` folder for branch-based deployment.
- Planning docs:
  - `website-specification.md`
  - `content-model.md`
  - `codex-build-brief.md`

## Local preview

Option A (no tooling): open `docs/index.html` directly in a browser.

Option B (recommended for fetch behavior parity): serve the folder locally.

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/docs/
```

## Content update workflow

### Update homepage/work/offering/post listing content

1. Edit JSON files in `docs/data/`:
   - `posts.json`
   - `work.json`
   - `offerings.json`
2. Add/update referenced image files in `docs/assets/img/`.
3. Reload the page and verify content renders.

### Add a new post page

1. Copy an existing file in `docs/posts/`.
2. Rename it to `your-slug.html`.
3. Add matching entry in `docs/data/posts.json` with the same slug.
4. Verify the post appears in Home and Posts pages.

## GitHub Pages deployment

1. Create a new GitHub repository with this folder as repository root.
2. Push to `main`.
3. In repository settings, open Pages:
  - Source: Deploy from a branch
  - Branch: `main`
  - Folder: `/docs`
4. Save and wait for GitHub Pages to publish.

## Notes

- The runtime script fetches JSON from local `docs/data/` files.
- A fallback file `docs/data/local-data.js` is included so key content still renders when `fetch` is blocked in some `file://` browser contexts.
- When using Option A (opening HTML files directly), keep `docs/data/local-data.js` aligned with `docs/data/*.json` if you want fallback content to match your latest edits.
- Replace placeholder imagery in `docs/assets/img/` with production project photos when available.
