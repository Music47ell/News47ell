const Code = ({ node, inline, className, children, ...props }) => {
	const match = /language-(\w+)/.exec(className || '')

	return !inline && match ? (
		<>{children}</>
	) : (
		<code
			className={`${className} rounded bg-nfh-background-secondary py-0.5 px-1 text-nfh-text-primary`}
			{...props}
		>
			{children}
		</code>
	)
}

export default Code
