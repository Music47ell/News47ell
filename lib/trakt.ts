import siteMetadata from '@/data/siteMetadata'

const { TRAKT_CLIENT_ID } = process.env

const STATS_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.trakt}/stats`
const WATCHING_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.trakt}/watching`
const WATCHED_MOVIES_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.trakt}/history/movies?page=1&limit=10`
const WATCHED_SHOWS_ENDPOINT = `https://api.trakt.tv/users/${siteMetadata.trakt}/history/shows?limit=500`

export const getStats = async () => {
  if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
    throw new Error(`No Trakt API key found!`)
  }
  return fetch(STATS_ENDPOINT, {
    headers: {
      'trakt-api-key': TRAKT_CLIENT_ID,
    },
  })
}

export const getNowWatching = async () => {
  if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
    throw new Error(`No Trakt API key found!`)
  }
  return fetch(WATCHING_ENDPOINT, {
    headers: {
      'trakt-api-key': TRAKT_CLIENT_ID,
    },
  })
}

export const getWatchedMovies = async () => {
  if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
    throw new Error(`No Trakt API key found!`)
  }
  return fetch(WATCHED_MOVIES_ENDPOINT, {
    headers: {
      'trakt-api-key': TRAKT_CLIENT_ID,
    },
  })
}

export const getWatchedShows = async () => {
  if (TRAKT_CLIENT_ID === null || TRAKT_CLIENT_ID === undefined) {
    throw new Error(`No Trakt API key found!`)
  }
  return fetch(WATCHED_SHOWS_ENDPOINT, {
    headers: {
      'trakt-api-key': TRAKT_CLIENT_ID,
    },
  })
}
