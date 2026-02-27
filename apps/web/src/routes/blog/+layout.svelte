<script lang="ts">
	let { children } = $props();
</script>

<div class="min-h-screen bg-[#0a0a0a] text-white">
	<!-- Blog nav -->
	<nav class="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
						<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
					</svg>
				</div>
				<span class="text-lg font-bold">JioBase</span>
			</a>

			<div class="flex items-center gap-6">
				<a href="/blog" class="text-sm text-gray-400 transition hover:text-white">Blog</a>
				<a href="/#features" class="text-sm text-gray-400 transition hover:text-white">Features</a>
				<a href="/register" class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-brand-300">
					Get started
				</a>
			</div>
		</div>
	</nav>

	{@render children()}

	<!-- Footer -->
	<footer class="border-t border-white/5 py-10">
		<div class="mx-auto max-w-4xl px-6 text-center text-xs text-gray-600">
			&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.
		</div>
	</footer>
</div>
