import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files'

import mdxOptions from './lib/mdx'
import { extractReadingTime, extractTocHeadings } from './lib/remark'

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
	stats: { type: 'json', resolve: (doc) => extractReadingTime(doc.body.raw) },
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
		tags: { type: 'list', of: { type: 'string' }, required: false },
		source: { type: 'string', required: false },
		canonicalUrl: { type: 'string' },
	},
	computedFields,
}))

const Page = defineDocumentType(() => ({
	name: 'Page',
	filePathPattern: 'pages/**/*.mdx',
	contentType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		draft: { type: 'boolean', required: true },
		published_at: { type: 'string', required: true },
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: 'content',
	documentTypes: [Blog, Page],
	mdx: mdxOptions,
})
