<svelte:head>
	<title>Blog - JioBase</title>
	<meta name="description" content="Technical guides, tutorials, and insights about bypassing Supabase DNS blocks in India using Cloudflare Workers." />
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
	</div>
</div>
