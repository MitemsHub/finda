# Finda — Nigeria's Trusted Guide to Local Businesses 🇳🇬

Finda is a three-sided local marketplace for Lagos first, Nigeria next: **neighbors** discover verified businesses and book or shop, **business owners** get a profile, storefront, and light business management, and **admins** keep the platform trustworthy.

**Market:** Nigeria (Lagos launch). Prices in Naira (₦). Payments via **Flutterwave**. Ordering: in-app checkout, with WhatsApp-first contact buttons on every profile.

## Stack

- **Next.js 14** (App Router) · React 18 · TypeScript
- **Tailwind CSS** with a semantic design-token system (`tailwind.config.ts`)
- **Supabase** (Postgres, Auth, RLS) — schema in `supabase_schema.sql` + `supabase_upgrade.sql`
- **Demo data layer** (`src/lib/data/demo.ts`) — the full app runs on realistic seed data with localStorage persistence until Supabase keys are configured. Zero code changes needed to go live.

## Getting started

```bash
bun install
bun run dev        # binds 0.0.0.0
```

Open http://localhost:3000. In demo mode, sign-in accepts anything and routes to the dashboard; bookings, favorites, and notifications persist to localStorage.

## Going live

1. Run `supabase_schema.sql`, then `supabase_upgrade.sql`, in your Supabase SQL editor.
2. Add env vars (Settings → Environment in Freebuff, or `.env.local` locally):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart. The middleware, auth actions, and data layer switch from demo mode to live queries automatically.

## Payments (Flutterwave)

`src/services/payment.ts` ships a `PaymentProvider` with two implementations:

- **Demo (default):** simulates checkout locally — build the full flow with zero keys.
- **Live:** set `FLUTTERWAVE_SECRET_KEY` and it switches to Flutterwave's REST API (`/v3/payments` init + `verify_by_reference` before fulfilling). Add `NEXT_PUBLIC_FLUTTERWAVE_PK` when using inline/inline-checkout on the client.

Every transaction must be verified server-side before a booking/order is confirmed.

## Email (Resend)

`src/services/email.ts` ships a `EmailProvider` with two implementations:

- **Demo (default):** sends are logged to the console — flows work with zero keys.
- **Live:** set `RESEND_API_KEY` (and `EMAIL_FROM`, e.g. `"Finda <hello@finda.ng>"`). Sends go through Resend's REST API for order confirmations, owner alerts, and booking updates.

Trigger points are already wired: `/api/orders/notify` (order placed → buyer + owner) and booking status changes.

## Design system

The visual identity is a "Trusted Local" editorial system:

| Token tier | Where | Examples |
|---|---|---|
| Semantic colors | `tailwind.config.ts` | `primary` (evergreen #1F5C45), `accent` (market amber), `paper`/`ink`/`line` neutrals, `success`/`danger`/`gold` |
| Type | `--font-display` (Playfair Display) for headings, `--font-body` (Inter) for UI | Matches the Expo app's pairing |
| Components | `src/app/globals.css` | `.card`, `.btn-primary`, `.field`, `.badge-*`, `.eyebrow`, `.verified-badge` |

Dark mode is class-based via `next-themes`. All text/background pairs target WCAG AA; motion respects `prefers-reduced-motion`.

## Key routes

| Route | Purpose |
|---|---|
| `/` | Landing: hero with live search, featured strip, features, how-it-works, business section, testimonials, CTA |
| `/search` | Discovery: full-text query, category/neighborhood filters, verified & open-now toggles, map toggle (Leaflet + OSM) |
| `/store/[slug]` | Shareable storefront: product grid, cart, WhatsApp ordering |
| `/checkout` → `/orders/[id]` | Guest-friendly checkout (pickup/delivery, Flutterwave-ready) and order tracking |
| `/feed` | Social feed: offers, events, and follower-only drops from followed businesses |
| `/business/[id]` | Profile: gallery, services with booking modal, review breakdown, hours, contact |
| `/dashboard` `/bookings` `/favorites` `/notifications` `/settings` | Signed-in user workspace |
| `/business/dashboard` | Owner console: overview, bookings, customers, reviews, gallery, settings |
| `/admin/*` | Platform admin: overview, approvals, businesses, users, categories, broadcasts, settings |
| `/get-started` | Auth: account-type-aware signup (user vs. business submission → admin approval) |
| `/api/businesses` `/api/businesses/[slug]` | Public JSON API consumed by the mobile app |
| `/api/checkout/init` `/api/checkout/verify` `/api/orders/notify` | Server-side Flutterwave init/verify + transactional email |
| `/api/health` | Health check; reports `demo-mode` when Supabase isn't configured |

## Mobile app (`mobile/`)

Expo 54 + expo-router app sharing the finda design system (teal `#14B8A6`, Playfair headings, Inter body) and consuming the same public API.

- **Tabs:** Home (categories, open-now rail, top-rated), Explore (search + filters + featured), Saved (on-device favorites), Profile
- **Business detail:** hero, WhatsApp/Call actions, storefront with product ordering over WhatsApp, services, hours, reviews with owner replies, share
- **Auth flow:** splash → sign-in/sign-up (user vs. business owner), verification code screen (scaffold; live auth lands with Supabase)

```bash
cd mobile
bun install
EXPO_PUBLIC_FINDA_API=https://your-finda-deployment bun start
```

`EXPO_PUBLIC_FINDA_API` defaults to `http://localhost:3000` for development. Native builds (`ios/`, `android/`) are generated with `npx expo prebuild` when needed.

## Agent skills

`.skills/` contains the curated skill library governing this project (product, design, engineering, growth), indexed in `.skills/README.md`.
