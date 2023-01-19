import { usePathname } from 'next/navigation'
import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'
import { useSlugReactionsDislike, useSlugReactionsLike } from '@/hooks/useReactions'
import { useViewsBySlug } from '@/hooks/useViews'
import { BlogSeoProps, CommonSEOProps, PageSEOProps } from '@/lib/interfaces'

const ogUrl = process.env.NODE_ENV === 'production' ? siteMetadata.siteUrl : 'http://localhost:3000'

const CommonSEO = ({
	title,
	description,
	ogType,
	ogImage,
	twImage,
	canonicalUrl,
}: CommonSEOProps) => {
	const pathname = usePathname()

	return (
		<>
			<meta
				name="robots"
				content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			/>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={`${siteMetadata.siteUrl}${pathname}`} />
			<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
			<link rel="alternate" type="application/json" href="/feed.json" />

			{/*Favicons Meta Tags*/}
			<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
			<link
				rel="icon"
				type="image/png"
				sizes="192x192"
				href="/favicons/android-chrome-192x192.png"
			/>
			<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
			<link rel="manifest" href="/favicons/site.webmanifest" />
			<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#E30A17" />
			<meta name="apple-mobile-web-app-title" content="News47ell" />
			<meta name="application-name" content="News47ell" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png" />
			<meta name="msapplication-config" content="/favicons/browserconfig.xml" />
			<meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
			<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />

			<meta name="viewport" content="width=device-width, initial-scale=1" />

			{/*Preconnect/Prefetch Meta Tags*/}
			<link rel="preconnect" href="https://vitals.vercel-insights.com" />

			{/*Open Graph Meta Tags*/}
			<meta property="og:locale" content={siteMetadata.locale} />
			<meta property="og:type" content={ogType} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={`${siteMetadata.siteUrl}${pathname}`} />
			<meta property="og:site_name" content={siteMetadata.title} />
			<meta property="og:image" content={ogImage} key={ogImage} />
			<meta property="og:image:width" content="1600" />
			<meta property="og:image:height" content="836" />
			<meta property="og:image:alt" content={title} />

			{/*Twitter Meta Tags*/}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={siteMetadata.author.twitter} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={twImage} />

			{/* Canonical URL */}
			<link
				rel="canonical"
				href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${pathname}`}
			/>

			{/* Webmention Meta Tags */}
			<link rel="webmention" href={`https://webmention.io/${siteMetadata.webmention}/webmention`} />
			<link rel="pingback" href={`https://webmention.io/${siteMetadata.webmention}/xmlrpc`} />
		</>
	)
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
	const ogImage = `${ogUrl}/api/og/image?title=${title}`

	return (
		<CommonSEO
			title={title}
			description={description}
			ogType="website"
			ogImage={ogImage}
			twImage={ogImage}
		/>
	)
}

export const TaxonomySEO = ({ title, description }: PageSEOProps) => {
	const ogImage = `${ogUrl}/api/og/image?title=${title}`

	const pathname = usePathname()
	return (
		<>
			<CommonSEO
				title={title}
				description={description}
				ogType="website"
				ogImage={ogImage}
				twImage={ogImage}
			/>
			<link
				rel="alternate"
				type="application/rss+xml"
				title={`${description} - RSS feed`}
				href={`${siteMetadata.siteUrl}${pathname}/feed.xml`}
			/>
		</>
	)
}

export const BlogSEO = ({
	title,
	slug,
	description,
	published_at,
	updated_at,
	url,
	readingTime,
	wordsCount,
	canonicalUrl,
}: BlogSeoProps) => {
	const date = new Date(published_at).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})

	const { views } = useViewsBySlug(slug)
	const { likes } = useSlugReactionsLike(slug)
	const { dislikes } = useSlugReactionsDislike(slug)
	const ogImage = `${ogUrl}/api/og/image?title=${title}&author=${siteMetadata.author.name}&views=${views}&likes=${likes}&dislikes=${dislikes}&time=${readingTime}&words=${wordsCount}&date=${date}`

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
		headline: title,
		image: ogImage,
		datePublished: published_at,
		dateModified: updated_at,
		author: {
			'@type': 'Person',
			name: siteMetadata.author.name,
		},
		publisher: {
			'@type': 'Organization',
			name: siteMetadata.author,
			logo: {
				'@type': 'ImageObject',
				url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
			},
		},
		description: description,
	}

	return (
		<>
			<CommonSEO
				title={title}
				description={description}
				ogType="article"
				ogImage={ogImage}
				twImage={ogImage}
				canonicalUrl={canonicalUrl}
			/>
			{published_at && <meta property="article:published_time" content={published_at} />}
			{updated_at && <meta property="article:modified_time" content={updated_at} />}
			<Script
				id="structured-data-list"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData, null, 2),
				}}
			/>
		</>
	)
}
