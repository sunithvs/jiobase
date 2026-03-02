<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>How to Self-Host a Supabase Proxy on Cloudflare Workers (Free) | JioBase</title>
	<meta name="description" content="Step-by-step tutorial: deploy your own Supabase reverse proxy on Cloudflare Workers using create-jiobase. Covers setup, configuration, deployment, and testing." />
	<meta name="keywords" content="self-host supabase proxy, cloudflare workers supabase tutorial, supabase proxy setup guide, create-jiobase tutorial" />
	<meta property="og:title" content="How to Self-Host a Supabase Proxy on Cloudflare Workers (Free)" />
	<meta property="og:description" content="Step-by-step tutorial: deploy your own Supabase reverse proxy using create-jiobase CLI." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="How to Self-Host a Supabase Proxy on Cloudflare Workers (Free)" />
	<meta name="twitter:description" content="Deploy your own Supabase proxy on Cloudflare Workers. Free, step-by-step tutorial." />
	<meta property="article:published_time" content="2026-03-02" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="tutorial" />
	<meta property="article:tag" content="self-host" />
	<link rel="canonical" href="https://jiobase.com/blog/self-host-supabase-proxy-tutorial" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"How to Self-Host a Supabase Proxy on Cloudflare Workers (Free)","description":"Step-by-step tutorial on deploying your own Supabase reverse proxy using create-jiobase CLI.","datePublished":"2026-03-02T00:00:00+05:30","dateModified":"2026-03-02T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon-192.png"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/self-host-supabase-proxy-tutorial"},"image":"https://jiobase.com/favicon-192.png"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Self-Host Supabase Proxy Tutorial"}]},{"@type":"HowTo","name":"How to Self-Host a Supabase Proxy on Cloudflare Workers","step":[{"@type":"HowToStep","name":"Run the CLI","text":"Run npx create-jiobase in your terminal"},{"@type":"HowToStep","name":"Enter Supabase URL","text":"Provide your Supabase project URL when prompted"},{"@type":"HowToStep","name":"Configure services","text":"Select which Supabase services to proxy and set CORS origins"},{"@type":"HowToStep","name":"Deploy","text":"The CLI deploys your worker to Cloudflare automatically"},{"@type":"HowToStep","name":"Update your app","text":"Replace your Supabase URL with the new workers.dev URL"}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Tutorial</span>
			<time datetime="2026-03-02">March 2, 2026</time>
			<span>&middot;</span>
			<span>8 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			How to Self-Host a Supabase Proxy on Cloudflare Workers (Free)
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Complete walkthrough: from zero to a deployed Supabase reverse proxy on your own Cloudflare account. Covers every step including testing REST, Auth, and Realtime.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- Prerequisites -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Prerequisites</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			You need two things before starting:
		</p>

		<ul class="mb-4 space-y-3">
			<li class="flex items-start gap-3 text-gray-300">
				<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span><strong class="text-white">Node.js 18 or higher</strong> &mdash; check with <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">node -v</code>. If you don't have it, the shell installer handles this automatically.</span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
				<span><strong class="text-white">A Cloudflare account</strong> &mdash; sign up free at <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">dash.cloudflare.com</a>. No credit card required.</span>
			</li>
		</ul>

		<p class="leading-relaxed text-gray-300">
			You also need your Supabase project URL. Find it in your Supabase Dashboard under Settings &rarr; API &rarr; Project URL. It looks like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://abcdefgh.supabase.co</code>.
		</p>
	</section>


	<!-- Step 1 -->
	<section class="mb-14">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
			<h2 class="text-2xl font-bold tracking-tight">Run the CLI</h2>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Open your terminal and run:
		</p>

		<div class="code-block mb-4 rounded-xl p-4">
			<code class="font-mono text-sm text-gray-200">
				<span class="text-gray-500">$</span> npx create-jiobase
			</code>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			This downloads and runs the setup wizard. On first run, npm may ask to confirm the package install &mdash; type <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">y</code> and press enter.
		</p>
	</section>


	<!-- Step 2 -->
	<section class="mb-14">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
			<h2 class="text-2xl font-bold tracking-tight">Enter your Supabase URL</h2>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The wizard asks for your Supabase project URL first. Paste the full URL or just the subdomain &mdash; the CLI normalizes it automatically:
		</p>

		<div class="code-block mb-4 rounded-xl p-4">
			<pre class="font-mono text-sm text-gray-300 leading-6"><span class="text-gray-400">  Step 1 of 5</span> <span class="text-gray-600">-- Your Supabase project URL</span>
  <span class="text-cyan-400">&#9670;</span> Supabase project URL
  <span class="text-gray-600">|</span>  <span class="text-brand-400">https://abcdefgh.supabase.co</span>
  <span class="text-gray-600">&lfloor;</span></pre>
		</div>

		<p class="leading-relaxed text-gray-300">
			The CLI validates the URL format. You can enter <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">abcdefgh.supabase.co</code> without the protocol and it will add <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://</code> automatically.
		</p>
	</section>


	<!-- Step 3 -->
	<section class="mb-14">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
			<h2 class="text-2xl font-bold tracking-tight">Configure services and CORS</h2>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Next, the wizard asks about CORS origins and which Supabase services to enable:
		</p>

		<ul class="mb-4 space-y-3">
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span><strong class="text-white">Allowed origins:</strong> Use <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*</code> for development (allows all domains) or list specific origins like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://myapp.com</code></span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span><strong class="text-white">Services:</strong> Toggle which Supabase services the proxy should handle. All 6 are enabled by default (REST, Auth, Storage, Realtime, Edge Functions, GraphQL). Deselect any you don't use.</span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span><strong class="text-white">Worker name:</strong> Becomes your proxy URL: <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">https://&lt;name&gt;.&lt;you&gt;.workers.dev</code></span>
			</li>
		</ul>
	</section>


	<!-- Step 4 -->
	<section class="mb-14">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
			<h2 class="text-2xl font-bold tracking-tight">Deploy</h2>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The CLI scaffolds your project, installs dependencies, and asks if you want to deploy immediately. If you're not logged into Cloudflare yet, it opens <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">wrangler login</code> in your browser for OAuth authentication.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			After deployment, you'll see your proxy URL:
		</p>

		<div class="code-block rounded-xl p-4">
			<pre class="font-mono text-sm text-gray-300 leading-6"><span class="text-green-400">  &#10004;</span> Project scaffolded at ./supabase-proxy
