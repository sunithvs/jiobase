<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import FixPageCta from '$lib/components/FixPageCta.svelte';
	import RelatedPages from '$lib/components/RelatedPages.svelte';

	let { data } = $props();
	const page = data.pageData;

	const BASE_URL = 'https://jiobase.com';

	function getPageLabel(): string {
		if (page.type === 'isp') return page.name;
		if (page.type === 'error') return page.displayName;
		return page.featureName;
	}

	function getBreadcrumbs(): { label: string; href?: string }[] {
		return [
			{ label: 'Home', href: '/' },
			{ label: 'Fix', href: '/fix' },
			{ label: getPageLabel() }
		];
	}
</script>

<!-- Meta tags -->
<svelte:head>
	<title>{page.metaTitle}</title>
	<meta name="description" content={page.metaDescription} />
	<meta name="keywords" content={page.metaKeywords} />
	<link rel="canonical" href="{BASE_URL}/fix/{page.slug}" />

	<!-- Open Graph -->
	<meta property="og:title" content={page.metaTitle} />
	<meta property="og:description" content={page.metaDescription} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="{BASE_URL}/fix/{page.slug}" />
	<meta property="og:site_name" content="JioBase" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={page.metaTitle} />
	<meta name="twitter:description" content={page.metaDescription} />
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Breadcrumbs -->
	<div class="mb-8">
		<Breadcrumbs items={getBreadcrumbs()} />
	</div>

	<!-- ============================================================ -->
	<!-- ISP PAGES                                                     -->
	<!-- ============================================================ -->
	{#if page.type === 'isp'}

		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">ISP Fix</span>
				<span>{page.subscribers} subscribers</span>
			</div>

			<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
				Fix Supabase on {page.name}
			</h1>

			<p class="mt-4 text-lg leading-relaxed text-gray-400">
				Supabase is blocked on {page.name} in India. Here is exactly what is happening, how to diagnose it, and how to fix it for your users in under 5 minutes.
			</p>
		</header>

		<hr class="mb-12 border-white/5" />

		<!-- Info cards -->
		<section class="mb-14">
			<div class="grid gap-4 sm:grid-cols-3">
				<div class="glass-card rounded-xl px-5 py-4">
					<p class="text-xs uppercase tracking-wider text-gray-500">Block Type</p>
					<p class="mt-1 text-sm font-medium text-white">{page.blockType}</p>
				</div>
				<div class="glass-card rounded-xl px-5 py-4">
					<p class="text-xs uppercase tracking-wider text-gray-500">Block Confirmed</p>
					<p class="mt-1 text-sm font-medium {page.blockConfirmed ? 'text-red-400' : 'text-amber-400'}">
						{page.blockConfirmed ? 'Yes - confirmed' : 'Unconfirmed'}
					</p>
				</div>
				<div class="glass-card rounded-xl px-5 py-4">
					<p class="text-xs uppercase tracking-wider text-gray-500">Services Blocked</p>
					{#each page.servicesBlocked as service}
						<p class="mt-1 text-sm font-medium text-white">{service}</p>
					{/each}
				</div>
			</div>
		</section>

		<!-- Network types -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Affected network types</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				The block on {page.name} affects the following connection types. All users on these networks will experience Supabase connectivity failures unless a proxy is used.
			</p>
			<div class="flex flex-wrap gap-2">
				{#each page.networkTypes as network}
					<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300">{network}</span>
				{/each}
			</div>
		</section>

		<!-- What happened -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What happened on {page.name}</h2>
			<p class="leading-relaxed text-gray-300">{page.whatHappened}</p>
		</section>

		<!-- How they block -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">How {page.shortName} blocks Supabase</h2>
			<p class="leading-relaxed text-gray-300">{page.howTheyBlock}</p>
		</section>

		<!-- DNS workaround note -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Does changing DNS help?</h2>
			{#if page.dnsWorkaroundWorks}
				<div class="glass-card rounded-xl border-l-4 border-amber-400/50 px-5 py-4">
					<p class="text-sm font-semibold text-amber-400">Partial fix - development only</p>
					<p class="mt-2 leading-relaxed text-gray-300">
						Switching to a public DNS like Google (8.8.8.8) or Cloudflare (1.1.1.1) can restore access on your own device for development. However, this does <strong class="text-white">not</strong> fix the issue for your end users. They are on {page.shortName}'s default DNS and cannot change it. For a production fix, you need a reverse proxy.
					</p>
				</div>
			{:else}
				<div class="glass-card rounded-xl border-l-4 border-red-400/50 px-5 py-4">
					<p class="text-sm font-semibold text-red-400">DNS change does not work</p>
					<p class="mt-2 leading-relaxed text-gray-300">
						Changing DNS does not reliably restore access on {page.shortName}. The ISP may be using deep packet inspection (DPI) in addition to DNS poisoning. A reverse proxy is the only reliable fix.
					</p>
				</div>
			{/if}
		</section>

		<!-- Diagnose the block -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Diagnose the block</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				Run these commands from a device connected to {page.name} to confirm whether the block is active on your network:
			</p>
			<div class="glass-card overflow-hidden rounded-xl">
				<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
					<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
					<span class="ml-2 text-xs text-gray-500">terminal</span>
				</div>
				<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{page.diagnosticCommand}</code></pre>
			</div>
		</section>

		<!-- Fix it with JioBase -->
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Fix it with JioBase</h2>
			<p class="mb-6 leading-relaxed text-gray-300">
				JioBase is a managed reverse proxy that routes your Supabase traffic through Cloudflare's edge network. Your {page.shortName} users connect to your JioBase proxy URL (which is not blocked), and JioBase forwards the request to Supabase. Three steps, under 5 minutes:
			</p>

			<div class="space-y-6">
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">1</div>
					<div>
						<h3 class="font-semibold">Create a free JioBase account</h3>
						<p class="mt-1 text-sm text-gray-400">Sign up at <a href="/register" class="text-brand-400 hover:underline">jiobase.com/register</a>. No credit card needed.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">2</div>
					<div>
						<h3 class="font-semibold">Create a proxy app</h3>
						<p class="mt-1 text-sm text-gray-400">Enter your Supabase project URL and choose a slug. You will get a proxy URL like <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">myapp.jiobase.com</code>.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">3</div>
					<div>
						<h3 class="font-semibold">Swap your Supabase URL</h3>
						<p class="mt-1 text-sm text-gray-400">Replace your Supabase URL with the JioBase proxy URL. One line change.</p>
						<div class="mt-3 glass-card overflow-hidden rounded-xl">
							<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
								<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
								<span class="ml-2 text-xs text-gray-500">supabase.ts</span>
							</div>
							<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">import {'{'} createClient {'}'} from '@supabase/supabase-js'

// Replace your Supabase URL with JioBase proxy:
const supabase = createClient(
  'https://myapp.jiobase.com',  // was: https://xyz.supabase.co
  'your-anon-key'               // stays the same
)</code></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- What gets proxied -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What JioBase proxies</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				JioBase is not a simple URL redirect. It is a full reverse proxy running on Cloudflare Workers at the edge. Every Supabase service works through the proxy:
			</p>
			<div class="space-y-3">
				<div class="glass-card flex items-center gap-3 rounded-xl px-5 py-3">
					<span class="flex h-6 w-6 items-center justify-center rounded-md bg-brand-400/10 text-xs font-bold text-brand-400">R</span>
					<div>
						<p class="text-sm font-medium text-white">REST API</p>
						<p class="text-xs text-gray-400">Database queries, inserts, updates, deletes via PostgREST</p>
					</div>
				</div>
				<div class="glass-card flex items-center gap-3 rounded-xl px-5 py-3">
					<span class="flex h-6 w-6 items-center justify-center rounded-md bg-brand-400/10 text-xs font-bold text-brand-400">A</span>
					<div>
						<p class="text-sm font-medium text-white">Auth</p>
						<p class="text-xs text-gray-400">Sign up, sign in, OAuth, magic links, session refresh</p>
					</div>
				</div>
				<div class="glass-card flex items-center gap-3 rounded-xl px-5 py-3">
					<span class="flex h-6 w-6 items-center justify-center rounded-md bg-brand-400/10 text-xs font-bold text-brand-400">S</span>
					<div>
						<p class="text-sm font-medium text-white">Storage</p>
						<p class="text-xs text-gray-400">File uploads, downloads, signed URLs, image transformations</p>
					</div>
				</div>
				<div class="glass-card flex items-center gap-3 rounded-xl px-5 py-3">
					<span class="flex h-6 w-6 items-center justify-center rounded-md bg-brand-400/10 text-xs font-bold text-brand-400">W</span>
					<div>
						<p class="text-sm font-medium text-white">Realtime (WebSockets)</p>
						<p class="text-xs text-gray-400">Postgres changes, presence, broadcast channels</p>
					</div>
				</div>
				<div class="glass-card flex items-center gap-3 rounded-xl px-5 py-3">
					<span class="flex h-6 w-6 items-center justify-center rounded-md bg-brand-400/10 text-xs font-bold text-brand-400">E</span>
					<div>
						<p class="text-sm font-medium text-white">Edge Functions</p>
						<p class="text-xs text-gray-400">Server-side Deno functions with custom logic</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Additional notes -->
		{#if page.additionalNotes}
			<section class="mb-14">
				<h2 class="mb-4 text-2xl font-bold tracking-tight">Additional notes</h2>
				<p class="leading-relaxed text-gray-300">{page.additionalNotes}</p>
			</section>
		{/if}

		<!-- FAQ section -->
		{#if page.faqs.length > 0}
			<section class="mb-14">
				<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
				<div class="space-y-3">
					{#each page.faqs as faq}
						<details class="group glass-card rounded-xl">
							<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
								{faq.question}
								<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path d="M6 9l6 6 6-6" />
								</svg>
							</summary>
							<div class="border-t border-white/5 px-5 py-4">
								<p class="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
							</div>
						</details>
					{/each}
				</div>
			</section>
		{/if}

		<!-- CTA -->
		<section class="mb-14">
			<FixPageCta />
		</section>

		<!-- Related pages -->
		{#if page.relatedPages.length > 0}
			<RelatedPages pages={page.relatedPages} />
		{/if}


	<!-- ============================================================ -->
	<!-- ERROR PAGES                                                   -->
	<!-- ============================================================ -->
	{:else if page.type === 'error'}

		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-red-400/20 bg-red-400/5 px-2.5 py-0.5 text-xs font-medium text-red-400">Error Fix</span>
			</div>

			<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
				Fix {page.errorCode} with Supabase in India
			</h1>

			<p class="mt-4 text-lg leading-relaxed text-gray-400">
				Getting <code class="rounded bg-red-500/10 px-2 py-0.5 text-base text-red-400">{page.errorCode}</code> when your app tries to connect to Supabase? Indian ISPs are DNS-blocking supabase.co. Here is what the error means, how to diagnose it, and how to fix it.
			</p>
		</header>

		<hr class="mb-12 border-white/5" />

		<!-- What this error means -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What this error means</h2>
			<p class="leading-relaxed text-gray-300">{page.whatItMeans}</p>
		</section>

		<!-- Why it happens in India -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Why it happens in India</h2>
			<p class="leading-relaxed text-gray-300">{page.whyItHappens}</p>
		</section>

		<!-- Visual error example -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What you see in the browser</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				When your ISP blocks Supabase, your browser shows this error because the DNS lookup or connection to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> fails. The error appears in the browser console and sometimes as a visible page error if your app does not handle network failures gracefully.
			</p>
			<div class="glass-card overflow-hidden rounded-xl border-l-4 border-red-400/50">
				<div class="px-5 py-4">
					<p class="font-mono text-sm text-red-400">{page.errorCode}</p>
					<p class="mt-1 text-xs text-gray-500">Chrome / Edge browser error</p>
				</div>
			</div>
		</section>

		<!-- Affected ISPs overview -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Which ISPs trigger this error</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				This error can appear on any Indian ISP that blocks <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. The confirmed ISPs include:
			</p>
			<div class="space-y-2">
				<div class="flex items-center gap-3 text-sm">
					<span class="h-2 w-2 rounded-full bg-red-400"></span>
					<span class="text-gray-300"><strong class="text-white">Reliance Jio</strong> - 500M+ subscribers, DNS poisoning confirmed</span>
				</div>
				<div class="flex items-center gap-3 text-sm">
					<span class="h-2 w-2 rounded-full bg-red-400"></span>
					<span class="text-gray-300"><strong class="text-white">Bharti Airtel</strong> - 380M+ subscribers, DNS poisoning confirmed</span>
				</div>
				<div class="flex items-center gap-3 text-sm">
					<span class="h-2 w-2 rounded-full bg-red-400"></span>
					<span class="text-gray-300"><strong class="text-white">BSNL</strong> - 100M+ subscribers, DNS poisoning confirmed</span>
				</div>
				<div class="flex items-center gap-3 text-sm">
					<span class="h-2 w-2 rounded-full bg-amber-400"></span>
					<span class="text-gray-300"><strong class="text-white">ACT Fibernet</strong> - Regional, inconsistent blocking</span>
				</div>
			</div>
		</section>

		<!-- Diagnostic steps -->
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Diagnostic steps</h2>
			<p class="mb-6 leading-relaxed text-gray-300">
				Follow these steps to confirm whether the error is caused by ISP DNS blocking:
			</p>
			<div class="space-y-6">
				{#each page.diagnosticSteps as diagStep, i}
					<div class="glass-card rounded-xl p-5">
						<div class="mb-3 flex items-center gap-3">
							<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-xs font-bold text-red-400">{i + 1}</span>
							<h3 class="font-semibold text-white">{diagStep.step}</h3>
						</div>
						<div class="glass-card overflow-hidden rounded-xl">
							<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
								<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
								<span class="ml-2 text-xs text-gray-500">terminal</span>
							</div>
							<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{diagStep.command}</code></pre>
						</div>
						<p class="mt-3 text-sm leading-relaxed text-gray-400">
							<strong class="text-gray-300">Expected:</strong> {diagStep.expected}
						</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- Understanding the root cause -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Understanding the root cause</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				The Indian government issued a blocking order under Section 69A of the IT Act that requires ISPs to block access to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. ISPs implement this by poisoning their DNS resolvers. When you query a blocked domain, instead of returning the real IP address, the ISP returns either a sinkhole IP (causing timeout) or NXDOMAIN (causing name resolution failure).
			</p>
			<p class="leading-relaxed text-gray-300">
				This is not a Supabase outage. Supabase's infrastructure is fully operational. The block exists only at the ISP level in India. Users outside India, or users on VPNs, can access Supabase normally.
			</p>
		</section>

		<!-- Fix it with JioBase -->
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Fix it with JioBase</h2>
			<p class="mb-6 leading-relaxed text-gray-300">
				The permanent fix is to route your Supabase traffic through a domain that is not blocked. JioBase is a managed reverse proxy on Cloudflare's edge network. Three steps:
			</p>

			<div class="space-y-6">
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">1</div>
					<div>
						<h3 class="font-semibold">Create a free JioBase account</h3>
						<p class="mt-1 text-sm text-gray-400">Sign up at <a href="/register" class="text-brand-400 hover:underline">jiobase.com/register</a>. No credit card needed.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">2</div>
					<div>
						<h3 class="font-semibold">Create a proxy app</h3>
						<p class="mt-1 text-sm text-gray-400">Enter your Supabase project URL and choose a slug. You will get a proxy URL like <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">myapp.jiobase.com</code>.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">3</div>
					<div>
						<h3 class="font-semibold">Swap your Supabase URL</h3>
						<p class="mt-1 text-sm text-gray-400">Replace your Supabase URL with the JioBase proxy URL. One line change.</p>
						<div class="mt-3 glass-card overflow-hidden rounded-xl">
							<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
								<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
								<span class="ml-2 text-xs text-gray-500">supabase.ts</span>
							</div>
							<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">import {'{'} createClient {'}'} from '@supabase/supabase-js'

// Replace your Supabase URL with JioBase proxy:
const supabase = createClient(
  'https://myapp.jiobase.com',  // was: https://xyz.supabase.co
  'your-anon-key'               // stays the same
)</code></pre>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Alternative temporary fixes -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Temporary workarounds (development only)</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				These workarounds can restore access on your own device for development, but they do not fix the issue for your end users:
			</p>
			<div class="space-y-3">
				<div class="glass-card rounded-xl px-5 py-4">
					<p class="text-sm font-semibold text-white">Change DNS to 1.1.1.1 or 8.8.8.8</p>
					<p class="mt-1 text-sm text-gray-400">Works for your device only. Your users still use their ISP's DNS.</p>
				</div>
				<div class="glass-card rounded-xl px-5 py-4">
					<p class="text-sm font-semibold text-white">Use Cloudflare WARP or a VPN</p>
					<p class="mt-1 text-sm text-gray-400">Encrypts DNS queries and bypasses the block. Not a production solution - you cannot ask all users to install a VPN.</p>
				</div>
			</div>
		</section>

		<!-- FAQ section -->
		{#if page.faqs.length > 0}
			<section class="mb-14">
				<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
				<div class="space-y-3">
					{#each page.faqs as faq}
						<details class="group glass-card rounded-xl">
							<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
								{faq.question}
								<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path d="M6 9l6 6 6-6" />
								</svg>
							</summary>
							<div class="border-t border-white/5 px-5 py-4">
								<p class="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
							</div>
						</details>
					{/each}
				</div>
			</section>
		{/if}

		<!-- CTA -->
		<section class="mb-14">
			<FixPageCta />
		</section>

		<!-- Related pages -->
		{#if page.relatedPages.length > 0}
			<RelatedPages pages={page.relatedPages} />
		{/if}


	<!-- ============================================================ -->
	<!-- FEATURE PAGES                                                 -->
	<!-- ============================================================ -->
	{:else if page.type === 'feature'}

		<!-- Header -->
		<header class="mb-12">
			<div class="flex items-center gap-3 text-sm text-gray-500">
				<span class="rounded-full border border-amber-400/20 bg-amber-400/5 px-2.5 py-0.5 text-xs font-medium text-amber-400">Feature Fix</span>
			</div>

			<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
				Fix {page.featureName} Blocked in India
			</h1>

			<p class="mt-4 text-lg leading-relaxed text-gray-400">
				{page.featureName} relies on <code class="rounded bg-white/5 px-2 py-0.5 text-base text-gray-300">{page.supabasePath}</code> which is blocked by Indian ISPs. Here is what breaks, the impact on your users, and how to fix it with a one-line code change.
			</p>
		</header>

		<hr class="mb-12 border-white/5" />

		<!-- What breaks -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What breaks</h2>
			<p class="leading-relaxed text-gray-300">{page.whatBreaks}</p>
		</section>

		<!-- Impact on your users -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Impact on your users</h2>
			<p class="leading-relaxed text-gray-300">{page.userImpact}</p>
		</section>

		<!-- Why this happens -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Why {page.shortName} is blocked</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				Indian ISPs (Jio, Airtel, BSNL, ACT Fibernet) are DNS-blocking all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> following a government order under Section 69A of the IT Act. This means every Supabase service endpoint is unreachable, including the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">{page.supabasePath}</code> path that {page.shortName} depends on.
			</p>
			<p class="leading-relaxed text-gray-300">
				The block is at the DNS level. Your ISP's DNS resolver returns incorrect IP addresses for Supabase domains, causing connections to time out or fail. Supabase itself is fully operational - the block is ISP-specific.
			</p>
		</section>

		<!-- Technical details -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Technical details</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				{page.featureName} makes HTTP requests (and WebSocket connections for Realtime) to your Supabase project's <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">{page.supabasePath}</code> endpoint. When DNS is poisoned:
			</p>
			<div class="space-y-2 text-sm text-gray-300">
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
					<span>DNS lookup for <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">your-project.supabase.co</code> returns a sinkhole IP or NXDOMAIN</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
					<span>HTTP requests to <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">{page.supabasePath}</code> hang until timeout (10-30 seconds)</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
					<span>The Supabase JS client throws a network error or returns undefined</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
					<span>Your app displays error states, empty data, or infinite loading spinners</span>
				</div>
			</div>
		</section>

		<!-- Affected ISPs -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">Affected ISPs</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				The following ISPs are confirmed to block {page.featureName} (along with all other Supabase services):
			</p>
			<div class="grid gap-3 sm:grid-cols-2">
				<a href="/fix/jio" class="glass-card rounded-xl px-5 py-4 transition hover:border-brand-400/20">
					<p class="font-semibold text-white">Reliance Jio</p>
					<p class="text-sm text-gray-400">500M+ subscribers</p>
				</a>
				<a href="/fix/airtel" class="glass-card rounded-xl px-5 py-4 transition hover:border-brand-400/20">
					<p class="font-semibold text-white">Bharti Airtel</p>
					<p class="text-sm text-gray-400">380M+ subscribers</p>
				</a>
				<a href="/fix/bsnl" class="glass-card rounded-xl px-5 py-4 transition hover:border-brand-400/20">
					<p class="font-semibold text-white">BSNL</p>
					<p class="text-sm text-gray-400">100M+ subscribers</p>
				</a>
				<a href="/fix/act" class="glass-card rounded-xl px-5 py-4 transition hover:border-brand-400/20">
					<p class="font-semibold text-white">ACT Fibernet</p>
					<p class="text-sm text-gray-400">2M+ subscribers</p>
				</a>
			</div>
		</section>

		<!-- Fix it with JioBase -->
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Fix it with JioBase</h2>
			<p class="mb-6 leading-relaxed text-gray-300">
				JioBase routes {page.featureName} traffic through Cloudflare's edge network, bypassing the ISP block entirely. Your existing code stays almost identical - just swap the URL:
			</p>

			<div class="glass-card overflow-hidden rounded-xl">
				<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
					<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
					<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
					<span class="ml-2 text-xs text-gray-500">{page.codeFilename}</span>
				</div>
				<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">{page.codeExample}</code></pre>
			</div>
		</section>

		<!-- Step by step setup -->
		<section class="mb-14">
			<h2 class="mb-6 text-2xl font-bold tracking-tight">Step-by-step setup</h2>

			<div class="space-y-6">
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">1</div>
					<div>
						<h3 class="font-semibold">Create a free JioBase account</h3>
						<p class="mt-1 text-sm text-gray-400">Sign up at <a href="/register" class="text-brand-400 hover:underline">jiobase.com/register</a>. No credit card needed.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">2</div>
					<div>
						<h3 class="font-semibold">Create a proxy app</h3>
						<p class="mt-1 text-sm text-gray-400">Enter your Supabase project URL and choose a slug. You will get a proxy URL like <code class="rounded bg-white/5 px-1.5 py-0.5 text-xs">myapp.jiobase.com</code>.</p>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">3</div>
					<div>
						<h3 class="font-semibold">Swap your Supabase URL</h3>
						<p class="mt-1 text-sm text-gray-400">Replace your Supabase URL with the JioBase proxy URL. Your anon key stays the same. {page.featureName} works identically through the proxy.</p>
						<div class="mt-3 glass-card overflow-hidden rounded-xl">
							<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
								<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
								<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
								<span class="ml-2 text-xs text-gray-500">supabase.ts</span>
							</div>
							<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300">import {'{'} createClient {'}'} from '@supabase/supabase-js'

// Replace your Supabase URL with JioBase proxy:
const supabase = createClient(
  'https://myapp.jiobase.com',  // was: https://xyz.supabase.co
  'your-anon-key'               // stays the same
)</code></pre>
						</div>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-sm font-bold text-brand-400">4</div>
					<div>
						<h3 class="font-semibold">Deploy and verify</h3>
						<p class="mt-1 text-sm text-gray-400">Deploy your updated code. Test from a blocked ISP (Jio, Airtel) to confirm {page.shortName} operations work through the proxy.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- What stays the same -->
		<section class="mb-14">
			<h2 class="mb-4 text-2xl font-bold tracking-tight">What stays the same</h2>
			<p class="mb-4 leading-relaxed text-gray-300">
				When you switch to a JioBase proxy URL, everything except the URL stays identical:
			</p>
			<div class="space-y-2 text-sm text-gray-300">
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
					<span>Your <strong class="text-white">anon key</strong> stays the same</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
					<span>Your <strong class="text-white">RLS policies</strong> are completely unaffected</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
					<span>Your <strong class="text-white">database schema</strong> and data are untouched</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
					<span>Your <strong class="text-white">Supabase dashboard</strong> continues to work normally</span>
				</div>
				<div class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
					<span>All <strong class="text-white">other Supabase features</strong> (Auth, Storage, Realtime, Edge Functions) work through the same proxy</span>
				</div>
			</div>
		</section>

		<!-- FAQ section -->
		{#if page.faqs.length > 0}
			<section class="mb-14">
				<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
				<div class="space-y-3">
					{#each page.faqs as faq}
						<details class="group glass-card rounded-xl">
							<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
								{faq.question}
								<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path d="M6 9l6 6 6-6" />
								</svg>
							</summary>
							<div class="border-t border-white/5 px-5 py-4">
								<p class="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
							</div>
						</details>
					{/each}
				</div>
			</section>
		{/if}

		<!-- CTA -->
		<section class="mb-14">
			<FixPageCta />
		</section>

		<!-- Related pages -->
		{#if page.relatedPages.length > 0}
			<RelatedPages pages={page.relatedPages} />
		{/if}

	{/if}

</article>
