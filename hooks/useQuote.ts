import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { Quotes } from '@/lib/types'

export function useQuote() {
	const { data, error } = useSWR<Quotes>('/api/quotes', fetcher)

	const quote = data?.[Math.floor(Math.random() * data?.length)]

	return {
		quote,
		isLoading: !error && !data,
		isError: error,
	}
}
