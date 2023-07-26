import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const API_KEY = process.env.EMAILOCTOPUS_API_KEY
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID
const API_URL = 'https://emailoctopus.com/api/1.6'

// Define the request body schema using Zod
const requestBodySchema = z.object({
	api_key: z.string(),
	email_address: z.string().email(),
	status: z.string(),
})

export const POST = async (req: NextRequest, res: NextResponse) => {
	const body = await req.json()

	const email = body.email

	if (!email) {
		return NextResponse.json({ error: 'Email is required' }, { status: 400 })
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

		if (response.status >= 400) {
			return NextResponse.json({ error: 'Email already exists' }, { status: 500 })
		}

		return NextResponse.json({ message: 'Success' }, { status: 200 })
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 400 })
	}
}
