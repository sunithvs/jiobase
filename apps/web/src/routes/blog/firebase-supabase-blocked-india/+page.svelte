<svelte:head>
	<title>Firebase and Supabase Both Blocked in India: The Double Backend Crisis | JioBase</title>
	<meta name="description" content="Both Firebase and Supabase are now blocked by Indian ISPs. Firebase on BSNL since Aug 2025, Supabase on Jio/Airtel/ACT since Feb 2026. Learn why migrating between them won't help and what actually works." />
	<meta name="keywords" content="firebase blocked india, supabase blocked india, firebase supabase alternative india, backend blocked ISP india, BSNL firebase block" />
	<meta property="og:title" content="Firebase and Supabase Both Blocked in India: The Double Backend Crisis" />
	<meta property="og:description" content="Two of the most popular BaaS platforms are now inaccessible from major Indian ISPs. Devs who migrated from Firebase to Supabase are hitting the same wall. Here's what actually works." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Firebase and Supabase Both Blocked in India: The Double Backend Crisis" />
	<meta name="twitter:description" content="Both Firebase and Supabase are blocked on Indian ISPs. Migrating between them won't help. Here's the real fix." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="firebase" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="india" />
	<meta property="article:tag" content="ISP block" />
	<link rel="canonical" href="https://jiobase.com/blog/firebase-supabase-blocked-india" />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Breaking</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>7 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Firebase and Supabase Both Blocked in India: The Double Backend Crisis
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Indian developers are facing an unprecedented situation. Two of the most widely used Backend-as-a-Service platforms -- Firebase and Supabase -- are now blocked by different ISPs across India. Developers who migrated from one to the other to escape the first block are now discovering that the problem was never about the provider. It is about depending on third-party domains for critical infrastructure.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: What happened ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What happened</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Starting in August 2025, BSNL and a handful of regional ISPs began blocking Firebase endpoints. Developers on those networks found that Firestore queries, Firebase Auth calls, Cloud Functions invocations, and Storage uploads were failing silently or timing out. The block was inconsistent -- some Firebase services worked intermittently, others were completely unreachable.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Many developers responded by migrating to Supabase. It was the obvious choice: open-source, PostgreSQL-based, growing rapidly, and critically, <em>not blocked</em>. Migration guides flooded dev Twitter and Reddit. Hundreds of Indian startups and indie projects made the switch.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Then on February 24, 2026, Supabase was DNS-blocked on Jio, Airtel, and ACT Fibernet. The entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain started resolving to sinkhole IPs. Every app that had just finished migrating to Supabase was broken again -- this time on networks covering over 900 million subscribers.
		</p>

		<div class="glass-card rounded-xl p-6">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
				</svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-white">The worst-case scenario is here.</strong> If your app used Firebase, it was broken on BSNL. If you migrated to Supabase, it is now broken on Jio and Airtel. If you somehow used both, your app is broken on nearly every major Indian ISP.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: Timeline ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The timeline of blocks</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The pattern of ISP-level blocks on developer tools has been accelerating. Here is the timeline:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-4">
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
						<span class="text-sm font-bold text-amber-400">AUG</span>
					</div>
					<div>
						<p class="font-semibold text-white">August 2025</p>
						<p class="mt-1 text-sm leading-relaxed text-gray-400">BSNL blocks <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">raw.githubusercontent.com</code> and certain Firebase endpoints including Firestore and Cloud Functions. Developers on BSNL lose access to Firebase-dependent apps and GitHub raw content.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-4">
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
						<span class="text-sm font-bold text-amber-400">OCT</span>
					</div>
					<div>
						<p class="font-semibold text-white">October 2025</p>
						<p class="mt-1 text-sm leading-relaxed text-gray-400">Medium.com blocked across major ISPs including Jio, Airtel, and BSNL. Millions of developers lose access to technical blogs, documentation, and engineering postmortems hosted on Medium.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-start gap-4">
					<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
						<span class="text-sm font-bold text-red-400">FEB</span>
					</div>
					<div>
						<p class="font-semibold text-white">February 24, 2026</p>
						<p class="mt-1 text-sm leading-relaxed text-gray-400"><code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> DNS-blocked on Jio, Airtel, and ACT Fibernet. REST API, Auth, Storage, Realtime, and Edge Functions all inaccessible. Apps that migrated from Firebase to Supabase are broken again.</p>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-start gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
			<span class="mt-0.5 text-amber-400">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
			</span>
			<p class="text-sm leading-relaxed text-gray-300">
				<strong class="text-white">The pattern is accelerating.</strong> The gap between major developer tool blocks has shortened from years to months. These are not isolated incidents -- they are a systemic trend in how Indian ISPs handle government blocking orders.
			</p>
		</div>
	</section>


	<!-- ===== Section 3: Which services are affected ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Which services are affected</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Both Firebase and Supabase offer a full suite of backend services. The blocks affect different services on different ISPs, creating a patchwork of failures across the country.
		</p>

		<div class="grid gap-4 sm:grid-cols-2">
			<!-- Firebase column -->
			<div class="glass-card rounded-xl p-6">
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
						</svg>
					</div>
					<div>
						<p class="font-semibold text-white">Firebase</p>
						<p class="text-xs text-gray-500">BSNL / some regional ISPs</p>
					</div>
				</div>
				<ul class="space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Firestore (document reads and writes)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Firebase Auth (sign-in, sign-up, OAuth)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Cloud Functions (HTTPS triggers)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Firebase Hosting (custom domains unaffected)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Cloud Storage (uploads and downloads)
					</li>
				</ul>
			</div>

			<!-- Supabase column -->
			<div class="glass-card rounded-xl p-6">
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
						</svg>
					</div>
					<div>
						<p class="font-semibold text-white">Supabase</p>
						<p class="text-xs text-gray-500">Jio / Airtel / ACT Fibernet</p>
					</div>
				</div>
				<ul class="space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						REST API / PostgREST (all queries)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Supabase Auth (all auth flows)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Storage (file uploads, signed URLs)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Realtime (WebSocket subscriptions)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
						Edge Functions (serverless invocations)
					</li>
				</ul>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			The result is that there is no single BaaS platform that works reliably across all Indian ISPs right now. Firebase fails on BSNL. Supabase fails on Jio, Airtel, and ACT. A developer whose users span multiple ISPs has no safe choice -- unless they add a proxy layer.
		</p>
	</section>


	<!-- ===== Section 4: The migration trap ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The migration trap</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			When Firebase was blocked on BSNL, the developer community's instinct was to migrate. Hundreds of projects switched from Firebase to Supabase, rewriting auth flows, migrating databases, and updating client SDKs. It was weeks of engineering effort for many teams.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			That migration was built on a flawed assumption: that the block was Firebase-specific. That if you moved to a different provider on a different domain, you would be safe. The Supabase block proved that assumption wrong.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-4 text-lg font-semibold text-white">The cycle looks like this:</h3>
			<div class="space-y-3">
				<div class="flex items-start gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">1</div>
					<p class="text-sm leading-relaxed text-gray-400">ISP blocks Provider A. Your app breaks.</p>
				</div>
				<div class="flex items-start gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">2</div>
					<p class="text-sm leading-relaxed text-gray-400">You spend weeks migrating to Provider B. Your app works again.</p>
				</div>
				<div class="flex items-start gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">3</div>
					<p class="text-sm leading-relaxed text-gray-400">A different ISP blocks Provider B. Your app breaks again.</p>
				</div>
				<div class="flex items-start gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs font-bold text-red-400">4</div>
					<p class="text-sm leading-relaxed text-gray-400">Migrate again? To where? Every provider is one government order away from being blocked.</p>
				</div>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			The problem is not Firebase. The problem is not Supabase. The problem is that your production app makes requests to a domain you do not control, and that domain can be made unreachable at any time by any ISP. Switching providers does not fix this. You need to eliminate the dependency on third-party domains in your critical path.
		</p>
	</section>


	<!-- ===== Section 5: What about other BaaS? ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What about other BaaS platforms?</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			If Firebase and Supabase are both blocked, some developers are considering Appwrite, Nhost, PocketBase, or other alternatives. While these platforms are excellent tools, migrating to them does not solve the underlying problem.
		</p>

		<div class="mb-6 space-y-3">
			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Appwrite Cloud</strong> uses <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.appwrite.io</code> -- a <code class="text-gray-300">.io</code> domain that is just as susceptible to DNS blocking as <code class="text-gray-300">.co</code> domains.
				</p>
			</div>

			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">Nhost</strong> uses <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.nhost.run</code> -- another foreign SaaS domain with no special protection from ISP blocks.
				</p>
			</div>

			<div class="flex items-start gap-3 rounded-lg border border-white/5 bg-surface-200/50 p-4">
				<span class="mt-0.5 text-amber-400">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				</span>
				<p class="text-sm leading-relaxed text-gray-300">
					<strong class="text-white">PocketBase</strong> is self-hosted, which avoids the domain problem -- but it requires managing your own server infrastructure, scaling, backups, and security. It is a fundamentally different operational model.
				</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The pattern shows that Indian ISPs will comply with government orders to block any domain. The TLD does not matter. The provider does not matter. Any foreign SaaS domain used in your client-side code is a potential single point of failure. The only domains that are safe are the ones you own and control.
		</p>
	</section>


	<!-- ===== Section 6: The real solution ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The real solution: domain independence</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The fix is not to find a backend provider whose domain is not currently blocked. The fix is to stop exposing third-party domains to your end users entirely. Route all backend traffic through a domain you own, using a reverse proxy.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			This is not a new concept. CDNs, API gateways, and load balancers have always worked this way. Your users hit your domain. Your infrastructure handles the routing. The backend provider is an implementation detail that your users never see.
		</p>

		<div class="glass-card rounded-xl p-6">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Architecture principle</p>
			<p class="mt-2 text-lg font-medium text-white">
				Your users should never make requests to a domain you do not control.
			</p>
			<p class="mt-2 text-sm leading-relaxed text-gray-400">
				Whether you use Firebase, Supabase, Appwrite, or any other BaaS, the traffic from your client should flow through <code class="text-brand-400">api.yourapp.com</code>, not <code class="text-gray-500">xyz.provider.co</code>. A reverse proxy on Cloudflare's edge network gives you this decoupling with negligible latency overhead.
			</p>
		</div>

		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Block-proof</span>
				</div>
				<p class="text-sm text-gray-400">If your backend domain gets blocked, change the proxy target without updating any client code. Zero downtime for your users.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Provider-agnostic</span>
				</div>
				<p class="text-sm text-gray-400">Switch from Supabase to Firebase to Appwrite without touching your frontend. The proxy abstracts the backend.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Minimal latency</span>
				</div>
				<p class="text-sm text-gray-400">Cloudflare Workers execute at the edge in 300+ locations. The proxy adds 1-5ms, far less than a VPN or DNS workaround.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Transparent to users</span>
				</div>
				<p class="text-sm text-gray-400">Your users do not need to install a VPN, change DNS, or do anything. The proxy works silently at the infrastructure level.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 7: How JioBase helps ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How JioBase helps</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			<a href="/" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> is a managed Supabase reverse proxy built on Cloudflare's edge network. It gives you a proxy endpoint that routes all Supabase traffic through an unblocked domain -- with full support for REST, Auth, Storage, Realtime WebSockets, and Edge Functions.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			For Supabase users, the setup is a one-line code change:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
				<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
				<div>  <span class="text-gray-500">// </span><span class="text-red-400 line-through opacity-50">'https://xyz.supabase.co'</span></div>
				<div>  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,  <span class="text-gray-500">// proxied through Cloudflare edge</span></div>
				<div>  <span class="text-amber-300">'your-anon-key'</span>              <span class="text-gray-500">// same key, same RLS policies</span></div>
				<div><span class="text-gray-300">)</span></div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			For Firebase users, the concept is identical -- you need a proxy layer between your client and Firebase's servers. While JioBase is purpose-built for Supabase, you can use the same approach with a custom Cloudflare Worker for Firebase. Our free <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> can help you get started with a DIY proxy, and we have a <a href="/blog/proxy-supabase-cloudflare-workers" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">step-by-step tutorial</a> that covers the full implementation.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-brand-400">What JioBase handles for Supabase users</h3>
			<ul class="space-y-2 text-sm text-gray-400">
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Complete REST API proxying (PostgREST, Auth, Storage, Edge Functions)
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					WebSocket proxying for Supabase Realtime (subscriptions, presence, broadcast)
				</li>
				<li class="flex items-start gap-2">
					<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
					Automatic CORS header management with per-app configuration
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
					Minimal latency (1-5ms overhead) via Cloudflare's 300+ edge locations
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Is Firebase completely blocked in India?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Not on all ISPs. The Firebase block is primarily affecting BSNL and some regional ISPs since August 2025. Users on Jio and Airtel can still access Firebase in most cases. However, the block is inconsistent -- some Firebase services may work while others do not, and the situation can change without warning. If your app serves users on BSNL, you should assume Firebase endpoints are unreliable.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can I use JioBase to proxy Firebase too?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					JioBase is currently optimized for Supabase, handling its specific API patterns including PostgREST, Auth, Storage, and Realtime WebSockets. For Firebase, you can build a similar proxy using a Cloudflare Worker. The same architectural principle applies -- route traffic through a domain you control. Check out our <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a> to get started with a DIY solution, and stay tuned for potential Firebase support in the future.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Should I switch from Firebase to Supabase or vice versa?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Switching providers to avoid a block is a short-term fix at best. Both Firebase and Supabase are blocked on different ISPs, and other providers could be next. Instead of migrating, add a proxy layer in front of whatever backend you are already using. This protects you regardless of which provider is blocked and avoids the cost and risk of a full backend migration.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">What is the safest backend setup for Indian users?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					The safest setup has two properties: (1) all client-side traffic goes through a domain you own, and (2) the backend provider is abstracted behind a proxy. Use any BaaS you prefer -- Firebase, Supabase, Appwrite -- but route traffic through a Cloudflare Worker or a managed proxy like <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> on your own domain. This way, if a provider domain gets blocked, you change the proxy target on your server -- not the client code on every user's device.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">How quickly can I fix my blocked app?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					If you are using Supabase, you can set up JioBase in under five minutes -- create an account at <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>, create a proxy app, and swap the URL in your code. For Firebase or a DIY proxy, the <a href="/blog/proxy-supabase-cloudflare-workers" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Cloudflare Worker tutorial</a> takes about 30 minutes. Either way, the fix is deployable same-day.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Stop losing users to ISP blocks
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Firebase blocked on BSNL. Supabase blocked on Jio and Airtel. The next block could be any provider. Add a proxy layer today and make your app resilient to ISP-level disruptions -- permanently.
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
					Learn more
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<!-- Back to blog -->
	<div class="mt-12 border-t border-white/5 pt-8">
		<a href="/blog" class="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-brand-400">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition group-hover:-translate-x-0.5">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to all posts
		</a>
	</div>

</article>
