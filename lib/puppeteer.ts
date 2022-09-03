import puppeteer from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

const RESUME_URL = process.env.NEXT_PUBLIC_VERCEL_URL
	? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/resume`
	: 'http://localhost:3000/resume'

async function getOptions() {
	const isDev = !process.env.AWS_REGION
	let options

	const chromeExecPaths = {
		win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
		linux: '/usr/bin/google-chrome',
		darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	}

	if (process.platform !== 'win32' && process.platform !== 'linux' && process.platform !== 'darwin')
		throw new Error(`current platform (${process.platform}) not supported`)

	const execPath = chromeExecPaths[process.platform]

	if (isDev) {
		options = {
			args: [],
			executablePath: execPath,
			headless: true,
		}
	} else {
		options = {
			args: chrome.args,
			executablePath: await chrome.executablePath,
			headless: chrome.headless,
		}
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
