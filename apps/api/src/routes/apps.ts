import { Hono } from 'hono';
import { createAppSchema, updateAppSchema, PLAN_LIMITS } from '@jiobase/shared';
import type { Plan } from '@jiobase/shared';
import { authMiddleware } from '../middleware/auth.js';
import { generateId } from '../lib/id.js';
import { syncAppToKV, removeAppFromKV } from '../services/kv-sync.js';
import type { AppEnv } from '../types.js';

const appsRouter = new Hono<AppEnv>();

// All app routes require auth
appsRouter.use('*', authMiddleware);

// GET /api/apps — List user's apps
appsRouter.get('/', async (c) => {
  const user = c.get('user');
  const results = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(user.id).all();

  return c.json({ data: results.results });
});

// POST /api/apps — Create new app
appsRouter.post('/', async (c) => {
  const user = c.get('user');
  const body = await c.req.json();
  const parsed = createAppSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  const { name, slug, supabaseUrl, supabaseAnonKey } = parsed.data;

  // Check plan limits
  const limits = PLAN_LIMITS[user.plan];
  if (limits.maxApps !== -1) {
    const count = await c.env.DB.prepare(
      'SELECT COUNT(*) as count FROM apps WHERE user_id = ?'
    ).bind(user.id).first<{ count: number }>();

    if (count && count.count >= limits.maxApps) {
      return c.json({
        error: `Your ${user.plan} plan allows ${limits.maxApps} app(s). Upgrade to add more.`,
      }, 403);
    }
  }

  // Check slug uniqueness
  const existing = await c.env.DB.prepare(
    'SELECT id FROM apps WHERE slug = ?'
  ).bind(slug).first();

  if (existing) {
    return c.json({ error: 'Slug already taken' }, 409);
  }

  const appId = generateId();
  const now = Math.floor(Date.now() / 1000);

  await c.env.DB.prepare(`
    INSERT INTO apps (id, user_id, name, slug, supabase_url, supabase_anon_key, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(appId, user.id, name, slug, supabaseUrl, supabaseAnonKey || null, now, now).run();

  const app = await c.env.DB.prepare('SELECT * FROM apps WHERE id = ?').bind(appId).first();

  // Sync to KV for the proxy worker
  if (app) {
    await syncAppToKV(c.env.PROXY_CONFIG, app as any, user.plan);
  }

  return c.json({ data: app }, 201);
});

// GET /api/apps/:id — Get app details
appsRouter.get('/:id', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');

  const app = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE id = ? AND user_id = ?'
  ).bind(appId, user.id).first();

  if (!app) {
    return c.json({ error: 'App not found' }, 404);
  }

  return c.json({ data: app });
});

// PUT /api/apps/:id — Update app config
appsRouter.put('/:id', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');
  const body = await c.req.json();
  const parsed = updateAppSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: 'Validation failed', details: parsed.error.flatten() }, 400);
  }

  // Verify ownership
  const existing = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE id = ? AND user_id = ?'
  ).bind(appId, user.id).first();

  if (!existing) {
    return c.json({ error: 'App not found' }, 404);
  }

  const now = Math.floor(Date.now() / 1000);
  const updates = parsed.data;

  // Build SET clause dynamically
  const setClauses: string[] = ['updated_at = ?'];
  const values: any[] = [now];

  const fieldMap: Record<string, string> = {
    name: 'name',
    supabaseUrl: 'supabase_url',
    supabaseAnonKey: 'supabase_anon_key',
    isActive: 'is_active',
    rateLimitPerMinute: 'rate_limit_per_minute',
    allowedOrigins: 'allowed_origins',
    customHeaders: 'custom_headers',
    enabledServices: 'enabled_services',
  };

  for (const [key, col] of Object.entries(fieldMap)) {
    if ((updates as any)[key] !== undefined) {
      setClauses.push(`${col} = ?`);
      const val = (updates as any)[key];
      values.push(typeof val === 'boolean' ? (val ? 1 : 0) : val);
    }
  }

  values.push(appId, user.id);

  await c.env.DB.prepare(
    `UPDATE apps SET ${setClauses.join(', ')} WHERE id = ? AND user_id = ?`
  ).bind(...values).run();

  const updated = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE id = ?'
  ).bind(appId).first();

  // Sync updated config to KV
  if (updated) {
    await syncAppToKV(c.env.PROXY_CONFIG, updated as any, user.plan);
  }

  return c.json({ data: updated });
});

// DELETE /api/apps/:id — Delete app
appsRouter.delete('/:id', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');

  const app = await c.env.DB.prepare(
    'SELECT slug FROM apps WHERE id = ? AND user_id = ?'
  ).bind(appId, user.id).first<{ slug: string }>();

  if (!app) {
    return c.json({ error: 'App not found' }, 404);
  }

  // Delete from DB (cascades to custom_domains)
  await c.env.DB.prepare(
    'DELETE FROM apps WHERE id = ? AND user_id = ?'
  ).bind(appId, user.id).run();

  // Remove from KV
  await removeAppFromKV(c.env.PROXY_CONFIG, app.slug);

  return c.json({ message: 'App deleted' });
});

// POST /api/apps/:id/toggle — Activate/deactivate
appsRouter.post('/:id/toggle', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');

  const app = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE id = ? AND user_id = ?'
  ).bind(appId, user.id).first<{ is_active: number; slug: string }>();

  if (!app) {
    return c.json({ error: 'App not found' }, 404);
  }

  const newState = app.is_active ? 0 : 1;
  const now = Math.floor(Date.now() / 1000);

  await c.env.DB.prepare(
    'UPDATE apps SET is_active = ?, updated_at = ? WHERE id = ? AND user_id = ?'
  ).bind(newState, now, appId, user.id).run();

  const updated = await c.env.DB.prepare(
    'SELECT * FROM apps WHERE id = ?'
  ).bind(appId).first();

  if (updated) {
    await syncAppToKV(c.env.PROXY_CONFIG, updated as any, user.plan);
  }

  return c.json({ data: updated });
});

export default appsRouter;
