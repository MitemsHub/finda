---
site: "Taste Skill"
url: "https://www.tasteskill.dev"
date_analyzed: "2026-07-08"
category: "landing"
tags: ["developer-tool", "ai-agents", "anti-slop", "product-as-hero", "gallery", "open-source", "meta"]
essence: "A meta 'anti-slop' frontend skill for AI coding agents whose own site is the proof — a gallery of striking, non-generic UI screenshots argues 'we make agents design like this.'"
confidence: "mixed"
analyst: "agent (Studio OS reference engine)"
---

# Reference Teardown: Taste Skill

> **Essence:** "The Anti-Slop Frontend Framework for AI Agents. Less slop, designs pop." An open-source SKILL.md package that stops coding agents (Cursor, Claude Code, v0, Lovable…) from generating generic frontends. The site's central argument is **proof-by-portfolio**: a rotating gallery of bold, varied UI previews demonstrates the taste the skill instills.
> **Source:** https://www.tasteskill.dev · analyzed 2026-07-08 · confidence: mixed (live homepage capture)

> ⚖️ **Copying-line status:** PASS — principles only. No assets/copy reproduced. (Note: this product is *conceptually adjacent* to our own [`51-REFERENCE_ANALYSIS.md`](../51-REFERENCE_ANALYSIS.md) — a useful peer to study, not imitate.)

## 1. Design Philosophy
Taste Skill sells *taste*, so it must **have** taste — the site is its own strongest evidence. It leads with a sharp, opinionated tagline, an install one-liner, and immediately a **gallery of diverse, high-craft UI previews** (heroimg1–7). The message: generic "AI slop" is the enemy; variety and boldness are the cure. It's confident, developer-native, and portfolio-forward.

## 2. Typography Breakdown
- **Family (inferred):** clean modern sans; tight, confident display for the tagline.
- **Hierarchy:** big opinionated headline ("Taste Skill / The Anti-Slop Frontend Framework"), short punchy subline ("Less slop, designs pop."), mono for the install command. Type is assertive but restrained — it lets the gallery carry visual richness.

| Role | Size (approx) | Weight | Notes |
| --- | --- | --- | --- |
| Display | ~48–72px | 600–700 | opinionated tagline |
| Sub/slogan | ~18–20px | 400–500 | memorable, rhyming |
| Command | mono ~13–14px | 400 | `npx skills add …` (copyable) |

## 3. Color Palette
- Restrained neutral chrome so the **colorful, varied gallery images** provide the chromatic energy (color-via-content, neutral-via-chrome — same split as Avnac). A single accent for CTAs.

## 4. Spacing Scale
- Generous, gallery-forward; large hero region dominated by the rotating preview strip; comfortable section rhythm.

## 5. Grid System
- Capped content; a **marquee/gallery** of preview cards is the signature layout element; agent-logo grid ("Works with every agent"); sponsor row.

## 6. Motion Language
- **Auto-scrolling gallery marquee** of UI previews (continuous). Likely subtle hover/entrance. The marquee is the hero motion — must be reduced-motion-safe.

## 7. Interaction Patterns
- Copy-command CTA; GitHub as co-primary (OSS); an interactive "compatible agents" list; sponsor logos for credibility. The gallery invites browsing.

## 8. UX Principles
- **Be your own proof** — a taste product must look tasteful ([`03`](../03-BRAND_STRATEGY.md), Art. VII).
- **Portfolio-as-argument** — show range/quality rather than claim it ([`17`](../17-LANDING_PAGE_DESIGN.md) show-don't-tell).
- **Meet developers in their workflow** (SKILL.md, install one-liner, agent logos).

## 9. Reusable Ideas (as principles)
- **The product's site must embody the product's promise** (a taste tool with taste) → Art. II/VII, [`17`](../17-LANDING_PAGE_DESIGN.md).
- **Proof-by-portfolio gallery** when your value is quality/variety → [`17`](../17-LANDING_PAGE_DESIGN.md).
- **Color via content, neutral chrome** keeps a rich gallery from a chaotic UI palette → [`06`](../06-COLOR_SYSTEM.md).
- **Compatibility/logo grids** reduce "will it work with my stack?" friction → objection handling.

## 10. Things to Avoid
- Continuous gallery marquees can distract + harm reduced-motion/perf — throttle, pause-on-hover, honor `prefers-reduced-motion` ([`23`](../23-MOTION_SYSTEM.md), [`35`](../35-PERFORMANCE.md)).
- A gallery of many high-res previews risks heavy LCP/bandwidth — budget images ([`35`](../35-PERFORMANCE.md)).
- "Anti-slop" is itself becoming a trend — ironically at risk of a same-y look; differentiate via substance ([`51`](../51-REFERENCE_ANALYSIS.md) copying line).

## 11. How to Recreate This Style Without Copying
1. If you sell quality/taste/craft, make the **site itself the proof** — invest disproportionately in its polish.
2. Use a **portfolio/gallery** to *show* range rather than assert it (your work, not theirs).
3. Keep **chrome neutral**, let content bring the color.
4. Meet users in their **workflow** (install one-liner, integration logos).
5. Make galleries **performant + reduced-motion-safe** (pause on hover, lazy-load).
6. Diverge via your own tagline voice, gallery content, and accent.

---
## Mapping to our systems
| Finding | Our chapter |
| --- | --- |
| Site embodies the promise | [`17`](../17-LANDING_PAGE_DESIGN.md), [`00`](../00-CONSTITUTION.md) (Art. VII) |
| Proof-by-portfolio gallery | [`17`](../17-LANDING_PAGE_DESIGN.md) |
| Color via content, neutral chrome | [`06`](../06-COLOR_SYSTEM.md) |
| Peer to our reference engine | [`51`](../51-REFERENCE_ANALYSIS.md) |
