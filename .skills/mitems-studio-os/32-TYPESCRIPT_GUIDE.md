# 32 — TypeScript Guide

### Strict Typing, Inference, and Making Invalid States Unrepresentable

> *"Types are not paperwork. They are the cheapest tests you'll ever write — they run on every keystroke, cover every path, and never go stale. Let the compiler do the work."*

---

**Chapter type:** Phase 6 — Engineering Craft
**DRI:** TypeScript Expert + Frontend Architect
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`30`](./30-REACT_GUIDE.md), [`41`](./41-CODE_ARCHITECTURE.md), [`43`](./43-CLEAN_CODE.md)
**Feeds:** every code chapter — TypeScript is the studio's default language ([`00`](./00-CONSTITUTION.md))

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

This chapter defines how the studio writes **TypeScript** — the strictness settings, typing patterns, and design techniques that turn the type system from a nuisance into the codebase's strongest safety net. TypeScript is the studio's default language for all application code ([`00`](./00-CONSTITUTION.md) engineering philosophy); this guide is the standard every `.ts`/`.tsx` file is held to.

It underpins the React ([`30`](./30-REACT_GUIDE.md)) and Next.js ([`31`](./31-NEXTJS_GUIDE.md)) guides (typed props, actions, data) and supports clean code ([`43`](./43-CLEAN_CODE.md)) and architecture ([`41`](./41-CODE_ARCHITECTURE.md)). The central goal: use types not merely to *describe* code but to **make invalid states unrepresentable** — so whole classes of bugs become impossible to write, caught at compile time rather than in production.

---

## 2. Philosophy

**Types are the cheapest, best-covered tests you have.** A type check runs on every save, covers every code path (not just the ones you thought to test), never goes stale, and documents intent inline. A well-typed function signature is a proof: *given these inputs, you will get this output, or it won't compile.* We treat the type system as a first-line correctness tool ([`44`](./44-TESTING.md) covers the rest), and we invest in types accordingly (Article VI — explainability; the type *is* the contract).

**Make invalid states unrepresentable.** The most powerful thing TypeScript offers is the ability to encode business rules into the type system so that illegal combinations *cannot be constructed*. A request that is "loading" cannot also have "data"; an icon-only button cannot exist without a label. Rather than writing runtime guards and hoping every caller remembers them, we shape the types (discriminated unions, branded types, `never`) so the compiler refuses the bad state. This is the difference between "we validate this" and "this cannot happen."

**Strict, always — `any` is a hole in the roof.** We run `strict` mode with no compromises. Every `any` is a place where type safety silently stops — and worse, it *spreads* (anything touching an `any` becomes effectively untyped). `any` is not "I'll type it later"; it's "I've disabled the safety net here." When the type is genuinely unknown, the honest tool is `unknown` (which forces you to narrow before use), not `any`. Escaping the type system is a deliberate, rare, commented decision (Article XII — break rules loudly).

**Infer what you can; annotate what you must.** TypeScript's inference is powerful — over-annotating is noise that fights the compiler and drifts from reality. The rule: **annotate the boundaries** (function parameters, return types of exported/public functions, public data shapes) and **let inference handle the interior** (local variables, most return types). Explicit types at the edges make contracts clear and errors local; inference in the middle keeps code clean and self-updating.

---

## 3. Principles

### Principle 1 — `strict: true`, no exceptions
Enable all strict flags; treat type errors as build failures.
> *Rationale:* Strictness is where TypeScript's value lives; half-strict is half-safe.

### Principle 2 — Ban `any`; use `unknown` at true boundaries
`any` disables safety and spreads; `unknown` forces narrowing.
> *Rationale (Art. VI):* `any` is an un-typed hole; `unknown` is honest.

### Principle 3 — Make invalid states unrepresentable
Model with discriminated unions, `never`, branded types, and exhaustive checks.
> *Rationale:* The best bug is one the compiler refuses to let you write.

### Principle 4 — Type the boundaries; infer the interior
Annotate params, public return types, and public data shapes; let inference do the rest.
> *Rationale:* Contracts explicit at edges; clean + self-updating inside.

### Principle 5 — Validate external data at runtime, then trust types inside
Parse untrusted input (API, forms, env) with a schema (e.g. Zod) at the boundary; internal code trusts the resulting types.
> *Rationale (Art. III, [`37`](./37-SECURITY.md)):* Types are compile-time only; external data must be checked at runtime.

