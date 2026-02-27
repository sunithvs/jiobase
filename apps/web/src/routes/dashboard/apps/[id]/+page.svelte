<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { api, type AppRecord, ApiError } from '$lib/api.js';
	import { JIOBASE_DOMAIN } from '@jiobase/shared';

	let app = $state<AppRecord | null>(null);
	let loading = $state(true);
	let error = $state('');
	let copied = $state(false);

	onMount(async () => {
		try {
			const res = await api.apps.get(page.params.id!);
			app = res.data;
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to load app';
		} finally {
			loading = false;
		}
	});

	async function handleToggle() {
		if (!app) return;
		try {
			const res = await api.apps.toggle(app.id);
			app = res.data;
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to toggle app';
		}
	}

	async function handleDelete() {
		if (!app || !confirm(`Delete "${app.name}"? This cannot be undone.`)) return;
		try {
			await api.apps.delete(app.id);
			goto('/dashboard');
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to delete app';
		}
	}

	function copyUrl() {
		if (!app) return;
		navigator.clipboard.writeText(`https://${app.slug}.${JIOBASE_DOMAIN}`);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function formatDate(ts: number): string {
		return new Date(ts * 1000).toLocaleString();
	}
</script>

{#if loading}
	<div class="text-center text-gray-400">Loading...</div>
{:else if error}
	<div class="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
{:else if app}
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<div class="min-w-0">
			<a href="/dashboard" class="text-sm text-gray-400 transition hover:text-brand-400">&larr; Back to apps</a>
			<h1 class="mt-2 text-2xl font-bold text-white truncate">{app.name}</h1>
		</div>
		<div class="flex gap-2 shrink-0">
			<a
				href="/dashboard/apps/{app.id}/settings"
				class="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
			>
				Settings
			</a>
			<button
				onclick={handleToggle}
				class="rounded-lg border px-3 py-1.5 text-sm transition {app.is_active
					? 'border-amber-500/20 text-amber-400 hover:bg-amber-500/10'
					: 'border-brand-400/20 text-brand-400 hover:bg-brand-400/10'}"
			>
				{app.is_active ? 'Deactivate' : 'Activate'}
			</button>
		</div>
	</div>

	<!-- Proxy URL -->
	<div class="mt-6 glass-card rounded-xl p-5">
		<p class="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">Proxy URL</p>
		<div class="flex items-center gap-2">
			<code class="flex-1 truncate text-sm text-brand-400">https://{app.slug}.{JIOBASE_DOMAIN}</code>
			<button onclick={copyUrl} class="shrink-0 rounded-md border border-white/10 px-2.5 py-1 text-xs text-gray-400 transition hover:border-white/20 hover:text-white">
				{copied ? 'Copied!' : 'Copy'}
			</button>
		</div>
	</div>

	<!-- Quick integration snippet -->
	<div class="mt-4 glass-card rounded-xl p-5">
		<p class="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Quick Integration</p>
		<div class="code-block rounded-lg p-4">
			<pre class="overflow-x-auto text-xs leading-6 text-gray-300"><code><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-brand-400">'https://{app.slug}.{JIOBASE_DOMAIN}'</span>,
  <span class="text-amber-300">'your-anon-key'</span>
)</code></pre>
		</div>
	</div>

	<!-- Stats -->
	<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="glass-card rounded-xl p-4">
			<p class="text-xs text-gray-500">Status</p>
			<p class="mt-1 text-lg font-semibold {app.is_active ? 'text-brand-400' : 'text-gray-400'}">
				{app.is_active ? 'Active' : 'Inactive'}
			</p>
		</div>
		<div class="glass-card rounded-xl p-4">
			<p class="text-xs text-gray-500">Requests (this month)</p>
			<p class="mt-1 text-lg font-semibold text-white">{app.request_count_month.toLocaleString()}</p>
		</div>
		<div class="glass-card rounded-xl p-4">
			<p class="text-xs text-gray-500">Rate Limit</p>
			<p class="mt-1 text-lg font-semibold text-white">{app.rate_limit_per_minute}/min</p>
		</div>
	</div>

	<!-- Details -->
	<div class="mt-6 glass-card rounded-xl p-5">
		<h2 class="mb-3 text-sm font-medium text-gray-300">Details</h2>
		<dl class="space-y-2.5 text-sm">
			<div class="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
				<dt class="text-gray-500 shrink-0">Upstream</dt>
				<dd class="text-gray-200 truncate">{app.supabase_url}</dd>
			</div>
			<div class="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
				<dt class="text-gray-500 shrink-0">Allowed Origins</dt>
				<dd class="text-gray-200 break-all">{app.allowed_origins}</dd>
			</div>
			<div class="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
				<dt class="text-gray-500 shrink-0">Enabled Services</dt>
				<dd class="text-gray-200 break-all">{app.enabled_services}</dd>
			</div>
			<div class="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
				<dt class="text-gray-500 shrink-0">Created</dt>
				<dd class="text-gray-200">{formatDate(app.created_at)}</dd>
			</div>
		</dl>
	</div>

	<!-- Danger zone -->
	<div class="mt-8 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
		<h2 class="text-sm font-medium text-red-400">Danger Zone</h2>
		<p class="mt-1 text-xs text-gray-400">Deleting an app removes it permanently and stops all proxied traffic.</p>
		<button
			onclick={handleDelete}
			class="mt-3 rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10"
		>
			Delete App
		</button>
	</div>
{/if}
