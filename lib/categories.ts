/* eslint-disable @typescript-eslint/no-explicit-any */
import kebabCase from '@/utils/kebabCase'
import { getCategories } from '@/lib/supabase'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getAllCategories() {
  const allCategories = (await getCategories()).map((post) => ({
    category: post.category,
  }))

  const categories = allCategories.reduce((acc, post) => {
    if (post.category) {
      const formattedCategory = kebabCase(post.category)
      acc[formattedCategory] = (acc[formattedCategory] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  return categories
}
