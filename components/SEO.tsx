import { BlogSeoProps, CommonSEOProps, PageSEOProps } from 'lib/interfaces'
import Head from 'next/head'
import { useRouter } from 'next/router'

import siteMetadata from '@/data/siteMetadata'
import { useSlugReactionsDislike, useSlugReactionsLike } from '@/hooks/useReactions'
import { useViewsBySlug } from '@/hooks/useViews'

const ogUrl = process.env.NODE_ENV === 'production' ? siteMetadata.siteUrl : 'http://localhost:3000'

const CommonSEO = ({ title, description, ogType, ogImage, twImage }: CommonSEOProps) => {
	const router = useRouter()

	return (
		<Head>
			<meta
				name="robots"
				content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
			/>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={`${siteMetadata.siteUrl}${router.asPath}`} />
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

			{/*Preconnect/Prefetch Meta Tags*/}
			<link rel="preconnect" href="https://vitals.vercel-insights.com" />

			{/*Open Graph Meta Tags*/}
			<meta property="og:locale" content={siteMetadata.locale} />
			<meta property="og:type" content={ogType} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
			<meta property="og:site_name" content={siteMetadata.title} />
			{Array.isArray(ogImage) ? (
				ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
			) : (
				<meta property="og:image" content={ogImage} key={ogImage} />
			)}
			<meta property="og:image:width" content="1600" />
			<meta property="og:image:height" content="836" />
			<meta property="og:image:alt" content={title} />

			{/*Twitter Meta Tags*/}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={siteMetadata.twitter} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={twImage} />

			{/* Webmention Meta Tags */}
			<link rel="webmention" href={`https://webmention.io/${siteMetadata.webmention}/webmention`} />
			<link rel="pingback" href={`https://webmention.io/${siteMetadata.webmention}/xmlrpc`} />
		</Head>
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

	const router = useRouter()
	return (
		<>
			<CommonSEO
				title={title}
				description={description}
				ogType="website"
				ogImage={ogImage}
				twImage={ogImage}
			/>
			<Head>
				<link
					rel="alternate"
					type="application/rss+xml"
					title={`${description} - RSS feed`}
					href={`${siteMetadata.siteUrl}${router.asPath}/feed.xml`}
				/>
			</Head>
		</>
	)
}

export const BlogSEO = ({
	authorDetails,
	title,
	slug,
	description,
	published_at,
	updated_at,
	url,
	readingTime,
}: BlogSeoProps) => {
	const publishedAt = new Date(published_at).toString()
	const updatedAt = new Date(updated_at).toString()

	const date = new Date(publishedAt).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})

	const author = authorDetails.first_name + ' ' + authorDetails.last_name

	const { views } = useViewsBySlug(slug)
	const { likes } = useSlugReactionsLike(slug)
	const { dislikes } = useSlugReactionsDislike(slug)
	const ogImage = `${ogUrl}/api/og/image?title=${title}&author=${author}&views=${views}&likes=${likes}&dislikes=${dislikes}&time=${readingTime.time}&words=${readingTime.words}&date=${date}`

	const authorList = {
		'@type': 'Person',
		name: author,
	}

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
		headline: title,
		image: ogImage,
		datePublished: publishedAt,
		dateModified: updatedAt,
		author: authorList,
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
			/>
			<Head>
				{published_at && <meta property="article:published_time" content={publishedAt} />}
				{updated_at && <meta property="article:modified_time" content={updatedAt} />}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData, null, 2),
					}}
				/>
			</Head>
		</>
	)
}
