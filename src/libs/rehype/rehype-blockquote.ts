// Import the 'visit' function from 'unist-util-visit'.
import { visit } from 'unist-util-visit'

// Define the rehype plugin to style blockquotes based on their content.
export default function rehypeBlockquote() {
	return (tree: any) => {
		// Use the 'visit' function to traverse the abstract syntax tree (AST).
		visit(tree, 'element', (node) => {
			// Check if the current element is a 'blockquote'.
			if (node.tagName === 'blockquote') {
				// Check if the 'blockquote' has a child element with the tag name 'p' (paragraph).
				const { children = [] } = node
				const { properties = {} } = node
				const { tagName } = node

				// Ensure there is at least one child element (a paragraph).
				if (children.length > 0) {
					// Extract the first child, which should be a 'p' element.
					const [{ value, type }, ...siblings] = children

					// Check if the first child is a 'p' element.
					if (type === 'element' && tagName === 'blockquote' && value === 'p') {
						// Extract the content of the paragraph.
						const paragraphContent = siblings
							.map((sibling: { value: any }) => sibling.value)
							.join('')

						// Split the paragraph content at the first colon to determine the blockquote type.
						const [quoteType, quoteContent] = paragraphContent.split(':')

						// Trim and convert the blockquote type to lowercase.
						const bqType = quoteType.trim().toLowerCase()

						// Define CSS classes based on blockquote type.
						let cssClass = ''

						switch (bqType) {
							case 'info':
								cssClass = 'text-gray-500' // Replace with your desired tailwind CSS class for info.
								break
							case 'danger':
								cssClass = 'text-yellow-500' // Replace with your desired tailwind CSS class for danger.
								break
							// Add more cases for other blockquote types if needed.
							default:
								break
						}

						// Add the CSS class to the blockquote's properties.
						properties.className = [cssClass]
					}
				}
			}
		})
	}
}
