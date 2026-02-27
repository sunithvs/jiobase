<script lang="ts">
	import { getAuth } from '$lib/stores/auth.svelte.js';

	const auth = getAuth();

	let mobileMenuOpen = $state(false);
</script>

<svelte:head>
	<title>JioBase - Fix Supabase Blocked in India | Bypass Jio, Airtel DNS Block</title>
	<meta name="description" content="Supabase blocked on Jio, Airtel, ACT Fibernet? JioBase is a managed Cloudflare proxy that routes your Supabase traffic through an unblocked domain. One-line fix, no VPN needed." />
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white">

	<!-- ===== NAVBAR ===== -->
	<nav class="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
					</svg>
				</div>
				<span class="text-lg font-bold">JioBase</span>
			</a>

			<!-- Desktop nav -->
			<div class="hidden items-center gap-8 md:flex">
				<a href="#features" class="text-sm text-gray-400 transition hover:text-white">Features</a>
				<a href="#how-it-works" class="text-sm text-gray-400 transition hover:text-white">How it works</a>
				<a href="#pricing" class="text-sm text-gray-400 transition hover:text-white">Pricing</a>
			</div>

			<div class="hidden items-center gap-3 md:flex">
				{#if auth.user}
					<a href="/dashboard" class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-brand-300">
						Dashboard
					</a>
				{:else}
					<a href="/login" class="text-sm text-gray-400 transition hover:text-white">Sign in</a>
					<a href="/register" class="rounded-lg bg-brand-400 px-4 py-2 text-sm font-medium text-black transition hover:bg-brand-300">
						Start for free
					</a>
				{/if}
			</div>

			<!-- Mobile menu button -->
			<button class="md:hidden" onclick={() => mobileMenuOpen = !mobileMenuOpen} aria-label="Toggle menu">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					{#if mobileMenuOpen}
						<path d="M18 6L6 18M6 6l12 12"/>
					{:else}
						<path d="M4 6h16M4 12h16M4 18h16"/>
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile menu -->
		{#if mobileMenuOpen}
			<div class="border-t border-white/5 bg-[#0a0a0a] px-6 py-4 md:hidden">
				<div class="flex flex-col gap-4">
					<a href="#features" class="text-sm text-gray-400" onclick={() => mobileMenuOpen = false}>Features</a>
					<a href="#how-it-works" class="text-sm text-gray-400" onclick={() => mobileMenuOpen = false}>How it works</a>
					<a href="#pricing" class="text-sm text-gray-400" onclick={() => mobileMenuOpen = false}>Pricing</a>
					<hr class="border-white/5" />
					{#if auth.user}
						<a href="/dashboard" class="rounded-lg bg-brand-400 px-4 py-2 text-center text-sm font-medium text-black">Dashboard</a>
					{:else}
						<a href="/login" class="text-sm text-gray-400">Sign in</a>
						<a href="/register" class="rounded-lg bg-brand-400 px-4 py-2 text-center text-sm font-medium text-black">Start for free</a>
					{/if}
				</div>
			</div>
		{/if}
	</nav>


	<!-- ===== HERO ===== -->
	<section class="glow-brand relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
		<div class="mx-auto max-w-4xl px-6 text-center">

			<!-- Badge -->
			<div class="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-4 py-1.5">
				<span class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
				<span class="text-xs font-medium text-red-400">Supabase blocked on Jio, Airtel & ACT — Fix it now</span>
			</div>

			<h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
				Supabase down on Jio?
				<br />
				<span class="text-gradient">Fix it in 60 seconds.</span>
			</h1>

			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
				Indian ISPs are DNS-blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-base text-gray-300">*.supabase.co</code>. JioBase routes your Supabase API traffic through Cloudflare's edge network &mdash; no VPN required, no DNS changes for your users.
			</p>

			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Get started free
				</a>
				<a
					href="#how-it-works"
					class="group flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					See how it works
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition group-hover:translate-x-0.5">
						<path d="M5 12h14M12 5l7 7-7 7"/>
					</svg>
				</a>
			</div>

			<!-- Code snippet preview -->
			<div class="mx-auto mt-16 max-w-xl">
				<div class="code-block rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">supabaseClient.ts</span>
					</div>
					<div class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7">
						<div class="text-gray-500">// Before (blocked)</div>
						<div>
							<span class="text-red-400 line-through opacity-60">https://xyz.supabase.co</span>
						</div>
						<div class="mt-3 text-gray-500">// After (works everywhere)</div>
						<div>
							<span class="text-brand-400">https://xyz.jiobase.com</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== SOCIAL PROOF BAR ===== -->
	<section class="border-y border-white/5 bg-surface-200/50 py-10">
		<div class="mx-auto max-w-4xl px-6 text-center">
			<p class="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500">Powered by</p>
			<div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
				<!-- Cloudflare -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
						<path d="M16.5 14.5c.2-.7.1-1.3-.2-1.7-.3-.4-.8-.6-1.4-.6l-8.2-.1c-.1 0-.2 0-.2-.1-.1-.1 0-.2 0-.3.1-.2.2-.3.4-.3l8.3-.1c1.3-.1 2.7-1.1 3.2-2.4l.6-1.7c0-.1.1-.2 0-.3-1-4.3-4.9-7.5-9.5-7.5C5.3-.6 1.4 2.5.3 6.7c-.7-.5-1.5-.8-2.5-.7-1.5.2-2.7 1.4-2.8 2.9 0 .4 0 .8.1 1.2-2 .1-3.6 1.8-3.6 3.9 0 .2 0 .4.1.6 0 .1.1.2.2.2h24.5c.2 0 .3-.1.4-.3l.3-1c.1-.6 0-1.2-.5-1.5z" transform="translate(4 4) scale(0.7)" fill="currentColor"/>
					</svg>
					<span class="text-sm font-medium">Cloudflare Workers</span>
				</div>
				<!-- Supabase -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="24" height="24" viewBox="0 0 109 113" fill="none">
						<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#sb1)"/>
						<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#sb2)" fill-opacity="0.2"/>
						<path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
						<defs>
							<linearGradient id="sb1" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
								<stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/>
							</linearGradient>
							<linearGradient id="sb2" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
								<stop/><stop offset="1" stop-opacity="0"/>
							</linearGradient>
						</defs>
					</svg>
					<span class="text-sm font-medium">Supabase Compatible</span>
				</div>
				<!-- Globe / Edge -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
					</svg>
					<span class="text-sm font-medium">300+ Edge Locations</span>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== THE PROBLEM ===== -->
	<section class="py-24 md:py-32">
		<div class="mx-auto max-w-5xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-red-400">The problem</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Your Supabase app is broken for 500M+ Indian users
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-gray-400">
					Major Indian ISPs including Jio, Airtel, and ACT Fibernet are DNS-blocking <code class="text-gray-300">*.supabase.co</code> following a government ministry order. Every API call, auth request, and realtime connection fails with <code class="text-red-400">ERR_CONNECTION_TIMED_OUT</code>.
				</p>
			</div>

			<div class="mt-12 grid gap-6 md:grid-cols-2">
				<!-- What's happening -->
				<div class="glass-card rounded-2xl p-6">
					<div class="mb-4 flex items-center gap-2 text-red-400">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
						</svg>
						<h3 class="font-semibold">What's happening</h3>
					</div>
					<ul class="space-y-3 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
							ISPs resolve <code class="text-gray-300">*.supabase.co</code> to sinkhole IPs via DNS poisoning
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
							All Supabase API calls, Auth, Storage, and Realtime fail silently
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
							Affects Jio (500M+ users), Airtel, ACT Fibernet, and expanding
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
							Changing DNS to 1.1.1.1 or 8.8.8.8 doesn't help if DPI is active
						</li>
					</ul>
				</div>

				<!-- Why VPN isn't the answer -->
				<div class="glass-card rounded-2xl p-6">
					<div class="mb-4 flex items-center gap-2 text-amber-400">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
						</svg>
						<h3 class="font-semibold">Why VPN isn't the answer</h3>
					</div>
					<ul class="space-y-3 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
							You can't ask your end users to install a VPN
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
							VPNs add significant latency and reduce throughput
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
							Mobile users on Jio 4G/5G can't easily configure DNS or VPN
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
							Your production app needs a server-side fix, not a client workaround
						</li>
					</ul>
				</div>
			</div>

			<!-- Solution arrow -->
			<div class="mt-12 text-center">
				<div class="inline-flex items-center gap-3 rounded-full border border-brand-400/20 bg-brand-400/5 px-6 py-3">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
					<span class="text-sm font-medium text-brand-400">
						JioBase fixes this at the infrastructure level &mdash; your users don't need to do anything
					</span>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== FEATURES ===== -->
	<section id="features" class="py-24 md:py-32">
		<div class="mx-auto max-w-6xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Features</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Everything you need to keep shipping
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-gray-400">
					Drop-in Supabase proxy that handles REST, Auth, Storage, Realtime, and Edge Functions. No infrastructure to manage.
				</p>
			</div>

			<div class="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<!-- Feature 1 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">One-line integration</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Replace your Supabase URL with your JioBase proxy URL. That's it. No SDK changes, no config files.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">Global edge network</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Powered by Cloudflare's 300+ PoPs worldwide. Your requests are routed through the nearest edge location.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">Full Supabase API support</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						REST, Auth, Storage, Realtime WebSockets, and Edge Functions. Everything proxied transparently.
					</p>
				</div>

				<!-- Feature 4 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">CORS & security</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Configurable allowed origins, rate limiting, and request filtering. Your proxy, your rules.
					</p>
				</div>

				<!-- Feature 5 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">Real-time analytics</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Monitor request volume, latency, and errors from your dashboard. Know exactly what's happening.
					</p>
				</div>

				<!-- Feature 6 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 20V10M18 20V4M6 20v-4"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold">Custom subdomains</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Every app gets a clean subdomain like <code class="text-brand-400">myapp.jiobase.com</code>. Or bring your own custom domain.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== HOW IT WORKS ===== -->
	<section id="how-it-works" class="border-y border-white/5 bg-surface-200/30 py-24 md:py-32">
		<div class="mx-auto max-w-5xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">How it works</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Three steps. Five minutes.
				</h2>
			</div>

			<div class="mt-16 grid gap-8 md:grid-cols-3">
				<!-- Step 1 -->
				<div class="relative text-center">
					<div class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/20 bg-brand-400/5 text-2xl font-bold text-brand-400">
						1
					</div>
					<h3 class="text-lg font-semibold">Create an app</h3>
					<p class="mt-2 text-sm text-gray-400">
						Sign up, paste your Supabase project URL, and pick a slug. We create your proxy endpoint instantly.
					</p>
				</div>

				<!-- Step 2 -->
				<div class="relative text-center">
					<div class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/20 bg-brand-400/5 text-2xl font-bold text-brand-400">
						2
					</div>
					<h3 class="text-lg font-semibold">Swap the URL</h3>
					<p class="mt-2 text-sm text-gray-400">
						Replace <code class="text-gray-300">xyz.supabase.co</code> with <code class="text-brand-400">xyz.jiobase.com</code> in your client code.
					</p>
				</div>

				<!-- Step 3 -->
				<div class="relative text-center">
					<div class="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-400/20 bg-brand-400/5 text-2xl font-bold text-brand-400">
						3
					</div>
					<h3 class="text-lg font-semibold">Ship it</h3>
					<p class="mt-2 text-sm text-gray-400">
						Deploy your app. JioBase handles DNS routing, caching, CORS, and WebSocket proxying automatically.
					</p>
				</div>
			</div>

			<!-- Code example -->
			<div class="mx-auto mt-16 max-w-2xl">
				<div class="code-block rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
					</div>
					<div class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7">
						<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
						<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
						<div><span class="text-gray-500">  // </span><span class="text-red-400 line-through opacity-50">'https://xyz.supabase.co'</span></div>
						<div>  <span class="text-brand-400">'https://xyz.jiobase.com'</span><span class="text-gray-300">,</span></div>
						<div>  <span class="text-amber-300">'your-anon-key'</span></div>
						<div><span class="text-gray-300">)</span></div>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== PRICING ===== -->
	<section id="pricing" class="py-24 md:py-32">
		<div class="mx-auto max-w-5xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Pricing</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Start free, scale when ready
				</h2>
				<p class="mx-auto mt-4 max-w-xl text-gray-400">
					Generous free tier for side projects. Predictable pricing for production apps.
				</p>
			</div>

			<div class="mt-16 grid gap-6 md:grid-cols-3">
				<!-- Free -->
				<div class="glass-card rounded-2xl p-8">
					<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Free</h3>
					<div class="mt-4 flex items-baseline gap-1">
						<span class="text-4xl font-bold">$0</span>
						<span class="text-sm text-gray-500">/month</span>
					</div>
					<p class="mt-2 text-sm text-gray-400">Perfect for side projects and prototypes.</p>
					<hr class="my-6 border-white/5" />
					<ul class="space-y-3 text-sm text-gray-300">
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							1 proxy app
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							50,000 requests/month
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Community support
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Subdomain routing
						</li>
					</ul>
					<a href="/register" class="mt-8 block rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5">
						Get started
					</a>
				</div>

				<!-- Pro -->
				<div class="border-glow relative rounded-2xl bg-surface-300 p-8">
					<div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-400 px-3 py-0.5 text-xs font-semibold text-black">
						Popular
					</div>
					<h3 class="text-sm font-semibold uppercase tracking-wider text-brand-400">Pro</h3>
					<div class="mt-4 flex items-baseline gap-1">
						<span class="text-4xl font-bold">$12</span>
						<span class="text-sm text-gray-500">/month</span>
					</div>
					<p class="mt-2 text-sm text-gray-400">For production apps and growing teams.</p>
					<hr class="my-6 border-white/5" />
					<ul class="space-y-3 text-sm text-gray-300">
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							10 proxy apps
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							1M requests/month
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Custom domains
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Priority support
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Analytics dashboard
						</li>
					</ul>
					<a href="/register" class="mt-8 block rounded-lg bg-brand-400 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-brand-300">
						Start free trial
					</a>
				</div>

				<!-- Enterprise -->
				<div class="glass-card rounded-2xl p-8">
					<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-400">Enterprise</h3>
					<div class="mt-4 flex items-baseline gap-1">
						<span class="text-4xl font-bold">Custom</span>
					</div>
					<p class="mt-2 text-sm text-gray-400">For organizations with specific needs.</p>
					<hr class="my-6 border-white/5" />
					<ul class="space-y-3 text-sm text-gray-300">
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Unlimited proxy apps
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Unlimited requests
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Dedicated support
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							SLA & uptime guarantees
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Custom integrations
						</li>
					</ul>
					<a href="mailto:hello@jiobase.com" class="mt-8 block rounded-lg border border-white/10 py-2.5 text-center text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5">
						Contact sales
					</a>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="border-t border-white/5 bg-surface-200/30 py-24 md:py-32">
		<div class="mx-auto max-w-3xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">FAQ</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Frequently asked questions
				</h2>
			</div>

			<div class="mt-12 divide-y divide-white/5">
				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						Why is Supabase blocked on Jio, Airtel, and ACT Fibernet in India?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						Indian ISPs including Reliance Jio, Airtel, and ACT Fibernet are DNS-poisoning <code class="text-gray-300">*.supabase.co</code> domains, resolving them to sinkhole IPs instead of Supabase's actual servers. This appears to be due to a government ministry order. The block affects all Supabase API endpoints, Auth, Storage, and Realtime connections &mdash; but not supabase.com (different domain). JioBase routes your traffic through Cloudflare's unblocked infrastructure.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						Can't I just change my DNS to 1.1.1.1 or 8.8.8.8?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						Changing your own DNS might work for local development, but it doesn't help your end users. You can't ask every Jio or Airtel user to change their DNS settings. Some ISPs also use deep packet inspection (DPI) which blocks requests regardless of DNS settings. JioBase solves this at the infrastructure level &mdash; your users connect to <code class="text-brand-400">jiobase.com</code>, which is not blocked.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						Is my data safe going through JioBase?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						JioBase is a transparent reverse proxy. We don't store, read, or modify your request or response data. Traffic flows from Cloudflare's edge directly to Supabase and back. All connections use HTTPS encryption end-to-end. The proxy is open-source &mdash; you can audit the code on GitHub.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						How much latency does the proxy add?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						Minimal &mdash; roughly 1-5ms. Cloudflare Workers execute at the edge closest to your users across 300+ locations globally. Since the alternative is <code class="text-red-400">ERR_CONNECTION_TIMED_OUT</code>, the tradeoff is negligible.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						Do Supabase Realtime and WebSockets work through the proxy?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						Yes. JioBase fully proxies WebSocket connections using Cloudflare's WebSocket support. Supabase Realtime subscriptions, presence channels, and broadcast all work seamlessly. The proxy detects WebSocket upgrade headers and creates a bidirectional relay.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						What happens if the block is lifted?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						You can switch back to direct Supabase URLs anytime &mdash; it's just a URL change. But many developers keep JioBase as an extra layer of resilience. If ISPs block Supabase once, they can do it again. Having a proxy means your app stays online regardless.
					</p>
				</details>

				<details class="group py-5">
					<summary class="flex cursor-pointer items-center justify-between text-left font-medium text-white">
						Can I use my own custom domain instead of jiobase.com?
						<svg class="h-5 w-5 shrink-0 text-gray-500 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-gray-400">
						On the Pro plan and above, you can connect your own custom domain (like <code class="text-brand-400">api.yourapp.com</code>) to your proxy endpoint. Point a CNAME record at your JioBase subdomain and you're set. This also makes your app fully independent of any third-party domain.
					</p>
				</details>
			</div>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="glow-brand py-24 md:py-32">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				Stop fighting DNS blocks.
				<br />
				<span class="text-gradient">Start building.</span>
			</h2>
			<p class="mx-auto mt-6 max-w-xl text-lg text-gray-400">
				Set up your proxy in under 5 minutes. No credit card required.
			</p>
			<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Get started free
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
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
						</svg>
					</div>
					<span class="text-sm font-semibold">JioBase</span>
				</div>

				<div class="flex items-center gap-6">
					<a href="#features" class="text-sm text-gray-500 transition hover:text-gray-300">Features</a>
					<a href="#pricing" class="text-sm text-gray-500 transition hover:text-gray-300">Pricing</a>
					<a href="https://github.com/sunithvs/jiobase" target="_blank" rel="noopener" class="text-sm text-gray-500 transition hover:text-gray-300">GitHub</a>
				</div>

				<p class="text-xs text-gray-600">
					&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.
				</p>
			</div>
		</div>
	</footer>
</div>
