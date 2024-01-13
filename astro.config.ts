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

// https://astro.build/config
export default defineConfig({
	site: siteMetadata.siteUrl,
	trailingSlash: 'never',
	build: {
		format: 'file',
	},
	experimental: {
		optimizeHoistedScript: true,
	},
	prefetch: {
		defaultStrategy: 'viewport',
	},
	vite: {
		server: {
			proxy: {
				'/api': 'http://localhost:8787',
			},
		},
		resolve: {
			alias: {
				'@': '/src',
			},
		},
	},
	markdown: {
		remarkPlugins: [remarkModifiedTime, remarkReadingTime],
	},
	integrations: [astroExpressiveCode(astroExpressiveCodeOptions()), mdx(), tailwind()],
})
