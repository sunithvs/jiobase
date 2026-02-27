<svelte:head>
	<title>Why Every Indian Developer Using Supabase Needs a Reverse Proxy - JioBase Blog</title>
	<meta name="description" content="DNS blocks are not new in India. From Medium to GitHub to Supabase, ISP-level blocks keep breaking developer tools. Here's why a proxy layer is essential infrastructure for Indian developers." />
	<meta name="keywords" content="supabase india proxy, indian developer supabase, ISP block developer tools india, supabase alternative india" />

	<!-- Open Graph -->
	<meta property="og:title" content="Why Every Indian Developer Using Supabase Needs a Reverse Proxy" />
	<meta property="og:description" content="DNS blocks are not new in India. From Medium to GitHub to Supabase, ISP-level blocks keep breaking developer tools. A proxy layer isn't a workaround - it's essential infrastructure." />
	<meta property="og:type" content="article" />

	<!-- Article metadata -->
	<meta property="article:published_time" content="2026-02-27" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="india" />
	<meta property="article:tag" content="proxy" />
	<meta property="article:tag" content="infrastructure" />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16">

	<!-- ===== HEADER ===== -->
	<header class="mb-16">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Opinion</span>
			<time datetime="2026-02-27">February 27, 2026</time>
			<span>6 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Why Every Indian Developer Using Supabase Needs a
			<span class="text-gradient">Reverse Proxy</span>
		</h1>

		<p class="mt-6 text-lg leading-relaxed text-gray-400">
			If you ship software for Indian users and depend on Supabase, you are one government order away from a total outage. That is not a hypothetical. It already happened. And it will happen again.
		</p>
	</header>


	<!-- ===== 1. PATTERN OF BLOCKING ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">India has a pattern of blocking developer tools</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			In October 2025, millions of Indian internet users woke up to find that Medium.com was inaccessible. No warning, no public notice from ISPs, no transition period. The platform simply stopped resolving on Jio, Airtel, and BSNL networks. Developers who hosted technical blogs, documentation links, and engineering postmortems on Medium found their content unreachable for the largest internet audience on the planet.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			That was not an isolated event. In August 2025, BSNL blocked a series of developer platforms with no explanation, affecting raw GitHub content (<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">raw.githubusercontent.com</code>), certain Firebase endpoints, and a growing list of SaaS APIs. Before that, there were temporary blocks on Telegram, Reddit, and various VPN services.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			And now, Supabase. The entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain is DNS-blocked across major ISPs following a government ministry order. Every REST query, every auth call, every realtime subscription, every storage upload -- all of it returns <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code>.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			The takeaway is not that any single block is unusual. The takeaway is that blocking developer infrastructure is now a recurring pattern. If your stack depends on a third-party domain, you should assume that domain will eventually be blocked in at least one major market.
		</p>
	</section>


	<!-- ===== 2. THE SCALE ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">The scale of the problem is staggering</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			India is not a niche market. It is the single largest connected population on earth by active mobile internet users. When an ISP block hits, the blast radius is enormous.
		</p>

		<div class="mt-6 grid gap-4 sm:grid-cols-3">
			<div class="glass-card rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-brand-400">500M+</div>
				<div class="mt-1 text-sm text-gray-400">Jio subscribers</div>
			</div>
			<div class="glass-card rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-brand-400">350M+</div>
				<div class="mt-1 text-sm text-gray-400">Airtel subscribers</div>
			</div>
			<div class="glass-card rounded-xl p-5 text-center">
				<div class="text-3xl font-bold text-brand-400">4.5M+</div>
				<div class="mt-1 text-sm text-gray-400">Active developers in India</div>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			India is home to the second-largest developer community in the world. Thousands of startups, indie hackers, and enterprise teams use Supabase as their backend. When Supabase goes dark on Jio alone, you instantly lose access to more users than the entire population of the European Union. This is not a minor inconvenience. It is an existential threat to any product that depends on Supabase and serves Indian users.
		</p>
	</section>


	<!-- ===== 3. WHEN YOUR BACKEND GOES DARK ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">What happens when your backend goes dark</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			When an ISP blocks your backend domain, the failure mode is catastrophic and silent. There is no graceful degradation. Your frontend loads, the UI renders, and then every API call hangs until it times out. From the user's perspective, the app is broken.
		</p>

		<div class="mt-6 space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-3">
					<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
					</div>
					<div>
						<h3 class="font-semibold text-white">User impact</h3>
						<p class="mt-1 text-sm leading-relaxed text-gray-400">
							Authentication fails. Data does not load. Realtime features go silent. Users cannot sign up, cannot log in, cannot use your product. They do not see an error message explaining the ISP block -- they just see a broken app and leave.
						</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-3">
					<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
					</div>
					<div>
						<h3 class="font-semibold text-white">Revenue loss</h3>
						<p class="mt-1 text-sm leading-relaxed text-gray-400">
							Every hour of downtime is lost revenue. For a SaaS product with paying Indian customers, an ISP block can mean days or weeks of zero conversions from the largest mobile market in the world. By the time you diagnose the issue and deploy a fix, the damage is done.
						</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-3">
					<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
					</div>
					<div>
						<h3 class="font-semibold text-white">Trust erosion</h3>
						<p class="mt-1 text-sm leading-relaxed text-gray-400">
							Users do not care why your app is broken. They do not read your Twitter thread explaining that Jio is blocking Supabase. They switch to a competitor. Trust, once lost, is extraordinarily difficult to rebuild -- especially in a market where users have dozens of alternatives one tap away.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== 4. WHY DNS AND VPNS FAIL ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">Why DNS changes and VPNs fail as solutions</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			The most common advice in developer communities when a block hits is to change your DNS to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>, or install a VPN. This advice is well-intentioned but fundamentally misunderstands the problem.
		</p>

		<div class="mt-6 space-y-3">
			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Your end users cannot configure DNS.</strong> You are not building for developers. Your users are on Jio 4G on an Android phone. They do not know what DNS is, and they should not need to.
				</p>
			</div>

			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Mobile networks ignore custom DNS.</strong> On most Indian mobile networks, custom DNS settings on the device are silently overridden. The carrier injects its own DNS resolver at the network level, making client-side DNS changes ineffective.
				</p>
			</div>

			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Deep Packet Inspection bypasses DNS entirely.</strong> Some ISPs use DPI to inspect the SNI (Server Name Indication) field in TLS handshakes. Even if DNS resolves correctly, the connection is dropped at the network level when the SNI matches a blocked domain.
				</p>
			</div>

			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">VPNs are a developer workaround, not a product solution.</strong> A VPN works for you, the developer, during development. It does not work for the hundreds of thousands of users who need your production app to function without extra software.
				</p>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			The fix has to be at the infrastructure level. Something your users never see, never install, and never configure.
		</p>
	</section>


	<!-- ===== 5. INFRASTRUCTURE RESILIENCE ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">The case for infrastructure resilience</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			Modern web applications are built on layers of third-party services. Your database is hosted by one provider, your auth by another, your storage by a third, your CDN by a fourth. Each of these services exposes a domain name, and each of those domain names is a single point of failure.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			In a market where ISPs can and do block domains at will, depending on a single domain for a critical service is an architectural vulnerability. It is the equivalent of running a production database without backups. It works fine until it does not.
		</p>

		<div class="mt-6 glass-card rounded-xl p-6">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Principle</p>
			<p class="mt-2 text-lg font-medium text-white">
				Never depend on a single domain for a critical path in your application.
			</p>
			<p class="mt-2 text-sm leading-relaxed text-gray-400">
				If your app calls <code class="text-gray-300">xyz.supabase.co</code> directly from the client, you have zero fallback when that domain becomes unreachable. A proxy layer on a domain you control gives you the ability to reroute traffic, switch backends, and survive blocks without pushing a client update.
			</p>
		</div>
	</section>


	<!-- ===== 6. HOW A REVERSE PROXY WORKS ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">How a reverse proxy works</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			The concept is simple. Instead of your frontend calling Supabase directly, it calls your proxy domain. The proxy, running on infrastructure that is not blocked, forwards the request to Supabase, receives the response, and sends it back to the client. The user never interacts with the blocked domain.
		</p>

		<div class="mt-6 code-block overflow-x-auto rounded-xl p-6 font-mono text-sm leading-7">
			<div class="text-gray-500"><!-- Architecture --></div>
			<div class="mt-2 text-gray-300">
				<div class="flex items-center gap-2">
					<span class="text-brand-400">User (Jio/Airtel)</span>
				</div>
				<div class="ml-4 text-gray-500">|</div>
				<div class="ml-4 text-gray-500">| HTTPS request to <span class="text-brand-400">myapp.jiobase.com</span></div>
				<div class="ml-4 text-gray-500">v</div>
				<div class="mt-1 flex items-center gap-2">
					<span class="text-amber-300">Cloudflare Edge (300+ PoPs)</span>
				</div>
				<div class="ml-4 text-gray-500">|</div>
				<div class="ml-4 text-gray-500">| Forward to origin (not blocked at edge)</div>
				<div class="ml-4 text-gray-500">v</div>
				<div class="mt-1 flex items-center gap-2">
					<span class="text-purple-400">Supabase (xyz.supabase.co)</span>
				</div>
				<div class="ml-4 text-gray-500">|</div>
				<div class="ml-4 text-gray-500">| Response flows back same path</div>
				<div class="ml-4 text-gray-500">v</div>
				<div class="mt-1 flex items-center gap-2">
					<span class="text-brand-400">User gets data</span>
					<span class="text-gray-500">-- ISP never sees supabase.co</span>
				</div>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			The ISP's DNS block or DPI filter looks at the domain the client is connecting to. Since the client connects to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code> (which resolves to Cloudflare IPs), the ISP has no reason to block it. The proxy then makes the request to Supabase from Cloudflare's network, which is outside the ISP's jurisdiction.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			This works for HTTP REST calls, authentication flows, file storage operations, and critically, WebSocket connections used by Supabase Realtime. The proxy detects WebSocket upgrade headers and establishes a bidirectional relay, so subscriptions, presence, and broadcast all function normally.
		</p>
	</section>


	<!-- ===== 7. DIY VS MANAGED ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">DIY vs. managed proxy: the real tradeoffs</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			You can absolutely build a Supabase proxy yourself. A basic Cloudflare Worker that forwards requests is roughly 50 lines of code. But "basic forwarding" and "production-grade proxy" are very different things.
		</p>

		<div class="mt-6 overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-white/10">
						<th class="pb-3 pr-6 text-left font-semibold text-gray-300">Concern</th>
						<th class="pb-3 pr-6 text-left font-semibold text-gray-300">DIY proxy</th>
						<th class="pb-3 text-left font-semibold text-brand-400">Managed (JioBase)</th>
					</tr>
				</thead>
				<tbody class="text-gray-400">
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">HTTP forwarding</td>
						<td class="py-3 pr-6">Straightforward</td>
						<td class="py-3">Handled</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">WebSocket / Realtime</td>
						<td class="py-3 pr-6">Complex to implement correctly</td>
						<td class="py-3">Built-in, tested at scale</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">CORS configuration</td>
						<td class="py-3 pr-6">You handle edge cases</td>
						<td class="py-3">Configurable per-app</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">Rate limiting</td>
						<td class="py-3 pr-6">Build from scratch</td>
						<td class="py-3">Included</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">Analytics / monitoring</td>
						<td class="py-3 pr-6">Add your own logging</td>
						<td class="py-3">Dashboard with real-time metrics</td>
					</tr>
					<tr class="border-b border-white/5">
						<td class="py-3 pr-6 text-gray-300">Custom domains</td>
						<td class="py-3 pr-6">Manual DNS + certificate setup</td>
						<td class="py-3">One-click CNAME setup</td>
					</tr>
					<tr>
						<td class="py-3 pr-6 text-gray-300">Ongoing maintenance</td>
						<td class="py-3 pr-6">Your responsibility</td>
						<td class="py-3">Managed for you</td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			The DIY approach makes sense if you have a single Supabase project, no WebSocket needs, and the engineering capacity to maintain the proxy alongside your actual product. For everyone else, the time spent building and maintaining proxy infrastructure is time not spent building features your users care about.
		</p>
	</section>


	<!-- ===== 8. BUILDING FOR INDIA ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">Building for the Indian market</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			If India is a target market for your product -- and given its developer population and growth trajectory, it probably should be -- you need to design your architecture with the assumption that any external domain can be blocked at any time. This is not paranoia. It is pattern recognition.
		</p>

		<div class="mt-6 space-y-3">
			<div class="flex items-start gap-3">
				<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Anticipate blocks.</strong> Assume any third-party domain can become unreachable. Design fallback paths into your architecture from day one, not as a hotfix when things break.
				</p>
			</div>

			<div class="flex items-start gap-3">
				<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Use custom domains for everything.</strong> Your API, your auth endpoint, your storage -- all of it should be behind a domain you own. If your backend is <code class="text-brand-400">api.yourstartup.com</code> instead of <code class="text-gray-500">xyz.supabase.co</code>, you can reroute traffic at the DNS level without touching client code.
				</p>
			</div>

			<div class="flex items-start gap-3">
				<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Add a proxy layer.</strong> A reverse proxy running on edge infrastructure gives you a buffer between your users and your backend provider. It is an insurance policy against domain-level disruption.
				</p>
			</div>

			<div class="flex items-start gap-3">
				<div class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Monitor ISP reachability.</strong> Set up synthetic monitoring from Indian IP ranges. You should know about a block before your users report it, not after your support queue is overflowing.
				</p>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			These are not advanced techniques. They are table stakes for any product that takes the Indian market seriously. The developers who build this resilience into their stack from the start will have an enormous advantage over those scrambling to patch things after the next block.
		</p>
	</section>


	<!-- ===== 9. CONCLUSION ===== -->
	<section class="mb-14">
		<h2 class="text-2xl font-bold tracking-tight">Resilience is not optional. It is a product requirement.</h2>

		<p class="mt-4 leading-relaxed text-gray-300">
			There was a time when infrastructure resilience meant having database replicas and multi-region deployments. In India's regulatory environment, it now also means ensuring that no single blocked domain can take your entire product offline.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			The Medium block, the BSNL blocks, the Supabase block -- these are not bugs in the system. This is how the system works. Indian ISPs will continue to comply with government orders. Those orders will continue to arrive without warning and without clear timelines for reversal.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			As developers building for this market, we have two choices. We can treat each block as a one-off crisis, scrambling for workarounds and hoping it gets resolved. Or we can accept that domain-level disruption is a permanent feature of the Indian internet landscape and build our architectures accordingly.
		</p>

		<p class="mt-4 leading-relaxed text-gray-300">
			A reverse proxy is not a clever hack. It is infrastructure. And in India, it is essential infrastructure.
		</p>
	</section>


	<!-- ===== 10. CTA ===== -->
	<section class="mt-16 mb-8">
		<div class="glass-card rounded-2xl p-8 text-center sm:p-12">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Get started</p>
			<h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
				Try JioBase free
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Set up a managed Supabase reverse proxy in under 5 minutes. One URL change. Full API support including Realtime WebSockets. No credit card required.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/blog/proxy-supabase-cloudflare-workers"
					class="flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
				>
					Read the technical tutorial
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
				</a>
			</div>
		</div>
	</section>


	<!-- ===== BACK TO BLOG ===== -->
	<div class="mt-12 border-t border-white/5 pt-8">
		<a href="/blog" class="flex items-center gap-2 text-sm text-gray-500 transition hover:text-brand-400">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
			Back to all posts
		</a>
	</div>

</article>
