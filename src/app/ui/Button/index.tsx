import type { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'
import styles from './styles.module.css'

export function Button({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx(styles['button'], className)} {...rest}>
      {children}
    </button>
  )
}
