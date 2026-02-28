<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Supabase Blocked in India: What Happened and How to Fix It | JioBase</title>
	<meta name="description" content="Indian ISPs like Jio, Airtel, and ACT Fibernet are DNS-blocking *.supabase.co. Learn why changing DNS or using a VPN won't work and how to fix your app with a Cloudflare reverse proxy." />
	<meta name="keywords" content="supabase blocked india, supabase down jio, supabase not working airtel, supabase DNS block fix, ERR_CONNECTION_TIMED_OUT supabase" />
	<meta property="og:title" content="Supabase Blocked in India: What Happened and How to Fix It" />
	<meta property="og:description" content="Indian ISPs are DNS-blocking *.supabase.co. Here's the full technical breakdown and a step-by-step fix using a Cloudflare reverse proxy." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Supabase Blocked in India: What Happened and How to Fix It" />
	<meta name="twitter:description" content="Indian ISPs are DNS-blocking *.supabase.co. Here's the full breakdown and how to fix it." />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Supabase Blocked in India: What Happened and How to Fix It","description":"Indian ISPs like Jio, Airtel, and ACT Fibernet are DNS-blocking *.supabase.co. Learn why changing DNS or using a VPN won't work and how to fix your app with a Cloudflare reverse proxy.","datePublished":"2026-02-27T00:00:00+05:30","dateModified":"2026-02-27T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/supabase-blocked-india-fix"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Supabase Blocked in India"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is Supabase still blocked in India?","acceptedAnswer":{"@type":"Answer","text":"Yes. The DNS block on *.supabase.co is still active on Jio, Airtel, and ACT Fibernet. There is no confirmed timeline for when it will be lifted. Using a reverse proxy is the most reliable solution."}},{"@type":"Question","name":"Will changing DNS to 1.1.1.1 or 8.8.8.8 fix the issue?","acceptedAnswer":{"@type":"Answer","text":"It may work for local development on some ISPs, but it is not a production solution. Some ISPs use DPI that blocks connections even with correct DNS. Your end users cannot change their DNS settings."}},{"@type":"Question","name":"Does the proxy affect my Supabase project security?","acceptedAnswer":{"@type":"Answer","text":"No. The proxy is a transparent pass-through. It forwards all requests and headers unchanged to Supabase over HTTPS. Your RLS policies, auth rules, and all security features work exactly the same."}},{"@type":"Question","name":"Can I self-host my own proxy instead of using JioBase?","acceptedAnswer":{"@type":"Answer","text":"Yes. JioBase provides a free Worker Generator Tool that creates a ready-to-deploy Cloudflare Worker. The self-hosted version does not include WebSocket/Realtime support, analytics, or rate limiting."}},{"@type":"Question","name":"Which Supabase services work through the proxy?","acceptedAnswer":{"@type":"Answer","text":"JioBase supports the complete Supabase API: REST (PostgREST), Authentication, Storage, Edge Functions, GraphQL, and Realtime WebSockets. Everything works transparently."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Breaking</span>
			<time datetime="2026-02-27">February 27, 2026</time>
			<span>&middot;</span>
			<span>8 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Supabase Blocked in India: What Happened and How to Fix It
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			On February 24, 2026, developers across India woke up to broken apps. Supabase API calls started timing out on Jio, Airtel, and ACT Fibernet networks. Here is what happened, why the usual fixes do not work, and how to get your app running again in under five minutes.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: What happened ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What happened</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Starting around February 24, 2026, Indian Internet Service Providers began DNS-blocking all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. Any app that makes API calls to Supabase - whether REST queries, authentication flows, file uploads, or Realtime WebSocket connections - started failing with the dreaded <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> error.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The block is at the DNS level. When a user on an affected ISP tries to resolve <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>, instead of getting Supabase's real IP address, their ISP returns a sinkhole IP. The request goes nowhere. The connection hangs until it times out.
		</p>

		<p class="leading-relaxed text-gray-300">
			Importantly, <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> (the marketing site and dashboard) was not blocked - only the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.supabase.co</code> API domain. This means you could still log into the Supabase dashboard but your production app could not reach the database.
		</p>
	</section>


	<!-- ===== Section 2: Which ISPs ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Which ISPs are affected</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The block has been confirmed across the largest Indian ISPs by subscriber count:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">J</span>
				</div>
				<div>
					<p class="font-semibold text-white">Reliance Jio</p>
					<p class="text-sm text-gray-400">500M+ subscribers. India's largest ISP. Block confirmed on both 4G/5G mobile and JioFiber broadband.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">Bharti Airtel</p>
					<p class="text-sm text-gray-400">380M+ subscribers. Block confirmed on Airtel broadband and mobile data connections.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">ACT Fibernet</p>
					<p class="text-sm text-gray-400">Regional broadband provider. Block confirmed across multiple cities in southern India.</p>
				</div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			Reports from other ISPs including BSNL and Vi (Vodafone Idea) are still emerging. If you are on a different ISP and experiencing Supabase connectivity issues, the same fix described below applies.
		</p>
	</section>


	<!-- ===== Section 3: Technical explanation ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Technical explanation: DNS poisoning and sinkhole IPs</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The block works through DNS poisoning. When your app (or your user's browser) sends a DNS query to resolve a <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain, the ISP's DNS resolver returns a fake response pointing to a sinkhole IP address instead of Supabase's actual servers.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is what a DNS lookup looks like on an affected network:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500">$ nslookup myproject.supabase.co</div>
				<div class="mt-2 text-gray-400">Server:   198.18.0.1</div>
				<div class="text-gray-400">Address:  198.18.0.1#53</div>
				<div class="mt-2 text-gray-400">Non-authoritative answer:</div>
				<div class="text-gray-400">Name:     myproject.supabase.co</div>
				<div class="text-red-400">Address:  49.44.79.236  <span class="text-gray-500">&larr; sinkhole IP (not Supabase)</span></div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The IP <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.79.236</code> is not a Supabase server. It is a sinkhole - a dead-end IP that either drops the connection or returns nothing. Your app sends the request, gets no response, and eventually times out.
		</p>

		<p class="leading-relaxed text-gray-300">
			This block appears to be the result of a government ministry order issued to ISPs. DNS-level blocking of developer tools is not unprecedented in India - similar blocks have affected GitHub, Medium, and other platforms in the past.
		</p>
	</section>


	<!-- ===== Section 4: What Supabase said ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What Supabase said</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase officially confirmed the block. The team acknowledged that Indian ISPs were blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domains and that they had reached out to India's Minister of IT, Ashwini Vaishnaw, on X (formerly Twitter) to seek resolution.
		</p>

		<div class="glass-card mb-6 rounded-xl p-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-400/10">
					<svg width="16" height="16" viewBox="0 0 109 113" fill="none">
						<path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
					</svg>
				</div>
				<div>
					<p class="text-sm font-semibold text-white">Supabase</p>
					<p class="text-xs text-gray-500">Official response</p>
				</div>
			</div>
			<p class="text-sm italic leading-relaxed text-gray-400">
				"We are aware that several Indian ISPs are blocking access to *.supabase.co. We have reached out to the relevant authorities and are working to resolve this. In the meantime, developers can use a reverse proxy to route traffic through an unblocked domain."
			</p>
		</div>

		<p class="leading-relaxed text-gray-300">
			As of the time of writing, there is no timeline for when (or if) the block will be lifted. History suggests these blocks can persist for weeks or months, which is why a proxy solution is the most reliable path forward.
		</p>
	</section>


	<!-- ===== Section 5: Why DNS change may not work ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why changing DNS to 1.1.1.1 or 8.8.8.8 may not work</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The first thing most developers try is switching to a public DNS resolver like Cloudflare's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or Google's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>. This bypasses the ISP's poisoned DNS and gets the real Supabase IP. It sometimes works for local development, but it has serious limitations.
		</p>

		<div class="glass-card mb-6 rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-amber-400">Problems with the DNS workaround</h3>
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
					<span><strong class="text-gray-200">Deep Packet Inspection (DPI):</strong> Some ISPs inspect the SNI (Server Name Indication) field in the TLS handshake. Even if DNS resolves correctly, the ISP sees you are connecting to <code class="text-gray-300">*.supabase.co</code> and blocks the connection anyway.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
					<span><strong class="text-gray-200">DNS-over-HTTPS interception:</strong> Some ISPs block or intercept DNS requests to known public resolvers at the network level, forcing traffic back through their own poisoned resolver.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
					<span><strong class="text-gray-200">Does not help your users:</strong> Even if you change DNS on your machine, your end users are still on their ISP's default DNS. You cannot ask 500 million Jio users to change their DNS settings.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
					<span><strong class="text-gray-200">Mobile networks:</strong> On Jio 4G/5G, changing DNS is difficult or impossible without root access or a DNS changer app. Most users will not do this.</span>
				</li>
			</ul>
		</div>

		<p class="leading-relaxed text-gray-300">
			The DNS workaround is a temporary band-aid for local development at best. For production applications, you need a solution that works transparently for all users without requiring them to change anything.
		</p>
	</section>


	<!-- ===== Section 6: Why VPN isn't a solution ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why VPN is not a solution for production apps</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			A VPN tunnels all network traffic through a server in a different country, bypassing the ISP's DNS block entirely. It works, but it is not a viable solution for production applications.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">User friction</span>
				</div>
				<p class="text-sm text-gray-400">You cannot ask every user visiting your app to install and enable a VPN. Most will leave instead.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Added latency</span>
				</div>
				<p class="text-sm text-gray-400">VPNs route traffic through distant servers, adding 50-200ms+ of latency to every API call.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Cost and reliability</span>
				</div>
				<p class="text-sm text-gray-400">Free VPNs are unreliable and may log traffic. Paid VPNs add ongoing cost to every user.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Not a server-side fix</span>
				</div>
				<p class="text-sm text-gray-400">A VPN is a client-side workaround. Production apps need infrastructure-level solutions.</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The fix needs to be transparent to your users. They should not need to install anything, configure anything, or even know there is a block. That is where a reverse proxy comes in.
		</p>
	</section>


	<!-- ===== Section 7: The real fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The real fix: Cloudflare reverse proxy</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The solution is to route your Supabase traffic through a domain that is not blocked. A reverse proxy sits between your app and Supabase, forwarding requests through an unblocked domain on Cloudflare's edge network.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is how it works:
		</p>

		<!-- Flow diagram -->
		<div class="glass-card mb-8 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Your App</p>
					<p class="mt-1 text-xs text-gray-500">Browser / Client</p>
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

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Supabase</p>
					<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
				</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Your app sends requests to <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">yourapp.jiobase.com</code> instead of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>. Since <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jiobase.com</code> is not blocked, DNS resolves normally. The Cloudflare Worker receives the request at the edge and forwards it to Supabase on the server side, where there is no ISP block. The response flows back through the same path.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			<strong class="text-white">JioBase</strong> is a managed version of this proxy. Instead of setting up your own Cloudflare Worker, configuring DNS, handling CORS, and managing WebSocket upgrades, JioBase gives you a ready-to-use proxy endpoint with a dashboard, analytics, and support for the full Supabase API including Realtime.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-brand-400">What JioBase handles for you</h3>
			<ul class="space-y-2 text-sm text-gray-400">
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					REST API proxying (PostgREST, Auth, Storage, Edge Functions)
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					WebSocket proxying for Supabase Realtime (subscriptions, presence, broadcast)
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Automatic CORS header management
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Custom subdomains and custom domain support
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Request analytics and monitoring dashboard
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Minimal latency (1-5ms) via Cloudflare's 300+ edge locations
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Section 8: Step-by-step ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step-by-step: How to fix your app with JioBase</h2>

		<p class="mb-8 leading-relaxed text-gray-300">
			The entire process takes less than five minutes. Here is what you need to do:
		</p>

		<!-- Step 1 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<h3 class="text-lg font-semibold">Create a JioBase account</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Go to <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a> and sign up with your email. No credit card required. The free tier includes 50,000 requests per month, which is enough for most development and small production apps.
			</p>
		</div>

		<!-- Step 2 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<h3 class="text-lg font-semibold">Create a new proxy app</h3>
			</div>
			<p class="mb-4 ml-11 leading-relaxed text-gray-400">
				From your dashboard, click "New App" and enter:
			</p>
			<ul class="ml-11 space-y-2 text-sm text-gray-400">
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
					<span><strong class="text-gray-200">App name:</strong> A friendly label for your project (e.g., "My SaaS App")</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
					<span><strong class="text-gray-200">Supabase project URL:</strong> Your existing project URL, like <code class="text-gray-300">https://abcdefgh.supabase.co</code></span>
				</li>
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
					<span><strong class="text-gray-200">Slug:</strong> A short identifier that becomes your proxy subdomain (e.g., <code class="text-brand-400">myapp</code> &rarr; <code class="text-brand-400">myapp.jiobase.com</code>)</span>
				</li>
			</ul>
		</div>

		<!-- Step 3 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<h3 class="text-lg font-semibold">Swap the Supabase URL in your code</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Find where you initialize the Supabase client in your codebase and replace the URL. That is the only change required. Your anon key, service role key, and all other configuration stays exactly the same.
			</p>
		</div>

		<!-- Step 4 -->
		<div>
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
				<h3 class="text-lg font-semibold">Deploy and verify</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Deploy your updated app. All Supabase API calls, authentication, storage uploads, and Realtime subscriptions will now route through JioBase's Cloudflare proxy. Test from a Jio or Airtel connection to confirm everything works.
			</p>
		</div>
	</section>


	<!-- ===== Section 9: Code example ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Code example: the one-line change</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is exactly what the change looks like in your Supabase client initialization. The only thing that changes is the URL - everything else stays the same.
		</p>

		<!-- Before -->
		<p class="mb-2 text-sm font-medium text-red-400">Before (blocked on Indian ISPs):</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
				<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
				<div>  <span class="text-red-400">'https://abcdefgh.supabase.co'</span><span class="text-gray-300">,</span></div>
				<div>  <span class="text-amber-300">'your-anon-key'</span></div>
				<div><span class="text-gray-300">)</span></div>
			</div>
		</div>

		<!-- After -->
		<p class="mb-2 text-sm font-medium text-brand-400">After (works everywhere):</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
				<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
				<div>  <span class="text-brand-400">'https://myapp.jiobase.com'</span><span class="text-gray-300">,  </span><span class="text-gray-500">// &larr; changed</span></div>
				<div>  <span class="text-amber-300">'your-anon-key'</span>            <span class="text-gray-500">// &larr; same key</span></div>
				<div><span class="text-gray-300">)</span></div>
			</div>
		</div>

		<p class="mb-6 leading-relaxed text-gray-300">
			For apps using environment variables (recommended), you only need to update the environment variable:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">.env</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Before</div>
				<div><span class="text-red-400 line-through opacity-60">SUPABASE_URL=https://abcdefgh.supabase.co</span></div>
				<div class="mt-3 text-gray-500"># After</div>
				<div><span class="text-brand-400">SUPABASE_URL=https://myapp.jiobase.com</span></div>
				<div class="mt-3 text-gray-500"># Key stays the same</div>
				<div><span class="text-gray-300">SUPABASE_ANON_KEY=your-anon-key</span></div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">No SDK changes needed.</strong> The Supabase client library does not care what domain the API is hosted on. It sends standard HTTP requests and WebSocket connections to whatever URL you provide. JioBase transparently forwards everything to your actual Supabase project.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Is Supabase still blocked in India?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					As of the last update, yes. The DNS block on <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> is still active on Jio, Airtel, and ACT Fibernet. There is no confirmed timeline for when it will be lifted. Using a reverse proxy is the most reliable solution.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Will changing DNS to 1.1.1.1 or 8.8.8.8 fix the issue?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					It may work for local development on some ISPs, but it is not a production solution. Some ISPs use Deep Packet Inspection (DPI) that blocks connections even with correct DNS. More importantly, your end users are on their ISP's default DNS and cannot change it.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Does the proxy affect my Supabase project security?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					No. The proxy is a transparent pass-through. It forwards all requests and headers (including your API keys) unchanged to Supabase over HTTPS. Your Row Level Security (RLS) policies, auth rules, and all other Supabase security features work exactly the same.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can I self-host my own proxy instead of using JioBase?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes! We provide a free <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> that creates a ready-to-deploy Cloudflare Worker for you. Note that the self-hosted version does not include WebSocket/Realtime support, analytics, or rate limiting.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Which Supabase services work through the proxy?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					JioBase supports the complete Supabase API: REST (PostgREST), Authentication, Storage, Edge Functions, GraphQL, and Realtime WebSockets. Everything works transparently - just change the URL.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== Section 10: CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Get your app working again
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Stop losing users to DNS blocks. Set up JioBase in under five minutes and get your Supabase-powered app working for every user in India - no VPN required.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/"
					class="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Learn more about JioBase
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="supabase-blocked-india-fix" suggestedSlugs={["proxy-supabase-cloudflare-workers", "firebase-supabase-blocked-india", "why-supabase-banned-india-section-69a"]} />
</article>
