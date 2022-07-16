/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthorsSlugs, getContentFrontMatter, getAuthorBySlugFrom } from '@/lib/supabase'
import AuthorLayout from '@/layouts/AuthorLayout'

export async function getStaticPaths() {
  const slugs = await getAuthorsSlugs()
  const paths = slugs.map((profile) => ({ params: { slug: JSON.stringify(profile.slug) } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const slug: string = params?.slug as string
  const data = await getAuthorBySlugFrom(slug)

  if (!data) {
    return {
      notFound: true,
    }
  }

  const id = data.id
  const avatar = id
  const name = data.first_name + ' ' + data.last_name
  const bio = data.bio
  const email = data.email
  const twitter = data.twitter || ''
  const website = data.website || ''

  const author = {
    id,
    slug,
    name,
    bio,
    avatar,
    email,
    twitter,
    website,
  }

  const allPosts = await getContentFrontMatter('posts')
  const posts = allPosts.filter((post) => post.user_id === author.id)

  return { props: { author, posts }, revalidate: 10 }
}

export default function Author({ author, posts }) {
  if (!author || !posts) return <div></div>

  return <AuthorLayout author={author} posts={posts} />
}
