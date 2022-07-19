/* eslint-disable @typescript-eslint/no-explicit-any */
import kebabCase from '@/utils/kebabCase'
import { getTags } from '@/lib/supabase'

export async function getAllTags() {
  const allTags = (await getTags()).map((post) => ({
    tag: post.tag,
  }))

  const tags = allTags.reduce((acc, post) => {
    if (post.tag) {
      const formattedTag = kebabCase(post.tag)
      acc[formattedTag] = (acc[formattedTag] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return tags
}
