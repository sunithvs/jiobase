<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { getAuth } from '$lib/stores/auth.svelte.js';
	import { onMount } from 'svelte';

	let { children } = $props();
	const auth = getAuth();

	onMount(() => {
		auth.check();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>JioBase</title>
</svelte:head>

{@render children()}
