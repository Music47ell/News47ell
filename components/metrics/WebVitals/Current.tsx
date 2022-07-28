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
      className={`flex relative flex-col ${
        index < 2 ? 'md:col-span-3' : 'md:col-span-2'
      } justify-center items-center h-32 rounded text-nfh-text-primary bg-nfh-background-secondary`}
    >
      <p>{name}</p>
      <p className="mb-2 text-2xl font-bold">{value} </p>
      <Link
        href={explainerURL}
        className={`flex items-center px-2 space-x-1 text-gray-800 ${color} rounded-full`}
      >
        {ratingText === 'Good' ? (
          <CheckIcon className="block w-5 h-5" />
        ) : ratingText === 'Needs Improvement' ? (
          <ExclamationIcon className="block w-5 h-5" />
        ) : ratingText === 'Poor' ? (
          <XCircleIcon className="block w-5 h-5" />
        ) : (
          <TimeIcon className="block w-5 h-5" />
        )}
        <p>{ratingText}</p>
      </Link>
    </div>
  )
}

export default WebVitalsCard
