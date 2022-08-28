export default function TotalReactions({ reactionsCount }) {
	return (
		<div className="flex items-center rounded-lg text-center">
			<h2 className="m-0 text-3xl font-bold">{reactionsCount}</h2>
		</div>
	)
}
