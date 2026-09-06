# 34 — Framer Motion Guide (Motion for React)

### Implementing the Motion System in React

> *"Framer Motion makes hard animations easy — which means it also makes bad animations easy. The library is the brush; the Motion System is the discipline that stops you painting the whole wall."*

---

**Chapter type:** Phase 6 — Engineering Craft
**DRI:** Motion Designer + Principal React Engineer
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`23`](./23-MOTION_SYSTEM.md), [`24`](./24-MICRO_INTERACTIONS.md), [`22`](./22-ACCESSIBILITY.md), [`30`](./30-REACT_GUIDE.md), [`35`](./35-PERFORMANCE.md)
**Feeds:** component library motion ([`14`](./14-COMPONENT_LIBRARY.md)), product surfaces

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

This chapter defines how the studio uses **Framer Motion** (now published as *Motion for React*) — the studio's default library for React animation — to *implement* the Motion System ([`23`](./23-MOTION_SYSTEM.md)) and Micro-Interactions ([`24`](./24-MICRO_INTERACTIONS.md)). It is the practical, code-level companion to those design chapters: which APIs to use, how to wire motion tokens in, how to respect `prefers-reduced-motion`, how to animate performantly, and how to avoid the animation-spaghetti that libraries like this make dangerously easy.

The rule that governs this entire chapter: **Framer Motion is an implementation detail; the Motion System is the law.** Every duration, easing, and decision-to-animate still comes from [`23`](./23-MOTION_SYSTEM.md) (tokens, intent, cheap properties, reduced motion). This guide just shows how to express that law cleanly in React — and, crucially, when *not* to reach for the library at all (a CSS transition is often the right, lighter answer).

> Library APIs evolve; treat the official Motion docs as the source of truth over any snapshot here. The principles (tokens, intent, reduced-motion, performance, restraint) are the durable part.

---

## 2. Philosophy

**The library is the easy part; restraint is the job.** Framer Motion removes almost all friction from complex animation — spring physics, gestures, layout animations, orchestration are a few props away. That power is precisely the danger: it makes it trivial to animate everything, everywhere, all the time (Article VIII, [`23`](./23-MOTION_SYSTEM.md) P1). The studio's discipline is to keep the *Motion System's* bar — every animation has a job — and treat the library's capability as something to spend carefully, not a default to indulge.

**Reach for CSS first; reach for Framer Motion when CSS can't.** A hover state, a simple fade, a color transition — these are CSS transitions ([`33`](./33-TAILWIND_GUIDE.md)), lighter and requiring no JS. Framer Motion earns its bundle weight for what CSS *can't* do well: **enter/exit animations of unmounting components** (`AnimatePresence`), **layout/shared-element transitions** (`layout`, `layoutId`), **gesture-driven/interruptible spring physics** (drag, `whileDrag`), and **orchestrated sequences**. Using a JS animation library for a hover state is over-engineering (Article VIII).

**Tokens in, not magic numbers.** Just as components consume design tokens ([`15`](./15-DESIGN_TOKENS.md)), animations consume **motion tokens** ([`23`](./23-MOTION_SYSTEM.md)). Framer Motion's `transition` values (`duration`, `ease`) and reusable `variants` should reference the motion token set — centralized, not `duration: 0.37` scattered across files. This keeps motion consistent and tunable in one place (Article IV).

**Accessibility and performance are non-negotiable, even (especially) with a powerful library.** `prefers-reduced-motion` must be honored — Framer Motion gives us `useReducedMotion()` and `MotionConfig` to do it globally and correctly. Animations must stick to compositor-friendly properties (transform/opacity) to hit 60fps. A library that makes big, janky, motion-sickness-inducing animations easy still must produce animations that are safe and smooth (Article II, III; [`22`](./22-ACCESSIBILITY.md), [`35`](./35-PERFORMANCE.md)).

---

## 3. Principles

### Principle 1 — Motion System first; the library serves it
Intent, tokens, cheap properties, reduced motion, restraint all come from [`23`](./23-MOTION_SYSTEM.md).
> *Rationale:* The library is *how*, not *whether* or *how much*.

