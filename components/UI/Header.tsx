import { Nav } from '@/components/UI'

export default function Header() {
	return (
		<header className="flex w-full flex-col print:hidden">
			<Nav />
		</header>
	)
}
