import { error } from '@sveltejs/kit';
import { FIX_PAGES_MAP } from '$lib/data/seo-pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const pageData = FIX_PAGES_MAP.get(params.slug);
	if (!pageData) {
		throw error(404, 'Page not found');
	}
	return { pageData };
};
