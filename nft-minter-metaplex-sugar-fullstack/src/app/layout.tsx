import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/app-providers'
import { AppLayout } from '@/components/app-layout'
import React from 'react'

export const metadata: Metadata = {
  title: 'BoredApeSOL | NFT Marketplace',
  description: 'The premier NFT collection on Solana blockchain. Unique digital collectibles with real utility.',
  keywords: ['NFT', 'Solana', 'Marketplace', 'Digital Art', 'Collectibles', 'Crypto'],
  authors: [{ name: 'BoredApeSOL Team' }],
  creator: 'BoredApeSOL',
  publisher: 'BoredApeSOL',
  openGraph: {
    title: 'BoredApeSOL | NFT Marketplace',
    description: 'The premier NFT collection on Solana blockchain. Unique digital collectibles with real utility.',
    url: 'https://boredapesol.io',
    siteName: 'BoredApeSOL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BoredApeSOL NFT Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoredApeSOL | NFT Marketplace',
    description: 'The premier NFT collection on Solana blockchain. Unique digital collectibles with real utility.',
    creator: '@BoredApeSOL',
    images: ['/twitter-image.jpg'],
  },
}

// These links are no longer used since we've moved to using AppLayout directly in each page
// The default links are now defined in the AppLayout component

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
// Patch BigInt so we can log it using JSON.stringify without any errors
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
