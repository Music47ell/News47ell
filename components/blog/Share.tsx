import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { IShare } from 'lib/interfaces'
import { useState } from 'react'

export default function Share({ title, slug }: IShare): JSX.Element {
  const url = `${siteMetadata.siteUrl}/blog/${slug}`
  const twitterLink = `https://twitter.com/intent/tweet/?text=${title}&url=${encodeURIComponent(
    url
  )}/&via=News47ell`
  const pocketLink = `https://getpocket.com/edit?url=${encodeURIComponent(url)}`
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(url)}`

  const [shareSucceed, setShareSucceed] = useState(false)
  return (
    <div className="pt-6 pb-6 text-sm text-center">
      <button
        onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({
                title: title,
                text: `${title}`,
                url: url,
              })
            } catch (err) {
              console.error('Error: ' + err)
            }
          } else {
            navigator.clipboard
              .writeText(url)
              .then(() => {
                setShareSucceed(true)
              })
              .catch((err) => console.error('Error: ' + err))
          }
        }}
      >
        SHARE ME!!!
      </button>
      {shareSucceed && (
        <div className="mt-4">
          <Link href={discussUrl} rel="nofollow">
            {'Discuss on Twitter'}
          </Link>
          {` • `}
          <Link href={twitterLink} target="_blank" rel="nofollow">
            {'Share on Twitter'}
          </Link>
          {` • `}
          <Link href={pocketLink} target="_blank" rel="nofollow">
            {'Save to Pocket'}
          </Link>
        </div>
      )}
    </div>
  )
}
