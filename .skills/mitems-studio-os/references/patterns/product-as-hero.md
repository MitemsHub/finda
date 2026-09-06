# Pattern Synthesis: Product as Hero

> **Distilled from:** Linear, Raycast, Apple, Aeroplane, OutRay, Taste Skill, Impeccable, ASKTC (with Byteship/Obscura as partial cases).
> **What it is:** Making the *actual product* (real UI, live demos, or the user's native context) the primary visual content of a page — instead of stock photography, abstract illustration, or vague hero art.

---

## The core insight
The most persuasive thing you can show is **the thing itself, working.** Across the best modern sites, the hero is not a mood image — it's a crisp product screenshot, a live interactive demo, an animated data stream, or the user's own working context (a terminal, a queue, a canvas). This is [`../17-LANDING_PAGE_DESIGN.md`](../17-LANDING_PAGE_DESIGN.md)'s "show, don't tell" taken to its logical end, and it embodies Constitution Article II (the product's quality *is* the marketing).

## The spectrum (from static → live)
1. **Framed static screenshots** — real UI in consistent dark/hairline panels (Linear, Raycast, ASKTC's dual mockups).
2. **Ambient/animated product motifs** — status marquees, streaming logs, live counters that *demonstrate* the value (Aeroplane's status ticker, OutRay's request log, ASKTC's live queue).
3. **Proof-by-portfolio galleries** — a rotating showcase of outputs when your value is quality/variety (Taste Skill).
4. **Fully interactive embedded demos** — let the visitor *use* the product in the page (Impeccable's "adapt this UI"). The strongest, hardest form.
5. **Choreographed product cinema** — scroll-linked reveals of a physical/hardware product (Apple).

## Why it works ([`../05-VISUAL_PSYCHOLOGY.md`](../05-VISUAL_PSYCHOLOGY.md))
- **Concrete beats abstract** — seeing the real UI answers "what is this, actually?" instantly.
- **Demonstration builds belief** — a working demo is more credible than any adjective ("fast" vs. *seeing* it be fast).
- **Reduces "will it fit me?" friction** — dual/persona mockups (ASKTC) and stack-specific snippets (OutRay) let visitors self-identify.

## The enabling craft moves
- **Consistent framing** — product shots live in a repeatable panel style aligned to the grid ([`../11-CARD_DESIGN.md`](../11-CARD_DESIGN.md), [`../10-GRID_SYSTEM.md`](../10-GRID_SYSTEM.md)).
- **The site embodies the promise** — a fast tool has a fast site; a tasteful tool has a tasteful site (Raycast, Taste Skill, Impeccable) → Art. II/VII.
- **Show both sides of two-sided products** (ASKTC: moderator + audience) → [`../26-USER_EXPERIENCE.md`](../26-USER_EXPERIENCE.md).

## ⚠️ The costs and cautions
- **Performance:** high-res screenshots, galleries, and live demos threaten LCP/CLS and bandwidth — budget images, lazy-load, and optimize ([`../35-PERFORMANCE.md`](../35-PERFORMANCE.md)).
- **Motion safety:** streaming logs / marquees / scroll cinema must honor `prefers-reduced-motion` and throttle CPU ([`../23-MOTION_SYSTEM.md`](../23-MOTION_SYSTEM.md)).
- **Accessibility:** interactive demos must be keyboard-operable and degrade without JS; animated content needs static/text equivalents ([`../22-ACCESSIBILITY.md`](../22-ACCESSIBILITY.md)).
- **Maintenance:** real product shots go stale on every redesign — plan to keep them current (or automate capture).
- **Honesty:** simulated "live" data must be labeled; don't imply real activity that isn't there (Art. III).
- **Asset quality bar:** the style collapses with mediocre screenshots — it demands genuine craft (Apple-level for the cinema variant).

## How to apply it in our system
| Move | Our chapter |
| --- | --- |
| Real UI / live demo as hero (not stock art) | [`../17-LANDING_PAGE_DESIGN.md`](../17-LANDING_PAGE_DESIGN.md) |
| Consistent product-panel framing | [`../11-CARD_DESIGN.md`](../11-CARD_DESIGN.md), [`../10-GRID_SYSTEM.md`](../10-GRID_SYSTEM.md) |
| Site embodies the product promise | [`../00-CONSTITUTION.md`](../00-CONSTITUTION.md) (Art. II/VII) |
| Demo motion: perf + reduced-motion + a11y | [`../35-PERFORMANCE.md`](../35-PERFORMANCE.md), [`../23-MOTION_SYSTEM.md`](../23-MOTION_SYSTEM.md), [`../22-ACCESSIBILITY.md`](../22-ACCESSIBILITY.md) |
| Dual-persona mockups for two-sided products | [`../26-USER_EXPERIENCE.md`](../26-USER_EXPERIENCE.md) |
