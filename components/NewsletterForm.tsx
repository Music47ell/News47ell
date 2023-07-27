'use client'

import React, { useRef, useState } from 'react'

import { EmailIcon } from '@/components/icons'

export interface NewsletterFormProps {
	title?: string
	apiUrl?: string
}

const NewsletterForm = ({
	title = 'Sign up to the newsletter',
	apiUrl = '/api/newsletter',
}: NewsletterFormProps) => {
	const inputEl = useRef<HTMLInputElement>(null)
	const [error, setError] = useState(false)
	const [message, setMessage] = useState('')
	const [subscribed, setSubscribed] = useState(false)
	const [loading, setLoading] = useState(false)

	const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!inputEl.current) {
			return
		}

		if (loading) {
			return
		}

		setLoading(true)

		const res = await fetch(apiUrl, {
			body: JSON.stringify({
				email: inputEl.current.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})

		const { error } = await res.json()
		if (error) {
			setLoading(false)
			setError(true)
			setMessage('Your e-mail address is invalid or you are already subscribed!')
			return
		}

		inputEl.current.value = ''
		setLoading(false)
		setError(false)
		setSubscribed(true)
	}

	return (
		<section className="bg-nfh-background-secondary">
			<div className="mx-auto max-w-screen-xl px-4 py-8">
				<div className="not-prose mx-auto max-w-screen-md sm:text-center">
					<h2 className="mb-4 text-3xl tracking-tight text-nfh-text-primary sm:text-4xl">
						{title}
					</h2>
					<form onSubmit={subscribe}>
						<div className="mx-auto max-w-screen-sm items-center space-y-4 sm:flex sm:space-y-0">
							<div className="relative w-full">
								<label
									htmlFor="email-input"
									className="mb-2 hidden text-sm font-medium text-nfh-text-primary"
								>
									Email address
								</label>
								<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
									<EmailIcon className="h-5 w-5 text-nfh-text-primary" />
								</div>
								<input
									className={`${
										subscribed
											? 'bg-nfh-background-secondary placeholder:text-nfh-text-secondary'
											: 'bg-nfh-background-primary placeholder:text-nfh-text-primary'
									} block w-full border border-nfh-accent-primary bg-nfh-background-primary p-3 pl-10 text-sm focus:border-nfh-accent-secondary focus:ring-nfh-accent-secondary`}
									autoComplete="email"
									id="email-input"
									name="email"
									placeholder={subscribed ? "You're subscribed!  🎉" : 'Enter your email'}
									ref={inputEl}
									type="email"
									disabled={subscribed}
									required
								/>
							</div>
							<div>
								{!subscribed && (
									<button
										type="submit"
										className="hover:bg-primary-800 w-full border border-nfh-accent-primary px-5 py-3 text-center text-sm font-medium text-nfh-text-primary focus:ring-4 focus:ring-nfh-accent-secondary"
										disabled={subscribed}
									>
										Subscribe
									</button>
								)}
							</div>
						</div>
						{error && (
							<div className="mx-auto mt-3 max-w-screen-sm text-left text-sm text-red-500">
								{message}
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	)
}

export default NewsletterForm
