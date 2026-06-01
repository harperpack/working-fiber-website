# Bastion Fiber Arts Website Specification

Document status: Draft v1.0
Date: 2026-05-31
Project scope: New standalone project in this directory only.

## 1. Product Intent

Build a simple, elegant personal website for Bastion Fiber Arts that establishes the individual as a credible, creative, and technically capable full-stack fiber professional across the full workflow: growing and processing fiber, spinning and weaving fabric, and sewing and styling finished outfits.

The site should feel human and grounded, not generic, not clinical, not overdesigned, and not gimmicky.

## 2. Primary Goal and Success Criteria

Primary goal: establish presence and credibility for the individual.

Success criteria for v1:
- A first-time visitor understands who she is, what she does, and why her work is distinctive within 30 seconds.
- The site presents portfolio, experience, and offerings with clear navigation and no ambiguity.
- The visual tone supports the person and the craft without distracting from either.
- The site is fully usable on mobile, tablet, and desktop.
- The site works in latest stable Chrome, Safari, Brave, and Edge.
- Visitors can contact her directly from the site via email.

## 3. Non-Goals for v1

- No ecommerce checkout.
- No account/login features.
- No advanced CMS integration.
- No heavy animation systems or novelty-driven interactions.
- No dependency on a frontend framework.

## 4. Audience and Messaging

Primary audience:
- Curious visitors evaluating her craft credibility.
- Potential collaborators and commissioners.
- Future workshop or speaking organizers.

Message pillars:
- Full-stack fiber craftsmanship: from raw fiber to styled garment.
- Technical and artistic depth: process rigor plus creative expression.
- Integrity and provenance: clear process, materials, and intent.

Voice and tone:
- Calm, clear, precise, warm.
- Confident without hype.
- Personal without oversharing.

## 5. Information Architecture

Top-level pages (separate pages, not one-page sections):
- Home
- Work / Gallery
- Experience / About
- Offerings / Services
- Posts / Journal
- Contact

Global navigation:
- Header nav visible on all pages.
- Current page state is clearly indicated.
- Mobile nav uses an accessible menu toggle.
- Footer repeats core links and contact shortcut.

URL structure:
- /
- /work/
- /about/
- /offerings/
- /posts/
- /posts/{slug}.html
- /contact/

## 6. Page Specifications

### 6.1 Home

Purpose: immediate identity + credibility signal.

Required sections:
- Hero section with Bastion Fiber Arts branding, one-sentence positioning statement, and a muted background image.
- Short introduction paragraph (2-4 sentences).
- Full-stack workflow strip with four concise stages: grow/process, spin, weave, sew/style.
- Featured work preview (3-6 pieces).
- Offerings preview (2-4 offerings).
- Latest posts preview (2-3 items).
- Contact call-to-action.

Required interactions:
- Hero CTA to Work page.
- Secondary CTA to About page.
- Smooth but subtle reveal animations only.

### 6.2 Work / Gallery

Purpose: show breadth and quality of work outputs.

Required sections:
- Page intro explaining how the work is organized.
- Gallery grid of project cards.
- Optional lightweight category chips (for process stage) without complex filtering UI.
- Individual project detail blocks or linked detail pages.

Per project card must include:
- Title.
- One representative image.
- Stage tags (for example: processing, spinning, weaving, sewing, styling).
- One-sentence description.
- Optional materials and year.

### 6.3 Experience / About

Purpose: establish personal credibility and perspective.

Required sections:
- Bio narrative.
- Craft philosophy.
- Experience timeline or milestone list.
- Process and values (materials, method, care).
- Optional portrait image.

Content requirements:
- Keep paragraphs short and readable.
- Use concrete details rather than abstract claims.

### 6.4 Offerings / Services

Purpose: present current and near-term ways to engage.

Required sections:
- Intro text describing available and upcoming offerings.
- Offerings cards (for example: custom work, lessons, talks/speaking, collaborations).
- For each offering: description, audience fit, and current availability status.
- Contact CTA with clear next step.

Availability states:
- Available now.
- Limited availability.
- Coming soon.

### 6.5 Posts / Journal

Purpose: demonstrate ongoing thought and process.

Required sections:
- Post index with title, date, short excerpt, and tags.
- Individual post pages rendered as static HTML files linked by runtime data.
- Clear reading typography and generous spacing.

Post detail page requirements:
- Title, publish date, tags, and reading content.
- Link back to Posts index.
- Optional related posts section (max 3).

### 6.6 Contact

Purpose: provide a direct, low-friction path to connect.

Required sections:
- Short invitation text.
- Primary email link using mailto.
- Optional social links.
- Short note on expected response cadence.

Contact constraints:
- No contact form required in v1.
- Email link must be prominent above the fold on mobile.

## 7. Visual and Interaction Direction

Design principle: person-first editorial simplicity.

