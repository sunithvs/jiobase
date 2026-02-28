<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>How to Proxy Supabase Through Cloudflare Workers (Step-by-Step) - JioBase</title>
	<meta name="description" content="Step-by-step tutorial on building a Cloudflare Worker reverse proxy for Supabase. Covers HTTP proxying, WebSocket Realtime support, CORS, DNS configuration, and deployment." />
	<meta name="keywords" content="supabase cloudflare worker proxy, supabase reverse proxy tutorial, bypass supabase block cloudflare, supabase custom domain proxy" />
	<meta property="og:title" content="How to Proxy Supabase Through Cloudflare Workers (Step-by-Step)" />
	<meta property="og:description" content="A detailed technical tutorial on setting up a Cloudflare Worker reverse proxy for Supabase. Covers HTTP, Auth, Storage, Realtime WebSockets, CORS configuration, and production deployment." />
	<meta property="og:type" content="article" />
	<link rel="canonical" href="https://jiobase.com/blog/proxy-supabase-cloudflare-workers" />
</svelte:head>

<article class="mx-auto max-w-4xl px-6 py-16">

	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<a href="/blog" class="text-brand-400 transition hover:text-brand-300">&larr; Back to blog</a>
			<span>&middot;</span>
			<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Tutorial</span>
			<time datetime="2026-02-27">February 27, 2026</time>
			<span>12 min read</span>
		</div>
		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			How to Proxy Supabase Through Cloudflare Workers
			<span class="text-gradient"> (Step-by-Step)</span>
		</h1>
		<p class="mt-6 text-lg leading-relaxed text-gray-400">
			Indian ISPs are DNS-blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-base text-gray-300">*.supabase.co</code>,
			breaking every app that relies on Supabase for auth, database, storage, or realtime.
			In this tutorial, you will build a Cloudflare Worker reverse proxy from scratch that routes
			all Supabase traffic through your own unblocked domain.
		</p>
	</header>

	<!-- Table of contents -->
	<nav class="glass-card mb-16 rounded-2xl p-6">
		<h2 class="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">In this article</h2>
		<ol class="space-y-2 text-sm">
			<li><a href="#why-proxy" class="text-brand-400 transition hover:text-brand-300">1. Why you need a Supabase proxy</a></li>
			<li><a href="#architecture" class="text-brand-400 transition hover:text-brand-300">2. Architecture overview</a></li>
			<li><a href="#prerequisites" class="text-brand-400 transition hover:text-brand-300">3. Prerequisites</a></li>
			<li><a href="#step-1" class="text-brand-400 transition hover:text-brand-300">4. Step 1: Create the Worker project</a></li>
			<li><a href="#step-2" class="text-brand-400 transition hover:text-brand-300">5. Step 2: Write the proxy handler</a></li>
			<li><a href="#step-3" class="text-brand-400 transition hover:text-brand-300">6. Step 3: Add WebSocket support</a></li>
			<li><a href="#step-4" class="text-brand-400 transition hover:text-brand-300">7. Step 4: Configure CORS</a></li>
			<li><a href="#step-5" class="text-brand-400 transition hover:text-brand-300">8. Step 5: Deploy and configure DNS</a></li>
			<li><a href="#step-6" class="text-brand-400 transition hover:text-brand-300">9. Step 6: Update your Supabase client</a></li>
			<li><a href="#testing" class="text-brand-400 transition hover:text-brand-300">10. Testing the proxy</a></li>
			<li><a href="#or-use-jiobase" class="text-brand-400 transition hover:text-brand-300">11. Or just use JioBase</a></li>
		</ol>
	</nav>


	<!-- ===== Section 1: Why you need a proxy ===== -->
	<section id="why-proxy" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">1. Why you need a Supabase proxy</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			If you are building with Supabase and your users are in India, your app is likely broken
			right now. Multiple major ISPs - Jio, Airtel, ACT Fibernet, and others - are
			DNS-blocking <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code>
			at the network level. Every REST query, auth call, storage upload, and realtime subscription
			fails with <code class="text-red-400">ERR_CONNECTION_TIMED_OUT</code>.
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-3">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
					</svg>
				</div>
				<h3 class="mb-1 font-semibold">ISP DNS blocks</h3>
				<p class="text-sm text-gray-400">Jio, Airtel, and ACT resolve *.supabase.co to sinkhole IPs via DNS poisoning. Changing to 1.1.1.1 does not help if DPI is active.</p>
			</div>
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
					</svg>
				</div>
				<h3 class="mb-1 font-semibold">Infrastructure resilience</h3>
				<p class="text-sm text-gray-400">A proxy layer decouples your app from Supabase's domain. If blocks happen again, your users never notice.</p>
			</div>
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/>
					</svg>
				</div>
				<h3 class="mb-1 font-semibold">Custom domains</h3>
				<p class="text-sm text-gray-400">Serve Supabase APIs from your own domain like api.yourapp.com. Professional branding and no third-party domain exposure.</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			A reverse proxy sits between your frontend and Supabase. Instead of calling
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-red-400">xyz.supabase.co</code>,
			your client calls
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-brand-400">your-domain.com</code>.
			The proxy Worker receives the request, forwards it to Supabase, and relays the response back.
			Because <code class="text-gray-300">your-domain.com</code> is not blocked, everything works.
		</p>
	</section>


	<!-- ===== Section 2: Architecture ===== -->
	<section id="architecture" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">2. Architecture overview</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The request flow is straightforward. Your browser talks to your domain, Cloudflare's edge
			network runs your Worker, and the Worker talks to Supabase on the backend.
		</p>

		<div class="glass-card mb-6 overflow-x-auto rounded-2xl p-6">
			<div class="flex items-center justify-center gap-3 whitespace-nowrap text-sm font-mono">
				<div class="rounded-lg border border-blue-400/20 bg-blue-400/5 px-4 py-2.5 text-blue-300">
					Browser
				</div>
				<div class="flex items-center text-gray-600">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none">
						<path d="M0 6h32M32 6l-6-5M32 6l-6 5" stroke="currentColor" stroke-width="1.5"/>
					</svg>
				</div>
				<div class="rounded-lg border border-brand-400/30 bg-brand-400/5 px-4 py-2.5 text-brand-400">
					your-domain.com
				</div>
				<div class="flex items-center text-gray-600">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none">
						<path d="M0 6h32M32 6l-6-5M32 6l-6 5" stroke="currentColor" stroke-width="1.5"/>
					</svg>
				</div>
				<div class="rounded-lg border border-orange-400/20 bg-orange-400/5 px-4 py-2.5 text-orange-300">
					CF Worker
				</div>
				<div class="flex items-center text-gray-600">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none">
						<path d="M0 6h32M32 6l-6-5M32 6l-6 5" stroke="currentColor" stroke-width="1.5"/>
					</svg>
				</div>
				<div class="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5 text-emerald-300">
					*.supabase.co
				</div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The Worker handles three types of traffic: standard HTTP requests (REST, Auth, Storage),
			CORS preflight requests (OPTIONS), and WebSocket upgrade requests (Realtime). Each has
			slightly different handling, which we will implement step by step.
		</p>
	</section>


	<!-- ===== Section 3: Prerequisites ===== -->
	<section id="prerequisites" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">3. Prerequisites</h2>

		<p class="mb-4 leading-relaxed text-gray-300">Before you start, make sure you have the following:</p>

		<ul class="space-y-3 text-gray-300">
			<li class="flex items-start gap-3">
				<svg class="mt-1 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span>A <strong class="text-white">Cloudflare account</strong> (free tier works). Sign up at <code class="rounded bg-white/5 px-1.5 py-0.5 text-brand-400">dash.cloudflare.com</code>.</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="mt-1 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span>A <strong class="text-white">Supabase project</strong> with a project URL like <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">xyz.supabase.co</code>.</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="mt-1 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span><strong class="text-white">Node.js 18+</strong> installed locally.</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="mt-1 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span>The <strong class="text-white">Wrangler CLI</strong> installed: <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">npm install -g wrangler</code></span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="mt-1 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span>A <strong class="text-white">custom domain</strong> added to your Cloudflare account (so you can route traffic through it).</span>
			</li>
		</ul>
	</section>


	<!-- ===== Step 1: Create the Worker ===== -->
	<section id="step-1" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">4. Step 1: Create the Worker project</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Scaffold a new Cloudflare Worker project using Wrangler:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-gray-500"># Create a new Worker project</span></div>
				<div><span class="text-brand-400">npm</span> create cloudflare@latest -- supabase-proxy</div>
				<div class="mt-1"><span class="text-gray-500"># Select: "Hello World" Worker, TypeScript</span></div>
				<div class="mt-3"><span class="text-brand-400">cd</span> supabase-proxy</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Next, configure <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">wrangler.toml</code>
			with your Supabase project URL and custom domain:
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">wrangler.toml</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">name</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"supabase-proxy"</span></div>
				<div><span class="text-purple-400">main</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"src/index.ts"</span></div>
				<div><span class="text-purple-400">compatibility_date</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"2024-12-01"</span></div>
				<div class="mt-2"><span class="text-gray-500"># Your Supabase project URL</span></div>
				<div><span class="text-blue-300">[vars]</span></div>
				<div><span class="text-purple-400">SUPABASE_URL</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"https://xyz.supabase.co"</span></div>
				<div><span class="text-purple-400">ALLOWED_ORIGINS</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"https://yourapp.com,http://localhost:3000"</span></div>
				<div class="mt-2"><span class="text-gray-500"># Route traffic from your custom domain</span></div>
				<div><span class="text-blue-300">[[routes]]</span></div>
				<div><span class="text-purple-400">pattern</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"api.yourapp.com/*"</span></div>
				<div><span class="text-purple-400">zone_name</span> <span class="text-gray-500">=</span> <span class="text-amber-300">"yourapp.com"</span></div>
			</div>
		</div>

		<p class="text-sm leading-relaxed text-gray-400">
			Replace <code class="text-gray-300">xyz.supabase.co</code> with your actual Supabase project reference
			and <code class="text-gray-300">yourapp.com</code> with your own domain.
		</p>
	</section>


	<!-- ===== Step 2: HTTP proxy handler ===== -->
	<section id="step-2" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">5. Step 2: Write the proxy handler</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The core of the proxy is an HTTP handler that receives incoming requests, rewrites them to
			point at your Supabase origin, forwards them, and relays the response back with proper
			headers. Create <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">src/index.ts</code>:
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">src/index.ts</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">interface</span> <span class="text-yellow-200">Env</span> {'{'}</div>
				<div>  <span class="text-blue-300">SUPABASE_URL</span>: <span class="text-yellow-200">string</span>;</div>
				<div>  <span class="text-blue-300">ALLOWED_ORIGINS</span>: <span class="text-yellow-200">string</span>;</div>
				<div>{'}'}</div>
				<div class="mt-2"><span class="text-purple-400">export default</span> {'{'}</div>
				<div>  <span class="text-purple-400">async</span> <span class="text-yellow-200">fetch</span>(<span class="text-blue-300">request</span>: <span class="text-yellow-200">Request</span>, <span class="text-blue-300">env</span>: <span class="text-yellow-200">Env</span>): <span class="text-yellow-200">Promise</span>&lt;<span class="text-yellow-200">Response</span>&gt; {'{'}</div>
				<div>    <span class="text-purple-400">const</span> <span class="text-blue-300">url</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">URL</span>(request.url);</div>
				<div class="mt-2">    <span class="text-gray-500">// Health check endpoint</span></div>
				<div>    <span class="text-purple-400">if</span> (url.pathname === <span class="text-amber-300">"/__health"</span>) {'{'}</div>
				<div>      <span class="text-purple-400">return</span> Response.<span class="text-yellow-200">json</span>({'{'} status: <span class="text-amber-300">"ok"</span> {'}'});</div>
				<div>    {'}'}</div>
				<div class="mt-2">    <span class="text-gray-500">// Handle CORS preflight</span></div>
				<div>    <span class="text-purple-400">if</span> (request.method === <span class="text-amber-300">"OPTIONS"</span>) {'{'}</div>
				<div>      <span class="text-purple-400">return</span> <span class="text-yellow-200">handlePreflight</span>(request, env);</div>
				<div>    {'}'}</div>
				<div class="mt-2">    <span class="text-gray-500">// Check for WebSocket upgrade</span></div>
				<div>    <span class="text-purple-400">const</span> <span class="text-blue-300">upgrade</span> = request.headers.<span class="text-yellow-200">get</span>(<span class="text-amber-300">"Upgrade"</span>);</div>
				<div>    <span class="text-purple-400">if</span> (upgrade?.toLowerCase() === <span class="text-amber-300">"websocket"</span>) {'{'}</div>
				<div>      <span class="text-purple-400">return</span> <span class="text-yellow-200">handleWebSocket</span>(request, env);</div>
				<div>    {'}'}</div>
				<div class="mt-2">    <span class="text-gray-500">// Proxy the HTTP request</span></div>
				<div>    <span class="text-purple-400">return</span> <span class="text-yellow-200">handleHttp</span>(request, env);</div>
				<div>  {'}'},</div>
				<div>{'}'};</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Now add the <code class="rounded bg-white/5 px-1.5 py-0.5 text-yellow-200">handleHttp</code>
			function that does the actual proxying. This is the heart of the Worker:
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">src/index.ts (continued)</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">async function</span> <span class="text-yellow-200">handleHttp</span>(</div>
				<div>  <span class="text-blue-300">request</span>: <span class="text-yellow-200">Request</span>,</div>
				<div>  <span class="text-blue-300">env</span>: <span class="text-yellow-200">Env</span></div>
				<div>): <span class="text-yellow-200">Promise</span>&lt;<span class="text-yellow-200">Response</span>&gt; {'{'}</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">url</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">URL</span>(request.url);</div>
				<div class="mt-2">  <span class="text-gray-500">// Build the upstream Supabase URL</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">upstream</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">URL</span>(env.SUPABASE_URL);</div>
				<div>  upstream.pathname = url.pathname;</div>
				<div>  upstream.search = url.search;</div>
				<div class="mt-2">  <span class="text-gray-500">// Clone headers, rewrite Host</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">headers</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">Headers</span>(request.headers);</div>
				<div>  headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Host"</span>, upstream.hostname);</div>
				<div class="mt-1">  <span class="text-gray-500">// Remove Cloudflare-specific headers</span></div>
				<div>  headers.<span class="text-yellow-200">delete</span>(<span class="text-amber-300">"cf-connecting-ip"</span>);</div>
				<div>  headers.<span class="text-yellow-200">delete</span>(<span class="text-amber-300">"cf-ray"</span>);</div>
				<div>  headers.<span class="text-yellow-200">delete</span>(<span class="text-amber-300">"cf-visitor"</span>);</div>
				<div>  headers.<span class="text-yellow-200">delete</span>(<span class="text-amber-300">"cf-ipcountry"</span>);</div>
				<div class="mt-2">  <span class="text-gray-500">// Forward the request to Supabase</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">resp</span> = <span class="text-purple-400">await</span> <span class="text-yellow-200">fetch</span>(upstream.<span class="text-yellow-200">toString</span>(), {'{'}</div>
				<div>    method: request.method,</div>
				<div>    headers,</div>
				<div>    body: request.method !== <span class="text-amber-300">"GET"</span></div>
				<div>      && request.method !== <span class="text-amber-300">"HEAD"</span></div>
				<div>      ? request.body : <span class="text-purple-400">undefined</span>,</div>
				<div>    redirect: <span class="text-amber-300">"manual"</span>,</div>
				<div>  {'}'});</div>
				<div class="mt-2">  <span class="text-gray-500">// Clone response and add CORS</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">respHeaders</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">Headers</span>(resp.headers);</div>
				<div>  <span class="text-yellow-200">addCorsHeaders</span>(respHeaders, request, env);</div>
				<div>  respHeaders.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"X-Proxied-By"</span>, <span class="text-amber-300">"supabase-proxy"</span>);</div>
				<div class="mt-2">  <span class="text-gray-500">// Rewrite Location header on redirects</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">loc</span> = respHeaders.<span class="text-yellow-200">get</span>(<span class="text-amber-300">"Location"</span>);</div>
				<div>  <span class="text-purple-400">if</span> (loc?.includes(<span class="text-amber-300">".supabase.co"</span>)) {'{'}</div>
				<div>    respHeaders.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Location"</span>,</div>
				<div>      loc.<span class="text-yellow-200">replace</span>(upstream.hostname, url.hostname));</div>
				<div>  {'}'}</div>
				<div class="mt-2">  <span class="text-purple-400">return new</span> <span class="text-yellow-200">Response</span>(resp.body, {'{'}</div>
				<div>    status: resp.status,</div>
				<div>    statusText: resp.statusText,</div>
				<div>    headers: respHeaders,</div>
				<div>  {'}'});</div>
				<div>{'}'}</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
				</svg>
				<div>
					<h4 class="font-semibold text-amber-400">Key detail: Host header rewriting</h4>
					<p class="mt-1 text-sm text-gray-400">
						You must set the <code class="text-gray-300">Host</code> header to Supabase's hostname.
						Without this, Supabase will reject the request because the Host header would
						be your custom domain, which Supabase does not recognize.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Step 3: WebSocket support ===== -->
	<section id="step-3" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">6. Step 3: Add WebSocket support</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase Realtime uses WebSockets. To proxy them, you need to detect WebSocket upgrade
			requests, open a connection to Supabase's WebSocket server, and relay messages in both
			directions using Cloudflare's <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">WebSocketPair</code> API.
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">src/index.ts (WebSocket handler)</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">async function</span> <span class="text-yellow-200">handleWebSocket</span>(</div>
				<div>  <span class="text-blue-300">request</span>: <span class="text-yellow-200">Request</span>,</div>
				<div>  <span class="text-blue-300">env</span>: <span class="text-yellow-200">Env</span></div>
				<div>): <span class="text-yellow-200">Promise</span>&lt;<span class="text-yellow-200">Response</span>&gt; {'{'}</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">url</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">URL</span>(request.url);</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">upstream</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">URL</span>(env.SUPABASE_URL);</div>
				<div>  upstream.pathname = url.pathname;</div>
				<div>  upstream.search = url.search;</div>
				<div class="mt-2">  <span class="text-gray-500">// Convert https: to wss: for WebSocket</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">wsUrl</span> = upstream.<span class="text-yellow-200">toString</span>()</div>
				<div>    .<span class="text-yellow-200">replace</span>(<span class="text-amber-300">"https:"</span>, <span class="text-amber-300">"wss:"</span>)</div>
				<div>    .<span class="text-yellow-200">replace</span>(<span class="text-amber-300">"http:"</span>, <span class="text-amber-300">"ws:"</span>);</div>
				<div class="mt-2">  <span class="text-gray-500">// Connect to Supabase WebSocket</span></div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">upResp</span> = <span class="text-purple-400">await</span> <span class="text-yellow-200">fetch</span>(wsUrl, {'{'}</div>
				<div>    headers: request.headers,</div>
				<div>  {'}'});</div>
				<div class="mt-2">  <span class="text-purple-400">const</span> <span class="text-blue-300">upWs</span> = upResp.webSocket;</div>
				<div>  <span class="text-purple-400">if</span> (!upWs) {'{'}</div>
				<div>    <span class="text-purple-400">return new</span> <span class="text-yellow-200">Response</span>(</div>
				<div>      <span class="text-amber-300">"WebSocket connection failed"</span>, {'{'} status: <span class="text-blue-300">502</span> {'}'}</div>
				<div>    );</div>
				<div>  {'}'}</div>
				<div>  upWs.<span class="text-yellow-200">accept</span>();</div>
				<div class="mt-2">  <span class="text-gray-500">// Create client-side WebSocket pair</span></div>
				<div>  <span class="text-purple-400">const</span> [<span class="text-blue-300">client</span>, <span class="text-blue-300">server</span>] =</div>
				<div>    Object.<span class="text-yellow-200">values</span>(<span class="text-purple-400">new</span> <span class="text-yellow-200">WebSocketPair</span>());</div>
				<div>  server.<span class="text-yellow-200">accept</span>();</div>
				<div class="mt-2">  <span class="text-gray-500">// Relay messages bidirectionally</span></div>
				<div>  upWs.<span class="text-yellow-200">addEventListener</span>(<span class="text-amber-300">"message"</span>, (e) => {'{'}</div>
				<div>    <span class="text-purple-400">try</span> {'{'} server.<span class="text-yellow-200">send</span>(e.data); {'}'}</div>
				<div>    <span class="text-purple-400">catch</span> {'{'} <span class="text-gray-500">/* client gone */</span> {'}'}</div>
				<div>  {'}'});</div>
				<div>  server.<span class="text-yellow-200">addEventListener</span>(<span class="text-amber-300">"message"</span>, (e) => {'{'}</div>
				<div>    <span class="text-purple-400">try</span> {'{'} upWs.<span class="text-yellow-200">send</span>(e.data); {'}'}</div>
				<div>    <span class="text-purple-400">catch</span> {'{'} <span class="text-gray-500">/* upstream gone */</span> {'}'}</div>
				<div>  {'}'});</div>
				<div class="mt-2">  <span class="text-gray-500">// Relay close events</span></div>
				<div>  upWs.<span class="text-yellow-200">addEventListener</span>(<span class="text-amber-300">"close"</span>, (e) => {'{'}</div>
				<div>    <span class="text-purple-400">try</span> {'{'} server.<span class="text-yellow-200">close</span>(e.code, e.reason); {'}'}</div>
				<div>    <span class="text-purple-400">catch</span> {'{'}{' }'}</div>
				<div>  {'}'});</div>
				<div>  server.<span class="text-yellow-200">addEventListener</span>(<span class="text-amber-300">"close"</span>, (e) => {'{'}</div>
				<div>    <span class="text-purple-400">try</span> {'{'} upWs.<span class="text-yellow-200">close</span>(e.code, e.reason); {'}'}</div>
				<div>    <span class="text-purple-400">catch</span> {'{'}{' }'}</div>
				<div>  {'}'});</div>
				<div class="mt-2">  <span class="text-purple-400">return new</span> <span class="text-yellow-200">Response</span>(<span class="text-purple-400">null</span>, {'{'}</div>
				<div>    status: <span class="text-blue-300">101</span>,</div>
				<div>    webSocket: client,</div>
				<div>  {'}'});</div>
				<div>{'}'}</div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			This creates a <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">WebSocketPair</code>
			- one end (<code class="text-blue-300">client</code>) goes back to the browser, the other
			(<code class="text-blue-300">server</code>) stays in the Worker. Every message from Supabase
			gets relayed to the browser and vice versa. Close and error events are also forwarded to
			ensure clean disconnects.
		</p>
	</section>


	<!-- ===== Step 4: CORS ===== -->
	<section id="step-4" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">7. Step 4: Configure CORS</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Browsers send a CORS preflight (OPTIONS request) before any cross-origin API call. Your
			proxy needs to handle these correctly or every request from your frontend will be blocked
			by the browser itself.
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">src/index.ts (CORS handlers)</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">function</span> <span class="text-yellow-200">isOriginAllowed</span>(</div>
				<div>  <span class="text-blue-300">origin</span>: <span class="text-yellow-200">string</span>,</div>
				<div>  <span class="text-blue-300">allowed</span>: <span class="text-yellow-200">string</span></div>
				<div>): <span class="text-yellow-200">boolean</span> {'{'}</div>
				<div>  <span class="text-purple-400">if</span> (allowed === <span class="text-amber-300">"*"</span>) <span class="text-purple-400">return true</span>;</div>
				<div>  <span class="text-purple-400">return</span> allowed.<span class="text-yellow-200">split</span>(<span class="text-amber-300">","</span>)</div>
				<div>    .<span class="text-yellow-200">map</span>(o => o.<span class="text-yellow-200">trim</span>())</div>
				<div>    .<span class="text-yellow-200">includes</span>(origin);</div>
				<div>{'}'}</div>
				<div class="mt-3"><span class="text-purple-400">function</span> <span class="text-yellow-200">handlePreflight</span>(</div>
				<div>  <span class="text-blue-300">request</span>: <span class="text-yellow-200">Request</span>,</div>
				<div>  <span class="text-blue-300">env</span>: <span class="text-yellow-200">Env</span></div>
				<div>): <span class="text-yellow-200">Response</span> {'{'}</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">origin</span> = request.headers.<span class="text-yellow-200">get</span>(<span class="text-amber-300">"Origin"</span>) || <span class="text-amber-300">"*"</span>;</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">headers</span> = <span class="text-purple-400">new</span> <span class="text-yellow-200">Headers</span>();</div>
				<div class="mt-2">  <span class="text-purple-400">if</span> (<span class="text-yellow-200">isOriginAllowed</span>(origin, env.ALLOWED_ORIGINS)) {'{'}</div>
				<div>    headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Origin"</span>, origin);</div>
				<div>    headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Credentials"</span>, <span class="text-amber-300">"true"</span>);</div>
				<div>    headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Methods"</span>,</div>
				<div>      <span class="text-amber-300">"GET, POST, PUT, PATCH, DELETE, OPTIONS"</span>);</div>
				<div>    headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Headers"</span>,</div>
				<div>      request.headers.<span class="text-yellow-200">get</span>(<span class="text-amber-300">"Access-Control-Request-Headers"</span>) || <span class="text-amber-300">"*"</span>);</div>
				<div>    headers.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Max-Age"</span>, <span class="text-amber-300">"86400"</span>);</div>
				<div>  {'}'}</div>
				<div class="mt-2">  <span class="text-purple-400">return new</span> <span class="text-yellow-200">Response</span>(<span class="text-purple-400">null</span>, {'{'} status: <span class="text-blue-300">204</span>, headers {'}'});</div>
				<div>{'}'}</div>
				<div class="mt-3"><span class="text-purple-400">function</span> <span class="text-yellow-200">addCorsHeaders</span>(</div>
				<div>  <span class="text-blue-300">respHeaders</span>: <span class="text-yellow-200">Headers</span>,</div>
				<div>  <span class="text-blue-300">request</span>: <span class="text-yellow-200">Request</span>,</div>
				<div>  <span class="text-blue-300">env</span>: <span class="text-yellow-200">Env</span></div>
				<div>): <span class="text-yellow-200">void</span> {'{'}</div>
				<div>  <span class="text-purple-400">const</span> <span class="text-blue-300">origin</span> = request.headers.<span class="text-yellow-200">get</span>(<span class="text-amber-300">"Origin"</span>);</div>
				<div>  <span class="text-purple-400">if</span> (origin && <span class="text-yellow-200">isOriginAllowed</span>(origin, env.ALLOWED_ORIGINS)) {'{'}</div>
				<div>    respHeaders.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Origin"</span>, origin);</div>
				<div>    respHeaders.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Allow-Credentials"</span>, <span class="text-amber-300">"true"</span>);</div>
				<div>    respHeaders.<span class="text-yellow-200">set</span>(<span class="text-amber-300">"Access-Control-Expose-Headers"</span>, <span class="text-amber-300">"*"</span>);</div>
				<div>  {'}'}</div>
				<div>{'}'}</div>
			</div>
		</div>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
				</svg>
				<div>
					<h4 class="font-semibold text-brand-400">Security note: lock down origins</h4>
					<p class="mt-1 text-sm text-gray-400">
						Avoid setting <code class="text-gray-300">ALLOWED_ORIGINS</code> to <code class="text-gray-300">"*"</code> in production.
						Specify your exact frontend domains to prevent other sites from using your proxy.
						You can comma-separate multiple origins in the environment variable.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Step 5: Deploy and DNS ===== -->
	<section id="step-5" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">8. Step 5: Deploy and configure DNS</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Deploy the Worker to Cloudflare with a single command:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-gray-500"># Login to Cloudflare (first time only)</span></div>
				<div><span class="text-brand-400">wrangler</span> login</div>
				<div class="mt-3"><span class="text-gray-500"># Deploy the Worker</span></div>
				<div><span class="text-brand-400">wrangler</span> deploy</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			After deployment, configure DNS in your Cloudflare dashboard. Create a DNS record that
			points your subdomain to the Worker:
		</p>

		<div class="glass-card mb-6 overflow-x-auto rounded-xl p-5">
			<table class="w-full text-sm">
				<thead>
					<tr class="text-left text-gray-400">
						<th class="pb-3 pr-6 font-medium">Type</th>
						<th class="pb-3 pr-6 font-medium">Name</th>
						<th class="pb-3 pr-6 font-medium">Content</th>
						<th class="pb-3 font-medium">Proxy</th>
					</tr>
				</thead>
				<tbody class="text-gray-300">
					<tr>
						<td class="pr-6 py-1"><code class="text-brand-400">AAAA</code></td>
						<td class="pr-6 py-1"><code>api</code></td>
						<td class="pr-6 py-1"><code>100::</code></td>
						<td class="py-1"><span class="text-orange-400">Proxied</span></td>
					</tr>
				</tbody>
			</table>
		</div>

		<p class="leading-relaxed text-gray-300">
			The <code class="rounded bg-white/5 px-1.5 py-0.5 text-brand-400">AAAA</code> record with
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">100::</code> is a Cloudflare-specific
			placeholder for Worker routes - it tells Cloudflare to run your Worker for that hostname.
			Make sure the orange cloud (Proxied) is enabled. Your Worker should now be live at
			<code class="text-brand-400">api.yourapp.com</code>.
		</p>
	</section>


	<!-- ===== Step 6: Update client code ===== -->
	<section id="step-6" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">9. Step 6: Update your Supabase client code</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The only change in your frontend is the Supabase URL. Replace the default
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> URL with your
			custom proxy domain:
		</p>

		<div class="code-block mb-4 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-purple-400">import</span> {'{'} <span class="text-gray-300">createClient</span> {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
				<div class="mt-2"><span class="text-gray-500">// Before (blocked on Indian ISPs):</span></div>
				<div><span class="text-gray-500">// const supabaseUrl = 'https://xyz.supabase.co'</span></div>
				<div class="mt-2"><span class="text-gray-500">// After (routed through your proxy):</span></div>
				<div><span class="text-purple-400">const</span> <span class="text-blue-300">supabaseUrl</span> = <span class="text-brand-400">'https://api.yourapp.com'</span></div>
				<div><span class="text-purple-400">const</span> <span class="text-blue-300">supabaseKey</span> = <span class="text-amber-300">'your-anon-key'</span></div>
				<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(</div>
				<div>  supabaseUrl,</div>
				<div>  supabaseKey</div>
				<div>)</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			That is it. The Supabase client library does not care what domain serves the API -
			as long as the endpoints respond with the expected Supabase format. Your anon key stays
			the same. All auth, database, storage, and realtime functionality works exactly as before.
		</p>

		<div class="glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<polyline points="20 6 9 17 4 12"/>
				</svg>
				<div>
					<h4 class="font-semibold text-brand-400">Tip: use an environment variable</h4>
					<p class="mt-1 text-sm text-gray-400">
						Store the URL in an environment variable like <code class="text-gray-300">VITE_SUPABASE_URL</code>
						or <code class="text-gray-300">NEXT_PUBLIC_SUPABASE_URL</code> so you can switch between
						direct and proxied URLs per environment without changing code.
					</p>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 10: Testing ===== -->
	<section id="testing" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">10. Testing the proxy</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Before deploying to production, verify each layer of the proxy works.
			Use these <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">curl</code> commands:
		</p>

		<div class="code-block mb-6 overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-gray-500"># 1. Health check</span></div>
				<div><span class="text-brand-400">curl</span> https://api.yourapp.com/__health</div>
				<div class="text-gray-500"># Expected: {'{'}"status":"ok"{'}'}</div>

				<div class="mt-4"><span class="text-gray-500"># 2. Test REST API (list tables)</span></div>
				<div><span class="text-brand-400">curl</span> https://api.yourapp.com/rest/v1/ \</div>
				<div>  -H <span class="text-amber-300">"apikey: YOUR_ANON_KEY"</span> \</div>
				<div>  -H <span class="text-amber-300">"Authorization: Bearer YOUR_ANON_KEY"</span></div>

				<div class="mt-4"><span class="text-gray-500"># 3. Test CORS preflight</span></div>
				<div><span class="text-brand-400">curl</span> -X OPTIONS https://api.yourapp.com/rest/v1/ \</div>
				<div>  -H <span class="text-amber-300">"Origin: https://yourapp.com"</span> \</div>
				<div>  -H <span class="text-amber-300">"Access-Control-Request-Method: POST"</span> \</div>
				<div>  -v 2>&1 | <span class="text-brand-400">grep</span> -i access-control</div>
				<div class="text-gray-500"># Expected: Access-Control-Allow-Origin: https://yourapp.com</div>

				<div class="mt-4"><span class="text-gray-500"># 4. Test Auth endpoint</span></div>
				<div><span class="text-brand-400">curl</span> https://api.yourapp.com/auth/v1/settings \</div>
				<div>  -H <span class="text-amber-300">"apikey: YOUR_ANON_KEY"</span></div>

				<div class="mt-4"><span class="text-gray-500"># 5. Verify proxy header</span></div>
				<div><span class="text-brand-400">curl</span> -I https://api.yourapp.com/rest/v1/ \</div>
				<div>  -H <span class="text-amber-300">"apikey: YOUR_ANON_KEY"</span> | <span class="text-brand-400">grep</span> X-Proxied-By</div>
				<div class="text-gray-500"># Expected: X-Proxied-By: supabase-proxy</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			To test WebSocket/Realtime, open your browser DevTools and check the Network tab for
			<code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">ws://</code> connections.
			You should see WebSocket frames flowing through your proxy domain.
			If any test fails, check your <code class="text-gray-300">wrangler tail</code> logs:
		</p>

		<div class="code-block overflow-x-auto rounded-xl p-1">
			<div class="flex items-center gap-2 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<div class="h-3 w-3 rounded-full bg-white/10"></div>
				<span class="ml-3 text-xs text-gray-500">terminal</span>
			</div>
			<div class="px-6 pb-5 font-mono text-sm leading-7">
				<div><span class="text-gray-500"># Stream live Worker logs</span></div>
				<div><span class="text-brand-400">wrangler</span> tail --format pretty</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 11: Or just use JioBase ===== -->
	<section id="or-use-jiobase" class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">11. Or just use JioBase</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Building and maintaining a Supabase proxy is completely doable - but it takes time.
			You need to handle CORS edge cases, WebSocket reliability, rate limiting, monitoring,
			and keep the Worker updated as Supabase evolves its API. If you would rather skip all
			that and get a production-ready proxy in 60 seconds, that is exactly what
			<a href="/" class="text-brand-400 underline underline-offset-4 transition hover:text-brand-300">JioBase</a> does.
		</p>

		<div class="glass-card overflow-hidden rounded-2xl border-brand-400/20">
			<div class="border-b border-white/5 bg-brand-400/5 px-6 py-4">
				<h3 class="font-semibold text-brand-400">What you get with JioBase</h3>
			</div>
			<div class="p-6">
				<div class="grid gap-4 sm:grid-cols-2">
					<ul class="space-y-3 text-sm text-gray-300">
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Full HTTP + WebSocket proxy
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							CORS configuration dashboard
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Custom subdomains (myapp.jiobase.com)
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Real-time analytics and monitoring
						</li>
					</ul>
					<ul class="space-y-3 text-sm text-gray-300">
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Rate limiting built-in
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Custom domain support (Pro plan)
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Cloudflare's 300+ edge locations
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Free tier: 50k requests/month
						</li>
					</ul>
				</div>

				<div class="mt-6">
					<p class="mb-4 text-sm text-gray-400">Setup is literally one line of code:</p>
					<div class="code-block overflow-x-auto rounded-xl p-1">
						<div class="flex items-center gap-2 px-4 py-3">
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<div class="h-3 w-3 rounded-full bg-white/10"></div>
							<span class="ml-3 text-xs text-gray-500">lib/supabase.ts</span>
						</div>
						<div class="px-6 pb-5 font-mono text-sm leading-7">
							<div><span class="text-purple-400">import</span> {'{'} <span class="text-gray-300">createClient</span> {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
							<div class="mt-2"><span class="text-purple-400">export const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(</div>
							<div>  <span class="text-gray-500">// </span><span class="text-red-400 line-through opacity-50">'https://xyz.supabase.co'</span></div>
							<div>  <span class="text-brand-400">'https://xyz.jiobase.com'</span>,</div>
							<div>  <span class="text-amber-300">'your-anon-key'</span></div>
							<div>)</div>
						</div>
					</div>
				</div>

				<div class="mt-6 flex flex-col gap-3 sm:flex-row">
					<a
						href="/register"
						class="rounded-lg bg-brand-400 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-brand-300"
					>
						Get started free
					</a>
					<a
						href="/#how-it-works"
						class="rounded-lg border border-white/10 px-6 py-3 text-center text-sm font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
					>
						See how it works
					</a>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Do I need a paid Cloudflare plan?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					No. The Cloudflare Workers free tier includes 100,000 requests per day, which is sufficient for most development and production apps. You only need a paid plan if you exceed that limit.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Will Supabase Auth (cookies, sessions) work through the proxy?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes. The proxy forwards all headers, cookies, and request bodies unchanged. Supabase Auth (sign up, sign in, OAuth, magic links, password reset) works exactly the same through the proxy. Make sure your CORS configuration includes your frontend domain.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can I use this with Supabase Storage file uploads?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes. File uploads, downloads, signed URLs, and bucket management all work through the proxy. The Worker streams request and response bodies, so even large file uploads are handled efficiently.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">How much latency does the proxy add?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Typically 1-5ms. Cloudflare Workers execute at the edge location closest to your users (300+ global locations), so the additional hop is minimal. This is significantly less than a VPN (50-200ms+).
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can I skip the manual setup and use a managed solution?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Yes. <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase</a> provides a managed Supabase reverse proxy with all the features described in this tutorial, plus a dashboard, analytics, rate limiting, and automatic updates. Free tier includes 50,000 requests/month.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Want a quick start without Wrangler CLI?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Try our <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator Tool</a>. Enter your Supabase URL, copy the generated code, and paste it directly into Cloudflare's dashboard editor. No CLI needed.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== Closing / Summary ===== -->
	<section class="mb-16 border-t border-white/5 pt-12">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Summary</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			In this tutorial, you built a complete Cloudflare Worker reverse proxy for Supabase that
			handles HTTP API requests, WebSocket Realtime connections, and CORS preflight. The key
			steps were:
		</p>

		<ol class="mb-6 space-y-2 text-gray-300">
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">1</span>
				<span>Scaffold the Worker with <code class="rounded bg-white/5 px-1 py-0.5 text-sm text-gray-300">wrangler</code> and configure your Supabase URL.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">2</span>
				<span>Write the HTTP proxy handler with Host header rewriting and redirect rewriting.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">3</span>
				<span>Add WebSocket support using <code class="rounded bg-white/5 px-1 py-0.5 text-sm text-gray-300">WebSocketPair</code> for Supabase Realtime.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">4</span>
				<span>Handle CORS preflight and response headers for allowed origins.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">5</span>
				<span>Deploy to Cloudflare and configure DNS routing for your custom domain.</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-400/10 text-xs font-bold text-brand-400">6</span>
				<span>Swap the Supabase URL in your client code and test.</span>
			</li>
		</ol>

		<p class="leading-relaxed text-gray-300">
			If you prefer a managed solution that handles all of this automatically - plus
			analytics, rate limiting, and a dashboard - check out
			<a href="/register" class="text-brand-400 underline underline-offset-4 transition hover:text-brand-300">JioBase</a>.
			Free tier includes 50,000 requests per month.
		</p>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="proxy-supabase-cloudflare-workers" suggestedSlugs={["supabase-blocked-india-fix", "fix-supabase-jio-5-minutes", "test-if-backend-blocked-india"]} />
</article>
