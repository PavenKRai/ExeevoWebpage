# AGENTS.md

Instructions for AI coding agents working on the Exeevo marketing website. Read this file fully before making changes. The build brief, which covers design tokens, page layouts, motion specs and all copy, is in `exeevo-website-prompt.md`. When the two disagree, this file wins on process and the brief wins on design and content.

## Project overview

- **What:** The public marketing site for Exeevo, a unified, AI-powered life sciences CRM built natively on Microsoft.
- **Audience:** Commercial, medical, marketing and IT leaders at pharma and MedTech companies.
- **Look:** "Clinical Glass". Deep ink and pale mist surfaces, frosted glass panels, a glowing brand-gradient "specimen" sphere, CSS 3D depth, and scroll-driven reveals.
- **Pages:**

| Route | Page |
| --- | --- |
| `/` | Home |
| `/platform` | Platform overview |
| `/why-exeevo` | Why Exeevo |
| `/industries` | Industries |
| `/solutions-by-role` | Solutions by Role |
| `/getting-started` | Getting Started |

## Stack

- Next.js (latest stable, App Router), React, TypeScript (`strict`).
- Tailwind CSS v4. Tokens are declared in `app/styles/tokens.css` via `@theme` and mirrored as `--ex-*` CSS variables.
- Plain CSS for the complex effects: `app/styles/glass.css`, `specimen.css` and `motion.css`.
- Motion (`motion/react`) for page transitions and interactive state animation.
- Native CSS scroll-driven animations for scroll reveals. Never use a JavaScript scroll library.
- `next/font/google`: Sora (display, `--font-sora`) and Figtree (text, `--font-figtree`).
- lucide-react icons at stroke width 1.8.
- React Hook Form + Zod for the demo form, posting to `app/api/demo/route.ts`.
- pnpm, ESLint, Prettier, Playwright, and @axe-core/playwright.

Do not add dependencies beyond these without saying why in the PR description. In particular, do not add:
- WebGL / three.js
- GSAP, Lenis or any smooth-scroll library
- UI kits such as MUI or Chakra
- icon fonts
- CSS-in-JS

## Commands

```bash
pnpm install
pnpm dev          # local dev server
pnpm build        # production build (must pass)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm test         # Playwright smoke + accessibility
pnpm format       # Prettier
```

Run `pnpm lint && pnpm typecheck && pnpm test` before you consider any task complete. Fix failures; do not skip or disable tests to make them pass.

## Repository layout

```
app/            routes, layout.tsx, template.tsx (page transitions), api/demo, styles/
components/
  layout/       Nav, MegaMenu, MobileMenu, Footer, ScrollProgress
  ui/           Button, IconButton, TextLink, Chip, CategoryDot, SegmentedControl, Checklist, Field, Select
  glass/        GlassPanel, Orb, Specimen, Glow
  sections/     one component per page section
content/        typed copy: site, modules, compliance, comparison, industries, roles, paths
public/brand/   exeevo-icon.png, exeevo-wordmark-white.png, exeevo-wordmark-slate.png
tests/          smoke.spec.ts, a11y.spec.ts
```

## Code conventions

- Server Components by default. Add `"use client"` only to components that need state, effects or Motion: Nav, MegaMenu, MobileMenu, ModuleDeck, RolePanels, IndustrySwitcher, DemoForm and the page-transition template.
- **Content:**
  - All copy lives in `content/*.ts` as typed objects. Components receive content through props.
  - Never hard-code marketing copy inside components.
  - Never invent copy, statistics, customers, logos or testimonials. A missing fact gets a visible placeholder in square brackets, such as `[VIDEO URL]`.
- **Naming:** components use PascalCase files; content keys are camelCase; module slugs are kebab-case (`crm-sales`, `ask-nova-studio`).
- **Styling:**
  - Tailwind utilities for layout and spacing.
  - Named classes from `app/styles/*.css` for glass (`glass-dark`, `glass-light`), the sphere (`orb`, `ring`, `sat`) and motion (`sr`, `srl`, `srr`, `srg`, `srt`, `px`, `ln`, `d1`–`d3`, `lift`).
  - No inline hex colours in components; always use tokens.
- **Props:** `GlassPanel` takes `tone: "dark" | "light"`. `Button` takes `variant: "primary" | "secondary" | "text"` and `size: "hero" | "content" | "nav"`.
- **Deep links:**
  - Platform module: `/platform?module=<slug>`
  - Industry: `/industries?industry=pharma|medtech`
  - Demo: `/getting-started#demo`
- Keep components under about 200 lines. Split sections instead of growing files.

## Design rules (do not break)

1. **The gradient is light, not a fill.**
   - Use `--ex-gradient` / `--ex-orb` only for: the sphere, blurred glows behind glass, the 1.5px primary-button ring, the scroll progress bar and connector lines.
   - Never use it as a section background, and never set text on it.
2. **No white buttons and no gradient-filled buttons.** The primary button is always ink glass with the gradient ring. Use one primary action per view.
3. **Glass needs light behind it.** Every glass surface sits over an orb or a blurred glow. Provide an opaque fallback for browsers without `backdrop-filter`.
4. **Two typefaces only:** Sora for h1–h3, Figtree for everything else. Use sentence case and no all-caps labels.
5. **Category colours:**
   - Commercial = `--ex-blue`
   - Medical = `--ex-magenta`
   - Platform = `--ex-green`
   - AI = the gradient
   - KAM role accent = `#6E5BD8`
