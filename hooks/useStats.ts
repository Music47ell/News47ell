import fetcher from '@/lib/fetcher'
import useSWR from 'swr'
import { Stats } from '@/lib/types'

type Active = {
  active: number
}

type SlugStats = {
  pageviews: {
    value: number
  }
}

export function useActiveStats() {
  const { data, error } = useSWR<Active>('/api/stats/active', fetcher, {
    refreshInterval: 3000,
  })

  if (!data) {
    return { active: 0 }
  }

  const { active } = data

  return {
    active,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useDashboardViews() {
  const { data, error } = useSWR<Stats>('/api/stats', fetcher)

  const views = data?.allTime.pageviews.value

  return {
    views,
    isLoading: !data && !error,
    isError: error,
  }
}

export function useSlugStats(slug: string) {
  const { data, error } = useSWR<SlugStats>(`/api/stats/${slug}`, fetcher, {
    revalidateOnMount: false,
  })

  const value = data?.pageviews.value

  return {
    value,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useStatisticsStats() {
  const { data, error } = useSWR<Stats>('/api/stats', fetcher)

  const AllStats = data?.allTime.pageviews.value
  const AllStatsYesterday = data?.yesterday.yesterdaysPageviews.value
  const uniqueVisitors = data?.allTime.uniques.value
  const uniqueVisitorsYesterday = data?.yesterday.yesterdaysUniques.value
  const countries = data?.Country?.map((c) => ({
    name: c.x,
    count: c.y,
  })).length

  const isMobile = data?.Devices?.filter((device) => device.x === 'mobile' || device.x === 'tablet')
    .map((device) => device.y)
    .reduce((a, b) => a + b, 0)

  const isDesktop = data?.Devices?.filter(
    (device) => device.x === 'desktop' || device.x === 'laptop'
  )
    .map((device) => device.y)
    .reduce((a, b) => a + b, 0)

  return {
    stats: {
      AllStats,
      AllStatsYesterday,
      uniqueVisitors,
      uniqueVisitorsYesterday,
      countries,
      isMobile,
      isDesktop,
      isLoading: !error && !data,
      isError: error,
    },
  }
}
