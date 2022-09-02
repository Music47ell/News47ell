import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug = req.query.slug as string

		switch (req.method) {
			case 'GET': {
				const post = await prisma.postMeta.findUnique({
					where: { slug },
				})

				res.json({ views: post?.views || 1 })
				break
			}

			case 'POST': {
				const post = await prisma.postMeta.upsert({
					where: { slug },
					create: { slug, views: 1 },
					update: { views: { increment: 1 } },
				})

				res.json({ views: post?.views || 1 })
				break
			}

			default: {
				res.setHeader('Allow', ['GET', 'POST'])
				res.status(405).send('Method Not Allowed')
			}
		}
	} catch (err: any) {
		console.error(err.message)

		res.status(500).json({
			statusCode: 500,
			message: err.message,
		})
	}
}