import type {
  AnalyticsOverview,
  EndpointBreakdown,
  ErrorBucket,
  LatencyPercentiles,
} from '@jiobase/shared';

interface AEEnv {
  CF_ACCOUNT_ID: string;
  CF_API_TOKEN: string;
}

// Validate before interpolating into AE SQL — appId is our own nanoid but
// we guard defensively. Throws if it contains anything outside [a-zA-Z0-9_-].
function assertSafeId(id: string, label = 'id'): void {
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error(`Invalid ${label}: contains disallowed characters`);
  }
}

// Maps user-supplied window string to a safe AE INTERVAL clause.
// Unrecognised values fall back to 24h — raw input never touches SQL.
function windowToInterval(window: string): string {
  const map: Record<string, string> = {
    '1h':  `INTERVAL '1' HOUR`,
    '24h': `INTERVAL '24' HOUR`,
    '7d':  `INTERVAL '7' DAY`,
    '30d': `INTERVAL '30' DAY`,
  };
  return map[window] ?? `INTERVAL '24' HOUR`;
}

function windowToHours(window: string): number {
  const map: Record<string, number> = { '1h': 1, '24h': 24, '7d': 168, '30d': 720 };
  return map[window] ?? 24;
}

async function queryAE(env: AEEnv, sql: string): Promise<any> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/analytics_engine/sql`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.CF_API_TOKEN}`, 'Content-Type': 'text/plain' },
    body: sql,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Analytics Engine query failed (${response.status}): ${text}`);
  }
  return response.json();
}

// ── Queries ───────────────────────────────────────────────────────────────────

/**
 * p50 / p95 / p99 latency for an app.
 * AE schema: double2 = latency ms, index1 = appId
 */
export async function getLatencyPercentiles(
  env: AEEnv,
  appId: string,
  window = '24h'
): Promise<LatencyPercentiles> {
  assertSafeId(appId, 'appId');
  const sql = `
    SELECT
      quantile(0.5)(double2)  AS p50,
      quantile(0.95)(double2) AS p95,
      quantile(0.99)(double2) AS p99,
      count()                 AS total_requests
    FROM proxy_requests
    WHERE index1 = '${appId}'
      AND timestamp > NOW() - ${windowToInterval(window)}
  `;
  try {
    const row = (await queryAE(env, sql))?.data?.[0];
    return {
      p50:           Math.round(row?.p50 ?? 0),
      p95:           Math.round(row?.p95 ?? 0),
      p99:           Math.round(row?.p99 ?? 0),
      totalRequests: row?.total_requests ?? 0,
      windowHours:   windowToHours(window),
    };
  } catch (err) {
    console.error('getLatencyPercentiles error:', err);
    return { p50: 0, p95: 0, p99: 0, totalRequests: 0, windowHours: windowToHours(window) };
  }
}

/**
 * Per-service request breakdown (rest / auth / storage / …).
 * AE schema: blob5 = service name
 */
export async function getEndpointBreakdown(
  env: AEEnv,
  appId: string,
  window = '24h'
): Promise<EndpointBreakdown[]> {
  assertSafeId(appId, 'appId');
  const sql = `
    SELECT blob5 AS service, count() AS requests
    FROM proxy_requests
    WHERE index1 = '${appId}'
      AND timestamp > NOW() - ${windowToInterval(window)}
    GROUP BY service
    ORDER BY requests DESC
  `;
  try {
    const rows: Array<{ service: string; requests: number }> =
      (await queryAE(env, sql))?.data ?? [];
    const total = rows.reduce((s, r) => s + (r.requests ?? 0), 0);
    return rows.map((r) => ({
      service:    r.service || 'unknown',
      requests:   r.requests,
      percentage: total > 0 ? Math.round((r.requests / total) * 100) : 0,
    }));
  } catch (err) {
    console.error('getEndpointBreakdown error:', err);
    return [];
  }
}

/**
 * Hourly error buckets with spike detection.
 * Spike = any hour with >= 10 requests AND > 10% error rate.
 * AE schema: double1 = HTTP status code
 */
export async function getErrorBuckets(
  env: AEEnv,
  appId: string,
  window = '24h'
): Promise<{ buckets: ErrorBucket[]; spikeDetected: boolean }> {
  assertSafeId(appId, 'appId');
  const sql = `
    SELECT
      toStartOfInterval(timestamp, INTERVAL '1' HOUR) AS hour,
      count()                 AS total,
      countIf(double1 >= 500) AS errors
    FROM proxy_requests
    WHERE index1 = '${appId}'
      AND timestamp > NOW() - ${windowToInterval(window)}
    GROUP BY hour
    ORDER BY hour ASC
  `;
  try {
    const rows: Array<{ hour: string; total: number; errors: number }> =
      (await queryAE(env, sql))?.data ?? [];
    const buckets: ErrorBucket[] = rows.map((r) => ({
      hour:      r.hour,
      total:     r.total,
      errors:    r.errors,
      errorRate: r.total > 0 ? r.errors / r.total : 0,
    }));
    const spikeDetected = buckets.some((b) => b.total >= 10 && b.errorRate > 0.1);
    return { buckets, spikeDetected };
  } catch (err) {
    console.error('getErrorBuckets error:', err);
    return { buckets: [], spikeDetected: false };
  }
}

/** Full overview — all three queries in parallel. */
export async function getAnalyticsOverview(
  env: AEEnv,
  appId: string,
  window = '24h'
): Promise<AnalyticsOverview> {
  const [latency, endpoints, { buckets: errors, spikeDetected }] = await Promise.all([
    getLatencyPercentiles(env, appId, window),
    getEndpointBreakdown(env, appId, window),
    getErrorBuckets(env, appId, window),
  ]);
  return { latency, endpoints, errors, spikeDetected };
}
