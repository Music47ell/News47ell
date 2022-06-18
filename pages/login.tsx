import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react'

import { BiLoader } from 'react-icons/bi'

const Login = (): JSX.Element => {
  const router = useRouter()
  const { user } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabaseClient.auth.signIn({
      email,
      password,
    })

    if (error) {
      alert(JSON.stringify(error))
    } else {
      router.push('/admin')
    }
  }

  useEffect(() => {
    if (user) router.push('/admin')
  }, [router, user])

  return (
    <main className="container flex flex-col flex-1 px-3 mx-auto space-y-2 md:space-y-5 max-w-5xl">
      {!user ? (
        <div className="flex flex-col justify-center items-center">
          <div className="w-full max-w-lg">
            <h1 className="text-3xl font-semibold text-center text-white">
              Sign in to your account
            </h1>

            <div className="flex flex-col p-6">
              <form className="flex flex-col" onSubmit={handleSignIn}>
                <label htmlFor="email" className="text-gray-200">
                  Email
                </label>
                <input
                  className="py-2 px-4 rounded-md focus:ring-2 focus:outline-none text-muted"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password" className="mt-6 text-gray-200">
                  Password
                </label>
                <input
                  className="py-2 px-4 rounded-md focus:ring-2 focus:outline-none text-muted"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  className="py-3 px-6 mt-10 text-lg font-semibold text-white bg-green-500 rounded-md focus:ring-2 focus:outline-none"
                  type="submit"
                >
                  Sign in with Email
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <BiLoader className="w-12 h-12 animate-spin" />
      )}
    </main>
  )
}

export default Login