### Principle 2 — CSS first; Framer Motion for what CSS can't do
Use the library for exit animations, layout/shared-element, gestures/springs, orchestration — not hover/simple fades.
> *Rationale (Art. VIII, [`35`](./35-PERFORMANCE.md)):* Don't pay JS-animation cost for CSS-solvable motion.

### Principle 3 — Tokens in, not magic numbers
`transition` and `variants` reference motion tokens ([`23`](./23-MOTION_SYSTEM.md)).
> *Rationale (Art. IV):* Consistency + one-place tuning.

### Principle 4 — Respect reduced motion (globally)
Use `useReducedMotion()` / `MotionConfig reducedMotion="user"`; provide reduced/instant paths.
> *Rationale (Art. III, [`22`](./22-ACCESSIBILITY.md)):* Motion can harm; meaning never motion-only.

### Principle 5 — Animate cheap properties
Prefer `x/y/scale/opacity` (transform/opacity); avoid animating layout props directly.
> *Rationale ([`35`](./35-PERFORMANCE.md), [`23`](./23-MOTION_SYSTEM.md) P4):* Compositor-only = 60fps.

### Principle 6 — Keep motion out of the render hot path & mind the bundle
Import selectively / lazy-load heavy motion; don't cause re-render storms from animation state.
> *Rationale ([`30`](./30-REACT_GUIDE.md), [`35`](./35-PERFORMANCE.md)):* Animation shouldn't tax React or the bundle.

### Principle 7 — Reusable `variants`, not inline chaos
Define named variants (often derived from tokens) and reuse; avoid ad-hoc inline animate objects everywhere.
> *Rationale (Art. IV, [`43`](./43-CLEAN_CODE.md)):* Named, reusable, legible motion.

### Principle 8 — Client-only, boundary-aware
`motion` components are client components; keep them as small leaves in Server-Component trees ([`31`](./31-NEXTJS_GUIDE.md)).
> *Rationale (Art. II):* Don't turn whole pages into client bundles for one animation.

---

## 4. Best Practices

### 4.1 Wire motion tokens into a shared config ([`23`](./23-MOTION_SYSTEM.md))
```ts
// lib/motion.ts — single source for FM, sourced from motion tokens
export const transitions = {
  fast:  { duration: 0.15, ease: [0.2, 0, 0, 1] },   // = duration.fast / ease.standard
  base:  { duration: 0.25, ease: [0.2, 0, 0, 1] },
  slow:  { duration: 0.40, ease: [0, 0, 0, 1] },
  spring:{ type: "spring", stiffness: 400, damping: 32 },
} as const;

export const fadeInUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
} as const;
```

### 4.2 Global reduced-motion (do this once, app-wide)
```tsx
// app providers
import { MotionConfig } from "motion/react";
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>; // honors prefers-reduced-motion
}
```
```tsx
// and/or per-component when you need a custom reduced path:
const reduce = useReducedMotion();
<motion.div animate={{ x: reduce ? 0 : 100 }} transition={reduce ? { duration: 0 } : transitions.base} />
```
Meaning must never depend on motion alone ([`22`](./22-ACCESSIBILITY.md)); the reduced path must remain fully usable.

### 4.3 Exit animations — the classic "CSS can't do this" case
```tsx
import { AnimatePresence, motion } from "motion/react";
{open && (
  <AnimatePresence>
    <motion.div
      variants={fadeInUp} initial="hidden" animate="visible" exit="hidden"
    >
      {content}
    </motion.div>
  </AnimatePresence>
)}
```
`AnimatePresence` animates components as they *unmount* — something CSS handles poorly. This (plus layout + gestures) is where the library truly earns its place.

### 4.4 Layout & shared-element transitions
```tsx
<motion.div layout transition={transitions.base}>…</motion.div>          {/* animate layout changes */}
<motion.div layoutId="card-42">…</motion.div>  {/* shared element across views (spatial continuity, 23 P6) */}
```
Use for reordering lists, expanding cards, and shared-element route transitions — powerful for wayfinding ([`23`](./23-MOTION_SYSTEM.md) P6). Keep them short and interruptible.

