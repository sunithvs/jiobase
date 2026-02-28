<script lang="ts">
	import '../app.css';
	import { getAuth } from '$lib/stores/auth.svelte.js';
	import { onMount } from 'svelte';

	let { children } = $props();
	const auth = getAuth();

	onMount(() => {
		auth.check();
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="theme-color" content="#3ecf8e" />
	<title>JioBase</title>
</svelte:head>

{@render children()}
