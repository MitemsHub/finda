# 07 — Typography System

### Type Scales, Pairing, Rhythm, and Readability

> *"Typography is the voice of the interface made visible. Ninety percent of design is typography — and most of the other ten percent is spacing around it."*

---

**Chapter type:** Phase 2 — Design Foundations
**DRI:** Senior UI Designer + Design Systems Engineer (joint)
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`03-BRAND_STRATEGY.md`](./03-BRAND_STRATEGY.md), [`04-DESIGN_PHILOSOPHY.md`](./04-DESIGN_PHILOSOPHY.md), [`05-VISUAL_PSYCHOLOGY.md`](./05-VISUAL_PSYCHOLOGY.md), [`06-COLOR_SYSTEM.md`](./06-COLOR_SYSTEM.md)
**Feeds:** [`08`](./08-SPACING_SYSTEM.md), [`09`](./09-LAYOUT_SYSTEM.md), [`14`](./14-COMPONENT_LIBRARY.md), [`15`](./15-DESIGN_TOKENS.md), [`25`](./25-COPYWRITING.md), [`35`](./35-PERFORMANCE.md)

---

## Table of Contents
1. [Purpose](#1-purpose)
2. [Philosophy](#2-philosophy)
3. [Principles](#3-principles)
4. [Best Practices](#4-best-practices)
5. [Anti-Patterns](#5-anti-patterns)
6. [Real-World Examples](#6-real-world-examples)
7. [Common Mistakes](#7-common-mistakes)
8. [AI Implementation Guidance](#8-ai-implementation-guidance)
9. [Human Review Checklist](#9-human-review-checklist)
10. [Automation Opportunities](#10-automation-opportunities)
11. [References for Further Study](#11-references-for-further-study)
12. [Review Checklist & Measurable Quality Criteria](#12-review-checklist--measurable-quality-criteria)

---

## 1. Purpose

This chapter defines how the studio designs and encodes typography as a **system** — a type scale, a small set of families, line-height and measure rules, and semantic text tokens — so that hierarchy, readability, and brand voice are consistent everywhere and verifiable by machine.

Typography does the heaviest lifting in almost every interface: it *is* most of the content, and — per [`04`](./04-DESIGN_PHILOSOPHY.md) Principle 4 — it should carry the primary weight of visual hierarchy before color or imagery. A disciplined type system means a new screen is "typeset," not "designed from scratch," and that readability (a floor-level accessibility concern, Article III) is guaranteed rather than hoped for.

---

## 2. Philosophy

**Type is hierarchy.** The single most reliable way to make an interface legible is to get its type hierarchy right: a clear distinction between a page title, a section heading, body text, and supporting metadata — expressed through *size, weight, and spacing*. If the grayscale/type-only version of a screen is navigable ([`04`](./04-DESIGN_PHILOSOPHY.md)), the typography is doing its job.

**Constraint is clarity.** A scale of 6–8 sizes and 2–3 weights covers virtually every interface. More options don't create richness; they create inconsistency and decision fatigue. We choose a small, harmonious set on purpose (Article VIII) and reuse it relentlessly (Article IV). The freedom to use "any size" is the freedom to be inconsistent.

**Readability is a floor, not a preference.** Line length, line height, font size, and contrast have measurable comfort ranges rooted in how eyes track text ([`05`](./05-VISUAL_PSYCHOLOGY.md)). Falling outside them isn't an aesthetic risk; it's an accessibility failure. Text that respects user font-size settings and zoom is non-negotiable.

**Performance is part of typography.** Fonts are among the heaviest, most render-blocking assets on the web. A beautiful typeface that causes layout shift or invisible text on slow connections is a bad choice (Article II, [`35`](./35-PERFORMANCE.md)). Type decisions include *how the font loads.*

---

## 3. Principles

### Principle 1 — One modular scale, applied everywhere
Choose a ratio (e.g. 1.2 minor third, 1.25 major third) and generate a fixed set of steps. Every text size comes from the scale.
> *Rationale:* A mathematical scale produces harmony automatically and eliminates arbitrary sizes.

### Principle 2 — Limit families and weights
Typically **1–2 families** (often one variable font for UI/body, optionally one for display or mono for code) and **2–3 weights**. More is almost always worse.
> *Rationale (Art. VIII):* Restraint = coherence + performance.

### Principle 3 — Hierarchy from size + weight + space, not decoration
Build the hierarchy with the scale, weight, and spacing before reaching for color or ornament.
> *Rationale ([`04`](./04-DESIGN_PHILOSOPHY.md) P4):* Type-first hierarchy survives grayscale and colorblindness.

### Principle 4 — Line height scales inversely with font size
Large display text needs *tight* leading (1.0–1.2); body text needs *open* leading (1.4–1.6); small text a bit more.
> *Rationale:* Optimal leading depends on size and measure; one value for all sizes always looks wrong somewhere.

### Principle 5 — Control the measure (line length)
Aim for **~45–75 characters** per line for body text (≈66 is a classic target). Constrain with `max-width` in `ch` or rem.
> *Rationale:* Too-long lines lose the reader on the return sweep; too-short lines fragment reading rhythm ([`05`](./05-VISUAL_PSYCHOLOGY.md)).

### Principle 6 — Use relative units and respect user settings
Base font size in `rem`; never disable zoom; text must reflow and remain usable at **200% zoom** (WCAG 1.4.4) and adapt to user-set base sizes.
> *Rationale (Art. III):* Overriding user preferences excludes people with low vision.

### Principle 7 — Semantic text tokens/roles, not one-off styles
Define roles (`display`, `h1`–`h4`, `body`, `body-sm`, `label`, `caption`, `code`) as tokens; components consume roles, not raw px.
> *Rationale (Art. IV):* Enables global type changes and consistency across surfaces.

### Principle 8 — Load fonts responsibly
Subset, `woff2`, `font-display: swap` (or optional), preload critical faces, prefer variable fonts, and always define a solid fallback stack to minimize CLS.
> *Rationale (Art. II, [`35`](./35-PERFORMANCE.md)):* A font that blocks render or shifts layout harms the experience.

---

## 4. Best Practices

### 4.1 Define the type scale as tokens

```css
:root {
  /* Family tokens */
  --font-sans: "Inter var", ui-sans-serif, system-ui, -apple-system, "Segoe UI",
               Roboto, Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* Modular scale (base 16px, ratio ~1.25) */
  --text-xs:   0.75rem;   /* 12 */
  --text-sm:   0.875rem;  /* 14 */
  --text-base: 1rem;      /* 16 */
  --text-lg:   1.25rem;   /* 20 */
  --text-xl:   1.5rem;    /* 24 */
  --text-2xl:  2rem;      /* 32 */
  --text-3xl:  2.5rem;    /* 40 */
  --text-4xl:  3.25rem;   /* 52 */

  /* Line heights */
  --leading-tight:  1.15;
  --leading-snug:   1.3;
  --leading-normal: 1.5;
  --leading-relaxed:1.65;

  /* Weights */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Tracking (letter-spacing) */
  --tracking-tight: -0.02em;   /* large display */
  --tracking-normal: 0;
  --tracking-wide: 0.04em;     /* small caps / labels */
}
```

### 4.2 Define semantic type roles (what components use)

| Role | Size | Weight | Leading | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `display` | `--text-4xl` | bold | tight | tight | Hero headlines |
| `h1` | `--text-3xl` | bold | tight | tight | Page title |
| `h2` | `--text-2xl` | semibold | snug | normal | Section |
| `h3` | `--text-xl` | semibold | snug | normal | Subsection |
| `h4` | `--text-lg` | medium | snug | normal | Card/group title |
| `body` | `--text-base` | normal | normal | normal | Default reading |
| `body-sm` | `--text-sm` | normal | normal | normal | Secondary text |
| `label` | `--text-sm` | medium | snug | normal | Form labels, UI |
| `caption` | `--text-xs` | normal | normal | wide | Metadata, hints |
| `code` | `--text-sm` | normal | normal | normal | Inline/block code (mono) |

```css
.text-h1 { font: var(--weight-bold) var(--text-3xl)/var(--leading-tight) var(--font-sans);
           letter-spacing: var(--tracking-tight); }
.text-body { font: var(--weight-normal) var(--text-base)/var(--leading-normal) var(--font-sans);
             max-width: 68ch; } /* controls measure */
```

### 4.3 Control measure with a prose container
```css
.prose { max-width: 68ch; }         /* ~66 char target */
.prose > * + * { margin-top: 1em; } /* vertical rhythm via "lobotomized owl" */
```

### 4.4 Pair fonts with intention (if pairing at all)
- **Safest:** one strong variable family for everything (super-family with multiple weights/optical sizes).
- **Two families:** contrast roles clearly — e.g. an expressive display face + a neutral, highly-legible body face. Avoid pairing two fonts that are *similar but not the same* (uncanny valley).
- **Always** include a matched fallback stack sized to reduce CLS (`size-adjust`/`ascent-override` where useful).

### 4.5 Load fonts for performance
```html
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```
```css
@font-face {
  font-family: "Inter var";
  src: url("/fonts/inter-var.woff2") format("woff2");
  font-weight: 100 900;      /* variable */
  font-display: swap;        /* text visible immediately with fallback */
  font-style: normal;
}
```
- **Subset** to needed glyphs/languages. Prefer **self-hosting** (privacy + performance + no third-party origin).
- Set a **fallback face** metrically close to the web font to minimize layout shift ([`35`](./35-PERFORMANCE.md)).

### 4.6 Respect the reader
- Body text ≥ **16px** default; never lock zoom (`user-scalable=no` is banned, Art. III).
- Use `rem` for font sizes so user base-size settings apply.
- Adequate paragraph spacing; avoid justified text on the web (rivers of whitespace); avoid long runs of ALL CAPS (slower to read).
- Ensure contrast per [`06`](./06-COLOR_SYSTEM.md).

### 4.7 Map to Tailwind
Wire the scale/roles into Tailwind's theme so `text-*` utilities stay on-system, or expose role classes (`.text-h1`) as components ([`33`](./33-TAILWIND_GUIDE.md)).

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle/Article |
| --- | --- | --- |
| **Arbitrary sizes** (17px here, 23px there) | No harmony; inconsistent hierarchy. | P1 |
| **Too many fonts/weights** | Incoherent; heavy; slow. | P2, P8 |
| **Color-only hierarchy** (all same size, different colors) | Fails grayscale/colorblind; weak scanning. | P3, [`04`](./04-DESIGN_PHILOSOPHY.md) |
| **One line-height for all sizes** | Big text too loose, small text too tight. | P4 |
| **Full-width body text** | Lines too long; reader loses place. | P5 |
| **`px` font sizes + disabled zoom** | Ignores user needs; excludes low-vision users. | P6, Art. III |
| **Raw px in components** | Un-systematic; no global control. | P7 |
| **Render-blocking / FOIT fonts** | Invisible text, layout shift, slow LCP. | P8, [`35`](./35-PERFORMANCE.md) |
| **Justified web text / long ALL CAPS** | Rivers, poor rhythm, slower reading. | — |

---

## 6. Real-World Examples

### Example A — Fixing "flat" hierarchy without color
A dashboard's headings, labels, and body were all ~14–15px in different grays; users couldn't tell structure at a glance. The team applied a proper scale: page title at `h1` (bold, 40px, tight leading), section headings at `h2` (semibold, 32px), body at 16px, metadata at `caption`. **No color changed** — pure type hierarchy — and the screen became instantly scannable, passing the grayscale test. *(Principle 3.)*

### Example B — Measure and leading rescuing a docs page
A documentation page ran body text full-width (~140 characters/line) at 1.3 line-height. Readers reported fatigue. Constraining to `max-width: 68ch` and raising body leading to 1.6 (Principles 4–5) dramatically improved reading comfort and time-on-page — with no content change. *Readability is geometry, not luck.*

### Example C — Killing font-driven layout shift
An LCP problem traced to two web fonts loading late, causing text to reflow (CLS) and a flash of invisible text. Fixes: switched to one **variable** font, self-hosted `woff2`, `font-display: swap`, preloaded the critical face, and defined a metrically-matched fallback. LCP and CLS both improved and the visible text never disappeared. *(Principle 8, ties to [`35`](./35-PERFORMANCE.md).)*

---

## 7. Common Mistakes

- **Choosing a font for its looks in a specimen**, ignoring how it renders at small UI sizes and across weights.
- **Not defining line-height per role** — leaving browser defaults produces uneven rhythm.
- **Ignoring measure** in flexible layouts, so text stretches edge-to-edge on wide screens.
- **Using `px` everywhere**, breaking user font-size preferences.
- **Loading many weights "just in case,"** ballooning font payload.
- **Pairing near-identical fonts** that clash subtly.
- **Forgetting the fallback stack**, causing CLS when the web font swaps in.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Generate the modular scale + tokens** from a chosen base and ratio, with `rem` values.
- **Produce the semantic role table + CSS/Tailwind wiring** from the scale.
- **Recommend font pairings** consistent with brand attributes ([`03`](./03-BRAND_STRATEGY.md)) and generate matched fallback stacks.
- **Audit** for raw px sizes, missing line-heights, unconstrained measure, and disabled zoom.
- **Generate performant `@font-face`/preload** setups with subsetting guidance.

### 8.2 Hard rules (Art. III, IV, VIII)
- Sizes come from the **scale** and are emitted in **`rem`**; no arbitrary px in components.
- Text must **support 200% zoom / reflow**; the agent must never emit `user-scalable=no` or fixed-pixel-locked text.
- Limit to the approved family/weight set; adding a family/weight requires an explicit, justified proposal (Art. XII).
- Body reading measure must be constrained (~45–75ch).

### 8.3 Prompt example — generate the type system
```
ROLE: Design Systems Engineer, bound by 00-CONSTITUTION + 07.
INPUT: base=16px, ratio=1.25, brand attributes=confident/warm, needs: UI + docs + code.
TASK:
  1. Generate the modular scale (rem) and line-height/weight/tracking tokens.
  2. Define semantic roles (display,h1–h4,body,body-sm,label,caption,code) as a table
     + CSS classes consuming tokens.
  3. Recommend 1 variable UI/body family + 1 mono, with matched fallback stacks.
  4. Emit performant @font-face + preload + subsetting notes.
CONSTRAINTS: rem units; measure 45–75ch for body; leading scales inversely with size.
OUTPUT: tokens (CSS) + roles table + font-loading snippet + Tailwind wiring.
```

### 8.4 Prompt example — audit
```
TASK: Scan the repo for (a) px font sizes in components, (b) text roles missing line-height,
(c) body text without a max-width/measure constraint, (d) user-scalable=no.
Output {file:line, issue, fix mapping to the correct role/token}.
```

---

## 9. Human Review Checklist

- [ ] All text sizes come from the **modular scale** (in `rem`), no arbitrary values.
- [ ] **≤ 2 families** and **≤ 3 weights** in use (justified if more).
- [ ] Hierarchy is created by **size + weight + space** and **survives grayscale**.
- [ ] **Line-height** is appropriate per size (tight for display, open for body).
- [ ] Body **measure** is ~45–75 characters (constrained max-width).
- [ ] Text supports **200% zoom / reflow**; zoom is not disabled.
- [ ] Components consume **semantic roles/tokens**, not raw px.
- [ ] Fonts load performantly (**woff2, subset, swap/preload, variable, fallback**) with minimal CLS.
- [ ] Contrast meets AA ([`06`](./06-COLOR_SYSTEM.md)); no justified web text or long ALL-CAPS runs.

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Scale generation | Script generating scale + role tokens from base+ratio. |
| Raw-size linting | Stylelint rule banning px font-size / off-scale sizes in components. |
| Measure check | Lint/visual test flagging body text without max-width constraint. |
| Font perf | CI check: woff2 only, subset size budget, preload present, `font-display` set. |
| CLS/LCP guard | Lighthouse/Web-Vitals budgets in CI catching font-driven shift ([`35`](./35-PERFORMANCE.md)). |
| Zoom/reflow | Automated test at 200% zoom on core screens. |

---

## 11. References for Further Study
- **Typographic craft:** Robert Bringhurst, *The Elements of Typographic Style*; Butterick's *Practical Typography* (measure, leading, choices).
- **Web type & performance:** web.dev guidance on optimizing web fonts, `font-display`, and reducing CLS; variable-fonts documentation.
- **Modular scales & vertical rhythm:** the modular-scale and vertical-rhythm bodies of work.
- **Accessibility:** WCAG 2.2 SC 1.4.4 (resize text), 1.4.12 (text spacing), 1.4.8 (visual presentation).
- **Cross-references:** [`04-DESIGN_PHILOSOPHY.md`](./04-DESIGN_PHILOSOPHY.md), [`06-COLOR_SYSTEM.md`](./06-COLOR_SYSTEM.md), [`08-SPACING_SYSTEM.md`](./08-SPACING_SYSTEM.md), [`25-COPYWRITING.md`](./25-COPYWRITING.md), [`35-PERFORMANCE.md`](./35-PERFORMANCE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Text sizes drawn from the scale | 100% |
| Font families / weights in production | ≤ 2 / ≤ 3 |
| Body text within 45–75ch measure | 100% |
| Usable at 200% zoom (reflow) | 100% (floor) |
| Components using type roles vs. raw px | ≥ 98% |
| Font payload (critical) | within budget (e.g. ≤ ~100KB woff2) |
| Font-driven CLS | ~0 |

---

*End of `07-TYPOGRAPHY_SYSTEM.md`.*
