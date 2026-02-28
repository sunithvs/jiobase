<script lang="ts">
	let {
		title = 'Related pages',
		pages
	}: {
		title?: string;
		pages: { title: string; description: string; href: string; badge: string; badgeColor: string }[];
	} = $props();

	function getBadgeClasses(color: string): string {
		switch (color) {
			case 'brand':
				return 'border-brand-400/20 bg-brand-400/5 text-brand-400';
			case 'red':
				return 'border-red-400/20 bg-red-400/5 text-red-400';
			case 'blue':
				return 'border-blue-400/20 bg-blue-400/5 text-blue-400';
			case 'amber':
				return 'border-amber-400/20 bg-amber-400/5 text-amber-400';
			case 'purple':
				return 'border-purple-400/20 bg-purple-400/5 text-purple-400';
			default:
				return 'border-gray-400/20 bg-gray-400/5 text-gray-400';
		}
	}
</script>

<section>
	<h2 class="mb-6 text-2xl font-bold tracking-tight">{title}</h2>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each pages as page}
			<a
				href={page.href}
				class="glass-card group rounded-xl p-5 transition hover:border-brand-400/20"
			>
				<span class="rounded-full border px-2.5 py-0.5 text-xs font-medium {getBadgeClasses(page.badgeColor)}">
					{page.badge}
				</span>
				<h3 class="mt-3 font-semibold text-white transition group-hover:text-brand-400">
					{page.title}
				</h3>
				<p class="mt-1.5 text-sm leading-relaxed text-gray-400">
					{page.description}
				</p>
			</a>
		{/each}
	</div>
</section>
