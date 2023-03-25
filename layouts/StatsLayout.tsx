import { ViewsCard } from '@/components/metrics/Views'

export default function StatsLayout() {
	return (
		<>
			<div className="md:flex md:items-center md:justify-between">
				<h3 className="text-2xl font-bold leading-8 tracking-tight">Site Statistics</h3>
				<p className="text-xs">Collected with PlanetScale</p>
			</div>
			<div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-3">
				<ViewsCard />
			</div>
		</>
	)
}
