<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Privacy Policy - JioBase</title>
	<meta name="description" content="JioBase Privacy Policy. Learn how we collect, use, and protect your data when you use our Supabase reverse proxy service." />
	<meta property="og:title" content="Privacy Policy - JioBase" />
	<meta property="og:description" content="JioBase Privacy Policy. Learn how we collect, use, and protect your data." />
	<meta property="og:type" content="website" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebPage",
				"name": "Privacy Policy - JioBase",
				"description": "JioBase Privacy Policy. Learn how we collect, use, and protect your data when you use our Supabase reverse proxy service.",
				"url": "https://jiobase.com/privacy",
				"publisher": { "@id": "https://jiobase.com/#organization" }
			},
			{
				"@type": "BreadcrumbList",
				"itemListElement": [
					{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://jiobase.com" },
					{ "@type": "ListItem", "position": 2, "name": "Privacy Policy" }
				]
			}
		]
	})}</script>`}
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a]">
	<Navbar />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]"></div>

	<div class="mx-auto max-w-3xl px-6 py-16">

		<!-- Header -->
		<div class="mb-12">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Legal</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Privacy Policy</h1>
			<div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
				<span>Effective Date: March 1, 2026</span>
				<span>Last Updated: March 1, 2026</span>
			</div>
		</div>

		<div class="space-y-12">

			<!-- 1. Introduction -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">1. Introduction</h2>
				<p class="leading-relaxed text-gray-300">
					JioBase is a managed reverse proxy service that routes Supabase API traffic through Cloudflare's global edge network. The service is designed to bypass ISP-level DNS blocking of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> in India, allowing developers to keep their applications functioning without infrastructure changes.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					This Privacy Policy explains what personal data JioBase collects, how that data is used, and your rights regarding your information. It applies to all users of the JioBase website (<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jiobase.com</code>), the JioBase dashboard, the JioBase management API, and the proxy infrastructure.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					By registering for a JioBase account or using the service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with this policy, please do not use the service.
				</p>
				<p class="mt-3 leading-relaxed text-gray-300">
					<strong class="text-white">Disclaimer:</strong> JioBase is an independent project operated by Sunith VS. It is not affiliated with, endorsed by, or connected to Supabase Inc., Cloudflare Inc., Jio Platforms Limited, or Reliance Industries. The name "JioBase" is a project name and domain, not a registered trade name or business entity.
				</p>
			</section>

			<!-- 2. Data Controller Information -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">2. Data Controller Information</h2>
				<div class="glass-card rounded-xl p-5">
					<div class="space-y-3 text-sm text-gray-300">
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Name</strong>
							<span>Sunith VS</span>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Role</strong>
							<span>Individual Developer and Data Fiduciary</span>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Location</strong>
							<span>India</span>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Website</strong>
							<a href="https://sunithvs.com" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">sunithvs.com</a>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Email</strong>
							<a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>
						</div>
					</div>
				</div>
			</section>

			<!-- 3. Data We Collect -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">3. Data We Collect</h2>
				<p class="mb-6 leading-relaxed text-gray-300">
					JioBase collects the minimum data necessary to provide the service. The data we collect falls into the following categories:
				</p>

				<!-- 3.1 Account Data -->
				<div class="mb-6">
					<h3 class="mb-3 text-lg font-semibold text-white">3.1 Account Data</h3>
					<p class="mb-3 text-sm leading-relaxed text-gray-400">
						Collected when you register for a JioBase account:
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Email address</strong> - used as your unique identifier and for account communications</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Password (hashed)</strong> - stored only as a PBKDF2 hash with 100,000 iterations using SHA-256. Your plaintext password is never stored</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Name</strong> - used to personalize your dashboard experience</span>
						</li>
					</ul>
				</div>

				<!-- 3.2 App Configuration Data -->
				<div class="mb-6">
					<h3 class="mb-3 text-lg font-semibold text-white">3.2 App Configuration Data</h3>
					<p class="mb-3 text-sm leading-relaxed text-gray-400">
						Collected when you create a proxy app:
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">App name</strong> - a label you choose for your proxy app</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Slug</strong> - a unique subdomain identifier (e.g., <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">myapp.jiobase.com</code>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Supabase project URL</strong> - the upstream Supabase URL your proxy routes traffic to</span>
						</li>
					</ul>
				</div>

				<!-- 3.3 Usage Data -->
				<div class="mb-6">
					<h3 class="mb-3 text-lg font-semibold text-white">3.3 Usage Data</h3>
					<p class="mb-3 text-sm leading-relaxed text-gray-400">
						Collected automatically as your proxy handles requests:
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Request counts</strong> - the total number of API requests processed by your proxy app</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Timestamps</strong> - when each request was processed</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">HTTP status codes</strong> - the response status returned by Supabase (e.g., 200, 404, 500)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Response latency</strong> - the time taken to fulfill each proxied request</span>
						</li>
					</ul>
				</div>

				<!-- 3.4 Session Data -->
				<div class="mb-6">
					<h3 class="mb-3 text-lg font-semibold text-white">3.4 Session Data</h3>
					<p class="mb-3 text-sm leading-relaxed text-gray-400">
						Collected when you log in to the JioBase dashboard:
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Session token</strong> - a randomly generated identifier stored in a secure cookie</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">IP address at login</strong> - recorded at the time of authentication</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">User agent</strong> - the browser and operating system used to access the dashboard</span>
						</li>
					</ul>
				</div>

				<!-- 3.5 Technical Data -->
				<div>
					<h3 class="mb-3 text-lg font-semibold text-white">3.5 Technical Data</h3>
					<p class="mb-3 text-sm leading-relaxed text-gray-400">
						Collected automatically when you access the JioBase website or dashboard:
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Browser type and version</strong></span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Device type</strong> (desktop, mobile, tablet)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span><strong class="text-white">Referring URL</strong></span>
						</li>
					</ul>
				</div>
			</section>

			<!-- 4. Data That Transits Our Infrastructure -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">4. Data That Transits Our Infrastructure (NOT Collected)</h2>

				<div class="mb-6 glass-card rounded-xl border-brand-400/20 p-5">
					<div class="flex items-start gap-3">
						<svg class="mt-0.5 h-5 w-5 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
						<p class="text-sm leading-relaxed text-gray-300">
							<strong class="text-white">This is the most important section of this policy.</strong> Because JioBase acts as a reverse proxy, all of your Supabase traffic flows through our infrastructure. However, JioBase's application code does not read, store, log, cache, or process the contents of this traffic. The proxy simply forwards requests to Supabase and returns responses to your client.
						</p>
					</div>
				</div>

				<p class="mb-4 leading-relaxed text-gray-300">
					The following types of data pass through JioBase's proxy but are <strong class="text-white">never collected, stored, logged, cached, or processed</strong> by JioBase:
				</p>

				<ul class="space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
						<span><strong class="text-white">API request and response payloads</strong> - the actual data your application sends to and receives from Supabase (database rows, JSON responses, form data)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
						<span><strong class="text-white">Supabase authentication tokens (JWT)</strong> - your users' access tokens, refresh tokens, and session data managed by Supabase Auth</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
						<span><strong class="text-white">File upload and download content</strong> - images, documents, and other files transferred through Supabase Storage</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
						<span><strong class="text-white">WebSocket message payloads</strong> - Realtime subscription data, presence updates, and broadcast messages</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400"></span>
						<span><strong class="text-white">Database query contents and results</strong> - SQL queries, PostgREST filter parameters, RPC function arguments, and returned data</span>
					</li>
				</ul>

				<div class="mt-6 glass-card rounded-xl p-5">
					<h3 class="mb-2 text-sm font-semibold text-white">Cloudflare's Role in Transit</h3>
					<p class="text-sm leading-relaxed text-gray-400">
						JioBase runs on Cloudflare Workers. TLS encryption is terminated at Cloudflare's edge network, which means Cloudflare has technical access to the unencrypted request and response data in transit. This is standard for any service hosted behind Cloudflare and is necessary for the proxy to function. However, JioBase's application code does not access, inspect, or log payload contents at any point. Cloudflare's handling of data in transit is governed by <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Cloudflare's Privacy Policy</a>.
					</p>
				</div>
			</section>

			<!-- 5. How We Use Your Data -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">5. How We Use Your Data</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase uses the data described in Section 3 for the following purposes:
				</p>
				<ul class="space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Service operation</strong> - to authenticate you, route proxy traffic to the correct Supabase project, and display usage metrics in your dashboard</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Rate limiting and quota enforcement</strong> - to track your usage against your plan limits (free tier: 1 app, 50,000 requests per month) and enforce rate limits</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Abuse detection and prevention</strong> - to identify unusual traffic patterns that may indicate misuse of the service</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Account communications</strong> - to send you essential service notifications such as quota warnings, security alerts, or changes to the terms of service</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Service improvement</strong> - to analyze aggregated, anonymized usage patterns to improve the reliability and performance of the proxy</span>
					</li>
				</ul>
			</section>

			<!-- 6. Legal Basis for Processing -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">6. Legal Basis for Processing</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase processes your personal data under the following legal bases:
				</p>
				<div class="space-y-4">
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-2 text-sm font-semibold text-white">Consent (Registration)</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							By creating a JioBase account, you provide explicit consent for us to process your account data for the purpose of providing the service. You may withdraw this consent at any time by deleting your account.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-2 text-sm font-semibold text-white">Contractual Necessity</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							Processing of app configuration data and usage metrics is necessary to fulfill our contractual obligation to provide the proxy service, enforce plan limits, and display your usage dashboard.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-2 text-sm font-semibold text-white">Legitimate Interest</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							Processing of session data, technical data, and aggregated analytics is carried out in our legitimate interest to maintain the security, stability, and reliability of the service, and to prevent abuse.
						</p>
					</div>
				</div>
			</section>

			<!-- 7. Data Sharing and Third Parties -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">7. Data Sharing and Third Parties</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase does not sell, rent, or trade your personal data to any third party. Data is shared only in the following limited circumstances:
				</p>
				<div class="space-y-4">
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-2 text-sm font-semibold text-white">Cloudflare, Inc. (Infrastructure Provider)</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							JioBase's entire infrastructure runs on Cloudflare's platform, including Workers (compute), D1 (database), KV (key-value storage), Pages (web hosting), and Analytics Engine (metrics). Cloudflare processes data as a sub-processor on our behalf and in accordance with their own privacy policy. You can review <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Cloudflare's Privacy Policy</a> for details on how they handle data.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-2 text-sm font-semibold text-white">Law Enforcement and Legal Requirements</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							JioBase may disclose your personal data if required to do so by law, regulation, legal process, or enforceable governmental request. This includes responding to lawful requests from Indian authorities under the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023. We will notify you of such requests unless legally prohibited from doing so.
						</p>
					</div>
				</div>
			</section>

			<!-- 8. Data Retention -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">8. Data Retention</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase retains your data only for as long as necessary to provide the service and fulfill legal obligations:
				</p>
				<div class="glass-card overflow-x-auto rounded-xl">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-white/5">
								<th class="px-5 py-3 text-left font-semibold text-white">Data Type</th>
								<th class="px-5 py-3 text-left font-semibold text-white">Retention Period</th>
							</tr>
						</thead>
						<tbody class="text-gray-400">
							<tr class="border-b border-white/5">
								<td class="px-5 py-3">Account data (email, name, hashed password)</td>
								<td class="px-5 py-3">While your account is active, plus 30 days after account deletion</td>
							</tr>
							<tr class="border-b border-white/5">
								<td class="px-5 py-3">App configuration data</td>
								<td class="px-5 py-3">While your account is active, plus 30 days after account deletion</td>
							</tr>
							<tr class="border-b border-white/5">
								<td class="px-5 py-3">Usage metrics (request counts, latency, status codes)</td>
								<td class="px-5 py-3">12 months from the date of collection</td>
							</tr>
							<tr class="border-b border-white/5">
								<td class="px-5 py-3">Session data</td>
								<td class="px-5 py-3">Expires per session time-to-live (TTL) configuration</td>
							</tr>
							<tr class="border-b border-white/5">
								<td class="px-5 py-3">Transit data (API payloads, tokens, files, WebSocket messages)</td>
								<td class="px-5 py-3"><strong class="text-white">Not retained.</strong> This data passes through and is never stored.</td>
							</tr>
							<tr>
								<td class="px-5 py-3">System and infrastructure logs</td>
								<td class="px-5 py-3">Per Cloudflare's retention policy (typically 72 hours)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<!-- 9. Your Rights -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">9. Your Rights (Under DPDP Act, 2023)</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the following rights:
				</p>
				<div class="space-y-4">
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Access</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							You have the right to obtain a summary of your personal data held by JioBase, including the processing activities performed on that data. You can view most of your data directly through the dashboard. For a complete data export, contact us at <a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Correction</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							You have the right to correct inaccurate or incomplete personal data. You can update your name and email through the dashboard, or contact us for assistance.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Erasure (Account Deletion)</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							You have the right to request the deletion of your personal data. When you delete your account, all associated data (account information, app configurations, and usage metrics) will be permanently removed within 30 days. To request account deletion, use the account settings page in the dashboard or contact us directly.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Withdraw Consent</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							You may withdraw your consent for data processing at any time by deleting your account. Withdrawal of consent does not affect the lawfulness of processing carried out before the withdrawal.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Nominate</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							Under the DPDP Act, 2023, you have the right to nominate another individual to exercise your data rights on your behalf in the event of your death or incapacity. To register a nominee, contact us at <a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>.
						</p>
					</div>
					<div class="glass-card rounded-xl p-5">
						<h3 class="mb-1 text-sm font-semibold text-white">Right to Grievance Redressal</h3>
						<p class="text-sm leading-relaxed text-gray-400">
							You have the right to file a complaint regarding the processing of your personal data. See Section 17 (Grievance Officer) for the complaint process and timelines.
						</p>
					</div>
				</div>
			</section>

			<!-- 10. Data Security -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">10. Data Security</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase implements technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction:
				</p>
				<ul class="space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Password hashing</strong> - all passwords are hashed using PBKDF2 with 100,000 iterations and SHA-256. Plaintext passwords are never stored or logged.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">TLS encryption in transit</strong> - all connections to JioBase (both from clients and to Supabase) use TLS encryption. Connections without TLS are rejected.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Cloudflare infrastructure security</strong> - all data at rest in D1 and KV is encrypted by Cloudflare. Cloudflare's data centers implement physical security controls and are SOC 2 Type II certified.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Secure session cookies</strong> - the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jb_session</code> cookie is configured as HTTP-only and Secure, preventing client-side JavaScript access and ensuring transmission only over HTTPS.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Timing-safe authentication</strong> - login and session validation use constant-time comparison functions to prevent timing-based attacks.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Rate limiting and lockout</strong> - login endpoints implement rate limiting and account lockout mechanisms to prevent brute-force attacks.</span>
					</li>
				</ul>
			</section>

			<!-- 11. Cookies -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">11. Cookies</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase uses a single cookie that is strictly necessary for the service to function:
				</p>
				<div class="glass-card overflow-x-auto rounded-xl">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-white/5">
								<th class="px-5 py-3 text-left font-semibold text-white">Cookie</th>
								<th class="px-5 py-3 text-left font-semibold text-white">Purpose</th>
								<th class="px-5 py-3 text-left font-semibold text-white">Type</th>
							</tr>
						</thead>
						<tbody class="text-gray-400">
							<tr>
								<td class="px-5 py-3"><code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jb_session</code></td>
								<td class="px-5 py-3">Authenticates your session when logged in to the dashboard</td>
								<td class="px-5 py-3">Strictly necessary, HTTP-only, Secure</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="mt-4 text-sm leading-relaxed text-gray-400">
					JioBase does <strong class="text-white">not</strong> use any tracking cookies, analytics cookies, advertising cookies, or third-party cookies. No cookie consent banner is required because the sole cookie used is strictly necessary for the service to function.
				</p>
			</section>

			<!-- 12. Children's Privacy -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">12. Children's Privacy</h2>
				<p class="leading-relaxed text-gray-300">
					JioBase is a developer tool intended for use by software developers and businesses. The service is not directed at individuals under the age of 18. JioBase does not knowingly collect personal data from children under 18. If you believe that a child under 18 has provided personal data to JioBase, please contact us at <a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>, and we will promptly delete the data and terminate the associated account.
				</p>
			</section>

			<!-- 13. International Data Transfers -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">13. International Data Transfers</h2>
				<p class="leading-relaxed text-gray-300">
					JioBase processes data on Cloudflare's global edge network, which spans over 300 cities in more than 100 countries. Your data may be processed at any of Cloudflare's data center locations worldwide, including locations outside of India. Cloudflare applies consistent security and privacy protections across its entire network, regardless of location. By using JioBase, you acknowledge that your data may be transferred to and processed in locations outside India as part of Cloudflare's standard infrastructure operations.
				</p>
			</section>

			<!-- 14. DPDP Act 2023 Compliance -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">14. DPDP Act, 2023 Compliance</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase is committed to compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act). As a Data Fiduciary under the Act, JioBase adheres to the following obligations:
				</p>
				<ul class="space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Consent</strong> - JioBase obtains clear, informed consent at the time of account registration. Consent is specific to the purposes described in this policy and can be withdrawn at any time.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Purpose limitation</strong> - personal data is processed only for the specific purposes described in Section 5 of this policy. Data is not repurposed without obtaining fresh consent.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Storage limitation</strong> - personal data is retained only for the durations specified in Section 8. Data is deleted when it is no longer necessary for the stated purpose or upon your request.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Data accuracy</strong> - JioBase provides mechanisms for you to review and correct your personal data through the dashboard and by contacting the Grievance Officer.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Reasonable security safeguards</strong> - JioBase implements the technical and organizational security measures described in Section 10 to protect personal data against breaches.</span>
					</li>
				</ul>
			</section>

			<!-- 15. CERT-In Compliance -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">15. CERT-In Compliance</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase complies with the directions issued by the Indian Computer Emergency Response Team (CERT-In) under Section 70B of the Information Technology Act, 2000:
				</p>
				<ul class="space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Incident reporting</strong> - cybersecurity incidents, including data breaches, unauthorized access, and service disruptions, will be reported to CERT-In within the mandated timeframe of 6 hours of becoming aware of the incident.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Log retention</strong> - system logs relevant to cybersecurity are maintained within Cloudflare's infrastructure. JioBase cooperates with Cloudflare to ensure logs are available for the periods mandated by CERT-In directives.</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span><strong class="text-white">Point of contact</strong> - the Grievance Officer named in Section 17 serves as the designated point of contact for CERT-In communications.</span>
					</li>
				</ul>
			</section>

			<!-- 16. Intermediary Status -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">16. Intermediary Status</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					JioBase operates as an intermediary under Section 2(1)(w) of the Information Technology Act, 2000. As a reverse proxy service, JioBase functions as a mere conduit for data transmitted between your application's end users and your Supabase project.
				</p>
				<p class="mb-4 leading-relaxed text-gray-300">
					Under Section 79 of the IT Act, JioBase is eligible for safe harbor protection because:
				</p>
				<ul class="space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>JioBase's role is limited to providing access to a communication system over which data is transmitted or temporarily stored</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>JioBase does not initiate the transmission, select the receiver of the transmission, or select or modify the information contained in the transmission</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>JioBase observes due diligence as required under the IT Act and applicable rules</span>
					</li>
				</ul>
				<p class="mt-4 leading-relaxed text-gray-300">
					You, as the developer, remain solely responsible for the data that your application transmits through the proxy and for ensuring that your use of Supabase complies with applicable laws.
				</p>
			</section>

			<!-- 17. Grievance Officer -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">17. Grievance Officer</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, JioBase has appointed the following Grievance Officer:
				</p>
				<div class="glass-card rounded-xl p-5">
					<div class="space-y-3 text-sm text-gray-300">
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Name</strong>
							<span>Sunith VS</span>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Email</strong>
							<a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>
						</div>
					</div>
				</div>
				<div class="mt-4 space-y-3 text-sm text-gray-400">
					<p>
						<strong class="text-white">Complaint process:</strong> If you have a concern about how JioBase handles your personal data, you may submit a written complaint to the Grievance Officer at the email address above.
					</p>
					<ul class="space-y-2">
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span>Your complaint will be acknowledged within <strong class="text-white">24 hours</strong> of receipt</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span>The Grievance Officer will investigate and resolve your complaint within <strong class="text-white">15 days</strong> of acknowledgment</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
							<span>If you are not satisfied with the resolution, you may escalate the matter to the Data Protection Board of India established under the DPDP Act, 2023</span>
						</li>
					</ul>
				</div>
			</section>

			<!-- 18. Changes to This Privacy Policy -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">18. Changes to This Privacy Policy</h2>
				<p class="mb-3 leading-relaxed text-gray-300">
					JioBase may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:
				</p>
				<ul class="space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>We will provide at least <strong class="text-white">30 days' notice</strong> before material changes take effect</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>Notice will be provided via email to the address associated with your account</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>The "Last Updated" date at the top of this page will be revised</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"></span>
						<span>Continued use of the service after the effective date of the updated policy constitutes acceptance of the changes</span>
					</li>
				</ul>
			</section>

			<!-- 19. Contact Information -->
			<section>
				<h2 class="mb-4 text-2xl font-bold tracking-tight text-white">19. Contact Information</h2>
				<p class="mb-4 leading-relaxed text-gray-300">
					If you have any questions about this Privacy Policy, your personal data, or your rights, you can reach us through the following channels:
				</p>
				<div class="glass-card rounded-xl p-5">
					<div class="space-y-3 text-sm text-gray-300">
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Email</strong>
							<a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>
						</div>
						<div class="flex flex-col gap-1 sm:flex-row sm:gap-3">
							<strong class="w-32 shrink-0 text-white">Website</strong>
							<a href="https://sunithvs.com" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">sunithvs.com</a>
						</div>
					</div>
				</div>
			</section>

		</div>
	</div>

	<!-- Footer -->
	<footer class="border-t border-white/5 bg-[#0a0a0a] py-8">
		<div class="mx-auto max-w-3xl px-6">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<div class="flex items-center gap-4 text-sm text-gray-500">
					<a href="/" class="transition hover:text-gray-300">Home</a>
					<a href="/docs" class="transition hover:text-gray-300">Docs</a>
					<a href="/blog" class="transition hover:text-gray-300">Blog</a>
					<a href="/privacy" class="font-medium text-gray-300">Privacy</a>
				</div>
				<p class="text-xs text-gray-600">&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.</p>
			</div>
		</div>
	</footer>
</div>
