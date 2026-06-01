# Bastion Fiber Arts Content Model

Document status: Draft v2.0
Date: 2026-05-31
Scope: No-build static site where browser JavaScript fetches content and image paths from local directories.

## 1. Objectives

- No Node build requirement.
- Content should be editable by changing local files only.
- Site should render from static HTML plus JSON data at runtime.
- Image references should live in data files and resolve from local directories.

## 2. Directory Structure

```text
fiber/
  site/
    index.html
    work/index.html
    about/index.html
    offerings/index.html
    posts/index.html
    posts/{slug}.html
    contact/index.html
    assets/
      css/
      js/
      img/
        work/
    data/
      posts.json
      work.json
      offerings.json
      local-data.js
  content/
    about/
    offerings/
    posts/
    work/
  templates/
    content-templates/
      post-template.md
      work-template.md
      offering-template.md
```

Notes:
- `site/` is the deployable output and source of truth for runtime.
- `site/data/*.json` files are fetched by `site/assets/js/main.js`.
- `site/data/local-data.js` is a fallback used when `fetch` is blocked in some `file://` contexts.
- For direct file-open workflows, keep fallback arrays in `site/data/local-data.js` synchronized with `site/data/*.json`.
- `content/` remains optional for offline drafting and future migration, not for runtime rendering.

## 3. Runtime Data Files

### 3.1 Posts (`site/data/posts.json`)

```json
[
  {
    "title": "From Fiber to Fabric: Why Sequence Matters",
    "slug": "from-fiber-to-fabric",
    "date": "2026-05-31",
    "excerpt": "How early preparation choices influence spinning, weaving, and garment outcomes.",
    "tags": ["process", "weaving", "garments"]
  }
]
```

Required fields:
- `title`
- `slug`
- `date`
- `excerpt`

Optional fields:
- `tags` (array of strings)

### 3.2 Work (`site/data/work.json`)

```json
[
  {
    "title": "Field to Fleece Study",
    "summary": "A material-first project exploring local wool preparation and yarn behavior across weave structures.",
    "stages": ["Processing", "Spinning"],
    "year": "2025",
    "image": "assets/img/work/field-to-fleece-study.svg",
    "imageAlt": "Prepared fleece and yarn samples laid out on linen"
  }
]
```

Required fields:
- `title`
- `summary`

Optional fields:
- `stages` (array)
- `year`
- `image`
- `imageAlt`

### 3.3 Offerings (`site/data/offerings.json`)

```json
[
  {
    "title": "Custom Textile and Garment Work",
    "summary": "Commissioned projects built around use case, materials, and style direction.",
    "availability": "Limited availability",
    "tags": ["Commission", "One-to-one"]
  }
]
```

Required fields:
- `title`
- `summary`

Optional fields:
- `availability`
- `tags` (array)

## 4. Image Handling Rules

- Keep image assets under `site/assets/img/`.
- Store image paths inside JSON data records.
- For nested pages, use container-level prefix attributes (for example `data-image-prefix="../"`) when needed.
- Provide meaningful alt text in data when an image is content-relevant.

## 5. Runtime Rendering Contract

`site/assets/js/main.js` currently supports:
- `[data-posts-list]` with `data-source`, `data-post-link-prefix`, and optional `data-limit`
- `[data-work-list]` with `data-source`, optional `data-limit`, and optional `data-image-prefix`
- `[data-offerings-list]` with `data-source` and optional `data-limit`

If `fetch` fails, script falls back to arrays in `window.BFA_LOCAL_DATA` from `site/data/local-data.js`.

## 6. No-Build Publishing Workflow

1. Edit `site/data/*.json` files.
2. Add/update images under `site/assets/img/`.
3. Add/update post detail HTML pages in `site/posts/`.
4. Open `site/index.html` (or local server) and verify rendering.
5. Commit and push for GitHub Pages deployment.

## 7. Validation Checklist

- JSON syntax is valid.
- Every referenced image path exists.
- Every post slug in `posts.json` has a corresponding `site/posts/{slug}.html` file.
- Home and posts list links resolve correctly.
- Work images render on both Home and Work pages.
- Offerings render from data without hardcoded card markup.
