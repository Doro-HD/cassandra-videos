import { eq, getTableColumns, sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { connectDB, type TDB } from '$lib/server/db/index';
import { postTable } from './schema';
import { blockTable } from '$lib/server/db/block/schema';

class PostHandler {
	#client: TDB;
	#table: typeof postTable;

	constructor() {
		this.#client = connectDB();
		this.#table = postTable;
	}

	async getPosts() {
		return this.#client.query.postTable.findMany();
	}

	async findById(id: string) {
		const post = await this.#client.query.postTable.findFirst({
			where: (post, { eq }) => eq(post.id, id),
			with: {
				blocks: {
					orderBy: (block) => block.order
				}
			}
		})

		if (!post) {
			return undefined;
		}

		const highestOrder = post.blocks.at(-1)?.order

		return {
			...post,
			highestOrder
		}
	}

	async createPost(post: { title: string; description: string }) {
		const newPostIds = await this.#client
			.insert(this.#table)
			.values({ ...post, id: createId() })
			.returning({ id: this.#table.id });

		return newPostIds.at(0)?.id;
	}
}

export default PostHandler;
