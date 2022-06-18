import React from 'react'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function LoadingFullScreen() {
  return (
    <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 justify-center items-center px-4 backdrop-filter backdrop-blur outline-none focus:outline-none">
      <div className="pb-4 w-24">
        <Image
          src="/images/brand/slash_large.svg"
          alt="News47ell Logo"
          width={288}
          height={288}
          className="animate-pulse"
        />
      </div>
    </div>
  )
}
