import { useEffect, useState } from 'react'
import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getAddLyric } from '@/lib/supabase'
import { LoaderIcon } from '@/components/icons'
import 'easymde/dist/easymde.min.css'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/UI/SectionContainer'

export default function AddLyric({ user }): JSX.Element {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState(null)
  const [band, setBand] = useState(null)
  const [lyric, setLyric] = useState(null)

  async function addNewLyric() {
    setLoading(true)

    if (!lyric) {
      setLoading(false)
      return toast.error('Please fill out the required fields.')
    }

    const { newLyric, error } = await getAddLyric(song, band, lyric, user.id)
    router.push(`/admin/edit/lyric/${newLyric.id}`)

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
        title={`Add new lyric - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        {user ? (
          <>
            <h1 className="mt-6 text-3xl font-semibold tracking-wide">Add new lyric</h1>

            <label htmlFor="songName" className="inline-block mb-2">
              Add Song Name
            </label>
            <input
              type="text"
              className="block py-1.5 px-3 m-0 w-full text-base font-normal text-gray-700 focus:text-gray-700 bg-clip-padding bg-white focus:bg-white rounded border border-gray-300 focus:border-blue-600 border-solid transition ease-in-out focus:outline-none"
              placeholder="Song Name"
              onChange={(e) => setSong(e.target.value)}
            />
            <label htmlFor="bandName" className="inline-block mb-2">
              Add Band Name
            </label>
            <input
              type="text"
              className="block py-1.5 px-3 m-0 w-full text-base font-normal text-gray-700 focus:text-gray-700 bg-clip-padding bg-white focus:bg-white rounded border border-gray-300 focus:border-blue-600 border-solid transition ease-in-out focus:outline-none"
              placeholder="Band Name"
              onChange={(e) => setBand(e.target.value)}
            />

            <label htmlFor="lyric" className="inline-block mb-2">
              Add Lyric
            </label>
            <textarea
              className="block py-1.5 px-3 m-0 w-full text-base font-normal text-gray-700 focus:text-gray-700 bg-clip-padding bg-white focus:bg-white rounded border border-gray-300 focus:border-blue-600 border-solid transition ease-in-out focus:outline-none"
              placeholder="Lyric"
              onChange={(e) => setLyric(e.target.value)}
            ></textarea>

            <div className="text-right">
              <button
                type="button"
                onClick={addNewLyric}
                className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              >
                Add Lyric
              </button>
            </div>
          </>
        ) : (
          <LoaderIcon className="w-12 h-12 animate-spin fill-nfh-accent-primary" />
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
