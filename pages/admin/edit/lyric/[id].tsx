import { useEffect, useState } from 'react'
import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getContentFromById, getUpdateLyricById } from '@/lib/supabase'
import { LoaderIcon } from '@/components/icons'
import 'easymde/dist/easymde.min.css'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import SectionContainer from '@/components/UI/SectionContainer'

export default function EditLyric({ user }): JSX.Element {
  const router = useRouter()
  const { id } = router.query as { id: string }

  const [loading, setLoading] = useState(false)
  const [song, setSong] = useState('')
  const [band, setBand] = useState('')
  const [lyric, setLyric] = useState('')

  useEffect(() => {
    fetchLyric()
    async function fetchLyric() {
      if (!id) return
      const lyric = await getContentFromById('lyrics', id)
      setSong(lyric.song)
      setBand(lyric.band)
      setLyric(lyric.lyric)
    }
  }, [id])

  async function updateCurrentLyric() {
    setLoading(true)

    if (!lyric) {
      setLoading(false)
      return toast.error('Please fill out the required fields.')
    }

    const error = await getUpdateLyricById(id, song, band, lyric, user.id)

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
        title={`Edit a lyric - ${siteMetadata.title}`}
        description={siteMetadata.description}
      />
      <SectionContainer>
        {user ? (
          <>
            <h1 className="mt-6 text-3xl font-semibold tracking-wide">Edit a lyric</h1>

            <label htmlFor="songName" className="mb-2 inline-block">
              Add Song Name
            </label>
            <input
              type="text"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Song Name"
              value={song}
              onChange={(e) => setSong(e.target.value)}
            />
            <label htmlFor="bandName" className="mb-2 inline-block">
              Add Band Name
            </label>
            <input
              type="text"
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Band Name"
              value={band}
              onChange={(e) => setBand(e.target.value)}
            />

            <label htmlFor="lyric" className="mb-2 inline-block">
              Add Lyric
            </label>
            <textarea
              className="m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding py-1.5 px-3 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              placeholder="Lyric"
              value={lyric}
              onChange={(e) => setLyric(e.target.value)}
            ></textarea>

            <div className="text-right">
              <button
                type="button"
                onClick={updateCurrentLyric}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Update Lyric
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
