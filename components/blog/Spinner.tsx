import { useState, useEffect } from 'react'

export function Spinner({ displayed }) {
  const [show, setShow] = useState(displayed)
  useEffect(() => {
    setShow(displayed)
  }, [displayed])
  return (
    <button
      type="button"
      className={`mt-4 cursor-not-allowed items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out hover:bg-red-500 focus:border-red-700 active:bg-red-700 ${
        show ? 'inline-flex' : 'hidden'
      }`}
      disabled
    >
      <svg className="mr-3 -ml-1 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Processing
    </button>
  )
}
