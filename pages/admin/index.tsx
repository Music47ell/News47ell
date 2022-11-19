import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CheckIcon, ExclamationIcon, LoaderIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import { SectionContainer } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import { getAllContentFrontMatter, getDelete, getLyrics, getQuotes } from '@/lib/supabase'

export default function Admin({ user }): JSX.Element {
	const router = useRouter()
	const [posts, setPosts] = useState([])
	const [pages, setPages] = useState([])
	const [lyrics, setLyrics] = useState([])
	const [quotes, setQuotes] = useState([])

	async function fetchPosts() {
		const posts = await getAllContentFrontMatter('posts')

		const userContent = posts.filter((post) => post.user_id === user.id)
		setPosts(userContent)
	}
	async function deletePost(id: string) {
		getDelete('posts', id)
		fetchPosts()
	}

	async function fetchPages() {
		const pages = await getAllContentFrontMatter('pages')
		const userPages = pages.filter((page) => page.user_id === user.id)
		setPages(userPages)
	}
	async function deletePage(id: string) {
		getDelete('pages', id)
		fetchPages()
	}

	async function fetchLyrics() {
		const { lyrics } = await getLyrics()
		const userLyrics = lyrics.filter((lyric) => lyric.user_id === user.id)
		setLyrics(userLyrics)
	}
	async function deleteLyric(id: string) {
		getDelete('lyrics', id)
		fetchLyrics()
	}

	async function fetchQuotes() {
		const { quotes } = await getQuotes()
		const userQuotes = quotes.filter((quote) => quote.user_id === user.id)
		setQuotes(userQuotes)
	}
	async function deleteQuotes(id: string) {
		getDelete('quotes', id)
		fetchQuotes()
	}

	useEffect(() => {
		if (!user) {
			router.push('/')
		} else {
			fetchPosts()
			fetchPages()
			fetchLyrics()
			fetchQuotes()
		}
	}, [router, user])

	return (
		<>
			<PageSEO title={`Admin - ${siteMetadata.title}`} description={siteMetadata.description} />
			<SectionContainer>
				{user ? (
					<>
						<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">My Posts</h1>
						{posts
							.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
							.sort((a, b) => Number(a.published === true) - Number(b.published === true))
							.map((post, index) => (
								<div key={index} className="mt-8 pb-4">
									<div className="flex flex-row">
										<button className="inline-flex items-center py-2 text-xl font-semibold leading-5 text-white hover:text-white">
											{post.published === true ? (
												<CheckIcon
													className={`${
														post.published === true ? 'fill-green-600' : 'fill-yellow-600'
													} mr-1 inline-block h-5 w-5`}
												/>
											) : (
												<ExclamationIcon
													className={`${
														post.published === true ? 'fill-green-600' : 'fill-yellow-600'
													} mr-1 inline-block h-5 w-5`}
												/>
											)}
											<h2 className="text-xl font-semibold">{post.title}</h2>
										</button>
									</div>
									<Link href={`/admin/edit/post/${post.id}`} className="mr-4 text-sm text-blue-500">
										Edit Post
									</Link>
									<Link href={`/blog/${post.slug}`} className="mr-4 text-sm text-blue-500">
										View Post
									</Link>
									<button className="mr-4 text-sm text-red-500" onClick={() => deletePost(post.id)}>
										Delete Post
									</button>
								</div>
							))}
						<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">My Pages</h1>
						{pages.map((page, index) => (
							<div key={index} className="mt-8 pb-4">
								<div className="flex flex-row">
									<button className="inline-flex items-center py-2 text-xl font-semibold leading-5 text-white hover:text-white">
										{page.published === true ? (
											<CheckIcon
												className={`${
													page.published === true ? 'fill-green-600' : 'fill-yellow-600'
												} mr-1 inline-block h-5 w-5`}
											/>
										) : (
											<ExclamationIcon
												className={`${
													page.published === true ? 'fill-green-600' : 'fill-yellow-600'
												} mr-1 inline-block h-5 w-5`}
											/>
										)}
										<h2 className="text-xl font-semibold">{page.title}</h2>
									</button>
								</div>
								<Link href={`/admin/edit/page/${page.id}`} className="mr-4 text-sm text-blue-500">
									Edit Page
								</Link>
								<Link href={`/${page.slug}`} className="mr-4 text-sm text-blue-500">
									View Page
								</Link>
								<button className="mr-4 text-sm text-red-500" onClick={() => deletePage(page.id)}>
									Delete Page
								</button>
							</div>
						))}
						<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">My Lyrics</h1>
						{lyrics.map((lyric, index) => (
							<div key={index} className="mt-8 pb-4">
								<h2 className="text-xl font-semibold">{lyric.song}</h2>
								<Link href={`/admin/edit/lyric/${lyric.id}`} className="mr-4 text-sm text-blue-500">
									Edit Lyric
								</Link>
								<button className="mr-4 text-sm text-red-500" onClick={() => deleteLyric(lyric.id)}>
									Delete Lyric
								</button>
							</div>
						))}
						<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">My Quotes</h1>
						{quotes.map((quote, index) => (
							<div key={index} className="mt-8 pb-4">
								<h2 className="text-xl font-semibold">{quote.quote}</h2>
								<Link href={`/admin/edit/quote/${quote.id}`} className="mr-4 text-sm text-blue-500">
									Edit Quote
								</Link>
								<button
									className="mr-4 text-sm text-red-500"
									onClick={() => deleteQuotes(quote.id)}
								>
									Delete Quote
								</button>
							</div>
						))}
					</>
				) : (
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				)}
			</SectionContainer>
		</>
	)
}

export const getServerSideProps = withPageAuth({
	redirectTo: '/',
	async getServerSideProps(ctx) {
		// Access the user object
		const { user } = await getUser(ctx)
		return { props: { email: user?.email } }
	},
})
