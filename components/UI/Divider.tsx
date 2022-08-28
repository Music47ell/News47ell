type Props = {
	children?: React.ReactNode
}

export default function Divider({ children }: Props): JSX.Element {
	return (
		<div className="relative flex items-center py-5">
			<div className="grow border-t border-nfh-accent-primary"></div>
			{children && <span className="mx-4 shrink">{children}</span>}
			<div className="grow border-t border-nfh-accent-primary"></div>
		</div>
	)
}
