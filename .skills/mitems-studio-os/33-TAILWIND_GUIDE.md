# 33 — Tailwind CSS Guide

### Utility-First Styling, Wired to the Design System

> *"Tailwind is only as good as the tokens behind it. Utilities without a design system are just inline styles with extra steps; utilities wired to tokens are the design system, enforced."*

---

**Chapter type:** Phase 6 — Engineering Craft
**DRI:** Tailwind CSS Expert + Design Systems Engineer
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`06`](./06-COLOR_SYSTEM.md)–[`10`](./10-GRID_SYSTEM.md), [`14`](./14-COMPONENT_LIBRARY.md), [`15-DESIGN_TOKENS.md`](./15-DESIGN_TOKENS.md)
**Feeds:** [`30-REACT_GUIDE.md`](./30-REACT_GUIDE.md), [`21-RESPONSIVE_DESIGN.md`](./21-RESPONSIVE_DESIGN.md), [`35-PERFORMANCE.md`](./35-PERFORMANCE.md)

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

This chapter defines how the studio uses **Tailwind CSS** — the utility-first framework that is our default styling approach ([`00`](./00-CONSTITUTION.md)). It covers how to configure Tailwind so its utilities *are* the design system (wired to tokens from [`15`](./15-DESIGN_TOKENS.md)), how to keep utility-heavy markup maintainable, how to compose components ([`14`](./14-COMPONENT_LIBRARY.md)) without descending into class-string chaos, and how to avoid the traps (arbitrary values, `@apply` overuse, duplicated class blobs) that turn Tailwind from an accelerator into a liability.

The central idea: Tailwind's value is not "utilities instead of CSS files" — it's **constraint**. When Tailwind's theme is your token system, every `p-4`, `text-body`, and `bg-action` is a design decision drawn from the system, and drifting off-system becomes visibly wrong. This chapter makes Tailwind the *enforcement layer* of the design foundations (06–10, 15), not a parallel styling free-for-all.

---

## 2. Philosophy

**Utility-first works because of constraint, not despite it.** The common objection to Tailwind — "it's just inline styles" — is true *only if you use arbitrary values*. The whole point is the opposite: Tailwind gives you a **constrained set** of spacing, color, type, and radius utilities drawn from your theme. `p-4` isn't "16px"; it's "spacing step 4 from the system." This constraint is what produces consistency automatically ([`08`](./08-SPACING_SYSTEM.md), Article V) — you *can't* accidentally use `17px` if the only options are the scale. Tailwind is a design system with a keyboard shortcut.

**Tailwind's theme is the design token layer.** We do not maintain two sources of truth (design tokens *and* a separate Tailwind config). The Tailwind theme is *generated from* or *references* the token system ([`15`](./15-DESIGN_TOKENS.md)): colors map to semantic tokens (`bg-surface`, `text-muted`, `bg-action`), spacing to the scale, type to roles. Change a token, and every utility updates. This is what makes theming, dark mode, and rebranding work through utilities ([`06`](./06-COLOR_SYSTEM.md)).

**Locality of styling is a feature — until the class string screams.** Co-locating styles with markup (no jumping between files, no naming things, no dead CSS) is a genuine productivity and maintainability win. But a `<div>` with 30 utility classes is a smell. The resolution isn't to abandon Tailwind; it's to **extract a component** ([`14`](./14-COMPONENT_LIBRARY.md)) so the class string lives in one reusable place, not to sprinkle `@apply` everywhere (which recreates the CSS-file indirection Tailwind was meant to remove). Reuse via *components*, not via *class-name abstractions*.

**Consistency comes from the config, not from discipline.** Relying on every developer to "remember to use the scale" fails. Instead we **remove the escape routes**: disable or lint against arbitrary values (`p-[13px]`), so off-system styling is a build/lint error, not a code-review judgment call. The system enforces itself (Article IV; [`15`](./15-DESIGN_TOKENS.md)). Discipline that can be automated should be.

---

## 3. Principles

