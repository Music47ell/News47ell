import { LikeIcon, DislikeIcon } from '@/components/icons'
import { useSlugReactionsLike, useSlugReactionsDislike } from '@/hooks/useReactions'
import { LoadingDots } from '@/components/UI/LoadingDots'

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
        <div className="grid grid-cols-2 gap-6 justify-between items-center">
          <div
            role="button"
            className={`${
              userLikes === true ? 'bg-nfh-background-secondary' : 'bg-nfh-background-primary'
            } flex-1 py-4 flex flex-col items-center hover:bg-nfh-background-secondary`}
            onClick={handleLike}
          >
            <span className="text-4xl">
              <LikeIcon className="block w-6 h-6 fill-nfh-accent-primary" />
            </span>
            <span className="text-xl font-semibold">{likes}</span>
            <span className="text-sm">LIKE</span>
          </div>
          <div
            role="button"
            className={`${
              userDislikes === true ? 'bg-nfh-background-secondary' : 'bg-nfh-background-primary'
            } flex-1 py-4 flex flex-col items-center hover:bg-nfh-background-secondary`}
            onClick={handleDislike}
          >
            <span className="text-4xl">
              <DislikeIcon className="block w-6 h-6 fill-nfh-accent-primary" />
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
