import { error } from '@sveltejs/kit';
import { command, getRequestEvent } from '$app/server';
import { z } from "zod/v4";
import { postBlockUpdateSchema } from '$lib/server/db/post/types';
import BlockHandler from '$lib/server/db/block/handler';

/**
 * @descripion
 * updatePostBlocks Will insert new blocks, update old ones and delete as well
 */
const updatePostBlocks = command(postBlockUpdateSchema.extend({ deletedBlocks: z.array(z.object({ id: z.cuid2(), order: z.int().min(0) })) }), async (data) => {
	const { locals } = getRequestEvent();

	if (!locals.session || !locals.user) {
		error(401);
	}

	const { deletedBlocks, ...post } = data;

	const blockHandler = new BlockHandler();
	await blockHandler.updateBlockPost(post);

	for (const block of deletedBlocks) {
		await blockHandler.deleteBlock(block.id, block.order)
	}
});


export { updatePostBlocks };
