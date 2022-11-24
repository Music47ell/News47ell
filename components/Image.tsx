import NextImage, { ImageProps } from 'next/image'

const CustomImage = ({ ...rest }: ImageProps): JSX.Element => <NextImage {...rest} />

export default CustomImage
