# Backend Architecture & System Connections

This document outlines the backend infrastructure for the Finda application.

## 1. Data layer: demo mode → Supabase

Finda has a **two-mode data layer**:

- **Demo mode (default):** `src/lib/data/demo.ts` provides 12 realistic seeded businesses, bookings, reviews, favorites, and notifications. Client mutations persist to `localStorage` via a tiny pub/sub store (`subscribe()` + `useStoreVersion()` hook). The app is fully interactive with no backend.
- **Live mode:** when `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set, the middleware, auth actions (`src/lib/actions/*`), and health check activate. UI types (`Business`, `Booking`, `Review`, …) are shared between both modes, so components don't change.

### Database
Schema lives in two files, run in order:
1. `supabase_schema.sql` — tables (`profiles`, `categories`, `businesses`, `reviews`, `bookings`, `favorites`), base RLS, triggers (updated_at, profile-on-signup).
2. `supabase_upgrade.sql` — `business_services` table, rating-aggregation trigger (keeps `businesses.rating`/`review_count` in sync), booking status-transition guard, RLS gap fixes (admin moderation, review edits), seed categories, and search indexes.

### Client-side vs server-side
- **Client-side:** `src/lib/supabase/client.ts` — singleton browser client.
- **Server-side:** `src/lib/supabase/server.ts` — cookie-aware client for Server Components and Route Handlers.
- **Middleware:** `src/middleware.ts` + `src/utils/supabase/middleware.ts` — session refresh; **gracefully no-ops in demo mode** so the app never crashes without env vars.

## 2. API connections
- **Health check:** `GET /api/health` — reports `demo-mode` when Supabase isn't configured; otherwise pings the database and returns latency.
- **Pattern:** Next.js Route Handlers (`src/app/api/...`) for REST endpoints; Server Actions (`src/lib/actions/*`) for mutations from the UI.
- **Security:** all server data access goes through `createClient()` from `src/lib/supabase/server.ts` so RLS is enforced.

## 3. External service integrations
Service layers in `src/services/`:
- **Payments:** `src/services/payment.ts` — **Flutterwave** (Nigeria-first). Demo stub by default; set `FLUTTERWAVE_SECRET_KEY` for live NGN checkout with server-side verification.
- **Email:** `src/services/email.ts` — interface ready for Resend/SendGrid (booking confirmations, broadcasts).

## 4. Security implementation
- **RLS:** enabled on every table; policies cover owner/admin/user scopes. `supabase_upgrade.sql` closes gaps (admin moderation on reviews/bookings/profiles, review-edit policy).
- **Booking integrity:** DB-level status-transition guard prevents illegal jumps (`cancelled → confirmed` etc.).
- **Input validation:** add Zod schemas in actions when wiring live auth (recommended).
- **Demo data never leaves the browser** — no server writes in demo mode.

## 5. Monitoring
- **Connection health:** monitor via `/api/health` (demo-mode aware).
- **Logging:** console logging in place; recommend Sentry for production.
