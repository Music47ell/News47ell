import NextImage, { ImageProps } from 'next/image'

const CustomImage = ({ ...rest }: ImageProps) => <NextImage {...rest} />

export default CustomImage
