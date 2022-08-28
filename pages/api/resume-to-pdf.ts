import { NextApiHandler } from 'next'

import { resumeToPdf } from '@/lib/puppeteer'

const handler: NextApiHandler = async (req, res) => {
	const file = await resumeToPdf()

	res.setHeader('Content-Type', 'application/pdf')
	res.setHeader('Content-disposition', `attachment; filename="Ahmet ALMAZ - Resume.pdf"`)
	res.end(file)
}

export default handler
