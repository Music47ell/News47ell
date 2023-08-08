import { ReactNode } from 'react'
import Balancer from 'react-wrap-balancer'

interface IPageTitle {
	children: ReactNode
}

export default function PageTitle({ children }: IPageTitle): JSX.Element {
	return (
		<h1 className="p-name text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl">
			<Balancer>{children}</Balancer>
		</h1>
	)
}
