import LikeCount from './LikeCount'
import DislikeCount from './DislikeCount'
import TotalReactions from './TotalReactions'
import { useDashboardReactions } from '@/hooks/useReactions'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'

export function AllReactions() {
  const { totalReactions, isLoading } = useDashboardReactions()

  return (
    <div className="flex justify-between items-center p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
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
    <div className="flex justify-between items-center p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h6 className="flex items-center">Blog posts reactions</h6>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 justify-items-center mb-1">
            <LikeCount likeCount={totalLikes} />
            <DislikeCount dislikeCount={totalDislikes} />
          </div>
        </>
      )}
    </div>
  )
}
