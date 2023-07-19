interface SectionHeadingProps {
	title: string
	className?: string
}

const SectionHeading = ({ title, className = '' }: SectionHeadingProps) => {
	return (
		<div className={`flex items-center gap-1 text-xl font-medium text-neutral-300 ${className}`}>
			<h2 className="capitalize">{title}</h2>
		</div>
	)
}

export default SectionHeading
