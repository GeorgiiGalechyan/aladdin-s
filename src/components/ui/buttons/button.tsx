import { type FC, type ButtonHTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import cl from './button.module.scss'

const ButtonVariant = cva('font-size: ', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: '',
    },
  },
})

const Button: FC<ButtonProps> = ({}) => {
  return <button></button>
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariant> {
  href?: string
}
