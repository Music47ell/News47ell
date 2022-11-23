import { createHash } from 'crypto'

export const getGravatar = (email = '', size: number): string => {
	const hashedEmail = createHash('md5').update(email).digest('hex').toLowerCase().toString()
	return `https://www.gravatar.com/avatar/${hashedEmail}?size=${size}`
}
