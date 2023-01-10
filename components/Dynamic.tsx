import dynamic from 'next/dynamic'

export const DynamicToolsMarquee = dynamic(
	() => {
		return import('@/components/home/ToolsMarquee')
	},
	{ ssr: false }
)

export const DynamicTopicsMarquee = dynamic(
	() => {
		return import('@/components/home/TopicsMarquee')
	},
	{ ssr: false }
)
