import { error } from '@sveltejs/kit';
import { FRAMEWORK_PAGES_MAP } from '$lib/data/seo-pages';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const pageData = FRAMEWORK_PAGES_MAP.get(params.framework);
	if (!pageData) {
		throw error(404, 'Guide not found');
	}
	return { pageData };
};
