import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import { Parent } from 'unist'
import { VFile } from 'vfile'

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

export function remarkReadingTime() {
	return function (tree: Parent, file: VFile) {
		const textOnPage = toString(tree)
		const { wordsCount, readingTime } = getReadingTime(textOnPage) || {
			wordsCount: 0,
			readingTime: 0,
		}

		file.data.wordsCount = wordsCount
		file.data.readingTime = readingTime
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
	return { wordsCount: vfile.data.wordsCount, readingTime: vfile.data.readingTime }
}