Color direction:
- Base palette anchored in linen-inspired neutrals.
- One restrained accent color for links and interactive emphasis.
- Avoid high-contrast novelty palettes.

Suggested token baseline:
- Background: #f5f0e6
- Surface: #efe7d8
- Text primary: #2d2926
- Text secondary: #5f564f
- Accent: #6e4e3a
- Border: #d8cdbb

Typography direction:
- Headings: elegant serif with personality.
- Body: readable sans-serif or transitional serif optimized for long reading.
- Avoid default system-only typography that feels generic.

Suggested pairings:
- Option A: Fraunces (headings) + Source Sans 3 (body)
- Option B: Cormorant Garamond (headings) + Work Sans (body)

Craft motif guidance:
- Use subtle thread/fiber motifs as structural accents, not decoration-first elements.
- Examples: fine thread-like divider lines, understated woven texture overlays at very low opacity.
- Never let motif elements compete with photography or content hierarchy.

Motion guidance:
- Use minimal motion only where it aids orientation or polish.
- Preferred effects: short fade-in, small upward reveal, gentle nav state transitions.
- Respect reduced motion preferences.

## 8. Accessibility Requirements

Minimum standard: WCAG 2.2 AA-aligned implementation.

Required behaviors:
- Full keyboard navigation across nav, links, and interactive controls.
- Visible focus styles with clear contrast.
- Semantic landmarks: header, nav, main, footer.
- Meaningful alt text for content images.
- Decorative images marked appropriately so assistive technologies can ignore them.
- Heading structure is logical and sequential.
- Color contrast meets AA thresholds.
- Mobile targets are comfortably tappable (minimum 44px touch targets).

## 9. Responsive Requirements

Required viewport classes:
- Small mobile: 320-374 px
- Large mobile: 375-767 px
- Tablet portrait: 768-1023 px
- Tablet landscape / small laptop: 1024-1279 px
- Desktop: 1280+ px

Layout behavior requirements:
- Navigation collapses cleanly on mobile with accessible toggle and focus trapping.
- Hero text remains legible over background image at all breakpoints.
- Gallery switches from single column (small screens) to multi-column grid (larger screens).
- Content line length remains readable (target roughly 55-75 characters where practical).
- No horizontal scrolling at any supported viewport.

## 10. Browser Compatibility Requirements

Target browsers:
- Latest stable Chrome.
- Latest stable Safari.
- Latest stable Brave.
- Latest stable Edge.

Compatibility expectations:
- Core layout, navigation, reading experience, and contact flow must work consistently.
- Minor visual differences in font rendering are acceptable.
- Use progressive enhancement and avoid brittle browser-specific hacks.

## 11. Performance Requirements

Performance objectives:
- Keep home page total transfer size lightweight for mobile-first loading.
- Optimize and compress images before commit.
- Use modern image formats where appropriate (WebP preferred with graceful fallback if needed).
- Avoid unnecessary JavaScript and third-party dependencies.

Target metrics on representative mobile network/device:
- Largest Contentful Paint: <= 2.5s
- Cumulative Layout Shift: <= 0.1
- Interaction to Next Paint: <= 200ms where measurable

## 12. Technical Architecture (v1)

Implementation constraints:
- Plain HTML, CSS, and JavaScript.
- No frontend framework.
- Semantic HTML-first structure.
- Modular CSS with design tokens via CSS custom properties.
- JavaScript only for navigation toggle, lightweight enhancements, and content rendering where needed.

Content approach:
- No build step is required for runtime publishing.
- JavaScript fetches collection content from local JSON files in `site/data/`.
- Local image paths are provided through data files and loaded from `site/assets/img/`.
- Static post detail pages live in `site/posts/` and are linked by slug data.

## 13. GitHub Pages Deployment Specification

Hosting target: GitHub Pages.

Deployment requirements:
- Keep deployment static and reproducible.
- Publish from a dedicated static output location (for example docs/ or built branch) defined in repository settings.
- Ensure all links and assets resolve correctly under GitHub Pages URL paths.
- Include clear rollback path by reverting to previous successful commit.

Operational requirements:
- Document exact publish workflow for non-technical updates.
- Include post-deploy smoke test checklist before considering release complete.

## 14. Definition of Done

This specification is considered implemented when:
- All six required pages exist and satisfy their required sections.
- The visual system reflects linen-toned, person-first editorial style with restrained motifs.
- Site is responsive and passes manual checks on mobile, tablet, and desktop.
- Site is verified in Chrome, Safari, Brave, and Edge.
- Accessibility checks pass keyboard and focus visibility basics.
- JSON-based content update flow is documented and works for at least one new post.
- Website is deployed and accessible on GitHub Pages.

## 15. Future Enhancements (Out of v1 Scope)

- Ecommerce for finished pieces.
- Booking workflow for workshops or speaking.
- Rich search and advanced filtering in gallery.
- Newsletter capture and CRM integration.
- Headless CMS migration if publishing volume grows.
