import { default as Image } from '@/components/Image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BiBriefcase, BiMap, BiEnvelope, BiLinkExternal } from 'react-icons/bi'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'

const ProfileCard = (): JSX.Element => {
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
          <ProfileInfo />
          <span className="h-1.5 bg-gradient-to-r from-green-500 via-red-500 to-gray-900"></span>
        </div>
      </div>
    </>
  )
}

const ProfileInfo = () => (
  <div className="block py-4 px-6 bg-off-main">
    <h1 className="text-xl font-semibold">Ahmet ALMAZ</h1>
    <p className="py-2">Metalhead | Full Stack Developer</p>
    <div className="flex items-center mt-4">
      <BiBriefcase className="w-6 h-6" />

      <p className="px-2 text-base">Self-employed - available for hire</p>
    </div>

    <div className="flex items-center mt-4">
      <BiMap className="w-6 h-6" />

      <p className="px-2 text-base">
        Türkiye
        <span className="ml-1 align-middle">🇹🇷</span>
      </p>
    </div>

    <div className="flex items-center mt-4">
      <BiEnvelope className="w-6 h-6" />
      <Link className="px-2 text-base" href={`mailto:${siteMetadata.email}`}>
        {siteMetadata.email}
      </Link>
    </div>
    <div className="flex items-center mt-4">
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
