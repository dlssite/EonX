'use client'

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const DEPT_OPTIONS = [
  { value: 'all', label: 'All Disciplines' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'art', label: 'Art & Illustration' },
  { value: 'community', label: 'Community' },
]

type DeptFilterProps = {
  activeDept: string
  basePath?: string
}

export function DeptFilter({ activeDept }: DeptFilterProps) {
  const router = useRouter()
  const pathname = usePathname()

  function handleSelect(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('dept', value)
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <nav aria-label="Filter by department">
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-base-900/80 border border-glass backdrop-blur-md w-fit shadow-md">
        {DEPT_OPTIONS.map(({ value, label }) => {
          const isSelected = activeDept === value
          return (
            <button
              key={value}
              onClick={() => handleSelect(value)}
              aria-pressed={isSelected}
              className={cn(
                'px-4 py-2 rounded-full text-body-sm font-body font-medium transition-all duration-fast select-none',
                isSelected
                  ? 'bg-base-800/80 text-base-100 font-semibold border border-glass-subtle shadow-sm'
                  : 'text-base-100/60 hover:text-base-100 hover:bg-base-800/40',
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
