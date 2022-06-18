/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { getContentFrontMatter } from '@/lib/supabase'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await getContentFrontMatter('posts')

  const totalPages = Math.ceil(db.length / siteMetadata.postsPerPages)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { page },
  } = context
  const db = await getContentFrontMatter('posts')

  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = db.slice(
    siteMetadata.postsPerPages * (pageNumber - 1),
    siteMetadata.postsPerPages * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(db.length / siteMetadata.postsPerPages),
  }

  return {
    props: {
      posts: db,
      initialDisplayPosts,
      pagination,
    },
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function PostPage({
  posts,
  pagination,
  initialDisplayPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        pagination={pagination}
        initialDisplayPosts={initialDisplayPosts}
        title={`Page ${pagination.currentPage}`}
      />
    </>
  )
}
