const SectionContainer = ({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => {
	return className ? (
		<main
			className={`container my-28 mx-auto flex max-w-5xl flex-1 flex-col gap-y-5 px-3 print:h-screen print:items-center print:justify-center ${className}`}
		>
			{children}
		</main>
	) : (
		<main className="container my-28 mx-auto flex max-w-5xl flex-1 flex-col gap-y-5 px-3 print:h-screen print:items-center print:justify-center">
			{children}
		</main>
	)
}

export default SectionContainer
