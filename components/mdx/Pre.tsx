import { HTMLAttributes } from 'react'

const Pre = ({ ...props }: HTMLAttributes<HTMLPreElement>) => {
	return (
		<div className="not-prose relative">
			<pre className="!overflow-auto bg-neutral-800/50 py-3" {...props} />
		</div>
	)
}

export default Pre
