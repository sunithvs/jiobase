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
	<div class="flex min-h-screen items-center justify-center bg-gray-950">
		<div class="text-gray-400">Loading...</div>
	</div>
{:else if auth.user}
	<div class="min-h-screen bg-gray-950">
		<!-- Top nav -->
		<nav class="border-b border-gray-800 bg-gray-950">
			<div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
				<a href="/dashboard" class="text-lg font-bold text-white">JioBase</a>
				<div class="flex items-center gap-4">
					<span class="text-sm text-gray-400">{auth.user.email}</span>
					<span class="rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-300">{auth.user.plan}</span>
					<button
						onclick={() => { auth.logout(); goto('/'); }}
						class="text-sm text-gray-400 hover:text-white"
					>
						Logout
					</button>
				</div>
			</div>
		</nav>

		<!-- Page content -->
		<main class="mx-auto max-w-5xl px-4 py-8">
			{@render children()}
		</main>
	</div>
{/if}
