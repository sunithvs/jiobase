<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It | JioBase</title>
	<meta name="description" content="Getting ERR_CONNECTION_TIMED_OUT with Supabase in India? Your ISP is DNS-blocking *.supabase.co. Learn exactly why this happens, how to confirm it, and how to fix it with a reverse proxy." />
	<meta name="keywords" content="supabase ERR_CONNECTION_TIMED_OUT, supabase connection timed out india, supabase timeout jio, supabase not connecting india, ERR_CONNECTION_TIMED_OUT fix" />
	<meta property="og:title" content="Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It" />
	<meta property="og:description" content="Getting timeout errors with Supabase in India? Your ISP is blocking the connection. Here is exactly why and how to fix it." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It" />
	<meta name="twitter:description" content="Supabase timing out in India? It is an ISP DNS block. Here is the full breakdown and how to fix it." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="troubleshooting" />
	<meta property="article:tag" content="ERR_CONNECTION_TIMED_OUT" />
	<meta property="article:tag" content="india" />
	<link rel="canonical" href="https://jiobase.com/blog/supabase-err-connection-timed-out-india" />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Troubleshooting</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>5 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Getting timeout errors with Supabase in India? Your ISP is blocking the connection. Here is exactly why it happens and how to fix it.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: What ERR_CONNECTION_TIMED_OUT means ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What ERR_CONNECTION_TIMED_OUT means</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			<code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> means your browser (or app) tried to establish a TCP connection to a server and received no response within the timeout window. The request was sent, but nobody answered.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			This is different from a <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_REFUSED</code> (the server actively rejected the connection) or a <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_NAME_NOT_RESOLVED</code> (DNS lookup failed entirely). With a timeout, DNS resolved to some IP address, but that IP either does not exist, is unreachable, or is deliberately dropping packets.
		</p>

		<p class="leading-relaxed text-gray-300">
			In the case of Supabase in India, the timeout happens because your ISP's DNS resolver returns a sinkhole IP address instead of Supabase's real server. Your browser connects to the sinkhole, which silently drops the connection.
		</p>
	</section>


	<!-- ===== Section 2: Why this happens in India ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why this happens in India</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Indian ISPs including Jio, Airtel, and ACT Fibernet are DNS-poisoning all <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domains. When your app tries to resolve a Supabase domain, the ISP intercepts the DNS query and returns a fake IP address.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is what the normal flow looks like versus the blocked flow:
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">normal-vs-blocked.txt</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-brand-400">NORMAL FLOW (outside India / unblocked ISP):</span>

  Browser                ISP DNS              Supabase
    |                      |                     |
    |--- DNS query -------->|                     |
    |    abcd.supabase.co  |                     |
    |                      |                     |
    |{'<'}-- Real IP ----------|                     |
    |    104.18.x.x        |                     |
    |                      |                     |
    |--- HTTPS request --------------------------->|
    |                                             |
    |{'<'}-- 200 OK ----------------------------------|


<span class="text-red-400">BLOCKED FLOW (Jio / Airtel / ACT in India):</span>

  Browser                ISP DNS              Sinkhole    Supabase
    |                      |                     |            |
    |--- DNS query -------->|                     |            |
    |    abcd.supabase.co  |                     |            |
    |                      |                     |            |
    |{'<'}-- Fake IP ----------|                     |            |
    |    49.44.x.x         |                     |            |
    |                      |                     |            |
    |--- HTTPS request -------->|                |            |
    |                           |  (drops)       |            |
    |                           |                |            |
    |... waiting ...            |                |            |
    |... waiting ...            |                |            |
    |                           |                |            |
    X  ERR_CONNECTION_TIMED_OUT |                |            |</code></pre>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			The ISP never lets your request reach Supabase. It silently redirects you to a dead-end IP, and your connection hangs until the browser gives up.
		</p>
	</section>


	<!-- ===== Section 3: How to confirm it is an ISP block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How to confirm it is an ISP block</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Run these commands from your terminal to diagnose the issue:
		</p>

		<h3 class="mb-3 text-lg font-semibold">Step 1: Check what IP your DNS returns</h3>
		<div class="mb-6 glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">terminal</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-gray-500"># Using your ISP's DNS (likely poisoned):</span>
