import type { APIContext } from 'astro'
import { z } from 'zod'

const API_KEY = import.meta.env.EMAILOCTOPUS_API_KEY
const LIST_ID = import.meta.env.EMAILOCTOPUS_LIST_ID
const API_URL = 'https://emailoctopus.com/api/1.6'

// Define the request body schema using Zod
const requestBodySchema = z.object({
	api_key: z.string(),
	email_address: z.string().email(),
	status: z.string(),
})

export async function POST({ request }: APIContext) {
	const body = await request.json()

	const email = z.string().parse(body.email)

	if (!email) {
		return Response.json({ error: 'Email is required' }, { status: 400 })
	}

	try {
		// Validate the request body against the schema
		const requestBody = requestBodySchema.parse({
			api_key: API_KEY,
			email_address: email,
			status: 'SUBSCRIBED',
		})
		// Make the request to EmailOctopus
		const response = await fetch(`${API_URL}/lists/${LIST_ID}/contacts`, {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (response.ok) {
			return Response.json({ error: null })
		}

		const responseBody = await response.json()
		return Response.json({ error: responseBody.error }, { status: 400 })
	} catch (error) {
		return Response.json({ error: Response.error }, { status: 500 })
	}
}
