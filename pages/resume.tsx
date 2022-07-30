import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import PageTitle from '@/components/UI/PageTitle'
import ResumeLayout from '@/layouts/ResumeLayout'
import { useResume } from '@/hooks/useResume'
import { LoadingSpinner } from '@/components/UI/LoadingSpinner'

export default function Resume(): JSX.Element {
  const { resume, isLoading } = useResume()

  const { basics, education, skills, languages, certificates } = resume

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <main className="flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <header className="print:hidden">
          <div className="py-5 space-y-1 text-center">
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
