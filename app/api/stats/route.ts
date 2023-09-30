// read the file data/count_total.json and expose all of it's data publicly
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export const GET = async () => {
	const countTotal = fs.readFileSync(path.join(process.cwd(), 'data/count_total.json'), 'utf8')

	return NextResponse.json(JSON.parse(countTotal))
}
