<script lang="ts">
	const lastChecked = 'February 28, 2026';

	interface IspStatus {
		name: string;
		subscribers: string;
		supabaseStatus: 'blocked' | 'partial' | 'working' | 'unconfirmed';
		firebaseStatus: 'blocked' | 'partial' | 'working' | 'unconfirmed';
		notes: string;
		fixLink: string;
	}

	const ispStatuses: IspStatus[] = [
		{ name: 'Reliance Jio', subscribers: '500M+', supabaseStatus: 'blocked', firebaseStatus: 'working', notes: 'DNS poisoning confirmed. All supabase.co subdomains affected.', fixLink: '/fix/jio' },
		{ name: 'Bharti Airtel', subscribers: '380M+', supabaseStatus: 'blocked', firebaseStatus: 'working', notes: 'DNS poisoning confirmed. Mobile and broadband affected.', fixLink: '/fix/airtel' },
		{ name: 'BSNL', subscribers: '100M+', supabaseStatus: 'blocked', firebaseStatus: 'blocked', notes: 'Both platforms blocked. Most restrictive ISP.', fixLink: '/fix/bsnl' },
		{ name: 'ACT Fibernet', subscribers: '2M+', supabaseStatus: 'blocked', firebaseStatus: 'working', notes: 'DNS blocking confirmed in some cities. Inconsistent rollout.', fixLink: '/fix/act' },
		{ name: 'Vodafone Idea (Vi)', subscribers: '230M+', supabaseStatus: 'unconfirmed', firebaseStatus: 'working', notes: 'Not yet confirmed. May implement block per ministry order.', fixLink: '/fix/vodafone-idea' }
	];

	function statusColor(status: IspStatus['supabaseStatus']) {
		switch (status) {
			case 'blocked': return 'bg-red-400';
			case 'partial': return 'bg-amber-400';
			case 'working': return 'bg-green-400';
			case 'unconfirmed': return 'bg-gray-400';
		}
	}

	function statusText(status: IspStatus['supabaseStatus']) {
		switch (status) {
			case 'blocked': return 'text-red-400';
			case 'partial': return 'text-amber-400';
			case 'working': return 'text-green-400';
			case 'unconfirmed': return 'text-gray-400';
		}
	}

	function statusLabel(status: IspStatus['supabaseStatus']) {
		switch (status) {
			case 'blocked': return 'Blocked';
			case 'partial': return 'Partial';
			case 'working': return 'Working';
			case 'unconfirmed': return 'Unconfirmed';
		}
	}
</script>

<svelte:head>
	<title>Is Supabase Blocked in India? Live ISP Status | JioBase</title>
	<meta name="description" content="Check the current status of Supabase and Firebase blocking across Indian ISPs. Updated February 2026." />
	<meta name="keywords" content="is supabase blocked india, supabase india status, supabase down india, firebase blocked india status" />
	<meta property="og:title" content="Is Supabase Blocked in India? Live ISP Status" />
	<meta property="og:description" content="Check the current status of Supabase and Firebase blocking across Indian ISPs. Updated February 2026." />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Is Supabase Blocked in India? Live ISP Status" />
	<meta name="twitter:description" content="Check the current status of Supabase and Firebase blocking across Indian ISPs. Updated February 2026." />
</svelte:head>

