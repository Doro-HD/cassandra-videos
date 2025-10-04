import z from 'zod/v4';
import { blockInsertSchema } from '../block/types';

const postBlockUpdateSchema = z.object({
	postId: z.cuid2(),
	title: z.string().min(5),
	blocks: z.array(blockInsertSchema)
});

type TPostBlockUpdate = z.infer<typeof postBlockUpdateSchema>;

export { postBlockUpdateSchema, type TPostBlockUpdate };
