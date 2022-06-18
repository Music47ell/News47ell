// https://www.akmittal.dev/posts/nextjs-image-use-any-domain/
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const imageProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const single = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url
  const url = decodeURIComponent(single)
  const result = await fetch(url)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = result.body
  body.pipe(res)
}

export default imageProxy
