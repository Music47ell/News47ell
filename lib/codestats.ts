import siteMetadata from '@/data/siteMetadata'
const API_ENDPOINT = `https://codestats.net/api/users/`

export const getCodeStats = async () => {
	return fetch(`${API_ENDPOINT}${siteMetadata.codestats}`)
}
