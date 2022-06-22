/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaxonomySEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getContentFrontMatter } from '@/lib/supabase'
import { getAllTags } from '@/lib/tags'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import kebabCase from '@/utils/kebabCase'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticPaths() {
  const tags = await getAllTags()

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tag = context.params.tag as string
  const db = await getContentFrontMatter('posts')

  const posts = db
    .map((post: any) => ({
      id: post.id,
      published_at: post.published_at,
      updated_at: post.updated_at,
      title: post.title,
      slug: post.slug,
      category: post.category,
      tags: post.tags?.map((tag: any) => tag) || [],
    }))
    .filter((post) => post.tags.map((t: string) => kebabCase(t)).includes(tag))

  return { props: { posts, tag } }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TaxonomySEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.title}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  )
}
