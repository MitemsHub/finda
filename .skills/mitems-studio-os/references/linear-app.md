---
site: "Linear"
url: "https://linear.app"
date_analyzed: "2026-07-08"
category: "saas"
tags: ["dark", "minimal", "technical", "elegant", "single-accent", "product-led", "high-craft"]
essence: "A near-black precision instrument where the product UI is the only visual texture and a single restrained accent means 'act here'."
confidence: "mixed"   # live capture of homepage + corroborating public design-analysis sources
analyst: "agent (Studio OS reference engine)"
---

# Reference Teardown: Linear

> **Essence:** Darkness treated as a *substrate*, not a theme — quiet charcoal surfaces, crisp light type at tight tracking, and one chromatic accent used sparingly for action and focus. It reads like software-craft documentation: dense, technical, quietly luxurious.
> **Source:** https://linear.app · analyzed 2026-07-08 · confidence: mixed (homepage live capture + corroborating public design-analysis references)

> ⚖️ **Copying-line status:** PASS — this teardown extracts *principles*. Linear's wordmark, custom typefaces ("Linear Display/Text"), product screenshots, illustrations, and copy are **not** reproduced. Exact hex values are recorded as *observations for study*, not as a palette to lift wholesale. See [`../51-REFERENCE_ANALYSIS.md`](../51-REFERENCE_ANALYSIS.md) §8.

---

## 1. Design Philosophy

Linear's marketing site and product share one conviction: **remove everything that isn't the work.** Darkness is not a "dark mode" toggle bolted onto a light design — it is the default substrate, chosen so the only thing that glows is the product itself (issue cards, boards, agent panels, roadmaps). Ornament is nearly absent: no gradients-for-vibe, no decorative illustration doing emotional heavy-lifting, no shadows shouting for attention. Instead, **geometry, hairline borders, tight typography, and a single accent** carry the entire aesthetic. The result feels like a precision instrument — fast, confident, and "made by people who care about craft," which is exactly the brand promise for a tool aimed at world-class product teams.

The site also practices *show, don't tell*: rather than atmospheric hero imagery, it frames **real product UI** in dark panels as the primary visual texture. This is a philosophy of substance as style.

## 2. Typography Breakdown

- **Families:** A custom sans in two optical cuts — a display cut for headings and a text cut for body — with mono for code-like accents. (Public analyses cite Inter Variable / system-sans as effective fallbacks; treat the *approach*, not the specific proprietary font, as the lesson.)
- **Scale (observed / corroborated):**

| Role | Family | Size | Weight | Line-height | Tracking |
| --- | --- | --- | --- | --- | --- |
| Display XL | Display | ~80px | 600 | ~1.05 | **~ -3px (very tight)** |
| Display L | Display | ~56px | 600 | ~1.1 | ~ -1.8px |
| Display M | Display | ~40px | 600 | ~1.15 | ~ -1.0px |
| Headline | Display | ~28px | 600 | ~1.2 | ~ -0.6px |
| Body L | Text | ~18px | 400 | ~1.5 | ~ -0.1px |
| Body | Text | ~16px | 400 | ~1.5 | ~ -0.05px |
| Caption / Mono | Text / Mono | ~12–13px | 400 | ~1.4–1.5 | 0 |

- **Hierarchy strategy:** Hierarchy comes from **size + a narrow weight band (mostly 400–600, rarely "bold") + negative tracking** on large sizes, not from color or decoration. The tight tracking on big display text is the single most "signature" move — it reads as *precision and density*, reinforcing the brand. Body sits at a comfortable ~1.5 leading for readability. This is a textbook case of [`04`](../04-DESIGN_PHILOSOPHY.md) Principle 4 (typography carries hierarchy) and [`07`](../07-TYPOGRAPHY_SYSTEM.md).

## 3. Color Palette

