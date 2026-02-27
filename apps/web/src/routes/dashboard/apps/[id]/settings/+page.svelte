<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api, type AppRecord, ApiError } from '$lib/api.js';

	let app = $state<AppRecord | null>(null);
	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');
	let success = $state('');

	let name = $state('');
	let supabaseUrl = $state('');
	let supabaseAnonKey = $state('');
	let rateLimitPerMinute = $state(600);
	let allowedOrigins = $state('*');
	let enabledServices = $state('rest,auth,storage,realtime,functions,graphql');

	onMount(async () => {
		try {
			const res = await api.apps.get(page.params.id!);
			app = res.data;
			name = app.name;
			supabaseUrl = app.supabase_url;
			supabaseAnonKey = app.supabase_anon_key || '';
			rateLimitPerMinute = app.rate_limit_per_minute;
			allowedOrigins = app.allowed_origins;
			enabledServices = app.enabled_services;
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to load app';
		} finally {
			loading = false;
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!app) return;
		error = '';
		success = '';
		saving = true;
		try {
			const res = await api.apps.update(app.id, {
				name,
				supabaseUrl,
				supabaseAnonKey: supabaseAnonKey || undefined,
				rateLimitPerMinute,
				allowedOrigins,
				enabledServices,
			});
			app = res.data;
			success = 'Settings saved.';
			setTimeout(() => (success = ''), 3000);
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to save settings';
		} finally {
			saving = false;
		}
	}
</script>

{#if loading}
	<div class="text-center text-gray-400">Loading...</div>
{:else if app}
	<a href="/dashboard/apps/{app.id}" class="text-sm text-gray-400 hover:text-gray-300">&larr; Back to app</a>
	<h1 class="mt-2 text-2xl font-bold text-white">Settings — {app.name}</h1>

	<form onsubmit={handleSubmit} class="mt-6 max-w-lg space-y-5">
		{#if error}
			<div class="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}
		{#if success}
			<div class="rounded-md bg-green-500/10 px-4 py-3 text-sm text-green-400">{success}</div>
		{/if}

		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-300">App Name</label>
			<input id="name" type="text" bind:value={name} required
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
		</div>

		<div>
			<label for="supabaseUrl" class="mb-1 block text-sm font-medium text-gray-300">Supabase URL</label>
			<input id="supabaseUrl" type="url" bind:value={supabaseUrl} required
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
		</div>

		<div>
			<label for="anonKey" class="mb-1 block text-sm font-medium text-gray-300">Supabase Anon Key</label>
			<input id="anonKey" type="text" bind:value={supabaseAnonKey}
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
		</div>

		<div>
			<label for="rateLimit" class="mb-1 block text-sm font-medium text-gray-300">Rate Limit (req/min)</label>
			<input id="rateLimit" type="number" bind:value={rateLimitPerMinute} min="0" max="100000"
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
		</div>

		<div>
			<label for="origins" class="mb-1 block text-sm font-medium text-gray-300">Allowed Origins</label>
			<input id="origins" type="text" bind:value={allowedOrigins}
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
			<p class="mt-1 text-xs text-gray-500">Comma-separated origins, or * for all</p>
		</div>

		<div>
			<label for="services" class="mb-1 block text-sm font-medium text-gray-300">Enabled Services</label>
			<input id="services" type="text" bind:value={enabledServices}
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
			<p class="mt-1 text-xs text-gray-500">Comma-separated: rest, auth, storage, realtime, functions, graphql</p>
		</div>

		<button
			type="submit"
			disabled={saving}
			class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
		>
			{saving ? 'Saving...' : 'Save Settings'}
		</button>
	</form>
{/if}
