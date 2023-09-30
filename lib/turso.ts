import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const connection = createClient({
	url: process.env.DATABASE_URL || '',
	authToken: process.env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle(connection)

export const viewsTable = sqliteTable('views', {
	slug: text('slug').primaryKey(),
	title: text('title').notNull(),
	count: integer('count').notNull().default(0),
})
