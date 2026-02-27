SupaProxy — Technical Implementation Plan

Project Overview

SupaProxy is a managed reverse proxy SaaS that routes Supabase API traffic through Cloudflare's edge network, bypassing ISP-level DNS poisoning/blocking of *.supabase.co in India and other affected regions.

Stack: 100% Cloudflare (Workers, D1, KV, Pages, R2, Analytics Engine, Durable Objects)

Table of Contents





Architecture Overview



Project Structure



Database Schema (D1)



Proxy Worker



Management API



Frontend Dashboard



Authentication & Authorization



Custom Domain Support



Rate Limiting



Analytics & Monitoring



Billing Integration



Deployment & CI/CD



Development Phases



Environment & Configuration



Testing Strategy



Security Checklist



Cost Estimation

1. Architecture Overview

┌─────────────────────────────────────────────────────────────────────┐ │                         End Users (India)                          │ │                    (Jio, Airtel, ACT Fibernet)                     │ └──────────────┬──────────────────────────────────┬───────────────────┘                │                                  │                │ App API calls                    │ Dashboard access                │ myapp.supaproxy.io               │ app.supaproxy.io                ▼                                  ▼ ┌──────────────────────────┐       ┌──────────────────────────────┐ │    PROXY WORKER          │       │    CLOUDFLARE PAGES          │ │    (Cloudflare Workers)  │       │    (SvelteKit Dashboard)     │ │                          │       │                              │ │  - Request forwarding    │       │  - User auth UI              │ │  - WebSocket upgrade     │       │  - App management            │ │  - Rate limiting         │       │  - Analytics display         │ │  - CORS handling         │       │  - Custom domain setup       │ │  - Response streaming    │       │  - Billing management        │ └─────────┬────────────────┘       └──────────────┬───────────────┘           │                                       │           │ Config lookup                         │ API calls           ▼                                       ▼ ┌──────────────────────────┐       ┌──────────────────────────────┐ │    CLOUDFLARE KV         │       │    MANAGEMENT API            │ │                          │       │    (Hono on Workers)         │ │  - Proxy routing table   │       │                              │ │  - Rate limit counters   │       │  - Auth endpoints            │ │  - Domain → app mapping  │       │  - App CRUD                  │ │                          │       │  - Domain verification       │ └──────────────────────────┘       │  - Analytics queries         │                                    │  - Billing webhooks          │ ┌──────────────────────────┐       └──────────────┬───────────────┘ │    DURABLE OBJECTS       │                      │ │                          │                      │ │  - WebSocket connection  │                      │ │    management            │                      ▼ │  - Precise rate limiting │       ┌──────────────────────────────┐ │  - Per-app state         │       │    CLOUDFLARE D1             │ └──────────────────────────┘       │    (SQLite Database)         │                                    │                              │ ┌──────────────────────────┐       │  - Users & sessions          │ │    ANALYTICS ENGINE      │       │  - Apps & configs            │ │                          │       │  - Custom domains            │ │  - Request metrics       │       │  - Billing state             │ │  - Latency tracking      │       │  - API keys                  │ │  - Error rates           │       └──────────────────────────────┘ │  - Geo breakdown         │ └──────────────────────────┘       ┌──────────────────────────────┐                                    │    EXTERNAL SERVICES         │ ┌──────────────────────────┐       │                              │ │    CLOUDFLARE R2         │       │  - Stripe (intl billing)     │ │                          │       │  - Razorpay (INR billing)    │ │  - User avatars          │       │  - Resend (transactional     │ │  - Export files          │       │    emails)                   │ └──────────────────────────┘       └──────────────────────────────┘                │                │ Upstream (server-to-server, not blocked)                ▼ ┌──────────────────────────┐ │    SUPABASE              │ │    *.supabase.co         │ │                          │ │  User's actual backend   │ └──────────────────────────┘ 

2. Project Structure

