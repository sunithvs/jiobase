<svelte:head>
	<title>Registration Paused - JioBase</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<a href="/" class="inline-flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
						<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
					</svg>
				</div>
				<span class="text-xl font-bold text-white">JioBase</span>
			</a>
		</div>

		<div class="glass-card rounded-2xl border border-yellow-500/20 p-6">
			<div class="text-center">
				<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>

				<h1 class="text-xl font-bold text-white">Registration Paused</h1>
				<p class="mt-3 text-sm leading-relaxed text-gray-400">
					Due to security reasons and high traffic, we have temporarily stopped onboarding new users on the managed platform.
				</p>
			</div>

			<div class="mt-5 rounded-xl border border-brand-400/20 bg-brand-400/5 p-4">
				<p class="text-sm font-medium text-brand-400">Self-host your own proxy instead</p>
				<p class="mt-1.5 text-xs text-gray-400">Deploy in under 60 seconds:</p>
				<div class="mt-2 flex items-center justify-center gap-2 rounded-lg bg-black/50 px-4 py-2.5 font-mono text-sm text-brand-400">
					<span class="select-none text-gray-500">$</span>
					<span>npx create-jiobase</span>
				</div>
			</div>

			<p class="mt-5 text-center text-xs text-gray-500">
				For assistance and support, email
				<a href="mailto:hi@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">hi@sunithvs.com</a>
			</p>
		</div>

		<p class="mt-6 text-center text-sm text-gray-400">
			Already have an account?
			<a href="/login" class="text-brand-400 hover:text-brand-300 transition">Sign in</a>
		</p>
	</div>
</div>
