const { RAINDROP_ACCESS_TOKEN } = process.env

export const getRaindropCount = async () => {
	if (RAINDROP_ACCESS_TOKEN === null || RAINDROP_ACCESS_TOKEN === undefined) {
		throw new Error(`No Raindrop API key found!`)
	}
	const RAINDROP_ENDPOINT = `https://api.raindrop.io/rest/v1/user/stats`

	return fetch(RAINDROP_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${RAINDROP_ACCESS_TOKEN}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
}

export const getRaindropCollection = async (id: string, page: number) => {
	if (RAINDROP_ACCESS_TOKEN === null || RAINDROP_ACCESS_TOKEN === undefined) {
		throw new Error(`No Raindrop API key found!`)
	}
	const RAINDROP_ENDPOINT = `https://api.raindrop.io/rest/v1/raindrops/${id}?page=${page}`

	return fetch(RAINDROP_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${RAINDROP_ACCESS_TOKEN}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
}
