import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

const RESUME_URL = process.env.NEXT_PUBLIC_VERCEL_URL
	? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/resume`
	: 'http://localhost:3000/resume'

const chromeExecutables: Partial<Record<typeof process.platform, string>> = {
	linux: '/usr/bin/chromium-browser',
	win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
	darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
}

async function getOptions() {
	if (process.env.NODE_ENV === 'development') {
		return {
			args: [],
			executablePath: chromeExecutables[process.platform] || chromeExecutables.linux,
			headless: true,
		}
	}

	return {
		args: chrome.args,
		executablePath: await chrome.executablePath,
		headless: chrome.headless,
	}
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
