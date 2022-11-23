const readingTime = (content: string) => {
	const wordsPerMinute = 200
	const wordCount = content.split(/\s/g).length
	const minutes = wordCount / wordsPerMinute
	const readTime = Math.ceil(minutes)
	return {
		words: wordCount,
		time: readTime,
	}
}

export default readingTime
