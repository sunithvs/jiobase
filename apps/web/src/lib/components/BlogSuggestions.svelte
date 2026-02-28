<script lang="ts">
	type BlogEntry = {
		slug: string;
		title: string;
		description: string;
		badge: string;
		badgeColor: 'red' | 'brand' | 'amber' | 'blue' | 'purple';
		readTime: string;
	};

	const ALL_BLOGS: BlogEntry[] = [
		{
			slug: 'supabase-blocked-india-fix',
			title: 'Supabase Blocked in India: What Happened and How to Fix It',
			description: 'Indian ISPs are DNS-blocking *.supabase.co. Here is everything you need to know and how to fix it.',
			badge: 'Breaking',
			badgeColor: 'red',
			readTime: '8 min'
		},
		{
			slug: 'proxy-supabase-cloudflare-workers',
			title: 'How to Proxy Supabase Through Cloudflare Workers (Step-by-Step)',
			description: 'A detailed tutorial on setting up a Cloudflare Worker reverse proxy for Supabase.',
			badge: 'Tutorial',
			badgeColor: 'brand',
			readTime: '12 min'
		},
		{
			slug: 'why-indian-developers-need-supabase-proxy',
			title: 'Why Every Indian Developer Using Supabase Needs a Reverse Proxy',
			description: 'ISP-level blocks keep breaking developer tools. Here is why a proxy layer is essential infrastructure.',
			badge: 'Opinion',
			badgeColor: 'amber',
			readTime: '6 min'
		},
		{
			slug: 'firebase-supabase-blocked-india',
			title: 'Firebase AND Supabase Blocked in India: The Double Backend Crisis',
			description: 'Firebase blocked on BSNL. Supabase blocked on Jio, Airtel, and ACT. Here is what happened.',
			badge: 'Breaking',
			badgeColor: 'red',
			readTime: '7 min'
		},
		{
			slug: 'test-if-backend-blocked-india',
			title: 'How to Test if Your Backend is Blocked by Indian ISPs',
			description: 'Step-by-step diagnostic guide to check if Supabase, Firebase, or any backend is being DNS-blocked.',
			badge: 'Guide',
			badgeColor: 'blue',
			readTime: '5 min'
		},
		{
			slug: 'supabase-alternatives-india',
			title: 'Supabase Alternatives for Indian Developers (2026 Comparison)',
			description: 'Evaluating Appwrite, Nhost, PocketBase, self-hosting, and custom backends as alternatives.',
			badge: 'Comparison',
			badgeColor: 'purple',
			readTime: '8 min'
		},
		{
			slug: 'fix-supabase-jio-5-minutes',
			title: 'Fix Supabase on Jio in 5 Minutes',
			description: 'Ultra-short, action-focused guide. No theory, no backstory - just the fix.',
			badge: 'Quick Fix',
			badgeColor: 'brand',
			readTime: '3 min'
		},
		{
			slug: 'supabase-err-connection-timed-out-india',
			title: 'Supabase ERR_CONNECTION_TIMED_OUT in India: What It Means and How to Fix It',
			description: 'Getting timeout errors with Supabase in India? Your ISP is blocking the connection.',
			badge: 'Troubleshooting',
			badgeColor: 'amber',
			readTime: '5 min'
		},
		{
			slug: 'why-supabase-banned-india-section-69a',
			title: 'Why Is Supabase Banned in India? Section 69A Explained',
			description: 'Understanding Section 69A of the IT Act and how blocking orders work.',
			badge: 'Explainer',
			badgeColor: 'purple',
			readTime: '6 min'
		}
	];

	const BADGE_CLASSES: Record<string, string> = {
		red: 'border-red-500/20 bg-red-500/5 text-red-400',
		brand: 'border-brand-400/20 bg-brand-400/5 text-brand-400',
		amber: 'border-amber-400/20 bg-amber-400/5 text-amber-400',
		blue: 'border-blue-400/20 bg-blue-400/5 text-blue-400',
		purple: 'border-purple-400/20 bg-purple-400/5 text-purple-400'
	};

	let { currentSlug = '', suggestedSlugs = [] as string[] }: { currentSlug?: string; suggestedSlugs?: string[] } = $props();

	const suggestions = suggestedSlugs.length > 0
		? ALL_BLOGS.filter((b) => suggestedSlugs.includes(b.slug) && b.slug !== currentSlug).slice(0, 3)
		: ALL_BLOGS.filter((b) => b.slug !== currentSlug).slice(0, 3);
</script>

<div class="mt-12 border-t border-white/5 pt-8">
	<h2 class="text-xl font-semibold text-white">Suggested reading</h2>
	<p class="mt-1 text-sm text-gray-500">More guides on Supabase, DNS blocks, and building resilient apps in India.</p>

	<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each suggestions as post}
			<a href="/blog/{post.slug}" class="group glass-card rounded-xl p-5 transition hover:border-white/10">
				<div class="flex items-center gap-2">
					<span class="rounded-full border px-2 py-0.5 text-xs font-medium {BADGE_CLASSES[post.badgeColor]}">
						{post.badge}
					</span>
					<span class="text-xs text-gray-500">{post.readTime}</span>
				</div>
				<h3 class="mt-2 text-sm font-medium text-white group-hover:text-brand-400 transition leading-snug">
					{post.title}
				</h3>
				<p class="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
					{post.description}
				</p>
			</a>
		{/each}
	</div>

	<div class="mt-6 flex items-center justify-between">
		<a href="/blog" class="text-sm text-gray-400 hover:text-white transition">View all posts</a>
		<a href="/" class="text-sm text-brand-400 hover:text-brand-300 transition">JioBase Home</a>
	</div>
</div>
