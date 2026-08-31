import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

// Base shared props
type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}

// As a <button>
type AsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined
  }

// As a <Link> (Next.js)
type AsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = AsButton | AsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600',
  secondary:
    'border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white active:bg-brand-600',
  ghost:
    'text-base-100/60 hover:text-base-100 hover:bg-base-800',
  destructive:
    'bg-error text-white hover:opacity-90 active:opacity-80',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-body-sm rounded-md',
  md: 'px-6 py-3 text-body rounded-lg',
  lg: 'px-8 py-4 text-body-lg rounded-lg',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-body font-medium ' +
  'transition-all duration-fast ' +
  'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed ' +
  'hover:scale-[1.02] active:scale-[0.97]'

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', isLoading = false, className, children } = props

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  const content = isLoading ? (
    <>
      <span
        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      <span>Loading…</span>
    </>
  ) : (
    children
  )

  if ('href' in props && props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, variant: _, size: __, isLoading: ___, ...rest } = props as AsLink
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _, size: __, isLoading: ___, ...rest } = props as AsButton
  return (
    <button disabled={isLoading} className={classes} {...rest}>
      {content}
    </button>
  )
}
