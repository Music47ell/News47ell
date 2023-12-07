import type { APIContext } from 'astro'

import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { getCollection } from 'astro:content'
const allBlogs = await getCollection('blog')
import { db, viewsTable } from '@/libs/turso'

export async function GET({ request, params }: APIContext) {
	const slug = z.string().parse(params.slug)
	if (!slug) return { status: 404 }

	if (!slug) return { status: 404 }

	const data = await db.select().from(viewsTable).where(eq(viewsTable.slug, slug)).all()

	const count = !data.length || !data[0] ? 0 : Number(data[0].count)

	return Response.json({ count })
}

export async function POST({ request, params }: APIContext) {
	const slug = z.string().parse(params.slug)

	const data = await db.select().from(viewsTable).where(eq(viewsTable.slug, slug)).all()

	const blog = allBlogs.find((blog) => blog.slug === slug) as { data: { title: string } }

	const count = !data.length || !data[0] ? 0 : Number(data[0].count)

	await db
		.insert(viewsTable)
		.values({
			slug,
			title: blog.data.title,
			count: 1,
		})
		.onConflictDoUpdate({
			target: viewsTable.slug,
			set: {
				count: count + 1,
			},
		})
		.returning()
		.get()

	return Response.json({ count: count + 1 })
}
