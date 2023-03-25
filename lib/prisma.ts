import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

export let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	prisma = global.prisma
}

export const getTotalViews = async (): Promise<{ views: number }> => {
	const data = await prisma.postMeta.aggregate({
		_sum: {
			views: true,
		},
	})

	return {
		views: data._sum.views,
	}
}

export const getTopViews = async () => {
	const mostViewedPosts = await prisma.postMeta.findMany({
		select: {
			views: true,
			slug: true,
		},
		orderBy: {
			views: 'desc',
		},
		take: 3,
	})

	const topViews = mostViewedPosts.map(({ slug, views }) => ({
		title: slug
			.replace(/-/g, ' ')
			.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()),
		slug: `/blog/${slug}`,
		total: views,
	}))

	return topViews
}
