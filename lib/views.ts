import 'server-only'

import { desc } from 'drizzle-orm'
import { cache } from 'react'

import { db, viewsTable } from '@/lib/turso'

export const getBlogViews = cache(async () => {
	const result = await db.select().from(viewsTable).all()

	if (result.length === 0) {
		return 0
	}

	return result.reduce((acc, curr) => acc + Number(curr.count), 0)
})

export const getTopPosts = cache(async () => {
	const result = await db.select().from(viewsTable).orderBy(desc(viewsTable.count)).limit(3).all()

	if (result.length === 0) {
		return []
	}

	return result
})
