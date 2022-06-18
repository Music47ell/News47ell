import siteMetadata from '@/data/siteMetadata'
const API_ENDPOINT = `https://codestats.net/api/users/`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getCodeStats = async () => {
  return fetch(`${API_ENDPOINT}${siteMetadata.codestats}`)
}
