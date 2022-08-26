import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ResumeLayout from '@/layouts/ResumeLayout'
import { useResume } from '@/hooks/useResume'
import { PageTitle, LoadingSpinner } from '@/components/UI'

export default function Resume(): JSX.Element {
  const { resume, isLoading } = useResume()

  const { basics, education, skills, languages, certificates } = resume

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <main className="mx-auto flex max-w-5xl flex-1 flex-col px-3">
        <header className="print:hidden">
          <div className="space-y-1 py-5 text-center">
            <PageTitle>Resume</PageTitle>
          </div>
        </header>
        {isLoading ? (
          <LoadingSpinner />
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
    </>
  )
}
