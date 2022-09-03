import { LoaderIcon } from '@/components/icons'
import { useDashboardReactions } from '@/hooks/useReactions'
import ReactionCount from './ReactionCount'

export function AllReactions() {
	const { totalReactions, isLoading } = useDashboardReactions()

	return (
		<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<>
					<h6 className="flex items-center">All Posts Reactions</h6>

					<div className="flex items-center rounded-lg text-center">
						<h2 className="m-0 text-3xl font-bold">{totalReactions}</h2>
					</div>
				</>
			)}
		</div>
	)
}

export function IndividualReactions() {
	const { totalLikes, totalDislikes, isLoading } = useDashboardReactions()

	return (
		<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<>
					<ReactionCount Count={totalLikes} Like={true} />
					<ReactionCount Count={totalDislikes} Dislike={true} />
				</>
			)}
		</div>
	)
}
