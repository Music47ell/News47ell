import playSparkline from '@/utils/play-sparkline'

interface IProps {
	text: string
}

export default function FeaturedArt({ text }: IProps) {
	const notes = `[${text
		.split('')
		.map((char) => (char === ' ' ? 0 : (char.charCodeAt(0) % 26) * 5 + 36))}]`

	const notesArray = JSON.parse(notes)

	const onClickHandler = () => {
		playSparkline(notesArray)
	}

	return (
		<button
			aria-label="Play"
			className="m-auto flex w-full flex-col items-center overflow-hidden"
			onClick={onClickHandler}
		>
			<div className="col-start-1 row-start-1 flex overflow-hidden">
				{text.split('').map((char, i) => (
					<div
						key={i}
						className="flex min-w-[9px] select-none overflow-hidden bg-nfh-accent-primary text-3xl uppercase text-transparent"
						style={{ height: char === ' ' ? 0 : (char.charCodeAt(0) % 26) * 5 + 36 }}
					>
						{char}
					</div>
				))}
			</div>
		</button>
	)
}
