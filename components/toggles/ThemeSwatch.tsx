export default function ThemeSwatch({ title, active }): JSX.Element {
	return (
		<div
			className={`${title.toLowerCase()}${
				active ? 'ring-primary ring' : ''
			} flex flex-col items-center rounded bg-nfh-background-primary px-5 py-3 text-nfh-text-primary transition-all hover:scale-105 hover:shadow-lg`}
			data-theme={title.toLowerCase()}
		>
			<span className="text-sm">{title}</span>
			<div className="mt-4 flex -space-x-2">
				<div className={`h-8 w-8 rounded-full border bg-nfh-background-primary`} />
				<div className={`h-8 w-8 rounded-full border bg-nfh-background-secondary`} />
				<div className={`h-8 w-8 rounded-full border bg-nfh-accent-primary`} />
				<div className={`h-8 w-8 rounded-full border bg-nfh-accent-secondary`} />
			</div>
		</div>
	)
}
