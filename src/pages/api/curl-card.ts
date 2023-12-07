import type { APIContext } from 'astro'
import { getFullMessage } from '@/libs/curl-card'

export const config = {
	runtime: 'edge',
}

export async function GET({ request, params }: APIContext) {
	return new Response(getFullMessage())
}
