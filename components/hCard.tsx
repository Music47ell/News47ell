import { Turkiye } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

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
		<div className="h-card user-profile relative my-4 mx-auto flex items-center rounded-md border border-nfh-accent-primary p-2 text-sm">
			<Image
				alt={siteMetadata.author}
				className="h-16 w-16 rounded-md"
				height={64}
				width={64}
				src="/images/others/me.png"
			/>
			<div className="ml-3 flex flex-col items-start justify-center text-ellipsis">
				<Link className="p-name u-email w-48 font-medium" href={`mailto:${siteMetadata.email}`}>
					{siteMetadata.author}
				</Link>
				<p className="p-nickname text-sm font-medium">{siteMetadata.nickname}</p>
				<p className="p-country-name text-sm font-medium">{siteMetadata.location}</p>
			</div>
			<div className="absolute bottom-1.5 right-1.5">
				<Turkiye className="p-country-flag m-auto h-6 w-6" />
			</div>
		</div>
	)
}
