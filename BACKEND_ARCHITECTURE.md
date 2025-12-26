# Backend Architecture & System Connections

This document outlines the backend infrastructure established for the Finda application.

## 1. Database Connections & Supabase Integration
We use **Supabase** as our primary Backend-as-a-Service (BaaS), which provides:
- **PostgreSQL Database**: Accessed via secure connection pooling (PgBouncer) implicitly handled by Supabase.
- **Authentication**: JWT-based auth integrated with Next.js middleware.
- **Realtime**: WebSocket subscriptions for live updates.
- **Storage**: Object storage for images/files.

### Configuration
- **Client-side**: `src/lib/supabase/client.ts` - Singleton instance for browser usage.
- **Server-side**: `src/lib/supabase/server.ts` - Creates secure clients for Server Components and Route Handlers, handling cookie forwarding.
- **Middleware**: `src/middleware.ts` & `src/utils/supabase/middleware.ts` - Manages session refresh and route protection.

### Environment Variables
Required keys in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. API Connections
- **Health Check**: `GET /api/health` - Monitors database connectivity and system status.
- **Pattern**: Next.js Route Handlers (`src/app/api/...`) are used for REST endpoints.
- **Security**: All API routes should use `createClient()` from `src/lib/supabase/server.ts` to ensure RLS (Row Level Security) policies are respected.

## 3. External Service Integrations
Service layers have been established in `src/services/` to abstract external providers:
- **Payments**: `src/services/payment.ts` (Interface ready for Stripe/PayPal).
- **Email**: `src/services/email.ts` (Interface ready for SendGrid/Resend).

## 4. Security Implementation
- **TLS/SSL**: Enforced by default on Vercel/Supabase connections.
- **RLS**: Row Level Security must be enabled on all Supabase tables to restrict access based on user roles.
- **Input Validation**: Should be implemented using Zod (recommended) in API routes.

## 5. Monitoring
- **Connection Health**: Monitor via `/api/health`.
- **Logging**: Console logging is in place; recommend integrating Sentry or similar for production.
