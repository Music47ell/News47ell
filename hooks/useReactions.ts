import { useCallback } from 'react'
import useSWR from 'swr'
import useDebounce from '@/hooks/useDebounce'
import {
  Reactions,
  LikeReaction,
  UseLikeCountResult,
  DislikeReaction,
  UseDislikeCountResult,
} from '@/lib/types'
import fetcher from '@/lib/fetcher'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDashboardReactions() {
  const { data, error } = useSWR<Reactions>(`/api/reactions`, fetcher)
  const totalLikes = Number(data?.like_count)
  const totalDislikes = Number(data?.dislike_count)
  const totalReactions = Number(totalLikes) + Number(totalDislikes)

  return {
    totalLikes,
    totalDislikes,
    totalReactions,
    isLoading: !data && !error,
    isError: error,
  }
}

export function useSlugReactionsLike(slug: string): UseLikeCountResult {
  const { data, error, mutate } = useSWR<LikeReaction>(`/api/reactions/like/${slug}`, fetcher)

  const debouncedUpdateUserLike = useDebounce(updateUserLike, 1000)

  const toggleUserLike = useCallback(async () => {
    mutate((data) => {
      if (data === undefined) return

      // Update the local data immediately (giving the user instant feedback).
      // Revalidation is disabled to avoid an unnecessary request, which is
      // handled next.
      return data.userLikes
        ? {
            userLikes: false,
            likes: data.likes - 1,
          }
        : {
            userLikes: true,
            likes: data.likes + 1,
          }
    }, false)

    // Send the request to update the user's like status, and update
    // the local value with the returned (updated) one.
    try {
      await mutate(async (data) => {
        if (data === undefined) return

        return debouncedUpdateUserLike(slug, data.userLikes)

        // 👇 Revalidation is disabled once again, since the request already
        // returns the updated data.
      }, false)
    } catch {
      // If there was an error while updating the user like, trigger a
      // revalidation to set our local data back to the latest valid data (since
      // we updated it locally to give the user feedback, assuming there weren't
      // going to be any errors).
      mutate()
    }
  }, [debouncedUpdateUserLike, mutate, slug])

  return {
    likes: data?.likes,
    userLikes: data?.userLikes,
    toggleUserLike,
    isLoadingLikes: !data && !error,
  }
}

async function updateUserLike(slug: string, value: boolean) {
  const response = await fetch(`/api/reactions/like/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      type: value ? 'increment' : 'decrement',
    }),
  })

  // TODO: error handling
  if (response.ok) {
    return response.json()
  }
}

export function useSlugReactionsDislike(slug: string): UseDislikeCountResult {
  const { data, error, mutate } = useSWR<DislikeReaction>(`/api/reactions/dislike/${slug}`, fetcher)

  const debouncedUpdateUserDislike = useDebounce(updateUserDislike, 1000)

  const toggleUserDislike = useCallback(async () => {
    mutate((data) => {
      if (data === undefined) return

      // Update the local data immediately (giving the user instant feedback).
      // Revalidation is disabled to avoid an unnecessary request, which is
      // handled next.
      return data.userDislikes
        ? {
            userDislikes: false,
            dislikes: data.dislikes - 1,
          }
        : {
            userDislikes: true,
            dislikes: data.dislikes + 1,
          }
    }, false)

    // Send the request to update the user's dislike status, and update
    // the local value with the returned (updated) one.
    try {
      await mutate(async (data) => {
        if (data === undefined) return

        return debouncedUpdateUserDislike(slug, data.userDislikes)

        // 👇 Revalidation is disabled once again, since the request already
        // returns the updated data.
      }, false)
    } catch {
      // If there was an error while updating the user dislike, trigger a
      // revalidation to set our local data back to the latest valid data (since
      // we updated it locally to give the user feedback, assuming there weren't
      // going to be any errors).
      mutate()
    }
  }, [debouncedUpdateUserDislike, mutate, slug])

  return {
    dislikes: data?.dislikes,
    userDislikes: data?.userDislikes,
    toggleUserDislike,
    isLoadingDislikes: !data && !error,
  }
}

async function updateUserDislike(slug: string, value: boolean) {
  const response = await fetch(`/api/reactions/dislike/${slug}`, {
    method: 'PUT',
    body: JSON.stringify({
      type: value ? 'increment' : 'decrement',
    }),
  })

  // TODO: error handling
  if (response.ok) {
    return response.json()
  }
}
