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
	<div class="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
{:else if app}
	<div class="flex items-center justify-between">
		<div>
			<a href="/dashboard" class="text-sm text-gray-400 hover:text-gray-300">&larr; Back to apps</a>
			<h1 class="mt-2 text-2xl font-bold text-white">{app.name}</h1>
		</div>
		<div class="flex gap-2">
			<a
				href="/dashboard/apps/{app.id}/settings"
				class="rounded-md border border-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:border-gray-600"
			>
				Settings
			</a>
			<button
				onclick={handleToggle}
				class="rounded-md border border-gray-700 px-3 py-1.5 text-sm {app.is_active
					? 'text-yellow-400 hover:border-yellow-600'
					: 'text-green-400 hover:border-green-600'}"
			>
				{app.is_active ? 'Deactivate' : 'Activate'}
			</button>
		</div>
	</div>

	<!-- Proxy URL -->
	<div class="mt-6 rounded-lg border border-gray-800 bg-gray-900 p-4">
		<p class="mb-1 text-xs font-medium text-gray-400">PROXY URL</p>
		<div class="flex items-center gap-2">
			<code class="flex-1 text-sm text-blue-400">https://{app.slug}.{JIOBASE_DOMAIN}</code>
			<button onclick={copyUrl} class="text-xs text-gray-400 hover:text-white">
				{copied ? 'Copied!' : 'Copy'}
			</button>
		</div>
	</div>

	<!-- Quick integration snippet -->
	<div class="mt-4 rounded-lg border border-gray-800 bg-gray-900 p-4">
		<p class="mb-2 text-xs font-medium text-gray-400">QUICK INTEGRATION</p>
		<pre class="overflow-x-auto text-xs text-gray-300"><code>import {'{'} createClient {'}'} from '@supabase/supabase-js'

const supabase = createClient(
  'https://{app.slug}.{JIOBASE_DOMAIN}',
  'your-anon-key'
)</code></pre>
	</div>

	<!-- Stats -->
	<div class="mt-6 grid grid-cols-3 gap-4">
		<div class="rounded-lg border border-gray-800 bg-gray-900 p-4">
			<p class="text-xs text-gray-400">Status</p>
			<p class="mt-1 text-lg font-semibold {app.is_active ? 'text-green-400' : 'text-gray-400'}">
				{app.is_active ? 'Active' : 'Inactive'}
			</p>
		</div>
		<div class="rounded-lg border border-gray-800 bg-gray-900 p-4">
			<p class="text-xs text-gray-400">Requests (this month)</p>
			<p class="mt-1 text-lg font-semibold text-white">{app.request_count_month.toLocaleString()}</p>
		</div>
		<div class="rounded-lg border border-gray-800 bg-gray-900 p-4">
			<p class="text-xs text-gray-400">Rate Limit</p>
			<p class="mt-1 text-lg font-semibold text-white">{app.rate_limit_per_minute}/min</p>
		</div>
	</div>

	<!-- Details -->
	<div class="mt-6 rounded-lg border border-gray-800 bg-gray-900 p-4">
		<h2 class="mb-3 text-sm font-medium text-gray-300">Details</h2>
		<dl class="space-y-2 text-sm">
			<div class="flex justify-between">
				<dt class="text-gray-400">Upstream</dt>
				<dd class="text-gray-200">{app.supabase_url}</dd>
			</div>
			<div class="flex justify-between">
				<dt class="text-gray-400">Allowed Origins</dt>
				<dd class="text-gray-200">{app.allowed_origins}</dd>
			</div>
			<div class="flex justify-between">
				<dt class="text-gray-400">Enabled Services</dt>
				<dd class="text-gray-200">{app.enabled_services}</dd>
			</div>
			<div class="flex justify-between">
				<dt class="text-gray-400">Created</dt>
				<dd class="text-gray-200">{formatDate(app.created_at)}</dd>
			</div>
		</dl>
	</div>

	<!-- Danger zone -->
	<div class="mt-8 rounded-lg border border-red-900/50 p-4">
		<h2 class="text-sm font-medium text-red-400">Danger Zone</h2>
		<p class="mt-1 text-xs text-gray-400">Deleting an app removes it permanently and stops all proxied traffic.</p>
		<button
			onclick={handleDelete}
			class="mt-3 rounded-md border border-red-800 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
		>
			Delete App
		</button>
	</div>
{/if}
