import 'server-only'

import { cache } from 'react'

export const getSubscribersCount = cache(async () => {
	const API_KEY = process.env.EMAILOCTOPUS_API_KEY
	const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID
	const API_URL = 'https://emailoctopus.com/api/1.6'

	const response = await fetch(`${API_URL}/lists/${LIST_ID}?api_key=${API_KEY}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	return data.counts.subscribed
})
