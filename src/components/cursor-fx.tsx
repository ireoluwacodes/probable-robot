'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING_CONFIG = { damping: 25, stiffness: 400 }
const OUTER_SIZE = 72

export function CursorFx() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hasTouch, setHasTouch] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, SPRING_CONFIG)
  const springY = useSpring(cursorY, SPRING_CONFIG)

  useEffect(() => {
    setMounted(true)
    setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!mounted || hasTouch) return

    const updateCursorVisible = (visible: boolean) => {
      document.documentElement.classList.toggle('cursor-fx-active', visible)
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
      updateCursorVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      updateCursorVisible(false)
    }
    const handleMouseEnter = () => {
      setIsVisible(true)
      updateCursorVisible(true)
    }

    const interactiveSelectors = [
      'a', 'button', 'input', 'textarea', 'select', '[role="button"]',
      '[data-cursor-hover]', '.cursor-hover'
    ]
    const selector = interactiveSelectors.join(', ')

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest(selector)) setIsHovering(true)
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target?.closest(selector)) setIsHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.documentElement.classList.remove('cursor-fx-active')
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY, mounted, hasTouch])

  if (!mounted || hasTouch) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-0 h-0 z-[9999] pointer-events-none cursor-fx-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ x: springX, y: springY }}
      >
        {/* Inner dot */}
        <motion.div
          className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: isHovering ? 0.6 : 1 }}
          transition={{ duration: 0.2 }}
        />
        {/* Outer circle - shrinks on hover */}
        <motion.div
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-primary/60"
          style={{ width: OUTER_SIZE, height: OUTER_SIZE }}
          initial={false}
          animate={{ scale: isHovering ? 0.3 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </motion.div>
  )
}
