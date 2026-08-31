import { cn } from '@/lib/utils'

type DividerProps = {
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-4', className)}
      >
        <div className="flex-1 h-px bg-base-800" />
        <span className="text-label font-body font-medium text-base-100/30 uppercase tracking-widest">
          {label}
        </span>
        <div className="flex-1 h-px bg-base-800" />
      </div>
    )
  }

  return (
    <hr
      className={cn('border-none h-px bg-base-800', className)}
    />
  )
}
