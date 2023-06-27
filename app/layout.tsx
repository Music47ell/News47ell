import '@/assets/css/tailwind.css'

import type { Metadata } from 'next'

import Analytics from '@/components/Analytics'
import { Footer, Header } from '@/components/UI'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
	title: {
		default: siteMetadata.title,
		template: '%s | ' + siteMetadata.title,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: siteMetadata.siteUrl,
		siteName: siteMetadata.title,
		images: [
			{
				url: `${siteMetadata.siteUrl}/api/og/image?title=News47ell`,
				width: 1920,
				height: 1080,
				alt: siteMetadata.title,
			},
		],
		locale: siteMetadata.locale,
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		types: {
			'application/rss+xml': `${siteMetadata.siteUrl}/blog/feed.xml`,
			'application/json': `${siteMetadata.siteUrl}/blog/feed.json`,
		},
	},
	twitter: {
		card: 'summary_large_image',
		title: siteMetadata.title,
		description: siteMetadata.description,
		site: siteMetadata.siteUrl,
		images: [`${siteMetadata.siteUrl}/api/og/image?title=News47ell`],
	},
	icons: {
		icon: '/favicons/android-chrome-512x512.png',
		shortcut: '/shortcut-icon.png',
		apple: '/favicons/apple-touch-icon.png',
		other: [
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				url: '/favicons/favicon-16x16.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				url: '/favicons/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '192x192',
				url: '/favicons/android-chrome-192x192.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '512x512',
				url: '/favicons/android-chrome-512x512.png',
			},
			{
				rel: 'mask-icon',
				url: '/favicons/safari-pinned-tab.svg',
			},
		],
	},
	manifest: '/favicons/site.webmanifest',
	appleWebApp: {
		title: siteMetadata.title,
	},
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000' },
	],
	other: {
		webmention: `https://webmention.io/${siteMetadata.siteUrl}/webmention`,
		pingback: `https://webmention.io/${siteMetadata.siteUrl}/xmlrpc`,
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-nfh-background-primary text-nfh-text-primary antialiased">
				<Analytics />
				<div className="flex min-h-screen flex-col justify-between">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	)
}
