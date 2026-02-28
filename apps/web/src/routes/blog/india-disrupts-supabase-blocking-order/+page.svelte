<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>India Disrupts Access to Supabase with Government Blocking Order | JioBase</title>
	<meta name="description" content="India's government has disrupted access to Supabase with a blocking order under Section 69A of the IT Act. Major ISPs including Jio, Airtel, and ACT Fibernet are DNS-blocking *.supabase.co, breaking thousands of production apps." />
	<meta name="keywords" content="india disrupts supabase, supabase blocking order india, supabase blocked india, section 69A supabase, supabase india government block, supabase dns block india" />
	<meta property="og:title" content="India Disrupts Access to Supabase with Government Blocking Order" />
	<meta property="og:description" content="India's government has disrupted access to Supabase through a Section 69A blocking order. Major ISPs are now DNS-blocking the platform, breaking thousands of production apps." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="India Disrupts Access to Supabase with Government Blocking Order" />
	<meta name="twitter:description" content="India's government has disrupted access to Supabase through a blocking order. ISPs including Jio and Airtel are DNS-blocking *.supabase.co, breaking production apps." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="india" />
	<meta property="article:tag" content="blocking order" />
	<meta property="article:tag" content="section 69A" />
	<link rel="canonical" href="https://jiobase.com/blog/india-disrupts-supabase-blocking-order" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Article",
				"headline": "India Disrupts Access to Supabase with Government Blocking Order",
				"description": "India's government has disrupted access to Supabase with a blocking order under Section 69A of the IT Act. Major ISPs including Jio, Airtel, and ACT Fibernet are DNS-blocking *.supabase.co, breaking thousands of production apps.",
				"datePublished": "2026-02-28T00:00:00+05:30",
				"dateModified": "2026-02-28T00:00:00+05:30",
				"author": { "@type": "Person", "name": "Sunith VS", "url": "https://sunithvs.com" },
				"publisher": { "@id": "https://jiobase.com/#organization" },
				"url": "https://jiobase.com/blog/india-disrupts-supabase-blocking-order",
				"mainEntityOfPage": "https://jiobase.com/blog/india-disrupts-supabase-blocking-order",
				"keywords": ["india disrupts supabase", "supabase blocking order india", "supabase blocked india", "section 69A supabase"]
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://jiobase.com/blog" },
					{ "@type": "ListItem", "position": 3, "name": "India Disrupts Access to Supabase with Government Blocking Order" }
				]
			},
			{
				"@type": "FAQPage",
				"mainEntity": [
					{
						"@type": "Question",
						"name": "Why did the Indian government block Supabase?",
						"acceptedAnswer": { "@type": "Answer", "text": "No official reason has been disclosed. Section 69A blocking orders are confidential, and ISPs are legally prohibited from revealing why a domain was blocked." }
					},
					{
						"@type": "Question",
						"name": "Can I just change my DNS to 1.1.1.1 or 8.8.8.8 to fix this?",
						"acceptedAnswer": { "@type": "Answer", "text": "Changing your own DNS resolver may restore access on your development machine on some ISPs, but it will not fix the problem for your end users. For production apps, a reverse proxy is the correct solution." }
					},
					{
						"@type": "Question",
						"name": "Is using a reverse proxy to bypass the block legal?",
						"acceptedAnswer": { "@type": "Answer", "text": "Section 69A blocking orders instruct ISPs to block specific domains. Using a reverse proxy routes traffic through a different domain, similar to how CDNs and load balancers work. There is no Indian law that prohibits the use of proxy servers for legitimate application traffic." }
					},
					{
						"@type": "Question",
						"name": "Is Firebase also blocked in India?",
						"acceptedAnswer": { "@type": "Answer", "text": "Firebase has been blocked on BSNL since August 2025. Multiple Firebase services are unreachable on BSNL and some regional ISPs." }
					},
					{
						"@type": "Question",
						"name": "Will the Supabase block be lifted?",
						"acceptedAnswer": { "@type": "Answer", "text": "There is no way to know. Some Indian internet blocks have been lifted within weeks, while others have persisted for years. Developers should implement a proxy solution now." }
					},
					{
						"@type": "Question",
						"name": "Could JioBase itself get blocked?",
						"acceptedAnswer": { "@type": "Answer", "text": "JioBase supports custom domains, so you can use your own domain as the proxy endpoint. This removes dependency on any single third-party domain." }
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
			<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">News</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>6 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			India Disrupts Access to Supabase with Government Blocking Order
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			A government blocking order issued under Section 69A of the IT Act has disrupted access to Supabase across India's largest ISPs. Thousands of production apps are broken, startups are scrambling, and developers are searching for answers.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: What happened ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What happened</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Around February 24, 2026, India's Ministry of Electronics and Information Technology (MeitY) issued a blocking order under <strong class="text-white">Section 69A of the Information Technology Act, 2000</strong>. The directive instructed Indian Internet Service Providers to block access to all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, the API domain used by every Supabase-powered application.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Within hours, major ISPs began complying. Reliance Jio, Bharti Airtel, ACT Fibernet, and BSNL all started poisoning DNS responses for Supabase's API endpoints. Production applications that relied on Supabase for database queries, authentication, file storage, and realtime connections stopped functioning for Indian users overnight.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase, a $5 billion open-source Firebase alternative, found itself cut off from its 4th largest market. India accounts for approximately 9% of Supabase's global traffic, making this one of the most significant disruptions the platform has faced since its launch.
		</p>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">No public announcement was made.</strong> Like all Section 69A blocking orders, the directive is confidential. ISPs are legally prohibited from disclosing the order. Developers discovered the block only when their apps stopped working.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: The scale of disruption ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The scale of disruption</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The numbers tell the story of how far-reaching this disruption is. India is not a minor market for Supabase. It is one of the platform's core user bases.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5 text-center">
				<p class="text-3xl font-extrabold text-blue-400">~500M</p>
				<p class="mt-1 text-sm text-gray-400">Jio subscribers alone</p>
			</div>
			<div class="glass-card rounded-xl p-5 text-center">
				<p class="text-3xl font-extrabold text-blue-400">9%</p>
				<p class="mt-1 text-sm text-gray-400">of Supabase global traffic from India</p>
			</div>
			<div class="glass-card rounded-xl p-5 text-center">
				<p class="text-3xl font-extrabold text-blue-400">4th</p>
				<p class="mt-1 text-sm text-gray-400">largest market for Supabase worldwide</p>
			</div>
			<div class="glass-card rounded-xl p-5 text-center">
				<p class="text-3xl font-extrabold text-blue-400">~$5B</p>
				<p class="mt-1 text-sm text-gray-400">Supabase valuation</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The affected ISPs cover the vast majority of Indian internet users. Between Jio (approximately 500 million subscribers), Airtel, ACT Fibernet, and BSNL, almost every internet connection in the country is subject to the block. BSNL, the government-owned ISP, was already blocking Firebase since August 2025 and is now enforcing the Supabase block as well, leaving developers on BSNL with both major backend platforms unreachable.
		</p>
	</section>


	<!-- ===== Section 3: ISPs affected ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Which ISPs are enforcing the block</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The blocking order has been confirmed across India's largest internet service providers. Each ISP has implemented the block through DNS poisoning on their resolvers.
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">J</span>
				</div>
				<div>
					<p class="font-semibold text-white">Reliance Jio</p>
					<p class="text-sm text-gray-400">India's largest ISP with approximately 500 million subscribers. Block confirmed on 4G/5G mobile networks and JioFiber broadband. Jio's massive subscriber base means this single ISP alone makes Supabase unreachable for hundreds of millions of potential end users.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">Bharti Airtel</p>
					<p class="text-sm text-gray-400">Over 380 million subscribers. Block confirmed on Airtel broadband and mobile data connections. Both prepaid and postpaid users are affected.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
					<span class="text-lg font-bold text-red-400">A</span>
				</div>
				<div>
					<p class="font-semibold text-white">ACT Fibernet</p>
					<p class="text-sm text-gray-400">Popular broadband provider among developers in major metros. Block confirmed across Bangalore, Hyderabad, Chennai, and other cities where the developer community is concentrated.</p>
				</div>
			</div>

			<div class="glass-card flex items-center gap-4 rounded-xl px-5 py-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
					<span class="text-lg font-bold text-amber-400">B</span>
				</div>
				<div>
					<p class="font-semibold text-white">BSNL</p>
					<p class="text-sm text-gray-400">Government-owned ISP. Already blocking Firebase since August 2025. Now enforcing the Supabase block as well. Developers on BSNL face the worst situation with both Firebase and Supabase unreachable.</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 4: Technical mechanism ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How the block works: DNS poisoning explained</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The blocking mechanism is <strong class="text-white">DNS poisoning</strong>. When your app or browser tries to resolve a <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain, the ISP's DNS resolver returns a fake IP address (a sinkhole) instead of Supabase's real server IP. The connection attempt then times out or fails entirely.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			Critically, the block only targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> (the API domain). The marketing website at <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> remains fully accessible. This creates a confusing situation: developers can log in to the Supabase dashboard and see everything working normally, but their production apps cannot reach the API.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Blocked</span>
				</div>
				<p class="mb-2 font-mono text-sm text-red-400">*.supabase.co</p>
				<p class="text-sm text-gray-400">All project API endpoints including REST API, Auth, Storage, Edge Functions, and Realtime WebSockets.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Not blocked</span>
				</div>
				<p class="mb-2 font-mono text-sm text-brand-400">supabase.com</p>
				<p class="text-sm text-gray-400">Marketing website, documentation, and dashboard. You can still manage your project, just not reach it from India.</p>
			</div>
		</div>

		<p class="mb-6 leading-relaxed text-gray-300">
			You can verify the block on your own network with a quick DNS lookup:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Check if your ISP is poisoning Supabase DNS</div>
				<div class="mt-2 text-gray-400">$ nslookup yourproject.supabase.co</div>
				<div class="text-red-400">Address: 49.44.79.236  <span class="text-gray-500">&larr; sinkhole IP = ISP block confirmed</span></div>
				<div class="mt-3 text-gray-500"># Compare with a public DNS resolver</div>
				<div class="mt-2 text-gray-400">$ nslookup yourproject.supabase.co 1.1.1.1</div>
				<div class="text-brand-400">Address: 13.233.x.x   <span class="text-gray-500">&larr; real Supabase IP</span></div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			If your ISP DNS returns an IP in the <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.x.x</code> range while a public DNS resolver like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> returns a different IP, the block is confirmed on your network. For a more detailed diagnostic, see our <a href="/blog/test-if-backend-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">ISP block testing guide</a>.
		</p>
	</section>


	<!-- ===== Section 5: Impact on developers ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Impact on Indian developers</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The blocking order did not come with a warning. Developers discovered their apps were broken only when end users started reporting errors. The fallout has been immediate and widespread.
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Production apps broken</span>
				</div>
				<p class="text-sm text-gray-400">SaaS products, mobile apps, internal business tools, and customer-facing web applications that depend on Supabase all stopped working for Indian users. End users see <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> errors with no explanation.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
					<span class="text-sm font-semibold">Startups losing revenue</span>
				</div>
				<p class="text-sm text-gray-400">Early-stage startups that built on Supabase found their products completely non-functional. For companies with paying customers, every hour of downtime means lost revenue, damaged trust, and potential churn. Some founders discovered the issue only through angry customer emails.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
					<span class="text-sm font-semibold">Student projects and hackathons</span>
				</div>
				<p class="text-sm text-gray-400">Engineering students, bootcamp participants, and hackathon teams using Supabase for projects and assignments found their work rendered inaccessible. Projects built for portfolios and job applications stopped demonstrating correctly.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
					<span class="text-sm font-semibold">Trust in cloud infrastructure eroded</span>
				</div>
				<p class="text-sm text-gray-400">The block raises a fundamental question for every Indian developer: can you rely on international cloud platforms? If Supabase can be disrupted overnight, so can any other service. This uncertainty makes architecture decisions significantly more difficult.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 6: Supabase's response ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Supabase's response</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase acknowledged the block on their community channels and confirmed they were investigating the situation. On February 26, Supabase posted on X (formerly Twitter) publicly tagging India's IT Minister <strong class="text-white">Ashwini Vaishnaw</strong>, asking for clarity on the blocking order.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The post gained significant traction in the Indian developer community. However, it was deleted shortly afterward. No official explanation was provided for the deletion. Supabase has stated that they continue to engage with Indian government authorities through private channels.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase has recommended that developers use a reverse proxy as a workaround. The platform's own documentation now includes guidance on routing traffic through Cloudflare Workers or similar proxy infrastructure to bypass the DNS-level block.
		</p>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Context on valuation and market presence:</strong> Supabase is valued at approximately $5 billion and serves developers in over 190 countries. India at 9% of global traffic represents a significant share of Supabase's user base. The platform is the most popular open-source alternative to Firebase, making the block especially impactful given that Firebase is also blocked on BSNL.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 7: Community response and workarounds ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Community response and workarounds</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The Indian developer community mobilized quickly, sharing diagnostics and workarounds across X, Reddit, Discord, and developer forums. Several approaches emerged, but not all of them work for production applications.
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Switching DNS resolvers (limited effectiveness)</span>
				</div>
				<p class="text-sm text-gray-400">Some developers tried switching to public DNS resolvers like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code>. Results are inconsistent. This may work on some ISPs but fails on others, likely due to DNS interception or SNI-based filtering. Crucially, this only fixes it for your own machine. Your end users still cannot reach Supabase.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-amber-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
					<span class="text-sm font-semibold">Using a VPN (not viable for production)</span>
				</div>
				<p class="text-sm text-gray-400">A VPN bypasses the block for the developer's own connection, but it does nothing for end users. You cannot ask every user of your app to install and run a VPN. This is a development workaround at best, not a production solution.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Reverse proxy through Cloudflare (recommended)</span>
				</div>
				<p class="text-sm text-gray-400">The only production-grade fix. Route your Supabase traffic through an unblocked domain on Cloudflare's edge network. The DNS block targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> specifically. A proxy domain resolves normally, and the Cloudflare Worker forwards the request to Supabase server-side where there are no ISP restrictions.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 8: Why DNS change and VPN don't work for users ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why standard fixes fail your end users</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			When a developer encounters a block, the instinct is to change DNS settings or use a VPN. These approaches might restore access on your own machine, but they do nothing for the people actually using your app.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Consider the problem from the end user's perspective. A customer opens your web app or mobile app on their Jio connection. The app tries to reach <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> from their browser. Their ISP intercepts the DNS query and returns a sinkhole IP. The connection fails. The user has no idea why. They just see an error or a loading screen that never resolves.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			You cannot ask your users to change their DNS settings. You cannot require them to install a VPN. The fix has to be invisible to the end user. That is why a reverse proxy is the correct architectural solution. The user's browser connects to your proxy domain (which is not blocked), and the proxy handles the Supabase communication server-side.
		</p>

		<!-- Flow diagram -->
		<div class="glass-card mb-6 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">User's Browser</p>
					<p class="mt-1 text-xs text-gray-500">on Jio / Airtel</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">unblocked</span>
				</div>

				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
					<p class="font-semibold text-brand-400">Proxy</p>
					<p class="mt-1 text-xs text-gray-500">Cloudflare Edge</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">server-side</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Supabase</p>
					<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
				</div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The proxy makes the block invisible to your users. They connect to your proxy domain, which resolves normally on every ISP. The Cloudflare Worker on the edge receives the request and forwards it to Supabase's servers. The ISP block only applies to client-side DNS resolution, which the proxy bypasses entirely.
		</p>
	</section>


	<!-- ===== Section 9: The real fix ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The real fix: reverse proxy through Cloudflare</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			<a href="/" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> is a managed reverse proxy built on Cloudflare Workers specifically for this situation. It gives you an unblocked proxy URL that routes all Supabase traffic through Cloudflare's global edge network.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			The setup requires changing a single URL in your Supabase client initialization. Your anon key, RLS policies, database schema, authentication rules, and everything else stays exactly the same.
		</p>

		<div class="space-y-4 mb-6">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">1</div>
					<h3 class="text-sm font-semibold text-white">Create a free JioBase account</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Sign up at <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. No credit card required.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">2</div>
					<h3 class="text-sm font-semibold text-white">Add your Supabase project</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Enter your Supabase project URL and pick a slug. You get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-400/10 text-xs font-bold text-brand-400">3</div>
					<h3 class="text-sm font-semibold text-white">Update one line of code</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">Replace the Supabase URL in your client initialization. Everything else remains unchanged.</p>
			</div>
		</div>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-gray-500">// Before: blocked by Indian ISPs</span>
<span class="text-gray-500">// const supabase = createClient('https://abcdefgh.supabase.co', key)</span>

<span class="text-gray-500">// After: works on every Indian network</span>
<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,
  <span class="text-amber-300">'your-anon-key'</span>
)</code></pre>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			For step-by-step instructions with framework-specific examples, read the <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">complete fix guide</a>. If you prefer to self-host the proxy, use our <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Cloudflare Worker Generator</a> to create a deployment-ready worker in seconds. We also have a <a href="/guides/nextjs" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Next.js integration guide</a> for teams using that framework.
		</p>
	</section>


	<!-- ===== Section 10: Broader context ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">A pattern of blocking developer tools in India</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase is not the first developer platform to face a blocking order in India. The pattern of ISP-level blocks disrupting development infrastructure has been recurring:
		</p>

		<ul class="mb-6 space-y-3 text-sm leading-relaxed text-gray-400">
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60"></span>
				<span><strong class="text-gray-200">GitHub (raw.githubusercontent.com)</strong> was intermittently blocked, breaking package downloads and CI/CD pipelines</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60"></span>
				<span><strong class="text-gray-200">Firebase</strong> has been blocked on BSNL since August 2025, affecting Firestore, Cloud Functions, and Authentication</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60"></span>
				<span><strong class="text-gray-200">Pastebin</strong> has been blocked since 2017 on many ISPs, affecting code snippet sharing</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60"></span>
				<span><strong class="text-gray-200">Medium</strong> was temporarily blocked in 2020, taking thousands of programming tutorials offline</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60"></span>
				<span><strong class="text-gray-200">Telegram</strong> has faced blocks on multiple ISPs at various times, disrupting developer community channels</span>
			</li>
		</ul>

		<p class="leading-relaxed text-gray-300">
			This pattern highlights a fundamental problem: platform-level blocks punish thousands of legitimate developers and businesses because of content posted by a small number of users. The blocking order targets the entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> domain rather than specific offending projects. For a deeper analysis, read our <a href="/blog/india-blocking-developer-tools-history" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">history of developer tool blocks in India</a>.
		</p>
	</section>


	<!-- ===== Section 11: What comes next ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What comes next</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			There is no confirmed timeline for the block being lifted. Historically, some blocks in India have been temporary (Medium was unblocked after weeks), while others have persisted for years (Pastebin remains blocked since 2017). The confidential nature of Section 69A orders means there is no transparent appeals process.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase has stated they are working with Indian government officials to resolve the situation. Developer advocacy organizations including the Internet Freedom Foundation (IFF) are tracking the block. Community pressure has historically influenced the review process for blocking orders, and developers are encouraged to raise awareness through social media, elected representatives, and industry groups.
		</p>

		<p class="leading-relaxed text-gray-300">
			Regardless of when the block is lifted, the lesson for production applications is clear: your architecture should not depend on any single domain remaining accessible in every region. A reverse proxy layer ensures your app works regardless of ISP-level DNS restrictions. Build resilient infrastructure now, and you will not be caught off guard by the next blocking order.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-3">
			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Why did the Indian government block Supabase?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">No official reason has been disclosed. Section 69A blocking orders are confidential, and ISPs are legally prohibited from revealing why a domain was blocked. The most likely explanation is that specific content or projects hosted on Supabase's infrastructure violated Indian law, and the entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> domain was blocked rather than individual offending projects.</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Can I just change my DNS to 1.1.1.1 or 8.8.8.8 to fix this?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">Changing your own DNS resolver may restore access on your development machine on some ISPs, but it will not fix the problem for your end users. Your users are on ISP-provided DNS by default. You cannot ask them to change their DNS settings. For production apps, a reverse proxy is the correct solution because it makes the fix transparent to end users.</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Is using a reverse proxy to bypass the block legal?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">Section 69A blocking orders instruct ISPs to block specific domains. Using a reverse proxy routes traffic through a different domain, similar to how CDNs and load balancers work. There is no Indian law that prohibits the use of proxy servers or CDN infrastructure for legitimate application traffic. That said, this is not legal advice. Consult a qualified attorney for guidance on your specific situation.</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Is Firebase also blocked in India?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">Firebase has been blocked on BSNL since August 2025. Multiple Firebase services including Firestore, Cloud Functions, and Authentication are unreachable on BSNL and some regional ISPs. With the Supabase block now active on Jio, Airtel, and ACT Fibernet, developers on BSNL face the worst situation with both major backend platforms blocked. Read more in our <a href="/blog/firebase-supabase-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Firebase and Supabase block comparison</a>.</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Will the Supabase block be lifted?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">There is no way to know. Some Indian internet blocks have been lifted within weeks (Medium in 2020), while others have persisted for years (Pastebin since 2017, Firebase on BSNL since August 2025). Supabase is engaging with Indian authorities, but the confidential nature of 69A orders means there is no public timeline. Developers with production apps should not wait and should implement a proxy solution now.</div>
			</details>

			<details class="group glass-card mb-3 rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-white">
					Could JioBase itself get blocked?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M19 9l-7 7-7-7"/>
					</svg>
				</summary>
				<div class="px-5 pb-4 text-sm leading-relaxed text-gray-400">Any domain can theoretically be subject to a blocking order. However, JioBase is a proxy infrastructure service, not a content host. It does not store user data. JioBase also supports custom domains, so you can use your own domain as the proxy endpoint. This removes dependency on any single third-party domain. If you self-host using our <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator</a>, you have full control over the domain.</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="glass-card rounded-2xl border border-brand-400/20 p-8 text-center">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Get your Supabase app working again
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Do not wait for the blocking order to be reversed. Route your Supabase traffic through JioBase and restore access for every Indian user in under five minutes.
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

	<BlogSuggestions currentSlug="india-disrupts-supabase-blocking-order" suggestedSlugs={["supabase-blocked-india-fix", "supabase-india-block-timeline", "why-supabase-banned-india-section-69a"]} />
</article>
