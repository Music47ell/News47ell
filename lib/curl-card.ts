/* eslint-disable @typescript-eslint/indent */
import kleur from 'kleur'
import stringWidth from 'string-width'

import siteMetaData from '@/data/siteMetadata'

const LINKS: Array<{ text: string; title: string; color?: (title: string) => string }> = [
	{
		text: siteMetaData.email,
		title: 'Email',
		color: kleur.magenta().inverse,
	},
	{
		text: siteMetaData.siteUrl,
		title: 'Website',
		color: kleur.bgBlack().inverse,
	},
	{
		text: siteMetaData.curlCardLinks.github.text,
		title: 'GitHub',
		color: kleur.green().inverse,
	},
	{
		text: siteMetaData.curlCardLinks.twitter.text,
		title: 'Twitter',
		color: kleur.cyan().inverse,
	},
	{
		text: siteMetaData.curlCardLinks.linkedIn.text,
		title: 'LinkedIn',
		color: kleur.blue().inverse,
	},
]

const longestLength = Math.max(...LINKS.map((link) => link.title.length))

const printLinkTitle = (link: (typeof LINKS)[0]): string => {
	const titleText = ` ${link.title} `
	return kleur.bold(link.color?.(titleText) ?? titleText)
}

const getHeading = () => {
	const lines = String.raw`
  _  _              ___ _           _   _              _   _
 | || |___ _  _    |_ _( )_ __     /_\ | |_  _ __  ___| |_| |
 | __ / -_) || |_   | ||/| '  \   / _ \| ' \| '  \/ -_)  _|_|
 |_||_\___|\_, ( ) |___| |_|_|_| /_/ \_\_||_|_|_|_\___|\__(_)
           |__/|/
`
		.split('\n')
		.filter(Boolean)

	return lines
		.map((line, i) => {
			const length = line.length
			const third = Math.floor(length / 2)
			const leftBreak = third + (lines.length - i)
			const rightBreak = third * 2 + (lines.length - i)
			if (i === lines.length - 1) {
				return line.slice(0, leftBreak) + line.slice(leftBreak, rightBreak) + line.slice(rightBreak)
			}
			return (
				kleur.white(line.slice(0, leftBreak)) +
				kleur.red(line.slice(leftBreak, rightBreak)) +
				kleur.white(line.slice(rightBreak))
			)
		})
		.join('\n')
}

export const getFullMessage = (): string => {
	kleur.enabled = true

	return (
		boxContent(
			`${kleur.bold(getHeading())}


I'm a full stack software engineer from ${kleur.bold(kleur.red('Türkiye'))}.
I have a strong passion for programming,
problem solving, learning new technologies
and I'm always looking for new challenges and opportunities.

Here are some of my links:

${LINKS.map(
	(link) =>
		`${printLinkTitle(link)}${' '.repeat(longestLength - link.title.length + 4)}${kleur.underline(
			link.text
				.replace('music47ell', kleur.red('music47ell'))
				.replace('news47ell', kleur.red('news47ell'))
		)}`
).join('\n')}
`,
			62,
			`/ ${kleur.bold('Ahmet ALMAZ')} /`
		) + '\n'
	)
}

/**
 * The following 2 functions are heavily copied / adapted from Sindre
 * Sorhus' Boxen found here: https://github.com/sindresorhus/boxen.
 *
 * Copied since the library relies on Node built-ins and I want to run
 * this in Cloudflare's Edge Runtime via Vercel.
 */

const makeTitle = (text: string, horizontal: string) => {
	let title = ''

	const textWidth = stringWidth(text)

	horizontal = horizontal.slice(textWidth)

	if (horizontal.length % 2 === 1) {
		// This is needed in case the length is odd
		horizontal = horizontal.slice(Math.floor(horizontal.length / 2))
		title = horizontal.slice(1) + text + horizontal // We reduce the left part of one character to avoid the bar to go beyond its limit
	} else {
		horizontal = horizontal.slice(horizontal.length / 2)
		title = horizontal + text + horizontal
	}

	return title
}

const boxContent = (content: string, contentWidth = 62, title: string) => {
	const NEWLINE = '\n'
	const PAD = ' '
	const BORDERS_WIDTH = 2

	const padding = {
		top: 1,
		bottom: 1,
		left: 4,
		right: 4,
	}

	const colorizeBorder = (border: string) => {
		return kleur.red(border)
	}

	const chars = {
		topLeft: '╭',
		top: '─',
		topRight: '╮',
		right: '│',
		bottomRight: '╯',
		bottom: '─',
		bottomLeft: '╰',
		left: '│',
	}
	const columns = 80
	const marginLeft = ''

	const top = colorizeBorder(
		NEWLINE.repeat(0) +
			marginLeft +
			chars.topLeft +
			makeTitle(title, chars.top.repeat(contentWidth + padding.left + padding.right)) +
			chars.topRight
	)
	const bottom = colorizeBorder(
		marginLeft +
			chars.bottomLeft +
			chars.bottom.repeat(contentWidth + padding.left + padding.right) +
			chars.bottomRight +
			NEWLINE.repeat(0)
	)

	const LINE_SEPARATOR = contentWidth + BORDERS_WIDTH + 0 >= columns ? '' : NEWLINE

	const lines = [
		...Array.from({ length: padding.top }, (_) => PAD),
		...content.split(NEWLINE),
		...Array.from({ length: padding.bottom }, (_) => PAD),
	]

	const middle = lines
		.map((line) => {
			const paddedLine =
				PAD.repeat(padding.left) +
				line +
				PAD.repeat(contentWidth - stringWidth(line) + padding.right)
			return marginLeft + colorizeBorder(chars.left) + paddedLine + colorizeBorder(chars.right)
		})
		.join(LINE_SEPARATOR)

	return top + LINE_SEPARATOR + middle + LINE_SEPARATOR + bottom
}
