# 12 — Button Design

### Actions, Hierarchy, and States

> *"A button is a promise of what will happen when you press it. Every part of its design — label, color, size, position — is that promise being kept or broken."*

---

**Chapter type:** Phase 3 — Components & Tokens
**DRI:** Senior UI Designer + Accessibility Specialist (joint)
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`04-DESIGN_PHILOSOPHY.md`](./04-DESIGN_PHILOSOPHY.md), [`05-VISUAL_PSYCHOLOGY.md`](./05-VISUAL_PSYCHOLOGY.md), [`06-COLOR_SYSTEM.md`](./06-COLOR_SYSTEM.md), [`08-SPACING_SYSTEM.md`](./08-SPACING_SYSTEM.md)
**Feeds:** [`13`](./13-FORM_DESIGN.md), [`14`](./14-COMPONENT_LIBRARY.md), [`22`](./22-ACCESSIBILITY.md), [`24`](./24-MICRO_INTERACTIONS.md), [`25`](./25-COPYWRITING.md)

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

Buttons are where intention becomes action. They are the most interacted-with control in almost every product, and getting them right — semantically, visually, and accessibly — has outsized impact. This chapter defines the studio's button system: the **variant hierarchy** (primary/secondary/tertiary/ghost/destructive/link), the **states** (default/hover/active/focus/disabled/loading), sizing, iconography, labeling, and the crucial semantic distinction between a *button* and a *link*.

Buttons are also where accessibility is most often quietly broken (`<div onclick>` instead of `<button>`, invisible focus, disabled-but-unexplained, icon-only with no label). This chapter makes the correct, accessible button the *default, easy* choice for humans and agents alike.

---

## 2. Philosophy

**Semantics first: a button does something; a link goes somewhere.** This is not pedantry — it determines keyboard behavior, screen-reader announcement, right-click/open-in-new-tab, and browser history. A `<button>` triggers an action on the current page; an `<a href>` navigates. Styling one to look like the other is fine; *using the wrong element* is an accessibility defect (Article III, [`22`](./22-ACCESSIBILITY.md)). Get the element right before you touch a single pixel.

**Hierarchy is a scarce resource: one primary action per context.** The primary button is a spotlight; if you point three spotlights, you've lit nothing. Visual weight must map to importance ([`05`](./05-VISUAL_PSYCHOLOGY.md) pre-attentive contrast, [`04`](./04-DESIGN_PHILOSOPHY.md) P2). The single most important action is unmistakably primary; everything else recedes. This is the button system's central discipline.

**The label is the design.** A button's most important attribute is its words. "Save changes" beats "Submit"; "Delete 3 projects" beats "OK." A great-looking button with a vague label is a bad button. Copy and design are inseparable here ([`25`](./25-COPYWRITING.md)).

**Every state is a communication.** Hover says "you can press this"; active says "you pressed it"; loading says "working — don't press again"; disabled says "not available (and ideally why)"; focus says "you are here" (keyboard). Missing or ambiguous states leave users guessing and double-clicking (Article VI).

---

## 3. Principles

### Principle 1 — Use the right element
Actions → `<button>`; navigation → `<a href>`. Never `<div>`/`<span>` with click handlers for either.
> *Rationale (Art. III):* Semantics drive keyboard, AT, and native behaviors for free.

### Principle 2 — One primary action per view/section
Exactly one primary; the rest are secondary/tertiary/ghost.
> *Rationale ([`04`](./04-DESIGN_PHILOSOPHY.md) P2):* Multiple primaries cancel out.

### Principle 3 — Visual weight maps to importance and consequence
Primary is heaviest; destructive is visually distinct (and often not the default emphasis); secondary/ghost recede.
> *Rationale ([`05`](./05-VISUAL_PSYCHOLOGY.md)):* Weight guides the eye and signals stakes.

### Principle 4 — All variants and states are tokenized and complete
Every variant ships default/hover/active/focus-visible/disabled/loading; all derive from tokens.
> *Rationale (Art. IV):* Consistent, maintainable, no snowflakes.

### Principle 5 — Focus is always visible
A clear `:focus-visible` ring (≥3:1 contrast) on every button. Never remove focus outlines without an equal replacement.
> *Rationale (Art. III, [`22`](./22-ACCESSIBILITY.md)):* Keyboard users must see where they are.

