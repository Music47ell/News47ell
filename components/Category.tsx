import { Taxonomy } from 'lib/interfaces'

import { default as Link } from '@/components/Link'
import kebabCase from '@/utils/kebabCase'

const Category = ({ text }: Taxonomy): JSX.Element => {
	return (
		<Link
			className="p-category mr-3 text-sm font-medium uppercase"
			href={`/blog/category/${kebabCase(text)}`}
		>
			{text}
		</Link>
	)
}

export default Category
