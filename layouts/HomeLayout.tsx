import useSWR from 'swr'
import { LoaderIcon } from '@/components/icons'
import fetcher from '@/lib/fetcher'
import ProfileCard from '@/components/home/ProfileCard'
import BlogPostCard from '@/components/home/BlogPostCard'
import Divider from '@/components/UI/Divider'
import { default as Link } from '@/components/Link'

export default function HomeLayout(): JSX.Element {
  const { data: topViews } = useSWR<{ title: string; slug: string; total: number }[]>(
    `/api/stats/top`,
    fetcher
  )

  const { data: topReactions } = useSWR<{ title: string; slug: string; total: number }[]>(
    `/api/reactions/top`,
    fetcher
  )

  return (
    <main className="container flex flex-col flex-1 px-3 my-8 mx-auto space-y-2 md:space-y-5 max-w-5xl">
      <div className="xl:mt-16 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 items-center py-6 my-4 space-y-2 md:space-y-5">
          <div className="xl:col-span-2 sm:pr-8">
            <p
              className={`mb-8 text-4xl leading-[60px] font-extrabold tracking-tight bg-clip-text md:text-7xl md:leading-[86px]`}
            >
              Howdy, fellow!
            </p>

            <div className="text-lg leading-8">
              <h1>
                I'm <span className="font-medium">Ahmet ALMAZ</span> - 🤘{' '}
                <span className="font-medium">Metalhead</span> and{' '}
                <span className="font-medium">Full Stack Developer</span> in 🇹🇷{' '}
                <span className="font-bold">Türkiye</span>
              </h1>
              <p className="mt-4 mb-8">
                My coding journey started in 2013 with WordPress and PHP.
                <br />
                I also worked with C/C++ in college back in 2018.
                <br />
                I'm currently working on improving my skills with React.
                <br />
                This site is where I conduct all my experiments, and share my thoughts and ideas.
              </p>
              <div className="flex flex-col">
                <Link href="/dashboard" className="hover:underline">
                  Check the dashboard
                </Link>
                <Link href="/blog" className="hover:underline">
                  My writings
                </Link>
                <Link href="/colophon" className="hover:underline">
                  More about me, myself and I.
                </Link>
                <Link href="/now" className="hover:underline">
                  See what I'm doing now
                </Link>
                <Link href="/resume" className="hover:underline">
                  My resume
                </Link>
              </div>
              <p className="my-8">Happy reading</p>
            </div>
          </div>
          <div className="block">
            <ProfileCard />
          </div>
        </div>
      </div>
      {!topViews ? (
        <LoaderIcon className="w-12 h-12 animate-spin fill-nfh-accent-primary" />
      ) : (
        topViews &&
        topViews.length > 0 && (
          <>
            <Divider>Most Viewed</Divider>
            <div className="flex flex-col md:flex-row gap-6">
              {topViews.map((views, index) => (
                <BlogPostCard
                  key={index}
                  title={views.title}
                  slug={views.slug}
                  total={views.total}
                />
              ))}
            </div>
          </>
        )
      )}
      {!topReactions ? (
        <LoaderIcon className="w-12 h-12 animate-spin fill-nfh-accent-primary" />
      ) : (
        topReactions &&
        topReactions.length > 0 && (
          <>
            <Divider>Most Liked</Divider>
            <div className="flex flex-col md:flex-row gap-6">
              {topReactions.map((reaction, index) => (
                <BlogPostCard
                  key={index}
                  title={reaction.title}
                  slug={reaction.slug}
                  total={reaction.total}
                />
              ))}
            </div>
          </>
        )
      )}
    </main>
  )
}
