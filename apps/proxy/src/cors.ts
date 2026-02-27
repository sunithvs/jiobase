import type { ProxyConfig } from './types.js';

export function isOriginAllowed(origin: string, allowedOrigins: string): boolean {
  if (allowedOrigins === '*') return true;

  const allowed = allowedOrigins.split(',').map((o) => o.trim());
  return allowed.includes(origin);
}

export function handlePreflight(request: Request, config: ProxyConfig): Response {
  const origin = request.headers.get('Origin') || '*';
  const headers = new Headers();

  if (isOriginAllowed(origin, config.allowedOrigins)) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    headers.set(
      'Access-Control-Allow-Headers',
      request.headers.get('Access-Control-Request-Headers') || '*'
    );
    headers.set('Access-Control-Max-Age', '86400');
  }

  return new Response(null, { status: 204, headers });
}

export function addCorsHeaders(
  responseHeaders: Headers,
  request: Request,
  config: ProxyConfig
): void {
  const origin = request.headers.get('Origin');
  if (origin && isOriginAllowed(origin, config.allowedOrigins)) {
    responseHeaders.set('Access-Control-Allow-Origin', origin);
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    responseHeaders.set(
      'Access-Control-Allow-Headers',
      request.headers.get('Access-Control-Request-Headers') || '*'
    );
    responseHeaders.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    responseHeaders.set('Access-Control-Expose-Headers', '*');
  }
}
