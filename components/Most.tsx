import { default as Link } from '@/components/Link'
import ViewsCounter from '@/components/ViewsCounter'

type MostProps = {
	title: string
	posts: {
		title: string
		slug: string
		count?: number
	}[]
}

export default function Most({ title, posts }: MostProps) {
	return (
		<div className="overflow-hidden rounded-xl border border-nfh-accent-primary bg-nfh-background-secondary">
			<div className="relative border-b border-nfh-accent-primary px-4 py-3">
				<div className="flex items-center gap-x-2">
					<p className="font-bold">{title}</p>
				</div>
			</div>
			<div className="divide-y divide-nfh-accent-secondary border-nfh-accent-primary">
				{posts.slice(0, 3).map((post, index) => (
					<Link
						key={index}
						className="flex items-baseline justify-between gap-x-4 p-4 pt-5 max-sm:flex-col"
						href={`/blog/${post.slug}`}
					>
						<p className="font-medium">{post.title}</p>
						<ViewsCounter slug={post.slug} trackView={false} />
					</Link>
				))}
			</div>
		</div>
	)
}
