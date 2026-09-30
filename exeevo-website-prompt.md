# Build prompt: Exeevo website redesign ("Clinical Glass", v2)

Paste this whole file into your IDE agent as the task. Keep `AGENTS.md` at the repository root so the agent follows the project rules on every step.

---

## 1. The task

Build the new marketing website for **Exeevo**, a unified, AI-powered life sciences CRM built natively on Microsoft (Dynamics 365, Power Platform, Azure). The audience is commercial, medical, marketing and IT leaders at pharma and MedTech companies who are evaluating CRM vendors.

The visual direction is called **Clinical Glass**. Every page is built around a glowing "specimen" sphere lit from inside by the Exeevo brand gradient, with frosted glass panels floating over it in 3D. It should feel precise, calm and scientific, like looking at a sample through a lens. It must not look like a generic SaaS template.

Build six pages, a shared layout, a small component library and the motion system described below. Use only the copy in section 9. Do not invent statistics, customer names, logos or testimonials. Where a fact is missing, leave a visible placeholder in square brackets, for example `[CASE STUDY LINK]`.

---

## 2. Tech stack (decided)

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js, latest stable, App Router** | Static generation for speed and SEO, file-based routes, image and font optimisation, and one route handler for the demo form. |
| Language | **TypeScript**, `strict: true` | Typed content models keep copy and components in sync. |
| Styling | **Tailwind CSS v4** with design tokens declared in `@theme` and mirrored as CSS variables | Tokens live in one CSS file; utilities stay consistent with the design system. |
| Complex CSS | Plain CSS in `app/styles/*.css` for glass, orb, rings and scroll timelines | These effects are clearer as named classes than as long utility strings. |
| Interactive motion | **Motion** (`motion/react`, formerly Framer Motion) | Page transitions, the Platform deck, the Roles panels, the Industries toggle and the shared hero-orb transition. |
| Scroll motion | **Native CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`) inside `@supports` | Zero JavaScript, smooth, and reversible when scrolling back up. Unsupported browsers show the final state. |
| 3D | **CSS 3D transforms** (`perspective`, `preserve-3d`) | No WebGL. It's lighter, sharper on text, and matches the design. |
| Fonts | `next/font/google`: **Sora** (display) and **Figtree** (text) | Self-hosted automatically, no layout shift. |
| Icons | **lucide-react**, stroke width 1.8 | Thin stroke icons match the glass aesthetic. Never use emoji. |
| Forms | **React Hook Form** + **Zod**, posting to `app/api/demo/route.ts` | The handler forwards to `[CRM_FORM_ENDPOINT]`, for example a Dynamics 365 Customer Insights – Journeys form. |
| Content | Typed modules in `content/*.ts` | Copy stays out of components; it is easy to move to a CMS later. |
| Package manager | **pnpm** | |
| Quality | ESLint, Prettier, **Playwright** smoke tests, **@axe-core/playwright** accessibility checks | |
| Hosting | Azure Static Web Apps (hybrid Next.js) or Vercel | Azure fits the Microsoft story. Keep the code host-agnostic. |

---

## 3. Project structure

```
app/
  layout.tsx              fonts, <html>, skip link, Nav, Footer, ScrollProgress
  template.tsx            page-transition wrapper (Motion)
  page.tsx                Home
  platform/page.tsx
  why-exeevo/page.tsx
  industries/page.tsx
  solutions-by-role/page.tsx
  getting-started/page.tsx
  api/demo/route.ts
  styles/
    tokens.css            @theme + :root variables (section 4)
    glass.css             .glass-dark, .glass-light
    specimen.css          .orb, .ring, .sat, orbit keyframes
    motion.css            load, scroll and hover animations (section 6)
components/
  layout/  Nav.tsx, MegaMenu.tsx, MobileMenu.tsx, Footer.tsx, ScrollProgress.tsx
  ui/      Button.tsx, IconButton.tsx, TextLink.tsx, Chip.tsx, CategoryDot.tsx,
           SegmentedControl.tsx, Checklist.tsx, Field.tsx, Select.tsx
  glass/   GlassPanel.tsx, Orb.tsx, Specimen.tsx, Glow.tsx
  sections/ one file per page section (HomeHero.tsx, Pathways.tsx, Outcomes.tsx,
           PlatformBoard.tsx, TenantDiagram.tsx, GoLivePaths.tsx, ModuleDeck.tsx,
           ComplianceTiles.tsx, ComparisonTable.tsx, IndustrySwitcher.tsx,
           RolePanels.tsx, DemoForm.tsx, …)
content/
  site.ts  modules.ts  compliance.ts  comparison.ts  industries.ts  roles.ts  paths.ts
public/brand/
  exeevo-icon.png  exeevo-wordmark-white.png  exeevo-wordmark-slate.png
tests/
  smoke.spec.ts  a11y.spec.ts
```

The three brand PNGs are supplied with this prompt. If the brand team can supply SVG versions, use those instead.

---

## 4. Design tokens

Put these in `app/styles/tokens.css` and expose them to Tailwind through `@theme`.

```css
:root{
  /* brand (from the Exeevo brand sheet) */
  --ex-slate:#333F48;      /* Pantone 432   CMYK 78/64/53/43  RGB 51/63/72 */
  --ex-magenta:#DF1995;    /* Pantone 225   CMYK 8/96/0/0     RGB 223/25/149 */
  --ex-blue:#0762C8;       /* Pantone 2387C CMYK 87/64/0/0    RGB 7/98/200 */
  --ex-green:#00C389;      /* Pantone 3395C CMYK 72/0/64/0    RGB 0/195/137 */
  --ex-gradient:linear-gradient(100deg,#DF1995,#0762C8 55%,#00C389);
  --ex-orb:conic-gradient(from 200deg,#DF1995,#0762C8,#00C389,#0762C8,#DF1995);

  /* neutrals */
  --ex-ink:#182026;            /* dark sections, primary button fill */
  --ex-ink-deep:#141A1F;       /* footer */
  --ex-heading:#1D262D;        /* headings on light */
  --ex-text:#333F48;           /* body on light */
  --ex-muted:#56636C;          /* secondary text on light */
  --ex-mist:#E9EEF1;           /* page ground */
  --ex-frost:#F6F8F9;          /* quiet sections */
  --ex-hairline:#D3DBE0;       /* dividers on light */
  --ex-on-dark:#B6C1C8;        /* body on dark */
  --ex-on-dark-muted:#A3AFB7;  /* secondary on dark */
  --ex-link-on-dark:#8EC2FF;   /* emphasis line on dark */
  --ex-green-ink:#008A61;      /* green icons on light only */

  /* type */
  --ex-font-display:var(--font-sora),'Segoe UI',system-ui,sans-serif;
  --ex-font-text:var(--font-figtree),'Segoe UI',system-ui,sans-serif;

  /* radius */
  --ex-r-chip:12px; --ex-r-input:14px; --ex-r-btn:17px; --ex-r-card-s:22px;
  --ex-r-card:28px; --ex-r-panel:32px; --ex-r-block:36px;

  /* glass */
  --ex-glass-dark:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.035));
  --ex-glass-light:linear-gradient(145deg,rgba(255,255,255,.78),rgba(255,255,255,.42));
  --ex-blur-dark:blur(22px) saturate(170%);
  --ex-blur-light:blur(26px) saturate(180%);

  /* motion */
  --ex-ease-out:cubic-bezier(.16,1,.3,1);
  --ex-ease-soft:cubic-bezier(.2,.8,.2,1);
  --ex-dur-fast:.35s; --ex-dur-base:.6s; --ex-dur-slow:.9s;
}
```

### Colour rules
- The gradient is **light, never a fill**. Use it only for the specimen sphere, soft blurred glows behind glass, the 1.5px ring on primary buttons, the scroll progress bar and connector lines. Never put text on it, and never wash a whole section with it.
- Category colours: Commercial = blue, Medical = magenta, Platform = green, AI (Ask-Nova) = the gradient.
- Green never carries white text. On light grounds, green text or icons use `--ex-green-ink`, and only for icons or 24px+ type.
- Checked contrast pairs:

| Pair | Ratio |
| --- | --- |
| Slate on mist | 9.2:1 |
| Muted on mist | 5.3:1 |
| Blue on mist | 5.0:1 |
| White on ink | 16.5:1 |
| On-dark on ink | 9.0:1 |
| On-dark-muted on ink | 7.4:1 |
| Ink on green | 6.7:1 |
| White on magenta | 4.5:1 (24px+ only) |

### Typography scale

Headings use Sora. Everything else uses Figtree. Use sentence case everywhere and no all-caps labels.

| Role | Font / weight | Size / line-height | Tracking | Mobile size |
| --- | --- | --- | --- | --- |
| Display (h1) | Sora 600 | 64 / 1.04 | -0.035em | 40 |
| H2 feature | Sora 600 | 48 / 1.06 | -0.03em | 34 |
| H2 section | Sora 600 | 46 / 1.08 | -0.03em | 32 |
| H3 statement | Sora 600 | 28 / 1.2 | -0.02em | 22 |
| Card title | Figtree 600 | 26 / 1.15 | -0.02em | 22 |
| Lead | Figtree 450 | 26 / 1.3 | -0.015em | 20 |
| Body large | Figtree 350 | 18 / 1.6 | 0 | 17 |
| Body | Figtree 400 | 16 / 1.55 | 0 | 16 |
| UI label | Figtree 500–600 | 15 / 1.4 | 0 | 15 |
| Small | Figtree 400 | 14 / 1.5 | 0 | 14 |
| Caption | Figtree 400 | 13 / 1.45 | 0 | 13 |

Use `clamp()` between the mobile and desktop sizes. Keep paragraphs at 640px max width and use `text-wrap: balance` on headings.

### Space and layout
- Spacing steps: 4, 8, 12, 16, 24, 32, 40, 56, 80, 120.
- Desktop frame: 1440px design width, 80px side margins, 12 columns, 24px gutters, max content width 1280px.
- Section vertical padding: 120px on desktop, 80px on tablet, 64px on mobile.
- Breakpoints: 390 (design base for mobile), 768, 1024, 1280, 1440.
- Radius grows with surface size: chips and icon tiles 12, inputs and nav links 14, buttons 17, small glass cards 22, cards 28, panels and deck cards 32, section blocks 36, orbs 50%.

---

## 5. Glass, sphere and components

### Glass recipes
```css
.glass-dark{background:var(--ex-glass-dark);backdrop-filter:var(--ex-blur-dark);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.22),0 30px 60px -24px rgba(0,0,0,.55)}
.glass-light{background:var(--ex-glass-light);backdrop-filter:var(--ex-blur-light);
  border:1px solid rgba(255,255,255,.9);
  box-shadow:inset 0 1px 0 #fff,0 28px 56px -28px rgba(24,32,38,.32)}
```
Include the `-webkit-backdrop-filter` prefix. Glass only works over something colourful, so always place an orb or a blurred glow behind a glass surface. Provide an opaque fallback in `@supports not (backdrop-filter: blur(1px))`.

### The specimen (`<Specimen />`)
- **Sphere:** a circle filled with `--ex-orb`, plus a radial white highlight at 32% / 28%. It rotates slowly: `spin 40s linear infinite`.
- **Glow:** a blurred copy behind it (`blur(70px)`, opacity .5).
- **Lens:** a frosted glass disc overlapping the sphere, offset down and to the right, so the gradient refracts through it.
- **Rings:** three thin rings (1px, white 28%) in a `preserve-3d` container. Each tilts differently (rotateX 72/64/80deg, rotateY 8/-38/52deg) and spins at 22s, 30s and 26s, alternating direction. Each ring carries one small glowing dot: magenta, green, white.
- **Hero cards (Home only):** three `.glass-dark` cards tilted in 3D around the sphere. They enter with `tiltIn` and then float gently (translateY ±12px over 7–9s).
- The sphere is the **only ambient loop** on a page.

### Components

**Buttons**
- **Primary button:** ink glass fill with a 1.5px gradient ring: `background: linear-gradient(135deg, rgba(40,52,61,.92), rgba(24,32,38,.92)) padding-box, var(--ex-gradient) border-box; border: 1.5px solid transparent`. Text is white. Hover lifts it 2px and adds a magenta-blue glow.
  - Heights: 56 (hero), 52–54 (content), 48 (nav).
  - One primary action per view.
  - **No white buttons and no gradient-filled buttons.**
- **Secondary glass button:** glass-dark pill with a 38px gradient-sphere play icon. Used for "See the platform in 90 seconds".
- **Icon button:** 52px square, primary style, with an `aria-label`.
- **Text link:** 600 weight with a 2px blue underline offset 3px.

**Navigation**
- **Nav:** a floating glass bar, 72px tall, 24px from the top and 40px from the sides, radius 24. It uses the dark variant over dark heroes and the light variant over light heroes.
  - Contents: logo (icon plus wordmark), links (Platform, Industries, Solutions by role, Why Exeevo, Getting started), then Resources and the "Get a demo" primary button.
  - The active page gets a 14% tint and `aria-current="page"`.
  - The nav becomes sticky once the hero has scrolled away.
- **Mega menu:** opened by the Platform button (click and Enter/Space, Escape to close, focus trapped). It is a glass panel with a large "Platform overview" tile on the left and the 8 modules with category dots in a 2-column grid.
- **Mobile menu:** below 1024px the nav shows the logo, "Get a demo" and a menu button. The button opens a full-height glass sheet with the links as large Sora items and the modules as an expandable list.
- **Scroll progress bar:** 3px, gradient, fixed at the top of the viewport.

**Controls**
- **Chips:**
  - Hero chip: glass pill with a 22px orb.
  - Attribute chip: 34px tall with a 1px slate 18% border.
  - Glass label: used on connector lines.
- **Segmented control:** a glass track holding real `<button>`s with `aria-pressed`; the selected one is filled ink.
- **Checklist item:** a 26px ink square with a check icon, followed by the title in 600 weight and the description in muted text.
- **Form fields:**
  - Label above each field, 52px tall inputs, radius 14, white 70% fill, 1px slate 20% border.
  - Errors appear below the field in text, never through colour alone.

---

## 6. Motion system

**Principles:**
- Depth over distance: things arrive from behind the glass.
- Scroll is the timeline.
- Only one ambient loop runs per page.
- Motion is always optional.

### Load (hero only, once per page)
`rise`: fade in plus 28px up, 0.9s, `--ex-ease-out`, staggered 0 / .12 / .24 / .36s for eyebrow, heading, paragraph and actions.

### Scroll-driven (CSS only)
```css
@supports (animation-timeline: view()){
  .sr  {animation:srUp    linear both;animation-timeline:view();animation-range:entry 0% cover 32%}
  .srl {animation:srLeft  linear both;animation-timeline:view();animation-range:entry 0% cover 35%}
  .srr {animation:srRight linear both;animation-timeline:view();animation-range:entry 0% cover 35%}
  .srg {animation:srGlass linear both;animation-timeline:view();animation-range:entry 5% cover 40%}
  .srt {animation:srTilt  linear both;animation-timeline:view();animation-range:entry 0% cover 45%}
  .px  {animation:pxMove  linear both;animation-timeline:view();animation-range:cover}
  .ln  {transform-origin:left;animation:lineDraw linear both;animation-timeline:view();animation-range:entry 20% cover 45%}
  .d1{animation-range:entry 6% cover 38%} .d2{animation-range:entry 12% cover 44%} .d3{animation-range:entry 18% cover 50%}
  .progress{transform-origin:left;animation:grow linear both;animation-timeline:scroll(root)}
}
@keyframes srUp   {from{opacity:0;translate:0 70px;scale:.97}to{opacity:1;translate:0 0;scale:1}}
@keyframes srLeft {from{opacity:0;translate:-70px 0}to{opacity:1;translate:0 0}}
@keyframes srRight{from{opacity:0;translate:70px 0}to{opacity:1;translate:0 0}}
@keyframes srGlass{from{opacity:0;scale:.92;filter:blur(10px)}to{opacity:1;scale:1;filter:none}}
@keyframes srTilt {from{rotate:x -28deg;translate:0 120px;opacity:.2}to{rotate:x 0deg;translate:0 0;opacity:1}}
@keyframes pxMove {from{translate:0 120px}to{translate:0 -120px}}
@keyframes lineDraw{from{scale:0 1}to{scale:1 1}}
@keyframes grow    {from{scale:0 1}to{scale:1 1}}
```
Scroll animations use the individual `translate` / `scale` / `rotate` properties so that hover effects can keep using `transform` without conflict.

| Class | Use on |
| --- | --- |
| `sr` | Headings, outcome rows, table rows, CTA bands |
| `srl` / `srr` | Text columns and side panels |
| `srg` | Glass cards and visuals |
| `srt` | The Home module board |
| `px` | Colour glows |
| `ln` | Connector lines |
| `d1`–`d3` | Siblings in a row, for stagger |

### Interaction (Motion)

| Name | Behaviour |
| --- | --- |
| Hover lift (cards) | `perspective(1000px) rotateX(5deg) rotateY(-6deg) translateY(-8px)`, 0.6s `--ex-ease-soft`. |
| Module deck | Each card is positioned by its offset `k` from the selected card: `translate3d(k·38px, -|k|·16px, -|k|·150px) rotateY(k·-10deg)`, opacity `1 - |k|·0.2`, blur `|k|·1.2px`. Cards with `|k| > 3` are hidden. Use a 0.8s spring or `--ex-ease-out`. |
| Role panels | The selected panel's `flex-grow` goes from 1 to 5 over 0.7s; content fades in and slides 18px. |
| Industry switch | Headline, 3D object and card grid cross-fade and slide 18px (0.6s) using `AnimatePresence mode="wait"`. |
| Page transitions | In `app/template.tsx`, content fades and rises 16px while the outgoing page blurs 8px (0.5s). The nav stays still. |
| Shared hero orb | Give each hero's sphere `layoutId="hero-orb"` so it glides to its new position and size when you change pages. |

### Reduced motion
Under `prefers-reduced-motion: reduce`:
- Turn off all CSS animations and transitions.
- Motion's `useReducedMotion()` returns instant state changes.
- The sphere stops spinning.

Nothing may be hidden when motion is off.

---

## 7. Pages and layouts

All copy is in section 9. Desktop layouts are described first, then how each section adapts below 768px.

### 7.1 Home `/`

1. **Hero** (dark, `--ex-ink`)
   - Faint concentric rings are centred on the sphere: `repeating-radial-gradient` in white 5% every 72px.
   - The left 7 columns hold the hero chip, h1, paragraph and actions (primary "Get a demo" plus the secondary video button).
   - The right side holds the `<Specimen />` with three hero cards:
     - "Coverage gap flagged" (tag CRM (Sales))
     - "Call prep is ready" (tag Ask-Nova)
     - "MLR approved in Teams" (tag Content Management)
   - A glass-dark **trust strip** of 3 columns with icons sits at the bottom of the hero.
   - Mobile: the text comes first, then the specimen at 70% scale with only 2 cards, then the trust strip stacked.
2. **Pathways** (mist)
   - Heading "Not sure where to start?" with three glass-light cards (`srg d1–d3`), each over its own blurred glow (magenta, blue, green with `px`).
   - Each card has an orb icon, persona label, question, description, and a link row ending in a 44px ink arrow tile.
   - Mobile: the cards stack.
3. **Outcomes** (frost)
   - Three rows split 6/5 columns: the statement is H3 Sora, the explanation is body large.
   - Rows are separated by hairlines and each reveals with `sr`.
   - Mobile: the statement sits above the explanation.
4. **Platform teaser** (dark)
   - The left side has the H2, paragraph, a category legend (4 lines with dots) and the primary "Explore all eight modules" button.
   - The right side has a **3D board**: 8 glass tiles in a 4×2 grid, transformed `rotateX(46deg) rotateZ(-22deg)` over a blurred gradient glow. Tiles lift `translateZ(34px)` on hover. The Ask-Nova tile gets a gradient ring. The whole board uses `srt`.
   - Every tile links to `/platform?module=<slug>`.
   - Mobile: a flat 2-column tile grid with no tilt.
5. **Data privacy** (mist)
   - The left side has the H2, a lead line in blue, the paragraph and a text link to Why Exeevo.
   - The right side has the **tenant diagram**:
     - A dashed blue rounded boundary labelled "Your Microsoft tenant".
     - A blurred orb inside it, with three glass chips: "HCP & customer data", "Ask-Nova agents, scoped to your data", "Dynamics 365, Power Platform, Azure".
     - Outside the boundary, a dashed line ends in an ink "×" before a muted "Shared AI models" box.
   - Mobile: the diagram sits below the text and the external box moves underneath.
6. **Go-live band** (dark)
   - H2, a short line, and the primary "Talk to our team" button.
   - Two glass-dark path cards (Core, Enterprise) are joined by a gradient connector line (`ln`) carrying the glass label "Expand, don't migrate".
   - Mobile: the cards stack with a vertical connector.
7. **Footer** (`--ex-ink-deep`).

### 7.2 Platform `/platform`

- **Background:** a light ground with a faint 48px lab grid (slate 5% lines).
- **Header:** the small label "Platform", then the h1 "Everything in one view", with the intro paragraph on the right.
- **Module explorer (three columns):**
  - **Rail:** a glass-light list of the 8 modules with category dots. The selected module is filled ink with white text. Arrow up/down keys move the selection, and the rail uses `role="tablist"` semantics or `aria-pressed` buttons.
  - **Deck:** 8 stacked glass-light cards in 3D (section 6) over a spinning blurred orb. Each card shows the category, a position counter "01 / 08", the module name in Sora 38, the headline and the summary. Clicking a card behind the front one selects it. Below the deck sit prev/next icon buttons and pip indicators.
  - **Detail panel:** glass-light. It shows the breadcrumb "Platform / <module>", the lead paragraph, 3 features as checklist items, and a "Good fit if you need" list (the Mobile App module uses "Role-specific tools live here" instead). The content swaps with a slide and fade.
- **Deep links:** `?module=crm-sales | medical-crm | marketing-automation | event-management | content-management | customer-insights | mobile-app | ask-nova-studio`.
- **Solutions by Role band:** a dark band with a corner glow, the sentence about role-specific tools, and a primary button to Solutions by Role.
- **Mobile:** the rail becomes a horizontal scrolling chip row, the deck is full width with swipe support, and the detail panel sits below.

### 7.3 Why Exeevo `/why-exeevo`

1. **Hero** (dark)
   - A large spinning orb sits top right, with a glass lens over it.
   - Label, h1 and intro paragraph.
   - A "Regulatory & compliance built in" row of 4 glass-dark tiles with hover lift. Each tile has a shield icon, a region tag (FDA, EU, China, US), the regulation name in Sora and a description.
2. **Comparison** (mist)
   - The H2 "How the approaches compare".
   - A 4-column table (Capability, Exeevo, Generic CRM platform, Point solution add-ons). The Exeevo column sits on a white panel wrapped in a vertical gradient ring with a soft blue shadow. Exeevo cells carry an ink check tile.
   - Use a real `<table>` with row headers, and give each row `sr`. The footnote goes below the table.
   - Mobile: one stacked card per capability showing all three answers, with Exeevo first.
3. **Tenant** (dark)
   - H2, a lead line in `--ex-link-on-dark`, the paragraph, and a glass card "Already part of your Microsoft stack".
   - On the right, a concentric diagram: a dashed outer ring labelled "Your Microsoft tenant", an inner ring labelled "Your Azure environment", and a core sphere under glass labelled "Your customer data".
4. **Footer.**

### 7.4 Industries `/industries`

- **Toggle:** a segmented control for Pharma / MedTech, with `?industry=medtech` as a deep link. The Industries menu items link to each.
- **Pharma:**
  - Headline and intro.
  - 3D object: a floating **capsule**. One half is a magenta-to-blue gradient with a highlight; the other half is clear glass with three small coloured dots inside. It is rotated -32deg and floats.
  - A 2×2 grid of glass-light cards: Commercial, Medical Affairs, Marketing, IT.
- **MedTech:**
  - Headline and intro.
  - 3D object: a glass **diagnostic device**, a rounded rectangle with a circular window showing the spinning orb, two text bars and a small ink button. It is rotated -24deg in Y.
  - A 2×2 grid: Capital equipment sales, Field & clinical service, Contract & tender management, Trade & distribution.
- **Closing row:** the line "Looking at it from a single role instead?" followed by a primary button to Solutions by Role.

### 7.5 Solutions by Role `/solutions-by-role`

- **Background:** dark, with faint concentric rings in the top right.
- **Header:** label, h1 and intro.
- **Role panels:** four tall glass-dark panels in a row, 560px tall.
  - A collapsed panel shows a category dot and the role name written vertically. It is a `<button>` with `aria-expanded`.
  - The expanded panel grows (flex-grow 5) and shows "Role n of 4", the role name (Sora 38), the description and 3 capability rows (glass rows with a white check tile).
  - Each panel has a coloured glow in the bottom corner that brightens when open. Colours: Field Rep blue, MSL magenta, KAM purple `#6E5BD8` (the gradient midpoint), Consumer & Animal Health green.
- **Closing row:** a line and the primary "Get a demo" button.
- **Mobile:** a vertical accordion.

### 7.6 Getting Started `/getting-started`

- **Header:** label, h1 and intro, with a blurred gradient glow behind the cards.
- **Paths:** two glass-light path cards (Core, Enterprise), each with attribute chips, joined by a gradient connector with an ink arrow dot.
- **Demo section** (`#demo`): a dark 36-radius block.
  - The left side shows a spinning orb under a glass lens, the H2 "Talk to our team" and a line of copy.
  - The right side is a glass-light form with these fields:
    - Full name
    - Work email
    - Company
    - Country
    - "Which teams are you buying for?" (select: Commercial, Medical Affairs, Marketing, Commercial, Medical and Marketing)
    - Consent text placeholder `[Privacy consent copy and link]`
    - Primary "Request a demo" button
  - Validate with Zod. On success, replace the form with a confirmation panel reading "Request received. [CONFIRMATION COPY]". On failure, show an inline message that says what went wrong and how to fix it.
- Every "Get a demo" button on the site links to `/getting-started#demo`.

### Footer (all pages)
- **Left:** the logo and the line "A unified, AI-powered life sciences CRM built natively on Microsoft."
- **Link columns:**
  - Platform: Overview, Why Exeevo, Getting Started
  - Industries: Pharma, MedTech, Solutions by Role
  - Company: About `[URL]`, Case Studies `[URL]`, Trust & Compliance → Why Exeevo
- **Right:** a primary "Get a demo" button.
- **Bottom row:** "© 2026 Exeevo. A division of Valsoft." with Privacy, Cookie Policy and Site Map `[URLs]`.

---

## 8. Quality bar
- **Accessibility:**
  - WCAG 2.2 AA.
  - Semantic landmarks, a skip link, and one h1 per page.
  - Real `<button>`, `<a>` and `<label>` elements.
  - Visible focus: 2px `--ex-blue` outline, 3px offset.
  - Every interactive component is fully keyboard-operable.
  - axe reports zero serious or critical issues.
- **Performance:**
  - LCP under 2.0s on 4G mid-tier mobile, CLS under 0.05, and INP under 200ms.
  - Only animate `transform`, `opacity`, `filter` and `translate`/`scale`/`rotate`.
  - Limit to 6 live backdrop-filters in any one viewport.
  - Pause the sphere rotation when it is off-screen (`IntersectionObserver` toggling `animation-play-state`).
- **SEO:** per-page `metadata` (title, description, Open Graph), `sitemap.ts`, `robots.ts`, and Organization JSON-LD.
- **Browsers:** the latest two versions of Chrome, Edge, Safari and Firefox. Firefox lacks scroll-driven animations, so it shows the final state.
- **Tests:** Playwright covers that every route renders, that nav links resolve, that deck, panel and toggle keyboard behaviour works, that the form validates, and that axe passes on every page.

---

## 9. Content (use verbatim)

### Home
- **Hero chip:** Life sciences CRM, built natively on Microsoft
- **H1:** Built to grow HCP relationships. Prove it every quarter.
- **Paragraph:** Exeevo gives commercial, medical, and marketing teams one system to hit call-plan attainment, launch faster, and get more out of every territory, instead of reps and KAMs juggling five disconnected tools.
- **Actions:** Get a demo / See the platform in 90 seconds `[VIDEO URL]`
- **Hero cards** (UI illustrations, not claims):
  - Coverage gap flagged: "A Tier 1 HCP hasn't been reached this cycle. Added to Thursday's route."
  - Call prep is ready: "Latest publications linked to this KOL's profile before you walk in."
  - MLR approved in Teams: "E-signature captured. Audit trail logged automatically."
- **Trust strip:**
  - **Compliance by design:** FDA 21 CFR Part 11, GDPR, PIPL, and more: the regulatory groundwork life sciences teams need, wherever you operate
  - **AI at its core:** Ask-Nova gives every team its own AI agent, purpose-trained on life sciences workflows
  - **Your data privacy, guaranteed:** Customer data stays inside your own Microsoft environment, never used to train shared AI models across other companies
- **Pathways:** "Not sure where to start?" / "Pick the path that matches why you're here."
  - **Evaluating vendors:** Comparing platforms for your evaluation? See how a life sciences-native platform differs from a generic CRM or a stack of point solutions. → Go to Why Exeevo
  - **Exploring the product:** Want to see what's actually included? All eight modules on one screen, no digging through eight separate pages. → Go to Platform Overview
  - **Buying for a team:** Need something for Field Reps, MSLs, or KAMs? Role-specific tools in one place, instead of scattered across product pages. → Go to Solutions by Role
- **Outcomes:**
  - **Reps hit their call plan, cycle after cycle:** HCP targeting, territory alignment, and cycle tracking flag coverage gaps before a quarter is lost, so call-plan attainment is a number you can see in real time.
  - **Commercial, medical, and marketing finally share one view of the HCP:** No more reconciling three versions of the same account. A KAM, an MSL, and a brand manager working the same HCP all see the same engagement history.
  - **Launch faster, with less retraining:** Built on the Microsoft tools your teams already use daily, so a new launch or territory realignment doesn't come with months of change management.
- **Platform teaser:** "Everything in one view." Eight modules, one data model, one license. Read this once and you know the whole platform. Click through only where you need more.
  - Legend:
    - Commercial: CRM, Marketing, Events, Mobile
    - Medical: Medical CRM for MSLs and Medical Affairs
    - Platform: Content, Customer Insights
    - AI: Ask-Nova Studio
  - Button: Explore all eight modules
- **Privacy:** "Your data stays where you put it." / Lead: "It never leaves your Microsoft tenant." / Your customer data is stored and processed in your own Microsoft Azure environment. We don't sell it, share it, or use it to train AI models across other customers, and it's never moved outside the tenant you control. / Link: See how Exeevo compares
- **Go-live:** "Two paths to go live." Both run on the same platform, so moving from one to the other is an expansion, not a migration. / Button: Talk to our team
  - **Core: live in as little as 4 weeks** (tag: Start focused). A focused, standard configuration for teams launching their first unified CRM: one country, one brand, fast time to value.
  - **Enterprise: a tailored rollout** (tag: Scale across brands and countries). A custom implementation across Commercial, Medical, Marketing, and Events, with dedicated deployment support for multi-brand or multi-country organizations.

### Platform modules (`content/modules.ts`)
Each module has: name, slug, category, summary (used in the deck and mega menu), headline, lead, 3 features, a fit title and 3 fit items.

1. **CRM (Sales)** (Commercial)
   - **Summary:** HCP targeting and segmentation, territory alignment, call planning, and sample compliance, built around the metric that actually matters: call-plan attainment.
   - **Headline:** Engineered around the pharma call cycle.
   - **Lead:** Territory alignment, HCP targeting, and call planning designed for how pharma commercial teams are actually measured: call-plan attainment, reach and frequency, and share of voice by brand.
   - **Features:**
     - HCP targeting by tier and potential: Rank HCPs by potential, so reps and KAMs always work the list that drives results.
     - Compliant rep-triggered email: Pre-approved content sent automatically after a call, logged for MLR audit. No manual follow-up required.
     - Sample & voucher management: E-signature capture and inventory reconciliation at the point of the call, with Sunshine Act reporting handled automatically.
   - **Good fit if you need:**
     - Reps consistently hitting call-plan attainment targets
     - Territories realigned continuously to real HCP potential
     - Reach and frequency visibility by brand, segment, and rep
2. **Medical CRM** (Medical)
   - **Summary:** Scientific plans, adverse event and medical inquiry case management, KOL engagement tracking for Medical Affairs and MSLs.
   - **Headline:** Purpose-built for Medical Affairs.
   - **Lead:** Scientific plans, adverse event tracking, and medical inquiry management designed around how MSLs and Medical Affairs teams actually work.
   - **Features:**
     - Scientific plans: Set goals and track engagement against therapeutic objectives.
     - Adverse event management: Automated, audit-ready workflows shared with Sales and Regulatory.
     - Medical inquiry handling: Intake through resolution, logged from CRM, phone, email, or web.
   - **Good fit if you need:**
     - A compliant, auditable path for adverse events
     - KOL relationship tracking distinct from commercial CRM
     - Scientific content tied to real engagement history
3. **Marketing Automation** (Commercial)
   - **Summary:** Omnichannel HCP journeys, segment building, and campaign reporting, built on the same data Sales and Medical already see.
   - **Headline:** Personalize at scale, without a separate martech stack.
   - **Lead:** Orchestrate omnichannel HCP journeys using the same data Sales and Medical already see. No exporting lists between systems.
   - **Features:**
     - Journey builder: Design multi-channel journeys triggered by real HCP behavior.
     - Segment builder: Build audiences from unified CRM + engagement data.
     - Automated sales handoff: Route hot leads to reps the moment they're ready.
   - **Good fit if you need:**
     - Campaigns that reflect real-time field activity
     - One system Marketing, Medical, and Sales all trust
     - Compliant email, SMS, and social orchestration
4. **Event Management** (Commercial)
   - **Summary:** Plan, run, and report on virtual, hybrid, and in-person events, from speaker programs to symposiums, with native Teams webinars.
   - **Headline:** Run compliant events end to end.
   - **Lead:** From speaker programs to symposiums: budgeting, registration, and native Microsoft Teams webinars in one workflow.
   - **Features:**
     - Full lifecycle planning: Budgets, registration, agendas, speakers, and sponsors in one place.
     - Native Teams webinars: Live streaming, translation, and Q&A moderation built in.
     - Post-event reporting: Attendance and engagement flow straight into Customer Insights.
   - **Good fit if you need:**
     - Virtual, hybrid, and in-person events on one platform
     - GDPR/HIPAA-compliant registration and content
     - Event data connected to the rest of your CRM
5. **Content Management** (Platform)
   - **Summary:** Compliant digital asset management with MLR review built into Microsoft Teams, e-signatures, and full audit trails.
   - **Headline:** Compliant content, without the review bottleneck.
   - **Lead:** A digital asset management system with MLR review built directly into Microsoft Teams, where your teams already work.
   - **Features:**
     - MLR review workflows: Review, annotate, and approve inside Teams. No context switching.
     - E-signatures & audit trails: Full traceability on every content change and approval.
     - Permission-based access: Granular control by role: Writer, Editor, Approver, Admin.
   - **Good fit if you need:**
     - Faster MLR turnaround without new tools to learn
     - One global, searchable content repository
     - Reliable audit trails for regulatory review
6. **Customer Insights** (Platform)
   - **Summary:** Unifies data from every source into one customer profile, with out-of-box models for churn, lifetime value, and sentiment.
   - **Headline:** One customer profile, built from every data source.
   - **Lead:** A no-code data unification layer that turns fragmented sources into a single 360° view, with prediction models ready out of the box.
   - **Features:**
     - Data unification: Connect sources, define matching rules, get one customer record.
     - Out-of-box AI models: Churn, lifetime value, product recommendation, sentiment.
     - Flexible exports: Push segments to ad platforms or full tables to Azure Data Lake.
   - **Good fit if you need:**
     - A single source of truth across CRM + third-party data
     - Self-service analytics without a data science team
     - Prediction models you don't have to build from scratch
7. **Mobile App** (Commercial)
   - **Summary:** Every module, offline-capable, with voice-to-text capture and geo-routing for field reps, MSLs, and account managers.
   - **Headline:** The full platform, offline-capable, in the field.
   - **Lead:** Voice-to-text capture, geo-routing, and every core module, built for reps and MSLs who spend their day away from a desk.
   - **Features:**
     - Offline-first: Full functionality with no connection; auto-syncs when back online.
     - Voice-to-text capture: Log visits and notes hands-free, right after a call.
     - Geo-routing: Plans the most efficient route across scheduled and nearby visits.
   - **Role-specific tools live here:**
     - Field Reps: call cycle plans, territory routing
     - MSLs: scientific plans, case routing
     - Account Managers: CPQ, bids & tenders
   - Link: See full role breakdown → Solutions by Role
8. **Ask-Nova Studio** (Platform / AI)
   - **Summary:** Build and configure AI agents scoped to your own data and compliance guardrails, for scientific summarization, call prep, and workflows beyond the built-in AI in each module.
   - **Headline:** Real agentic AI, engineered for your workflows.
   - **Lead:** Every module ships with AI built in. Ask-Nova Studio goes further: a workspace for configuring your own AI agents on top of your CRM data, scoped to the compliance guardrails already built into the platform.
   - **Features:**
     - Custom agent configuration: Build agents for scientific summarization, call prep, or case triage, trained on your own data.
     - Compliance-scoped by design: Agents inherit the same permissioning, audit trail, and regulatory guardrails as the rest of the platform.
     - Extends, doesn't replace: Works alongside the AI already built into CRM, Medical, and Marketing, for the workflows those don't cover out of the box.
   - **Good fit if you need:**
     - An AI agent scoped precisely to one team's workflow
     - Guardrails that respect the same compliance boundaries as the rest of your CRM
     - A way to extend AI coverage without a separate AI vendor or data export

**Mega-menu short descriptions:**
- Platform overview: All eight modules, one screen
- CRM (Sales): Territory, targeting, call planning
- Medical CRM: Scientific plans, adverse events, KOLs
- Marketing Automation: Omnichannel HCP journeys
- Event Management: Virtual, hybrid, in-person events
- Content Management: Compliant DAM & MLR review
- Customer Insights: Unified 360° customer profile
- Mobile App: Offline-capable field & MSL app
- Ask-Nova Studio: Build custom AI agents for your workflows

**Platform page band:** Role-specific tools for Field Reps, MSLs, Key Account Managers, and Consumer/Animal Health teams are covered once, in Solutions by Role, rather than repeated on every module page.

### Why Exeevo
- **H1:** Built natively for life sciences
- **Intro:** Most CRM platforms are general-purpose tools with life sciences features added later, or point solutions that only solve one part of the problem. Here's what a platform built natively for the industry gets you.
- **Compliance tiles** ("Regulatory & compliance built in"):
  - **21 CFR Part 11** (tag FDA): Compliant audit trails and e-signatures for regulated content, approvals, and case documentation, built directly into the platform.
  - **GDPR** (tag EU): Consent management and data-subject controls built into how HCP and customer data is captured and stored.
  - **PIPL** (tag China): Data residency and localization controls for operating compliantly in China.
  - **HIPAA & Sunshine Act** (tag US): Transparency reporting and PHI safeguards built into the same workflows your commercial and medical teams already use.
- **Comparison** (Capability | Exeevo | Generic CRM platform | Point solution add-ons):

| Capability | Exeevo | Generic CRM platform | Point solution add-ons |
| --- | --- | --- | --- |
| AI-powered next-best-action | Included, platform-wide | Not life sciences-specific | Varies by add-on |
| Native Microsoft integration | Built on Dynamics 365 / Dataverse | Often a separate stack | Requires custom integration |
| Life sciences compliance (Part 11, GDPR, PIPL, Sunshine Act) | Built in | Configured after the fact, if at all | Depends on each vendor |
| Additional licensing for AI & analytics | Included in one license | Often extra cost | Priced per module |
| Where customer data lives | Stays in your own Microsoft tenant | Typically vendor-hosted | Typically vendor-hosted |

- **Footnote:** Comparison describes typical characteristics of general-purpose CRM platforms and point-solution add-ons in life sciences as a category.
- **Tenant:** Same H2, lead line and paragraph as the Home privacy section.
  - **Card: Already part of your Microsoft stack.** No parallel system for IT to secure and patch. Exeevo runs on Dynamics 365, Power Platform, and Azure, the infrastructure your organization has already invested in and your team already knows.

### Industries
- **Pharma:** "Built for pharma's complexity." Commercial, Medical Affairs, Marketing, and IT teams each get what they need from the same platform, without separate systems or separate vendors.
  - **Commercial:** Hit call-plan attainment with AI-ranked HCP targets, territories aligned to real potential, and reach-and-frequency visibility by brand.
  - **Medical Affairs:** Strengthen KOL relationships, personalize scientific content, and automate regulatory reporting.
  - **Marketing:** Run fully compliant omnichannel campaigns and measure engagement in real time.
  - **IT:** Secure, scalable Microsoft-powered infrastructure with FDA 21 CFR Part 11, GDPR, and PIPL compliance built in from day one.
- **MedTech:** "Commercial complexity beyond the pill." Medical device and diagnostics teams manage capital equipment sales, field service, and clinical education alongside HCP engagement. Exeevo handles both sides on one platform.
  - **Capital equipment sales:** Track long, multi-stakeholder sales cycles alongside consumables and service contracts.
  - **Field & clinical service:** Coordinate field service visits, case support, and training alongside commercial engagement.
  - **Contract & tender management:** Manage bids, tenders, and pricing schemes for institutional and hospital accounts.
  - **Trade & distribution:** Trade account management, shelf/store checks, and inventory visibility for distributed channels.
- **Closing:** Looking at it from a single role instead? → Solutions by Role

### Solutions by Role
- **H1:** Built around how each role works
- **Intro:** Consolidated here once, instead of repeated across every product page.
- **Field Rep:** Territory coverage and call-cycle tools built around how details actually get delivered and tracked.
  - Compliant rep-triggered email sent automatically after a call, logged for MLR audit
  - Sample and voucher management with e-signature capture and inventory reconciliation
  - Call reporting tied directly to next-best-message recommendations
- **Medical Science Liaison:** Scientific and compliance workflows distinct from commercial CRM.
  - Scientific literature summarization linked to each KOL's profile
  - Solicited vs. unsolicited medical inquiry routing
  - Publication and congress tracking tied to KOL engagement history
- **Key Account Manager:** Account-level tools for institutional and multi-stakeholder accounts.
  - Plan of action (POA) tracking across every stakeholder on the account
  - Formulary access, contract, and tender tracking
  - Shared visibility for Sales, Medical, and Market Access on the same account
- **Consumer & Animal Health Rep:** Trade and retail-specific tools for consumer-facing field teams.
  - Retail shelf and planogram compliance capture
  - Trade promotions and order management
  - Distributor inventory visibility
- **Closing:** Every role works from the same HCP record, on the same platform. → Get a demo

### Getting Started
- **H1:** Two paths to go live
- **Intro:** However complex your organization, there's a launch path sized to it: from a focused first deployment to a fully tailored, multi-country rollout. Both run on the same platform, so moving from one to the other is an expansion, not a migration.
- **Core card:** chips "One country", "One brand", "Standard configuration".
- **Enterprise card:** chips "Multi-brand", "Multi-country", "Dedicated deployment support".
- **Demo:** "Talk to our team." Tell us about your teams and markets, and we'll size the right path with you.

---

## 10. Build order
1. Scaffold the app, tokens, fonts, glass/specimen/motion CSS, and the Nav, Footer and ScrollProgress.
2. Build the UI primitives (section 5), each with a quick visual check page at `/dev/components` (excluded from the sitemap).
3. Home, then Platform (ModuleDeck), Why Exeevo, Industries, Solutions by Role, and Getting Started with the form API.
4. Page transitions and the shared hero orb.
5. Responsive passes at 390, 768, 1024 and 1440.
6. Accessibility, performance and SEO passes, then the Playwright suite.

When each step is done, run `pnpm lint && pnpm typecheck && pnpm test` and fix everything before moving on.
