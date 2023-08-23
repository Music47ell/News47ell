'use client'

import { motion } from 'framer-motion'

import { default as Link } from '@/components/Link'
import ViewsCounter from '@/components/ViewsCounter'
import type { Blog } from '@/contentlayer/generated'
import { displayDate, hEntryDate } from '@/utils/formatters'

const BlogPostList: React.FC<{ post: Blog; key: number }> = ({ post, key }) => {
	return (
		<motion.div
			key={key}
			className="my-4 flex w-full flex-col rounded-lg bg-nfh-background-secondary p-4 shadow-md"
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.05 }}
		>
			<Link href={`/blog/${post.slug}`}>
				<div className="flex w-full flex-col">
					<h2 className="text-2xl font-bold">{post.title}</h2>
					<div className="flex flex-row items-center gap-2">
						<time
							dateTime={hEntryDate(post.updated_at)}
							className="dt-published font-mono text-sm tracking-tighter"
							aria-label={`Published at: ${displayDate(post.published_at)}`}
							itemProp="dateModified"
						>
							{displayDate(post.updated_at)}
						</time>
						<span className="font-mono text-sm tracking-tighter">/</span>
						<ViewsCounter slug={post.slug} trackView={false} />
					</div>
				</div>
			</Link>
		</motion.div>
	)
}

export default BlogPostList
