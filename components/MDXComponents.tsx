import { getMDXComponent } from 'next-contentlayer/hooks'
import React from 'react'

import CustomImage from '@/components/Image'
import CustomLink from '@/components/Link'
import { coreContent } from '@/lib/contentlayer'

import { Code, Heading, P, Pre, TOCInline } from './mdx'

const MDXComponents = {
	CustomImage,
	pre: Pre,
	TOCInline,
	a: CustomLink,
	p: P,
	code: Code,
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h1" {...props} />,
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h2" {...props} />,
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h3" {...props} />,
	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h4" {...props} />,
	h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h5" {...props} />,
	h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => <Heading as="h6" {...props} />,
}

export const MDXLayoutRenderer = ({ content, ...rest }) => {
	const MDXLayout = getMDXComponent(content.body.code)
	const mainContent = coreContent(content)

	return <MDXLayout content={mainContent} components={MDXComponents} {...rest} />
}
