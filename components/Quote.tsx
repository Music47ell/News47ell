import { BiLinkExternal } from 'react-icons/bi'
import { useQuote } from '@/hooks/useQuote'
import { default as Link } from '@/components/Link'

function Quote(): JSX.Element {
  const { quote } = useQuote()

  if (!quote) {
    return null
  }

  return (
    <p key={quote.id} className="print:hidden py-4 text-center">
      {quote.quote}
      {quote.link && (
        <Link href={quote.link}>
          <BiLinkExternal className="inline-block ml-2 align-text-top" />
        </Link>
      )}
    </p>
  )
}

export default Quote
