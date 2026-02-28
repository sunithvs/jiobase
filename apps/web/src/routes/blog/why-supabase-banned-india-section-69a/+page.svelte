<script lang="ts">
	import AuthorBio from '$lib/components/AuthorBio.svelte';
	import BlogSuggestions from '$lib/components/BlogSuggestions.svelte';
</script>

<svelte:head>
	<title>Why Is Supabase Banned in India? Section 69A Explained | JioBase</title>
	<meta name="description" content="Understanding the legal framework behind India's Supabase block. What Section 69A of the IT Act is, how blocking orders work, and what developers can do about it." />
	<meta name="keywords" content="why supabase banned india, section 69A supabase, supabase india ban reason, IT Act section 69A, supabase blocked government order" />
	<meta property="og:title" content="Why Is Supabase Banned in India? Section 69A Explained" />
	<meta property="og:description" content="Understanding the legal framework behind India's Supabase block. What Section 69A is, how blocking orders work, and what developers can do." />
	<meta property="og:type" content="article" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Why Is Supabase Banned in India? Section 69A Explained" />
	<meta name="twitter:description" content="The legal framework behind India's Supabase block. Section 69A, blocking orders, and what developers can do." />
	<meta property="article:published_time" content="2026-02-28" />
	<meta property="article:tag" content="supabase" />
	<meta property="article:tag" content="section 69A" />
	<meta property="article:tag" content="india" />
	<meta property="article:tag" content="IT Act" />
	<link rel="canonical" href="https://jiobase.com/blog/why-supabase-banned-india-section-69a" />
	{@html `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Article","headline":"Why Is Supabase Banned in India? Section 69A Explained","description":"Understanding the legal framework behind India's Supabase block. What Section 69A of the IT Act is, how blocking orders work, and what developers can do about it.","datePublished":"2026-02-28T00:00:00+05:30","dateModified":"2026-02-28T00:00:00+05:30","author":{"@type":"Person","name":"Sunith VS","url":"https://sunithvs.com"},"publisher":{"@type":"Organization","@id":"https://jiobase.com/#organization","name":"JioBase","logo":{"@type":"ImageObject","url":"https://jiobase.com/favicon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://jiobase.com/blog/why-supabase-banned-india-section-69a"},"image":"https://jiobase.com/favicon.svg"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://jiobase.com"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://jiobase.com/blog"},{"@type":"ListItem","position":3,"name":"Why Is Supabase Banned in India? Section 69A"}]},{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is it legal to use a reverse proxy to bypass the block?","acceptedAnswer":{"@type":"Answer","text":"Using a reverse proxy routes traffic through a different, unblocked domain. This is similar to using a CDN or API gateway. There is no law prohibiting the use of proxy servers for legitimate application traffic."}},{"@type":"Question","name":"Why is supabase.com accessible but supabase.co is not?","acceptedAnswer":{"@type":"Answer","text":"Supabase uses two domains. supabase.com is the marketing site and dashboard. supabase.co is the API domain. The blocking order targets only the .co API domain."}},{"@type":"Question","name":"Can Supabase challenge the blocking order?","acceptedAnswer":{"@type":"Answer","text":"In theory, yes. The Supreme Court mandated that the originator of blocked content be given a hearing. In practice, international companies may not receive notice. Supabase is engaging with Indian authorities."}},{"@type":"Question","name":"Could JioBase itself be blocked?","acceptedAnswer":{"@type":"Answer","text":"Any domain could theoretically be blocked. However, JioBase is an infrastructure proxy service, not a content host. It also supports custom domains, reducing dependency on any single domain."}},{"@type":"Question","name":"Are other countries blocking Supabase too?","acceptedAnswer":{"@type":"Answer","text":"As of February 2026, the DNS block on Supabase has only been confirmed in India. Other countries with internet filtering have not been reported to block Supabase specifically."}}]}]})}</script>`}
</svelte:head>

