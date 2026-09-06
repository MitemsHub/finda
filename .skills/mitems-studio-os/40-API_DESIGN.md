# 40 — API Design

### Contracts, Consistency, and Evolvability

> *"An API is a promise you make to other developers — and a promise is hard to take back. Design it as a contract you'll honor for years, because someone will build their business on it tomorrow."*

---

**Chapter type:** Phase 8 — Systems & Architecture
**DRI:** Backend Architect + Software Architect
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`32`](./32-TYPESCRIPT_GUIDE.md), [`37`](./37-SECURITY.md), [`38`](./38-AUTHENTICATION.md), [`39`](./39-DATABASE_DESIGN.md)
**Feeds:** [`31-NEXTJS_GUIDE.md`](./31-NEXTJS_GUIDE.md), [`41-CODE_ARCHITECTURE.md`](./41-CODE_ARCHITECTURE.md), [`44-TESTING.md`](./44-TESTING.md), [`48-MONITORING.md`](./48-MONITORING.md)

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

This chapter defines how the studio designs **APIs** — the contracts between systems (client↔server, service↔service, and public developer APIs). It covers style choice (REST/RPC/GraphQL and Next.js Server Actions/route handlers), resource and endpoint design, request/response conventions, error handling, status codes, pagination/filtering, versioning, documentation, and the security every endpoint requires.

API design connects the database ([`39`](./39-DATABASE_DESIGN.md), whose data it exposes), TypeScript ([`32`](./32-TYPESCRIPT_GUIDE.md), for typed contracts + validation), security ([`37`](./37-SECURITY.md)) and auth ([`38`](./38-AUTHENTICATION.md), since every endpoint is attack surface), Next.js ([`31`](./31-NEXTJS_GUIDE.md), where Server Actions/route handlers *are* APIs), and testing ([`44`](./44-TESTING.md), via contract tests). The governing idea: **an API is a long-lived contract; design it for consistency, clarity, and evolution, not for today's convenience** ([`00`](./00-CONSTITUTION.md) Articles IV, IX).

---

## 2. Philosophy

**An API is a contract, and contracts are hard to break gracefully.** The moment another team, a mobile app, or a third-party developer depends on your endpoint, its shape is frozen — changing it breaks their code. Unlike internal code you can refactor freely, a published API is a *commitment*. This means the cost of getting it wrong is high and delayed (it surfaces when consumers break, often in production), and the discipline is to design deliberately, version carefully, and treat breaking changes as one-way doors (Article IX).

**Consistency is the API's usability.** For an API, "UX" means: can a developer *predict* how it works after learning one endpoint? Consistent naming, consistent response shapes, consistent error formats, consistent pagination — these let a consumer generalize from one call to all of them. Inconsistency (one endpoint returns `{data}`, another returns the array directly; one uses `camelCase`, another `snake_case`) forces developers to relearn constantly and breeds bugs. Consistency *is* the developer experience (Article V, applied to interfaces).

**The contract lives at the boundary — validate there, trust inside.** An API is a trust boundary: everything crossing it is untrusted ([`37`](./37-SECURITY.md)) and must be validated (input) and shaped intentionally (output). We define the contract explicitly (schema/types), validate requests at the edge ([`32`](./32-TYPESCRIPT_GUIDE.md) "parse, don't trust"), and never leak internal implementation details (DB columns, stack traces, internal IDs) into responses. The response is a *deliberate view*, not a raw dump of the database row.

**Design for evolution from day one.** APIs must change — but change without breaking consumers. This is designed in: additive changes (new optional fields) are safe; removals/renames are breaking. Versioning strategy, deprecation policy, and backward-compatible defaults are decided *before* v1 ships, not scrambled together when the first breaking change is needed. An API that can't evolve safely calcifies or breaks its users (Article IX).

---

## 3. Principles

### Principle 1 — Design the contract first, explicitly
Define endpoints, schemas, and errors as an explicit spec (types/OpenAPI/GraphQL schema) before implementing.
> *Rationale (Art. VI):* The contract is the deliverable; code implements it.

### Principle 2 — Consistency everywhere
Uniform naming, response envelopes, error formats, pagination, casing across all endpoints.
> *Rationale (Art. V):* Predictability = developer usability.

