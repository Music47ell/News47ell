export default function InfiniteLoopSlider({ children, duration, direction }) {
	return (
		<div>
			<div
				style={{
					animation: `loop ${duration}ms linear infinite ${direction}`,
				}}
				className="flex w-fit"
			>
				{children}
				{children}
			</div>
		</div>
	)
}
