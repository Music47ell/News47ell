import NextImage, { ImageProps } from 'next/image'

// eslint-disable-next-line jsx-a11y/alt-text
const CustomImage = ({ ...rest }: ImageProps): JSX.Element => <NextImage {...rest} />

export default CustomImage
