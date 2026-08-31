'use client'

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const DEPT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'leadership', label: 'Leadership' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'writing', label: 'Writing' },
  { value: 'art', label: 'Art' },
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
      <ul role="list" className="flex flex-wrap gap-2">
        {DEPT_OPTIONS.map(({ value, label }) => (
          <li key={value}>
            <button
              onClick={() => handleSelect(value)}
              aria-pressed={activeDept === value}
              className={cn(
                'px-4 py-1.5 rounded-lg text-body-sm font-body font-medium transition-all duration-fast border',
                activeDept === value
                  ? 'bg-brand-500 text-white border-brand-500 shadow-brand/30 shadow-sm'
                  : 'bg-base-900 text-base-100/50 border-base-700 hover:text-base-100 hover:border-brand-500/50 hover:bg-base-800',
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