### Principle 1 — Tailwind's theme = the token system (single source of truth)
Configure the theme from design tokens; utilities are semantic (`bg-action`, not `bg-blue-600`).
> *Rationale (Art. IV, [`15`](./15-DESIGN_TOKENS.md)):* One source; theming through utilities.

### Principle 2 — Use scale utilities; ban arbitrary values
Prefer `p-4`, `gap-6`, `rounded-lg`; disallow `p-[13px]`, `text-[#abc123]`.
> *Rationale (Art. VIII, [`08`](./08-SPACING_SYSTEM.md)):* Arbitrary values are drift; the scale is the point.

### Principle 3 — Reuse via components, not `@apply`
Extract a React component when a class string recurs; avoid `@apply` for reuse.
> *Rationale ([`14`](./14-COMPONENT_LIBRARY.md)):* Components are the reuse unit; `@apply` recreates CSS indirection.

### Principle 4 — Manage variants with a typed utility (cva/tv), not ternary soup
Use `class-variance-authority`/`tailwind-variants` for component variants.
> *Rationale ([`32`](./32-TYPESCRIPT_GUIDE.md)):* Typed, readable, exhaustive variants beat string concatenation.

### Principle 5 — Mobile-first, responsive via prefixes
Base = mobile; `sm:`/`md:`/`lg:` add capability; prefer intrinsic layout where possible.
> *Rationale ([`20`](./20-MOBILE_FIRST.md), [`21`](./21-RESPONSIVE_DESIGN.md)):* Progressive enhancement.

### Principle 6 — Accessibility utilities are used correctly
`sr-only`, `focus-visible:`, `motion-reduce:`, `aria-*`/`data-*` variants for real a11y.
> *Rationale (Art. III, [`22`](./22-ACCESSIBILITY.md)):* Utilities must serve accessibility, not bypass it.

### Principle 7 — Keep the output lean
Rely on Tailwind's JIT/content scanning; avoid bloat; purge unused; watch bundle size.
> *Rationale ([`35`](./35-PERFORMANCE.md)):* CSS should stay small.

### Principle 8 — Merge classes safely; keep strings legible
Use `tailwind-merge` for conditional overrides; format class order consistently.
> *Rationale ([`43`](./43-CLEAN_CODE.md)):* Readable, conflict-free class strings.

---

## 4. Best Practices

### 4.1 Wire the theme to tokens ([`15`](./15-DESIGN_TOKENS.md), [`06`](./06-COLOR_SYSTEM.md))
```ts
// tailwind.config.ts — semantic utilities backed by CSS-var tokens (theme-swappable at runtime)
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: { DEFAULT: "var(--color-text)", muted: "var(--color-text-muted)" },
        action: { DEFAULT: "var(--color-action)", hover: "var(--color-action-hover)" },
        danger: "var(--color-danger)",
        border: "var(--color-border)",
      },
      borderRadius: { md: "var(--radius-md)", lg: "var(--radius-lg)" },
      transitionTimingFunction: { standard: "var(--ease-standard)" },
    },
  },
  // Tailwind's spacing scale is already 4px-based — align it to the token scale (08)
} satisfies import("tailwindcss").Config;
```
> Result: `bg-surface text-text-muted bg-action rounded-lg` — semantic, themeable, on-system. Dark mode swaps the CSS vars ([`06`](./06-COLOR_SYSTEM.md)); utilities don't change.

### 4.2 Extract components when class strings recur ([`14`](./14-COMPONENT_LIBRARY.md))
```tsx
// ❌ Same 20-class blob copy-pasted across the app → drift
// ✅ Extract once:
export function Card({ className, ...props }: React.ComponentProps<"article">) {
  return <article className={cn("rounded-lg border border-border bg-surface p-5 flex flex-col gap-4", className)} {...props} />;
}
```
Reuse the *component*, not the class string. `@apply` is reserved for rare base-layer cases (e.g. typography defaults), not for component reuse.

