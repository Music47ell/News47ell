import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import type { Blog } from '@/contentlayer/generated'
import { allBlogs } from '@/contentlayer/generated'
import { db, viewsTable } from '@/lib/turso'

interface Options {
	params: {
		slug: string
	}
}

export const GET = async (request: NextRequest, { params }: Options) => {
	const slug = z.string().parse(params.slug)

	const data = await db.select().from(viewsTable).where(eq(viewsTable.slug, slug)).all()

	const count = !data.length ? 0 : Number(data[0].count)

	return NextResponse.json({ count })
}

export const POST = async (request: NextRequest, { params }: Options) => {
	const slug = z.string().parse(params.slug)

	const data = await db.select().from(viewsTable).where(eq(viewsTable.slug, slug)).all()

	const blog = allBlogs.find((blog) => blog.slug === slug) as Blog

	const count = !data.length ? 0 : Number(data[0].count)

	await db
		.insert(viewsTable)
		.values({
			slug,
			title: blog.title,
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

	return NextResponse.json({ count: count + 1 })
}
