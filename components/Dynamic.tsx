import dynamic from 'next/dynamic'

export const Editor = dynamic(() => import('@/components/blog/Editor'), { ssr: false })

export const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
})

export const AudioToggle = dynamic(
  () => {
    return import('@/components/toggles/AudioToggle')
  },
  { ssr: false }
)
