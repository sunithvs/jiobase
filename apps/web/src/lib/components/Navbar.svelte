<script lang="ts">
	import { getAuth } from '$lib/stores/auth.svelte.js';
	import { page } from '$app/state';

	let { active = '' }: { active?: string } = $props();
	const auth = getAuth();

	let mobileMenuOpen = $state(false);

	// Close mobile menu on navigation
	$effect(() => {
		page.url;
		mobileMenuOpen = false;
	});
</script>

<nav class="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<a href="/" class="flex items-center gap-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
					<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
				</svg>
			</div>
			<span class="text-lg font-bold">JioBase</span>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-8 md:flex">
			<a href="/#features" class="text-sm transition {active === 'features' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Features</a>
			<a href="/fix/jio" class="text-sm transition {active === 'fix' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Fix</a>
			<a href="/guides/nextjs" class="text-sm transition {active === 'guides' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Guides</a>
			<a href="/docs" class="text-sm transition {active === 'docs' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Docs</a>
			<a href="/blog" class="text-sm transition {active === 'blog' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Blog</a>
			<a href="/tools/worker-generator" class="text-sm transition {active === 'tools' ? 'font-medium text-brand-400' : 'text-gray-400 hover:text-white'}">Tools</a>
		</div>

		<div class="hidden items-center gap-3 md:flex">
			{#if auth.user}
				<a href="/dashboard" class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-brand-300">
					Dashboard
				</a>
			{:else}
				<a href="/login" class="text-sm text-gray-400 transition hover:text-white">Sign in</a>
				<a href="/register" class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-brand-300">
					Start for free
				</a>
			{/if}
		</div>

		<!-- Mobile menu button -->
		<button class="md:hidden" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				{#if mobileMenuOpen}
					<path d="M18 6L6 18M6 6l12 12"/>
				{:else}
					<path d="M4 6h16M4 12h16M4 18h16"/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="border-t border-white/5 bg-[#0a0a0a] px-6 py-4 md:hidden">
			<div class="flex flex-col gap-4">
				<a href="/#features" class="text-sm text-gray-400">Features</a>
				<a href="/fix/jio" class="text-sm text-gray-400">Fix</a>
				<a href="/guides/nextjs" class="text-sm text-gray-400">Guides</a>
				<a href="/docs" class="text-sm text-gray-400">Docs</a>
				<a href="/blog" class="text-sm text-gray-400">Blog</a>
				<a href="/tools/worker-generator" class="text-sm text-gray-400">Tools</a>
				<hr class="border-white/5" />
				{#if auth.user}
					<a href="/dashboard" class="rounded-lg bg-brand-400 px-4 py-2 text-center text-sm font-medium text-black">Dashboard</a>
				{:else}
					<a href="/login" class="text-sm text-gray-400">Sign in</a>
					<a href="/register" class="rounded-lg bg-brand-400 px-4 py-2 text-center text-sm font-medium text-black">Start for free</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
