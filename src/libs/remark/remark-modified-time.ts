import { execSync } from 'child_process'

export default function remarkModifiedTime() {
	return function (_tree: any, file: any) {
		try {
			const filepath = file.history[0]
			const result = execSync(`git log -1 --pretty="format:%cI" ${filepath}`)

			if (result.toString() === '') {
				file.data.astro.frontmatter.lastModified = new Date()
			}

			file.data.astro.frontmatter.lastModified = new Date(result.toString())
		} catch (e) {
			console.error(e)
		}
	}
}
