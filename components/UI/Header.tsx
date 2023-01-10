import { Nav } from '@/components/UI'

export default function Header() {
	return (
		<header className="flex flex-col print:hidden">
			<Nav />
		</header>
	)
}
