<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>India's History of Blocking Developer Tools: From GitHub to Supabase | JioBase</title>
	<meta name="description" content="India has a pattern of blocking developer tools. From GitHub in 2014 to Supabase in 2026, here is the full history of ISP-level blocks affecting developers." />
	<meta name="keywords" content="india blocking developer tools, github blocked india, medium blocked india, developer tools blocked ISP india" />
	<meta property="og:title" content="India's History of Blocking Developer Tools: From GitHub to Supabase" />
	<meta property="og:description" content="From GitHub in 2014 to Supabase in 2026, India has a long history of blocking platforms developers depend on. Here is the full timeline." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="India's History of Blocking Developer Tools: From GitHub to Supabase" />
	<meta name="twitter:description" content="From GitHub in 2014 to Supabase in 2026, India has a long history of blocking developer tools. Here is the full timeline." />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"India's History of Blocking Developer Tools: From GitHub to Supabase","description":"India has a pattern of blocking developer tools. From GitHub in 2014 to Supabase in 2026, here is the full history of ISP-level blocks affecting developers.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/india-blocking-developer-tools-history"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"India's History of Blocking Developer Tools"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Has India permanently blocked any developer tool?","acceptedAnswer":{"@type":"Answer","text":"Most blocks have been temporary or intermittent, lasting from days to months. The GitHub block in 2014 lasted only a few days. However, the Supabase and Firebase blocks from 2026 are still active."}},{"@type":"Question","name":"Can developers challenge a blocking order in court?","acceptedAnswer":{"@type":"Answer","text":"In theory, yes. Section 69A blocking orders can be challenged in Indian courts. However, the process is slow, expensive, and the orders are often classified. A technical workaround is more practical."}},{"@type":"Question","name":"Which developer tools are most at risk of being blocked next?","acceptedAnswer":{"@type":"Answer","text":"Any platform that hosts user-generated content is potentially at risk. The safest strategy is to ensure your app never exposes third-party API domains directly to end users."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Deep Dive</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>8 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			India's History of Blocking Developer Tools: From GitHub to Supabase
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			India has a pattern of blocking developer tools. From GitHub in 2014 to Supabase in 2026, here is the full history of ISP-level blocks that have disrupted millions of developers, why they happen, and what you can do about it.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: The pattern ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The pattern</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			India's Information Technology Act, specifically <a href="/blog/why-supabase-banned-india-section-69a" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Section 69A</a>, gives the central government the power to direct ISPs to block any website or online service. The stated purpose is to protect national security, sovereignty, and public order. In practice, the mechanism has been used against a wide range of targets, from social media platforms to code repositories.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The process lacks transparency. Blocking orders are issued by the Ministry of Electronics and Information Technology (MeitY) to ISPs directly. There is no public notice before a block takes effect. There is no appeals process for the affected service. In most cases, the order itself is classified and never made public, meaning neither the blocked service nor its users are told exactly why it was blocked.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			For developers, this creates a uniquely frustrating situation. The tools you build your business on can vanish from your network without warning. Your code still works, your deployment is still live, your database is still running. But your users in India suddenly cannot reach any of it.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-purple-400">Why developer tools are especially vulnerable</h3>
			<ul class="space-y-3 text-sm leading-relaxed text-gray-400">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
					<span><strong class="text-gray-200">Platform hosting:</strong> Services like GitHub and Supabase host millions of projects. If one piece of objectionable content exists on the platform, the entire domain can be blocked.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
					<span><strong class="text-gray-200">Shared domains:</strong> APIs typically run on a single domain (like <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>). Blocking that domain takes down every project using the service.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
					<span><strong class="text-gray-200">No lobbying power:</strong> Unlike large social media companies, developer tool companies rarely have legal teams or government relations staff in India to push back against orders.</span>
				</li>
			</ul>
		</div>
	</section>


	<!-- ===== Section 2: Timeline ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Timeline of developer tool blocks</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Here is a chronological look at every significant instance of developer-relevant platforms being blocked by Indian ISPs. Each entry includes the year, the service affected, which ISPs enforced the block, and what triggered it.
		</p>

		<!-- 2014: GitHub -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-400/5 text-sm font-bold text-purple-400">2014</div>
				<h3 class="text-lg font-semibold text-white">GitHub blocked</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISPs: Multiple</span>
				<span>&middot;</span>
				<span>Duration: Brief (days)</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				India's Department of Telecom ordered ISPs to block GitHub after ISIS-related recruitment content was found hosted on the platform. The block affected the entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">github.com</code> domain, disrupting millions of developers. It was lifted after widespread backlash from the tech community and media coverage highlighting the collateral damage.
			</p>
		</div>

		<!-- 2020: VPNs -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-400/5 text-sm font-bold text-purple-400">2020</div>
				<h3 class="text-lg font-semibold text-white">Multiple VPN services blocked</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISPs: Jio, Airtel, and others</span>
				<span>&middot;</span>
				<span>Duration: Ongoing</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				Following government directives, several popular VPN services had their websites and connection endpoints blocked. For developers who relied on VPNs to access restricted resources, test geo-specific features, or secure their connections on public networks, this created significant workflow disruptions.
			</p>
		</div>

		<!-- Aug 2025: Linktree -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/5 text-sm font-bold text-amber-400">Aug 2025</div>
				<h3 class="text-lg font-semibold text-white">Linktree blocked</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISPs: Multiple</span>
				<span>&middot;</span>
				<span>Duration: Ongoing</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				Linktree, the popular link-in-bio platform used by creators and developers to aggregate their online presence, was blocked on multiple Indian ISPs. The block affected every Linktree page, not just specific profiles. Developers using Linktree for project pages, portfolio links, and documentation hubs lost access.
			</p>
		</div>

		<!-- Aug 2025: Dailymotion and TheMovieDB -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/5 text-sm font-bold text-amber-400">Aug 2025</div>
				<h3 class="text-lg font-semibold text-white">Dailymotion and TheMovieDB blocked on BSNL</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISP: BSNL</span>
				<span>&middot;</span>
				<span>Duration: Ongoing</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				BSNL blocked access to Dailymotion and TheMovieDB (TMDB). While Dailymotion is primarily a video platform, TMDB is widely used by developers building media applications. Its API powers thousands of movie and TV apps. Developers on BSNL lost the ability to test and develop against the TMDB API entirely.
			</p>
		</div>

		<!-- Oct 2025: Medium -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/5 text-sm font-bold text-amber-400">Oct 2025</div>
				<h3 class="text-lg font-semibold text-white">Medium blocked on multiple ISPs</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISPs: Jio, BSNL, and others</span>
				<span>&middot;</span>
				<span>Duration: Intermittent</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				Medium, one of the largest platforms for technical writing and developer tutorials, was blocked on several Indian ISPs. This cut off access to millions of programming tutorials, architecture deep-dives, and technical guides that developers rely on daily. The block was particularly damaging because many official documentation resources and company engineering blogs are hosted on Medium.
			</p>
		</div>

		<!-- Feb 2026: Supabase -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">Feb 2026</div>
				<h3 class="text-lg font-semibold text-white">Supabase blocked on Jio, Airtel, ACT Fibernet</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISPs: Jio, Airtel, ACT Fibernet</span>
				<span>&middot;</span>
				<span>Duration: Ongoing</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				The most impactful block for developers yet. All subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> were DNS-blocked following a <a href="/blog/why-supabase-banned-india-section-69a" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Section 69A order</a>. This broke every production app using Supabase for database queries, authentication, file storage, and real-time subscriptions. The <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">fix requires a reverse proxy</a>.
			</p>
		</div>

		<!-- Feb 2026: Firebase -->
		<div class="glass-card mb-4 rounded-xl p-6">
			<div class="mb-2 flex items-center gap-3">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-sm font-bold text-red-400">Feb 2026</div>
				<h3 class="text-lg font-semibold text-white">Firebase blocked on BSNL</h3>
			</div>
			<div class="mb-2 flex items-center gap-2 text-sm text-gray-500">
				<span class="rounded bg-white/5 px-2 py-0.5">ISP: BSNL</span>
				<span>&middot;</span>
				<span>Duration: Ongoing</span>
			</div>
			<p class="text-sm leading-relaxed text-gray-400">
				Google's Firebase platform was blocked on BSNL around the same time as the Supabase block. This created a <a href="/blog/firebase-supabase-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">double backend crisis</a> where both of India's most popular Backend-as-a-Service platforms became unreachable on certain networks. Developers using Firebase for authentication, Firestore, and cloud functions on BSNL connections were left scrambling.
			</p>
		</div>
	</section>


	<!-- ===== Section 3: Why developer tools get caught ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why developer tools get caught in the crossfire</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			The core issue is that India's blocking mechanism is content-agnostic at the domain level. When a blocking order targets a specific piece of content hosted on a platform, ISPs do not have the technical capability (or the mandate) to block just that one resource. Instead, they block the entire domain.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			This means that one objectionable page hosted on GitHub can result in all of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">github.com</code> being blocked. One problematic project on Supabase can result in every <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code> subdomain becoming unreachable. The collateral damage is enormous.
		</p>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-3 text-lg font-semibold text-amber-400">The collateral damage math</h3>
			<p class="mb-4 text-sm leading-relaxed text-gray-400">
				Consider the Supabase block. Supabase hosts over a million projects. The blocking order may have targeted a handful of specific projects, but the DNS-level block affected all of them. Every developer, every startup, every production app using Supabase in India was collateral damage.
			</p>
			<p class="text-sm leading-relaxed text-gray-400">
				The same pattern played out with GitHub in 2014. A few pages of objectionable content led to the entire platform being blocked, affecting millions of repositories and the developers who depended on them.
			</p>
		</div>
	</section>


	<!-- ===== Section 4: Net neutrality problem ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">The net neutrality problem</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			India adopted strong net neutrality regulations through TRAI (Telecom Regulatory Authority of India) recommendations in 2017. These regulations prohibit ISPs from arbitrarily blocking or throttling specific websites or services. In theory, this should protect developer tools from being blocked.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			In practice, Section 69A of the IT Act overrides net neutrality protections. When the government issues a blocking order under Section 69A, ISPs are legally required to comply, regardless of net neutrality rules. The blocking order takes precedence.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			This creates a legal framework where ISPs cannot choose to block websites on their own, but the government can direct them to block anything it deems necessary. The lack of transparency in the process means developers have no way to predict which services might be blocked next.
		</p>

		<div class="glass-card rounded-xl p-6">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">The unpredictability problem:</strong> Digital rights organizations have noted that the lack of transparency in India's blocking process means developers cannot know in advance which platforms are safe to build on. You might invest months building on a service only to discover that your Indian users cannot reach it one morning.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 5: What developers can do ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What developers can do</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Given the history, it is clear that ISP-level blocks are not a one-time event. They are a recurring pattern that will continue to affect developer tools. Here are concrete steps you can take to protect your applications.
		</p>

		<div class="mb-4 glass-card rounded-xl p-6">
			<h3 class="mb-2 text-lg font-semibold text-brand-400">1. Build with proxy layers from day one</h3>
			<p class="text-sm leading-relaxed text-gray-400">
				Do not connect your frontend directly to third-party API domains. Route all external API traffic through a domain you control. If your backend is at <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">api.yourapp.com</code> and it proxies to Supabase, a block on <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> does not affect your users at all. JioBase provides this <a href="/blog/supabase-blocked-india-fix" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">as a managed service</a>.
			</p>
		</div>

		<div class="mb-4 glass-card rounded-xl p-6">
			<h3 class="mb-2 text-lg font-semibold text-brand-400">2. Use environment variables for all external URLs</h3>
			<p class="text-sm leading-relaxed text-gray-400">
				Never hardcode third-party API URLs. Use environment variables so you can swap endpoints in minutes without redeploying your entire application. When the Supabase block hit, developers who used environment variables could switch to a proxy URL by updating a single config value.
			</p>
		</div>

		<div class="mb-4 glass-card rounded-xl p-6">
			<h3 class="mb-2 text-lg font-semibold text-brand-400">3. Monitor for blocks proactively</h3>
			<p class="text-sm leading-relaxed text-gray-400">
				Set up health checks that test connectivity from Indian networks. Use tools like the <a href="/blog/test-if-backend-blocked-india" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">ISP block testing guide</a> to check if your backend is reachable. Catch blocks before your users report them.
			</p>
		</div>

		<div class="glass-card rounded-xl p-6">
			<h3 class="mb-2 text-lg font-semibold text-brand-400">4. Plan for ISP interference in your architecture</h3>
			<p class="text-sm leading-relaxed text-gray-400">
				Treat ISP blocks as a failure mode in your system design, just like you would plan for server outages or database failures. Have a fallback domain ready. Use Cloudflare Workers or similar edge infrastructure that gives you control over the domain your users connect to. The <a href="/tools/worker-generator" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">Worker Generator tool</a> can help you set up a self-hosted proxy as a backup.
			</p>
		</div>
	</section>


	<!-- ===== Section 6: Why JioBase exists ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why JioBase exists</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			JioBase was born from this exact problem. When the Supabase block hit in February 2026, thousands of Indian developers were left with broken production apps and no clear fix. Changing DNS did not work for end users. VPNs were not a production solution. Self-hosting a proxy required Cloudflare knowledge that not everyone had.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			JioBase is a managed reverse proxy that routes your Supabase API traffic through Cloudflare's edge network. Your users connect to <code class="rounded bg-brand-400/10 px-1.5 py-0.5 text-sm text-brand-400">yourapp.jiobase.com</code> instead of <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">yourproject.supabase.co</code>. Since the JioBase domain is not blocked, everything works. The ISP never sees <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code> in any DNS query or TLS handshake.
		</p>

		<p class="leading-relaxed text-gray-300">
			It takes <a href="/blog/fix-supabase-jio-5-minutes" class="text-brand-400 underline decoration-brand-400/30 underline-offset-4 transition hover:decoration-brand-400">less than five minutes</a> to set up. You change one URL in your Supabase client configuration and deploy. No SDK changes, no code refactoring, no infrastructure to manage. Your app becomes resilient to ISP blocks immediately.
		</p>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Has India permanently blocked any developer tool?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					Most blocks on developer tools have been temporary or intermittent, lasting from days to months. The GitHub block in 2014 lasted only a few days after public backlash. However, the Supabase and Firebase blocks from February 2026 are still active as of this writing. There is no guarantee that any block will be lifted, which is why building with proxy layers is the safest approach.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Can developers challenge a blocking order in court?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					In theory, yes. Section 69A blocking orders can be challenged in Indian courts. However, the process is slow, expensive, and the orders themselves are often classified, making it difficult to even know the legal basis for the block. For most individual developers and startups, a technical workaround like a reverse proxy is far more practical than legal action.
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between p-5 text-white">
					<span class="font-medium">Which developer tools are most at risk of being blocked next?</span>
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
				</summary>
				<div class="px-5 pb-5 text-sm leading-relaxed text-gray-400">
					There is no way to predict this with certainty because of the opaque nature of the blocking process. Any platform that hosts user-generated content is potentially at risk. This includes database providers, hosting platforms, CDNs, and API services. The safest strategy is to ensure your app never exposes third-party API domains directly to end users. Route everything through your own domain or a proxy service.
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mb-8">
		<div class="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-8 text-center sm:p-12">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
				Build block-proof apps
			</h2>
			<p class="mx-auto mt-4 max-w-lg text-gray-400">
				ISP blocks are not going away. Protect your Supabase-powered app with JioBase and ensure every user in India can reach your product, regardless of which ISP they use.
			</p>
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="/register"
					class="rounded-xl bg-brand-400 px-8 py-3.5 text-base font-semibold text-black shadow-lg shadow-brand-400/20 transition hover:bg-brand-300 hover:shadow-brand-400/30"
				>
					Start for free
				</a>
				<a
					href="/"
					class="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-gray-300 transition hover:border-white/20 hover:text-white"
				>
					Learn more about JioBase
				</a>
			</div>
			<p class="mt-6 text-xs text-gray-500">
				Free tier includes 1 proxy app and 50,000 requests/month. No credit card required.
			</p>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="india-blocking-developer-tools-history" suggestedSlugs={["why-supabase-banned-india-section-69a", "supabase-blocked-india-fix", "firebase-supabase-blocked-india"]} />
</article>
