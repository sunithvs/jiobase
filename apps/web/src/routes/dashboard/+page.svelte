<script lang="ts">
	import { onMount } from 'svelte';
	import { api, type AppRecord, ApiError } from '$lib/api.js';
	import { JIOBASE_DOMAIN } from '@jiobase/shared';

	let apps = $state<AppRecord[]>([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const res = await api.apps.list();
			apps = res.data;
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to load apps';
		} finally {
			loading = false;
		}
	});

	function formatDate(ts: number): string {
		return new Date(ts * 1000).toLocaleDateString();
	}
</script>

<div class="flex items-center justify-between">
	<h1 class="text-2xl font-bold text-white">Your Apps</h1>
	<a
		href="/dashboard/apps/new"
		class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-300"
	>
		New App
	</a>
</div>

{#if loading}
	<div class="mt-8 text-center text-gray-400">Loading apps...</div>
{:else if error}
	<div class="mt-8 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
{:else if apps.length === 0}
	<div class="mt-12 text-center">
		<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-400/10">
			<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
				<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
			</svg>
		</div>
		<p class="text-gray-400">No apps yet. Create your first proxy in seconds.</p>
		<a
			href="/dashboard/apps/new"
			class="mt-4 inline-block rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300"
		>
			Create your first app
		</a>
	</div>
{:else}
	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		{#each apps as app (app.id)}
			<a
				href="/dashboard/apps/{app.id}"
				class="glass-card rounded-xl p-5 transition hover:border-white/10"
			>
				<div class="flex items-start justify-between">
					<div>
						<h3 class="font-semibold text-white">{app.name}</h3>
						<p class="mt-1 text-sm text-gray-400">{app.slug}.{JIOBASE_DOMAIN}</p>
					</div>
					<span
						class="rounded-full px-2 py-0.5 text-xs {app.is_active
							? 'border border-brand-400/20 bg-brand-400/5 text-brand-400'
							: 'bg-white/5 text-gray-400'}"
					>
						{app.is_active ? 'Active' : 'Inactive'}
					</span>
				</div>
				<div class="mt-3 flex gap-4 text-xs text-gray-500">
					<span>{app.request_count_month.toLocaleString()} requests this month</span>
					<span>Created {formatDate(app.created_at)}</span>
				</div>
			</a>
		{/each}
	</div>
{/if}
