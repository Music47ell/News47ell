import { IPageTitle } from 'lib/interfaces'

export default function PageTitle({ children }: IPageTitle): JSX.Element {
	return (
		<h1
			itemProp="name headline"
			className=" text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
		>
			{children}
		</h1>
	)
}
