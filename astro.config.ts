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
	server: {
		headers: {
			'Accept-Encoding': 'br, gzip, compress',
			'Content-Security-Policy': 'upgrade-insecure-requests; block-all-mixed-content',
			'Permissions-Policy':
				'ambient-light-sensor=(), autoplay=(), accelerometer=(self), camera=(), document-domain=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(self), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), speaker=(), sync-xhr=(), usb=(), vr=()',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'Report-To': `{"group":"default","max_age":31536000,"endpoints":[{"url":"https://news47ell.report-uri.com/a/d/g"}],"include_subdomains":true}`,
			'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
			'X-Content-Type-Options': 'nosniff',
			'X-Frame-Options': 'DENY',
			'X-XSS-Protection': '1; mode=block',
		},
	},
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
		// fix: No loader is configured for ".node"
		// https://github.com/yisibl/resvg-js/issues/175#issuecomment-1577291297
		ssr: { external: ['sharp'] },
		optimizeDeps: { exclude: ['sharp'] },
		build: { rollupOptions: { external: ['sharp'] } },
	},
	markdown: {
		remarkPlugins: [remarkModifiedTime, remarkReadingTime],
	},
	integrations: [tailwind(), astroExpressiveCode(astroExpressiveCodeOptions), mdx()],
})
