<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let supabaseUrl = $state('');
	let isValid = $state(false);
	let validationError = $state('');
	let copied = $state(false);

	function normalizeUrl(raw: string): string {
		let url = raw.trim();
		if (!url) return '';
		// Add protocol if missing
		if (!url.startsWith('http://') && !url.startsWith('https://')) {
			url = 'https://' + url;
		}
		// Normalize to https
		url = url.replace(/^http:\/\//, 'https://');
		// Strip trailing slash
		url = url.replace(/\/+$/, '');
		return url;
	}

	$effect(() => {
		const raw = supabaseUrl.trim();
		if (!raw) {
			isValid = false;
			validationError = '';
			return;
		}

		const normalized = normalizeUrl(raw);
		const pattern = /^https:\/\/[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.supabase\.co$/;

		if (pattern.test(normalized)) {
			isValid = true;
			validationError = '';
		} else {
			isValid = false;
			validationError = 'Enter a valid Supabase project URL (e.g., https://xyz.supabase.co)';
		}
	});

	let normalizedUrl = $derived(normalizeUrl(supabaseUrl));

	function buildWorkerCode(url: string): string {
		return `const SUPABASE_URL = "${url}";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, SUPABASE_URL);

    const headers = new Headers(request.headers);

    const supabaseRequest = new Request(targetUrl.toString(), {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
      redirect: "follow",
    });

    const response = await fetch(supabaseRequest);
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    responseHeaders.set("Access-Control-Allow-Headers", "*");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: responseHeaders });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};`;
	}

	let generatedCode = $derived(isValid ? buildWorkerCode(normalizedUrl) : '');

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(generatedCode);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Fallback: select text for manual copy
			const codeEl = document.querySelector('#generated-code');
			if (codeEl) {
				const range = document.createRange();
				range.selectNodeContents(codeEl);
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(range);
			}
		}
	}
</script>

