import siteMetadata from '@/data/siteMetadata'

const { TMDB_API_TOKEN } = process.env

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getTMDB = async (id: number) => {
  if (TMDB_API_TOKEN === null || TMDB_API_TOKEN === undefined) {
    throw new Error(`No TMDB API key found!`)
  }
  const TMDB_ENDPOINT = `https://api.themoviedb.org/3/find/${id}?language=${siteMetadata.locale}&external_source=imdb_id`

  return fetch(TMDB_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  })
}
