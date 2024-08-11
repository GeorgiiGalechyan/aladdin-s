import { clsx } from 'clsx'
import type { ComponentProps, ElementType } from 'react'

type ButtonOwnProps<E extends ElementType = ElementType> = {
  children: string
  primary?: boolean
  secondary?: boolean
  as?: E
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit<ComponentProps<E>, keyof ButtonOwnProps>

const defaultElement = 'button'

export default function Button<E extends ElementType = typeof defaultElement>({
  children,
  primary,
  secondary,
  as,
  ...otherProps
}: ButtonOwnProps) {
  const classes = clsx()
  const TagName = as || defaultElement

  return (
    <TagName className={classes} {...otherProps}>
      {children}
    </TagName>
  )
}
