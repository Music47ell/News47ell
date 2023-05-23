export default function BorderEffect({ bgColor }: { bgColor?: string }): JSX.Element {
	return (
		<>
			<div
				style={{
					background: bgColor,
				}}
				className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 duration-300 group-hover:scale-x-100"
			></div>
			<div
				style={{
					background: bgColor,
				}}
				className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 duration-300 group-hover:scale-y-100"
			></div>
			<div
				style={{
					background: bgColor,
				}}
				className="absolute left-0 top-0 h-0.5 w-full origin-right scale-x-0 duration-300 group-hover:scale-x-100"
			></div>
			<div
				style={{
					background: bgColor,
				}}
				className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 duration-300 group-hover:scale-y-100"
			></div>
		</>
	)
}
