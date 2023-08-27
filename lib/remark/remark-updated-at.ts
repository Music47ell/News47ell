import { execSync } from 'child_process'
import { remark } from 'remark'
import { Parent } from 'unist'
import { VFile } from 'vfile'

type Date = {
	updated_at: Date
}

function generateUpdatedAt() {
	return function (tree: Parent, file: VFile) {
		const filepath = file.cwd
		const result = execSync(`git log -1 --pretty="format:%cI" ${filepath}`).toString().trim()

		file.data.updatedAt = result
	}
}

export default async function remarkUpdatedAt(markdown: string): Promise<Date> {
	const vfile = await remark().use(generateUpdatedAt).process(markdown)

	return {
		updated_at: vfile.data.updatedAt as Date,
	}
}
