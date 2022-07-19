import { useRouter } from 'next/router'
import {
  getSlugsFrom,
  getContentBySlugFrom,
  getContentFrontMatter,
  getAuthorByUserId,
} from '@/lib/supabase'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'

export async function getStaticPaths() {
  const slugs = await getSlugsFrom('posts')
  const paths = slugs.map((slug) => ({ params: { slug: slug } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params as { slug: string }
  const data = await getContentBySlugFrom('posts', slug)

  if (!data) {
    return { notFound: true }
  }

  const author = await getAuthorByUserId(data.user_id)

  const content = data.content
  const wordCount = content.split(' ').length
  const readingTime = Math.ceil(wordCount / 200)

  const frontMatter = {
    title: data.title,
    published_at: data.published_at,
    updated_at: data.updated_at,
    slug: data.slug,
    category: data.category,
    tags: data.tags,
    description: data.description,
    layout: data.layout,
    author,
    wordCount,
    readingTime,
  }

  const db = await getContentFrontMatter('posts')
  const posts = db.map((post) => ({
    title: post.title,
    slug: post.slug,
    updated_at: post.updated_at,
  }))
  const postIndex = posts
    .sort((a, b) => Number(new Date(b.updated_at)) - Number(new Date(a.updated_at)))
    .findIndex((post) => post.slug === slug)
  const prev: { slug: string; title: string } = posts[postIndex + 1] || null
  const next: { slug: string; title: string } = posts[postIndex - 1] || null

  return {
    props: {
      frontMatter,
      content,
      next,
      prev,
    },
    revalidate: 10,
  }
}

export default function Post({ frontMatter, content, next, prev }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!frontMatter || !content) return <div></div>
  const layout = frontMatter.layout

  // switch case to render the correct layout
  switch (layout) {
    case 'Full':
      return <PostLayout frontMatter={frontMatter} content={content} next={next} prev={prev} />
    case 'Simple':
      return <PostSimple frontMatter={frontMatter} content={content} next={next} prev={prev} />

    default:
      return <PostLayout frontMatter={frontMatter} content={content} next={next} prev={prev} />
  }
}
