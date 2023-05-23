type Props = {
	children?: React.ReactNode
}

export default function Divider({ children }: Props): JSX.Element {
	const line = (
		<div className="flex items-center opacity-50">
			<div className="h-px flex-1 bg-current" />
		</div>
	)

	return (
		<div
			className="grid gap-4 text-center text-nfh-accent-primary"
			aria-hidden="true"
			style={{ gridTemplateColumns: '1fr auto 1fr' }}
		>
			{line}
			{children && children}
			{line}
		</div>
	)
}
