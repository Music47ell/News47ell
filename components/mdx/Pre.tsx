import { HTMLAttributes } from 'react'

const Pre = ({ ...props }: HTMLAttributes<HTMLPreElement>) => {
	return (
		<div className="not-prose relative">
			<pre
				className="!overflow-auto border border-solid border-nfh-background-secondary !bg-neutral-800/50 py-3"
				{...props}
			/>
		</div>
	)
}

export default Pre
