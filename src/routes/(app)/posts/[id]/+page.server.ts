import { error, fail } from '@sveltejs/kit';
import { z } from "zod/v4";
import { postBlockUpdateSchema } from '$lib/server/db/post/types';
import PostHandler from '$lib/server/db/post/handler';
import BlockHandler from '$lib/server/db/block/handler';
import type { PageServerLoad, Actions } from './$types';

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

const postBlockUpdateDeleteSchema = postBlockUpdateSchema.extend({ deletedBlocks: z.array(z.object({ id: z.cuid2(), order: z.int().min(0) })) })

export const actions: Actions = {
	default: async ({ locals, request }) => {
		if (!locals.session || !locals.user) {
			error(401);
		}

		const formData = await request.formData();

		const postID = formData.get("postID")!.toString()
		const postTitle = formData.get("postTitle")!.toString()
		const blocks = JSON.parse(formData.get("blocks")!.toString())
		const deletedBlocks = JSON.parse(formData.get("deletedBlocks")!.toString())

		const schemaResult = postBlockUpdateDeleteSchema.safeParse({ postId: postID, title: postTitle, blocks, deletedBlocks });
		if (!schemaResult.success) {
			return fail(400);
		}

		const blockHandler = new BlockHandler();
		await blockHandler.updateBlockPost({ postId: postID, title: postTitle, blocks });

		for (const block of deletedBlocks) {
			await blockHandler.deleteBlock(block.id, block.order)
		}
	}
}
