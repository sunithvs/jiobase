import type { ProxyConfig } from '@jiobase/shared';

export interface Env {
  PROXY_CONFIG: KVNamespace;
  RATE_LIMITS: KVNamespace;
  ANALYTICS: AnalyticsEngineDataset;
  ENVIRONMENT: string;
  PROXY_DOMAIN: string; // e.g. "jiobase.com"
}

export type { ProxyConfig };
