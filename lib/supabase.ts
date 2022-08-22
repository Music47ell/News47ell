import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import matter from 'gray-matter'

export const getWebVitals = async () => {
  const { data } = await supabaseClient.from('web-vitals').select()

  return data
}

export const getContentFrontMatter = async (from: string) => {
  const { data: posts } = await supabaseClient.from(from).select()

  const allFrontMatter = []

  posts.forEach((post) => {
    const { data: frontmatter } = matter(post.content)
    if (frontmatter.published === true) {
      frontmatter.id = post.id
      frontmatter.user_id = post.user_id
      allFrontMatter.push(frontmatter)
    }
  })

  allFrontMatter.sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  })

  return allFrontMatter
}

export const getAllContentFrontMatter = async (from: string) => {
  const { data: posts } = await supabaseClient.from(from).select()

  const allFrontMatter = []

  posts.forEach((post) => {
    const { data: frontmatter } = matter(post.content)
    frontmatter.id = post.id
    frontmatter.user_id = post.user_id
    allFrontMatter.push(frontmatter)
  })

  allFrontMatter.sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  })

  return allFrontMatter
}

export const getSlugsFrom = async (from: string) => {
  const { data: slugs } = await supabaseClient.from(from).select()

  const allSlugs = []

  slugs.forEach((slug) => {
    const { data: frontmatter } = matter(slug.content)
    if (frontmatter.published === true) {
      allSlugs.push(frontmatter.slug)
    }
  })

  return allSlugs
}

export const getAuthorsSlugs = async () => {
  const { data: slugs } = await supabaseClient.from('profiles').select('slug')

  return slugs
}

export const getAuthorBySlugFrom = async (slug: string) => {
  const { data } = await supabaseClient
    .from('profiles')
    .select()
    .filter('slug', 'eq', slug)
    .single()

  return data
}

export const getContentBySlugFrom = async (from: string, slug: string) => {
  const { data } = await supabaseClient.from(from).select()

  let content = null

  data.find((item) => {
    const { data: frontmatter, content: md } = matter(item.content)
    if (frontmatter.slug === slug) {
      content = {
        user_id: item.user_id,
        id: item.id,
        title: frontmatter.title,
        description: frontmatter.description,
        slug: frontmatter.slug,
        published: frontmatter.published,
        published_at: frontmatter.published_at,
        cover_image: frontmatter.cover_image,
        category: frontmatter.category,
        tags: frontmatter.tags,
        layout: frontmatter.layout,
        content: md,
      }
    }
  })

  return content
}

export const getCategories = async () => {
  const { data: categories } = await supabaseClient.from('posts')

  const allCategories = []

  categories.forEach((post) => {
    const { data: frontmatter } = matter(post.content)
    if (frontmatter.published === true) {
      allCategories.push({
        category: frontmatter.category,
      })
    }
  })

  return allCategories
}

export const getTags = async () => {
  const { data: tags } = await supabaseClient.from('posts')

  const allTags = []

  tags.forEach((post) => {
    const { data: frontmatter } = matter(post.content)
    if (frontmatter.published === true) {
      frontmatter.tags?.forEach((tag: string) => {
        if (!allTags.includes(tag)) {
          allTags.push({
            tag: tag,
          })
        }
      })
    }
  })

  return allTags
}

export const getAuthorByUserId = async (id: string) => {
  const { data: author } = await supabaseClient
    .from('profiles')
    .select()
    .filter('id', 'eq', id)
    .single()

  return author
}

export async function getDelete(from: string, id: string) {
  await supabaseClient.from(from).delete().match({ id })
}

export const getContentFromById = async (from: string, id: string) => {
  const { data } = await supabaseClient.from(from).select().filter('id', 'eq', id).single()

  return data
}

export const getAddContent = async (from: string, content: string, user_id: string) => {
  const { data: newContent, error } = await supabaseClient
    .from(from)
    .insert([
      {
        content,
        user_id,
      },
    ])
    .single()

  return { newContent, error }
}

export const getUpdateContentById = async (
  from: string,
  id: string,
  content: string,
  user_id: string
) => {
  const { error } = await supabaseClient
    .from(from)
    .update([
      {
        content,
        user_id,
      },
    ])
    .match({ id })

  return error
}

export const getSearchResults = async (from: string, query: string) => {
  const { data: posts } = await supabaseClient
    .from(from)
    .select('content')
    .textSearch('content', `${query}`)

  const searchResults = []

  posts.forEach((post) => {
    const { data: frontmatter } = matter(post.content)
    if (frontmatter.published === true) {
      frontmatter.id = post.id
      frontmatter.user_id = post.user_id
      searchResults.push(frontmatter)
    }
  })

  searchResults.sort((a, b) => {
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  })

  return searchResults
}

export const getAddLyric = async (song: string, band: string, lyric: string, user_id: string) => {
  const { data: newLyric, error } = await supabaseClient
    .from('lyrics')
    .insert([
      {
        song,
        band,
        lyric,
        user_id,
      },
    ])
    .single()

  return { newLyric, error }
}

export const getLyrics = async () => {
  const { data: lyrics, error } = await supabaseClient.from('lyrics').select()

  return { lyrics, error }
}

export const getUpdateLyricById = async (
  id: string,
  song: string,
  band: string,
  lyric: string,
  user_id: string
) => {
  const { error } = await supabaseClient
    .from('lyrics')
    .update([
      {
        song,
        band,
        lyric,
        user_id,
      },
    ])
    .match({ id })

  return error
}

export const getAddQuote = async (link: string, source: string, quote: string, user_id: string) => {
  const { data: newQuote, error } = await supabaseClient
    .from('quotes')
    .insert([
      {
        link,
        source,
        quote,
        user_id,
      },
    ])
    .single()

  return { newQuote, error }
}

export const getQuotes = async () => {
  const { data: quotes, error } = await supabaseClient.from('quotes').select()

  return { quotes, error }
}

export const getUpdateQuoteById = async (
  id: string,
  link: string,
  source: string,
  quote: string,
  user_id: string
) => {
  const { error } = await supabaseClient
    .from('quotes')
    .update([
      {
        link,
        source,
        quote,
        user_id,
      },
    ])
    .match({ id })

  return error
}
