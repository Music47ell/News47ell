import { Turkiye } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function HCard(): JSX.Element {
	return (
		<div className="p-author h-card user-profile relative my-2 flex items-center rounded-md border border-nfh-accent-primary bg-nfh-background-secondary p-2 text-sm">
			<Link href="/" className="[&>img]:rounded-md" aria-label={siteMetadata.title} rel="author">
				<Image
					className="photo u-photo"
					src={siteMetadata.author.avatar}
					alt={siteMetadata.author.name}
					title={siteMetadata.author.name}
					width={64}
					height={64}
				/>
			</Link>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				<Link className="u-email font-medium" href={`mailto:${siteMetadata.email}`} rel="me authn">
					<p className="p-name text-sm font-medium">{siteMetadata.author.name}</p>
				</Link>
				<Link className="u-url u-uid font-medium" href={siteMetadata.siteUrl}>
					<p className="p-nickname text-sm font-medium">{siteMetadata.author.username}</p>
				</Link>
				<p className="p-role role text-sm font-medium">{siteMetadata.author.occupation}</p>
				<p className="p-country-name text-sm font-medium">{siteMetadata.author.location.country}</p>
				<div className="absolute right-1.5 top-1.5">
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
