// code source: https://github.com/delbaoliveira/website/blob/main/lib/createOgImage.ts

// double escape for commas and slashes
const e = (str: string) => encodeURIComponent(encodeURIComponent(str))

export const createOGImage = ({ title, meta }: { title: string; meta: string }) =>
	[
		// ACCOUNT PREFIX
		`https://res.cloudinary.com/music47ell/image/upload`,

		// TITLE
		// Open Sans google font in Dracula
		`l_text:open%20sans_72_bold:${e(title)},co_rgb:bd93f9,c_fit,w_1400,h_240`,
		// Positioning
		`fl_layer_apply,g_south_west,x_100,y_180`,

		// META
		// Open Sans, but smaller and in Dracula
		`l_text:open%20sans_48:${e(meta)},co_rgb:bd93f9,c_fit,w_1400`,
		// Positioning
		`fl_layer_apply,g_south_west,x_100,y_100`,

		// PROFILE IMAGE
		// dynamically fetched from my twitter profile
		`l_twitter_name:music47ell`,
		// Transformations
		`r_max,w_380,h_380`,
		// Positioning
		`fl_layer_apply,w_140,g_north_west,x_100,y_100`,

		// BG
		`news47ell/images/others/og-bg.png`,
	].join('/')
