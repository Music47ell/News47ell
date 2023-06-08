import { Slash } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { Divider, SectionContainer } from '@/components/UI'
import ViewsCounter from '@/components/ViewsCounter'
import type { Blog } from '@/contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getBlogHomepage } from '@/lib/contentlayer'
import { getTopPosts } from '@/lib/views'

export default async function Homepage() {
	const posts = getBlogHomepage() as Blog[]
	const topPosts = await getTopPosts()
	return (
		<SectionContainer>
			<div className="mt-4 grid grid-cols-1 items-center md:grid-cols-6 md:text-left">
				<div className="order-2 col-span-5 leading-tight md:order-1 md:leading-normal">
					<div className="text-xl font-semibold md:text-3xl">
						<span>Merhaba 👋</span>
					</div>
					<p>
						{`My name is ${siteMetadata.author.name}. I'm Full Stack Developer from`}
						<span className="font-bold">
							{' '}
							{siteMetadata.author.location.country + ' ' + siteMetadata.author.location.emojiFlag}
						</span>
						<br />
						This site is where I conduct all my experiments, and share my thoughts and ideas.
					</p>
				</div>
				<div className="order-1 m-auto md:order-2">
					<Image
						src={siteMetadata.author.avatar}
						alt={siteMetadata.author.name}
						height={160}
						width={160}
						priority={true}
						className="col-span-1 rounded-full"
					/>
				</div>
			</div>
			<Divider>
				<Slash className="block h-10 w-auto" />
			</Divider>
			<p>Most Recent Blog Posts</p>
			<ul>
				{posts.slice(0, 3).map((post, index: number) => (
					<Link key={index} className="mb-4 flex flex-col space-y-1" href={`/blog/${post.slug}`}>
						<div className="flex w-full flex-col">
							<p>{post.title}</p>
							<span className="flex flex-row"></span>
							<ViewsCounter slug={post.slug} trackView={false} />
						</div>
					</Link>
				))}
			</ul>
			<p>Most Viewed Blog Posts</p>
			<ul>
				{topPosts.map((post, index: number) => (
					<Link
						key={post.slug}
						className="mb-4 flex flex-col space-y-1"
						href={`/blog/${post.slug}`}
					>
						<div className="flex w-full flex-col">
							<p>{post.title}</p>
							<span className="flex flex-row"></span>
							<ViewsCounter slug={post.slug} trackView={false} />
						</div>
					</Link>
				))}
			</ul>
		</SectionContainer>
	)
}
