/* eslint-disable @next/next/no-img-element */
import { Turkiye } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export default function HCard(): JSX.Element {
	return (
		<div className="h-card user-profile relative my-4 mx-auto flex items-center rounded-md border border-nfh-accent-primary p-2 text-sm">
			<img
				className="u-photo h-16 w-16 rounded-md"
				src="/images/others/me.png"
				alt={siteMetadata.author}
			/>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				<Link className="p-name u-email w-48 font-medium" href={`mailto:${siteMetadata.email}`}>
					{siteMetadata.author}
				</Link>
				<a className="u-url u-uid u-email w-48 font-medium" href={siteMetadata.siteUrl}>
					<p className="p-nickname text-sm font-medium">{siteMetadata.nickname}</p>
				</a>
				<p className="p-note text-sm font-medium">{siteMetadata.position}</p>
				<p className="p-country-name text-sm font-medium">
					{siteMetadata.location.country} <Turkiye className="p-country-flag inline h-6 w-6" />
				</p>
			</div>
		</div>
	)
}
