<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAuth } from '$lib/stores/auth.svelte.js';

	let { children } = $props();
	const auth = getAuth();

	$effect(() => {
		if (auth.checked && !auth.user) {
			goto('/login');
		}
	});
</script>

{#if auth.loading}
	<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
		<div class="flex items-center gap-2 text-gray-400">
			<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
			</svg>
			Loading...
		</div>
	</div>
{:else if auth.user}
	<div class="min-h-screen bg-[#0a0a0a]">
		<!-- Top nav -->
		<nav class="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
				<a href="/dashboard" class="flex items-center gap-2">
					<div class="flex h-7 w-7 items-center justify-center rounded-md bg-brand-400/10">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
						</svg>
					</div>
					<span class="text-lg font-bold text-white">JioBase</span>
				</a>
				<div class="flex items-center gap-4">
					<span class="text-sm text-gray-400">{auth.user.email}</span>
					<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">{auth.user.plan}</span>
					<button
						onclick={() => { auth.logout(); goto('/'); }}
						class="text-sm text-gray-500 hover:text-white transition"
					>
						Logout
					</button>
				</div>
			</div>
		</nav>

		<!-- Page content -->
		<main class="mx-auto max-w-5xl px-6 py-8">
			{@render children()}
		</main>
	</div>
{/if}
