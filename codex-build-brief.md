# GPT-5.3-Codex Build Brief: Bastion Fiber Arts Website v1

Use this brief as the direct implementation prompt.

## Role

You are GPT-5.3-Codex, acting as a senior frontend engineer and UX-minded builder.

## Project Objective

Build and deploy a static personal website for Bastion Fiber Arts that establishes credibility and presence for a full-stack fiber professional who works across the full process: growing and processing fiber, spinning and weaving fabric, and sewing and styling finished outfits.

## Hard Constraints

- Work only in the current project directory.
- No dependency on unrelated repository files.
- Use plain HTML, CSS, and JavaScript only.
- No frontend framework.
- No Node build step.
- Runtime content must be loaded by browser JavaScript from local data files.
- Runtime images must be loaded from local image directories.

## Required Runtime Pattern

- Keep pages in `site/`.
- Keep content collections in `site/data/*.json`.
- Keep images in `site/assets/img/`.
- Use JavaScript in `site/assets/js/main.js` to fetch and render content lists.
- Include fallback data in `site/data/local-data.js` for `file://` contexts where `fetch` may be blocked.

## Required Pages

- Home (`/`)
- Work / Gallery (`/work/`)
- Experience / About (`/about/`)
- Offerings / Services (`/offerings/`)
- Posts / Journal index (`/posts/`)
- Post detail pages (`/posts/{slug}.html`)
- Contact (`/contact/`)

## Required UX Characteristics

- Immediate clarity on identity and capability.
- Calm, warm, person-first editorial tone.
- Muted hero background treatment.
- Subtle textile/thread motif accents.
- Accessible keyboard and focus behavior.
- Minimal motion only.

## Data Contracts

Implement and maintain:
- `site/data/posts.json` for post list metadata.
- `site/data/work.json` for work/gallery cards.
- `site/data/offerings.json` for offerings cards.
- `site/data/local-data.js` for optional fallback arrays.

## Deliverables

1. Static page implementation in `site/` with shared nav/footer patterns.
2. CSS design system in `site/assets/css/styles.css`.
3. JavaScript runtime renderer in `site/assets/js/main.js` using fetch-first loading.
4. JSON data collections in `site/data/`.
5. Starter image assets in `site/assets/img/`.
6. Documentation in `README.md` describing no-build editing and deployment.
7. GitHub Pages workflow that deploys static files directly.

## Accessibility and Quality Requirements

- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Keyboard operable navigation and controls.
- Visible focus styles.
- Meaningful alt text for content images.
- No horizontal scrolling at supported viewport widths.

## Responsive and Browser Targets

Breakpoints:
- 320-374 px
- 375-767 px
- 768-1023 px
- 1024-1279 px
- 1280+ px

Browsers:
- Chrome (latest stable)
- Safari (latest stable)
- Brave (latest stable)
- Edge (latest stable)

## Definition of Done

Implementation is done when:
- Bastion Fiber Arts branding is consistent across pages.
- All required pages are implemented and linked.
- Work, offerings, and post lists render from local data files via JavaScript.
- At least one post detail page exists and is linked from data.
- No Node build command is required for local use or deployment.
- GitHub Pages workflow deploys `site/` as static artifact.
