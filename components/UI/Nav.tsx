import React, { useEffect, useState } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { BiMenu, BiSearchAlt2, BiX, BiArrowFromBottom, BiArrowFromTop } from 'react-icons/bi'
import {
  BiPen,
  BiBarChartAlt2,
  BiCollection,
  BiTag,
  BiArchive,
  BiBriefcaseAlt2,
  BiCurrentLocation,
} from 'react-icons/bi'
import siteMetadata from '@/data/siteMetadata'
import { default as Link } from '@/components/Link'
import AudioToggle from '@/components/toggles/AudioToggle'
import { Logo, News47ell } from '@/components/UI/Logos'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { getGravatar } from '@/utils/getGravatar'
import { default as Image } from '@/components/Image'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useSFX } from '@/hooks/useSFX'

const Nav = ({ pickerOpen, setPickerOpen }) => {
  const [firstName, setFirstName] = useState<string | null>(null)
  const [navShow, setNavShow] = useState(false)
  const [userNavShow, setUserNavShow] = useState(false)
  const { user } = useUser()
  const ref = useClickOutside(() => setUserNavShow(false))
  const { playPopEnter } = useSFX()

  const handleOnEnter = () => playPopEnter({ playbackRate: 1.5 })

  const icons = [
    BiPen,
    BiBarChartAlt2,
    BiCollection,
    BiTag,
    BiArchive,
    BiBriefcaseAlt2,
    BiCurrentLocation,
  ]

  const onToggleNav = () => {
    setNavShow((status) => {
      return !status
    })
  }

  const onToggleUserNav = () => {
    setUserNavShow((status) => {
      return !status
    })
  }

  const onClickUserNavLink = () => {
    setUserNavShow(false)
    setNavShow(false)
  }

  useEffect(() => {
    async function getProfile() {
      try {
        if (!user) {
          return
        }
        const { data, error, status } = await supabaseClient
          .from('profiles')
          .select('id, first_name')
          .eq('id', user.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setFirstName(data.first_name)
        }
      } catch (error) {
        alert(error.message)
      }
    }
    if (user) getProfile()
  }, [user])

  return (
    <nav className="bg-nfh-background-secondary">
      <div className="flex relative justify-between items-center h-16">
        <div className="flex absolute inset-y-0 left-0 items-center pl-4 sm:pl-8">
          <button
            className="inline-flex justify-center items-center"
            onMouseEnter={handleOnEnter}
            onClick={onToggleNav}
          >
            <span className="sr-only">Open main menu</span>
            {navShow ? (
              <BiX className="block w-6 h-6 text-nfh-text-primary" />
            ) : (
              <BiMenu className="block w-6 h-6 text-nfh-text-primary" />
            )}
          </button>
        </div>
        <div className="justify-center items-center m-auto">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <News47ell className="hidden lg:block m-auto w-auto h-10" />
            <Logo className="block lg:hidden m-auto w-auto h-10" />
          </Link>
        </div>
        <div className="flex absolute inset-y-0 right-0 items-center pr-4 sm:pr-8">
          <div className="relative ml-3">
            <span className="sr-only">Toggle Search</span>
            <Link href="/blog/search" onMouseEnter={handleOnEnter}>
              <BiSearchAlt2 className="w-6 h-6 text-nfh-text-primary" />
            </Link>
          </div>
          <div className="relative ml-3">
            <span className="sr-only">Toggle SFX</span>
            <AudioToggle />
          </div>
          <div className="relative ml-3">
            <span className="sr-only">Toggle Theme</span>
            <button
              aria-label="toggle theme picker"
              onMouseEnter={handleOnEnter}
              onClick={() => setPickerOpen(!pickerOpen)}
              className="h-8"
            >
              {pickerOpen ? (
                <BiArrowFromBottom className="w-6 h-6 text-nfh-text-primary" />
              ) : (
                <BiArrowFromTop className="w-6 h-6 text-nfh-text-primary" />
              )}
            </button>
          </div>
          {user && (
            <div className="relative ml-3">
              <div>
                <button
                  className="flex text-sm rounded-full focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  onMouseEnter={handleOnEnter}
                  onClick={onToggleUserNav}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    src={getGravatar(user?.email, 32)}
                    width={32}
                    height={32}
                    className="rounded-full"
                    alt="Profile Photo"
                  />
                </button>
              </div>
              <ul
                ref={ref}
                className={
                  userNavShow
                    ? 'absolute right-0 py-1 mt-2 w-48 bg-nfh-background-secondary rounded-md ring-1 ring-black ring-opacity-5 shadow-lg origin-top-right focus:outline-none z-10'
                    : 'hidden '
                }
              >
                <div className="flex justify-between items-center py-2 px-4">
                  <p className="text-sm font-medium">Welcome back {user ? firstName : 'Guest'}</p>
                </div>
                {user &&
                  siteMetadata.adminNavLinks.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onMouseEnter={handleOnEnter}
                          onClick={onClickUserNavLink}
                        >
                          <span className="block py-2 px-4 text-sm hover:text-nfh-text-primary hover:bg-nfh-accent-primary">
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={navShow ? 'block border-b border-t border-nfh-accent-primary' : 'hidden'}>
        <nav className="grid sm:block sm:grid-cols-2 gap-2 my-4 text-left sm:text-center">
          {siteMetadata.headerNavLinks.map((item, idx) => {
            const Icon = icons[idx]
            return (
              <Link
                href={item.href}
                key={item.href}
                className="py-2 px-3 text-sm font-medium text-nfh-text-primary hover:text-nfh-text-secondary hover:bg-nfh-accent-primary rounded-md"
                onMouseEnter={handleOnEnter}
                onClick={onToggleNav}
              >
                <Icon className="inline mr-1 w-6 h-6" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </nav>
  )
}

export default Nav
