/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feed } from 'feed'
import { getContentFrontMatter } from '@/lib/supabase'
import siteMetadata from '@/data/siteMetadata'

const year = new Date().getFullYear()

// Function for generating the RSS feed
export const generateRSS = async () => {
  const posts = await getContentFrontMatter('posts')

  // Create new feed object
  const feed = new Feed({
    id: siteMetadata.siteUrl,
    link: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    copyright: `All rights reserved ${year}, ${siteMetadata.altTitle}`,
    image: `${siteMetadata.siteUrl}/favicon.png`,
    favicon: `${siteMetadata.siteUrl}/favicon.ico`,
    author: {
      name: siteMetadata.author,
      email: siteMetadata.email,
      link: siteMetadata.siteUrl,
    },
  })

  // Add posts to feed based on queried data from Supabase
  posts.forEach((post: any) => {
    feed.addItem({
      id: post.id,
      title: post.title,
      link: `${siteMetadata.siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
    })
  })

  return feed
}
