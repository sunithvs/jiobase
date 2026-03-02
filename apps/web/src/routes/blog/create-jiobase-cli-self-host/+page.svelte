<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Introducing create-jiobase: Self-Host Your Supabase Proxy in Under 60 Seconds | JioBase</title>
	<meta name="description" content="create-jiobase is a new CLI tool that scaffolds and deploys a production-quality Supabase reverse proxy on Cloudflare Workers. WebSocket support, service filtering, and auto-deploy included." />
	<meta name="keywords" content="create-jiobase, supabase proxy cli, self-host supabase proxy, cloudflare workers supabase, supabase blocked india fix" />
	<meta property="og:title" content="Introducing create-jiobase: Self-Host Your Supabase Proxy in Under 60 Seconds" />
	<meta property="og:description" content="A new CLI tool to deploy a full-featured Supabase proxy on your own Cloudflare account. Free, open-source, under 60 seconds." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Introducing create-jiobase: Self-Host Your Supabase Proxy in Under 60 Seconds" />
	<meta name="twitter:description" content="New CLI tool to deploy a production-quality Supabase proxy on Cloudflare Workers." />
	<meta property="article:published_time" content="2026-03-02" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="cli" />
	<meta property="article:tag" content="self-host" />
	<link rel="canonical" href="https://jiobase.com/blog/create-jiobase-cli-self-host" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Introducing create-jiobase: Self-Host Your Supabase Proxy in Under 60 Seconds","description":"create-jiobase is a CLI tool that scaffolds and deploys a production-quality Supabase reverse proxy on Cloudflare Workers.","datePublished":"2026-03-02T00:00:00+05:30","dateModified":"2026-03-02T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon-192.png"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/create-jiobase-cli-self-host"},"image":"https://jiobase.com/favicon-192.png"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Introducing create-jiobase"}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Tutorial</span>
			<time datetime="2026-03-02">March 2, 2026</time>
			<span>&middot;</span>
			<span>5 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Introducing create-jiobase: Self-Host Your Supabase Proxy in Under 60 Seconds
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			A new CLI tool that scaffolds a production-quality Cloudflare Worker proxy and deploys it to your own account. One command, full WebSocket support, completely free.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- Why we built it -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why we built this</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			When Indian ISPs started blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>, we launched JioBase as a managed proxy service. We also built a <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">worker generator</a> for developers who wanted to self-host.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			While the generator provided a great starting point for a basic HTTP proxy, we wanted to offer a more robust solution that fully unlocked Supabase's capabilities out-of-the-box without requiring manual copy-pasting.
		</p>

		<p class="leading-relaxed text-gray-300">
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">create-jiobase</code> is our next evolution. It generates a production-quality worker with full WebSocket support for Realtime, service filtering, and CORS configuration. Best of all, it walks you through setup with an interactive wizard and deploys everything automatically.
		</p>
	</section>


	<!-- What it does -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What it does</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Run one command and the CLI handles everything:
		</p>

		<ol class="mb-6 list-inside space-y-3 text-gray-300">
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">1</span>
				<span><strong class="text-white">Asks for your Supabase URL</strong> &mdash; validates it automatically</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">2</span>
				<span><strong class="text-white">Configures CORS and services</strong> &mdash; choose which Supabase services to proxy</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">3</span>
				<span><strong class="text-white">Scaffolds a complete project</strong> &mdash; TypeScript worker with wrangler.toml, package.json, tsconfig</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">4</span>
				<span><strong class="text-white">Deploys to Cloudflare</strong> &mdash; handles wrangler auth and deployment</span>
			</li>
		</ol>

		<p class="leading-relaxed text-gray-300">
			The generated worker includes HTTP proxying, WebSocket relay for Realtime, CORS handling, service path filtering, location header rewriting for OAuth redirects, and a health check endpoint.
		</p>
	</section>


	<!-- How to use it -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How to install</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			You'll need Node.js 18+. To get started, run the CLI:
		</p>

		<div class="code-block mb-6 rounded-xl p-4">
			<code class="font-mono text-sm text-gray-200">
				<span class="text-gray-500">$</span> npx create-jiobase
			</code>
		</div>

		<p class="leading-relaxed text-gray-300">
			This command opens an interactive wizard that asks for your project details.
		</p>
	</section>


	<!-- What it generates -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What it generates</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The CLI creates a complete Cloudflare Worker project:
		</p>

		<div class="code-block mb-6 rounded-xl p-4">
			<pre class="font-mono text-sm text-gray-300 leading-6">supabase-proxy/
  src/index.ts      # Full proxy (HTTP + WebSocket + CORS)
  wrangler.toml     # Cloudflare config
  package.json      # Dependencies
  tsconfig.json     # TypeScript config
  .gitignore</pre>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The generated worker supports all 6 Supabase services:
		</p>

		<div class="grid gap-2 sm:grid-cols-2">
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">REST API (PostgREST)</span>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">Authentication</span>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">Storage</span>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">Realtime (WebSockets)</span>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">Edge Functions</span>
			</div>
			<div class="flex items-center gap-2 rounded-lg bg-white/3 px-3 py-2">
				<svg class="h-4 w-4 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span class="text-sm text-gray-300">GraphQL</span>
			</div>
		</div>
	</section>


	<!-- CLI vs Managed -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">CLI vs managed JioBase</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The CLI is great for hobby projects and developers who want full control. For production apps that need analytics, rate limiting, and a dashboard, the <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">managed JioBase service</a> handles all of that automatically.
		</p>

		<p class="leading-relaxed text-gray-300">
			Check out our <a href="/blog/self-host-vs-managed-supabase-proxy" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">detailed comparison</a> to decide which option fits your project.
		</p>
	</section>


	<!-- CTA -->
	<section class="mb-14">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center">
			<h2 class="text-xl font-bold text-white">Try it now</h2>
			<div class="code-block mx-auto mt-4 max-w-sm rounded-xl p-4">
				<code class="font-mono text-sm text-gray-200">
					<span class="text-gray-500">$</span> npx create-jiobase
				</code>
			</div>
			<p class="mt-4 text-sm text-gray-400">
				<a href="/self-host" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">Full documentation</a>
				&middot;
				<a href="https://github.com/sunithvs/jiobase" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">Source on GitHub</a>
				&middot;
				<a href="https://www.npmjs.com/package/create-jiobase" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">npm package</a>
			</p>
		</div>
	</section>


	<hr class="mb-12 border-white/5" />

	<AuthorBio />
	<BlogSuggestions current="create-jiobase-cli-self-host" />
</article>
