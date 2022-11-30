import useSWR from 'swr'

import BlogPostCard from '@/components/home/BlogPostCard'
import { LoaderIcon } from '@/components/icons'
import { Divider } from '@/components/UI'
import fetcher from '@/lib/fetcher'

export default function TopReactions() {
	const { data: topReactions } = useSWR<{ title: string; slug: string; total: number }[]>(
		`/api/reactions/top`,
		fetcher
	)

	return (
		<section>
			{!topReactions ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				topReactions &&
				topReactions.length > 0 && (
					<>
						<Divider>Most Liked</Divider>
						<div className="flex flex-col gap-6 md:flex-row">
							{topReactions.map((reaction, index) => (
								<BlogPostCard
									key={index}
									title={reaction.title}
									slug={reaction.slug}
									total={reaction.total}
								/>
							))}
						</div>
					</>
				)
			)}
		</section>
	)
}
