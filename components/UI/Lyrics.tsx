import React, { FC } from 'react'

import { useLyric } from '@/hooks/useLyric'

type Props = {
	citation: boolean
}

const LyricsOverlay: FC<Props> = ({ citation }: Props) => {
	const { lyric } = useLyric()

	return (
		<>
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden px-4 outline-none backdrop-blur  focus:outline-none${
					citation ? 'block' : 'hidden'
				}`}
			>
				<div className="pb-4">
					{lyric.lyric.split('\n').map((text, index) => (
						<p
							key={index}
							className="mt-4 mb-2 text-xl font-medium leading-none text-nfh-text-primary md:my-0 md:text-2xl"
						>
							{text.trim()}
						</p>
					))}
					<div className="pb-4">
						<p className="text-right text-base text-nfh-text-primary">{lyric.band}</p>
						<p className="text-right text-base text-nfh-text-primary">{lyric.song}</p>
					</div>
				</div>
			</div>
			<div
				className={`fixed inset-0 z-40 bg-black opacity-25 ${citation ? 'block' : 'hidden'}`}
			></div>
		</>
	)
}

export default LyricsOverlay
