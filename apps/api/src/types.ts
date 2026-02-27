import type { Plan } from '@jiobase/shared';

export type Bindings = {
  DB: D1Database;
  PROXY_CONFIG: KVNamespace;
  ENVIRONMENT: string;
  APP_URL: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  plan: Plan;
  emailVerified: number;
};

export type Variables = {
  user: AuthUser;
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};
