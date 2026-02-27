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
		class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
	>
		New App
	</a>
</div>

{#if loading}
	<div class="mt-8 text-center text-gray-400">Loading apps...</div>
{:else if error}
	<div class="mt-8 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
{:else if apps.length === 0}
	<div class="mt-12 text-center">
		<p class="text-gray-400">No apps yet.</p>
		<a
			href="/dashboard/apps/new"
			class="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
		>
			Create your first app
		</a>
	</div>
{:else}
	<div class="mt-6 grid gap-4 sm:grid-cols-2">
		{#each apps as app (app.id)}
			<a
				href="/dashboard/apps/{app.id}"
				class="rounded-lg border border-gray-800 bg-gray-900 p-5 transition hover:border-gray-700"
			>
				<div class="flex items-start justify-between">
					<div>
						<h3 class="font-semibold text-white">{app.name}</h3>
						<p class="mt-1 text-sm text-gray-400">{app.slug}.{JIOBASE_DOMAIN}</p>
					</div>
					<span
						class="rounded-full px-2 py-0.5 text-xs {app.is_active
							? 'bg-green-500/10 text-green-400'
							: 'bg-gray-700 text-gray-400'}"
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
