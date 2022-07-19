import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { withPageAuth, getUser } from '@supabase/supabase-auth-helpers/nextjs'
import { getAllContentFrontMatter, getLyrics, getQuotes, getDelete } from '@/lib/supabase'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import { default as Link } from '@/components/Link'
import { BiLoader, BiCheckCircle, BiInfoCircle } from 'react-icons/bi'
import SectionContainer from '@/components/UI/SectionContainer'

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
            {posts.map((post, index) => (
              <div key={index} className="pb-4 mt-8">
                <div className="flex flex-row">
                  <button className="inline-flex items-center py-2 text-xl font-semibold leading-5 text-white hover:text-white">
                    {post.published === true ? (
                      <BiCheckCircle
                        className={`${
                          post.published === true ? 'text-green-600' : 'text-yellow-600'
                        } inline-block mr-1 w-5 h-5`}
                      />
                    ) : (
                      <BiInfoCircle
                        className={`${
                          post.published === true ? 'text-green-600' : 'text-yellow-600'
                        } inline-block mr-1 w-5 h-5`}
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
              <div key={index} className="pb-4 mt-8">
                <div className="flex flex-row">
                  <button className="inline-flex items-center py-2 text-xl font-semibold leading-5 text-white hover:text-white">
                    {page.published === true ? (
                      <BiCheckCircle
                        className={`${
                          page.published === true ? 'text-green-600' : 'text-yellow-600'
                        } inline-block mr-1 w-5 h-5`}
                      />
                    ) : (
                      <BiInfoCircle
                        className={`${
                          page.published === true ? 'text-green-600' : 'text-yellow-600'
                        } inline-block mr-1 w-5 h-5`}
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
              <div key={index} className="pb-4 mt-8">
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
              <div key={index} className="pb-4 mt-8">
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
          <BiLoader className="w-12 h-12 animate-spin" />
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
