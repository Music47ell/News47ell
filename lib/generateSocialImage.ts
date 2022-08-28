export default function generateSocialImage({
	cloudName,
	imagePublicID,
	imagekitUrlBase = 'https://ik.imagekit.io',
	titleOverlayText,
	textColor = 'FFFFFF',
	titleFont = 'Open$30Sans',
	titleFontSize = 50,
	textLeftOffset = 45,
	textBottomOffset = 247,
}): string {
	// title overlay configuration
	const titleConfig = [
		`tr:ot-${encodeURIComponent(titleOverlayText)}`,
		`otc-${textColor}`,
		`otf-${titleFont}`,
		`ots-${titleFontSize}`,
		`ox-${textLeftOffset}`,
		`oy-${textBottomOffset}`,
	].join(',')

	// combine all the pieces required to generate a imagekit URL
	const urlParts = [imagekitUrlBase, cloudName, titleConfig, imagePublicID]

	// remove any falsy sections of the URL (e.g. an undefined version)
	const validParts = urlParts.filter(Boolean)

	// join all the parts into a valid URL to the generated image
	return validParts.join('/')
}
