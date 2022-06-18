import { useEffect, useState } from 'react'
import { withPageAuth, getUser, supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { default as Link } from '@/components/Link'
import toast from 'react-hot-toast'
import { default as Image } from '@/components/Image'
import { getGravatar } from '@/utils/getGravatar'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Account({ user }): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [firstName, setFirstName] = useState<string | null>(null)
  const [lastName, setLastName] = useState<string | null>(null)
  const [slug, setSlug] = useState<string | null>(null)
  const [twitter, setTwitter] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)

  async function updateProfile() {
    try {
      const updates = {
        id: user.id,
        username,
        slug,
        first_name: firstName,
        last_name: lastName,
        twitter,
        website,
        updated_at: new Date(),
      }

      const { error } = await supabaseClient.from('profiles').upsert(updates)

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
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    async function getProfile() {
      try {
        const { data, error, status } = await supabaseClient
          .from('profiles')
          .select('id, username, first_name, last_name, slug, twitter, website, updated_at')
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setFirstName(data.first_name)
          setLastName(data.last_name)
          setSlug(data.slug)
          setTwitter(data.twitter)
          setWebsite(data.website)
        }
      } catch (error) {
        alert(error.message)
      }
    }
    if (user) getProfile()
  }, [user])

  return (
    <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
      <div className="md:col-span-2 mt-5 md:mt-0">
        <div className="overflow-hidden sm:rounded-md shadow">
          <div className="sm:p-6 py-5 px-4 bg-white">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block mt-1 w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-muted"
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block mt-1 w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-muted"
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block mt-1 w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-muted"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  autoComplete="slug"
                  className="block mt-1 w-full sm:text-sm rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm text-muted"
                  value={slug || ''}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label className="block text-sm font-medium text-gray-700">Photo</label>
                <div className="flex items-center mt-1">
                  <span className="inline-block overflow-hidden w-12 h-12 bg-gray-100 rounded-full">
                    <Image
                      src={getGravatar(user?.email, 48)}
                      width={48}
                      height={48}
                      alt="Profile Photo"
                    />
                  </span>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="company-website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-sm bg-gray-50 rounded-l-md border border-r-0 border-gray-300 text-muted">
                    https://
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block flex-1 w-full sm:text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-muted"
                    placeholder="www.example.com"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="twitter-handle" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 rounded-l-md border border-r-0 border-gray-300">
                    @
                  </span>
                  <input
                    type="text"
                    name="twitter-username"
                    id="twitter-username"
                    className="block flex-1 w-full sm:text-sm rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-muted"
                    placeholder="@Twitter"
                    value={twitter || ''}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 px-4 sm:px-6 text-right bg-gray-50">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 mr-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              onClick={(e) => {
                e.preventDefault()
                updateProfile()
              }}
            >
              Save
            </button>
            <Link
              className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md border border-transparent focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              href="/api/auth/logout"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </main>
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
