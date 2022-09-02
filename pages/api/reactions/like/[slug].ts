import { prisma } from '@/lib/prisma'
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const slug = req.query.slug as string
		const ipAddress =
			req.headers['x-forwarded-for'] ||
			// Fallback for localhost or non Vercel deployments
			'0.0.0.0'

		const currentUserId =
			// Since a users IP address is part of the sessionId in our database, we
			// hash it to protect their privacy. By combining it with a salt, we get
			// a unique id we can refer to, but we won't know what their ip
			// address was.
			createHash('md5')
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				.update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
				.digest('hex')

		// Identify a specific users interactions with a specific post
		const sessionId = slug + '___' + currentUserId

		if (req.method === 'GET') {
			const [post, user] = await Promise.all([
				prisma.postMeta.findUnique({
					where: {
						slug,
					},
				}),

				prisma.reactionByUser.findUnique({
					where: {
						id: sessionId,
					},
				}),
			])

			return res.status(200).json({
				likes: post?.likes ?? 0,
				userLikes: user?.like,
			})
		}

		if (req.method === 'PUT') {
			const body = JSON.parse(req.body)
			if (body.type === 'increment') {
				const [post, user] = await Promise.all([
					prisma.postMeta.upsert({
						create: {
							slug,
							likes: 1,
						},
						update: {
							likes: {
								increment: 1,
							},
						},
						where: {
							slug,
						},
					}),

					prisma.reactionByUser.upsert({
						where: { id: sessionId },
						create: {
							id: sessionId,
							like: true,
						},
						update: {
							like: {
								set: true,
							},
						},
					}),
				])

				return res.status(200).json({
					likes: post?.likes ?? 0,
					userLikes: user?.like,
				})
			} else if (body.type === 'decrement') {
				const [post, user] = await Promise.all([
					prisma.postMeta.upsert({
						create: {
							slug,
							likes: 0,
						},
						update: {
							likes: {
								increment: -1,
							},
						},
						where: {
							slug,
						},
					}),

					prisma.reactionByUser.upsert({
						where: { id: sessionId },
						create: {
							id: sessionId,
							like: false,
						},
						update: {
							like: {
								set: false,
							},
						},
					}),
				])

				return res.status(200).json({
					likes: post?.likes ?? 0,
					userLikes: user?.like,
				})
			}
		}
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}
