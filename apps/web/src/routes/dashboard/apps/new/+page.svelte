<script lang="ts">
	import { goto } from '$app/navigation';
	import { api, ApiError } from '$lib/api.js';
	import { JIOBASE_DOMAIN } from '@jiobase/shared';

	let name = $state('');
	let slug = $state('');
	let supabaseUrl = $state('');
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
			<div class="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
		{/if}

		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-300">App Name</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				oninput={handleNameInput}
				required
				class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white placeholder-gray-500 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 focus:outline-none"
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
				class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white placeholder-gray-500 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 focus:outline-none"
				placeholder="my-app"
			/>
			{#if slug}
				<p class="mt-1 text-xs text-gray-500">
					Your proxy URL: <span class="text-brand-400">{slug}.{JIOBASE_DOMAIN}</span>
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
				class="w-full rounded-lg border border-white/10 bg-surface-200 px-3 py-2.5 text-white placeholder-gray-500 focus:border-brand-400 focus:ring-1 focus:ring-brand-400 focus:outline-none"
				placeholder="https://abcdefg.supabase.co"
			/>
			<p class="mt-1 text-xs text-gray-500">Find this in your Supabase project settings → API</p>
		</div>

		<p class="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-gray-500">
			By creating an app, you confirm that your use complies with our
			<a href="/terms" target="_blank" class="text-brand-400 hover:text-brand-300 underline transition">Terms of Service</a>
			and
			<a href="/terms#acceptable-use" target="_blank" class="text-brand-400 hover:text-brand-300 underline transition">Acceptable Use Policy</a>.
			All proxied traffic is subject to our
			<a href="/privacy" target="_blank" class="text-brand-400 hover:text-brand-300 underline transition">Privacy Policy</a>.
		</p>

		<div class="flex gap-3 pt-2">
			<button
				type="submit"
				disabled={submitting}
				class="rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-300 disabled:opacity-50"
			>
				{submitting ? 'Creating...' : 'Create App'}
			</button>
			<a
				href="/dashboard"
				class="rounded-lg border border-white/10 px-5 py-2.5 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
			>
				Cancel
			</a>
		</div>
	</form>
</div>
