import { default as Link } from '@/components/Link'
import { getCodeStats } from '@/lib/codestats'

const getCodeStatsStats = async () => {
	const data = await getCodeStats()

	return data
}

/**
 * https://gist.github.com/cramforce/b5e3f0b103f841d2e5e429b1d5ac4ded
 */
function asyncComponent<T, R>(fn: (arg: T) => Promise<R>): (arg: T) => R {
	return fn as (arg: T) => R
}

const CodeStatsCard = asyncComponent(async () => {
	const stats = await getCodeStatsStats()
	return (
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			<div className="grid gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-12">
				<div className="flex items-center justify-between space-x-4">
					<span>Profile</span>

					<div className="flex items-center space-x-2">
						<Link href={stats.url} aria-label={`Link to ${stats.url}`} className="shrink-0">
							@{stats.user}
						</Link>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Level</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.level}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Total XP</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.total_xp.toLocaleString('en')}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">Increased by</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.new_xp.toLocaleString('en')}</div>
					</div>
				</div>

				<div className="flex items-center justify-between space-x-4">
					<span className="shrink-0">From</span>

					<div className="flex items-center space-x-2">
						<div className="truncate">{stats.previous_xp.toLocaleString('en')}</div>
					</div>
				</div>
			</div>
		</div>
	)
})

export default CodeStatsCard
