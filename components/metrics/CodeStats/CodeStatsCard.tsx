import { LoaderIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { useCodeStats } from '@/hooks/useCodeStats'

export default function CodeStatsCard(): JSX.Element {
	const { level, link, totalXP, previousXP, newXP, user, isLoading } = useCodeStats()
	return (
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<div className="grid gap-x-0 gap-y-4 md:grid-cols-2 md:gap-x-12">
					<div className="flex items-center justify-between space-x-4">
						<span>Profile</span>

						<div className="flex items-center space-x-2">
							<Link href={link} aria-label={`Link to ${link}`} className="shrink-0">
								@{user}
							</Link>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Level</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{level}</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Total XP</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{totalXP.toLocaleString('en')}</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Increased by</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{newXP.toLocaleString('en')}</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">From</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{previousXP.toLocaleString('en')}</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
