import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { IResumeLayout } from '@/lib/interfaces'

export function useResume() {
	const { data, error } = useSWR<IResumeLayout>('/api/resume', fetcher)

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
