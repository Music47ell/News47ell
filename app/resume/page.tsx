'use client'

import { LoaderIcon } from '@/components/icons'
import { SectionContainer } from '@/components/UI'
import { PageTitle } from '@/components/UI'
import { useResume } from '@/hooks/useGitHub'
import ResumeLayout from '@/layouts/ResumeLayout'

export default function Resume() {
	const { resume, isLoading } = useResume()

	const { basics, education, skills, languages, certificates } = resume

	return (
		<SectionContainer>
			<div className="text-center print:hidden">
				<PageTitle>Resume</PageTitle>
			</div>
			{isLoading ? (
				<div className="flex justify-center">
					<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
				</div>
			) : (
				<ResumeLayout
					basics={basics}
					education={education}
					skills={skills}
					languages={languages}
					certificates={certificates}
				/>
			)}
		</SectionContainer>
	)
}
