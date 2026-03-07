<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { api, type AnalyticsOverview, ApiError } from '$lib/api.js';

	let loading = $state(true);
	let error = $state('');
	let data = $state<AnalyticsOverview | null>(null);
	let timeWindow = $state('24h');
	const appId = page.params.id!;

	async function load(w: string) {
		loading = true;
		error = '';
		try {
			const res = await api.analytics.overview(appId, w);
			data = res.data;
		} catch (err) {
			error = err instanceof ApiError ? err.message : 'Failed to load analytics';
		} finally {
			loading = false;
		}
	}

	onMount(() => load(timeWindow));

	function setWindow(w: string) {
		timeWindow = w;
		load(w);
	}

	function bar(pct: number) {
		return `width: ${Math.max(pct, 2)}%`;
	}

	const SERVICE_COLORS: Record<string, string> = {
		rest:      'bg-blue-400',
		auth:      'bg-purple-400',
		storage:   'bg-amber-400',
		realtime:  'bg-brand-400',
		functions: 'bg-pink-400',
		graphql:   'bg-cyan-400',
		unknown:   'bg-gray-500',
	};
</script>

<a href="/dashboard/apps/{appId}" class="text-sm text-gray-400 transition hover:text-brand-400">&larr; Back to app</a>
<div class="mt-2 flex items-center justify-between flex-wrap gap-3">
	<h1 class="text-2xl font-bold text-white">Analytics</h1>
	<div class="flex gap-1 rounded-lg border border-white/10 bg-surface-200 p-1">
		{#each ['1h','24h','7d','30d'] as w}
			<button
				onclick={() => setWindow(w)}
				class="rounded-md px-3 py-1 text-xs font-medium transition {timeWindow === w ? 'bg-brand-400 text-black' : 'text-gray-400 hover:text-white'}"
			>{w}</button>
		{/each}
	</div>
</div>

{#if loading}
	<div class="mt-10 text-center text-gray-400">Loading analytics…</div>
{:else if error}
	<div class="mt-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
{:else if data}
	<!-- Spike alert -->
	{#if data.spikeDetected}
		<div class="mt-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
			<span class="text-base">⚠️</span>
			<span>Error spike detected — at least one hour exceeded 10% 5xx rate.</span>
		</div>
	{/if}

	<!-- Latency cards -->
	<div class="mt-6 grid grid-cols-3 gap-4">
		{#each [['p50', data.latency.p50], ['p95', data.latency.p95], ['p99', data.latency.p99]] as [label, val]}
			<div class="glass-card rounded-xl p-4 text-center">
				<p class="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
				<p class="mt-1 text-2xl font-bold text-white">{val}<span class="text-sm text-gray-400 ml-1">ms</span></p>
			</div>
		{/each}
	</div>
	<p class="mt-2 text-center text-xs text-gray-500">{data.latency.totalRequests.toLocaleString()} requests in last {timeWindow}</p>

	<!-- Endpoint breakdown -->
	{#if data.endpoints.length > 0}
		<div class="mt-6 glass-card rounded-xl p-5">
			<h2 class="mb-4 text-sm font-medium text-gray-300">Requests by Service</h2>
			<div class="space-y-3">
				{#each data.endpoints as ep}
					<div>
						<div class="mb-1 flex justify-between text-xs text-gray-400">
							<span class="capitalize">{ep.service}</span>
							<span>{ep.requests.toLocaleString()} ({ep.percentage}%)</span>
						</div>
						<div class="h-2 w-full rounded-full bg-white/5">
							<div class="h-2 rounded-full transition-all {SERVICE_COLORS[ep.service] ?? 'bg-gray-400'}" style={bar(ep.percentage)}></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Error buckets -->
	{#if data.errors.length > 0}
		<div class="mt-6 glass-card rounded-xl p-5">
			<h2 class="mb-4 text-sm font-medium text-gray-300">5xx Errors by Hour</h2>
			<div class="flex items-end gap-1 h-24">
				{#each data.errors as bucket}
					{@const errPct = bucket.total > 0 ? (bucket.errors / bucket.total) * 100 : 0}
					{@const isSpike = bucket.total >= 10 && errPct > 10}
					<div class="flex-1 flex flex-col items-center gap-0.5 group relative" title="{bucket.hour}: {bucket.errors}/{bucket.total} errors">
						<div
							class="w-full rounded-sm transition-all {isSpike ? 'bg-red-500' : 'bg-white/20'}"
							style="height: {Math.max(errPct, 2)}%"
						></div>
					</div>
				{/each}
			</div>
			<div class="mt-1 flex justify-between text-xs text-gray-600">
				<span>{data.errors[0]?.hour?.slice(11,16) ?? ''}</span>
				<span>{data.errors[data.errors.length - 1]?.hour?.slice(11,16) ?? ''}</span>
			</div>
		</div>
	{:else}
		<div class="mt-6 glass-card rounded-xl p-5 text-center text-sm text-gray-500">
			No request data yet for this window.
		</div>
	{/if}
{/if}
