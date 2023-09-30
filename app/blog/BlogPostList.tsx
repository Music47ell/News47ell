import { default as Link } from '@/components/Link'
import ViewsCounter from '@/components/ViewsCounter'
import type { Blog } from '@/contentlayer/generated'

const BlogPostList: React.FC<{ post: Blog }> = ({ post }) => {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className="flex items-baseline justify-between gap-x-4 p-4 pt-5 max-sm:flex-col"
		>
			<p className="font-bold">{post.title}</p>
			<ViewsCounter slug={post.slug} trackView={false} />
		</Link>
	)
}

export default BlogPostList
