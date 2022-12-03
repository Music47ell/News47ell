import { Turkiye } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function HCard(): JSX.Element {
	return (
		<div className="p-author h-card user-profile relative my-4 flex items-center rounded-md border border-nfh-accent-primary p-2 text-sm">
			<Link
				href="/"
				className="[&>img]:rounded-md"
				aria-label={siteMetadata.headerTitle}
				rel="author"
			>
				<Image
					className="photo u-photo"
					src={siteMetadata.image}
					alt={siteMetadata.author}
					title={siteMetadata.author}
					width={64}
					height={64}
				/>
			</Link>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				<Link
					className="u-email w-48 font-medium"
					href={`mailto:${siteMetadata.email}`}
					rel="me authn"
				>
					<p className="p-name text-sm font-medium">{siteMetadata.author}</p>
				</Link>
				<Link className="u-url u-uid w-48 font-medium" href={siteMetadata.siteUrl}>
					<p className="p-nickname text-sm font-medium">{siteMetadata.nickname}</p>
				</Link>
				<p className="p-role role text-sm font-medium">{siteMetadata.position}</p>
				<p className="p-country-name text-sm font-medium">{siteMetadata.location.country}</p>
				<div className="absolute top-1.5 right-1.5">
					<Turkiye className="p-country-flag inline" />
				</div>
				<p className="p-note note sr-only">
					My name is Ahmet. I'm Full Stack Developer from Türkiye 🇹🇷. This site is where I conduct
					all my experiments, and share my thoughts and ideas.
				</p>
			</div>
		</div>
	)
}
