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

<div class="flex min-h-screen items-center justify-center bg-gray-950 px-4">
	<div class="w-full max-w-sm">
		<div class="mb-8 text-center">
			<a href="/" class="text-2xl font-bold text-white">JioBase</a>
			<p class="mt-2 text-sm text-gray-400">Create your account</p>
		</div>

		<form onsubmit={handleSubmit} class="space-y-4">
			{#if error}
				<div class="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">
					{error}
				</div>
			{/if}

			<div>
				<label for="name" class="mb-1 block text-sm font-medium text-gray-300">Name</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					placeholder="John Doe"
				/>
			</div>

			<div>
				<label for="email" class="mb-1 block text-sm font-medium text-gray-300">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label for="password" class="mb-1 block text-sm font-medium text-gray-300">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					minlength="8"
					class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
					placeholder="••••••••"
				/>
				<p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
			</div>

			<button
				type="submit"
				disabled={submitting}
				class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950 focus:outline-none disabled:opacity-50"
			>
				{submitting ? 'Creating account...' : 'Create account'}
			</button>
		</form>

		<p class="mt-6 text-center text-sm text-gray-400">
			Already have an account?
			<a href="/login" class="text-blue-400 hover:text-blue-300">Sign in</a>
		</p>
	</div>
</div>
