<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>About - JioBase</title>
	<meta name="description" content="JioBase is a free reverse proxy that keeps your Supabase app working in India. Built by Sunith VS, an indie developer from Kerala." />
	<meta property="og:title" content="About JioBase" />
	<meta property="og:description" content="The story behind JioBase - a free reverse proxy keeping Supabase apps alive in India." />
	<meta property="og:type" content="website" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "AboutPage",
				"name": "About JioBase",
				"description": "JioBase is a free reverse proxy that keeps your Supabase app working in India. Built by Sunith VS.",
				"url": "https://jiobase.com/about",
				"publisher": { "@id": "https://jiobase.com/#organization" }
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "About" }
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a]">
	<Navbar active="about" />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]"></div>

	<!-- Hero -->
	<section class="relative overflow-hidden py-20 md:py-28">
		<div class="absolute inset-0 glow-brand opacity-30"></div>
		<div class="relative mx-auto max-w-3xl px-6 text-center">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">About</p>
			<h1 class="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
				One developer. One weekend. One fix.
			</h1>
			<p class="mt-6 text-lg leading-relaxed text-gray-400">
				JioBase exists because Supabase stopped working for millions of developers in India overnight - and no one was offering a real solution.
			</p>
		</div>
	</section>

	<div class="mx-auto max-w-3xl px-6 pb-24">

		<!-- The Story -->
		<section class="mb-16">
			<h2 class="mb-6 text-2xl font-bold tracking-tight text-white">The story</h2>
			<div class="space-y-4 text-gray-300 leading-relaxed">
				<p>
					In February 2026, Indian ISPs started DNS-blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> under a government order. Jio, Airtel, ACT Fibernet - all of them. No warning, no public explanation.
				</p>
				<p>
					Every Supabase-powered app in India broke. Auth, database queries, file uploads, realtime - all of it returned <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">ERR_CONNECTION_TIMED_OUT</code>. Thousands of developers woke up to dead production apps.
				</p>
				<p>
					I was one of them. My own project was completely down. The fix people kept suggesting - "just change your DNS" or "just use a VPN" - only worked for the developer, not their users. If your app has 10,000 users on Jio, you can't ask all of them to change their DNS settings.
				</p>
				<p>
					So I spent a weekend building a Cloudflare Worker that acts as a reverse proxy. Route your traffic through a domain that isn't blocked, and everything works again. Then I realized every other Indian developer with a Supabase app needed the same thing.
				</p>
				<p>
					That weekend project became <strong class="text-white">JioBase</strong>.
				</p>
			</div>
		</section>

		<!-- What JioBase Does -->
		<section class="mb-16">
			<h2 class="mb-6 text-2xl font-bold tracking-tight text-white">What it does</h2>
			<div class="space-y-4 text-gray-300 leading-relaxed">
				<p>
					JioBase is a managed reverse proxy. Instead of your app talking directly to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code> (which is blocked), it talks to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-brand-400">yourproject.jiobase.com</code> (which isn't).
				</p>
				<p>
					The proxy forwards every request to Supabase and returns the response. REST API, Auth, Storage, Edge Functions, Realtime WebSockets - everything works transparently. Your anon key, your RLS policies, your existing code - nothing changes except one URL.
				</p>
			</div>

			<div class="mt-8 grid gap-4 sm:grid-cols-2">
				<div class="glass-card rounded-xl p-5">
					<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
					</div>
					<h3 class="font-semibold text-white">One-line change</h3>
					<p class="mt-1 text-sm text-gray-400">Swap your Supabase URL. That's it. Deploy and your app works again.</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
					</div>
					<h3 class="font-semibold text-white">Global edge network</h3>
					<p class="mt-1 text-sm text-gray-400">Runs on Cloudflare Workers with edge nodes in Mumbai, Chennai, and 300+ cities worldwide.</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
					</div>
					<h3 class="font-semibold text-white">Transparent proxy</h3>
					<p class="mt-1 text-sm text-gray-400">Your tokens, headers, and RLS policies pass through unchanged. Zero data stored.</p>
				</div>
				<div class="glass-card rounded-xl p-5">
					<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
					</div>
					<h3 class="font-semibold text-white">Open source</h3>
					<p class="mt-1 text-sm text-gray-400">Licensed under AGPLv3. Read every line of code on GitHub.</p>
				</div>
			</div>
		</section>

		<!-- The Developer -->
		<section class="mb-16">
			<h2 class="mb-6 text-2xl font-bold tracking-tight text-white">The developer</h2>
			<div class="glass-card rounded-2xl p-6 sm:p-8">
				<div class="flex flex-col items-start gap-6 sm:flex-row">
					<img
						src="/sunithvs.png"
						alt="Sunith VS"
						class="h-20 w-20 shrink-0 rounded-2xl object-cover"
					/>
					<div>
						<h3 class="text-xl font-bold text-white">Sunith VS</h3>
						<p class="mt-1 text-sm text-brand-400">Indie developer from India</p>
						<p class="mt-4 text-sm leading-relaxed text-gray-300">
							I build tools that solve real problems for developers. When the Supabase block hit India, it broke my own production app. I built JioBase to fix it for myself, then opened it up for everyone because no developer should have to pay to fix someone else's problem.
						</p>
						<p class="mt-3 text-sm leading-relaxed text-gray-400">
							JioBase is free and I fund the Cloudflare infrastructure out of my own pocket. If it's keeping your app alive, consider buying me a coffee - it directly pays for the servers.
						</p>
						<div class="mt-5 flex flex-wrap items-center gap-3">
							<a
								href="https://buymeacoffee.com/sunithvs"
								target="_blank"
								rel="noopener"
								class="flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
							>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
								</svg>
								Buy me a coffee
							</a>
							<a href="https://sunithvs.com" target="_blank" rel="noopener" class="text-sm text-gray-400 transition hover:text-white">Website</a>
							<a href="https://www.linkedin.com/in/sunithvs/" target="_blank" rel="noopener" class="text-sm text-gray-400 transition hover:text-white">LinkedIn</a>
							<a href="https://github.com/sunithvs" target="_blank" rel="noopener" class="text-sm text-gray-400 transition hover:text-white">GitHub</a>
							<a href="https://x.com/sunithvs_" target="_blank" rel="noopener" class="text-sm text-gray-400 transition hover:text-white">X</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Tech Stack -->
		<section class="mb-16">
			<h2 class="mb-6 text-2xl font-bold tracking-tight text-white">Tech stack</h2>
			<p class="mb-6 text-gray-300 leading-relaxed">
				JioBase runs entirely on Cloudflare's infrastructure. No AWS, no Vercel, no traditional servers. Everything is serverless and edge-first.
			</p>
			<div class="grid gap-3 sm:grid-cols-2">
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">Proxy</span>
					<span class="text-sm text-gray-400">Cloudflare Workers</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">API</span>
					<span class="text-sm text-gray-400">Hono on Workers</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">Database</span>
					<span class="text-sm text-gray-400">Cloudflare D1 + Drizzle ORM</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">Cache</span>
					<span class="text-sm text-gray-400">Cloudflare KV</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">Frontend</span>
					<span class="text-sm text-gray-400">SvelteKit on Cloudflare Pages</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
					<span class="text-sm font-medium text-brand-400">Styling</span>
					<span class="text-sm text-gray-400">Tailwind CSS v4</span>
				</div>
			</div>
		</section>

		<!-- Open Source -->
		<section class="mb-16">
			<h2 class="mb-6 text-2xl font-bold tracking-tight text-white">Open source</h2>
			<div class="space-y-4 text-gray-300 leading-relaxed">
				<p>
					JioBase is licensed under <strong class="text-white">AGPLv3</strong>. The entire codebase is on GitHub. You can read the proxy logic, the API, the dashboard - everything. If you don't trust a proxy service (and you shouldn't trust any blindly), go read the code.
				</p>
				<p>
					Contributions are welcome. If you find a bug, want to add a feature, or just want to improve the docs - open a PR.
				</p>
			</div>
			<div class="mt-6">
				<a
					href="https://github.com/sunithvs/jiobase"
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
				>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					View on GitHub
				</a>
			</div>
		</section>

		<!-- CTA -->
		<section class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
				Your Supabase app broken in India?
			</h2>
			<p class="mt-3 text-gray-400">
				Fix it in under 2 minutes. Change one URL and deploy.
			</p>
			<div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="/register" class="rounded-xl bg-brand-400 px-8 py-3 text-sm font-semibold text-black transition hover:bg-brand-300">
					Get started free
				</a>
				<a href="/docs" class="rounded-xl border border-white/10 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/5">
					Read the docs
				</a>
			</div>
		</section>
	</div>

	<!-- Footer -->
	<footer class="border-t border-white/5 bg-[#0a0a0a] py-8">
		<div class="mx-auto max-w-3xl px-6">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div class="flex items-center gap-4 text-sm text-gray-500">
					<a href="/" class="transition hover:text-gray-300">Home</a>
					<a href="/docs" class="transition hover:text-gray-300">Docs</a>
					<a href="/blog" class="transition hover:text-gray-300">Blog</a>
					<a href="/about" class="font-medium text-gray-300">About</a>
					<a href="/privacy" class="transition hover:text-gray-300">Privacy</a>
				</div>
				<p class="text-xs text-gray-600">&copy; {new Date().getFullYear()} JioBase. Built by <a href="https://sunithvs.com" target="_blank" rel="noopener" class="text-gray-500 hover:text-gray-300 transition">sunithvs</a></p>
			</div>
		</div>
	</footer>
</div>
