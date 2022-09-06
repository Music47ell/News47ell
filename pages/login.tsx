import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@supabase/auth-helpers-react'
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
							<form className="flex flex-col" onSubmit={handleSignIn}>
								<label htmlFor="email" className="text-gray-200">
									Email
								</label>
								<input
									className="rounded-md bg-nfh-background-secondary py-2 px-4 text-nfh-text-primary focus:outline-none focus:ring-2"
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>

								<label htmlFor="password" className="mt-6 text-gray-200">
									Password
								</label>
								<input
									className="rounded-md bg-nfh-background-secondary py-2 px-4 text-nfh-text-primary focus:outline-none focus:ring-2"
									type="password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

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
