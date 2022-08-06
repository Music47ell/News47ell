import { useEffect, useState } from 'react'
import { withPageAuth, getUser, supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { default as Link } from '@/components/Link'
import toast from 'react-hot-toast'
import { default as Image } from '@/components/Image'
import { getGravatar } from '@/utils/getGravatar'
import SectionContainer from '@/components/UI/SectionContainer'

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
    <SectionContainer>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-nfh-background-secondary py-5 px-4 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-nfh-text-primary"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1 block w-full rounded-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-accent-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-nfh-text-primary"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="mt-1 block w-full rounded-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-nfh-text-primary"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="mt-1 block w-full rounded-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={username || ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="slug" className="block text-sm font-medium text-nfh-text-primary">
                  Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  autoComplete="slug"
                  className="mt-1 block w-full rounded-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-text-primary shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={slug || ''}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label className="block text-sm font-medium text-nfh-text-primary">Photo</label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 overflow-hidden rounded-full">
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
                  className="block text-sm font-medium text-nfh-text-primary"
                >
                  Website
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-nfh-accent-primary bg-nfh-background-secondary px-3 text-sm text-nfh-text-primary">
                    https://
                  </span>
                  <input
                    type="text"
                    name="company-website"
                    id="company-website"
                    className="block w-full flex-1 rounded-none rounded-r-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-text-primary focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="www.example.com"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="twitter-handle"
                  className="block text-sm font-medium text-nfh-text-primary"
                >
                  Twitter
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-nfh-accent-primary bg-nfh-background-secondary px-3 text-sm text-nfh-text-primary">
                    @
                  </span>
                  <input
                    type="text"
                    name="twitter-username"
                    id="twitter-username"
                    className="block w-full flex-1 rounded-none rounded-r-md border-nfh-accent-primary bg-nfh-background-primary text-nfh-text-primary focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="@Twitter"
                    value={twitter || ''}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 py-3 px-4 text-right sm:px-6">
            <button
              type="submit"
              className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault()
                updateProfile()
              }}
            >
              Save
            </button>
            <Link
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              href="/api/auth/logout"
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </SectionContainer>
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
