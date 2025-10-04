import { pgTable, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { userTable } from '$lib/server/db/user/schema';

const passkeyTable = pgTable('passkey', {
	id: text('id').primaryKey(),
	name: text('name'),
	publicKey: text('public_key').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	credentialID: text('credential_id').notNull(),
	counter: integer('counter').notNull(),
	deviceType: text('device_type').notNull(),
	backedUp: boolean('backed_up').notNull(),
	transports: text('transports'),
	createdAt: timestamp('created_at'),
	aaguid: text('aaguid')
});

export { passkeyTable };
