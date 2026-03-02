<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import PlatformInstaller from '$lib/components/PlatformInstaller.svelte';
</script>

<svelte:head>
	<title>Self-Host Supabase Proxy | create-jiobase CLI</title>
	<meta name="description" content="Deploy a production-quality Supabase reverse proxy on your own Cloudflare Workers account in under 60 seconds. Free, open-source CLI tool with WebSocket support." />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "SoftwareApplication",
				"name": "create-jiobase",
				"applicationCategory": "DeveloperApplication",
				"operatingSystem": "Windows, macOS, Linux",
				"description": "CLI tool to deploy a Supabase reverse proxy on Cloudflare Workers. Bypasses ISP-level DNS blocking in India.",
				"url": "https://jiobase.com/self-host",
				"downloadUrl": "https://www.npmjs.com/package/create-jiobase",
				"offers": {
					"@type": "Offer",
					"price": "0",
					"priceCurrency": "USD"
				},
				"publisher": { "@id": "https://jiobase.com/#organization" }
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Self-Host" }
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white">

	<Navbar active="self-host" />


	<!-- ===== HERO ===== -->
	<section class="glow-brand relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
		<div class="mx-auto max-w-4xl px-6 text-center">

			<!-- npm badge -->
			<div class="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/5 px-4 py-1.5">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
				</svg>
				<span class="text-xs font-medium text-brand-400">v0.1.3 on npm</span>
				<span class="text-xs text-gray-600">|</span>
				<span class="text-xs text-gray-400">open source</span>
			</div>

			<h1 class="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
				Self-Host Your
				<br />
				<span class="text-gradient">Supabase Proxy</span>
			</h1>

			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
				Deploy a production-quality reverse proxy on your own Cloudflare account.
				Free, open-source, under 60 seconds.
			</p>

			<!-- Platform Installer -->
			<div class="mx-auto mt-10 max-w-xl">
				<PlatformInstaller />
			</div>
		</div>
	</section>


	<!-- ===== SOCIAL PROOF BAR ===== -->
	<section class="border-y border-white/5 bg-surface-200/50 py-10">
		<div class="mx-auto max-w-4xl px-6 text-center">
			<p class="mb-6 text-sm font-medium uppercase tracking-wider text-gray-500">Powered by</p>
			<div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
				<!-- Cloudflare -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none">
						<path d="M16.5 14.5c.2-.7.1-1.3-.2-1.7-.3-.4-.8-.6-1.4-.6l-8.2-.1c-.1 0-.2 0-.2-.1-.1-.1 0-.2 0-.3.1-.2.2-.3.4-.3l8.3-.1c1.3-.1 2.7-1.1 3.2-2.4l.6-1.7c0-.1.1-.2 0-.3-1-4.3-4.9-7.5-9.5-7.5C5.3-.6 1.4 2.5.3 6.7c-.7-.5-1.5-.8-2.5-.7-1.5.2-2.7 1.4-2.8 2.9 0 .4 0 .8.1 1.2-2 .1-3.6 1.8-3.6 3.9 0 .2 0 .4.1.6 0 .1.1.2.2.2h24.5c.2 0 .3-.1.4-.3l.3-1c.1-.6 0-1.2-.5-1.5z" transform="translate(4 4) scale(0.7)" fill="currentColor"/>
					</svg>
					<span class="text-sm font-medium">Cloudflare Workers</span>
				</div>
				<!-- Supabase -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="24" height="24" viewBox="0 0 109 113" fill="none">
						<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#sb1s)"/>
						<path d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z" fill="url(#sb2s)" fill-opacity="0.2"/>
						<path d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z" fill="#3ECF8E"/>
						<defs>
							<linearGradient id="sb1s" x1="53.9738" y1="54.974" x2="94.1635" y2="71.8295" gradientUnits="userSpaceOnUse">
								<stop stop-color="#249361"/><stop offset="1" stop-color="#3ECF8E"/>
							</linearGradient>
							<linearGradient id="sb2s" x1="36.1558" y1="30.578" x2="54.4844" y2="65.0806" gradientUnits="userSpaceOnUse">
								<stop/><stop offset="1" stop-opacity="0"/>
							</linearGradient>
						</defs>
					</svg>
					<span class="text-sm font-medium">Supabase Compatible</span>
				</div>
				<!-- npm -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
						<path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0h-2.666V8.667h2.666v5.331zm12 0H21.33v-4h-1.33v4h-1.337v-4h-1.33v4h-2.665V8.667h8.667v5.331z"/>
					</svg>
					<span class="text-sm font-medium">npm Package</span>
				</div>
				<!-- Globe / Edge -->
				<div class="flex items-center gap-2 text-gray-400">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
					</svg>
					<span class="text-sm font-medium">300+ Edge Locations</span>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== WHAT YOU GET ===== -->
	<section class="py-24 md:py-32">
		<div class="mx-auto max-w-5xl px-6">
			<div class="text-center">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">What you get</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					A complete proxy, not a basic redirect
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-gray-400">
					The CLI generates a production-quality Cloudflare Worker with everything you need.
				</p>
			</div>

			<div class="mt-16 grid gap-6 sm:grid-cols-2">
				<!-- Feature 1 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
							<polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Full API Proxy</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						HTTP + WebSocket support for all 6 Supabase services: REST, Auth, Storage, Realtime, Edge Functions, and GraphQL.
					</p>
				</div>

				<!-- Feature 2 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white">CORS Built-in</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Configurable origins, preflight handling, and credentials support. Set allowed domains or use <code class="text-gray-300">*</code> for development.
					</p>
				</div>

				<!-- Feature 3 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Interactive Setup</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Guided prompts walk you through configuration. Input validation, auto-deploy to Cloudflare, and clear error messages at every step.
					</p>
				</div>

				<!-- Feature 4 -->
				<div class="glass-card rounded-2xl p-6 transition hover:border-white/10">
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
						<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" /><path d="M12 18V6" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-white">Zero Cost</h3>
					<p class="mt-2 text-sm leading-relaxed text-gray-400">
						Runs on Cloudflare's free tier: 100,000 requests/day, 10ms CPU time per request. No credit card required.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== TERMINAL DEMO ===== -->
	<section class="py-24 md:py-32 border-t border-white/5">
		<div class="mx-auto max-w-4xl px-6">
			<div class="text-center mb-12">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">See it in action</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					From zero to deployed in under 60 seconds
				</h2>
			</div>

			<div class="code-block rounded-xl overflow-hidden">
				<!-- Terminal title bar -->
				<div class="flex items-center gap-2 border-b border-white/6 px-4 py-3">
					<div class="h-3 w-3 rounded-full bg-red-500/60"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/60"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/60"></div>
					<span class="ml-3 text-xs text-gray-500">Terminal</span>
				</div>

				<!-- Terminal content -->
				<div class="overflow-x-auto px-6 py-5 font-mono text-sm leading-7">
					<div><span class="text-gray-500">$</span> <span class="text-white">npx create-jiobase</span></div>
					<div class="mt-4 text-cyan-400">  ╭─────────────────────────────────────────────────╮</div>
					<div class="text-cyan-400">  │                                                 │</div>
					<div>  <span class="text-cyan-400">│</span>   <span class="text-white font-bold">create-jiobase</span>                           <span class="text-cyan-400">│</span></div>
					<div>  <span class="text-cyan-400">│</span>   <span class="text-gray-400">Self-host a Supabase reverse proxy</span>            <span class="text-cyan-400">│</span></div>
					<div>  <span class="text-cyan-400">│</span>   <span class="text-gray-400">on Cloudflare Workers (free tier)</span>             <span class="text-cyan-400">│</span></div>
					<div class="text-cyan-400">  │                                                 │</div>
					<div class="text-cyan-400">  ╰─────────────────────────────────────────────────╯</div>
					<div class="mt-4">
						<span class="text-gray-400">  Step 1 of 5</span> <span class="text-gray-600">— Your Supabase project URL</span>
					</div>
					<div>  <span class="text-cyan-400">◆</span> <span class="text-white">Supabase project URL</span></div>
					<div>  <span class="text-gray-600">│</span>  <span class="text-brand-400">https://myproject.supabase.co</span></div>
					<div>  <span class="text-gray-600">└</span></div>
					<div class="mt-2">
						<span class="text-gray-400">  Step 2 of 5</span> <span class="text-gray-600">— CORS allowed origins</span>
					</div>
					<div>  <span class="text-cyan-400">◆</span> <span class="text-white">Allowed origins</span></div>
					<div>  <span class="text-gray-600">│</span>  <span class="text-brand-400">*</span></div>
					<div>  <span class="text-gray-600">└</span></div>
					<div class="mt-2 text-gray-600">  ...</div>
					<div class="mt-4">
						<span class="text-green-400">  ✔</span> <span class="text-white">Project scaffolded at ./supabase-proxy</span>
					</div>
					<div>
						<span class="text-green-400">  ✔</span> <span class="text-white">Dependencies installed</span>
					</div>
					<div>
						<span class="text-green-400">  ✔</span> <span class="text-white">Deployed to</span> <span class="text-brand-400">https://supabase-proxy.you.workers.dev</span>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== COMPARISON TABLE ===== -->
	<section class="py-24 md:py-32">
		<div class="mx-auto max-w-4xl px-6">
			<div class="text-center mb-12">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Compare options</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Self-Host vs Managed
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-gray-400">
					Choose the option that fits your project. Both bypass ISP DNS blocking reliably.
				</p>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-white/10">
							<th class="py-4 pr-4 text-left font-medium text-gray-400">Feature</th>
							<th class="py-4 px-4 text-center font-medium text-white">
								<div class="flex flex-col items-center gap-1">
									<span class="text-brand-400">CLI</span>
									<span class="text-xs text-gray-500">Self-Host</span>
								</div>
							</th>
							<th class="py-4 pl-4 text-center font-medium text-white">
								<div class="flex flex-col items-center gap-1">
									<span class="text-brand-400">JioBase</span>
									<span class="text-xs text-gray-500">Managed</span>
								</div>
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-white/5">
						<tr>
							<td class="py-3 pr-4 text-gray-300">Cost</td>
							<td class="py-3 px-4 text-center text-gray-300">Free</td>
							<td class="py-3 pl-4 text-center text-gray-300">Free tier</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">WebSocket / Realtime</td>
							<td class="py-3 px-4 text-center text-green-400">✓</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">CORS configuration</td>
							<td class="py-3 px-4 text-center text-gray-400">Code-level</td>
							<td class="py-3 pl-4 text-center text-gray-300">Dashboard UI</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Service filtering</td>
							<td class="py-3 px-4 text-center text-green-400">✓</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Analytics dashboard</td>
							<td class="py-3 px-4 text-center text-gray-600">—</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Multi-app routing</td>
							<td class="py-3 px-4 text-center text-gray-600">—</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Rate limiting</td>
							<td class="py-3 px-4 text-center text-gray-600">—</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Web dashboard</td>
							<td class="py-3 px-4 text-center text-gray-600">—</td>
							<td class="py-3 pl-4 text-center text-green-400">✓</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Custom subdomains</td>
							<td class="py-3 px-4 text-center text-gray-400">Manual</td>
							<td class="py-3 pl-4 text-center text-gray-300">Automatic</td>
						</tr>
						<tr>
							<td class="py-3 pr-4 text-gray-300">Updates</td>
							<td class="py-3 px-4 text-center text-gray-400">Manual</td>
							<td class="py-3 pl-4 text-center text-gray-300">Automatic</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="py-24 md:py-32 border-t border-white/5">
		<div class="mx-auto max-w-3xl px-6">
			<div class="text-center mb-12">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">FAQ</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Common questions
				</h2>
			</div>

			<div class="space-y-4">
				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
						<span class="font-medium">What do I need to self-host?</span>
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</summary>
					<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
						You need Node.js 18 or higher and a free Cloudflare account. The CLI handles everything else: it installs dependencies, scaffolds the project, and deploys to Cloudflare Workers automatically. If you don't have Node.js, the shell installer (<code class="text-gray-300">curl</code> or PowerShell) will install it for you.
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
						<span class="font-medium">Is it really free?</span>
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</summary>
					<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
						Yes. Cloudflare Workers free tier includes 100,000 requests per day, 10ms CPU time per request, and unlimited bandwidth. For most projects, this is more than enough. No credit card required to sign up.
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
						<span class="font-medium">Does WebSocket / Realtime work?</span>
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</summary>
					<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
						Yes. The generated worker detects WebSocket upgrade requests and establishes a bidirectional relay to Supabase Realtime. Subscriptions, presence, and broadcast all work through the proxy. This is a major improvement over the basic worker generator tool.
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
						<span class="font-medium">Can I use a custom domain?</span>
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</summary>
					<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
						Yes. After deployment, you get a <code class="text-gray-300">.workers.dev</code> URL by default. You can add a custom domain through the Cloudflare dashboard by configuring a Custom Domain or Route for your worker. See the <a href="https://developers.cloudflare.com/workers/configuration/routing/custom-domains/" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">Cloudflare docs</a> for setup instructions.
					</div>
				</details>

				<details class="group glass-card rounded-xl">
					<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
						<span class="font-medium">What's the difference from the worker generator?</span>
						<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
					</summary>
					<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
						The <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">worker generator</a> creates a basic HTTP-only proxy that you manually paste into Cloudflare's dashboard. The CLI generates a production-quality worker with WebSocket support, service filtering, CORS configuration, and auto-deploys it - all in one command. Think of the CLI as the generator's bigger sibling.
					</div>
				</details>
			</div>
		</div>
	</section>


	<!-- ===== INSTALL NODE.JS ===== -->
	<section id="install-nodejs" class="py-24 md:py-32">
		<div class="mx-auto max-w-4xl px-6">
			<div class="text-center mb-12">
				<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Prerequisites</p>
				<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
					Installing Node.js
				</h2>
				<p class="mx-auto mt-4 max-w-2xl text-gray-400">
					The <code class="text-gray-300">npx</code> method requires Node.js 18 or higher. Here is how to install it on each platform.
					<br />
					<span class="text-gray-500">Already have Node.js? Skip to <a href="#" onclick={() => window.scrollTo({top: 0, behavior: 'smooth'})} class="text-brand-400 hover:text-brand-300 transition">the installer above</a>.</span>
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-3">
				<!-- macOS -->
				<div class="glass-card rounded-xl p-6">
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
							<svg class="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.57 5.72C13.36 5.72 14.82 4.62 16.39 4.8C17.07 4.83 18.89 5.08 20.04 6.77C19.93 6.84 17.76 8.09 17.79 10.66C17.82 13.75 20.53 14.79 20.56 14.8C20.53 14.88 20.09 16.47 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/></svg>
						</div>
						<h3 class="font-semibold text-white">macOS</h3>
					</div>

					<div class="space-y-3">
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Homebrew (recommended)</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
								<code class="text-xs text-brand-400 font-mono">brew install node</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">nvm (version manager)</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
								<code class="text-xs text-brand-400 font-mono">nvm install 22</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Or download</p>
							<a href="https://nodejs.org" target="_blank" rel="noopener" class="text-xs text-brand-400 hover:text-brand-300 transition">nodejs.org/en/download</a>
						</div>
					</div>
				</div>

				<!-- Linux -->
				<div class="glass-card rounded-xl p-6">
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
							<svg class="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.311.015-.465.045C8.378.66 5.19 3.37 4.064 6.93c-.375 1.176-.576 2.415-.576 3.671 0 3.45 1.552 6.634 4.164 8.775.426.35.65.95.556 1.514l-.395 2.37c-.05.286.137.566.428.618l2.368.42c.56.1 1.06-.24 1.27-.726l1.12-2.6c.15-.35.54-.55.91-.45 3.15.85 6.48-.71 8.07-3.63.534-.97.82-2.06.82-3.18 0-5.24-4.87-9.48-10.3-9.09z"/></svg>
						</div>
						<h3 class="font-semibold text-white">Linux</h3>
					</div>

					<div class="space-y-3">
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Ubuntu / Debian</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2 overflow-x-auto">
								<code class="text-xs text-brand-400 font-mono whitespace-nowrap">curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">nvm (any distro)</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
								<code class="text-xs text-brand-400 font-mono">nvm install 22</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Or download</p>
							<a href="https://nodejs.org" target="_blank" rel="noopener" class="text-xs text-brand-400 hover:text-brand-300 transition">nodejs.org/en/download</a>
						</div>
					</div>
				</div>

				<!-- Windows -->
				<div class="glass-card rounded-xl p-6">
					<div class="flex items-center gap-3 mb-4">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
							<svg class="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
						</div>
						<h3 class="font-semibold text-white">Windows</h3>
					</div>

					<div class="space-y-3">
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">winget (recommended)</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
								<code class="text-xs text-brand-400 font-mono">winget install OpenJS.NodeJS</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Chocolatey</p>
							<div class="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
								<code class="text-xs text-brand-400 font-mono">choco install nodejs</code>
							</div>
						</div>
						<div>
							<p class="text-xs font-medium text-gray-400 mb-1.5">Or download</p>
							<a href="https://nodejs.org" target="_blank" rel="noopener" class="text-xs text-brand-400 hover:text-brand-300 transition">nodejs.org/en/download</a>
						</div>
					</div>
				</div>
			</div>

				<p class="text-sm text-gray-500">
					Verify your installation: <code class="rounded bg-white/[0.04] px-2 py-0.5 text-xs font-mono text-gray-300">node --version</code>
					— you need v18.0.0 or higher.
				</p>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="py-24 md:py-32">
		<div class="mx-auto max-w-3xl px-6">
			<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
				<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
					Want it fully managed?
				</h2>
				<p class="mx-auto mt-4 max-w-lg text-gray-400">
					Skip the setup entirely. JioBase's managed service gives you a dashboard, analytics, rate limiting, and automatic updates. Free tier available.
				</p>
				<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<a
						href="/register"
						class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
					>
						Try managed JioBase
					</a>
					<a
						href="https://github.com/sunithvs/jiobase"
						target="_blank"
						rel="noopener"
						class="group flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
					>
						View source on GitHub
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition group-hover:translate-x-0.5">
							<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== FOOTER ===== -->
	<footer class="border-t border-white/5 py-12">
		<div class="mx-auto max-w-6xl px-6">
			<div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
				<div class="flex items-center gap-2">
					<div class="flex h-6 w-6 items-center justify-center rounded bg-brand-400/10">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none">
							<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
							<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
						</svg>
					</div>
					<span class="text-sm font-medium text-gray-400">JioBase</span>
				</div>
				<div class="flex items-center gap-6 text-sm text-gray-500">
					<a href="/docs" class="transition hover:text-gray-300">Docs</a>
					<a href="/blog" class="transition hover:text-gray-300">Blog</a>
					<a href="/about" class="transition hover:text-gray-300">About</a>
					<a href="/terms" class="transition hover:text-gray-300">Terms</a>
					<a href="/privacy" class="transition hover:text-gray-300">Privacy</a>
				</div>
			</div>
			<p class="mt-8 text-center text-xs text-gray-600">
				&copy; {new Date().getFullYear()} JioBase. Not affiliated with Supabase, Cloudflare, Jio, or Reliance Industries.
			</p>
		</div>
	</footer>
</div>
