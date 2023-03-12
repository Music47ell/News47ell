import { freeCodeCampIcon, PostmanIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { ICertificatesLayout } from '@/lib/interfaces'

export default function CertificatesLayout({ certificates }: ICertificatesLayout) {
	const matchIcon = (issuer: string) => {
		switch (issuer) {
			case 'FreeCodeCamp':
				return freeCodeCampIcon({ className: 'w-10 h-10' })
			case 'Postman':
				return PostmanIcon({ className: 'w-10 h-10' })
			default:
				return null
		}
	}

	return (
		<SectionContainer>
			<div className="text-center">
				<PageTitle>Certificates</PageTitle>
			</div>
			<p className="text-center text-base text-nfh-text-secondary">
				This is a complete list of all the certificates I have earned.
			</p>
			<div className="flex flex-col gap-3">
				{certificates
					.sort((a, b) => {
						return new Date(b.issued).getTime() - new Date(a.issued).getTime()
					})
					.map((cer) => {
						return (
							<div
								className="flex flex-col gap-2 rounded-lg bg-nfh-background-secondary p-3 shadow md:flex-row md:items-center md:justify-between md:gap-4"
								key={cer.id}
							>
								<div className="flex items-center gap-3">
									<div className="relative flex items-center justify-center">
										{matchIcon(cer.issuer)}
									</div>
									<div className="flex flex-col ">
										<Link
											href={cer.url}
											className="text-sm font-semibold hover:underline sm:text-base md:text-lg"
										>
											{cer.name}
										</Link>
										<p className="text-xs">
											{cer.issuer} &#x2022; {cer.issued}
										</p>
									</div>
								</div>
								<p className="text-sm"></p>
							</div>
						)
					})}
			</div>
		</SectionContainer>
	)
}