<article class="mx-auto max-w-3xl px-6 py-16 md:py-24">

	<!-- Article header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 text-sm text-gray-500">
			<span class="rounded-full border border-purple-400/20 bg-purple-400/5 px-2.5 py-0.5 text-xs font-medium text-purple-400">Explainer</span>
			<time datetime="2026-02-28">February 28, 2026</time>
			<span>&middot;</span>
			<span>6 min read</span>
		</div>

		<h1 class="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
			Why Is Supabase Banned in India? Section 69A Explained
		</h1>

		<p class="mt-4 text-lg leading-relaxed text-gray-400">
			Understanding the legal framework behind India's Supabase block. What Section 69A is, how blocking orders work, and what developers can do.
		</p>
	</header>

	<hr class="mb-12 border-white/5" />


	<!-- ===== Section 1: What happened ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What happened</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			In February 2026, Indian ISPs including Jio, Airtel, and ACT Fibernet began DNS-blocking all subdomains under <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">*.supabase.co</code>. The block was not announced publicly -- developers discovered it when their production apps stopped working.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The block affects only the API domain (<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.co</code>), not the marketing website (<code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">supabase.com</code>). This means developers can still access the Supabase dashboard and documentation, but their apps cannot reach the Supabase API, authentication, storage, or realtime services.
		</p>

		<p class="leading-relaxed text-gray-300">
			No official government statement has been issued explaining why Supabase was blocked. This silence is typical -- and it is a direct consequence of how Section 69A of India's Information Technology Act works.
		</p>
	</section>


	<!-- ===== Section 2: What is Section 69A? ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What is Section 69A?</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			Section 69A is a provision in India's Information Technology Act, 2000 (amended in 2008). It grants the central government the power to direct any government agency or intermediary (including ISPs) to block public access to any information generated, transmitted, received, stored, or hosted on any computer resource.
		</p>

		<p class="mb-4 leading-relaxed text-gray-300">
			The section can be invoked on the following grounds:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Sovereignty and integrity of India</strong></p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Defence of India</strong></p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Security of the state</strong></p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Friendly relations with foreign states</strong></p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Public order</strong></p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400"><strong class="text-gray-200">Prevention of incitement to commission of any cognizable offence</strong></p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			The critical aspect of Section 69A is that blocking orders issued under it are <strong class="text-white">confidential</strong>. ISPs that receive these orders are legally prohibited from disclosing them. This is why there is never a public announcement when a website or service is blocked, and why ISPs cannot explain to their customers why a service is unreachable.
		</p>
	</section>


	<!-- ===== Section 3: How blocking orders are issued ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How blocking orders are issued</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			The process for issuing a blocking order under Section 69A follows a defined procedure laid out in the Information Technology (Procedure and Safeguards for Blocking for Access of Information by Public) Rules, 2009:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-xs font-bold text-purple-400">1</div>
					<h3 class="text-sm font-semibold text-white">Complaint or security concern</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">A complaint is received or a security concern is identified by a government agency, law enforcement, or intelligence body. This can originate from any central or state government department.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-xs font-bold text-purple-400">2</div>
					<h3 class="text-sm font-semibold text-white">Review committee examination</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">The request is examined by a committee headed by the Designated Officer in MeitY (Ministry of Electronics and Information Technology). The committee reviews whether the block is necessary and proportionate.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-xs font-bold text-purple-400">3</div>
					<h3 class="text-sm font-semibold text-white">Blocking order issued</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">If approved, the Secretary of MeitY issues a formal blocking direction to all ISPs and intermediaries operating in India.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-400/10 text-xs font-bold text-purple-400">4</div>
					<h3 class="text-sm font-semibold text-white">ISPs comply</h3>
				</div>
				<p class="ml-10 text-sm text-gray-400">ISPs must implement the block within the time specified in the order. They typically use DNS poisoning as it is the cheapest and fastest method to implement at scale.</p>
			</div>
		</div>

		<div class="mt-6 glass-card rounded-xl p-5">
			<div class="flex items-start gap-3">
				<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Emergency blocks can skip the committee.</strong> In urgent cases related to national security, the Designated Officer can issue a temporary block without the full committee review. The committee must then ratify the decision within 48 hours.
				</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 4: What ISPs are required to do ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What ISPs are required to do</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			When an ISP receives a blocking order under Section 69A, they must:
		</p>

		<ul class="mb-6 space-y-3 text-sm leading-relaxed text-gray-400">
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
				<span><strong class="text-gray-200">Implement the block</strong> within the timeframe specified in the order</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
				<span><strong class="text-gray-200">Maintain strict confidentiality</strong> about the order -- they cannot disclose its existence to anyone, including the affected users or the blocked service</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60"></span>
				<span><strong class="text-gray-200">Not show a block page</strong> -- most ISPs simply DNS-poison the domain so the connection silently times out, making it look like a network issue rather than an intentional block</span>
			</li>
		</ul>

		<p class="mb-4 leading-relaxed text-gray-300">
			Failure to comply with a blocking order can result in imprisonment up to seven years and a fine. This is why ISPs implement blocks quickly and without public explanation.
		</p>

		<p class="leading-relaxed text-gray-300">
			The most common implementation method is <strong class="text-white">DNS poisoning</strong>. The ISP configures their DNS resolvers to return a sinkhole IP address for the blocked domain instead of the real IP. This is cheap, fast to deploy, and works at scale. However, it is also the easiest blocking method to bypass with a proxy.
		</p>
	</section>


	<!-- ===== Section 5: Why Supabase specifically? ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Why Supabase specifically?</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			No official reason has been given for the Supabase block. Given the confidential nature of Section 69A orders, we can only observe the patterns:
		</p>

		<div class="mb-6 space-y-3">
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Platform abuse:</strong> Supabase provides hosted PostgreSQL databases, file storage, and serverless functions. It is possible that specific projects hosted on Supabase were used to store or serve content that violated Indian law. Rather than blocking individual projects, the entire <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> domain was blocked.
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Wildcard blocking:</strong> The block targets <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> (the API domain) but not <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.com</code> (the marketing site). This suggests the concern was about the API/data services, not Supabase as a company.
				</p>
			</div>
			<div class="glass-card flex items-start gap-4 rounded-xl px-5 py-4">
				<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-purple-400/60"></span>
				<p class="text-sm leading-relaxed text-gray-400">
					<strong class="text-gray-200">Established pattern:</strong> This follows a pattern seen with other developer tools where the entire platform is blocked because of content hosted by a subset of users.
				</p>
			</div>
		</div>

		<p class="leading-relaxed text-gray-300">
			This is the core dilemma with platform-level blocks. Thousands of legitimate developers and businesses are affected because of the actions of a few (or even one) bad actor on the platform.
		</p>
	</section>


	<!-- ===== Section 6: Previous developer tool blocks ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Previous developer tool blocks in India</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			Supabase is not the first developer tool to be blocked in India. The pattern of ISP-level blocks affecting development infrastructure has been recurring:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
						<span class="text-sm font-bold text-purple-400">GH</span>
					</div>
					<div>
						<p class="font-semibold text-white">GitHub (raw.githubusercontent.com)</p>
						<p class="text-sm text-gray-400">Blocked intermittently. The raw content CDN was DNS-blocked by multiple ISPs, breaking package downloads, CI/CD pipelines, and documentation sites that fetched from GitHub raw URLs.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
						<span class="text-sm font-bold text-purple-400">TG</span>
					</div>
					<div>
						<p class="font-semibold text-white">Telegram</p>
						<p class="text-sm text-gray-400">Blocked on multiple ISPs at various times. Telegram is widely used by developer communities for group chats and channels. The block affected web, desktop, and mobile clients.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
						<span class="text-sm font-bold text-purple-400">M</span>
					</div>
					<div>
						<p class="font-semibold text-white">Medium</p>
						<p class="text-sm text-gray-400">Temporarily blocked in 2020. Many technical blogs and programming tutorials are hosted on Medium. The block was eventually lifted, but not before significant disruption to the developer community.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
						<span class="text-sm font-bold text-purple-400">PB</span>
					</div>
					<div>
						<p class="font-semibold text-white">Pastebin</p>
						<p class="text-sm text-gray-400">Blocked since 2017 on many ISPs. Developers commonly use Pastebin for sharing code snippets, logs, and configuration files. The block persists on most networks.</p>
					</div>
				</div>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="flex items-center gap-3">
					<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-400/10">
						<span class="text-sm font-bold text-purple-400">FB</span>
					</div>
					<div>
						<p class="font-semibold text-white">Firebase (BSNL)</p>
						<p class="text-sm text-gray-400">Blocked on BSNL since August 2025. Multiple Firebase services including Firestore, Cloud Functions, and Authentication became unreachable on BSNL and some regional ISPs.</p>
					</div>
				</div>
			</div>
		</div>
	</section>


	<!-- ===== Section 7: Will the block be lifted? ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">Will the block be lifted?</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			There is no way to know for certain. Historically, some blocks in India have been temporary while others have persisted for years:
		</p>

		<div class="mb-6 grid gap-4 sm:grid-cols-2">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Lifted</span>
				</div>
				<p class="text-sm text-gray-400">Medium (blocked briefly in 2020, now accessible). Some GitHub endpoints have been unblocked after pressure from the developer community.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-red-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
					<span class="text-sm font-semibold">Still blocked</span>
				</div>
				<p class="text-sm text-gray-400">Pastebin (since 2017). Firebase on BSNL (since August 2025). Several other websites and services remain blocked with no sign of reversal.</p>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			Supabase has acknowledged the block and stated they have reached out to Indian government officials. However, there is no confirmed timeline for resolution. The confidential nature of 69A orders means there is no formal appeals process that users or the blocked company can easily use.
		</p>

		<p class="leading-relaxed text-gray-300">
			Given this uncertainty, developers building production apps for Indian users should not wait for the block to be lifted. A proxy solution ensures your app works regardless of whether the block continues or not.
		</p>
	</section>


	<!-- ===== Section 8: What developers can do ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">What developers can do</h2>

		<p class="mb-6 leading-relaxed text-gray-300">
			There are both immediate technical fixes and longer-term advocacy steps developers can take:
		</p>

		<div class="space-y-4">
			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Use a reverse proxy (immediate fix)</span>
				</div>
				<p class="text-sm text-gray-400">Route your Supabase traffic through an unblocked domain using JioBase or a self-hosted Cloudflare Worker. This is the fastest way to get your app working again. The block targets the <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">*.supabase.co</code> domain -- routing through a different domain bypasses it entirely.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Raise awareness</span>
				</div>
				<p class="text-sm text-gray-400">Share your experience on developer forums, social media, and communities. The Medium block was partially reversed after significant public attention. Developer voices matter -- especially when blocks affect legitimate businesses and livelihoods.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Contact elected representatives</span>
				</div>
				<p class="text-sm text-gray-400">Reach out to your local MP and the IT ministry. While 69A orders are confidential, political pressure from constituents has historically influenced the review process. Be specific about the economic impact on your business or startup.</p>
			</div>

			<div class="glass-card rounded-xl p-5">
				<div class="mb-2 flex items-center gap-2 text-brand-400">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
					<span class="text-sm font-semibold">Join developer advocacy groups</span>
				</div>
				<p class="text-sm text-gray-400">Organizations like the Internet Freedom Foundation (IFF) and the Software Freedom Law Center India (SFLC.in) track and challenge overbroad internet blocking in India. Supporting these organizations strengthens the collective voice of the developer community.</p>
			</div>
		</div>
	</section>


	<!-- ===== Section 9: How JioBase works around the block ===== -->
	<section class="mb-14">
		<h2 class="mb-4 text-2xl font-bold tracking-tight">How JioBase works around the block</h2>

		<p class="mb-4 leading-relaxed text-gray-300">
			JioBase is a managed reverse proxy built on Cloudflare Workers. It provides each Supabase project with an unblocked proxy URL on the <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jiobase.com</code> domain.
		</p>

		<p class="mb-6 leading-relaxed text-gray-300">
			The concept is straightforward: since <code class="rounded bg-white/5 px-1.5 py-0.5 text-sm text-gray-300">jiobase.com</code> is not on the blocking order, ISP DNS resolves it normally. The Cloudflare Worker receives the request at the nearest edge node and forwards it to your Supabase project server-side, where there are no ISP blocks.
		</p>

		<!-- Flow diagram -->
		<div class="glass-card mb-8 overflow-x-auto rounded-xl p-6">
			<div class="flex min-w-[500px] items-center justify-between gap-2 text-sm">
				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Your App</p>
					<p class="mt-1 text-xs text-gray-500">Browser / Client</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
				</div>

				<div class="rounded-lg border border-brand-400/20 bg-brand-400/5 px-4 py-3 text-center">
					<p class="font-semibold text-brand-400">JioBase Proxy</p>
					<p class="mt-1 text-xs text-gray-500">Cloudflare Edge</p>
				</div>

				<div class="flex flex-col items-center gap-1">
					<svg width="40" height="12" viewBox="0 0 40 12" fill="none"><path d="M0 6h36m0 0l-4-4m4 4l-4 4" stroke="#3ecf8e" stroke-width="1.5"/></svg>
					<span class="text-xs text-brand-400">HTTPS</span>
				</div>

				<div class="rounded-lg border border-white/10 bg-surface-300 px-4 py-3 text-center">
					<p class="font-semibold text-white">Supabase</p>
					<p class="mt-1 text-xs text-gray-500">*.supabase.co</p>
				</div>
			</div>
		</div>

		<p class="mb-4 leading-relaxed text-gray-300">
			The entire setup takes under 5 minutes. You change one URL in your Supabase client initialization. Everything else -- your anon key, RLS policies, database schema, auth rules -- stays exactly the same.
		</p>

		<div class="glass-card overflow-hidden rounded-xl">
			<div class="flex items-center gap-2 border-b border-white/5 px-4 py-3">
				<div class="h-3 w-3 rounded-full bg-red-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-yellow-500/50"></div>
				<div class="h-3 w-3 rounded-full bg-green-500/50"></div>
				<span class="ml-2 text-xs text-gray-500">lib/supabase.ts</span>
			</div>
			<pre class="overflow-x-auto p-4"><code class="text-sm text-gray-300"><span class="text-purple-400">import</span> {'{'} createClient {'}'} <span class="text-purple-400">from</span> <span class="text-amber-300">'@supabase/supabase-js'</span>

