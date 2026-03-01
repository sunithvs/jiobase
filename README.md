# JioBase

**Free reverse proxy that keeps your Supabase app working in India.**

Indian ISPs (Jio, Airtel, ACT Fibernet) are DNS-blocking `*.supabase.co` under a government order. JioBase routes your Supabase traffic through Cloudflare's edge network so your app works for every user - no VPN, no DNS changes, no paid plans required.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)

---

## The Problem

Since February 2026, major Indian ISPs have been DNS-poisoning all `*.supabase.co` subdomains. When a user on Jio tries to reach your Supabase project, their ISP returns a sinkhole IP instead of the real one. The connection times out. Auth breaks, database queries fail, file uploads stop, realtime dies.

Changing your DNS to `1.1.1.1` fixes it for you - but not for your 10,000 users on Jio. A VPN works for development, but you can't ship a VPN requirement to production users. Supabase custom domains require a paid plan.

JioBase fixes this at the infrastructure level.

## How It Works

```
Your App  -->  yourapp.jiobase.com  -->  yourapp.supabase.co
                  (not blocked)            (blocked, but JioBase
                                            isn't on Indian ISPs)
```

JioBase is a transparent reverse proxy on Cloudflare Workers. It receives your request, forwards it to Supabase, and returns the response. From your ISP's perspective, your app is just talking to a Cloudflare domain.

**Everything proxied:** REST API, Auth, Storage, Edge Functions, Realtime WebSockets, GraphQL.

**Nothing stored:** JioBase doesn't read, log, or cache your request/response data. Your tokens, RLS policies, and keys pass through unchanged.

## Quick Start

**1. Sign up** at [app.jiobase.com](https://app.jiobase.com)

**2. Create an app** and enter your Supabase project URL

**3. Change one line of code:**

```javascript
// Before
const supabase = createClient(
  'https://yourproject.supabase.co',
  'your-anon-key'
);

// After
const supabase = createClient(
  'https://your-slug.jiobase.com',  // Just change this URL
  'your-anon-key'                    // Key stays the same
);
```

**4. Deploy.** Done.

## Features

- **One-line integration** - Change your Supabase URL, keep everything else
- **Full API support** - REST, Auth, Storage, Edge Functions, Realtime WebSockets
- **Global edge network** - Cloudflare Workers with nodes in Mumbai, Chennai, and 300+ cities
- **Transparent proxy** - Zero data stored, all headers and tokens forwarded unchanged
- **Custom subdomains** - Each app gets its own `slug.jiobase.com` subdomain
- **CORS handling** - Configurable allowed origins per app
- **Real-time analytics** - Request counts, latency, and status codes in the dashboard
- **Open source** - AGPLv3 licensed, read every line on GitHub

## Architecture

```
jiobase/
├── apps/
│   ├── proxy/        # Cloudflare Worker - reverse proxy
│   ├── api/          # Hono API on Workers - management endpoints
│   └── web/          # SvelteKit on Cloudflare Pages - dashboard & landing
├── packages/
│   └── shared/       # Shared types, constants, Zod validation
└── docs/             # Project documentation
```

**100% Cloudflare stack:**

| Component | Technology |
|-----------|-----------|
| Proxy | Cloudflare Workers |
| API | Hono on Cloudflare Workers |
| Database | Cloudflare D1 + Drizzle ORM |
| Cache | Cloudflare KV |
| Frontend | SvelteKit on Cloudflare Pages |
| Analytics | Cloudflare Analytics Engine |

## Development

### Prerequisites

- Node.js 18+
- pnpm 9+
- Wrangler CLI (`npm install -g wrangler`)

### Setup

```bash
# Clone the repo
git clone https://github.com/sunithvs/jiobase.git
cd jiobase

# Install dependencies
pnpm install

# Build shared package
pnpm --filter @jiobase/shared build

# Run database migrations (local)
pnpm --filter @jiobase/api db:migrate:local

# Start development servers
pnpm --filter @jiobase/api dev      # API on port 8788
pnpm --filter @jiobase/web dev      # Web on port 5173
pnpm --filter @jiobase/proxy dev    # Proxy on port 8787
```

### Project Scripts

```bash
# Type checking
pnpm --filter @jiobase/api typecheck
pnpm --filter @jiobase/web typecheck
pnpm --filter @jiobase/proxy typecheck

# Build
pnpm --filter @jiobase/web build

# Deploy (requires Cloudflare auth)
pnpm --filter @jiobase/api deploy
pnpm --filter @jiobase/proxy deploy
pnpm --filter @jiobase/web deploy
```

## Contributing

Contributions are welcome. If you find a bug, want to add a feature, or want to improve the docs - open a PR.

1. Fork the repo
2. Create a branch (`git checkout -b fix/your-fix`)
3. Make your changes
4. Run type checking to make sure nothing is broken
5. Open a pull request

## Support the Project

JioBase is free and I fund the Cloudflare infrastructure out of my own pocket. If JioBase is keeping your app alive, a coffee helps keep the servers running.

<a href="https://buymeacoffee.com/sunithvs" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## Links

- **Website:** [jiobase.com](https://jiobase.com)
- **Dashboard:** [app.jiobase.com](https://app.jiobase.com)
- **Docs:** [jiobase.com/docs](https://jiobase.com/docs)
- **Blog:** [jiobase.com/blog](https://jiobase.com/blog)
- **Supabase Issue:** [supabase/supabase#43142](https://github.com/supabase/supabase/issues/43142)

## License

[AGPLv3](LICENSE) - JioBase is open source. You can read, fork, and contribute to the code. If you modify and deploy JioBase as a service, you must open source your changes under the same license.

---

Built by [Sunith VS](https://sunithvs.com) from India.
