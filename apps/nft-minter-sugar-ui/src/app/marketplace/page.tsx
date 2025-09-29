'use client'

import { AppLayout } from '@/components/app-layout'
import { MarketplaceUi } from '@/components/page-marketplace/MarketplaceMain'

export default function MarketplacePage() {
  return (
    <AppLayout>
      <MarketplaceUi />
    </AppLayout>
  )
}
