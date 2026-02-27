<script lang="ts">
	import { goto } from '$app/navigation';
	import { api, ApiError } from '$lib/api.js';
	import { JIOBASE_DOMAIN } from '@jiobase/shared';

	let name = $state('');
	let slug = $state('');
	let supabaseUrl = $state('');
	let supabaseAnonKey = $state('');
	let error = $state('');
	let submitting = $state(false);
	let slugManuallyEdited = $state(false);

	function generateSlug(name: string): string {
		return name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')
			.substring(0, 63);
	}

	function handleNameInput() {
		if (!slugManuallyEdited) {
			slug = generateSlug(name);
		}
	}

	function handleSlugInput() {
		slugManuallyEdited = true;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		submitting = true;
		try {
			const res = await api.apps.create({
				name,
				slug,
				supabaseUrl,
				supabaseAnonKey: supabaseAnonKey || undefined,
			});
			goto(`/dashboard/apps/${res.data.id}`);
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

<div class="mx-auto max-w-lg">
	<h1 class="text-2xl font-bold text-white">Create New App</h1>
	<p class="mt-1 text-sm text-gray-400">Connect your Supabase project through JioBase's proxy.</p>

	<form onsubmit={handleSubmit} class="mt-8 space-y-5">
		{#if error}
			<div class="rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}

		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-300">App Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				oninput={handleNameInput}
				required
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				placeholder="My App"
			/>
		</div>

		<div>
			<label for="slug" class="mb-1 block text-sm font-medium text-gray-300">Slug</label>
			<input
				id="slug"
				type="text"
				bind:value={slug}
				oninput={handleSlugInput}
				required
				pattern={'[a-z0-9]([a-z0-9\\-]{0,61}[a-z0-9])?'}
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				placeholder="my-app"
			/>
			{#if slug}
				<p class="mt-1 text-xs text-gray-500">
					Your proxy URL: <span class="text-gray-300">{slug}.{JIOBASE_DOMAIN}</span>
				</p>
			{/if}
		</div>

		<div>
			<label for="supabaseUrl" class="mb-1 block text-sm font-medium text-gray-300">Supabase Project URL</label>
			<input
				id="supabaseUrl"
				type="url"
				bind:value={supabaseUrl}
				required
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				placeholder="https://abcdefg.supabase.co"
			/>
		</div>

		<div>
			<label for="anonKey" class="mb-1 block text-sm font-medium text-gray-300">
				Supabase Anon Key <span class="text-gray-500">(optional)</span>
			</label>
			<input
				id="anonKey"
				type="text"
				bind:value={supabaseAnonKey}
				class="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
				placeholder="eyJhbGciOiJIUzI1..."
			/>
		</div>

		<div class="flex gap-3 pt-2">
			<button
				type="submit"
				disabled={submitting}
				class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
			>
				{submitting ? 'Creating...' : 'Create App'}
			</button>
			<a
				href="/dashboard"
				class="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-gray-600"
			>
				Cancel
			</a>
		</div>
	</form>
</div>
