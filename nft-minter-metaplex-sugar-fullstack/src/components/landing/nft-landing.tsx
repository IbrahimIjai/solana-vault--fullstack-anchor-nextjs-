'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap, ShoppingCart, Star } from 'lucide-react'
import { getPlaceholderImage } from './placeholder-images'

// Sample NFT data for showcase
const featuredNfts = [
  {
    id: '1',
    name: 'Bored Ape #1234',
    price: 2.5,
  },
  {
    id: '2',
    name: 'Bored Ape #5678',
    price: 3.2,
  },
  {
    id: '3',
    name: 'Bored Ape #9012',
    price: 2.8,
  },
  {
    id: '4',
    name: 'Bored Ape #3456',
    price: 4.1,
  },
]

export function NftHero() {
  const [heroImage, setHeroImage] = useState<string>('');

  // Generate a special hero image on client side
  useEffect(() => {
    try {
      // Use a special ID for the hero image to make it stand out
      const image = getPlaceholderImage('hero-special', 'Bored Ape #1');
      setHeroImage(image);
    } catch (error) {
      console.error('Error generating hero image:', error);
      // Fallback gradient if image generation fails
      setHeroImage(`data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff9500"/><stop offset="100%" stop-color="%23ff00e9"/></linearGradient><rect width="400" height="400" fill="url(%23g)"/></svg>`);
    }
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-black to-neutral-900 dark:from-black dark:to-neutral-900 text-white light:from-white light:to-neutral-100 light:text-black">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs sm:text-sm font-medium">
              <div className="flex items-center space-x-1">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Limited Edition</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block">Bored Ape</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Solana Edition
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-lg mx-auto md:mx-0">
              Exclusive NFT collection on Solana. Own a piece of digital history with our unique Bored Ape collection.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                <Link href="/mint" className="flex items-center gap-2">
                  Mint Now <Zap className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white light:border-black light:text-black">
                <Link href="/marketplace" className="flex items-center gap-2">
                  Marketplace <ShoppingCart className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative mt-8 md:mt-0">
            <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-1 bg-black dark:bg-black light:bg-white rounded-2xl"></div>
              <div className="absolute inset-2 rounded-xl overflow-hidden">
                {heroImage ? (
                  <Image 
                    src={heroImage} 
                    alt="Featured NFT" 
                    width={400} 
                    height={400} 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-yellow-500 to-pink-500 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NftFeatures() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our NFTs?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unique digital collectibles with real utility and community benefits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
            <p className="text-gray-600 dark:text-gray-400">
              NFT holders get exclusive access to events, drops, and community benefits.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Low Gas Fees</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built on Solana for lightning-fast transactions and minimal gas fees.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-6">
              <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community Rewards</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Earn rewards and participate in governance decisions as an NFT holder.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NftShowcase() {
  const [placeholderImages, setPlaceholderImages] = useState<Record<string, string>>({});

  // Generate placeholder images on client side
  useEffect(() => {
    const images: Record<string, string> = {};
    featuredNfts.forEach(nft => {
      try {
        // Use our getPlaceholderImage function to generate SVG data URLs
        images[nft.id] = getPlaceholderImage(nft.id, nft.name);
      } catch (error) {
        console.error('Error generating placeholder image:', error);
        // Fallback color if client-side rendering fails
        images[nft.id] = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23${Math.floor(Math.random()*16777215).toString(16)}"/></svg>`;
      }
    });
    setPlaceholderImages(images);
  }, []);

  return (
    <div className="bg-white dark:bg-black light:bg-neutral-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Featured NFTs</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Check out some of our most popular Bored Ape NFTs from our exclusive collection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredNfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-neutral-100 dark:bg-neutral-800 light:bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 flex flex-col"
            >
              <div className="relative aspect-square">
                {placeholderImages[nft.id] ? (
                  <Image 
                    src={placeholderImages[nft.id]}
                    alt={nft.name}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse"></div>
                )}
              </div>
              <div className="p-3 sm:p-4 flex-grow">
                <h3 className="font-bold text-base sm:text-lg truncate">{nft.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                    <span className="font-medium text-sm sm:text-base">{nft.price} SOL</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-purple-600 dark:text-purple-400 p-1 sm:p-2">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Button size="lg" variant="outline" className="group">
            <Link href="/marketplace" className="flex items-center gap-2">
              View All NFTs
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
      </div>
    </div>
  )
}

export function NftLanding() {
  return (
    <div>
      <NftHero />
      <NftFeatures />
      <NftShowcase />
    </div>
  )
}
