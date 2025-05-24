'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import { AppHeader } from '@/components/app-header'
import React from 'react'
import { AppFooter } from '@/components/app-footer'
import { ClusterChecker } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'

// Default navigation links if none are provided
const defaultNavLinks = [
  { label: 'Home', path: '/' },
  { label: 'Mint', path: '/mint' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Collection', path: '/collection' },
  { label: 'Roadmap', path: '/roadmap' },
]

export function AppLayout({
  children,
  links = defaultNavLinks,
}: {
  children: React.ReactNode
  links?: { label: string; path: string }[]
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col min-h-screen">
        <AppHeader links={links} />
        <main className="flex-grow pt-20 md:pt-24">
          <ClusterChecker>
            <AccountChecker />
          </ClusterChecker>
          {children}
        </main>
        <footer className="bg-black dark:bg-black light:bg-neutral-900 text-white py-6 sm:py-8 md:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="col-span-2 sm:col-span-2 md:col-span-1 mb-4 md:mb-0">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">BoredApe<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SOL</span></h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  The premier NFT collection on Solana blockchain. Unique digital collectibles with real utility.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">Links</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/mint" className="hover:text-white transition-colors">Mint</a></li>
                  <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                  <li><a href="/collection" className="hover:text-white transition-colors">Collection</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">Resources</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">Community</h4>
                <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Medium</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
              <p>© {new Date().getFullYear()} BoredApeSOL. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  )
}
