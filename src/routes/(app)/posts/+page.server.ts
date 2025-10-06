import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod/v4';
import PostHandler from '$lib/server/db/post/handler';
import { connectDB } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = () => {
	const db = connectDB();

	const posts = db.query.postTable.findMany();

	return {
		posts
	};
};

const postSchema = z.object({
	title: z.string().min(5).max(15),
	description: z.string().min(10).max(100)
})

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.session || !locals.user) {
			error(401);
		}

		const formData = await request.formData();

		const title = formData.get("title")!.toString();
		const description = formData.get("description")!.toString();

		const postResult = postSchema.safeParse({ title, description });
		if (!postResult.success) {
			return fail(400);
		}

		const postHanlder = new PostHandler();
		const newPostId = await postHanlder.createPost(postResult.data);

		if (newPostId === undefined) {
			error(500);
		}

		redirect(307, `posts/${newPostId}`);

	}
}
