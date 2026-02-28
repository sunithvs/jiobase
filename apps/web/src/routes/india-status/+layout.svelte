<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white">
	<Navbar />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]">
		{@render children()}
	</div>

	<!-- Footer -->
	<footer class="border-t border-white/5 py-10">
		<div class="mx-auto max-w-4xl px-6 text-center text-xs text-gray-600">
			&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.
		</div>
	</footer>
</div>
