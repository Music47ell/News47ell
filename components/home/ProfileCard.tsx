import { default as Image } from '@/components/Image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BriefcaseIcon, GlobeIcon, EnvelopeIcon, ExternalIcon } from '@/components/icons'
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
        className="z-10 mb-8 scale-100 transition-all duration-200 ease-out hover:z-50 xl:mb-0 xl:hover:scale-110"
        style={{ perspective: '600px' }}
        ref={ref}
      >
        <div
          style={style}
          className="flex flex-col shadow-lg transition-all duration-200 ease-out lg:shadow-nfh-accent-primary"
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
          <span className="h-1.5 bg-gradient-to-r from-nfh-accent-primary via-nfh-background-secondary to-nfh-accent-primary"></span>
        </div>
      </div>
    </>
  )
}

const ProfileInfo = () => (
  <div className="block bg-nfh-background-secondary py-4 px-6">
    <h1 className="text-xl font-semibold">Ahmet ALMAZ</h1>
    <p className="py-2">Metalhead | Full Stack Developer</p>
    <div className="mt-4 flex items-center">
      <BriefcaseIcon className="h-6 w-6 fill-nfh-accent-secondary" />

      <p className="px-2 text-base">Self-employed - available for hire</p>
    </div>

    <div className="mt-4 flex items-center">
      <GlobeIcon className="h-6 w-6 fill-nfh-accent-secondary" />

      <p className="px-2 text-base">
        Türkiye
        <span className="ml-1 align-middle">🇹🇷</span>
      </p>
    </div>

    <div className="mt-4 flex items-center">
      <EnvelopeIcon className="h-6 w-6 fill-nfh-accent-secondary" />
      <Link className="px-2 text-base" href={`mailto:${siteMetadata.email}`}>
        {siteMetadata.email}
      </Link>
    </div>
    <div className="mt-4 flex items-center">
      <ExternalIcon className="h-6 w-6 fill-nfh-accent-secondary" />
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
