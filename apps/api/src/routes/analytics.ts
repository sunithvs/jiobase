import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import {
  getAnalyticsOverview,
  getLatencyPercentiles,
  getEndpointBreakdown,
  getErrorBuckets,
} from '../lib/analytics.js';
import type { AppEnv } from '../types.js';

const analyticsRouter = new Hono<AppEnv>();

analyticsRouter.use('*', authMiddleware);

function parseWindow(raw: string | undefined): string {
  return ['1h', '24h', '7d', '30d'].includes(raw ?? '') ? raw! : '24h';
}

async function verifyOwnership(db: D1Database, appId: string, userId: string) {
  return db
    .prepare('SELECT id FROM apps WHERE id = ? AND user_id = ?')
    .bind(appId, userId)
    .first<{ id: string }>();
}

function aeEnv(c: any) {
  return { CF_ACCOUNT_ID: c.env.CF_ACCOUNT_ID, CF_API_TOKEN: c.env.CF_API_TOKEN };
}

// GET /api/apps/:id/analytics — full overview
analyticsRouter.get('/:id/analytics', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');
  const window = parseWindow(c.req.query('window'));

  if (!await verifyOwnership(c.env.DB, appId, user.id)) {
    return c.json({ error: 'App not found' }, 404);
  }
  try {
    return c.json({ data: await getAnalyticsOverview(aeEnv(c), appId, window) });
  } catch {
    return c.json({ error: 'Failed to fetch analytics' }, 500);
  }
});

// GET /api/apps/:id/analytics/latency
analyticsRouter.get('/:id/analytics/latency', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');
  const window = parseWindow(c.req.query('window'));

  if (!await verifyOwnership(c.env.DB, appId, user.id)) {
    return c.json({ error: 'App not found' }, 404);
  }
  try {
    return c.json({ data: await getLatencyPercentiles(aeEnv(c), appId, window) });
  } catch {
    return c.json({ error: 'Failed to fetch latency data' }, 500);
  }
});

// GET /api/apps/:id/analytics/endpoints
analyticsRouter.get('/:id/analytics/endpoints', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');
  const window = parseWindow(c.req.query('window'));

  if (!await verifyOwnership(c.env.DB, appId, user.id)) {
    return c.json({ error: 'App not found' }, 404);
  }
  try {
    return c.json({ data: await getEndpointBreakdown(aeEnv(c), appId, window) });
  } catch {
    return c.json({ error: 'Failed to fetch endpoint data' }, 500);
  }
});

// GET /api/apps/:id/analytics/errors
analyticsRouter.get('/:id/analytics/errors', async (c) => {
  const user = c.get('user');
  const appId = c.req.param('id');
  const window = parseWindow(c.req.query('window'));

  if (!await verifyOwnership(c.env.DB, appId, user.id)) {
    return c.json({ error: 'App not found' }, 404);
  }
  try {
    return c.json({ data: await getErrorBuckets(aeEnv(c), appId, window) });
  } catch {
    return c.json({ error: 'Failed to fetch error data' }, 500);
  }
});

export default analyticsRouter;
