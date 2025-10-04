import { pgEnum, pgTable, text, integer, json, foreignKey } from 'drizzle-orm/pg-core';
import { postTable } from '$lib/server/db/post/schema';
import { relations } from 'drizzle-orm';
import type { TBlock } from './types';

const blockType = pgEnum('block_type', ['text', 'youtube']);

const blockTable = pgTable(
	'blocks',
	{
		id: text('id').primaryKey(),
		order: integer('order').notNull(),
		data: json('data').$type<TBlock['data']>().notNull(),
		postID: text('post_id').notNull()
	},
	(table) => [foreignKey({ columns: [table.postID], foreignColumns: [postTable.id] })]
);

const blockRelation = relations(blockTable, ({ one }) => ({
	post: one(postTable, {
		fields: [blockTable.postID],
		references: [postTable.id]
	})
}));

export { blockTable, blockRelation, blockType };
