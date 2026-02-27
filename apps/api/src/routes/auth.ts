import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import { registerSchema, loginSchema } from '@jiobase/shared';
import { DEFAULTS } from '@jiobase/shared';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { generateId, generateToken } from '../lib/id.js';
import { authMiddleware } from '../middleware/auth.js';
import type { AppEnv } from '../types.js';

const auth = new Hono<AppEnv>();

// POST /api/auth/register
auth.post('/register', async (c) => {
  const body = await c.req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { email, password, name } = parsed.data;

  // Check if email already exists
  const existing = await c.env.DB.prepare(
    'SELECT id FROM users WHERE email = ?'
  ).bind(email.toLowerCase()).first();

  if (existing) {
    return c.json({ error: 'Email already registered' }, 409);
  }

  const userId = generateId();
  const passwordHash = await hashPassword(password);
  const now = Math.floor(Date.now() / 1000);

  await c.env.DB.prepare(`
    INSERT INTO users (id, email, name, password_hash, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(userId, email.toLowerCase(), name || null, passwordHash, now, now).run();

  // Create session
  const token = generateToken();
  const sessionId = generateId();
  const expiresAt = now + DEFAULTS.SESSION_EXPIRY_DAYS * 86400;

  await c.env.DB.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    sessionId,
    userId,
    token,
    expiresAt,
    c.req.header('cf-connecting-ip') || null,
    c.req.header('user-agent') || null,
    now
  ).run();

  setCookie(c, 'jb_session', token, {
    httpOnly: true,
    secure: c.env.ENVIRONMENT !== 'development',
    sameSite: 'Lax',
    path: '/',
    maxAge: DEFAULTS.SESSION_EXPIRY_DAYS * 86400,
  });

  return c.json({
    data: {
      id: userId,
      email: email.toLowerCase(),
      name: name || null,
      plan: 'free',
    },
  }, 201);
});

// POST /api/auth/login
auth.post('/login', async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { email, password } = parsed.data;

  const user = await c.env.DB.prepare(
    'SELECT id, email, name, password_hash, plan, email_verified FROM users WHERE email = ?'
  ).bind(email.toLowerCase()).first<{
    id: string;
    email: string;
    name: string | null;
    password_hash: string | null;
    plan: string;
    email_verified: number;
  }>();

  if (!user || !user.password_hash) {
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  const now = Math.floor(Date.now() / 1000);
  const token = generateToken();
  const sessionId = generateId();
  const expiresAt = now + DEFAULTS.SESSION_EXPIRY_DAYS * 86400;

  await c.env.DB.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    sessionId,
    user.id,
    token,
    expiresAt,
    c.req.header('cf-connecting-ip') || null,
    c.req.header('user-agent') || null,
    now
  ).run();

  setCookie(c, 'jb_session', token, {
    httpOnly: true,
    secure: c.env.ENVIRONMENT !== 'development',
    sameSite: 'Lax',
    path: '/',
    maxAge: DEFAULTS.SESSION_EXPIRY_DAYS * 86400,
  });

  return c.json({
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
    },
  });
});

// POST /api/auth/logout
auth.post('/logout', async (c) => {
  const token = getCookie(c, 'jb_session');
  if (token) {
    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  }

  deleteCookie(c, 'jb_session', { path: '/' });
  return c.json({ message: 'Logged out' });
});

// GET /api/auth/me
auth.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ data: user });
});

export default auth;
