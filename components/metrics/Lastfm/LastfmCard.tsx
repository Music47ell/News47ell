import { LoaderIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { useLastfm } from '@/hooks/useLastfm'

export default function LastfmCard(): JSX.Element {
	const { playCount, averagePlayCount, registeredDate, url, name, isLoading } = useLastfm()
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
							<Link href={url} className="shrink-0">
								@{name}
							</Link>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Account Age</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{registeredDate} years</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Total Scrobbles</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{playCount}</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-4">
						<span className="shrink-0">Average plays</span>

						<div className="flex items-center space-x-2">
							<div className="truncate">{averagePlayCount} per day</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
