import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import PageTitle from '@/components/UI/PageTitle'
import ResumeLayout from '@/layouts/ResumeLayout'
import { getResume } from '@/lib/github'

export async function getStaticProps() {
  const response = await getResume()
  const json = await response.json()

  const content = await json.files['resume.json'].content
  const data = await JSON.parse(content)

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      basics: data.basics,
      education: data.education,
      certificates: data.certificates,
      skills: data.skills,
      languages: data.languages,
    },
    revalidate: 10,
  }
}

export default function Resume({
  basics,
  education,
  certificates,
  skills,
  languages,
}): JSX.Element {
  if (!basics) return <div></div>

  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <main className="flex flex-col flex-1 px-3 mx-auto max-w-5xl">
        <header className="print:hidden">
          <div className="py-5 space-y-1 text-center">
            <div>
              <PageTitle>Resume</PageTitle>
            </div>
          </div>
        </header>
        <ResumeLayout
          basics={basics}
          education={education}
          skills={skills}
          languages={languages}
          certificates={certificates}
        />
      </main>
    </>
  )
}
