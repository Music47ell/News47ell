const siteMetadata = {
	title: 'News47ell',
	author: 'Ahmet ALMAZ',
	email: 'ahmet@news47ell.com',
	avatar: 'images/others/me.png',
	siteUrl: 'https://www.news47ell.com',
	description: 'Tech news, reviews and interesting links',
	language: 'en-us',
}

const { replace } = ''

// escape
const ca = /[&<>'"]/g

const esc = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	"'": '&#39;',
	'"': '&quot;',
}
const pe = (m) => esc[m]

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = (es) => replace.call(es, ca, pe)

export { escape, siteMetadata }