| Role | Value (observed) | Notes |
| --- | --- | --- |
| Canvas (void) | `~#08090a / #010102` | The deepest surface; everything sits on near-black. |
| Surface 1 | `~#0f1011` | Cards, nav — one step above canvas. |
| Surface 2/3 | `~#161718 / #18191a` | Elevated/nested panels. |
| Border (graphite) | `~#23252a` | Hairline dividers/outlines — structure without shadow. |
| Border strong | `~#34343a` | Higher-contrast separators. |
| Ink (paper) | `~#f7f8f8 / #ffffff` | Primary headings/body — high contrast on dark. |
| Ink muted | `~#8a8f98` | Secondary/tertiary text, metadata. |
| **Accent** | `~#5e6ad2` (lavender-blue) | The single chromatic accent — brand mark, focus rings, select CTAs. Never decorative. |
| Semantic success | `~#27a644` | Used narrowly. |

- **Contrast approach:** Light ink on near-black yields very high contrast for primary text (well above AA); muted grays are reserved for genuinely secondary content. Depth is signaled by **surface lightness steps + hairline borders**, *not* by drop shadows (shadows read poorly on dark).
- **Light/dark strategy:** Dark-first by conviction. The lesson for us ([`06`](../06-COLOR_SYSTEM.md)): **one accent + a disciplined neutral ramp + elevation via surface steps** is the whole system.

## 4. Spacing Scale

- **Base unit:** 4px. **Steps (observed):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 96 (section).
- **Density:** Compact-but-breathing. Component paddings are tight (~8–14px), while **section spacing is large** (~96px), creating clear "chapters" on the marketing page. Radii are small and consistent (~4/6/8/12px), reinforcing the machined feel.
- **Rhythm & proximity:** Related metadata clusters tightly; sections separate generously. Whitespace does the grouping that borders/shadows would in a busier design ([`08`](../08-SPACING_SYSTEM.md)).

## 5. Grid System

