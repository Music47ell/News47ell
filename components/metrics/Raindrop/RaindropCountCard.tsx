import { LoaderIcon } from '@/components/icons'
import { useRaindropStats } from '@/hooks/useRaindropStats'

export default function RaindropCountCard(): JSX.Element {
	const { bookmarksCount, isLoading } = useRaindropStats()
	return (
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<>
					<div className="flex items-center">Bookmarks saved on Raindrop</div>
					<div>
						<p className="mt-2 flex items-baseline justify-between text-3xl font-bold">
							{bookmarksCount.toLocaleString('en', { notation: 'compact' })}
						</p>
					</div>
				</>
			)}
		</div>
	)
}
