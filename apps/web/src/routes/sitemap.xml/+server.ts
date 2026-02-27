const SITE = 'https://jiobase.com';

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/supabase-blocked-india-fix', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/proxy-supabase-cloudflare-workers', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/why-indian-developers-need-supabase-proxy', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/firebase-supabase-blocked-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/test-if-backend-blocked-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-alternatives-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/docs', priority: '0.8', changefreq: 'weekly' },
  { path: '/tools/worker-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/login', priority: '0.3', changefreq: 'yearly' },
  { path: '/register', priority: '0.3', changefreq: 'yearly' },
];

export function GET() {
  const today = new Date().toISOString().split('T')[0];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
}
