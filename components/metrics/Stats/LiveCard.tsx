import { LoadingSpinner } from '@/components/UI'
import { useActiveStats } from '@/hooks/useStats'

export default function LiveCard(): JSX.Element {
	const { active, isLoading } = useActiveStats()

	return (
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<>
					<div className="flex items-center">Visiting Right Now!</div>
					<span className="absolute top-0 right-0 m-4 flex h-3 w-3">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nfh-accent-primary opacity-75"></span>
						<span className="relative inline-flex h-3 w-3 rounded-full bg-nfh-accent-secondary"></span>
					</span>
					<div>
						<p className="mt-2 flex items-baseline justify-between text-3xl font-bold">
							{active}
							{active <= 1 ? ' person' : ' persons'}
						</p>
					</div>
				</>
			)}
		</div>
	)
}
