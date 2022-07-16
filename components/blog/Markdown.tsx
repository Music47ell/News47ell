/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown, { Options } from 'react-markdown'
import { default as Link } from '@/components/Link'

export default function Markdown({ children }): JSX.Element {
  const customRenderers: Options['components'] = {
    p: ({ node, children }: { node: any; children: any }) => {
      if (node.children[0].tagName === 'img') {
        const image: any = node.children[0]
        const src = `https://res.cloudinary.com/music47ell/image/upload/news47ell${image.properties.src}`

        return (
          <>
            <div className="flex justify-center">
              <img src={src} alt={image.properties.alt} width="600" height="300" />
            </div>
            <span className="flex justify-center">
              <Link href={src}>View full res image</Link>
            </span>
          </>
        )
      }

      return <p>{children}</p>
    },
  }

  return (
    <ReactMarkdown className="prose prose-theme" components={customRenderers}>
      {children}
    </ReactMarkdown>
  )
}
