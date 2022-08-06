import { ChartIcon, UsersIcon, GlobeIcon, DesktopIcon, MobileIcon } from '@/components/icons'
import { StatsCard } from '@/components/metrics/Stats'
import Current from '@/components/metrics/WebVitals/Current'
import Chart from '@/components/metrics/WebVitals/Chart'
import { Rating, useWebVitals } from '@/hooks/useWebVitals'
import { useStatisticsStats } from '@/hooks/useStats'
import { LiveCard } from '@/components/metrics/Stats'
import { AllReactions, IndividualReactions } from '@/components/metrics/Reactions'
import { ProjectBreakdown } from '@/components/metrics/ProjectBreakdown'

export default function StatsLayout(): JSX.Element {
  const webVitals = useWebVitals()
  const { stats } = useStatisticsStats()

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h3 className="text-2xl font-bold leading-8 tracking-tight">Site Statistics</h3>
        <p className="text-xs">Collected with Umami</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LiveCard />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-3">
        <StatsCard title="All Views" count={stats.AllStats} yesterday={stats.AllStatsYesterday}>
          <ChartIcon className="mr-1 block h-10 w-10 fill-nfh-accent-primary" />
        </StatsCard>
        <StatsCard
          title="Unique Views"
          count={stats.uniqueVisitors}
          yesterday={stats.uniqueVisitorsYesterday}
        >
          <UsersIcon className="mr-1 block h-10 w-10 fill-nfh-accent-primary" />
        </StatsCard>
        <StatsCard title="Countries" count={stats.countries}>
          <GlobeIcon className="mr-1 block h-10 w-10 fill-nfh-accent-primary" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold leading-8 tracking-tight">Device Type</h3>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-2">
        <StatsCard title="Desktop Views" count={stats.isDesktop}>
          <DesktopIcon className="mr-1 block h-10 w-10 fill-nfh-accent-primary" />
        </StatsCard>
        <StatsCard title="Mobiles Views" count={stats.isMobile}>
          <MobileIcon className="mr-1 block h-10 w-10 fill-nfh-accent-primary" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold leading-8 tracking-tight">Posts Reactions</h3>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-2">
        <AllReactions />
        <IndividualReactions />
      </div>
      <h3 className="text-2xl font-bold leading-8 tracking-tight">Web Vitals</h3>
      <div className="space-y-1">
        <div className="grid gap-4 md:grid-cols-6">
          {webVitals.map((metric, index) => {
            const { name, explainerURL, supported, rating, unit, value } = metric
            let color = 'bg-gray-400'
            let ratingText = 'Waiting For Reeding'
            if (rating === Rating['poor']) {
              color = 'bg-red-400'
              ratingText = 'Poor'
            }
            if (rating === Rating['needs-improvement']) {
              color = 'bg-yellow-400'
              ratingText = 'Needs Improvement'
            }
            if (rating === Rating['good']) {
              color = 'bg-green-400'
              ratingText = 'Good'
            }
            let valueString = '...'

            if (!supported) {
              valueString = 'not supported'
            }

            if (supported && value) {
              if (unit === 'ms') {
                valueString = `${Math.floor(value)}${unit}`
              } else {
                valueString = value.toFixed(2)
              }
            }
            return (
              <Current
                key={index}
                index={index}
                name={name}
                value={valueString}
                explainerURL={explainerURL}
                ratingText={ratingText}
                color={color}
              />
            )
          })}
        </div>
      </div>
      <div className="space-y-1">
        <Chart />
      </div>
      <ProjectBreakdown />
    </>
  )
}
