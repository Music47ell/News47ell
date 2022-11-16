import useSWR from 'swr'
import { LoaderIcon } from '@/components/icons'
import fetcher from '@/lib/fetcher'
import HeroCard from '@/components/home/HeroCard'
import BlogPostCard from '@/components/home/BlogPostCard'
import { Divider } from '@/components/UI'

export default function HomeLayout(): JSX.Element {
	const { data: topViews } = useSWR<{ title: string; slug: string; total: number }[]>(
		`/api/views/top`,
		fetcher
	)

	const { data: topReactions } = useSWR<{ title: string; slug: string; total: number }[]>(
		`/api/reactions/top`,
		fetcher
	)

	return (
		<main className="container mx-auto mb-8 flex max-w-5xl flex-1 flex-col space-y-2 px-3 md:space-y-5">
			<HeroCard />
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
		</main>
	)
}
