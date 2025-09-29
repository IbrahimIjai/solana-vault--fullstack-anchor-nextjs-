import type { Metadata } from 'next'
import '@workspace/ui/styles/globals.css'
import { AppProviders } from '@/components/app-providers'
import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'CampSOL | Digital Camping NFTs',
  description: 'Join the ultimate digital camping adventure. Mint unique camping NFTs and build your virtual campsite.',
  keywords: ['NFT', 'Solana', 'Camping', 'Digital Adventure', 'Collectibles', 'Web3'],
  authors: [{ name: 'CampSOL Team' }],
  creator: 'CampSOL',
  publisher: 'CampSOL',
  openGraph: {
    title: 'CampSOL | Digital Camping NFTs',
    description:
      'Join the ultimate digital camping adventure. Mint unique camping NFTs and build your virtual campsite.',
    url: 'https://campsol.io',
    siteName: 'CampSOL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CampSOL Digital Camping NFTs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CampSOL | Digital Camping NFTs',
    description:
      'Join the ultimate digital camping adventure. Mint unique camping NFTs and build your virtual campsite.',
    creator: '@CampSOL',
    images: ['/twitter-image.jpg'],
  },
}

// These links are no longer used since we've moved to using AppLayout directly in each page
// The default links are now defined in the AppLayout component


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className={`antialiased font-inter text-sm `}>
        <AppProviders>{children}</AppProviders>
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