<div class="mx-auto max-w-5xl px-6 py-16 md:py-24">

	<!-- ===== Header ===== -->
	<header class="mb-16 text-center">
		<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">India ISP Status</p>
		<h1 class="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Is Supabase Still Blocked in India?
		</h1>
		<p class="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
			Real-time tracking of Supabase and Firebase DNS blocking across major Indian ISPs. Last checked: <span class="text-white font-medium">{lastChecked}</span>
		</p>

		<!-- Overall status indicator -->
		<div class="mx-auto mt-8 max-w-xl glass-card rounded-2xl p-6">
			<div class="flex items-center justify-center gap-3">
				<span class="relative flex h-3.5 w-3.5">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
					<span class="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-400"></span>
				</span>
				<span class="text-lg font-semibold text-white">
					Supabase is currently <span class="text-red-400">BLOCKED</span> on major Indian ISPs
				</span>
			</div>
			<p class="mt-2 text-sm text-gray-500">
				Affecting 980M+ combined subscribers across Jio, Airtel, BSNL, and ACT Fibernet
			</p>
		</div>
	</header>


	<!-- ===== Status Table (Desktop) ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">ISP-by-ISP Status</h2>

		<!-- Desktop table -->
		<div class="hidden md:block glass-card overflow-hidden rounded-2xl">
			<table class="w-full text-left text-sm">
				<thead>
					<tr class="border-b border-white/5">
						<th class="px-6 py-4 font-semibold text-gray-400">ISP</th>
						<th class="px-6 py-4 font-semibold text-gray-400">Subscribers</th>
						<th class="px-6 py-4 font-semibold text-gray-400">Supabase</th>
						<th class="px-6 py-4 font-semibold text-gray-400">Firebase</th>
						<th class="px-6 py-4 font-semibold text-gray-400">Notes</th>
						<th class="px-6 py-4 font-semibold text-gray-400">Fix</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/5">
					{#each ispStatuses as isp}
						<tr class="transition hover:bg-white/[0.02]">
							<td class="px-6 py-4 font-medium text-white">{isp.name}</td>
							<td class="px-6 py-4 text-gray-400">{isp.subscribers}</td>
							<td class="px-6 py-4">
								<div class="flex items-center gap-2">
									<span class="inline-block h-2.5 w-2.5 rounded-full {statusColor(isp.supabaseStatus)}"></span>
									<span class={statusText(isp.supabaseStatus)}>{statusLabel(isp.supabaseStatus)}</span>
								</div>
							</td>
							<td class="px-6 py-4">
								<div class="flex items-center gap-2">
									<span class="inline-block h-2.5 w-2.5 rounded-full {statusColor(isp.firebaseStatus)}"></span>
									<span class={statusText(isp.firebaseStatus)}>{statusLabel(isp.firebaseStatus)}</span>
								</div>
							</td>
							<td class="px-6 py-4 text-gray-400 max-w-xs">{isp.notes}</td>
							<td class="px-6 py-4">
								<a href={isp.fixLink} class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">
									Fix guide &rarr;
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Mobile cards -->
		<div class="md:hidden space-y-4">
			{#each ispStatuses as isp}
				<div class="glass-card rounded-xl p-5">
					<div class="flex items-center justify-between">
						<h3 class="font-semibold text-white">{isp.name}</h3>
						<span class="text-xs text-gray-500">{isp.subscribers}</span>
					</div>

					<div class="mt-4 grid grid-cols-2 gap-3">
						<div class="rounded-lg bg-white/[0.03] px-3 py-2">
							<p class="text-xs text-gray-500 mb-1">Supabase</p>
							<div class="flex items-center gap-2">
								<span class="inline-block h-2 w-2 rounded-full {statusColor(isp.supabaseStatus)}"></span>
								<span class="text-sm font-medium {statusText(isp.supabaseStatus)}">{statusLabel(isp.supabaseStatus)}</span>
							</div>
						</div>
						<div class="rounded-lg bg-white/[0.03] px-3 py-2">
							<p class="text-xs text-gray-500 mb-1">Firebase</p>
							<div class="flex items-center gap-2">
								<span class="inline-block h-2 w-2 rounded-full {statusColor(isp.firebaseStatus)}"></span>
								<span class="text-sm font-medium {statusText(isp.firebaseStatus)}">{statusLabel(isp.firebaseStatus)}</span>
							</div>
						</div>
					</div>

					<p class="mt-3 text-sm text-gray-400">{isp.notes}</p>

					<a href={isp.fixLink} class="mt-3 inline-block text-sm text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">
						View fix guide &rarr;
					</a>
				</div>
			{/each}
		</div>
	</section>


	<!-- ===== How We Check ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">How We Check</h2>
		<p class="mb-6 leading-relaxed text-gray-300">
			Our status data comes from multiple verification methods to ensure accuracy:
		</p>

		<div class="grid gap-4 sm:grid-cols-3">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="4 17 10 11 4 5"></polyline>
						<line x1="12" y1="19" x2="20" y2="19"></line>
					</svg>
				</div>
				<h3 class="font-semibold text-white">DNS Lookups</h3>
				<p class="mt-2 text-sm text-gray-400">
					We perform DNS resolution tests from connections on each major ISP, comparing results against known Supabase IP ranges.
				</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
					</svg>
				</div>
				<h3 class="font-semibold text-white">HTTP Connectivity</h3>
				<p class="mt-2 text-sm text-gray-400">
					Direct HTTP and HTTPS requests to Supabase API endpoints, measuring response codes and timeout behavior.
				</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-400/10">
					<svg class="h-5 w-5 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v-2"></path>
						<circle cx="9" cy="7" r="4"></circle>
						<path d="M23 21v-2a4 4 0 00-3-3.87"></path>
						<path d="M16 3.13a4 4 0 010 7.75"></path>
					</svg>
				</div>
				<h3 class="font-semibold text-white">Community Reports</h3>
				<p class="mt-2 text-sm text-gray-400">
					Reports from developers across India are cross-verified against our automated checks to confirm ISP-specific status.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== What This Means ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">What Does This Mean for Your App?</h2>

		<div class="space-y-4 text-gray-300 leading-relaxed">
			<p>
				If your app uses Supabase and serves Indian users, the affected ISPs represent
				<strong class="text-white">over 1 billion combined subscribers</strong>. That is the vast majority of India's internet population unable to reach your backend.
			</p>
			<p>
				Even partial blocks on a single ISP affect tens of millions of users. For example, ACT Fibernet's block only covers certain cities, but those cities include Bangalore - India's tech capital and home to a large portion of the developer community.
			</p>
			<p>
				Firebase blocking on BSNL adds another layer of concern. If you were considering Firebase as a fallback, that option is already compromised on India's government-operated ISP.
			</p>
			<p>
				The only reliable fix is routing your API traffic through a domain that is not blocked. A reverse proxy on Cloudflare Workers is the most proven approach because Cloudflare's domains are not on any ISP block list.
			</p>
		</div>
	</section>


	<!-- ===== What You Can Do ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">What You Can Do</h2>

		<div class="grid gap-4 sm:grid-cols-3">
			<!-- Option 1: JioBase -->
			<a href="/register" class="group glass-card rounded-xl p-6 transition hover:border-white/10">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-400/10">
					<svg class="h-6 w-6 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2L20 6.5V12C20 17 16.5 21 12 23C7.5 21 4 17 4 12V6.5L12 2Z"/>
					</svg>
				</div>
				<h3 class="font-semibold text-white group-hover:text-brand-400 transition">Set Up JioBase Proxy</h3>
				<p class="mt-2 text-sm text-gray-400">
					Managed proxy service. Change one URL and your app works across all Indian ISPs. Free tier available.
				</p>
				<p class="mt-3 text-xs text-brand-400 font-medium">
					Get started &rarr;
				</p>
			</a>

			<!-- Option 2: DIY -->
			<a href="/tools/worker-generator" class="group glass-card rounded-xl p-6 transition hover:border-white/10">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">
					<svg class="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
					</svg>
				</div>
				<h3 class="font-semibold text-white group-hover:text-brand-400 transition">DIY with Cloudflare Workers</h3>
				<p class="mt-2 text-sm text-gray-400">
					Generate a ready-to-deploy Worker script. Full control, no third-party dependency. Uses Cloudflare free tier.
				</p>
				<p class="mt-3 text-xs text-brand-400 font-medium">
					Generate code &rarr;
				</p>
			</a>

			<!-- Option 3: Guide -->
			<a href="/blog/supabase-blocked-india-fix" class="group glass-card rounded-xl p-6 transition hover:border-white/10">
				<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10">
					<svg class="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
						<path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
					</svg>
				</div>
				<h3 class="font-semibold text-white group-hover:text-brand-400 transition">Read the Full Guide</h3>
				<p class="mt-2 text-sm text-gray-400">
					Detailed technical breakdown of the block, why it happened, and every available fix option compared.
				</p>
				<p class="mt-3 text-xs text-brand-400 font-medium">
					Read article &rarr;
				</p>
			</a>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-16">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">How often is this page updated?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					We check ISP status daily and update this page whenever a change is detected. Community reports are processed within 24 hours. The "Last checked" date at the top of the page indicates the most recent verification.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Is Supabase actually down or just blocked?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Supabase is fully operational. The issue is purely at the ISP DNS level in India. Users outside India or those using a VPN/proxy can access Supabase without any problems. The Supabase dashboard at supabase.com also works normally since only the .supabase.co API domain is blocked.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Will the block be lifted?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					There is no official timeline for lifting the block. Indian ISP DNS blocks have historically been unpredictable - some are lifted within weeks, others persist for years. The block on Medium lasted several years before being lifted. It is not advisable to wait for the block to be removed. Using a reverse proxy ensures your app works regardless of ISP-level changes.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Does a VPN fix the problem?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					A VPN fixes the problem for you as a developer, but it does not fix the problem for your users. You cannot ask every user of your app to install and run a VPN. A reverse proxy is the correct solution because it works transparently for all users without requiring any action on their part.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section>
		<div class="glass-card rounded-2xl border-t-2 border-brand-400 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Fix Your App in 5 Minutes</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				Do not wait for ISPs to unblock Supabase. Set up a JioBase proxy now and make your app accessible to every user in India.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/tools/worker-generator"
					class="flex items-center gap-2 rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
					</svg>
					Self-host instead
				</a>
			</div>
		</div>
	</section>

</div>
