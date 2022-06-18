import { useEffect, useState } from 'react'
import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getContentFromById, getUpdateContentById } from '@/lib/supabase'
import { Editor } from '@/components/Dynamic'
import { BiLoader } from 'react-icons/bi'
import 'easymde/dist/easymde.min.css'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function EditPage({ user }): JSX.Element {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  useEffect(() => {
    fetchPage()
    async function fetchPage() {
      if (!id) return
      const data = await getContentFromById('pages', id)
      setContent(data.content)
    }
  }, [id])

  async function updateCurrentPage() {
    setLoading(true)

    if (!content) {
      setLoading(false)
      return toast.error('Please fill out the required fields.')
    }

    const error = await getUpdateContentById('pages', id, content, user.id)
    router.push(`/admin`)

    if (error) {
      console.error(error)
      return toast.error(`An unexpected error occurred when publishing: ${error.message}`, {
        duration: 10000,
      })
    }

    setLoading(false)
    toast.success('Blog updated successfully! Redirecting you to the admin page...', {
      duration: 3000,
    })
  }

  useEffect(() => {
    if (!user) router.push('/')
  }, [router, user])

  return (
    <>
      <PageSEO
        title={`Edit a page - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
        {user ? (
          <>
            <h1 className="mt-6 text-3xl font-semibold tracking-wide">Edit a page</h1>

            <Editor content={content} setContent={setContent} />

            <div className="text-right">
              <button
                type="button"
                onClick={updateCurrentPage}
                className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              >
                Update Page
              </button>
            </div>
          </>
        ) : (
          <BiLoader className="w-12 h-12 animate-spin" />
        )}
      </main>
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
