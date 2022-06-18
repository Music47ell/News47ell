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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDashboardViews() {
  const { data, error } = useSWR<Stats>('/api/stats', fetcher)

  const views = data?.allTime.pageviews.value

  return {
    views,
    isLoading: !data && !error,
    isError: error,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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

  const isMobile = Number(
    data?.Devices?.filter((device) => device.x === 'tablet').map((device) => device.y)
  )
  const isDesktop = Number(
    data?.Devices?.filter((device) => device.x === 'desktop' || device.x === 'laptop').map(
      (device) => device.y
    )
  )
  const macintosh = Number(data?.OS?.filter((s) => s.x === 'Mac OS').map((s) => s.y))
  const windows = Number(data?.OS?.filter((s) => s.x?.includes('Windows')).map((s) => s.y))
  const linux = Number(data?.OS?.filter((s) => s.x?.includes('Linux')).map((s) => s.y))
  const android = Number(data?.OS?.filter((s) => s.x?.includes('Android')).map((s) => s.y))
  const ios = Number(data?.OS?.filter((s) => s.x?.includes('iOS')).map((s) => s.y))
  const safari = Number(
    data?.Browsers?.filter((browser) => browser.x?.includes('safari')).map((s) => s.y)
  )
  const chrome = Number(
    data?.Browsers?.filter((browser) => browser.x?.includes('chrome')).map((s) => s.y)
  )
  const firefox = Number(
    data?.Browsers?.filter((browser) => browser.x?.includes('firefox')).map((s) => s.y)
  )
  const edge = Number(
    data?.Browsers?.filter((browser) => browser.x?.includes('edge')).map((s) => s.y)
  )

  return {
    stats: {
      AllStats,
      AllStatsYesterday,
      uniqueVisitors,
      uniqueVisitorsYesterday,
      countries,
      isMobile,
      isDesktop,
      macintosh,
      windows,
      linux,
      android,
      ios,
      safari,
      chrome,
      edge,
      firefox,
      isLoading: !error && !data,
      isError: error,
    },
  }
}