6. **Green never carries white text.** Green text on light grounds uses `--ex-green-ink`, and only for icons or 24px+ type.
7. **Radius grows with surface size** (12 → 36, 50% for orbs). Never use one radius everywhere.
8. **Avoid generic template tells:**
   - numbered "01 / 02 / 03" markers on content that isn't a sequence (the deck position counter is fine)
   - left-border accent cards
   - emoji
   - identical grey-shadow card grids
   - arrows appended to every link
9. **3D is CSS only:** `perspective` and `preserve-3d`, with transforms on the GPU-friendly properties.

## Motion rules

- **Hero load:** `rise` sequence, once per page.
- **Scroll reveals:**
  - CSS only, inside `@supports (animation-timeline: view())`.
  - They must reverse when scrolling up, and browsers without support must show the final state.
  - Scroll keyframes animate `translate` / `scale` / `rotate` / `opacity` / `filter` only, so hover `transform` keeps working.
- **Ambient loop:** only the specimen sphere and its rings loop. Pause the sphere with `animation-play-state` when it is off-screen.
- **Interactive motion** (Motion):
  - Module deck: 3D offset stack, 0.8s.
  - Role panels: flex-grow 1 → 5, 0.7s.
  - Industry switch: cross-fade with an 18px slide.
  - Page transitions: fade, 16px rise and blur-out.
  - Shared hero orb: `layoutId="hero-orb"`.
- **Easing:** `--ex-ease-out` for arrivals, `--ex-ease-soft` for hover.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, every animation and transition is disabled and Motion uses `useReducedMotion()` to make changes instant. Nothing may be hidden when motion is off.

## Accessibility (required)

- WCAG 2.2 AA. Text contrast is at least 4.5:1, or 3:1 at 24px and above. The checked token pairs are in the brief. Do not introduce new pairs without checking them.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link, and exactly one `h1` per page.
- Real `<button>`, `<a href>`, `<label>` and `<table>` elements. Never put click handlers on a `div` or `span`.
- Visible focus on every control: 2px `--ex-blue` outline with a 3px offset.
- Keyboard behaviour:

| Component | Keys |
| --- | --- |
| Mega menu | Enter/Space to open, Escape to close, focus trapped while open |
| Module rail | Arrow keys move the selection |
| Role panels | `aria-expanded` |
| Segmented control | `aria-pressed` |
| Mobile sheet | Traps focus and restores it on close |

- Icon-only buttons need an `aria-label`. Decorative orbs and glows get `aria-hidden="true"`.
- Hit targets are at least 44×44px.
- Form errors appear in text below the field and are linked with `aria-describedby`.

## Performance budgets

- **Core Web Vitals:** LCP under 2.0s on a mid-tier 4G mobile, CLS under 0.05, INP under 200ms.
- **Animation:** only animate `transform`, `opacity`, `filter`, `translate`, `scale` and `rotate`. Never animate layout properties except the role panels' `flex-grow`.
- **Blur:** no more than 6 live `backdrop-filter` surfaces visible in one viewport. On mobile, reduce blur radius by 30%.
- **Images and fonts:** use `next/image` for raster images. Fonts load through `next/font` with `display: swap`.

## Responsive behaviour

Design widths are 390, 768, 1024 and 1440. Below 1024px the nav collapses into a menu button with a full-height glass sheet. The per-section mobile layouts are in section 7 of the brief. The key ones:
- Home: the 3D module board becomes a flat 2-column grid.
- Platform: the rail becomes a horizontal chip row and the deck supports swipe.
- Why Exeevo: the comparison table becomes stacked cards.
- Solutions by Role: the panels become an accordion.
- Getting Started: the path cards stack with a vertical connector.

## Forms and data

- `app/api/demo/route.ts` validates with the same Zod schema as the client and forwards to `process.env.CRM_FORM_ENDPOINT`.
- Never log personal data. Never put personal data in URLs or query strings.
- Keep secrets in environment variables and document them in `.env.example`: `CRM_FORM_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`.
- Consent copy is a placeholder (`[Privacy consent copy and link]`) until legal provides it.

## Testing

Playwright covers:
- every route returns 200 and renders its h1
- every nav and footer link resolves
- mega menu keyboard behaviour
- module deck selection by click, arrow keys and deep link
- role panel expand/collapse
- the industry toggle and its deep link
- demo form validation errors and the success state (with the API mocked)
- axe on every page, with zero serious or critical violations

Run the suite in both normal and reduced-motion emulation.

## Definition of done

- `pnpm build`, `pnpm lint`, `pnpm typecheck` and `pnpm test` all pass.
- The change matches the brief's tokens, layout and copy. You have checked it at 390, 768, 1024 and 1440 widths.
- Keyboard and reduced-motion behaviour have been checked by hand.
- No new dependencies, colours, fonts or copy were introduced outside the brief without noting them in the PR description.
- Any placeholder you added is listed in the PR description.

## Working style for agents

- Make small, focused changes. Do not restyle or refactor things outside the task.
- If the brief is ambiguous, pick the option that best follows the design rules above, and note the assumption in the PR description.
- Never commit secrets, generated build output or `.env` files.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
