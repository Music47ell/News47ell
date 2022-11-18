import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { Turkiye } from '@/components/icons'

export default function HCard(): JSX.Element {
	if (typeof window === 'object') {
		const photo = document.querySelector('.u-photo')
		if (photo) {
			window.addEventListener('deviceorientation', (e) => {
				const tiltLR = e.gamma
				//@ts-ignore
				photo.style.transform = `rotate(${tiltLR * -1}deg)`
			})
		}
	}

	return (
		<div className="h-card user-profile mb-4 flex items-center rounded-lg border border-nfh-accent-primary p-2 text-sm text-nfh-text-primary">
			<div id="u-photo" className="u-photo h-16 w-16 rounded-full bg-cover" />
			<div className="mx-3 flex flex-col items-start justify-center">
				<Link
					className="p-name u-email w-48 truncate font-medium"
					href={`mailto:${siteMetadata.email}`}
				>
					{siteMetadata.author}
				</Link>
				<p className="p-nickname w-48 truncate font-medium">{siteMetadata.nickname}</p>
				<p className="w-48 truncate font-medium">
					<Link
						className="p-note u-url w-48 space-y-0 truncate font-medium"
						href={siteMetadata.siteUrl}
					>
						{siteMetadata.position}
					</Link>
				</p>
				<p className="p-country-name w-48 truncate">{siteMetadata.location}</p>
			</div>
			<Turkiye className="p-country-flag m-auto h-10 w-10" />
		</div>
	)
}
