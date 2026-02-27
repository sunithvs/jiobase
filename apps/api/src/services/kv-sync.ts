import { PLAN_LIMITS } from '@jiobase/shared';
import type { Plan, ProxyConfig, SupabaseService } from '@jiobase/shared';

// D1 raw query returns snake_case column names
interface AppRow {
  id: string;
  user_id: string;
  slug: string;
  supabase_url: string;
  supabase_anon_key: string | null;
  is_active: number;
  rate_limit_per_minute: number;
  allowed_origins: string;
  custom_headers: string | null;
  enabled_services: string;
}

export async function syncAppToKV(kv: KVNamespace, app: AppRow, plan: Plan) {
  const config: ProxyConfig = {
    appId: app.id,
    userId: app.user_id,
    supabaseUrl: app.supabase_url,
    supabaseAnonKey: app.supabase_anon_key || undefined,
    isActive: !!app.is_active,
    rateLimitPerMinute: app.rate_limit_per_minute,
    allowedOrigins: app.allowed_origins,
    customHeaders: app.custom_headers ? JSON.parse(app.custom_headers) : undefined,
    enabledServices: app.enabled_services.split(',') as SupabaseService[],
    plan,
    monthlyRequestLimit: PLAN_LIMITS[plan].requestsPerMonth,
  };

  await kv.put(`app:${app.slug}`, JSON.stringify(config));
}

export async function removeAppFromKV(kv: KVNamespace, slug: string) {
  await kv.delete(`app:${slug}`);
}

export async function syncDomainToKV(kv: KVNamespace, domain: string, slug: string) {
  await kv.put(`domain:${domain}`, slug);
}

export async function removeDomainFromKV(kv: KVNamespace, domain: string) {
  await kv.delete(`domain:${domain}`);
}
