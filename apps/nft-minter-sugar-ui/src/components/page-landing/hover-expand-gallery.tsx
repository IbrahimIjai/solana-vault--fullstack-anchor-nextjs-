'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'

const HoverExpandGallery = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[]
  className?: string
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1)

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn('relative w-full max-w-6xl px-5', className)}
    >
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full">
        <div className="flex w-full items-center justify-center gap-1">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-3xl"
              initial={{ width: '2.5rem', height: '20rem' }}
              animate={{
                width: activeImage === index ? '24rem' : '5rem',
                height: activeImage === index ? '24rem' : '24rem',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={() => setActiveImage(index)}
              onHoverStart={() => setActiveImage(index)}
            >
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent"
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {activeImage === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute flex h-full w-full flex-col items-end justify-end p-4"
                  >
                    <p className="text-left text-xs text-white/50">{image.code}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <img src={image.src || '/placeholder.svg'} className="size-full object-cover" alt={image.alt} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export { HoverExpandGallery }
