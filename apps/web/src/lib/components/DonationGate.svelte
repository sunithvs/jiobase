<script lang="ts">
	let {
		open = $bindable(false),
		onproceed = () => {},
	}: { open: boolean; onproceed?: () => void } = $props();

	let step = $state<'main' | 'skip-confirm'>('main');

	function handleDonate() {
		window.open('https://buymeacoffee.com/sunithvs', '_blank');
		onproceed();
		open = false;
	}

	function handleAlreadyDonated() {
		onproceed();
		open = false;
	}

	function handleSkip() {
		step = 'skip-confirm';
	}

	function handleSkipConfirm() {
		onproceed();
		open = false;
	}

	function handleBackToMain() {
		step = 'main';
	}

	$effect(() => {
		if (open) step = 'main';
	});
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
	>
		<div class="w-full max-w-md animate-scale-in">
			<div class="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 relative overflow-hidden">
				<!-- Ambient glow -->
				<div class="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl"></div>
				<div class="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-red-400/5 blur-3xl"></div>

				{#if step === 'main'}
					<!-- Main gate -->
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-2xl">
							☕
						</div>
						<div>
							<h3 class="text-lg font-bold text-white">Before you go — one quick ask</h3>
						</div>
					</div>

					<p class="text-sm text-gray-300 leading-relaxed">
						Your app is about to go live — <span class="text-white font-medium">completely free</span>. No limits, no catch. But here's the honest truth:
					</p>

					<div class="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/5 p-4">
						<p class="text-sm text-gray-300 leading-relaxed">
							I'm <span class="text-white font-semibold">Sunith</span> — the only person behind JioBase. No company. No funding. No ads. I pay <span class="text-amber-300 font-semibold">₹4,000+ every month</span> from my own salary so your Supabase app works in India.
						</p>
					</div>

					<div class="mt-4 flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3">
						<span class="text-lg">💡</span>
						<p class="text-sm text-gray-400">
							If every dev who created an app bought <span class="text-amber-300 font-semibold">one ₹250 coffee</span>, JioBase would be fully funded for the year.
						</p>
					</div>

					<!-- Buttons -->
					<div class="mt-6 flex flex-col gap-2.5">
						<button
							onclick={handleDonate}
							class="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-amber-300 shadow-lg shadow-amber-400/20"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
							</svg>
							Keep JioBase alive — Buy me a coffee
						</button>

						<button
							onclick={handleAlreadyDonated}
							class="flex items-center justify-center gap-2 rounded-xl border border-brand-400/30 bg-brand-400/5 px-5 py-3 text-sm font-medium text-brand-400 transition hover:bg-brand-400/10 hover:border-brand-400/50"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<polyline points="20 6 9 17 4 12"/>
							</svg>
							I've already donated
						</button>

						<button
							onclick={handleSkip}
							class="px-5 py-2.5 text-xs text-gray-600 transition hover:text-gray-400"
						>
							I can't right now
						</button>
					</div>

				{:else}
					<!-- Skip confirmation -->
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-2xl">
							🙏
						</div>
						<h3 class="text-lg font-bold text-white">Totally understand.</h3>
					</div>

					<p class="text-sm text-gray-300 leading-relaxed">
						You can still create your app — JioBase won't limit you. But I want to be upfront: if costs keep rising without support, I'll have to <span class="text-red-400 font-medium">shut down or add paid plans</span>.
					</p>

					<div class="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
						<p class="text-sm text-gray-400 leading-relaxed">
							Even <span class="text-amber-300 font-semibold">₹100</span> makes a difference. You can always come back and support from the dashboard whenever you're ready.
						</p>
					</div>

					<div class="mt-6 flex flex-col gap-2.5">
						<button
							onclick={handleDonate}
							class="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-amber-300 shadow-lg shadow-amber-400/20"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
							</svg>
							Actually, let me support — ₹250
						</button>

						<button
							onclick={handleBackToMain}
							class="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
						>
							Go back
						</button>

						<button
							onclick={handleSkipConfirm}
							class="px-5 py-2 text-xs text-gray-600 transition hover:text-gray-400"
						>
							Continue without donating
						</button>
					</div>
				{/if}
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
