import { Taxonomy } from 'lib/interfaces'

import { default as Link } from '@/components/Link'
import kebabCase from '@/utils/kebabCase'

const TagsColorDictionary = {
	netlify: 'text-netlify',
	chrome: 'text-chrome',
	ios: 'text-apple',
}

const Tag = ({ text }: Taxonomy): JSX.Element => {
	const tagColor = TagsColorDictionary[text]
	return (
		<Link
			className={`${tagColor} mr-3 text-sm font-medium uppercase`}
			href={`/blog/tag/${kebabCase(text)}`}
		>
			{text}
		</Link>
	)
}

export default Tag
