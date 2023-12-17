import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().max(160),
			tags: z.array(z.string()),
			cover: z
				.object({
					src: image(),
					alt: z.string(),
					credit: z.string().optional(),
				})
				.optional(),
			published_at: z.date(),
			source: z.string().url().optional(),
		}),
})

const pagesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string().max(160),
		published_at: z.date(),
	}),
})

export const collections = {
	blog: blogCollection,
	pages: pagesCollection,
}
