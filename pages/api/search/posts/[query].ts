/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSearchResults } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req.query
	const searchResults = await getSearchResults('posts', query as string)

	res.status(200).json(searchResults)
}
