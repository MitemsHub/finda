# 42 — Folder Structure

### The Physical Layout of a Scalable Codebase

> *"Where a file lives is a decision you make once and pay for a thousand times. A good structure makes the right place obvious; a bad one makes every 'where does this go?' a small argument."*

---

**Chapter type:** Phase 8 — Systems & Architecture
**DRI:** Frontend Architect + Software Architect
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`14`](./14-COMPONENT_LIBRARY.md), [`31`](./31-NEXTJS_GUIDE.md), [`41`](./41-CODE_ARCHITECTURE.md)
**Feeds:** [`43-CLEAN_CODE.md`](./43-CLEAN_CODE.md), [`44-TESTING.md`](./44-TESTING.md), [`46-CODE_REVIEW.md`](./46-CODE_REVIEW.md)

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

This chapter defines how the studio physically organizes code on disk — the folder structure, naming conventions, and colocation rules that make a codebase navigable and scalable. It is the *physical* expression of the architecture in [`41`](./41-CODE_ARCHITECTURE.md) (boundaries and layers) and a companion to clean code ([`43`](./43-CLEAN_CODE.md), line-level) and the component library ([`14`](./14-COMPONENT_LIBRARY.md), which defines the component folder pattern).

Folder structure seems trivial and is quietly enormous: it's the first thing a new engineer (or AI agent) encounters, it's referenced on every single change, and a bad one generates constant low-grade friction ("where does this go?", "where is that?"). A good structure encodes the architecture, makes the right place obvious, colocates related things, and scales from ten files to ten thousand without a reorganization. It aligns with information architecture ([`27`](./27-INFORMATION_ARCHITECTURE.md)) — the same "organize by mental model, findable, consistent" principles, applied to code.

---

## 2. Philosophy

**Structure should encode the architecture, not fight it.** The folder tree is the visible shape of the system. If the architecture is feature-based with clear boundaries ([`41`](./41-CODE_ARCHITECTURE.md)), the folders should be too — so the physical layout *teaches* the mental model. When structure and architecture disagree (feature-based architecture crammed into layer-based folders), engineers get constant friction and boundaries erode. The folder tree is documentation you navigate; make it tell the truth about how the system is organized.

**Colocation beats separation-by-type.** The instinct to group by *kind* (all components here, all styles there, all tests elsewhere) feels tidy but scatters everything related to a single feature across the tree — so any change means jumping between distant folders. **Things that change together should live together.** A component's markup, styles, tests, and stories belong side by side ([`14`](./14-COMPONENT_LIBRARY.md)); a feature's UI, logic, and types belong in one place. Colocation minimizes the distance between related edits and makes deletion safe (delete the folder, delete the feature).

**Organize by feature/domain, not by technical type — at scale.** The classic `components/`, `services/`, `utils/`, `hooks/` mega-folders work for a tiny app and collapse as it grows: `components/` becomes an alphabetized junk drawer of 300 unrelated files with no sense of what belongs to what. **Feature-first** structure (`billing/`, `projects/`, `auth/`) keeps each domain's code cohesive and its boundaries visible ([`41`](./41-CODE_ARCHITECTURE.md)). Shared/truly-generic code gets a deliberate home; everything else lives with its feature.

**The structure must make the right thing obvious and be consistently applied.** A structure only works if it's *predictable* — a developer (or agent) should be able to guess where something lives and be right (Article V). That requires clear conventions (naming, where things go) that are *documented and enforced*, not folklore. An inconsistent structure — even a "good" one applied unevenly — reintroduces the friction it was meant to remove. Consistency is the whole point.

---

## 3. Principles

### Principle 1 — Structure encodes the architecture
The folder tree reflects the boundaries/layers from [`41`](./41-CODE_ARCHITECTURE.md).
> *Rationale:* Physical layout should teach the mental model.

