import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
}

/**
 * Max-width centered wrapper. max-w-container = 1280px (defined in tailwind.config.ts).
 */
export function Container({ as: Tag = 'div', className, children, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'w-full max-w-container mx-auto',
        'px-6 md:px-10 xl:px-20',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
