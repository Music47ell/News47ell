// the design for this component was directly inspired by Max Bock's personal website. Check out his amazing work here: https://mxb.dev/

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import ThemeSwatch from './ThemeSwatch'

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

export default function ThemePicker({ open }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const currentTheme = theme

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div
      className={`shadow-sm overflow-hidden absolute w-full bg-nfh-accent-secondary transition-all  ${
        open
          ? 'translate-y-0 duration-[400ms] ease-out'
          : '-translate-y-full duration-200 ease-in opacity-0'
      }`}
    >
      <ul
        className={`text-center whitespace-nowrap overflow-x-auto p-4 transition-transform ${
          open ? 'translate-y-0 duration-300 ease-out' : '-translate-y-10 duration-150 ease-in'
        }`}
      >
        {themes.map((theme) => (
          <li
            className={`inline-block mx-4 ${theme.title} transition-transform duration-150`}
            key={theme.title}
          >
            <button
              aria-label={`select ${theme.title} theme`}
              className="group rounded focus:ring-2 transition-transform duration-150 focus:outline-none"
              onClick={() => setTheme(theme.title.toLowerCase())}
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
