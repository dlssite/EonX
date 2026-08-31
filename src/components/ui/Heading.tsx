import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'
type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4'

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel
  size?: HeadingSize
  eyebrow?: string
}

const sizeClasses: Record<HeadingSize, string> = {
  display: 'text-display font-display font-extrabold tracking-tight',
  h1:      'text-h1 font-display font-bold tracking-tight',
  h2:      'text-h2 font-display font-bold tracking-tight',
  h3:      'text-h3 font-display font-bold',
  h4:      'text-h4 font-display font-bold',
}

/**
 * Renders a semantic heading with consistent typography tokens.
 * Optionally renders an eyebrow label above the heading.
 *
 * @example
 * <Heading as="h1" size="display" eyebrow="Our Mission">
 *   Building worlds that last.
 * </Heading>
 */
export function Heading({
  as: Tag = 'h2',
  size,
  eyebrow,
  className,
  children,
  ...props
}: HeadingProps) {
  const resolvedSize: HeadingSize = size ?? (Tag as HeadingSize)

  return (
    <div>
      {eyebrow && (
        <p className="eyebrow mb-3" aria-hidden="true">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn('text-base-100', sizeClasses[resolvedSize], className)}
        {...props}
      >
        {children}
      </Tag>
    </div>
  )
}
