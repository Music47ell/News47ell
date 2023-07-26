interface OverviewItemProps {
	label: string
	value: string | number
}

const OverviewItem = ({ label, value }: OverviewItemProps) => (
	<div className="flex flex-col space-y-1 rounded-xl border border-neutral-800 bg-nfh-background-secondary px-4 py-3 sm:col-span-1">
		<span className="text-sm text-nfh-text-primary">{label}</span>
		<span>{value}</span>
	</div>
)

export default OverviewItem