### Principle 3 — Validate input, shape output; never leak internals
Validate at the boundary ([`32`](./32-TYPESCRIPT_GUIDE.md), [`37`](./37-SECURITY.md)); responses are deliberate views, not raw DB rows.
> *Rationale (Art. III):* The boundary is a security + contract boundary.

### Principle 4 — Correct, meaningful status codes + structured errors
Use HTTP semantics; return machine-readable, actionable error bodies.
> *Rationale:* Consumers branch on codes + error shapes.

### Principle 5 — Secure every endpoint (authN + authZ + rate limit + validation)
Treat all endpoints (incl. Server Actions) as public attack surface ([`37`](./37-SECURITY.md), [`38`](./38-AUTHENTICATION.md)).
> *Rationale (Art. III):* Endpoints are the front line.

### Principle 6 — Design for scale: pagination, filtering, and no over-fetch
Always paginate collections; support filtering/sorting; avoid returning unbounded/oversized payloads.
> *Rationale ([`35`](./35-PERFORMANCE.md), [`39`](./39-DATABASE_DESIGN.md)):* Unbounded responses kill performance.

### Principle 7 — Versioning + deprecation policy from v1
Additive by default; version breaking changes; deprecate with notice + migration path.
> *Rationale (Art. IX):* Breaking consumers silently is unacceptable.

### Principle 8 — Documented, discoverable, and testable
Accurate docs (ideally generated from the schema); contract tests keep spec + implementation in sync.
> *Rationale (Art. VI, [`44`](./44-TESTING.md)):* Undocumented/untested APIs drift and mislead.

### Principle 9 — Idempotency + safe methods where it matters
`GET` safe; `PUT`/`DELETE` idempotent; support idempotency keys for critical `POST`s (payments).
> *Rationale:* Networks retry; non-idempotent retries cause duplicates.

---

## 4. Best Practices

### 4.1 Choosing a style
| Style | Use when |
| --- | --- |
| **REST** (resource-oriented) | Public/general APIs, CRUD-ish resources, broad tooling — the safe default |
| **RPC / typed function calls** (e.g. tRPC, Server Actions) | Internal client↔server in one TS codebase — end-to-end types, low ceremony ([`31`](./31-NEXTJS_GUIDE.md), [`32`](./32-TYPESCRIPT_GUIDE.md)) |
| **GraphQL** | Many clients with varied data needs; avoids over/under-fetch — at the cost of complexity |
| **Webhooks / events** | Server→consumer notifications; async integration |

> Don't cargo-cult GraphQL/microservice APIs for a simple app (Article VIII). For a Next.js app, **Server Actions/route handlers or tRPC** often beat a hand-rolled REST layer for internal use; expose REST/GraphQL when *external* consumers need it.

