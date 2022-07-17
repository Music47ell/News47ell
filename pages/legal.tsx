import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import SectionContainer from '@/components/UI/SectionContainer'

export default function Legal(): JSX.Element {
  return (
    <>
      <PageSEO title={`Legal - ${siteMetadata.author}`} description={siteMetadata.description} />
      <SectionContainer>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-9 sm:leading-10 md:leading-14">
              Legal
            </h1>
          </div>
          <div className="container py-6">
            <h3 className="py-4 text-3xl font-bold tracking-tight leading-8">Privacy Policy</h3>
            <p className="text-base text-gray-500 dark:text-gray-200">
              View our <Link href="/privacy-policy">privacy policy</Link>.
            </p>
            <h3 className="py-4 text-3xl font-bold tracking-tight leading-8">Disclaimer</h3>
            <p className="text-base text-gray-500 dark:text-gray-200">
              View our <Link href="/disclaimer">disclaimer</Link>.
            </p>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
