<svelte:head>
	<title>Blog - JioBase</title>
	<meta name="description" content="Technical guides, tutorials, and insights about bypassing Supabase DNS blocks in India using Cloudflare Workers." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"name": "Blog - JioBase",
				"description": "Technical guides, tutorials, and insights about bypassing Supabase DNS blocks in India using Cloudflare Workers.",
				"url": "https://jiobase.com/blog",
				"publisher": { "@id": "https://jiobase.com/#organization" }
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Blog" }
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-16">
	<div class="mb-12">
		<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Blog</p>
		<h1 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
			Guides & Insights
		</h1>
		<p class="mt-3 text-gray-400">
			Technical deep-dives on Supabase proxying, DNS blocking, and building resilient apps for Indian users.
		</p>
	</div>

	<div class="space-y-8">
		<!-- Blog 1 -->
		<a href="/blog/supabase-blocked-india-fix" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Breaking</span>
				<time>February 27, 2026</time>
				<span>8 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase Blocked in India: What Happened and How to Fix It
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Indian ISPs including Jio, Airtel, and ACT Fibernet are DNS-blocking *.supabase.co following a government ministry order. Here's everything you need to know and a step-by-step guide to get your app working again.
			</p>
		</a>

		<!-- Blog 2 -->
		<a href="/blog/proxy-supabase-cloudflare-workers" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Tutorial</span>
				<time>February 27, 2026</time>
				<span>12 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				How to Proxy Supabase Through Cloudflare Workers (Step-by-Step)
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				A detailed technical tutorial on setting up a Cloudflare Worker reverse proxy for Supabase. Covers HTTP, Auth, Storage, Realtime WebSockets, CORS configuration, and production deployment.
			</p>
		</a>

		<!-- Blog 3 -->
		<a href="/blog/why-indian-developers-need-supabase-proxy" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Opinion</span>
				<time>February 27, 2026</time>
				<span>6 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Why Every Indian Developer Using Supabase Needs a Reverse Proxy
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				DNS blocks are not new in India. From Medium to GitHub to Supabase, ISP-level blocks keep breaking developer tools. Here's why a proxy layer isn't just a workaround - it's essential infrastructure.
			</p>
		</a>

		<!-- Blog 4 -->
		<a href="/blog/firebase-supabase-blocked-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Breaking</span>
				<time>February 28, 2026</time>
				<span>7 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Firebase AND Supabase Blocked in India: The Double Backend Crisis
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Firebase blocked on BSNL. Supabase blocked on Jio, Airtel, and ACT. Indian developers are running out of backends that work. Here's what happened and the one fix that works for both.
			</p>
		</a>

		<!-- Blog 5 -->
		<a href="/blog/test-if-backend-blocked-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Guide</span>
				<time>February 28, 2026</time>
				<span>5 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				How to Test if Your Backend is Blocked by Indian ISPs
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Step-by-step diagnostic guide to check if Supabase, Firebase, or any backend API is being DNS-blocked by your ISP. Includes terminal commands, browser scripts, and online tools.
			</p>
		</a>

		<!-- Blog 6 -->
		<a href="/blog/supabase-alternatives-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Comparison</span>
				<time>February 28, 2026</time>
				<span>8 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase Alternatives for Indian Developers (2026 Comparison)
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Evaluating Appwrite, Nhost, PocketBase, self-hosting, and custom backends as Supabase alternatives in India. Spoiler: switching backends does not fix the ISP block problem.
			</p>
		</a>

		<!-- Blog 7 -->
		<a href="/blog/fix-supabase-jio-5-minutes" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Quick Fix</span>
				<time>February 28, 2026</time>
				<span>3 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Fix Supabase on Jio in 5 Minutes
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Ultra-short, action-focused guide. No theory, no backstory -- just the fix. Sign up, swap one URL, deploy. Done.
			</p>
		</a>

		<!-- Blog 8 -->
		<a href="/blog/supabase-err-connection-timed-out-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Troubleshooting</span>
				<time>February 28, 2026</time>
				<span>5 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Getting timeout errors with Supabase in India? Your ISP is blocking the connection. Full technical breakdown with diagnostic commands and the fix.
			</p>
		</a>

		<!-- Blog 9 -->
		<a href="/blog/why-supabase-banned-india-section-69a" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Explainer</span>
				<time>February 28, 2026</time>
				<span>6 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Why Is Supabase Banned in India? Section 69A Explained
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Understanding the legal framework behind India's Supabase block. What Section 69A of the IT Act is, how blocking orders work, and what developers can do.
			</p>
		</a>
		<!-- Blog 10 -->
		<a href="/blog/supabase-india-block-timeline" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Timeline</span>
				<time>February 28, 2026</time>
				<span>7 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase India: Complete Timeline of the Block (Feb 2026)
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				A day-by-day timeline of the Supabase block in India. From the government order on Feb 24 to community workarounds on Feb 28, here is everything that happened.
			</p>
		</a>

		<!-- Blog 11 -->
		<a href="/blog/supabase-production-app-broken-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Emergency</span>
				<time>February 28, 2026</time>
				<span>6 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Your Production App Just Broke: Emergency Guide for Supabase Block in India
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Your Supabase-powered app stopped working for Indian users. Emergency triage guide with quick diagnosis, what NOT to do, and a 15-minute fix with code examples.
			</p>
		</a>

		<!-- Blog 12 -->
		<a href="/blog/india-blocking-developer-tools-history" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Deep Dive</span>
				<time>February 28, 2026</time>
				<span>8 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				India's History of Blocking Developer Tools: From GitHub to Supabase
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				From GitHub in 2014 to Supabase in 2026, India has a long history of blocking platforms developers depend on. Here is the full timeline and what you can do about it.
			</p>
		</a>

		<!-- Blog 13 -->
		<a href="/blog/dns-poisoning-supabase-india-explained" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">Technical</span>
				<time>February 28, 2026</time>
				<span>10 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				DNS Poisoning Explained: How Indian ISPs Block Supabase
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				A technical deep dive into how Indian ISPs use DNS poisoning and SNI inspection to block Supabase, and why a reverse proxy is the only reliable fix.
			</p>
		</a>
		<!-- Blog 14 -->
		<a href="/blog/supabase-vs-firebase-both-blocked-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Comparison</span>
				<time>February 28, 2026</time>
				<span>7 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase vs Firebase in India: Both Blocked, One Solution
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Both major BaaS platforms now face ISP blocks in India. Compare the blocks, understand why switching backends does not help, and learn the one architecture fix that works for both.
			</p>
		</a>
		<!-- Blog 15 -->
		<a href="/blog/india-disrupts-supabase-blocking-order" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-blue-400/20 bg-blue-400/5 px-2.5 py-0.5 text-xs font-medium text-blue-400">News</span>
				<time>February 28, 2026</time>
				<span>6 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				India Disrupts Access to Supabase with Government Blocking Order
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				A government blocking order under Section 69A of the IT Act has disrupted access to Supabase across India's largest ISPs. Full news coverage, timeline, and the one fix that works.
			</p>
		</a>

		<!-- Blog 16 -->
		<a href="/blog/supabase-network-connectivity-problems-india" class="group block glass-card rounded-2xl p-6 transition hover:border-white/10">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Troubleshooting</span>
				<time>February 28, 2026</time>
				<span>7 min read</span>
			</div>
			<h2 class="mt-3 text-xl font-semibold group-hover:text-brand-400 transition">
				Supabase Network Connectivity Problems in India: Causes, Diagnosis, and Fix
			</h2>
			<p class="mt-2 text-sm text-gray-400 leading-relaxed">
				Users experiencing network connectivity problems with Supabase in the India region? It is not a Supabase outage. Indian ISPs are DNS-blocking *.supabase.co. Full diagnosis and fix guide.
			</p>
		</a>
	</div>
</div>
