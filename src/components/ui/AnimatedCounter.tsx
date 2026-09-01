'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type AnimatedCounterProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const prefersReduced = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReduced ? value : 0)

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(value)
      return
    }

    if (!isInView) return

    let startTimestamp: number | null = null
    const startVal = 0
    const endVal = value

    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(easeOut * (endVal - startVal) + startVal)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayValue(endVal)
      }
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration, prefersReduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}
