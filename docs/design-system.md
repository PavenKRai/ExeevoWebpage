# Exeevo design system: "Clinical light" (v3 plain)

Source: `ExeevoNewDesignSystem.html` (the design system) and `ExeevoNewWebsiteDesign.html` (page designs). This file is the working summary for building new pages. Classes live in `app/styles/system.css`; tokens in `app/styles/tokens.css`.

## Principles
- Do: let headings stand alone; use labels only when they add information; keep useful numbering (list items, "1 of 2"); use product imagery, data and animated UI demos; glass over soft glows with hairline-light shadows.
- Don't: all-caps or wide-tracked micro-labels; coloured squares or bracket letters; decorative counters (01 / 08, Service 01); monospace or a second label typeface; heavy drop shadows or glows under the nav.

## Colour
| Token | Value | Use |
| --- | --- | --- |
| `--ex-slate` | #333F48 | wordmark, body text |
| `--ex-magenta` | #DF1995 | Medical, Consult, glow |
| `--ex-blue` | #0762C8 | Commercial, Implement, links |
| `--ex-green` | #00C389 | Platform, Operate, glow |
| `--ex-porcelain` | #F6F8F9 | page ground |
| `--ex-white` | #FFFFFF | cards, alternate sections |
| `--ex-mist` | #EEF2F4 | quiet sections |
| `--ex-hairline` | #E1E6EA | dividers, card borders |
| `--ex-heading` | #1D262D | bold heading phrase, primary buttons |
| `--ex-soft` | #5E6B74 | light heading phrase |
| `--ex-muted` | #56636C | body, small labels |
| `--ex-green-ink` | #008A61 | checks on light |

Brand colours never fill a section. Alternate white and porcelain between sections.

## Type (Geist only)
Display 76/1.02/300 (`.h1`), H2 52/1.06/300 (`.h2`), H3 22 to 28/350 to 450 (`.h3`), lead 18/1.6/350 (`.lead`), body 15/1.6/350 (`.body-text`), small label 13.5/450 (`.label`). Headings: a light grey phrase plus one `<b>` ink phrase.

## Components
- Buttons: `<Button>` (ink pill primary, glass pill secondary, `tlink` text). One primary per view.
- Glass (`.glass`) for cards, chips, diagram nodes and pills over colour, always over a soft `.aura` glow; solid `.card` only on flat grounds.
- Gradient dots (`.dot` + `.dot-commercial|medical|platform|ai`) replace coloured squares; no glow ring.
- Connectors: a frosted circle with a thin gradient ring; no solid black badges.
- Card titles reserve two lines so rows line up; content starts at the top of a card.
- `.gridbg` (80px faint grid with radial mask) on heroes, `.ruler` strip under "by team" labels.
- Radii: pill 999, chip 12, card 20, panel 28, block 36, orbs 50%.

## Motion
Hero rise and glass focus-in on load; one-time scroll reveals; one ambient loop per visual (cursor demo, data flow, dial); cursor demos click real controls, pause on results and loop every 12 to 15 seconds. Sticky nav over a gradient blur. Reduced motion turns everything off and shows the final state.

## Layout
Content column `.wrap`: 1280px max, 40px side padding (20px on phones). Designs are 1440px wide; mobile and tablet layouts are adapted from these rules.
