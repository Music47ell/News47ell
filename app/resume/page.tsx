'use client'

import { LoaderIcon } from '@/components/icons'
import { PageTitle } from '@/components/UI'
import { useResume } from '@/hooks/useGitHub'
import ResumeLayout from '@/layouts/ResumeLayout'

export default function Resume() {
	const { resume, isLoading } = useResume()

	const { basics, education, skills, languages, certificates } = resume

	return (
		<main className="mx-auto flex max-w-5xl flex-1 flex-col px-3">
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
		</main>
	)
}
