import type { NextApiRequest, NextApiResponse } from 'next'
import { getWebVitals } from '@/lib/supabase'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getWebVitals()

    // map each name to a new object
    const mapped = data.map((item) => {
      return {
        created_at: item.created_at,
        name: item.name,
        value: item.value,
      }
    })

    // return the average value for each name for each day
    const average = mapped.reduce((acc, item) => {
      const { name, value } = item
      const date = new Date(item.created_at)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      const key = `${year}-${month}-${day}`

      if (!acc[key]) {
        acc[key] = {}
      }

      if (!acc[key][name]) {
        acc[key][name] = {
          name,
          value,
          count: 1,
          average: value,
        }
      } else {
        acc[key][name].value += value
        acc[key][name].count += 1
        acc[key][name].average = acc[key][name].value / acc[key][name].count
      }

      return acc
    }, {})

    // return name, value and date
    const result = Object.keys(average).map((key) => {
      const day = new Date(key)
      const date = day.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })

      return Object.keys(average[key]).map((name) => {
        return {
          name,
          value: average[key][name].average,
          date,
        }
      })
    })

    // make the date a key
    const final = result.reduce((acc, item) => {
      item.forEach((i) => {
        if (!acc[i.date]) {
          acc[i.date] = []
        }

        acc[i.date].push(i)
      })

      return acc
    }, {})

    const dataToSend = Object.keys(final).map((key) => {
      const item = final[key]

      const rawFCP = item.find((i) => i.name === 'FCP')?.value
      const rawLCP = item.find((i) => i.name === 'LCP')?.value
      const rawCLS = item.find((i) => i.name === 'CLS')?.value
      const rawFID = item.find((i) => i.name === 'FID')?.value
      const rawTTFB = item.find((i) => i.name === 'TTFB')?.value

      // convert to seconds
      const secondsFCP = rawFCP / 1000
      const secondsLCP = rawLCP / 1000
      const secondsCLS = rawCLS / 1000
      const secondsFID = rawFID / 1000
      const secondsTTFB = rawTTFB / 1000

      // round to 2 decimal places
      const FCP = Math.round(secondsFCP * 100) / 100
      const LCP = Math.round(secondsLCP * 100) / 100
      const CLS = Math.round(secondsCLS * 100) / 100
      const FID = Math.round(secondsFID * 100) / 100
      const TTFB = Math.round(secondsTTFB * 100) / 100

      return {
        date: key,
        FCP,
        LCP,
        CLS,
        FID,
        TTFB,
      }
    }, [])

    res.status(200).json(dataToSend)
  } catch (error) {
    console.dir(error)
    res.status(400).json({ success: false, error })
  }
}