### Principle 6 — Labels are specific verbs; icon-only buttons must be labeled
Prefer verb + object ("Add member"). Icon-only buttons require `aria-label` and, ideally, a tooltip.
> *Rationale ([`05`](./05-VISUAL_PSYCHOLOGY.md) recognition, [`22`](./22-ACCESSIBILITY.md)):* Ambiguity and icon-illiteracy exclude users.

### Principle 7 — Meet the target-size floor
≥ ~44×44px hit area (padding counts), adequate spacing between buttons.
> *Rationale (Art. III, [`08`](./08-SPACING_SYSTEM.md)):* Motor accessibility + mobile.

### Principle 8 — Destructive actions are guarded
Destructive buttons are visually distinct and require confirmation or undo for irreversible effects.
> *Rationale (Art. III):* Prevent catastrophic, unrecoverable mistakes.

### Principle 9 — Disabled buttons must be explainable
Prefer enabled-but-validated over disabled; if disabled, convey *why* (text/tooltip), and never rely on color alone.
> *Rationale (Art. VI):* A silently disabled button is a dead end.

---

## 4. Best Practices

### 4.1 The variant system

| Variant | Use | Emphasis | Example |
| --- | --- | --- | --- |
| **Primary** | The single most important action | Highest (solid `--color-action`) | Save, Continue, Buy |
| **Secondary** | Important, not primary | Medium (outline/tonal) | Cancel, Back |
| **Tertiary / Ghost** | Low-emphasis, in-context | Low (text + hover bg) | Filters, inline actions |
| **Destructive** | Dangerous/irreversible | Distinct (danger token) | Delete, Remove |
| **Link-button** | Navigation styled inline | Text link | "Learn more →" (real `<a>`) |

### 4.2 Reference implementation (accessible, tokenized)

```tsx
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  iconOnly?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary', size = 'md', loading = false,
  iconOnly = false, children, disabled, ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Spinner className="btn__spinner" aria-hidden="true" />}
      <span className={loading ? 'btn__label--loading' : 'btn__label'}>{children}</span>
    </button>
  );
}
// iconOnly usage MUST pass aria-label: <Button iconOnly aria-label="Delete"><TrashIcon/></Button>
```

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2);
  min-height: 2.75rem;             /* 44px target floor */
  padding-inline: var(--space-5);
  border-radius: var(--radius-md);
  font: var(--weight-medium) var(--text-sm)/1 var(--font-sans);
  cursor: pointer;
  transition: background-color .15s ease, box-shadow .15s ease, transform .05s ease;
}
.btn:focus-visible { outline: 2px solid var(--color-focus-ring); outline-offset: 2px; }
.btn:active { transform: translateY(1px); }        /* subtle press feedback */
.btn:disabled { opacity: .5; cursor: not-allowed; }