<span class="text-gray-500">// Before: blocked by Indian ISPs</span>
<span class="text-gray-500">// const supabase = createClient('https://abcdefgh.supabase.co', key)</span>

<span class="text-gray-500">// After: works everywhere</span>
<span class="text-purple-400">const</span> <span class="text-blue-300">supabase</span> = <span class="text-yellow-200">createClient</span>(
  <span class="text-brand-400">'https://myapp.jiobase.com'</span>,
  <span class="text-amber-300">'your-anon-key'</span>
)</code></pre>
		</div>
	</section>


	<!-- ===== FAQ ===== -->
	<section class="mb-14">
		<h2 class="mb-6 text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

		<div class="space-y-4">
			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Is it legal to use a reverse proxy to bypass the block?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Section 69A blocking orders target specific domains and direct ISPs to block access. Using a reverse proxy routes traffic through a different, unblocked domain. This is similar to using a CDN or any other infrastructure layer between your app and its backend. There is no law prohibiting the use of proxy servers or CDNs for legitimate application traffic. However, this is not legal advice -- consult a qualified attorney for your specific situation.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Why is supabase.com accessible but supabase.co is not?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Supabase uses two separate domains. <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.com</code> is the marketing website and dashboard. <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">supabase.co</code> is the API domain where all project data flows -- database queries, auth, storage, and realtime. The blocking order targets only the <code class="rounded bg-white/5 px-1.5 py-0.5 text-gray-300">.co</code> API domain, which suggests the concern was about data/content served through the API rather than the Supabase company itself.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Can Supabase challenge the blocking order?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">In theory, yes. The Supreme Court of India, in the Shreya Singhal case (2015), upheld Section 69A but mandated that the originator of the blocked content be given a hearing before the order is finalized. In practice, international companies may not receive notice. Supabase has stated they are engaging with Indian authorities, but the process is slow and there is no public timeline.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Could JioBase itself be blocked?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">Any domain could theoretically be subject to a blocking order. However, JioBase is an infrastructure proxy service, not a content host. It does not store data -- it forwards requests. JioBase also supports custom domains, meaning you can use your own domain as the proxy endpoint, further reducing dependency on any single domain.</p>
				</div>
			</details>

			<details class="group glass-card rounded-xl">
				<summary class="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium">
					Are other countries blocking Supabase too?
					<svg class="h-4 w-4 shrink-0 text-gray-500 transition group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
				</summary>
				<div class="border-t border-white/5 px-5 py-4">
					<p class="text-sm leading-relaxed text-gray-400">As of February 2026, the DNS block on Supabase has only been confirmed in India. Other countries with internet filtering capabilities (China, Russia, Iran) have not been reported to block Supabase specifically, though they maintain their own extensive blocking lists.</p>
				</div>
			</details>
		</div>
	</section>


	<!-- ===== CTA ===== -->
	<section class="mt-16 glass-card rounded-2xl border-t-2 border-brand-400/50 p-8 text-center">
		<h2 class="text-2xl font-bold">Fix your Supabase app in 5 minutes</h2>
		<p class="mt-3 text-gray-400">Do not wait for the block to be lifted. Route through JioBase and get your app working for every Indian user today.</p>
		<div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a href="/register" class="rounded-lg bg-brand-400 px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300">Start for free</a>
			<a href="/docs" class="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-gray-300 transition hover:text-white">Read the docs</a>
		</div>
	</section>


	<AuthorBio />

	<BlogSuggestions currentSlug="why-supabase-banned-india-section-69a" suggestedSlugs={["firebase-supabase-blocked-india", "supabase-blocked-india-fix", "supabase-err-connection-timed-out-india"]} />
</article>
