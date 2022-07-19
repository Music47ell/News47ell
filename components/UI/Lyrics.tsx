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
        className={`overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center px-4 backdrop-filter backdrop-blur outline-none  flex focus:outline-none ${
          citation ? 'block' : 'hidden'
        }`}
      >
        <div className="pb-4">
          {lyric.lyric.split('\n').map((text, index) => (
            <p
              key={index}
              className="md:my-0 mt-4 mb-2 text-xl md:text-2xl font-medium leading-none text-nfh-text-primary"
            >
              {text.trim()}
            </p>
          ))}
          <div className="pb-4">
            <p className="text-base text-right text-nfh-text-primary">{lyric.band}</p>
            <p className="text-base text-right text-nfh-text-primary">{lyric.song}</p>
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
