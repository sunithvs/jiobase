<script lang="ts">
	type Variant = 'celebration' | 'periodic';

	let {
		open = $bindable(false),
		variant = 'periodic' as Variant,
		onclose = () => {},
	}: { open: boolean; variant?: Variant; onclose?: () => void } = $props();

	function dismiss() {
		open = false;
		onclose();
	}

	function handleBackdrop(e: MouseEvent) {
		if (e.target === e.currentTarget) dismiss();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') dismiss();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
		onclick={handleBackdrop}
	>
		<!-- Modal -->
		<div class="w-full max-w-md animate-scale-in">
			<div class="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
				<!-- Ambient glow -->
				<div class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl"></div>

				<!-- Close button -->
				<button
					onclick={dismiss}
					class="absolute top-4 right-4 text-gray-500 hover:text-white transition"
					aria-label="Close"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				</button>

				{#if variant === 'celebration'}
					<!-- Celebration variant -->
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-400/10">
							<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
						</div>
						<h3 class="text-lg font-bold text-white">Your app is live!</h3>
					</div>

					<p class="text-sm text-gray-400 leading-relaxed">
						Traffic is now routing through Cloudflare's edge network. Your users won't even notice a difference — except that everything works now.
					</p>

					<div class="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
						<p class="text-sm text-gray-300 leading-relaxed">
							Hey, I'm <span class="font-semibold text-white">Sunith</span> — I built JioBase because the Supabase block broke my own app and I knew other devs were stuck too. It's free because no one should pay to fix someone else's problem.
						</p>
						<p class="mt-3 text-sm text-gray-400 leading-relaxed">
							But Cloudflare bills are real. If JioBase just saved your production app, <span class="text-amber-300 font-medium">a $3 coffee helps me keep the lights on</span> for everyone.
						</p>
					</div>
				{:else}
					<!-- Periodic variant -->
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10 text-2xl">
							☕
						</div>
						<h3 class="text-lg font-bold text-white">Quick reality check</h3>
					</div>

					<p class="text-sm text-gray-300 leading-relaxed">
						JioBase proxies millions of requests for free. Every single request costs me money.
					</p>

					<p class="mt-3 text-sm text-gray-400 leading-relaxed">
						I'm not a company. I'm <span class="font-semibold text-white">one developer</span> paying Cloudflare bills out of pocket so your Supabase app works in India.
					</p>

					<div class="mt-4 flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3">
						<span class="text-2xl">☕</span>
						<p class="text-sm text-gray-300">
							<span class="text-amber-300 font-semibold">$3</span> = one coffee = JioBase stays free for hundreds of devs
						</p>
					</div>

					<p class="mt-4 text-xs text-gray-500 leading-relaxed">
						No pressure — but it genuinely helps keep this project alive.
					</p>
				{/if}

				<!-- Buttons -->
				<div class="mt-6 flex flex-col gap-3 sm:flex-row">
					<a
						href="https://buymeacoffee.com/sunithvs"
						target="_blank"
						rel="noopener"
						class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 shadow-lg shadow-amber-400/20"
					>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
						</svg>
						{variant === 'celebration' ? 'Buy me a coffee' : 'Support JioBase'}
					</a>
					<button
						onclick={dismiss}
						class="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
					>
						{variant === 'celebration' ? 'Maybe later' : 'Not now'}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.animate-fade-in {
		animation: fadeIn 0.2s ease-out;
	}
	.animate-scale-in {
		animation: scaleIn 0.25s ease-out;
	}
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes scaleIn {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
