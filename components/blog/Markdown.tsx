/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown, { Options } from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
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
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          // eslint-disable-next-line react/no-children-prop
          children={String(children).replace(/\n$/, '')}
          style={dracula as any}
          language={match[1]}
          PreTag="div"
          {...props}
          showLineNumbers
        />
      ) : (
        <code
          className={`${className} bg-nfh-background-secondary text-nfh-text-primary py-0.5 px-1 rounded`}
          {...props}
        >
          {children}
        </code>
      )
    },
  }

  return (
    <ReactMarkdown className="max-w-none prose prose-theme" components={customRenderers}>
      {children}
    </ReactMarkdown>
  )
}
