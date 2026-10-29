# AGENTS.md

Instructions for AI coding agents working on the Exeevo marketing website. Read this file fully before making changes. **Design:** the site follows the "Clinical light" design system (`docs/design-system.md`; sources `ExeevoNewDesignSystem.html` and `ExeevoNewWebsiteDesign.html`). The original build brief `exeevo-website-prompt.md` still holds the content and copy, but its dark "Clinical Glass" visual design is superseded. When they disagree, this file wins on process, the design system wins on design, and the brief wins on content.

## Project overview

- **What:** The public marketing site for Exeevo, a unified, AI-powered life sciences CRM built natively on Microsoft.
- **Audience:** Commercial, medical, marketing and IT leaders at pharma and MedTech companies.
- **Look:** "Clinical light": porcelain, white and mist grounds, frosted-glass cards over soft glows, Geist in light and bold pairs, pill buttons, gradient dots only where colour carries meaning, hairline dividers, one-time scroll reveals.
- **Pages:**

| Route | Page |
| --- | --- |
| `/` | Home |
| `/platform` | Platform overview (eight stacked module sections; `?module=<slug>` scrolls to one) |
| `/why-exeevo` | Why Exeevo |
| `/microsoft` | Built natively on Microsoft (technology strip, stats, "built for life sciences", product cards; logos in `public/microsoft/`) |
| `/industries` | Industries |
| `/solutions-by-role` | Solutions by Role (live, but not in the nav or footer; not yet redesigned) |
| `/ask-nova` | Ask-Nova Studio & AI |
| `/services` | Professional Services: Consult, Implement, Operate (replaced Getting Started; `/getting-started` redirects here) |
| `/about`, `/partners` | About, Partners (nav label "Partnerships"; Industries is no longer in the nav bar, the page and footer links stay) |
| `/resources`, `/events`, `/glossary` and detail pages | Resources (CMS content; light-touch styling until redesigned) |

## Stack

- Next.js (latest stable, App Router), React, TypeScript (`strict`).
- Tailwind CSS v4. Tokens are declared in `app/styles/tokens.css` via `@theme` and mirrored as `--ex-*` CSS variables.
- Plain CSS for the complex effects: `app/styles/glass.css`, `specimen.css` and `motion.css`.
- Motion (`motion/react`) for page transitions and interactive state animation.
- Native CSS scroll-driven animations for scroll reveals. Never use a JavaScript scroll library.
- `next/font/google`: Geist only (`--font-geist`) for display and text.
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
  layout/       Nav (plain links), MobileMenu, Footer, ScrollProgress (MegaMenu and NavMenu are unused until a menu design arrives)
  ui/           Button, IconButton, TextLink, Chip, CategoryDot, SegmentedControl, Checklist, Field, Select
  glass/        GlassPanel, Orb, Specimen, Glow (legacy dark glass only for pages not yet redesigned)
  sections/     one component per page section
