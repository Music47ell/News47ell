import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useActiveStats } from '@/hooks/useStats'

export default function LiveCard(): JSX.Element {
  const { active, isLoading } = useActiveStats()

  return (
    <div className="flex relative flex-col p-4 w-full rounded border border-gray-200 dark:border-gray-500">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">Visiting Right Now!</div>
          <span className="flex absolute top-0 right-0 m-4 w-3 h-3">
            <span className="inline-flex absolute w-full h-full rounded-full opacity-75 animate-ping bg-secondary"></span>
            <span className="inline-flex relative w-3 h-3 rounded-full bg-primary"></span>
          </span>
          <div>
            <p className="flex justify-between items-baseline mt-2 text-3xl font-bold">
              {active}
              {active <= 1 ? ' person' : ' persons'}
            </p>
          </div>
        </>
      )}
    </div>
  )
}
