# 19 — E-commerce Design

### Product Discovery, Trust, and Checkout Conversion

> *"Every extra field, every hidden fee, every slow image is a person abandoning a full cart. E-commerce design is the art of removing reasons to leave."*

---

**Chapter type:** Phase 4 — Product Surfaces
**DRI:** Product Designer + SEO Specialist + Frontend Architect (joint)
**Depends on:** [`00-CONSTITUTION.md`](./00-CONSTITUTION.md), [`05`](./05-VISUAL_PSYCHOLOGY.md), [`11`](./11-CARD_DESIGN.md)–[`13`](./13-FORM_DESIGN.md), [`17`](./17-LANDING_PAGE_DESIGN.md), [`35`](./35-PERFORMANCE.md), [`36`](./36-SEO.md), [`37`](./37-SECURITY.md)
**Feeds:** [`20-MOBILE_FIRST.md`](./20-MOBILE_FIRST.md), [`26-USER_EXPERIENCE.md`](./26-USER_EXPERIENCE.md)

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

This chapter defines how the studio designs commerce experiences — storefronts, category/search, product detail pages (PDP), cart, and checkout — optimized for **discovery, trust, and conversion**, ethically. It applies cards ([`11`](./11-CARD_DESIGN.md)), forms ([`13`](./13-FORM_DESIGN.md)), performance ([`35`](./35-PERFORMANCE.md)), SEO ([`36`](./36-SEO.md)), and security ([`37`](./37-SECURITY.md)) to the specific goal of helping people find the right product and buy it with confidence.

E-commerce is where design decisions have the most directly measurable financial impact: a slow PDP, a confusing checkout, or a hidden shipping fee translates immediately into abandoned carts and lost revenue. It is also where dark patterns are most tempting and most damaging — so this chapter is explicit that conversion is pursued *honestly* (Article III, [`05`](./05-VISUAL_PSYCHOLOGY.md)).

---

## 2. Philosophy

**Remove reasons to leave.** Conversion optimization is less about clever persuasion and more about **subtraction of friction and doubt**: fast pages, clear photos, honest prices, obvious availability, trusted payment, effortless checkout. Every point of confusion or distrust is an exit. The studio's job is to find and remove them ([`04`](./04-DESIGN_PHILOSOPHY.md) P1, [`26`](./26-USER_EXPERIENCE.md)).

**Trust is the currency of commerce.** A stranger is about to give money and personal/payment data to a website. Everything — photography quality, review authenticity, security signals, transparent pricing, clear policies — either builds or erodes the trust required to complete that transaction ([`05`](./05-VISUAL_PSYCHOLOGY.md), [`03`](./03-BRAND_STRATEGY.md)). Trust, once broken (a surprise fee at checkout), rarely recovers within the session.

**Honest conversion is the only conversion worth having.** Fake urgency, drip-pricing (hiding fees until the last step), sneaking items into carts, and confirmshaming can lift a checkout metric today and generate refunds, chargebacks, and lost lifetime value tomorrow (and, increasingly, regulatory penalties). The studio converts by *deserving* the sale, not tricking it (Article III, [`05`](./05-VISUAL_PSYCHOLOGY.md) Persuasion Ethics Test).

**Performance is revenue.** In commerce the LCP/CLS→conversion link is well documented: slower pages and layout shift measurably reduce sales, especially on mobile where most shopping happens. Speed is not a technical nicety; it is a design and business requirement (Article II, [`35`](./35-PERFORMANCE.md), [`20`](./20-MOBILE_FIRST.md)).

---

## 3. Principles

### Principle 1 — Make products findable (search, filter, IA)
Robust search, useful filters/facets, and clear taxonomy so users reach the right product fast.
> *Rationale ([`27`](./27-INFORMATION_ARCHITECTURE.md)):* If they can't find it, they can't buy it.

### Principle 2 — The PDP must answer every buying question
Photos, price, variants, availability, shipping, returns, reviews, specs — remove doubt on one page.
> *Rationale (Art. I):* Unanswered questions = abandonment.

### Principle 3 — Honest, all-in pricing shown early
Show total cost (incl. shipping/taxes/fees) as early as possible; never drip fees at the last step.
> *Rationale (Art. III):* Drip-pricing is a banned dark pattern and the #1 cart-abandonment cause.

### Principle 4 — Frictionless checkout; guest checkout always
Minimal fields, guest option, autofill, correct input types, clear steps, saved payment.
> *Rationale ([`13`](./13-FORM_DESIGN.md)):* Forced account creation is a top abandonment driver.

