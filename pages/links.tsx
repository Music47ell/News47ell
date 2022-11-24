import React from 'react'

import {
	EnvelopeIcon,
	GitHubIcon,
	LinkedInIcon,
	PDFIcon,
	RSSIcon,
	SitemapIcon,
	TwitterIcon,
} from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export default function Links() {
	const authorIcons = [TwitterIcon, GitHubIcon, LinkedInIcon, EnvelopeIcon, PDFIcon]
	const blogIcons = [TwitterIcon, RSSIcon, SitemapIcon]
	return (
		<>
			<PageSEO
				title={`Links - ${siteMetadata.author}`}
				description="All my links to socials and other networks you can find me on."
			/>
			{/* background by SVGBackgrounds.com */}
			<main className="container my-8 mx-auto max-w-3xl bg-arrow-up-pattern bg-cover bg-center px-6">
				<h1 className="sr-only">Links</h1>
				<div className="mt-4 flex flex-col items-center justify-center gap-3">
					<div className="h-40 w-40 rounded-full bg-cover bg-center" />
					<div className="flex w-full flex-col space-y-8 py-4">
						{siteMetadata.socialLinks.author.map((l, idx) => {
							const Icon = authorIcons[idx]
							return (
								<Link
									className="group flex items-center justify-between rounded-lg bg-nfh-background-primary/70 py-6 px-8 text-nfh-accent-primary transition hover:bg-nfh-background-primary hover:text-nfh-accent-primary hover:shadow-xl focus:outline-none focus:ring focus:ring-nfh-accent-primary"
									key={l.title}
									href={l.href}
								>
									<Icon className="mr-3 inline-block h-7 w-7 fill-nfh-accent-primary" />
									<span>{l.title}</span>
								</Link>
							)
						})}
					</div>
					<Image
						alt={siteMetadata.author}
						height={150}
						width={150}
						src={siteMetadata.siteLogo}
						priority
						className="rounded-full"
					/>
					<div className="flex w-full flex-col space-y-8 py-4">
						{siteMetadata.socialLinks.blog.map((l, idx) => {
							const Icon = blogIcons[idx]
							return (
								<Link
									className="group flex items-center justify-between rounded-lg bg-nfh-background-primary/70 py-6 px-8 text-nfh-accent-primary transition hover:bg-nfh-background-primary hover:text-nfh-accent-primary hover:shadow-xl focus:outline-none focus:ring focus:ring-nfh-accent-primary"
									key={l.title}
									href={l.href}
								>
									<Icon className="mr-3 inline-block h-7 w-7 fill-nfh-accent-primary" />
									<span>{l.title}</span>
								</Link>
							)
						})}
					</div>
				</div>
			</main>
		</>
	)
}
