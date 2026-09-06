---
site: "Aeroplane"
url: "https://aeroplane.run"
date_analyzed: "2026-07-08"
category: "saas"
tags: ["dark", "developer-tool", "technical", "terminal", "minimal", "single-accent", "infra"]
essence: "A self-hosted 'cockpit' for devs that dresses infrastructure control in calm, terminal-flavored dark UI — command-line motifs as the primary visual texture."
confidence: "mixed"
analyst: "agent (Studio OS reference engine)"
---

# Reference Teardown: Aeroplane

> **Essence:** A developer control-plane product that turns "infra you own" into an approachable cockpit. Uses **command-line motifs** (curl one-liners, status tokens like `docker.ready`, `postgres.backed-up`) as decoration-with-meaning, wrapped in a quiet dark technical aesthetic.
> **Source:** https://aeroplane.run · analyzed 2026-07-08 · confidence: mixed (live homepage capture)

> ⚖️ **Copying-line status:** PASS — principles only. No logos, copy, or assets reproduced.

## 1. Design Philosophy
Aeroplane sells *control and inspectability* ("keeps the powerful parts visible"), and the design mirrors that promise: nothing is hidden behind marketing gloss. It leans on the developer's native visual language — shell commands, service-status strings, ticking marquees of system states — so the product *feels* like the tool it's describing. The vibe is "quietly capable," not loud. Trust is engineered by showing real command surfaces rather than abstract hero art (a dev-tool cousin of Linear's "product as hero").

## 2. Typography Breakdown
- **Families (inferred):** a clean geometric/neo-grotesque sans for headings + body, paired with **monospace** for commands/status tokens — the mono is the signature.
- **Hierarchy:** Big, confident display headline ("Deploy apps and databases on your own *server*") with an emphasized italic/keyword; body kept small and calm. Mono at small sizes carries the "technical proof" texture.

| Role | Family | Size (approx) | Weight | Notes |
| --- | --- | --- | --- | --- |
| Display | Sans | ~48–64px | 600 | Keyword emphasis in the headline |
| Body | Sans | ~16px | 400 | Calm, secondary |
| Command/Status | Mono | ~12–14px | 400 | `curl … | sh`, `service_status`, status marquee |

## 3. Color Palette
- **Canvas:** near-black dark surface. **Surfaces:** charcoal panels for the "managed surface" list and step cards.
- **Ink:** light gray/white; **muted** gray for secondary. **Accent:** a single restrained accent used for the primary CTA / key highlights; tech-logo colors appear only in the "Deploy anything" logo wall (borrowed brand colors, not the system's).
- **Approach:** dark, high-contrast, one-accent — depth via surface steps + hairline borders (the dominant modern dev-tool pattern).

## 4. Spacing Scale
- 4/8px-based rhythm; generous section spacing separating numbered steps (`01`, `02`, `03`). Comfortable-but-dense: enough air to feel calm, tight enough to feel technical.

## 5. Grid System
- Capped content width; single-column narrative with multi-column step/feature rows. Logo walls use an auto-flow marquee (repeating rows) — an intrinsic, content-driven pattern.

## 6. Motion Language
- **Marquee** of system-state tokens (`docker.ready - caddy.routing - …`) scrolling horizontally — continuous, ambient motion signaling "always running." Otherwise restrained. Verify reduced-motion handling for the marquee.

## 7. Interaction Patterns
- Numbered, sequential explainer steps (install → attach → keep running); import flows (Railway/Vercel) shown as before→after node diagrams. Copyable command blocks. Clear single primary CTA ("Get Started").

## 8. UX Principles
- **Show the mechanism:** diagrams of what moves during a migration build trust for a technical buyer. **Progressive detail:** overview steps first, specifics (what's included in an import) below. **Developer-native cues** reduce cognitive load for the target user.

## 9. Reusable Ideas (as principles)
- **Use the user's native language as texture** (CLI motifs for devs) instead of generic illustration → informs [`17`](../17-LANDING_PAGE_DESIGN.md) "product/context as hero."
- **Ambient status marquee** communicates "alive/always-on" pre-attentively → [`24`](../24-MICRO_INTERACTIONS.md) (use sparingly, reduced-motion aware).
- **Before→after migration diagrams** de-risk switching costs → objection handling in [`17`](../17-LANDING_PAGE_DESIGN.md).

## 10. Things to Avoid
- Continuous marquees can distract and harm reduced-motion/vestibular users — must respect `prefers-reduced-motion` ([`23`](../23-MOTION_SYSTEM.md)).
- Borrowed third-party logo colors (the tech wall) must not leak into the core palette.
- Dark-only + small mono text risks contrast/legibility at the low end — verify AA ([`22`](../22-ACCESSIBILITY.md)).

## 11. How to Recreate This Style Without Copying
1. Identify **your** user's native language (CLI for devs, spreadsheets for ops, etc.) and use *its* motifs as honest texture — not Aeroplane's specific tokens.
2. Build a **dark, one-accent** system in OKLCH ([`06`](../06-COLOR_SYSTEM.md)); your own hue.
3. Pair a neutral sans with **mono** for technical proof; keep body calm.
4. Use **numbered sequential steps** + **before/after diagrams** to explain a process and de-risk migration.
5. If you use ambient motion, make it subtle and reduced-motion-safe.
6. Diverge by combining with a warmer type idea or a lighter theme option so the result is yours.

---
## Mapping to our systems
| Finding | Our chapter |
| --- | --- |
| Dark one-accent, surface-step depth | [`06`](../06-COLOR_SYSTEM.md), [`11`](../11-CARD_DESIGN.md) |
| Mono-as-signature technical texture | [`07`](../07-TYPOGRAPHY_SYSTEM.md) |
| Ambient status marquee | [`24`](../24-MICRO_INTERACTIONS.md), [`23`](../23-MOTION_SYSTEM.md) |
| Product/context as hero; migration diagrams | [`17`](../17-LANDING_PAGE_DESIGN.md) |
