/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

export const getTotalReactions = async (): Promise<{
  like_count: number
  dislike_count: number
}> => {
  const like_count = await prisma.postMeta.findMany({
    select: {
      likes: true,
    },
  })

  const dislike_count = await prisma.postMeta.findMany({
    select: {
      dislikes: true,
    },
  })

  return {
    like_count: like_count.reduce((acc, curr) => acc + curr.likes, 0),
    dislike_count: dislike_count.reduce((acc, curr) => acc + curr.dislikes, 0),
  }
}

export const getTopReactions = async () => {
  const mostLikedPosts = await prisma.postMeta.findMany({
    select: {
      likes: true,
      slug: true,
    },
    take: 3,
  })

  const topReactions = mostLikedPosts.map(({ slug, likes }) => ({
    title: slug
      .replace(/-/g, ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase()),
    slug,
    total: likes,
  }))

  return topReactions
}
