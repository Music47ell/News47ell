import { LoaderIcon } from '@/components/icons'
import { useViews } from '@/hooks/useViews'

export default function ViewsCard(): JSX.Element {
	const { views, isLoading } = useViews()

	return (
		<div className="flex w-full items-center justify-between rounded bg-nfh-background-secondary p-4 text-nfh-text-primary">
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<>
					<h6 className="flex items-center">All Posts Views</h6>

					<div className="flex items-center rounded-lg text-center">
						<h2 className="m-0 text-3xl font-bold">{views}</h2>
					</div>
				</>
			)}
		</div>
	)
}
