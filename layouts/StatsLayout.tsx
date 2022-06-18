import { BiBarChartAlt, BiUser, BiGlobe, BiDesktop, BiMobileAlt } from 'react-icons/bi'
import {
  SiMacos,
  SiWindows95,
  SiLinux,
  SiIos,
  SiAndroid,
  SiGooglechrome,
  SiInternetexplorer,
  SiFirefoxbrowser,
  SiSafari,
} from 'react-icons/si'
import { StatsCard } from '@/components/metrics/Stats'
import Current from '@/components/metrics/WebVitals/Current'
import Chart from '@/components/metrics/WebVitals/Chart'
import { Rating, useWebVitals } from '@/hooks/useWebVitals'
import { useStatisticsStats } from '@/hooks/useStats'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function StatsLayout(): JSX.Element {
  const webVitals = useWebVitals()
  const { stats } = useStatisticsStats()

  return (
    <>
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
      <div className="md:flex md:justify-between md:items-center">
        <h3 className="text-2xl font-bold tracking-tight leading-8">Site Statistics</h3>
        {/*<h3 className="">Views & Locations</h3>*/}
        <p className="text-xs">Collected with Umami</p>
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
      <h3 className="text-2xl font-bold tracking-tight leading-8">Desktop OS</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3">
        <StatsCard title="macOS Views" count={stats.macintosh}>
          <SiMacos className="inline mr-1 w-10 h-10 text-black" />
        </StatsCard>
        <StatsCard title="Windows Views" count={stats.windows}>
          <SiWindows95 className="inline mr-1 w-10 h-10 text-windows" />
        </StatsCard>
        <StatsCard title="Linux Views" count={stats.linux}>
          <SiLinux className="inline mr-1 w-10 h-10 text-linux" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-8">Mobile OS</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3">
        <StatsCard title="iOS Views" count={stats.ios}>
          <SiIos className="inline mr-1 w-10 h-10 text-black" />
        </StatsCard>
        <StatsCard title="Android Views" count={stats.android}>
          <SiAndroid className="inline mr-1 w-10 h-10 text-android" />
        </StatsCard>
      </div>
      <h3 className="text-2xl font-bold tracking-tight leading-8">Browsers</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatsCard title="Chrome Views" count={stats.chrome}>
          <SiGooglechrome className="inline mr-1 w-10 h-10 text-chrome" />
        </StatsCard>
        <StatsCard title="Edge Views" count={stats.edge}>
          <SiInternetexplorer className="inline mr-1 w-10 h-10 text-explorer" />
        </StatsCard>
        <StatsCard title="Firefox Views" count={stats.firefox}>
          <SiFirefoxbrowser className="inline mr-1 w-10 h-10 text-firefox" />
        </StatsCard>
        <StatsCard title="Safari Views" count={stats.safari}>
          <SiSafari className="inline mr-1 w-10 h-10 text-black" />
        </StatsCard>
      </div>
    </>
  )
}
