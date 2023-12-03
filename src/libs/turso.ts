import { createClient } from '@libsql/client'
import { desc } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const connection = createClient({
	url: import.meta.env.DATABASE_URL || '',
	authToken: import.meta.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(connection)

export const viewsTable = sqliteTable('views', {
	slug: text('slug').primaryKey(),
	title: text('title').notNull(),
	count: integer('count').notNull().default(0),
})

export const analyticsTable = sqliteTable('analytics', {
	id: integer('id').primaryKey(),
	date: text('date').notNull(),
	slug: text('slug').notNull(),
	referrer: text('referrer').notNull(),
	flag: text('flag'),
	country: text('country'),
	city: text('city'),
	latitude: text('latitude'),
	longitude: text('longitude'),
})

export const getTopPosts = async () => {
	const result = await db.select().from(viewsTable).orderBy(desc(viewsTable.count)).limit(3).all()

	if (result.length === 0) {
		return []
	}

	return result.map((item) => ({
		slug: item.slug,
		data: {
			title: item.title,
		},
	}))
}
