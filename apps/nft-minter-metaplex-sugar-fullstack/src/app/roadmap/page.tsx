'use client'

import { ComingSoon } from '@/components/coming-soon'

export default function RoadmapPage() {
  return (
    <ComingSoon 
      title="Project Roadmap"
      description="Our vision for BoredApeSOL extends far beyond just an NFT collection. Explore our detailed roadmap to see what we're building and how we plan to bring utility and value to our community."
      estimatedDate="Updated Quarterly"
      features={[
        "Exclusive BoredApeSOL merchandise store",
        "Community DAO for project governance",
        "Metaverse integration and virtual events",
        "Token-gated discord with exclusive benefits",
        "Play-to-earn game development",
        "Real-world events and meetups",
        "Cross-chain bridging capabilities",
        "Staking and passive income opportunities"
      ]}
    />
  )
}
