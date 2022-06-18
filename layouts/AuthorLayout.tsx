import { BiEnvelope } from 'react-icons/bi'
import { SiTwitter } from 'react-icons/si'
import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'

import { Authors } from 'lib/interfaces'

import { getGravatar } from '@/utils/getGravatar'

export default function AuthorLayout({ author, posts }: Authors): JSX.Element {
  const { name, bio, email, twitter } = author

  return (
    <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
      <div className="xl:grid xl:grid-cols-3 xl:gap-x-8 items-start pb-8 space-y-2 xl:space-y-0">
        <div className="flex flex-col items-center pt-8 space-x-2">
          <Image
            src={getGravatar(email, 192)}
            alt="avatar"
            width="192px"
            height="192px"
            className="w-48 h-48 rounded-full"
          />
          <h3 className="pt-4 pb-2 text-2xl font-bold tracking-tight leading-8">{name}</h3>
          <div className="flex pt-6 space-x-3">
            <Link href={`mailto:${email}`}>
              <BiEnvelope className="w-6 h-6" />
            </Link>
            {twitter && (
              <Link href={`https://twitter.com/${twitter}`} className="">
                <SiTwitter className="w-6 h-6 text-twitter" />
              </Link>
            )}
          </div>
        </div>
        <div className="xl:col-span-2 pt-8 pb-8 max-w-none prose prose-theme">
          {bio}
          {posts.map((post: { slug: string; title: string }, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <li className="list-none">{post.title}</li>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