### Principle 2 — Organize by feature/domain first, type second
Feature folders (`projects/`, `billing/`) over global type folders (`components/`, `services/`) at scale.
> *Rationale:* Cohesion; changes stay local; boundaries visible.

### Principle 3 — Colocate what changes together
Component + styles + tests + stories together; feature code together.
> *Rationale (Art. IV, [`14`](./14-COMPONENT_LIBRARY.md)):* Minimizes edit distance; safe deletion.

### Principle 4 — Consistent, predictable naming conventions
Documented conventions for files, folders, and casing — applied uniformly.
> *Rationale (Art. V, VI):* Predictability = findability.

### Principle 5 — Clear public/private boundaries per module
Features expose a small public surface (`index.ts`); internals stay private.
> *Rationale ([`41`](./41-CODE_ARCHITECTURE.md)):* Encapsulation + enforceable boundaries.

### Principle 6 — A deliberate home for shared/generic code
Truly-shared UI/utilities/types live in a `shared`/`ui`/`lib` area — not scattered, not a dumping ground.
> *Rationale (Art. VIII):* Shared ≠ junk drawer; keep it curated.

### Principle 7 — Shallow, meaningful nesting
Deep enough to organize, shallow enough to navigate; every folder level earns its place.
> *Rationale:* Deep nesting buries; flat sprawl overwhelms — balance ([`27`](./27-INFORMATION_ARCHITECTURE.md)).

### Principle 8 — Scale without reorganization; structure is documented
The structure grows by adding features, not by periodic restructures; conventions are written down.
> *Rationale (Art. IX):* Reorgs are costly, disruptive one-way-ish doors.

---

## 4. Best Practices

### 4.1 Feature-first structure (a scalable default, Next.js App Router)
```
src/
├── app/                          # Next.js routes (thin — delegate to features) [31]
│   ├── (marketing)/…             # route groups
│   ├── dashboard/
│   │   ├── projects/page.tsx     # imports from features/projects
│   │   └── layout.tsx
│   ├── api/…                     # route handlers [40]
│   ├── layout.tsx · loading.tsx · error.tsx · not-found.tsx
│
├── features/                     # ★ feature/domain modules (the bulk of the app) [41]
│   ├── projects/
│   │   ├── components/           # feature-specific UI (colocated tests/stories)
│   │   ├── use-cases/            # application logic (ports) [41]
│   │   ├── data/                 # repository/data access (adapters) [39]
│   │   ├── types.ts              # feature types [32]
│   │   └── index.ts              # ★ public surface (only this is imported elsewhere) [P5]
│   ├── billing/…
│   └── auth/…                    # [38]
│
├── components/  (or ui/)         # shared, generic design-system components [14]
│   └── button/ { button.tsx, button.test.tsx, button.stories.tsx, index.ts }
│
├── lib/                          # shared utilities, clients, helpers (pure) [43]
├── hooks/                        # shared reusable hooks [30]
├── styles/ · tokens/             # global styles + design tokens [15]
├── types/                        # shared/global types [32]
└── server/  (or core/)           # cross-feature domain/services, db client [39/41]
```
> Rule of thumb: **feature-specific code → `features/<name>/`; genuinely shared code → `components`/`lib`/`hooks`.** Routes (`app/`) stay thin and delegate to features ([`31`](./31-NEXTJS_GUIDE.md)).

### 4.2 The component folder (from [`14`](./14-COMPONENT_LIBRARY.md))
```
button/
├── button.tsx          # implementation
├── button.test.tsx     # unit + a11y tests [44/22]
├── button.stories.tsx  # Storybook states/variants [14]
└── index.ts            # public export
```
Colocation (Principle 3): everything about `Button` in one folder; deleting it is trivial and complete.

