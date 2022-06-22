import { TaxonomySEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllCategories } from '@/lib/categories'
import { getContentFrontMatter } from '@/lib/supabase'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import kebabCase from '@/utils/kebabCase'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  const categories = await getAllCategories()

  return {
    paths: Object.keys(categories).map((category) => ({
      params: {
        category,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params.category as string
  const db = await getContentFrontMatter('posts')

  const posts = db
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((post: any) => ({
      id: post.id,
      published_at: post.published_at,
      updated_at: post.updated_at,
      title: post.title,
      slug: post.slug,
      category: post.category,
    }))
    .filter((post) => kebabCase(post.category) === category)

  return { props: { posts, category } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Category({
  posts,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = category[0].toUpperCase() + category.split(' ').join('-').slice(1)
  return (
    <>
      <TaxonomySEO
        title={`${category} - ${siteMetadata.title}`}
        description={`${category} categories - ${siteMetadata.title}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
