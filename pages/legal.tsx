import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import { SectionContainer } from '@/components/UI'

export default function Legal(): JSX.Element {
  return (
    <>
      <PageSEO title={`Legal - ${siteMetadata.author}`} description={siteMetadata.description} />
      <SectionContainer>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Legal
            </h1>
          </div>
          <div className="container py-6">
            <h3 className="py-4 text-3xl font-bold leading-8 tracking-tight">Privacy Policy</h3>
            <p className="text-base text-gray-500 dark:text-gray-200">
              View our <Link href="/privacy-policy">privacy policy</Link>.
            </p>
            <h3 className="py-4 text-3xl font-bold leading-8 tracking-tight">Disclaimer</h3>
            <p className="text-base text-gray-500 dark:text-gray-200">
              View our <Link href="/disclaimer">disclaimer</Link>.
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
