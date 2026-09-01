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
  default: 'bg-base-900/80 text-base-100/70 border border-glass',
  brand:   'bg-brand-500/10 text-brand-400 dark:text-brand-300 border border-brand-500/30',
  accent:  'bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/30',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30',
  error:   'bg-rose-500/10 text-rose-600 dark:text-rose-300 border border-rose-500/30',
}

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-base-100/40',
  brand:   'bg-brand-400 shadow-[0_0_6px_0_rgba(108,99,255,0.8)]',
  accent:  'bg-accent-400 shadow-[0_0_6px_0_rgba(255,107,53,0.8)]',
  success: 'bg-emerald-400 shadow-[0_0_6px_0_rgba(52,211,153,0.8)]',
  warning: 'bg-amber-400 shadow-[0_0_6px_0_rgba(251,191,36,0.8)]',
  error:   'bg-rose-400 shadow-[0_0_6px_0_rgba(244,63,94,0.8)]',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-[0.65rem] px-2.5 py-0.5 gap-1.5',
  md: 'text-label px-3 py-1 gap-2',
}

export function Badge({
  variant = 'default',
  size = 'md',
  showDot = false,
  className,
  children,
}: BadgeProps & { showDot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold uppercase tracking-widest rounded-full backdrop-blur-md',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {showDot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0 animate-pulse', dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
}
