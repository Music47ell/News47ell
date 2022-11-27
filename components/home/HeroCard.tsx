import { GitHubIcon, LinkedInIcon, MastodonIcon, TwitterIcon } from '@/components/icons'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { Divider } from '@/components/UI/'
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
		<div>
			<header className="mx-4 flex flex-col-reverse justify-between rounded-md md:flex-row md:items-center">
				<div className="md:w-8/12">
					<div className="space-y-2">
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
				</div>
				<div className="mt-16 flex items-center justify-center">
					<div className="orbit-context relative -top-12 grid h-72 w-72 animate-orbit place-content-center justify-center justify-self-center rounded-full lg:justify-self-start">
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
						<div className="block h-48 w-48 overflow-hidden rounded-full border-4 border-nfh-accent-primary hover:border-nfh-accent-secondary">
							<Image
								className="orbit-element h-full w-full animate-orbit-reverse rounded-md transition-all"
								src={siteMetadata.image}
								alt={siteMetadata.author}
								height={700}
								width={700}
								priority={true}
							/>
						</div>
					</div>
				</div>
			</header>
			<Divider>/</Divider>
			<section>
				<div className="mt-4 grid gap-4 md:grid-cols-2">
					{siteMetadata.heroCardLinks.map((link, index) => (
						<Link
							key={index}
							href={link.href}
							className="group relative w-full cursor-pointer bg-nfh-background-secondary/50 p-4 transition duration-500 hover:bg-nfh-background-secondary"
						>
							<BorderEffect />
							{link.title}
						</Link>
					))}
				</div>
			</section>
		</div>
	)
}
