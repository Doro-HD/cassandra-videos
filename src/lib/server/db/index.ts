import { DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/neon-http';

import * as postSchema from './post/schema';
import * as blockSchema from './block/schema';

function connectDB() {
	return drizzle(DB_URL, { schema: { ...postSchema, ...blockSchema } });
}

type TDB = ReturnType<typeof connectDB>;

export { connectDB, type TDB };
