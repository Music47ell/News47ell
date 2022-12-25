import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import { Parent } from 'unist'
import { VFile } from 'vfile'

export type Stats = {
	wordsCount: number
	timeToRead: number
}

const WORDS_PER_MINUTE = 200

function getReadingTime(content: string) {
	if (!content) return
	const clean = content.replace(/<\/?[^>]+(>|$)/g, '')
	const wordsCount = Number(clean.split(/\s/g).length)
	const readingTime = Math.ceil(wordsCount / WORDS_PER_MINUTE)
	return [wordsCount, readingTime]
}

export function remarkReadingTime() {
	return function (tree: Parent, file: VFile) {
		const textOnPage = toString(tree)
		const [numberOfWords, readingTime] = getReadingTime(textOnPage)
		const stats: Stats = {
			wordsCount: numberOfWords,
			timeToRead: readingTime,
		}
		file.data.stats = stats
	}
}

/**
 * Passes markdown file through remark to extract reading time
 *
 * @param {string} markdown
 * @return {*}  {Promise<ReadingTime>}
 */
export default async function extractReadingTime(markdown: string): Promise<Stats> {
	const vfile = await remark().use(remarkReadingTime).process(markdown)
	// @ts-ignore
	return vfile.data.stats
}
