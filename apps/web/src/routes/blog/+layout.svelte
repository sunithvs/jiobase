<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white">
	<Navbar active="blog" />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]">
		{@render children()}
	</div>

	<!-- Footer -->
	<footer class="border-t border-white/5 py-10">
		<div class="mx-auto max-w-4xl px-6 flex flex-col items-center gap-3">
			<div class="flex items-center gap-4 text-xs text-gray-600">
				<a href="/terms" class="transition hover:text-gray-400">Terms</a>
				<a href="/privacy" class="transition hover:text-gray-400">Privacy</a>
			</div>
			<p class="text-xs text-gray-600">&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.</p>
		</div>
	</footer>
</div>
