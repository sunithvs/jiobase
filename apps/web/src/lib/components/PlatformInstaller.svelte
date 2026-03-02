<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();

	let copied = $state(false);

	const command = 'npx create-jiobase';
	const hint = 'Requires Node.js 18+';

	async function copyCommand() {
		try {
			await navigator.clipboard.writeText(command);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Fallback
		}
	}
</script>

<div class="w-full max-w-2xl mx-auto">
	<div class="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
		<!-- Command -->
		<div class="flex items-center justify-between gap-4 px-5 py-4">
			<div class="overflow-x-auto">
				<code class="whitespace-nowrap font-mono text-sm leading-relaxed">
					<span class="text-gray-600 select-none">$&nbsp;</span><span class="text-brand-400">{command}</span>
				</code>
			</div>
			<button
				onclick={copyCommand}
				class="shrink-0 rounded-lg p-2 text-gray-500 transition hover:bg-white/[0.06] hover:text-white"
				aria-label="Copy command"
			>
				{#if copied}
					<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				{:else}
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
						<path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
					</svg>
				{/if}
			</button>
		</div>

		{#if !compact}
			<!-- Hint -->
			<div class="border-t border-white/[0.06] px-5 py-2.5 flex items-center justify-between">
				<p class="text-xs text-gray-500">{hint}</p>
				<a href="#install-nodejs" class="text-xs text-gray-500 hover:text-brand-400 transition">Install Node.js</a>
			</div>
		{/if}
	</div>
</div>
