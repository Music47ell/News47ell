import { default as Link } from '@/components/Link'
import { IPostDate } from '@/lib/interfaces'
import { displayDate, hEntryDate } from '@/utils/format-date'
import shaToHex from '@/utils/sha-to-hex'

export default function PostDate({
	published_at,
	updated_at,
	firstCommitHash,
	lastCommitHash,
	slug,
	isCommitDataLoading,
}: IPostDate) {
	return (
		<div className="mt-14 flex items-center justify-center gap-4">
			{isCommitDataLoading ? (
				'---'
			) : updated_at && updated_at !== published_at ? (
				<>
					<div
						style={{
							backgroundColor: `#${shaToHex(firstCommitHash)}`,
						}}
						className="tooltip h-3 w-3 rounded-none "
						aria-label="Fist commit hash color"
					/>
					<span className="sr-only">Updated on</span>
					<Link href={slug} className="u-url">
						<time
							dateTime={hEntryDate(updated_at)}
							className="dt-published tooltip"
							aria-label={`Published at: ${displayDate(published_at)}`}
						>
							{displayDate(updated_at)}
						</time>
					</Link>
					<div
						style={{
							backgroundColor: `#${shaToHex(lastCommitHash)}`,
						}}
						className="tooltip h-3 w-3 rounded-none "
						aria-label="Last commit hash color"
					/>
				</>
			) : (
				<>
					<div
						style={{
							backgroundColor: `#${shaToHex(firstCommitHash)}`,
						}}
						className="h-3 w-3 rounded-none"
					/>
					<span className="sr-only">Published on</span>
					<Link href={slug} className="u-url">
						<time
							dateTime={hEntryDate(published_at)}
							className="dt-published tooltip"
							aria-label="Published at"
						>
							{displayDate(published_at)}
						</time>
					</Link>
					<div
						style={{
							backgroundColor: `#${shaToHex(lastCommitHash)}`,
						}}
						className="h-3 w-3 rounded-none"
					/>
				</>
			)}
		</div>
	)
}
