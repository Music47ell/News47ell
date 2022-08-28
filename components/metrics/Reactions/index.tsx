import LikeCount from './LikeCount'
import DislikeCount from './DislikeCount'
import TotalReactions from './TotalReactions'
import { useDashboardReactions } from '@/hooks/useReactions'
import { LoadingSpinner } from '@/components/UI'

export function AllReactions() {
	const { totalReactions, isLoading } = useDashboardReactions()

	return (
		<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<h6 className="flex items-center">All Posts Reactions</h6>

					<div>
						<TotalReactions reactionsCount={totalReactions} />
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
				<LoadingSpinner />
			) : (
				<>
					<h6 className="flex items-center">Blog posts reactions</h6>

					<div className="mb-1 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-2">
						<LikeCount likeCount={totalLikes} />
						<DislikeCount dislikeCount={totalDislikes} />
					</div>
				</>
			)}
		</div>
	)
}
