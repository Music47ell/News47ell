import { createClient } from '@libsql/client'
import { sql } from 'drizzle-orm'
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

export const songRecommendationsTable = sqliteTable('metalmagnet', {
	id: integer('id').primaryKey(),
	createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
	email: text('email'),
	note: text('note'),
	songTitle: text('song-title').notNull(),
	spotifyUri: text('spotify-uri').notNull(),
	spotifyUrl: text('spotify-url').notNull(),
})
