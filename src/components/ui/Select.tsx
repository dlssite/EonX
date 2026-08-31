import { cn } from '@/lib/utils'
import { forwardRef, type SelectHTMLAttributes } from 'react'

type SelectOption = { label: string; value: string }

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: SelectOption[]
  error?: string
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
    const errorId = `${inputId}-error`

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

        <select
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full px-4 py-3 rounded-lg appearance-none',
            'bg-base-900 border border-base-800',
            'text-base-100 text-body font-body',
            'transition-colors duration-fast',
            'focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/30',
            error && 'border-error',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {error && (
          <p id={errorId} role="alert" className="text-body-sm text-error">{error}</p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
