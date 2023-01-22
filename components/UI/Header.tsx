import { Nav } from '@/components/UI'

export default function Header() {
	return (
		<header className="absolute z-50 flex w-full flex-col print:hidden">
			<Nav />
		</header>
	)
}
