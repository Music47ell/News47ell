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
import { getAddContent } from '@/lib/supabase'

export default function AddPost({ user }): JSX.Element {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [content, setContent] = useState(null)

	async function addNewPost() {
		setLoading(true)

		if (!content) {
			setLoading(false)
			return toast.error('Please fill out the required fields.')
		}

		const { newContent, error } = await getAddContent('posts', content, user.id)
		router.push(`/admin/edit/post/${newContent.id}`)

		if (error) {
			console.error(error)
			return toast.error(`An unexpected error occurred when publishing: ${error.message}`, {
				duration: 10000,
			})
		}

		setLoading(false)
		toast.success('Post published successfully!', {
			duration: 3000,
		})
	}

	useEffect(() => {
		if (!user) router.push('/')
	}, [router, user])

	return (
		<>
			<PageSEO
				title={`Add new post - ${siteMetadata.title}`}
				description={siteMetadata.description}
			/>
			<SectionContainer>
				{user ? (
					<>
						<h1 className="mt-6 text-3xl font-semibold tracking-wide">Add new post</h1>

						<Editor content={content} setContent={setContent} />

						<div className="text-right">
							<button
								onClick={addNewPost}
								className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Add Post
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
