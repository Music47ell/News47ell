import { GitHubIcon, LinkedInIcon, MastodonIcon, TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

// orbit animation from https://atila.io/

export default function HeroCard() {
	const orbitIcons = [TwitterIcon, GitHubIcon, LinkedInIcon, MastodonIcon]

	if (typeof window === 'object') {
		const photo = document.querySelector('.hero-photo')
		if (photo) {
			window.addEventListener('deviceorientation', (e) => {
				const tiltLR = e.gamma
				//@ts-ignore
				photo.style.transform = `rotate(${tiltLR * -1}deg)`
			})
		}
	}
	return (
		<section>
			<header className="mx-4 flex flex-col-reverse justify-between rounded-md md:flex-row md:items-center">
				<div className="md:w-8/12">
					<div className="text-xl font-semibold md:text-3xl">
						<h1>Merhaba 👋</h1>
					</div>
					<p>
						My name is Ahmet. I'm Full Stack Developer from
						<span className="font-bold"> Türkiye 🇹🇷</span>
						<br />
						This site is where I conduct all my experiments, and share my thoughts and ideas.
					</p>
				</div>
				<div className="mt-16 flex items-center justify-center">
					<div className="orbit-context relative -top-12 grid h-60 w-60 animate-orbit place-content-center justify-center justify-self-center rounded-full md:h-72 md:w-72 lg:justify-self-start">
						{siteMetadata.orbitLinks.map((link, idx) => {
							const Icon = orbitIcons[idx]
							const iconStyle = [
								'top-0 left-1/2 transition-transform',
								'right-0 top-1/2',
								'bottom-0 right-1/2',
								'left-0 bottom-1/2',
							]
							return (
								<Link
									key={link.title}
									href={link.href}
									rel="me"
									className={`orbit-element absolute animate-orbit-reverse text-3xl transition-all ${iconStyle[idx]}`}
								>
									<Icon className="h-8 w-8 transition-all hover:scale-125 focus:scale-125" />
									<span className="sr-only">{link.title}</span>
								</Link>
							)
						})}
						<div className="block h-40 w-40 overflow-hidden rounded-full border-4 border-nfh-accent-primary hover:border-nfh-accent-secondary md:h-48 md:w-48">
							<Image
								className="orbit-element h-full w-full animate-orbit-reverse rounded-md transition-all"
								src={siteMetadata.author.avatar}
								alt={siteMetadata.author.name}
								height={700}
								width={700}
								priority={true}
							/>
						</div>
					</div>
				</div>
			</header>
		</section>
	)
}
