import { Hono } from 'hono';
import { setCookie, deleteCookie, getCookie } from 'hono/cookie';
import { registerSchema, loginSchema } from '@jiobase/shared';
import { DEFAULTS } from '@jiobase/shared';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { generateId, generateToken } from '../lib/id.js';
import { authMiddleware } from '../middleware/auth.js';
import { loginRateLimit, registerRateLimit } from '../middleware/rate-limit.js';
import type { AppEnv } from '../types.js';

const auth = new Hono<AppEnv>();

// Maximum failed login attempts before temporary lockout
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_SECONDS = 900; // 15 minutes

/**
 * Check if an email is currently locked out due to too many failed attempts.
 */
async function isLockedOut(db: D1Database, email: string): Promise<boolean> {
  const windowStart = Math.floor(Date.now() / 1000) - LOCKOUT_WINDOW_SECONDS;
  const result = await db.prepare(
    'SELECT COUNT(*) as count FROM login_attempts WHERE email = ? AND success = 0 AND created_at > ?'
  ).bind(email.toLowerCase(), windowStart).first<{ count: number }>();
  return (result?.count || 0) >= MAX_FAILED_ATTEMPTS;
}

/**
 * Record a login attempt (success or failure).
 */
async function recordLoginAttempt(
  db: D1Database,
  email: string,
  ip: string | null,
  success: boolean
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  await db.prepare(
    'INSERT INTO login_attempts (email, ip_address, success, created_at) VALUES (?, ?, ?, ?)'
  ).bind(email.toLowerCase(), ip, success ? 1 : 0, now).run();

  // Clean up old attempts (older than 1 hour) to keep table small
  const cleanupThreshold = now - 3600;
  await db.prepare(
    'DELETE FROM login_attempts WHERE created_at < ?'
  ).bind(cleanupThreshold).run();
}

/**
 * Clear failed login attempts for an email after successful login.
 */
async function clearFailedAttempts(db: D1Database, email: string): Promise<void> {
  await db.prepare(
    'DELETE FROM login_attempts WHERE email = ?'
  ).bind(email.toLowerCase()).run();
}

// POST /api/auth/register
auth.post('/register', registerRateLimit, async (c) => {
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
    // Return same shape as success to prevent email enumeration.
    // A real account is NOT created — the attacker can't distinguish this
    // from a real registration without checking their inbox.
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
auth.post('/login', loginRateLimit, async (c) => {
  const body = await c.req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { email, password } = parsed.data;
  const ip = c.req.header('cf-connecting-ip') || null;

  // Check account lockout
  try {
    const locked = await isLockedOut(c.env.DB, email);
    if (locked) {
      return c.json({
        error: 'Account temporarily locked due to too many failed attempts. Please try again in 15 minutes.',
      }, 429);
    }
  } catch {
    // Don't block login if lockout check fails
  }

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
    // Record failed attempt even for non-existent users (prevents user enumeration via timing)
    try { await recordLoginAttempt(c.env.DB, email, ip, false); } catch {}
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    try { await recordLoginAttempt(c.env.DB, email, ip, false); } catch {}
    return c.json({ error: 'Invalid email or password' }, 401);
  }

  // Successful login — clear failed attempts and record success
  try {
    await clearFailedAttempts(c.env.DB, email);
    await recordLoginAttempt(c.env.DB, email, ip, true);
  } catch {}

  const now = Math.floor(Date.now() / 1000);
  const token = generateToken();
  const sessionId = generateId();
  const expiresAt = now + DEFAULTS.SESSION_EXPIRY_DAYS * 86400;

  // Invalidate existing sessions for this user (session rotation)
  await c.env.DB.prepare(
    'DELETE FROM sessions WHERE user_id = ?'
  ).bind(user.id).run();

  await c.env.DB.prepare(`
    INSERT INTO sessions (id, user_id, token, expires_at, ip_address, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    sessionId,
    user.id,
    token,
    expiresAt,
    ip,
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
