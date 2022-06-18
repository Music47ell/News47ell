import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import resumeEN from '@/data/resume'
import { default as Link } from '@/components/Link'

export default function ResumeEN(): JSX.Element {
  return (
    <>
      <PageSEO title={`Resume - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="mx-auto max-w-5xl">
        <div className="lg:text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-8 text-gray-900"></h1>
        </div>
        <div className="overflow-hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="py-5 px-4 sm:px-6 text-left">
            <h3 className="text-3xl font-extrabold leading-6 text-gray-900 dark:text-gray-100">
              {siteMetadata.author}
            </h3>
            <p className="mt-3 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
              {siteMetadata.location}
            </p>
            <Link
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-200"
              href={`mailto:${siteMetadata.email}`}
            >
              {siteMetadata.email}
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-900">
            <div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-200">Profile</p>
                <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-100">
                  {resumeEN.profile}
                </p>
              </div>
              {resumeEN.educations.map(({ title }) => (
                <div
                  key={title}
                  className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-white dark:bg-gray-800"
                >
                  <p className="text-sm font-semibold text-black dark:text-white">Educations</p>
                  <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200">
                    {title}
                  </p>
                </div>
              ))}
              {resumeEN.skills.map(({ title, description }) => (
                <div
                  key={title}
                  className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-white dark:bg-gray-800"
                >
                  <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
                  <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200">
                    {description}
                  </p>
                </div>
              ))}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-white dark:bg-gray-800">
                <p className="text-sm font-semibold text-black dark:text-white">Certificates</p>
                <ul className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200">
                  {resumeEN.certificates.map(({ title, provider, href }) => (
                    <li
                      key={title}
                      className="mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200"
                    >
                      <p className="mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200">
                        {title} |{' '}
                        <Link href={href} aria-label={`Link to ${title}`}>
                          {provider}
                        </Link>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {/*{resumeEN.jobs.map(({ title, employer, skills, description }) => (
                <div
                  key={employer}
                  className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-white dark:bg-gray-800"
                >
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    <span className="font-semibold text-black dark:text-white">{title}</span>
                    <br />
                    {employer}
                  </p>
                  <p className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-200">
                    {description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300">{skills}</p>
                </div>
              ))}*/}
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 py-5 px-4 sm:px-6 bg-white dark:bg-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300">Attachments</p>
                <div className="sm:col-span-2 mt-1 sm:mt-0 text-sm text-gray-900 dark:text-gray-300">
                  <div className="rounded-md border border-gray-200 dark:border-gray-900 divide-y divide-gray-200">
                    <Link
                      href="https://docs.google.com/document/d/1Dwxb2b1WVc6Rqs1h5RIowcnDVD74oUywamlHJkLFso8"
                      target="_blank"
                      className="flex justify-between items-center py-3 pr-4 pl-3 text-sm"
                    >
                      <div className="flex flex-1 items-center w-0">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-400"
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
                        <span className="flex-1 ml-2 w-0 truncate">Google Docs/PDF version</span>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <span className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-400">
                          Download
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
