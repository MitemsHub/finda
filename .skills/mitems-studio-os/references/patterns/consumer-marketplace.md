# Pattern Synthesis: The Consumer Marketplace

> **Distilled from:** DoorDash, Uber Eats, Airbnb, Chowdeck, Glovo/Jumia, Pricepally (with Coursera as a "catalog" cousin).
> **What it is:** The recurring design language of two- and three-sided consumer marketplaces — apps where users **discover → decide → transact → track**, and where the platform must serve consumers, suppliers, and often couriers at once.

---

## The core insight
A marketplace's product *is trust plus friction-removal at scale.* Users are choosing among many options from strangers, spending money, and waiting for fulfillment — so the design must (1) make **discovery** fast, (2) make **decisions** confident, (3) make **transaction** effortless, and (4) make **fulfillment** transparent. Every one of these is a place users drop off, so the whole discipline is *removing reasons to leave* ([`../19-ECOMMERCE_DESIGN.md`](../19-ECOMMERCE_DESIGN.md), [`../26-USER_EXPERIENCE.md`](../26-USER_EXPERIENCE.md)).

## The shared moves (what they all do)
1. **The content card is the atomic unit.** Image + name + the 2–3 decision facts (price, rating, ETA/distance) + a save/act affordance. Reused in grids/carousels everywhere → [`../11-CARD_DESIGN.md`](../11-CARD_DESIGN.md).
2. **Discovery = search + filters/facets + curated rows.** "Popular near you," "Under 30 min," category tiles; robust search with location as a first-class input → [`../27-INFORMATION_ARCHITECTURE.md`](../27-INFORMATION_ARCHITECTURE.md).
3. **Trust scaffolding at the decision point.** Ratings/reviews, photos, ETAs, "verified," social proof — the anxiety-reducers that let a stranger commit → [`../05-VISUAL_PSYCHOLOGY.md`](../05-VISUAL_PSYCHOLOGY.md), [`patterns/trust-engineering.md`](./trust-engineering.md).
4. **Frictionless, mobile-first checkout.** Guest/express checkout, saved payment, wallet pay, minimal fields → [`../13-FORM_DESIGN.md`](../13-FORM_DESIGN.md), [`../20-MOBILE_FIRST.md`](../20-MOBILE_FIRST.md).
5. **Real-time fulfillment tracking** as a trust + delight moment (order status, live map, courier) → [`../24-MICRO_INTERACTIONS.md`](../24-MICRO_INTERACTIONS.md).
6. **Bottom-tab, thumb-reach navigation** (Home / Search / Orders / Account) → [`../20-MOBILE_FIRST.md`](../20-MOBILE_FIRST.md).
7. **A design system holds the scale together** across three audiences and thousands of screens → [`../14-COMPONENT_LIBRARY.md`](../14-COMPONENT_LIBRARY.md), [`../15-DESIGN_TOKENS.md`](../15-DESIGN_TOKENS.md) (Airbnb's DLS is the exemplar).
8. **Category-appropriate color psychology** (warm/appetite for food; fresh/trust for grocery) applied with craft → [`../06-COLOR_SYSTEM.md`](../06-COLOR_SYSTEM.md).

## The three-sided problem (the marketplace-specific hard part)
Most marketplaces serve **consumer + supplier + (often) courier** — each needs a distinct, well-designed surface:
- **Consumer app:** discovery → decision → checkout → tracking (above).
- **Supplier/merchant app:** order management, menu/inventory, payouts, analytics ([`../16-DASHBOARD_DESIGN.md`](../16-DASHBOARD_DESIGN.md)) — often *dense/utilitarian* by choice (DoorDash's merchant redesign lesson).
- **Courier app:** navigation, batching, earnings — optimized for glanceability + one-handed use in motion.
> Each audience gets a clear path ([`../26-USER_EXPERIENCE.md`](../26-USER_EXPERIENCE.md)); a great consumer app with a broken merchant app fails the whole marketplace.

## Where they differ (the interesting variation)
- **Palette temperature:** warm/urgent (DoorDash scarlet, Jumia orange) vs. cool/premium (Uber Eats black+green) vs. fresh (Pricepally green) — same category, different positioning ([`../02-PRODUCT_STRATEGY.md`](../02-PRODUCT_STRATEGY.md)).
- **Craft investment:** Glovo's polish vs. Jumia's "barest minimum" — a live demonstration that **craft is a moat** in crowded markets ([`../00-CONSTITUTION.md`](../00-CONSTITUTION.md) Art. VII).
- **Breadth:** single-category vs. **super-app** (Chowdeck: food + groceries + pharmacy + bills), which demands vertical-card organization to stay legible.
- **Local vs. global:** hyper-local catalogs (Pricepally's region gate) + cultural localization (Chowdeck's multilingual hook) as differentiation vs. incumbents.

## ⚠️ The ethics line (marketplaces are dark-pattern-prone)
- **Transparent all-in pricing** — no drip-pricing / hidden fees at the last step (the #1 abandonment cause *and* a banned dark pattern, [`../19-ECOMMERCE_DESIGN.md`](../19-ECOMMERCE_DESIGN.md), Art. III).
- **Honest scarcity/urgency** only ("2 left" / "sale ends" must be *true*), honest ratings (no fabricated reviews) → [`../05-VISUAL_PSYCHOLOGY.md`](../05-VISUAL_PSYCHOLOGY.md).
- **Fair to suppliers/couriers**, not just consumers — a marketplace that exploits one side isn't sustainable.

## How to apply it in our system
| Move | Our chapter |
| --- | --- |
| Content-card discovery unit | [`../11-CARD_DESIGN.md`](../11-CARD_DESIGN.md) |
| Search + facets + curated rows | [`../27-INFORMATION_ARCHITECTURE.md`](../27-INFORMATION_ARCHITECTURE.md) |
| Trust scaffolding at decision point | [`patterns/trust-engineering.md`](./trust-engineering.md), [`../05-VISUAL_PSYCHOLOGY.md`](../05-VISUAL_PSYCHOLOGY.md) |
| Frictionless mobile checkout + real-time tracking | [`../13-FORM_DESIGN.md`](../13-FORM_DESIGN.md), [`../19-ECOMMERCE_DESIGN.md`](../19-ECOMMERCE_DESIGN.md), [`../24-MICRO_INTERACTIONS.md`](../24-MICRO_INTERACTIONS.md) |
| Multi-sided surfaces (consumer/merchant/courier) | [`../16-DASHBOARD_DESIGN.md`](../16-DASHBOARD_DESIGN.md), [`../26-USER_EXPERIENCE.md`](../26-USER_EXPERIENCE.md) |
| DLS holds the scale | [`../14-COMPONENT_LIBRARY.md`](../14-COMPONENT_LIBRARY.md), [`../15-DESIGN_TOKENS.md`](../15-DESIGN_TOKENS.md) |
| Transparent pricing + honest proof (ethics) | [`../19-ECOMMERCE_DESIGN.md`](../19-ECOMMERCE_DESIGN.md), [`../00-CONSTITUTION.md`](../00-CONSTITUTION.md) (Art. III) |