<span class="text-green-400">  &#10004;</span> Dependencies installed
<span class="text-green-400">  &#10004;</span> Deployed to <span class="text-brand-400">https://supabase-proxy.you.workers.dev</span></pre>
		</div>
	</section>


	<!-- Step 5 -->
	<section class="mb-14">
		<div class="mb-4 flex items-center gap-3">
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">5</div>
			<h2 class="text-2xl font-bold tracking-tight">Update your app code</h2>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Replace your Supabase URL with the proxy URL. Only one line changes:
		</p>

		<div class="code-block mb-4 rounded-xl overflow-hidden">
			<div class="border-b border-white/6 px-4 py-2">
				<span class="text-xs text-gray-500">supabaseClient.ts</span>
			</div>
			<div class="px-4 py-4 font-mono text-sm leading-7">
				<div class="text-gray-500">// Before (blocked by ISP)</div>
				<div><span class="text-red-400 line-through opacity-60">const supabase = createClient('https://abc.supabase.co', key)</span></div>
				<div class="mt-2 text-gray-500">// After (works everywhere)</div>
				<div><span class="text-brand-400">const supabase = createClient('https://supabase-proxy.you.workers.dev', key)</span></div>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			Your anon key, service role key, and all RLS policies stay exactly the same. Only the base URL changes.
		</p>
	</section>


	<!-- Testing -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Testing your proxy</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Verify the proxy works with a few quick tests:
		</p>

		<h3 class="mb-2 text-lg font-semibold text-white">REST API</h3>
		<div class="code-block mb-6 rounded-xl p-4">
			<pre class="font-mono text-sm text-gray-300">curl https://supabase-proxy.you.workers.dev/rest/v1/ \
  -H "apikey: YOUR_ANON_KEY"</pre>
		</div>

		<h3 class="mb-2 text-lg font-semibold text-white">Health check</h3>
		<div class="code-block mb-6 rounded-xl p-4">
			<pre class="font-mono text-sm text-gray-300">curl https://supabase-proxy.you.workers.dev/__health</pre>
		</div>

		<h3 class="mb-2 text-lg font-semibold text-white">WebSocket (Realtime)</h3>
		<p class="mb-4 leading-relaxed text-gray-300">
			If you enabled the Realtime service, test WebSocket connectivity by using the Supabase client in your app. Subscriptions should connect through <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">wss://supabase-proxy.you.workers.dev/realtime/v1/websocket</code>.
		</p>
	</section>


	<!-- Troubleshooting -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Troubleshooting</h2>

		<div class="space-y-6">
			<div>
				<h3 class="mb-2 font-semibold text-white">"Wrangler CLI not found"</h3>
				<p class="text-sm leading-relaxed text-gray-400">
					The CLI offers to install wrangler globally. If that fails due to permissions, try <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">sudo npm install -g wrangler</code> on macOS/Linux or run your terminal as Administrator on Windows. Alternatively, use <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">npx wrangler</code> from inside the project directory.
				</p>
			</div>

			<div>
				<h3 class="mb-2 font-semibold text-white">"Not authenticated"</h3>
				<p class="text-sm leading-relaxed text-gray-400">
					The CLI runs <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">wrangler login</code> automatically. If it fails, run it manually: <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">npx wrangler login</code>. This opens your browser for Cloudflare OAuth.
				</p>
			</div>

			<div>
				<h3 class="mb-2 font-semibold text-white">Deploy failed</h3>
				<p class="text-sm leading-relaxed text-gray-400">
					You can always deploy later by navigating to your project directory and running <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">npx wrangler deploy</code>. The project is a standard Cloudflare Workers project.
				</p>
			</div>
		</div>
	</section>


	<!-- Next steps -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Next steps</h2>

		<ul class="space-y-3">
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span>Add a <a href="https://developers.cloudflare.com/workers/configuration/routing/custom-domains/" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">custom domain</a> instead of the workers.dev URL</span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span>Restrict CORS to your production domains instead of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*</code></span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span>Disable services you don't need for a smaller attack surface</span>
			</li>
			<li class="flex items-start gap-3 text-gray-300">
				<span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
				<span>Consider the <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4">managed JioBase service</a> if you need analytics and rate limiting</span>
			</li>
		</ul>
	</section>


	<hr class="mb-12 border-white/5" />

	<AuthorBio />
	<BlogSuggestions current="self-host-supabase-proxy-tutorial" />
</article>
