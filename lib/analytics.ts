const { UMAMI_TOKEN } = process.env

const ANALYTICS_ENDPOINT = 'https://stats.news47ell.com/api'

export const getActive = async () => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const response = await fetch(`${ANALYTICS_ENDPOINT}/website/1/active`, {
		headers: {
			Authorization: `Bearer ${UMAMI_TOKEN}`,
			'Content-Type': 'application/json',
		},
	})

	return response.json()
}

export const getStats = async () => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const timestamp = new Date().getTime()

	const response = await fetch(
		`${ANALYTICS_ENDPOINT}/website/1/stats?start_at=1645045200000&end_at=${timestamp}`,
		{
			headers: {
				Authorization: `Bearer ${UMAMI_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	)

	return response.json()
}

export const getYesterdaysStats = async () => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const timestamp = new Date().getTime()
	const yesterdaysTimestamp = new Date(timestamp).setDate(new Date(timestamp).getDate() - 1)

	const response = await fetch(
		`${ANALYTICS_ENDPOINT}/website/1/stats?start_at=${yesterdaysTimestamp}&end_at=${timestamp}`,
		{
			headers: {
				Authorization: `Bearer ${UMAMI_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	)

	return response.json()
}

export const getTopSlug = async () => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const timestamp = new Date().getTime()

	const response = await fetch(
		`${ANALYTICS_ENDPOINT}/website/1/metrics?type=url&start_at=1645045200000&end_at=${timestamp}`,
		{
			headers: {
				Authorization: `Bearer ${UMAMI_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	)

	return response.json()
}

export const getSlugStats = async (slug: string) => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const timestamp = new Date().getTime()

	const response = await fetch(
		`${ANALYTICS_ENDPOINT}/website/1/stats?start_at=1645045200000&end_at=${timestamp}&url=${encodeURIComponent(
			slug
		)}`,
		{
			headers: {
				Authorization: `Bearer ${UMAMI_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	)

	return response.json()
}

export const getMetrics = async (type: string) => {
	if (UMAMI_TOKEN === null) {
		throw new Error(`No Umami API key found!`)
	}

	const timestamp = new Date().getTime()

	const response = await fetch(
		`${ANALYTICS_ENDPOINT}/website/1/metrics?type=${type}&start_at=1645045200000&end_at=${timestamp}`,
		{
			headers: {
				Authorization: `Bearer ${UMAMI_TOKEN}`,
				'Content-Type': 'application/json',
			},
		}
	)

	return response.json()
}
