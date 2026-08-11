'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { EASE } from '@/components/heroes/ease'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>

/**
 * Soft fade-up on scroll — used across landing sections and footer.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
