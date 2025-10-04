import { eq, gt, sql } from 'drizzle-orm';
import cuid2 from '@paralleldrive/cuid2';
import { connectDB, type TDB } from '$lib/server/db/index';
import type { TPostBlockUpdate } from '$lib/server/db/post/types';
import { postTable } from '$lib/server/db/post/schema';
import { blockTable } from './schema';

class BlockHandler {
	#client: TDB;
	#table: typeof blockTable;

	constructor() {
		this.#client = connectDB();
		this.#table = blockTable;
	}

	// always important to await drizzle or otherwise it wont get executed, at least when not using execute
	async updateBlockPost(post: TPostBlockUpdate) {
		await this.#client
			.update(postTable)
			.set({ title: post.title })
			.where(eq(postTable.id, post.postId));

		const updatedBlocks = post.blocks.filter((block) => block.id);

		for (const block of updatedBlocks) {
			await this.#client
				.update(this.#table)
				.set({ data: block.data })
				.where(eq(this.#table.id, block.id as string));
		}

		const newBlocks = post.blocks
			.filter((block) => !block.id)
			.map((block) => ({ ...block, id: cuid2.createId() }));
		if (newBlocks.length > 0) {
			await this.#client.insert(this.#table).values(newBlocks);
		}
	}

	async deleteBlock(blockID: string, blockOrder: number) {
		await this.#client.delete(this.#table).where(eq(this.#table.id, blockID))
		await this.#client.update(this.#table).set({ order: sql`${this.#table.order} - 1` }).where(gt(this.#table.order, blockOrder))
	}
}

export default BlockHandler;
