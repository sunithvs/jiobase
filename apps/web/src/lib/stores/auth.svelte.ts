import { api, type AuthUser, ApiError } from '$lib/api.js';

let user = $state<AuthUser | null>(null);
let loading = $state(true);
let checked = $state(false);

export function getAuth() {
  async function check() {
    if (checked) return;
    loading = true;
    try {
      const res = await api.auth.me();
      user = res.data;
    } catch {
      user = null;
    } finally {
      loading = false;
      checked = true;
    }
  }

  async function login(email: string, password: string) {
    const res = await api.auth.login({ email, password });
    user = res.data;
    return res.data;
  }

  async function register(email: string, password: string, name?: string) {
    const res = await api.auth.register({ email, password, name });
    user = res.data;
    return res.data;
  }

  async function logout() {
    await api.auth.logout();
    user = null;
    checked = false;
  }

  return {
    get user() { return user; },
    get loading() { return loading; },
    get checked() { return checked; },
    check,
    login,
    register,
    logout,
  };
}
