import { LoaderIcon } from '@/components/icons'
import { useDashboardViews } from '@/hooks/useStats'

export default function ViewsCard(): JSX.Element {
	const { views, isLoading } = useDashboardViews()
	return (
		<div className="relative flex w-full flex-col rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<>
					<div className="flex items-center">All Posts Views</div>
					<div>
						<p className="mt-2 flex items-baseline justify-between text-3xl font-bold">{views}</p>
					</div>
				</>
			)}
		</div>
	)
}