- **Columns / container cap / breakpoints:** A capped content width with generous outer margins on large screens (content doesn't stretch to fill 4K — extra space becomes calm margin, exactly [`10`](../10-GRID_SYSTEM.md) Principle 4). Product-UI showcases are framed in consistent dark panels aligned to the grid.
- **Alignment discipline:** Strong. Hairline borders make alignment *visible*, so any misalignment would be obvious — which enforces precision.

## 6. Motion Language

- **Durations / easings (inferred):** Short, purposeful transitions; smooth scroll-linked reveals of product UI; nothing bouncy or long. Motion supports *comprehension* (showing how pieces relate) rather than spectacle.
- **Restraint level:** Minimal-to-moderate; motion serves feedback and continuity. This aligns with our [`23`](../23-MOTION_SYSTEM.md) stance (motion guides attention; every animation has intent).
- **Reduced-motion:** Should be verified; assume the principle "animation is enhancement, content works without it."

## 7. Interaction Patterns

- **Focus/hover:** The accent lavender appears on **focus rings** and select interactive states — a great example of an accent doing *functional* work.
- **Navigation:** Clean top nav; content organized as numbered "chapters" (1.0 Intake, 2.0 Plan, 3.0 Build…), giving the page a documentation-like, scannable spine.
- **Disclosure:** Live-feeling product vignettes (issues, activity feeds, agents) demonstrate features in context rather than describing them abstractly.

## 8. UX Principles

- **Substance as marketing:** show the real product, framed beautifully, instead of abstract hero art.
- **Density with clarity:** a lot of information, but organized with tight grouping + generous section breaks so it never feels cluttered.
- **One obvious action:** the accent guarantees the primary CTA/action is unmistakable ([`05`](../05-VISUAL_PSYCHOLOGY.md) pre-attentive contrast; [`12`](../12-BUTTON_DESIGN.md) one-primary).

## 9. Reusable Ideas (the gold — as principles)

- **One chromatic accent on a quiet canvas makes the accent *mean* "act here."** → reinforces [`06`](../06-COLOR_SYSTEM.md) restraint (one accent, disciplined neutrals).
- **Signal depth with surface-lightness steps + hairline borders, not shadows** (especially on dark). → [`06`](../06-COLOR_SYSTEM.md) dark-mode remap, [`11`](../11-CARD_DESIGN.md) elevation.
- **Tight negative tracking on large display type reads as precision.** → [`07`](../07-TYPOGRAPHY_SYSTEM.md) tracking-by-size.
- **Narrow weight band (400–600) can carry full hierarchy** — you don't need heavy bolds. → [`07`](../07-TYPOGRAPHY_SYSTEM.md).
- **Large section spacing turns a long page into readable "chapters."** → [`08`](../08-SPACING_SYSTEM.md) responsive section rhythm.
- **Show the product as the hero; let real UI be the texture.** → [`17`](../17-LANDING_PAGE_DESIGN.md) landing strategy.

## 10. Things to Avoid

- **Dark-only by default** can hurt some low-vision users and bright-environment readability — offer/consider a light theme; verify muted-gray text still meets AA (some very-muted grays flirt with the line). ([`22`](../22-ACCESSIBILITY.md))
- **Extreme negative tracking** harms legibility at small sizes and for dyslexic readers — reserve it for large display only.
- **Hairline (0.5px) borders** can disappear on some displays / for low-vision users — ensure a fallback contrast.
- **Heavy reliance on live product-UI vignettes** demands real engineering to keep them accurate; costly to maintain.
- **Copying the lavender + custom font + layout** would be cloning, not learning (see §11).

## 11. How to Recreate This Style Without Copying

Adopt the **principles**, bring your **own** brand:

1. **Pick ONE accent from *your* brand hue** ([`03`](../03-BRAND_STRATEGY.md)) — not lavender-blue — and use it *only* for action/focus. The restraint is the lesson, not the color.
2. **Build a near-neutral dark ramp** (canvas → 3–4 surface steps) in OKLCH ([`06`](../06-COLOR_SYSTEM.md)); signal elevation with **lighter surfaces + hairline borders**, not shadows.
3. **Choose your own high-legibility sans** (a variable font you're licensed for) and apply **size-scaled tracking**: tight on large display, neutral on body. Keep a **narrow weight band**.
4. **Use a 4px spacing base** with **large section spacing** to create "chapters." Small, consistent radii.
5. **Cap content width;** let large screens gain margin, not text width.
6. **Make your product the hero** — frame real UI in consistent panels instead of buying stock hero art.
7. **Keep motion purposeful** (feedback + continuity), respect reduced-motion.
8. **Then diverge:** combine these with lessons from other references in this KB (e.g. a warmer editorial type idea, a different grid) so the result is a *synthesis*, unmistakably yours.

**Copying-line self-check (§8):** Would Linear recognize their *specific* site in the result? → No (different hue, font, layout, content). Synthesized from multiple sources + our brand? → Yes. Every choice explained by a principle? → Yes. All assets ours/licensed? → Yes. ✅

---

## Mapping to our systems
| Finding | Our token / chapter |
| --- | --- |
| One accent, disciplined neutral ramp | [`06-COLOR_SYSTEM.md`](../06-COLOR_SYSTEM.md) |
| Elevation via surface steps + hairline borders (dark) | [`06`](../06-COLOR_SYSTEM.md), [`11-CARD_DESIGN.md`](../11-CARD_DESIGN.md) |
| Size-scaled negative tracking; narrow weight band | [`07-TYPOGRAPHY_SYSTEM.md`](../07-TYPOGRAPHY_SYSTEM.md) |
| 4px base; large section rhythm | [`08-SPACING_SYSTEM.md`](../08-SPACING_SYSTEM.md) |
| Capped content width + generous margins | [`10-GRID_SYSTEM.md`](../10-GRID_SYSTEM.md) |
| Purposeful, restrained motion | [`23-MOTION_SYSTEM.md`](../23-MOTION_SYSTEM.md) |
| Product-as-hero | [`17-LANDING_PAGE_DESIGN.md`](../17-LANDING_PAGE_DESIGN.md) |
