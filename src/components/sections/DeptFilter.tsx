'use client'

import { useRouter, usePathname } from 'next/navigation'

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

export function DeptFilter({ activeDept, basePath }: DeptFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const targetPath = basePath ?? pathname

  function handleSelect(value: string) {
    const params = new URLSearchParams()
    if (value !== 'all') params.set('dept', value)
    const query = params.toString()
    router.push(query ? `${targetPath}?${query}` : targetPath)
  }

  return (
    <nav aria-label="Filter by department" className="w-full">
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 edge-fade-x">
        <div className="atlas-selector">
          {DEPT_OPTIONS.map(({ value, label }) => {
            const isSelected = activeDept === value
            return (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                aria-pressed={isSelected}
                className="atlas-selector__item"
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
