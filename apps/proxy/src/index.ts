import type { Env } from './types.js';
import { resolveConfig } from './config.js';
import { handlePreflight } from './cors.js';
import { handleHttpProxy } from './handler.js';
import { handleWebSocket } from './websocket.js';
import { checkRateLimits, extractUserId } from './rate-limit.js';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/__health') {
      return Response.json({ status: 'ok', service: 'jiobase-proxy' });
    }

    try {
      const resolved = await resolveConfig(url.hostname, env);

      if (!resolved) {
        const hostname = url.hostname;
        const proxyDomain = env.PROXY_DOMAIN || 'jiobase.com';
        const PASSTHROUGH = ['app', 'www'];
        const sub = hostname.endsWith(`.${proxyDomain}`)
          ? hostname.replace(`.${proxyDomain}`, '')
          : null;

        if (hostname === proxyDomain || (sub && PASSTHROUGH.includes(sub))) {
          const pagesUrl = new URL(request.url);
          pagesUrl.hostname = 'jiobase-web.pages.dev';
          return fetch(new Request(pagesUrl, request));
        }

        return Response.json({ error: 'App not found. Check your proxy URL.' }, { status: 404 });
      }

      const { config } = resolved;

      if (!config.isActive) {
        return Response.json({ error: 'This app is currently inactive.' }, { status: 503 });
      }

      // ── Rate limiting ──────────────────────────────────────────────────────
      // Checked before OPTIONS so abusers can't bypass via preflight spam.
      // userId extracted from JWT for per-user bucketing — signature NOT verified.
      const clientIp =
        request.headers.get('cf-connecting-ip') ||
        request.headers.get('x-forwarded-for') ||
        'unknown';

      const userId = config.trackPerUser
        ? (extractUserId(request.headers.get('Authorization')) ?? undefined)
        : undefined;

      const rl = await checkRateLimits(env, config.appId, clientIp, {
        limitPerMinute: config.rateLimitPerMinute,
        burstSize:      config.rateLimitBurstSize,
        trackPerIp:     config.trackPerIp,
        trackPerUser:   config.trackPerUser,
        userId,
      });

      if (!rl.allowed) {
        return Response.json(
          { error: 'Rate limit exceeded. Please slow down.', retryAfter: rl.retryAfter },
          {
            status: 429,
            headers: {
              'Retry-After':        String(rl.retryAfter),
              'X-RateLimit-Limit':  String(config.rateLimitPerMinute),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset':  String(rl.resetAt),
            },
          }
        );
      }
      // ── End rate limiting ──────────────────────────────────────────────────

      if (request.method === 'OPTIONS') return handlePreflight(request, config);

      const upgradeHeader = request.headers.get('Upgrade');
      if (upgradeHeader?.toLowerCase() === 'websocket') {
        return handleWebSocket(request, config);
      }

      return handleHttpProxy(request, config, env);
    } catch (err) {
      console.error('Proxy error:', err);
      return Response.json({ error: 'Internal proxy error' }, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
