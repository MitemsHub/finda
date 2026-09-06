# 43 — Clean Code

### Readable, Maintainable Code at the Line Level

> *"Code is read far more often than it is written — and mostly by people who aren't you, at times you can't imagine, under pressure you won't be there to feel. Write for them. Clarity is a kindness."*

---

**Chapter type:** Phase 8 — Systems & Architecture
**DRI:** Software Architect + Principal Engineers
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`30`](./30-REACT_GUIDE.md)–[`32`](./32-TYPESCRIPT_GUIDE.md), [`41`](./41-CODE_ARCHITECTURE.md), [`42`](./42-FOLDER_STRUCTURE.md)
**Feeds:** [`44-TESTING.md`](./44-TESTING.md), [`46-CODE_REVIEW.md`](./46-CODE_REVIEW.md), [`49-MAINTENANCE.md`](./49-MAINTENANCE.md)

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

This chapter defines the studio's standard for **clean code at the line and function level** — naming, function design, comments, error handling, formatting, and the daily craft habits that make code readable and maintainable. It is the *micro* counterpart to architecture ([`41`](./41-CODE_ARCHITECTURE.md), macro boundaries) and folder structure ([`42`](./42-FOLDER_STRUCTURE.md), physical layout), and it directly enables testing ([`44`](./44-TESTING.md)) and effective code review ([`46`](./46-CODE_REVIEW.md)).

Clean code is not aesthetic fussiness; it is the primary determinant of how fast and safely a team (and its AI agents) can change software over years. It's where the Constitution's Article VIII (simplicity), Article VI (explainability), and the whole "write for the next person and the next agent" ethos ([`00`](./00-CONSTITUTION.md) 4.6) become concrete, everyday behavior.

---

## 2. Philosophy

**Code is read far more than it is written — optimize for the reader.** A line of code is written once and read dozens of times: during review, debugging, extension, and onboarding, often years later by someone with none of your context. Since reading is the dominant cost, we optimize ruthlessly for *legibility* over cleverness, brevity, or typing speed. The measure of clean code is not "how quickly could I write it?" but "how quickly can the next person understand it correctly?" (Article VI, [`00`](./00-CONSTITUTION.md) 4.6). Clarity is a gift to your future self and your teammates.

**The code should explain itself; comments explain *why*, not *what*.** Well-named functions and variables make most comments unnecessary — the code *reads* like its intent. Comments that restate what the code does (`// increment i`) are noise that rots (they drift from the code and lie). The valuable comment explains **why**: the non-obvious reason, the trade-off, the gotcha, the link to the ticket or spec. If you feel the need to comment *what* a block does, that's usually a signal to extract and name a function instead (Article VI — decisions must be explainable, and the best explanation is self-documenting code).

**Small, focused, single-purpose units.** Functions should do one thing; modules should have one responsibility ([`41`](./41-CODE_ARCHITECTURE.md) P1). Small units are easier to name, test, understand, reuse, and change. A 300-line function with five nesting levels is a place bugs hide and readers get lost. The discipline of "does one thing, does it well, at one level of abstraction" is the single most reliable driver of readable code — and it makes testing ([`44`](./44-TESTING.md)) natural rather than painful.

**Consistency removes cognitive load; boring is good.** When code across a codebase follows the same conventions — formatting, naming, error handling, patterns — the reader spends zero energy on *style* and all of it on *meaning*. We automate formatting (so it's never debated), standardize patterns (so there's one obvious way), and prefer familiar, boring constructs over clever novelty (Article V, VIII). "Clever" code that makes a reader stop and puzzle is a defect, however impressive. The goal is code so consistent and plain it becomes invisible — you read straight through to the intent.

---

## 3. Principles

### Principle 1 — Optimize for readability over cleverness
Clear beats clever, short, or fast-to-type. If it needs a puzzle to read, rewrite it.
> *Rationale (Art. VI, VIII):* Reading is the dominant cost.

### Principle 2 — Names reveal intent
Descriptive, precise, pronounceable names for variables, functions, types; no cryptic abbreviations.
> *Rationale:* Good names are the best documentation.

