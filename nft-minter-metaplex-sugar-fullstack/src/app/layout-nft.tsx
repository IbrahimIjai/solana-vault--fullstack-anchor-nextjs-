'use client'
import React from 'react'
import { NftNavbar } from '@/components/landing/nft-navbar'
import { Toaster } from 'sonner'
import '@/styles/animations.css'

export function NftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <NftNavbar />
      <main className="flex-grow pt-16">{children}</main>
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">BoredApe<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">SOL</span></h3>
              <p className="text-gray-400">
                The premier NFT collection on Solana blockchain. Unique digital collectibles with real utility.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/mint" className="hover:text-white transition-colors">Mint</a></li>
                <li><a href="/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/collection" className="hover:text-white transition-colors">Collection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Whitepaper</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Medium</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BoredApeSOL. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" richColors closeButton />
    </div>
  )
}
