import type { Env, ProxyConfig } from './types.js';

export async function resolveConfig(
  hostname: string,
  env: Env
): Promise<{ config: ProxyConfig; slug: string } | null> {
  const proxyDomain = env.PROXY_DOMAIN || 'jiobase.com';

  // Reserved subdomains — not proxy targets
  const RESERVED = ['api', 'app', 'www'];

  let slug: string | null = null;

  // Check if it's a subdomain of our proxy domain: <slug>.jiobase.com
  if (hostname.endsWith(`.${proxyDomain}`)) {
    slug = hostname.replace(`.${proxyDomain}`, '');
    // Skip reserved subdomains
    if (RESERVED.includes(slug)) return null;
  }

  if (slug) {
    // Look up by slug
    const raw = await env.PROXY_CONFIG.get(`app:${slug}`);
    if (!raw) return null;
    return { config: JSON.parse(raw), slug };
  }

  // Otherwise, check custom domain mapping
  const mappedSlug = await env.PROXY_CONFIG.get(`domain:${hostname}`);
  if (!mappedSlug) return null;

  const raw = await env.PROXY_CONFIG.get(`app:${mappedSlug}`);
  if (!raw) return null;
  return { config: JSON.parse(raw), slug: mappedSlug };
}
