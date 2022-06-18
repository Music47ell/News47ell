import { Giscus } from '@/components/Dynamic'
import siteMetadata from '@/data/siteMetadata'
import { Comment } from 'lib/interfaces'

const Comments = ({ frontMatter }: Comment): JSX.Element => {
  let mapping: string
  switch (siteMetadata.comment.giscusConfig.mapping) {
    case 'pathname':
      mapping = frontMatter.slug
      break
    case 'url':
      mapping = window.location.href
      break
    case 'title':
      mapping = frontMatter.title
      break
  }
  return (
    <>
      {siteMetadata.comment && siteMetadata.comment.provider === 'giscus' && (
        <Giscus mapping={mapping} />
      )}
    </>
  )
}

export default Comments
