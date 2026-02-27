import type { Env } from './types.js';
import { resolveConfig } from './config.js';
import { handlePreflight } from './cors.js';
import { handleHttpProxy } from './handler.js';
import { handleWebSocket } from './websocket.js';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/__health') {
      return Response.json({ status: 'ok', service: 'jiobase-proxy' });
    }

    try {
      // Resolve app config from hostname
      const resolved = await resolveConfig(url.hostname, env);

      if (!resolved) {
        // For reserved subdomains (app, www) and root domain, proxy to Pages
        const hostname = url.hostname;
        const proxyDomain = env.PROXY_DOMAIN || 'jiobase.com';
        const PASSTHROUGH = ['app', 'www'];
        const sub = hostname.endsWith(`.${proxyDomain}`)
          ? hostname.replace(`.${proxyDomain}`, '')
          : null;

        if (hostname === proxyDomain || (sub && PASSTHROUGH.includes(sub))) {
          // Rewrite to Pages origin to avoid Worker route loop
          const pagesUrl = new URL(request.url);
          pagesUrl.hostname = 'jiobase-web.pages.dev';
          return fetch(new Request(pagesUrl, request));
        }

        return Response.json(
          { error: 'App not found. Check your proxy URL.' },
          { status: 404 }
        );
      }

      const { config } = resolved;

      // Check if app is active
      if (!config.isActive) {
        return Response.json(
          { error: 'This app is currently inactive.' },
          { status: 503 }
        );
      }

      // Handle CORS preflight
      if (request.method === 'OPTIONS') {
        return handlePreflight(request, config);
      }

      // Check for WebSocket upgrade
      const upgradeHeader = request.headers.get('Upgrade');
      if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
        return handleWebSocket(request, config);
      }

      // HTTP proxy
      return handleHttpProxy(request, config, env);
    } catch (err) {
      console.error('Proxy error:', err);
      return Response.json(
        { error: 'Internal proxy error' },
        { status: 500 }
      );
    }
  },
} satisfies ExportedHandler<Env>;
