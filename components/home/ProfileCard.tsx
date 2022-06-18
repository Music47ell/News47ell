import { default as Image } from '@/components/Image'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { animate } from 'motion'
import { NowPlayingSong } from '@/lib/types'
import { BiBriefcase, BiMap, BiEnvelope, BiLinkExternal } from 'react-icons/bi'
import { SiSpotify } from 'react-icons/si'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'

function AnimatedBars() {
  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(1.5) translateY(-0.082rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar2',
      {
        transform: [
          'scaleY(1.0) translateY(0rem)',
          'scaleY(3) translateY(-0.083rem)',
          'scaleY(1.0) translateY(0rem)',
        ],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar3',
      {
        transform: [
          'scaleY(1.0)  translateY(0rem)',
          'scaleY(0.5) translateY(0.37rem)',
          'scaleY(1.0)  translateY(0rem)',
        ],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
  }, [])

  return (
    <div className="flex overflow-hidden items-end w-auto">
      <span id="bar1" className="mr-1 w-1 h-2 bg-gray-300 dark:bg-gray-500 opacity-75" />
      <span id="bar2" className="mr-1 w-1 h-1 bg-gray-300 dark:bg-gray-500" />
      <span id="bar3" className="w-1 h-3 bg-gray-300 dark:bg-gray-500 opacity-80" />
    </div>
  )
}

const ProfileCard = (): JSX.Element => {
  const { data } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const onMouseMove = useCallback((e) => {
    if (!ref.current || window.innerWidth < 1280) return

    const { clientX, clientY } = e
    const { width, height, x, y } = ref.current.getBoundingClientRect()
    const mouseX = Math.abs(clientX - x)
    const mouseY = Math.abs(clientY - y)
    const rotateMin = -15
    const rotateMax = 15
    const rotateRange = rotateMax - rotateMin

    const rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange,
    }

    setStyle({
      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' })
  }, [])

  useEffect(() => {
    const { current } = ref
    if (!current) return
    current.addEventListener('mousemove', onMouseMove)
    current.addEventListener('mouseleave', onMouseLeave)
    return () => {
      if (!current) return
      current.removeEventListener('mousemove', onMouseMove)
      current.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [onMouseLeave, onMouseMove])

  return (
    <>
      <div
        className="z-10 hover:z-50 mb-8 xl:mb-0 transition-all duration-200 ease-out scale-100 xl:hover:scale-110"
        style={{ perspective: '600px' }}
        ref={ref}
      >
        <div
          style={style}
          className="flex flex-col shadow-lg transition-all duration-200 ease-out lg:shadow-cyan-100 lg:dark:shadow-cyan-700"
        >
          <div className="flex">
            <Image
              src="/images/others/hero.png"
              alt="Profile Photo"
              width="550px"
              height="400px"
              className="object-cover"
              priority={true}
            />
          </div>
          <Spotify data={data} />
          <ProfileInfo />
          <span className="h-1.5 bg-gradient-to-r from-green-500 via-red-500 to-gray-900"></span>
        </div>
      </div>
    </>
  )
}

const Spotify = ({ data }) => {
  return (
    <div className="flex items-center py-2 px-3 xl:px-6 bg-gray-800">
      <SiSpotify className="fill-spotify" />
      <div className="inline-flex ml-2 truncate">
        {data?.songUrl ? (
          <>
            <div className="flex items-end pt-1 pb-0.5 mr-2 h-5">
              <AnimatedBars />
            </div>
            <a
              className="font-medium text-gray-200"
              href={data.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${data.title} - ${data?.artist ?? 'Spotify'}`}
            >
              {data.title}
            </a>
          </>
        ) : (
          <p className="font-medium text-gray-200">Not Playing</p>
        )}
        <span className="mx-2 text-gray-300">{' – '}</span>
        <p className="max-w-max text-gray-300 truncate">{data?.artist ?? 'Spotify'}</p>
      </div>
    </div>
  )
}

const ProfileInfo = () => (
  <div className="block py-4 px-6 bg-off-main">
    <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Ahmet ALMAZ</h1>
    <p className="py-2 text-gray-700 dark:text-gray-400">Metalhead | Full Stack Developer</p>
    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
      <BiBriefcase className="w-6 h-6" />

      <p className="px-2 text-base">Self-employed - available for hire</p>
    </div>

    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
      <BiMap className="w-6 h-6" />

      <p className="px-2 text-base">
        Türkiye
        <span className="ml-1 align-middle">🇹🇷</span>
      </p>
    </div>

    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
      <BiEnvelope className="w-6 h-6" />
      <Link className="px-2 text-base" href={`mailto:${siteMetadata.email}`}>
        {siteMetadata.email}
      </Link>
    </div>
    <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
      <BiLinkExternal className="w-6 h-6" />
      <p className="px-2 text-base">
        <a target="_blank" href="https://github.com/music47ell" rel="noreferrer">
          gh/music47ell
        </a>
        ,{' '}
        <a target="_blank" href="https://twitter.com/music47ell" rel="noreferrer">
          tw/music47ell
        </a>
      </p>
    </div>
  </div>
)

export default ProfileCard
