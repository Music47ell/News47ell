import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

export const RESUME_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/resume`
  : 'http://localhost:3000/resume'

async function getOptions() {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      }

  return options
}

export async function resumeToPdf() {
  const options = await getOptions()
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({ 'user-agent': 'puppeteer' })
  await page.goto(RESUME_URL, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf({ format: 'a4', printBackground: true })

  await browser.close()
  return pdf
}
