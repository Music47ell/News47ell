import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { Turkiye } from '@/components/UI/Logos'

const hCard = (): JSX.Element => {
  if (typeof window === 'object') {
    const photo = document.querySelector('.u-photo')
    if (photo) {
      window.addEventListener('deviceorientation', (e) => {
        const tiltLR = e.gamma
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        photo.style.transform = `rotate(${tiltLR * -1}deg)`
      })
    }
  }

  return (
    <div className="flex items-center p-2 mb-4 text-sm rounded-lg border border-primary text-muted h-card user-profile">
      <Image
        className="u-photo"
        alt="Profile Photo"
        height={60}
        width={60}
        src="/images/others/avatar.png"
      />
      <div className="flex flex-col justify-center items-start mx-3">
        <Link
          className="w-48 font-medium truncate p-name u-email"
          href={`mailto:${siteMetadata.email}`}
          target="_blank"
          rel="me noopener noreferrer"
        >
          {siteMetadata.author}
        </Link>
        <p className="w-48 font-medium truncate p-nickname">{siteMetadata.nickname}</p>
        <p className="w-48 font-medium truncate">
          <Link
            className="space-y-0 w-48 font-medium truncate p-note u-url"
            href={siteMetadata.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {siteMetadata.position}
          </Link>
        </p>
        <p className="w-48 truncate p-country-name">{siteMetadata.location}</p>
      </div>
      <Turkiye className="m-auto w-10 h-10 p-country-flag" />
    </div>
  )
}

export default hCard