### Principle 3 — Functions do one thing, at one level of abstraction
Small, focused, single-purpose; extract when a function grows or mixes levels.
> *Rationale (Art. VIII, [`41`](./41-CODE_ARCHITECTURE.md)):* Small units are legible + testable.

### Principle 4 — Comments explain *why*, not *what*; prefer self-documenting code
Delete restate-the-code comments; keep rationale/gotcha comments; name things well instead.
> *Rationale (Art. VI):* What-comments rot; why-comments are gold.

### Principle 5 — Handle errors explicitly and meaningfully
No silent catches; fail clearly; use types/results for expected failures ([`32`](./32-TYPESCRIPT_GUIDE.md), [`37`](./37-SECURITY.md)).
> *Rationale:* Swallowed errors are invisible bugs.

### Principle 6 — DRY, but not at the cost of clarity (avoid wrong abstractions)
Remove real duplication; tolerate a little over the *wrong* abstraction (WET beats a bad DRY).
> *Rationale (Art. VIII, [`41`](./41-CODE_ARCHITECTURE.md)):* Premature DRY couples unrelated things.

### Principle 7 — Consistency + automated formatting
One style, enforced by tooling (Prettier/ESLint); never hand-format or debate style.
> *Rationale (Art. V):* Consistency frees attention for meaning.

### Principle 8 — Leave it cleaner than you found it (Boy Scout Rule)
Small, continuous improvements; refactor as you touch code (safely, with tests).
> *Rationale (Art. IX, [`50`](./50-CONTINUOUS_IMPROVEMENT.md)):* Prevents rot without big rewrites.

### Principle 9 — Delete dead code; keep it lean
Remove unused code, commented-out blocks, and needless complexity — version control remembers.
> *Rationale (Art. VIII):* Dead code confuses + rots.

---

## 4. Best Practices

### 4.1 Naming (the highest-leverage clean-code skill)
```ts
// ❌ Cryptic, misleading, needs a comment to understand
const d = new Date().getTime() - u.c;           // ms since user created?
function calc(a, b, t) { /* … */ }

// ✅ Names reveal intent — no comment needed
const millisSinceSignup = Date.now() - user.createdAt.getTime();
function calculatePriceWithTax(basePrice: number, taxRate: number): number { /* … */ }
```
- **Variables/properties:** nouns describing the value (`activeUsers`, `isLoading`, `hasPermission`). Booleans read as questions (`is/has/can/should`).
- **Functions:** verbs describing the action + result (`fetchProjects`, `formatCurrency`, `validateEmail`).
- Avoid abbreviations (`usr`, `calc`, `tmp`), single letters (except tiny loop scopes), and misleading names. Consistent domain vocabulary ([`03`](./03-BRAND_STRATEGY.md)/[`27`](./27-INFORMATION_ARCHITECTURE.md) terminology).