### 4.5 Gestures & interruptible springs
```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={transitions.spring} />
<motion.div drag="x" dragConstraints={{ left: 0, right: 200 }} whileDrag={{ cursor: "grabbing" }} />
```
Springs shine for gesture-driven, interruptible motion ([`23`](./23-MOTION_SYSTEM.md) 4.7). Keep `whileHover` effects behind pointer capability (they map to real hover), and always pair interactive motion with keyboard-accessible behavior ([`22`](./22-ACCESSIBILITY.md)).

### 4.6 Orchestration (stagger) — kept short ([`23`](./23-MOTION_SYSTEM.md) 4.6)
```tsx
const list = { visible: { transition: { staggerChildren: 0.04 } } };
<motion.ul variants={list} initial="hidden" animate="visible">
  {items.map((i) => <motion.li key={i.id} variants={fadeInUp}>{i.label}</motion.li>)}
</motion.ul>
```
Stagger reads as a sequence — keep the *total* short so it never feels slow.

### 4.7 Scroll & viewport (use sparingly, safely)
`whileInView` for one-shot reveal-on-scroll (with `viewport={{ once: true }}`); `useScroll`/`useTransform` for scroll-linked effects. **Beware:** heavy scroll animation is a common perf + vestibular offender — keep it subtle, respect reduced motion, and don't scroll-jack ([`23`](./23-MOTION_SYSTEM.md) anti-patterns, Apple teardown caution in [`references/`](./references/README.md)).

### 4.8 Performance & bundle ([`35`](./35-PERFORMANCE.md), [`31`](./31-NEXTJS_GUIDE.md))
- Animate `x/y/scale/opacity` (not `width/height/top/left`); use `layout` for layout changes instead of animating box metrics.
- Keep `motion` components as **small client leaves** in RSC trees ([`31`](./31-NEXTJS_GUIDE.md)); lazy-load heavy/optional animation.
- Consider the lighter APIs / `LazyMotion` + `domAnimation` feature bundle to reduce weight where full features aren't needed.
- Profile animation-heavy views; watch for dropped frames and re-render storms.

### 4.9 Decision: Framer Motion or CSS?
```mermaid
flowchart TD
    A["Need to animate something"] --> Z{"Does it have a job? (23 P1)"}
    Z -->|No| STOP["Don't animate"]
    Z -->|Yes| B{"Exit of unmounting element? Layout/shared-element?<br/>Gesture/spring? Complex orchestration?"}
    B -->|No (hover/fade/color/simple)| C["Use CSS transition (33) — lighter"]
    B -->|Yes| D["Use Framer Motion — with tokens + reduced-motion + cheap props"]
```

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Framer Motion for hover/simple fades** | Over-engineering; JS cost for CSS-solvable motion. | P2, Art. VIII |
| **Magic-number transitions** (`duration: 0.37`) | Off-system; inconsistent; untunable. | P3 |
| **Ignoring reduced motion** | Motion sickness; excludes users. | P4, Art. III |
| **Animating layout props** (width/height/top) | Reflow jank; dropped frames. | P5 |
| **Animate-everything** (decorative, looping) | Distraction; cost; violates Motion System. | P1, [`23`](./23-MOTION_SYSTEM.md) |
| **Inline animate objects everywhere** | Unreadable, duplicated, drift. | P7 |
| **`"use client"` on whole pages** for one motion leaf | Bloats client bundle; kills RSC benefits. | P8, [`31`](./31-NEXTJS_GUIDE.md) |
| **Scroll-jacking / heavy parallax** | Perf + vestibular harm; hostile. | P4/P5, [`23`](./23-MOTION_SYSTEM.md) |
| **Meaning conveyed only by animation** | Lost for reduced-motion users. | P4, [`22`](./22-ACCESSIBILITY.md) |
| **Long durations** on small UI | Sluggish; delays user. | P1, [`23`](./23-MOTION_SYSTEM.md) P2 |

---

## 6. Real-World Examples