content/        typed copy: site, modules, compliance, comparison, industries, roles, paths
public/brand/   exeevo-icon.png, exeevo-wordmark-white.png, exeevo-wordmark-slate.png
tests/          smoke.spec.ts, a11y.spec.ts
```

## Code conventions

- Server Components by default. Add `"use client"` only to components that need state, effects or Motion: Nav, MobileMenu, IndustriesPage, DemoForm and the page-transition template.
- **Content:**
  - All copy lives in `content/*.ts` as typed objects. Components receive content through props.
  - Never hard-code marketing copy inside components.
  - Never invent copy, statistics, customers, logos or testimonials. A missing fact gets a visible placeholder in square brackets, such as `[VIDEO URL]`.
- **Naming:** components use PascalCase files; content keys are camelCase; module slugs are kebab-case (`crm-sales`, `ask-nova-studio`).
- **Styling:**
  - Tailwind utilities for layout and spacing.
  - Named classes from `app/styles/system.css` for the design system (`h1`, `h2`, `h3`, `lead`, `body-text`, `glass`, `card`, `aura`, `gridbg`, `ruler`, `dot`, `btn btn-ink`, `btn-glass`, `tlink`, `nl`, `lift`, `row`, `wrap`) and motion (`sr`, `srl`, `srr`, `srg`, `srt`, `px`, `ln`, `d1` to `d3`, `stagger`). Page-specific CSS lives in its own file.
  - No inline hex colours in components; always use tokens.
- **Props:** `Button` takes `variant: "primary" | "secondary" | "text"` (ink pill, glass pill, blue text link) and `size: "hero" | "content" | "nav"`.
- **Deep links:**
  - Platform module: `/platform?module=<slug>`
  - Industry: `/industries?industry=pharma|medtech`
  - Demo / contact form: `/#demo` (last section of Home)
  - Service: `/services?service=<slug>` (selects it; slugs in `content/services.ts`)
- Keep components under about 200 lines. Split sections instead of growing files.

## Design rules (do not break)

Full detail in `docs/design-system.md`.

1. **Brand colour never fills a section.** It appears only as small gradient dots that carry meaning (category, phase, stage), soft blurred glows behind glass, and the thin gradient line (scroll progress, connectors). Never set text on a gradient.
2. **Light grounds.** Page ground porcelain `#F6F8F9`, alternating with white and mist `#EEF2F4` between sections. Ink `#1D262D` is for text and the primary button only.
3. **One typeface: Geist.** No second label font, no monospace, no all-caps or wide-tracked labels; sentence case everywhere.
4. **Headings pair a light grey phrase (`#5E6B74`, weight 300) with one bold ink phrase (`#1D262D`, weight 500)** via `.h1` / `.h2` and a `<b>`. Display 76, H2 52, H3 22 to 28, lead 18, body 15, small label 13.5.
5. **Buttons are pills.** Ink is primary (one per view); glass is secondary; blue text link for tertiary. No white or gradient-filled buttons.
6. **Glass over soft glows**, hairline borders, light shadows only; solid white `card` only on flat grounds. Keep an opaque fallback for browsers without `backdrop-filter`.
7. **Category colours:** Commercial = blue, Medical = magenta, Platform = green, AI = the gradient dot. Phases: Consult = magenta, Implement = blue, Operate = green. Green text on light grounds uses `--ex-green-ink`.
8. **Radius grows with surface size:** pill 999, chip 12, card 20, panel 28, block 36, 50% for orbs.
9. **Avoid generic template tells:** eyebrow labels above headings unless they add information, coloured squares or bracket letters, decorative counters ("01 / 08", "Service 01"), heavy drop shadows or glows under the nav, emoji, left-border accent cards. Useful numbering stays (list items, "1 of 2").
10. **Sticky nav** is a glass pill over a short gradient blur that ends at the nav edge. Nav links are plain (no dropdowns) until menu designs exist.

## Motion rules

- **Hero load:** `rise` sequence, once per page.
- **Scroll reveals:**
  - CSS only, inside `@supports (animation-timeline: view())`.
  - Reveals play once, time-based (`RevealObserver`), never reverse and never depend on scroll position; no-JS, crawlers and reduced motion see the final state.
  - Scroll keyframes animate `translate` / `scale` / `rotate` / `opacity` / `filter` only, so hover `transform` keeps working.
- **Ambient loop:** one loop per visual (cursor demo, data flow, dial, orbit). Pause off-screen loops (`data-orb` / `data-paused`) and show the final state under reduced motion.
- **Interactive motion** (Motion):
  - Role panels: flex-grow 1 → 5, 0.7s.
  - Industry switch: cross-fade with an 18px slide.
  - Page transitions: fade, 16px rise and blur-out.
  - Shared hero orb: `layoutId="hero-orb"`.
- **Easing:** `--ex-ease-out` for arrivals, `--ex-ease-soft` for hover.
- **Home exceptions to reduced motion:** the Home record demo, adoption phone and licence stack (`useLoops`) and the Microsoft page strip (`Marquee`) run on the Web Animations API so a global `animation: none` cannot freeze them and Home keeps its one-time scroll reveals (`data-reveal-always`). Everything else follows the setting.
- **Reduced motion:** under `prefers-reduced-motion: reduce`, every animation and transition is disabled and Motion uses `useReducedMotion()` to make changes instant. Nothing may be hidden when motion is off.

## Accessibility (required)

- WCAG 2.2 AA. Text contrast is at least 4.5:1, or 3:1 at 24px and above. The checked token pairs are in the brief. Do not introduce new pairs without checking them.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link, and exactly one `h1` per page.
- Real `<button>`, `<a href>`, `<label>` and `<table>` elements. Never put click handlers on a `div` or `span`.
- Visible focus on every control: 2px `--ex-blue` outline with a 3px offset.
- Keyboard behaviour:

| Component | Keys |
| --- | --- |
| Mobile menu | Opens from the menu button, Escape closes |
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
- Consent copy is a professional placeholder until legal provides final wording and a privacy link.

## Testing

Playwright covers:
- every route returns 200 and renders its h1
- every nav and footer link resolves
- mobile menu keyboard behaviour
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
