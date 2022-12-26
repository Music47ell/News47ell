const SUPABASE_ENDPOINT = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const getWebVitals = async () => {
	if (SUPABASE_ENDPOINT === null || SUPABASE_API_KEY === undefined) {
		throw new Error(`No Supabase API key found!`)
	}
	return fetch(`${SUPABASE_ENDPOINT}/rest/v1/web-vitals`, {
		headers: {
			'Content-Type': 'application/json',
			apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		},
	})
}

export const sendWebVitals = async (body: string) => {
	if (SUPABASE_ENDPOINT === null || SUPABASE_API_KEY === undefined) {
		throw new Error(`No Supabase API key found!`)
	}
	return fetch(`${SUPABASE_ENDPOINT}/rest/v1/web-vitals`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		},
		body: body,
	})
}