### Example A — CSS was the right tool (recap of restraint)
A team wrapped every button in `motion.button` with `whileHover` for a simple background fade — shipping the motion library into interactions a one-line CSS `transition` handles. Reverting hovers/fades to **CSS transitions** ([`33`](./33-TAILWIND_GUIDE.md)) and reserving Framer Motion for **exit animations and layout transitions** cut bundle weight and simplified the code. *Reach for the library only when CSS can't (Principle 2).*

### Example B — `MotionConfig` fixed reduced motion in one line
An app had rich Framer Motion animations but no reduced-motion handling — a WCAG issue and a nausea complaint. Wrapping the tree in **`<MotionConfig reducedMotion="user">`** (4.2) made *all* animations honor the user's OS preference instantly, with per-component `useReducedMotion()` for the few that needed a custom reduced path. *Do it globally, once (Principle 4; [`22`](./22-ACCESSIBILITY.md)).*

### Example C — Tokens tamed the drift
Transitions were scattered as `duration: 0.3`, `0.35`, `0.5`, `ease: "easeInOut"` across dozens of files — motion felt inconsistent. Centralizing a **`lib/motion.ts`** sourced from the motion tokens (4.1) and referencing it everywhere made motion coherent and globally tunable — change the token, retune the app (Principle 3; [`23`](./23-MOTION_SYSTEM.md)).

---

## 7. Common Mistakes

- **Using Framer Motion for CSS-solvable motion** (hover, simple fades, color).
- **Hardcoding durations/easings** instead of motion tokens.
- **Forgetting `prefers-reduced-motion`** (no `MotionConfig`/`useReducedMotion`).
- **Animating layout properties** directly instead of `x/y/scale`/`layout`.
- **Animating everything** — ignoring the Motion System's "intent" rule.
- **Inline animate/transition objects** duplicated everywhere (no variants).
- **Turning whole pages into client components** for one animated leaf.
- **Heavy scroll/parallax** that janks and induces motion sickness.
- **Ignoring the bundle cost** of full features when a lighter subset suffices.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Decide CSS vs. Framer Motion** for a given animation (default to CSS; justify library use).
- **Wire the shared motion config** (tokens → `transitions`/`variants`) and global `MotionConfig`.
- **Implement exit/layout/gesture/orchestration** animations correctly with cheap properties + reduced-motion paths.
- **Audit** for library-for-CSS-motion, magic numbers, missing reduced motion, layout-prop animation, inline-object sprawl, and client-boundary bloat.

### 8.2 Hard rules (Art. VIII, III; Motion System)
- **Defer to the Motion System** ([`23`](./23-MOTION_SYSTEM.md)): every animation has a stated intent; values come from **motion tokens** (no magic numbers).
- **Use CSS for CSS-solvable motion**; use Framer Motion only for exit/layout/gesture/orchestration — and say why.
- **Reduced motion honored** (global `MotionConfig` + per-component where needed); **meaning never motion-only**.
- **Animate cheap properties** (transform/opacity/`layout`), never layout props directly.
- **`motion` components stay small client leaves** ([`31`](./31-NEXTJS_GUIDE.md)); heavy motion lazy-loaded; bundle considered.
- **Reusable variants**, not inline sprawl.

### 8.3 Prompt example — implement an animation
```
ROLE: Motion Designer + React Engineer, bound by 00-CONSTITUTION + 34 (+23/22/31).
TASK: Implement <animation, e.g. modal enter/exit, list reorder, drag-to-dismiss>.
CONSTRAINTS:
  - First decide: can CSS do it? If yes, use CSS. If no (exit/layout/gesture/orchestration), use Framer Motion — state why.
  - State the animation's intent (23 P1); pull duration/ease from lib/motion tokens (no magic numbers).
  - Honor reduced motion (MotionConfig / useReducedMotion); provide a reduced/instant path; no motion-only meaning.
  - Animate x/y/scale/opacity or layout; keep the motion component a small "use client" leaf.
  - Use reusable variants.
OUTPUT: component (TSX) + variants/config + note on CSS-vs-FM decision + reduced-motion path + perf note.
```

