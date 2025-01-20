import { type FC, type HTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

const HeadingVariant = cva('', {
  variants: {
    variant: {
      default: '',
      outline: '',
    },
    size: {
      default: '',
      sm: '',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

const Heading: FC<HeadingProps> = ({}) => {
  return <h1>{}</h1>
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof HeadingVariant> {}

export { Heading, HeadingVariant }
