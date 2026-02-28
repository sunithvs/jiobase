<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>DNS Poisoning Explained: How Indian ISPs Block Supabase (Technical Deep Dive) | JioBase</title>
	<meta name="description" content="A technical deep dive into how Indian ISPs use DNS poisoning to block Supabase, including sinkhole IPs, DPI inspection, and why a reverse proxy is the only reliable fix." />
	<meta name="keywords" content="dns poisoning supabase india, how ISP blocks supabase, supabase dns sinkhole jio, dns poisoning explained" />
	<meta property="og:title" content="DNS Poisoning Explained: How Indian ISPs Block Supabase" />
	<meta property="og:description" content="A technical deep dive into DNS poisoning, sinkhole IPs, SNI inspection, and why a reverse proxy is the only reliable fix for the Supabase block in India." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="DNS Poisoning Explained: How Indian ISPs Block Supabase" />
	<meta name="twitter:description" content="Technical deep dive into how Indian ISPs use DNS poisoning to block Supabase and why a reverse proxy is the only reliable fix." />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"DNS Poisoning Explained: How Indian ISPs Block Supabase (Technical Deep Dive)","description":"A technical deep dive into how Indian ISPs use DNS poisoning to block Supabase, including sinkhole IPs, DPI inspection, and why a reverse proxy is the only reliable fix.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/dns-poisoning-supabase-india-explained"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"DNS Poisoning Explained: How ISPs Block Supabase"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can DNS poisoning be detected programmatically from my app?","acceptedAnswer":{"@type":"Answer","text":"Not reliably from client-side JavaScript. Browsers do not expose DNS resolution details. From a server or terminal, you can compare DNS results from different resolvers using nslookup or dig."}},{"@type":"Question","name":"Does Encrypted Client Hello (ECH) protect against SNI-based blocking?","acceptedAnswer":{"@type":"Answer","text":"ECH encrypts the SNI field during TLS handshake, but it is not widely deployed yet. ISPs can block ECH-enabled connections entirely. A reverse proxy remains the more practical solution."}},{"@type":"Question","name":"Does a reverse proxy add latency to API requests?","acceptedAnswer":{"@type":"Answer","text":"A small amount, typically 1-5ms. JioBase runs on Cloudflare's edge network with 300+ data centers worldwide, including multiple locations in India."}},{"@type":"Question","name":"Can the ISP block the proxy domain too?","acceptedAnswer":{"@type":"Answer","text":"In theory, any domain can be blocked. However, blocking a custom proxy domain is far less likely because it is not on any existing blocklist. If ever blocked, you could switch to a new domain in minutes."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Technical</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>10 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			DNS Poisoning Explained: How Indian ISPs Block Supabase
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			A technical deep dive into how Indian ISPs use DNS poisoning to block Supabase, what happens at each layer of the network stack, and why a reverse proxy is the only reliable fix that works for all your users.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: How DNS resolution normally works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How DNS resolution normally works</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Before understanding DNS poisoning, you need to understand how DNS resolution works under normal conditions. DNS (Domain Name System) translates human-readable domain names like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> into IP addresses that computers use to route traffic.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is what happens step by step when your app makes a request to Supabase on an unblocked network:
		</p>

		<!-- DNS flow diagram -->
		<div class="glass-card mb-8 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[600px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Browser</p>
					<p class="mt-1 text-xs text-gray-500">Your app</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#60a5fa" stroke-width="1.5"/></svg>
					<span class="text-xs text-blue-400">1. Query</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">OS Resolver</p>
					<p class="mt-1 text-xs text-gray-500">Local cache</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#60a5fa" stroke-width="1.5"/></svg>
					<span class="text-xs text-blue-400">2. Forward</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">ISP Resolver</p>
					<p class="mt-1 text-xs text-gray-500">Recursive</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#60a5fa" stroke-width="1.5"/></svg>
					<span class="text-xs text-blue-400">3. Lookup</span>
				</div>

				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
					<p class="font-semibold text-brand-400">Auth NS</p>
					<p class="mt-1 text-xs text-gray-500">supabase.co</p>
				</div>
			</div>

			<div class="mt-4 flex min-w-[600px] items-center justify-center">
				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-6 py-2">
					<p class="text-xs text-gray-400">4. Returns real IP: <span class="font-mono text-brand-400">104.18.x.x</span> (Supabase server)</p>
				</div>
			</div>
		</div>

		<div class="mb-6 space-y-3">
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 1:</strong> Your browser (or the Supabase client library) needs to connect to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>. It asks the operating system's DNS resolver for the IP address.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 2:</strong> The OS resolver checks its local cache. If the domain has not been looked up recently, it forwards the query to the configured DNS resolver, which is typically your ISP's recursive resolver.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 3:</strong> The ISP's recursive resolver queries the authoritative nameserver for <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> (managed by Supabase's DNS provider).
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 4:</strong> The authoritative nameserver returns the real IP address of the Supabase server. Your browser connects to that IP, the TLS handshake completes, and the API request goes through.
				</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			This entire process takes milliseconds and is completely transparent to the user. Under normal conditions, it works flawlessly. But when an ISP is ordered to block a domain, this process is corrupted at Step 3.
		</p>
	</section>


	<!-- ===== Section 2: How DNS poisoning works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How DNS poisoning works</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			DNS poisoning (also called DNS spoofing or DNS hijacking) is when a DNS resolver returns a fake IP address instead of the real one. In the case of Indian ISPs blocking Supabase, the ISP's recursive resolver is configured to intercept queries for <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> and return a sinkhole IP address.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is what the poisoned DNS resolution looks like:
		</p>

		<!-- Poisoned DNS flow diagram -->
		<div class="glass-card mb-8 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[600px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Browser</p>
					<p class="mt-1 text-xs text-gray-500">Your app</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#60a5fa" stroke-width="1.5"/></svg>
					<span class="text-xs text-blue-400">Query</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">OS Resolver</p>
					<p class="mt-1 text-xs text-gray-500">Local cache</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#60a5fa" stroke-width="1.5"/></svg>
					<span class="text-xs text-blue-400">Forward</span>
				</div>

				<div class="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-center">
					<p class="font-semibold text-red-400">ISP Resolver</p>
					<p class="mt-1 text-xs text-red-400/70">POISONED</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3"/></svg>
					<span class="text-xs text-red-400">BLOCKED</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center opacity-40">
					<p class="font-semibold text-white">Auth NS</p>
					<p class="mt-1 text-xs text-gray-500">Never reached</p>
				</div>
			</div>

			<div class="mt-4 flex min-w-[600px] items-center justify-center">
				<div class="rounded-lg border border-red-500/20 bg-red-500/5 px-6 py-2">
					<p class="text-xs text-gray-400">Returns sinkhole IP: <span class="font-mono text-red-400">49.44.79.236</span> (NOT Supabase)</p>
				</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Instead of forwarding the query to Supabase's authoritative nameserver, the ISP resolver intercepts it. It matches the domain against a blocklist, finds <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> on the list, and returns a sinkhole IP address like <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.79.236</code>.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			A sinkhole IP is a dead-end address. It might be an IP that simply drops all incoming connections, or it might be a server that returns a government-mandated block page. Either way, your app's request never reaches Supabase. The connection hangs until it times out, resulting in the <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> error.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-red-400">What makes this effective</h3>
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Wildcard matching:</strong> The ISP blocks all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, not just a specific project. Every Supabase project URL is affected.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Silent failure:</strong> There is no error page or notification. The connection simply times out. Users and developers often waste hours debugging before realizing it is an ISP block.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Default path:</strong> Most devices use their ISP's DNS resolver by default. Users do not need to opt into the block; it is the default behavior on the network.</span>
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Section 3: Diagnostic commands ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">See it yourself: diagnostic commands</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			You can verify DNS poisoning on your network using these terminal commands. Compare the results from your ISP's DNS with a public DNS resolver like Cloudflare's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> to see the difference. For a more detailed diagnostic guide, see our <a href="/blog/test-if-backend-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">ISP block testing guide</a>.
		</p>

		<!-- nslookup on ISP DNS -->
		<p class="mb-2 text-sm font-medium text-red-400">DNS lookup using your ISP's resolver (poisoned):</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500">$ nslookup yourproject.supabase.co</div>
				<div class="mt-2 text-gray-400">Server:   198.18.0.1</div>
				<div class="text-gray-400">Address:  198.18.0.1#53</div>
				<div class="mt-2 text-gray-400">Non-authoritative answer:</div>
				<div class="text-gray-400">Name:     yourproject.supabase.co</div>
				<div class="text-red-400">Address:  49.44.79.236  <span class="text-gray-500">&larr; sinkhole IP (NOT Supabase)</span></div>
			</div>
		</div>

		<!-- nslookup on Cloudflare DNS -->
		<p class="mb-2 text-sm font-medium text-brand-400">DNS lookup using Cloudflare DNS (correct):</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500">$ nslookup yourproject.supabase.co 1.1.1.1</div>
				<div class="mt-2 text-gray-400">Server:   1.1.1.1</div>
				<div class="text-gray-400">Address:  1.1.1.1#53</div>
				<div class="mt-2 text-gray-400">Non-authoritative answer:</div>
				<div class="text-gray-400">Name:     yourproject.supabase.co</div>
				<div class="text-brand-400">Address:  104.18.x.x  <span class="text-gray-500">&larr; real Supabase IP</span></div>
			</div>
		</div>

		<!-- dig comparison -->
		<p class="mb-2 text-sm font-medium text-blue-400">Quick comparison using dig:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Using ISP DNS (poisoned result)</div>
				<div class="text-gray-400">$ dig +short yourproject.supabase.co</div>
				<div class="text-red-400">49.44.79.236</div>
				<div class="mt-3 text-gray-500"># Using Cloudflare DNS (correct result)</div>
				<div class="text-gray-400">$ dig +short yourproject.supabase.co @1.1.1.1</div>
				<div class="text-brand-400">104.18.x.x</div>
			</div>
		</div>

		<!-- curl showing timeout -->
		<p class="mb-2 text-sm font-medium text-amber-400">Connection attempt showing the timeout:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500">$ curl -v --max-time 10 https://yourproject.supabase.co</div>
				<div class="text-gray-400">* Trying 49.44.79.236:443...</div>
				<div class="text-gray-400">* Connection timed out after 10001 milliseconds</div>
				<div class="text-red-400">* Closing connection</div>
				<div class="text-red-400">curl: (28) Connection timed out after 10001 milliseconds</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">The key diagnostic:</strong> If <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">nslookup yourproject.supabase.co</code> returns a different IP than <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">nslookup yourproject.supabase.co 1.1.1.1</code>, your ISP is poisoning the DNS response. The sinkhole IP will typically be in the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">49.44.x.x</code> range for Jio users.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 4: Why .com works but .co does not ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why .com works but .co does not</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			One of the most confusing aspects of the block for developers is that <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> works perfectly while <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> is completely blocked. This is not a bug in the blocking; it reflects Supabase's infrastructure architecture.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">supabase.com (NOT blocked)</span>
				</div>
				<p class="text-sm text-gray-400">The marketing website and dashboard. This is where you log in, manage projects, and read documentation. It does not serve API traffic.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">supabase.co (BLOCKED)</span>
				</div>
				<p class="text-sm text-gray-400">The API domain. Every project gets a subdomain like <code class="text-gray-300">abcdefgh.supabase.co</code>. All REST, Auth, Storage, and Realtime endpoints live here.</p>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The blocking order targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> specifically. Since all API traffic uses the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.co</code> domain, the block effectively disables every Supabase-powered application for Indian users while leaving the dashboard accessible.
		</p>

		<p class="leading-relaxed text-gray-300">
			This is why you can still log into the Supabase dashboard, view your projects, and see that everything is running normally. The database is fine. The server is fine. The problem is that your users' browsers cannot reach the API endpoint because their ISP's DNS will not resolve the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.co</code> domain correctly.
		</p>
	</section>


	<!-- ===== Section 5: Beyond DNS - DPI ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Beyond DNS: Deep Packet Inspection (DPI)</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			DNS poisoning is the primary blocking mechanism, but some Indian ISPs employ an additional layer of blocking called Deep Packet Inspection (DPI). This is important to understand because it explains why simply changing your DNS resolver to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code> does not always fix the problem.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			When your browser establishes a TLS (HTTPS) connection, the first step is the TLS handshake. During this handshake, your browser sends a field called the <strong class="text-white">Server Name Indication (SNI)</strong> in plaintext. The SNI tells the server which domain the client wants to connect to, and it is visible to anyone inspecting the traffic, including your ISP.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is what happens with DPI-based blocking:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 1:</strong> You switch your DNS to Cloudflare's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code>. DNS now resolves correctly and returns Supabase's real IP address.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 2:</strong> Your browser starts a TLS handshake with Supabase's real IP. In the Client Hello message, the SNI field says <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">yourproject.supabase.co</code>.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Step 3:</strong> The ISP's DPI equipment inspects the SNI field, sees <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code>, and drops or resets the connection before TLS can complete.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">Result:</strong> Even though DNS resolved correctly, the connection still fails. You get the same <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> or <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_RESET</code> error.
				</p>
			</div>
		</div>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-amber-400">Why this matters</h3>
			<p class="text-sm leading-relaxed text-gray-400">
				DPI-based blocking means that even if you bypass DNS poisoning by using a different resolver, the ISP can still see and block the connection based on the hostname in the TLS handshake. This is why DNS changes are not a reliable fix, even for local development. The only way to fully bypass both DNS poisoning and DPI is to ensure the domain <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> never appears in any part of the connection that the ISP can inspect.
			</p>
		</div>
	</section>


	<!-- ===== Section 6: Why changing DNS does not fix it for users ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why just changing your DNS does not fix it for your users</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Even if changing DNS to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> bypasses both DNS poisoning and DPI on your machine (which is not guaranteed), it only fixes the problem for you. Your production users are still affected.
		</p>

		<div class="glass-card mb-6 rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-red-400">The scale of the problem</h3>
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">500M+ Jio subscribers</strong> all use Jio's default DNS resolver. They have not changed it. They will not change it. Most of them do not know what DNS is.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Mobile users cannot easily change DNS.</strong> On Android without root, changing DNS requires a third-party app or a Private DNS setting that most users will never configure. On iOS, per-network DNS settings reset frequently.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">You cannot ship a DNS change.</strong> Your app's code has no control over which DNS resolver the user's device uses. You cannot programmatically change their DNS settings.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">ISPs intercept public DNS too.</strong> Some ISPs redirect DNS queries to known public resolvers (like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>) back through their own resolver, negating the workaround entirely.</span>
				</li>
			</ul>
		</div>

		<p class="leading-relaxed text-gray-300">
			The fix must be transparent to end users. They should not need to install anything, change any setting, or even know that a block exists. The solution needs to work at the infrastructure level, not the client level.
		</p>
	</section>


	<!-- ===== Section 7: How a reverse proxy bypasses the block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How a reverse proxy bypasses the block</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			A reverse proxy solves both DNS poisoning and DPI in one step. Instead of your app connecting directly to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>, it connects to a domain you control (or one provided by JioBase) that is not on the ISP's blocklist.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is the complete flow with a reverse proxy:
		</p>

		<!-- Proxy flow diagram -->
		<div class="glass-card mb-8 overflow-x-auto rounded-xl p-6">
			<div class="mb-4 text-center">
				<p class="text-xs font-medium uppercase tracking-wider text-gray-500">User's device (client-side, ISP can inspect)</p>
			</div>
			<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Your App</p>
					<p class="mt-1 text-xs text-gray-500">Browser / Client</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
					<span class="text-xs text-gray-600">SNI: yourapp.jiobase.com</span>
				</div>

				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
					<p class="font-semibold text-brand-400">JioBase Proxy</p>
					<p class="mt-1 text-xs text-gray-500">Cloudflare Edge</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
					<span class="text-xs text-gray-600">Server-side</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Supabase</p>
					<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
				</div>
			</div>

			<div class="mt-4 text-center">
				<p class="text-xs font-medium uppercase tracking-wider text-gray-500">Server-side (ISP cannot inspect)</p>
			</div>
		</div>

		<div class="mb-6 space-y-3">
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-brand-400">DNS query:</strong> The browser resolves <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourapp.jiobase.com</code>, not <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code>. The ISP's DNS has no block for this domain, so it returns the real Cloudflare IP.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-brand-400">TLS handshake:</strong> The SNI field says <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourapp.jiobase.com</code>, not <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code>. DPI equipment sees nothing to block.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-brand-400">Proxy forwarding:</strong> The Cloudflare Worker receives the request and forwards it to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> on the server side. This server-to-server connection happens on Cloudflare's network, completely outside the ISP's control.
				</p>
			</div>
			<div class="glass-card rounded-xl px-5 py-4">
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-brand-400">Response:</strong> Supabase responds to the Worker, which forwards the response back to the user's browser. The entire round trip adds only 1-5ms of latency.
				</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The ISP never sees <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> in any DNS query, SNI field, or HTTP header. From the ISP's perspective, the user is simply accessing a Cloudflare-hosted domain. There is nothing to block.
		</p>
	</section>


	<!-- ===== Section 8: Verifying the fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Verifying the fix</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			After setting up your proxy through <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> or a <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">self-hosted Cloudflare Worker</a>, you can verify it works by running these commands from an affected ISP connection:
		</p>

		<!-- Verify DNS -->
		<p class="mb-2 text-sm font-medium text-brand-400">Verify DNS resolves correctly for the proxy domain:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Proxy domain resolves normally (not blocked)</div>
				<div class="text-gray-400">$ nslookup yourapp.jiobase.com</div>
				<div class="mt-2 text-gray-400">Name:     yourapp.jiobase.com</div>
				<div class="text-brand-400">Address:  104.21.x.x  <span class="text-gray-500">&larr; Cloudflare IP (correct)</span></div>
			</div>
		</div>

		<!-- Verify API works -->
		<p class="mb-2 text-sm font-medium text-brand-400">Verify API requests work through the proxy:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Test REST API through the proxy</div>
				<div class="text-gray-400">$ curl -s https://yourapp.jiobase.com/rest/v1/ \</div>
				<div class="text-gray-400">    -H "apikey: your-anon-key" \</div>
				<div class="text-gray-400">    -H "Authorization: Bearer your-anon-key"</div>
				<div class="mt-2 text-brand-400">{'{"message":"ok"}'}  <span class="text-gray-500">&larr; success, proxy is working</span></div>
			</div>
		</div>

		<!-- Compare direct vs proxy -->
		<p class="mb-2 text-sm font-medium text-blue-400">Compare direct vs proxy connection:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Direct connection (blocked, times out)</div>
				<div class="text-gray-400">$ curl --max-time 5 https://yourproject.supabase.co/rest/v1/</div>
				<div class="text-red-400">curl: (28) Connection timed out</div>
				<div class="mt-3 text-gray-500"># Through proxy (works instantly)</div>
				<div class="text-gray-400">$ curl --max-time 5 https://yourapp.jiobase.com/rest/v1/</div>
				<div class="text-brand-400">HTTP/2 200 OK</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Test from the right network.</strong> Make sure you are testing from a Jio, Airtel, or ACT Fibernet connection. If you are on a VPN or using a different ISP, the direct connection might work too, which does not prove the proxy is solving the block. Disable your VPN and test on mobile data for the most accurate result.
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
					<span class="font-medium">Can DNS poisoning be detected programmatically from my app?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Not reliably from client-side JavaScript. Browsers do not expose DNS resolution details to web pages. You can detect connectivity failures (timeouts, connection resets) but cannot determine the cause. From a server or terminal, you can compare DNS results from different resolvers using <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">nslookup</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">dig</code> as shown above.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Does Encrypted Client Hello (ECH) protect against SNI-based blocking?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					ECH (formerly ESNI) encrypts the SNI field during the TLS handshake, which would prevent ISPs from inspecting the hostname. However, ECH is not widely deployed yet, and ISPs can block ECH-enabled connections entirely as a fallback. It is also a client-side feature that requires browser support and server support, neither of which you can control for your end users. A reverse proxy remains the more practical solution.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Does a reverse proxy add latency to API requests?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					A small amount, typically 1-5ms. JioBase runs on Cloudflare's edge network with 300+ data centers worldwide, including multiple locations in India. The Worker processes the request at the nearest edge location to the user, then forwards it to Supabase's servers. The added latency is negligible compared to the alternative of the request not working at all.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can the ISP block the proxy domain too?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					In theory, any domain can be blocked. However, blocking a custom proxy domain is far less likely because it is not on any existing blocklist. If you use your own custom domain with JioBase, the domain is unique to your application. ISP blocklists target known services by their well-known domains, not individual application domains. Additionally, if a proxy domain were ever blocked, you could switch to a new domain in minutes.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Bypass DNS poisoning in 5 minutes
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Set up a JioBase reverse proxy and make your Supabase app work for every user in India. No DNS changes, no VPN, no client-side workarounds. Just swap one URL.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/blog/supabase-blocked-india-fix"
					class="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Read the fix guide
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="dns-poisoning-supabase-india-explained" suggestedSlugs={["supabase-blocked-india-fix", "test-if-backend-blocked-india", "proxy-supabase-cloudflare-workers"]} />
</article>
