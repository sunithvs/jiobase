const API_BASE = '/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new ApiError(json.error || 'Request failed', res.status, json);
  }

  return json;
}

export class ApiError extends Error {
  status: number;
  body: any;
  constructor(message: string, status: number, body: any) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

// Auth
export const api = {
  auth: {
    register: (data: { email: string; password: string; name?: string }) =>
      request<{ data: AuthUser }>('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

    login: (data: { email: string; password: string }) =>
      request<{ data: AuthUser }>('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

    logout: () =>
      request<{ message: string }>('/auth/logout', { method: 'POST' }),

    me: () =>
      request<{ data: AuthUser }>('/auth/me'),
  },

  apps: {
    list: () =>
      request<{ data: AppRecord[] }>('/apps'),

    get: (id: string) =>
      request<{ data: AppRecord }>(`/apps/${id}`),

    create: (data: { name: string; slug: string; supabaseUrl: string; supabaseAnonKey?: string }) =>
      request<{ data: AppRecord }>('/apps', { method: 'POST', body: JSON.stringify(data) }),

    update: (id: string, data: Record<string, unknown>) =>
      request<{ data: AppRecord }>(`/apps/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

    delete: (id: string) =>
      request<{ message: string }>(`/apps/${id}`, { method: 'DELETE' }),

    toggle: (id: string) =>
      request<{ data: AppRecord }>(`/apps/${id}/toggle`, { method: 'POST' }),
  },
};

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  plan: string;
  emailVerified?: number;
}

export interface AppRecord {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  supabase_url: string;
  supabase_anon_key: string | null;
  is_active: number;
  rate_limit_per_minute: number;
  allowed_origins: string;
  custom_headers: string | null;
  enabled_services: string;
  request_count_month: number;
  last_request_at: number | null;
  created_at: number;
  updated_at: number;
}
