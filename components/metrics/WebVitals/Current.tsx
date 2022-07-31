import { default as Link } from '@/components/Link'
import { CheckIcon, ExclamationIcon, XCircleIcon, TimeIcon } from '@/components/icons'

type Props = {
  index: number
  name: string
  value: string
  explainerURL: string
  ratingText: string
  color: string
}

const WebVitalsCard = ({ index, name, value, explainerURL, ratingText, color }: Props) => {
  return (
    <div
      key={name}
      className={`relative flex flex-col ${
        index < 2 ? 'md:col-span-3' : 'md:col-span-2'
      } h-32 items-center justify-center rounded bg-nfh-background-secondary text-nfh-text-primary`}
    >
      <p>{name}</p>
      <p className="mb-2 text-2xl font-bold">{value} </p>
      <Link
        href={explainerURL}
        className={`flex items-center space-x-1 px-2 text-gray-800 ${color} rounded-full`}
      >
        {ratingText === 'Good' ? (
          <CheckIcon className="block h-5 w-5" />
        ) : ratingText === 'Needs Improvement' ? (
          <ExclamationIcon className="block h-5 w-5" />
        ) : ratingText === 'Poor' ? (
          <XCircleIcon className="block h-5 w-5" />
        ) : (
          <TimeIcon className="block h-5 w-5" />
        )}
        <p>{ratingText}</p>
      </Link>
    </div>
  )
}

export default WebVitalsCard
