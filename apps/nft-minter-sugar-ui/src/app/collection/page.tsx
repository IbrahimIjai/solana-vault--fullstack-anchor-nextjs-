'use client'

import { ComingSoon } from '@/components/coming-soon'

export default function CollectionPage() {
  return (
    <ComingSoon 
      title="Collection Gallery"
      description="Explore the entire BoredApeSOL collection in our immersive gallery. Browse by traits, rarity, and more to discover the unique characteristics that make each NFT special."
      estimatedDate="Q2 2025"
      features={[
        "Complete trait and rarity explorer",
        "High-resolution artwork viewing",
        "3D viewing mode for special editions",
        "Owner history and provenance tracking",
        "Community spotlight for notable pieces",
        "Trait rarity percentage indicators",
        "Collection statistics and analytics",
        "Personalized watchlist for favorite pieces"
      ]}
    />
  )
}
