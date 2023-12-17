import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import {
	astroExpressiveCodeOptions,
	remarkModifiedTime,
	remarkReadingTime,
} from './src/libs/remark'
import siteMetadata from './src/data/siteMetadata'
import astroExpressiveCode from 'astro-expressive-code'
import vercel from '@astrojs/vercel/serverless'

const VERCEL_PREVIEW_SITE =
	process.env.VERCEL_ENV !== 'production' &&
	process.env.VERCEL_URL &&
	`https://${process.env.VERCEL_URL}`

const site = VERCEL_PREVIEW_SITE || siteMetadata.siteUrl

// https://astro.build/config
export default defineConfig({
	site: site,
	output: 'server',
	adapter: vercel({
		edgeMiddleware: true,
	}),
	experimental: {
		optimizeHoistedScript: true,
	},
	prefetch: {
		defaultStrategy: 'viewport',
	},
	vite: {
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
	markdown: {
		remarkPlugins: [remarkModifiedTime, remarkReadingTime],
	},
	integrations: [tailwind(), astroExpressiveCode(astroExpressiveCodeOptions()), mdx()],
})
