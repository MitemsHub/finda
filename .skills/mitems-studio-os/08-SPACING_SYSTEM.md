# 08 — Spacing System

### Spatial Scales, Rhythm, and Density

> *"Space is not the absence of design. It is the design. What you leave out gives meaning to what you keep in."*

---

**Chapter type:** Phase 2 — Design Foundations
**DRI:** Design Systems Engineer + Senior UI Designer (joint)
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`04-DESIGN_PHILOSOPHY.md`](./04-DESIGN_PHILOSOPHY.md), [`05-VISUAL_PSYCHOLOGY.md`](./05-VISUAL_PSYCHOLOGY.md), [`07-TYPOGRAPHY_SYSTEM.md`](./07-TYPOGRAPHY_SYSTEM.md)
**Feeds:** [`09`](./09-LAYOUT_SYSTEM.md), [`10`](./10-GRID_SYSTEM.md), [`11`](./11-CARD_DESIGN.md)–[`14`](./14-COMPONENT_LIBRARY.md), [`15`](./15-DESIGN_TOKENS.md), [`33`](./33-TAILWIND_GUIDE.md)

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

This chapter defines the studio's **spacing scale** and the rules for applying it — margins, padding, gaps, and the relationships they encode. Spacing is the invisible skeleton of every interface: it groups related things, separates unrelated things, creates rhythm, and communicates hierarchy just as powerfully as size or color ([`05`](./05-VISUAL_PSYCHOLOGY.md), Gestalt proximity).

The purpose is to replace ad-hoc, eyeballed spacing ("that looks about right") with a **finite, tokenized scale** that produces consistent rhythm across every component and screen, is trivially enforceable, and lets both humans and AI agents place elements without inventing new values. When spacing is systematic, layouts feel calm and coherent; when it isn't, they feel subtly "off" in ways users can't articulate but always sense.

---

## 2. Philosophy

**Whitespace is an active tool, not leftover room.** (Article of the Design Philosophy, [`04`](./04-DESIGN_PHILOSOPHY.md) P3.) Space directs attention, implies grouping, and signals importance — generous space around an element says "this matters." Designers who fear whitespace fill it and destroy the very hierarchy they're trying to build. We treat space as a first-class design material.

**Proximity is meaning.** The brain groups things that are close and separates things that are far ([`05`](./05-VISUAL_PSYCHOLOGY.md), law of proximity). Therefore spacing is *semantic*: the gap between a label and its input must be smaller than the gap between two form groups, or the interface literally lies to the user about what belongs together. Consistent, intentional spacing is honest communication.

**A finite scale beats infinite freedom.** If any value is allowed, every screen drifts. An 8-ish step scale covers essentially every real need. Constraining to it (Article VIII) makes layouts automatically harmonious, makes spacing decisions fast, and makes them *checkable*. The scale is a gift, not a cage.

**Density is a deliberate choice tied to context.** A marketing page breathes; a data-dense trading dashboard is tight. Both are correct *for their context*. We define density modes intentionally rather than letting density happen by accident — and we keep touch targets adequate regardless (Article III, [`22`](./22-ACCESSIBILITY.md)).

---

## 3. Principles

### Principle 1 — All spacing comes from one scale
Every margin, padding, and gap is a token from the scale. No magic numbers.
> *Rationale (Art. IV):* One source of spacing = automatic rhythm and one place to tune.

### Principle 2 — Base the scale on a consistent unit (commonly 4px)
Use a 4px (or 8px) base so values align to a pixel grid and to each other. Steps often follow a near-geometric progression.
> *Rationale:* A shared base keeps everything aligned and multiplies cleanly.

### Principle 3 — Spacing encodes relationship (proximity)
Tighter space = more related; looser space = less related. Space *within* a group < space *between* groups.
> *Rationale ([`05`](./05-VISUAL_PSYCHOLOGY.md)):* Proximity is how users infer structure.

### Principle 4 — Prefer `gap` and flow spacing over per-element margins
Use flех/grid `gap` and "space-between-children" patterns instead of sprinkling margins on individual elements.
> *Rationale:* Centralizes spacing, avoids margin-collapse surprises, and keeps components portable.

### Principle 5 — Spacing scales with viewport and density
Section-level spacing grows on larger screens; component-internal spacing is more stable. Support density modes where needed.
> *Rationale:* A 96px section gap on mobile wastes precious space; 24px on a 4K monitor looks cramped.

### Principle 6 — Respect the touch/target floor
Interactive targets ≥ **~44×44px** (with adequate spacing between them), regardless of visual density.
> *Rationale (Art. III, [`22`](./22-ACCESSIBILITY.md)):* Small/crowded targets fail motor-impaired and mobile users.

### Principle 7 — Vertical rhythm ties to typography
Vertical spacing relates to the type scale/line-height so text and space share a rhythm ([`07`](./07-TYPOGRAPHY_SYSTEM.md)).
> *Rationale:* Space and type that share a system look composed, not assembled.

---

## 4. Best Practices

### 4.1 Define the spacing scale as tokens