.btn--primary   { background: var(--color-action); color:#fff; }
.btn--primary:hover:not(:disabled)   { background: var(--color-action-hover); }
.btn--secondary { background: transparent; color: var(--color-action);
                  border: 1px solid var(--color-border); }
.btn--ghost     { background: transparent; color: var(--color-text); }
.btn--ghost:hover:not(:disabled) { background: color-mix(in oklch, var(--color-text) 8%, transparent); }
.btn--destructive { background: var(--color-danger); color:#fff; }

.btn--sm { min-height: 2.25rem; padding-inline: var(--space-4); }
.btn--lg { min-height: 3.25rem; padding-inline: var(--space-6); font-size: var(--text-base); }

@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
```

### 4.3 The loading state (prevent double-submit)
- Set `aria-busy`, disable the button, show a spinner, keep the label (or swap to a working verb).
- **Preserve button width** during loading to avoid layout shift.
- Re-enable on completion; surface errors near the action.

### 4.4 Icon buttons
```tsx
<Button iconOnly aria-label="Delete project" variant="ghost"><TrashIcon aria-hidden /></Button>
```
Decorative icons get `aria-hidden`; the accessible name lives in `aria-label`. Add a tooltip for sighted users (don't rely on tooltip alone for a11y).

### 4.5 Button groups & placement
- Primary action goes where the eye ends the flow (commonly right/bottom on desktop; consider thumb-reach on mobile, [`20`](./20-MOBILE_FIRST.md)).
- Keep a consistent order (e.g. secondary then primary) across the app.
- Separate destructive from confirm to prevent mis-taps ([`05`](./05-VISUAL_PSYCHOLOGY.md) Fitts).

### 4.6 Labeling rules ([`25`](./25-COPYWRITING.md))
- **Verb + object**, sentence case, no ending punctuation.
- Match the label to the outcome: dialog confirm says "Delete project," not "Yes."
- Avoid "Submit," "OK," "Click here." State what happens.

### 4.7 Destructive confirmation pattern
For irreversible actions: a confirmation dialog naming the exact consequence ("This permanently deletes 3 projects"), a typed acknowledgment for high-stakes cases, or an **undo** window (often better UX than a confirm). See [`00`](./00-CONSTITUTION.md) Article III.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle/Article |
| --- | --- | --- |
| **`<div onClick>` "button"** | No keyboard/AT/native semantics. | P1, Art. III |
| **Multiple primary buttons** | No hierarchy; user unsure what to do. | P2 |
| **Removed focus outline** (`outline:none`) with no replacement | Keyboard users lost. | P5, Art. III |
| **Icon-only, no label** | Ambiguous; invisible to AT. | P6 |
| **Vague labels** ("Submit", "OK", "Click here") | User doesn't know the outcome. | P6, [`25`](./25-COPYWRITING.md) |
| **Tiny/cramped targets** | Mis-taps; fails motor/mobile. | P7, Art. III |
| **Destructive styled like primary / adjacent to confirm** | Accidental data loss. | P8, Art. III |
| **Silently disabled buttons** | Dead end; user stuck, no reason given. | P9, Art. VI |
| **No loading state** → double submit | Duplicate actions, errors. | P4 |
| **Color-only disabled/variant distinction** | Fails colorblind/grayscale. | P3, [`22`](./22-ACCESSIBILITY.md) |
| **Snowflake buttons** (custom per screen) | Inconsistency, maintenance. | P4 |

---

## 6. Real-World Examples

### Example A — The three-primary checkout
A checkout had "Apply coupon," "Continue shopping," and "Place order" all as solid primary buttons. Users hesitated and mis-clicked. The fix: **one** primary ("Place order"), "Continue shopping" as ghost, "Apply coupon" as a secondary inside the coupon field. Completion improved and support confusion dropped. *One spotlight (Principle 2).*

### Example B — `<div>` button that failed everyone
An analytics tool built its main "Run report" control as a styled `<div>` with a click handler. Keyboard users couldn't trigger it; screen readers skipped it; it wasn't in the tab order. Swapping to a real `<button>` restored keyboard operation, focus, Enter/Space activation, and AT announcement — *for free* — and removed custom JS. *Semantics first (Principle 1).*

### Example C — Undo beat the confirm dialog
A "Delete" action used a confirmation modal every time; power users found it annoying and still occasionally deleted the wrong thing. Switching to **optimistic delete + a 7-second "Undo" toast** (with a soft-delete window server-side) was both faster *and* safer — fewer interruptions, full recoverability (Article III). *The best guard is often reversibility, not friction (Principle 8, 4.7).*

---

## 7. Common Mistakes

- **Choosing element by appearance** ("it looks like a button so I used a div") instead of by behavior.
- **Forgetting `:focus-visible`** styling, or nuking outlines globally.
- **Icon-only buttons without `aria-label`**.
- **Padding that looks big but hit area is small** (icon centered in a tiny box).
- **No loading state**, causing double submissions.
- **Disabled primary with no explanation** of what's needed to enable it.
- **Destructive action visually identical to primary** and placed next to it.
- **Vague microcopy** that hides the outcome.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Generate the full button component** (variants, sizes, states, loading, icon support) in TSX + tokens.
- **Fix semantics**: convert `div`/`span` click handlers to `<button>`/`<a>` appropriately.
- **Audit** for missing focus styles, unlabeled icon buttons, multiple primaries, vague labels, small targets, missing loading/disabled reasoning, color-only distinctions.
- **Suggest better labels** (verb+object) per [`25`](./25-COPYWRITING.md).

### 8.2 Hard rules (Art. III, IV, VI)
- Actions use `<button>`, navigation uses `<a href>` — the agent picks the element by **behavior**, never appearance.
- Every button has a **visible `:focus-visible`** style; the agent never emits `outline:none` without an equal replacement.
- Icon-only buttons **always** get an `aria-label`; decorative icons get `aria-hidden`.
- Enforce **one primary** per context; flag extras.
- Targets ≥ **44px**; distinctions never color-only; destructive actions guarded; disabled states explained.
- Every button ships **all states** including loading (with `aria-busy`, width preserved).

### 8.3 Prompt example — build the button system
```
ROLE: UI Designer + A11y Specialist, bound by 00-CONSTITUTION + 12.
TASK: Build a <Button> supporting variants (primary/secondary/ghost/destructive),
sizes (sm/md/lg), loading, and icon-only. TypeScript.
CONSTRAINTS:
  - Real <button>; enforce aria-label for iconOnly (type-level if possible).
  - Tokens only; visible :focus-visible ring ≥3:1; ≥44px targets.
  - States: default/hover/active/focus/disabled/loading (aria-busy, no width shift).
  - Respect prefers-reduced-motion. No color-only distinctions.
OUTPUT: TSX + CSS/Tailwind + state matrix + a11y self-check report.
```

### 8.4 Prompt example — audit
```
TASK: Audit buttons for: non-semantic elements, missing focus styles, unlabeled icon
buttons, >1 primary per view, vague labels, <44px targets, missing loading/disabled
reasoning, color-only variant/disabled cues. Output {file:line, issue, fix + better label}.
```

---

## 9. Human Review Checklist

- [ ] Correct **element**: `<button>` for actions, `<a href>` for navigation (no div/span click handlers).
- [ ] **One primary** action per view/section; weight maps to importance.
- [ ] **Focus is visible** (`:focus-visible`, ≥3:1) on every button.
- [ ] **Icon-only** buttons have `aria-label`; decorative icons `aria-hidden`.
- [ ] Labels are **specific verbs** (verb+object), matching the outcome.
- [ ] Hit area ≥ **44×44px**; adequate spacing between buttons.
- [ ] **Destructive** actions are visually distinct, separated from confirm, and guarded (confirm/undo).
- [ ] **Disabled** state is explained (why), never color-only.
- [ ] **Loading** state present (`aria-busy`, no width shift, prevents double submit).
- [ ] All variants/states use **tokens**; no snowflakes; reduced-motion respected.

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Semantic lint | `jsx-a11y` rules: no non-interactive elements with handlers; anchor-is-valid. |
| Focus-style check | Lint/axe catching `outline:none` without replacement. |
| Icon-label enforcement | Type-level requirement (`iconOnly` ⇒ `aria-label`) + lint. |
| Target-size audit | Automated ≥44px check ([`22`](./22-ACCESSIBILITY.md)). |
| One-primary heuristic | Static scan flagging multiple primary buttons per view. |
| State coverage | Storybook stories for every variant × state. |
| Label linting | Flag "Submit/OK/Click here" via copy lint ([`25`](./25-COPYWRITING.md)). |

---

## 11. References for Further Study
- **Button vs. link semantics:** WAI-ARIA Authoring Practices (button & link patterns), MDN on `<button>`/`<a>`.
- **Focus visibility & target size:** WCAG 2.2 SC 2.4.7 (focus visible), 2.4.13 (focus appearance), 2.5.8 (target size).
- **Action labeling:** content-design/microcopy guidance on actionable labels ([`25`](./25-COPYWRITING.md)).
- **Destructive-action safety:** undo vs. confirm UX literature.
- **Cross-references:** [`06-COLOR_SYSTEM.md`](./06-COLOR_SYSTEM.md), [`08-SPACING_SYSTEM.md`](./08-SPACING_SYSTEM.md), [`13-FORM_DESIGN.md`](./13-FORM_DESIGN.md), [`22-ACCESSIBILITY.md`](./22-ACCESSIBILITY.md), [`24-MICRO_INTERACTIONS.md`](./24-MICRO_INTERACTIONS.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Buttons using correct semantic element | 100% (floor) |
| Buttons with visible focus | 100% (floor) |
| Icon-only buttons with accessible name | 100% |
| Views with exactly one primary action | 100% |
| Interactive targets ≥ 44px | 100% |
| Destructive actions guarded (confirm/undo) | 100% |
| Buttons shipping all states (incl. loading) | 100% |
| Color-only variant/disabled distinctions | 0 |

---

*End of `12-BUTTON_DESIGN.md`.*