### Principle 5 — Real trust signals, no fake ones
Authentic reviews, clear policies, security/payment badges, real stock levels.
> *Rationale (Art. III, [`05`](./05-VISUAL_PSYCHOLOGY.md)):* Fabricated urgency/reviews destroy trust and are banned.

### Principle 6 — Performance is a conversion feature
Optimize LCP (hero/product image), prevent CLS, lazy-load, responsive images.
> *Rationale ([`35`](./35-PERFORMANCE.md)):* Speed directly moves revenue, esp. mobile.

### Principle 7 — Mobile-first commerce
Most shopping is mobile; thumb-reach CTAs, mobile-optimized gallery/checkout.
> *Rationale ([`20`](./20-MOBILE_FIRST.md)):* Design for the majority device.

### Principle 8 — Secure by default; protect payment data
PCI-conscious flows, tokenized payments, HTTPS, no card data in your logs.
> *Rationale (Art. III, [`37`](./37-SECURITY.md)):* Security is the floor for handling money/PII.

### Principle 9 — Accessible commerce
Everyone can browse and buy: keyboard, screen-reader, contrast, labeled controls throughout.
> *Rationale (Art. III, [`22`](./22-ACCESSIBILITY.md)):* Inaccessible checkout excludes customers (and is a legal risk).

---

## 4. Best Practices

### 4.1 The conversion funnel

```mermaid
flowchart LR
    A["Discovery<br/>home · category · search"] --> B["PDP<br/>answer every question"]
    B --> C["Cart<br/>transparent totals + edit"]
    C --> D["Checkout<br/>guest · minimal · autofill"]
    D --> E["Payment<br/>trusted · secure · tokenized"]
    E --> F["Confirmation<br/>clear receipt + next steps"]
    F --> G["Post-purchase<br/>tracking · returns · re-engage (honestly)"]
```

### 4.2 The product card (discovery workhorse, [`11`](./11-CARD_DESIGN.md))
Image (consistent aspect ratio) + name + price (+ sale price honestly) + rating + quick "add"/wishlist. Fast-loading, accessible, consistent across the grid. Use the intrinsic auto-grid ([`10`](./10-GRID_SYSTEM.md)).

### 4.3 The product detail page (PDP)
- **Gallery:** multiple high-quality images/video, zoom, consistent aspect ratios (reserve space → no CLS).
- **Above the fold:** name, price (all-in clarity), variant selectors (size/color with availability), primary "Add to cart," key trust signals.
- **Answer doubts:** shipping cost + ETA, returns policy, stock/availability, specs, authentic reviews with distribution.
- **Variants:** clear, accessible selection; disabled/out-of-stock states explained ([`12`](./12-BUTTON_DESIGN.md), not color-only).

### 4.4 Cart & checkout
- **Cart:** editable quantities, clear line items, **transparent running total including shipping/tax estimate**, obvious CTA, easy "continue shopping."
- **Guest checkout** always offered; account creation optional *after* purchase.
- **Minimal fields**, address autofill/lookup, correct input types ([`13`](./13-FORM_DESIGN.md)), inline validation, never lose input.
- **Progress clarity** (steps or single-page); show what's left.
- **Multiple payment methods** (cards + wallets like Apple/Google Pay speed mobile checkout dramatically).
- **No forced upsells/pre-checked add-ons** ([`05`](./05-VISUAL_PSYCHOLOGY.md)); upsells are opt-in and honest.

### 4.5 Honest pricing & urgency
- Show **all-in price early**; if fees are unavoidable at a step, disclose them well before the final click.
- Urgency/scarcity only if **real** ("3 left" only when true; sale timers only for real sales). Genuine scarcity is ethical; fabricated is banned (Art. III).

### 4.6 Performance for commerce ([`35`](./35-PERFORMANCE.md))
- Optimize the **PDP hero image** (responsive `srcset`, AVIF/WebP, preload); reserve space to prevent CLS.
- Lazy-load below-fold + gallery extras; virtualize long product grids.
- Prefetch likely next steps (PDP → cart). SSR/edge for fast category/PDP loads ([`31`](./31-NEXTJS_GUIDE.md)).

### 4.7 SEO for commerce ([`36`](./36-SEO.md))
- Semantic structure, unique titles/meta per product/category, product **structured data** (offers, price, availability, reviews), canonical URLs, clean faceted-URL handling, alt text on product images.

