import { BiBarChartAlt, BiUser, BiGlobe, BiDesktop, BiMobileAlt } from 'react-icons/bi'
import { StatsCard } from '@/components/metrics/Stats'
import Current from '@/components/metrics/WebVitals/Current'
import Chart from '@/components/metrics/WebVitals/Chart'
import { Rating, useWebVitals } from '@/hooks/useWebVitals'
import { useStatisticsStats } from '@/hooks/useStats'
import { LiveCard } from '@/components/metrics/Stats'
import { AllReactions, IndividualReactions } from '@/components/metrics/Reactions'
import { ProjectBreakdown } from '@/components/metrics/ProjectBreakdown'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StatsLayout(): JSX.Element {
  const webVitals = useWebVitals()
  const { stats } = useStatisticsStats()

  return (
    <>
      <div className="md:flex md:justify-between md:items-center">
        <h3 className="text-2xl font-bold tracking-tight leading-8">Site Statistics</h3>
        <p className="text-xs">Collected with Umami</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LiveCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3">
        <StatsCard title="All Views" count={stats.AllStats} yesterday={stats.AllStatsYesterday}>
          <BiBarChartAlt className="inline mr-1 w-10 h-10" />
        </StatsCard>
        <StatsCard
          title="Unique Views"
          count={stats.uniqueVisitors}
          yesterday={stats.uniqueVisitorsYesterday}
        >
          <BiUser className="inline mr-1 w-10 h-10" />
        </StatsCard>
        <StatsCard title="Countries" count={stats.countries}>
          <BiGlobe className="inline mr-1 w-10 h-10" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-8">Device Type</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <StatsCard title="Desktop Views" count={stats.isDesktop}>
          <BiDesktop className="inline mr-1 w-10 h-10" />
        </StatsCard>
        <StatsCard title="Mobiles Views" count={stats.isMobile}>
          <BiMobileAlt className="inline mr-1 w-10 h-10" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-8">Posts Reactions</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <AllReactions />
        <IndividualReactions />
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-8">Web Vitals</h3>
      <div className="space-y-1">
        <div className="grid md:grid-cols-6 gap-4">
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
