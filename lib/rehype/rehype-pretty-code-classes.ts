import { visit } from 'unist-util-visit'

// div.BLOCK > pre.PRE > code.CODE
const BLOCK =
	'my-5 overflow-hidden rounded-lg bg-nfh-background-secondary ring-1 ring-inset ring-nfh-background-secondary/[3%]'
const TITLE =
	'mb-0.5 rounded-t-md bg-nfh-background-secondary px-3 py-2 font-mono text-sm text-nfh-text-primary'
const CODE = 'grid [&>span]:border-l-4 [&>span]:border-l-transparent [&>span]:pl-2 [&>span]:pr-3'
const NUMBERED_LINES =
	'[counter-reset:line] before:[&>span]:mr-3 before:[&>span]:inline-block before:[&>span]:w-4 before:[&>span]:text-right before:[&>span]:text-white/20 before:[&>span]:![content:counter(line)] before:[&>span]:[counter-increment:line]'

export default function rehypePrettyCodeClasses() {
	return (tree: any) => {
		visit(tree, (node: any) =>
			Boolean(
				node.tagName === 'code' &&
					Object.keys(node.properties).length === 0 &&
					node.children.some((n: any) => n.type === 'text')
			)
		)

		visit(
			tree,
			(node: any) =>
				Boolean(typeof node?.properties?.['data-rehype-pretty-code-fragment'] !== 'undefined'),
			(node: any) => {
				if (node.tagName === 'div') {
					node.properties.className = [...(node.properties.className || []), BLOCK]
					node.children = node.children.map((node: any) => {
						if (
							node.tagName === 'div' &&
							typeof node.properties?.['data-rehype-pretty-code-title'] !== 'undefined'
						) {
							node.properties.className = [...(node.properties.className || []), TITLE]
						}
						if (node.tagName === 'pre') {
							if (node.children[0].tagName === 'code') {
								node.children[0].properties.className = [
									...(node.children[0].properties.className || []),
									CODE,
								]
								if (typeof node.children[0].properties['data-line-numbers'] !== 'undefined') {
									node.children[0].properties.className.push(NUMBERED_LINES)
								}
							}
						}

						return node
					})

					return node
				}
			}
		)
	}
}
