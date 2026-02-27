import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import type { AppEnv } from '../types.js';

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const token = getCookie(c, 'jb_session');

  if (!token) {
    return c.json({ error: 'Authentication required' }, 401);
  }

  const now = Math.floor(Date.now() / 1000);

  const result = await c.env.DB.prepare(`
    SELECT u.id, u.email, u.name, u.plan, u.email_verified
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.token = ? AND s.expires_at > ?
  `).bind(token, now).first<{
    id: string;
    email: string;
    name: string | null;
    plan: string;
    email_verified: number;
  }>();

  if (!result) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }

  c.set('user', {
    id: result.id,
    email: result.email,
    name: result.name,
    plan: result.plan as any,
    emailVerified: result.email_verified,
  });

  await next();
});
