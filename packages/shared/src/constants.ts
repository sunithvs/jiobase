import type { Plan, SupabaseService } from './types.js';

// ============================================
// Plan limits
// ============================================

export interface PlanLimits {
  maxApps: number;        // -1 = unlimited
  requestsPerMonth: number; // -1 = unlimited
  customDomains: number;    // -1 = unlimited
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free:       { maxApps: 1,  requestsPerMonth: 50_000,     customDomains: 0  },
  pro:        { maxApps: 5,  requestsPerMonth: 1_000_000,  customDomains: 5  },
  business:   { maxApps: 25, requestsPerMonth: 10_000_000, customDomains: 25 },
  enterprise: { maxApps: -1, requestsPerMonth: -1,         customDomains: -1 },
} as const;

// ============================================
// Supabase services
// ============================================

export const SUPABASE_SERVICES: SupabaseService[] = [
  'rest', 'auth', 'storage', 'realtime', 'functions', 'graphql',
];

export const SERVICE_PATH_MAP: Record<string, SupabaseService> = {
  'rest':      'rest',
  'auth':      'auth',
  'storage':   'storage',
  'realtime':  'realtime',
  'functions': 'functions',
  'graphql':   'graphql',
};

// ============================================
// Error codes
// ============================================

export const ERROR_CODES = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  PLAN_LIMIT_REACHED: 'PLAN_LIMIT_REACHED',
  APP_NOT_FOUND: 'APP_NOT_FOUND',
  APP_INACTIVE: 'APP_INACTIVE',
  SLUG_TAKEN: 'SLUG_TAKEN',
  RATE_LIMITED: 'RATE_LIMITED',
  DOMAIN_NOT_VERIFIED: 'DOMAIN_NOT_VERIFIED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

// ============================================
// Defaults
// ============================================

export const DEFAULTS = {
  SESSION_EXPIRY_DAYS: 7,
  REMEMBER_ME_EXPIRY_DAYS: 30,
  RATE_LIMIT_PER_MINUTE: 600,
  ALLOWED_ORIGINS: '*',
  ENABLED_SERVICES: 'rest,auth,storage,realtime,functions,graphql',
  MAX_REQUEST_SIZE_BYTES: 100 * 1024 * 1024, // 100MB
} as const;

// ============================================
// Domain
// ============================================

export const JIOBASE_DOMAIN = 'jiobase.com';
