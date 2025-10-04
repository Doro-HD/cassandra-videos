import { z } from 'zod/v4';

const blockSchema = z.object({
	id: z.cuid2(),
	order: z.int().min(0),
	data: z.discriminatedUnion('type', [
		z.object({
			type: z.literal('text'),
			text: z.string().max(1000)
		}),
		z.object({
			type: z.literal('youtube'),
			vidioID: z.string(),
			startTimeMin: z.number().min(0),
			startTimeSec: z.number().min(0).max(59),
			endTimeMin: z.number().min(0),
			endTimeSec: z.number().min(0).max(59)
		})
	]),
	postID: z.cuid2()
});

const blockInsertSchema = blockSchema.extend({ id: z.cuid2().optional() });

type TBlock = z.infer<typeof blockSchema>;
type TBlockInsert = z.infer<typeof blockInsertSchema>;

export { blockSchema, blockInsertSchema, type TBlock, type TBlockInsert };