$ nslookup yourproject.supabase.co
Server:   198.18.0.1
Address:  198.18.0.1#53

Name:     yourproject.supabase.co
<span class="text-red-400">Address:  49.44.79.236</span>  <span class="text-gray-500"># Sinkhole IP - NOT Supabase</span>

<span class="text-gray-500"># Using Cloudflare DNS (should return real IP):</span>
$ nslookup yourproject.supabase.co 1.1.1.1
Server:   1.1.1.1
Address:  1.1.1.1#53

Name:     yourproject.supabase.co
<span class="text-brand-400">Address:  104.18.x.x</span>   <span class="text-gray-500"># Real Supabase IP</span></code></pre>
		</div>

		<p class="mb-6 leading-relaxed text-gray-300">
			If the two lookups return different IPs, your ISP is poisoning DNS for Supabase domains.
		</p>

		<h3 class="mb-3 text-lg font-semibold">Step 2: Test connectivity with curl</h3>
		<div class="mb-6 glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">terminal</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-gray-500"># This will time out on blocked ISPs:</span>
$ curl -v --max-time 10 https://yourproject.supabase.co/rest/v1/
<span class="text-red-400">* Connection timed out after 10001 milliseconds</span>
<span class="text-red-400">curl: (28) Connection timed out</span>

<span class="text-gray-500"># Force curl to use the real IP via Cloudflare DNS:</span>
$ curl -v --max-time 10 --resolve yourproject.supabase.co:443:104.18.x.x \
  https://yourproject.supabase.co/rest/v1/
