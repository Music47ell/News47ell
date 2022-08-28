function ChartIcon({ className }: { className?: string }): JSX.Element {
	return (
		<span className={className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M9 6h2v14H9zm4 2h2v12h-2zm4-4h2v16h-2zM5 12h2v8H5z"></path>
			</svg>
		</span>
	)
}

export default ChartIcon