```css
:root {
  --space-0:  0;
  --space-1:  0.25rem;  /* 4  */
  --space-2:  0.5rem;   /* 8  */
  --space-3:  0.75rem;  /* 12 */
  --space-4:  1rem;     /* 16 */
  --space-5:  1.5rem;   /* 24 */
  --space-6:  2rem;     /* 32 */
  --space-7:  3rem;     /* 48 */
  --space-8:  4rem;     /* 64 */
  --space-9:  6rem;     /* 96 */
  --space-10: 8rem;     /* 128 */
}
```

> **Naming note:** number-suffixed tokens (`space-4`) are unambiguous and tooling-friendly. Some systems use t-shirt sizes (`xs…3xl`); pick one convention and keep it (Art. V).

### 4.2 Assign spacing roles (where each step is used)

| Step | Typical use |
| --- | --- |
| `space-1` (4) | Icon-to-label gap, tight inline spacing |
| `space-2` (8) | Label-to-input, chip padding, small gaps |
| `space-3` (12) | Compact component padding |
| `space-4` (16) | Default component padding, list-item gap |
| `space-5` (24) | Card padding, gap between related groups |
| `space-6` (32) | Gap between distinct groups/sections (mobile) |
| `space-7` (48) | Sub-section separation |
| `space-8` (64) | Section spacing (tablet+) |
| `space-9`–`10` (96–128) | Major page section rhythm (desktop) |

### 4.3 Use the proximity rule concretely
Within a form field group:
```
label            ← space-2 (8) →  input        (tightly bound: they belong together)
[field group A]  ← space-5 (24)→  [field group B]  (looser: distinct groups)
[form section]   ← space-7 (48)→  [form section]   (loosest: separate concerns)
```
If the label-to-input gap ever equals the group-to-group gap, grouping is broken.

### 4.4 Space with `gap`, not scattered margins
```html
<!-- Good: parent owns the rhythm -->
<div class="flex flex-col gap-4"> <Item/> <Item/> <Item/> </div>

<!-- Or the "owl" for prose flow -->
<article class="[&>*+*]:mt-4"> ... </article>
```
```css
.stack > * + * { margin-block-start: var(--space-4); } /* reusable vertical stack */
```

### 4.5 Make section spacing responsive
```css
.section { padding-block: var(--space-6); }           /* mobile */
@media (min-width: 768px)  { .section { padding-block: var(--space-8); } }
@media (min-width: 1280px) { .section { padding-block: var(--space-9); } }
```

### 4.6 Define density modes when needed
```css
[data-density="compact"] { --space-scale: 0.75; }  /* dashboards/tables */
[data-density="cozy"]    { --space-scale: 1; }      /* default */
/* apply as calc(var(--space-4) * var(--space-scale)) in component padding */
```
Keep touch targets ≥44px even in compact mode (Principle 6).

### 4.7 Wire to Tailwind
Tailwind's default spacing scale is already 4px-based; extend/override it to match these tokens so `p-4`, `gap-6`, etc. map exactly to the system ([`33`](./33-TAILWIND_GUIDE.md)). Ban arbitrary bracket values (`p-[13px]`) via lint.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle/Article |
| --- | --- | --- |
| **Magic numbers** (`margin: 13px`) | Off-grid; inconsistent; unmaintainable. | P1, Art. IV |
| **Equal spacing everywhere** | Destroys grouping; interface can't show relationships. | P3 |
| **Label-input gap = group gap** | Lies about what belongs together. | P3 |
| **Per-element margin sprawl** | Fragile, collapse bugs, non-portable components. | P4 |
| **Fixed section spacing across breakpoints** | Cramped on desktop or wasteful on mobile. | P5 |
| **Cramming to avoid whitespace** | Raises cognitive load; kills hierarchy. | [`04`](./04-DESIGN_PHILOSOPHY.md) P3 |
| **Tiny/crowded touch targets** in dense UIs | Fails motor-impaired & mobile users. | P6, Art. III |
| **Arbitrary Tailwind values** (`gap-[7px]`) | Escapes the system silently. | P1 |

---

## 6. Real-World Examples

### Example A — The form that "felt wrong"
A signup form had a uniform 16px gap between *everything* — labels, inputs, and unrelated sections alike. Users found it hard to parse. The fix required *no redesign*, only correct proximity: label→input tightened to `space-2` (8), field groups separated by `space-5` (24), sections by `space-7` (48). Instantly the form read as organized groups instead of an undifferentiated list. *Spacing was the entire problem and the entire solution (Principle 3).*

### Example B — Responsive section rhythm
A landing page used a fixed 32px between major sections. On mobile it was fine; on a large desktop the page felt like an undifferentiated scroll with no "chapters." Switching to responsive section spacing (`space-6` → `space-8` → `space-9`) gave the desktop layout breathing room and clear pacing, while keeping mobile efficient. *Density is contextual (Principle 5).*

