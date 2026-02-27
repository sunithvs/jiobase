import { z } from 'zod';

// ============================================
// Auth schemas
// ============================================

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Name is required').max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// ============================================
// App schemas
// ============================================

const slugRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
const supabaseUrlRegex = /^https:\/\/[a-z0-9]+\.supabase\.co$/;

export const createAppSchema = z.object({
  name: z.string().min(1, 'App name is required').max(100),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(63, 'Slug must be at most 63 characters')
    .regex(slugRegex, 'Slug must be lowercase alphanumeric with hyphens'),
  supabaseUrl: z.string()
    .url('Must be a valid URL')
    .regex(supabaseUrlRegex, 'Must be a valid Supabase project URL (https://xxxxx.supabase.co)'),
  supabaseAnonKey: z.string().optional(),
});

export const updateAppSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  supabaseUrl: z.string().url().regex(supabaseUrlRegex).optional(),
  supabaseAnonKey: z.string().optional(),
  isActive: z.boolean().optional(),
  rateLimitPerMinute: z.number().int().min(0).max(100000).optional(),
  allowedOrigins: z.string().max(2000).optional(),
  customHeaders: z.string().max(5000).optional(),
  enabledServices: z.string().max(200).optional(),
});

// ============================================
// Domain schemas
// ============================================

const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

export const addDomainSchema = z.object({
  domain: z.string()
    .min(4, 'Domain is too short')
    .max(253, 'Domain is too long')
    .regex(domainRegex, 'Invalid domain format'),
});

// ============================================
// API key schemas
// ============================================

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  expiresAt: z.number().int().optional(),
});

// ============================================
// Type exports
// ============================================

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAppInput = z.infer<typeof createAppSchema>;
export type UpdateAppInput = z.infer<typeof updateAppSchema>;
export type AddDomainInput = z.infer<typeof addDomainSchema>;
export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
