import siteMetadata from '@/data/siteMetadata'

const { LASTFM_API_KEY } = process.env

const STATS_ENDPOINT = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${siteMetadata.lastfm}&api_key=${LASTFM_API_KEY}&format=json`

export const getStats = async () => {
  if (LASTFM_API_KEY === null || LASTFM_API_KEY === undefined) {
    throw new Error(`No Trakt API key found!`)
  }
  return fetch(STATS_ENDPOINT)
}
