'use client'

import { motion } from 'motion/react'

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating NFT Icons */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          🐵
        </motion.div>
      ))}

      {/* Gradient Orbs */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-64 h-64 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, hsl(${45 + i * 15}, 70%, 60%) 0%, transparent 70%)`,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
