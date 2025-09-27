'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@workspace/ui/components/button'
import { ArrowRight, Sparkles, ShoppingCart } from 'lucide-react'

export function CampLanding() {
  return (
    <div className="h-dvh flex items-center justify-center bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
            CampSOL
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium NFT collection on Solana. Mint unique digital camping assets.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
            <Link href="/mint" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Mint NFT
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20">
            <Link href="/marketplace" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Marketplace
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
