'use client'

import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

export function FloatingElements() {
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const iconConfigs = useMemo(() => {
    if (!size.width || !size.height)
      return [] as {
        initial: { x: number; y: number }
        animate: { x: number; y: number; rotate: number }
        duration: number
      }[]

    return Array.from({ length: 6 }).map(() => ({
      initial: { x: Math.random() * size.width, y: Math.random() * size.height },
      animate: { x: Math.random() * size.width, y: Math.random() * size.height, rotate: 360 },
      duration: 20 + Math.random() * 10,
    }))
  }, [size.height, size.width])

  const orbConfigs = useMemo(() => {
    if (!size.width || !size.height)
      return [] as {
        i: number
        style: { background: string }
        initial: { x: number; y: number }
        animate: { x: number; y: number; scale: number[] }
        duration: number
      }[]

    return Array.from({ length: 3 }).map((_, i) => ({
      i,
      style: {
        background: `radial-gradient(circle, hsl(${45 + i * 15}, 70%, 60%) 0%, transparent 70%)`,
      },
      initial: { x: Math.random() * size.width, y: Math.random() * size.height },
      animate: { x: Math.random() * size.width, y: Math.random() * size.height, scale: [1, 1.2, 1] },
      duration: 15 + Math.random() * 10,
    }))
  }, [size.height, size.width])

  if (!size.width || !size.height) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating NFT Icons */}
      {iconConfigs.map((cfg, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10"
          initial={cfg.initial}
          animate={cfg.animate}
          transition={{
            duration: cfg.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          🐵
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      {orbConfigs.map((cfg) => (
        <motion.div
          key={`orb-${cfg.i}`}
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={cfg.style}
          initial={cfg.initial}
          animate={cfg.animate}
          transition={{
            duration: cfg.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
