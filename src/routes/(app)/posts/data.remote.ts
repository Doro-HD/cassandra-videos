import { form, getRequestEvent } from '$app/server';
import PostHandler from '$lib/server/db/post/handler';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod/v4';

const createPost = form(
	z.object({
		title: z.string().min(5).max(15),
		description: z.string().min(10).max(100)
	}),
	async ({ title, description }) => {
		const { locals } = getRequestEvent();
		if (!locals.session || !locals.user) {
			error(401);
		}

		const postHanlder = new PostHandler();
		const newPostId = await postHanlder.createPost({ title, description });

		if (newPostId === undefined) {
			error(500);
		}

		redirect(307, `posts/${newPostId}`);
	}
);

export { createPost };
