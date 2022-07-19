import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export function usePostsSearch<T>(q: string) {
  const { data } = useSWR<T>(q.length ? `/api/search/posts/${q}` : null, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data,
  }
}
