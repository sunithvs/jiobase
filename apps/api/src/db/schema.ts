import { sqliteTable, text, integer, uniqueIndex, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// Users & Auth
// ============================================

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  passwordHash: text('password_hash'),
  emailVerified: integer('email_verified').default(0),
  plan: text('plan').default('free'),
  stripeCustomerId: text('stripe_customer_id'),
  razorpayCustomerId: text('razorpay_customer_id'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').unique().notNull(),
  expiresAt: integer('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
}, (table) => [
  index('idx_sessions_token').on(table.token),
  index('idx_sessions_user').on(table.userId),
]);

export const oauthAccounts = sqliteTable('oauth_accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
}, (table) => [
  uniqueIndex('idx_oauth_provider_account').on(table.provider, table.providerAccountId),
]);

export const emailVerificationTokens = sqliteTable('email_verification_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').unique().notNull(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
});

export const passwordResetTokens = sqliteTable('password_reset_tokens', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').unique().notNull(),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
});

// ============================================
// Apps
// ============================================

export const apps = sqliteTable('apps', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  supabaseUrl: text('supabase_url').notNull(),
  supabaseAnonKey: text('supabase_anon_key'),
  isActive: integer('is_active').default(1),
  rateLimitPerMinute: integer('rate_limit_per_minute').default(600),
  allowedOrigins: text('allowed_origins').default('*'),
  customHeaders: text('custom_headers'),
  enabledServices: text('enabled_services').default('rest,auth,storage,realtime,functions,graphql'),
  requestCountMonth: integer('request_count_month').default(0),
  lastRequestAt: integer('last_request_at'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
}, (table) => [
  index('idx_apps_user').on(table.userId),
  index('idx_apps_slug').on(table.slug),
]);

// ============================================
// Custom Domains
// ============================================

export const customDomains = sqliteTable('custom_domains', {
  id: text('id').primaryKey(),
  appId: text('app_id').notNull().references(() => apps.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  domain: text('domain').unique().notNull(),
  status: text('status').default('pending_dns'),
  cnameTarget: text('cname_target').notNull(),
  sslStatus: text('ssl_status').default('pending'),
  verifiedAt: integer('verified_at'),
  errorMessage: text('error_message'),
  lastCheckedAt: integer('last_checked_at'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
}, (table) => [
  index('idx_domains_app').on(table.appId),
  index('idx_domains_domain').on(table.domain),
]);

// ============================================
// API Keys
// ============================================

export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  keyHash: text('key_hash').unique().notNull(),
  keyPrefix: text('key_prefix').notNull(),
  lastUsedAt: integer('last_used_at'),
  expiresAt: integer('expires_at'),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
}, (table) => [
  index('idx_api_keys_user').on(table.userId),
  index('idx_api_keys_hash').on(table.keyHash),
]);

// ============================================
// Billing
// ============================================

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').unique().notNull().references(() => users.id, { onDelete: 'cascade' }),
  plan: text('plan').notNull().default('free'),
  status: text('status').notNull().default('active'),
  provider: text('provider'),
  providerSubscriptionId: text('provider_subscription_id'),
  currentPeriodStart: integer('current_period_start'),
  currentPeriodEnd: integer('current_period_end'),
  cancelAtPeriodEnd: integer('cancel_at_period_end').default(0),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
  updatedAt: integer('updated_at').default(sql`(unixepoch())`),
});

export const usageRecords = sqliteTable('usage_records', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  appId: text('app_id').notNull().references(() => apps.id),
  month: text('month').notNull(),
  requestCount: integer('request_count').default(0),
  bandwidthBytes: integer('bandwidth_bytes').default(0),
  createdAt: integer('created_at').default(sql`(unixepoch())`),
}, (table) => [
  uniqueIndex('idx_usage_app_month').on(table.appId, table.month),
  index('idx_usage_user_month').on(table.userId, table.month),
]);
