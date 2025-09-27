'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { ArrowRight, Sparkles, ShoppingCart } from 'lucide-react'
import { motion } from 'motion/react'
import { FloatingElements } from './floating-elements'
import { HoverExpandGallery } from './hover-expand-gallery'
import { Badge } from '@workspace/ui/components/badge'

export function CampLanding() {
  return (
    <section className="flex-1 relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      <FloatingElements />
      <div className="container mx-auto max-w-6xl px-4 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge variant="secondary" className="w-fit">
                  Solana Devnet Collection
                </Badge>
              </motion.div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                The Ultimate{' '}
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  BoredApe NFT
                </motion.span>{' '}
                Collection
              </h1>
              <motion.p
                className="text-xl text-muted-foreground text-pretty leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Mint, trade, and collect unique digital apes on Solana. Lightning-fast transactions, minimal fees.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/mint">
                    Start Minting
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <HoverExpandGallery images={nftImages} className="max-w-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const nftImages = [
  {
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #001',
    code: '# 001',
  },
  {
    src: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #002',
    code: '# 002',
  },
  {
    src: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #003',
    code: '# 003',
  },
  {
    src: 'https://images.unsplash.com/photo-1605570365160-b4d3c5b2b6d6?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #004',
    code: '# 004',
  },
  {
    src: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #005',
    code: '# 005',
  },
  {
    src: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=400&h=400&fit=crop&crop=face',
    alt: 'Bored Ape #006',
    code: '# 006',
  },
]
