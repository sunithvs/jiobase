<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Supabase India: Complete Timeline of the Block (Feb 2026) | JioBase</title>
	<meta name="description" content="A day-by-day timeline of the Supabase block in India. From the first government order on Feb 24 to community workarounds on Feb 28, here is everything that happened." />
	<meta name="keywords" content="supabase india block timeline, supabase blocked india when, supabase india news, supabase india ban 2026, supabase dns block india timeline" />
	<meta property="og:title" content="Supabase India: Complete Timeline of the Block (Feb 2026)" />
	<meta property="og:description" content="A day-by-day timeline of the Supabase block in India. From the first government order to community workarounds." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Supabase India: Complete Timeline of the Block (Feb 2026)" />
	<meta name="twitter:description" content="Day-by-day timeline of the Supabase DNS block in India. Every event, every response, every workaround." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="india" />
	<meta property="article:tag" content="timeline" />
	<meta property="article:tag" content="dns block" />
	<link rel="canonical" href="https://jiobase.com/blog/supabase-india-block-timeline" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Supabase India: Complete Timeline of the Block (Feb 2026)","description":"A day-by-day timeline of the Supabase block in India. From the first government order on Feb 24 to community workarounds on Feb 28, here is everything that happened.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/supabase-india-block-timeline"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Supabase India Block Timeline (Feb 2026)"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"When exactly did the Supabase block start?","acceptedAnswer":{"@type":"Answer","text":"The blocking order was issued on February 24, 2026, under Section 69A of the IT Act. ISPs began implementing the DNS block on the same day. Most developers noticed on February 25."}},{"@type":"Question","name":"Is Supabase still blocked in India as of today?","acceptedAnswer":{"@type":"Answer","text":"Yes. As of February 28, 2026, the block remains fully active on Jio, Airtel, and ACT Fibernet. There is no confirmed timeline for when it will be lifted."}},{"@type":"Question","name":"Why did Supabase delete the post tagging India's IT Minister?","acceptedAnswer":{"@type":"Answer","text":"No official reason was given. It is common for companies to adjust their public communication strategy when dealing with government actions in jurisdictions with significant user bases."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Timeline</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>7 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Supabase India: Complete Timeline of the Block (Feb 2026)
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			A complete timeline of the Supabase block in India - from the first reports to the global news coverage. Here is every key event, day by day.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: The Timeline ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The timeline</h2>

		<p class="mb-8 leading-relaxed text-gray-300">
			The Supabase block in India did not happen with a single announcement. It unfolded over five days, starting with a quiet government order and escalating into a full-blown crisis for thousands of Indian developers. Here is how it played out.
		</p>

		<!-- Day 1: Feb 24 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5 text-sm font-bold text-blue-400">24</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Monday, February 24</h3>
					<p class="text-xs text-gray-500">The order drops</p>
				</div>
			</div>
			<div class="ml-[52px] space-y-3">
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						A government order is issued under <strong class="text-gray-200">Section 69A of the Information Technology Act</strong>. The order directs Indian ISPs to block access to all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. As with all 69A orders, the directive is confidential. No public announcement is made.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">ISPs begin DNS-blocking.</strong> Jio, Airtel, and ACT Fibernet start poisoning DNS responses for <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, returning sinkhole IP addresses instead of Supabase's real servers. Apps that depend on Supabase begin failing silently. Users see <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> errors without any explanation.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Scattered reports appear on developer Slack channels and Discord servers. Most developers initially assume the issue is on Supabase's end or a local network problem. Few suspect an ISP-level block at this point.
					</p>
				</div>
			</div>
		</div>

		<!-- Day 2: Feb 25 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5 text-sm font-bold text-blue-400">25</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Tuesday, February 25</h3>
					<p class="text-xs text-gray-500">Reports flood social media</p>
				</div>
			</div>
			<div class="ml-[52px] space-y-3">
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Developer reports flood social media. X (formerly Twitter) sees dozens of posts from Indian developers reporting broken apps. The Supabase community forums light up with threads from India-based developers asking why their projects have stopped working.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">Pattern recognition kicks in.</strong> Developers start comparing notes across ISPs. When reports come in from Jio, Airtel, and ACT Fibernet users simultaneously, the community begins to suspect a coordinated DNS block rather than a Supabase outage. Developers run <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">nslookup</code> and confirm sinkhole IPs.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Early workaround discussions begin. Some developers try switching to public DNS resolvers like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>. Results are inconsistent. The fix works for some ISPs but not others, likely due to Deep Packet Inspection (DPI) blocking at the SNI level.
					</p>
				</div>
			</div>
		</div>

		<!-- Day 3: Feb 26 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5 text-sm font-bold text-blue-400">26</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Wednesday, February 26</h3>
					<p class="text-xs text-gray-500">Supabase responds</p>
				</div>
			</div>
			<div class="ml-[52px] space-y-3">
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">Supabase officially acknowledges the block.</strong> The Supabase team confirms on their community channels that Indian ISPs are blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> and that they are investigating the situation.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Supabase posts on X tagging India's IT Minister <strong class="text-gray-200">Ashwini Vaishnaw</strong>, asking for clarification on the block. The post gains significant traction in the Indian developer community. Shortly after, the post is deleted. No official explanation is given for why it was removed.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Supabase recommends reverse proxying as a workaround. Developers begin experimenting with Cloudflare Workers and Nginx reverse proxies to route traffic through unblocked domains.
					</p>
				</div>
			</div>
		</div>

		<!-- Day 4: Feb 27 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5 text-sm font-bold text-blue-400">27</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Thursday, February 27</h3>
					<p class="text-xs text-gray-500">Global coverage</p>
				</div>
			</div>
			<div class="ml-[52px] space-y-3">
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">TechCrunch, MediaNama, and other outlets publish coverage.</strong> The story goes global. Articles detail the impact on Indian developers and the broader implications of blocking developer infrastructure.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Key data points emerge: <strong class="text-gray-200">India represents approximately 9% of Supabase's global traffic</strong>, making it the 4th largest market for the platform. Supabase's valuation is reported at roughly <strong class="text-gray-200">$5 billion</strong>. The block affects thousands of production applications serving millions of Indian end users.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Developer advocacy organizations including the Internet Freedom Foundation (IFF) begin tracking the block. Comparisons are drawn to previous blocks on GitHub, Medium, Pastebin, and other developer tools.
					</p>
				</div>
			</div>
		</div>

		<!-- Day 5: Feb 28 -->
		<div>
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">28</div>
				<div>
					<h3 class="text-lg font-semibold text-white">Friday, February 28</h3>
					<p class="text-xs text-gray-500">Block persists, workarounds solidify</p>
				</div>
			</div>
			<div class="ml-[52px] space-y-3">
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">The block remains fully active.</strong> No sign of the government order being reversed. ISPs continue to enforce DNS poisoning on all <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> subdomains.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						<strong class="text-gray-200">Community workarounds mature.</strong> Reverse proxy solutions become the accepted approach. Developers share Cloudflare Worker configurations, DNS switching guides, and VPN recommendations. Managed proxy services like <a href="/" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> emerge to provide ready-to-use solutions.
					</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm leading-relaxed text-gray-400">
						Indian startup founders voice concerns about the reliability of cloud infrastructure in India. The block has prompted discussions about building resilient architecture that does not depend on any single domain remaining accessible.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: What is blocked vs what is not ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What is blocked vs what is not</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The block is targeted at a specific domain. Understanding the distinction is important for diagnosing and fixing the problem.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Blocked</span>
				</div>
				<p class="mb-2 font-mono text-sm text-red-400">*.supabase.co</p>
				<p class="text-sm text-gray-400">All project API endpoints. This includes REST API (PostgREST), Authentication, Storage, Edge Functions, GraphQL, and Realtime WebSockets. Every production app that calls Supabase is affected.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Not blocked</span>
				</div>
				<p class="mb-2 font-mono text-sm text-brand-400">supabase.com</p>
				<p class="text-sm text-gray-400">The marketing website, documentation, and dashboard. You can still log in to Supabase, view your projects, manage settings, and read docs. You just cannot reach the API from within India.</p>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">This creates a confusing situation.</strong> Developers can access the Supabase dashboard and see their project running normally. But their production app cannot reach the API. If you are not aware of the block, this looks like a bug in your code or a Supabase outage, when it is neither.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 3: ISPs enforcing the block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">ISPs enforcing the block</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The block has been confirmed across the largest Indian ISPs. Together, these providers cover the vast majority of internet users in the country.
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">J</span>
				</div>
				<div>
					<p class="font-semibold text-white">Reliance Jio</p>
					<p class="text-sm text-gray-400">Approximately 500 million subscribers. India's largest ISP. Block confirmed on both 4G/5G mobile networks and JioFiber broadband connections.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">Bharti Airtel</p>
					<p class="text-sm text-gray-400">Over 380 million subscribers. Block confirmed on Airtel broadband and mobile data. Both prepaid and postpaid connections are affected.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">ACT Fibernet</p>
					<p class="text-sm text-gray-400">Regional broadband provider popular among developers. Block confirmed across multiple cities including Bangalore, Hyderabad, and Chennai.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
					<span class="text-lg font-bold text-amber-400">B</span>
				</div>
				<div>
					<p class="font-semibold text-white">BSNL</p>
					<p class="text-sm text-gray-400">Government-owned ISP. Already blocking Firebase since August 2025. Supabase block status on BSNL is being confirmed. BSNL users may face blocks on both Firebase and Supabase simultaneously.</p>
				</div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			Reports from Vi (Vodafone Idea) and smaller regional ISPs are still emerging. If you are experiencing Supabase connectivity issues on any Indian ISP, you can <a href="/blog/test-if-backend-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">run a quick diagnostic test</a> to confirm whether it is an ISP block.
		</p>
	</section>


	<!-- ===== Section 4: Why this matters ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why this matters</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The Supabase block is not just a technical inconvenience. It has significant implications for India's developer ecosystem and the startups built on Supabase.
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-blue-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
					<span class="text-sm font-semibold">India is 9% of Supabase's global traffic</span>
				</div>
				<p class="text-sm text-gray-400">India is Supabase's 4th largest market worldwide. That translates to tens of thousands of active projects and an unknown number of production applications serving Indian end users.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-blue-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
					<span class="text-sm font-semibold">Thousands of production apps affected</span>
				</div>
				<p class="text-sm text-gray-400">Every app that uses Supabase for its backend broke overnight. SaaS products, mobile apps, internal tools, MVPs, hackathon projects, student applications, and freelance client work all went dark on Indian networks.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-blue-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Startups broken overnight</span>
				</div>
				<p class="text-sm text-gray-400">Early-stage startups that chose Supabase as their backend found their products completely non-functional for Indian users. For companies with paying customers, every hour of downtime means lost revenue and damaged trust. Some founders discovered the issue only when customers reported the app was not working.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-blue-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
					<span class="text-sm font-semibold">Developer trust eroded</span>
				</div>
				<p class="text-sm text-gray-400">The block raises a fundamental question: can Indian developers rely on international cloud services? If Supabase can be blocked today, other platforms could follow. This uncertainty makes it harder for developers to commit to any single backend provider.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 5: Verifying the block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How to verify the block on your network</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			If you suspect your network is affected, run this quick DNS lookup from your terminal:
		</p>

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
				<div class="text-red-400">Address:  49.44.79.236  <span class="text-gray-500">&larr; sinkhole IP (ISP block confirmed)</span></div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			If the returned IP address starts with <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.x.x</code> instead of a legitimate Supabase server IP, your ISP is DNS-poisoning the domain. For a more thorough diagnostic, check our <a href="/blog/test-if-backend-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">complete ISP block testing guide</a>.
		</p>

		<p class="leading-relaxed text-gray-300">
			You can also compare results by querying a public DNS directly:
		</p>

		<div class="code-block mt-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Compare ISP DNS vs Cloudflare's public DNS</div>
				<div class="mt-2 text-gray-400">$ nslookup yourproject.supabase.co</div>
				<div class="text-red-400">Address: 49.44.79.236  <span class="text-gray-500">&larr; ISP (sinkhole)</span></div>
				<div class="mt-3 text-gray-400">$ nslookup yourproject.supabase.co 1.1.1.1</div>
				<div class="text-brand-400">Address: 13.233.x.x   <span class="text-gray-500">&larr; Cloudflare DNS (real IP)</span></div>
			</div>
		</div>
	</section>


	<!-- ===== Section 6: The fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The fix: reverse proxy through Cloudflare</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The most reliable solution is to route your Supabase traffic through a domain that is not blocked. A reverse proxy sits between your app and Supabase, forwarding requests through an unblocked domain on Cloudflare's global edge network.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			<a href="/" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> is a managed reverse proxy that does this for you. Instead of setting up your own Cloudflare Worker, configuring DNS, handling CORS, and managing WebSocket upgrades, you get a ready-to-use proxy endpoint.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The setup takes less than five minutes:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">1</div>
					<h3 class="text-sm font-semibold text-white">Sign up at JioBase</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Create a free account at <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. No credit card required.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">2</div>
					<h3 class="text-sm font-semibold text-white">Create a proxy app</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Enter your Supabase project URL and choose a slug. You will get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">3</div>
					<h3 class="text-sm font-semibold text-white">Swap the URL in your code</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Replace <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> with your JioBase proxy URL. Your API keys stay the same.</p>
			</div>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			For a detailed walkthrough with code examples, read our <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">complete fix guide</a>. If you prefer to self-host, use our <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator</a> to create a ready-to-deploy Cloudflare Worker.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">When exactly did the Supabase block start?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					The blocking order was issued on February 24, 2026, under Section 69A of the IT Act. ISPs began implementing the DNS block on the same day. Most developers first noticed the issue on February 25 when their production apps started failing on Jio, Airtel, and ACT Fibernet networks.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Is Supabase still blocked in India as of today?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes. As of February 28, 2026, the block remains fully active on Jio, Airtel, and ACT Fibernet. There is no confirmed timeline for when it will be lifted. Using a <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">reverse proxy</a> is the recommended approach for production applications.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Why did Supabase delete the post tagging India's IT Minister?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					No official reason was given. It is common for companies to adjust their public communication strategy when dealing with government actions, especially in jurisdictions where the company has significant user bases. Supabase has continued to engage with Indian authorities through private channels.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Do not wait for the block to be lifted
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				History shows that ISP blocks in India can persist for months or years. Get your Supabase-powered app working again in under five minutes with JioBase.
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
					Read the full fix guide
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="supabase-india-block-timeline" suggestedSlugs={["supabase-blocked-india-fix", "why-supabase-banned-india-section-69a", "firebase-supabase-blocked-india"]} />
</article>
