// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
// https://docs.github.com/en/rest/overview/breaking-changes?apiVersion=2022-11-28

import siteMetadata from '@/data/siteMetadata'

const GITHUB_PAT = process.env.GITHUB_PAT

export const getGist = async (gist_id: string) => {
	if (GITHUB_PAT === null || GITHUB_PAT === undefined) {
		throw new Error(`No GitHub PAT key found!`)
	}
	return fetch(`https://api.github.com/gists/${gist_id}`, {
		headers: {
			Application: 'application/vnd.github+json',
			Authorization: `Token ${GITHUB_PAT}`,
		},
	})
}

export const getCommitData = async (filePath: string) => {
	if (GITHUB_PAT === null || GITHUB_PAT === undefined) {
		throw new Error(`No GitHub PAT key found!`)
	}

	const GITHUB_REPO_ENDPOINT = `https://api.github.com/repos/${siteMetadata.siteRepo}/commits?path=${filePath}`
	return fetch(GITHUB_REPO_ENDPOINT, {
		headers: {
			Application: 'application/vnd.github+json',
			Authorization: `Token ${GITHUB_PAT}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})
}
