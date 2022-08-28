function MenuIcon({ className }: { className?: string }): JSX.Element {
	return (
		<span className={className}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
			</svg>
		</span>
	)
}

export default MenuIcon
