import type { Env } from './types.js';

interface FailoverState {
  status: 'primary' | 'backup';
  failedAt: number | null;
  attemptCount: number;
  lastCheckedAt: number;
}

const FAILOVER_TTL = 300;          // KV key expires after 5 min of inactivity
const RECOVERY_COOLDOWN_MS = 30_000; // 30s before retrying primary

async function getFailoverState(env: Env, appId: string): Promise<FailoverState> {
  const raw = await env.PROXY_CONFIG.get(`failover:${appId}`);
  if (!raw) return { status: 'primary', failedAt: null, attemptCount: 0, lastCheckedAt: 0 };
  try {
    return JSON.parse(raw) as FailoverState;
  } catch {
    return { status: 'primary', failedAt: null, attemptCount: 0, lastCheckedAt: 0 };
  }
}

async function setFailoverState(env: Env, appId: string, state: FailoverState) {
  await env.PROXY_CONFIG.put(`failover:${appId}`, JSON.stringify(state), {
    expirationTtl: FAILOVER_TTL,
  });
}

/**
 * Returns which upstream URL to use for this request.
 * Primary is default; switches to backup when primary is known to be failing.
 * Periodically re-probes primary for recovery (cooldown x attemptCount).
 */
export async function getActiveUrl(
  env: Env,
  appId: string,
  primaryUrl: string,
  backupUrl: string | undefined,
  enableFailover: boolean
): Promise<{ url: string; isBackup: boolean }> {
  if (!enableFailover || !backupUrl) return { url: primaryUrl, isBackup: false };

  const state = await getFailoverState(env, appId);

  if (state.status === 'backup') {
    const cooldown = RECOVERY_COOLDOWN_MS * Math.max(1, state.attemptCount);
    const shouldRetry = state.failedAt !== null && Date.now() - state.failedAt > cooldown;
    if (shouldRetry) return { url: primaryUrl, isBackup: false }; // probe primary
    return { url: backupUrl, isBackup: true };
  }

  return { url: primaryUrl, isBackup: false };
}

export async function markPrimaryFailed(env: Env, appId: string) {
  const state = await getFailoverState(env, appId);
  await setFailoverState(env, appId, {
    status: 'backup',
    failedAt: Date.now(),
    attemptCount: Math.max(1, (state.attemptCount || 0) + 1),
    lastCheckedAt: Date.now(),
  });
}

export async function markPrimaryRecovered(env: Env, appId: string) {
  await env.PROXY_CONFIG.delete(`failover:${appId}`);
}

/**
 * fetch() with a hard timeout. Throws DOMException with name 'AbortError' on timeout.
 */
export async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function isUpstreamFailure(status: number): boolean {
  return status === 502 || status === 503 || status === 504;
}
