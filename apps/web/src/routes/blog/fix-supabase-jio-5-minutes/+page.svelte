<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Fix Supabase on Jio in 5 Minutes | JioBase</title>
	<meta name="description" content="Supabase not working on Jio? Fix it in 5 minutes with a one-line code change. No VPN, no DNS hacks. Works for all your users instantly." />
	<meta name="keywords" content="fix supabase jio, supabase jio not working, supabase jio fix, supabase blocked jio, jio supabase timeout" />
	<meta property="og:title" content="Fix Supabase on Jio in 5 Minutes" />
	<meta property="og:description" content="Supabase not working on Jio? Fix it in 5 minutes with a one-line code change. No VPN, no DNS hacks." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Fix Supabase on Jio in 5 Minutes" />
	<meta name="twitter:description" content="Supabase not working on Jio? Fix it in 5 minutes. No VPN, no DNS hacks. Works for all your users." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="jio" />
	<meta property="article:tag" content="fix" />
	<link rel="canonical" href="https://jiobase.com/blog/fix-supabase-jio-5-minutes" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Fix Supabase on Jio in 5 Minutes","description":"Supabase not working on Jio? Fix it in 5 minutes with a one-line code change. No VPN, no DNS hacks. Works for all your users instantly.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon-192.png"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/fix-supabase-jio-5-minutes"},"image":"https://jiobase.com/favicon-192.png"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Fix Supabase on Jio in 5 Minutes"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does the setup take?","acceptedAnswer":{"@type":"Answer","text":"Under 5 minutes. Sign up, create an app in the dashboard, change one URL in your code, and deploy."}},{"@type":"Question","name":"Does this work with Supabase Realtime / WebSockets?","acceptedAnswer":{"@type":"Answer","text":"Yes. JioBase supports WebSocket proxying for Supabase Realtime, including subscriptions, presence, and broadcast channels."}},{"@type":"Question","name":"Is JioBase free?","acceptedAnswer":{"@type":"Answer","text":"The free tier includes 1 proxy app and 50,000 requests per month. No credit card required."}},{"@type":"Question","name":"Do I need to change my Supabase anon key or RLS policies?","acceptedAnswer":{"@type":"Answer","text":"No. The proxy passes all headers and keys unchanged. Your anon key, service role key, and all Row Level Security policies work exactly the same."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Quick Fix</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>3 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Fix Supabase on Jio in 5 Minutes
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Ultra-short, action-focused guide. No theory, no backstory -- just the fix.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: The problem ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The problem</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Jio (along with Airtel and ACT Fibernet) DNS-blocks <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. Your app's API calls fail with <code class="rounded bg-red-500/10 px-1.5 py-0.5 text-sm text-red-400">ERR_CONNECTION_TIMED_OUT</code> for every user on these networks.
		</p>

		<p class="leading-relaxed text-gray-300">
			This affects all Supabase services -- database queries, auth, storage, edge functions, and realtime. Your code is fine. The network is blocking you.
		</p>
	</section>


	<!-- ===== Section 2: The fix (3 steps) ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The fix (3 steps)</h2>

		<p class="mb-8 leading-relaxed text-gray-300">
			Route your Supabase traffic through an unblocked domain. JioBase is a Cloudflare reverse proxy that does exactly this. Here is how to set it up:
		</p>

		<!-- Step 1 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
				<h3 class="text-lg font-semibold">Sign up</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Go to <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase.com/register</a>. Email only. No credit card.
			</p>
		</div>

		<!-- Step 2 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
				<h3 class="text-lg font-semibold">Create a proxy app</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				In your dashboard, click "New App". Enter your Supabase project URL (e.g. <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://abcdefgh.supabase.co</code>) and pick a slug. You will get a proxy URL like <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">myapp.jiobase.com</code>.
			</p>
		</div>

		<!-- Step 3 -->
		<div class="mb-8">
			<div class="mb-3 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
				<h3 class="text-lg font-semibold">Swap the URL in your code</h3>
			</div>
			<p class="ml-11 leading-relaxed text-gray-400">
				Replace your Supabase URL with the proxy URL. That is the only change. Your anon key stays the same.
			</p>
		</div>
	</section>


	<!-- ===== Section 3: Code example ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The one-line change</h2>

		<p class="mb-2 text-sm font-medium text-red-400">Before (blocked on Jio):</p>
		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-red-400">'https://abcdefgh.supabase.co'</span>,
  <span class="text-amber-300">'your-anon-key'</span>
)</code></pre>
		</div>

		<p class="mb-2 mt-6 text-sm font-medium text-brand-400">After (works on every ISP):</p>
		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,   <span class="text-gray-500">// changed</span>
  <span class="text-amber-300">'your-anon-key'</span>              <span class="text-gray-500">// same key</span>
)</code></pre>
		</div>

		<p class="mt-6 leading-relaxed text-gray-300">
			If you use environment variables (recommended), just update the env:
		</p>

		<div class="mt-4 glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">.env</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-gray-500"># Before</span>
<span class="text-red-400 line-through opacity-60">SUPABASE_URL=https://abcdefgh.supabase.co</span>

<span class="text-gray-500"># After</span>
<span class="text-brand-400">SUPABASE_URL=https://myapp.jiobase.com</span>

<span class="text-gray-500"># Key stays the same</span>
SUPABASE_ANON_KEY=your-anon-key</code></pre>
		</div>
	</section>


	<!-- ===== Section 4: Verify it works ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Verify it works</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			After deploying, run a quick check from a Jio connection:
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">terminal</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-gray-500"># This should time out on Jio:</span>
$ curl -I https://abcdefgh.supabase.co/rest/v1/
<span class="text-red-400">curl: (28) Connection timed out</span>

<span class="text-gray-500"># This should work instantly:</span>
$ curl -I https://myapp.jiobase.com/rest/v1/
<span class="text-brand-400">HTTP/2 200</span></code></pre>
		</div>

		<p class="mt-4 leading-relaxed text-gray-300">
			If the proxy URL returns a 200, you are done. Your app now works on Jio, Airtel, ACT Fibernet, and every other ISP.
		</p>
	</section>


	<!-- ===== Section 5: Why changing DNS won't help ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why changing DNS will not help</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Switching to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">1.1.1.1</code> or <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">8.8.8.8</code> might fix things on your machine. But it does nothing for your users. You cannot ask 500 million Jio subscribers to change their DNS settings.
		</p>

		<p class="leading-relaxed text-gray-300">
			Some ISPs also use Deep Packet Inspection (DPI) that blocks connections to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> even when DNS resolves correctly. A DNS change only helps you during local development -- it is not a production solution.
		</p>
	</section>


	<!-- ===== Section 6: What about VPNs? ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What about VPNs?</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			VPNs work but are not a real solution for production apps:
		</p>

		<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
				<span><strong class="text-gray-200">Latency:</strong> VPNs add 50-200ms per request by routing through distant servers.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
				<span><strong class="text-gray-200">Cost:</strong> Users need a paid VPN for reliability. Free VPNs are slow and may log traffic.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/60"></span>
				<span><strong class="text-gray-200">UX friction:</strong> You cannot ask every visitor to install and enable a VPN before using your app.</span>
			</li>
		</ul>

		<p class="mt-4 leading-relaxed text-gray-300">
			A reverse proxy is transparent -- your users do not know it exists. They just use your app normally.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					How long does the setup take?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Under 5 minutes. Sign up, create an app in the dashboard, change one URL in your code, and deploy. That is the entire process.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Does this work with Supabase Realtime / WebSockets?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Yes. JioBase supports WebSocket proxying for Supabase Realtime, including subscriptions, presence, and broadcast channels.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Is JioBase free?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">The free tier includes 1 proxy app and 50,000 requests per month. No credit card required. That is enough for most development and small production apps.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Do I need to change my Supabase anon key or RLS policies?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">No. The proxy passes all headers and keys unchanged. Your anon key, service role key, and all Row Level Security policies work exactly the same.</p>
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mt-16 glass-card rounded-2xl border-t-2 border-brand-400/50 p-8 text-center">
		<h2 class="text-2xl font-bold">Fix your Supabase app in 5 minutes</h2>
		<p class="mt-3 text-gray-400">One URL change. No VPN. No DNS hacks. Works for all your users on every ISP.</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a href="/register" class="rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300">Start for free</a>
			<a href="/docs" class="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white">Read the docs</a>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="fix-supabase-jio-5-minutes" suggestedSlugs={["supabase-blocked-india-fix", "supabase-err-connection-timed-out-india", "proxy-supabase-cloudflare-workers"]} />
</article>
