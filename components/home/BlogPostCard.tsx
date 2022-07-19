import { default as Link } from '@/components/Link'
import { useSFX } from '@/hooks/useSFX'

export default function BlogPostCard({ title, slug, total }) {
  const { playMouseClick } = useSFX()
  return (
    <Link
      href={slug}
      className={`rounded-xl w-full md:w-1/3`}
      //@ts-ignore
      onClick={playMouseClick}
    >
      <div className="flex flex-col justify-between p-4 h-full bg-nfh-background-secondary rounded-lg">
        <div className="flex flex-col md:flex-row justify-between">
          <h4 className="w-full text-base font-medium tracking-tight text-nfh-text-primary">
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
