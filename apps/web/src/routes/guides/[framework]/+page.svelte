<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import FixPageCta from '$lib/components/FixPageCta.svelte';
	import RelatedPages from '$lib/components/RelatedPages.svelte';

	let { data } = $props();
	const guide = data.pageData;

	const breadcrumbs = [
		{ label: 'Home', href: '/' },
		{ label: 'Guides', href: '/guides' },
		{ label: guide.name }
	];

	const isFlutter = guide.slug === 'flutter';
</script>

<svelte:head>
	<title>{guide.metaTitle}</title>
	<meta name="description" content={guide.metaDescription} />
	<meta name="keywords" content={guide.metaKeywords} />
	<meta property="og:title" content={guide.metaTitle} />
	<meta property="og:description" content={guide.metaDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://jiobase.com/guides/{guide.slug}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={guide.metaTitle} />
	<meta name="twitter:description" content={guide.metaDescription} />
	<link rel="canonical" href="https://jiobase.com/guides/{guide.slug}" />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Breadcrumbs -->
	<div class="mb-8">
		<Breadcrumbs items={breadcrumbs} />
	</div>

	<!-- Header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm">
			<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Guide</span>
			<span class="rounded-full border border-gray-400/20 bg-gray-400/5 px-2.5 py-0.5 text-xs font-medium text-gray-400">{guide.language}</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Fix Supabase in {guide.name} for Indian Users
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Step-by-step guide to bypass ISP DNS blocks in your {guide.name} app. One environment variable change - no code rewrites.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== The Problem ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The Problem</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Indian ISPs - including Jio, Airtel, ACT Fibernet, and BSNL - are DNS-blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> following a government ministry order under Section 69A of the IT Act. When a user on one of these networks tries to reach your Supabase backend, the ISP's DNS resolver returns a sinkhole IP instead of the real Supabase server address. The connection hangs and eventually times out with <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> or <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">DNS_PROBE_FINISHED_NXDOMAIN</code>.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Client-side apps like {guide.name} apps are directly affected because API calls happen from the user's browser or device, which uses the ISP's DNS. Your app cannot reach <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, so every Supabase operation fails - database queries, authentication, file storage, and real-time subscriptions.
		</p>

		{#if isFlutter}
			<div class="glass-card mt-4 rounded-xl p-5">
				<div class="flex items-start gap-3">
					<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-amber-300">Flutter note:</strong> This block also affects mobile devices. When your Flutter app runs on an Android or iOS device connected to Jio 4G/5G or Airtel mobile data, it uses the carrier's DNS resolver. Most Indian Android users are on Jio or Airtel, so a significant portion of your mobile user base is affected.
					</p>
				</div>
			</div>
		{/if}

		<p class="mt-4 leading-relaxed text-gray-300">
			Changing DNS on your own machine (to 1.1.1.1 or 8.8.8.8) can help during development, but it does not fix the problem for your end users. They are stuck on their ISP's default DNS and cannot change it. The fix needs to be transparent - your users should not need to install a VPN or configure anything.
		</p>
	</section>


	<!-- ===== Your Current Setup ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Your Current Setup</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			This is the standard Supabase setup for {guide.name}. The URL points to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, which is blocked on Jio, Airtel, ACT, and BSNL networks across India.
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">{guide.initFile}</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{guide.codeBefore}</code></pre>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			When an Indian user on a blocked ISP opens your {guide.name} app, the Supabase client tries to connect to the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.supabase.co</code> domain. The ISP intercepts the DNS query and returns a dead-end IP. The request never reaches Supabase, and your app fails silently or shows a network error.
		</p>
	</section>


	<!-- ===== Step 1: Set Up JioBase ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 1: Set Up JioBase</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			JioBase is a managed reverse proxy that routes your Supabase traffic through Cloudflare's edge network. Since the proxy domain is not blocked, DNS resolves normally for all ISPs. Your Supabase requests go through the proxy instead of directly to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>.
		</p>

		<div class="space-y-4">
			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<div>
					<h3 class="font-semibold text-white">Create a free account</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Go to <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a> and sign up with your email. No credit card required. The free tier includes 50,000 requests per month.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<div>
					<h3 class="font-semibold text-white">Create a new proxy app</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						In the dashboard, click "New App" and fill in the details. Give your app a name, and enter your Supabase project URL (e.g., <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">https://xyz.supabase.co</code>).
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<div>
					<h3 class="font-semibold text-white">Enter your Supabase project URL</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Paste your full Supabase project URL. This is the URL you currently use in your {guide.name} app, like <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">https://abcdefgh.supabase.co</code>. JioBase will proxy all traffic to this endpoint.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
				<div>
					<h3 class="font-semibold text-white">Choose a slug</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Pick a slug for your proxy URL. For example, choosing <code class="rounded bg-brand-400/10 px-1 py-0.5 text-xs text-brand-400">myapp</code> gives you <code class="rounded bg-brand-400/10 px-1 py-0.5 text-xs text-brand-400">myapp.jiobase.com</code>. This is the URL your {guide.name} app will connect to instead of <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">supabase.co</code>.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Step 2: Update Your Code ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 2: Update Your {guide.name} Code</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Replace your Supabase URL with the JioBase proxy URL. Your anon key stays the same. All Supabase features - REST API, Auth, Storage, Realtime - work through the proxy without any code changes beyond the URL swap.
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">{guide.envFile}</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{guide.codeAfter}</code></pre>
		</div>

		{#if guide.envPrefix}
			<div class="glass-card mt-4 rounded-xl p-5">
				<div class="flex items-start gap-3">
					<svg class="mt-0.5 h-5 w-5 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-blue-300">{guide.name} env prefix:</strong> {guide.name} uses the <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">{guide.envPrefix}</code> prefix for client-exposed environment variables. Make sure your Supabase URL variable uses this prefix so it is available in the browser/client runtime.
					</p>
				</div>
			</div>
		{/if}

		<p class="mt-4 leading-relaxed text-gray-300">
			That is the entire code change. The Supabase client library does not validate or restrict the URL format. It sends standard HTTP requests and WebSocket connections to whatever URL you provide. JioBase transparently forwards every request to your actual Supabase project over HTTPS. Your Row Level Security policies, auth configuration, and database schema are completely unaffected.
		</p>
	</section>


	<!-- ===== Step 3: Rebuild and Deploy ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 3: Rebuild and Deploy</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			After updating the environment variable (or the URL in your code), you need to rebuild your {guide.name} app and redeploy it. Most frameworks read environment variables at build time, so a restart or rebuild is required for the change to take effect.
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">terminal</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{guide.packageManager} run build</code></pre>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			Once the build completes, deploy to your hosting provider as you normally would. The updated app will route all Supabase traffic through JioBase's Cloudflare proxy. Users on Jio, Airtel, ACT, BSNL, and any other affected ISP will be able to access your app immediately.
		</p>

		{#if isFlutter}
			<p class="mt-4 leading-relaxed text-gray-300">
				For Flutter, run <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">flutter build apk</code> for Android or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">flutter build ios</code> for iOS, then publish the update to the Play Store or App Store. Existing app installations will continue to fail until users update to the new version with the proxy URL.
			</p>
		{/if}
	</section>


	<!-- ===== Additional Notes ===== -->
	{#if guide.additionalSteps.length > 0}
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Additional Notes for {guide.name}</h2>

			<p class="mb-6 leading-relaxed text-gray-300">
				Here are some {guide.name}-specific tips to keep in mind when setting up the proxy:
			</p>

			<div class="space-y-3">
				{#each guide.additionalSteps as step}
					<div class="glass-card rounded-xl px-5 py-4">
						<p class="text-sm leading-relaxed text-gray-400">{step}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}


	<!-- ===== Verify It Works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Verify It Works</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			After deploying your updated {guide.name} app, verify the proxy is working correctly with these steps:
		</p>

		<div class="space-y-4">
			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<div>
					<h3 class="font-semibold text-white">Deploy your updated app</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Push your changes and let your hosting provider build and deploy the new version. Make sure the environment variable with the JioBase proxy URL is set in your hosting provider's settings as well.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<div>
					<h3 class="font-semibold text-white">Test on a Jio or Airtel network</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Open your app on a device connected to Jio 4G/5G, JioFiber, or Airtel. If you do not have access to these networks, ask a friend or team member in India to test. You can also use tools like BrowserStack for remote device testing on Indian networks.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<div>
					<h3 class="font-semibold text-white">Check the Network tab in DevTools</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Open your browser's Developer Tools and go to the Network tab. All Supabase-related requests should now go to your JioBase domain (e.g., <code class="rounded bg-brand-400/10 px-1 py-0.5 text-xs text-brand-400">myapp.jiobase.com</code>) instead of <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">*.supabase.co</code>. Verify that requests return 200 status codes.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
				<div>
					<h3 class="font-semibold text-white">Confirm all Supabase features work</h3>
					<p class="mt-1 text-sm leading-relaxed text-gray-400">
						Test database queries, authentication (sign up, sign in, OAuth), file uploads/downloads, and real-time subscriptions if your app uses them. The proxy handles all Supabase features transparently. Everything should work exactly as before - the only difference is the domain in the URL.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== How The Proxy Works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How The Proxy Works</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Understanding the proxy architecture helps explain why this fix is reliable and why it adds negligible latency.
		</p>

		<div class="glass-card mb-6 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center">
					<p class="font-semibold text-white">{guide.name} App</p>
					<p class="mt-1 text-xs text-gray-500">{isFlutter ? 'Device' : 'Browser'}</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
				</div>

				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
					<p class="font-semibold text-brand-400">JioBase Proxy</p>
					<p class="mt-1 text-xs text-gray-500">Cloudflare Edge</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center">
					<p class="font-semibold text-white">Supabase</p>
					<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
				</div>
			</div>
		</div>

		<div class="space-y-3 text-sm leading-relaxed text-gray-400">
			<p>
				<strong class="text-gray-200">1. DNS resolves normally.</strong> Your {guide.name} app connects to <code class="rounded bg-brand-400/10 px-1 py-0.5 text-xs text-brand-400">myapp.jiobase.com</code>. Since this domain is not on the ISP's block list, DNS returns the correct Cloudflare edge IP.
			</p>
			<p>
				<strong class="text-gray-200">2. Request hits Cloudflare's edge.</strong> The request arrives at the nearest Cloudflare data center (there are 300+ worldwide, including multiple in India). The JioBase Cloudflare Worker receives the request.
			</p>
			<p>
				<strong class="text-gray-200">3. Proxy forwards to Supabase.</strong> The Worker forwards the request - including all headers, body, and query parameters - to your actual Supabase project at <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">*.supabase.co</code>. Server-to-server traffic is not affected by ISP blocks.
			</p>
			<p>
				<strong class="text-gray-200">4. Response flows back.</strong> Supabase responds to the Worker, which relays the response back to your {guide.name} app. The entire round-trip adds only 1-5ms of latency compared to a direct connection.
			</p>
		</div>

		<div class="glass-card mt-6 rounded-xl p-5">
			<h3 class="mb-3 text-sm font-semibold text-brand-400">What JioBase proxies</h3>
			<ul class="space-y-2 text-sm text-gray-400">
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					REST API (PostgREST) - database queries, inserts, updates, deletes
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Auth - sign up, sign in, OAuth, password reset, session refresh
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Storage - file uploads, downloads, signed URLs, image transformations
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Realtime - WebSocket subscriptions, presence, broadcast channels
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Edge Functions - custom serverless functions on Supabase
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Why Not Just Change DNS ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why Changing DNS Is Not Enough</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The first instinct when encountering a DNS block is to switch to a public DNS resolver like Cloudflare's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or Google's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>. While this can work for your own development machine, it does not solve the problem for your users.
		</p>

		<div class="glass-card rounded-xl p-6">
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Your users cannot change their DNS.</strong> You cannot ask 500 million Jio users to reconfigure their DNS settings. Most do not know how, and on mobile data it often requires root access.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Some ISPs use Deep Packet Inspection (DPI).</strong> Even with correct DNS, the ISP can inspect the TLS handshake's SNI field, see you are connecting to <code class="text-gray-300">*.supabase.co</code>, and block the connection.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">ISPs may intercept public DNS.</strong> Some ISPs block or redirect DNS requests to 1.1.1.1 and 8.8.8.8, forcing traffic back through their own poisoned resolvers.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">VPNs add friction and latency.</strong> Requiring a VPN means extra cost, 50-200ms added latency, and user friction. Most users will leave your app rather than install a VPN.</span>
				</li>
			</ul>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			A reverse proxy is the only production-grade solution. It is transparent to your users, adds minimal latency (1-5ms via Cloudflare's edge), and works on every ISP without any client-side configuration.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	{#if guide.faqs.length > 0}
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

			<div class="space-y-4">
				{#each guide.faqs as faq}
					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
							{faq.question}
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path d="M6 9l6 6 6-6" />
							</svg>
						</summary>
						<div class="border-t border-white/5 px-5 py-4">
							<p class="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
						</div>
					</details>
				{/each}

				<!-- Extra universal FAQs -->
				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
						Does JioBase store or log my data?
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<div class="border-t border-white/5 px-5 py-4">
						<p class="text-sm leading-relaxed text-gray-400">No. JioBase is a pass-through proxy. It forwards your requests to Supabase and relays the responses back without storing, logging, or inspecting the request or response bodies. Only basic request metadata (timestamp, path, status code) is logged for analytics.</p>
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
						What happens if the ISP block is lifted?
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<div class="border-t border-white/5 px-5 py-4">
						<p class="text-sm leading-relaxed text-gray-400">You can switch back to the direct Supabase URL at any time. Just update your environment variable back to the original <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">*.supabase.co</code> URL and redeploy. However, keeping the proxy provides insurance against future blocks - ISP blocking orders in India have historically been unpredictable.</p>
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
						Can I use my own custom domain instead of *.jiobase.com?
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<div class="border-t border-white/5 px-5 py-4">
						<p class="text-sm leading-relaxed text-gray-400">Yes. JioBase supports custom domains. You can point a subdomain like <code class="rounded bg-white/5 px-1 py-0.5 text-xs text-gray-300">api.yourdomain.com</code> to the proxy, giving your users a branded experience. Custom domains are available on paid plans.</p>
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
						Is there a self-hosted alternative?
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M6 9l6 6 6-6" />
						</svg>
					</summary>
					<div class="border-t border-white/5 px-5 py-4">
						<p class="text-sm leading-relaxed text-gray-400">Yes. JioBase provides a free <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> that creates a Cloudflare Worker you can deploy yourself. The self-hosted version handles HTTP proxying but does not include WebSocket/Realtime support, analytics, rate limiting, or the management dashboard.</p>
					</div>
				</details>
			</div>
		</section>
	{/if}


	<!-- ===== CTA ===== -->
	<section class="mb-14">
		<FixPageCta />
	</section>


	<!-- ===== Related Guides ===== -->
	{#if guide.relatedGuides.length > 0}
		<section class="mb-8">
			<RelatedPages title="Related guides" pages={guide.relatedGuides} />
		</section>
	{/if}


	<!-- Back to guides -->
	<div class="mt-12 border-t border-white/5 pt-8">
		<a href="/guides" class="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-400">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition group-hover:-translate-x-0.5">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to all guides
		</a>
	</div>

</article>
