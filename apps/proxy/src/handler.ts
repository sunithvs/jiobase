import type { Env, ProxyConfig } from './types.js';
import { addCorsHeaders } from './cors.js';
import type { SupabaseService } from '@jiobase/shared';
import { SERVICE_PATH_MAP } from '@jiobase/shared';
import {
  fetchWithTimeout,
  getActiveUrl,
  isUpstreamFailure,
  markPrimaryFailed,
  markPrimaryRecovered,
} from './failover.js';

function getServiceFromPath(pathname: string): SupabaseService | null {
  const match = pathname.match(/^\/([a-z]+)\//);
  if (!match) return null;
  return SERVICE_PATH_MAP[match[1]] || null;
}

function buildUpstreamHeaders(
  request: Request,
  upstreamHostname: string,
  customHeaders?: Record<string, string>
): Headers {
  const headers = new Headers(request.headers);
  headers.set('Host', upstreamHostname);
  headers.delete('cf-connecting-ip');
  headers.delete('cf-ray');
  headers.delete('cf-visitor');
  headers.delete('cf-ipcountry');
  headers.delete('cf-worker');
  if (customHeaders) {
    for (const [k, v] of Object.entries(customHeaders)) headers.set(k, v);
  }
  return headers;
}

/**
 * Forward the request upstream with optional failover.
 *
 * Body is buffered into ArrayBuffer before the first attempt so it can be
 * replayed on the backup attempt — a ReadableStream can only be consumed once.
 */
async function fetchUpstream(
  request: Request,
  upstreamPath: string,
  upstreamSearch: string,
  headers: Headers,
  config: ProxyConfig,
  env: Env
): Promise<{ response: Response; usedBackup: boolean }> {
  const { url: activeUrl, isBackup } = await getActiveUrl(
    env, config.appId, config.supabaseUrl, config.backupSupabaseUrl, config.enableFailover
  );

  const buildUrl = (base: string) => {
    const u = new URL(base);
    u.pathname = upstreamPath;
    u.search = upstreamSearch;
    return u.toString();
  };

  // Buffer body once so it can be re-sent on failover retry
  let bodyBuffer: ArrayBuffer | null = null;
  if (request.method !== 'GET' && request.method !== 'HEAD' && request.body) {
    bodyBuffer = await request.arrayBuffer();
  }

  const fetchInit: RequestInit = {
    method: request.method,
    headers,
    body: bodyBuffer ?? undefined,
    redirect: 'manual',
  };

  // Attempt 1 — primary (or backup if already in failover)
  try {
    const response = await fetchWithTimeout(buildUrl(activeUrl), fetchInit, config.failoverThresholdMs);

    if (!isUpstreamFailure(response.status)) {
      // Recovered — clear failover state if we were probing primary
      if (!isBackup && config.enableFailover) {
        await markPrimaryRecovered(env, config.appId).catch(() => {});
      }
      return { response, usedBackup: isBackup };
    }

    // 5xx from primary — try backup if available
    if (!config.enableFailover || !config.backupSupabaseUrl || isBackup) {
      return { response, usedBackup: isBackup };
    }

    await markPrimaryFailed(env, config.appId).catch(() => {});
  } catch (err: unknown) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    if (!config.enableFailover || !config.backupSupabaseUrl || isBackup || !isAbort) throw err;
    await markPrimaryFailed(env, config.appId).catch(() => {});
  }

  // Attempt 2 — backup
  const backupResponse = await fetchWithTimeout(
    buildUrl(config.backupSupabaseUrl!), fetchInit, config.failoverThresholdMs
  );
  return { response: backupResponse, usedBackup: true };
}

export async function handleHttpProxy(
  request: Request,
  config: ProxyConfig,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);

  const service = getServiceFromPath(url.pathname);
  if (service && !config.enabledServices.includes(service)) {
    return Response.json({ error: `Service '${service}' is not enabled for this app` }, { status: 403 });
  }

  const headers = buildUpstreamHeaders(
    request,
    new URL(config.supabaseUrl).hostname,
    config.customHeaders
  );

  const startMs = Date.now();
  let upstreamResponse: Response;
  let usedBackup = false;

  try {
    ({ response: upstreamResponse, usedBackup } = await fetchUpstream(
      request, url.pathname, url.search, headers, config, env
    ));
  } catch {
    return Response.json({ error: 'Upstream request failed. Please try again.' }, { status: 502 });
  }

  const latencyMs = Date.now() - startMs;
  const responseHeaders = new Headers(upstreamResponse.headers);

  // Rewrite Location host only — leave query params (OAuth redirect_uri) untouched
  const location = responseHeaders.get('Location');
  if (location) {
    try {
      const locUrl = new URL(location);
      if (locUrl.hostname === new URL(config.supabaseUrl).hostname) {
        locUrl.hostname = url.hostname;
        responseHeaders.set('Location', locUrl.toString());
      }
    } catch { /* malformed — leave as-is */ }
  }

  addCorsHeaders(responseHeaders, request, config);
  responseHeaders.set('X-Proxied-By', 'JioBase');
  if (usedBackup) responseHeaders.set('X-JioBase-Failover', 'backup');

  // Fire-and-forget analytics — never block the response
  try {
    env.ANALYTICS.writeDataPoint({
      blobs: [
        config.appId,                                                    // blob1: app
        request.method,                                                  // blob2: method
        url.pathname,                                                    // blob3: path
        request.headers.get('cf-ipcountry') || 'unknown',               // blob4: country
        service || 'unknown',                                            // blob5: service
        usedBackup ? 'backup' : 'primary',                              // blob6: upstream
      ],
      doubles: [
        upstreamResponse.status,                                         // double1: status
        latencyMs,                                                       // double2: latency ms
        parseInt(request.headers.get('content-length') || '0'),         // double3: req bytes
        parseInt(upstreamResponse.headers.get('content-length') || '0'), // double4: res bytes
      ],
      indexes: [config.appId],
    });
  } catch { /* analytics failure must never affect proxy */ }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}
