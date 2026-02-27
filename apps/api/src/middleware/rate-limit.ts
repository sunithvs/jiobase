import type { Context, Next } from 'hono';
import type { AppEnv } from '../types.js';

interface RateLimitOptions {
  /** Max requests allowed in the window */
  max: number;
  /** Window size in seconds */
  windowSeconds: number;
  /** Key prefix for KV storage */
  keyPrefix: string;
}

/**
 * IP-based rate limiting using D1 (lightweight, no extra bindings needed).
 * Uses a sliding-window counter stored per IP + endpoint.
 *
 * Falls back gracefully if D1 errors — allows the request through
 * rather than blocking legitimate users on infra issues.
 */
export function rateLimitMiddleware(options: RateLimitOptions) {
  const { max, windowSeconds, keyPrefix } = options;

  return async (c: Context<AppEnv>, next: Next) => {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const now = Math.floor(Date.now() / 1000);
    const windowStart = now - windowSeconds;
    const key = `${keyPrefix}:${ip}`;

    try {
      // Clean up old entries and count recent attempts in one go
      await c.env.DB.prepare(
        'DELETE FROM rate_limits WHERE expires_at < ?'
      ).bind(now).run();

      const result = await c.env.DB.prepare(
        'SELECT COUNT(*) as count FROM rate_limits WHERE key = ? AND created_at > ?'
      ).bind(key, windowStart).first<{ count: number }>();

      const count = result?.count || 0;

      // Set rate limit headers
      c.header('X-RateLimit-Limit', String(max));
      c.header('X-RateLimit-Remaining', String(Math.max(0, max - count)));
      c.header('X-RateLimit-Reset', String(now + windowSeconds));

      if (count >= max) {
        const retryAfter = windowSeconds;
        c.header('Retry-After', String(retryAfter));
        return c.json({
          error: 'Too many requests. Please try again later.',
          retryAfter,
        }, 429);
      }

      // Record this attempt
      await c.env.DB.prepare(
        'INSERT INTO rate_limits (key, created_at, expires_at) VALUES (?, ?, ?)'
      ).bind(key, now, now + windowSeconds).run();

    } catch (err) {
      // Don't block requests if rate limiting infra fails
      console.error('Rate limit error:', err);
    }

    await next();
  };
}

/**
 * Login-specific rate limiter: stricter limits.
 * 5 attempts per 15 minutes per IP.
 */
export const loginRateLimit = rateLimitMiddleware({
  max: 5,
  windowSeconds: 900, // 15 minutes
  keyPrefix: 'rl:login',
});

/**
 * Register rate limiter: moderate limits.
 * 3 accounts per hour per IP.
 */
export const registerRateLimit = rateLimitMiddleware({
  max: 3,
  windowSeconds: 3600, // 1 hour
  keyPrefix: 'rl:register',
});
