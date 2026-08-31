'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  className?: string
}

/**
 * Icon button that switches between dark and light mode.
 * Uses the ThemeContext — must be rendered inside <ThemeProvider>.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={cn(
        'relative p-2 rounded-full',
        'text-base-100/50 hover:text-base-100',
        'hover:bg-base-800/60',
        'transition-all duration-fast',
        'focus-visible:outline-2 focus-visible:outline-brand-500 focus-visible:outline-offset-2',
        className,
      )}
    >
      {/* Sun — shown in dark mode (click to go light) */}
      <Sun
        size={17}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto transition-all duration-fast',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75',
        )}
      />
      {/* Moon — shown in light mode (click to go dark) */}
      <Moon
        size={17}
        aria-hidden="true"
        className={cn(
          'transition-all duration-fast',
          isDark ? 'opacity-0 -rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100',
        )}
      />
    </button>
  )
}
