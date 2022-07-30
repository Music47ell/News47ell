import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'
import SectionContainer from '@/components/UI/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { IResumeLayout } from 'lib/interfaces'

export default function ResumeLayout({
  basics,
  education,
  skills,
  languages,
  certificates,
}: IResumeLayout): JSX.Element {
  const { playMouseClick } = useSFX()

  const downloadResume = async () => {
    /* code source: https://github.com/zhumeisongsong/react-url-image-downloader/blob/main/src/index.tsx
     */

    const URL = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/resume-to-pdf`
      : 'http://localhost:3000/api/resume-to-pdf'

    const link = document.createElement('a')

    link.href = URL
    link.setAttribute('download', `Ahmet ALMAZ - Resume.pdf`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <SectionContainer>
      <div className="mx-auto max-w-5xl text-nfh-text-primary bg-nfh-background-secondary border border-nfh-accent-primary">
        <div className="lg:text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-8"></h1>
        </div>
        <div className="overflow-hidden">
          <div className="print:p-3 p-6 text-left">
            <h3 className="text-3xl font-extrabold leading-6">{basics.name}</h3>
            <p className="mt-3 text-sm hover:text-türkiye cursor-none">{basics.location.country}</p>
            <Link className="text-sm" href={`mailto:${basics.email}`}>
              {basics.email}
            </Link>
            <div className="flex space-x-4">
              {basics.profiles.map(({ id, network, url }) => (
                <Link
                  key={id}
                  className="text-sm"
                  href={url}
                  onClick={() => playMouseClick()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {network}
                </Link>
              ))}
            </div>
            <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm">{basics.summary}</p>
          </div>
          <div className="border-t border-nfh-accent-primary">
            <div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 print:p-3 p-6 sm:px-6">
                <p className="text-sm font-semibold">Educations</p>
                {education.map(({ id, institution, area }) => (
                  <p key={id} className="sm:col-span-2 mt-1 sm:mt-0 text-sm">
                    {institution} | {area}
                  </p>
                ))}
              </div>
              {skills.map(({ id, name, keywords }) => (
                <div key={id} className="sm:grid sm:grid-cols-3 sm:gap-4 print:p-3 p-6 sm:px-6">
                  <p className="text-sm font-semibold">{name}</p>
                  <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm">{keywords.join(', ')}</p>
                </div>
              ))}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 print:p-3 p-6 sm:px-6">
                <p className="text-sm font-semibold">Languages</p>
                <ul className="sm:col-span-2 mt-1 sm:mt-0 text-sm">
                  {languages.map(({ id, language, fluency }) => (
                    <li key={id} className="mt-1 sm:mt-0 text-sm">
                      <p className="mt-1 sm:mt-0 text-sm">
                        {language} | {fluency}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 print:p-3 p-6 sm:px-6">
                <p className="text-sm font-semibold">Certificates</p>
                <ul className="sm:col-span-2 mt-1 sm:mt-0 text-sm">
                  {certificates.map(({ id, name, issuer, url }) => (
                    <li key={id} className="mt-1 sm:mt-0 text-sm">
                      <p className="mt-1 sm:mt-0 text-sm">
                        {name} |{' '}
                        <Link href={url} aria-label={`Link to ${name}`}>
                          {issuer}
                        </Link>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="print:hidden sm:grid sm:grid-cols-3 sm:gap-4 print:p-3 p-6 print:py-0 sm:px-6">
                <p className="print:hidden text-sm font-medium">Attachments</p>
                <div className="sm:col-span-2 mt-1 sm:mt-0 text-sm">
                  <div className="print:hidden rounded-md border border-nfh-accent-primary">
                    <div
                      onClick={downloadResume}
                      className="flex justify-between items-center py-3 pr-4 pl-3 text-sm"
                    >
                      <div className="flex flex-1 items-center w-0">
                        <svg
                          className="flex-shrink-0 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="flex-1 ml-2 w-0 truncate">Download PDF version</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <button className="font-medium text-nfh-accent-primary hover:text-nfh-text-secondary">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="print:block hidden py-5 text-center" itemProp="copyrightYear">
                COPYRIGHT © 2013 / <span className="year">{new Date().getFullYear()}</span>
                {` `}
                <Link href={basics.url} aria-label="Link to news47ell.com">
                  {siteMetadata.altTitle}
                </Link>
                . ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
