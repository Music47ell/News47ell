import { ProjectBreakdown } from '@/components/metrics/ProjectBreakdown'
import { AllReactions, IndividualReactions } from '@/components/metrics/Reactions'
import { ViewsCard } from '@/components/metrics/Views'
import Chart from '@/components/metrics/WebVitals/Chart'
import Current from '@/components/metrics/WebVitals/Current'
import { Rating, useWebVitals } from '@/hooks/useWebVitals'

export default function StatsLayout(): JSX.Element {
	const webVitals = useWebVitals()

	return (
		<>
			<div className="md:flex md:items-center md:justify-between">
				<h3 className="text-2xl font-bold leading-8 tracking-tight">Site Statistics</h3>
				<p className="text-xs">Collected with PlanetScale</p>
			</div>
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-3">
				<ViewsCard />
				<AllReactions />
				<IndividualReactions />
			</div>
			<div className="md:flex md:items-center md:justify-between">
				<h3 className="text-2xl font-bold leading-8 tracking-tight">Web Vitals</h3>
				<p className="text-xs">Collected with Supabase</p>
			</div>
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