supaproxy/ ├── apps/ │   ├── proxy/                    # Cloudflare Worker — reverse proxy │   │   ├── src/ │   │   │   ├── index.ts          # Main entry, request router │   │   │   ├── handler.ts        # Proxy logic (HTTP + WebSocket) │   │   │   ├── config.ts         # KV config lookup │   │   │   ├── rate-limit.ts     # Rate limiting logic │   │   │   ├── cors.ts           # CORS handling │   │   │   ├── analytics.ts      # Write to Analytics Engine │   │   │   ├── rewrite.ts        # URL/header rewriting for Supabase │   │   │   └── types.ts          # Shared types │   │   ├── wrangler.toml │   │   └── package.json │   │ │   ├── api/                      # Cloudflare Worker — management API │   │   ├── src/ │   │   │   ├── index.ts          # Hono app entry │   │   │   ├── middleware/ │   │   │   │   ├── auth.ts       # Session validation middleware │   │   │   │   ├── rate-limit.ts # API rate limiting │   │   │   │   └── error.ts      # Error handling │   │   │   ├── routes/ │   │   │   │   ├── auth.ts       # Login, register, OAuth, logout │   │   │   │   ├── apps.ts       # App CRUD │   │   │   │   ├── domains.ts    # Custom domain management │   │   │   │   ├── analytics.ts  # Analytics queries │   │   │   │   ├── billing.ts    # Subscription management │   │   │   │   ├── api-keys.ts   # API key management │   │   │   │   └── health.ts     # Health check │   │   │   ├── services/ │   │   │   │   ├── kv-sync.ts    # D1 → KV sync for proxy config │   │   │   │   ├── domain.ts     # DNS verification logic │   │   │   │   ├── email.ts      # Transactional emails via Resend │   │   │   │   ├── billing.ts    # Stripe/Razorpay integration │   │   │   │   └── slug.ts       # Slug generation & validation │   │   │   ├── db/ │   │   │   │   ├── schema.ts     # Drizzle ORM schema │   │   │   │   ├── migrations/   # D1 migrations │   │   │   │   └── queries.ts    # Scoped query helpers │   │   │   └── types.ts │   │   ├── wrangler.toml │   │   └── package.json │   │ │   └── web/                      # Cloudflare Pages — SvelteKit dashboard │       ├── src/ │       │   ├── lib/ │       │   │   ├── api.ts        # API client (fetch wrapper) │       │   │   ├── stores/       # Svelte stores (user, apps) │       │   │   └── components/ │       │   │       ├── AppCard.svelte │       │   │       ├── CreateAppModal.svelte │       │   │       ├── DomainSetup.svelte │       │   │       ├── AnalyticsChart.svelte │       │   │       ├── RequestLog.svelte │       │   │       └── ... │       │   ├── routes/ │       │   │   ├── +layout.svelte │       │   │   ├── +page.svelte              # Landing page │       │   │   ├── login/+page.svelte │       │   │   ├── register/+page.svelte │       │   │   ├── dashboard/ │       │   │   │   ├── +page.svelte          # App list │       │   │   │   ├── +layout.svelte        # Dashboard shell │       │   │   │   ├── apps/ │       │   │   │   │   ├── new/+page.svelte  # Create app │       │   │   │   │   └── [id]/ │       │   │   │   │       ├── +page.svelte  # App detail/analytics │       │   │   │   │       ├── settings/+page.svelte │       │   │   │   │       └── domains/+page.svelte │       │   │   │   ├── billing/+page.svelte │       │   │   │   └── settings/+page.svelte # Account settings │       │   │   └── docs/                     # Integration docs │       │   │       └── +page.svelte │       │   └── app.css                       # Tailwind │       ├── static/ │       ├── svelte.config.js │       ├── tailwind.config.js │       └── package.json │ ├── packages/ │   └── shared/                   # Shared types, constants, utils │       ├── src/ │       │   ├── types.ts          # App, User, Domain types │       │   ├── constants.ts      # Plan limits, error codes │       │   └── validation.ts     # Zod schemas for inputs │       └── package.json │ ├── turbo.json                    # Turborepo config ├── package.json                  # Root workspace ├── .github/ │   └── workflows/ │       ├── deploy-proxy.yml │       ├── deploy-api.yml │       └── deploy-web.yml └── README.md 

3. Database Schema (D1)

Using Drizzle ORM with D1. All tables use TEXT primary keys (nanoid or UUID).

