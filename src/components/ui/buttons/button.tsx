import { type FC, type ButtonHTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import cl from './button.module.scss'

/*
Active: Enable / Disable
Size: small, medium, big
Color: transparent (background-color: transparent, border ...) / primary / other */

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

const Button: FC<ButtonProps> = ({ ...props }) => {
  return <button {...props} />
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariant> {
  href?: string
}
