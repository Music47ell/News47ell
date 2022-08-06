import { useEffect, useState } from 'react'
import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getAddQuote } from '@/lib/supabase'
import { LoaderIcon } from '@/components/icons'
import 'easymde/dist/easymde.min.css'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/UI/SectionContainer'

export default function AddQuote({ user }): JSX.Element {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState(null)
  const [source, setSource] = useState(null)
  const [quote, setQuote] = useState(null)

  async function addNewQuote() {
    setLoading(true)

    if (!quote) {
      setLoading(false)
      return toast.error('Please fill out the required fields.')
    }

    const { newQuote, error } = await getAddQuote(link, source, quote, user.id)
    router.push(`/admin/edit/quote/${newQuote.id}`)

    if (error) {
      console.error(error)
      return toast.error(`An unexpected error occurred when publishing: ${error.message}`, {
        duration: 10000,
      })
    }

    setLoading(false)
    toast.success('Blog published successfully! Redirecting you to the blog page...', {
      duration: 3000,
    })
  }

  useEffect(() => {
    if (!user) router.push('/')
  }, [router, user])

  return (
    <>
      <PageSEO
        title={`Add new quote - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        {user ? (
          <>
            <h1 className="mt-6 text-3xl font-semibold tracking-wide">Add new quote</h1>

            <label htmlFor="quoteLink" className="mb-2 inline-block">
              Add Quote Link
            </label>
            <input
              type="text"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Quote Link"
              onChange={(e) => setLink(e.target.value)}
            />
            <label htmlFor="quoteSource" className="mb-2 inline-block">
              Add Quote Source
            </label>
            <input
              type="text"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Quote Source"
              onChange={(e) => setSource(e.target.value)}
            />

            <label htmlFor="quote" className="mb-2 inline-block">
              Add Quote
            </label>
            <textarea
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Quote"
              onChange={(e) => setQuote(e.target.value)}
            ></textarea>

            <div className="text-right">
              <button
                type="button"
                onClick={addNewQuote}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Quote
              </button>
            </div>
          </>
        ) : (
          <LoaderIcon className="h-12 w-12 animate-spin fill-nfh-accent-primary" />
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
