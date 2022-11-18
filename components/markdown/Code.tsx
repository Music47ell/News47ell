const Code = ({ node, inline, children, ...props }) => {
	return !inline ? (
		<>{children}</>
	) : (
		<code
			className="rounded bg-nfh-background-secondary py-0.5 px-1 text-nfh-text-primary"
			{...props}
		>
			{children}
		</code>
	)
}

export default Code
