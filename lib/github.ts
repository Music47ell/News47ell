// https://docs.github.com/en/rest/commits/commits?apiVersion=2022-11-28#list-commits
// https://docs.github.com/en/rest/overview/breaking-changes?apiVersion=2022-11-28

import siteMetadata from '@/data/siteMetadata'

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

export const getCommitData = async (filePath: string) => {
	if (GITHUB_PAT === null || GITHUB_PAT === undefined) {
		throw new Error(`No GitHub PAT key found!`)
	}

	const GITHUB_REPO_ENDPOINT = `https://api.github.com/repos/timlrx/tailwind-nextjs-starter-blog/commits?path=${filePath}`
	//const GITHUB_REPO_ENDPOINT = `https://api.github.com/repos/timlrx/tailwind-nextjs-starter-blog/commits?path=components/SEO.js`
	return fetch(GITHUB_REPO_ENDPOINT, {
		headers: {
			Application: 'application/vnd.github+json',
			Authorization: `Token ${GITHUB_PAT}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})
}

export const getAuthors = async (filePath: string) => {
	if (GITHUB_PAT === null || GITHUB_PAT === undefined) {
		throw new Error(`No GitHub PAT key found!`)
	}

	const GITHUB_REPO_ENDPOINT = `https://api.github.com/repos/${siteMetadata.siteRepo}/commits?path=content/${filePath}.mdx`
	const response = await fetch(GITHUB_REPO_ENDPOINT, {
		headers: {
			Application: 'application/vnd.github+json',
			Authorization: `Token ${GITHUB_PAT}`,
			'X-GitHub-Api-Version': '2022-11-28',
		},
	})

	const data = await response.json()

	// if data message: 'Git Repository is empty.', or data length is 0, then use this
	if (data.message === 'Git Repository is empty.' || data.length === 0) {
		return [
			{
				id: 47,
				name: siteMetadata.author.name,
				avatar: siteMetadata.author.avatar,
				url: siteMetadata.author.url,
			},
		]
	}

	// get list of users who have contributed to the file { id, name, avatar, url }
	const authorsIDs = data.map((commit: { author: { id: number } }) => commit.author.id)
	const authorsNames = data.map(
		(commit: { commit: { author: { name: string } } }) => commit.commit.author.name
	)
	const authorsAvatars = data.map(
		(commit: { author: { avatar_url: string } }) => commit.author.avatar_url
	)
	const authorsUrls = data.map((commit: { author: { html_url: string } }) => commit.author.html_url)
	const authorsCommitDates = data.map(
		(commit: { commit: { author: { date: string } } }) => commit.commit.author.date
	)
	// turn authorsIDs, authorsNames, authorsAvatars, authorsUrls into an array of objects with the same index then return the array and sort by date from old to new
	const authors = authorsIDs.map((id: number, index: number) => {
		return {
			id: id,
			name: authorsNames[index],
			avatar: authorsAvatars[index],
			url: authorsUrls[index],
			date: authorsCommitDates[index],
		}
	})
	const uniqueAuthors = authors.filter(
		(value: { id: number }, index: number, self: { id: number }[]) =>
			self.findIndex((t) => t.id === value.id) === index
	)

	uniqueAuthors.sort((a, b) => {
		return new Date(a.date).getTime() - new Date(b.date).getTime()
	})

	return uniqueAuthors
}
