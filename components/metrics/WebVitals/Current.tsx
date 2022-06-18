import { default as Link } from '@/components/Link'
import { BiCheckCircle, BiErrorCircle, BiXCircle, BiTime } from 'react-icons/bi'

type Props = {
  index: number
  name: string
  value: string
  explainerURL: string
  ratingText: string
  color: string
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const WebVitalsCard = ({ index, name, value, explainerURL, ratingText, color }: Props) => {
  return (
    <div
      key={name}
      className={`flex relative flex-col ${
        index < 2 ? 'md:col-span-3' : 'md:col-span-2'
      } justify-center items-center h-32 rounded bg-off-main`}
    >
      <p>{name}</p>
      <p className="mb-2 text-2xl font-bold">{value} </p>
      <Link
        href={explainerURL}
        className={`flex items-center px-2 space-x-1 text-gray-800 ${color} rounded-full`}
      >
        {ratingText === 'Good' ? (
          <BiCheckCircle />
        ) : ratingText === 'Needs Improvement' ? (
          <BiErrorCircle />
        ) : ratingText === 'Poor' ? (
          <BiXCircle />
        ) : (
          <BiTime />
        )}
        <p>{ratingText}</p>
      </Link>
    </div>
  )
}

export default WebVitalsCard
