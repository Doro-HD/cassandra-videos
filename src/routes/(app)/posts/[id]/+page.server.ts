import type { PageServerLoad } from './$types';
import PostHandler from '$lib/server/db/post/handler';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const postId = params.id;

	const postHandler = new PostHandler();

	const post = await postHandler.findById(postId);
	if (!post) {
		error(404);
	}

	return {
		post
	};
};
