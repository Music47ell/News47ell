import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { Lyrics } from '@/lib/types'

export function useLyric() {
  const { data, error } = useSWR<Lyrics>('/api/lyric', fetcher)

  const lyric = data?.[Math.floor(Math.random() * data?.length)]

  return {
    lyric,
    isLoading: !error && !data,
    isError: error,
  }
}
