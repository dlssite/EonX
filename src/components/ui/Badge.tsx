import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'brand' | 'accent' | 'success' | 'warning' | 'error'
type BadgeSize = 'sm' | 'md'

type BadgeProps = {
  variant?: BadgeVariant
  size?: BadgeSize
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-base-800 text-base-100/70 border border-base-700',
  brand:   'bg-brand-500/10 text-brand-400 border border-brand-500/20',
  accent:  'bg-accent-500/10 text-accent-400 border border-accent-500/20',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  error:   'bg-error/10 text-error border border-error/20',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[0.65rem] px-2 py-0.5',
  md: 'text-label px-2.5 py-1',
}

export function Badge({ variant = 'default', size = 'md', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold uppercase tracking-widest rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </span>
  )
}
