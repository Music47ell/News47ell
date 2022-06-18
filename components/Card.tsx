import { default as Image } from '@/components/Image'
import { default as Link } from '@/components/Link'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Card = ({ title, description, imgSrc, href }): JSX.Element => (
  <div className="p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div className="overflow-hidden h-full rounded-md border-2 border-gray-200 dark:border-gray-700 border-opacity-60">
      {href ? (
        <Link href={href} aria-label={`Link to ${title}`}>
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
      ) : (
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center md:h-36 lg:h-48"
          width={544}
          height={306}
        />
      )}
      <div className="p-6">
        <h2 className=" mb-3 text-2xl font-bold tracking-tight leading-8">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="mb-3 max-w-none">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default Card
