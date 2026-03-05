<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import PlatformInstaller from '$lib/components/PlatformInstaller.svelte';

	// Countdown: 24 hours from deploy time (March 3, 2026 at midnight UTC)
	const SHUTDOWN_TIME = new Date('2026-03-04T23:59:59Z').getTime();

	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let expired = $state(false);

	onMount(() => {
		function tick() {
			const diff = SHUTDOWN_TIME - Date.now();
			if (diff <= 0) {
				expired = true;
				hours = 0;
				minutes = 0;
				seconds = 0;
				return;
			}
			hours = Math.floor(diff / 3_600_000);
			minutes = Math.floor((diff % 3_600_000) / 60_000);
			seconds = Math.floor((diff % 60_000) / 1_000);
		}
		tick();
		const interval = setInterval(tick, 1_000);
		return () => clearInterval(interval);
	});

	function pad(n: number) {
		return String(n).padStart(2, '0');
	}
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
	<section class="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-32">
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

			<!-- ===== COUNTDOWN ===== -->
			<div class="mx-auto mt-12 max-w-lg">
				<p class="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">
					{expired ? 'Service has been shut down' : 'Time remaining'}
				</p>
				<div class="flex items-center justify-center gap-3 sm:gap-5">
					<div class="flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 sm:h-24 sm:w-24">
							<span class="text-3xl font-bold tabular-nums text-red-400 sm:text-4xl">{pad(hours)}</span>
						</div>
						<span class="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500">Hours</span>
					</div>
					<span class="text-2xl font-bold text-red-400/40 sm:text-3xl">:</span>
					<div class="flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 sm:h-24 sm:w-24">
							<span class="text-3xl font-bold tabular-nums text-red-400 sm:text-4xl">{pad(minutes)}</span>
						</div>
						<span class="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500">Minutes</span>
					</div>
					<span class="text-2xl font-bold text-red-400/40 sm:text-3xl">:</span>
					<div class="flex flex-col items-center">
						<div class="flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 sm:h-24 sm:w-24">
							<span class="text-3xl font-bold tabular-nums text-red-400 sm:text-4xl">{pad(seconds)}</span>
						</div>
						<span class="mt-2 text-xs font-medium uppercase tracking-wider text-gray-500">Seconds</span>
					</div>
				</div>
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


	<!-- ===== THANK YOU ===== -->
	<section class="border-t border-white/5 bg-surface-200/30 py-20 md:py-24">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Thank you</p>
			<h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
				Thanks to everyone who used JioBase
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
				JioBase was built as a quick response to the Supabase DNS blocking crisis in India. It helped thousands of developers keep their apps running during the block. Now that the issue has been resolved, the managed service is no longer needed. The open-source CLI tool <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-brand-400">create-jiobase</code> will continue to be maintained for anyone who wants a self-hosted proxy.
			</p>

			<div class="mt-8 flex items-center justify-center gap-6">
				<a href="https://github.com/sunithvs/jiobase" target="_blank" rel="noopener" class="text-sm text-gray-500 transition hover:text-white">
					GitHub
				</a>
				<a href="/self-host" class="text-sm text-gray-500 transition hover:text-white">
					Self-host guide
				</a>
				<a href="/blog" class="text-sm text-gray-500 transition hover:text-white">
					Blog
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
