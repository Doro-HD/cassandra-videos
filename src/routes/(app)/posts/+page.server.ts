import { connectDB } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const db = connectDB();

	const posts = db.query.postTable.findMany();

	return {
		posts
	};
};
