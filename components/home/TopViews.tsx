import useSWR from 'swr'

import BlogPostCard from '@/components/home/BlogPostCard'
import { LoaderIcon } from '@/components/icons'
import { Divider } from '@/components/UI'
import fetcher from '@/lib/fetcher'

export default function TopViews() {
	const { data: topViews } = useSWR<{ title: string; slug: string; total: number }[]>(
		`/api/views/top`,
		fetcher
	)

	return (
		<section>
			{!topViews ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				topViews &&
				topViews.length > 0 && (
					<>
						<Divider>Most Viewed</Divider>
						<div className="grid gap-5 md:grid-cols-3">
							{topViews.map((views, index) => (
								<BlogPostCard
									key={index}
									title={views.title}
									slug={views.slug}
									total={views.total}
								/>
							))}
						</div>
					</>
				)
			)}
		</section>
	)
}
