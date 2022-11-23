const SectionContainer = ({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) => {
	return className ? (
		<section
			className={`container mx-auto mb-8 flex max-w-5xl flex-1 flex-col gap-y-5 px-3 print:h-screen print:items-center print:justify-center ${className}`}
		>
			{children}
		</section>
	) : (
		<section className="container mx-auto mb-8 flex max-w-5xl flex-1 flex-col gap-y-5 px-3 print:h-screen print:items-center print:justify-center">
			{children}
		</section>
	)
}

export default SectionContainer
