<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix | JioBase</title>
	<meta name="description" content="Users experiencing network connectivity problems with Supabase in the India region? It is not a Supabase outage. Indian ISPs are DNS-blocking *.supabase.co. Learn how to diagnose the issue and fix it permanently." />
	<meta name="keywords" content="supabase network connectivity problems, supabase india region, supabase connection issues india, supabase not working india, supabase DNS block india, ERR_CONNECTION_TIMED_OUT supabase" />
	<meta property="og:title" content="Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix" />
	<meta property="og:description" content="Users experiencing network connectivity problems with Supabase in India? It is not an outage. Indian ISPs are blocking *.supabase.co at the DNS level. Here is how to diagnose and fix it." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix" />
	<meta name="twitter:description" content="Supabase connectivity issues in India are caused by ISP-level DNS blocking, not a Supabase outage. Learn how to diagnose and fix the problem." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="troubleshooting" />
	<meta property="article:tag" content="network connectivity" />
	<meta property="article:tag" content="india" />
	<link rel="canonical" href="https://jiobase.com/blog/supabase-network-connectivity-problems-india" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Article",
				"headline": "Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix",
				"description": "Users experiencing network connectivity problems with Supabase in the India region? It is not a Supabase outage. Indian ISPs are DNS-blocking *.supabase.co. Learn how to diagnose the issue and fix it permanently.",
				"datePublished": "2026-02-28T00:00:00+05:30",
				"dateModified": "2026-02-28T00:00:00+05:30",
				"author": { "@type": "Person", "name": "Sunith VS", "url": "https://sunithvs.com" },
				"publisher": { "@id": "https://jiobase.com/#organization" },
				"url": "https://jiobase.com/blog/supabase-network-connectivity-problems-india",
				"mainEntityOfPage": "https://jiobase.com/blog/supabase-network-connectivity-problems-india",
				"keywords": ["supabase network connectivity problems", "supabase india region", "supabase connection issues india", "supabase DNS block india"]
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jiobase.com/blog" },
					{ "@type": "ListItem", "position": 3, "name": "Supabase Network Connectivity Problems in India" }
				]
			},
			{
				"@type": "FAQPage",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "Is this a Supabase outage or an India-specific problem?",
						"acceptedAnswer": { "@type": "Answer", "text": "It is India-specific. Supabase infrastructure is fully operational globally. The connectivity problem is caused by Indian ISPs DNS-blocking the *.supabase.co domain under a government directive." }
					},
					{
						"@type": "Question",
						"name": "Why does my Supabase dashboard work but my app does not?",
						"acceptedAnswer": { "@type": "Answer", "text": "The Supabase dashboard is hosted on supabase.com, which is not blocked. Your project's API endpoints live on yourproject.supabase.co, which is blocked. The two domains are separate." }
					},
					{
						"@type": "Question",
						"name": "Will changing my DNS to 1.1.1.1 fix this for my users?",
						"acceptedAnswer": { "@type": "Answer", "text": "No. Changing DNS settings only affects your own machine. Your end users will still be using their ISP's default DNS resolver. A server-side reverse proxy is the only solution that works transparently for all users." }
					},
					{
						"@type": "Question",
						"name": "Does the proxy work with Supabase Realtime (WebSockets)?",
						"acceptedAnswer": { "@type": "Answer", "text": "Yes. JioBase supports full WebSocket proxying with minimal latency for Supabase Realtime connections." }
					},
					{
						"@type": "Question",
						"name": "Is my data safe going through a proxy?",
						"acceptedAnswer": { "@type": "Answer", "text": "JioBase does not read, store, or log the content of your requests. All connections use end-to-end HTTPS. Your Supabase anon key and RLS policies remain fully in effect." }
					},
					{
						"@type": "Question",
						"name": "How much latency does the proxy add?",
						"acceptedAnswer": { "@type": "Answer", "text": "Typically 1 to 5 milliseconds per request. JioBase runs on Cloudflare's global edge network with 300+ data centers." }
					}
				]
			}
		]
	})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Troubleshooting</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>7 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			If your Supabase-powered app suddenly stopped working for users in India, you are not alone. Thousands of developers are seeing timeout errors, failed API calls, and broken WebSocket connections. The Supabase status page may reference "network connectivity problems" in the India region, but the root cause is not on Supabase's end. Here is what is really happening and how to fix it.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: The symptoms ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The symptoms: what you are seeing</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Developers across India are reporting the same cluster of errors. If any of the following look familiar, you are dealing with the same underlying issue:
		</p>

		<div class="space-y-3 mb-6">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">1</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> in Chrome or Brave when your app tries to reach the Supabase API
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">2</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">TypeError: Failed to fetch</code> or <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">fetch failed</code> in your JavaScript console
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">3</div>
				<p class="text-sm leading-relaxed text-gray-400">
					WebSocket connections for Supabase Realtime dropping immediately or failing to establish
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">4</div>
				<p class="text-sm leading-relaxed text-gray-400">
					Supabase Auth calls (<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">signUp</code>, <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">signInWithPassword</code>) hanging indefinitely with no response
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-sm font-bold text-red-400">5</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ECONNREFUSED</code> or <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ETIMEDOUT</code> in Node.js server-side code running on Indian hosting providers
				</p>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Key observation:</strong> The Supabase dashboard at <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> loads fine. Only your API calls to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> are failing. This is the critical clue.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: Root cause ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Root cause: ISP-level DNS blocking, not a Supabase outage</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			This is not a Supabase infrastructure problem. Supabase servers are online, healthy, and accessible from every country outside India. The real cause is that Indian ISPs are DNS-poisoning all <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domains under a government blocking order issued through <strong class="text-white">Section 69A of the Information Technology Act, 2000</strong>.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			When your application (or your user's browser) tries to resolve a domain like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>, the ISP's DNS resolver intercepts the query and returns a sinkhole IP address instead of the real Supabase server. Your app connects to this sinkhole, which silently drops all packets, and your request hangs until it times out.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			This is why the Supabase dashboard works but the API does not. The dashboard lives on <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> (not blocked), while all project APIs live on <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> (blocked).
		</p>

		<div class="glass-card rounded-xl p-5">
			<h3 class="mb-3 text-sm font-semibold text-white">ISPs confirmed to be blocking Supabase:</h3>
			<ul class="space-y-2 text-sm text-gray-400">
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-red-400"></div>
					<strong class="text-gray-200">Jio</strong> (Reliance Jio) - approximately 500 million subscribers
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-red-400"></div>
					<strong class="text-gray-200">Airtel</strong> (Bharti Airtel) - broadband and mobile
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-red-400"></div>
					<strong class="text-gray-200">ACT Fibernet</strong> - metro broadband provider
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
					<strong class="text-gray-200">BSNL</strong> - also blocking Firebase domains
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Section 3: Common misdiagnoses ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Common misdiagnoses vs the real problem</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Before you spend hours debugging your code, rule out these common wrong assumptions:
		</p>

		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10 text-left">
						<th class="pb-3 pr-4 font-semibold text-gray-300">What you might think</th>
						<th class="pb-3 font-semibold text-gray-300">What is actually happening</th>
					</tr>
				</thead>
				<tbody class="text-gray-400">
					<tr class="border-b border-white/5">
						<td class="py-3 pr-4">"My Supabase API key is wrong"</td>
						<td class="py-3">A bad API key returns a <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">401</code> status, not a timeout. You are not even reaching Supabase.</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-4">"It is a CORS error"</td>
						<td class="py-3">CORS errors require the browser to receive a response first. Timeouts mean no response was received at all.</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-4">"Supabase is down"</td>
						<td class="py-3">Check <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">status.supabase.com</code>. Supabase is online globally. The issue is India-specific ISP blocking.</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-4">"My code has a bug"</td>
						<td class="py-3">If your code worked yesterday and nothing changed, the ISP likely just rolled out the block in your region.</td>
					</tr>
					<tr>
						<td class="py-3 pr-4">"My firewall is blocking it"</td>
						<td class="py-3">Try from a VPN or ask someone outside India to test. If it works for them, the block is at the ISP level.</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>


	<!-- ===== Section 4: How to diagnose ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How to diagnose: confirm it is DNS poisoning</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Run these commands from your terminal to confirm that your ISP is poisoning DNS responses for Supabase domains.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Step 1: Compare DNS results</h3>
		<p class="mb-3 text-sm leading-relaxed text-gray-400">
			Use <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">nslookup</code> to query your ISP's DNS and then Cloudflare's DNS. If they return different IPs, your ISP is intercepting the query.
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-gray-500"># Query your ISP's default DNS (likely poisoned):</p>
				<p class="text-gray-300">$ nslookup yourproject.supabase.co</p>
				<p class="text-gray-300">Server:   198.18.0.1</p>
				<p class="text-gray-300">Address:  198.18.0.1#53</p>
				<p class="text-gray-300">Name:     yourproject.supabase.co</p>
				<p class="text-red-400">Address:  49.44.79.236   <span class="text-gray-500"># Sinkhole IP - NOT Supabase</span></p>
				<br />
				<p class="text-gray-500"># Query Cloudflare DNS (returns the real IP):</p>
				<p class="text-gray-300">$ nslookup yourproject.supabase.co 1.1.1.1</p>
				<p class="text-gray-300">Server:   1.1.1.1</p>
				<p class="text-gray-300">Address:  1.1.1.1#53</p>
				<p class="text-gray-300">Name:     yourproject.supabase.co</p>
				<p class="text-brand-400">Address:  104.18.x.x    <span class="text-gray-500"># Real Supabase IP</span></p>
			</div>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Step 2: Use dig for more detail</h3>
		<p class="mb-3 text-sm leading-relaxed text-gray-400">
			The <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">dig</code> command gives you more verbose output, including the authoritative nameserver and TTL values.
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-gray-500"># Compare ISP DNS vs Google DNS:</p>
				<p class="text-gray-300">$ dig yourproject.supabase.co</p>
				<p class="text-red-400">;; ANSWER SECTION:</p>
				<p class="text-red-400">yourproject.supabase.co. 300 IN A 49.44.79.236</p>
				<br />
				<p class="text-gray-300">$ dig @8.8.8.8 yourproject.supabase.co</p>
				<p class="text-brand-400">;; ANSWER SECTION:</p>
				<p class="text-brand-400">yourproject.supabase.co. 300 IN A 104.18.x.x</p>
			</div>
		</div>

		<h3 class="mb-3 text-lg font-semibold">Step 3: Test with curl</h3>
		<p class="mb-3 text-sm leading-relaxed text-gray-400">
			Attempt a direct HTTP request to your Supabase project. If it times out, then force the real IP using <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">--resolve</code> to bypass DNS.
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-gray-500"># This will timeout on blocked ISPs:</p>
				<p class="text-gray-300">$ curl -v --max-time 10 https://yourproject.supabase.co/rest/v1/</p>
				<p class="text-red-400">* Connection timed out after 10001 milliseconds</p>
				<p class="text-red-400">curl: (28) Connection timed out</p>
				<br />
				<p class="text-gray-500"># Bypass ISP DNS by resolving to the real IP:</p>
				<p class="text-gray-300">$ curl -v --max-time 10 \</p>
				<p class="text-gray-300">  --resolve yourproject.supabase.co:443:104.18.x.x \</p>
				<p class="text-gray-300">  https://yourproject.supabase.co/rest/v1/</p>
				<p class="text-brand-400">HTTP/2 200  <span class="text-gray-500"># Works when bypassing ISP DNS</span></p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			If the first curl times out but the second one succeeds, the block is confirmed. Your ISP is returning a fake DNS response for <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, and no amount of code changes will fix it.
		</p>
	</section>


	<!-- ===== Section 5: Why supabase.com works but supabase.co does not ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why the Supabase dashboard works but the API does not</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			This is the single most confusing part for developers hitting this issue. You can log into <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code>, view your project, run queries in the SQL editor, and everything seems fine. But your application cannot reach the API at all.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			The reason is straightforward: Supabase uses two separate domains for different purposes.
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10 text-left">
						<th class="px-5 py-3 font-semibold text-gray-300">Domain</th>
						<th class="px-5 py-3 font-semibold text-gray-300">Purpose</th>
						<th class="px-5 py-3 font-semibold text-gray-300">Status in India</th>
					</tr>
				</thead>
				<tbody class="text-gray-400">
					<tr class="border-b border-white/5">
						<td class="px-5 py-3"><code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code></td>
						<td class="px-5 py-3">Dashboard, docs, marketing site</td>
						<td class="px-5 py-3"><span class="text-brand-400">Not blocked</span></td>
					</tr>
					<tr>
						<td class="px-5 py-3"><code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code></td>
						<td class="px-5 py-3">Project APIs, Auth, Storage, Realtime</td>
						<td class="px-5 py-3"><span class="text-red-400">Blocked by ISPs</span></td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			The blocking order targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> specifically. The <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.com</code> domain is unaffected. So you can manage your project but your users cannot use it.
		</p>
	</section>


	<!-- ===== Section 6: Fixes that do not work ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Fixes that do not work for production apps</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Every forum thread and Stack Overflow answer suggests these workarounds. They might help you during development, but none of them solve the problem for your end users.
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Changing DNS to 1.1.1.1 or 8.8.8.8</span>
				</div>
				<p class="text-sm text-gray-400">This fixes DNS resolution on your machine only. Your end users are still using their ISP's default DNS. You cannot ask every user of your app to change their system DNS settings. Additionally, some ISPs use deep packet inspection (DPI) that blocks Supabase traffic regardless of DNS configuration.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Using a VPN</span>
				</div>
				<p class="text-sm text-gray-400">VPNs add 50 to 200ms of latency per request, cost money, and require every single user to install and maintain one. This is not a viable solution for a production application serving hundreds or thousands of Indian users.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Flushing DNS cache</span>
				</div>
				<p class="text-sm text-gray-400">Running <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">ipconfig /flushdns</code> or equivalent clears your local cache, but your ISP will just return the same poisoned response on the next query. The problem is upstream, not in your local cache.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Switching to another BaaS provider</span>
				</div>
				<p class="text-sm text-gray-400">Firebase is already blocked on BSNL. Other backend services could be targeted next. Migrating your entire backend is a massive effort that does not address the root cause: ISP-level blocking can affect any foreign service at any time.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Waiting for the block to be lifted</span>
				</div>
				<p class="text-sm text-gray-400">Section 69A blocking orders are issued by the government and enforced by ISPs. These blocks have historically persisted for months or years. Waiting is not a strategy for a production application.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 7: The real fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The real fix: reverse proxy through Cloudflare</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The only production-viable solution is to route your Supabase API traffic through a domain that is not blocked. A reverse proxy sitting on Cloudflare's edge network accepts requests from your users on an unblocked domain and forwards them to Supabase server-side, completely bypassing ISP DNS restrictions.
		</p>

		<p class="mb-8 leading-relaxed text-gray-300">
			<strong class="text-white">JioBase</strong> is a managed reverse proxy built specifically for Indian developers facing this problem. It runs on Cloudflare Workers across 300+ edge locations, adding only 1 to 5ms of latency. Here is how to set it up:
		</p>

		<!-- Step 1 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<h3 class="text-lg font-semibold">Create a JioBase account</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Sign up at <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. The free tier includes 50,000 proxied requests per month.
			</p>
		</div>

		<!-- Step 2 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<h3 class="text-lg font-semibold">Create a proxy app</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Paste your Supabase project URL and choose a slug. You get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.
			</p>
		</div>

		<!-- Step 3 -->
		<div>
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<h3 class="text-lg font-semibold">Swap your SUPABASE_URL</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Replace the Supabase project URL in your environment variables with the JioBase proxy URL. No code changes needed beyond the URL swap.
			</p>
		</div>
	</section>


	<!-- ===== Section 8: Step-by-step migration with code examples ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step-by-step migration: swap one environment variable</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The migration requires changing exactly one value in your environment configuration. Here are examples for the most common frameworks.
		</p>

		<!-- Next.js -->
		<h3 class="mb-3 text-lg font-semibold">Next.js</h3>

		<p class="mb-2 text-sm font-medium text-red-400">Before (broken on Indian ISPs):</p>
		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">.env.local</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-red-400">NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co</p>
				<p class="text-gray-300">NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...</p>
			</div>
		</div>

		<p class="mb-2 text-sm font-medium text-brand-400">After (works everywhere):</p>
		<div class="code-block mb-8 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">.env.local</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-brand-400">NEXT_PUBLIC_SUPABASE_URL=https://myapp.jiobase.com</p>
				<p class="text-gray-300">NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...  <span class="text-gray-500"># same key</span></p>
			</div>
		</div>

		<!-- React (Vite) -->
		<h3 class="mb-3 text-lg font-semibold">React (Vite)</h3>

		<p class="mb-2 text-sm font-medium text-red-400">Before:</p>
		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">.env</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-red-400">VITE_SUPABASE_URL=https://abcdefgh.supabase.co</p>
				<p class="text-gray-300">VITE_SUPABASE_ANON_KEY=eyJhbGciOi...</p>
			</div>
		</div>

		<p class="mb-2 text-sm font-medium text-brand-400">After:</p>
		<div class="code-block mb-8 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">.env</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-brand-400">VITE_SUPABASE_URL=https://myapp.jiobase.com</p>
				<p class="text-gray-300">VITE_SUPABASE_ANON_KEY=eyJhbGciOi...  <span class="text-gray-500"># same key</span></p>
			</div>
		</div>

		<!-- Flutter -->
		<h3 class="mb-3 text-lg font-semibold">Flutter</h3>

		<p class="mb-2 text-sm font-medium text-red-400">Before:</p>
		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/main.dart</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-purple-400">await <span class="text-yellow-200">Supabase.initialize</span>(</p>
				<p class="text-gray-300">  url: <span class="text-red-400">'https://abcdefgh.supabase.co'</span>,</p>
				<p class="text-gray-300">  anonKey: <span class="text-amber-300">'eyJhbGciOi...'</span>,</p>
				<p class="text-gray-300">);</p>
			</div>
		</div>

		<p class="mb-2 text-sm font-medium text-brand-400">After:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/main.dart</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<p class="text-purple-400">await <span class="text-yellow-200">Supabase.initialize</span>(</p>
				<p class="text-gray-300">  url: <span class="text-brand-400">'https://myapp.jiobase.com'</span>,  <span class="text-gray-500">// proxy URL</span></p>
				<p class="text-gray-300">  anonKey: <span class="text-amber-300">'eyJhbGciOi...'</span>,         <span class="text-gray-500">// same key</span></p>
				<p class="text-gray-300">);</p>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">No other code changes required.</strong> The Supabase client library sends standard HTTP and WebSocket requests to whatever URL you configure. Auth, database queries, Storage, Realtime subscriptions, and Edge Functions all work identically through the proxy. Your <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">anon key</code> and <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">service role key</code> remain the same.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 9: How the proxy works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How the reverse proxy resolves connectivity</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is the request flow after you switch to the proxy URL:
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">request-flow.txt</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-brand-400">PROXIED FLOW (works on all Indian ISPs):</span>

  User's Browser         ISP DNS         Cloudflare Edge     Supabase
    |                      |                  |                 |
    |--- DNS query -------->|                  |                 |
    |    myapp.jiobase.com |                  |                 |
    |                      |                  |                 |
    |{'<'}-- Real CF IP -------|                  |                 |
    |    (not blocked)     |                  |                 |
    |                      |                  |                 |
    |--- HTTPS request ----------------------->|                 |
    |                                         |                 |
    |                              Worker rewrites URL          |
    |                              myapp.jiobase.com ->         |
    |                              abcdefgh.supabase.co         |
    |                                         |                 |
    |                                         |--- forward ---->|
    |                                         |                 |
    |                                         |{'<'}-- response ---|
    |                                         |                 |
    |{'<'}-- proxied response ------------------|                 |
    |                                                           |</code></pre>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			The key insight: Cloudflare's servers resolve <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> from their own infrastructure, which is not subject to Indian ISP DNS blocks. The request reaches Supabase normally on the server side.
		</p>
	</section>


	<!-- ===== Section 10: What if you want to self-host ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Self-hosted alternative: deploy your own Cloudflare Worker</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			If you prefer to manage the proxy yourself, you can deploy a basic Cloudflare Worker that forwards requests to Supabase. We provide a free <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> that creates a ready-to-deploy script.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The self-hosted approach works well for simple use cases but does not include WebSocket proxying (needed for Supabase Realtime), analytics, rate limiting, or automatic health checks that the managed JioBase service provides.
		</p>

		<p class="leading-relaxed text-gray-300">
			For a detailed walkthrough of setting up a self-hosted proxy, see our <a href="/blog/proxy-supabase-cloudflare-workers" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Cloudflare Workers proxy tutorial</a>.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-3">
			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Is this a Supabase outage or an India-specific problem?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					It is India-specific. Supabase infrastructure is fully operational globally. The connectivity problem is caused by Indian ISPs (Jio, Airtel, ACT Fibernet) DNS-blocking the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain under a government directive. You can verify this by checking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">status.supabase.com</code> or asking someone outside India to test your project URL.
				</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Why does my Supabase dashboard work but my app does not?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					The Supabase dashboard is hosted on <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code>, which is not blocked. Your project's API endpoints live on <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>, which is blocked. The two domains are separate, and only the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">.co</code> domain is targeted by the blocking order.
				</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Will changing my DNS to 1.1.1.1 fix this for my users?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					No. Changing DNS settings only affects your own machine. Your end users will still be using their ISP's default DNS resolver, which returns the poisoned response. You cannot control the DNS settings of every person who uses your application. A server-side reverse proxy is the only solution that works transparently for all users.
				</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Does the proxy work with Supabase Realtime (WebSockets)?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					Yes. JioBase supports full WebSocket proxying. When your Supabase client initiates a Realtime connection, the proxy performs a WebSocket upgrade and maintains a persistent bidirectional connection between the client and Supabase, forwarding frames in both directions with minimal latency.
				</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Is my data safe going through a proxy?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					JioBase does not read, store, or log the content of your requests. The proxy forwards requests as-is to Supabase without inspecting payloads. All connections use end-to-end HTTPS. Your Supabase anon key and Row Level Security (RLS) policies remain fully in effect. For additional assurance, you can <a href="/blog/proxy-supabase-cloudflare-workers" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">self-host your own proxy</a>.
				</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					How much latency does the proxy add?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">
					Typically 1 to 5 milliseconds per request. JioBase runs on Cloudflare's global edge network with 300+ data centers. The request hits the nearest Cloudflare node, gets forwarded to Supabase, and the response comes back the same way. This is negligible compared to the 50 to 200ms overhead of a VPN, and infinitely better than a complete connection timeout.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mt-16">
		<div class="glass-card rounded-2xl border border-brand-400/20 p-8 text-center">
			<h2 class="text-2xl font-bold">Fix your Supabase connectivity in 5 minutes</h2>
			<p class="mt-3 text-gray-400">Stop debugging network errors that are not your fault. Route through an unblocked domain and get your app working for every user in India.</p>
			<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
				<a href="/register" class="rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300">Start for free</a>
				<a href="/docs" class="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white">Read the docs</a>
			</div>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="supabase-network-connectivity-problems-india" suggestedSlugs={["supabase-err-connection-timed-out-india", "test-if-backend-blocked-india", "supabase-blocked-india-fix"]} />
</article>
