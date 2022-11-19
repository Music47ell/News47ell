import 'easymde/dist/easymde.min.css'

import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Editor } from '@/components/Dynamic'
import { LoaderIcon } from '@/components/icons'
import { PageSEO } from '@/components/SEO'
import { SectionContainer } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'
import { getContentFromById, getUpdateContentById } from '@/lib/supabase'

export default function EditPost({ user }): JSX.Element {
	const router = useRouter()
	const { id } = router.query as { id: string }

	const [loading, setLoading] = useState(false)
	const [content, setContent] = useState('')

	useEffect(() => {
		fetchPost()
		async function fetchPost() {
			if (!id) return
			const post = await getContentFromById('posts', id)
			setContent(post.content)
		}
	}, [id])

	async function updateCurrentPost() {
		setLoading(true)

		if (!content) {
			setLoading(false)
			return toast.error('Please fill out the required fields.')
		}

		const error = await getUpdateContentById('posts', id, content, user.id)

		if (error) {
			console.error(error)
			return toast.error(`An unexpected error occurred when publishing: ${error.message}`, {
				duration: 10000,
			})
		}

		setLoading(false)
		toast.success('Post updated successfully!', {
			duration: 3000,
		})
	}

	useEffect(() => {
		if (!user) router.push('/')
	}, [router, user])

	return (
		<>
			<PageSEO
				title={`Edit a post - ${siteMetadata.title}`}
				description={siteMetadata.description}
			/>
			<SectionContainer>
				{user ? (
					<>
						<h1 className="mt-6 text-3xl font-semibold tracking-wide">Edit a post</h1>

						<Editor content={content} setContent={setContent} />

						<div className="text-right">
							<button
								onClick={updateCurrentPost}
								className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Update Post
							</button>
						</div>
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
