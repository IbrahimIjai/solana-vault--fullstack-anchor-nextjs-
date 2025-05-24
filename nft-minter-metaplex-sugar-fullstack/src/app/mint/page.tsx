'use client';

import React, { useState, useEffect } from 'react';
import { MinterCollection, NFTCollection } from '@/components/minter/minter-ui';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for demonstration - replace with actual API calls
const mockCollections: NFTCollection[] = [
  {
    id: 'sol-punks',
    name: 'Sol Punks',
    description: 'A collection of 10,000 uniquely generated pixel art characters on Solana.',
    image: 'https://images.unsplash.com/photo-1644699816577-52d0e60abde5?q=80&w=1000',
    price: 1.5,
    totalSupply: 10000,
    mintedCount: 8750,
    mintDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    creator: '8YUYTVfXwoFcXJMrpP6R8QzBDwbEdWYyuPQP5EQ9Gx6W',
    status: 'active',
  },
  {
    id: 'solana-monkeys',
    name: 'Solana Monkeys',
    description: 'A limited collection of 5,000 unique monkey NFTs with rare traits.',
    image: 'https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1000',
    price: 2.0,
    totalSupply: 5000,
    mintedCount: 1200,
    mintDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    creator: '3YUYTVfXwoFcXJMrpP6R8QzBDwbEdWYyuPQP5EQ9Gx6W',
    status: 'active',
  },
  {
    id: 'sol-wizards',
    name: 'Sol Wizards',
    description: 'Magical wizards from the Solana metaverse with unique spells and abilities.',
    image: 'https://images.unsplash.com/photo-1643101514505-c2e0adc0c1d4?q=80&w=1000',
    price: 3.2,
    totalSupply: 3000,
    mintedCount: 0,
    mintDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    creator: '5YUYTVfXwoFcXJMrpP6R8QzBDwbEdWYyuPQP5EQ9Gx6W',
    status: 'upcoming',
  },
  {
    id: 'sol-landscapes',
    name: 'Sol Landscapes',
    description: 'Beautiful digital landscapes created by renowned digital artists.',
    image: 'https://images.unsplash.com/photo-1643101452019-bc00c9bba76b?q=80&w=1000',
    price: 1.8,
    totalSupply: 2000,
    mintedCount: 2000,
    mintDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    creator: '2YUYTVfXwoFcXJMrpP6R8QzBDwbEdWYyuPQP5EQ9Gx6W',
    status: 'ended',
  },
];

export default function MintPage() {
  const [collections, setCollections] = useState<NFTCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch collections
    const fetchCollections = async () => {
      try {
        // Replace with actual API call in production
        // const response = await fetch('/api/collections');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setCollections(mockCollections);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">NFT Collections</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Discover and mint from the latest NFT collections on Solana
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <MinterCollection collections={collections} />
        )}
      </div>
    </div>
  );
}
