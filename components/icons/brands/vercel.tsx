function VercelIcon({ className }: { className?: string }): JSX.Element {
	return (
		<span className={className}>
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<title>Vercel</title>
				<path fill="#000000" d="M24 22.525H0l12-21.05 12 21.05z" />
			</svg>
		</span>
	)
}

export default VercelIcon
