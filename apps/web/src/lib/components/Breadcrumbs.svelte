<script lang="ts">
	let { items }: { items: { label: string; href?: string }[] } = $props();

	const BASE_URL = 'https://jiobase.com';

	function buildJsonLd(items: { label: string; href?: string }[]) {
		const elements = items.map((item, i) => {
			const entry: Record<string, unknown> = {
				'@type': 'ListItem',
				position: i + 1,
				name: item.label
			};
			if (item.href) {
				entry.item = `${BASE_URL}${item.href}`;
			}
			return entry;
		});

		return JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: elements
		});
	}
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${buildJsonLd(items)}</script>`}
</svelte:head>

<nav aria-label="Breadcrumb" class="text-sm text-gray-500">
	<ol class="flex flex-wrap items-center gap-1.5">
		{#each items as item, i}
			{#if i > 0}
				<li aria-hidden="true" class="select-none text-gray-600">&gt;</li>
			{/if}
			<li>
				{#if item.href && i < items.length - 1}
					<a href={item.href} class="text-gray-400 transition hover:text-white">{item.label}</a>
				{:else}
					<span class="text-gray-500">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
