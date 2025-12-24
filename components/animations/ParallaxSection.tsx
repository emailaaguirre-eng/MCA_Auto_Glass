'use client'

import { useEffect, useRef, useState } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down'
  fadeIn?: boolean
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  direction = 'up',
  fadeIn = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate visibility
      const elementCenter = elementTop + elementHeight / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = elementCenter - viewportCenter

      // Parallax offset
      const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? -1 : 1)
      setOffset(parallaxOffset)

      // Fade in when element enters viewport
      if (fadeIn) {
        const isInView = elementTop < windowHeight && elementTop > -elementHeight
        setIsVisible(isInView)
      } else {
        setIsVisible(true)
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, direction, fadeIn])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        opacity: fadeIn ? (isVisible ? 1 : 0) : 1,
        transition: fadeIn ? 'opacity 0.6s ease-out' : 'none',
      }}
    >
      {children}
    </div>
  )
}

