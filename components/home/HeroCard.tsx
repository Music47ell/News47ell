import { default as Link } from '@/components/Link'
import { BorderEffect } from '@/components/UI'
import { Divider } from '@/components/UI/'
import siteMetadata from '@/data/siteMetadata'
function HeroCard() {
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
				<div className="my-16 flex items-center justify-center">
					<div id="u-photo" className="u-photo grid h-40 w-40 rounded-full bg-cover">
						<div className="relative inline-block h-40 w-40 rounded-full border border-solid border-transparent border-l-nfh-accent-primary align-top motion-safe:animate-loader" />
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
export default HeroCard
