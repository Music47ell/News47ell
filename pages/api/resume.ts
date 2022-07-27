import { NextApiHandler } from 'next'

import { resumeToPdf } from '@/lib/puppeteer'

const handler: NextApiHandler = async (req, res) => {
  const file = await resumeToPdf()

  res.setHeader('Content-Type', 'application/pdf')
  res.end(file)
}

export default handler
