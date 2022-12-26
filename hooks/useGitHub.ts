import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { ICommitData, IResumeLayout } from '@/lib/interfaces'
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

export function useCommitData(slug: string) {
	const { data, error } = useSWR<ICommitData>(`/api/github/commit-data/${slug}`, fetcher)

	return {
		firstCommitDate: data?.firstCommitDate,
		lastCommitDate: data?.lastCommitDate,
		firstCommitHash: data?.firstCommitHash || '000000',
		lastCommitHash: data?.lastCommitHash || 'E30A17',
		isCommitDataLoading: !error && !data,
		isError: error,
	}
}
