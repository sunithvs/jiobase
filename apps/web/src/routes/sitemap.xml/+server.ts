import { ALL_FIX_SLUGS, ALL_FRAMEWORK_SLUGS } from '$lib/data/seo-pages';

const SITE = 'https://jiobase.com';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog/supabase-blocked-india-fix', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/proxy-supabase-cloudflare-workers', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/why-indian-developers-need-supabase-proxy', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/firebase-supabase-blocked-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/test-if-backend-blocked-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-alternatives-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/fix-supabase-jio-5-minutes', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-err-connection-timed-out-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/why-supabase-banned-india-section-69a', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-india-block-timeline', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-production-app-broken-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/india-blocking-developer-tools-history', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/dns-poisoning-supabase-india-explained', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-vs-firebase-both-blocked-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/india-disrupts-supabase-blocking-order', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog/supabase-network-connectivity-problems-india', priority: '0.7', changefreq: 'monthly' },
  { path: '/docs', priority: '0.8', changefreq: 'weekly' },
  { path: '/tools/worker-generator', priority: '0.8', changefreq: 'monthly' },
  { path: '/india-status', priority: '0.6', changefreq: 'weekly' },
  { path: '/login', priority: '0.3', changefreq: 'yearly' },
  { path: '/register', priority: '0.3', changefreq: 'yearly' },
];

// Dynamically generate /fix/ and /guides/ pages from SEO data
const fixPages = ALL_FIX_SLUGS.map((slug) => ({
  path: `/fix/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const guidePages = ALL_FRAMEWORK_SLUGS.map((slug) => ({
  path: `/guides/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const pages = [...staticPages, ...fixPages, ...guidePages];

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
