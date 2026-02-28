<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<title>Terms of Service - JioBase</title>
	<meta name="description" content="Terms of Service for JioBase, a managed reverse proxy for Supabase API traffic through Cloudflare Workers." />
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a]">
	<Navbar />

	<!-- Spacer for fixed navbar -->
	<div class="pt-[73px]"></div>

	<div class="mx-auto max-w-3xl px-6 py-16">
		<!-- Header -->
		<div class="mb-12">
			<p class="text-sm font-semibold uppercase tracking-wider text-brand-400">Legal</p>
			<h1 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Terms of Service</h1>
			<div class="mt-3 flex flex-col gap-1 text-sm text-gray-500">
				<p><strong class="text-gray-400">Effective Date:</strong> March 1, 2026</p>
				<p><strong class="text-gray-400">Last Updated:</strong> March 1, 2026</p>
			</div>
		</div>

		<!-- Table of Contents -->
		<div class="mb-12 glass-card rounded-xl p-6">
			<h2 class="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Contents</h2>
			<nav class="space-y-2 text-sm">
				<a href="#agreement" class="block text-gray-300 transition hover:text-brand-400">1. Agreement to Terms</a>
				<a href="#service-description" class="block text-gray-300 transition hover:text-brand-400">2. Description of Service</a>
				<a href="#account-registration" class="block text-gray-300 transition hover:text-brand-400">3. Account Registration</a>
				<a href="#data-handling" class="block text-gray-300 transition hover:text-brand-400">4. Data Transit vs. Data Storage</a>
				<a href="#acceptable-use" class="block text-gray-300 transition hover:text-brand-400">5. Acceptable Use</a>
				<a href="#prohibited-activities" class="block text-gray-300 transition hover:text-brand-400">6. Prohibited Activities</a>
				<a href="#service-availability" class="block text-gray-300 transition hover:text-brand-400">7. Service Availability</a>
				<a href="#upstream-dependencies" class="block text-gray-300 transition hover:text-brand-400">8. Upstream Dependencies</a>
				<a href="#isp-disclaimer" class="block text-gray-300 transition hover:text-brand-400">9. ISP and Network Disclaimer</a>
				<a href="#intellectual-property" class="block text-gray-300 transition hover:text-brand-400">10. Intellectual Property</a>
				<a href="#limitation-of-liability" class="block text-gray-300 transition hover:text-brand-400">11. Limitation of Liability</a>
				<a href="#indemnification" class="block text-gray-300 transition hover:text-brand-400">12. Indemnification</a>
				<a href="#termination" class="block text-gray-300 transition hover:text-brand-400">13. Termination</a>
				<a href="#governing-law" class="block text-gray-300 transition hover:text-brand-400">14. Governing Law</a>
				<a href="#changes" class="block text-gray-300 transition hover:text-brand-400">15. Changes to Terms</a>
				<a href="#force-majeure" class="block text-gray-300 transition hover:text-brand-400">16. Force Majeure</a>
				<a href="#general" class="block text-gray-300 transition hover:text-brand-400">17. General Provisions</a>
				<a href="#contact" class="block text-gray-300 transition hover:text-brand-400">18. Contact Information</a>
			</nav>
		</div>

		<!-- Content -->
		<div class="space-y-12">

			<!-- 1. Agreement to Terms -->
			<section id="agreement">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">1. Agreement to Terms</h2>
				<p class="text-gray-300 leading-relaxed">
					These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you", or "your") and Sunith VS, an individual developer operating the project <strong class="text-white">JioBase</strong> ("JioBase", "we", "us", or "our"), governing your access to and use of the JioBase service available at <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jiobase.com</code> and all associated subdomains, APIs, and tools (collectively, the "Service"). JioBase is a project name and domain, not a registered trade name or business entity.
				</p>
				<p class="mt-4 text-gray-300 leading-relaxed">
					By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Service. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
				</p>
				<p class="mt-4 text-gray-300 leading-relaxed">
					You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use this Service.
				</p>
			</section>

			<!-- 2. Description of Service -->
			<section id="service-description">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">2. Description of Service</h2>
				<p class="text-gray-300 leading-relaxed">
					JioBase is a managed reverse proxy service that routes Supabase API traffic through Cloudflare's global edge network. The Service is designed to provide an alternative network path for API requests in situations where direct connectivity to <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> may be unavailable, such as ISP-level DNS blocking.
				</p>

				<div class="mt-6 glass-card rounded-xl p-5">
					<h3 class="text-lg font-semibold text-white mb-3">What JioBase is</h3>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							A transparent HTTP/WebSocket reverse proxy for Supabase APIs
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							A pass-through relay that forwards requests to Supabase and returns responses without modification
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							Hosted entirely on Cloudflare's infrastructure (Workers, D1, KV, Pages)
						</li>
					</ul>
				</div>

				<div class="mt-4 glass-card rounded-xl p-5">
					<h3 class="text-lg font-semibold text-white mb-3">What JioBase is not</h3>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
							Not a VPN, anonymization tool, or general-purpose proxy
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
							Not a data storage or caching service for user content
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
							Not a tool designed to circumvent lawful content restrictions or access prohibited material
						</li>
					</ul>
				</div>

				<p class="mt-4 text-gray-300 leading-relaxed">
					The Service supports the full Supabase API surface, including REST (PostgREST), Authentication, Storage, Realtime (WebSockets), Edge Functions, and GraphQL endpoints.
				</p>
			</section>

			<!-- 3. Account Registration -->
			<section id="account-registration">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">3. Account Registration</h2>
				<p class="text-gray-300 leading-relaxed">
					To use the Service, you must create an account by providing a valid email address and password. You agree to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						Provide accurate, current, and complete information during registration
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Maintain and promptly update your account information to keep it accurate
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Maintain the confidentiality of your password and not share your credentials with any third party
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Immediately notify us of any unauthorized access to or use of your account
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">e.</span>
						Accept responsibility for all activity that occurs under your account
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					We reserve the right to refuse registration, suspend, or terminate accounts at our discretion, including for suspected violations of these Terms.
				</p>
				<p class="mt-4 text-sm text-gray-500 leading-relaxed">
					Passwords are hashed using PBKDF2 with 100,000 iterations of SHA-256 before storage. We never store plaintext passwords. However, the security of your account also depends on your choice of a strong, unique password.
				</p>
			</section>

			<!-- 4. Data Transit vs. Data Storage -->
			<section id="data-handling">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">4. Data Transit vs. Data Storage</h2>
				<p class="text-gray-300 leading-relaxed">
					Understanding how your data flows through JioBase is critical. We distinguish between two categories:
				</p>

				<div class="mt-6 glass-card rounded-xl p-5">
					<h3 class="text-lg font-semibold text-white mb-3">Transit Data (data that passes through)</h3>
					<p class="text-sm text-gray-400 leading-relaxed">
						All Supabase API payloads, including database queries, authentication tokens, file uploads, and WebSocket messages, flow through JioBase's proxy infrastructure. This data is classified as <strong class="text-white">"Transit Data."</strong>
					</p>
					<ul class="mt-3 space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							JioBase does <strong class="text-white">not</strong> read, inspect, parse, modify, store, cache, or log Transit Data
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							The proxy code forwards request and response bodies verbatim between client and Supabase
						</li>
						<li class="flex items-start gap-2">
							<svg class="mt-1 h-4 w-4 shrink-0 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
							All connections are encrypted via TLS (HTTPS/WSS) in both directions
						</li>
					</ul>
					<p class="mt-3 text-sm text-gray-500 leading-relaxed">
						<strong class="text-gray-400">TLS disclosure:</strong> Cloudflare terminates TLS at the edge as part of its standard infrastructure. This means Transit Data is briefly decrypted in Cloudflare's memory during forwarding, consistent with how all Cloudflare-proxied services operate. JioBase's application code does not access, inspect, or log these payloads at any point.
					</p>
				</div>

				<div class="mt-4 glass-card rounded-xl p-5">
					<h3 class="text-lg font-semibold text-white mb-3">Service Data (data we collect)</h3>
					<p class="text-sm text-gray-400 leading-relaxed">
						JioBase collects and stores limited data necessary to operate the Service. This data is classified as <strong class="text-white">"Service Data"</strong> and includes:
					</p>
					<ul class="mt-3 space-y-2 text-sm text-gray-400">
						<li class="flex items-start gap-2">
							<span class="mt-0.5 shrink-0 text-brand-400">-</span>
							<strong class="text-gray-300">Account information:</strong> email address, hashed password, account creation date
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5 shrink-0 text-brand-400">-</span>
							<strong class="text-gray-300">App configuration:</strong> app name, slug, target Supabase project URL, CORS settings, rate limit settings
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5 shrink-0 text-brand-400">-</span>
							<strong class="text-gray-300">Usage metrics:</strong> request count, timestamps, HTTP response status codes, response latency
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-0.5 shrink-0 text-brand-400">-</span>
							<strong class="text-gray-300">Session data:</strong> authentication session tokens (stored as the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jb_session</code> cookie)
						</li>
					</ul>
					<p class="mt-3 text-sm text-gray-500 leading-relaxed">
						Service Data is stored in Cloudflare D1 (SQLite) and Cloudflare KV. It is not sold, shared with third parties, or used for advertising purposes.
					</p>
				</div>
			</section>

			<!-- 5. Acceptable Use -->
			<section id="acceptable-use">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">5. Acceptable Use</h2>
				<p class="text-gray-300 leading-relaxed">
					You agree to use the Service only for its intended purpose: proxying legitimate Supabase API traffic for your own applications. In addition, you agree to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						Comply with Supabase's own Terms of Service and Acceptable Use Policy at all times
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Comply with all applicable local, state, national, and international laws and regulations
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Use the Service only with Supabase projects that you own or have authorization to access
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Ensure that the content and data transmitted through the proxy complies with all applicable laws
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">e.</span>
						Not exceed the usage limits of your plan tier (free tier: 1 app, 50,000 requests per month)
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">f.</span>
						Not resell, sublicense, or commercially redistribute access to the proxy service without prior written consent
					</li>
				</ul>
			</section>

			<!-- 6. Prohibited Activities -->
			<section id="prohibited-activities">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">6. Prohibited Activities</h2>
				<p class="text-gray-300 leading-relaxed">
					You may not use the Service to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Transmit, store, or process illegal content, including child sexual abuse material, terrorist content, or content that violates Indian law
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Conduct distributed denial-of-service (DDoS) attacks, credential stuffing, brute force attacks, or any form of network abuse
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Attempt to gain unauthorized access to Supabase projects, accounts, or systems belonging to others
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Use the proxy to hide the origin of malicious traffic or to circumvent security controls on Supabase projects
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Proxy traffic to non-Supabase endpoints or use the Service as a general-purpose proxy or VPN
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Scrape, mine, or harvest data from Supabase projects belonging to others
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Reverse-engineer, decompile, or disassemble the Service's proprietary components
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Interfere with or disrupt the Service, its servers, or the networks connected to it
					</li>
					<li class="flex items-start gap-2">
						<svg class="mt-1 h-4 w-4 shrink-0 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
						Resell or redistribute access to JioBase proxy endpoints without written authorization
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					Violation of any prohibited activity may result in immediate account suspension or termination without prior notice.
				</p>
			</section>

			<!-- 7. Service Availability -->
			<section id="service-availability">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">7. Service Availability</h2>
				<p class="text-gray-300 leading-relaxed">
					JioBase is provided on an "as available" basis. While we strive to maintain high availability, we do not guarantee any specific uptime percentage or service level.
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						The Service may experience downtime for maintenance, updates, or upgrades. We will endeavor to provide reasonable advance notice of planned maintenance via the dashboard or email.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						We reserve the right to modify, suspend, or discontinue any part of the Service, temporarily or permanently, with or without notice.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						For discontinuation of the Service as a whole, we will provide at least 30 days' notice to allow you to make alternative arrangements.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						We are not liable for any loss or damage arising from Service interruptions, regardless of cause.
					</li>
				</ul>
			</section>

			<!-- 8. Upstream Dependencies -->
			<section id="upstream-dependencies">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">8. Upstream Dependencies</h2>
				<p class="text-gray-300 leading-relaxed">
					JioBase depends on third-party infrastructure and services, primarily Supabase and Cloudflare. You acknowledge and agree that:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						JioBase is not responsible for outages, errors, downtime, or degraded performance of Supabase or Cloudflare services
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Changes to Supabase's API, pricing, terms of service, or infrastructure may affect the functionality of JioBase, and we are not liable for such changes
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						If Supabase blocks, rate-limits, or restricts traffic originating from JioBase proxy endpoints, we are not liable for any resulting disruption
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						JioBase is an independent project and has no affiliation with, endorsement from, or partnership with Supabase Inc., Cloudflare Inc., Jio Platforms Limited, or Reliance Industries. The name "JioBase" is a project name only and does not imply any connection to Jio or Reliance brands.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">e.</span>
						Your use of Supabase through JioBase remains subject to Supabase's own Terms of Service and policies
					</li>
				</ul>
			</section>

			<!-- 9. ISP/Network Disclaimer -->
			<section id="isp-disclaimer">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">9. ISP and Network Disclaimer</h2>
				<p class="text-gray-300 leading-relaxed">
					JioBase provides an alternative network path for Supabase API traffic. However, you acknowledge and agree that:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						We do not guarantee that the Service will successfully bypass any specific ISP restriction, DNS block, or network-level interference
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						ISPs or government authorities may at any time block or restrict access to JioBase domains (including <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.jiobase.com</code>), and we are not responsible for such blocks
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Network conditions, routing, and latency between your users, Cloudflare's edge, and Supabase's servers are outside our control
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						The Service does not guarantee connectivity from any specific geographic region, ISP, or network provider
					</li>
				</ul>
				<div class="mt-4 glass-card rounded-xl p-5">
					<div class="flex items-start gap-3">
						<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
						<p class="text-sm leading-relaxed text-gray-400">
							You are solely responsible for evaluating whether using a proxy service is appropriate and lawful for your specific use case and jurisdiction. JioBase does not provide legal advice.
						</p>
					</div>
				</div>
			</section>

			<!-- 10. Intellectual Property -->
			<section id="intellectual-property">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">10. Intellectual Property</h2>
				<p class="text-gray-300 leading-relaxed">
					The Service, including its source code, design, documentation, branding, logos, and all associated intellectual property, is owned by Sunith VS and is protected by applicable intellectual property laws.
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						<strong class="text-gray-300">Our rights:</strong> We retain all rights, title, and interest in and to the Service, including any modifications, improvements, or derivative works. The JioBase name, logo, and related marks are our property.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						<strong class="text-gray-300">Your rights:</strong> You retain all rights to your data and content. Nothing in these Terms transfers ownership of your data to us. The Service merely acts as a conduit for your data in transit.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						<strong class="text-gray-300">License grant:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service in accordance with these Terms for the duration of your account.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						<strong class="text-gray-300">Open source:</strong> Portions of the Service may be released under open-source licenses. Where applicable, the terms of those licenses govern the use of that specific code.
					</li>
				</ul>
			</section>

			<!-- 11. Limitation of Liability -->
			<section id="limitation-of-liability">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">11. Limitation of Liability</h2>
				<div class="glass-card rounded-xl p-5">
					<p class="text-sm text-gray-400 leading-relaxed uppercase font-semibold text-gray-300 mb-3">Important notice</p>
					<p class="text-sm text-gray-400 leading-relaxed">
						THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
					</p>
				</div>

				<p class="mt-6 text-gray-300 leading-relaxed">
					To the maximum extent permitted by applicable law:
				</p>
				<ul class="mt-4 space-y-3 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						JioBase, its operator, affiliates, and contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, business opportunities, or goodwill, arising from your use of or inability to use the Service.
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Our total aggregate liability for all claims arising out of or related to these Terms or the Service shall not exceed the greater of: (i) the total fees you paid to JioBase during the twelve (12) months immediately preceding the event giving rise to the claim, or (ii) one thousand Indian Rupees (INR 1,000).
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						We are not liable for any damages arising from: Supabase outages or API changes; Cloudflare infrastructure failures; ISP-level blocking of JioBase or Supabase domains; government-ordered restrictions on internet access; unauthorized access to your account due to your failure to safeguard credentials; or any third-party actions beyond our reasonable control.
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					Some jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.
				</p>
			</section>

			<!-- 12. Indemnification -->
			<section id="indemnification">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">12. Indemnification</h2>
				<p class="text-gray-300 leading-relaxed">
					You agree to indemnify, defend, and hold harmless JioBase, its operator (Sunith VS), and any contributors from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						Your use of the Service or any activity conducted through your account
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Your violation of these Terms, any applicable law, or any third-party rights
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						The content or data you transmit through the Service
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Any claim by a third party related to your use of the Supabase project proxied through JioBase
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					This indemnification obligation will survive the termination of these Terms and your use of the Service.
				</p>
			</section>

			<!-- 13. Termination -->
			<section id="termination">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">13. Termination</h2>

				<h3 class="text-lg font-semibold text-white mb-3">Termination by you</h3>
				<p class="text-gray-300 leading-relaxed">
					You may terminate your account at any time by contacting us or through the dashboard (when available). Upon termination, your proxy endpoints will be deactivated and your account data will be deleted.
				</p>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">Termination by JioBase</h3>
				<p class="text-gray-300 leading-relaxed">
					We may suspend or terminate your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						Breach of these Terms or any applicable law
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Engaging in prohibited activities as described in Section 6
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Requests from law enforcement or government agencies
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Extended inactivity (no API requests for more than 90 consecutive days)
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">e.</span>
						Discontinuation of the Service as a whole (subject to 30 days' notice)
					</li>
				</ul>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">Effect of termination</h3>
				<p class="text-gray-300 leading-relaxed">
					Upon termination of your account, regardless of the reason:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						All proxy endpoints assigned to your account will be deactivated immediately
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Your app configurations will be removed from the proxy routing layer
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Your account information and usage data will be deleted within 30 days
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Your Supabase project and its data are unaffected since JioBase does not store any of your Supabase data
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">e.</span>
						Provisions that by their nature should survive termination (including Sections 11, 12, 14, and 17) will remain in effect
					</li>
				</ul>
			</section>

			<!-- 14. Governing Law -->
			<section id="governing-law">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">14. Governing Law and Dispute Resolution</h2>
				<p class="text-gray-300 leading-relaxed">
					These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict-of-law principles.
				</p>
				<p class="mt-4 text-gray-300 leading-relaxed">
					Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in Kerala, India. You consent to the personal jurisdiction and venue of such courts and waive any objection based on inconvenient forum.
				</p>
				<p class="mt-4 text-gray-300 leading-relaxed">
					Before filing any legal claim, you agree to attempt to resolve the dispute informally by contacting us at the address listed in Section 18. We will attempt to resolve the dispute within 30 days. If the dispute is not resolved informally, either party may proceed with formal legal action.
				</p>
			</section>

			<!-- 15. Changes to Terms -->
			<section id="changes">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">15. Changes to Terms</h2>
				<p class="text-gray-300 leading-relaxed">
					We reserve the right to modify these Terms at any time. When we make material changes, we will:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">a.</span>
						Provide at least <strong class="text-white">30 days' advance notice</strong> before the revised Terms take effect
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">b.</span>
						Notify you via email to the address associated with your account
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">c.</span>
						Display a prominent notice on the dashboard upon your next login
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">d.</span>
						Update the "Last Updated" date at the top of this page
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					Your continued use of the Service after the effective date of the revised Terms constitutes acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Service and terminate your account before the changes take effect.
				</p>
			</section>

			<!-- 16. Force Majeure -->
			<section id="force-majeure">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">16. Force Majeure</h2>
				<p class="text-gray-300 leading-relaxed">
					JioBase shall not be liable for any failure or delay in performing its obligations under these Terms where such failure or delay results from events beyond our reasonable control, including but not limited to:
				</p>
				<ul class="mt-4 space-y-2 text-sm text-gray-400">
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						ISP-level DNS blocks, IP blocks, or other network-level restrictions imposed by internet service providers
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						Government orders, regulations, sanctions, or directives that restrict internet access or service availability
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						Actions taken by Supabase, Cloudflare, or other upstream providers that affect the Service
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						Natural disasters, pandemics, acts of war, terrorism, or civil unrest
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						Power outages, telecommunications failures, cyberattacks, or other infrastructure failures beyond our control
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-0.5 shrink-0 text-brand-400">-</span>
						Changes in applicable law or regulation that make performance impracticable or unlawful
					</li>
				</ul>
				<p class="mt-4 text-gray-300 leading-relaxed">
					In the event of a force majeure event, our obligations under these Terms will be suspended for the duration of the event, and we will make reasonable efforts to resume performance as soon as practicable.
				</p>
			</section>

			<!-- 17. General Provisions -->
			<section id="general">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">17. General Provisions</h2>

				<h3 class="text-lg font-semibold text-white mb-3">Severability</h3>
				<p class="text-gray-300 leading-relaxed">
					If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, it shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
				</p>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">Entire agreement</h3>
				<p class="text-gray-300 leading-relaxed">
					These Terms, together with any Privacy Policy and other legal documents referenced herein, constitute the entire agreement between you and JioBase regarding the Service. They supersede all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding the Service.
				</p>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">Waiver</h3>
				<p class="text-gray-300 leading-relaxed">
					The failure of JioBase to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by JioBase.
				</p>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">Assignment</h3>
				<p class="text-gray-300 leading-relaxed">
					You may not assign or transfer these Terms, or any rights or obligations hereunder, without our prior written consent. JioBase may assign these Terms without restriction. Any attempted assignment in violation of this section shall be void.
				</p>

				<h3 class="text-lg font-semibold text-white mb-3 mt-6">No third-party beneficiaries</h3>
				<p class="text-gray-300 leading-relaxed">
					These Terms do not create any third-party beneficiary rights. Nothing in these Terms is intended to confer upon any person or entity other than you and JioBase any rights or remedies.
				</p>
			</section>

			<!-- 18. Contact Information -->
			<section id="contact">
				<h2 class="text-2xl font-bold tracking-tight text-white mb-4">18. Contact Information</h2>
				<p class="text-gray-300 leading-relaxed">
					If you have any questions about these Terms, or if you wish to report a violation, please contact us:
				</p>

				<div class="mt-6 glass-card rounded-xl p-5">
					<div class="space-y-3 text-sm">
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Operator:</strong>
							<span class="text-gray-400">Sunith VS</span>
						</div>
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Email:</strong>
							<a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>
						</div>
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Website:</strong>
							<a href="https://sunithvs.com" target="_blank" rel="noopener" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">sunithvs.com</a>
						</div>
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Location:</strong>
							<span class="text-gray-400">Kerala, India</span>
						</div>
					</div>
				</div>

				<div class="mt-4 glass-card rounded-xl p-5">
					<h3 class="text-lg font-semibold text-white mb-3">Grievance Officer</h3>
					<p class="text-sm text-gray-400 leading-relaxed">
						In accordance with the Information Technology Act, 2000 and the rules made thereunder, the Grievance Officer for the purpose of these Terms is:
					</p>
					<div class="mt-3 space-y-2 text-sm">
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Name:</strong>
							<span class="text-gray-400">Sunith VS</span>
						</div>
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Email:</strong>
							<a href="mailto:jiobase@sunithvs.com" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">jiobase@sunithvs.com</a>
						</div>
						<div class="flex items-start gap-3">
							<strong class="text-gray-300 shrink-0 w-36">Response time:</strong>
							<span class="text-gray-400">We will acknowledge your complaint within 48 hours and resolve it within 30 days from the date of receipt.</span>
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
				</div>
				<p class="text-xs text-gray-600">&copy; {new Date().getFullYear()} JioBase. Built on Cloudflare.</p>
			</div>
		</div>
	</footer>
</div>
