<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAuth } from '$lib/stores/auth.svelte.js';
	import { ApiError } from '$lib/api.js';

	const auth = getAuth();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let submitting = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		submitting = true;
		try {
			await auth.register(email, password, name || undefined);
			goto('/dashboard');
		} catch (err) {
			if (err instanceof ApiError) {
				error = err.message;
			} else {
				error = 'Something went wrong. Please try again.';
			}
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Create account - JioBase</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<a href="/" class="inline-flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400/10">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3ecf8e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
					</svg>
				</div>
				<span class="text-xl font-bold text-white">JioBase</span>
			</a>
			<p class="mt-3 text-sm text-gray-400">Create your account - it's free</p>
		</div>

		<div class="glass-card rounded-2xl p-6">
			<form onsubmit={handleSubmit} class="space-y-4">
				{#if error}
					<div class="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
						{error}
					</div>
				{/if}

				<div>
					<label for="name" class="mb-1.5 block text-sm font-medium text-gray-300">Name</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						class="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder-gray-500 focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/50 focus:outline-none transition"
						placeholder="Your name"
					/>
				</div>

				<div>
					<label for="email" class="mb-1.5 block text-sm font-medium text-gray-300">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder-gray-500 focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/50 focus:outline-none transition"
						placeholder="you@example.com"
					/>
				</div>

				<div>
					<label for="password" class="mb-1.5 block text-sm font-medium text-gray-300">Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						required
						minlength="8"
						class="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-white placeholder-gray-500 focus:border-brand-400/50 focus:ring-1 focus:ring-brand-400/50 focus:outline-none transition"
						placeholder="••••••••"
					/>
					<p class="mt-1.5 text-xs text-gray-500">Must be at least 8 characters</p>
				</div>

				<button
					type="submit"
					disabled={submitting}
					class="w-full rounded-lg bg-brand-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300 focus:ring-2 focus:ring-brand-400/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] focus:outline-none disabled:opacity-50"
				>
					{submitting ? 'Creating account...' : 'Create account'}
				</button>
			</form>
		</div>

		<p class="mt-6 text-center text-sm text-gray-400">
			Already have an account?
			<a href="/login" class="text-brand-400 hover:text-brand-300 transition">Sign in</a>
		</p>
	</div>
</div>
