// the design for this component was directly inspired by Max Bock's personal website. Check out his amazing work here: https://mxb.dev/

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwatch from './ThemeSwatch'
import { useSFX } from '@/hooks/useSFX'

export default function ThemePicker({ open }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { playThemeOn, playThemeOff, playPopEnter } = useSFX()

  const handleOnEnter = () => playPopEnter({ playbackRate: 1.5 })

  const themes = [
    {
      title: 'Light',
    },
    {
      title: 'Dark',
    },
    {
      title: 'Dracula',
    },
    {
      title: 'Hackernews',
    },
    {
      title: 'Nord',
    },
    {
      title: 'Ferrari',
    },
    {
      title: 'DOS',
    },
  ]

  const currentTheme = theme

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div
      className={`absolute w-full overflow-hidden bg-nfh-accent-secondary shadow-sm transition-all  ${
        open
          ? 'translate-y-0 duration-[400ms] ease-out'
          : '-translate-y-full opacity-0 duration-200 ease-in'
      }`}
    >
      <ul
        className={`overflow-x-auto whitespace-nowrap p-4 text-center transition-transform ${
          open ? 'translate-y-0 duration-300 ease-out' : '-translate-y-10 duration-150 ease-in'
        }`}
      >
        {themes.map((theme) => (
          <li
            className={`mx-4 inline-block ${theme.title} transition-transform duration-150`}
            key={theme.title}
          >
            <button
              aria-label={`select ${theme.title} theme`}
              className="group rounded transition-transform duration-150 focus:outline-none focus:ring-2"
              onMouseEnter={handleOnEnter}
              onClick={() => {
                setTheme(theme.title.toLowerCase())
                switch (theme.title.toLowerCase()) {
                  case 'light':
                  case 'hackernews':
                  case 'dos':
                    playThemeOn()
                    break
                  case 'dark':
                  case 'dracula':
                  case 'nord':
                  case 'ferrari':
                    playThemeOff()
                    break
                  default:
                    break
                }
              }}
            >
              <ThemeSwatch
                active={currentTheme === theme.title.toLowerCase()}
                title={theme.title}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