### Principle 6 — Prefer precise types over loose ones
Unions/literals over `string`; `readonly` where data shouldn't mutate; avoid over-wide types.
> *Rationale:* Precision catches more bugs and documents intent.

### Principle 7 — Types live near their domain; share via well-named modules
Co-locate types with their feature; export shared/domain types deliberately ([`41`](./41-CODE_ARCHITECTURE.md), [`42`](./42-FOLDER_STRUCTURE.md)).
> *Rationale:* Findable, cohesive, non-duplicated types.

### Principle 8 — Escape hatches are rare, deliberate, and commented
`any`, `as`, `!`, `@ts-ignore` require justification (Article XII).
> *Rationale:* Silent escapes rot the type safety of everything around them.

---

## 4. Best Practices

### 4.1 The strict baseline (`tsconfig.json`)
```jsonc
{
  "compilerOptions": {
    "strict": true,                       // the big one (implies the flags below)
    "noUncheckedIndexedAccess": true,     // arr[i] is T | undefined — catches OOB
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": true                  // pragmatic: don't type-check deps
  }
}
```
`tsc --noEmit` runs in CI and blocks on any error (§10).

### 4.2 Make invalid states unrepresentable — the core technique
```ts
// ❌ Loose: illegal combinations are possible (loading AND data AND error)
type State = { loading: boolean; data?: User; error?: string };

// ✅ Discriminated union: only valid states exist
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User }   // data ONLY exists here
  | { status: "error"; error: string }; // error ONLY exists here

function render(s: State) {
  switch (s.status) {
    case "idle": return null;
    case "loading": return <Spinner/>;
    case "success": return <Profile user={s.data}/>;  // s.data is typed, guaranteed
    case "error": return <Error message={s.error}/>;
    default: return assertNever(s);                     // exhaustiveness (see 4.3)
  }
}
```

### 4.3 Exhaustiveness with `never`
```ts
function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}
// If a new State variant is added, the switch fails to compile until handled.
```

### 4.4 Branded types (nominal typing for IDs/values)
```ts
type UserId = string & { readonly __brand: "UserId" };
type OrderId = string & { readonly __brand: "OrderId" };
// Now you can't accidentally pass an OrderId where a UserId is expected —
// even though both are strings at runtime.
```

### 4.5 Validate external data at the boundary (Zod)
```ts
import { z } from "zod";
const User = z.object({ id: z.string(), name: z.string(), email: z.string().email() });
type User = z.infer<typeof User>;           // single source of truth: schema → type

export async function getUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return User.parse(await res.json());       // runtime-validated; typed thereafter
}
```
Do this for API responses, form input ([`13`](./13-FORM_DESIGN.md)), and environment variables. Inside the app, trust the types; at the edge, verify.

### 4.6 Utility types & generics (use, don't abuse)
```ts
type PublicUser = Omit<User, "passwordHash">;
type PartialUpdate = Partial<Pick<User, "name" | "email">>;
const roles = ["admin", "editor", "viewer"] as const;
type Role = (typeof roles)[number];          // "admin" | "editor" | "viewer"
```
Reach for `Partial`/`Pick`/`Omit`/`Record`/`ReturnType` before hand-writing derived types. Use generics for genuinely reusable abstractions — but stop when a signature becomes unreadable ([`43`](./43-CLEAN_CODE.md); Article VIII — clever generics can be a smell).

### 4.7 React typing ([`30`](./30-REACT_GUIDE.md))
```ts
type ButtonProps =
  | ({ iconOnly?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ iconOnly: true; "aria-label": string } & React.ButtonHTMLAttributes<HTMLButtonElement>);
// iconOnly buttons can't compile without aria-label (a11y enforced by types, cf. 12/14)
```
Type event handlers precisely (`React.ChangeEvent<HTMLInputElement>`); avoid `React.FC` if you prefer explicit `children`; type hooks' returns.

### 4.8 `type` vs `interface`, `readonly`, and const assertions
- Use `interface` for object/public API shapes that may be extended; `type` for unions, primitives, mapped/conditional types. Be consistent per codebase ([`43`](./43-CLEAN_CODE.md)).
- `readonly` arrays/props where mutation isn't intended.
- `as const` for literal tuples/objects to get precise literal types.

