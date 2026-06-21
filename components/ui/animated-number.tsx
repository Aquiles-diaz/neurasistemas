"use client"

import { useEffect } from "react"
import {
  m,
  MotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

interface AnimatedNumberProps {
  value: number
  mass?: number
  stiffness?: number
  damping?: number
  precision?: number
  format?: (value: number) => string
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
}

export function AnimatedNumber({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format = (num) => num.toLocaleString(),
  onAnimationStart,
  onAnimationComplete,
}: AnimatedNumberProps) {
  const reduce = useReducedMotion()
  const spring = useSpring(value, { mass, stiffness, damping })
  const display: MotionValue<string> = useTransform(spring, (current) =>
    format(parseFloat(current.toFixed(precision)))
  )

  useEffect(() => {
    // Reduced motion: land on the final value instantly, no count-up.
    if (reduce) spring.jump(value)
    else spring.set(value)
    if (onAnimationStart) onAnimationStart()
    const unsubscribe = spring.on("change", () => {
      if (spring.get() === value && onAnimationComplete) onAnimationComplete()
    })
    return () => unsubscribe()
  }, [spring, value, reduce, onAnimationStart, onAnimationComplete])

  return <m.span>{display}</m.span>
}
