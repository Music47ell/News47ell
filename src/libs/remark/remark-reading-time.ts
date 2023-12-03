import { toString } from 'mdast-util-to-string'
import type { Parent } from 'unist'

export type Stats = {
	wordsCount: number
	readingTime: number
}

const WORDS_PER_MINUTE = 200

function getReadingTime(content: string) {
	if (!content) return
	const clean = content.replace(/<\/?[^>]+(>|$)/g, '')
	const wordsCount = Number(clean.split(/\s/g).length)
	const readingTime = Math.ceil(wordsCount / WORDS_PER_MINUTE)
	return { wordsCount, readingTime }
}

export default function remarkReadingTime() {
	return function (tree: Parent, { data }: any) {
		const textOnPage = toString(tree)
		const { wordsCount, readingTime } = getReadingTime(textOnPage) || {
			wordsCount: 0,
			readingTime: 0,
		}

		data.astro.frontmatter.wordsCount = wordsCount
		data.astro.frontmatter.readingTime = readingTime
	}
}