### 4.9 Escape hatches — the rare, loud exceptions
```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 3rd-party lib has no types; issue #123
const legacy = untypedLib.doThing() as unknown as KnownShape; // narrow via unknown, comment why
```
`as`, `!`, `any`, `@ts-ignore` each need a written reason (Article XII). Prefer fixing the type; escaping is last resort.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **`any` (explicit or implicit)** | Disables + spreads un-safety. | P2 |
| **`strict` off / flags disabled** | Forfeits most of TS's value. | P1 |
| **Boolean/loose state** (`loading/data/error` flags) | Illegal combos representable → bugs. | P3 |
| **`as` casting to silence errors** | Lies to the compiler; hides real bugs. | P8 |
| **Trusting external data without runtime validation** | Types don't exist at runtime; crashes/security holes. | P5, Art. III |
| **Over-annotating** (typing every inferable local) | Noise; drifts from reality. | P4 |
| **Over-wide types** (`string` for a known enum) | Misses bugs; poor docs. | P6 |
| **`@ts-ignore` without reason** | Silent hole; rots surrounding safety. | P8, Art. XII |
| **Unreadable generic gymnastics** | Cleverness over clarity. | P6, Art. VIII |
| **Duplicated/ad-hoc types** for the same concept | Drift; inconsistency. | P7 |
| **Non-null assertion `!` reflexively** | Suppresses real null risks. | P8 |

---

## 6. Real-World Examples

### Example A — Discriminated union deleted a class of bugs
An async view used `{ loading, data, error }` booleans; production showed a spinner *and* stale data because `loading` and `data` were both truthy during a refetch. Modeling it as a **discriminated union** (4.2) made that state literally impossible to construct — and the exhaustive `switch` (4.3) meant a later "empty" variant couldn't be forgotten (the compiler demanded it). *The fix wasn't a guard; it was a better type (Principle 3).*

### Example B — Runtime validation caught the API drift
An app trusted an API to return `{ price: number }`. The backend changed `price` to a string; TypeScript couldn't catch it (types are compile-time) and the UI showed `NaN`. Adding **Zod validation at the boundary** (4.5) turned the drift into a clear, logged parse error at the edge instead of a silent corruption deep in the UI — and the schema became the single source of truth for the type (Principle 5; [`37`](./37-SECURITY.md)).

### Example C — Type-level a11y enforcement
Icon-only buttons kept shipping without `aria-label` despite review reminders. Rather than rely on humans, the team made `iconOnly: true` **require** `aria-label` via a discriminated union (4.7) — the omission became a **compile error**. Zero further instances shipped. *Encode the rule in the type and the compiler enforces it forever (Principle 3; [`12`](./12-BUTTON_DESIGN.md)/[`22`](./22-ACCESSIBILITY.md)).*

---

## 7. Common Mistakes

- **Using `any`** (or leaving implicit `any`) instead of `unknown` + narrowing.
- **Relaxing `strict`** to make errors go away.
- **Modeling state with booleans** where a discriminated union belongs.
- **`as`-casting** to silence the compiler instead of fixing the type.
- **Trusting external data** (API/env/forms) without runtime validation.
- **Over-annotating** inferable code; fighting inference.
- **Over-wide types** (`string`/`number`) for known finite sets.
- **`@ts-ignore`/`!` without justification.**
- **Clever, unreadable generics** that no one can maintain.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Design types that make invalid states unrepresentable** (discriminated unions, branded types, exhaustive `switch` + `assertNever`).
- **Generate Zod schemas + inferred types** for API/form/env boundaries.
- **Refactor `any`/loose types** into precise ones; add exhaustiveness.
- **Audit** for `any`, `as`, `@ts-ignore`, over-wide types, unvalidated boundaries, and boolean-state smells.
- **Tighten `tsconfig`** and fix the resulting errors.

### 8.2 Hard rules (Art. VI, III, VIII, XII)
- **Never introduce `any`** (explicit or implicit); use `unknown` + narrowing at boundaries.
- Keeps **`strict: true`** (and the extra flags); type errors are failures.
- **Models state so invalid combinations can't exist**; adds exhaustive checks.
- **Validates all external data at runtime** (schema) before trusting types ([`37`](./37-SECURITY.md)).
- **Annotates boundaries, infers interiors**; prefers precise types; avoids unreadable generics (Art. VIII).
- Any **escape hatch** (`as`/`!`/`@ts-ignore`) includes a written reason (Art. XII).

