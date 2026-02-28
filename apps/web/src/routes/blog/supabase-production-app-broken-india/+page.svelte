<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Your Production App Just Broke: Emergency Guide for Supabase Block in India | JioBase</title>
	<meta name="description" content="Your Supabase-powered app just stopped working for Indian users. Emergency triage guide with quick diagnosis, what NOT to do, and a 15-minute fix with code examples." />
	<meta name="keywords" content="supabase production app broken india, supabase app not working india, supabase down india fix, supabase emergency fix india, supabase timeout india" />
	<meta property="og:title" content="Your Production App Just Broke: Emergency Guide for Supabase Block in India" />
	<meta property="og:description" content="Your Supabase app stopped working for Indian users. Emergency triage guide with diagnosis, code examples, and a 15-minute fix." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Your Production App Just Broke: Emergency Guide for Supabase Block in India" />
	<meta name="twitter:description" content="Emergency triage guide for Supabase block in India. Quick diagnosis, 15-minute fix, production migration checklist." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="emergency" />
	<meta property="article:tag" content="production" />
	<meta property="article:tag" content="india" />
	<link rel="canonical" href="https://jiobase.com/blog/supabase-production-app-broken-india" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Your Production App Just Broke: Emergency Guide for Supabase Block in India","description":"Your Supabase-powered app just stopped working for Indian users. Emergency triage guide with quick diagnosis, what NOT to do, and a 15-minute fix with code examples.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/supabase-production-app-broken-india"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Emergency Guide for Supabase Block in India"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"My app works on my laptop but users in India are reporting it is broken. What is happening?","acceptedAnswer":{"@type":"Answer","text":"You are likely on a different ISP, using a VPN, or have custom DNS. Indian users on Jio, Airtel, or ACT Fibernet are hitting the DNS block. Route traffic through a reverse proxy to fix it."}},{"@type":"Question","name":"I have a mobile app already in production. How do I fix it for existing users?","acceptedAnswer":{"@type":"Answer","text":"If the Supabase URL is hardcoded, you will need to push a new app release. For the future, store the URL in remote config so you can change it without an app update."}},{"@type":"Question","name":"Will the proxy add latency to my API calls?","acceptedAnswer":{"@type":"Answer","text":"Minimal. JioBase runs on Cloudflare's edge network with 300+ locations, adding typically 1-5ms of overhead. Far better than the infinite timeout users currently experience."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-red-500/20 bg-red-500/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Emergency</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>6 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Your Production App Just Broke: Emergency Guide for Supabase Block in India
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Your Supabase-powered app just stopped working for Indian users. Here is the emergency triage guide. Diagnose the problem in 60 seconds, avoid the common mistakes, and get your app running again in 15 minutes.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: Quick diagnosis ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Is it the block? Quick diagnosis</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Before you start debugging your code or checking Supabase status pages, run these three quick checks. If all three match, your ISP is blocking Supabase.
		</p>

		<!-- Check 1 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">1</div>
				<h3 class="text-lg font-semibold">Check if supabase.com loads but your API calls time out</h3>
			</div>
			<div class="ml-11">
				<p class="mb-4 leading-relaxed text-gray-400">
					Open <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> in your browser. If the Supabase website loads normally but your app's API calls are failing with timeout errors, this is a strong indicator of the ISP block. The block targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> (the API domain), not <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code> (the marketing site).
				</p>
				<div class="glass-card rounded-xl p-4">
					<div class="flex items-center gap-3 text-sm">
						<span class="text-brand-400">supabase.com loads?</span>
						<span class="text-gray-500">+</span>
						<span class="text-red-400">API calls timing out?</span>
						<span class="text-gray-500">=</span>
						<span class="font-semibold text-amber-400">Likely ISP block</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Check 2 -->
		<div class="mb-6">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">2</div>
				<h3 class="text-lg font-semibold">Run nslookup and check for sinkhole IPs</h3>
			</div>
			<div class="ml-11">
				<p class="mb-4 leading-relaxed text-gray-400">
					Open your terminal and run the following command, replacing the project ID with your actual Supabase project:
				</p>
				<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">terminal</span>
					</div>
					<div class="px-6 pb-5 font-mono text-sm leading-7">
						<div class="text-gray-500">$ nslookup yourproject.supabase.co</div>
						<div class="mt-2 text-gray-400">Name:     yourproject.supabase.co</div>
						<div class="text-red-400">Address:  49.44.79.236  <span class="text-gray-500">&larr; sinkhole IP</span></div>
					</div>
				</div>
				<p class="leading-relaxed text-gray-400">
					If the resolved IP starts with <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">49.44.x.x</code>, that is a sinkhole IP. Your ISP is returning a fake address instead of Supabase's real server. This confirms DNS poisoning.
				</p>
			</div>
		</div>

		<!-- Check 3 -->
		<div>
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">3</div>
				<h3 class="text-lg font-semibold">Test from a VPN</h3>
			</div>
			<div class="ml-11">
				<p class="leading-relaxed text-gray-400">
					Enable a VPN that routes through a non-Indian server and try your app again. If it works through the VPN but fails without it, the ISP block is confirmed. This is the definitive test because the VPN bypasses the ISP's DNS entirely.
				</p>
			</div>
		</div>

		<div class="mt-6 glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">All three checks point to the block?</strong> Skip the debugging. Your code is fine. Supabase is fine. The problem is between your users and Supabase's servers. Jump to the <a href="#emergency-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">emergency fix</a> below.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 2: What NOT to do ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What NOT to do</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			When your production app goes down, the instinct is to try anything to get it back up. Here are the three most common panic reactions that will waste your time or make things worse.
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Do not panic-migrate to Firebase</span>
				</div>
				<p class="text-sm text-gray-400">
					Firebase is <strong class="text-gray-200">also blocked on BSNL</strong> since August 2025. Migrating your entire backend to Firebase could take days or weeks, and you might end up with the same problem on a different ISP. The issue is ISP-level DNS blocking, not a Supabase-specific problem. Switching backends does not solve it. For a full comparison of alternatives, read our <a href="/blog/supabase-alternatives-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Supabase alternatives guide</a>.
				</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Do not tell users to use a VPN</span>
				</div>
				<p class="text-sm text-gray-400">
					A VPN works for you as a developer. It does not work as a solution for your users. You cannot expect 500 million Jio subscribers to install a VPN app just to use your product. Most will leave and never come back. The fix needs to be invisible to your end users.
				</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Do not switch DNS and think it is fixed</span>
				</div>
				<p class="text-sm text-gray-400">
					Changing your local DNS to <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">8.8.8.8</code> might unblock Supabase on your development machine. But your production users are still on their ISP's default DNS. The DNS change only helps you, not your customers. Some ISPs also use Deep Packet Inspection that blocks connections regardless of DNS.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 3: Emergency fix ===== -->
	<section class="mb-14" id="emergency-fix">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Emergency fix: swap your Supabase URL (15 minutes)</h2>

		<p class="mb-8 leading-relaxed text-gray-300">
			The fix is to route your Supabase traffic through a domain that is not blocked. Here is the fastest path to get your production app working again.
		</p>

		<!-- Step 1 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<h3 class="text-lg font-semibold">Sign up at JioBase</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Go to <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. Create a free account. Takes 30 seconds.
			</p>
		</div>

		<!-- Step 2 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<h3 class="text-lg font-semibold">Create a proxy app</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Click "New App" and enter your Supabase project URL (for example, <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://abcdefgh.supabase.co</code>) and pick a slug. You will get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.
			</p>
		</div>

		<!-- Step 3 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<h3 class="text-lg font-semibold">Swap the URL in your config</h3>
			</div>
			<p class="ml-11 mb-4 leading-relaxed text-gray-400">
				Find your Supabase client initialization and change the URL. That is the only change. Your API keys, RLS policies, and all other configuration stays exactly the same.
			</p>
		</div>

		<!-- Step 4: Code examples -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
				<h3 class="text-lg font-semibold">Code examples by framework</h3>
			</div>
			<div class="ml-11 space-y-6">

				<!-- .env file -->
				<div>
					<p class="mb-2 text-sm font-medium text-gray-400">Environment variable (all frameworks):</p>
					<div class="code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">.env</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div class="text-gray-500"># Before (blocked)</div>
							<div><span class="text-red-400 line-through opacity-60">NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co</span></div>
							<div class="mt-3 text-gray-500"># After (works everywhere)</div>
							<div><span class="text-brand-400">NEXT_PUBLIC_SUPABASE_URL=https://myapp.jiobase.com</span></div>
							<div class="mt-3 text-gray-500"># Key stays the same</div>
							<div><span class="text-gray-300">NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key</span></div>
						</div>
					</div>
				</div>

				<!-- Next.js -->
				<div>
					<p class="mb-2 text-sm font-medium text-gray-400">Next.js / React:</p>
					<div class="code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
							<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
							<div>  <span class="text-gray-300">process.env.</span><span class="text-brand-400">NEXT_PUBLIC_SUPABASE_URL</span><span class="text-gray-300">!,</span></div>
							<div>  <span class="text-gray-300">process.env.</span><span class="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</span><span class="text-gray-300">!</span></div>
							<div><span class="text-gray-300">)</span></div>
						</div>
					</div>
				</div>

				<!-- Flutter -->
				<div>
					<p class="mb-2 text-sm font-medium text-gray-400">Flutter / Dart:</p>
					<div class="code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">main.dart</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">await</span> <span class="text-blue-300">Supabase</span><span class="text-gray-300">.</span><span class="text-yellow-200">initialize</span><span class="text-gray-300">(</span></div>
							<div>  <span class="text-gray-400">url:</span> <span class="text-brand-400">'https://myapp.jiobase.com'</span><span class="text-gray-300">,</span></div>
							<div>  <span class="text-gray-400">anonKey:</span> <span class="text-amber-300">'your-anon-key'</span><span class="text-gray-300">,</span></div>
							<div><span class="text-gray-300">);</span></div>
						</div>
					</div>
				</div>

				<!-- SvelteKit -->
				<div>
					<p class="mb-2 text-sm font-medium text-gray-400">SvelteKit:</p>
					<div class="code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">src/lib/supabase.ts</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
							<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'$env/static/public'</span></div>
							<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
							<div>  <span class="text-brand-400">PUBLIC_SUPABASE_URL</span><span class="text-gray-300">,</span></div>
							<div>  <span class="text-amber-300">PUBLIC_SUPABASE_ANON_KEY</span></div>
							<div><span class="text-gray-300">)</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">No SDK changes needed.</strong> The Supabase client library sends standard HTTP requests and WebSocket connections to whatever URL you provide. JioBase transparently forwards everything to your actual Supabase project. Your anon key, service role key, RLS policies, and all other configuration stays the same.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 4: Production migration checklist ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Production migration checklist</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Swapping the URL in your main codebase is the first step, but production apps have multiple touchpoints. Go through this checklist to make sure you have covered everything.
		</p>

		<div class="space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">1</span>
				</div>
				<div>
					<p class="font-semibold text-white">Environment variables</p>
					<p class="text-sm text-gray-400">Update <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">SUPABASE_URL</code> (or <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">NEXT_PUBLIC_SUPABASE_URL</code>, <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">VITE_SUPABASE_URL</code>, etc.) in all environments: development, staging, and production. Check <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">.env</code>, <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">.env.local</code>, <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">.env.production</code>.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">2</span>
				</div>
				<div>
					<p class="font-semibold text-white">CI/CD pipeline secrets</p>
					<p class="text-sm text-gray-400">If your CI/CD pipeline (GitHub Actions, Vercel, Netlify, Railway, etc.) has the Supabase URL as a secret or environment variable, update it there too. Deployments that pull from CI secrets will use the old URL otherwise.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">3</span>
				</div>
				<div>
					<p class="font-semibold text-white">Mobile app releases</p>
					<p class="text-sm text-gray-400">If you have a mobile app (React Native, Flutter, native iOS/Android) that has the Supabase URL compiled into the binary, you will need to publish a new app store release. Until users update, they will still hit the blocked URL. Use a remote config or environment variable pattern to avoid this problem in the future.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">4</span>
				</div>
				<div>
					<p class="font-semibold text-white">Realtime subscriptions</p>
					<p class="text-sm text-gray-400">If your app uses Supabase Realtime (database subscriptions, presence, broadcast), verify that WebSocket connections are working through the proxy. JioBase supports full WebSocket proxying. Test your subscription channels after the swap.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">5</span>
				</div>
				<div>
					<p class="font-semibold text-white">Storage URLs</p>
					<p class="text-sm text-gray-400">If you are generating signed URLs for Supabase Storage files, those URLs include the <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.co</code> domain. You may need to update how you generate or serve these URLs. If your app constructs Storage URLs using the Supabase client, they will automatically use the proxy URL.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">6</span>
				</div>
				<div>
					<p class="font-semibold text-white">Server-side code and Edge Functions</p>
					<p class="text-sm text-gray-400">If you call Supabase from server-side code (API routes, serverless functions, cron jobs), check whether those servers are hosted in India. If they run on Indian infrastructure, they are also affected by the block and need the proxy URL.</p>
				</div>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<div class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20">
					<span class="text-xs text-gray-500">7</span>
				</div>
				<div>
					<p class="font-semibold text-white">Hardcoded URLs in codebase</p>
					<p class="text-sm text-gray-400">Search your entire codebase for <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.co</code>. Check for hardcoded URLs in configuration files, seed scripts, migration scripts, webhook endpoints, or documentation.</p>
				</div>
			</div>
		</div>

		<div class="code-block mt-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div class="text-gray-500"># Find all hardcoded Supabase URLs in your project</div>
				<div class="text-gray-400">$ grep -r "supabase\.co" . --include="*.ts" --include="*.tsx" \</div>
				<div class="text-gray-400">    --include="*.js" --include="*.jsx" --include="*.env*" \</div>
				<div class="text-gray-400">    --include="*.dart" --include="*.swift" --include="*.kt"</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 5: Why DNS alone doesn't fix production ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why DNS change alone does not fix production</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			It is tempting to think that switching your DNS to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code> solves the problem. It might unblock Supabase on your development machine. But here is why it does nothing for your production users:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Your users do not control their DNS.</strong> When a user opens your app on their Jio mobile or Airtel broadband, their device uses the ISP's DNS by default. They are not going to open network settings and change DNS servers. Most do not even know what DNS is.
				</p>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Mobile DNS changes require root or apps.</strong> On Android, changing DNS system-wide requires either root access or a DNS changer app that creates a local VPN. On iOS, DNS can be changed per-network but resets frequently. Neither option is realistic for end users.
				</p>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Some ISPs block third-party DNS too.</strong> Certain ISPs use Deep Packet Inspection (DPI) to inspect TLS handshakes. Even if DNS resolves correctly, the ISP sees the Server Name Indication (SNI) field containing <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.co</code> and blocks the connection.
				</p>
			</div>

			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">DNS requests can be hijacked.</strong> Some ISPs intercept DNS queries to <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">1.1.1.1</code> and <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">8.8.8.8</code> at the network level, redirecting them to the ISP's own resolver. Even DNS over HTTPS (DoH) may not work if the ISP blocks the DoH endpoints.
				</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			A reverse proxy solves the problem at the infrastructure level. Your users connect to <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>, which is not blocked. The proxy forwards requests to Supabase server-side, outside the reach of ISP blocks. No user-side configuration needed. For a deeper technical explanation, read our <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">complete fix guide</a>.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">My app works on my laptop but users in India are reporting it is broken. What is happening?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					You are likely on a different ISP, using a VPN, or have custom DNS configured on your machine. Your Indian users on Jio, Airtel, or ACT Fibernet are hitting the DNS block. Their ISP is returning a sinkhole IP for <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code>, so the connection times out. The fix is to route traffic through a reverse proxy like JioBase so the domain your users connect to is not blocked.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">I have a mobile app already in production. How do I fix it for existing users?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					If the Supabase URL is hardcoded in your app binary, you will need to push a new release to the App Store / Play Store. Until users update, they will be stuck on the blocked URL. For the future, store the Supabase URL in a remote config or environment variable so you can change it without an app update. Some teams use feature flags or remote configuration services to control the API base URL.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Will the proxy add latency to my API calls?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Minimal. JioBase runs on Cloudflare's edge network with 300+ locations worldwide. Requests are handled by the nearest edge node, adding typically 1-5ms of overhead. This is negligible compared to database query times and far better than the infinite timeout your users currently experience due to the block. Check our <a href="/blog/proxy-supabase-cloudflare-workers" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">technical deep-dive</a> for performance benchmarks.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Every minute your app is down, you are losing users
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				The block is not going away on its own. Set up JioBase in 15 minutes and get your Supabase-powered app working for every user in India. No VPN required. No DNS changes for your users. Just swap one URL.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Fix my app now
				</a>
				<a
					href="/tools/worker-generator"
					class="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Self-host a proxy instead
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="supabase-production-app-broken-india" suggestedSlugs={["fix-supabase-jio-5-minutes", "supabase-blocked-india-fix", "test-if-backend-blocked-india"]} />
</article>
