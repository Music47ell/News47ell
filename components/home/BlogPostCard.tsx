import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function BlogPostCard({ title, slug, total }) {
  const { playMouseClick } = useSFX()
  return (
    <Link
      href={slug}
      className={`rounded-xl w-full md:w-1/3`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      onClick={playMouseClick}
    >
      <div className="flex flex-col justify-between p-4 h-full bg-white dark:bg-gray-900 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between">
          <h4 className="w-full text-base font-medium tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <span className="ml-2 align-baseline">
            {total ? new Number(total).toLocaleString() : '---'}
          </span>
        </div>
      </div>
    </Link>
  )
}
