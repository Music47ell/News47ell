import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const { data } = await supabaseClient
          .from('web-vitals')
          .insert(typeof req.body === 'string' ? JSON.parse(req.body) : req.body)

        res.status(201).json({ success: true, data })
      } catch (error) {
        console.dir(error)
        res.status(400).json({ success: false, error })
      }
      break
    case 'GET':
      res.status(200).json('Thank you for your interest in my custom Web Vitals API.')
      break
    default:
      res.status(400).json({ success: false, error: 'Method not allowed' })
  }
}