### 4.2 RESTful resource design
```
GET    /api/v1/projects            → list (paginated, filterable)
POST   /api/v1/projects            → create
GET    /api/v1/projects/:id        → read one
PATCH  /api/v1/projects/:id        → partial update
DELETE /api/v1/projects/:id        → delete
GET    /api/v1/projects/:id/tasks  → nested collection
```
- **Nouns, not verbs**, in paths; plural resource names; hierarchy for relationships (don't over-nest — usually ≤ 2 levels).
- **Methods carry the verb:** `GET/POST/PATCH/PUT/DELETE` with correct semantics (4.5).
- Consistent **casing** (pick `camelCase` or `snake_case` for JSON — and never mix).

### 4.3 Consistent request/response shape
```jsonc
// Success (single)
{ "data": { "id": "…", "name": "Atlas", "createdAt": "2026-07-08T…Z" } }

// Success (collection, paginated)
{ "data": [ /* … */ ],
  "pagination": { "nextCursor": "eyJ…", "hasMore": true, "limit": 20 } }

// Error (structured, machine-readable)
{ "error": {
    "code": "VALIDATION_ERROR",
    "message": "Name must be 1–100 characters.",
    "details": [{ "field": "name", "issue": "too_long" }]
} }
```
Pick one envelope and use it **everywhere**. Errors always have a stable `code` (for machines) + human `message` (for logs/devs) + optional `details`.

### 4.4 Validation & typed contracts ([`32`](./32-TYPESCRIPT_GUIDE.md), [`37`](./37-SECURITY.md))
```ts
const CreateProject = z.object({ name: z.string().min(1).max(100), orgId: z.string().uuid() });
export async function POST(req: Request) {
  const session = await requireSession();                 // authN (38)
  const input = CreateProject.parse(await req.json());     // validate (400 on failure)
  if (!can(session, "project:create", input.orgId)) return forbidden(); // authZ (38)
  const project = await projects.create(input, session.userId);         // data layer (39/41)
  return Response.json({ data: toProjectDTO(project) }, { status: 201 });// shaped output
}
```
Validate → authorize → act → shape output. Share request/response **types** with the client where possible (tRPC/OpenAPI-generated) for end-to-end safety.

### 4.5 Status codes (use HTTP semantics correctly)
| Code | Meaning |
| --- | --- |
| **200 / 201 / 204** | OK / Created / No Content (success) |
| **400** | Bad request (validation failed) |
| **401 / 403** | Unauthenticated / Unauthorized (authN vs authZ, [`38`](./38-AUTHENTICATION.md)) |
| **404** | Not found (also to avoid leaking existence to unauthorized users) |
| **409** | Conflict (duplicate, version conflict) |
| **422** | Unprocessable (semantic validation) |
| **429** | Too many requests (rate limited, [`37`](./37-SECURITY.md)) |
| **500 / 503** | Server error / unavailable (never leak details) |
> Anti-pattern: returning `200 { success: false }` for errors — use the real status code.

### 4.6 Pagination, filtering, sorting ([`39`](./39-DATABASE_DESIGN.md), [`35`](./35-PERFORMANCE.md))
- **Always paginate** collections (never return unbounded lists). Prefer **cursor-based** pagination for large/real-time data (stable under inserts); offset is fine for small, static sets.
- Support **filtering** (`?status=active`), **sorting** (`?sort=-createdAt`), and **field selection** where useful — backed by indexes ([`39`](./39-DATABASE_DESIGN.md)).
- Set sane default + max `limit`; document them.

### 4.7 Versioning & deprecation ([`00`](./00-CONSTITUTION.md) Art. IX)
- **Additive changes are non-breaking** (new optional fields/endpoints) — default to these.
- **Breaking changes** (remove/rename field, change type/semantics, change required inputs) require a **new version** (URL `/v2/` or header) — never silently mutate v1.
- **Deprecation policy:** announce, provide a migration guide + timeline, use `Deprecation`/`Sunset` headers, monitor usage before removal.

### 4.8 Security on every endpoint ([`37`](./37-SECURITY.md), [`38`](./38-AUTHENTICATION.md))
authN → authZ (incl. object ownership) → validate → rate-limit → act; parameterized DB access ([`39`](./39-DATABASE_DESIGN.md)); no internal details/PII in responses or errors; CORS configured tightly; secrets server-side. **Every** endpoint — including Next.js Server Actions — is public attack surface.

### 4.9 Documentation & contract testing ([`44`](./44-TESTING.md))
Generate docs from the schema (OpenAPI/GraphQL schema/tRPC types) so docs can't drift; provide examples + error catalog. **Contract tests** assert the implementation matches the spec (and, for consumers, that the provider hasn't broken the contract).

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle |
| --- | --- | --- |
| **Inconsistent shapes/naming/casing** | Consumers can't generalize; bugs. | P2 |
| **Verbs in REST paths** (`/getUsers`, `/createOrder`) | Fights HTTP semantics; unpredictable. | 4.2 |
| **`200 { success: false }`** for errors | Misuses HTTP; breaks client error handling. | P4 |
| **Leaking internals** (DB columns, stack traces, internal IDs) | Security + coupling; exposes implementation. | P3, [`37`](./37-SECURITY.md) |
| **No input validation** | Injection, corruption, 500s. | P3, Art. III |
| **Missing authZ / object-ownership** | Broken access control (#1 risk). | P5, [`38`](./38-AUTHENTICATION.md) |
| **Unpaginated collections** | Unbounded payloads; perf collapse. | P6 |
| **Silent breaking changes to a live API** | Breaks all consumers. | P7, Art. IX |
| **No versioning/deprecation plan** | Can't evolve without breakage. | P7 |
| **Undocumented / docs-drifted API** | Misleads consumers; wasted time. | P8 |
| **Non-idempotent critical POSTs** (no idempotency key) | Duplicate charges/records on retry. | P9 |
| **Over-engineered GraphQL/microservices** for a simple app | Needless complexity. | 4.1, Art. VIII |

---

## 6. Real-World Examples

### Example A — Consistency turned three APIs into one mental model
An API had grown organically: `/users` returned an array, `/projects` returned `{ data, meta }`, `/tasks` returned `{ results, total }`; casing mixed `camelCase` and `snake_case`; errors were sometimes strings, sometimes objects. Client code was a mess of special cases. Standardizing on **one envelope, one casing, one error shape** (4.3) across all endpoints let the client write *one* response handler and *one* error handler — and new endpoints "just worked." *Consistency is the API's usability (Principle 2).*

### Example B — The `200 { success:false }` trap
An API returned HTTP `200` for everything, with a body flag for failures. Clients (and monitoring, and retries, and caches) treated failed requests as successes — errors went unnoticed until users complained. Moving to **correct status codes** (`400/401/403/404/409/429/500`) with structured error bodies (4.5) made failures visible to clients, logs, and alerting instantly. *Use HTTP; don't reinvent it (Principle 4).*

### Example C — Idempotency key prevented double charges
A payments `POST /charges` had no idempotency protection; a network retry (client didn't get the response, retried) created **duplicate charges**. Adding an **idempotency key** (client sends a unique key; server dedupes and returns the original result on retry, 4.x/Principle 9) made retries safe. *Networks retry; critical writes must be idempotent.*

---

## 7. Common Mistakes

- **Inconsistent** response shapes, naming, casing, and error formats across endpoints.
- **Verbs in paths** and misused HTTP methods.
- **Wrong status codes** (or `200`-for-everything).
- **Leaking internal details** (DB fields, stack traces) in responses/errors.
- **Skipping input validation or authorization** on endpoints (incl. Server Actions).
- **Returning unpaginated** collections.
- **Breaking changes without versioning/deprecation.**
- **No/stale documentation**; no contract tests.
- **Non-idempotent** critical write endpoints.
- **Reaching for GraphQL/microservices** when a simple typed RPC/REST layer suffices.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Design the contract first** (OpenAPI/GraphQL schema/tRPC types) with consistent shapes + error catalog.
- **Implement endpoints** with validation → authZ → shaped output → correct status codes.
- **Generate docs + contract tests** from the schema; keep them in sync.
- **Audit** for inconsistency, leaked internals, missing authZ/validation, unpaginated lists, wrong status codes, and breaking-change risk.
- **Recommend a style** (REST/tRPC/GraphQL) fitting the actual need (avoid over-engineering).

### 8.2 Hard rules (Art. III, IV, V, IX)
- **Contract-first + consistent** across all endpoints (naming, envelope, errors, casing, pagination).
- **Validate input at the boundary** ([`32`](./32-TYPESCRIPT_GUIDE.md)); **authN + authZ (incl. object ownership) + rate-limit on every endpoint** ([`38`](./38-AUTHENTICATION.md)); parameterized DB access ([`39`](./39-DATABASE_DESIGN.md)).
- **Never leak internals** (DB columns, stack traces, internal IDs, PII) in responses/errors; output is a **deliberate DTO**.
- **Correct HTTP status codes** + structured `{ error: { code, message } }`; never `200`-for-errors.
- **Always paginate collections**; sane default/max limits.
- **Additive by default; version breaking changes** with a deprecation path (never silently mutate a live contract).
- **Idempotency** for critical writes (payments); documents + contract-tests the API.

### 8.3 Prompt example — design + implement an endpoint
```
ROLE: Backend Architect, bound by 00-CONSTITUTION + 40 (+32/37/38/39).
TASK: Design + implement the Projects API (list/create/read/update/delete).
CONSTRAINTS:
  - Contract-first: consistent envelope { data | error{code,message,details} }, casing, cursor pagination.
  - Validate input (Zod → 400); authN + authZ (role + org ownership) + rate limit on each endpoint.
  - Correct status codes (200/201/204/400/401/403/404/409/429/500). Output = DTO (no raw DB rows/internal IDs).
  - Paginate the list (default/max limit, filter=status, sort=-createdAt) backed by indexes (39).
  - Additive-friendly + /v1 versioning; idempotency key on create if it triggers side effects.
OUTPUT: OpenAPI/schema + handlers + shared types + example requests/responses + error catalog + contract tests.
```

### 8.4 Prompt example — audit
```
TASK: Audit this API for: inconsistent shapes/naming/casing, verbs-in-paths, wrong/200-for-error status
codes, leaked internals (DB fields/stack traces/internal IDs/PII), missing validation or authZ (object
ownership), unpaginated collections, silent breaking changes / no versioning, missing idempotency on
critical writes, and undocumented/untested endpoints. Output {endpoint, issue, severity, fix}.
```

---

## 9. Human Review Checklist

- [ ] **Contract defined explicitly** (schema/types/OpenAPI) and **consistent** across endpoints (naming, envelope, errors, casing, pagination).
- [ ] **Input validated at the boundary**; **authN + authZ (object ownership) + rate limiting** on every endpoint (incl. Server Actions).
- [ ] Responses are **deliberate DTOs** — **no internal details/PII** leaked; errors reveal nothing sensitive.
- [ ] **Correct HTTP status codes** + structured error bodies (`code`/`message`); no `200`-for-errors.
- [ ] **Collections paginated** (default/max limits); filtering/sorting backed by indexes ([`39`](./39-DATABASE_DESIGN.md)).
- [ ] **Versioning + deprecation policy** in place; changes additive or versioned (no silent breaks).
- [ ] **Idempotency** for critical writes; correct method semantics (safe/idempotent).
- [ ] **Documented** (generated from schema) + **contract-tested** ([`44`](./44-TESTING.md)).
- [ ] Style (REST/tRPC/GraphQL) **fits the need** (no over-engineering, Art. VIII).
- [ ] Parameterized DB access; CORS/secrets configured correctly ([`37`](./37-SECURITY.md)).

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Spec-driven docs | Generate OpenAPI/GraphQL/tRPC docs from the schema; publish. |
| Contract tests | Provider + consumer contract tests in CI (spec ↔ implementation) ([`44`](./44-TESTING.md)). |
| Type sharing | End-to-end types (tRPC / OpenAPI-generated client) — fail on drift ([`32`](./32-TYPESCRIPT_GUIDE.md)). |
| Consistency lint | Rules for naming/casing/envelope/status-code conventions. |
| Security checks | Auth/validation presence + injection scanning per endpoint ([`37`](./37-SECURITY.md), [`38`](./38-AUTHENTICATION.md)). |
| Breaking-change detection | API diff tool blocking undeclared breaking changes on the current version. |
| Response-shape validation | Runtime/CI assertions that responses match the schema (no leaked fields). |
| Usage/deprecation monitoring | Track endpoint/version usage before removal ([`48`](./48-MONITORING.md)). |

---

## 11. References for Further Study
- **REST & HTTP:** the HTTP spec (methods/status codes); REST resource-design guides; JSON:API as one consistency reference.
- **Specs & tooling:** OpenAPI/Swagger; GraphQL specification; tRPC docs (typed RPC in TS).
- **API guidelines:** public API style guides from major tech companies (naming, versioning, errors, pagination) — as reference patterns.
- **Evolution:** the parallel-change / expand-contract approach applied to APIs; deprecation-policy practice (Art. IX).
- **Cross-references:** [`31-NEXTJS_GUIDE.md`](./31-NEXTJS_GUIDE.md), [`32-TYPESCRIPT_GUIDE.md`](./32-TYPESCRIPT_GUIDE.md), [`37-SECURITY.md`](./37-SECURITY.md), [`38-AUTHENTICATION.md`](./38-AUTHENTICATION.md), [`39-DATABASE_DESIGN.md`](./39-DATABASE_DESIGN.md), [`41-CODE_ARCHITECTURE.md`](./41-CODE_ARCHITECTURE.md), [`44-TESTING.md`](./44-TESTING.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| Endpoints following consistent shape/naming/errors | 100% |
| Endpoints with input validation + authN + authZ | 100% (floor) |
| Responses leaking internal details/PII | 0 |
| Correct HTTP status-code usage | 100% |
| Collection endpoints paginated | 100% |
| Breaking changes shipped without versioning | 0 |
| Critical write endpoints idempotent | 100% |
| Endpoints documented + contract-tested | 100% |

---

*End of `40-API_DESIGN.md`.*
