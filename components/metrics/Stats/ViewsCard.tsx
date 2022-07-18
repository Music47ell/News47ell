import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useDashboardViews } from '@/hooks/useStats'

export default function ViewsCard(): JSX.Element {
  const { views, isLoading } = useDashboardViews()
  return (
    <div className="flex relative flex-col p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">All Posts Views</div>
          <div>
            <p className="flex justify-between items-baseline mt-2 text-3xl font-bold">{views}</p>
          </div>
        </>
      )}
    </div>
  )
}
