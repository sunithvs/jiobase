<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>How to Test if Your Backend is Blocked by Indian ISPs | JioBase</title>
	<meta name="description" content="A practical guide to diagnose whether Indian ISPs like Jio, Airtel, or ACT Fibernet are DNS-blocking your Supabase backend. Includes terminal commands, scripts, and step-by-step tests." />
	<meta name="keywords" content="test supabase blocked india, check ISP block india, diagnose DNS block jio airtel, supabase ERR_CONNECTION_TIMED_OUT, nslookup supabase india" />
	<meta property="og:title" content="How to Test if Your Backend is Blocked by Indian ISPs" />
	<meta property="og:description" content="Step-by-step diagnostic guide to confirm whether Indian ISPs are blocking your Supabase backend. Includes DNS checks, multi-network tests, online tools, and a browser script." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="How to Test if Your Backend is Blocked by Indian ISPs" />
	<meta name="twitter:description" content="Practical diagnostic guide to test if Jio, Airtel, or other Indian ISPs are blocking your Supabase backend." />
	<link rel="canonical" href="https://jiobase.com/blog/test-if-backend-blocked-india" />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Guide</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>5 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			How to Test if Your Backend is Blocked by Indian ISPs
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Your app stopped working for users in India and you are not sure why. Is it a Supabase outage? A bug in your code? Or an ISP-level DNS block? This guide walks you through a systematic process to diagnose whether Indian ISPs are blocking your backend, using nothing but a terminal and a browser.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: Symptoms of an ISP block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Symptoms of an ISP block</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Before running diagnostics, check whether you are seeing these telltale signs. If two or more of these match, an ISP block is the most likely cause.
		</p>

		<div class="space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
				</div>
				<div>
					<p class="font-semibold text-white">ERR_CONNECTION_TIMED_OUT in the browser</p>
					<p class="mt-1 text-sm text-gray-400">API calls to <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> hang for 30+ seconds and then fail. The browser console shows a network error with no HTTP status code.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
				</div>
				<div>
					<p class="font-semibold text-white">fetch() promises that never resolve</p>
					<p class="mt-1 text-sm text-gray-400">Your JavaScript <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">fetch()</code> calls to Supabase endpoints never return a response. They sit in a pending state until they time out.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
				</div>
				<div>
					<p class="font-semibold text-white">Works on WiFi but not on mobile data (or vice versa)</p>
					<p class="mt-1 text-sm text-gray-400">Different ISPs have different blocking policies. Your app might work on Airtel broadband but fail on Jio mobile data, or the other way around.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
				</div>
				<div>
					<p class="font-semibold text-white">Works with a VPN but not without</p>
					<p class="mt-1 text-sm text-gray-400">If turning on a VPN instantly fixes the problem, the issue is between your device and the destination - which points directly to an ISP-level block.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
				</div>
				<div>
					<p class="font-semibold text-white">Works from non-Indian IPs but fails from India</p>
					<p class="mt-1 text-sm text-gray-400">Your teammates outside India can use the app just fine. Only users connecting from Indian IP addresses are affected.</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: Quick DNS check ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 1: Quick DNS check</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The fastest way to confirm a DNS block is to run a DNS lookup from your machine. If your ISP is poisoning DNS, the resolved IP address will be a sinkhole - not a real Supabase server.
		</p>

		<p class="mb-2 text-sm font-medium text-red-400">What a blocked response looks like:</p>
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

		<p class="mb-2 text-sm font-medium text-brand-400">What an unblocked response looks like:</p>
		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500">$ nslookup yourproject.supabase.co</div>
				<div class="mt-2 text-gray-400">Server:   1.1.1.1</div>
				<div class="text-gray-400">Address:  1.1.1.1#53</div>
				<div class="mt-2 text-gray-400">Non-authoritative answer:</div>
				<div class="text-gray-400">Name:     yourproject.supabase.co</div>
				<div class="text-brand-400">Address:  13.228.225.19  <span class="text-gray-500">&larr; real Supabase IP (AWS)</span></div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The sinkhole IP <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.79.236</code> belongs to Reliance Jio's network - it is not a Supabase server. Real Supabase IPs typically resolve to AWS addresses in ranges like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">13.x.x.x</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">54.x.x.x</code>.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			You can also use <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">dig</code> for a more detailed view:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Using dig for more detail</div>
				<div><span class="text-brand-400">dig</span> yourproject.supabase.co +short</div>
				<div class="mt-1 text-red-400">49.44.79.236  <span class="text-gray-500">&larr; blocked (sinkhole)</span></div>
				<div class="mt-3 text-gray-500"># Compare with a public DNS resolver</div>
				<div><span class="text-brand-400">dig</span> @1.1.1.1 yourproject.supabase.co +short</div>
				<div class="mt-1 text-brand-400">13.228.225.19  <span class="text-gray-500">&larr; real IP via Cloudflare DNS</span></div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Key indicator:</strong> If <code class="text-gray-300">nslookup</code> or <code class="text-gray-300">dig</code> returns an IP that does not belong to AWS or Supabase's infrastructure, your ISP is returning a poisoned DNS response. Common sinkhole IPs include <code class="text-gray-300">49.44.79.236</code> and similar addresses in the <code class="text-gray-300">49.x.x.x</code> range on Jio networks.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 3: Test from multiple networks ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 2: Test from multiple networks</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			ISP blocks are not uniform across India. One ISP may block a domain while another does not. Testing from multiple networks helps you understand the scope of the block and confirm it is ISP-specific rather than a global Supabase outage.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Use this simple <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">curl</code> command to test connectivity from each network:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Test basic connectivity (should return JSON)</div>
				<div><span class="text-brand-400">curl</span> -s -o /dev/null -w "HTTP Status: %{'{'}{'{'}http_code{'}'}{'}'}\nTime: %{'{'}{'{'}time_total{'}'}{'}'}\n" \</div>
				<div>  https://yourproject.supabase.co/rest/v1/ \</div>
				<div>  -H <span class="text-amber-300">"apikey: YOUR_ANON_KEY"</span></div>
				<div class="mt-3 text-gray-500"># If blocked, you will see:</div>
				<div class="text-red-400">curl: (28) Connection timed out after 30001 milliseconds</div>
				<div class="mt-3 text-gray-500"># If working, you will see:</div>
				<div class="text-brand-400">HTTP Status: 200</div>
				<div class="text-brand-400">Time: 0.342</div>
			</div>
		</div>

		<p class="mb-6 leading-relaxed text-gray-300">
			Run this command on each network you have access to and record the results:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-300">
					<span class="text-lg font-bold text-gray-400">1</span>
				</div>
				<div>
					<p class="font-semibold text-white">Jio mobile data (4G/5G)</p>
					<p class="text-sm text-gray-400">Tether your phone or use a mobile hotspot. Jio is the most commonly reported blocked ISP.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-300">
					<span class="text-lg font-bold text-gray-400">2</span>
				</div>
				<div>
					<p class="font-semibold text-white">Airtel broadband or mobile</p>
					<p class="text-sm text-gray-400">Test from an Airtel connection to see if the block extends to India's second largest ISP.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-300">
					<span class="text-lg font-bold text-gray-400">3</span>
				</div>
				<div>
					<p class="font-semibold text-white">VPN (non-Indian exit node)</p>
					<p class="text-sm text-gray-400">Connect to a US or EU VPN server. If this works but direct connections do not, the block is confirmed.</p>
				</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Why blocks vary by ISP:</strong> Each Indian ISP implements government blocking orders independently. Jio might block a domain while BSNL does not. The blocking mechanism (DNS poisoning, DPI, or SNI filtering) can also differ, which is why testing from multiple networks is critical.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 4: Check with online tools ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 3: Check with online tools</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			If you only have access to one network, online tools can test connectivity from servers around the world. This helps you determine whether the issue is India-specific or a global Supabase outage.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="font-semibold text-white">ping.pe</span>
				</div>
				<p class="text-sm text-gray-400">Enter <code class="rounded bg-white/5 px-1 py-0.5 text-gray-300">yourproject.supabase.co</code> and it pings from 30+ global locations. Look for failures specifically from Indian nodes (Mumbai, Chennai, Delhi).</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="font-semibold text-white">check-host.net</span>
				</div>
				<p class="text-sm text-gray-400">Offers DNS, HTTP, TCP, and ping checks from servers worldwide. Run a DNS check to see which IPs are returned from Indian servers versus international ones.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="font-semibold text-white">Downdetector</span>
				</div>
				<p class="text-sm text-gray-400">Check if other Supabase users are reporting issues. A spike in reports from India with none from other countries is a strong signal of an ISP block.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="font-semibold text-white">Supabase Status</span>
				</div>
				<p class="text-sm text-gray-400">Visit <code class="rounded bg-white/5 px-1 py-0.5 text-gray-300">status.supabase.com</code> to check if there is a global outage. If Supabase reports all systems operational, the issue is on the network side.</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The key pattern to look for: if international servers can reach <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> successfully but Indian servers cannot, that is definitive evidence of an ISP-level block rather than a Supabase outage.
		</p>
	</section>


	<!-- ===== Section 5: Compare DNS resolvers ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 4: Compare DNS resolvers</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			This test tells you what kind of blocking your ISP is using. Compare the DNS results from your ISP's default resolver against public DNS providers. The difference reveals whether the block is purely DNS-based or uses deeper inspection.
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># 1. ISP's default DNS (likely blocked)</div>
				<div><span class="text-brand-400">nslookup</span> yourproject.supabase.co</div>
				<div class="mt-1 text-red-400">Address: 49.44.79.236  <span class="text-gray-500">&larr; sinkhole</span></div>
				<div class="mt-4 text-gray-500"># 2. Cloudflare DNS (1.1.1.1)</div>
				<div><span class="text-brand-400">nslookup</span> yourproject.supabase.co 1.1.1.1</div>
				<div class="mt-1 text-brand-400">Address: 13.228.225.19  <span class="text-gray-500">&larr; real IP</span></div>
				<div class="mt-4 text-gray-500"># 3. Google DNS (8.8.8.8)</div>
				<div><span class="text-brand-400">nslookup</span> yourproject.supabase.co 8.8.8.8</div>
				<div class="mt-1 text-brand-400">Address: 13.228.225.19  <span class="text-gray-500">&larr; real IP</span></div>
				<div class="mt-4 text-gray-500"># 4. Quad9 DNS (9.9.9.9)</div>
				<div><span class="text-brand-400">nslookup</span> yourproject.supabase.co 9.9.9.9</div>
				<div class="mt-1 text-brand-400">Address: 13.228.225.19  <span class="text-gray-500">&larr; real IP</span></div>
			</div>
		</div>

		<p class="mb-6 leading-relaxed text-gray-300">
			Now try to actually connect using the correct IP. This tells you if the ISP is doing more than DNS poisoning:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Test if connection works after bypassing DNS</div>
				<div><span class="text-brand-400">curl</span> --resolve yourproject.supabase.co:443:13.228.225.19 \</div>
				<div>  https://yourproject.supabase.co/rest/v1/ \</div>
				<div>  -H <span class="text-amber-300">"apikey: YOUR_ANON_KEY"</span> \</div>
				<div>  -s -o /dev/null -w <span class="text-amber-300">"HTTP: %{'{'}{'{'}http_code{'}'}{'}'}\n"</span></div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-white">What the results mean</h3>
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
					<span><strong class="text-gray-200">DNS returns sinkhole, but curl with --resolve works:</strong> Pure DNS block. Changing DNS on your machine may help for development, but your users are still affected.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/60"></span>
					<span><strong class="text-gray-200">DNS returns sinkhole, and curl with --resolve also fails:</strong> The ISP is using Deep Packet Inspection (DPI) or SNI filtering. They are inspecting the TLS handshake and blocking connections to <code class="text-gray-300">*.supabase.co</code> regardless of DNS. This is a more aggressive block.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
					<span><strong class="text-gray-200">Both scenarios require a reverse proxy:</strong> Whether the block is DNS-only or DPI-based, the fix is the same - route traffic through an unblocked domain using a Cloudflare Worker proxy.</span>
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Section 6: Verify with a simple script ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Step 5: Verify with a browser script</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			You can run this quick diagnostic script directly in your browser's DevTools console. It tests connectivity to your Supabase project and reports the result in a way that is easy to share with your team or in a bug report.
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">browser console</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">async function</span> <span class="text-yellow-200">testSupabaseAccess</span>() {'{'}</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">SUPABASE_URL</span> =</div>
				<div>    <span class="text-amber-300">'https://yourproject.supabase.co'</span>;</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">ANON_KEY</span> =</div>
				<div>    <span class="text-amber-300">'your-anon-key'</span>;</div>
				<div class="mt-2">  console.<span class="text-yellow-200">log</span>(<span class="text-amber-300">'Testing Supabase connectivity...'</span>);</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">start</span> = Date.<span class="text-yellow-200">now</span>();</div>
				<div class="mt-2">  <span class="text-purple-400">try</span> {'{'}</div>
				<div>    <span class="text-purple-400">const</span> <span class="text-blue-300">controller</span> =</div>
				<div>      <span class="text-purple-400">new</span> <span class="text-yellow-200">AbortController</span>();</div>
				<div>    <span class="text-purple-400">const</span> <span class="text-blue-300">timeout</span> =</div>
				<div>      <span class="text-yellow-200">setTimeout</span>(() =></div>
				<div>        controller.<span class="text-yellow-200">abort</span>(), <span class="text-blue-300">10000</span>);</div>
				<div class="mt-2">    <span class="text-purple-400">const</span> <span class="text-blue-300">res</span> = <span class="text-purple-400">await</span> <span class="text-yellow-200">fetch</span>(</div>
				<div>      `${'{'}<span class="text-blue-300">SUPABASE_URL</span>{'}'}/rest/v1/`,</div>
				<div>      {'{'}</div>
				<div>        headers: {'{'}</div>
				<div>          <span class="text-amber-300">'apikey'</span>: <span class="text-blue-300">ANON_KEY</span>,</div>
				<div>          <span class="text-amber-300">'Authorization'</span>:</div>
				<div>            `Bearer ${'{'}<span class="text-blue-300">ANON_KEY</span>{'}'}`</div>
				<div>        {'}'},</div>
				<div>        signal: controller.signal</div>
				<div>      {'}'}</div>
				<div>    );</div>
				<div>    <span class="text-yellow-200">clearTimeout</span>(timeout);</div>
				<div class="mt-2">    <span class="text-purple-400">const</span> <span class="text-blue-300">ms</span> = Date.<span class="text-yellow-200">now</span>() - start;</div>
				<div>    console.<span class="text-yellow-200">log</span>(</div>
				<div>      `<span class="text-brand-400">PASS</span>: ${'{'}<span class="text-blue-300">res</span>.status{'}'} in ${'{'}<span class="text-blue-300">ms</span>{'}'}ms`</div>
				<div>    );</div>
				<div>  {'}'} <span class="text-purple-400">catch</span> (<span class="text-blue-300">err</span>) {'{'}</div>
				<div>    <span class="text-purple-400">const</span> <span class="text-blue-300">ms</span> = Date.<span class="text-yellow-200">now</span>() - start;</div>
				<div>    console.<span class="text-yellow-200">error</span>(</div>
				<div>      `<span class="text-red-400">FAIL</span>: ${'{'}<span class="text-blue-300">err</span>.message{'}'} after ${'{'}<span class="text-blue-300">ms</span>{'}'}ms`</div>
				<div>    );</div>
				<div>    console.<span class="text-yellow-200">error</span>(</div>
				<div>      <span class="text-amber-300">'Likely ISP block. Try VPN to confirm.'</span></div>
				<div>    );</div>
				<div>  {'}'}</div>
				<div>{'}'}</div>
				<div class="mt-2"><span class="text-yellow-200">testSupabaseAccess</span>();</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Open your browser's DevTools (press <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">F12</code>), go to the Console tab, paste this script, and replace the URL and key with your actual values. The output will tell you immediately whether the connection succeeds or fails and how long it took.
		</p>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Interpreting the output:</strong> A response within 100-500ms with HTTP status <code class="text-brand-400">200</code> means the connection is working. If it times out after 10 seconds with an <code class="text-red-400">AbortError</code>, the connection is being blocked. If you get a CORS error, the connection reached Supabase but the origin is not allowed - that is a different issue.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 7: What to do if blocked ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What to do if your backend IS blocked</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			If your tests confirm the block, do not panic. There are three paths forward depending on how much time and control you want:
		</p>

		<div class="space-y-4">
			<!-- Option 1 -->
			<div class="glass-card rounded-xl p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
					<div>
						<h3 class="text-lg font-semibold text-white">Quick fix: Worker Generator Tool</h3>
						<p class="text-sm text-gray-500">Self-hosted, 5 minutes</p>
					</div>
				</div>
				<p class="mb-3 text-sm leading-relaxed text-gray-400">
					Enter your Supabase URL and get a ready-to-deploy Cloudflare Worker script. Copy and paste it into Cloudflare's dashboard - no CLI needed.
				</p>
				<ul class="mb-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						HTTP proxying for REST, Auth, and Storage
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						CORS handling included
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Free on Cloudflare Workers free tier
					</li>
				</ul>
				<a
					href="/tools/worker-generator"
					class="inline-flex items-center gap-2 rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-2 text-sm font-medium text-brand-400 transition hover:bg-brand-400/10"
				>
					Open Worker Generator
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
			</div>

			<!-- Option 2 -->
			<div class="glass-card rounded-xl border-brand-400/20 p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
					<div>
						<h3 class="text-lg font-semibold text-white">Managed fix: Use JioBase</h3>
						<p class="text-sm text-gray-500">Fully managed, 2 minutes</p>
					</div>
				</div>
				<p class="mb-3 text-sm leading-relaxed text-gray-400">
					Sign up, enter your Supabase URL, and get a proxy endpoint instantly. Includes WebSocket/Realtime support, analytics, rate limiting, and a dashboard. Change one URL in your code and you are done.
				</p>
				<ul class="mb-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Full HTTP + WebSocket proxy
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Dashboard with request analytics
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Free tier: 50,000 requests/month
					</li>
				</ul>
				<a
					href="/register"
					class="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-brand-300"
				>
					Start for free
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
			</div>

			<!-- Option 3 -->
			<div class="glass-card rounded-xl p-6">
				<div class="mb-3 flex items-center gap-3">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
					<div>
						<h3 class="text-lg font-semibold text-white">Full tutorial: Build your own proxy</h3>
						<p class="text-sm text-gray-500">DIY, 30 minutes</p>
					</div>
				</div>
				<p class="mb-3 text-sm leading-relaxed text-gray-400">
					Follow our step-by-step guide to build a Cloudflare Worker reverse proxy from scratch. Covers HTTP proxying, WebSocket support, CORS configuration, DNS setup, and deployment.
				</p>
				<a
					href="/blog/proxy-supabase-cloudflare-workers"
					class="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Read the full tutorial
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
			</div>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">How do I know if it is an ISP block vs a Supabase outage?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Check <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">status.supabase.com</code> first. If Supabase reports all systems operational, it is not an outage. Then test from a VPN or ask someone outside India to try. If it works from non-Indian IPs but fails from Indian ones, it is an ISP block. You can also use <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">ping.pe</code> to test from global locations - if only Indian nodes fail, the ISP block is confirmed.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Does the block affect all Supabase projects or just mine?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					The block targets the entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> domain, not individual projects. This means every Supabase project is affected, not just yours. You can verify this by running <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">nslookup anyproject.supabase.co</code> - all subdomains will resolve to the same sinkhole IP on affected ISPs.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can I test the block from outside India?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes, but indirectly. Use online tools like <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">check-host.net</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">ping.pe</code> that have test servers in India. These tools will run DNS lookups and ping tests from Indian servers on your behalf. If those Indian nodes return sinkhole IPs while international nodes return real IPs, the block is confirmed even though you are testing from abroad.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Will the block affect my server-side code?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					It depends on where your server is hosted. If your backend runs on a cloud provider like AWS, Vercel, or Railway with servers outside India, it can reach Supabase directly since the block only applies to Indian ISP networks. However, if your server is hosted in India or routes through an Indian ISP, it will be affected. Client-side code running in users' browsers in India is always affected since it goes through their local ISP.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">How do I monitor for future blocks?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Set up an uptime monitoring service (like UptimeRobot or Better Stack) that checks your Supabase endpoint from an Indian server. Configure it to alert you if the endpoint becomes unreachable. Alternatively, using a reverse proxy like JioBase makes your app immune to future DNS blocks since traffic flows through an unblocked domain regardless of what ISPs do.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Fix your blocked app in 5 minutes
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Now that you have confirmed the block, fix it. Set up JioBase and get your Supabase-powered app working for every user in India. One URL change is all it takes.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/docs"
					class="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Read the docs
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="test-if-backend-blocked-india" suggestedSlugs={["proxy-supabase-cloudflare-workers", "firebase-supabase-blocked-india", "supabase-err-connection-timed-out-india"]} />
</article>
