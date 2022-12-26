import { ExternalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { useQuote } from '@/hooks/useGitHub'

function Quote(): JSX.Element {
	const { quote, isError, isLoading } = useQuote()

	if (isError) {
		return <p className="py-4 text-center print:hidden">There was an error fetching a quote.</p>
	}

	if (isLoading) {
		return <p className="animate-pulse py-4 text-center print:hidden">Loading a quote...</p>
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
