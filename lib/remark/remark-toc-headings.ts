import { slug } from 'github-slugger'
import { Heading } from 'mdast'
import { toString } from 'mdast-util-to-string'
import { remark } from 'remark'
import { Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { VFile } from 'vfile'

import { Toc } from '@/lib/types'

export function remarkTocHeadings() {
	return (tree: Parent, file: VFile) => {
		const toc: Toc = []
		visit(tree, 'heading', (node: Heading) => {
			const textContent = toString(node)
			toc.push({
				value: textContent,
				url: '#' + slug(textContent),
				depth: node.depth,
			})
		})
		file.data.toc = toc
	}
}

/**
 * Passes markdown file through remark to extract TOC headings
 *
 * @param {string} markdown
 * @return {*}  {Promise<Toc>}
 */
export default async function extractTocHeadings(markdown: string): Promise<Toc> {
	const vfile = await remark().use(remarkTocHeadings).process(markdown)
	// @ts-ignore
	return vfile.data.toc
}
