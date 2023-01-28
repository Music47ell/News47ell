import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { IResumeLayout } from '@/lib/interfaces'
import { Lyrics, Quotes } from '@/lib/types'

export function useResume() {
	const { data, error, isLoading } = useSWR<IResumeLayout>('/api/github/resume', fetcher)

	const resume = {
		basics: data?.basics,
		education: data?.education,
		skills: data?.skills,
		languages: data?.languages,
		certificates: data?.certificates,
	}

	return {
		resume,
		isLoading,
		isError: error,
	}
}

export function useLyric() {
	const { data, error, isLoading } = useSWR<Lyrics>('/api/github/lyric', fetcher, {
		revalidateOnMount: false,
	})

	const lyric = data?.[Math.floor(Math.random() * data?.length)]

	return {
		lyric,
		isLoading,
		isError: error,
	}
}

export function useQuote() {
	const { data: quote, error, isLoading } = useSWR<Quotes>('/api/github/quote', fetcher)

	return {
		quote,
		isLoading,
		isError: error,
	}
}
