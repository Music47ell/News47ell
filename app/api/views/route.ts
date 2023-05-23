import { NextResponse } from 'next/server'

import { db, viewsTable } from '@/lib/turso'

export const GET = async () => {
	const result = await db.select().from(viewsTable).all()

	return NextResponse.json(result)
}
