# Finda — Agent Skill Library

Curated skills installed from two sources to govern how finda is designed, built, and grown:

- **[mitems-studio-os](https://github.com/MitemsHub/mitems-studio-os)** — 60-chapter studio operating system: constitution, design philosophy, color/typography/spacing systems, component & landing-page design, React/Next.js/Tailwind/Framer guides, security, testing, QA, deployment.
- **[claude-skills](https://github.com/alirezarezvani/claude-skills)** — production skill library. The subset below was selected for a local-business discovery & booking marketplace.

## Installed skills

### Product (`product-team/`)
| Skill | Use for |
|---|---|
| `product-discovery` | Validating finda's user/business/admin jobs-to-be-done before building features |
| `product-strategist` | Positioning: finda vs Yelp/Google Maps/Thumbtack |
| `ui-design-system` | Design tokens, semantic color tiers, component specs |
| `ux-researcher-designer` | Search → booking → review flows, usability heuristics |
| `saas-scaffolder` | Subscription tiers for businesses (if monetizing) |

### Engineering (`engineering-team/`, `engineering/`)
| Skill | Use for |
|---|---|
| `senior-frontend` | Next.js 14 App Router patterns, RSC vs client components |
| `senior-backend` | Supabase queries, server actions, RLS-safe data access |
| `senior-fullstack` | End-to-end feature slices |
| `code-reviewer` | Pre-merge review discipline |
| `tdd-guide` | Tests for actions/services |
| `stripe-integration-expert` | Real payments when wiring Stripe |
| `senior-security` | RLS policies, input validation, auth flows |
| `a11y-audit` | WCAG AA verification (contrast, keyboard, semantics) |
| `ponytail` (+ audit/debt/review/gain) | Minimalism discipline — cutting over-engineering, [ponytail.dev](https://github.com/DietrichGebert/ponytail) |

### Marketing / Growth (`marketing/`)
| Skill | Use for |
|---|---|
| `local-seo-manager` | Business pages that rank in local search |
| `page-cro`, `signup-flow-cro`, `onboarding-cro` | Conversion of visitors → searchers → bookers |
| `copywriting` | Landing page and product copy |

## How to use
Before implementing any feature, consult the relevant skill's `SKILL.md` and the matching mitems chapter. Non-negotiables from the mitems Constitution:

1. **The user is the point** — every decision resolves in favor of user outcome.
2. **Quality hierarchy** — security → accessibility → correctness → usability → performance → maintainability → aesthetics.
3. **Contrast is the floor** — AA minimum on every text/background pair; never encode meaning in color alone.
4. **Semantic tokens over raw values** — components never reference raw hex.
5. **Systems outlive heroics** — repeatable patterns over one-off cleverness.
