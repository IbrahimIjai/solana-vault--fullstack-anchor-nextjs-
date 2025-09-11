'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@workspace/ui/components/button'
import Image from 'next/image';
import { Skeleton } from '@workspace/ui/components/skeleton'
import { toast } from 'sonner';

// NFT Collection details
const boredApeCollection = {
  name: 'BoredApeSOL',
  symbol: 'BAPE',
  description: 'A limited collection of 10,000 unique Bored Ape NFTs on the Solana blockchain. Each ape is uniquely generated with over 170 possible traits including expression, headwear, clothing, and more.',
  price: 2.5, // SOL
  totalSupply: 10000,
  mintedCount: 4217,
  maxPerWallet: 3,
  launchDate: new Date('2025-06-01T16:00:00Z'),
  creator: 'BoredApeSOL Team',
  royalties: 5, // 5%
};

// Sample NFT preview images
const nftPreviews = [
  'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=1000',
  'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1000',
  'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000',
  'https://images.unsplash.com/photo-1614680376739-8360a29c2355?q=80&w=1000',
];

export default function MintPage() {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(0);
  
  // Calculate if mint is live
  const now = new Date();
  const isMintLive = now >= boredApeCollection.launchDate;
  const timeUntilMint = boredApeCollection.launchDate.getTime() - now.getTime();
  
  // Format countdown
  const days = Math.floor(timeUntilMint / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeUntilMint % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeUntilMint % (1000 * 60 * 60)) / (1000 * 60));
  
  // Calculate total price
  const totalPrice = quantity * boredApeCollection.price;
  
  // Handle mint function
  const handleMint = async () => {
    if (!isMintLive) {
      toast.error('Mint is not live yet!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      toast.success(`Successfully minted ${quantity} BoredApeSOL NFTs!`);
      
      // In a real implementation, you would call your contract here
      // const { mintNft } = useProgram();
      // await mintNft(quantity);
    } catch (error) {
      toast.error('Failed to mint. Please try again.');
      console.error('Mint error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column - NFT Preview */}
          <div className="space-y-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5">
              {nftPreviews[selectedPreview] ? (
                <Image 
                  src={nftPreviews[selectedPreview]}
                  alt={`BoredApeSOL NFT Preview ${selectedPreview + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
              
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {boredApeCollection.mintedCount} / {boredApeCollection.totalSupply} Minted
              </div>
            </div>
            
            {/* Thumbnail previews */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {nftPreviews.map((preview, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 overflow-hidden rounded-lg flex-shrink-0 ${selectedPreview === index ? 'ring-2 ring-purple-500' : 'opacity-70'}`}
                  onClick={() => setSelectedPreview(index)}
                >
                  <Image 
                    src={preview}
                    alt={`BoredApeSOL NFT Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Collection details */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Collection Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Symbol</p>
                  <p className="font-medium">{boredApeCollection.symbol}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Supply</p>
                  <p className="font-medium">{boredApeCollection.totalSupply.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Max Per Wallet</p>
                  <p className="font-medium">{boredApeCollection.maxPerWallet}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Royalties</p>
                  <p className="font-medium">{boredApeCollection.royalties}%</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Creator</p>
                  <p className="font-medium">{boredApeCollection.creator}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Mint Interface */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                {boredApeCollection.name}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {boredApeCollection.description}
              </p>
            </div>
            
            {/* Mint status */}
            <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mint Status</h2>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${isMintLive ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-400'}`}>
                  {isMintLive ? 'Live' : 'Upcoming'}
                </div>
              </div>
              
              {!isMintLive && (
                <div className="mt-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Mint starts in:</p>
                  <div className="flex space-x-3 mt-1">
                    <div className="bg-black/10 dark:bg-white/10 px-3 py-2 rounded-md text-center">
                      <p className="text-lg font-bold">{days}</p>
                      <p className="text-xs">Days</p>
                    </div>
                    <div className="bg-black/10 dark:bg-white/10 px-3 py-2 rounded-md text-center">
                      <p className="text-lg font-bold">{hours}</p>
                      <p className="text-xs">Hours</p>
                    </div>
                    <div className="bg-black/10 dark:bg-white/10 px-3 py-2 rounded-md text-center">
                      <p className="text-lg font-bold">{minutes}</p>
                      <p className="text-xs">Minutes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mint interface */}
            <div className="p-6 rounded-xl bg-black/5 dark:bg-white/5 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Mint Price</h2>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-bold">{boredApeCollection.price}</span>
                  <span>SOL</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="quantity" className="block text-sm font-medium">
                  Quantity (Max {boredApeCollection.maxPerWallet})
                </label>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.min(boredApeCollection.maxPerWallet, quantity + 1))}
                    disabled={quantity >= boredApeCollection.maxPerWallet}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between text-sm">
                  <span>Base price</span>
                  <span>{boredApeCollection.price} SOL × {quantity}</span>
                </div>
                <div className="flex justify-between font-medium text-lg mt-2">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} SOL</span>
                </div>
              </div>
              
              <Button 
                className="w-full py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                onClick={handleMint}
                disabled={isLoading || !isMintLive}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : isMintLive ? (
                  `Mint ${quantity} NFT${quantity > 1 ? 's' : ''}`
                ) : (
                  'Mint Not Live Yet'
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By minting, you agree to our terms and conditions. All sales are final.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
