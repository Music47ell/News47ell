import { ExternalIcon } from '@/components/icons'
import { default as Link } from '@/components/Link'
import { useQuote } from '@/hooks/useGitHub'

function Quote(): JSX.Element {
	const { quote, isError, isLoading } = useQuote()

	if (isError) {
		return (
			<p className="flex flex-1 items-center justify-center print:hidden">
				There was an error fetching a quote.
			</p>
		)
	}

	if (isLoading) {
		return (
			<p className="flex flex-1 animate-pulse items-center justify-center print:hidden">
				Loading a quote...
			</p>
		)
	}

	return (
		<p key={quote.id} className="flex flex-1 items-center justify-center print:hidden">
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