-- ============================================ -- USERS & AUTH -- ============================================  CREATE TABLE users (     id TEXT PRIMARY KEY,                        -- nanoid     email TEXT UNIQUE NOT NULL,     name TEXT,     avatar_url TEXT,     password_hash TEXT,                         -- null for OAuth-only users     email_verified INTEGER DEFAULT 0,     plan TEXT DEFAULT 'free',                   -- free | pro | business | enterprise     stripe_customer_id TEXT,     razorpay_customer_id TEXT,     created_at INTEGER DEFAULT (unixepoch()),     updated_at INTEGER DEFAULT (unixepoch()) );  CREATE TABLE sessions (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     token TEXT UNIQUE NOT NULL,     expires_at INTEGER NOT NULL,     ip_address TEXT,     user_agent TEXT,     created_at INTEGER DEFAULT (unixepoch()) );  CREATE INDEX idx_sessions_token ON sessions(token); CREATE INDEX idx_sessions_user ON sessions(user_id);  CREATE TABLE oauth_accounts (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     provider TEXT NOT NULL,                     -- google | github     provider_account_id TEXT NOT NULL,     access_token TEXT,     refresh_token TEXT,     created_at INTEGER DEFAULT (unixepoch()),     UNIQUE(provider, provider_account_id) );  CREATE TABLE email_verification_tokens (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     token TEXT UNIQUE NOT NULL,     expires_at INTEGER NOT NULL,     created_at INTEGER DEFAULT (unixepoch()) );  CREATE TABLE password_reset_tokens (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     token TEXT UNIQUE NOT NULL,     expires_at INTEGER NOT NULL,     created_at INTEGER DEFAULT (unixepoch()) );  -- ============================================ -- APPS -- ============================================  CREATE TABLE apps (     id TEXT PRIMARY KEY,                        -- nanoid     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     name TEXT NOT NULL,                         -- display name     slug TEXT UNIQUE NOT NULL,                  -- subdomain: <slug>.supaproxy.io     supabase_url TEXT NOT NULL,                 -- https://abcdefg.supabase.co     supabase_anon_key TEXT,                     -- optional, stored encrypted     is_active INTEGER DEFAULT 1,          -- Config     rate_limit_per_minute INTEGER DEFAULT 600,  -- 0 = unlimited (within plan)     allowed_origins TEXT DEFAULT '*',           -- comma-separated origins or *     custom_headers TEXT,                        -- JSON string of custom headers     enabled_services TEXT DEFAULT 'rest,auth,storage,realtime,functions,graphql',          -- Metadata     request_count_month INTEGER DEFAULT 0,     -- rough counter, reset monthly     last_request_at INTEGER,     created_at INTEGER DEFAULT (unixepoch()),     updated_at INTEGER DEFAULT (unixepoch()) );  CREATE INDEX idx_apps_user ON apps(user_id); CREATE INDEX idx_apps_slug ON apps(slug);  -- ============================================ -- CUSTOM DOMAINS -- ============================================  CREATE TABLE custom_domains (     id TEXT PRIMARY KEY,     app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     domain TEXT UNIQUE NOT NULL,                -- api.myapp.com     status TEXT DEFAULT 'pending_dns',          -- pending_dns | pending_ssl | active | error     cname_target TEXT NOT NULL,                 -- what user needs to CNAME to     ssl_status TEXT DEFAULT 'pending',          -- pending | active | error     verified_at INTEGER,     error_message TEXT,     last_checked_at INTEGER,     created_at INTEGER DEFAULT (unixepoch()),     updated_at INTEGER DEFAULT (unixepoch()) );  CREATE INDEX idx_domains_app ON custom_domains(app_id); CREATE INDEX idx_domains_domain ON custom_domains(domain);  -- ============================================ -- API KEYS -- ============================================  CREATE TABLE api_keys (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,     name TEXT NOT NULL,                         -- "Production", "CI/CD", etc.     key_hash TEXT UNIQUE NOT NULL,              -- SHA-256 hash of the key     key_prefix TEXT NOT NULL,                   -- first 8 chars for identification     last_used_at INTEGER,     expires_at INTEGER,                         -- null = never     created_at INTEGER DEFAULT (unixepoch()) );  CREATE INDEX idx_api_keys_user ON api_keys(user_id); CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);  -- ============================================ -- BILLING -- ============================================  CREATE TABLE subscriptions (     id TEXT PRIMARY KEY,     user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,     plan TEXT NOT NULL DEFAULT 'free',     status TEXT NOT NULL DEFAULT 'active',      -- active | cancelled | past_due     provider TEXT,                              -- stripe | razorpay     provider_subscription_id TEXT,     current_period_start INTEGER,     current_period_end INTEGER,     cancel_at_period_end INTEGER DEFAULT 0,     created_at INTEGER DEFAULT (unixepoch()),     updated_at INTEGER DEFAULT (unixepoch()) );  CREATE TABLE usage_records (     id TEXT PRIMARY KEY,     user_id TEXT NOT NULL REFERENCES users(id),     app_id TEXT NOT NULL REFERENCES apps(id),     month TEXT NOT NULL,                        -- "2026-02"     request_count INTEGER DEFAULT 0,     bandwidth_bytes INTEGER DEFAULT 0,     created_at INTEGER DEFAULT (unixepoch()),     UNIQUE(app_id, month) );  CREATE INDEX idx_usage_user_month ON usage_records(user_id, month); 

Drizzle ORM Schema (TypeScript)

// packages/shared/src/db/schema.ts import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';  export const users = sqliteTable('users', {   id: text('id').primaryKey(),   email: text('email').unique().notNull(),   name: text('name'),   avatarUrl: text('avatar_url'),   passwordHash: text('password_hash'),   emailVerified: integer('email_verified').default(0),   plan: text('plan').default('free'),   stripeCustomerId: text('stripe_customer_id'),   razorpayCustomerId: text('razorpay_customer_id'),   createdAt: integer('created_at').default(sql`(unixepoch())`),   updatedAt: integer('updated_at').default(sql`(unixepoch())`), });  export const apps = sqliteTable('apps', {   id: text('id').primaryKey(),   userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),   name: text('name').notNull(),   slug: text('slug').unique().notNull(),   supabaseUrl: text('supabase_url').notNull(),   supabaseAnonKey: text('supabase_anon_key'),   isActive: integer('is_active').default(1),   rateLimitPerMinute: integer('rate_limit_per_minute').default(600),   allowedOrigins: text('allowed_origins').default('*'),   customHeaders: text('custom_headers'),   enabledServices: text('enabled_services').default('rest,auth,storage,realtime,functions,graphql'),   requestCountMonth: integer('request_count_month').default(0),   lastRequestAt: integer('last_request_at'),   createdAt: integer('created_at').default(sql`(unixepoch())`),   updatedAt: integer('updated_at').default(sql`(unixepoch())`), });  // ... same pattern for other tables 

4. Proxy Worker

The core of the product. This Worker handles all proxied traffic.

4.1 Request Flow

Request hits <slug>.supaproxy.io/<path>     │     ▼ Extract hostname → derive slug (or lookup custom domain)     │     ▼ KV lookup: get app config by slug     │     ├── Not found → 404     ├── App inactive → 503     │     ▼ Rate limit check (KV atomic counter or Durable Object)     │     ├── Over limit → 429     │     ▼ CORS check (validate Origin against allowed_origins)     │     ├── OPTIONS preflight → return CORS headers     │     ▼ Check if service is enabled (parse path: /rest/, /auth/, /storage/, etc.)     │     ├── Disabled → 403     │     ▼ Determine if WebSocket upgrade (Realtime)     │     ├── Yes → WebSocket proxy handler     ├── No  → HTTP proxy handler     │     ▼ Build upstream URL: replace hostname with supabase_url Preserve: method, headers, body, query params     │     ▼ fetch() to upstream Supabase     │     ▼ Rewrite response (storage URLs, auth callback URLs if needed)     │     ▼ Write analytics data point to Analytics Engine     │     ▼ Return response to client 

4.2 KV Config Structure

// Key: "app:<slug>" or "domain:<custom-domain>" // Value: interface ProxyConfig {   appId: string;   userId: string;   supabaseUrl: string;               // "https://abcdefg.supabase.co"   supabaseAnonKey?: string;   isActive: boolean;   rateLimitPerMinute: number;   allowedOrigins: string;            // "*" or "https://myapp.com,https://www.myapp.com"   customHeaders?: Record<string, string>;   enabledServices: string[];         // ["rest", "auth", "storage", "realtime", "functions", "graphql"]   plan: string;                      // for enforcing plan-level limits   monthlyRequestLimit: number;       // derived from plan } 

4.3 Core Proxy Handler

// apps/proxy/src/handler.ts export async function handleHttpProxy(   request: Request,   config: ProxyConfig,   env: Env ): Promise<Response> {   const url = new URL(request.url);      // Build upstream URL   const upstreamUrl = new URL(config.supabaseUrl);   upstreamUrl.pathname = url.pathname;   upstreamUrl.search = url.search;    // Clone headers, remove hop-by-hop headers   const headers = new Headers(request.headers);   headers.set('Host', upstreamUrl.hostname);   headers.delete('cf-connecting-ip');   headers.delete('cf-ray');      // Add custom headers if configured   if (config.customHeaders) {     for (const [key, value] of Object.entries(config.customHeaders)) {       headers.set(key, value);     }   }    // Forward request   const upstreamResponse = await fetch(upstreamUrl.toString(), {     method: request.method,     headers,     body: request.method !== 'GET' && request.method !== 'HEAD'        ? request.body        : undefined,     redirect: 'manual',  // don't follow redirects, pass them through   });    // Clone response and rewrite if needed   const responseHeaders = new Headers(upstreamResponse.headers);      // Rewrite any supabase.co URLs in Location headers (redirects)   const location = responseHeaders.get('Location');   if (location && location.includes('.supabase.co')) {     responseHeaders.set('Location', location.replace(       new URL(config.supabaseUrl).hostname,       url.hostname     ));   }    // Add CORS headers   const origin = request.headers.get('Origin');   if (origin && isOriginAllowed(origin, config.allowedOrigins)) {     responseHeaders.set('Access-Control-Allow-Origin', origin);     responseHeaders.set('Access-Control-Allow-Credentials', 'true');     responseHeaders.set('Access-Control-Allow-Headers',        request.headers.get('Access-Control-Request-Headers') || '*');     responseHeaders.set('Access-Control-Allow-Methods',        'GET, POST, PUT, PATCH, DELETE, OPTIONS');     responseHeaders.set('Access-Control-Expose-Headers', '*');   }    // Add proxy identifier header   responseHeaders.set('X-Proxied-By', 'SupaProxy');    return new Response(upstreamResponse.body, {     status: upstreamResponse.status,     statusText: upstreamResponse.statusText,     headers: responseHeaders,   }); } 

4.4 WebSocket Handler (Realtime)

// apps/proxy/src/websocket.ts export async function handleWebSocket(   request: Request,   config: ProxyConfig,   env: Env ): Promise<Response> {   const url = new URL(request.url);   const upstreamUrl = new URL(config.supabaseUrl);   upstreamUrl.pathname = url.pathname;   upstreamUrl.search = url.search;   upstreamUrl.protocol = 'https:';    // Cloudflare Workers WebSocket proxy   // Upgrade the client connection and proxy to upstream   const upgradeHeader = request.headers.get('Upgrade');   if (!upgradeHeader || upgradeHeader.toLowerCase() !== 'websocket') {     return new Response('Expected WebSocket', { status: 426 });   }    // Create upstream WebSocket connection   const upstreamWs = new WebSocket(upstreamUrl.toString().replace('https:', 'wss:'));      // Use WebSocket pair for the client   const [client, server] = Object.values(new WebSocketPair());    server.accept();      // Relay messages bidirectionally   upstreamWs.addEventListener('message', (event) => {     try { server.send(event.data); } catch {}   });      server.addEventListener('message', (event) => {     try { upstreamWs.send(event.data); } catch {}   });    // Handle close events   upstreamWs.addEventListener('close', () => server.close());   server.addEventListener('close', () => upstreamWs.close());    return new Response(null, { status: 101, webSocket: client }); } 

4.5 Wrangler Config

# apps/proxy/wrangler.toml name = "supaproxy-proxy" main = "src/index.ts" compatibility_date = "2026-02-27" compatibility_flags = ["nodejs_compat"]  # Custom domain routing routes = [   { pattern = "*.supaproxy.io", zone_name = "supaproxy.io" } ]  # KV namespace for proxy config [[kv_namespaces]] binding = "PROXY_CONFIG" id = "xxx" preview_id = "xxx"  # Analytics Engine for request metrics [[analytics_engine_datasets]] binding = "ANALYTICS" dataset = "proxy_requests"  # Rate limiting KV (or use Durable Objects) [[kv_namespaces]] binding = "RATE_LIMITS" id = "xxx"  # Environment variables [vars] ENVIRONMENT = "production" 

5. Management API

Built with Hono on Cloudflare Workers. Handles all dashboard operations.

5.1 API Routes

# Auth POST   /api/auth/register          # Email + password signup POST   /api/auth/login             # Email + password login POST   /api/auth/logout            # Destroy session GET    /api/auth/me                # Get current user POST   /api/auth/forgot-password   # Send reset email POST   /api/auth/reset-password    # Reset with token GET    /api/auth/oauth/google      # Google OAuth redirect GET    /api/auth/oauth/github      # GitHub OAuth redirect GET    /api/auth/callback/google   # Google OAuth callback GET    /api/auth/callback/github   # GitHub OAuth callback POST   /api/auth/verify-email      # Verify email token  # Apps GET    /api/apps                   # List user's apps POST   /api/apps                   # Create new app GET    /api/apps/:id               # Get app details PUT    /api/apps/:id               # Update app config DELETE /api/apps/:id               # Delete app POST   /api/apps/:id/toggle        # Activate/deactivate GET    /api/apps/:id/health        # Check upstream health  # Custom Domains GET    /api/apps/:id/domains       # List domains for app POST   /api/apps/:id/domains       # Add custom domain DELETE /api/apps/:id/domains/:did  # Remove domain POST   /api/apps/:id/domains/:did/verify  # Trigger verification  # Analytics GET    /api/apps/:id/analytics     # Request counts, latency, errors GET    /api/apps/:id/analytics/requests  # Time-series request data GET    /api/apps/:id/analytics/logs      # Recent request log  # API Keys GET    /api/api-keys               # List user's API keys POST   /api/api-keys               # Create new key DELETE /api/api-keys/:id           # Revoke key  # Billing GET    /api/billing                # Current plan & usage POST   /api/billing/checkout       # Create checkout session POST   /api/billing/portal         # Customer portal link POST   /api/billing/webhooks/stripe    # Stripe webhook POST   /api/billing/webhooks/razorpay  # Razorpay webhook  # Public GET    /api/health                 # API health check GET    /api/status                 # Service status 

5.2 Scoped Query Helpers

// apps/api/src/db/queries.ts import { eq, and } from 'drizzle-orm'; import { apps, customDomains, apiKeys } from './schema';  export function scopedQueries(db: DrizzleD1, userId: string) {   return {     // Apps     listApps: () =>        db.select().from(apps).where(eq(apps.userId, userId)),          getApp: (appId: string) =>        db.select().from(apps)         .where(and(eq(apps.id, appId), eq(apps.userId, userId)))         .get(),          updateApp: (appId: string, data: Partial<typeof apps.$inferInsert>) =>       db.update(apps).set({ ...data, updatedAt: Math.floor(Date.now() / 1000) })         .where(and(eq(apps.id, appId), eq(apps.userId, userId)))         .returning(),          deleteApp: (appId: string) =>       db.delete(apps)         .where(and(eq(apps.id, appId), eq(apps.userId, userId))),      // Domains       listDomains: (appId: string) =>       db.select().from(customDomains)         .where(and(eq(customDomains.appId, appId), eq(customDomains.userId, userId))),          // API Keys     listApiKeys: () =>       db.select({          id: apiKeys.id,          name: apiKeys.name,          keyPrefix: apiKeys.keyPrefix,         lastUsedAt: apiKeys.lastUsedAt,         createdAt: apiKeys.createdAt        }).from(apiKeys).where(eq(apiKeys.userId, userId)),   }; } 

5.3 KV Sync Service

Every time an app is created, updated, or deleted, the config must sync to KV for the proxy Worker.

// apps/api/src/services/kv-sync.ts export async function syncAppToKV(env: Env, app: App, plan: string) {   const config: ProxyConfig = {     appId: app.id,     userId: app.userId,     supabaseUrl: app.supabaseUrl,     supabaseAnonKey: app.supabaseAnonKey || undefined,     isActive: !!app.isActive,     rateLimitPerMinute: app.rateLimitPerMinute,     allowedOrigins: app.allowedOrigins,     customHeaders: app.customHeaders ? JSON.parse(app.customHeaders) : undefined,     enabledServices: app.enabledServices.split(','),     plan,     monthlyRequestLimit: PLAN_LIMITS[plan].requestsPerMonth,   };    // Write by slug (primary lookup)   await env.PROXY_CONFIG.put(`app:${app.slug}`, JSON.stringify(config)); }  export async function removeAppFromKV(env: Env, slug: string) {   await env.PROXY_CONFIG.delete(`app:${slug}`); }  export async function syncDomainToKV(env: Env, domain: string, slug: string) {   // Domain → slug mapping so proxy can resolve custom domains   await env.PROXY_CONFIG.put(`domain:${domain}`, slug); }  export async function removeDomainFromKV(env: Env, domain: string) {   await env.PROXY_CONFIG.delete(`domain:${domain}`); } 

6. Frontend Dashboard

6.1 Tech Stack





SvelteKit with Cloudflare Pages adapter



Tailwind CSS for styling



shadcn-svelte for UI components



Chart.js or Layercake for analytics charts



svelte-sonner for toast notifications

6.2 Key Pages

Route Page Description / Landing Marketing page, pricing, features /login Login Email/password + OAuth buttons /register Register Sign up form /dashboard App List Grid of user's apps with status /dashboard/apps/new Create App Form: name, Supabase URL, slug /dashboard/apps/[id] App Detail Analytics overview, quick actions /dashboard/apps/[id]/settings App Settings Edit config, rate limits, CORS /dashboard/apps/[id]/domains Domain Setup Add/manage custom domains /dashboard/billing Billing Current plan, upgrade, usage /dashboard/settings Account Profile, password, API keys /docs Documentation Integration guides per SDK

6.3 App Creation Flow (UX)

Step 1: Enter app name         → Auto-suggest slug from name         → Show preview: "myapp.supaproxy.io"         → Check slug availability in real-time  Step 2: Enter Supabase project URL         → Validate format: https://<ref>.supabase.co         → Health check: ping /rest/v1/ to confirm reachable from server         → Optional: paste Supabase anon key  Step 3: Review & Create         → Show summary         → Create button         → Show success with:           - Proxy URL (copyable)           - Quick integration code snippet           - Link to docs 

7. Authentication & Authorization

7.1 Session-Based Auth

Using HTTP-only cookies for session management. No JWT — sessions can be revoked instantly.

// apps/api/src/middleware/auth.ts import { Context, Next } from 'hono'; import { eq, and, gt } from 'drizzle-orm'; import { sessions, users } from '../db/schema';  export async function authMiddleware(c: Context, next: Next) {   const token = c.req.cookie('sp_session');    if (!token) {     return c.json({ error: 'Authentication required' }, 401);   }    const now = Math.floor(Date.now() / 1000);      const result = await c.env.DB.prepare(`     SELECT u.id, u.email, u.name, u.plan, u.email_verified     FROM sessions s     JOIN users u ON s.user_id = u.id     WHERE s.token = ? AND s.expires_at > ?   `).bind(token, now).first();    if (!result) {     return c.json({ error: 'Invalid or expired session' }, 401);   }    c.set('user', {     id: result.id,     email: result.email,     name: result.name,     plan: result.plan,     emailVerified: result.email_verified,   });    await next(); } 

7.2 Authorization Pattern

Every route that touches user resources uses the scoped query pattern. The user can only access their own data.

// Example: Update app app.put('/api/apps/:id', authMiddleware, async (c) => {   const user = c.get('user');   const appId = c.req.param('id');   const body = await c.req.json();    // Validate input   const parsed = updateAppSchema.safeParse(body);   if (!parsed.success) return c.json({ error: parsed.error }, 400);    // Scoped update — user_id is ALWAYS in the WHERE clause   const result = await scopedQueries(db, user.id).updateApp(appId, parsed.data);    if (result.length === 0) {     return c.json({ error: 'App not found' }, 404);   }    // Sync updated config to KV for the proxy   await syncAppToKV(c.env, result[0], user.plan);    return c.json(result[0]); }); 

7.3 Plan Enforcement

// apps/api/src/middleware/plan.ts import { PLAN_LIMITS } from '@supaproxy/shared';  export const PLAN_LIMITS = {   free:       { maxApps: 1,  requestsPerMonth: 50_000,     customDomains: 0  },   pro:        { maxApps: 5,  requestsPerMonth: 1_000_000,  customDomains: 5  },   business:   { maxApps: 25, requestsPerMonth: 10_000_000, customDomains: 25 },   enterprise: { maxApps: -1, requestsPerMonth: -1,         customDomains: -1 }, } as const;  export function enforcePlanLimit(action: string, user: User, currentCount: number) {   const limits = PLAN_LIMITS[user.plan];      if (action === 'create_app' && limits.maxApps !== -1 && currentCount >= limits.maxApps) {     throw new PlanLimitError(`Your ${user.plan} plan allows ${limits.maxApps} app(s). Upgrade to add more.`);   }      if (action === 'add_domain' && limits.customDomains !== -1 && currentCount >= limits.customDomains) {     throw new PlanLimitError(`Custom domains require a Pro plan or above.`);   } } 

8. Custom Domain Support

8.1 Flow

1. User adds domain "api.myapp.com" in dashboard 2. API generates a CNAME target: "myapp-proxy.supaproxy.io" 3. User adds CNAME record: api.myapp.com → myapp-proxy.supaproxy.io 4. Background job polls DNS every 60s to verify CNAME 5. Once verified:     a. Register domain with Cloudflare for SaaS (Workers routes)    b. Cloudflare auto-provisions SSL certificate    c. Write domain → slug mapping to KV    d. Update domain status to "active" 6. Proxy Worker now resolves api.myapp.com → correct app config 

8.2 DNS Verification

// apps/api/src/services/domain.ts export async function verifyDomainDNS(domain: string, expectedCname: string): Promise<boolean> {   try {     // Use Cloudflare DoH to check CNAME     const response = await fetch(       `https://cloudflare-dns.com/dns-query?name=${domain}&type=CNAME`,       { headers: { 'Accept': 'application/dns-json' } }     );     const data = await response.json();          if (data.Answer) {       return data.Answer.some(         (record: any) => record.type === 5 && record.data.includes(expectedCname)       );     }     return false;   } catch {     return false;   } } 

8.3 Workers for SaaS Setup

Use Cloudflare's Custom Hostnames API (requires Enterprise or Workers for SaaS):

// Register custom hostname with Cloudflare export async function registerCustomHostname(domain: string, env: Env) {   const response = await fetch(     `https://api.cloudflare.com/client/v4/zones/${env.CF_ZONE_ID}/custom_hostnames`,     {       method: 'POST',       headers: {         'Authorization': `Bearer ${env.CF_API_TOKEN}`,         'Content-Type': 'application/json',       },       body: JSON.stringify({         hostname: domain,         ssl: {           method: 'http',           type: 'dv',           settings: { min_tls_version: '1.2' }         }       })     }   );   return response.json(); } 

9. Rate Limiting

9.1 Two-Tier Strategy

Tier 1 — Coarse (KV-based, for MVP): Use KV with an atomic counter per app per minute. Eventually consistent but fast.

// apps/proxy/src/rate-limit.ts export async function checkRateLimit(   env: Env,    appId: string,    limit: number ): Promise<{ allowed: boolean; remaining: number }> {   if (limit === 0) return { allowed: true, remaining: -1 };    const minute = Math.floor(Date.now() / 60000);   const key = `rl:${appId}:${minute}`;    // KV doesn't have atomic increment, so use a simple check   const current = parseInt(await env.RATE_LIMITS.get(key) || '0');      if (current >= limit) {     return { allowed: false, remaining: 0 };   }    // Increment (best effort, may slightly overcount due to eventual consistency)   await env.RATE_LIMITS.put(key, String(current + 1), { expirationTtl: 120 });      return { allowed: true, remaining: limit - current - 1 }; } 

Tier 2 — Precise (Durable Objects, post-MVP): For paid plans that need accurate limiting.

// apps/proxy/src/rate-limit-do.ts export class RateLimiter implements DurableObject {   private counts: Map<string, number> = new Map();    async fetch(request: Request) {     const { appId, limit } = await request.json();     const minute = Math.floor(Date.now() / 60000);     const key = `${appId}:${minute}`;      const current = this.counts.get(key) || 0;          if (current >= limit) {       return Response.json({ allowed: false, remaining: 0 });     }      this.counts.set(key, current + 1);          // Clean up old entries     for (const [k] of this.counts) {       if (!k.endsWith(`:${minute}`)) this.counts.delete(k);     }      return Response.json({ allowed: true, remaining: limit - current - 1 });   } } 

10. Analytics & Monitoring

10.1 Analytics Engine — Write (Proxy Worker)

Every proxied request writes a data point:

// apps/proxy/src/analytics.ts export function writeAnalytics(   analytics: AnalyticsEngineDataset,   appId: string,   data: {     method: string;     path: string;     status: number;     latencyMs: number;     bytesIn: number;     bytesOut: number;     country: string;     service: string;    // rest | auth | storage | realtime | functions   } ) {   analytics.writeDataPoint({     blobs: [       appId,            // index 1 — app ID       data.method,      // index 2 — HTTP method       data.path,        // index 3 — request path         data.service,     // index 4 — supabase service       data.country,     // index 5 — country code     ],     doubles: [       data.status,      // index 1 — status code       data.latencyMs,   // index 2 — latency       data.bytesIn,     // index 3 — request size       data.bytesOut,    // index 4 — response size     ],     indexes: [appId],   // required for querying by app   }); } 

10.2 Analytics Engine — Read (Management API)

// apps/api/src/routes/analytics.ts app.get('/api/apps/:id/analytics', authMiddleware, async (c) => {   const user = c.get('user');   const appId = c.req.param('id');    // Verify ownership   const app = await scopedQueries(db, user.id).getApp(appId);   if (!app) return c.json({ error: 'Not found' }, 404);    // Query Analytics Engine   const query = `     SELECT        toStartOfInterval(timestamp, INTERVAL '1' HOUR) as bucket,       count() as requests,       avg(double2) as avg_latency,       quantileWeighted(0.95)(double2, 1) as p95_latency,       sum(if(double1 >= 500, 1, 0)) as errors,       sum(double3) as bytes_in,       sum(double4) as bytes_out     FROM proxy_requests     WHERE index1 = '${appId}'       AND timestamp > NOW() - INTERVAL '24' HOUR     GROUP BY bucket     ORDER BY bucket ASC   `;    const result = await queryAnalyticsEngine(c.env, query);   return c.json(result); }); 

11. Billing Integration

11.1 Stripe (International Users)

// apps/api/src/services/billing.ts import Stripe from 'stripe';  const STRIPE_PRICES = {   pro:      'price_xxx_pro_monthly',   business: 'price_xxx_business_monthly', };  export async function createCheckoutSession(   env: Env,    userId: string,    plan: string,   email: string ) {   const stripe = new Stripe(env.STRIPE_SECRET_KEY);    const session = await stripe.checkout.sessions.create({     customer_email: email,     mode: 'subscription',     line_items: [{ price: STRIPE_PRICES[plan], quantity: 1 }],     success_url: `${env.APP_URL}/dashboard/billing?success=true`,     cancel_url: `${env.APP_URL}/dashboard/billing?cancelled=true`,     metadata: { userId, plan },   });    return session.url; } 

11.2 Razorpay (Indian Users)

export async function createRazorpaySubscription(   env: Env,   userId: string,   plan: string ) {   const response = await fetch('https://api.razorpay.com/v1/subscriptions', {     method: 'POST',     headers: {       'Authorization': 'Basic ' + btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_SECRET}`),       'Content-Type': 'application/json',     },     body: JSON.stringify({       plan_id: RAZORPAY_PLANS[plan],       total_count: 12,       notes: { userId, plan },     }),   });   return response.json(); } 

12. Deployment & CI/CD

12.1 GitHub Actions

# .github/workflows/deploy-proxy.yml name: Deploy Proxy Worker on:   push:     branches: [main]     paths: ['apps/proxy/**', 'packages/shared/**']  jobs:   deploy:     runs-on: ubuntu-latest     steps:       - uses: actions/checkout@v4       - uses: actions/setup-node@v4         with: { node-version: 20 }       - run: npm ci       - run: npx turbo run build --filter=proxy       - uses: cloudflare/wrangler-action@v3         with:           apiToken: ${{ secrets.CF_API_TOKEN }}           workingDirectory: apps/proxy           command: deploy 

12.2 D1 Migrations

# Create migration npx wrangler d1 migrations create supaproxy-db "add_custom_headers_column"  # Apply migrations (production) npx wrangler d1 migrations apply supaproxy-db --remote  # Apply migrations (local dev) npx wrangler d1 migrations apply supaproxy-db --local 

13. Development Phases

Phase 1 — MVP (Week 1–2)

Goal: Working proxy with basic dashboard. Ship it.

Task Estimate Priority Set up monorepo (Turborepo + Wrangler) 2h P0 D1 schema + Drizzle setup + migrations 3h P0 Auth: email/password register + login 4h P0 Auth: GitHub OAuth 2h P0 App CRUD API routes 3h P0 KV sync service (D1 → KV on app create/update) 2h P0 Proxy Worker: HTTP forwarding 4h P0 Proxy Worker: WebSocket forwarding (Realtime) 3h P0 Proxy Worker: CORS handling 1h P0 Proxy Worker: path-based service routing 1h P0 SvelteKit dashboard: auth pages 3h P0 SvelteKit dashboard: app list + create flow 4h P0 SvelteKit dashboard: app detail page 2h P0 Landing page (simple) 3h P0 Docs page: integration snippets 2h P0 DNS + domain setup for supaproxy.io 1h P0 Deploy all three services 2h P0 End-to-end testing on Jio network 2h P0 Total Phase 1 ~42h

Phase 2 — Polish (Week 3–4)

Task Estimate Priority Google OAuth 2h P1 Custom domain support (CNAME + Cloudflare API) 6h P1 Analytics Engine integration (write + read) 4h P1 Analytics dashboard UI (charts, logs) 6h P1 Rate limiting (KV-based) 3h P1 CORS configuration UI 2h P1 Stripe billing integration 6h P1 Razorpay billing integration 4h P1 Plan enforcement (app limits, request limits) 3h P1 Email verification + password reset (Resend) 3h P1 App settings page (edit config) 3h P1 Storage URL rewriting in proxy 3h P1 Auth callback URL rewriting in proxy 3h P1 Error pages and toast notifications 2h P1 Total Phase 2 ~50h

Phase 3 — Scale (Week 5–8)

Task Estimate Priority Durable Objects for precise rate limiting 4h P2 API key management 4h P2 Team/organization accounts 8h P2 Request logging viewer 4h P2 Webhook notifications 4h P2 Multi-region health checking 3h P2 Admin dashboard (internal) 6h P2 Abuse detection system 6h P2 Status page (public) 3h P2 SEO + blog setup 4h P2 Total Phase 3 ~46h

14. Environment & Configuration

14.1 Required Cloudflare Resources

Account Level: ├── Workers Paid Plan ($5/month) ├── D1 Database: supaproxy-db ├── KV Namespaces: │   ├── PROXY_CONFIG (proxy routing table) │   └── RATE_LIMITS (rate limiting counters) ├── Analytics Engine Dataset: proxy_requests ├── R2 Bucket: supaproxy-assets (optional, for user uploads) └── DNS Zone: supaproxy.io  Workers: ├── supaproxy-proxy (proxy worker) └── supaproxy-api (management API)  Pages: └── supaproxy-web (SvelteKit dashboard) 

14.2 Environment Variables

# apps/api/wrangler.toml — secrets (set via wrangler secret put) # COOKIE_SECRET           — session cookie signing # GITHUB_CLIENT_ID        — GitHub OAuth # GITHUB_CLIENT_SECRET    — GitHub OAuth # GOOGLE_CLIENT_ID        — Google OAuth   # GOOGLE_CLIENT_SECRET    — Google OAuth # STRIPE_SECRET_KEY       — Stripe billing # STRIPE_WEBHOOK_SECRET   — Stripe webhook verification # RAZORPAY_KEY_ID         — Razorpay billing # RAZORPAY_SECRET         — Razorpay billing # RESEND_API_KEY          — Transactional emails # CF_API_TOKEN            — Cloudflare API (for custom domains) # CF_ZONE_ID              — Cloudflare zone ID  [vars] APP_URL = "https://app.supaproxy.io" ENVIRONMENT = "production" 

14.3 Domain Setup

supaproxy.io             → Landing page (Cloudflare Pages) app.supaproxy.io         → Dashboard (Cloudflare Pages, separate route) api.supaproxy.io         → Management API (Cloudflare Worker) *.supaproxy.io           → Proxy Worker (wildcard route) status.supaproxy.io      → Status page (Phase 3) 

15. Testing Strategy

15.1 Unit Tests

Framework: Vitest Coverage target: 80%+ for API routes and proxy logic  Key test areas: ├── Proxy request forwarding (mock upstream) ├── URL rewriting (storage URLs, auth callbacks) ├── CORS validation logic ├── Rate limiting counter logic ├── Scoped query authorization (user A can't access user B's apps) ├── Slug generation and validation ├── Plan limit enforcement └── Webhook signature verification 

15.2 Integration Tests

Framework: Vitest + Miniflare (local Cloudflare Workers runtime)  Key test areas: ├── Full proxy round-trip (Worker → KV → upstream → response) ├── WebSocket proxy lifecycle ├── Auth flow (register → login → create app → proxy works) ├── Custom domain registration flow ├── Billing webhook processing └── KV sync after app CRUD operations 

15.3 E2E Tests

Framework: Playwright  Key flows: ├── Sign up → create app → copy proxy URL → verify it works ├── ISP simulation: verify proxy bypasses DNS block ├── Custom domain setup flow ├── Billing upgrade/downgrade └── Rate limit enforcement (hit limit → get 429) 

15.4 Real-World Testing

CRITICAL: Test on actual affected networks before launch  ├── Jio Fiber (primary affected ISP) ├── Jio Mobile (4G/5G) ├── Airtel Broadband ├── Airtel Mobile ├── ACT Fibernet ├── BSNL (has blocked domains before) └── Vi (Vodafone Idea)  Test checklist per ISP: ├── Direct Supabase call fails (confirm block) ├── SupaProxy call succeeds (confirm bypass) ├── Auth flow works through proxy ├── Storage file upload/download works ├── Realtime WebSocket connects and receives events └── Edge Functions respond correctly 

16. Security Checklist

Authentication: ☐ HTTP-only, Secure, SameSite=Lax cookies for sessions ☐ Session expiry (7 days default, 30 days with "remember me") ☐ Bcrypt/Argon2 password hashing (min 12 rounds) ☐ OAuth state parameter to prevent CSRF ☐ Rate limit login attempts (5 per minute per IP) ☐ Rate limit registration (3 per hour per IP)  Authorization: ☐ Every DB query scoped to authenticated user_id ☐ No user ID passed from client — always from session ☐ Plan limits enforced server-side (never trust client) ☐ API keys hashed with SHA-256, only prefix stored in plaintext  Proxy: ☐ No request/response body logging (metadata only) ☐ Strip sensitive Cloudflare headers before forwarding ☐ Validate upstream URL format (only *.supabase.co allowed) ☐ Prevent SSRF: reject non-Supabase upstream URLs ☐ WebSocket connection limits per app ☐ Request size limits (default 100MB, matching Supabase)  Infrastructure: ☐ All secrets in Wrangler secrets (never in wrangler.toml) ☐ HTTPS only (Cloudflare handles this) ☐ CORS properly configured per app ☐ Stripe/Razorpay webhook signature verification ☐ CSP headers on dashboard pages ☐ Dependency auditing (npm audit in CI)  Data: ☐ Supabase anon keys encrypted at rest in D1 ☐ Session tokens are cryptographically random (256-bit) ☐ No PII in Analytics Engine (only app IDs, paths, status codes) ☐ Automatic session cleanup (cron job or D1 trigger) 

17. Cost Estimation

17.1 Cloudflare Costs (Monthly)

Resource Free Tier Estimated Usage (Launch) Cost Workers (Proxy + API) 100K req/day free ~3M req/month $5 base + ~$1.50 overage D1 Database 5M rows read/day, 100K writes/day Well within free tier $0 KV 100K reads/day, 1K writes/day ~1M reads/day ~$0.50 Analytics Engine 100K writes/day free ~100K/day initially $0 Pages Unlimited requests Unlimited $0 R2 10GB free < 1GB $0 Custom Hostnames $2/hostname/month (Workers for SaaS) ~10 domains ~$20 Total ~$27/month at launch

17.2 External Service Costs

Service Cost Domain (supaproxy.io) ~$30/year Resend (email) Free tier (3K/month), then $20/month Stripe 2.9% + $0.30 per transaction Razorpay 2% per transaction Total external ~$5–25/month at launch

17.3 Break-Even Analysis

Monthly fixed costs: ~$50 (conservative) Pro plan revenue: $6/month per user Break-even: 9 paying users  At 100 paying users (Pro plan):   Revenue: $600/month   Costs: ~$100/month (scales with traffic)   Margin: ~$500/month 

Quick Start (Local Development)

# 1. Clone and install git clone https://github.com/you/supaproxy.git cd supaproxy npm install  # 2. Set up local D1 database cd apps/api npx wrangler d1 create supaproxy-db --local npx wrangler d1 migrations apply supaproxy-db --local  # 3. Start all services in dev mode npm run dev          # Runs all three: proxy, api, web  # 4. Access # Dashboard: http://localhost:5173 # API:       http://localhost:8788 # Proxy:     http://localhost:8787 
