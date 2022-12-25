export function dateSortDesc(a: string, b: string) {
	if (a > b) return -1
	if (a < b) return 1
	return 0
}

export function dateSortAsc(a: string, b: string) {
	if (a > b) return 1
	if (a < b) return -1
	return 0
}
