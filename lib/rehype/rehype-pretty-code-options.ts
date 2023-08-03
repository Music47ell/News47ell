import { type Options } from 'rehype-pretty-code'

const HIGHLIGHTED_LINE =
	'!border-nfh-accent-primary bg-nfh-background-secondary/50 before:!text-nfh-text-secondary'
const HIGHLIGHTED_WORD = 'rounded bg-nfh-accent-secondary py-0.5 px-1 text-nfh-text-primary'

// export const

const rehypePrettyCodeOptions: Partial<Options> = {
	theme: 'dracula',
	tokensMap: {
		// VScode command palette: Inspect Editor Tokens and Scopes
		// https://github.com/Binaryify/OneDark-Pro/blob/47c66a2f2d3e5c85490e1aaad96f5fab3293b091/themes/OneDark-Pro.json
		fn: 'entity.name.function',
		objKey: 'meta.object-literal.key',
	},
	onVisitLine(node) {
		// Prevent lines from collapsing in `display: grid` mode, and
		// allow empty lines to be copy/pasted
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }]
		}
		node.properties.className = ['']
	},
	onVisitHighlightedLine(node) {
		node.properties.className = [HIGHLIGHTED_LINE]
	},
	onVisitHighlightedChars(node) {
		node.properties.className = [HIGHLIGHTED_WORD]
	},
}

export default rehypePrettyCodeOptions
