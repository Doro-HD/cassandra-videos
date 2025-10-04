import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { blockTable } from '../block/schema';

const postTable = pgTable('posts', {
	id: text('id').primaryKey(),
	title: text('title').notNull().unique(),
	description: text('description').notNull(),
	createdAt: timestamp('create_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => new Date())
		.notNull()
});

const postRelation = relations(postTable, ({ many }) => ({
	blocks: many(blockTable)
}));

export { postTable, postRelation };
