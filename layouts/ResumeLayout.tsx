import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import { SectionContainer } from '@/components/UI'
import { IResumeLayout } from 'lib/interfaces'
import { PDFIcon } from '@/components/icons'

export default function ResumeLayout({
	basics,
	education,
	skills,
	languages,
	certificates,
}: IResumeLayout): JSX.Element {
	const { playMouseClick } = useSFX()

	const downloadResume = async () => {
		/* code source: https://github.com/zhumeisongsong/react-url-image-downloader/blob/main/src/index.tsx
		 */

		const URL = process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/resume-to-pdf`
			: 'http://localhost:3000/api/resume-to-pdf'

		const link = document.createElement('a')

		link.href = URL
		link.setAttribute('download', `Ahmet ALMAZ - Resume.pdf`)
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<SectionContainer>
			<div className="mx-auto max-w-5xl border border-nfh-accent-primary bg-nfh-background-secondary text-nfh-text-primary">
				<div className="lg:text-center">
					<h1 className="text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl"></h1>
				</div>
				<div className="overflow-hidden">
					<div className="p-6 text-left print:p-3">
						<h3 className="text-3xl font-extrabold leading-6">{basics.name}</h3>
						<p className="mt-3 cursor-none text-sm hover:text-türkiye">{basics.location.country}</p>
						<div className="flex space-x-4">
							<Link className="text-sm" href={`mailto:${basics.email}`} aria-label="Email address">
								{basics.email}
							</Link>
							<Link className="text-sm" href={basics.url} aria-label="Link to news47ell.com">
								{basics.url}
							</Link>
						</div>
						<div className="flex space-x-4">
							{basics.profiles.map(({ id, network, url }) => (
								<Link
									key={id}
									className="text-sm"
									href={url}
									onClick={() => playMouseClick()}
									target="_blank"
									rel="noopener noreferrer"
								>
									{network}
								</Link>
							))}
						</div>
						<p className="mt-1 text-sm sm:col-span-2 sm:mt-0">{basics.summary}</p>
					</div>
					<div className="border-t border-nfh-accent-primary">
						<div>
							<div className="p-6 print:p-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<p className="text-sm font-semibold">Educations</p>
								{education.map(({ id, institution, area }) => (
									<p key={id} className="mt-1 text-sm sm:col-span-2 sm:mt-0">
										{institution} | {area}
									</p>
								))}
							</div>
							{skills.map(({ id, name, keywords }) => (
								<div key={id} className="p-6 print:p-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
									<p className="text-sm font-semibold">{name}</p>
									<p className="mt-1 text-sm sm:col-span-2 sm:mt-0">{keywords.join(', ')}</p>
								</div>
							))}
							<div className="p-6 print:p-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<p className="text-sm font-semibold">Languages</p>
								<ul className="mt-1 text-sm sm:col-span-2 sm:mt-0">
									{languages.map(({ id, language, fluency }) => (
										<li key={id} className="mt-1 text-sm sm:mt-0">
											<p className="mt-1 text-sm sm:mt-0">
												{language} | {fluency}
											</p>
										</li>
									))}
								</ul>
							</div>
							<div className="p-6 print:p-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<p className="text-sm font-semibold">Certificates</p>
								<ul className="mt-1 text-sm sm:col-span-2 sm:mt-0">
									{certificates.map(({ id, name, issuer, url }) => (
										<li key={id} className="mt-1 text-sm sm:mt-0">
											<p className="mt-1 text-sm sm:mt-0">
												{name} |{' '}
												<Link href={url} aria-label={`Link to ${name}`}>
													{issuer}
												</Link>
											</p>
										</li>
									))}
								</ul>
							</div>
							<div className="p-6 print:hidden print:p-3 print:py-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<p className="text-sm font-medium print:hidden">Attachments</p>
								<div className="mt-1 text-sm sm:col-span-2 sm:mt-0">
									<div className="rounded-md border border-nfh-accent-primary print:hidden">
										<div
											onClick={downloadResume}
											className="flex items-center justify-between py-3 pr-4 pl-3 text-sm"
										>
											<div className="flex w-0 flex-1 items-center">
												<PDFIcon className="h-7 w-7 fill-nfh-accent-primary" />
												<span className="ml-2 w-0 flex-1 truncate">Download as PDF</span>
											</div>
											<div className="ml-4 shrink-0">
												<button className="font-medium text-nfh-accent-primary hover:text-nfh-text-secondary">
													Download
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</SectionContainer>
	)
}
