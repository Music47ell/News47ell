import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { IResumeLayout } from '@/lib/interfaces'
import { Lyrics, Quotes } from '@/lib/types'

export function useResume() {
	const { data, error } = useSWR<IResumeLayout>('/api/github/resume', fetcher)

	const resume = {
		basics: data?.basics,
		education: data?.education,
		skills: data?.skills,
		languages: data?.languages,
		certificates: data?.certificates,
	}

	return {
		resume,
		isLoading: !error && !data,
		isError: error,
	}
}

export function useLyric() {
	const { data, error } = useSWR<Lyrics>('/api/github/lyric', fetcher, {
		revalidateOnMount: false,
	})

	const lyric = data?.[Math.floor(Math.random() * data?.length)]

	return {
		lyric,
		isLoading: !error && !data,
		isError: error,
	}
}

export function useQuote() {
	const { data: quote, error } = useSWR<Quotes>('/api/github/quote', fetcher)

	return {
		quote,
		isLoading: !error && !quote,
		isError: error,
	}
}
