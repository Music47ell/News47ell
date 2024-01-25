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
			series_id: z.string().optional(),
		}),
})

const seriesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		published_at: z.date(),
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
	series: seriesCollection,
	pages: pagesCollection,
}