<span class="text-brand-400">HTTP/2 200</span> <span class="text-gray-500"># Works when bypassing ISP DNS</span></code></pre>
		</div>

		<p class="leading-relaxed text-gray-300">
			If curl times out normally but works when you force the real IP, the block is confirmed. Your ISP is intercepting DNS queries for <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>.
		</p>
	</section>


	<!-- ===== Section 4: Quick test - different network ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Quick test: try a different network</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The fastest way to confirm it is an ISP block: connect to a different network and try again.
		</p>

		<div class="space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-sm font-bold text-brand-400">1</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Mobile hotspot:</strong> If you are on Jio broadband, try using an Airtel mobile hotspot (or vice versa). If one works and the other does not, it is an ISP-specific block.
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-sm font-bold text-brand-400">2</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">VPN:</strong> Enable any VPN and try the request again. If it works with VPN enabled, the block is at the ISP level.
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-sm font-bold text-brand-400">3</div>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Ask a friend abroad:</strong> Have someone outside India try accessing your Supabase project URL. If it works for them, the block is India-specific.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 5: The wrong fixes ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The wrong fixes</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			These workarounds appear in every forum thread but none of them solve the problem for production apps:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Change DNS to 1.1.1.1 or 8.8.8.8</span>
				</div>
				<p class="text-sm text-gray-400">Only fixes your local machine. Does not help your end users. Some ISPs also use DPI to block connections regardless of DNS resolution.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Use a VPN</span>
				</div>
				<p class="text-sm text-gray-400">Adds 50-200ms latency, costs money, and requires every user to install one. Not viable for a production app serving hundreds or thousands of users.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Switch to a different BaaS provider</span>
				</div>
				<p class="text-sm text-gray-400">Firebase is already blocked on BSNL. Other providers could be next. Migrating your entire backend does not solve the underlying DNS blocking problem.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 6: The right fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The right fix: reverse proxy</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The solution is to route your Supabase traffic through a domain that is not blocked. A reverse proxy on Cloudflare's edge network receives your requests on an unblocked domain and forwards them to Supabase on the server side, where there is no ISP block.
		</p>

		<p class="mb-8 leading-relaxed text-gray-300">
			<strong class="text-white">JioBase</strong> is a managed reverse proxy built specifically for this. Set it up in three steps:
		</p>

		<!-- Step 1 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<h3 class="text-lg font-semibold">Create a JioBase account</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Sign up at <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. Free tier includes 50,000 requests per month.
			</p>
		</div>

		<!-- Step 2 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<h3 class="text-lg font-semibold">Create a proxy app</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Enter your Supabase project URL and pick a slug. You get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.
			</p>
		</div>

		<!-- Step 3 -->
		<div>
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<h3 class="text-lg font-semibold">Swap the URL in your code</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Replace <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://yourproject.supabase.co</code> with <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">https://myapp.jiobase.com</code>. Deploy. Done.
			</p>
		</div>
	</section>


	<!-- ===== Section 7: Code example ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Code example: before and after</h2>

		<p class="mb-2 text-sm font-medium text-red-400">Before (times out on Indian ISPs):</p>
		<div class="mb-6 glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-red-400">'https://abcdefgh.supabase.co'</span>,
  process.env.SUPABASE_ANON_KEY
)</code></pre>
		</div>

		<p class="mb-2 text-sm font-medium text-brand-400">After (works everywhere):</p>
		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,    <span class="text-gray-500">// proxy URL</span>
  process.env.SUPABASE_ANON_KEY   <span class="text-gray-500">// same key</span>
)</code></pre>
		</div>

		<div class="mt-6 glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">No other changes needed.</strong> The Supabase JS client sends standard HTTP requests to whatever URL you give it. Auth, Storage, Realtime, Edge Functions -- everything works the same through the proxy.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 8: Technical details ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Technical details: how the proxy works</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			JioBase runs as a Cloudflare Worker deployed across 300+ edge locations worldwide. When a request arrives:
		</p>

		<ol class="mb-6 space-y-3 text-sm leading-relaxed text-gray-400">
			<li class="flex items-start gap-3">
				<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">1</span>
				<span>Your user's browser resolves <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">myapp.jiobase.com</code> using their ISP's DNS. Since <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">jiobase.com</code> is not blocked, this resolves to a Cloudflare IP normally.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">2</span>
				<span>The HTTPS request hits the nearest Cloudflare edge node. The Worker looks up which Supabase project is mapped to this slug.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">3</span>
				<span>The Worker rewrites the URL from <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">myapp.jiobase.com/rest/v1/...</code> to <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">abcdefgh.supabase.co/rest/v1/...</code> and forwards the request server-side.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">4</span>
				<span>Cloudflare's servers are not subject to Indian ISP DNS blocks. The request reaches Supabase normally.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">5</span>
				<span>The response flows back through Cloudflare to the user. Total added latency: 1-5ms.</span>
			</li>
		</ol>

		<p class="leading-relaxed text-gray-300">
			For WebSocket connections (Supabase Realtime), the Worker performs a WebSocket upgrade and maintains a persistent bidirectional connection between the client and Supabase, proxying frames in both directions.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Is this error only happening in India?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">The ISP-level DNS block on <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> is specific to Indian ISPs (Jio, Airtel, ACT Fibernet, and potentially others). If you are getting <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-red-400">ERR_CONNECTION_TIMED_OUT</code> outside India, it may be a different issue -- check your Supabase project status and network configuration.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					My app was working yesterday. Why did it suddenly break?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">ISP blocks can be rolled out gradually. Different ISPs implement the block at different times, and some regions within the same ISP may be affected before others. If your app was working on a particular ISP and suddenly stopped, that ISP likely just implemented the block in your area.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Will the proxy add latency to my API calls?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Minimal. JioBase runs on Cloudflare's edge network with 300+ locations worldwide. The proxy adds roughly 1-5ms of overhead per request. This is negligible compared to the 50-200ms a VPN adds, and infinitely better than a complete timeout.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Can I self-host a proxy instead of using JioBase?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Yes. We provide a free <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> that creates a ready-to-deploy Cloudflare Worker for basic HTTP proxying. The self-hosted version does not include WebSocket support, analytics, or rate limiting.</p>
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mt-16 glass-card rounded-2xl border-t-2 border-brand-400/50 p-8 text-center">
		<h2 class="text-2xl font-bold">Fix your Supabase app in 5 minutes</h2>
		<p class="mt-3 text-gray-400">Stop fighting timeout errors. Route through an unblocked domain and get back to building.</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a href="/register" class="rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300">Start for free</a>
			<a href="/docs" class="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white">Read the docs</a>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="supabase-err-connection-timed-out-india" suggestedSlugs={["test-if-backend-blocked-india", "fix-supabase-jio-5-minutes", "why-supabase-banned-india-section-69a"]} />
</article>
