// ============================================
// User types
// ============================================

export type Plan = 'free' | 'pro' | 'business' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  plan: Plan;
  createdAt: number;
  updatedAt: number;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: number;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: number;
}

// ============================================
// App types
// ============================================

export type SupabaseService = 'rest' | 'auth' | 'storage' | 'realtime' | 'functions' | 'graphql';

export interface App {
  id: string;
  userId: string;
  name: string;
  slug: string;
  supabaseUrl: string;
  supabaseAnonKey: string | null;
  isActive: boolean;
  rateLimitPerMinute: number;
  allowedOrigins: string;
  customHeaders: string | null;
  enabledServices: string;
  requestCountMonth: number;
  lastRequestAt: number | null;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// Proxy config (stored in KV)
// ============================================

export interface ProxyConfig {
  appId: string;
  userId: string;
  supabaseUrl: string;
  supabaseAnonKey?: string;
  isActive: boolean;
  rateLimitPerMinute: number;
  allowedOrigins: string;
  customHeaders?: Record<string, string>;
  enabledServices: SupabaseService[];
  plan: Plan;
  monthlyRequestLimit: number;
}

// ============================================
// Custom domain types
// ============================================

export type DomainStatus = 'pending_dns' | 'pending_ssl' | 'active' | 'error';

export interface CustomDomain {
  id: string;
  appId: string;
  userId: string;
  domain: string;
  status: DomainStatus;
  cnameTarget: string;
  sslStatus: string;
  verifiedAt: number | null;
  errorMessage: string | null;
  lastCheckedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// API key types
// ============================================

export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  keyPrefix: string;
  lastUsedAt: number | null;
  expiresAt: number | null;
  createdAt: number;
}

// ============================================
// Billing types
// ============================================

export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due';
export type BillingProvider = 'stripe' | 'razorpay';

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  provider: BillingProvider | null;
  providerSubscriptionId: string | null;
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  cancelAtPeriodEnd: boolean;
  createdAt: number;
  updatedAt: number;
}

// ============================================
// API response types
// ============================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}
