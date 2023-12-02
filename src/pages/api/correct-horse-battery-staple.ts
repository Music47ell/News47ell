import type { APIContext } from 'astro'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db, analyticsTable } from '@/libs/turso'
import getFlagEmoji from '@/utils/getFlagEmoji'

export async function POST({ params, request }: APIContext) {
	const date = new Date()
	const currentUrl = new URL(request.url)
	const { slug, referrer } = await new Response(request.body).json()
	const ipinfo = await fetch(`https://ipinfo.io/json`)
	const { country, city, loc } = await ipinfo.json()
	const [latitude, longitude] = loc.split(',')
	const flag = getFlagEmoji(country)

	try {
		if (!(flag && country && city && latitude && longitude && slug && referrer)) {
			return Response.json({
				message: 'Missing required parameters',
			})
		} else if (currentUrl.hostname === 'localhost' || currentUrl.hostname === 'netlify.app') {
			return Response.json({
				message: 'Not saving analytics for localhost or netlify.app',
			})
		} else {
			await db.insert(analyticsTable).values({
				date: date,
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