### Example C — Compact density without breaking touch targets
An analytics table needed to show more rows per screen. The team introduced a `compact` density mode (scale ×0.75) for *spacing*, but kept row action buttons at ≥44px hit areas via padding on the interactive element (visual size could be smaller, hit area couldn't). Result: denser data, still tappable. *Density and accessibility are not in conflict when designed deliberately (Principles 5–6).*

---

## 7. Common Mistakes

- **Nudging pixels by hand** in a design tool instead of snapping to the scale.
- **Using margin where gap belongs**, causing collapse quirks and non-reusable components.
- **Forgetting the proximity hierarchy** — equal gaps that erase grouping.
- **One spacing value for all breakpoints**, ignoring density needs.
- **Shrinking touch targets** to achieve density (a11y regression).
- **Arbitrary Tailwind bracket values** that bypass the token scale.
- **Not relating vertical spacing to type**, producing off rhythm ([`07`](./07-TYPOGRAPHY_SYSTEM.md)).

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Generate the scale + role mapping** and Tailwind/CSS-var wiring.
- **Apply the proximity rule** automatically when laying out forms/cards/lists.
- **Audit** for magic numbers, arbitrary bracket values, and proximity violations (label gap ≥ group gap).
- **Produce responsive spacing** ramps for sections.
- **Verify touch-target sizes** in dense layouts.

### 8.2 Hard rules (Art. III, IV, VIII)
- Every spacing value the agent emits is a **token from the scale** — never a magic number or arbitrary bracket value.
- The agent enforces the **proximity hierarchy**: within-group spacing < between-group spacing < between-section spacing.
- Interactive targets stay **≥44×44px** hit area regardless of density.
- Prefer **`gap`/stack** patterns over per-element margins.

### 8.3 Prompt example — lay out with correct spacing
```
ROLE: Design Systems Engineer, bound by 00-CONSTITUTION + 08.
TASK: Produce the spacing for <form/card/section> using ONLY scale tokens.
CONSTRAINTS:
  - Proximity: label→input = space-2; group→group = space-5; section→section = space-7.
  - Use flex/grid `gap` or a .stack utility, not per-element margins.
  - Section spacing responsive: space-6 (mobile) → space-8 (md) → space-9 (xl).
  - All interactive targets ≥44px hit area.
OUTPUT: markup + the token used for every gap, with a one-line proximity rationale each.
```

### 8.4 Prompt example — audit
```
TASK: Scan styles/markup for (a) non-scale spacing values, (b) arbitrary Tailwind
bracket spacing, (c) label-input gaps ≥ group gaps, (d) touch targets <44px.
Output {file:line, issue, fix→correct token}.
```

---

## 9. Human Review Checklist

- [ ] All spacing uses **scale tokens** — no magic numbers or arbitrary bracket values.
- [ ] **Proximity hierarchy** holds: within-group < between-group < between-section.
- [ ] Label-to-input gap is **clearly smaller** than group-to-group gap.
- [ ] Spacing is applied via **`gap`/stack**, not scattered per-element margins.
- [ ] **Section spacing is responsive** (grows on larger viewports).
- [ ] **Touch targets ≥ 44×44px** hit area, including in compact/dense modes.
- [ ] Vertical rhythm relates to the **type scale** ([`07`](./07-TYPOGRAPHY_SYSTEM.md)).
- [ ] Whitespace is **intentional** — hierarchy survives the squint test.

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Magic-number linting | Stylelint/ESLint banning off-scale spacing + arbitrary Tailwind values. |
| Scale generation | Script emitting the spacing tokens + Tailwind theme. |
| Proximity checks | Design-lint / heuristic flagging label-gap ≥ group-gap. |
| Touch-target audit | Automated check that interactive elements meet ≥44px ([`22`](./22-ACCESSIBILITY.md)). |
| Responsive spacing test | Visual regression across breakpoints. |
| Density modes | Token-scale variable validated per density in CI. |

---

## 11. References for Further Study
- **Grouping & proximity:** Gestalt principles ([`05`](./05-VISUAL_PSYCHOLOGY.md) references).
- **Spacing systems:** the 8-point / 4-point grid methodology; public design-system spacing docs as reference patterns.
- **Vertical rhythm:** the vertical-rhythm and baseline-grid literature (relate to [`07`](./07-TYPOGRAPHY_SYSTEM.md)).
- **Touch targets:** WCAG 2.2 SC 2.5.8 (target size, minimum) and platform HIG target-size guidance.
- **Cross-references:** [`04-DESIGN_PHILOSOPHY.md`](./04-DESIGN_PHILOSOPHY.md), [`07-TYPOGRAPHY_SYSTEM.md`](./07-TYPOGRAPHY_SYSTEM.md), [`09-LAYOUT_SYSTEM.md`](./09-LAYOUT_SYSTEM.md), [`10-GRID_SYSTEM.md`](./10-GRID_SYSTEM.md), [`33-TAILWIND_GUIDE.md`](./33-TAILWIND_GUIDE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Spacing values drawn from the scale | 100% |
| Magic numbers / arbitrary bracket spacing | 0 |
| Proximity hierarchy correct (within < between < section) | 100% of grouped UIs |
| Interactive targets ≥ 44×44px | 100% (floor) |
| Section spacing responsive across breakpoints | 100% |
| Components using `gap`/stack vs. per-element margins | ≥ 90% |

---

*End of `08-SPACING_SYSTEM.md`.*
