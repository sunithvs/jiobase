import type { Env } from './types.js';

interface RateLimitState {
  count: number;
  resetAt: number;
  burstUsed: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfter: number;
}

async function getState(kv: KVNamespace, key: string): Promise<RateLimitState | null> {
  const raw = await kv.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as RateLimitState;
  } catch {
    return null;
  }
}

async function setState(kv: KVNamespace, key: string, state: RateLimitState, windowSeconds: number) {
  await kv.put(key, JSON.stringify(state), { expirationTtl: windowSeconds + 10 });
}

/**
 * Sliding-window counter stored in KV.
 * Eventually consistent — may allow small bursts over limit under race conditions.
 * Acceptable for proxy use; use Durable Objects for strict enforcement.
 */
async function checkAndIncrement(
  kv: KVNamespace,
  key: string,
  limit: number,
  burstSize: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const now = Math.floor(Date.now() / 1000);
  let state = await getState(kv, key);

  if (!state || state.resetAt <= now) {
    state = { count: 0, resetAt: now + windowSeconds, burstUsed: 0 };
  }

  const { resetAt } = state;
  const remaining = limit - state.count;
  const inBurst = state.burstUsed < burstSize;

  if (state.count >= limit && !inBurst) {
    return { allowed: false, remaining: 0, resetAt };
  }

  state.count += 1;
  if (inBurst && state.count > limit) state.burstUsed += 1;

  await setState(kv, key, state, windowSeconds);
  return { allowed: true, remaining: Math.max(0, remaining - 1), resetAt };
}

/**
 * Three-layer rate limiter for the proxy worker:
 *   1. Global per-slug  — always enforced
 *   2. Per-IP           — max 60% of global, blocks single-source abuse
 *   3. Per-user (JWT)   — max 80% of global, tracks authenticated users
 *
 * Any layer failing returns allowed: false.
 */
export async function checkRateLimits(
  env: Env,
  appId: string,
  clientIp: string,
  options: {
    limitPerMinute: number;
    burstSize: number;
    trackPerIp: boolean;
    trackPerUser: boolean;
    userId?: string;
  }
): Promise<RateLimitResult> {
  const { limitPerMinute, burstSize, trackPerIp, trackPerUser, userId } = options;
  const WINDOW = 60;

  if (limitPerMinute === 0) {
    return { allowed: true, remaining: -1, resetAt: 0, retryAfter: 0 };
  }

  const now = () => Math.floor(Date.now() / 1000);

  // Layer 1: global
  const global = await checkAndIncrement(env.RATE_LIMITS, `rl:g:${appId}`, limitPerMinute, burstSize, WINDOW);
  if (!global.allowed) {
    return { allowed: false, remaining: 0, resetAt: global.resetAt, retryAfter: Math.max(global.resetAt - now(), 1) };
  }

  // Layer 2: per-IP
  if (trackPerIp && clientIp && clientIp !== 'unknown') {
    const ipLimit = Math.max(Math.floor(limitPerMinute * 0.6), 10);
    const ip = await checkAndIncrement(env.RATE_LIMITS, `rl:ip:${appId}:${clientIp}`, ipLimit, Math.min(burstSize, 5), WINDOW);
    if (!ip.allowed) {
      return { allowed: false, remaining: 0, resetAt: ip.resetAt, retryAfter: Math.max(ip.resetAt - now(), 1) };
    }
  }

  // Layer 3: per-user
  if (trackPerUser && userId) {
    const userLimit = Math.max(Math.floor(limitPerMinute * 0.8), 20);
    const user = await checkAndIncrement(env.RATE_LIMITS, `rl:user:${appId}:${userId}`, userLimit, burstSize, WINDOW);
    if (!user.allowed) {
      return { allowed: false, remaining: 0, resetAt: user.resetAt, retryAfter: Math.max(user.resetAt - now(), 1) };
    }
  }

  return { allowed: true, remaining: global.remaining, resetAt: global.resetAt, retryAfter: 0 };
}

/**
 * Extract Supabase user ID from JWT Authorization header for per-user bucketing.
 * Does NOT verify signature — used only for rate limit key, not for auth.
 */
export function extractUserId(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) return null;
  const parts = authHeader.slice(7).split('.');
  if (parts.length !== 3) return null;
  try {
    return (JSON.parse(atob(parts[1])) as any).sub ?? null;
  } catch {
    return null;
  }
}
