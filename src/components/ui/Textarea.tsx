import { cn } from '@/lib/utils'
import { forwardRef, type TextareaHTMLAttributes } from 'react'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`
    const hintId = `${inputId}-hint`

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-body-sm font-body font-medium text-base-100/80"
        >
          {label}
          {props.required && (
            <span className="text-error ml-1" aria-hidden="true">*</span>
          )}
        </label>

        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={cn(error && errorId, hint && hintId) || undefined}
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-lg resize-y',
            'bg-base-900 border border-base-800',
            'text-base-100 text-body font-body',
            'placeholder:text-base-100/30',
            'transition-colors duration-fast',
            'focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30',
            error && 'border-error focus:border-error focus:ring-error/30',
            className,
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="text-body-sm text-base-100/40">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-body-sm text-error">{error}</p>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
