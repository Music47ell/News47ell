import { LoadingSpinner } from '@/components/UI/LoadingSpinner'
import { useActiveStats } from '@/hooks/useStats'

export default function LiveCard(): JSX.Element {
  const { active, isLoading } = useActiveStats()

  return (
    <div className="flex relative flex-col p-4 w-full text-nfh-text-primary bg-nfh-background-secondary rounded">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex items-center">Visiting Right Now!</div>
          <span className="flex absolute top-0 right-0 m-4 w-3 h-3">
            <span className="inline-flex absolute w-full h-full bg-nfh-background-secondary rounded-full opacity-75 animate-ping"></span>
            <span className="inline-flex relative w-3 h-3 bg-nfh-background-primary rounded-full"></span>
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
