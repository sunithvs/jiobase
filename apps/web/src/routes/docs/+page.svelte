<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Documentation - JioBase</title>
	<meta name="description" content="Learn how to set up JioBase to proxy your Supabase traffic through Cloudflare's edge network and bypass ISP DNS blocks in India." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "TechArticle",
				"headline": "Getting Started with JioBase",
				"description": "Learn how to set up JioBase to proxy your Supabase traffic through Cloudflare's edge network and bypass ISP DNS blocks in India.",
				"url": "https://jiobase.com/docs",
				"author": { "@type": "Person", "name": "Sunith VS", "url": "https://sunithvs.com" },
				"publisher": { "@id": "https://jiobase.com/#organization" }
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Documentation" }
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a]">
	<Navbar active="docs" />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]">
	</div>

	<div class="mx-auto max-w-4xl px-6 py-16">
		<!-- Header -->
		<div class="mb-12">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Documentation</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Getting Started with JioBase</h1>
			<p class="mt-3 text-gray-400">Set up a Supabase reverse proxy in under 5 minutes. No infrastructure changes needed.</p>
		</div>

		<!-- Table of Contents -->
		<div class="mb-12 glass-card rounded-xl p-6">
			<h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">On this page</h2>
			<nav class="space-y-2 text-sm">
				<a href="#what-is-jiobase" class="block text-gray-300 transition hover:text-brand-400">What is JioBase?</a>
				<a href="#prerequisites" class="block text-gray-300 transition hover:text-brand-400">Prerequisites</a>
				<a href="#step-1" class="block text-gray-300 transition hover:text-brand-400">Step 1: Create an account</a>
				<a href="#step-2" class="block text-gray-300 transition hover:text-brand-400">Step 2: Create a proxy app</a>
				<a href="#step-3" class="block text-gray-300 transition hover:text-brand-400">Step 3: Update your Supabase client</a>
				<a href="#step-4" class="block text-gray-300 transition hover:text-brand-400">Step 4: Deploy and verify</a>
				<a href="#frameworks" class="block text-gray-300 transition hover:text-brand-400">Framework-specific guides</a>
				<a href="#features" class="block text-gray-300 transition hover:text-brand-400">Supported features</a>
				<a href="#configuration" class="block text-gray-300 transition hover:text-brand-400">Configuration options</a>
				<a href="#faq" class="block text-gray-300 transition hover:text-brand-400">FAQ</a>
				<a href="#self-host" class="block text-gray-300 transition hover:text-brand-400">Self-host your own proxy</a>
			</nav>
		</div>

		<!-- Content -->
		<div class="prose-custom space-y-14">

			<!-- What is JioBase -->
			<section id="what-is-jiobase">
				<h2 class="text-2xl font-bold tracking-tight text-white">What is JioBase?</h2>
				<p class="mt-4 leading-relaxed text-gray-300">
					JioBase is a managed reverse proxy that routes your Supabase API traffic through Cloudflare's global edge network. It was created to solve the ISP-level DNS blocking of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> in India, which affects users on Jio, Airtel, ACT Fibernet, and other ISPs.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					Instead of your app calling <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> directly (which is blocked), it calls <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">yourapp.jiobase.com</code> which routes the request through Cloudflare to Supabase transparently.
				</p>

				<!-- Flow diagram -->
				<div class="mt-6 glass-card overflow-x-auto rounded-xl p-6">
					<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
						<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
							<p class="font-semibold text-white">Your App</p>
							<p class="mt-1 text-xs text-gray-500">Browser / Client</p>
						</div>
						<div class="flex flex-col items-center gap-1">
							<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
							<span class="text-xs text-brand-400">HTTPS</span>
						</div>
						<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
							<p class="font-semibold text-brand-400">JioBase Proxy</p>
							<p class="mt-1 text-xs text-gray-500">Cloudflare Edge</p>
						</div>
						<div class="flex flex-col items-center gap-1">
							<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
							<span class="text-xs text-brand-400">HTTPS</span>
						</div>
						<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
							<p class="font-semibold text-white">Supabase</p>
							<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
						</div>
					</div>
				</div>
			</section>


			<!-- Prerequisites -->
			<section id="prerequisites">
				<h2 class="text-2xl font-bold tracking-tight text-white">Prerequisites</h2>
				<ul class="mt-4 space-y-2 text-gray-300">
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						An existing Supabase project with a project URL (e.g., <code class="text-sm text-gray-400">https://abcdefgh.supabase.co</code>)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						Your Supabase anon key (found in Project Settings &rarr; API)
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
						5 minutes of your time
					</li>
				</ul>
			</section>


			<!-- Step 1 -->
			<section id="step-1">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
					<h2 class="text-2xl font-bold tracking-tight text-white">Create an account</h2>
				</div>
				<p class="mt-4 leading-relaxed text-gray-300">
					Go to <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a> and sign up with your email address. No credit card required.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					The free tier includes <strong class="text-white">1 proxy app</strong> and <strong class="text-white">50,000 requests/month</strong>, which is enough for most development and small production apps.
				</p>
			</section>


			<!-- Step 2 -->
			<section id="step-2">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
					<h2 class="text-2xl font-bold tracking-tight text-white">Create a proxy app</h2>
				</div>
				<p class="mt-4 leading-relaxed text-gray-300">
					From your <a href="/dashboard" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">dashboard</a>, click <strong class="text-white">"New App"</strong> and fill in:
				</p>
				<div class="mt-4 space-y-4">
					<div class="glass-card rounded-xl p-5">
						<h3 class="text-sm font-semibold text-white">App Name</h3>
						<p class="mt-1 text-sm text-gray-400">A friendly label for your project. Example: <code class="text-gray-300">My SaaS App</code></p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="text-sm font-semibold text-white">Slug</h3>
						<p class="mt-1 text-sm text-gray-400">A unique identifier that becomes your proxy subdomain. Example: <code class="text-brand-400">myapp</code> &rarr; <code class="text-brand-400">myapp.jiobase.com</code></p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="text-sm font-semibold text-white">Supabase Project URL</h3>
						<p class="mt-1 text-sm text-gray-400">Your Supabase project URL from the dashboard. Example: <code class="text-gray-300">https://abcdefgh.supabase.co</code></p>
					</div>
				</div>
				<p class="mt-4 leading-relaxed text-gray-300">
					Click <strong class="text-white">"Create App"</strong> and your proxy will be active immediately.
				</p>
			</section>


			<!-- Step 3 -->
			<section id="step-3">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
					<h2 class="text-2xl font-bold tracking-tight text-white">Update your Supabase client</h2>
				</div>
				<p class="mt-4 leading-relaxed text-gray-300">
					Find where you initialize the Supabase client in your codebase and replace the URL. <strong class="text-white">This is the only change needed.</strong> Your anon key and all other configuration stays the same.
				</p>

				<!-- Before -->
				<p class="mt-6 mb-2 text-sm font-medium text-red-400">Before (blocked on Indian ISPs):</p>
				<div class="code-block overflow-x-auto rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
					</div>
					<div class="px-6 pb-5 font-mono text-sm leading-7">
						<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
						<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
						<div>  <span class="text-red-400">'https://abcdefgh.supabase.co'</span><span class="text-gray-300">,</span></div>
						<div>  <span class="text-amber-300">'your-anon-key'</span></div>
						<div><span class="text-gray-300">)</span></div>
					</div>
				</div>

				<!-- After -->
				<p class="mt-6 mb-2 text-sm font-medium text-brand-400">After (works everywhere):</p>
				<div class="code-block overflow-x-auto rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
					</div>
					<div class="px-6 pb-5 font-mono text-sm leading-7">
						<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
						<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
						<div>  <span class="text-brand-400">'https://myapp.jiobase.com'</span><span class="text-gray-300">,  </span><span class="text-gray-500">// &larr; changed</span></div>
						<div>  <span class="text-amber-300">'your-anon-key'</span>            <span class="text-gray-500">// &larr; same key</span></div>
						<div><span class="text-gray-300">)</span></div>
					</div>
				</div>

				<!-- Env example -->
				<p class="mt-6 leading-relaxed text-gray-300">
					If you use environment variables (recommended), update just the env var:
				</p>
				<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
					<div class="flex items-center gap-2 px-4 py-3">
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<div class="h-3 w-3 rounded-full bg-white/10"></div>
						<span class="ml-3 text-xs text-gray-500">.env</span>
					</div>
					<div class="px-6 pb-5 font-mono text-sm leading-7">
						<div class="text-gray-500"># Before</div>
						<div><span class="text-red-400 line-through opacity-60">SUPABASE_URL=https://abcdefgh.supabase.co</span></div>
						<div class="mt-3 text-gray-500"># After</div>
						<div><span class="text-brand-400">SUPABASE_URL=https://myapp.jiobase.com</span></div>
						<div class="mt-3 text-gray-500"># Key stays the same</div>
						<div><span class="text-gray-300">SUPABASE_ANON_KEY=your-anon-key</span></div>
					</div>
				</div>
			</section>


			<!-- Step 4 -->
			<section id="step-4">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
					<h2 class="text-2xl font-bold tracking-tight text-white">Deploy and verify</h2>
				</div>
				<p class="mt-4 leading-relaxed text-gray-300">
					Deploy your updated app. All Supabase API calls - REST queries, authentication, file storage, Realtime subscriptions - will now route through JioBase's Cloudflare proxy.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					To verify, test from a Jio or Airtel connection (or use your phone's hotspot). Your app should work without any VPN or DNS changes.
				</p>

				<div class="mt-6 glass-card rounded-xl p-5">
					<div class="flex items-start gap-3">
						<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
						<p class="text-sm leading-relaxed text-gray-400">
							<strong class="text-gray-200">Tip:</strong> Check your app's dashboard to see request counts updating in real-time. If requests are flowing through, everything is working.
						</p>
					</div>
				</div>
			</section>


			<!-- Framework guides -->
			<section id="frameworks">
				<h2 class="text-2xl font-bold tracking-tight text-white">Framework-specific guides</h2>
				<p class="mt-4 leading-relaxed text-gray-300">
					The integration is the same across all frameworks - just change the URL. Here are examples for popular stacks:
				</p>

				<!-- Next.js -->
				<div class="mt-6">
					<h3 class="text-lg font-semibold text-white">Next.js</h3>
					<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">import</span> {'{'} <span class="text-blue-300">createClient</span> {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
							<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(</div>
							<div>  <span class="text-gray-300">process.env.</span><span class="text-brand-400">NEXT_PUBLIC_SUPABASE_URL</span><span class="text-gray-500">!</span>,</div>
							<div>  <span class="text-gray-300">process.env.</span><span class="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</span><span class="text-gray-500">!</span></div>
							<div>)</div>
						</div>
					</div>
					<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">.env.local</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-brand-400">NEXT_PUBLIC_SUPABASE_URL</span>=https://myapp.jiobase.com</div>
							<div><span class="text-amber-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>=your-anon-key</div>
						</div>
					</div>
				</div>

				<!-- React / Vite -->
				<div class="mt-8">
					<h3 class="text-lg font-semibold text-white">React (Vite)</h3>
					<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">.env</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-brand-400">VITE_SUPABASE_URL</span>=https://myapp.jiobase.com</div>
							<div><span class="text-amber-300">VITE_SUPABASE_ANON_KEY</span>=your-anon-key</div>
						</div>
					</div>
				</div>

				<!-- Flutter -->
				<div class="mt-8">
					<h3 class="text-lg font-semibold text-white">Flutter / Dart</h3>
					<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">main.dart</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">await</span> <span class="text-blue-300">Supabase</span>.initialize(</div>
							<div>  url: <span class="text-brand-400">'https://myapp.jiobase.com'</span>,</div>
							<div>  anonKey: <span class="text-amber-300">'your-anon-key'</span>,</div>
							<div>);</div>
						</div>
					</div>
				</div>

				<!-- React Native -->
				<div class="mt-8">
					<h3 class="text-lg font-semibold text-white">React Native / Expo</h3>
					<div class="mt-3 code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">import</span> {'{'} <span class="text-blue-300">createClient</span> {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
							<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(</div>
							<div>  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,</div>
							<div>  <span class="text-amber-300">'your-anon-key'</span></div>
							<div>)</div>
						</div>
					</div>
				</div>
			</section>


			<!-- Features -->
			<section id="features">
				<h2 class="text-2xl font-bold tracking-tight text-white">Supported features</h2>
				<p class="mt-4 leading-relaxed text-gray-300">JioBase proxies the complete Supabase API surface:</p>

				<div class="mt-6 grid gap-3 sm:grid-cols-2">
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">REST API (PostgREST)</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">All CRUD operations, filters, joins, RPC calls</p>
					</div>
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">Authentication</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">Sign up, sign in, OAuth, magic links, password reset</p>
					</div>
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">Storage</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">File uploads, downloads, bucket management, signed URLs</p>
					</div>
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">Realtime (WebSockets)</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">Subscriptions, presence, broadcast channels</p>
					</div>
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">Edge Functions</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">Invoke Deno edge functions through the proxy</p>
					</div>
					<div class="glass-card rounded-xl p-4">
						<div class="flex items-center gap-2">
							<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<h3 class="font-medium text-white">GraphQL</h3>
						</div>
						<p class="mt-1 text-xs text-gray-400">pg_graphql queries and mutations</p>
					</div>
				</div>
			</section>


			<!-- Configuration -->
			<section id="configuration">
				<h2 class="text-2xl font-bold tracking-tight text-white">Configuration options</h2>
				<p class="mt-4 leading-relaxed text-gray-300">
					Each proxy app can be configured through the dashboard settings page:
				</p>

				<div class="mt-6 space-y-4">
					<div class="glass-card rounded-xl p-5">
						<h3 class="font-semibold text-white">Allowed Origins (CORS)</h3>
						<p class="mt-1 text-sm text-gray-400">
							Control which domains can make cross-origin requests. Set to <code class="text-gray-300">*</code> for any origin, or specify comma-separated domains like <code class="text-gray-300">https://myapp.com,https://staging.myapp.com</code>.
						</p>
					</div>

					<div class="glass-card rounded-xl p-5">
						<h3 class="font-semibold text-white">Rate Limiting</h3>
						<p class="mt-1 text-sm text-gray-400">
							Set a per-minute request limit to protect your Supabase project. Default is 600 requests/minute. Set to 0 for no limit.
						</p>
					</div>

					<div class="glass-card rounded-xl p-5">
						<h3 class="font-semibold text-white">Enabled Services</h3>
						<p class="mt-1 text-sm text-gray-400">
							Choose which Supabase services to proxy. Available: <code class="text-gray-300">rest</code>, <code class="text-gray-300">auth</code>, <code class="text-gray-300">storage</code>, <code class="text-gray-300">realtime</code>, <code class="text-gray-300">functions</code>, <code class="text-gray-300">graphql</code>. All are enabled by default.
						</p>
					</div>

					<div class="glass-card rounded-xl p-5">
						<h3 class="font-semibold text-white">App Status</h3>
						<p class="mt-1 text-sm text-gray-400">
							Toggle your app between Active and Inactive. Inactive apps return a 503 error to all requests. Useful for maintenance windows.
						</p>
					</div>
				</div>
			</section>


			<!-- FAQ -->
			<section id="faq">
				<h2 class="text-2xl font-bold tracking-tight text-white">Frequently Asked Questions</h2>

				<div class="mt-6 space-y-4">
					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Does JioBase store my data?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							No. JioBase is a transparent pass-through proxy. It forwards requests to Supabase and returns responses without storing, caching, or modifying any data. Your data flows directly between your client and Supabase.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">What about latency?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							JioBase runs on Cloudflare Workers, which execute at the edge closest to your users (300+ locations globally). The proxy adds 1-5ms of latency - much less than a VPN (50-200ms+) or a DNS change workaround.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Do I need to change my Supabase anon key?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							No. Your anon key, service role key, and all other credentials stay exactly the same. The Supabase client library sends them as headers, and JioBase forwards everything unchanged to your Supabase project.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Does Realtime / WebSockets work?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							Yes. JioBase detects WebSocket upgrade headers and establishes a bidirectional relay to Supabase Realtime. Subscriptions, presence, and broadcast all work normally through the proxy.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">What if the ISP block is lifted?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							You can switch back to the direct Supabase URL at any time - just revert your environment variable. However, keeping the proxy in place protects you against future blocks, which are increasingly common in India.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Is JioBase open source?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							Yes! JioBase is free and open source. If you find it useful, consider <a href="https://buymeacoffee.com/sunithvs" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">supporting the project</a>.
						</div>
					</details>
				</div>
			</section>


			<!-- Self-host -->
			<section id="self-host">
				<h2 class="text-2xl font-bold tracking-tight text-white">Self-host your own proxy</h2>
				<p class="mt-4 leading-relaxed text-gray-300">
					Prefer full control? You can deploy your own Supabase proxy on Cloudflare Workers for free. Our generator tool creates a ready-to-deploy worker script - just enter your Supabase URL and follow the step-by-step guide.
				</p>

				<div class="mt-6 rounded-xl border border-brand-400/20 bg-brand-400/5 p-6">
					<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h3 class="font-semibold text-white">Worker Generator Tool</h3>
							<p class="mt-1 text-sm text-gray-400">Generate a Cloudflare Worker script and deploy it yourself in under 10 minutes.</p>
						</div>
						<a
							href="/tools/worker-generator"
							class="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300"
						>
							<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
							Generate Worker Code
						</a>
					</div>

					<div class="mt-5 grid gap-3 sm:grid-cols-3">
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<span class="text-sm text-gray-300">100% free (Cloudflare free tier)</span>
						</div>
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<span class="text-sm text-gray-300">No third-party dependency</span>
						</div>
						<div class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							<span class="text-sm text-gray-300">Step-by-step deploy guide</span>
						</div>
					</div>
				</div>
			</section>


			<!-- Support CTA -->
			<section class="mt-16">
				<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
					<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Need help?</h2>
					<p class="mx-auto mt-4 max-w-lg text-gray-400">
						If you run into any issues or have questions, feel free to open an issue on GitHub or check out the blog for detailed technical guides.
					</p>
					<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href="/blog"
							class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
						>
							Read the blog
						</a>
						<a
							href="https://buymeacoffee.com/sunithvs"
							target="_blank"
							rel="noopener"
							class="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
							Support the project
						</a>
					</div>
				</div>
			</section>

		</div>
	</div>

	<!-- Footer -->
	<footer class="border-t border-white/5 bg-[#0a0a0a] py-8">
		<div class="mx-auto max-w-4xl px-6">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div class="flex items-center gap-4 text-sm text-gray-500">
					<a href="/" class="transition hover:text-gray-300">Home</a>
					<a href="/docs" class="transition hover:text-gray-300">Docs</a>
					<a href="/blog" class="transition hover:text-gray-300">Blog</a>
				</div>
				<p class="text-xs text-gray-600">&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.</p>
			</div>
		</div>
	</footer>
</div>
