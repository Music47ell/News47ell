/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSlugsFrom, getContentBySlugFrom, getAuthorByUserId } from '@/lib/supabase'
import PageLayout from '@/layouts/PageLayout'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  const slugs = await getSlugsFrom('pages')
  const paths = slugs.map((slug) => ({ params: { slug: slug } }))
  return {
    paths,
    fallback: 'blocking',
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps({ params }) {
  const { slug } = params
  const data = await getContentBySlugFrom('pages', slug)

  const author = await getAuthorByUserId(data.user_id)

  const content = data.content

  const frontMatter = {
    title: data.title,
    created_at: data.created_at,
    updated_at: data.updated_at,
    slug: data.slug,
    author,
  }

  return {
    props: {
      frontMatter,
      content,
    },
    revalidate: 10,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Page({ frontMatter, content }) {
  if (!frontMatter || !content) return <div></div>

  return <PageLayout frontMatter={frontMatter} content={content} />
}
