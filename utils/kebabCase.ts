// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { slug } from 'github-slugger'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const kebabCase = (str: string) => slug(str)

export default kebabCase