### 8.3 Prompt example — model a domain safely
```
ROLE: TypeScript Expert, bound by 00-CONSTITUTION + 32.
TASK: Model the type(s) for <feature/state>.
CONSTRAINTS:
  - Make invalid states unrepresentable (discriminated unions / branded types / never).
  - Add an exhaustive handler (switch + assertNever).
  - For any external data (API/form/env), provide a Zod schema + inferred type + boundary parse.
  - strict: true assumptions; no any; precise (literals/unions/readonly) over wide types.
  - Annotate public boundaries; infer interiors; keep generics readable.
OUTPUT: types + schema + example usage + a note on which illegal states are now impossible.
```

### 8.4 Prompt example — audit
```
TASK: Audit for: any (explicit/implicit), as-casts silencing errors, @ts-ignore/! without reason,
over-wide types for finite sets, boolean-flag state that should be a union, and external data used
without runtime validation. Output {file:line, issue, fix}; refactor the top 3 with before/after.
```

---

## 9. Human Review Checklist

- [ ] **`strict: true`** (+ recommended flags); `tsc --noEmit` passes in CI.
- [ ] **No `any`** (explicit or implicit); `unknown` + narrowing used at true boundaries.
- [ ] **Invalid states are unrepresentable** (unions/branded/`never`); exhaustive handling with `assertNever`.
- [ ] **External data validated at runtime** (schema) before types are trusted.
- [ ] Types are **precise** (literals/unions/`readonly`), not over-wide.
- [ ] **Boundaries annotated, interiors inferred**; no over-annotation.
- [ ] Generics are **readable** and justified (no gymnastics).
- [ ] Shared/domain types are **co-located and non-duplicated** ([`41`](./41-CODE_ARCHITECTURE.md), [`42`](./42-FOLDER_STRUCTURE.md)).
- [ ] Every **escape hatch** (`as`/`!`/`@ts-ignore`) has a written justification.
- [ ] React props/events/hooks fully typed; type-level constraints used for invariants (e.g. a11y).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Type check | `tsc --noEmit` in CI; block on any error. |
| `any`/escape-hatch lint | `@typescript-eslint` (`no-explicit-any`, `no-non-null-assertion`, ban-ts-comment). |
| Boundary validation | Lint/convention requiring schema parse for API/env/form inputs. |
| Strictness enforcement | CI check that `strict` + flags aren't weakened. |
| Dead-type detection | `ts-prune`/knip to find unused exported types. |
| Schema↔type sync | Zod `infer` as single source of truth (no hand-duplicated types). |
| Exhaustiveness | `assertNever` pattern + `noFallthroughCasesInSwitch`. |

---

## 11. References for Further Study
- **Official:** the TypeScript Handbook (typescriptlang.org) — narrowing, unions, generics, utility types.
- **Design technique:** "Making Impossible States Impossible" (Elm/TS community); "Parse, don't validate" (boundary validation philosophy).
- **Runtime validation:** Zod docs (schema → type inference); the broader runtime-schema ecosystem.
- **Deep dives:** *Effective TypeScript* (Dan Vanderkam); Matt Pocock's TypeScript material.
- **Cross-references:** [`13-FORM_DESIGN.md`](./13-FORM_DESIGN.md), [`30-REACT_GUIDE.md`](./30-REACT_GUIDE.md), [`31-NEXTJS_GUIDE.md`](./31-NEXTJS_GUIDE.md), [`37-SECURITY.md`](./37-SECURITY.md), [`40-API_DESIGN.md`](./40-API_DESIGN.md), [`41-CODE_ARCHITECTURE.md`](./41-CODE_ARCHITECTURE.md), [`43-CLEAN_CODE.md`](./43-CLEAN_CODE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| `strict: true` (+ flags) enabled | Yes (floor) |
| `any` occurrences (explicit/implicit) | 0 |
| `tsc` errors in CI | 0 (blocking) |
| External data validated at runtime | 100% of boundaries |
| Async/multi-state modeled as discriminated unions | 100% |
| Escape hatches with written justification | 100% |
| Type coverage (typed vs. total) | ≥ 99% |
| Duplicated/ad-hoc domain types | trend → 0 |

---

*End of `32-TYPESCRIPT_GUIDE.md`.*