### 8.4 Prompt example — audit
```
TASK: Audit Framer Motion usage for: library used where CSS suffices, magic-number transitions,
missing reduced-motion handling, animation of layout properties, animate-everything/decorative motion,
inline animate-object duplication, and "use client" boundaries placed too high. Output {file:line, issue, fix}.
```

---

## 9. Human Review Checklist

- [ ] Each animation has a **stated intent** and obeys the **Motion System** ([`23`](./23-MOTION_SYSTEM.md)).
- [ ] **CSS used** for CSS-solvable motion; Framer Motion reserved for exit/layout/gesture/orchestration (justified).
- [ ] **Motion tokens** used (no magic durations/easings); variants reused (no inline sprawl).
- [ ] **Reduced motion honored** (global `MotionConfig` + per-component); **no motion-only meaning**.
- [ ] **Cheap properties** animated (transform/opacity/`layout`); no layout-prop animation; 60fps.
- [ ] `motion` components are **small client leaves**; bundle impact considered / lazy-loaded where heavy ([`31`](./31-NEXTJS_GUIDE.md), [`35`](./35-PERFORMANCE.md)).
- [ ] Interactive motion has **keyboard-accessible** equivalents; hover behind pointer capability.
- [ ] Scroll/parallax (if any) is **subtle, reduced-motion-safe, non-scroll-jacking**.
- [ ] Durations are **short** for UI (≤300ms; longer only for large surfaces).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Reduced-motion enforcement | Lint/test requiring `MotionConfig`/`useReducedMotion` where animations exist ([`23`](./23-MOTION_SYSTEM.md)). |
| Token enforcement | Lint flagging inline `duration:`/`ease:` literals (must use motion tokens). |
| Cheap-property lint | Flag animating width/height/top/left via FM. |
| Client-boundary check | Detect oversized `"use client"` subtrees around motion ([`31`](./31-NEXTJS_GUIDE.md)). |
| Bundle budget | Track motion-library weight; suggest `LazyMotion`/CSS where possible ([`35`](./35-PERFORMANCE.md)). |
| Frame-rate checks | Automated FPS/long-frame checks on animation-heavy views. |
| Visual/reduced snapshots | Snapshot the reduced-motion variant in CI. |

---

## 11. References for Further Study
- **Official:** the Motion (Framer Motion) documentation — `motion` components, `variants`, `AnimatePresence`, `layout`/`layoutId`, gestures, `useReducedMotion`, `MotionConfig`, `LazyMotion`.
- **The design law it implements:** [`23-MOTION_SYSTEM.md`](./23-MOTION_SYSTEM.md) and [`24-MICRO_INTERACTIONS.md`](./24-MICRO_INTERACTIONS.md) (intent, tokens, restraint).
- **Craft:** Emil Kowalski's animation course/writing; Val Head on interface animation.
- **Performance & a11y:** web.dev high-performance animations; `prefers-reduced-motion` guidance ([`35`](./35-PERFORMANCE.md), [`22`](./22-ACCESSIBILITY.md)).
- **Cross-references:** [`22-ACCESSIBILITY.md`](./22-ACCESSIBILITY.md), [`23-MOTION_SYSTEM.md`](./23-MOTION_SYSTEM.md), [`24-MICRO_INTERACTIONS.md`](./24-MICRO_INTERACTIONS.md), [`30-REACT_GUIDE.md`](./30-REACT_GUIDE.md), [`31-NEXTJS_GUIDE.md`](./31-NEXTJS_GUIDE.md), [`33-TAILWIND_GUIDE.md`](./33-TAILWIND_GUIDE.md), [`35-PERFORMANCE.md`](./35-PERFORMANCE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Animations obeying the Motion System (intent + tokens) | 100% |
| Framer Motion used only where CSS can't suffice | 100% (justified) |
| Reduced-motion honored | 100% (floor) |
| Layout-property animations via FM | 0 (use transform/`layout`) |
| Magic-number transitions | 0 (motion tokens) |
| `motion` components as small client leaves | 100% |
| Animation frame rate (low-end) | ~60fps |
| Motion-only meaning | 0 |

---

*End of `34-FRAMER_MOTION_GUIDE.md`. Phase 6 (Engineering Craft) complete.*