### 4.3 Naming conventions (document + enforce)
| Item | Convention | Example |
| --- | --- | --- |
| React components (file + name) | `PascalCase` | `ProjectCard.tsx` → `ProjectCard` |
| Hooks | `useXxx.ts` | `useDebouncedValue.ts` |
| Utilities / non-component modules | `kebab-case` or `camelCase` (pick one) | `format-currency.ts` |
| Types/interfaces | `PascalCase` | `type Project`, `interface ProjectRepository` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_SIZE` |
| Folders | `kebab-case` (or feature name) | `features/user-settings/` |
| Test files | `*.test.ts(x)` colocated | `button.test.tsx` |
| Barrel/public API | `index.ts` per module | `features/projects/index.ts` |
> Pick one convention per category, **write it down**, and enforce it ([§10](#10-automation-opportunities)). Consistency > any particular choice (Article V).

### 4.4 Public surface via `index.ts` (Principle 5, [`41`](./41-CODE_ARCHITECTURE.md))
```ts
// features/projects/index.ts — the ONLY thing other features import
export { ProjectList } from "./components/ProjectList";
export { createProject } from "./use-cases/create-project";
export type { Project } from "./types";
// internals (data/, other components) stay private → boundaries enforceable
```
Other modules import `from "@/features/projects"`, never `from "@/features/projects/data/prisma-repo"`. Enforce with import-boundary lint ([`41`](./41-CODE_ARCHITECTURE.md), §10).

### 4.5 Path aliases (avoid `../../../`)
```jsonc
// tsconfig.json
{ "compilerOptions": { "paths": {
  "@/features/*": ["src/features/*"],
  "@/components/*": ["src/components/*"],
  "@/lib/*": ["src/lib/*"]
}}}
```
Aliases make imports stable and readable, and moving files less painful.

### 4.6 Monorepo (only when justified, Article VIII)
For multiple apps/packages sharing code, a monorepo (pnpm/turborepo) with `apps/*` + `packages/*` (e.g. `packages/ui` = the component library [`14`](./14-COMPONENT_LIBRARY.md), `packages/config`) is appropriate. Don't adopt monorepo tooling for a single app — it's overhead you don't need yet.

### 4.7 Handle the `utils`/`lib` junk-drawer risk (Principle 6)
`lib/`/`utils/` tends to accrete unrelated helpers. Keep it curated: group by purpose (`lib/currency.ts`, `lib/dates.ts`), move feature-specific "utils" into their feature, and periodically prune ([`49`](./49-MAINTENANCE.md)). A giant `utils.ts` is a smell.

### 4.8 Document the structure
A short `README`/`CONTRIBUTING` section (or an ADR, [`41`](./41-CODE_ARCHITECTURE.md)) explaining the structure + naming conventions + "where does X go?" — so humans and agents apply it consistently (Principle 8, Article VI). The structure is only as good as its consistent application.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Type-first mega-folders** (`components/` with 300 unrelated files) | Junk drawer; no cohesion; scatter. | P2 |
| **Separation by type** (styles/tests/code far apart) | Every change hops folders. | P3 |
| **Inconsistent naming/casing** | Unpredictable; hard to find. | P4 |
| **No module boundaries** (deep-importing internals) | Broken encapsulation; erodes architecture. | P5 |
| **`utils.ts` junk drawer** | Unrelated helpers pile up; no cohesion. | P6 |
| **Deep nesting** (`a/b/c/d/e/…`) | Buries files; painful navigation. | P7 |
| **`../../../../` relative imports** | Fragile; unreadable; refactor-hostile. | 4.5 |
| **Structure ≠ architecture** | Friction; boundaries decay. | P1 |
| **Periodic big reorgs** | Disruptive; churny diffs; avoidable. | P8 |
| **Premature monorepo** for one app | Tooling overhead without need. | 4.6, Art. VIII |
| **Undocumented conventions** (folklore) | Applied inconsistently; onboarding pain. | P8 |

---

## 6. Real-World Examples

### Example A — From junk-drawer `components/` to feature folders
An app's `components/` folder held 280 files alphabetically — `Button`, `CheckoutSummary`, `Avatar`, `BillingTable`, `Toast`… no way to tell what belonged to what, and unrelated things constantly imported each other. Reorganizing to **feature-first** (`features/billing/`, `features/checkout/`) with a shared `components/` for only *generic* design-system pieces (Button, Toast) made every feature's code cohesive and its boundaries visible — and new engineers could finally find things (Principles 2, 6). *Type-first structure is a junk drawer at scale.*

### Example B — Colocation made deletion safe
Tests lived in a top-level `__tests__/` mirror, styles in `styles/`, components in `components/`. Deleting a deprecated feature meant hunting its fragments across three trees — and they always missed some (dead code, dead tests). Switching to **colocation** (each component/feature owning its tests + styles, 4.2) meant deleting a feature was deleting *one folder* — complete and safe (Principle 3). *Things that change (and die) together should live together.*

### Example C — `index.ts` boundaries stopped erosion
Modules had begun deep-importing each other's internals (`import { prismaRepo } from "@/features/projects/data/prisma-repo"`), coupling everything and defeating the architecture ([`41`](./41-CODE_ARCHITECTURE.md)). Introducing a **public `index.ts` per feature** plus an **import-boundary lint** that forbids deep imports (4.4, §10) restored encapsulation: features could refactor internals freely as long as their public surface held (Principle 5). *Physical boundaries enforce architectural ones.*

---

## 7. Common Mistakes

- **Type-first mega-folders** that become junk drawers as the app grows.
- **Separating tests/styles/code** instead of colocating.
- **Inconsistent naming/casing** with no documented convention.
- **Deep-importing module internals** (no public `index.ts`, no boundary lint).
- **A growing `utils.ts`/`lib/` junk drawer.**
- **Excessive nesting** or, conversely, flat sprawl.
- **`../../../` relative imports** instead of path aliases.
- **Big periodic reorganizations** instead of scaling by adding features.
- **Adopting a monorepo** for a single app prematurely.
- **Leaving conventions undocumented** (folklore that erodes).

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Scaffold feature modules** in the standard structure (components/use-cases/data/types + `index.ts`).
- **Place new files correctly** (feature-specific vs. shared) and name them per convention.
- **Set up path aliases + import-boundary lint** ([`41`](./41-CODE_ARCHITECTURE.md)).
- **Refactor** type-first → feature-first; colocate tests/styles; extract junk-drawer utils into features.
- **Audit** for boundary violations, inconsistent naming, deep imports, and mega-folders.

### 8.2 Hard rules (Art. IV, V, VIII)
- The agent places code **feature-first**: feature-specific → `features/<name>/`; only genuinely shared → `components`/`lib`/`hooks`. It does **not** dump into type-first mega-folders.
- **Colocates** component + tests + stories + styles ([`14`](./14-COMPONENT_LIBRARY.md)); a feature's code lives together.
- **Follows the documented naming conventions** (casing, `useXxx`, `PascalCase`, etc.) consistently.
- **Respects module boundaries**: imports go through the feature's `index.ts`; no deep-importing internals; uses **path aliases** (no `../../../`).
- Keeps nesting **shallow + meaningful**; does not create speculative folders or a premature monorepo (Art. VIII).
- When it introduces a new structural pattern, it **documents it** (Art. VI).

### 8.3 Prompt example — scaffold a feature
```
ROLE: Frontend Architect, bound by 00-CONSTITUTION + 42 (+41/14).
TASK: Scaffold the <feature> module.
CONSTRAINTS:
  - Feature-first: features/<feature>/ { components (colocated tests+stories), use-cases, data, types.ts, index.ts }.
  - Only expose a small public surface via index.ts; keep internals private.
  - Follow naming conventions (PascalCase components, useXxx hooks, kebab-case folders/util files).
  - Use path aliases (@/features/*, @/lib/*); no ../../../ imports.
  - Feature-specific code stays in the feature; only genuinely shared code goes to components/lib/hooks.
OUTPUT: folder tree + stub files (with colocated tests/stories) + index.ts + a note on where shared vs. feature code goes.
```

### 8.4 Prompt example — audit/refactor
```
TASK: Audit folder structure for: type-first mega-folders, separated tests/styles/code, inconsistent
naming, deep-imports bypassing index.ts, utils junk drawers, excessive nesting, and ../../../ imports.
Propose a feature-first reorganization plan (incremental, low-churn) + the import-boundary lint config.
```

---

## 9. Human Review Checklist

- [ ] Structure **encodes the architecture** ([`41`](./41-CODE_ARCHITECTURE.md)); **feature/domain-first**, not type-first mega-folders.
- [ ] Related code is **colocated** (component + tests + stories + styles; feature code together).
- [ ] **Naming conventions** are documented and applied consistently (casing, `useXxx`, `PascalCase`, folders).
- [ ] Modules expose a **public surface (`index.ts`)**; no deep-importing internals (boundary-linted).
- [ ] Shared/generic code has a **deliberate home**; no `utils.ts` junk drawer.
- [ ] Nesting is **shallow + meaningful**; **path aliases** used (no `../../../`).
- [ ] Structure **scales by adding features**, not by periodic reorgs.
- [ ] The structure + conventions are **documented** (README/CONTRIBUTING/ADR).
- [ ] Monorepo only if **justified** (multiple apps/shared packages).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Import boundaries | `eslint-plugin-boundaries` / import rules: only import via `index.ts`; ban deep imports ([`41`](./41-CODE_ARCHITECTURE.md)). |
| Naming enforcement | Lint for file/folder naming + casing conventions. |
| Path aliases | tsconfig `paths` + `eslint-plugin-import` no-relative-parent-imports. |
| Colocation checks | Lint requiring colocated tests/stories per component ([`14`](./14-COMPONENT_LIBRARY.md)). |
| Cycle/structure | `dependency-cruiser` rules mapping allowed folder dependencies. |
| Scaffolding | Generators (plop/hygen) that create feature modules in the standard shape. |
| Dead-folder detection | `knip`/`ts-prune` to find unused files/exports ([`49`](./49-MAINTENANCE.md)). |

---

## 11. References for Further Study
- **Frontend structure:** feature-first / "feature-sliced design" and vertical-slice organization; the "colocation" principle (Kent C. Dodds).
- **Framework:** Next.js project-structure documentation (App Router, route groups) ([`31`](./31-NEXTJS_GUIDE.md)).
- **Architecture link:** *Clean Architecture* / DDD bounded contexts as the conceptual basis for feature boundaries ([`41`](./41-CODE_ARCHITECTURE.md)).
- **Monorepos:** turborepo/pnpm-workspaces documentation (when justified).
- **Cross-references:** [`14-COMPONENT_LIBRARY.md`](./14-COMPONENT_LIBRARY.md), [`27-INFORMATION_ARCHITECTURE.md`](./27-INFORMATION_ARCHITECTURE.md), [`31-NEXTJS_GUIDE.md`](./31-NEXTJS_GUIDE.md), [`41-CODE_ARCHITECTURE.md`](./41-CODE_ARCHITECTURE.md), [`43-CLEAN_CODE.md`](./43-CLEAN_CODE.md), [`44-TESTING.md`](./44-TESTING.md), [`49-MAINTENANCE.md`](./49-MAINTENANCE.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Organization feature/domain-first (not type-first at scale) | Yes |
| Components with colocated tests/stories | 100% |
| Deep-imports bypassing module `index.ts` | 0 (linted) |
| Naming-convention violations | 0 (linted) |
| `../../../` relative imports | 0 (aliases used) |
| Structure + conventions documented | Yes |
| Time for a new engineer to place a file correctly | < 30s (predictable) |
| Big reorganizations needed as it scales | ~0 |

---

*End of `42-FOLDER_STRUCTURE.md`.*
