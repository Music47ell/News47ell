const GITHUB_GIST_ID = process.env.GITHUB_GIST_ID
const GITHUB_PAT = process.env.GITHUB_PAT

const GITHUB_GIST_ENDPOINT = `https://api.github.com/gists/${GITHUB_GIST_ID}`

export const getResume = async () => {
	if (GITHUB_PAT === null || GITHUB_PAT === undefined) {
		throw new Error(`No GitHub PAT key found!`)
	}
	return fetch(GITHUB_GIST_ENDPOINT, {
		headers: {
			Application: 'application/vnd.github+json',
			Authorization: `Token ${GITHUB_PAT}`,
		},
	})
}
