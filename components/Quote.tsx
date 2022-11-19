import { ExternalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { useQuote } from '@/hooks/useQuote'

function Quote(): JSX.Element {
	const { quote } = useQuote()

	if (!quote) {
		return null
	}

	return (
		<p key={quote.id} className="py-4 text-center print:hidden">
			{quote.quote}
			{quote.link && (
				<Link href={quote.link}>
					<ExternalIcon className="ml-2 inline-block h-6 w-6 fill-current align-bottom" />
				</Link>
			)}
		</p>
	)
}

export default Quote
