import type { Env, ProxyConfig } from './types.js';
import { addCorsHeaders } from './cors.js';
import type { SupabaseService } from '@jiobase/shared';
import { SERVICE_PATH_MAP } from '@jiobase/shared';

export async function handleHttpProxy(
  request: Request,
  config: ProxyConfig,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);

  // Check if the service is enabled
  const service = getServiceFromPath(url.pathname);
  if (service && !config.enabledServices.includes(service)) {
    return Response.json(
      { error: `Service '${service}' is not enabled for this app` },
      { status: 403 }
    );
  }

  // Build upstream URL
  const upstreamUrl = new URL(config.supabaseUrl);
  upstreamUrl.pathname = url.pathname;
  upstreamUrl.search = url.search;

  // Clone headers, set upstream host
  const headers = new Headers(request.headers);
  headers.set('Host', upstreamUrl.hostname);
  headers.delete('cf-connecting-ip');
  headers.delete('cf-ray');
  headers.delete('cf-visitor');
  headers.delete('cf-ipcountry');

  // Add custom headers if configured
  if (config.customHeaders) {
    for (const [key, value] of Object.entries(config.customHeaders)) {
      headers.set(key, value);
    }
  }

  // Forward request
  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD'
      ? request.body
      : undefined,
    redirect: 'manual',
  });

  // Clone response headers
  const responseHeaders = new Headers(upstreamResponse.headers);

  // Rewrite Location headers that redirect directly to the Supabase host.
  // Only rewrite the *host* portion of the URL — NOT query params.
  // This avoids breaking OAuth redirect_uri params (e.g. Google's redirect_uri
  // must match exactly between the authorize request and the token exchange).
  const location = responseHeaders.get('Location');
  if (location) {
    try {
      const locUrl = new URL(location);
      const supabaseHost = new URL(config.supabaseUrl).hostname;
      if (locUrl.hostname === supabaseHost) {
        // Direct redirect to Supabase — rewrite host to proxy
        locUrl.hostname = url.hostname;
        responseHeaders.set('Location', locUrl.toString());
      }
      // If Location points to an external host (e.g. accounts.google.com),
      // leave it untouched — including any redirect_uri query params.
    } catch {
      // Malformed Location header — leave it as-is
    }
  }

  // Add CORS headers
  addCorsHeaders(responseHeaders, request, config);

  // Add proxy identifier header
  responseHeaders.set('X-Proxied-By', 'JioBase');

  // Write analytics (fire-and-forget)
  try {
    env.ANALYTICS.writeDataPoint({
      blobs: [
        config.appId,
        request.method,
        url.pathname,
        request.headers.get('cf-ipcountry') || 'unknown',
      ],
      doubles: [upstreamResponse.status],
      indexes: [config.appId],
    });
  } catch {
    // Analytics write failure should not break the proxy
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}

function getServiceFromPath(pathname: string): SupabaseService | null {
  // Supabase paths: /rest/v1/..., /auth/v1/..., /storage/v1/..., /realtime/v1/...
  const match = pathname.match(/^\/([a-z]+)\//);
  if (!match) return null;
  return SERVICE_PATH_MAP[match[1]] || null;
}
