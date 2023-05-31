import { HTMLAttributes } from 'react'

const Code = (props: HTMLAttributes<HTMLElement>) => (
	<code
		className="rounded bg-nfh-background-secondary px-1 py-0.5 text-nfh-text-primary"
		{...props}
	/>
)

export default Code
