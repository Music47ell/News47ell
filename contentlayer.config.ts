import type { MDXOptions } from 'contentlayer/core'
import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkUnwrapImages from 'remark-unwrap-images'

import { rehypePrettyCodeClasses, rehypePrettyCodeOptions } from './lib/rehype'
import { extractReadingTime, extractTocHeadings, remarkImgToJsx } from './lib/remark'

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
	},
	path: {
		type: 'string',
		resolve: (doc) => doc._raw.flattenedPath,
	},
	filePath: {
		type: 'string',
		resolve: (doc) => doc._raw.sourceFilePath,
	},
	readingTime: {
		type: 'string',
		resolve: async (doc) => (await extractReadingTime(doc.body.raw)).readingTime,
	},
	wordsCount: {
		type: 'number',
		resolve: async (doc) => (await extractReadingTime(doc.body.raw)).wordsCount,
	},
	toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: 'blog/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		description: { type: 'string', required: false },
		draft: { type: 'boolean', required: false },
		published_at: { type: 'string', required: true },
		updated_at: { type: 'string', required: true },
		tags: { type: 'list', of: { type: 'string' }, required: false },
		source: { type: 'string', required: false },
		canonicalUrl: { type: 'string', required: false },
	},
	computedFields,
}))

const Page = defineDocumentType(() => ({
	name: 'Page',
	filePathPattern: 'pages/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		draft: { type: 'boolean', required: false },
		published_at: { type: 'string', required: true },
		updated_at: { type: 'string', required: true },
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: 'content',
	documentTypes: [Blog, Page],
	mdx: {
		cwd: process.cwd(),
		remarkPlugins: [remarkGfm, remarkUnwrapImages, remarkImgToJsx],
		rehypePlugins: [
			rehypeSlug,
			[rehypePrettyCode, rehypePrettyCodeOptions],
			[rehypePrettyCodeClasses],
			rehypePresetMinify,
		],
	} as MDXOptions,
})