### 4.3 Variants with `cva` + typed props ([`32`](./32-TYPESCRIPT_GUIDE.md), [`12`](./12-BUTTON_DESIGN.md))
```tsx
import { cva, type VariantProps } from "class-variance-authority";
const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action " +
  "disabled:opacity-50 disabled:pointer-events-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: "bg-action text-white hover:bg-action-hover",
        secondary: "border border-border text-action bg-transparent",
        ghost: "text-text hover:bg-text/5",
        destructive: "bg-danger text-white",
      },
      size: { sm: "h-9 px-4 text-sm", md: "h-11 px-5 text-sm", lg: "h-13 px-6 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;
```
Note: focus-visible, disabled, and `motion-reduce` are baked in (a11y + motion floors, [`22`](./22-ACCESSIBILITY.md)/[`23`](./23-MOTION_SYSTEM.md)).

### 4.4 Safe conditional classes (`cn` = clsx + tailwind-merge)
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
// cn("p-4", isWide && "p-6") → "p-6" (later wins, no conflicting p-4/p-6 both applied)
```

### 4.5 Responsive + state variants ([`21`](./21-RESPONSIVE_DESIGN.md), [`22`](./22-ACCESSIBILITY.md))
```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">…</div>
<button class="focus-visible:outline-action motion-reduce:transition-none hover:bg-action-hover">…</button>
<span class="sr-only">Loading</span>                <!-- visually hidden, AT-visible -->
<div class="[@media(prefers-reduced-motion:reduce)]:animate-none">…</div>
```
Prefer intrinsic layout ([`09`](./09-LAYOUT_SYSTEM.md)/[`10`](./10-GRID_SYSTEM.md)) — `grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]` is an acceptable "arbitrary" for genuinely intrinsic grids (a deliberate, documented exception).

### 4.6 Accessibility with utilities ([`22`](./22-ACCESSIBILITY.md))
- `sr-only` / `not-sr-only` for screen-reader-only content and skip links.
- **`focus-visible:` on every interactive element** — never rely on default outline removal.
- `motion-reduce:` / reduced-motion variants for animations ([`23`](./23-MOTION_SYSTEM.md)).
- Utilities never *replace* semantic HTML/ARIA — a `div` with `role` utilities is still a `div`; use the right element.

### 4.7 Class order & formatting ([`43`](./43-CLEAN_CODE.md))
Use the official **Prettier plugin for Tailwind** to auto-sort classes into a consistent order — removes bikeshedding and makes diffs clean. Keep long strings readable (group by concern, or extract a component).

### 4.8 Keep CSS lean ([`35`](./35-PERFORMANCE.md))
JIT generates only used classes from the `content` globs — keep globs accurate. Avoid huge `safelist`s. Watch the CSS bundle in CI; Tailwind output should be small and stable.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Arbitrary values** (`p-[13px]`, `text-[#abc]`) | Off-system drift; defeats the constraint. | P2 |
| **Raw palette instead of semantic** (`bg-blue-600`) | Un-themeable; no dark mode; bypasses tokens. | P1, [`06`](./06-COLOR_SYSTEM.md) |
| **`@apply` for component reuse** | Recreates CSS-file indirection Tailwind removes. | P3 |
| **Copy-pasted class blobs** across files | Drift; no single source. | P3 |
| **Ternary class soup** for variants | Unreadable, error-prone, untyped. | P4 |
| **Removing focus outlines** (`outline-none` w/o replacement) | A11y failure. | P6, Art. III |
| **Two sources of truth** (tokens *and* separate config values) | Drift between design + code. | P1 |
| **Desktop-first / max-width prefixes everywhere** | Fights mobile-first. | P5 |
| **Giant `safelist` / inaccurate content globs** | CSS bloat or missing styles. | P7 |
| **Conflicting classes** (`p-4 p-6` both applied) | Unpredictable; no merge. | P8 |
| **Utilities to fake semantics** | Still non-semantic HTML. | P6, [`22`](./22-ACCESSIBILITY.md) |

---

## 6. Real-World Examples

### Example A — Arbitrary values were the drift
A codebase "used Tailwind" but was riddled with `p-[15px]`, `mt-[13px]`, `text-[#3a3a3a]` — effectively inline styles, inconsistent everywhere. Adding a **lint rule banning arbitrary values** (plus wiring the theme to tokens) forced everything onto the scale; spacing and color instantly became consistent, and dark mode became possible because colors were now semantic tokens. *Tailwind's value is the constraint you'd been escaping (Principles 1, 2).*

### Example B — `cva` killed the ternary soup
A Button's className was a 12-line nested ternary (`variant === "primary" ? ... : variant === "danger" ? ...`) — unreadable and buggy (some combos produced conflicting classes). Refactoring to **`cva`** (4.3) made variants declarative, typed ([`32`](./32-TYPESCRIPT_GUIDE.md)), exhaustive, and readable — and baked in focus-visible/disabled/motion-reduce so a11y couldn't be forgotten (Principle 4; [`12`](./12-BUTTON_DESIGN.md)).

### Example C — Components, not `@apply`
A team tried to tame repeated class strings with dozens of `@apply` rules in a CSS file — and ended up back where Tailwind started: jumping between files, naming things, dead CSS. Switching to **extracted React components** (4.2) put each recurring pattern in one reusable, typed place, kept styling co-located, and deleted the CSS file. *Reuse via components, not class-name abstractions (Principle 3).*

---

## 7. Common Mistakes

- **Using arbitrary values** instead of the scale (the cardinal sin).
- **Using raw palette utilities** (`bg-blue-600`) instead of semantic tokens.
- **`@apply`-ing everything** to "clean up" markup (recreates indirection).
- **Copy-pasting class blobs** instead of extracting components.
- **Ternary class concatenation** for variants instead of `cva`/`tv`.
- **Nuking focus outlines** without a `focus-visible` replacement.
- **Maintaining Tailwind config values separately** from design tokens.
- **Desktop-first** responsive prefixes.
- **Not sorting classes** (noisy diffs) or letting conflicting classes both apply.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Generate the token-wired Tailwind config** from the design tokens ([`15`](./15-DESIGN_TOKENS.md)).
- **Build components with `cva` variants**, `cn`/tailwind-merge, and baked-in a11y/motion utilities.
- **Refactor** arbitrary values → scale, raw palette → semantic, ternary soup → `cva`, class blobs → components, `@apply` → components.
- **Audit** for arbitrary values, raw palette, missing focus-visible, desktop-first prefixes, and CSS bloat.

### 8.2 Hard rules (Art. IV, VIII; a11y/motion floors)
- Utilities are **semantic + token-backed** (`bg-action`, not `bg-blue-600`); the Tailwind theme references the **token system** (single source).
- **No arbitrary values** except deliberate, documented intrinsic-layout cases; the agent uses the scale.
- **Reuse via extracted components** and **`cva`** for variants — not `@apply` or ternary soup.
- **`focus-visible:` on every interactive element** (never bare `outline-none`); **`motion-reduce:`** on animations; `sr-only` where needed ([`22`](./22-ACCESSIBILITY.md)/[`23`](./23-MOTION_SYSTEM.md)).
- **Mobile-first** (`min-width` prefixes); prefer intrinsic layout ([`21`](./21-RESPONSIVE_DESIGN.md)).
- Uses **`cn` (clsx + tailwind-merge)** for conditional classes; classes sorted (Prettier plugin).

### 8.3 Prompt example — build a styled component
```
ROLE: Tailwind Expert + Design Systems Engineer, bound by 00-CONSTITUTION + 33 (+06–15).
TASK: Build <component> styled with Tailwind.
CONSTRAINTS:
  - Semantic token utilities only (bg-surface/text-muted/bg-action...); NO arbitrary values, NO raw palette.
  - Variants via cva (typed); conditional classes via cn (clsx+tailwind-merge).
  - Bake in focus-visible, disabled, and motion-reduce; sr-only where needed.
  - Mobile-first responsive; prefer intrinsic grids.
OUTPUT: component (TSX) + cva config + note confirming no arbitrary/raw values + a11y utilities present.
```

### 8.4 Prompt example — audit
```
TASK: Audit Tailwind usage for: arbitrary values (p-[..]/text-[#..]), raw palette instead of semantic
tokens, @apply-for-reuse, copy-pasted class blobs, ternary class soup, missing focus-visible/motion-reduce,
desktop-first prefixes, and conflicting classes. Output {file:line, issue, fix → scale/token/cva/component}.
```

---

## 9. Human Review Checklist

- [ ] Utilities are **semantic + token-backed**; Tailwind theme references the **token system** (single source).
- [ ] **No arbitrary values** (except documented intrinsic-layout cases); everything on the scale.
- [ ] Reuse is via **extracted components**, not `@apply` or copy-pasted blobs.
- [ ] Variants use **`cva`/`tv`** (typed), not ternary soup; conditional classes via **`cn`/tailwind-merge**.
- [ ] **`focus-visible:`** on all interactive elements; **`motion-reduce:`** on animations; `sr-only` used correctly.
- [ ] Utilities don't **fake semantics** — correct HTML elements/ARIA used ([`22`](./22-ACCESSIBILITY.md)).
- [ ] **Mobile-first** prefixes; intrinsic layout preferred.
- [ ] Classes **sorted** (Prettier plugin); no conflicting classes both applied.
- [ ] CSS output is **lean** (accurate content globs; no giant safelist).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Arbitrary-value ban | ESLint (`eslint-plugin-tailwindcss` `no-arbitrary-value`) / config to disallow. |
| Raw-palette ban | Lint requiring semantic tokens over `blue-600` etc. |
| Class sorting | `prettier-plugin-tailwindcss` in CI (auto-sort + check). |
| Conflict detection | `eslint-plugin-tailwindcss` no-contradicting-classname. |
| Focus/motion enforcement | Lint requiring focus-visible on interactive; motion-reduce on animations. |
| Config↔token sync | Generate Tailwind theme from the token source ([`15`](./15-DESIGN_TOKENS.md)). |
| CSS budget | Track generated CSS size in CI ([`35`](./35-PERFORMANCE.md)). |

---

## 11. References for Further Study
- **Official:** the Tailwind CSS documentation (theme configuration, responsive/state variants, JIT, `sr-only`, dark mode).
- **Variants & merging:** `class-variance-authority`, `tailwind-variants`, `tailwind-merge`, `clsx` docs.
- **Practitioner:** *Refactoring UI* (Adam Wathan/Steve Schoger) for the design thinking behind the utility scales.
- **Design system integration:** token-to-Tailwind patterns ([`15`](./15-DESIGN_TOKENS.md)); shadcn/ui as a reference for cva + component composition.
- **Cross-references:** [`06-COLOR_SYSTEM.md`](./06-COLOR_SYSTEM.md), [`08-SPACING_SYSTEM.md`](./08-SPACING_SYSTEM.md), [`14-COMPONENT_LIBRARY.md`](./14-COMPONENT_LIBRARY.md), [`15-DESIGN_TOKENS.md`](./15-DESIGN_TOKENS.md), [`21-RESPONSIVE_DESIGN.md`](./21-RESPONSIVE_DESIGN.md), [`22-ACCESSIBILITY.md`](./22-ACCESSIBILITY.md), [`30-REACT_GUIDE.md`](./30-REACT_GUIDE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Arbitrary values in production | ~0 (documented exceptions only) |
| Semantic-token utilities (vs. raw palette) | 100% |
| Tailwind theme sourced from design tokens | Yes (single source) |
| Component variants via cva/tv (not ternary) | 100% |
| Interactive elements with `focus-visible` | 100% (floor) |
| Animations with `motion-reduce` handling | 100% |
| Classes auto-sorted (Prettier plugin) | 100% |
| Generated CSS size | within budget, stable |

---

*End of `33-TAILWIND_GUIDE.md`.*
