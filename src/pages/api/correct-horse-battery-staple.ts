import type { APIContext } from 'astro'
import { geolocation } from '@vercel/edge'
import { db, analyticsTable } from '@/libs/turso'

export const config = {
	runtime: 'edge',
}

export async function POST({ params, request }: APIContext) {
	const date = new Date()
	const currentUrl = new URL(request.url)
	const { slug, referrer } = await new Response(request.body).json()
	const { flag, country, city, latitude, longitude } = geolocation(request)

	try {
		if (!(flag && country && city && latitude && longitude && slug && referrer)) {
			return Response.json({
				message: 'Missing required parameters',
			})
		} else if (currentUrl.hostname === 'localhost' || currentUrl.hostname === 'vercel.app') {
			return Response.json({
				message: 'Not saving analytics for localhost or vercel.app',
			})
		} else {
			await db.insert(analyticsTable).values({
				date: date.toISOString(),
				slug: slug,
				referrer: referrer,
				flag: flag,
				country: country,
				city: city,
				latitude: latitude,
				longitude: longitude,
			})

			return Response.json({
				message: 'A Ok!',
			})
		}
	} catch (error) {
		return Response.json({
			message: 'Error',
		})
	}
}
