function ClipboardCheckIcon({ className }: { className?: string }): JSX.Element {
	return (
		<span className={className}>
			<svg
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				stroke="currentColor"
				fill="none"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
				/>
			</svg>
		</span>
	)
}

export default ClipboardCheckIcon
