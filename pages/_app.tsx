import type { AppProps, NextWebVitalsMetric } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'

import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { ThemeProvider } from 'next-themes'

import '@/assets/css/tailwind.css'
import Analytics from '@/components/analytics'
import Quote from '@/components/Quote'
import Footer from '@/components/UI/Footer'
import Header from '@/components/UI/Header'
import Nav from '@/components/UI/Nav'
import { SoundProvider } from '@/context/store'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [pickerOpen, setPickerOpen] = useState(false)

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ThemeProvider>
        <SoundProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <Analytics />
          <Header pickerOpen={pickerOpen} />
          <div
            className={`transition-transform ${
              pickerOpen
                ? 'translate-y-[124px] duration-[400ms] ease-out'
                : 'translate-y-0 duration-200 ease-in'
            }`}
          >
            <div className="flex min-h-screen flex-col">
              <Nav pickerOpen={pickerOpen} setPickerOpen={setPickerOpen} />
              <Quote />
              <Component {...pageProps} />
              <Footer />
            </div>
          </div>
        </SoundProvider>
      </ThemeProvider>
    </UserProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const slug = window.location.pathname
  const url = '/api/web-signals'
  const body = JSON.stringify({
    slug,
    name: metric.name,
    value: metric.value,
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, {
      body,
      method: 'POST',
      keepalive: true,
    })
  }
}
