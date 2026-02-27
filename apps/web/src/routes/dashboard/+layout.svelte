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
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
							<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
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

		<!-- Donation banner -->
		<div class="border-b border-white/5 bg-brand-400/5">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-2.5">
				<p class="text-sm text-gray-400">
					JioBase is free & open source. If it helps you, consider supporting the project.
				</p>
				<a
					href="https://buymeacoffee.com/sunithvs"
					target="_blank"
					rel="noopener"
					class="flex items-center gap-1.5 rounded-lg border border-brand-400/20 bg-brand-400/10 px-3 py-1.5 text-xs font-medium text-brand-400 transition hover:bg-brand-400/20"
				>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
					Buy me a coffee
				</a>
			</div>
		</div>

		<!-- Page content -->
		<main class="mx-auto max-w-5xl px-6 py-8">
			{@render children()}
		</main>
	</div>
{/if}
