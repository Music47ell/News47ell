import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import {
	astroExpressiveCodeOptions,
	remarkModifiedTime,
	remarkReadingTime,
} from './src/libs/remark'
import siteMetadata from './src/data/siteMetadata'
import netlify from '@astrojs/netlify/functions'
import astroExpressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
	site: siteMetadata.siteUrl,
	output: 'server',
	adapter: netlify(),
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
	integrations: [tailwind(), astroExpressiveCode(astroExpressiveCodeOptions), mdx()],
})
