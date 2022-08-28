const Table = ({ title, value, ranking }): JSX.Element => (
	<dl>
		<div
			className={`${
				ranking % 2 === 0 ? 'bg-nfh-background-primary' : 'bg-nfh-background-secondary'
			} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
		>
			<dt className="text-sm font-medium leading-5">{title}</dt>
			<dd className="mt-1 text-sm leading-5 sm:col-span-2 sm:mt-0">{value}</dd>
		</div>
	</dl>
)

export default Table
