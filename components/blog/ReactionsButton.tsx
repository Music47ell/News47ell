import { DislikeIcon, LikeIcon } from '@/components/icons'
import { LoadingDots } from '@/components/UI'
import { useSlugReactionsDislike, useSlugReactionsLike } from '@/hooks/useReactions'

const ReactionsButton = ({ slug }) => {
	const { likes, userLikes, toggleUserLike, isLoadingLikes } = useSlugReactionsLike(slug)
	const { dislikes, userDislikes, toggleUserDislike, isLoadingDislikes } =
		useSlugReactionsDislike(slug)

	const handleLike = () => {
		if (userDislikes) {
			toggleUserLike()
			toggleUserDislike()
		} else if (userLikes) {
			toggleUserLike()
		} else {
			toggleUserLike()
		}
	}

	const handleDislike = () => {
		if (userLikes) {
			toggleUserDislike()
			toggleUserLike()
		} else if (userDislikes) {
			toggleUserDislike()
		} else {
			toggleUserDislike()
		}
	}

	return (
		<>
			{isLoadingLikes && isLoadingDislikes ? (
				<div className="flex justify-center py-4">
					<LoadingDots />
				</div>
			) : (
				<div className="grid grid-cols-2 items-center justify-between gap-6">
					<div
						className={`${
							userLikes === true ? 'bg-nfh-background-secondary' : 'bg-nfh-background-primary'
						} flex flex-1 flex-col items-center py-4 hover:bg-nfh-background-secondary`}
						onClick={handleLike}
					>
						<span className="text-4xl">
							<LikeIcon className="block h-6 w-6 fill-nfh-accent-primary" />
						</span>
						<span className="text-xl font-semibold">{likes}</span>
						<span className="text-sm">LIKE</span>
					</div>
					<div
						className={`${
							userDislikes === true ? 'bg-nfh-background-secondary' : 'bg-nfh-background-primary'
						} flex flex-1 flex-col items-center py-4 hover:bg-nfh-background-secondary`}
						onClick={handleDislike}
					>
						<span className="text-4xl">
							<DislikeIcon className="block h-6 w-6 fill-nfh-accent-primary" />
						</span>
						<span className="text-xl font-semibold">{dislikes}</span>
						<span className="text-sm">DISLIKE</span>
					</div>
				</div>
			)}
		</>
	)
}

export default ReactionsButton
