import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth.js';
import apps from './routes/apps.js';
import type { AppEnv } from './types.js';

const app = new Hono<AppEnv>();

// CORS — allow dashboard origins
const ALLOWED_ORIGINS = [
  'https://jiobase.com',
  'https://www.jiobase.com',
  'https://app.jiobase.com',
  'https://jiobase-web.pages.dev',
  'http://localhost:5173',
];

app.use('/api/*', cors({
  origin: (origin) => {
    // No Origin header = non-browser request (cURL, server-to-server)
    // Return first allowed origin so CORS headers are still set
    if (!origin) return ALLOWED_ORIGINS[0];
    if (ALLOWED_ORIGINS.includes(origin)) return origin;
    // Allow *.pages.dev preview deploys
    if (origin.endsWith('.jiobase-web.pages.dev')) return origin;
    return ALLOWED_ORIGINS[0];
  },
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
  // Don't expose internal error details to clients
  return c.json({ error: 'Internal server error' }, 500);
});

// 404 fallback
app.all('/api/*', (c) => {
  return c.json({ error: 'Not found' }, 404);
});

export default app;
