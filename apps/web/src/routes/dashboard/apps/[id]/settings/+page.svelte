<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { api, type AppRecord, ApiError } from '$lib/api.js';

	let app = $state<AppRecord | null>(null);
	let loading = $state(true);
	let saving = $state(false);
	let error = $state('');
	let success = $state('');

	// Basic
	let name = $state('');
	let supabaseUrl = $state('');
	let allowedOrigins = $state('*');
	let enabledServices = $state('rest,auth,storage,realtime,functions,graphql');

	// Rate limiting
	let rateLimitPerMinute = $state(600);
	let rateLimitBurstSize = $state(10);
	let trackPerIp = $state(true);
	let trackPerUser = $state(true);

	// Failover
	let backupSupabaseUrl = $state('');
	let enableFailover = $state(false);
	let failoverThresholdMs = $state(5000);

	onMount(async () => {
		try {
			const res = await api.apps.get(page.params.id!);
			app = res.data;
			name = app.name;
			supabaseUrl = app.supabase_url;
			allowedOrigins = app.allowed_origins;
			enabledServices = app.enabled_services;
			rateLimitPerMinute = app.rate_limit_per_minute;
			rateLimitBurstSize = app.rate_limit_burst_size ?? 10;
			trackPerIp = !!app.track_per_ip;
			trackPerUser = !!app.track_per_user;
			backupSupabaseUrl = app.backup_supabase_url ?? '';
			enableFailover = !!app.enable_failover;
			failoverThresholdMs = app.failover_threshold_ms ?? 5000;
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
				allowedOrigins,
				enabledServices,
				rateLimitPerMinute,
				rateLimitBurstSize,
				trackPerIp,
				trackPerUser,
				backupSupabaseUrl: backupSupabaseUrl || null,
				enableFailover,
				failoverThresholdMs,
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
	<a href="/dashboard/apps/{app.id}" class="text-sm text-gray-400 transition hover:text-brand-400">&larr; Back to app</a>
	<h1 class="mt-2 text-2xl font-bold text-white">Settings — {app.name}</h1>

	<form onsubmit={handleSubmit} class="mt-6 max-w-lg space-y-8">
		{#if error}
			<div class="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}
		{#if success}
			<div class="rounded-lg bg-brand-400/10 px-4 py-3 text-sm text-brand-400">{success}</div>
		{/if}

		<!-- ── Basic ── -->
		<section class="space-y-4">
			<h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">General</h2>

			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-gray-300">App Name</label>
				<input id="name" type="text" bind:value={name} required
					class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
			</div>

			<div>
				<label for="supabaseUrl" class="mb-1 block text-sm font-medium text-gray-300">Supabase URL</label>
				<input id="supabaseUrl" type="url" bind:value={supabaseUrl} required
					placeholder="https://xxxx.supabase.co"
					class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
			</div>

			<div>
				<label for="origins" class="mb-1 block text-sm font-medium text-gray-300">Allowed Origins</label>
				<input id="origins" type="text" bind:value={allowedOrigins}
					class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
				<p class="mt-1 text-xs text-gray-500">Comma-separated origins, or * for all</p>
			</div>

			<div>
				<label for="services" class="mb-1 block text-sm font-medium text-gray-300">Enabled Services</label>
				<input id="services" type="text" bind:value={enabledServices}
					class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
				<p class="mt-1 text-xs text-gray-500">Comma-separated: rest, auth, storage, realtime, functions, graphql</p>
			</div>
		</section>

		<!-- ── Rate Limiting ── -->
		<section class="space-y-4">
			<h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Rate Limiting</h2>

			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="rateLimit" class="mb-1 block text-sm font-medium text-gray-300">Requests / min</label>
					<input id="rateLimit" type="number" bind:value={rateLimitPerMinute} min="0" max="100000"
						class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
					<p class="mt-1 text-xs text-gray-500">0 = unlimited</p>
				</div>
				<div>
					<label for="burstSize" class="mb-1 block text-sm font-medium text-gray-300">Burst size</label>
					<input id="burstSize" type="number" bind:value={rateLimitBurstSize} min="1" max="1000"
						class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
					<p class="mt-1 text-xs text-gray-500">Extra instant requests</p>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<label class="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" bind:checked={trackPerIp}
						class="h-4 w-4 rounded border-white/20 bg-surface-200 text-brand-400 focus:ring-brand-400" />
					<span class="text-sm text-gray-300">Track per IP <span class="text-xs text-gray-500">(blocks single-source abuse)</span></span>
				</label>
				<label class="flex items-center gap-3 cursor-pointer">
					<input type="checkbox" bind:checked={trackPerUser}
						class="h-4 w-4 rounded border-white/20 bg-surface-200 text-brand-400 focus:ring-brand-400" />
					<span class="text-sm text-gray-300">Track per user <span class="text-xs text-gray-500">(limits authenticated users)</span></span>
				</label>
			</div>
		</section>

		<!-- ── Failover ── -->
		<section class="space-y-4">
			<h2 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Failover</h2>

			<div>
				<label for="backupUrl" class="mb-1 block text-sm font-medium text-gray-300">Backup Supabase URL</label>
				<input id="backupUrl" type="url" bind:value={backupSupabaseUrl}
					placeholder="https://xxxx.supabase.co (optional)"
					class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
				<p class="mt-1 text-xs text-gray-500">Traffic switches here if primary is unreachable</p>
			</div>

			<div>
				<label for="threshold" class="mb-1 block text-sm font-medium text-gray-300">
					Failover threshold — {failoverThresholdMs}ms
				</label>
				<input id="threshold" type="range" bind:value={failoverThresholdMs}
					min="500" max="30000" step="500"
					class="w-full accent-brand-400" />
				<div class="mt-1 flex justify-between text-xs text-gray-500">
					<span>500ms</span><span>30s</span>
				</div>
			</div>

			<label class="flex items-center gap-3 cursor-pointer">
				<input type="checkbox" bind:checked={enableFailover} disabled={!backupSupabaseUrl}
					class="h-4 w-4 rounded border-white/20 bg-surface-200 text-brand-400 focus:ring-brand-400 disabled:opacity-40" />
				<span class="text-sm text-gray-300 {!backupSupabaseUrl ? 'opacity-40' : ''}">
					Enable automatic failover
					{#if !backupSupabaseUrl}<span class="text-xs text-gray-500">(add backup URL first)</span>{/if}
				</span>
			</label>
		</section>

		<button
			type="submit"
			disabled={saving}
			class="rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300 disabled:opacity-50"
		>
			{saving ? 'Saving...' : 'Save Settings'}
		</button>
	</form>
{/if}