<svelte:head>
	<title>Free Supabase Proxy Worker Generator - JioBase Tools</title>
	<meta name="description" content="Generate a ready-to-deploy Cloudflare Worker script that proxies your Supabase traffic. Bypass DNS blocks on Jio, Airtel & ACT Fibernet in India." />
	<meta property="og:title" content="Free Supabase Proxy Worker Generator" />
	<meta property="og:description" content="Generate a Cloudflare Worker script to proxy your Supabase traffic and bypass ISP DNS blocks in India." />
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://jiobase.com/tools/worker-generator" />
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white">
	<Navbar active="tools" />

	<div class="pt-[73px]">

		<!-- ===== HERO ===== -->
		<section class="glow-brand py-16 md:py-24">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/20 bg-brand-400/5 px-4 py-1.5">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
					</svg>
					<span class="text-xs font-medium text-brand-400">Free Tool</span>
				</div>

				<h1 class="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
					Deploy Your Own
					<br />
					<span class="text-gradient">Supabase Proxy</span>
				</h1>

				<p class="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
					Generate a ready-to-deploy Cloudflare Worker that proxies your Supabase traffic. Free, open-source, and takes under 5 minutes.
				</p>
			</div>
		</section>


		<!-- ===== GENERATOR TOOL ===== -->
		<section class="py-12">
			<div class="mx-auto max-w-4xl px-6">
				<div class="glass-card rounded-2xl p-6 sm:p-8">
					<h2 class="text-xl font-bold">Generate Your Worker</h2>
					<p class="mt-1 text-sm text-gray-400">Paste your Supabase project URL and we'll generate the Worker code for you.</p>

					<div class="mt-6">
						<label for="supabase-url" class="mb-1.5 block text-sm font-medium text-gray-300">Supabase Project URL</label>
						<input
							id="supabase-url"
							type="text"
							bind:value={supabaseUrl}
							class="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder-gray-500 focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/50 focus:outline-none transition"
							placeholder="https://your-project.supabase.co"
						/>
						{#if validationError}
							<p class="mt-1.5 text-sm text-red-400">{validationError}</p>
						{:else if isValid}
							<p class="mt-1.5 flex items-center gap-1.5 text-sm text-brand-400">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								{normalizedUrl}
							</p>
						{/if}
					</div>

					{#if isValid}
						<div class="mt-6">
							<div class="code-block rounded-xl p-1">
								<div class="flex items-center gap-2 px-4 py-3">
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<span class="ml-3 text-xs text-gray-500">worker.js</span>
									<button
										onclick={copyCode}
										class="ml-auto flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400 transition hover:bg-white/10 hover:text-white"
									>
										{#if copied}
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
											<span class="text-brand-400">Copied!</span>
										{:else}
											<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
											Copy
										{/if}
									</button>
								</div>
								<pre id="generated-code" class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7 text-gray-300"><code>{generatedCode}</code></pre>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</section>


		<!-- ===== STEP-BY-STEP GUIDE ===== -->
		<section class="py-12 md:py-16">
			<div class="mx-auto max-w-4xl px-6">
				<div class="mb-12 text-center">
					<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Deployment Guide</p>
					<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
						Deploy in 5 minutes
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-gray-400">
						Follow these steps to deploy your Supabase proxy worker on Cloudflare.
					</p>
				</div>

				<div class="space-y-12">

					<!-- Step 1 -->
					<div>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">1</div>
							<h3 class="text-xl font-bold tracking-tight">Create a Cloudflare account</h3>
						</div>
						<div class="mt-4 ml-11 space-y-3">
							<p class="leading-relaxed text-gray-300">
								Go to <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noopener" class="text-brand-400 hover:text-brand-300 transition underline decoration-brand-400/30">dash.cloudflare.com</a> and create a free account. No credit card required.
							</p>
							<div class="glass-card rounded-xl p-4">
								<div class="flex items-start gap-2">
									<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
									<p class="text-sm text-gray-400">
										Cloudflare Workers free tier includes <strong class="text-gray-200">100,000 requests per day</strong> — more than enough for most projects.
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Step 2 -->
					<div>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">2</div>
							<h3 class="text-xl font-bold tracking-tight">Create a new Worker</h3>
						</div>
						<div class="mt-4 ml-11 space-y-3">
							<p class="leading-relaxed text-gray-300">
								In your Cloudflare dashboard:
							</p>
							<ul class="space-y-2 text-gray-300">
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
									Navigate to <strong class="text-gray-200">Workers & Pages</strong> in the sidebar
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
									Click <strong class="text-gray-200">Create application</strong> → <strong class="text-gray-200">Create Worker</strong>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
									Name it something like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase-proxy</code>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400/60"></span>
									Click <strong class="text-gray-200">Deploy</strong> to create the placeholder worker
								</li>
							</ul>
						</div>
					</div>

					<!-- Step 3 -->
					<div>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">3</div>
							<h3 class="text-xl font-bold tracking-tight">Paste the generated code</h3>
						</div>
						<div class="mt-4 ml-11 space-y-3">
							<p class="leading-relaxed text-gray-300">
								After deployment, click <strong class="text-gray-200">Edit code</strong> on the worker page. Select all the existing code and replace it with the generated code from the tool above.
							</p>
							<p class="leading-relaxed text-gray-300">
								Click <strong class="text-gray-200">Save and Deploy</strong>. Your proxy is now live!
							</p>
							{#if !isValid}
								<div class="glass-card rounded-xl p-4">
									<div class="flex items-start gap-2">
										<svg class="mt-0.5 h-4 w-4 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
										<p class="text-sm text-gray-400">
											Enter your Supabase URL in the generator above to get the code.
										</p>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- Step 4 -->
					<div>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">4</div>
							<h3 class="text-xl font-bold tracking-tight">Test the proxy</h3>
						</div>
						<div class="mt-4 ml-11 space-y-3">
							<p class="leading-relaxed text-gray-300">
								Your worker will be available at a URL like:
							</p>
							<div class="code-block rounded-xl p-1">
								<div class="overflow-x-auto px-6 py-4 font-mono text-sm text-gray-300">
									https://supabase-proxy.your-subdomain.workers.dev
								</div>
							</div>
							<p class="leading-relaxed text-gray-300">
								Test it with a curl command:
							</p>
							<div class="code-block rounded-xl p-1">
								<div class="flex items-center gap-2 px-4 py-3">
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<span class="ml-3 text-xs text-gray-500">terminal</span>
								</div>
								<pre class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7 text-gray-300"><code>curl https://supabase-proxy.your-subdomain.workers.dev/rest/v1/</code></pre>
							</div>
							<p class="text-sm text-gray-400">
								If you get a response from Supabase (even a 401 Unauthorized), the proxy is working correctly.
							</p>
						</div>
					</div>

					<!-- Step 5 -->
					<div>
						<div class="flex items-center gap-3">
							<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-400/20 bg-brand-400/5 text-sm font-bold text-brand-400">5</div>
							<h3 class="text-xl font-bold tracking-tight">Update your app code</h3>
						</div>
						<div class="mt-4 ml-11 space-y-3">
							<p class="leading-relaxed text-gray-300">
								Replace your Supabase URL in your application with your Worker URL:
							</p>
							<div class="code-block rounded-xl p-1">
								<div class="flex items-center gap-2 px-4 py-3">
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<div class="h-3 w-3 rounded-full bg-white/10"></div>
									<span class="ml-3 text-xs text-gray-500">supabaseClient.ts</span>
								</div>
								<div class="overflow-x-auto px-6 pb-5 font-mono text-sm leading-7">
									<div><span class="text-purple-400">import</span> <span class="text-gray-300">{'{'} createClient {'}'}</span> <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span></div>
									<div class="mt-2"><span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span><span class="text-gray-300">(</span></div>
									<div><span class="text-gray-500">  // </span><span class="text-red-400 line-through opacity-50">'https://xyz.supabase.co'</span></div>
									<div>  <span class="text-brand-400">'https://supabase-proxy.your-subdomain.workers.dev'</span><span class="text-gray-300">,</span></div>
									<div>  <span class="text-amber-300">'your-anon-key'</span></div>
									<div><span class="text-gray-300">)</span></div>
								</div>
							</div>

							<div class="glass-card rounded-xl p-4">
								<div class="flex items-start gap-2">
									<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
									<p class="text-sm text-gray-400">
										<strong class="text-gray-200">Optional:</strong> Add a custom domain under Worker settings → Triggers → Custom Domains. Cloudflare handles SSL automatically.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>


		<!-- ===== COMPARISON ===== -->
		<section class="border-y border-white/5 bg-surface-200/30 py-16 md:py-24">
			<div class="mx-auto max-w-4xl px-6">
				<div class="mb-12 text-center">
					<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Compare</p>
					<h2 class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
						Self-host vs Managed
					</h2>
					<p class="mx-auto mt-4 max-w-2xl text-gray-400">
						The DIY worker works great for simple setups. For production apps, JioBase adds features you'll need.
					</p>
				</div>

				<div class="grid gap-6 md:grid-cols-2">
					<!-- DIY Card -->
					<div class="glass-card rounded-2xl p-6">
						<h3 class="text-lg font-semibold">DIY / Self-Host</h3>
						<p class="mt-1 text-sm text-gray-400">Deploy the worker yourself</p>
						<ul class="mt-5 space-y-3 text-sm">
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Full control over your worker</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Free (Cloudflare free tier)</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">No third-party dependency</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								<span class="text-gray-500">No WebSocket / Realtime support</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								<span class="text-gray-500">No analytics dashboard</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								<span class="text-gray-500">Manual setup & maintenance</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
								<span class="text-gray-500">One project per worker</span>
							</li>
						</ul>
					</div>

					<!-- Managed Card -->
					<div class="glass-card rounded-2xl border-brand-400/20 p-6">
						<div class="flex items-center gap-2">
							<h3 class="text-lg font-semibold">JioBase Managed</h3>
							<span class="rounded-full border border-brand-400/20 bg-brand-400/5 px-2.5 py-0.5 text-xs font-medium text-brand-400">Recommended</span>
						</div>
						<p class="mt-1 text-sm text-gray-400">We handle everything for you</p>
						<ul class="mt-5 space-y-3 text-sm">
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">One-click setup, no code needed</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Full WebSocket / Realtime support</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Built-in analytics dashboard</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">CORS configuration UI</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Rate limiting built-in</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Multiple apps from one account</span>
							</li>
							<li class="flex items-start gap-2.5">
								<svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
								<span class="text-gray-300">Automatic updates & improvements</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>


		<!-- ===== FAQ ===== -->
		<section class="py-12 md:py-16">
			<div class="mx-auto max-w-4xl px-6">
				<div class="mb-8 text-center">
					<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">FAQ</p>
					<h2 class="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Frequently Asked Questions</h2>
				</div>

				<div class="space-y-4">
					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Is this proxy free to deploy?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							Yes, completely free. Cloudflare Workers free tier includes 100,000 requests per day, which is more than enough for most projects. You do not need a paid Cloudflare plan.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Does this worker support WebSockets / Supabase Realtime?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							No. This basic worker handles HTTP requests only (REST API, Auth, Storage, Edge Functions). WebSocket/Realtime support requires additional code. For full WebSocket support out of the box, consider using <a href="/register" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">JioBase managed proxy</a>.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Do I need to change my Supabase anon key?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							No. Your anon key, service role key, and all other credentials stay exactly the same. The Supabase client library sends them as headers, and the proxy forwards everything unchanged to your Supabase project.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Can I add a custom domain to my worker?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							Yes. In your Cloudflare dashboard, go to your Worker's settings, then Triggers, and add a Custom Domain. Cloudflare handles SSL automatically. This lets you use something like <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">api.yourdomain.com</code> instead of the default <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.workers.dev</code> URL.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">Does this store or cache my data?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							No. The worker is a transparent pass-through proxy. It forwards requests to Supabase and returns responses without storing, caching, or modifying any data. Your data flows directly between your client and Supabase.
						</div>
					</details>

					<details class="group glass-card rounded-xl">
						<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
							<span class="font-medium">What about latency?</span>
							<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
						</summary>
						<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
							Cloudflare Workers run at the edge closest to your users across 300+ global locations. The proxy adds 1-5ms of latency, which is negligible compared to VPN overhead (50-200ms+) or DNS workarounds.
						</div>
					</details>
				</div>
			</div>
		</section>


		<!-- ===== CTA ===== -->
		<section class="py-16 md:py-24">
			<div class="mx-auto max-w-3xl px-6 text-center">
				<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 sm:p-12">
					<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
						Want a managed proxy instead?
					</h2>
					<p class="mx-auto mt-3 max-w-lg text-gray-400">
						Skip the setup. JioBase gives you WebSocket support, analytics, rate limiting, and a dashboard — all for free.
					</p>
					<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
						<a
							href="/register"
							class="rounded-xl bg-brand-400 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300"
						>
							Try JioBase free
						</a>
						<a
							href="/docs"
							class="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
						>
							Read the docs
						</a>
					</div>
				</div>
			</div>
		</section>


		<!-- ===== FOOTER ===== -->
		<footer class="border-t border-white/5 bg-[#0a0a0a] py-8">
			<div class="mx-auto max-w-4xl px-6">
				<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<div class="flex items-center gap-2">
						<div class="flex h-7 w-7 items-center justify-center rounded-md bg-brand-400/10">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z" fill="none" stroke="#3ecf8e" stroke-width="1.5"/>
								<path d="M9 12.5L14 12.5L12.5 10L16 12.5L12.5 15L14 12.5" fill="#3ecf8e"/>
							</svg>
						</div>
						<span class="text-sm font-semibold">JioBase</span>
					</div>

					<div class="flex items-center gap-6">
						<a href="/" class="text-sm text-gray-500 transition hover:text-gray-300">Home</a>
						<a href="/docs" class="text-sm text-gray-500 transition hover:text-gray-300">Docs</a>
						<a href="/blog" class="text-sm text-gray-500 transition hover:text-gray-300">Blog</a>
						<a href="https://github.com/sunithvs/jiobase" target="_blank" rel="noopener" class="text-sm text-gray-500 transition hover:text-gray-300">GitHub</a>
					</div>

					<p class="text-xs text-gray-600">
						&copy; {new Date().getFullYear()} JioBase. Built by <a href="https://sunithvs.com?utm_source=jiobase&utm_medium=footer&utm_campaign=tools" target="_blank" rel="noopener" class="text-gray-500 hover:text-gray-300 transition">sunithvs</a>
					</p>
				</div>
			</div>
		</footer>
	</div>
</div>
