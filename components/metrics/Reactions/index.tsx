import LikeCount from './LikeCount'
import DislikeCount from './DislikeCount'
import TotalReactions from './TotalReactions'
import { useDashboardReactions } from '@/hooks/useReactions'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function AllReactions() {
  const { totalReactions, isLoading } = useDashboardReactions()

  return (
    <div className="p-4 w-full rounded border border-gray-200 dark:border-gray-500">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">All Posts Reactions</div>

          <div>
            <TotalReactions reactionsCount={totalReactions} />
          </div>
        </>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function IndividualReactions() {
  const { totalLikes, totalDislikes, isLoading } = useDashboardReactions()

  return (
    <div className="p-4 w-full rounded border border-gray-200 dark:border-gray-500">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h2 className="mb-6 text-xl">Individual Reactions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 justify-items-center mb-1">
            <LikeCount likeCount={totalLikes} />
            <DislikeCount dislikeCount={totalDislikes} />
          </div>
        </>
      )}
    </div>
  )
}
