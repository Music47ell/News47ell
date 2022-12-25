import { HTMLAttributes } from 'react'

const Code = (props: HTMLAttributes<HTMLElement>) => (
	<code
		className="rounded bg-nfh-background-secondary py-0.5 px-1 text-nfh-text-primary"
		{...props}
	/>
)

export default Code
