'use client'

import { LoaderIcon } from '@/components/icons'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { useResume } from '@/hooks/useGitHub'
import CertificatesLayout from '@/layouts/CertificatesLayout'

export default function Certificates() {
	const { resume, isLoading } = useResume()

	const { certificates } = resume

	if (isLoading) {
		return (
			<SectionContainer className="!max-w-3xl">
				<div className="text-center">
					<PageTitle>Certificates</PageTitle>
				</div>
				<p className="text-center text-base text-nfh-text-secondary">
					This is a complete list of all the certificates I have earned.
				</p>
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			</SectionContainer>
		)
	}

	return <CertificatesLayout certificates={certificates} />
}
