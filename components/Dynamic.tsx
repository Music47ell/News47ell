import dynamic from 'next/dynamic'

export const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
	ssr: false,
})

export const AudioToggle = dynamic(
	() => {
		return import('@/components/toggles/AudioToggle')
	},
	{ ssr: false }
)

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
