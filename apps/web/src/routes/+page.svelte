<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import PlatformInstaller from '$lib/components/PlatformInstaller.svelte';
</script>

<svelte:head>
	<title>JioBase - Service Stopped | Migrate to Supabase URLs</title>
	<meta name="description" content="JioBase managed proxy service has stopped. Supabase blocking has been resolved by ISPs. Migrate back to your original Supabase URLs." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "https://jiobase.com/#organization",
				"name": "JioBase",
				"url": "https://jiobase.com",
				"logo": {
					"@type": "ImageObject",
					"url": "https://jiobase.com/favicon-192.png"
				},
				"sameAs": [
					"https://x.com/sunithvs_",
					"https://www.instagram.com/truevibecoder/",
					"https://www.linkedin.com/in/sunithvs/"
				]
			},
			{
				"@type": "WebSite",
				"@id": "https://jiobase.com/#website",
				"url": "https://jiobase.com",
				"name": "JioBase",
				"publisher": { "@id": "https://jiobase.com/#organization" }
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white">

	<Navbar />

	<!-- ===== SHUTDOWN BANNER (fixed top bar) ===== -->
	<div class="fixed top-0 left-0 right-0 z-[60] bg-red-600 py-2 text-center text-sm font-semibold text-white">
		JioBase managed service has stopped. Migrate now.
	</div>


	<!-- ===== HERO — SHUTDOWN ANNOUNCEMENT ===== -->
	<section class="relative overflow-hidden pt-48 pb-20 md:pt-60 md:pb-32">
		<!-- Subtle red glow -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			<div class="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-red-500/5 blur-3xl"></div>
		</div>

		<div class="relative mx-auto max-w-4xl px-6 text-center">

			<!-- Status badge -->
			<div class="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2">
				<span class="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
				<span class="text-sm font-semibold text-red-400">Service Stopped</span>
			</div>

			<h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
				<span class="text-red-400">JioBase has stopped</span>
				<br />
				its managed service.
			</h1>

			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
				Great news - Supabase blocking has been resolved from the ISP side.
				JioBase's managed proxy is no longer needed and will be shut down.
				<strong class="text-white">Please migrate back to your original Supabase URLs.</strong>
			</p>

			<!-- Social links -->
			<div class="mt-8 flex items-center justify-center gap-4">
				<a
					href="https://www.instagram.com/truevibecoder/"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 transition hover:border-pink-500/30 hover:bg-pink-500/5"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="shrink-0">
						<rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-hero)" stroke-width="1.5"/>
						<circle cx="12" cy="12" r="5" stroke="url(#ig-hero)" stroke-width="1.5"/>
						<circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-hero)"/>
						<defs>
							<linearGradient id="ig-hero" x1="2" y1="22" x2="22" y2="2">
								<stop stop-color="#F58529"/>
								<stop offset="0.5" stop-color="#DD2A7B"/>
								<stop offset="1" stop-color="#8134AF"/>
							</linearGradient>
						</defs>
					</svg>
					<span class="text-sm font-medium text-gray-300 group-hover:text-pink-300 transition">@truevibecoder</span>
				</a>
				<a
					href="https://x.com/sunithvs_"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 transition hover:border-white/20 hover:bg-white/[0.05]"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="shrink-0 text-gray-400 group-hover:text-white transition">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
					<span class="text-sm font-medium text-gray-300 group-hover:text-white transition">@sunithvs_</span>
				</a>
			</div>

		</div>
	</section>


	<!-- ===== SUPPORT THE PROJECT ===== -->
	<section class="border-t border-white/5 py-16 md:py-20">
		<div class="mx-auto max-w-2xl px-6">
			<div class="rounded-2xl border border-amber-400/10 bg-amber-400/[0.03] p-8 sm:p-10 text-center">
				<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
					JioBase kept your app alive.
					<br />
					<span class="text-amber-400">Now it needs one last thing.</span>
				</h2>
				<p class="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-gray-400">
					When Supabase went dark across India, JioBase was built in days and kept running for free — proxying millions of requests, paying for Cloudflare out of pocket. No VC funding. No ads. Just one developer who thought Indian devs deserved a fix, not a paywall.
				</p>
				<a
					href="https://buymeacoffee.com/sunithvs"
					target="_blank"
					rel="noopener"
					class="mt-6 inline-flex items-center gap-3 rounded-xl bg-amber-400 px-8 py-4 text-base font-bold text-black shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 hover:shadow-amber-400/30"
				>
					<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
					</svg>
					Buy me a coffee
				</a>
			</div>
		</div>
	</section>


	<!-- ===== MIGRATE NOW ===== -->
	<section class="border-y border-white/5 py-20 md:py-28">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-400/10">
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
				</svg>
			</div>

			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Migrate to your own server
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-gray-400">
				Deploy your own Supabase reverse proxy on Cloudflare Workers in under 60 seconds. It's free, open-source, and you own it completely.
			</p>

			<!-- CLI command -->
			<div class="mx-auto mt-10 max-w-xl">
				<PlatformInstaller compact={true} />
			</div>

			<div class="mx-auto mt-8 max-w-lg text-left">
				<div class="glass-card rounded-2xl p-6">
					<h3 class="mb-4 text-base font-semibold text-white">Migration steps:</h3>
					<ol class="space-y-3 text-sm text-gray-400">
						<li class="flex items-start gap-3">
							<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">1</span>
							Run <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-brand-400">npx create-jiobase</code> to deploy your own proxy
						</li>
						<li class="flex items-start gap-3">
							<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">2</span>
							Update your Supabase client URL to your new proxy URL
						</li>
						<li class="flex items-start gap-3">
							<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">3</span>
							Deploy your app — you're now fully independent
						</li>
					</ol>
				</div>
			</div>

			<!-- Code example -->
			<div class="mx-auto mt-8 max-w-lg">
				<div class="code-block rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">supabaseClient.ts</span>
					</div>
					<div class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7">
						<div class="text-gray-500">// Before (JioBase managed — stopped)</div>
						<div>
							<span class="text-red-400 line-through opacity-60">https://xyz.jiobase.com</span>
						</div>
						<div class="mt-3 text-gray-500">// After (your own proxy)</div>
						<div>
							<span class="text-brand-400">https://your-proxy.workers.dev</span>
						</div>
					</div>
				</div>
			</div>

			<a
				href="/self-host"
				class="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
			>
				Self-host guide
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
			</a>
		</div>
	</section>


	<!-- ===== FOLLOW FOR UPDATES ===== -->
	<section class="py-20 md:py-28">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Follow for updates & future products
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-gray-400">
				Stay connected for new projects, tools, and developer resources.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<!-- Instagram -->
				<a
					href="https://www.instagram.com/truevibecoder/"
					target="_blank"
					rel="noopener"
					class="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5 px-8 py-4 transition hover:border-pink-500/30 hover:from-purple-500/10 hover:via-pink-500/10 hover:to-orange-500/10 sm:w-auto"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="shrink-0">
						<rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" stroke-width="1.5"/>
						<circle cx="12" cy="12" r="5" stroke="url(#ig-grad)" stroke-width="1.5"/>
						<circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-grad)"/>
						<defs>
							<linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2">
								<stop stop-color="#F58529"/>
								<stop offset="0.5" stop-color="#DD2A7B"/>
								<stop offset="1" stop-color="#8134AF"/>
							</linearGradient>
						</defs>
					</svg>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-pink-300 transition">@truevibecoder</p>
						<p class="text-xs text-gray-500">Instagram</p>
					</div>
				</a>

				<!-- X / Twitter -->
				<a
					href="https://x.com/sunithvs_"
					target="_blank"
					rel="noopener"
					class="group flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-8 py-4 transition hover:border-white/20 hover:bg-white/[0.04] sm:w-auto"
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="shrink-0 text-gray-400 group-hover:text-white transition">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
					</svg>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-gray-100 transition">@sunithvs_</p>
						<p class="text-xs text-gray-500">X (Twitter)</p>
					</div>
				</a>
			</div>

			<!-- Support email -->
			<p class="mt-8 text-sm text-gray-500">
				For assistance and support, email
				<a href="mailto:hi@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">hi@sunithvs.com</a>
			</p>
		</div>
	</section>


	<!-- ===== FOLLOW & STAR ===== -->
	<section class="border-t border-white/5 py-20 md:py-28">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
				Follow for future products
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-gray-400">
				JioBase is winding down, but I'm just getting started. Follow me for new open-source tools, dev resources, and what I'm building next.
			</p>

			<div class="mt-10 grid gap-4 sm:grid-cols-2">
				<!-- GitHub -->
				<a
					href="https://github.com/sunithvs/jiobase"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
				>
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
						<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400 group-hover:text-white transition">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
					</div>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-brand-400 transition">Star on GitHub</p>
						<p class="text-xs text-gray-500">sunithvs/jiobase</p>
					</div>
				</a>

				<!-- X / Twitter -->
				<a
					href="https://x.com/sunithvs_"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/20 hover:bg-white/[0.04]"
				>
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400 group-hover:text-white transition">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</div>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-gray-100 transition">@sunithvs_</p>
						<p class="text-xs text-gray-500">X (Twitter)</p>
					</div>
				</a>

				<!-- Instagram -->
				<a
					href="https://www.instagram.com/truevibecoder/"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-pink-500/20 hover:bg-pink-500/[0.03]"
				>
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="shrink-0">
							<rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-follow)" stroke-width="1.5"/>
							<circle cx="12" cy="12" r="5" stroke="url(#ig-follow)" stroke-width="1.5"/>
							<circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-follow)"/>
							<defs>
								<linearGradient id="ig-follow" x1="2" y1="22" x2="22" y2="2">
									<stop stop-color="#F58529"/>
									<stop offset="0.5" stop-color="#DD2A7B"/>
									<stop offset="1" stop-color="#8134AF"/>
								</linearGradient>
							</defs>
						</svg>
					</div>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-pink-300 transition">@truevibecoder</p>
						<p class="text-xs text-gray-500">Instagram</p>
					</div>
				</a>

				<!-- LinkedIn -->
				<a
					href="https://www.linkedin.com/in/sunithvs/"
					target="_blank"
					rel="noopener"
					class="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
				>
					<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-gray-400 group-hover:text-[#0A66C2] transition">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</div>
					<div class="text-left">
						<p class="text-sm font-semibold text-white group-hover:text-[#0A66C2] transition">Sunith VS</p>
						<p class="text-xs text-gray-500">LinkedIn</p>
					</div>
				</a>
			</div>
		</div>
	</section>


	<!-- ===== FOOTER ===== -->
	<footer class="border-t border-white/5 bg-[#0a0a0a] py-12">
		<div class="mx-auto max-w-6xl px-6">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div class="flex items-center gap-2">
					<div class="flex h-7 w-7 items-center justify-center rounded-md bg-brand-400/10">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
							<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
						</svg>
					</div>
					<span class="text-sm font-semibold">JioBase</span>
				</div>

				<div class="flex items-center gap-6">
					<a href="https://github.com/sunithvs/jiobase" target="_blank" rel="noopener" class="text-sm text-gray-500 transition hover:text-gray-300">GitHub</a>
					<a href="/self-host" class="text-sm text-gray-500 transition hover:text-gray-300">Self-host</a>
					<a href="/blog" class="text-sm text-gray-500 transition hover:text-gray-300">Blog</a>
					<a href="/about" class="text-sm text-gray-500 transition hover:text-gray-300">About</a>
					<a href="/terms" class="text-sm text-gray-500 transition hover:text-gray-300">Terms</a>
					<a href="/privacy" class="text-sm text-gray-500 transition hover:text-gray-300">Privacy</a>
				</div>

				<p class="text-xs text-gray-600">
					&copy; {new Date().getFullYear()} JioBase. Built by <a href="https://sunithvs.com?utm_source=jiobase&utm_medium=footer&utm_campaign=website" target="_blank" rel="noopener" class="text-gray-500 hover:text-gray-300 transition">sunithvs</a>
				</p>
			</div>
		</div>
	</footer>
</div>
