import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import PageTitle from '@/components/UI/PageTitle'
import { ResumeEN } from '@/components/resume'

export default function Resume(): JSX.Element {
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <main className="flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <header>
          <div className="py-5 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
            <div>
              <PageTitle>Resume</PageTitle>
            </div>
          </div>
        </header>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ResumeEN />
          </div>
        </div>
      </main>
    </>
  )
}
