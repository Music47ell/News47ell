/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown, { Options } from 'react-markdown'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import A from './A'
import Code from './Code'
import Heading from './Heading'
import P from './P'
import Pre from './Pre'

export default function Markdown({ children }): JSX.Element {
	const customRenderers: Options['components'] = {
		a: A,
		p: P,
		pre: Pre,
		code: Code,
		h1: Heading,
		h2: Heading,
		h3: Heading,
		h4: Heading,
		h5: Heading,
		h6: Heading,
	}

	return (
		<ReactMarkdown
			className="prose prose-theme max-w-none"
			components={customRenderers}
			remarkPlugins={[remarkGfm, remarkToc]}
			rehypePlugins={[rehypeSlug, rehypePrism, rehypeAutolinkHeadings]}
		>
			{children}
		</ReactMarkdown>
	)
}
