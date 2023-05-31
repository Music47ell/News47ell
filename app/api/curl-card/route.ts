import { NextResponse } from 'next/server'

import { getFullMessage } from '@/lib/curl-card'

export const runtime = 'edge'

export const GET = async () => {
	return NextResponse.json(getFullMessage(), {
		headers: {
			'Cache-Control': 's-maxage=86400, stale-while-revalidate',
		},
	})
}