### 4.8 Security & privacy ([`37`](./37-SECURITY.md))
- HTTPS everywhere; **tokenized payments** via a compliant processor (don't touch raw card data); never log PANs; CSRF protection; rate-limit; clear privacy handling of PII.

---

## 5. Anti-Patterns

| Anti-pattern | Why it fails | Principle/Article |
| --- | --- | --- |
| **Drip-pricing / hidden fees** at final step | #1 abandonment cause; banned dark pattern. | P3, Art. III |
| **Forced account creation** to buy | Major abandonment driver. | P4 |
| **Fake urgency/scarcity/countdowns** | Destroys trust; banned. | P5, Art. III |
| **Sneak-into-cart / pre-checked add-ons** | Manipulative; refunds/chargebacks. | P4/P5, Art. III |
| **Poor/few product images** | Can't evaluate; low confidence. | P2 |
| **Confusing variant/stock states** (color-only) | Errors, exclusion. | P2, [`22`](./22-ACCESSIBILITY.md) |
| **Slow PDP / image CLS** | Direct revenue loss, esp. mobile. | P6 |
| **Long/clunky mobile checkout** | Abandonment on the majority device. | P7 |
| **Fabricated reviews** | Trust + legal risk. | P5, Art. III |
| **Insecure payment handling** | Catastrophic; illegal. | P8, Art. III |

---

## 6. Real-World Examples

### Example A — Transparent shipping recovered abandoned carts
A store showed shipping only on the final checkout step; cart abandonment was very high. Surfacing an **all-in total (with a shipping estimate) in the cart and even on the PDP** removed the last-step surprise. Abandonment dropped sharply — not through a trick, but by *removing a distrust trigger* (Principle 3, Article III). *The surprise fee was the problem.*

### Example B — Guest checkout + wallet payments on mobile
A mobile checkout forced account creation and manual card entry; conversion was weak. Adding **guest checkout** and **Apple/Google Pay** cut the flow to a couple of taps with autofill. Mobile conversion rose substantially. *Every removed field/step is recovered revenue (Principles 4, 7).*

### Example C — Rejecting fake urgency, keeping honest scarcity
Growth proposed persistent "🔥 Only 2 left!" and "⏰ Sale ends in 5:00" banners regardless of truth. Failed the Persuasion Ethics Test — **rejected** (Article III). Instead, the team showed **real** low-stock ("Only 2 left" *when true*) and **real** sale end dates. Still motivating, fully honest, no chargeback/return spike or reputational risk. *(Principle 5.)*

---

## 7. Common Mistakes

- **Hiding total cost** until the last step (drip-pricing).
- **Requiring accounts** before purchase.
- **Weak product imagery** and missing key info on the PDP.
- **Color-only** variant/stock/sale indicators.
- **Ignoring PDP/image performance** (slow LCP, CLS from unsized images).
- **Clunky mobile checkout** with wrong input types and too many fields.
- **Fake urgency/reviews** for a short-term bump.
- **Sloppy payment security** or logging sensitive data.
- **Neglecting product structured data** and SEO for category/PDP.

---

## 8. AI Implementation Guidance

### 8.1 Where agents help
- **Run the "Any References?" protocol** ([`51`](./51-REFERENCE_ANALYSIS.md)) — commerce/marketplace exemplars (DoorDash, Uber Eats, Airbnb) are in the KB.
- **Generate PDP/cart/checkout** with accessible variants, guest checkout, honest pricing, and all states.
- **Produce product structured data + SEO metadata** ([`36`](./36-SEO.md)).
- **Optimize commerce performance** (responsive images, CLS prevention, prefetch).
- **Audit** for drip-pricing, forced accounts, fake urgency, sneak-into-cart, color-only states, insecure payment handling, and CWV issues.

### 8.2 Hard rules (Art. III)
- **No dark patterns** — the agent refuses drip-pricing, fake urgency/scarcity, sneak-into-cart, pre-checked add-ons, and confirmshaming even if asked to "increase conversion," and runs the Persuasion Ethics Test.
- **All-in pricing shown early**; **guest checkout** always available.
- **No fabricated reviews/stock/urgency.**
- **Payment handling secure** (tokenized via compliant processor; never store/log card data).
- Variants/stock/sale states are **not color-only**; checkout is **accessible** and **performant** (LCP/CLS budget).

### 8.3 Prompt example — build a PDP + checkout
```
ROLE: Product Designer + Frontend + SEO, bound by 00-CONSTITUTION + 19.
PRECONDITION: run the 51 references protocol; cite commerce exemplars used.
INPUT: product data schema; brand (03).
TASK:
  1. PDP: gallery (no CLS), all-in price, accessible variant/stock states, shipping/returns,
     authentic reviews, primary Add-to-cart. Product structured data + meta.
  2. Cart: editable, transparent total incl. shipping/tax estimate.
  3. Checkout: GUEST option, minimal fields, autofill, wallet payments, inline validation,
     never lose input; secure tokenized payment note.
  4. All states (loading/empty/error/out-of-stock); mobile-first, thumb-reach CTAs.
OUTPUT: pages (TSX) + structured data + a11y/perf/security self-check. Refuse any dark pattern.
```

### 8.4 Prompt example — audit
```
TASK: Audit the store for: hidden fees/drip-pricing, forced account creation, fake urgency/
scarcity, sneak-into-cart/pre-checked add-ons, color-only variant/stock states, slow PDP / image
CLS, missing product structured data, and insecure payment handling. Output {location, issue, fix}.
Flag any dark pattern or security issue as a blocker.
```

---

## 9. Human Review Checklist

- [ ] Products are **findable** (search, filters, clear IA).
- [ ] The **PDP answers every buying question** (photos, price, variants, availability, shipping, returns, reviews).
- [ ] **All-in pricing shown early**; no drip-pricing / hidden fees.
- [ ] **Guest checkout** available; checkout is minimal, autofilled, forgiving; input never lost.
- [ ] **Trust signals are real** (authentic reviews, honest stock/urgency, policies, security badges).
- [ ] Variant/stock/sale states are **not color-only** and are accessible.
- [ ] **Performance**: optimized product images, no CLS, LCP within budget.
- [ ] **Mobile-first**; thumb-reach CTAs; wallet payments offered.
- [ ] **Payments secure** (tokenized, HTTPS, no card data stored/logged); PII handled properly.
- [ ] **SEO**: product structured data, unique titles/meta, canonical, alt text.
- [ ] **No dark patterns**; every persuasive element passes the Ethics Test.

---

## 10. Automation Opportunities

| Task | Automation |
| --- | --- |
| Dark-pattern scan | LLM audit of pricing/cart/checkout vs. the [`05`](./05-VISUAL_PSYCHOLOGY.md) catalog. |
| CWV/commerce perf | Lighthouse CI with LCP/CLS budgets on PDP/category ([`35`](./35-PERFORMANCE.md)). |
| Structured data | Automated product-schema validation ([`36`](./36-SEO.md)). |
| Checkout a11y | axe + keyboard tests across the full funnel ([`22`](./22-ACCESSIBILITY.md)). |
| Payment security | SAST/DAST + checks that card data never hits logs ([`37`](./37-SECURITY.md)). |
| Image pipeline | Build-time responsive/modern-format + aspect-ratio enforcement. |
| Funnel analytics | Abandonment tracking per funnel step; alert on spikes. |

---

## 11. References for Further Study
- **Checkout & conversion:** the Baymard Institute body of research on cart/checkout usability and abandonment causes.
- **Ethical commerce:** deceptive-patterns catalog on drip-pricing/sneaking/urgency ([`05`](./05-VISUAL_PSYCHOLOGY.md)); relevant consumer-protection regulation on hidden fees.
- **Performance & revenue:** web.dev commerce Core Web Vitals case studies.
- **SEO for commerce:** search engines' product structured-data and faceted-navigation guidance ([`36`](./36-SEO.md)).
- **Payment security:** PCI-DSS basics and tokenization via compliant processors ([`37`](./37-SECURITY.md)).
- **Cross-references:** [`11-CARD_DESIGN.md`](./11-CARD_DESIGN.md), [`13-FORM_DESIGN.md`](./13-FORM_DESIGN.md), [`20-MOBILE_FIRST.md`](./20-MOBILE_FIRST.md), [`35-PERFORMANCE.md`](./35-PERFORMANCE.md), [`36-SEO.md`](./36-SEO.md), [`37-SECURITY.md`](./37-SECURITY.md), [`references/`](./references/README.md).

---

## 12. Review Checklist & Measurable Quality Criteria

| Criterion | Target |
| --- | --- |
| All-in price shown before final step | 100% |
| Guest checkout available | Yes (floor) |
| Dark patterns present | 0 (Art. III) |
| Fabricated reviews/urgency | 0 |
| Checkout accessible (AA, keyboard) | 100% (floor) |
| PDP LCP / CLS | LCP ≤ 2.5s / CLS ≤ 0.1 |
| Product structured data valid | 100% |
| Payment handling PCI-conscious (tokenized) | 100% (floor) |
| Cart abandonment rate | ↓ trend |
| Checkout completion / conversion | ↑ trend (trust guardrails held) |

---

*End of `19-ECOMMERCE_DESIGN.md`.*