### 4.2 Functions: small, focused, few args, few nesting levels
```ts
// ✅ One thing, one level of abstraction, early returns to reduce nesting
function getShippingCost(order: Order): number {
  if (order.isDigital) return 0;                       // guard clauses first
  if (order.total >= FREE_SHIPPING_THRESHOLD) return 0;
  return calculateShippingByWeight(order.weight);       // delegate the detail
}
```
- **Small:** if you must scroll to read it, or it has many nesting levels, extract sub-functions.
- **Few parameters:** ~0–3; group related args into an object; avoid boolean "flag" params (they signal the function does two things — split it).
- **Guard clauses / early returns** over deep `if/else` pyramids.
- **One level of abstraction per function** (don't mix high-level orchestration with low-level detail in the same body).
- **Pure where possible** (deterministic, no side effects) → easy to test ([`44`](./44-TESTING.md), [`41`](./41-CODE_ARCHITECTURE.md)).

### 4.3 Comments: why, not what
```ts
// ❌ Restates the code (noise; will rot)
i++; // increment i

// ✅ Explains the non-obvious WHY
// Stripe rounds half-up; we must match it exactly or reconciliation fails (see FIN-1423).
const amount = roundHalfUp(raw, 2);

// ✅ Flags a gotcha / trade-off (Article XII — break a rule loudly, in a comment)
// eslint-disable-next-line no-await-in-loop -- rate-limited API requires sequential calls
```
Keep: rationale, trade-offs, gotchas, links to tickets/specs, `TODO(owner): …`. Delete: what-restatement, commented-out code (version control has it), stale comments.

### 4.4 Error handling ([`32`](./32-TYPESCRIPT_GUIDE.md), [`37`](./37-SECURITY.md))
```ts
// ❌ Silent swallow — an invisible bug
try { await save(); } catch {}

// ✅ Handle meaningfully: log, translate, or rethrow — never swallow silently
try {
  await save();
} catch (err) {
  logger.error("Failed to save project", { err, projectId });
  throw new AppError("SAVE_FAILED", "Could not save. Please try again.");
}
```
- Never swallow errors silently; handle, translate to a meaningful error, or rethrow.
- Model **expected** failures with types/results (discriminated unions, [`32`](./32-TYPESCRIPT_GUIDE.md)); reserve exceptions for *exceptional* cases.
- Fail securely — no sensitive info in error messages to users ([`37`](./37-SECURITY.md)).

### 4.5 DRY vs. the wrong abstraction (Principle 6, [`41`](./41-CODE_ARCHITECTURE.md))
Eliminate *genuine* duplication (the same knowledge in two places). But **don't** DRY together code that merely *looks* similar but represents different concepts — that couples unrelated things and hurts when they diverge. Rule of thumb: duplicate twice; extract on the *third* real occurrence, when the shared shape is clear. "A little copying is far cheaper than the wrong abstraction."

### 4.6 Formatting & consistency (automate it)
Use **Prettier** (auto-format on save + CI) so formatting is never written by hand or argued in review. Use **ESLint** for correctness/style rules ([`32`](./32-TYPESCRIPT_GUIDE.md)/[`30`](./30-REACT_GUIDE.md)). Consistent import order, file structure, and patterns. Style is a solved problem — solve it with tools, spend human attention on logic ([`46`](./46-CODE_REVIEW.md)).

### 4.7 Manage complexity actively
- Keep **cyclomatic complexity** and nesting low (extract, guard-clause, simplify conditionals).
- Replace magic numbers/strings with **named constants** (`FREE_SHIPPING_THRESHOLD`, not `50`).
- Prefer clear, boring constructs over clever one-liners; avoid deeply chained/nested ternaries.
- Simplify conditionals (extract predicates: `if (isEligibleForRefund(order))`).

### 4.8 The Boy Scout Rule & dead code (Principles 8, 9)
When you touch a file, make a small improvement (a clearer name, an extracted function) — safely, backed by tests ([`44`](./44-TESTING.md)). Delete dead code, unused exports, and commented-out blocks immediately (tools: `knip`/`ts-prune`, [`49`](./49-MAINTENANCE.md)). Continuous small cleanups prevent the rot that leads to "we need a rewrite" (Article IX).

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Cryptic names** (`d`, `tmp`, `calc`, `data2`) | Forces readers to reverse-engineer intent. | P2 |
| **God functions** (long, many responsibilities, deep nesting) | Bug-prone; unreadable; untestable. | P3 |
| **Boolean flag params** (`render(true, false)`) | Function does 2+ things; call site opaque. | P3 |
| **What-comments / commented-out code** | Noise; rots; lies over time. | P4, P9 |
| **Silent catch** (`catch {}`) | Invisible bugs. | P5 |
| **Wrong/premature abstraction** (DRY-ing unlike things) | Couples unrelated code; painful divergence. | P6, [`41`](./41-CODE_ARCHITECTURE.md) |
| **Magic numbers/strings** | Unexplained; error-prone; hard to change. | 4.7 |
| **Clever one-liners / nested ternaries** | Impressive, unreadable. | P1 |
| **Hand-formatting / style debates** | Wastes attention; inconsistent. | P7 |
| **Deep nesting** (arrow-code pyramids) | Hard to follow; hides logic. | P3, 4.7 |
| **Dead code left in** | Confuses; rots; false paths. | P9 |
| **Inconsistent patterns** across the codebase | Constant re-learning. | P7 |

---

## 6. Real-World Examples

### Example A — Naming turned a comment into no-comment
A line read `const d = Date.now() - u.c; // ms since user was created`. The comment existed *because* the code was cryptic. Renaming to `const millisSinceSignup = Date.now() - user.createdAt.getTime();` made the comment redundant — the code now *says* what it means (Principles 2, 4). Multiply that across a codebase and comments shrink while clarity grows. *The best comment is a better name.*

### Example B — Extracting sub-functions tamed a god function
A 250-line `processOrder()` did validation, pricing, tax, inventory, payment, and email — six responsibilities, five nesting levels, impossible to test in parts. Extracting `validateOrder`, `calculateTotals`, `reserveInventory`, `chargePayment`, `sendConfirmation` — each doing one thing — made `processOrder` a readable 15-line orchestration, each piece unit-testable in isolation ([`44`](./44-TESTING.md), Principle 3). *Small, single-purpose functions are the workhorse of clean code.*

### Example C — The silent catch that hid an outage
`try { await chargeCard(); } catch {}` swallowed payment failures silently — orders were marked "paid" that never charged, discovered only at month-end reconciliation. Replacing it with **explicit handling** (log with context + throw a meaningful `AppError`, 4.4) surfaced failures immediately to logging/alerting and to the user (Principle 5; [`37`](./37-SECURITY.md)/[`48`](./48-MONITORING.md)). *A swallowed error is an invisible, compounding bug.*

---

## 7. Common Mistakes

- **Cryptic/abbreviated names** that require reverse-engineering.
- **Functions that do too much** (long, deeply nested, many responsibilities).
- **Boolean flag parameters** instead of separate functions.
- **What-comments** and leaving **commented-out code** around.
- **Swallowing errors** silently.
- **Over-DRYing** dissimilar code into the wrong abstraction (or never removing real duplication).
- **Magic numbers/strings** instead of named constants.
- **Clever, unreadable code** (dense one-liners, nested ternaries).
- **Debating/hand-doing formatting** instead of automating it.
- **Leaving dead code** and skipping small cleanups.

---

## 8. AI Implementation Guidance

Clean code is where AI is both strong (it can generate consistent, well-named code) and risky (it can generate plausible clever/complex code, or over-abstract). The bar: AI output must read as if a careful senior engineer wrote it.

### 8.1 Where agents help
- **Generate clean code**: intent-revealing names, small single-purpose functions, guard clauses, named constants, meaningful error handling.
- **Refactor**: rename cryptic identifiers, extract god functions, remove flag params, delete dead code + what-comments.
- **Audit** for the anti-patterns in §5 (naming, complexity, silent catches, magic values, wrong abstractions).
- **Add why-comments** where rationale is non-obvious; remove what-comments.

### 8.2 Hard rules (Art. VI, VIII)
- **Readability over cleverness** — the agent does not produce dense/clever code that needs puzzling out; boring + clear wins.
- **Intent-revealing names**; no cryptic abbreviations; booleans as questions.
- **Small, single-purpose functions** (one level of abstraction, ~0–3 args, no boolean-flag params, guard clauses over deep nesting).
- **Comments explain why, not what**; the agent prefers a better name/extraction over a what-comment; no commented-out code.
- **No silent error swallowing** — handle/translate/rethrow meaningfully; model expected failures with types ([`32`](./32-TYPESCRIPT_GUIDE.md)).
- **No magic numbers/strings** (named constants); **no premature/wrong abstraction** (concrete-first, Art. VIII/[`41`](./41-CODE_ARCHITECTURE.md)); **deletes dead code**.
- Output is **auto-formatted (Prettier) + lint-clean** and consistent with existing patterns (Art. V).

### 8.3 Prompt example — write/refactor cleanly
```
ROLE: Principal Engineer, bound by 00-CONSTITUTION + 43 (+32/41).
TASK: Implement (or refactor) <function/module> cleanly.
CONSTRAINTS:
  - Intent-revealing names; small single-purpose functions (one level of abstraction, ≤3 args, no flag params).
  - Guard clauses over deep nesting; named constants (no magic numbers/strings).
  - Comments explain WHY only (or none if self-documenting); no commented-out code.
  - Meaningful error handling (no silent catch); model expected failures with types.
  - No premature abstraction (concrete-first); delete dead code. Prettier/ESLint-clean.
OUTPUT: the code + a one-line note on any non-obvious decision (as a why-comment or ADR pointer).
```

### 8.4 Prompt example — audit
```
TASK: Review this code for clean-code issues: cryptic names, god functions / deep nesting / flag params,
what-comments or commented-out code, silent error swallowing, magic numbers/strings, clever-unreadable
constructs, wrong/premature abstractions, and dead code. Output {location, issue, suggested rewrite},
and refactor the worst offender with before/after.
```

---

## 9. Human Review Checklist

- [ ] **Names reveal intent** (no cryptic abbreviations; booleans read as questions).
- [ ] **Functions are small + single-purpose** (one level of abstraction, few args, no flag params, guard clauses).
- [ ] **Comments explain why**, not what; **no commented-out/dead code**; no stale comments.
- [ ] **Errors handled meaningfully** (no silent catches); expected failures modeled with types ([`32`](./32-TYPESCRIPT_GUIDE.md)); fails securely ([`37`](./37-SECURITY.md)).
- [ ] **No magic numbers/strings** (named constants).
- [ ] **Real duplication removed**; no wrong/premature abstraction (concrete-first, [`41`](./41-CODE_ARCHITECTURE.md)).
- [ ] Reads as **clear, boring, consistent** — no clever puzzles; complexity/nesting kept low.
- [ ] **Auto-formatted + lint-clean**; consistent with codebase patterns.
- [ ] The change **left the code cleaner** than before (Boy Scout Rule) where reasonable.
- [ ] A newcomer could **understand it without asking** (the ultimate test).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Formatting | Prettier (format-on-save + CI check); zero style debates. |
| Linting | ESLint (correctness/complexity/naming rules) + typescript-eslint ([`32`](./32-TYPESCRIPT_GUIDE.md)); block on errors. |
| Complexity limits | Cyclomatic-complexity / max-depth / max-lines lint rules. |
| Dead-code detection | `knip` / `ts-prune` for unused files/exports ([`49`](./49-MAINTENANCE.md)). |
| Magic-number lint | Rule flagging unexplained literals. |
| Silent-catch lint | Rule flagging empty catch blocks. |
| Naming/consistency | Lint for naming conventions ([`42`](./42-FOLDER_STRUCTURE.md)). |
| Pre-commit | Husky + lint-staged running format + lint on staged files. |

> Automate the mechanical (formatting, complexity, dead code) so human review ([`46`](./46-CODE_REVIEW.md)) focuses on *design and intent*.

---

## 11. References for Further Study
- **Foundational:** Robert C. Martin, *Clean Code*; Kent Beck, "Tidy First?"; *The Pragmatic Programmer* (Hunt & Thomas).
- **Complexity & design:** John Ousterhout, *A Philosophy of Software Design* (deep modules, complexity); *Refactoring* (Martin Fowler) for safe cleanup catalog.
- **Naming & abstraction:** the "wrong abstraction" essay (Sandi Metz); naming-things practitioner literature.
- **Tooling:** Prettier + ESLint + typescript-eslint docs; pre-commit (Husky/lint-staged).
- **Cross-references:** [`30-REACT_GUIDE.md`](./30-REACT_GUIDE.md), [`32-TYPESCRIPT_GUIDE.md`](./32-TYPESCRIPT_GUIDE.md), [`41-CODE_ARCHITECTURE.md`](./41-CODE_ARCHITECTURE.md), [`42-FOLDER_STRUCTURE.md`](./42-FOLDER_STRUCTURE.md), [`44-TESTING.md`](./44-TESTING.md), [`46-CODE_REVIEW.md`](./46-CODE_REVIEW.md), [`49-MAINTENANCE.md`](./49-MAINTENANCE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Lint/format violations in CI | 0 (blocking) |
| Functions exceeding complexity/length thresholds | 0 (or justified) |
| Silent catch blocks | 0 |
| Magic numbers/strings in logic | ~0 (named constants) |
| Commented-out / dead code | 0 |
| What-comments (vs. why-comments) | ~0 |
| Newcomer comprehension without asking (review signal) | high |
| Rework due to unreadable/unmaintainable code | ↓ trend |

---

*End of `43-CLEAN_CODE.md`. Phase 8 (Systems & Architecture) complete.*
