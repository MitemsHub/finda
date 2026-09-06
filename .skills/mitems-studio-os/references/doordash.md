---
site: "DoorDash"
url: "https://doordash.com"
date_analyzed: "2026-07-08"
category: "food-delivery"
tags: ["food", "delivery", "appetite-color", "photography", "mobile-first", "conversion", "design-system", "marketplace"]
essence: "Appetite engineering at scale: energetic scarlet-on-white, food photography as the hero, and a card-dense, conversion-optimized marketplace held together by a token-based DLS."
confidence: "mixed"
analyst: "agent (Studio OS reference engine)"
---

# Reference Teardown: DoorDash

> **Essence:** A food-delivery marketplace tuned for hunger and speed. A vivid **scarlet (`~#EB1700/#FF3008`) on white** palette creates energy and urgency without overwhelming; **food photography** is the true hero; the UI is a dense but scannable card grid engineered for fast discovery → order. A semantic-token design system (with light/dark) keeps a massive multi-platform product coherent.
> **Source:** https://doordash.com · analyzed 2026-07-08 · confidence: mixed (public design-analysis + engineering blog corroboration)

> ⚖️ **Copying-line status:** PASS — principles only. DoorDash's scarlet as-such, wordmark, imagery, and copy are NOT reproduced; hex recorded for study.

## 1. Design Philosophy
**Reduce friction between craving and checkout.** Every choice serves fast discovery and confident ordering: appetizing photos, clear ratings/ETAs, prominent "add to cart" actions, real-time tracking reassurance. Color psychology is deliberate — red/scarlet stimulates appetite and urgency; white keeps focus on the food. Consistency via a DLS is a reliability signal for a high-frequency transactional app.

## 2. Typography Breakdown
- **Family (inferred):** clean, highly legible sans; **bold weights** used strategically to guide the eye to prices and CTAs.
- **Hierarchy:** restaurant/dish name (large, bold) → price (medium, bold) → description (small, gray) — a repeatable card type hierarchy optimized for scanning.

| Role | Size (approx) | Weight | Notes |
| --- | --- | --- | --- |
| Screen title | ~24–28px | 700 | section headers |
| Card title | ~16–18px | 600–700 | restaurant/dish |
| Price | ~14–16px | 600 | scannable |
| Meta/desc | ~13–14px | 400 | rating, ETA, description |

## 3. Color Palette
- **Scarlet** `~#EB1700` (brand/primary actions/promos), **white** canvas, **Cod Gray** `~#191919` text. **Amber/gold** for rating stars; **green** for delivery-time/speed reassurance. Dark mode: not-pure-black bg (`~#1A1A1A`), slightly lighter red for contrast, brighter food photos.

## 4. Spacing Scale
- 4px scale; **card-dense** but with consistent gaps; comfortable tap targets for mobile. Density serves browsing many options quickly.

## 5. Grid System
- Mobile-first; horizontal-scroll carousels ("Popular near you", "Under 30 min") + vertical card lists; bottom tab navigation (Home/Search/Orders/Account) with icon+label clarity.

## 6. Motion Language
- Functional: real-time order-tracking animation (a key trust/delight moment), smooth transitions, add-to-cart feedback. Motion reassures (where's my food?) more than it decorates.

## 7. Interaction Patterns
- **The restaurant/dish card** is the core reusable unit (photo + name + rating + ETA + price). Powerful search/filter; radio-button customization; prominent floating cart/CTA; live tracking. Bottom nav for thumb reach.

## 8. UX Principles
- **Appetite + urgency via color** ([`05`](../05-VISUAL_PSYCHOLOGY.md), [`06`](../06-COLOR_SYSTEM.md)) — but functional, not manipulative.
- **Photography sells food** — invest in it → [`17`](../17-LANDING_PAGE_DESIGN.md).
- **Fast discovery → confident order** — minimize taps to checkout ([`13`](../13-FORM_DESIGN.md), [`26`](../26-USER_EXPERIENCE.md)).
- **Reassurance via tracking/ETAs** reduces post-order anxiety.
- **DLS + tokens** for multi-platform consistency → [`14`](../14-COMPONENT_LIBRARY.md), [`15`](../15-DESIGN_TOKENS.md).

## 9. Reusable Ideas (as principles)
- **Category-appropriate color psychology** (warm/appetite for food; a *justified* accent choice) → [`06`](../06-COLOR_SYSTEM.md).
- **The rich content card** (photo + key facts + price + action) as the workhorse pattern → [`11`](../11-CARD_DESIGN.md).
- **Speed/ETA + rating as pre-attentive trust signals** → [`05`](../05-VISUAL_PSYCHOLOGY.md).
- **Real-time tracking as a trust/delight moment** → [`24`](../24-MICRO_INTERACTIONS.md).
- **Bottom-tab, thumb-reach mobile nav** → [`20`](../20-MOBILE_FIRST.md).

## 10. Things to Avoid
- Food-delivery UIs are notorious for **hidden fees revealed late** — transparent all-in pricing is the ethical path (Art. III, [`05`](../05-VISUAL_PSYCHOLOGY.md)).
- High-saturation red must still meet **contrast** for text/CTAs ([`22`](../22-ACCESSIBILITY.md)).
- Promo urgency must be **real**, not fake countdowns (Art. III).
- Photo-heavy grids demand image performance discipline ([`35`](../35-PERFORMANCE.md)).

## 11. How to Recreate This Style Without Copying
1. Choose a **category-appropriate palette** for *your* food/consumer brand (warm/appetite family — your own hue, not DoorDash scarlet) and verify contrast.
2. Make **photography the hero**; design a strong **content card** (photo + name + rating + ETA + price + add action).
3. Optimize the **discovery → checkout** path for minimum taps; add **live tracking** reassurance.
4. Use **bottom-tab mobile nav** and thumb-reachable CTAs.
5. Keep pricing **transparent** (no hidden-fee dark patterns) and promos **honest**.
6. Diverge with your own brand hue, photography direction, and voice.

---
## Mapping to our systems
| Finding | Our chapter |
| --- | --- |
| Category color psychology (appetite) | [`05`](../05-VISUAL_PSYCHOLOGY.md), [`06`](../06-COLOR_SYSTEM.md) |
| Rich content card pattern | [`11`](../11-CARD_DESIGN.md) |
| Discovery→checkout, mobile-first | [`20`](../20-MOBILE_FIRST.md), [`26`](../26-USER_EXPERIENCE.md) |
| Transparent pricing (ethics) | [`05`](../05-VISUAL_PSYCHOLOGY.md), [`00`](../00-CONSTITUTION.md) |
