import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { LoaderIcon } from '@/components/icons'
import { SectionContainer } from '@/components/UI'

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
		<SectionContainer>
			{!user ? (
				<div className="flex flex-col items-center justify-center">
					<div className="w-full max-w-lg">
						<h1 className="text-center text-3xl font-semibold text-white">
							Sign in to your account
						</h1>

						<div className="flex flex-col p-6">
							<form className="flex flex-col gap-3" onSubmit={handleSignIn}>
								<div className="relative">
									<label
										htmlFor="email"
										className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 bg-nfh-background-primary px-2 text-sm text-nfh-text-primary duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-nfh-text-primary"
									>
										<span>Email</span>
									</label>
									<input
										type="email"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="peer block w-full appearance-none rounded-lg border border-nfh-accent-primary bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-nfh-text-primary focus:border-blue-600 focus:outline-none focus:ring-0"
										placeholder=" "
									/>
								</div>

								<div className="relative">
									<label
										htmlFor="password"
										className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 bg-nfh-background-primary px-2 text-sm text-nfh-text-primary duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-nfh-text-primary"
									>
										<span>Password</span>
									</label>
									<input
										type="password"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="peer block w-full appearance-none rounded-lg border border-nfh-accent-primary bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-nfh-text-primary focus:border-blue-600 focus:outline-none focus:ring-0"
										placeholder=" "
									/>
								</div>

								<button
									className="mt-10 rounded-md bg-nfh-accent-primary py-3 px-6 text-lg font-semibold text-nfh-text-primary hover:bg-nfh-accent-secondary focus:outline-none focus:ring-2"
									type="submit"
								>
									Sign in with Email
								</button>
							</form>
						</div>
					</div>
				</div>
			) : (
				<LoaderIcon className="h-10 w-10 animate-spin fill-nfh-accent-primary" />
			)}
		</SectionContainer>
	)
}

export default Login
