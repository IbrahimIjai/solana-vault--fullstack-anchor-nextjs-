import React from 'react'
import { NftHero } from './NftHero'

import { generatePlaceholderNFT } from './PlaceholderImages'

export function MarketplaceMain() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <NftHero />
      {/* TODO: Add NFT grid, filters, and marketplace features here */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-6 text-primary">Marketplace</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Example placeholder NFT cards */}
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="rounded-lg shadow bg-card p-4 flex flex-col items-center">
              <div className="w-48 h-48 mb-4">{generatePlaceholderNFT(String(id), `NFT #${id}`)}</div>
              <div className="font-semibold text-lg mb-2">NFT #{id}</div>
              <div className="text-muted-foreground mb-2">Creator: CampSOL</div>
              <button className="mt-auto px-4 py-2 rounded bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition">
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
