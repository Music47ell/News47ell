import type { MDXOptions } from 'contentlayer/core'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import { rehypePrettyCodeClasses, rehypePrettyCodeOptions } from './rehype'
import { remarkImgToJsx } from './remark'

const mdxOptions: MDXOptions = {
	cwd: process.cwd(),
	remarkPlugins: [remarkGfm, remarkUnwrapImages, remarkImgToJsx],
	rehypePlugins: [
		rehypeSlug,
		[rehypePrettyCode, rehypePrettyCodeOptions],
		[rehypePrettyCodeClasses],
		rehypePresetMinify,
	],
}

export default mdxOptions
