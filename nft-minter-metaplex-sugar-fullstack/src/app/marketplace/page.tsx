'use client'

import { ComingSoon } from '@/components/coming-soon'

export default function MarketplacePage() {
  return (
    <ComingSoon 
      title="NFT Marketplace"
      description="Our decentralized marketplace will allow you to buy, sell, and trade your BoredApeSOL NFTs with zero fees. Connect with other collectors and find the perfect addition to your collection."
      estimatedDate="Q3 2025"
      features={[
        "Zero-fee trading for BoredApeSOL holders",
        "Advanced filtering and search capabilities",
        "Real-time price tracking and history",
        "Secure escrow-based transactions",
        "Collection offers and bundle deals",
        "Integrated rarity rankings and traits explorer",
        "Secondary market royalties for creators",
        "Cross-collection trading capabilities"
      ]}
    />
  )
}
