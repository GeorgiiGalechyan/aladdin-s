import { type FC, type ButtonHTMLAttributes } from 'react'
import { type VariantProps, cva } from 'class-variance-authority'
import cl from './button.module.scss'

const ButtonVariant = cva(cl.base, {
  variants: {
    intent: {
      primary: cl.primary,
      secondary: cl.secondary,
      dangerous: cl.dangerous,
    },

    size: {
      sm: cl.small,
      md: cl.medium,
      lg: cl.large,
    },
    disabled: {
      true: cl.disabled,
      false: '',
    },
    fullWidth: {
      true: cl.fullWidth,
      false: '',
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
})

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariant> {
  children?: any
  href?: string
}
