import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth.js';
import apps from './routes/apps.js';
import type { AppEnv } from './types.js';

const app = new Hono<AppEnv>();

// CORS — allow dashboard origin
app.use('/api/*', cors({
  origin: (origin) => origin || '*',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'jiobase-api' });
});

// Routes
app.route('/api/auth', auth);
app.route('/api/apps', apps);

// Global error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err.message, err.stack);
  return c.json({ error: 'Internal server error', message: err.message }, 500);
});

// 404 fallback
app.all('/api/*', (c) => {
  return c.json({ error: 'Not found' }, 404);
});

export default app;
